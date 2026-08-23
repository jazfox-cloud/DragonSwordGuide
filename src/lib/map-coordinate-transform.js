export const MAP_BASE_LAYER = {
  id: 'ORIGINAL_ORBIS_RASTER_BASE_MAP_V2',
  src: '/map/base-map-candidate-v2.webp',
  fallback_src: '/map/base-map-candidate-v2.png',
  width: 1521,
  height: 1034,
  previous_id: 'OWN_SCHEMATIC_ORBIS_BASE_MAP',
  previous_width: 1600,
  previous_height: 1088,
};

export const MAP_TRANSFORM_ANCHORS = [
  { marker_id: 'marker:chest:north-skyridge:001', category: 'CHEST', region: 'North Skyridge', old_x: 0.304173, old_y: 0.134867, new_x: 0.43, new_y: 0.13, expected_area: 'northern snow ridge and high mountains', confidence: 'MEDIUM' },
  { marker_id: 'marker:chest:north-skyridge:007', category: 'CHEST', region: 'North Skyridge', old_x: 0.290119, old_y: 0.125298, new_x: 0.41, new_y: 0.12, expected_area: 'northern snow ridge and high mountains', confidence: 'MEDIUM' },
  { marker_id: 'marker:chest:north-skyridge:013', category: 'CHEST', region: 'North Skyridge', old_x: 0.284282, old_y: 0.214155, new_x: 0.4, new_y: 0.2, expected_area: 'southern foot of North Skyridge', confidence: 'MEDIUM' },
  { marker_id: 'marker:chest:skyridge-uplands:01', category: 'CHEST', region: 'Skyridge Uplands', old_x: 0.27573, old_y: 0.288336, new_x: 0.35, new_y: 0.26, expected_area: 'northwest upland approach below the snow ridge', confidence: 'MEDIUM' },
  { marker_id: 'marker:chest:west-skyridge:001', category: 'CHEST', region: 'West Skyridge', old_x: 0.29792, old_y: 0.421636, new_x: 0.29, new_y: 0.36, expected_area: 'western highland forest edge', confidence: 'MEDIUM' },
  { marker_id: 'marker:chest:shadowed-woods:01', category: 'CHEST', region: 'Shadowed Woods', old_x: 0.555573, old_y: 0.347353, new_x: 0.48, new_y: 0.34, expected_area: 'central-north forest and wetlands', confidence: 'MEDIUM' },
  { marker_id: 'marker:chest:shadowed-woods:50', category: 'CHEST', region: 'Shadowed Woods', old_x: 0.505424, old_y: 0.272431, new_x: 0.45, new_y: 0.3, expected_area: 'central-north forest and wetlands', confidence: 'MEDIUM' },
  { marker_id: 'marker:chest:shadowed-woodlands-east:001', category: 'CHEST', region: 'Shadowed Woodlands East', old_x: 0.631039, old_y: 0.247862, new_x: 0.61, new_y: 0.27, expected_area: 'eastern side of the northern woodland basin', confidence: 'MEDIUM' },
  { marker_id: 'marker:chest:meadow-west:001', category: 'CHEST', region: 'Meadow West', old_x: 0.216739, old_y: 0.662233, new_x: 0.2, new_y: 0.58, expected_area: 'western coastal meadow and island edge', confidence: 'MEDIUM' },
  { marker_id: 'marker:chest:meadow-of-beginnings:01', category: 'CHEST', region: 'Meadow of Beginnings', old_x: 0.310459, old_y: 0.550761, new_x: 0.3, new_y: 0.47, expected_area: 'western green starting meadow', confidence: 'MEDIUM' },
  { marker_id: 'marker:chest:meadow-east:001', category: 'CHEST', region: 'Meadow East', old_x: 0.39376, old_y: 0.604071, new_x: 0.38, new_y: 0.54, expected_area: 'east side of the western meadow', confidence: 'MEDIUM' },
  { marker_id: 'marker:chest:central-orbis:001', category: 'CHEST', region: 'Central Orbis', old_x: 0.57012, old_y: 0.488996, new_x: 0.56, new_y: 0.46, expected_area: 'central lake and city corridor', confidence: 'MEDIUM' },
  { marker_id: 'marker:chest:central-orbis:075', category: 'CHEST', region: 'Central Orbis', old_x: 0.365252, old_y: 0.454201, new_x: 0.39, new_y: 0.43, expected_area: 'western approach to central Orbis', confidence: 'MEDIUM' },
  { marker_id: 'marker:chest:orbis-castle-approach:01', category: 'CHEST', region: 'Orbis Castle Approach', old_x: 0.491073, old_y: 0.511309, new_x: 0.51, new_y: 0.48, expected_area: 'central castle approach and crossroads', confidence: 'MEDIUM' },
  { marker_id: 'marker:chest:orbis-castle-approach:091', category: 'CHEST', region: 'Orbis Castle Approach', old_x: 0.524003, old_y: 0.32913, new_x: 0.54, new_y: 0.31, expected_area: 'north approach to central castle area', confidence: 'MEDIUM' },
  { marker_id: 'marker:chest:misty-veil-highlands:01', category: 'CHEST', region: 'Misty Veil Highlands', old_x: 0.638381, old_y: 0.284254, new_x: 0.66, new_y: 0.24, expected_area: 'northern highland foothills', confidence: 'MEDIUM' },
  { marker_id: 'marker:chest:eastern-highlands:01', category: 'CHEST', region: 'Eastern Highlands', old_x: 0.706475, old_y: 0.456448, new_x: 0.78, new_y: 0.45, expected_area: 'eastern mountain foothills', confidence: 'MEDIUM' },
  { marker_id: 'marker:chest:eastern-highlands:50', category: 'CHEST', region: 'Eastern Highlands', old_x: 0.796928, old_y: 0.478097, new_x: 0.86, new_y: 0.48, expected_area: 'far eastern mountain coast', confidence: 'MEDIUM' },
  { marker_id: 'marker:chest:field-west:001', category: 'CHEST', region: 'Field West', old_x: 0.2895, old_y: 0.798631, new_x: 0.31, new_y: 0.77, expected_area: 'southwest low fields and coastal flats', confidence: 'MEDIUM' },
  { marker_id: 'marker:chest:field-of-plenty:01', category: 'CHEST', region: 'Field of Plenty', old_x: 0.428546, old_y: 0.677075, new_x: 0.45, new_y: 0.65, expected_area: 'southern central fields', confidence: 'MEDIUM' },
  { marker_id: 'marker:chest:field-east:001', category: 'CHEST', region: 'Field East', old_x: 0.587607, old_y: 0.714125, new_x: 0.58, new_y: 0.7, expected_area: 'southeast field and dry basin edge', confidence: 'MEDIUM' },
  { marker_id: 'marker:chest:dragonrise-west:001', category: 'CHEST', region: 'Dragonrise West', old_x: 0.569355, old_y: 0.544473, new_x: 0.62, new_y: 0.58, expected_area: 'western Dragonrise transition', confidence: 'MEDIUM' },
  { marker_id: 'marker:chest:dragonrise-basin:01', category: 'CHEST', region: 'Dragonrise Basin', old_x: 0.761602, old_y: 0.546666, new_x: 0.8, new_y: 0.61, expected_area: 'eastern Dragonrise basin below mountains', confidence: 'MEDIUM' },
  { marker_id: 'marker:chest:dragonrise-basin:50', category: 'CHEST', region: 'Dragonrise Basin', old_x: 0.626339, old_y: 0.547498, new_x: 0.66, new_y: 0.6, expected_area: 'central Dragonrise basin', confidence: 'MEDIUM' },
  { marker_id: 'marker:chest:dragonrise-east:001', category: 'CHEST', region: 'Dragonrise East', old_x: 0.816577, old_y: 0.668258, new_x: 0.83, new_y: 0.71, expected_area: 'southeast Dragonrise coast', confidence: 'MEDIUM' },
  { marker_id: 'marker:chest:southwest-lowlands:001', category: 'CHEST', region: 'Southwest Lowlands', old_x: 0.246565, old_y: 0.801505, new_x: 0.24, new_y: 0.82, expected_area: 'southwest island lowlands', confidence: 'MEDIUM' },
  { marker_id: 'marker:chest:southeast-coast:001', category: 'CHEST', region: 'Southeast Coast', old_x: 0.727882, old_y: 0.737148, new_x: 0.75, new_y: 0.79, expected_area: 'southeast coast and island chain', confidence: 'MEDIUM' },
  { marker_id: 'marker:eonas-legacy:meadow-of-beginnings', category: 'EONAS_LEGACY', region: 'Meadow of Beginnings', old_x: 0.29, old_y: 0.55, new_x: 0.28, new_y: 0.47, expected_area: 'western green starting meadow', confidence: 'MEDIUM' },
  { marker_id: 'marker:eonas-legacy:shadowed-woods', category: 'EONAS_LEGACY', region: 'Shadowed Woods', old_x: 0.56, old_y: 0.42, new_x: 0.49, new_y: 0.4, expected_area: 'central woodland and wetland route', confidence: 'MEDIUM' },
  { marker_id: 'marker:eonas-legacy:dragonrise-basin', category: 'EONAS_LEGACY', region: 'Dragonrise Basin', old_x: 0.68, old_y: 0.58, new_x: 0.7, new_y: 0.63, expected_area: 'Dragonrise basin route', confidence: 'MEDIUM' },
  { marker_id: 'marker:warp-point:seagull-village', category: 'WARP_POINT', region: 'Seagull Village', old_x: 0.18, old_y: 0.58, new_x: 0.14, new_y: 0.54, expected_area: 'far western coast', confidence: 'MEDIUM' },
  { marker_id: 'marker:warp-point:twilight-field', category: 'WARP_POINT', region: 'Twilight Field', old_x: 0.31, old_y: 0.24, new_x: 0.37, new_y: 0.22, expected_area: 'northwest upland field', confidence: 'MEDIUM' },
  { marker_id: 'marker:warp-point:orbis-royal-castle', category: 'WARP_POINT', region: 'Orbis Castle', old_x: 0.49, old_y: 0.56, new_x: 0.52, new_y: 0.5, expected_area: 'central castle crossroads', confidence: 'MEDIUM' },
  { marker_id: 'marker:warp-point:amber-harbor', category: 'WARP_POINT', region: 'Amber Harbor', old_x: 0.67, old_y: 0.74, new_x: 0.68, new_y: 0.8, expected_area: 'southern harbor and coast', confidence: 'MEDIUM' },
  { marker_id: 'marker:warp-point:dragons-stonepeak', category: 'WARP_POINT', region: "Dragon's Stonepeak", old_x: 0.72, old_y: 0.34, new_x: 0.78, new_y: 0.33, expected_area: 'eastern stone peak ridge', confidence: 'MEDIUM' },
  { marker_id: 'marker:dungeon:dragon-worshipper-ruins', category: 'DUNGEON', region: 'Meadow of Beginnings', old_x: 0.24, old_y: 0.58, new_x: 0.23, new_y: 0.5, expected_area: 'western meadow ruins', confidence: 'MEDIUM' },
  { marker_id: 'marker:dungeon:fang-bandits-arena', category: 'DUNGEON', region: 'Orbis Castle Approach', old_x: 0.39, old_y: 0.45, new_x: 0.42, new_y: 0.42, expected_area: 'central-west castle approach', confidence: 'MEDIUM' },
  { marker_id: 'marker:dungeon:eroded-underground-cemetery', category: 'DUNGEON', region: 'Misty Veil Highlands', old_x: 0.53, old_y: 0.25, new_x: 0.55, new_y: 0.23, expected_area: 'northern misty highlands', confidence: 'MEDIUM' },
  { marker_id: 'marker:dungeon:trace-of-the-giant', category: 'DUNGEON', region: 'Dragonrise Basin', old_x: 0.73, old_y: 0.32, new_x: 0.78, new_y: 0.32, expected_area: 'eastern mountain giant route', confidence: 'MEDIUM' },
  { marker_id: 'marker:dungeon:ashen-ruins', category: 'DUNGEON', region: 'Moss Forest Logging Site', old_x: 0.78, old_y: 0.66, new_x: 0.81, new_y: 0.7, expected_area: 'southeast rugged ruins', confidence: 'MEDIUM' },
  { marker_id: 'marker:organa-statue:seagull-village', category: 'ORGANA_STATUE', region: 'Seagull Village', old_x: 0.18, old_y: 0.58, new_x: 0.14, new_y: 0.54, expected_area: 'far western coast', confidence: 'MEDIUM' },
  { marker_id: 'marker:organa-statue:skyfeather-ridge', category: 'ORGANA_STATUE', region: 'Skyfeather Ridge', old_x: 0.71, old_y: 0.24, new_x: 0.74, new_y: 0.2, expected_area: 'north-eastern ridge', confidence: 'MEDIUM' },
  { marker_id: 'marker:organa-statue:hill-of-journey', category: 'ORGANA_STATUE', region: 'Hill of Journey', old_x: 0.41, old_y: 0.74, new_x: 0.42, new_y: 0.73, expected_area: 'southwestern field hill', confidence: 'MEDIUM' },
  { marker_id: 'marker:boss:hagen-the-dark-necromancer', category: 'BOSS', region: 'Ruined Temple', old_x: 0.6, old_y: 0.28, new_x: 0.62, new_y: 0.25, expected_area: 'northern ruined temple ridge', confidence: 'MEDIUM' },
  { marker_id: 'marker:boss:karon-the-tyrant', category: 'BOSS', region: "Dragon's Stonepeak", old_x: 0.75, old_y: 0.42, new_x: 0.81, new_y: 0.43, expected_area: 'eastern stone peak ridge', confidence: 'MEDIUM' },
  { marker_id: 'marker:boss:barpedin-the-crushing-darkness', category: 'BOSS', region: 'A Forgotten Haven', old_x: 0.24, old_y: 0.74, new_x: 0.22, new_y: 0.75, expected_area: 'southwest island haven', confidence: 'MEDIUM' },
  { marker_id: 'marker:boss:hungry-eyes-octavia', category: 'BOSS', region: 'Starshade Forest', old_x: 0.78, old_y: 0.52, new_x: 0.82, new_y: 0.55, expected_area: 'eastern forest and mountain edge', confidence: 'MEDIUM' },
];

export const MAP_TRANSFORM_CONFIG = {
  version: 'base-map-candidate-v2-control-warp-2026-08-23',
  model: 'IDW_SMOOTH_CONTROL_POINT_WARP',
  power: 2.2,
  same_region_boost: 3.5,
  exact_anchor_radius: 0.000001,
  anchors: MAP_TRANSFORM_ANCHORS,
};

function clamp01(value) {
  return Math.min(1, Math.max(0, Number(value) || 0));
}

export function transformMapCoordinate(x, y, regionId = '', config = MAP_TRANSFORM_CONFIG) {
  const sourceX = clamp01(x);
  const sourceY = clamp01(y);
  let totalWeight = 0;
  let dx = 0;
  let dy = 0;

  for (const anchor of config.anchors) {
    const distance = Math.hypot(sourceX - anchor.old_x, sourceY - anchor.old_y);
    if (distance <= config.exact_anchor_radius) {
      return { x: clamp01(anchor.new_x), y: clamp01(anchor.new_y) };
    }
    const regionBoost = regionId && anchor.region === regionId ? config.same_region_boost : 1;
    const weight = regionBoost / Math.pow(distance + 0.025, config.power);
    totalWeight += weight;
    dx += (anchor.new_x - anchor.old_x) * weight;
    dy += (anchor.new_y - anchor.old_y) * weight;
  }

  return {
    x: clamp01(sourceX + dx / totalWeight),
    y: clamp01(sourceY + dy / totalWeight),
  };
}
