import SkillEffectParser from './skill-effect-parser.model.js';

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

  get textEffectRateBonuses() {
    return this._getMatchedEquippedSkills().reduce((acc, skill) => {
      const bonuses = SkillEffectParser.extractParameterRateBonuses(skill?.effect || '');
      acc.attack += bonuses.attack;
      acc.defense += bonuses.defense;
      acc.accuracy += bonuses.accuracy;
      acc.mobility += bonuses.mobility;
      return acc;
    }, SkillEffectParser.createEmptyBonusSet());
  }

  get textEffectAttackRate() {
    return this.textEffectRateBonuses.attack;
  }

  get textEffectDefenseRate() {
    return this.textEffectRateBonuses.defense;
  }

  get textEffectAccuracyRate() {
    return this.textEffectRateBonuses.accuracy;
  }

  get textEffectMobilityRate() {
    return this.textEffectRateBonuses.mobility;
  }

  _sumSpecialSkill(key) {
    return this._getMatchedEquippedSkills().reduce((acc, skill) => acc + (Number(skill?.[key]) || 0), 0);
  }

  _getMatchedEquippedSkills() {
    if (!this.skillList) return [];
    const pilotName = (this.name || '').trim();
    if (!pilotName) return [];
    const equipped = new Set(this.equippedSkillIds.map(String));
    if (equipped.size === 0) return [];
    return this.skillList.filter((skill) => {
      const skillId = skill?.id != null ? String(skill.id) : '';
      if (!equipped.has(skillId)) return false;
      const names = Array.isArray(skill.pilotNames) ? skill.pilotNames : [];
      return names.some((name) => name.includes(pilotName));
    });
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
