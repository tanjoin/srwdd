export function loadState() {
  try {
    const data = JSON.parse(localStorage.getItem('srwdd-state'));
    if (data) {
      return {
        pilots: Array.isArray(data.pilots) ? data.pilots : [],
        skills: Array.isArray(data.skills) ? data.skills : [],
        units: Array.isArray(data.units) ? data.units : [],
      };
    }
  } catch (e) {}
  return { pilots: [], skills: [], units: [] };
}

export function saveState(state) {
  localStorage.setItem('srwdd-state', JSON.stringify({
    pilots: state.pilots.map(p => p.data || p),
    skills: state.skills.map(s => s.data || s),
    units: state.units.map(u => u.data || u),
  }));
}
