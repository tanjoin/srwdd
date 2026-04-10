import { buildAppHtml } from '../views/app.view.js';
import { buildRenderViewModel } from '../services/render-vm.service.js';
import { bindTabs, bindSortHeaders, bindDeleteButtons } from './common.bindings.js';
import { bindPilotView } from './pilot.bindings.js';
import { bindRankingView } from './ranking.bindings.js';
import { bindSkillView } from './skill.bindings.js';
import { bindUnitView } from './unit.bindings.js';

export function renderApp({
  app,
  state,
  sortState,
  uiState,
  setUiState,
  compareValues,
  buildPilot,
  buildUnit,
  buildUnitPart,
  buildAbilityChip,
  Skill,
  setViewQuery,
  csvHandlers,
  formHandlers,
  saveState,
  render,
}) {
  const vm = buildRenderViewModel({
    state,
    sortState,
    uiState,
    compareValues,
    buildPilot,
    buildUnit,
    buildUnitPart,
    buildAbilityChip,
    Skill,
  });

  setUiState({ selectedPilotId: vm.selectedPilotId });
  app.innerHTML = buildAppHtml(vm);

  bindTabs({
    setCurrentView: (value) => setUiState({ currentView: value }),
    setViewQuery,
    setEquipOpen: (value) => setUiState({ equipOpen: value }),
    render,
  });

  if (uiState.currentView === 'pilot') {
    bindPilotView({
      state,
      render,
      saveState,
      getSelectedPilotId: () => uiState.selectedPilotId,
      setSelectedPilotId: (value) => setUiState({ selectedPilotId: value }),
      getEquipOpen: () => uiState.equipOpen,
      setEquipOpen: (value) => setUiState({ equipOpen: value }),
      onPilotCsvImport: csvHandlers.handlePilotCSVImport,
      onPilotCsvExport: csvHandlers.handlePilotCSVExport,
      onPilotFormSubmit: formHandlers.handlePilotFormSubmit,
    });
  } else if (uiState.currentView === 'skill') {
    bindSkillView({
      render,
      getSkillFilterPilot: () => uiState.skillFilterPilot,
      setSkillFilterPilot: (value) => setUiState({ skillFilterPilot: value }),
      setEditingSkillId: (value) => setUiState({ editingSkillId: value }),
      onSkillCsvImport: csvHandlers.handleSkillCSVImport,
      onSkillCsvExport: csvHandlers.handleSkillCSVExport,
      onSkillFormSubmit: formHandlers.handleSkillFormSubmit,
    });
  } else if (uiState.currentView === 'ranking' || uiState.currentView === 'optimizer') {
    bindRankingView({
      render,
      getSelectedMorale: () => uiState.selectedMorale,
      setSelectedMorale: (value) => setUiState({ selectedMorale: Number(value) || 100 }),
    });
  } else if (['unit', 'unitPart', 'abilityChip'].includes(uiState.currentView)) {
    bindUnitView({
      state,
      render,
      saveState,
      getCurrentView: () => uiState.currentView,
      getSelectedUnitId: () => uiState.selectedUnitId,
      setSelectedUnitId: (value) => setUiState({ selectedUnitId: value }),
      setEditingUnitId: (value) => setUiState({ editingUnitId: value }),
      getEditingUnitPartId: () => uiState.editingUnitPartId,
      setEditingUnitPartId: (value) => setUiState({ editingUnitPartId: value }),
      getEditingAbilityChipId: () => uiState.editingAbilityChipId,
      setEditingAbilityChipId: (value) => setUiState({ editingAbilityChipId: value }),
      getUnitPilotOpen: () => uiState.unitPilotOpen,
      setUnitPilotOpen: (value) => setUiState({ unitPilotOpen: value }),
      onUnitCsvImport: csvHandlers.handleUnitCSVImport,
      onUnitCsvExport: csvHandlers.handleUnitCSVExport,
      onUnitFormSubmit: formHandlers.handleUnitFormSubmit,
      onUnitPartCsvImport: csvHandlers.handleUnitPartCSVImport,
      onUnitPartCsvExport: csvHandlers.handleUnitPartCSVExport,
      onUnitPartFormSubmit: formHandlers.handleUnitPartFormSubmit,
      onAbilityChipCsvImport: csvHandlers.handleAbilityChipCSVImport,
      onAbilityChipCsvExport: csvHandlers.handleAbilityChipCSVExport,
      onAbilityChipFormSubmit: formHandlers.handleAbilityChipFormSubmit,
    });
  }

  bindSortHeaders({
    sortState,
    getCurrentView: () => uiState.currentView,
    render,
  });

  bindDeleteButtons({
    state,
    getCurrentView: () => uiState.currentView,
    saveState,
    render,
    getEditingSkillId: () => uiState.editingSkillId,
    setEditingSkillId: (value) => setUiState({ editingSkillId: value }),
    getEditingUnitId: () => uiState.editingUnitId,
    setEditingUnitId: (value) => setUiState({ editingUnitId: value }),
    getEditingUnitPartId: () => uiState.editingUnitPartId,
    setEditingUnitPartId: (value) => setUiState({ editingUnitPartId: value }),
    getEditingAbilityChipId: () => uiState.editingAbilityChipId,
    setEditingAbilityChipId: (value) => setUiState({ editingAbilityChipId: value }),
    getSelectedUnitId: () => uiState.selectedUnitId,
    setSelectedUnitId: (value) => setUiState({ selectedUnitId: value }),
  });
}