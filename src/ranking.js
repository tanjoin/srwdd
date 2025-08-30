import './style.css';

async function loadPilots() {
  const res = await fetch('/src/data/pilots.json');
  const pilots = await res.json();
  return pilots.map(pilot => {
    const totalStats = {};
    let grandTotal = 0;
    for (const statName in pilot.stats) {
      const total = Object.values(pilot.stats[statName]).reduce((sum, value) => sum + value, 0);
      totalStats[statName] = total;
      grandTotal += total;
    }
    pilot.totalStats = totalStats;
    pilot.grandTotal = grandTotal;
    return pilot;
  });
}

function createRanking(pilots, stat, title) {
  const container = document.createElement('div');
  container.className = 'ranking-section';

  const sortedPilots = [...pilots].sort((a, b) => {
    const statA = stat === '総合値' ? a.grandTotal : a.totalStats[stat];
    const statB = stat === '総合値' ? b.grandTotal : b.totalStats[stat];
    return statB - statA;
  });

  let html = `<h2>${title}</h2><ol>`;
  sortedPilots.slice(0, 10).forEach((p, index) => {
    const pilotStat = stat === '総合値' ? p.grandTotal : p.totalStats[stat];
    html += `<li>
      <span class="rank">${index + 1}</span>
      <span class="name">${p.name}</span>
      <span class="stat">${pilotStat.toLocaleString()}</span>
    </li>`;
  });
  html += '</ol>';
  container.innerHTML = html;
  return container;
}


window.addEventListener('DOMContentLoaded', async () => {
  const pilots = await loadPilots();
  const rankingContainer = document.querySelector('.ranking-container');

  const statsToRank = {
    '総合値': '総合値ランキング',
    '攻撃力': '攻撃力ランキング',
    '防御力': '防御力ランキング',
    '照準値': '照準値ランキング',
    '運動性': '運動性ランキング'
  };

  for (const stat in statsToRank) {
    const title = statsToRank[stat];
    const rankingSection = createRanking(pilots, stat, title);
    rankingContainer.appendChild(rankingSection);
  }
});
