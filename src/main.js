import Skill from './model/skill.model.js';
import Papa from 'papaparse';
import { loadState, saveState as saveStateToRepository } from './repository/state.repository.js';
import { getViewFromQuery, setViewQuery } from './services/view-query.service.js';
import { buildPilot, flattenPilotForCSV, parsePilotRow } from './services/pilot.service.js';
import { buildUnit, flattenUnitForCSV, parseActionUses } from './services/unit.service.js';
import { buildUnitPart, flattenUnitPartForCSV } from './services/unit-parts.service.js';
import { buildAbilityChip, flattenAbilityChipForCSV } from './services/ability-chip.service.js';
import { compareValues } from './services/sort.service.js';
import { showToast } from './services/ui.service.js';
import { createCsvHandlers } from './controllers/csv.handlers.js';
import { createFormHandlers } from './controllers/form.handlers.js';
import { renderApp } from './controllers/render.controller.js';

const app = document.getElementById('app');

function saveState() {
  saveStateToRepository(state);
}

let state = loadState();
let uiState = {
  currentView: getViewFromQuery(),
  selectedPilotId: null,
  selectedUnitId: null,
  editingSkillId: null,
  editingUnitId: null,
  editingUnitPartId: null,
  editingAbilityChipId: null,
  skillFilterPilot: '',
  equipOpen: false,
  unitPilotOpen: false,
};
let sortState = {
  pilot: { key: 'id', dir: 'asc' },
  skill: { key: 'id', dir: 'asc' },
  unit: { key: 'id', dir: 'asc' },
  unitPart: { key: 'id', dir: 'asc' },
  abilityChip: { key: 'id', dir: 'asc' },
  ranking: { key: 'score', dir: 'desc' },
};

const csvHandlers = createCsvHandlers({
  Papa,
  Skill,
  state,
  render: () => render(),
  saveState,
  buildPilot,
  parsePilotRow,
  flattenPilotForCSV,
  buildUnit,
  flattenUnitForCSV,
  buildUnitPart,
  flattenUnitPartForCSV,
  buildAbilityChip,
  flattenAbilityChipForCSV,
  onSkillImported: () => {
    uiState.editingSkillId = null;
  },
  onUnitImported: () => {
    uiState.editingUnitId = null;
    uiState.selectedUnitId = null;
    uiState.unitPilotOpen = false;
  },
});

const formHandlers = createFormHandlers({
  Skill,
  state,
  showToast,
  render: () => render(),
  saveState,
  buildPilot,
  buildUnit,
  buildUnitPart,
  buildAbilityChip,
  parseActionUses,
  getEditingSkillId: () => uiState.editingSkillId,
  setEditingSkillId: (value) => {
    uiState.editingSkillId = value;
  },
  getEditingUnitId: () => uiState.editingUnitId,
  setEditingUnitId: (value) => {
    uiState.editingUnitId = value;
  },
  getEditingUnitPartId: () => uiState.editingUnitPartId,
  setEditingUnitPartId: (value) => {
    uiState.editingUnitPartId = value;
  },
  getEditingAbilityChipId: () => uiState.editingAbilityChipId,
  setEditingAbilityChipId: (value) => {
    uiState.editingAbilityChipId = value;
  },
});

function render() {
  renderApp({
    app,
    state,
    sortState,
    uiState,
    setUiState: (patch) => {
      uiState = { ...uiState, ...patch };
    },
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
  });
}

setViewQuery(uiState.currentView);
render();
