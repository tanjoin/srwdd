
import './style.css';

async function loadPilots() {
	const res = await fetch('pilots.json');
	return await res.json();
}

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

  for (const key of Object.keys(pilot1.stats)) {
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

window.addEventListener('DOMContentLoaded', async () => {
	const pilots = await loadPilots();
	const select1 = document.getElementById('pilot1');
	const select2 = document.getElementById('pilot2');
	pilots.forEach(pilot => {
		select1.appendChild(createOption(pilot));
		select2.appendChild(createOption(pilot));
	});
	select2.selectedIndex = 1;

	document.getElementById('compareBtn').addEventListener('click', () => {
		const id1 = select1.value;
		const id2 = select2.value;
		if (id1 === id2) {
			document.getElementById('result').textContent = '異なるパイロットを選択してください。';
			return;
		}
		const pilot1 = pilots.find(p => p.id === id1);
		const pilot2 = pilots.find(p => p.id === id2);
		showResult(pilot1, pilot2);
	});
});
