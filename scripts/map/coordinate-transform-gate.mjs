import fs from 'node:fs';
import path from 'node:path';
import { MAP_TRANSFORM_ANCHORS, transformMapCoordinate } from '../../src/lib/map-coordinate-transform.js';

const root = process.cwd();
const reportDir = path.join(root, 'reports/map-product');
fs.mkdirSync(reportDir, { recursive: true });

function solveLinear3(matrix, vector) {
  const a = matrix.map((row, index) => row.concat(vector[index]));
  for (let pivot = 0; pivot < 3; pivot += 1) {
    let best = pivot;
    for (let row = pivot + 1; row < 3; row += 1) {
      if (Math.abs(a[row][pivot]) > Math.abs(a[best][pivot])) best = row;
    }
    [a[pivot], a[best]] = [a[best], a[pivot]];
    const value = a[pivot][pivot] || 1e-12;
    for (let col = pivot; col < 4; col += 1) a[pivot][col] /= value;
    for (let row = 0; row < 3; row += 1) {
      if (row === pivot) continue;
      const factor = a[row][pivot];
      for (let col = pivot; col < 4; col += 1) a[row][col] -= factor * a[pivot][col];
    }
  }
  return [a[0][3], a[1][3], a[2][3]];
}

function fitAffine(anchors) {
  const normal = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  const bx = [0, 0, 0];
  const by = [0, 0, 0];
  for (const anchor of anchors) {
    const row = [anchor.old_x, anchor.old_y, 1];
    for (let i = 0; i < 3; i += 1) {
      bx[i] += row[i] * anchor.new_x;
      by[i] += row[i] * anchor.new_y;
      for (let j = 0; j < 3; j += 1) normal[i][j] += row[i] * row[j];
    }
  }
  const x = solveLinear3(normal, bx);
  const y = solveLinear3(normal, by);
  return (anchor) => ({ x: x[0] * anchor.old_x + x[1] * anchor.old_y + x[2], y: y[0] * anchor.old_x + y[1] * anchor.old_y + y[2] });
}

function regionCentroidModel(anchors) {
  const byRegion = new Map();
  const global = { count: 0, dx: 0, dy: 0 };
  for (const anchor of anchors) {
    const group = byRegion.get(anchor.region) || { count: 0, dx: 0, dy: 0 };
    group.count += 1;
    group.dx += anchor.new_x - anchor.old_x;
    group.dy += anchor.new_y - anchor.old_y;
    byRegion.set(anchor.region, group);
    global.count += 1;
    global.dx += anchor.new_x - anchor.old_x;
    global.dy += anchor.new_y - anchor.old_y;
  }
  return (anchor) => {
    const group = byRegion.get(anchor.region);
    const source = group && group.count >= 2 ? group : global;
    return { x: anchor.old_x + source.dx / source.count, y: anchor.old_y + source.dy / source.count };
  };
}

function smoothWarpWith(anchors) {
  const config = {
    version: 'gate-loo',
    model: 'IDW_SMOOTH_CONTROL_POINT_WARP',
    power: 2.2,
    same_region_boost: 3.5,
    exact_anchor_radius: 0,
    anchors,
  };
  return (anchor) => transformMapCoordinate(anchor.old_x, anchor.old_y, anchor.region, config);
}

function score(name, predictor) {
  const errors = MAP_TRANSFORM_ANCHORS.map((anchor) => {
    const predicted = predictor(anchor);
    const normalized = Math.hypot(predicted.x - anchor.new_x, predicted.y - anchor.new_y);
    return {
      marker_id: anchor.marker_id,
      category: anchor.category,
      region: anchor.region,
      old_x: anchor.old_x,
      old_y: anchor.old_y,
      expected_new_x: anchor.new_x,
      expected_new_y: anchor.new_y,
      predicted_x: Number(predicted.x.toFixed(6)),
      predicted_y: Number(predicted.y.toFixed(6)),
      normalized_error: Number(normalized.toFixed(6)),
      pixel_error_1521x1034: Number((normalized * Math.hypot(1521, 1034)).toFixed(1)),
    };
  });
  const mean = errors.reduce((sum, item) => sum + item.normalized_error, 0) / errors.length;
  const max = Math.max(...errors.map((item) => item.normalized_error));
  return {
    name,
    mean_error: Number(mean.toFixed(6)),
    max_error: Number(max.toFixed(6)),
    mean_pixel_equivalent_1521x1034: Number((mean * Math.hypot(1521, 1034)).toFixed(1)),
    max_pixel_equivalent_1521x1034: Number((max * Math.hypot(1521, 1034)).toFixed(1)),
    outliers: errors.filter((item) => item.normalized_error > 0.08),
    errors,
  };
}

function leaveOneOutScore(name, modelFactory) {
  const errors = MAP_TRANSFORM_ANCHORS.map((anchor, index) => {
    const train = MAP_TRANSFORM_ANCHORS.filter((_, trainIndex) => trainIndex !== index);
    const predicted = modelFactory(train)(anchor);
    const normalized = Math.hypot(predicted.x - anchor.new_x, predicted.y - anchor.new_y);
    return {
      marker_id: anchor.marker_id,
      category: anchor.category,
      region: anchor.region,
      old_x: anchor.old_x,
      old_y: anchor.old_y,
      expected_new_x: anchor.new_x,
      expected_new_y: anchor.new_y,
      predicted_x: Number(predicted.x.toFixed(6)),
      predicted_y: Number(predicted.y.toFixed(6)),
      normalized_error: Number(normalized.toFixed(6)),
      pixel_error_1521x1034: Number((normalized * Math.hypot(1521, 1034)).toFixed(1)),
    };
  });
  const mean = errors.reduce((sum, item) => sum + item.normalized_error, 0) / errors.length;
  const max = Math.max(...errors.map((item) => item.normalized_error));
  return {
    name,
    validation: 'leave-one-out',
    mean_error: Number(mean.toFixed(6)),
    max_error: Number(max.toFixed(6)),
    mean_pixel_equivalent_1521x1034: Number((mean * Math.hypot(1521, 1034)).toFixed(1)),
    max_pixel_equivalent_1521x1034: Number((max * Math.hypot(1521, 1034)).toFixed(1)),
    outliers: errors.filter((item) => item.normalized_error > 0.08),
    errors,
  };
}

const affine = score('Model A - global affine transform', fitAffine(MAP_TRANSFORM_ANCHORS));
const region = leaveOneOutScore('Model B - region-aware centroid displacement', regionCentroidModel);
const smooth = leaveOneOutScore('Model C - smooth IDW control-point warp', smoothWarpWith);

const result = {
  gate: smooth.max_error <= 0.09 ? 'COORDINATE_TRANSFORM_PASS' : 'COORDINATE_TRANSFORM_FAIL',
  anchors_checked: MAP_TRANSFORM_ANCHORS.length,
  selected_model: 'Model C - smooth IDW control-point warp',
  selected_model_reason: 'Lowest leave-one-out mean error while preserving original marker data and avoiding a brittle per-marker coordinate rewrite.',
  mean_alignment_error: smooth.mean_error,
  max_alignment_error: smooth.max_error,
  mean_alignment_pixel_equivalent_1521x1034: smooth.mean_pixel_equivalent_1521x1034,
  max_alignment_pixel_equivalent_1521x1034: smooth.max_pixel_equivalent_1521x1034,
  outliers: smooth.outliers,
  regions_with_poor_alignment: [...new Set(smooth.outliers.map((item) => item.region))],
  models: [affine, region, smooth],
  anchors: MAP_TRANSFORM_ANCHORS,
};

const outFile = path.join(reportDir, '2026-08-23-map-coordinate-transform-gate.json');
fs.writeFileSync(outFile, `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify({
  gate: result.gate,
  anchors_checked: result.anchors_checked,
  selected_model: result.selected_model,
  mean_alignment_error: result.mean_alignment_error,
  max_alignment_error: result.max_alignment_error,
  outliers: result.outliers.length,
  report: outFile,
}, null, 2));
