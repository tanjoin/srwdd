class SuperRobotWarDDModel {
  constructor(options) {
    if (options) {
      Object.assign(this, options);
    } else {
      this.data = {};
    }
  }

  get unitPartsList() {
    return this.data.unitPartsList || [];
  }

  set unitPartsList(value) {
    this.data.unitPartsList = value.map((item) => item.data);
  }

  get pilots() {
    return this.data.pilots || [];
  }

  set pilots(value) {
    this.data.pilots = value.map((item) => item.data);
  }

  get units() {
    return this.data.units || [];
  }

  set units(value) {
    this.data.units = value.map((item) => item.data);
  }

  get abilityChips() {
    return this.data.abilityChips || [];
  }

  set abilityChips(value) {
    this.data.abilityChips = value.map((item) => item.data);
  }

  get skills() {
    return this.data.skills || [];
  }

  set skills(value) {
    this.data.skills = value.map((item) => item.data);
  }
}
export default SuperRobotWarDDModel;
