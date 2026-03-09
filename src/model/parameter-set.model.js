class ParameterSet {
  static get STAT_KEYS() {
    return [
      "hp",
      "attack",
      "defense",
      "accuracy",
      "mobility",
      "movement",
      "speed",
      "trait",
      "power",
      "hitRate",
      "range",
      "action",
      "uses",
    ];
  }

  constructor(options) {
    if (options) {
      Object.assign(this, options);
    } else {
      this.data = {};
    }
  }

  get data() {
    return this._data;
  }

  set data(value) {
    this._data = {};
    ParameterSet.STAT_KEYS.forEach((key) => {
      if (key === "range") {
        const range = value?.[key] || { min: 0, max: 0 };
        this._data[key] = {
          min: Number(range.min) || 0,
          max: Number(range.max) || 0,
        };
        return;
      }
      this._data[key] = Number(value?.[key]) || 0;
    });
  }

  get hp() {
    return this.data.hp;
  }

  get attack() {
    return this.data.attack;
  }

  get defense() {
    return this.data.defense;
  }

  get accuracy() {
    return this.data.accuracy;
  }

  get mobility() {
    return this.data.mobility;
  }

  get movement() {
    return this.data.movement;
  }

  get speed() {
    return this.data.speed;
  }

  get trait() {
    return this.data.trait;
  }

  get power() {
    return this.data.power;
  }

  get hitRate() {
    return this.data.hitRate;
  }

  get range() {
    return this.data.range;
  }

  get action() {
    return this.data.action;
  }

  get uses() {
    return this.data.uses;
  }

  getValue(stat) {
    if (stat === "range") {
      return this.range;
    }
    return Number(this.data[stat]) || 0;
  }

  setValue(stat, value) {
    if (stat === "range") {
      this.data.range = {
        min: Number(value?.min) || 0,
        max: Number(value?.max) || 0,
      };
      return;
    }
    this.data[stat] = Number(value) || 0;
  }

  toObject() {
    return {
      ...this.data,
      range: { ...this.range },
    };
  }
}

export default ParameterSet;