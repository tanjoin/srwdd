export function handleUnitFormSubmit(ctx, e) {
  const {
    state,
    showToast,
    render,
    saveState,
    buildUnit,
    parseActionUses,
    getEditingUnitId,
    setEditingUnitId,
  } = ctx;

  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  let updated = false;

  const hpInputRaw = String(formData.get('hp') ?? '').trim();
  const baseHp = Number(formData.get('baseHp')) || 0;
  const partsIncreaseHp = Number(formData.get('partsIncreaseHp')) || 0;
  const hp = hpInputRaw === '' ? (baseHp + partsIncreaseHp) : (Number(hpInputRaw) || 0);

  const maxId = state.units.reduce((max, u) => {
    const idNum = Number(u.id || u.data?.id);
    return !isNaN(idNum) && idNum > max ? idNum : max;
  }, 0);

  const data = {
    name: formData.get('name') || '',
    size: formData.get('size') || '',
    type: formData.get('type') || '',
    hp,
    baseHp,
    partsIncreaseHp,
    attack: Number(formData.get('attack')) || 0,
    defense: Number(formData.get('defense')) || 0,
    accuracy: Number(formData.get('accuracy')) || 0,
    mobility: Number(formData.get('mobility')) || 0,
    movement: Number(formData.get('movement')) || 0,
    speed: Number(formData.get('speed')) || 0,
    specialAbility: {
      name: formData.get('specialAbilityName') || '',
      effect: formData.get('specialAbilityEffect') || '',
    },
    terrain: {
      air: String(formData.get('terrainAir') || 'C').toUpperCase(),
      land: String(formData.get('terrainLand') || 'C').toUpperCase(),
      sea: String(formData.get('terrainSea') || 'C').toUpperCase(),
      space: String(formData.get('terrainSpace') || 'C').toUpperCase(),
    },
    normalWeapon: {
      name: formData.get('normalWeaponName') || '',
      type: formData.get('normalWeaponType') || '',
      range: {
        min: Number(formData.get('normalWeaponRangeMin')) || 0,
        max: Number(formData.get('normalWeaponRangeMax')) || 0,
      },
      action: parseActionUses(formData.get('normalWeaponAction')),
      uses: parseActionUses(formData.get('normalWeaponUses')),
    },
  };

  const editingUnitId = getEditingUnitId();
  if (editingUnitId) {
    const targetIndex = state.units.findIndex(u => String(u.id || u.data?.id) === String(editingUnitId));
    if (targetIndex !== -1) {
      const current = state.units[targetIndex];
      const currentId = String(current.id || current.data?.id || editingUnitId);
      const currentPilotId = current.pilotId || current.data?.pilotId || '';
      state.units[targetIndex] = buildUnit({ id: currentId, pilotId: currentPilotId, ...data });
      updated = true;
    }
    setEditingUnitId(null);
  } else {
    state.units.push(buildUnit({ id: String(maxId + 1), pilotId: '', ...data }));
  }

  form.reset();
  saveState();
  render();
  if (updated) showToast('機体を更新しました');
}
