export function bindDeleteButtons({
  state,
  getCurrentView,
  saveState,
  render,
  getEditingSkillId,
  setEditingSkillId,
  getEditingUnitId,
  setEditingUnitId,
  getEditingUnitPartId,
  setEditingUnitPartId,
  getEditingAbilityChipId,
  setEditingAbilityChipId,
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

  document.querySelectorAll('.unit-part-delete').forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute('data-id');
      const idx = state.unitPartsList.findIndex(item => String(item.id || item.data?.id) === String(id));
      if (idx !== -1) {
        if (String(getEditingUnitPartId()) === String(id)) setEditingUnitPartId(null);
        state.unitPartsList.splice(idx, 1);
        state.units.forEach((unit) => {
          const loadout = unit.data?.loadout;
          if (!loadout) return;
          Object.keys(loadout).forEach((key) => {
            if (String(loadout[key]) === String(id)) loadout[key] = '';
          });
        });
        saveState();
        render();
      }
    };
  });

  document.querySelectorAll('.ability-chip-delete').forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute('data-id');
      const idx = state.abilityChips.findIndex(item => String(item.id || item.data?.id) === String(id));
      if (idx !== -1) {
        if (String(getEditingAbilityChipId()) === String(id)) setEditingAbilityChipId(null);
        state.abilityChips.splice(idx, 1);
        state.units.forEach((unit) => {
          const loadout = unit.data?.loadout;
          if (loadout && String(loadout.abilityChipId) === String(id)) {
            loadout.abilityChipId = '';
          }
        });
        saveState();
        render();
      }
    };
  });
}