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
      'につき',
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

  static extractParameterRateBonuses(effectText = '', context = {}) {
    const bonuses = SkillEffectParser.createEmptyBonusSet();
    const clauses = String(effectText)
      .split('。')
      .map((clause) => clause.trim())
      .filter(Boolean);

    clauses.forEach((clause) => {
      const matches = clause.matchAll(SkillEffectParser.rateEffectPattern);
      for (const match of matches) {
        const prefix = clause.slice(0, match.index || 0);
        const conditionState = SkillEffectParser.evaluateSupportedConditions(prefix, context);
        if (!conditionState.isSatisfied) {
          continue;
        }
        if (!SkillEffectParser.isMatchParseable(conditionState.remainingText)) {
          continue;
        }
        if (!SkillEffectParser.areEquipmentConditionsSatisfied(conditionState.remainingText, context)) {
          continue;
        }
        const statList = String(match[1] || '');
        const rate = (Number(match[2]) || 0) * conditionState.rateMultiplier;
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

  static isMatchParseable(prefix = '') {
    const text = String(prefix || '').trim();
    if (!text) return true;
    return !SkillEffectParser.blockedEffectPatterns.some((pattern) => text.includes(pattern));
  }

  static evaluateSupportedConditions(prefix = '', context = {}) {
    let remainingText = SkillEffectParser.normalizeMatchPrefix(prefix);
    let rateMultiplier = 1;
    const morale = SkillEffectParser.getMoraleFromContext(context);

    const perTenMoraleMatches = [...remainingText.matchAll(/気力が?10上昇する毎に/g)];
    if (perTenMoraleMatches.length > 0) {
      rateMultiplier *= Math.max(0, Math.floor((morale - 100) / 10));
      remainingText = remainingText.replace(/気力が?10上昇する毎に/g, '');
    }

    for (const match of remainingText.matchAll(/気力が?(\d+)以上のとき/g)) {
      if (morale < (Number(match[1]) || 0)) {
        return { isSatisfied: false, remainingText: '', rateMultiplier: 0 };
      }
    }
    remainingText = remainingText.replace(/気力が?(\d+)以上のとき/g, '');

    for (const match of remainingText.matchAll(/気力が?(\d+)以下のとき/g)) {
      if (morale > (Number(match[1]) || 0)) {
        return { isSatisfied: false, remainingText: '', rateMultiplier: 0 };
      }
    }
    remainingText = remainingText.replace(/気力が?(\d+)以下のとき/g, '');

    return {
      isSatisfied: true,
      remainingText: SkillEffectParser.cleanupPrefix(remainingText),
      rateMultiplier,
    };
  }

  static normalizeMatchPrefix(prefix = '') {
    const labelGroup = SkillEffectParser.parseableStatLabels.join('|');
    const previousEffectPattern = new RegExp(`((?:${labelGroup})(?:・(?:${labelGroup}))*)が\\d+(?:\\.\\d+)?%(?:増加)?(?:し)?`, 'g');
    return SkillEffectParser.cleanupPrefix(String(prefix || '').replace(previousEffectPattern, ''));
  }

  static cleanupPrefix(prefix = '') {
    return String(prefix || '')
      .replace(/、+/g, '、')
      .replace(/^[、\s]+/, '')
      .replace(/[、\s]+$/, '')
      .trim();
  }

  static getMoraleFromContext(context = {}) {
    return Number(context?.morale) || 100;
  }

  static areEquipmentConditionsSatisfied(prefix = '', context = {}) {
    const text = String(prefix || '').trim();
    if (!text.includes('装備時')) {
      return true;
    }

    const equippedNames = new Set(
      (Array.isArray(context?.equippedNames) ? context.equippedNames : [])
        .map((name) => String(name || '').trim())
        .filter(Boolean)
    );
    if (equippedNames.size === 0) {
      return false;
    }

    const matches = text.matchAll(/([^、。]+?)装備時/g);
    let foundCondition = false;
    for (const match of matches) {
      const targetName = String(match[1] || '')
        .replace(/^かつ/, '')
        .trim();
      if (!targetName) {
        continue;
      }
      foundCondition = true;
      if (!equippedNames.has(targetName)) {
        return false;
      }
    }

    return foundCondition;
  }

  static getHighlightableLabelRanges(clause = '', context = {}, respectEquipmentContext = false) {
    const text = String(clause || '');
    const ranges = [];
    const labelPattern = new RegExp(SkillEffectParser.highlightableLabelPattern.source, 'g');

    for (const match of text.matchAll(SkillEffectParser.rateEffectPattern)) {
      const prefix = text.slice(0, match.index || 0);
      const conditionState = SkillEffectParser.evaluateSupportedConditions(prefix, context);
      if (!conditionState.isSatisfied) {
        continue;
      }
      if (!SkillEffectParser.isMatchParseable(conditionState.remainingText)) {
        continue;
      }
      if (respectEquipmentContext && !SkillEffectParser.areEquipmentConditionsSatisfied(conditionState.remainingText, context)) {
        continue;
      }

      const wholeMatch = String(match[0] || '');
      const statList = String(match[1] || '');
      const statListOffset = wholeMatch.indexOf(statList);
      if (statListOffset < 0) {
        continue;
      }

      for (const labelMatch of statList.matchAll(labelPattern)) {
        ranges.push({
          start: (match.index || 0) + statListOffset + (labelMatch.index || 0),
          end: (match.index || 0) + statListOffset + (labelMatch.index || 0) + String(labelMatch[0] || '').length,
          label: String(labelMatch[0] || ''),
        });
      }
    }

    return ranges;
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