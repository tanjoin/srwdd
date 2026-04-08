import AbilityChip from '../model/ability-chips.model.js';

function parseAbilityList(value) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item || '').trim()).filter(Boolean);
  }

  return String(value || '')
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function parseAbilityChipRow(row) {
  return {
    id: row.id || '',
    name: row.name || '',
    baseAbility: parseAbilityList(row.baseAbility ?? row.baseAbilities),
    exAbility: parseAbilityList(row.exAbility ?? row.exAbilities),
    spAbility: parseAbilityList(row.spAbility ?? row.spAbilities),
  };
}

export function buildAbilityChip(row) {
  return new AbilityChip({ data: parseAbilityChipRow(row) });
}

export function flattenAbilityChipForCSV(item) {
  const chip = item.data || item;
  return {
    id: chip.id || '',
    name: chip.name || '',
    baseAbility: Array.isArray(chip.baseAbility) ? chip.baseAbility.join('\n') : '',
    exAbility: Array.isArray(chip.exAbility) ? chip.exAbility.join('\n') : '',
    spAbility: Array.isArray(chip.spAbility) ? chip.spAbility.join('\n') : '',
  };
}