import Unit from '../model/unit.model.js';

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
  const value = obj?.[key];
  if (Array.isArray(value)) return value.join(',');
  if (value === undefined || value === null) return '';
  const num = Number(value);
  if (!isNaN(num) && String(value).trim() !== '') return num;
  return String(value).toLowerCase();
}
