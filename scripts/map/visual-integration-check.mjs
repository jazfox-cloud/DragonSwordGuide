import fs from 'node:fs';
import path from 'node:path';
import { MAP_TRANSFORM_ANCHORS, transformMapCoordinate } from '../../src/lib/map-coordinate-transform.js';

const root = process.cwd();
const component = fs.readFileSync(path.join(root, 'src/components/InteractiveMap.astro'), 'utf8');

function assert(condition, message) {
  if (!condition) {
    console.error(`[map:visual-integration] ${message}`);
    process.exit(1);
  }
}

assert(component.includes('if (!Number.isFinite(totalWeight)) return { x: clamp01(sourceX + dx), y: clamp01(sourceY + dy) };'), 'client exact-anchor transform fallback is missing');
assert(component.includes('data-chest-render-limited') || component.includes('chestRenderLimited'), 'chest render limit must be observable');
assert(!component.includes('visibleChestMarkers.slice(0, 250)'), 'silent 250 chest cap still exists');
assert(component.includes('original_x: marker.x') && component.includes('original_y: marker.y'), 'chest original coordinates are not preserved in render layer');

const mismatches = [];
for (const anchor of MAP_TRANSFORM_ANCHORS) {
  const point = transformMapCoordinate(anchor.old_x, anchor.old_y, anchor.region);
  const distance = Math.hypot(point.x - anchor.new_x, point.y - anchor.new_y);
  if (distance > 0.000001) mismatches.push({ marker_id: anchor.marker_id, distance });
}

assert(mismatches.length === 0, `shared transform no longer maps anchors exactly: ${JSON.stringify(mismatches.slice(0, 5))}`);

const manifest = JSON.parse(fs.readFileSync(path.join(root, 'public/data/map/chests/manifest.json'), 'utf8'));
assert(manifest.total_published === 1484, `chest total changed: ${manifest.total_published}`);

const markerData = JSON.parse(fs.readFileSync(path.join(root, 'src/data/map-markers.json'), 'utf8'));
assert(markerData.markers.length === 71, `base marker total changed: ${markerData.markers.length}`);
assert(markerData.markers.length + manifest.total_published === 1555, 'total marker count changed');
assert(fs.existsSync(path.join(root, 'public/map/orbis-atlas-v1.svg')), 'rollback SVG is missing');
assert(fs.existsSync(path.join(root, 'public/map/base-map-candidate-v2.webp')), 'optimized WebP base map is missing');
assert(fs.existsSync(path.join(root, 'public/map/base-map-candidate-v2.png')), 'PNG fallback base map is missing');
assert(fs.statSync(path.join(root, 'public/map/base-map-candidate-v2.png')).size <= 1024 * 1024, 'PNG fallback base map exceeds 1 MiB');

console.log('[map:visual-integration] checks passed');
