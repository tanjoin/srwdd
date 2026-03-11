export function handlePilotFormSubmit({ state, buildPilot, saveState, render }, e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const name = formData.get('name') || '';

  const status = {
    base: {
      attack: Number(formData.get('baseAttack')) || 0,
      defense: Number(formData.get('baseDefense')) || 0,
      accuracy: Number(formData.get('baseAccuracy')) || 0,
      mobility: Number(formData.get('baseMobility')) || 0,
    },
    basicSkill: {
      attack: Number(formData.get('basicSkillAttack')) || 0,
      defense: Number(formData.get('basicSkillDefense')) || 0,
      accuracy: Number(formData.get('basicSkillAccuracy')) || 0,
      mobility: Number(formData.get('basicSkillMobility')) || 0,
    }
  };

  const maxId = state.pilots.reduce((max, p) => {
    const idNum = Number(p.id || p.data?.id);
    return !isNaN(idNum) && idNum > max ? idNum : max;
  }, 0);

  const data = { id: String(maxId + 1), name, status, skillSlots: 0, equippedSkillIds: [] };
  state.pilots.push(buildPilot(data, state.skills));
  form.reset();
  saveState();
  render();
}
