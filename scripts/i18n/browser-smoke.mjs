import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const baseUrl = process.env.BASE_URL || 'http://127.0.0.1:4321';
const chromePath = process.env.CHROME_PATH || '/Users/jazfox/Library/Caches/ms-playwright/chromium-1234/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
const debugPort = Number(process.env.CHROME_DEBUG_PORT || 9333);
const pages = ['/ja/', '/ja/roadmap/', '/ja/map/', '/ja/systems/runes/', '/ja/multiplayer/', '/ja/builds/'];
const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
];

function fail(message) {
  console.error(`[i18n:browser] ${message}`);
  process.exitCode = 1;
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForJson(url, attempts = 50) {
  let lastError;
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return response.json();
    } catch (error) {
      lastError = error;
    }
    await delay(100);
  }
  throw lastError || new Error(`No response from ${url}`);
}

async function waitForPageComplete(cdp, attempts = 80) {
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    const ready = await cdp.send('Runtime.evaluate', { expression: 'document.readyState', returnByValue: true });
    if (ready.result.value === 'complete') return true;
    await delay(100);
  }
  return false;
}

async function waitForSelector(cdp, selector, attempts = 80) {
  const expression = `Boolean(document.querySelector(${JSON.stringify(selector)}))`;
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    const result = await cdp.send('Runtime.evaluate', { expression, returnByValue: true });
    if (result.result.value) return true;
    await delay(100);
  }
  return false;
}

function connect(wsUrl) {
  const socket = new WebSocket(wsUrl);
  let nextId = 1;
  const pending = new Map();
  socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      const { resolve, reject } = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) reject(new Error(message.error.message));
      else resolve(message.result);
    }
  });
  const opened = new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true });
    socket.addEventListener('error', reject, { once: true });
  });
  return {
    async send(method, params = {}) {
      await opened;
      const id = nextId++;
      socket.send(JSON.stringify({ id, method, params }));
      return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
    },
    close() {
      socket.close();
    },
  };
}

async function main() {
  if (!fs.existsSync(chromePath)) throw new Error(`Chrome binary missing: ${chromePath}`);
  const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dsg-chrome-'));
  const chrome = spawn(chromePath, [
    '--headless=new',
    `--remote-debugging-port=${debugPort}`,
    `--user-data-dir=${userDataDir}`,
    '--no-first-run',
    '--disable-gpu',
    '--disable-dev-shm-usage',
    'about:blank',
  ], { stdio: 'ignore' });

  try {
    const targets = await waitForJson(`http://127.0.0.1:${debugPort}/json`);
    const pageTarget = targets.find((target) => target.type === 'page' && target.webSocketDebuggerUrl);
    if (!pageTarget) throw new Error('No Chrome page target available for CDP smoke');
    const cdp = connect(pageTarget.webSocketDebuggerUrl);
    await cdp.send('Page.enable');
    await cdp.send('Runtime.enable');
    await cdp.send('Log.enable');

    for (const viewport of viewports) {
      await cdp.send('Emulation.setDeviceMetricsOverride', {
        width: viewport.width,
        height: viewport.height,
        deviceScaleFactor: 1,
        mobile: viewport.name === 'mobile',
      });

      for (const page of pages) {
        await cdp.send('Page.navigate', { url: `${baseUrl}${page}` });
        await waitForPageComplete(cdp);
        await delay(100);
        const result = await cdp.send('Runtime.evaluate', {
          returnByValue: true,
          expression: `(() => ({
            lang: document.documentElement.lang,
            h1: document.querySelector('h1')?.textContent || '',
            canonical: document.querySelector('link[rel="canonical"]')?.href || '',
            hasJaShell: document.body.textContent.includes('非公式ファンガイド') && document.body.textContent.includes('DragonSword Guide は'),
            hasSwitcher: !!document.querySelector('.language-switcher a[href*="/ja/"]') || location.pathname.startsWith('/ja/'),
            overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
            status: document.body.textContent.length > 100
          }))()`,
        });
        const value = result.result.value;
        if (value.lang !== 'ja') fail(`${viewport.name} ${page}: lang=${value.lang}`);
        if (!value.h1.includes('ドラゴンソード')) fail(`${viewport.name} ${page}: H1 not Japanese game intent`);
        if (!value.canonical.includes('/ja/')) fail(`${viewport.name} ${page}: canonical not Japanese`);
        if (!value.hasJaShell) fail(`${viewport.name} ${page}: Japanese shell/footer missing`);
        if (!value.hasSwitcher) fail(`${viewport.name} ${page}: language switcher missing`);
        if (value.overflow) fail(`${viewport.name} ${page}: horizontal overflow`);
        if (!value.status) fail(`${viewport.name} ${page}: body too small`);
      }
    }

    await cdp.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
    await cdp.send('Page.navigate', { url: `${baseUrl}/ja/map/` });
    await waitForPageComplete(cdp);
    await waitForSelector(cdp, '[data-map-mvp]');
    await delay(250);
    const mapResult = await cdp.send('Runtime.evaluate', {
      awaitPromise: true,
      returnByValue: true,
      expression: `(async () => {
        const root = document.querySelector('[data-map-mvp]');
        const search = root?.querySelector('[data-marker-search]');
        const chest = root?.querySelector('[data-category-filter][value="CHEST"]');
        const zoomIn = root?.querySelector('[data-map-action="zoom-in"]');
        const zoomOut = root?.querySelector('[data-map-action="zoom-out"]');
        const reset = root?.querySelector('[data-map-action="reset"]');
        const marker = root?.querySelector('[data-marker-id]');
        if (!root || !search || !chest || !zoomIn || !zoomOut || !reset || !marker) return { ok: false, reason: 'missing map controls' };
        marker.click();
        zoomIn.click();
        zoomOut.click();
        reset.click();
        search.value = 'ウェイポイント';
        search.dispatchEvent(new Event('input', { bubbles: true }));
        await new Promise((resolve) => setTimeout(resolve, 250));
        const waypointShown = Number(root.dataset.filteredMarkerCount || 0);
        search.value = '宝箱';
        search.dispatchEvent(new Event('input', { bubbles: true }));
        if (!chest.checked) chest.click();
        for (let attempt = 0; attempt < 80 && root.dataset.chestLoaded !== 'true' && !root.dataset.chestLoadError; attempt += 1) {
          await new Promise((resolve) => setTimeout(resolve, 125));
        }
        await new Promise((resolve) => setTimeout(resolve, 250));
        const chestShown = Number(root.dataset.filteredMarkerCount || 0);
        const panelText = root.querySelector('[data-marker-panel]')?.textContent || '';
        return {
          ok: true,
          waypointShown,
          chestShown,
          panelLocalized: panelText.includes('地域') && panelText.includes('状態'),
          chestLoaded: root.dataset.chestLoaded === 'true',
          chestLoadError: root.dataset.chestLoadError || '',
          transform: root.querySelector('[data-map-canvas]')?.style.transform || ''
        };
      })()`,
    });
    const mapValue = mapResult.result.value;
    if (!mapValue?.ok) {
      fail(`/ja/map/: ${mapValue?.reason || 'map interaction returned no result'}`);
    } else {
      if (mapValue.waypointShown <= 0) fail('/ja/map/: Japanese waypoint search returned no results');
      if (mapValue.chestShown <= 0) fail('/ja/map/: Japanese chest search returned no results');
      if (!mapValue.panelLocalized) fail('/ja/map/: marker panel labels not localized');
      if (!mapValue.chestLoaded) fail(`/ja/map/: chest layer did not lazy load${mapValue.chestLoadError ? ` (${mapValue.chestLoadError})` : ''}`);
      if (!mapValue.transform.includes('scale(1)')) fail('/ja/map/: reset did not return scale to 1');
    }

    cdp.close();
  } finally {
    chrome.kill('SIGTERM');
  }

  if (process.exitCode) process.exit(process.exitCode);
  console.log('[i18n:browser] desktop/mobile smoke passed');
}

await main();
