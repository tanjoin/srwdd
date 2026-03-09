class Pilot {
  constructor(options, skillList = []) {
    if (options) {
      Object.assign(this, options);
    } else {
      this.data = {};
    }
    this.skillList = skillList;
  }

  get id() {
    return this.data.id;
  }

  get name() {
    return this.data.name;
  }

  // --- ステータス構造 ---
  // data.status = { base: {attack,defense,accuracy,mobility}, basicSkill: {...} }

  get status() {
    return this.data.status || {};
  }

  // 各種値取得
  get baseAttack() {
    return this.status.base?.attack || 0;
  }
  get baseDefense() {
    return this.status.base?.defense || 0;
  }
  get baseAccuracy() {
    return this.status.base?.accuracy || 0;
  }
  get baseMobility() {
    return this.status.base?.mobility || 0;
  }

  get basicSkillAttack() {
    return this.status.basicSkill?.attack || 0;
  }
  get basicSkillDefense() {
    return this.status.basicSkill?.defense || 0;
  }
  get basicSkillAccuracy() {
    return this.status.basicSkill?.accuracy || 0;
  }
  get basicSkillMobility() {
    return this.status.basicSkill?.mobility || 0;
  }

  // 装備スキルID
  get equippedSkillIds() {
    if (Array.isArray(this.data.equippedSkillIds)) return this.data.equippedSkillIds;
    if (typeof this.data.equippedSkillIds === 'string') {
      return this.data.equippedSkillIds.split(',').map(s => s.trim()).filter(Boolean);
    }
    return [];
  }

  // skillListから特殊スキル合計値を算出
  get specialSkillAttack() {
    return this._sumSpecialSkill('attack');
  }
  get specialSkillDefense() {
    return this._sumSpecialSkill('defense');
  }
  get specialSkillAccuracy() {
    return this._sumSpecialSkill('accuracy');
  }
  get specialSkillMobility() {
    return this._sumSpecialSkill('mobility');
  }
  _sumSpecialSkill(key) {
    if (!this.skillList) return 0;
    const pilotName = (this.name || '').trim();
    if (!pilotName) return 0;
    const equipped = new Set(this.equippedSkillIds.map(String));
    if (equipped.size === 0) return 0;
    const matched = this.skillList.filter(s => {
      const skillId = s?.id != null ? String(s.id) : '';
      if (!equipped.has(skillId)) return false;
      const names = Array.isArray(s.pilotNames) ? s.pilotNames : [];
      return names.some(n => n.includes(pilotName));
    });
    return matched.reduce((acc, s) => acc + (Number(s[key]) || 0), 0);
  }

  // 精神
  get spiritCommands() {
    return this.data.spiritCommands || [];
  }

  get skills() {
    return this.data.skills || [];
  }

  // --- 合計値 ---
  get totalAttack() {
    return this.baseAttack + this.basicSkillAttack + this.specialSkillAttack;
  }
  get totalDefense() {
    return this.baseDefense + this.basicSkillDefense + this.specialSkillDefense;
  }
  get totalAccuracy() {
    return this.baseAccuracy + this.basicSkillAccuracy + this.specialSkillAccuracy;
  }
  get totalMobility() {
    return this.baseMobility + this.basicSkillMobility + this.specialSkillMobility;
  }
}
export default Pilot;
