import './style.css';
import Papa from 'papaparse';

let allPilots = [];
const activeSkills = {}; // { pilotId: { skillKey: true, ... }, ... }

// スキルテキストを解析して効果を返す
function parseSkillEffect(skillText) {
  const effects = [];
  const statMapping = {
    '攻撃力': '攻撃力',
    '防御力': '防御力',
    '照準値': '照準値',
    '運動性': '運動性',
    'HP': 'HP',
    '与ダメージ': '与ダメージ', // 攻撃力から与ダメージに修正
  };

  // "攻撃力・照準値が12.5%増加" のような形式をパース
  const regexMulti = /(攻撃力|防御力|照準値|運動性|HP|与ダメージ)(・(攻撃力|防御力|照準値|運動性|HP|与ダメージ))+が([\d.]+)%増加/g;
  let matchMulti;
  while ((matchMulti = regexMulti.exec(skillText)) !== null) {
    const stats = matchMulti[0].split('が')[0].split('・');
    const value = parseFloat(matchMulti[matchMulti.length - 1]);
    stats.forEach(stat => {
      if (statMapping[stat]) {
        effects.push({ stat: statMapping[stat], value: value, type: 'percentage' });
      }
    });
  }
  
  // "全ての攻撃の与ダメージが12%、照準値・運動性が5%増加する" のような複雑な形式
  const regexComplex = /全ての攻撃の与ダメージが([\d.]+)%、(照準値・運動性)が([\d.]+)%増加する/g;
  let matchComplex;
  while((matchComplex = regexComplex.exec(skillText)) !== null) {
    const damageValue = parseFloat(matchComplex[1]);
    effects.push({ stat: '与ダメージ', value: damageValue, type: 'percentage' });
    const otherStats = matchComplex[2].split('・');
    const otherValue = parseFloat(matchComplex[3]);
    otherStats.forEach(stat => {
      if(statMapping[stat]) {
        effects.push({ stat: statMapping[stat], value: otherValue, type: 'percentage' });
      }
    });
  }


  // "攻撃力が13%増加する" のような単純な形式をパース
  const regexSingle = /(攻撃力|防御力|照準値|運動性|HP|与ダメージ)が([\d.]+)%増加/g;
  let matchSingle;
  while ((matchSingle = regexSingle.exec(skillText)) !== null) {
    const stat = statMapping[matchSingle[1]];
    if (stat) {
      // 既に複合でパース済みの場合は追加しない
      const alreadyParsed = effects.some(e => e.stat === stat && e.value === parseFloat(matchSingle[2]));
      if (!alreadyParsed) {
        effects.push({ stat: stat, value: parseFloat(matchSingle[2]), type: 'percentage' });
      }
    }
  }

  // "HPが25000増加する" のような固定値増加をパース
  const regexAbsolute = /(HP)が([\d.]+)増加する/g;
  let matchAbsolute;
  while ((matchAbsolute = regexAbsolute.exec(skillText)) !== null) {
    const stat = statMapping[matchAbsolute[1]];
    if (stat) {
      effects.push({ stat: stat, value: parseFloat(matchAbsolute[2]), type: 'absolute' });
    }
  }

  return effects;
}


// スキル適用後のステータスを計算
function calculateStats(pilot) {
  const baseStats = JSON.parse(JSON.stringify(pilot.stats)); // Deep copy
  const pilotActiveSkills = activeSkills[pilot.id] || {};
  
  const percentageIncrease = {
    '攻撃力': 0,
    '防御力': 0,
    '照準値': 0,
    '運動性': 0,
    'HP': 0,
    '与ダメージ': 0, // 与ダメージを追加
  };
  const absoluteIncrease = {
    '攻撃力': 0,
    '防御力': 0,
    '照準値': 0,
    '運動性': 0,
    'HP': 0,
  };

  for (const skillKey in pilotActiveSkills) {
    if (pilotActiveSkills[skillKey]) {
      const skillText = pilot.specialSkills[skillKey];
      const effects = parseSkillEffect(skillText);
      effects.forEach(effect => {
        if (effect.type === 'percentage') {
          percentageIncrease[effect.stat] += effect.value;
        } else if (effect.type === 'absolute') {
          absoluteIncrease[effect.stat] += effect.value;
        }
      });
    }
  }

  const calculatedStats = {};
  const statsToCalculate = ['攻撃力', '防御力', '照準値', '運動性', 'HP'];

  statsToCalculate.forEach(statName => {
    calculatedStats[statName] = {};
    const baseStatForStat = baseStats[statName] || {};
    const base = (baseStatForStat['基礎ステータス'] || 0);
    const multiplier = 1 + (percentageIncrease[statName] || 0) / 100;
    
    calculatedStats[statName]['基礎ステータス'] = base;
    calculatedStats[statName]['基本スキル'] = baseStatForStat['基本スキル'] || 0;
    calculatedStats[statName]['特殊スキル'] = baseStatForStat['特殊スキル'] || 0;
    calculatedStats[statName]['特殊スキル適用後'] = Math.round(base * multiplier) - base + (absoluteIncrease[statName] || 0);
  });

  // 与ダメージは別計算
  calculatedStats['与ダメージ'] = {
      '基礎ステータス': 0,
      '基本スキル': 0,
      '特殊スキル': 0,
      '特殊スキル適用後': percentageIncrease['与ダメージ'] // パーセンテージをそのまま値として格納
  };

  pilot.calculatedStats = calculatedStats;
  return pilot;
}

// ランキングのセクションを作成
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

// ランキング全体を再描画
function displayRanking() {
  const rankingContainer = document.querySelector('.ranking-container');
  rankingContainer.innerHTML = ''; // Clear previous ranking
  rankingContainer.style.display = 'flex';
  rankingContainer.style.flexWrap = 'wrap';
  rankingContainer.style.justifyContent = 'center';
  rankingContainer.style.gap = '20px';


  // スキル適用後のステータスを全パイロットに再計算させる
  const pilotsWithCalculatedStats = allPilots.map(calculateStats);

  const stats = ['攻撃力', '防御力', '照準値', '運動性', 'HP', '与ダメージ'];

  stats.forEach(stat => {
    const tableContainer = document.createElement('div');
    tableContainer.className = 'ranking-table-container';

    const title = document.createElement('h3');
    title.textContent = `${stat} ランキング`;
    tableContainer.appendChild(title);

    const table = document.createElement('table');
    table.className = 'ranking-table';

    const headerRow = table.insertRow();
    headerRow.innerHTML = `<th>順位</th><th>パイロット</th><th>${stat} (適用後)</th><th>${stat} (特殊スキル適用前)</th><th>${stat} (特殊スキル適用)</th>`;

    // パイロットをソート
    const sortedPilots = [...pilotsWithCalculatedStats].sort((a, b) => {
      const statA = (a.calculatedStats[stat] ? (a.calculatedStats[stat]['基礎ステータス'] || 0) + (a.calculatedStats[stat]['基本スキル'] || 0) + (a.calculatedStats[stat]['特殊スキル'] || 0) + (a.calculatedStats[stat]['特殊スキル適用後'] || 0) : 0);
      const statB = (b.calculatedStats[stat] ? (b.calculatedStats[stat]['基礎ステータス'] || 0) + (b.calculatedStats[stat]['基本スキル'] || 0) + (b.calculatedStats[stat]['特殊スキル'] || 0) + (b.calculatedStats[stat]['特殊スキル適用後'] || 0) : 0);
      
      // 与ダメージは特殊スキル適用後（パーセンテージ）で比較
      if (stat === '与ダメージ') {
        return (b.calculatedStats[stat]['特殊スキル適用後'] || 0) - (a.calculatedStats[stat]['特殊スキル適用後'] || 0);
      }
      return statB - statA;
    });

    sortedPilots.forEach((pilot, index) => {
      const totalStat = (pilot.calculatedStats[stat] ? (pilot.calculatedStats[stat]['基礎ステータス'] || 0) + (pilot.calculatedStats[stat]['基本スキル'] || 0) + (pilot.calculatedStats[stat]['特殊スキル'] || 0) + (pilot.calculatedStats[stat]['特殊スキル適用後'] || 0) : 0);
      const statBeforeSpecialSkill = (pilot.calculatedStats[stat] ? (pilot.calculatedStats[stat]['基礎ステータス'] || 0) + (pilot.calculatedStats[stat]['基本スキル'] || 0) + (pilot.calculatedStats[stat]['特殊スキル'] || 0) : 0);
      const appliedStat = pilot.calculatedStats[stat] ? pilot.calculatedStats[stat]['特殊スキル適用後'] || 0 : 0;
      
      const row = table.insertRow();
      let appliedStatDisplay = `+${appliedStat}`;
      if (stat === '与ダメージ') {
        appliedStatDisplay = `+${appliedStat.toFixed(1)}%`;
      }

      row.innerHTML = `<td>${index + 1}</td><td>${pilot.name}</td><td>${totalStat}</td><td>${statBeforeSpecialSkill}</td><td>${appliedStatDisplay}</td>`;
    });

    tableContainer.appendChild(table);
    rankingContainer.appendChild(tableContainer);
  });
}

// パイロットのスキル選択UIを表示
function displayPilotSkills(pilots) {
  const container = document.getElementById('pilot-skills');
  container.innerHTML = '';

  pilots.forEach(pilot => {
    if (Object.keys(pilot.specialSkills).length > 0) {
      const pilotDiv = document.createElement('div');
      pilotDiv.className = 'pilot-skill-section';
      let skillsHtml = `<h3>${pilot.name}</h3><ul>`;
      for (const key in pilot.specialSkills) {
        const isChecked = activeSkills[pilot.id] && activeSkills[pilot.id][key];
        skillsHtml += `
          <li>
            <label>
              <input type="checkbox" class="skill-checkbox" data-pilot-id="${pilot.id}" data-skill-key="${key}" ${isChecked ? 'checked' : ''}>
              ${pilot.specialSkills[key]}
            </label>
          </li>
        `;
      }
      skillsHtml += '</ul>';
      pilotDiv.innerHTML = skillsHtml;
      container.appendChild(pilotDiv);
    }
  });

  // チェックボックスにイベントリスナーを追加
  document.querySelectorAll('.skill-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
      const { pilotId, skillKey } = e.target.dataset;
      if (!activeSkills[pilotId]) {
        activeSkills[pilotId] = {};
      }
      activeSkills[pilotId][skillKey] = e.target.checked;
      displayRanking(); // ランキングを更新
    });
  });
}

// CSVファイルを処理
function processCSV(file, callback) {
  Papa.parse(file, {
    header: true,
    dynamicTyping: true,
    complete: (results) => {
      const pilots = results.data.map(row => {
        const stats = {};
        const specialSkills = {};
        for (const key in row) {
          if (key.includes('_')) {
            const [statName, subStatName] = key.split('_');
            if (!stats[statName]) {
              stats[statName] = {};
            }
            stats[statName][subStatName] = row[key];
          } else if (key.startsWith('特殊スキル-')) {
            if (row[key]) {
              specialSkills[key] = row[key];
            }
          }
        }
        return {
          id: row.id,
          name: row.name,
          series: row.series,
          stats: stats,
          specialSkills: specialSkills,
        };
      }).filter(p => p.id); // idがない行は除外
      callback(pilots);
    }
  });
}

// DOM読み込み後の初期化処理
window.addEventListener('DOMContentLoaded', async () => {
  const csvFileInput = document.getElementById('csvFileInput');

  // CSVファイル選択時の処理
  csvFileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;

    processCSV(file, (pilots) => {
      allPilots = pilots;
      // 初期状態で全スキルを有効にする
      allPilots.forEach(p => {
        if (Object.keys(p.specialSkills).length > 0) {
          activeSkills[p.id] = {};
          for(const key in p.specialSkills) {
            activeSkills[p.id][key] = true;
          }
        }
      });
      displayPilotSkills(pilots);
      displayRanking();
    });
  });
});
