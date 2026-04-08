class SkillEffectParser {
  static get parseableStatLabels() {
    return ['攻撃力', '防御力', '照準値', '運動性'];
  }

  static get effectStatMap() {
    return {
      攻撃力: 'attack',
      防御力: 'defense',
      照準値: 'accuracy',
      運動性: 'mobility',
    };
  }

  static get rateEffectPattern() {
    const labelGroup = SkillEffectParser.parseableStatLabels.join('|');
    return new RegExp(`((?:${labelGroup})(?:・(?:${labelGroup}))*)が(\\d+(?:\\.\\d+)?)%(?:増加)?`, 'g');
  }

  static get blockedEffectPatterns() {
    return [
      '敵ユニット',
      '味方の',
      '付与する',
      '毎に',
      '応じて',
      '時のみ',
      '以上のとき',
      '以下のとき',
      'とき、',
      'とき。',
      'とき ',
    ];
  }

  static createEmptyBonusSet() {
    return {
      attack: 0,
      defense: 0,
      accuracy: 0,
      mobility: 0,
    };
  }

  static extractParameterRateBonuses(effectText = '') {
    const bonuses = SkillEffectParser.createEmptyBonusSet();
    const clauses = String(effectText)
      .split('。')
      .map((clause) => clause.trim())
      .filter(Boolean);

    clauses.forEach((clause) => {
      if (!SkillEffectParser.isClauseParseable(clause)) {
        return;
      }

      const matches = clause.matchAll(SkillEffectParser.rateEffectPattern);
      for (const match of matches) {
        const statList = String(match[1] || '');
        const rate = Number(match[2]) || 0;
        statList
          .split('・')
          .map((label) => SkillEffectParser.effectStatMap[label])
          .filter(Boolean)
          .forEach((statKey) => {
            bonuses[statKey] += rate;
          });
      }
    });

    return bonuses;
  }

  static isClauseParseable(clause = '') {
    const text = String(clause || '').trim();
    if (!text) return false;
    return !SkillEffectParser.blockedEffectPatterns.some((pattern) => text.includes(pattern));
  }

  static get highlightableLabelPattern() {
    return /攻撃力|防御力|照準値|運動性/g;
  }

  static applyRateBonus(baseValue, rate) {
    const numericBase = Number(baseValue) || 0;
    const numericRate = Number(rate) || 0;
    return Math.floor(numericBase * (1 + (numericRate / 100)));
  }
}

export default SkillEffectParser;