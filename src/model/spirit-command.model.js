// 精神コマンド
class SpiritCommand {
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

  get description() {
    return this.data.description;
  }

  get uses() {
    return this.data.uses || 0;
  }
}
export default SpiritCommand;
