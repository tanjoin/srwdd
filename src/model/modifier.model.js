class Modifier {
  static get OPERATION_FLAT() {
    return "flat";
  }

  static get OPERATION_RATE() {
    return "rate";
  }

  static get CONDITION_ALWAYS() {
    return "always";
  }

  static get CONDITION_WHEN_SLOTTED_AS_FINISHER() {
    return "whenSlottedAsFinisher";
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

  get source() {
    return this.data.source || "";
  }

  get stat() {
    return this.data.stat || "";
  }

  get operation() {
    return this.data.operation || Modifier.OPERATION_FLAT;
  }

  get value() {
    return Number(this.data.value) || 0;
  }

  get condition() {
    return this.data.condition || Modifier.CONDITION_ALWAYS;
  }

  get priority() {
    return Number(this.data.priority) || 0;
  }

  get enabled() {
    return this.data.enabled !== false;
  }
}

export default Modifier;