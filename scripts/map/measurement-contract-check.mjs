import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

// Exercise the built initialization and real Map caller together, without a fake gtag.
const html = fs.readFileSync('dist/map/index.html', 'utf8');
const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)];
const initializers = scripts.filter(([, , body]) => body.includes("gtag('config', ga4Id)"));
assert.equal(initializers.length, 1, 'Build with PUBLIC_GA4_ID: exactly one analytics initializer is required');
const mapScript = scripts.find(([, , body]) => body.includes('function trackToolEvent'))?.[2];
const helper = mapScript?.match(/function trackToolEvent\([\s\S]*?\n      }/)?.[0];
assert.ok(helper, 'real Map event helper must be present');
const context = vm.createContext({ location: { pathname: '/map/' } });
vm.runInContext('window = globalThis', context);
vm.runInContext(initializers[0][2], context);
const commands = () => Array.from(context.dataLayer, (entry) => Array.from(entry));
assert.equal(commands().filter(([name]) => name === 'js').length, 1);
assert.equal(commands().filter(([name]) => name === 'config').length, 1);
assert.equal(commands().find(([name]) => name === 'config').length, 2, 'preserve default automatic page_view config');
console.log('Initialization queued js/config once; automatic page_view configuration preserved.');
vm.runInContext(helper + "\ntrackToolEvent('tool_input_change', { input_name: 'search' });", context);
assert.equal(commands().filter(([name]) => name === 'event').length, 1, 'Map event was dropped before reaching the configured dataLayer');
assert.equal(commands().at(-1)[1], 'tool_input_change');
assert.equal(commands().at(-1)[2].input_name, 'search');
assert.equal(commands().filter(([name]) => name === 'config').length, 1, 'dispatch must not reinitialize analytics');
console.log('PASS: real Map dispatch reaches the same initialized analytics command path.');
