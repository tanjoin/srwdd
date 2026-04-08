import Unit from '../model/unit.model.js';
import Weapon from '../model/weapon.model.js';
import AbilityChip from '../model/ability-chips.model.js';

export function compareValues(a, b, key, dir) {
  const av = normalizeSortValue(a, key);
  const bv = normalizeSortValue(b, key);
  if (av < bv) return dir === 'asc' ? -1 : 1;
  if (av > bv) return dir === 'asc' ? 1 : -1;
  return 0;
}

function normalizeSortValue(obj, key) {
  if (obj instanceof Unit) {
    if (key === 'specialAbilityName') return String(obj.specialAbility?.name || '').toLowerCase();
    if (key === 'specialAbilityEffect') return String(obj.specialAbility?.effect || '').toLowerCase();
    if (key === 'terrainAir') return String(obj.data?.terrain?.air || '');
    if (key === 'terrainLand') return String(obj.data?.terrain?.land || '');
    if (key === 'terrainSea') return String(obj.data?.terrain?.sea || '');
    if (key === 'terrainSpace') return String(obj.data?.terrain?.space || '');
    if (key === 'normalWeaponName') return String(obj.normalWeapon?.name || '').toLowerCase();
    if (key === 'normalWeaponType') return String(obj.normalWeapon?.type || '').toLowerCase();
    if (key === 'normalWeaponRangeMin') return Number(obj.normalWeapon?.range?.min || 0);
    if (key === 'normalWeaponRangeMax') return Number(obj.normalWeapon?.range?.max || 0);
    if (key === 'normalWeaponAction') {
      const raw = obj.normalWeapon?.action;
      const num = Number(raw);
      return Number.isNaN(num) ? String(raw ?? '').toLowerCase() : num;
    }
    if (key === 'normalWeaponUses') {
      const raw = obj.normalWeapon?.uses;
      const num = Number(raw);
      return Number.isNaN(num) ? String(raw ?? '').toLowerCase() : num;
    }
  }
  if (obj instanceof Weapon) {
    if (key === 'unitId' || key === 'unitIds') return String((obj.unitIds || []).join(',')).toLowerCase();
    if (key === 'rarity') return String(obj.rarity || '').toLowerCase();
    if (key === 'spiritCommandName') return String(obj.spiritCommand?.name || '').toLowerCase();
    if (key === 'terrainAir') return String(obj.terrain?.air || '');
    if (key === 'terrainLand') return String(obj.terrain?.land || '');
    if (key === 'terrainSea') return String(obj.terrain?.sea || '');
    if (key === 'terrainSpace') return String(obj.terrain?.space || '');
    if (key === 'rangeMin') return Number(obj.range?.min || 0);
    if (key === 'rangeMax') return Number(obj.range?.max || 0);
    if (key === 'mainName') return String(obj.mainSlot?.name || '').toLowerCase();
    if (key === 'finisherName') return String(obj.finisherSlot?.name || '').toLowerCase();
    if (key === 'subName') return String(obj.subSlot?.name || '').toLowerCase();
  }
  if (obj instanceof AbilityChip) {
    if (key === 'baseAbility') return String((obj.baseAbility || []).join(',')).toLowerCase();
    if (key === 'exAbility') return String((obj.exAbility || []).join(',')).toLowerCase();
    if (key === 'spAbility') return String((obj.spAbility || []).join(',')).toLowerCase();
  }
  const value = obj?.[key];
  if (Array.isArray(value)) return value.join(',');
  if (value === undefined || value === null) return '';
  const num = Number(value);
  if (!isNaN(num) && String(value).trim() !== '') return num;
  return String(value).toLowerCase();
}
