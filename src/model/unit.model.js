// 機体
class Unit {
  static get TYPE_ATTACK() {
    return "攻撃特化";
  }

  static get TYPE_ATTACK_DEFENSE() {
    return "攻撃&防御";
  }

  static get TYPE_ATTACK_ACCURACY() {
    return "攻撃&照準";
  }

  static get TYPE_ATTACK_EVASION() {
    return "攻撃&回避";
  }

  static get TYPE_DEFENSE() {
    return "防御特化";
  }

  static get TYPE_DEFENSE_ACCURACY() {
    return "防御&照準";
  }

  static get TYPE_DEFENSE_EVASION() {
    return "防御&回避";
  }

  static get TYPE_ACCURACY() {
    return "照準特化";
  }

  static get TYPE_ACCURACY_EVASION() {
    return "照準&回避";
  }

  static get TYPE_EVASION() {
    return "回避特化";
  }

  static get TYPE_BALANCED() {
    return "バランス";
  }

  static get SIZE_LL() {
    return "LL";
  }

  static get SIZE_L() {
    return "L";
  }

  static get SIZE_M() {
    return "M";
  }

  static get SIZE_S() {
    return "S";
  }

  static get SIZE_SS() {
    return "SS";
  }

  static get WEAPON_PHYSICAL() {
    return "実弾";
  }

  static get WEAPON_STRIKE() {
    return "打撃";
  }

  static get WEAPON_SLASH() {
    return "斬撃";
  }

  static get WEAPON_BEAM() {
    return "ビーム";
  }

  static get WEAPON_SPECIAL() {
    return "特殊";
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

  get size() {
    return this.data.size;
  }

  get type() {
    return this.data.type;
  }

  get terrain() {
    return (
      this.data.terrain || [
        new Terrain({ type: Terrain.TYPE_LAND, rank: Terrain.RANK_C }),
        new Terrain({ type: Terrain.TYPE_SEA, rank: Terrain.RANK_C }),
        new Terrain({ type: Terrain.TYPE_AIR, rank: Terrain.RANK_C }),
        new Terrain({ type: Terrain.TYPE_SPACE, rank: Terrain.RANK_C }),
      ]
    );
  }

  get hp() {
    return this.data.hp || 0;
  }

  get attack() {
    return this.data.attack || 0;
  }

  get defense() {
    return this.data.defense || 0;
  }

  get accuracy() {
    return this.data.accuracy || 0;
  }

  get mobility() {
    return this.data.mobility || 0;
  }

  get movement() {
    return this.data.movement || 0;
  }

  get speed() {
    return this.data.speed || 0;
  }

  get normalWeapon() {
    return this.data.normalWeapon || {};
  }
}
export default Unit;
