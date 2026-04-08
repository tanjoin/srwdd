export function handleUnitPartFormSubmit(ctx, e) {
  const { state, showToast, render, saveState, buildUnitPart, getEditingUnitPartId, setEditingUnitPartId } = ctx;

  e.preventDefault();
  const formData = new FormData(e.target);
  let updated = false;
  const isSupportCategory = formData.get('partIsSupport') === 'on';
  const selectedUnitId = isSupportCategory ? '' : String(formData.get('partUnitId') || '').trim();
  const selectedPilotId = isSupportCategory ? '' : String(formData.get('partPilotId') || '').trim();
  const spiritCommand = {
    name: String(formData.get('partSpiritCommandName') || '').trim(),
    uses: String(formData.get('partSpiritCommandUses') || '').trim(),
    description: String(formData.get('partSpiritCommandDescription') || '').trim(),
  };

  const maxId = state.unitPartsList.reduce((max, item) => {
    const idNum = Number(item.id || item.data?.id);
    return !Number.isNaN(idNum) && idNum > max ? idNum : max;
  }, 0);

  const data = {
    name: formData.get('partName') || '',
    unitId: selectedUnitId,
    unitIds: selectedUnitId ? [selectedUnitId] : [],
    pilotId: selectedPilotId,
    rarity: formData.get('partRarity') || '',
    isSupportCategory,
    type: isSupportCategory ? '' : formData.get('partType') || '',
    hp: Number(formData.get('partHp')) || 0,
    attack: Number(formData.get('partAttack')) || 0,
    defense: Number(formData.get('partDefense')) || 0,
    accuracy: Number(formData.get('partAccuracy')) || 0,
    mobility: Number(formData.get('partMobility')) || 0,
    trait: Number(formData.get('partTrait')) || 0,
    power: isSupportCategory ? 0 : Number(formData.get('partPower')) || 0,
    hitRate: isSupportCategory ? 0 : Number(formData.get('partHitRate')) || 0,
    range: {
      min: isSupportCategory ? 0 : Number(formData.get('partRangeMin')) || 0,
      max: isSupportCategory ? 0 : Number(formData.get('partRangeMax')) || 0,
    },
    terrain: {
      air: String(formData.get('partTerrainAir') || '').trim().toUpperCase(),
      land: String(formData.get('partTerrainLand') || '').trim().toUpperCase(),
      sea: String(formData.get('partTerrainSea') || '').trim().toUpperCase(),
      space: String(formData.get('partTerrainSpace') || '').trim().toUpperCase(),
    },
    map: {
      enabled: formData.get('partIsMap') === 'on',
      label: formData.get('partMapLabel') || '',
      image: '',
      target: formData.get('partMapTarget') || '',
      areaType: formData.get('partMapAreaType') || '',
    },
    action: isSupportCategory ? '' : formData.get('partAction') || '',
    uses: isSupportCategory ? '' : formData.get('partUses') || '',
    spiritCommand,
    main: {
      name: formData.get('partMainName') || '',
      description: formData.get('partMainDescription') || '',
      effect: [],
    },
    finisherSlot: {
      name: formData.get('partFinisherName') || '',
      description: formData.get('partFinisherDescription') || '',
      effect: [],
    },
    subSlot: {
      name: formData.get('partSubName') || '',
      description: formData.get('partSubDescription') || '',
      effect: [],
    },
  };

  const editingId = getEditingUnitPartId();
  if (editingId) {
    const targetIndex = state.unitPartsList.findIndex((item) => String(item.id || item.data?.id) === String(editingId));
    if (targetIndex !== -1) {
      state.unitPartsList[targetIndex] = buildUnitPart({ id: String(editingId), ...data });
      updated = true;
    }
    setEditingUnitPartId(null);
  } else {
    state.unitPartsList.push(buildUnitPart({ id: String(maxId + 1), ...data }));
  }

  e.target.reset();
  saveState();
  render();
  showToast(updated ? 'ユニットパーツを更新しました' : 'ユニットパーツを追加しました');
}