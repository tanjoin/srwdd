class Skill {
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

  // 対応パイロット名（カンマ区切り対応）
  get pilotNames() {
    if (Array.isArray(this.data.pilotNames)) return this.data.pilotNames;
    if (typeof this.data.pilotNames === "string") {
      return this.data.pilotNames.split(",").map(s => s.trim()).filter(Boolean);
    }
    return [];
  }

  get description() {
    return this.data.description;
  }

  get level() {
    return this.data.level;
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

  get effect() {
    return this.data.effect || "";
  }
}
export default Skill;
