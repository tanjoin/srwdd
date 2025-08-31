import './style.css';
import Papa from 'papaparse';

function processCSV(file, callback) {
  Papa.parse(file, {
    header: true,
    dynamicTyping: true,
    complete: (results) => {
      const pilots = results.data.map(row => {
        const stats = {};
        for (const key in row) {
          if (key.includes('_')) {
            const [statName, subStatName] = key.split('_');
            if (!stats[statName]) {
              stats[statName] = {};
            }
            stats[statName][subStatName] = row[key];
          }
        }
        return {
          id: row.id,
          name: row.name,
          series: row.series,
          stats: stats
        };
      }).filter(p => p.id); // idがない行は除外
      callback(pilots);
    }
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

function displayRanking(pilots) {
  const rankingContainer = document.querySelector('.ranking-container');
  const fileInput = rankingContainer.querySelector('#csvFileInputRanking');
  rankingContainer.innerHTML = '';
  if (fileInput) {
      rankingContainer.appendChild(fileInput);
  }

  const processedPilots = pilots.map(pilot => {
    const totalStats = {};
    for (const statName in pilot.stats) {
      const total = Object.values(pilot.stats[statName]).reduce((sum, value) => sum + (Number(value) || 0), 0);
      totalStats[statName] = total;
    }
    // 攻撃力・防御力と、照準値・運動性のスケールを考慮した総合値を計算
    const grandTotal = (totalStats['攻撃力'] || 0) + (totalStats['防御力'] || 0) + ((totalStats['照準値'] || 0) + (totalStats['運動性'] || 0)) * 10;
    
    pilot.totalStats = totalStats;
    pilot.grandTotal = grandTotal;
    return pilot;
  });

  const statsToRank = {
    '総合値': '総合値ランキング',
    '攻撃力': '攻撃力ランキング',
    '防御力': '防御力ランキング',
    '照準値': '照準値ランキング',
    '運動性': '運動性ランキング'
  };

  for (const stat in statsToRank) {
    const title = statsToRank[stat];
    const rankingSection = createRanking(processedPilots, stat, title);
    rankingContainer.appendChild(rankingSection);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const csvFileInput = document.getElementById('csvFileInputRanking');

  csvFileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    processCSV(file, displayRanking);
  });
});
