import Weapon from '../model/weapon.model.js';

function parseBoolean(value) {
  if (typeof value === 'boolean') return value;
  const normalized = String(value || '').trim().toLowerCase();
  return ['1', 'true', 'yes', 'on'].includes(normalized);
}

function parseActionUses(value) {
  const raw = String(value ?? '').trim();
  if (raw === '') return '';
  if (raw === '-') return '-';
  const num = Number(raw);
  return Number.isNaN(num) ? raw : num;
}

function parseSpiritCommand(row) {
  return {
    name: row.spiritCommandName || row.spiritCommand?.name || '',
    uses: parseActionUses(row.spiritCommandUses ?? row.spiritCommand?.uses),
    description: row.spiritCommandDescription || row.spiritCommand?.description || '',
  };
}

function parseEffectList(value) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item || '').trim()).filter(Boolean);
  }

  return String(value || '')
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseRank(value) {
  const rank = String(value || '').trim().toUpperCase();
  if (!rank) return '';
  return ['S', 'A', 'B', 'C', 'D'].includes(rank) ? rank : '';
}

function parseUnitIds(row) {
  const source = row.unitIds ?? row.unitId ?? row.units ?? '';
  if (Array.isArray(source)) {
    return source.map((item) => String(item || '').trim()).filter(Boolean);
  }

  return String(source || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

export function parseUnitPartRow(row) {
  const isSupportCategory = parseBoolean(row.isSupportCategory ?? row.supportCategory ?? row.isSupport);

  return {
    id: row.id || '',
    name: row.name || '',
    unitId: row.unitId || '',
    unitIds: parseUnitIds(row),
    pilotId: row.pilotId || '',
    rarity: row.rarity || '',
    isSupportCategory,
    type: isSupportCategory ? '' : row.type || '',
    hp: Number(row.hp || 0),
    attack: Number(row.attack || 0),
    defense: Number(row.defense || 0),
    accuracy: Number(row.accuracy || 0),
    mobility: Number(row.mobility || 0),
    trait: Number(row.trait || 0),
    power: isSupportCategory ? 0 : Number(row.power || 0),
    hitRate: isSupportCategory ? 0 : Number(row.hitRate || 0),
    range: {
      min: isSupportCategory ? 0 : Number(row.rangeMin || row.range?.min || 0),
      max: isSupportCategory ? 0 : Number(row.rangeMax || row.range?.max || 0),
    },
    terrain: {
      air: parseRank(row.terrainAir || row.terrain?.air),
      land: parseRank(row.terrainLand || row.terrain?.land),
      sea: parseRank(row.terrainSea || row.terrain?.sea),
      space: parseRank(row.terrainSpace || row.terrain?.space),
    },
    map: {
      enabled: parseBoolean(row.mapEnabled || row.map?.enabled),
      label: row.mapLabel || row.map?.label || '',
      image: row.mapImage || row.map?.image || '',
      target: row.mapTarget || row.map?.target || '',
      areaType: row.mapAreaType || row.map?.areaType || '',
    },
    action: isSupportCategory ? '' : parseActionUses(row.action),
    uses: isSupportCategory ? '' : parseActionUses(row.uses),
    spiritCommand: parseSpiritCommand(row),
    main: {
      name: row.mainName || row.main?.name || '',
      description: row.mainDescription || row.main?.description || '',
      effect: parseEffectList(row.mainEffect || row.main?.effect),
    },
    finisherSlot: {
      name: row.finisherName || row.finisherSlot?.name || '',
      description: row.finisherDescription || row.finisherSlot?.description || '',
      effect: parseEffectList(row.finisherEffect || row.finisherSlot?.effect),
    },
    subSlot: {
      name: row.subName || row.subSlot?.name || '',
      description: row.subDescription || row.subSlot?.description || '',
      effect: parseEffectList(row.subEffect || row.subSlot?.effect),
    },
  };
}

export function buildUnitPart(row) {
  return new Weapon({ data: parseUnitPartRow(row) });
}

export function flattenUnitPartForCSV(item) {
  const part = item.data || item;
  const spiritCommand = part.spiritCommand || {};
  return {
    id: part.id || '',
    name: part.name || '',
    unitId: part.unitId || '',
    unitIds: Array.isArray(part.unitIds) ? part.unitIds.join(',') : '',
    pilotId: part.pilotId || '',
    rarity: part.rarity || '',
    isSupportCategory: part.isSupportCategory ? 'true' : '',
    type: part.isSupportCategory ? '' : part.type || '',
    hp: part.hp || 0,
    attack: part.attack || 0,
    defense: part.defense || 0,
    accuracy: part.accuracy || 0,
    mobility: part.mobility || 0,
    trait: part.trait || 0,
    power: part.isSupportCategory ? '' : part.power || 0,
    hitRate: part.isSupportCategory ? '' : part.hitRate || 0,
    rangeMin: part.isSupportCategory ? '' : part.range?.min || 0,
    rangeMax: part.isSupportCategory ? '' : part.range?.max || 0,
    terrainAir: part.terrain?.air || '',
    terrainLand: part.terrain?.land || '',
    terrainSea: part.terrain?.sea || '',
    terrainSpace: part.terrain?.space || '',
    mapEnabled: part.map?.enabled ? 'true' : '',
    mapLabel: part.map?.label || '',
    mapTarget: part.map?.target || '',
    mapAreaType: part.map?.areaType || '',
    action: part.isSupportCategory ? '' : part.action ?? '',
    uses: part.isSupportCategory ? '' : part.uses ?? '',
    spiritCommandName: spiritCommand.name || '',
    spiritCommandUses: spiritCommand.uses ?? '',
    spiritCommandDescription: spiritCommand.description || '',
    mainName: part.main?.name || '',
    mainDescription: part.main?.description || '',
    mainEffect: Array.isArray(part.main?.effect) ? part.main.effect.join('\n') : '',
    finisherName: part.finisherSlot?.name || '',
    finisherDescription: part.finisherSlot?.description || '',
    finisherEffect: Array.isArray(part.finisherSlot?.effect) ? part.finisherSlot.effect.join('\n') : '',
    subName: part.subSlot?.name || '',
    subDescription: part.subSlot?.description || '',
    subEffect: Array.isArray(part.subSlot?.effect) ? part.subSlot.effect.join('\n') : '',
  };
}