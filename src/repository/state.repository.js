export function loadState() {
  try {
    const data = JSON.parse(localStorage.getItem('srwdd-state'));
    if (data) {
      return {
        pilots: Array.isArray(data.pilots) ? data.pilots : [],
        skills: Array.isArray(data.skills) ? data.skills : [],
        units: Array.isArray(data.units) ? data.units : [],
        unitPartsList: Array.isArray(data.unitPartsList) ? data.unitPartsList : [],
        abilityChips: Array.isArray(data.abilityChips) ? data.abilityChips : [],
      };
    }
  } catch (e) {}
  return { pilots: [], skills: [], units: [], unitPartsList: [], abilityChips: [] };
}

export function saveState(state) {
  localStorage.setItem('srwdd-state', JSON.stringify({
    pilots: state.pilots.map(p => p.data || p),
    skills: state.skills.map(s => s.data || s),
    units: state.units.map(u => u.data || u),
    unitPartsList: Array.isArray(state.unitPartsList) ? state.unitPartsList.map(item => item.data || item) : [],
    abilityChips: Array.isArray(state.abilityChips) ? state.abilityChips.map(item => item.data || item) : [],
  }));
}
