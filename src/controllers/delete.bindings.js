export function bindDeleteButtons({
  state,
  getCurrentView,
  saveState,
  render,
  getEditingSkillId,
  setEditingSkillId,
  getEditingUnitId,
  setEditingUnitId,
  getSelectedUnitId,
  setSelectedUnitId,
}) {
  const currentView = getCurrentView();

  if (currentView === 'pilot') {
    document.querySelectorAll('.pilot-delete').forEach(btn => {
      btn.onclick = () => {
        const idx = Number(btn.getAttribute('data-index'));
        if (!isNaN(idx)) {
          state.pilots.splice(idx, 1);
          saveState();
          render();
        }
      };
    });
    return;
  }

  if (currentView === 'skill') {
    document.querySelectorAll('.skill-delete').forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-id');
        const idx = state.skills.findIndex(s => String(s.id || s.data?.id) === String(id));
        if (idx !== -1) {
          if (String(getEditingSkillId()) === String(id)) setEditingSkillId(null);
          state.skills.splice(idx, 1);
          saveState();
          render();
        }
      };
    });
    return;
  }

  document.querySelectorAll('.unit-delete').forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute('data-id');
      const idx = state.units.findIndex(u => String(u.id || u.data?.id) === String(id));
      if (idx !== -1) {
        if (String(getEditingUnitId()) === String(id)) setEditingUnitId(null);
        if (String(getSelectedUnitId()) === String(id)) setSelectedUnitId(null);
        state.units.splice(idx, 1);
        saveState();
        render();
      }
    };
  });
}