import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { spawn } from 'node:child_process';

const ROOT = process.cwd();
const CHROME_BIN = process.env.CHROME_BIN || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = Number(process.env.CHEST_SMOKE_PORT || 4328);
const DEBUG_PORT = Number(process.env.CHEST_SMOKE_DEBUG_PORT || 9338);
const BASE_URL = `http://127.0.0.1:${PORT}`;
const OUT_PATH = path.join(ROOT, 'reports/map-data/browser-performance-validation.json');

function writeJson(filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`);
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitFor(url, timeoutMs = 15000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const statusCode = await new Promise((resolve, reject) => {
        http.get(url, (response) => {
          response.resume();
          resolve(response.statusCode);
        }).on('error', reject);
      });
      if (statusCode >= 200 && statusCode < 500) return true;
    } catch {
      // keep waiting
    }
    await wait(250);
  }
  throw new Error(`Timed out waiting for ${url}`);
}

function requestJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (response) => {
      let body = '';
      response.setEncoding('utf8');
      response.on('data', (chunk) => { body += chunk; });
      response.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', reject);
  });
}

class CdpClient {
  constructor(socket) {
    this.socket = socket;
    this.nextId = 1;
    this.pending = new Map();
    socket.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);
      if (!message.id || !this.pending.has(message.id)) return;
      const { resolve, reject } = this.pending.get(message.id);
      this.pending.delete(message.id);
      if (message.error) reject(new Error(message.error.message));
      else resolve(message.result);
    });
  }

  send(method, params = {}) {
    const id = this.nextId;
    this.nextId += 1;
    this.socket.send(JSON.stringify({ id, method, params }));
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
    });
  }

  close() {
    this.socket.close();
  }
}

async function connectChrome() {
  const pages = await requestJson(`http://127.0.0.1:${DEBUG_PORT}/json`);
  const page = pages.find((item) => item.type === 'page') || pages[0];
  if (!page?.webSocketDebuggerUrl) throw new Error('No Chrome debugging page found');
  const socket = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true });
    socket.addEventListener('error', reject, { once: true });
  });
  return new CdpClient(socket);
}

async function evaluate(cdp, expression, awaitPromise = true) {
  const result = await cdp.send('Runtime.evaluate', {
    expression,
    awaitPromise,
    returnByValue: true
  });
  if (result.exceptionDetails) {
    const detail = result.exceptionDetails.exception?.description || result.exceptionDetails.exception?.value || result.exceptionDetails.text || 'Runtime.evaluate failed';
    throw new Error(detail);
  }
  return result.result.value;
}

async function runViewport(cdp, viewport) {
  await cdp.send('Emulation.setDeviceMetricsOverride', {
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: viewport.deviceScaleFactor,
    mobile: viewport.mobile
  });
  await cdp.send('Page.navigate', { url: `${BASE_URL}/map/` });
  await cdp.send('Page.loadEventFired').catch(() => {});
  await wait(700);

  return evaluate(cdp, `new Promise(async (resolve) => {
    const root = document.querySelector('[data-map-mvp]');
    const chest = document.querySelector('input[value="CHEST"]');
    const viewport = document.querySelector('[data-map-viewport]');
    const canvas = document.querySelector('[data-map-canvas]');
    const layer = document.querySelector('[data-chest-layer]');
    const search = document.querySelector('[data-marker-search]');
    const result = {
      viewport: { width: ${viewport.width}, height: ${viewport.height}, mobile: ${viewport.mobile} },
      initialChestLoaded: Boolean(root.dataset.chestLoaded),
      initialHorizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
    };

    const waitFor = async (check, timeout = 5000) => {
      const start = performance.now();
      while (performance.now() - start < timeout) {
        if (check()) return performance.now() - start;
        await new Promise((r) => requestAnimationFrame(r));
      }
      throw new Error('browser smoke wait timed out');
    };

    const enableStart = performance.now();
    chest.click();
    await waitFor(() => root.dataset.chestLoaded === 'true' && layer.children.length > 0);
    result.enableMs = Math.round(performance.now() - enableStart);
    result.lowZoomClusters = document.querySelectorAll('[data-chest-cluster]').length;
    result.lowZoomMarkers = document.querySelectorAll('.marker-chest').length;

    const cluster = document.querySelector('[data-chest-cluster]');
    const expandStart = performance.now();
    if (cluster) cluster.click();
    await waitFor(() => document.querySelectorAll('.marker-chest').length > 0);
    result.clusterExpansionMs = Math.round(performance.now() - expandStart);
    result.highZoomMarkers = document.querySelectorAll('.marker-chest').length;

    const marker = document.querySelector('.marker-chest');
    const markerStart = performance.now();
    marker.click();
    await waitFor(() => /Treasure Chest/.test(document.querySelector('[data-marker-panel] h3')?.textContent || ''));
    result.markerOpenMs = Math.round(performance.now() - markerStart);

    const zoomStart = performance.now();
    document.querySelector('[data-map-action="zoom-in"]').click();
    document.querySelector('[data-map-action="zoom-out"]').click();
    await new Promise((r) => requestAnimationFrame(r));
    result.zoomMs = Math.round(performance.now() - zoomStart);

    const panStart = performance.now();
    const rect = viewport.getBoundingClientRect();
    viewport.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, pointerId: 1, clientX: rect.left + 120, clientY: rect.top + 120 }));
    viewport.dispatchEvent(new PointerEvent('pointermove', { bubbles: true, pointerId: 1, clientX: rect.left + 155, clientY: rect.top + 145 }));
    viewport.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, pointerId: 1, clientX: rect.left + 155, clientY: rect.top + 145 }));
    await new Promise((r) => requestAnimationFrame(r));
    result.panMs = Math.round(performance.now() - panStart);
    result.canvasTransformed = canvas.style.transform.includes('translate');

    const searchStart = performance.now();
    search.value = 'Skyridge';
    search.dispatchEvent(new Event('input', { bubbles: true }));
    await waitFor(() => Number(root.dataset.filteredMarkerCount || 0) > 0);
    result.searchMs = Math.round(performance.now() - searchStart);
    result.searchCount = Number(root.dataset.filteredMarkerCount || 0);

    const disableStart = performance.now();
    chest.click();
    await waitFor(() => layer.children.length === 0);
    result.disableCleanupMs = Math.round(performance.now() - disableStart);
    result.finalHorizontalOverflow = document.documentElement.scrollWidth > document.documentElement.clientWidth;
    result.overflowElements = Array.from(document.querySelectorAll('body *'))
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          tag: element.tagName.toLowerCase(),
          className: String(element.className || '').slice(0, 120),
          id: element.id || '',
          right: Math.round(rect.right),
          width: Math.round(rect.width)
        };
      })
      .filter((item) => item.right > document.documentElement.clientWidth + 1)
      .slice(0, 8);
    result.domCapRespected = result.highZoomMarkers <= 250;
    result.controlsUsable = result.enableMs < 3000 && result.searchMs < 1000 && result.markerOpenMs < 1000 && result.zoomMs < 1000 && result.panMs < 1000;
    resolve(result);
  })`);
}

if (!fs.existsSync(CHROME_BIN)) {
  throw new Error(`Chrome binary not found: ${CHROME_BIN}`);
}

const preview = spawn('npm', ['run', 'preview', '--', '--host', '127.0.0.1', '--port', String(PORT)], {
  cwd: ROOT,
  stdio: ['ignore', 'pipe', 'pipe']
});
let previewLog = '';
preview.stdout.on('data', (chunk) => { previewLog += chunk.toString(); });
preview.stderr.on('data', (chunk) => { previewLog += chunk.toString(); });
const chromeProfile = path.join('/tmp', `dragon-chest-chrome-${Date.now()}`);
const chrome = spawn(CHROME_BIN, [
  '--headless=new',
  `--remote-debugging-port=${DEBUG_PORT}`,
  `--user-data-dir=${chromeProfile}`,
  '--no-first-run',
  '--no-default-browser-check',
  '--disable-gpu',
  'about:blank'
], { stdio: ['ignore', 'pipe', 'pipe'] });
let chromeLog = '';
chrome.stdout.on('data', (chunk) => { chromeLog += chunk.toString(); });
chrome.stderr.on('data', (chunk) => { chromeLog += chunk.toString(); });

let failed = false;
try {
  await waitFor(`${BASE_URL}/map/`, 30000);
  await waitFor(`http://127.0.0.1:${DEBUG_PORT}/json/version`);
  const cdp = await connectChrome();
  await cdp.send('Page.enable');
  await cdp.send('Runtime.enable');
  const desktop = await runViewport(cdp, { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  const mobile = await runViewport(cdp, { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
  cdp.close();

  const report = {
    dataset_version: 'chest-scale-500-2026-08-23',
    smoke_type: 'REAL_CHROME_HEADLESS_CDP',
    desktop,
    mobile,
    gate: {
      no_browser_freeze: true,
      no_severe_interaction_lag: desktop.controlsUsable && mobile.controlsUsable,
      no_horizontal_overflow: !desktop.initialHorizontalOverflow && !desktop.finalHorizontalOverflow && !mobile.initialHorizontalOverflow && !mobile.finalHorizontalOverflow,
      no_multi_second_blocking_interaction: Math.max(desktop.enableMs, desktop.searchMs, desktop.markerOpenMs, mobile.enableMs, mobile.searchMs, mobile.markerOpenMs) < 3000,
      dom_cap_respected: desktop.domCapRespected && mobile.domCapRespected,
      map_controls_remain_usable: desktop.controlsUsable && mobile.controlsUsable
    }
  };
  writeJson(OUT_PATH, report);
  console.log(`browser-smoke: desktopEnable=${desktop.enableMs}ms mobileEnable=${mobile.enableMs}ms desktopMarkers=${desktop.highZoomMarkers} mobileMarkers=${mobile.highZoomMarkers}`);
} catch (error) {
  failed = true;
  console.error(previewLog);
  console.error(chromeLog);
  throw error;
} finally {
  chrome.kill('SIGTERM');
  preview.kill('SIGTERM');
}
