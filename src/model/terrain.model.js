// 地形
class Terrain {
  static get TYPE_AIR() {
    return "空";
  }

  static get TYPE_LAND() {
    return "陸";
  }

  static get TYPE_SEA() {
    return "海";
  }

  static get TYPE_SPACE() {
    return "宇";
  }

  static get RANK_A() {
    return "A";
  }

  static get RANK_B() {
    return "B";
  }

  static get RANK_C() {
    return "C";
  }

  static get RANK_S() {
    return "S";
  }

  constructor(options) {
    if (options) {
      Object.assign(this, options);
    } else {
      this.data = {};
    }
  }

  get type() {
    return this.data.type;
  }

  get rank() {
    return this.data.rank;
  }
}
export default Terrain;
