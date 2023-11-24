class PilotList {
  static get PILOTS() {
    return [
      new Pilot(
        "アクセル・アルマー",
        ["ソウルゲイン"],
        { atk: 7271, def: 6976, hit: 612, agi: 528 },
        [
          { name: "必中", count: 1 },
          { name: "気合", count: 1 },
          { name: "不屈", count: 1 },
          { name: "覚醒", count: 1 },
          { name: "激闘", count: 1 },
          { name: "魂", count: 1 },
        ],
        [
          new PilotSkill("特殊処理班隊長", 20, { def: "13%", give: "16%" }),
          new PilotSkill("アタッカー（アクセル）", 10, {
            atk: { type: "energy", per: 10, value: "2%" },
          }),
          new PilotSkill("強靭（アクセル）", 20, {
            hp: 25000,
            spirit: { type: "energy", over: 10, value: ["熱血", "必中"] },
          }),
          new PilotSkill("攻撃力アップ", 11, { atk: "6%" }),
          new PilotSkill("防御力アップ", 11, { def: "6%" }),
          new PilotSkill("防御力アップ（大）", 20, { def: "15%" }),
          new PilotSkill("照準値・運動性アップ（大）", 7, {
            hit: "4%",
            agi: "4%",
          }),
          new PilotSkill("攻撃力アップ・気力+（アクション）（大）", 15, {
            atk: "8%",
            energy: { type: "自アクション", value: 1 },
          }),
          new PilotSkill("命中率アップ（大）", 12, { hit: "9%" }),
        ]
      ),
    ];
  }
}
