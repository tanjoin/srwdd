import{P as p}from"./papaparse.min-Bjupvl7W.js";let m=[];function v(i){const n=document.createElement("option");return n.value=i.id,n.textContent=`${i.name}（${i.series}）`,n}function g(i,n){const l=document.getElementById("result"),c=e=>{let a=0;for(const o in e)a+=e[o];return a};let t=`
    <div class="comparison-table">
      <div class="table-header">
        <div class="header-item">ステータス</div>
        <div class="header-item">${i.name}</div>
        <div class="header-item">${n.name}</div>
      </div>
      <div class="table-body">
  `;const s=["攻撃力","防御力","照準値","運動性"];for(const e of s){const a=c(i.stats[e]),o=c(n.stats[e]),r=a>o?"winner":"",d=o>a?"winner":"";t+=`
      <div class="table-row">
        <div class="row-item status-name">${e}</div>
        <div class="row-item ${r}">${a.toLocaleString()}</div>
        <div class="row-item ${d}">${o.toLocaleString()}</div>
      </div>
    `}t+="</div></div>",l.innerHTML=t}function y(i,n,l){const c=document.createElement("div");c.className="ranking-section";const t=[...i].sort((e,a)=>{const o=n==="総合値"?e.grandTotal:e.totalStats[n];return(n==="総合値"?a.grandTotal:a.totalStats[n])-o});let s=`<h2>${l}</h2><ol>`;return t.slice(0,10).forEach((e,a)=>{const o=n==="総合値"?e.grandTotal:e.totalStats[n];s+=`<li>
      <span class="rank">${a+1}</span>
      <span class="name">${e.name}</span>
      <span class="stat">${o.toLocaleString()}</span>
    </li>`}),s+="</ol>",c.innerHTML=s,c}function f(i){const n=document.querySelector(".ranking-container");n.innerHTML="";const l=i.map(t=>{const s={};for(const a in t.stats){const o=Object.values(t.stats[a]).reduce((r,d)=>r+(Number(d)||0),0);s[a]=o}const e=(s.攻撃力||0)+(s.防御力||0)+((s.照準値||0)+(s.運動性||0))*10;return t.totalStats=s,t.grandTotal=e,t}),c={総合値:"総合値ランキング",攻撃力:"攻撃力ランキング",防御力:"防御力ランキング",照準値:"照準値ランキング",運動性:"運動性ランキング"};for(const t in c){const s=c[t],e=y(l,t,s);n.appendChild(e)}}function h(i,n){p.parse(i,{header:!0,dynamicTyping:!0,complete:l=>{const c=l.data.map(t=>{const s={};for(const e in t)if(e.includes("_")){const[a,o]=e.split("_");s[a]||(s[a]={}),s[a][o]=t[e]}return{id:t.id,name:t.name,series:t.series,stats:s}}).filter(t=>t.id);n(c)}})}window.addEventListener("DOMContentLoaded",async()=>{const i=document.getElementById("csvFileInput"),n=document.getElementById("pilot1"),l=document.getElementById("pilot2"),c=document.getElementById("compareBtn"),t=document.getElementById("show-comparison"),s=document.getElementById("show-ranking"),e=document.getElementById("comparison-view"),a=document.getElementById("ranking-view");i.addEventListener("change",o=>{const r=o.target.files[0];r&&h(r,d=>{m=d,n.innerHTML="",l.innerHTML="",d.forEach(u=>{n.appendChild(v(u)),l.appendChild(v(u))}),n.selectedIndex=0,l.selectedIndex=1,c.disabled=!1,f(d)})}),c.addEventListener("click",()=>{const o=m.find(d=>d.id==n.value),r=m.find(d=>d.id==l.value);o&&r&&g(o,r)}),t.addEventListener("click",()=>{e.style.display="block",a.style.display="none",t.classList.add("active"),s.classList.remove("active")}),s.addEventListener("click",()=>{e.style.display="none",a.style.display="block",t.classList.remove("active"),s.classList.add("active")})});
