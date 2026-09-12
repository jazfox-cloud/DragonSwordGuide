import fs from 'node:fs';
import http from 'node:http';
import https from 'node:https';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';

const root = process.cwd();
const port = Number(process.env.MAP_MEASUREMENT_SMOKE_PORT || 4342);
const debugPort = Number(process.env.MAP_MEASUREMENT_DEBUG_PORT || 9352);
const remoteBaseUrl = process.env.MAP_MEASUREMENT_BASE_URL?.replace(/\/$/, '');
const baseUrl = remoteBaseUrl || `http://127.0.0.1:${port}`;
const marker = JSON.parse(fs.readFileSync(path.join(root, 'src/data/map-markers.json'), 'utf8')).markers[0];
const storageKey = 'dragonswordguide.map.completed.v1';
const chromeCandidates = [
  process.env.CHROME_BIN,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
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

if (!chromeBin) throw new Error('Chrome binary required');
const preview = remoteBaseUrl ? null : spawn('npm', ['run', 'preview', '--', '--host', '127.0.0.1', '--port', String(port)], { stdio: 'ignore' });
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'dragon-measurement-'));
const chrome = spawn(chromeBin, ['--headless=new', `--remote-debugging-port=${debugPort}`, `--user-data-dir=${profile}`, '--no-first-run', '--no-default-browser-check', 'about:blank'], { stdio: 'ignore' });
const failures = [];
const checks = [];
const collections = [];
const observedEvents = [];
const responses = [];
const runtimeErrors = [];
const check = (ok, message) => { checks.push({ message, pass: Boolean(ok) }); if (!ok) failures.push(message); };
let cdp;
try {
  await waitForHttp(baseUrl + '/map/');
  await waitForHttp(`http://127.0.0.1:${debugPort}/json/version`);
  cdp = await connectChrome();
  await cdp.send('Page.enable'); await cdp.send('Runtime.enable'); await cdp.send('Network.enable');
  cdp.socket.addEventListener('message', ({ data }) => {
    const e = JSON.parse(data);
    if (e.method === 'Runtime.exceptionThrown') runtimeErrors.push(e.params.exceptionDetails.text);
    if (e.method === 'Network.requestWillBeSent' && /google-analytics\.com\/g\/collect/.test(e.params.request.url)) {
      const url = new URL(e.params.request.url);
      for (const line of (e.params.request.postData || '').split('\n')) {
        const params = new URLSearchParams(url.search); new URLSearchParams(line).forEach((v,k) => params.set(k,v));
        collections.push({ requestId: e.params.requestId, event: params.get('en'), debug: params.get('_dbg'), parameters: Object.fromEntries([...params].filter(([k]) => k.startsWith('ep.') || k.startsWith('epn.'))) });
      }
    }
    if (e.method === 'Network.responseReceived' && /google-analytics\.com\/g\/collect/.test(e.params.response.url)) responses.push({ requestId: e.params.requestId, status: e.params.response.status });
  });
  if (!remoteBaseUrl) await cdp.send('Network.setBlockedURLs', { urls: ['*googletagmanager.com*', '*google-analytics.com*'] });
  // Mark controlled traffic without replacing gtag or adding another config/ID.
  await cdp.send('Page.addScriptToEvaluateOnNewDocument', { source: `window.dataLayer = window.dataLayer || []; (function(){window.dataLayer.push(arguments);})('set', {debug_mode: true});` });
  const events = async () => {
    const result = await evaluate(cdp, `Array.from(window.dataLayer || [], x => Array.from(x)).filter(x => x[0] === 'event')`);
    observedEvents.push(...result);
    return result;
  };
  const settle = () => delay(250);
  const snapshot = async label => {
    const state = await evaluate(cdp, `({ commands: Array.from(window.dataLayer || [], x => Array.from(x)).filter(x => ['js','config','event'].includes(x[0])), count: document.querySelector('[data-map-mvp]').dataset.completedMarkerCount, stored: JSON.parse(localStorage.getItem(${JSON.stringify(storageKey)}) || '[]') })`);
    check(state.commands.filter(x => x[0] === 'config').length === 1, label + ': one config');
    check(state.commands.filter(x => x[0] === 'js').length === 1, label + ': one js initialization');
    check(state.commands.filter(x => x[0] === 'event' && x[1] === 'tool_open').length === 1, label + ': one tool_open');
    return state;
  };
  await navigate(cdp, baseUrl + '/map/'); await settle();
  let state = await snapshot('normal open');
  check(state.commands.find(x=>x[1]==='tool_open')?.[2].progress_restore === 'empty', 'normal open has empty restoration status');
  check(state.commands.find(x=>x[1]==='tool_open')?.[2].load_state === 'ready', 'normal open reports ready');
  const privacyProbe = 'PRIVATE_SEARCH_DO_NOT_SEND';
  await evaluate(cdp, `(()=>{const s=document.querySelector('[data-marker-search]');s.value=${JSON.stringify(privacyProbe)};s.dispatchEvent(new Event('input',{bubbles:true}));s.dispatchEvent(new Event('change',{bubbles:true}));})()`); await settle();
  let ev = await events();
  check(ev.filter(x=>x[1]==='tool_input_change').length===1, 'one search action emits once');
  check(ev.find(x=>x[1]==='tool_input_change')?.[2].result_count===0, 'no-match search reports zero results');
  check(!JSON.stringify(ev).includes(privacyProbe), 'raw search text absent');
  await evaluate(cdp, `document.querySelector('[data-map-action="clear-search"]').click()`); await settle();
  await evaluate(cdp, `document.querySelector('[data-category-filter]').click()`); await settle();
  ev=await events();
  check(ev.filter(x=>x[1]==='tool_input_change'&&x[2].input_name==='category').length===1,'one filter action emits once');
  await evaluate(cdp, `document.querySelector('[data-category-filter]').click()`); await settle();
  await evaluate(cdp, `document.querySelector(${JSON.stringify('[data-marker-id="'+marker.id+'"]')}).click()`); await settle();
  ev=await events();
  check(ev.filter(x=>x[1]==='tool_result_generated').length===1,'one manual selection emits once');
  check(ev.find(x=>x[1]==='tool_result_generated')?.[2].selection_origin==='manual','manual selection distinguished');
  await evaluate(cdp, `document.querySelector('[data-map-action="toggle-completed"]').click()`); await settle();
  state=await snapshot('completed');ev=await events();
  let completions=ev.filter(x=>x[1]==='map_marker_completed');
  check(completions.length===1&&completions[0][2].completed===true&&completions[0][2].persisted===true,'completion saved once with true/true');
  check(state.stored.includes(marker.id)&&state.count==='1','progress actually saved');
  await navigate(cdp, baseUrl+'/map/?marker='+encodeURIComponent(marker.id)); await settle();
  state=await snapshot('restored deep link');ev=await events();
  check(ev.find(x=>x[1]==='tool_open')?.[2].progress_restore==='restored','reload reports restored progress');
  check(ev.filter(x=>x[1]==='tool_result_generated').length===1&&ev.find(x=>x[1]==='tool_result_generated')?.[2].selection_origin==='deeplink','automatic selection distinguished and emitted once');
  check(state.count==='1','reload retains progress');
  await evaluate(cdp, `document.querySelector('[data-map-action="toggle-completed"]').click()`); await settle();
  ev=await events();completions=ev.filter(x=>x[1]==='map_marker_completed');
  check(completions.length===1&&completions[0][2].completed===false&&completions[0][2].persisted===true,'unmark explicitly false and saved');
  // Fault injection is confined to this disposable browser, below the real save function.
  await evaluate(cdp, `Storage.prototype.setItem=function(){throw new DOMException('TEST storage blocked','QuotaExceededError')}`);
  await evaluate(cdp, `document.querySelector('[data-map-action="toggle-completed"]').click()`); await settle();
  ev=await events();completions=ev.filter(x=>x[1]==='map_marker_completed');
  check(completions.length===2&&completions[1][2].completed===true&&completions[1][2].persisted===false,'failed persistence never reports saved completion');
  check(await evaluate(cdp, `localStorage.getItem(${JSON.stringify(storageKey)})===null`),'failed write does not create saved state');
  if (!remoteBaseUrl) {
    await cdp.send('Network.setBlockedURLs', { urls: ['*googletagmanager.com*', '*google-analytics.com*', '*data/map/chests*'] });
    await navigate(cdp, baseUrl + '/map/?marker=marker:chest:orbis-castle-approach:02'); await settle();
    ev = await events();
    check(ev.find(x=>x[1]==='tool_open')?.[2].load_state==='failed', 'known chest load failure reports failed initialization');
    await cdp.send('Network.setBlockedURLs', { urls: ['*googletagmanager.com*', '*google-analytics.com*'] });
  }
  const readFailure=await cdp.send('Page.addScriptToEvaluateOnNewDocument',{source:`Storage.prototype.getItem=function(){throw new Error('TEST read unavailable')}`});
  await navigate(cdp,baseUrl+'/map/');await settle();ev=await events();
  check(ev.find(x=>x[1]==='tool_open')?.[2].progress_restore==='failed','unavailable storage reports restore failure');
  await cdp.send('Page.removeScriptToEvaluateOnNewDocument',{identifier:readFailure.identifier});
  // Final clean page for no-regression and collection receipt checks.
  await navigate(cdp,baseUrl+'/map/');await settle();
  check(await evaluate(cdp, `!document.querySelector('[data-marker-panel]').hidden`),'default detail remains usable');
  check(runtimeErrors.length===0,'no runtime exceptions');
  const allowed = ['tool_name','page_path','progress_restore','load_state','input_name','input_value','enabled','result_count','selection_origin','marker_category','completed','persisted','reset_scope'];
  check(observedEvents.every(x=>Object.keys(x[2]).every(k=>allowed.includes(k))),'no unnecessary ID/coordinate/freeform event parameters');
  check(!JSON.stringify(observedEvents).includes(privacyProbe), 'all captured event payloads exclude raw search text');
  if(remoteBaseUrl){
    const expected = { tool_open: 4, tool_input_change: 3, tool_result_generated: 2, map_marker_completed: 3 };
    for (let i=0;i<30&&!Object.entries(expected).every(([name,count])=>collections.filter(c=>c.event===name&&responses.some(r=>r.requestId===c.requestId&&r.status>=200&&r.status<300)).length>=count);i++) await delay(1000);
    for (const [name,count] of Object.entries(expected)) check(collections.filter(c=>c.event===name).length===count, name+': no duplicate transport events across controlled actions');
    check(collections.filter(c=>c.event!=='page_view').every(c=>c.debug==='1'), 'controlled custom transport events marked debug');
    for(const name of ['page_view','tool_open','tool_input_change','tool_result_generated','map_marker_completed'])check(collections.some(c=>c.event===name&&responses.some(r=>r.requestId===c.requestId&&r.status>=200&&r.status<300)),name+': Google collection endpoint accepted controlled request');
  }
  const result={kind:'TEST_VALIDATION_ONLY',baseUrl,at:new Date().toISOString(),checks,failures,runtimeErrors,collections:collections.map(({requestId,...c})=>({...c,status:responses.find(r=>r.requestId===requestId)?.status})),organicUsageClaim:false};
  if(process.env.MAP_MEASUREMENT_REPORT)fs.writeFileSync(process.env.MAP_MEASUREMENT_REPORT,JSON.stringify(result,null,2)+'\n');
  console.log(JSON.stringify(result,null,2));
  if(failures.length)process.exitCode=1;
}catch(error){console.error(error);process.exitCode=1;}
finally{cdp?.close();preview?.kill('SIGTERM');chrome.kill('SIGTERM');await Promise.all([preview?waitForExit(preview):Promise.resolve(),waitForExit(chrome)]);fs.rmSync(profile,{recursive:true,force:true,maxRetries:5,retryDelay:100});}
