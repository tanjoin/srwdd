function parseAbilityList(values) {
  return values.map((value) => String(value || '').trim()).filter(Boolean);
}

export function handleAbilityChipFormSubmit(ctx, e) {
  const { state, showToast, render, saveState, buildAbilityChip, getEditingAbilityChipId, setEditingAbilityChipId } = ctx;

  e.preventDefault();
  const formData = new FormData(e.target);
  let updated = false;

  const maxId = state.abilityChips.reduce((max, item) => {
    const idNum = Number(item.id || item.data?.id);
    return !Number.isNaN(idNum) && idNum > max ? idNum : max;
  }, 0);

  const data = {
    name: formData.get('chipName') || '',
    baseAbility: parseAbilityList([
      formData.get('baseAbility1'),
      formData.get('baseAbility2'),
      formData.get('baseAbility3'),
    ]),
    exAbility: parseAbilityList([
      formData.get('exAbility1'),
      formData.get('exAbility2'),
    ]),
    spAbility: parseAbilityList([
      formData.get('spAbility1'),
    ]),
  };

  const editingId = getEditingAbilityChipId();
  if (editingId) {
    const targetIndex = state.abilityChips.findIndex((item) => String(item.id || item.data?.id) === String(editingId));
    if (targetIndex !== -1) {
      state.abilityChips[targetIndex] = buildAbilityChip({ id: String(editingId), ...data });
      updated = true;
    }
    setEditingAbilityChipId(null);
  } else {
    state.abilityChips.push(buildAbilityChip({ id: String(maxId + 1), ...data }));
  }

  e.target.reset();
  saveState();
  render();
  showToast(updated ? 'アビリティチップを更新しました' : 'アビリティチップを追加しました');
}