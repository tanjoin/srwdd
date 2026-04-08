// ユニットパーツ
class Weapon {
  static get TYPE_FINISHER() {
    return "必殺技";
  }

  static get TYPE_SUPPORT() {
    return "支援";
  }

  constructor(options) {
    if (options) {
      Object.assign(this, options);
    } else {
      this.data = {};
    }
  }

  get id() {
    return this.data.id;
  }

  get name() {
    return this.data.name;
  }

  get unitId() {
    return this.data.unitId || '';
  }

  get unitIds() {
    if (Array.isArray(this.data.unitIds)) return this.data.unitIds;
    if (this.data.unitId) return [this.data.unitId];
    return [];
  }

  get pilotId() {
    return this.data.pilotId || '';
  }

  get rarity() {
    return this.data.rarity || '';
  }

  get isSupportCategory() {
    return Boolean(this.data.isSupportCategory) || this.data.type === Weapon.TYPE_SUPPORT;
  }

  get type() {
    return this.data.type;
  }

  // HP
  get hp() {
    return this.data.hp || 0;
  }

  get terrain() {
    return this.data.terrain || {
      air: '',
      land: '',
      sea: '',
      space: '',
    };
  }

  get map() {
    return this.data.map || {
      enabled: false,
      label: '',
      image: '',
      target: '',
      areaType: '',
    };
  }

  // 攻撃
  get attack() {
    return this.data.attack || 0;
  }

  // 防御
  get defense() {
    return this.data.defense || 0;
  }

  // 照準値
  get accuracy() {
    return this.data.accuracy || 0;
  }

  // 運動性
  get mobility() {
    return this.data.mobility || 0;
  }

  // 特性
  get trait() {
    return this.data.trait || 0;
  }

  // 威力
  get power() {
    return this.data.power || 0;
  }

  // 命中率
  get hitRate() {
    return this.data.hitRate || 0;
  }

  // 射程
  get range() {
    return this.data.range || { min: 0, max: 0 };
  }

  // アクション
  get action() {
    return this.data.action || 0;
  }

  // 回数
  get uses() {
    return this.data.uses || 0;
  }

  get spiritCommand() {
    return this.data.spiritCommand || {
      name: '',
      uses: '',
      description: '',
    };
  }

  // MAIN
  get mainSlot() {
    return (
      this.data.main || {
        name: "",
        description: "",
        effect: [],
      }
    );
  }

  // 必殺スロット時
  get finisherSlot() {
    return (
      this.data.finisherSlot || {
        name: "",
        description: "",
        effect: [],
      }
    );
  }

  // SUB
  get subSlot() {
    return (
      this.data.subSlot || {
        name: "",
        description: "",
        effect: [],
      }
    );
  }
}
export default Weapon;
