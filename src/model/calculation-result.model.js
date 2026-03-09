class CalculationResult {
  constructor(options) {
    if (options) {
      Object.assign(this, options);
    } else {
      this.data = {};
    }
  }

  get finalStats() {
    return this.data.finalStats || {};
  }

  get breakdown() {
    return this.data.breakdown || {};
  }

  getFinalValue(stat) {
    return Number(this.finalStats[stat]) || 0;
  }

  getBreakdown(stat) {
    return this.breakdown[stat] || [];
  }
}

export default CalculationResult;