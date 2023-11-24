class MechaList {
  static get MECHAS() {
    return [
      new Mecha(
        "アーバレスト",
        {
          hp: 20250,
          atk: 2830,
          def: 2500,
          sight: 259,
          agi: 304,
          mov: 3,
          spd: 625,
        },
        "S",
        ["攻撃", "回避"],
        { air: "B", grd: "A", wtr: "B", spc: "A" },
        new Weapon("57mm散弾砲ボクサー", "実弾", { min: 1, max: 2 }),
        new SpecialSkill("超硬装甲（照準値）", 5, { def: 1000, sight: 100 })
      ),
      new Mecha(
        "ヴァルヴレイヴⅥ",
        {
          hp: 21000,
          atk: 3130,
          def: 2770,
          sight: 316,
          agi: 253,
          mov: 3,
          spd: 550,
        },
        "M",
        ["バランス"],
        { air: "A", grd: "A", wtr: "B", spc: "A" },
        new Weapon("バリアブル・バルカン", "斬撃", { min: 1, max: 2 }),
        new SpecialSkill("超硬装甲（照準値）", 5, { def: 1000, sight: 100 })
      ),
      new Mecha(
        "ソウルゲイン",
        {
          hp: 21750,
          atk: 3190,
          def: 3070,
          sight: 244,
          agi: 226,
          mov: 3,
          spd: 475,
        },
        "L",
        ["攻撃", "防御"],
        { air: "B", grd: "A", wtr: "B", spc: "A" },
        new Weapon("青龍鱗", "特殊", { min: 1, max: 2 }),
        new SpecialSkill("超硬装甲（HP）", 5, { hp: 2000, def: 1000 })
      ),
      new Mecha(
        "蜃気楼",
        {
          hp: 22000,
          atk: 2980,
          def: 3070,
          sight: 310,
          agi: 259,
          mov: 3,
          spd: 625,
        },
        "S",
        ["バランス"],
        { air: "A", grd: "A", wtr: "A", spc: "A" },
        new Weapon("ハドロンショット", "特殊", { min: 1, max: 3 }),
        new SpecialSkill("絶対守護領域", 6, { received: -3500 })
      ),
      new Mecha(
        "マジンエンペラーG",
        {
          hp: 26000,
          atk: 3340,
          def: 3160,
          sight: 253,
          agi: 232,
          mov: 3,
          spd: 570,
        },
        "M",
        ["攻撃", "防御"],
        { air: "A", grd: "A", wtr: "B", spc: "A" },
        new Weapon("グレートスマッシャーパンチ", "打撃", { min: 1, max: 2 }),
        new SpecialSkill("超硬装甲（HP）", 5, { hp: 2000, def: 1000 })
      ),
      new Mecha(
        "ダブルオーガンダム",
        {
          hp: 26000,
          atk: 3190,
          def: 2530,
          sight: 247,
          agi: 316,
          mov: 4,
          spd: 570,
        },
        "M",
        ["攻撃", "回避"],
        { air: "A", grd: "A", wtr: "B", spc: "A" },
        new Weapon("GNビームサーベル（ダブルオーガンダム）", "斬撃", {
          min: 1,
          max: 2,
        }),
        new SpecialSkill("超硬装甲（照準値）", 5, { def: 1000, sight: 100 })
      ),
      new Mecha(
        "グリッドマン",
        {
          hp: 26000,
          atk: 3310,
          def: 3190,
          sight: 256,
          agi: 229,
          mov: 3,
          spd: 475,
        },
        "L",
        ["攻撃", "防御"],
        { air: "B", grd: "A", wtr: "B", spc: "A" },
        new Weapon("格闘（グリッドマン）", "打撃", { min: 1, max: 2 }),
        new SpecialSkill("超硬装甲（照準値）", 5, { def: 1000, sight: 100 })
      ),
      new Mecha(
        "ナイチンゲール",
        {
          hp: 18100,
          atk: 2864,
          def: 2144,
          sight: 235,
          agi: 293,
          mov: 4,
          spd: 550,
        },
        "M",
        ["バランス"],
        { air: "B", grd: "A", wtr: "B", spc: "A" },
        new Weapon("マイクロミサイル", "実弾", { min: 1, max: 4 }),
        new SpecialSkill("超硬装甲（照準値）", 2, { def: 400, sight: 40 })
      ),
      new Mecha(
        "スコープドッグRSC",
        {
          hp: 20250,
          atk: 2950,
          def: 2530,
          sight: 310,
          agi: 316,
          mov: 3,
          spd: 625,
        },
        "S",
        ["命中", "回避"],
        { air: "B", grd: "A", wtr: "B", spc: "B" },
        new Weapon("ヘビィマシンガン", "実弾", { min: 1, max: 3 }),
        new SpecialSkill("超硬装甲（照準値）", 5, { def: 1000, sight: 100 })
      ),
      new Mecha(
        "M9D ファルケ",
        {
          hp: 20250,
          atk: 3040,
          def: 2260,
          sight: 262,
          agi: 304,
          mov: 3,
          spd: 625,
        },
        "S",
        ["回避"],
        { air: "B", grd: "A", wtr: "B", spc: "A" },
        new Weapon("400mmアサルト・ライフル", "実弾", { min: 1, max: 3 }),
        new SpecialSkill("超硬装甲（照準値）", 5, { def: 1000, sight: 100 })
      ),
      new Mecha(
        "Hi-νガンダム",
        {
          hp: 26000,
          atk: 3220,
          def: 2410,
          sight: 244,
          agi: 328,
          mov: 3,
          spd: 550,
        },
        "M",
        ["攻撃", "回避"],
        { air: "B", grd: "A", wtr: "B", spc: "A" },
        new Weapon("ビーム・ライフル", "ビーム", { min: 1, max: 4 }),
        new SpecialSkill("Iフィールド△", 5, {
          received: { type: "ビーム", value: -2500 },
          sight: 100,
        })
      ),
    ];
  }
}
