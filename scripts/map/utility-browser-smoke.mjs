import fs from 'node:fs';
import http from 'node:http';
import https from 'node:https';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';

const root = process.cwd();
const port = Number(process.env.MAP_UTILITY_SMOKE_PORT || 4331);
const debugPort = Number(process.env.MAP_UTILITY_DEBUG_PORT || 9341);
const remoteBaseUrl = process.env.MAP_UTILITY_BASE_URL?.replace(/\/$/, '');
const baseUrl = remoteBaseUrl || `http://127.0.0.1:${port}`;
const marker = JSON.parse(fs.readFileSync(path.join(root, 'src/data/map-markers.json'), 'utf8')).markers[0];
const storageKey = 'dragonswordguide.map.completed.v1';
const chromeCandidates = [
  process.env.CHROME_BIN,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Users/jazfox/Library/Caches/ms-playwright/chromium-1234/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing',
].filter(Boolean);
const chromeBin = chromeCandidates.find((candidate) => fs.existsSync(candidate));

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function waitForExit(child, timeoutMs = 2000) {
  if (child.exitCode !== null) return;
  await Promise.race([
    new Promise((resolve) => child.once('exit', resolve)),
    delay(timeoutMs),
  ]);
}

async function waitForHttp(url, timeoutMs = 30000) {
  const started = Date.now();
  const client = url.startsWith('https:') ? https : http;
  while (Date.now() - started < timeoutMs) {
    try {
      const status = await new Promise((resolve, reject) => {
        client.get(url, (response) => {
          response.resume();
          resolve(response.statusCode || 0);
        }).on('error', reject);
      });
      if (status >= 200 && status < 500) return;
    } catch {
      // The endpoint may still be starting.
    }
    await delay(150);
  }
  throw new Error(`Timed out waiting for ${url}`);
}

class CdpClient {
  constructor(socket) {
    this.socket = socket;
    this.nextId = 1;
    this.pending = new Map();
    socket.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);
      if (!message.id || !this.pending.has(message.id)) return;
      const pending = this.pending.get(message.id);
      this.pending.delete(message.id);
      if (message.error) pending.reject(new Error(message.error.message));
      else pending.resolve(message.result);
    });
  }

  send(method, params = {}) {
    const id = this.nextId++;
    this.socket.send(JSON.stringify({ id, method, params }));
    return new Promise((resolve, reject) => this.pending.set(id, { resolve, reject }));
  }

  close() {
    this.socket.close();
  }
}

async function connectChrome() {
  const response = await fetch(`http://127.0.0.1:${debugPort}/json`);
  const targets = await response.json();
  const target = targets.find((item) => item.type === 'page') || targets[0];
  const socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true });
    socket.addEventListener('error', reject, { once: true });
  });
  return new CdpClient(socket);
}

async function evaluate(cdp, expression) {
  const result = await cdp.send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text || 'Runtime.evaluate failed');
  }
  return result.result.value;
}

async function navigate(cdp, url) {
  const navigation = await cdp.send('Page.navigate', { url });
  if (navigation.errorText) throw new Error(`Navigation failed for ${url}: ${navigation.errorText}`);
  for (let attempt = 0; attempt < 100; attempt += 1) {
    const ready = await evaluate(cdp, `document.readyState !== 'loading' && Boolean(document.querySelector('[data-map-mvp]'))`);
    if (ready) return;
    await delay(100);
  }
  const state = await evaluate(cdp, `({ href: location.href, title: document.title, readyState: document.readyState, body: document.body?.innerText?.slice(0, 160) })`);
  throw new Error(`Map did not become ready at ${url}: ${JSON.stringify(state)}`);
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

if (!chromeBin) throw new Error(`Chrome binary not found: ${chromeCandidates.join(', ')}`);
if (!marker?.id || !marker?.name) throw new Error('The map has no stable marker fixture');

const preview = remoteBaseUrl ? null : spawn('npm', ['run', 'preview', '--', '--host', '127.0.0.1', '--port', String(port)], {
  cwd: root,
  stdio: ['ignore', 'pipe', 'pipe'],
});
const chromeProfile = fs.mkdtempSync(path.join(os.tmpdir(), 'dragon-map-utility-'));
const chrome = spawn(chromeBin, [
  '--headless=new',
  `--remote-debugging-port=${debugPort}`,
  `--user-data-dir=${chromeProfile}`,
  '--no-first-run',
  '--no-default-browser-check',
  '--disable-gpu',
  'about:blank',
], { stdio: ['ignore', 'pipe', 'pipe'] });
let previewLog = '';
let chromeLog = '';
preview?.stdout.on('data', (chunk) => { previewLog += chunk.toString(); });
preview?.stderr.on('data', (chunk) => { previewLog += chunk.toString(); });
chrome.stdout.on('data', (chunk) => { chromeLog += chunk.toString(); });
chrome.stderr.on('data', (chunk) => { chromeLog += chunk.toString(); });

try {
  await waitForHttp(`${baseUrl}/map/`);
  await waitForHttp(`http://127.0.0.1:${debugPort}/json/version`);
  const cdp = await connectChrome();
  await cdp.send('Page.enable');
  await cdp.send('Runtime.enable');
  await cdp.send('Page.addScriptToEvaluateOnNewDocument', {
    source: `
      window.__toolEvents = [];
      window.__runtimeErrors = [];
      window.gtag = (...args) => window.__toolEvents.push(args);
      addEventListener('error', (event) => window.__runtimeErrors.push(String(event.error?.message || event.message)));
      addEventListener('unhandledrejection', (event) => window.__runtimeErrors.push(String(event.reason?.message || event.reason)));
    `,
  });
  await cdp.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  const deepLink = `${baseUrl}/map/?marker=${encodeURIComponent(marker.id)}`;

  await navigate(cdp, deepLink);
  const firstPass = await evaluate(cdp, `(async () => {
    const waitFor = async (check) => {
      for (let attempt = 0; attempt < 60; attempt += 1) {
        if (check()) return;
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
      throw new Error('map utility state timeout');
    };
    const root = document.querySelector('[data-map-mvp]');
    const count = root?.querySelector('[data-map-progress-count]');
    const toggle = root?.querySelector('[data-map-action="toggle-completed"]');
    const hide = root?.querySelector('[data-hide-completed]');
    const reset = root?.querySelector('[data-map-action="reset-completed"]');
    if (!root || !count || !toggle || !hide || !reset) return { ok: false, reason: 'missing map progress controls' };
    await waitFor(() => root.querySelector('[data-marker-panel] h3')?.textContent?.trim() === ${JSON.stringify(marker.name)});
    const approximate = root.querySelector('[data-marker-panel]')?.textContent?.includes('Approximate') || false;
    const markerButton = root.querySelector(${JSON.stringify(`[data-marker-id="${marker.id}"]`)});
    const search = root.querySelector('[data-marker-search]');
    search.value = ${JSON.stringify(marker.name)};
    search.dispatchEvent(new Event('input', { bubbles: true }));
    search.dispatchEvent(new Event('change', { bubbles: true }));
    await waitFor(() => Number(root.dataset.filteredMarkerCount || 0) >= 1 && markerButton.hidden === false);
    const searchWorked = markerButton.hidden === false;
    search.value = '';
    search.dispatchEvent(new Event('input', { bubbles: true }));
    const category = root.querySelector(${JSON.stringify(`[data-category-filter][value="${marker.category}"]`)});
    category.click();
    await waitFor(() => markerButton.hidden === true);
    const categoryHideWorked = markerButton.hidden === true;
    category.click();
    await waitFor(() => markerButton.hidden === false);
    toggle.click();
    await waitFor(() => root.dataset.completedMarkerCount === '1');
    return {
      ok: true,
      selectedName: root.querySelector('[data-marker-panel] h3')?.textContent?.trim(),
      queryMarker: new URLSearchParams(location.search).get('marker'),
      approximate,
      searchWorked,
      categoryHideWorked,
      stored: JSON.parse(localStorage.getItem(${JSON.stringify(storageKey)}) || '[]'),
      events: window.__toolEvents.map((entry) => entry[1]),
      errors: window.__runtimeErrors,
    };
  })()`);
  assert(firstPass.ok, firstPass.reason);
  assert(firstPass.selectedName === marker.name, 'deep link did not select the requested marker');
  assert(firstPass.queryMarker === marker.id, 'marker query was not retained');
  assert(firstPass.approximate, 'completion obscured the Approximate status');
  assert(firstPass.searchWorked, 'search did not keep the matching marker visible');
  assert(firstPass.categoryHideWorked, 'category filter did not hide its marker');
  assert(firstPass.stored.length === 1 && firstPass.stored[0] === marker.id, 'completion did not persist the marker ID');
  for (const eventName of ['tool_open', 'tool_input_change', 'tool_result_generated', 'map_marker_completed']) {
    assert(firstPass.events.includes(eventName), `${eventName} was not emitted`);
  }
  assert(firstPass.errors.length === 0, `runtime errors: ${firstPass.errors.join('; ')}`);

  await navigate(cdp, deepLink);
  const persisted = await evaluate(cdp, `(async () => {
    const waitFor = async (check) => {
      for (let attempt = 0; attempt < 60; attempt += 1) {
        if (check()) return;
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
      throw new Error('persisted state timeout');
    };
    const root = document.querySelector('[data-map-mvp]');
    await waitFor(() => root?.dataset.completedMarkerCount === '1');
    const markerButton = root.querySelector(${JSON.stringify(`[data-marker-id="${marker.id}"]`)});
    root.querySelector('[data-hide-completed]').click();
    await waitFor(() => markerButton.hidden === true);
    const hidden = markerButton.hidden;
    root.querySelector('[data-map-action="reset-completed"]').click();
    await waitFor(() => root.dataset.completedMarkerCount === '0');
    return {
      hidden,
      visibleAfterReset: markerButton.hidden === false,
      storageValue: localStorage.getItem(${JSON.stringify(storageKey)}),
      events: window.__toolEvents.map((entry) => entry[1]),
      errors: window.__runtimeErrors,
    };
  })()`);
  assert(persisted.hidden, 'Hide found did not hide the marker');
  assert(persisted.visibleAfterReset, 'reset did not restore the marker');
  assert(persisted.storageValue === null, 'reset did not clear LocalStorage');
  assert(persisted.events.includes('tool_reset'), 'tool_reset was not emitted');
  assert(persisted.errors.length === 0, `runtime errors after reload: ${persisted.errors.join('; ')}`);

  const chestPass = await evaluate(cdp, `(async () => {
    const waitFor = async (check, attempts = 100) => {
      for (let attempt = 0; attempt < attempts; attempt += 1) {
        if (check()) return;
        await new Promise((resolve) => setTimeout(resolve, 75));
      }
      throw new Error('chest completion timeout');
    };
    const root = document.querySelector('[data-map-mvp]');
    const hide = root.querySelector('[data-hide-completed]');
    if (hide.checked) hide.click();
    const chestFilter = root.querySelector('[data-category-filter][value="CHEST"]');
    if (!chestFilter.checked) chestFilter.click();
    await waitFor(() => root.dataset.chestLoaded === 'true' || root.dataset.chestLoadError, ${remoteBaseUrl ? 400 : 100});
    if (root.dataset.chestLoadError) throw new Error('chest data load failed: ' + root.dataset.chestLoadError);
    await waitFor(() => root.querySelector('[data-chest-cluster]'), ${remoteBaseUrl ? 400 : 100});
    root.querySelector('[data-chest-cluster]').click();
    await waitFor(() => root.querySelector('.marker-chest'));
    const chestMarker = root.querySelector('.marker-chest');
    const chestId = chestMarker.dataset.markerId;
    chestMarker.click();
    await waitFor(() => root.querySelector('[data-marker-panel] h3')?.textContent?.includes('Treasure Chest'));
    const approximate = root.querySelector('[data-marker-panel]')?.textContent?.includes('Approximate') || false;
    root.querySelector('[data-map-action="toggle-completed"]').click();
    await waitFor(() => root.dataset.completedMarkerCount === '1' && chestMarker.hasAttribute('data-marker-completed'));
    const completedOpacity = Number(getComputedStyle(chestMarker).opacity);
    hide.click();
    await waitFor(() => !root.querySelector('[data-marker-id="' + CSS.escape(chestId) + '"]'));
    const hidden = !root.querySelector('[data-marker-id="' + CSS.escape(chestId) + '"]');
    root.querySelector('[data-map-action="reset-completed"]').click();
    await waitFor(() => root.dataset.completedMarkerCount === '0' && root.querySelector('[data-marker-id="' + CSS.escape(chestId) + '"]'));
    return {
      chestId,
      approximate,
      completedOpacity,
      hidden,
      storageValue: localStorage.getItem(${JSON.stringify(storageKey)}),
      events: window.__toolEvents.map((entry) => entry[1]),
      errors: window.__runtimeErrors,
    };
  })()`);
  assert(chestPass.chestId, 'no dynamic chest marker was selected');
  assert(chestPass.approximate, 'chest completion obscured the Approximate status');
  assert(chestPass.completedOpacity < 1, 'completed chest did not receive a visual state');
  assert(chestPass.hidden, 'Hide found did not remove the completed chest');
  assert(chestPass.storageValue === null, 'chest reset did not clear LocalStorage');
  assert(chestPass.events.includes('map_marker_completed'), 'chest completion event was not emitted');
  assert(chestPass.errors.length === 0, `chest runtime errors: ${chestPass.errors.join('; ')}`);

  await cdp.send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
  await navigate(cdp, `${baseUrl}/map/`);
  const mobile = await evaluate(cdp, `(() => {
    const root = document.querySelector('[data-map-mvp]');
    const controls = [...root.querySelectorAll('[data-map-action="toggle-completed"], [data-map-action="reset-completed"], .progress-toggle')];
    return {
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      minHeight: Math.min(...controls.map((control) => control.getBoundingClientRect().height)),
      approximate: root.querySelector('[data-marker-panel]')?.textContent?.includes('Approximate') || false,
      errors: window.__runtimeErrors,
    };
  })()`);
  assert(!mobile.overflow, 'mobile map utility has horizontal overflow');
  assert(mobile.minHeight >= 34, `mobile control height is ${mobile.minHeight}`);
  assert(mobile.approximate, 'mobile panel lost the Approximate status');
  assert(mobile.errors.length === 0, `mobile runtime errors: ${mobile.errors.join('; ')}`);

  cdp.close();
  console.log(`[map:utility-browser] passed for ${marker.id}`);
} catch (error) {
  console.error(`[map:utility-browser] ${error.message}`);
  if (previewLog.trim()) console.error(previewLog.trim());
  if (chromeLog.trim()) console.error(chromeLog.trim());
  process.exitCode = 1;
} finally {
  preview?.kill('SIGTERM');
  chrome.kill('SIGTERM');
  await Promise.all([preview ? waitForExit(preview) : Promise.resolve(), waitForExit(chrome)]);
  try {
    fs.rmSync(chromeProfile, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  } catch (error) {
    console.warn(`[map:utility-browser] temporary Chrome profile cleanup skipped: ${error.code || error.message}`);
  }
}
