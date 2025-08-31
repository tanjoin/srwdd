
import './style.css';
import Papa from 'papaparse';

function createOption(pilot) {
	const opt = document.createElement('option');
	opt.value = pilot.id;
	opt.textContent = `${pilot.name}（${pilot.series}）`;
	return opt;
}

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


window.addEventListener('DOMContentLoaded', async () => {
  const csvFileInput = document.getElementById('csvFileInput');
  const select1 = document.getElementById('pilot1');
  const select2 = document.getElementById('pilot2');
  const compareBtn = document.getElementById('compareBtn');

  csvFileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    processCSV(file, (pilots) => {
      // プルダウンをクリア
      select1.innerHTML = '';
      select2.innerHTML = '';

      pilots.forEach(pilot => {
        select1.appendChild(createOption(pilot));
        select2.appendChild(createOption(pilot));
      });
      select2.selectedIndex = pilots.length > 1 ? 1 : 0;

      compareBtn.disabled = false;

      compareBtn.onclick = () => {
        const id1 = select1.value;
        const id2 = select2.value;
        if (id1 === id2) {
          document.getElementById('result').textContent = '異なるパイロットを選択してください。';
          return;
        }
        const pilot1 = pilots.find(p => p.id.toString() === id1);
        const pilot2 = pilots.find(p => p.id.toString() === id2);
        showResult(pilot1, pilot2);
      };
      // 初期比較を実行
      if (pilots.length > 1) {
        compareBtn.click();
      }
    });
  });
});
