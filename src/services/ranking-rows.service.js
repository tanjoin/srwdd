export function buildRankingRows({ units, pilotById }) {
  return units
    .map(u => {
      const pilot = pilotById.get(String(u.pilotId));
      if (!pilot) return null;

      const attack = (Number(u.attack) || 0) + (Number(pilot.totalAttack) || 0);
      const defense = (Number(u.defense) || 0) + (Number(pilot.totalDefense) || 0);
      const accuracy = (Number(u.accuracy) || 0) + (Number(pilot.totalAccuracy) || 0);
      const mobility = (Number(u.mobility) || 0) + (Number(pilot.totalMobility) || 0);
      const baseHp = Number(u.data?.baseHp ?? u.baseHp ?? u.hp) || 0;
      const partsIncreaseHp = Number(u.data?.partsIncreaseHp ?? u.partsIncreaseHp ?? 0) || 0;
      const combatPower = Math.round(
        (baseHp / 9) +
        (partsIncreaseHp * (2 / 3)) +
        attack +
        defense +
        (accuracy * 10) +
        (mobility * 10)
      );

      return {
        unitId: String(u.id || ''),
        unitName: u.name || '',
        pilotName: pilot.name || '',
        hp: Number(u.hp) || 0,
        baseHp,
        partsIncreaseHp,
        movement: Number(u.movement) || 0,
        speed: Number(u.speed) || 0,
        attack,
        defense,
        accuracy,
        mobility,
        total: attack + defense + accuracy + mobility,
        combatPower,
      };
    })
    .filter(Boolean);
}