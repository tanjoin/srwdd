// アビリティチップ
class AbilityChip {
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

  get baseAbility() {
    return this.data.baseAbility || [];
  }

  get exAbility() {
    return this.data.exAbility || [];
  }
  
  get spAbility() {
    return this.data.spAbility || [];
  }
}
export default AbilityChip;
