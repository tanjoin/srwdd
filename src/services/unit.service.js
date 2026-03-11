import Unit from '../model/unit.model.js';

export function parseActionUses(value) {
  const raw = String(value ?? '').trim();
  if (raw === '') return '';
  if (raw === '-') return '-';
  const num = Number(raw);
  return Number.isNaN(num) ? raw : num;
}

export function parseUnitRow(row) {
  const terrainRank = (value) => {
    const rank = String(value || 'C').trim().toUpperCase();
    return ['S', 'A', 'B', 'C', 'D'].includes(rank) ? rank : 'C';
  };

  const parsedBaseHp = Number(row.baseHp ?? row.baseHP ?? row.hpBase ?? 0);
  const parsedPartsIncreaseHp = Number(row.partsIncreaseHp ?? row.partsHpIncrease ?? row.increaseHp ?? 0);
  const parsedHp = Number(row.hp || 0);
  const baseHp = parsedBaseHp || (parsedHp > 0 ? parsedHp : 0);
  const partsIncreaseHp = parsedPartsIncreaseHp || Math.max(parsedHp - baseHp, 0);
  const hp = parsedHp || (baseHp + partsIncreaseHp);

  return {
    id: row.id || '',
    name: row.name || '',
    pilotId: row.pilotId || '',
    size: row.size || '',
    type: row.type || '',
    hp,
    baseHp,
    partsIncreaseHp,
    attack: Number(row.attack || 0),
    defense: Number(row.defense || 0),
    accuracy: Number(row.accuracy || 0),
    mobility: Number(row.mobility || 0),
    movement: Number(row.movement || 0),
    speed: Number(row.speed || 0),
    specialAbility: {
      name: row.specialAbilityName || row.specialAbility?.name || '',
      effect: row.specialAbilityEffect || row.specialAbility?.effect || '',
    },
    terrain: {
      air: terrainRank(row.terrainAir || row.terrain?.air),
      land: terrainRank(row.terrainLand || row.terrain?.land),
      sea: terrainRank(row.terrainSea || row.terrain?.sea),
      space: terrainRank(row.terrainSpace || row.terrain?.space),
    },
    normalWeapon: {
      name: row.normalWeaponName || row.normalWeapon?.name || '',
      type: row.normalWeaponType || row.normalWeapon?.type || '',
      range: {
        min: Number(row.normalWeaponRangeMin || row.normalWeapon?.range?.min || 0),
        max: Number(row.normalWeaponRangeMax || row.normalWeapon?.range?.max || 0),
      },
      action: parseActionUses(row.normalWeaponAction ?? row.normalWeapon?.action),
      uses: parseActionUses(row.normalWeaponUses ?? row.normalWeapon?.uses),
    },
  };
}

export function buildUnit(row) {
  return new Unit({ data: parseUnitRow(row) });
}

export function flattenUnitForCSV(u) {
  const unit = u.data || u;
  return {
    id: unit.id || '',
    name: unit.name || '',
    pilotId: unit.pilotId || '',
    size: unit.size || '',
    type: unit.type || '',
    hp: unit.hp || 0,
    baseHp: unit.baseHp || 0,
    partsIncreaseHp: unit.partsIncreaseHp || 0,
    attack: unit.attack || 0,
    defense: unit.defense || 0,
    accuracy: unit.accuracy || 0,
    mobility: unit.mobility || 0,
    movement: unit.movement || 0,
    speed: unit.speed || 0,
    specialAbilityName: unit.specialAbility?.name || '',
    specialAbilityEffect: unit.specialAbility?.effect || '',
    terrainAir: unit.terrain?.air || 'C',
    terrainLand: unit.terrain?.land || 'C',
    terrainSea: unit.terrain?.sea || 'C',
    terrainSpace: unit.terrain?.space || 'C',
    normalWeaponName: unit.normalWeapon?.name || '',
    normalWeaponType: unit.normalWeapon?.type || '',
    normalWeaponRangeMin: unit.normalWeapon?.range?.min || 0,
    normalWeaponRangeMax: unit.normalWeapon?.range?.max || 0,
    normalWeaponAction: unit.normalWeapon?.action ?? '',
    normalWeaponUses: unit.normalWeapon?.uses ?? '',
  };
}
