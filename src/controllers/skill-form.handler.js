export function handleSkillFormSubmit(ctx, e) {
  const {
    Skill,
    state,
    showToast,
    render,
    saveState,
    getEditingSkillId,
    setEditingSkillId,
  } = ctx;

  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  let updated = false;
  const name = formData.get('name') || '';
  const pilotNames = formData.get('pilotNames') || '';
  const effect = formData.get('effect') || '';
  const data = {
    name,
    pilotNames,
    effect,
    attack: Number(formData.get('attack')) || 0,
    defense: Number(formData.get('defense')) || 0,
    accuracy: Number(formData.get('accuracy')) || 0,
    mobility: Number(formData.get('mobility')) || 0,
  };

  const editingSkillId = getEditingSkillId();
  if (editingSkillId) {
    const targetIndex = state.skills.findIndex(s => String(s.id || s.data?.id) === String(editingSkillId));
    if (targetIndex !== -1) {
      const current = state.skills[targetIndex];
      const currentId = String(current.id || current.data?.id || editingSkillId);
      state.skills[targetIndex] = new Skill({ data: { id: currentId, ...data } });
      updated = true;
    }
    setEditingSkillId(null);
  } else {
    const maxId = state.skills.reduce((max, s) => {
      const idNum = Number(s.id || s.data?.id);
      return !isNaN(idNum) && idNum > max ? idNum : max;
    }, 0);
    state.skills.push(new Skill({ data: { id: String(maxId + 1), ...data } }));
  }

  form.reset();
  saveState();
  render();
  if (updated) showToast('スキルを更新しました');
}
