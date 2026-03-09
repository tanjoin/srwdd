import{P as f}from"./papaparse.min-Bjupvl7W.js";let v=[];function u(r){const t=document.createElement("option");return t.value=r.id,t.textContent=`${r.name}（${r.series}）`,t}function y(r,t){const c=document.getElementById("result"),d=n=>{let o=0;for(const a in n)o+=n[a];return o};let e=`
    <div class="comparison-table">
      <div class="table-header">
        <div class="header-item">ステータス</div>
        <div class="header-item">${r.name}</div>
        <div class="header-item">${t.name}</div>
      </div>
      <div class="table-body">
  `;const s=["攻撃力","防御力","照準値","運動性"];for(const n of s){const o=d(r.stats[n]),a=d(t.stats[n]),i=o>a?"winner":"",l=a>o?"winner":"";e+=`
      <div class="table-row">
        <div class="row-item status-name">${n}</div>
        <div class="row-item ${i}">${o.toLocaleString()}</div>
        <div class="row-item ${l}">${a.toLocaleString()}</div>
      </div>
    `}e+="</div></div>",c.innerHTML=e}function h(r,t,c){const d=document.createElement("div");d.className="ranking-section";const e=[...r].sort((n,o)=>{const a=t==="総合値"?n.grandTotal:n.totalStats[t];return(t==="総合値"?o.grandTotal:o.totalStats[t])-a});let s=`<h2>${c}</h2><ol>`;return e.slice(0,10).forEach((n,o)=>{const a=t==="総合値"?n.grandTotal:n.totalStats[t];s+=`<li>
      <span class="rank">${o+1}</span>
      <span class="name">${n.name}</span>
      <span class="stat">${a.toLocaleString()}</span>
    </li>`}),s+="</ol>",d.innerHTML=s,d}function p(r){const t=document.querySelector(".ranking-container");t.innerHTML="";const c=r.map(e=>{const s={};for(const o in e.stats){const a=Object.values(e.stats[o]).reduce((i,l)=>i+(Number(l)||0),0);s[o]=a}const n=(s.攻撃力||0)+(s.防御力||0)+((s.照準値||0)+(s.運動性||0))*10;return e.totalStats=s,e.grandTotal=n,e}),d={総合値:"総合値ランキング",攻撃力:"攻撃力ランキング",防御力:"防御力ランキング",照準値:"照準値ランキング",運動性:"運動性ランキング"};for(const e in d){const s=d[e],n=h(c,e,s);t.appendChild(n)}}function g(r,t){f.parse(r,{header:!0,dynamicTyping:!0,complete:c=>{const d=c.data.map(e=>{const s={};for(const n in e)if(n.includes("_")){const[o,a]=n.split("_");s[o]||(s[o]={}),s[o][a]=e[n]}return{id:e.id,name:e.name,series:e.series,stats:s}}).filter(e=>e.id);t(d)}})}window.addEventListener("DOMContentLoaded",async()=>{const r=document.getElementById("csvFileInput"),t=document.getElementById("pilot1"),c=document.getElementById("pilot2"),d=document.getElementById("compareBtn"),e=document.getElementById("show-comparison"),s=document.getElementById("show-ranking"),n=document.getElementById("comparison-view"),o=document.getElementById("ranking-view");["dragenter","dragover","dragleave","drop"].forEach(a=>{document.addEventListener(a,i=>{i.preventDefault(),i.stopPropagation()})}),document.addEventListener("drop",a=>{const i=a.dataTransfer.files[0];i&&i.type==="text/csv"&&g(i,l=>{v=l,t.innerHTML="",c.innerHTML="",l.forEach(m=>{t.appendChild(u(m)),c.appendChild(u(m))}),t.selectedIndex=0,c.selectedIndex=1,d.disabled=!1,p(l)})}),r.addEventListener("change",a=>{const i=a.target.files[0];i&&g(i,l=>{v=l,t.innerHTML="",c.innerHTML="",l.forEach(m=>{t.appendChild(u(m)),c.appendChild(u(m))}),t.selectedIndex=0,c.selectedIndex=1,d.disabled=!1,p(l)})}),d.addEventListener("click",()=>{const a=v.find(l=>l.id==t.value),i=v.find(l=>l.id==c.value);a&&i&&y(a,i)}),e.addEventListener("click",()=>{n.style.display="block",o.style.display="none",e.classList.add("active"),s.classList.remove("active")}),s.addEventListener("click",()=>{n.style.display="none",o.style.display="block",e.classList.remove("active"),s.classList.add("active")})});
