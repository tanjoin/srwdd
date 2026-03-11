import Pilot from '../model/pilot.model.js';

export function buildPilot(row, skills = []) {
  return new Pilot({ data: row }, skills);
}

export function flattenPilotForCSV(p) {
  return {
    id: p.id || '',
    name: p.name || '',
    baseAttack: p.status?.base?.attack ?? 0,
    baseDefense: p.status?.base?.defense ?? 0,
    baseAccuracy: p.status?.base?.accuracy ?? 0,
    baseMobility: p.status?.base?.mobility ?? 0,
    basicSkillAttack: p.status?.basicSkill?.attack ?? 0,
    basicSkillDefense: p.status?.basicSkill?.defense ?? 0,
    basicSkillAccuracy: p.status?.basicSkill?.accuracy ?? 0,
    basicSkillMobility: p.status?.basicSkill?.mobility ?? 0,
    skillSlots: p.skillSlots ?? 0,
    equippedSkillIds: Array.isArray(p.equippedSkillIds)
      ? p.equippedSkillIds.join(',')
      : (p.equippedSkillIds || ''),
  };
}

export function parsePilotRow(row) {
  const status = {
    base: {
      attack: Number(row.baseAttack || row.attack || 0),
      defense: Number(row.baseDefense || row.defense || 0),
      accuracy: Number(row.baseAccuracy || row.accuracy || 0),
      mobility: Number(row.baseMobility || row.mobility || 0),
    },
    basicSkill: {
      attack: Number(row.basicSkillAttack || 0),
      defense: Number(row.basicSkillDefense || 0),
      accuracy: Number(row.basicSkillAccuracy || 0),
      mobility: Number(row.basicSkillMobility || 0),
    }
  };
  return {
    id: row.id || '',
    name: row.name || '',
    status,
    skillSlots: Number(row.skillSlots || 0),
    equippedSkillIds: typeof row.equippedSkillIds === 'string'
      ? row.equippedSkillIds.split(',').map(s => s.trim()).filter(Boolean)
      : [],
  };
}
