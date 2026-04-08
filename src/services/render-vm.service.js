import { buildBestUnitRankingRows, buildScoredRankingRows, buildUnitPartOptimizerRows } from './ranking.service.js';

export function buildRenderViewModel({
  state,
  sortState,
  uiState,
  compareValues,
  buildPilot,
  buildUnit,
  buildUnitPart,
  buildAbilityChip,
  Skill,
}) {
  const pilots = state.pilots.map(p => buildPilot(p?.data || p, state.skills));
  const skills = state.skills.map(s => (s instanceof Skill ? s : new Skill({ data: s })));
  const units = state.units.map(u => buildUnit(u?.data || u));
  const unitPartsList = (state.unitPartsList || []).map(item => buildUnitPart(item?.data || item));
  const abilityChips = (state.abilityChips || []).map(item => buildAbilityChip(item?.data || item));

  state.pilots = pilots;
  state.skills = skills;
  state.units = units;
  state.unitPartsList = unitPartsList;
  state.abilityChips = abilityChips;
  state.pilots.forEach(p => {
    p.skillList = state.skills;
  });

  const selectedPilotId = uiState.selectedPilotId || (pilots[0] ? String(pilots[0].id) : null);
  const selectedPilot = pilots.find(p => String(p.id) === String(selectedPilotId));
  const equippedIds = selectedPilot?.equippedSkillIds || [];
  const equippedSet = new Set(equippedIds.map(String));
  const equipSlots = Number(selectedPilot?.data?.skillSlots) || 0;
  const pilotNameForEquip = selectedPilot?.name || '';
  const equipCandidates = skills.map(s => {
    const names = Array.isArray(s.pilotNames) ? s.pilotNames : [];
    const eligible = pilotNameForEquip && names.some(n => n.includes(pilotNameForEquip));
    return { skill: s, eligible };
  });

  const sortedPilots = [...pilots].sort((a, b) => compareValues(a, b, sortState.pilot.key, sortState.pilot.dir));
  const sortedSkills = [...skills].sort((a, b) => compareValues(a, b, sortState.skill.key, sortState.skill.dir));
  const sortedUnits = [...units].sort((a, b) => compareValues(a, b, sortState.unit.key, sortState.unit.dir));
  const sortedUnitParts = [...unitPartsList].sort((a, b) => compareValues(a, b, sortState.unitPart.key, sortState.unitPart.dir));
  const sortedAbilityChips = [...abilityChips].sort((a, b) => compareValues(a, b, sortState.abilityChip.key, sortState.abilityChip.dir));
  const filteredSkills = sortedSkills.filter(s => {
    if (!uiState.skillFilterPilot) return true;
    const names = Array.isArray(s.pilotNames) ? s.pilotNames : [];
    return names.some(name => String(name).includes(uiState.skillFilterPilot));
  });

  const pilotById = new Map(pilots.map(p => [String(p.id), p]));
  const unitById = new Map(units.map(u => [String(u.id), u]));
  const unitPartById = new Map(unitPartsList.map(item => [String(item.id), item]));
  const abilityChipById = new Map(abilityChips.map(item => [String(item.id), item]));
  const scoredRankingRows = buildScoredRankingRows({
    units,
    pilotById,
    unitPartsList,
    rankingSort: sortState.ranking,
    compareValues,
  });
  const bestUnitRankingRows = buildBestUnitRankingRows(scoredRankingRows);
  const optimizerRows = buildUnitPartOptimizerRows({ units, pilotById, unitPartsList });

  const selectedUnit = units.find(u => String(u.id) === String(uiState.selectedUnitId));
  const editingUnit = uiState.currentView === 'unit'
    ? units.find(u => String(u.id) === String(uiState.editingUnitId))
    : null;
  const editingUnitData = editingUnit?.data || {};
  const editingUnitPart = uiState.currentView === 'unit'
    || uiState.currentView === 'unitPart'
    ? unitPartsList.find(item => String(item.id) === String(uiState.editingUnitPartId))
    : null;
  const editingAbilityChip = uiState.currentView === 'unit'
    || uiState.currentView === 'abilityChip'
    ? abilityChips.find(item => String(item.id) === String(uiState.editingAbilityChipId))
    : null;

  const editingSkill = uiState.currentView === 'skill'
    ? skills.find(s => String(s.id) === String(uiState.editingSkillId))
    : null;
  const editingSkillData = editingSkill?.data || {};

  return {
    currentView: uiState.currentView,
    units,
    pilots,
    sortedPilots,
    filteredSkills,
    sortedUnits,
    sortedUnitParts,
    sortedAbilityChips,
    scoredRankingRows,
    bestUnitRankingRows,
    optimizerRows,
    selectedPilotId,
    equipSlots,
    equippedCount: equippedIds.length,
    equipCandidates,
    equippedSet,
    pilotById,
    unitById,
    unitPartById,
    abilityChipById,
    unitPartsList,
    abilityChips,
    selectedUnit,
    selectedUnitPilotId: selectedUnit?.pilotId || '',
    selectedUnitLoadout: selectedUnit?.loadout || {},
    editingUnit,
    editingUnitData,
    editingUnitSpecial: editingUnitData.specialAbility || {},
    editingUnitTerrain: editingUnitData.terrain || {},
    editingUnitWeapon: editingUnitData.normalWeapon || {},
    editingUnitRange: (editingUnitData.normalWeapon || {}).range || {},
    editingUnitPart,
    editingUnitPartData: editingUnitPart?.data || {},
    editingAbilityChip,
    editingAbilityChipData: editingAbilityChip?.data || {},
    editingSkill,
    editingSkillData,
    editingPilotNamesValue: Array.isArray(editingSkillData.pilotNames)
      ? editingSkillData.pilotNames.join(', ')
      : (editingSkillData.pilotNames || ''),
    skillFilterPilot: uiState.skillFilterPilot,
  };
}
