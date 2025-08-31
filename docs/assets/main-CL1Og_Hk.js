import"./style-SfHb7k-2.js";async function m(){return await(await fetch("pilots.json")).json()}function c(t){const e=document.createElement("option");return e.value=t.id,e.textContent=`${t.name}（${t.series}）`,e}function v(t,e){const d=document.getElementById("result"),s=i=>{let o=0;for(const n in i)o+=i[n];return o};let a=`
    <div class="comparison-table">
      <div class="table-header">
        <div class="header-item">ステータス</div>
        <div class="header-item">${t.name}</div>
        <div class="header-item">${e.name}</div>
      </div>
      <div class="table-body">
  `;for(const i of Object.keys(t.stats)){const o=s(t.stats[i]),n=s(e.stats[i]),l=o>n?"winner":"",r=n>o?"winner":"";a+=`
      <div class="table-row">
        <div class="row-item status-name">${i}</div>
        <div class="row-item ${l}">${o.toLocaleString()}</div>
        <div class="row-item ${r}">${n.toLocaleString()}</div>
      </div>
    `}a+="</div></div>",d.innerHTML=a}window.addEventListener("DOMContentLoaded",async()=>{const t=await m(),e=document.getElementById("pilot1"),d=document.getElementById("pilot2");t.forEach(s=>{e.appendChild(c(s)),d.appendChild(c(s))}),d.selectedIndex=1,document.getElementById("compareBtn").addEventListener("click",()=>{const s=e.value,a=d.value;if(s===a){document.getElementById("result").textContent="異なるパイロットを選択してください。";return}const i=t.find(n=>n.id===s),o=t.find(n=>n.id===a);v(i,o)})});
