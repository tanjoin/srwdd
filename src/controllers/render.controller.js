import { buildAppHtml } from '../views/app.view.js';
import { buildRenderViewModel } from '../services/render-vm.service.js';
import { bindTabs, bindSortHeaders, bindDeleteButtons } from './common.bindings.js';
import { bindPilotView } from './pilot.bindings.js';
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
  } else if (uiState.currentView === 'unit') {
    bindUnitView({
      state,
      render,
      saveState,
      getCurrentView: () => uiState.currentView,
      getSelectedUnitId: () => uiState.selectedUnitId,
      setSelectedUnitId: (value) => setUiState({ selectedUnitId: value }),
      setEditingUnitId: (value) => setUiState({ editingUnitId: value }),
      getUnitPilotOpen: () => uiState.unitPilotOpen,
      setUnitPilotOpen: (value) => setUiState({ unitPilotOpen: value }),
      onUnitCsvImport: csvHandlers.handleUnitCSVImport,
      onUnitCsvExport: csvHandlers.handleUnitCSVExport,
      onUnitFormSubmit: formHandlers.handleUnitFormSubmit,
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
    getSelectedUnitId: () => uiState.selectedUnitId,
    setSelectedUnitId: (value) => setUiState({ selectedUnitId: value }),
  });
}