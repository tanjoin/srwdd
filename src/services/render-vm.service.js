import { buildScoredRankingRows } from './ranking.service.js';

export function buildRenderViewModel({
  state,
  sortState,
  uiState,
  compareValues,
  buildPilot,
  buildUnit,
  Skill,
}) {
  const pilots = state.pilots.map(p => buildPilot(p?.data || p, state.skills));
  const skills = state.skills.map(s => (s instanceof Skill ? s : new Skill({ data: s })));
  const units = state.units.map(u => buildUnit(u?.data || u));

  state.pilots = pilots;
  state.skills = skills;
  state.units = units;
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
  const filteredSkills = sortedSkills.filter(s => {
    if (!uiState.skillFilterPilot) return true;
    const names = Array.isArray(s.pilotNames) ? s.pilotNames : [];
    return names.some(name => String(name).includes(uiState.skillFilterPilot));
  });

  const pilotById = new Map(pilots.map(p => [String(p.id), p]));
  const scoredRankingRows = buildScoredRankingRows({
    units,
    pilotById,
    rankingSort: sortState.ranking,
    compareValues,
  });

  const selectedUnit = units.find(u => String(u.id) === String(uiState.selectedUnitId));
  const editingUnit = uiState.currentView === 'unit'
    ? units.find(u => String(u.id) === String(uiState.editingUnitId))
    : null;
  const editingUnitData = editingUnit?.data || {};

  const editingSkill = uiState.currentView === 'skill'
    ? skills.find(s => String(s.id) === String(uiState.editingSkillId))
    : null;
  const editingSkillData = editingSkill?.data || {};

  return {
    currentView: uiState.currentView,
    pilots,
    sortedPilots,
    filteredSkills,
    sortedUnits,
    scoredRankingRows,
    selectedPilotId,
    equipSlots,
    equippedCount: equippedIds.length,
    equipCandidates,
    equippedSet,
    pilotById,
    selectedUnit,
    selectedUnitPilotId: selectedUnit?.pilotId || '',
    editingUnit,
    editingUnitData,
    editingUnitSpecial: editingUnitData.specialAbility || {},
    editingUnitTerrain: editingUnitData.terrain || {},
    editingUnitWeapon: editingUnitData.normalWeapon || {},
    editingUnitRange: (editingUnitData.normalWeapon || {}).range || {},
    editingSkill,
    editingSkillData,
    editingPilotNamesValue: Array.isArray(editingSkillData.pilotNames)
      ? editingSkillData.pilotNames.join(', ')
      : (editingSkillData.pilotNames || ''),
    skillFilterPilot: uiState.skillFilterPilot,
  };
}
