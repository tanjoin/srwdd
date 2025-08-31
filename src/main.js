import './style.css';
import Papa from 'papaparse';

let allPilots = [];

// 比較機能：パイロット選択のプルダウンにオプションを追加
function createOption(pilot) {
	const opt = document.createElement('option');
	opt.value = pilot.id;
	opt.textContent = `${pilot.name}（${pilot.series}）`;
	return opt;
}

// 比較機能：比較結果を表示
function showResult(pilot1, pilot2) {
  const resultDiv = document.getElementById('result');
  
  const calculateTotal = (stats) => {
    let total = 0;
    for (const key in stats) {
      total += stats[key];
    }
    return total;
  };

  let html = `
    <div class="comparison-table">
      <div class="table-header">
        <div class="header-item">ステータス</div>
        <div class="header-item">${pilot1.name}</div>
        <div class="header-item">${pilot2.name}</div>
      </div>
      <div class="table-body">
  `;

  const statsKeys = ["攻撃力", "防御力", "照準値", "運動性"];

  for (const key of statsKeys) {
    const total1 = calculateTotal(pilot1.stats[key]);
    const total2 = calculateTotal(pilot2.stats[key]);
    const winnerClass1 = total1 > total2 ? 'winner' : '';
    const winnerClass2 = total2 > total1 ? 'winner' : '';

    html += `
      <div class="table-row">
        <div class="row-item status-name">${key}</div>
        <div class="row-item ${winnerClass1}">${total1.toLocaleString()}</div>
        <div class="row-item ${winnerClass2}">${total2.toLocaleString()}</div>
      </div>
    `;
  }

  html += '</div></div>';
  resultDiv.innerHTML = html;
}

// ランキング機能：ランキングのセクションを作成
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

// ランキング機能：ランキング全体を表示
function displayRanking(pilots) {
  const rankingContainer = document.querySelector('.ranking-container');
  rankingContainer.innerHTML = '';

  const processedPilots = pilots.map(pilot => {
    const totalStats = {};
    for (const statName in pilot.stats) {
      const total = Object.values(pilot.stats[statName]).reduce((sum, value) => sum + (Number(value) || 0), 0);
      totalStats[statName] = total;
    }
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

// 共通：CSVファイルを処理
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

// DOM読み込み後の初期化処理
window.addEventListener('DOMContentLoaded', async () => {
  const csvFileInput = document.getElementById('csvFileInput');
  const select1 = document.getElementById('pilot1');
  const select2 = document.getElementById('pilot2');
  const compareBtn = document.getElementById('compareBtn');
  const showComparisonBtn = document.getElementById('show-comparison');
  const showRankingBtn = document.getElementById('show-ranking');
  const comparisonView = document.getElementById('comparison-view');
  const rankingView = document.getElementById('ranking-view');

  // CSVファイル選択時の処理
  csvFileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    processCSV(file, (pilots) => {
      allPilots = pilots;
      
      // 比較機能のプルダウンを更新
      select1.innerHTML = '';
      select2.innerHTML = '';
      pilots.forEach(pilot => {
        select1.appendChild(createOption(pilot));
        select2.appendChild(createOption(pilot));
      });
      select1.selectedIndex = 0;
      select2.selectedIndex = 1;
      compareBtn.disabled = false;

      // ランキングを表示
      displayRanking(pilots);
    });
  });

  // 比較ボタンの処理
  compareBtn.addEventListener('click', () => {
    const pilot1 = allPilots.find(p => p.id == select1.value);
    const pilot2 = allPilots.find(p => p.id == select2.value);
    if (pilot1 && pilot2) {
      showResult(pilot1, pilot2);
    }
  });

  // 表示切替ボタンの処理
  showComparisonBtn.addEventListener('click', () => {
    comparisonView.style.display = 'block';
    rankingView.style.display = 'none';
    showComparisonBtn.classList.add('active');
    showRankingBtn.classList.remove('active');
  });

  showRankingBtn.addEventListener('click', () => {
    comparisonView.style.display = 'none';
    rankingView.style.display = 'block';
    showComparisonBtn.classList.remove('active');
    showRankingBtn.classList.add('active');
  });
});
