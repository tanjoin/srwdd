(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const h of document.querySelectorAll('link[rel="modulepreload"]'))l(h);new MutationObserver(h=>{for(const g of h)if(g.type==="childList")for(const C of g.addedNodes)C.tagName==="LINK"&&C.rel==="modulepreload"&&l(C)}).observe(document,{childList:!0,subtree:!0});function r(h){const g={};return h.integrity&&(g.integrity=h.integrity),h.referrerPolicy&&(g.referrerPolicy=h.referrerPolicy),h.crossOrigin==="use-credentials"?g.credentials="include":h.crossOrigin==="anonymous"?g.credentials="omit":g.credentials="same-origin",g}function l(h){if(h.ep)return;h.ep=!0;const g=r(h);fetch(h.href,g)}})();class Bt{constructor(s,r=[]){s?Object.assign(this,s):this.data={},this.skillList=r}get id(){return this.data.id}get name(){return this.data.name}get status(){return this.data.status||{}}get baseAttack(){var s;return((s=this.status.base)==null?void 0:s.attack)||0}get baseDefense(){var s;return((s=this.status.base)==null?void 0:s.defense)||0}get baseAccuracy(){var s;return((s=this.status.base)==null?void 0:s.accuracy)||0}get baseMobility(){var s;return((s=this.status.base)==null?void 0:s.mobility)||0}get basicSkillAttack(){var s;return((s=this.status.basicSkill)==null?void 0:s.attack)||0}get basicSkillDefense(){var s;return((s=this.status.basicSkill)==null?void 0:s.defense)||0}get basicSkillAccuracy(){var s;return((s=this.status.basicSkill)==null?void 0:s.accuracy)||0}get basicSkillMobility(){var s;return((s=this.status.basicSkill)==null?void 0:s.mobility)||0}get equippedSkillIds(){return Array.isArray(this.data.equippedSkillIds)?this.data.equippedSkillIds:typeof this.data.equippedSkillIds=="string"?this.data.equippedSkillIds.split(",").map(s=>s.trim()).filter(Boolean):[]}get specialSkillAttack(){return this._sumSpecialSkill("attack")}get specialSkillDefense(){return this._sumSpecialSkill("defense")}get specialSkillAccuracy(){return this._sumSpecialSkill("accuracy")}get specialSkillMobility(){return this._sumSpecialSkill("mobility")}_sumSpecialSkill(s){if(!this.skillList)return 0;const r=(this.name||"").trim();if(!r)return 0;const l=new Set(this.equippedSkillIds.map(String));return l.size===0?0:this.skillList.filter(g=>{const C=(g==null?void 0:g.id)!=null?String(g.id):"";return l.has(C)?(Array.isArray(g.pilotNames)?g.pilotNames:[]).some(R=>R.includes(r)):!1}).reduce((g,C)=>g+(Number(C[s])||0),0)}get spiritCommands(){return this.data.spiritCommands||[]}get skills(){return this.data.skills||[]}get totalAttack(){return this.baseAttack+this.basicSkillAttack+this.specialSkillAttack}get totalDefense(){return this.baseDefense+this.basicSkillDefense+this.specialSkillDefense}get totalAccuracy(){return this.baseAccuracy+this.basicSkillAccuracy+this.specialSkillAccuracy}get totalMobility(){return this.baseMobility+this.basicSkillMobility+this.specialSkillMobility}}class It{constructor(s){s?Object.assign(this,s):this.data={}}get id(){return this.data.id}get name(){return this.data.name}get pilotNames(){return Array.isArray(this.data.pilotNames)?this.data.pilotNames:typeof this.data.pilotNames=="string"?this.data.pilotNames.split(",").map(s=>s.trim()).filter(Boolean):[]}get description(){return this.data.description}get level(){return this.data.level}get attack(){return this.data.attack}get defense(){return this.data.defense}get accuracy(){return this.data.accuracy}get mobility(){return this.data.mobility}get effect(){return this.data.effect||""}}class U{static get TYPE_AIR(){return"空"}static get TYPE_LAND(){return"陸"}static get TYPE_SEA(){return"海"}static get TYPE_SPACE(){return"宇"}static get RANK_A(){return"A"}static get RANK_B(){return"B"}static get RANK_C(){return"C"}static get RANK_S(){return"S"}constructor(s){s?Object.assign(this,s):this.data={}}get type(){return this.data.type}get rank(){return this.data.rank}}class jt{static get TYPE_FINISHER(){return"必殺技"}static get TYPE_SUPPORT(){return"支援"}constructor(s){s?Object.assign(this,s):this.data={}}get id(){return this.data.id}get name(){return this.data.name}get type(){return this.data.type}get attack(){return this.data.attack||0}get defense(){return this.data.defense||0}get accuracy(){return this.data.accuracy||0}get mobility(){return this.data.mobility||0}get movement(){return this.data.movement||0}get speed(){return this.data.speed||0}get trait(){return this.data.trait||0}get power(){return this.data.power||0}get hitRate(){return this.data.hitRate||0}get range(){return this.data.range||{min:0,max:0}}get action(){return this.data.action||0}get uses(){return this.data.uses||0}get mainSlot(){return this.data.main||{name:"",description:"",effect:[]}}get finisherSlot(){return this.data.finisherSlot||{name:"",description:"",effect:[]}}get subSlot(){return this.data.subSlot||{name:"",description:"",effect:[]}}}class Tt{static get TYPE_ATTACK(){return"攻撃特化"}static get TYPE_ATTACK_DEFENSE(){return"攻撃&防御"}static get TYPE_ATTACK_ACCURACY(){return"攻撃&照準"}static get TYPE_ATTACK_EVASION(){return"攻撃&回避"}static get TYPE_DEFENSE(){return"防御特化"}static get TYPE_DEFENSE_ACCURACY(){return"防御&照準"}static get TYPE_DEFENSE_EVASION(){return"防御&回避"}static get TYPE_ACCURACY(){return"照準特化"}static get TYPE_ACCURACY_EVASION(){return"照準&回避"}static get TYPE_EVASION(){return"回避特化"}static get TYPE_BALANCED(){return"バランス"}static get SIZE_LL(){return"LL"}static get SIZE_L(){return"L"}static get SIZE_M(){return"M"}static get SIZE_S(){return"S"}static get SIZE_SS(){return"SS"}static get WEAPON_PHYSICAL(){return"実弾"}static get WEAPON_STRIKE(){return"打撃"}static get WEAPON_SLASH(){return"斬撃"}static get WEAPON_BEAM(){return"ビーム"}static get WEAPON_SPECIAL(){return"特殊"}constructor(s){s?Object.assign(this,s):this.data={}}get id(){return this.data.id}get name(){return this.data.name}get pilotId(){return this.data.pilotId||""}get size(){return this.data.size}get type(){return this.data.type}get terrain(){const s=this.data.terrain;return Array.isArray(s)?s:s&&typeof s=="object"?[new U({data:{type:U.TYPE_AIR,rank:s.air||U.RANK_C}}),new U({data:{type:U.TYPE_LAND,rank:s.land||U.RANK_C}}),new U({data:{type:U.TYPE_SEA,rank:s.sea||U.RANK_C}}),new U({data:{type:U.TYPE_SPACE,rank:s.space||U.RANK_C}})]:[new U({data:{type:U.TYPE_LAND,rank:U.RANK_C}}),new U({data:{type:U.TYPE_SEA,rank:U.RANK_C}}),new U({data:{type:U.TYPE_AIR,rank:U.RANK_C}}),new U({data:{type:U.TYPE_SPACE,rank:U.RANK_C}})]}get specialAbility(){return this.data.specialAbility||{name:"",effect:""}}get hp(){return this.data.hp||0}get attack(){return this.data.attack||0}get defense(){return this.data.defense||0}get accuracy(){return this.data.accuracy||0}get mobility(){return this.data.mobility||0}get movement(){return this.data.movement||0}get speed(){return this.data.speed||0}get normalWeapon(){const s=this.data.normalWeapon||{};return new jt({data:{name:s.name||"",type:s.type||"",range:s.range||{min:0,max:0},action:s.action??"",uses:s.uses??""}})}}function Yt(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Ct={exports:{}};/* @license
Papa Parse
v5.5.3
https://github.com/mholt/PapaParse
License: MIT
*/var Kt=Ct.exports,Mt;function Vt(){return Mt||(Mt=1,function(e,s){((r,l)=>{e.exports=l()})(Kt,function r(){var l=typeof self<"u"?self:typeof window<"u"?window:l!==void 0?l:{},h,g=!l.document&&!!l.postMessage,C=l.IS_PAPA_WORKER||!1,L={},R=0,o={};function v(a){this._handle=null,this._finished=!1,this._completed=!1,this._halted=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},(function(i){var n=dt(i);n.chunkSize=parseInt(n.chunkSize),i.step||i.chunk||(n.chunkSize=null),this._handle=new et(n),(this._handle.streamer=this)._config=n}).call(this,a),this.parseChunk=function(i,n){var p=parseInt(this._config.skipFirstNLines)||0;if(this.isFirstChunk&&0<p){let t=this._config.newline;t||(u=this._config.quoteChar||'"',t=this._handle.guessLineEndings(i,u)),i=[...i.split(t).slice(p)].join(t)}this.isFirstChunk&&E(this._config.beforeFirstChunk)&&(u=this._config.beforeFirstChunk(i))!==void 0&&(i=u),this.isFirstChunk=!1,this._halted=!1;var p=this._partialLine+i,u=(this._partialLine="",this._handle.parse(p,this._baseIndex,!this._finished));if(!this._handle.paused()&&!this._handle.aborted()){if(i=u.meta.cursor,p=(this._finished||(this._partialLine=p.substring(i-this._baseIndex),this._baseIndex=i),u&&u.data&&(this._rowCount+=u.data.length),this._finished||this._config.preview&&this._rowCount>=this._config.preview),C)l.postMessage({results:u,workerId:o.WORKER_ID,finished:p});else if(E(this._config.chunk)&&!n){if(this._config.chunk(u,this._handle),this._handle.paused()||this._handle.aborted())return void(this._halted=!0);this._completeResults=u=void 0}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(u.data),this._completeResults.errors=this._completeResults.errors.concat(u.errors),this._completeResults.meta=u.meta),this._completed||!p||!E(this._config.complete)||u&&u.meta.aborted||(this._config.complete(this._completeResults,this._input),this._completed=!0),p||u&&u.meta.paused||this._nextChunk(),u}this._halted=!0},this._sendError=function(i){E(this._config.error)?this._config.error(i):C&&this._config.error&&l.postMessage({workerId:o.WORKER_ID,error:i,finished:!1})}}function $(a){var i;(a=a||{}).chunkSize||(a.chunkSize=o.RemoteChunkSize),v.call(this,a),this._nextChunk=g?function(){this._readChunk(),this._chunkLoaded()}:function(){this._readChunk()},this.stream=function(n){this._input=n,this._nextChunk()},this._readChunk=function(){if(this._finished)this._chunkLoaded();else{if(i=new XMLHttpRequest,this._config.withCredentials&&(i.withCredentials=this._config.withCredentials),g||(i.onload=tt(this._chunkLoaded,this),i.onerror=tt(this._chunkError,this)),i.open(this._config.downloadRequestBody?"POST":"GET",this._input,!g),this._config.downloadRequestHeaders){var n,p=this._config.downloadRequestHeaders;for(n in p)i.setRequestHeader(n,p[n])}var u;this._config.chunkSize&&(u=this._start+this._config.chunkSize-1,i.setRequestHeader("Range","bytes="+this._start+"-"+u));try{i.send(this._config.downloadRequestBody)}catch(t){this._chunkError(t.message)}g&&i.status===0&&this._chunkError()}},this._chunkLoaded=function(){i.readyState===4&&(i.status<200||400<=i.status?this._chunkError():(this._start+=this._config.chunkSize||i.responseText.length,this._finished=!this._config.chunkSize||this._start>=(n=>(n=n.getResponseHeader("Content-Range"))!==null?parseInt(n.substring(n.lastIndexOf("/")+1)):-1)(i),this.parseChunk(i.responseText)))},this._chunkError=function(n){n=i.statusText||n,this._sendError(new Error(n))}}function F(a){(a=a||{}).chunkSize||(a.chunkSize=o.LocalChunkSize),v.call(this,a);var i,n,p=typeof FileReader<"u";this.stream=function(u){this._input=u,n=u.slice||u.webkitSlice||u.mozSlice,p?((i=new FileReader).onload=tt(this._chunkLoaded,this),i.onerror=tt(this._chunkError,this)):i=new FileReaderSync,this._nextChunk()},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk()},this._readChunk=function(){var u=this._input,t=(this._config.chunkSize&&(t=Math.min(this._start+this._config.chunkSize,this._input.size),u=n.call(u,this._start,t)),i.readAsText(u,this._config.encoding));p||this._chunkLoaded({target:{result:t}})},this._chunkLoaded=function(u){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(u.target.result)},this._chunkError=function(){this._sendError(i.error)}}function j(a){var i;v.call(this,a=a||{}),this.stream=function(n){return i=n,this._nextChunk()},this._nextChunk=function(){var n,p;if(!this._finished)return n=this._config.chunkSize,i=n?(p=i.substring(0,n),i.substring(n)):(p=i,""),this._finished=!i,this.parseChunk(p)}}function G(a){v.call(this,a=a||{});var i=[],n=!0,p=!1;this.pause=function(){v.prototype.pause.apply(this,arguments),this._input.pause()},this.resume=function(){v.prototype.resume.apply(this,arguments),this._input.resume()},this.stream=function(u){this._input=u,this._input.on("data",this._streamData),this._input.on("end",this._streamEnd),this._input.on("error",this._streamError)},this._checkIsFinished=function(){p&&i.length===1&&(this._finished=!0)},this._nextChunk=function(){this._checkIsFinished(),i.length?this.parseChunk(i.shift()):n=!0},this._streamData=tt(function(u){try{i.push(typeof u=="string"?u:u.toString(this._config.encoding)),n&&(n=!1,this._checkIsFinished(),this.parseChunk(i.shift()))}catch(t){this._streamError(t)}},this),this._streamError=tt(function(u){this._streamCleanUp(),this._sendError(u)},this),this._streamEnd=tt(function(){this._streamCleanUp(),p=!0,this._streamData("")},this),this._streamCleanUp=tt(function(){this._input.removeListener("data",this._streamData),this._input.removeListener("end",this._streamEnd),this._input.removeListener("error",this._streamError)},this)}function et(a){var i,n,p,u,t=Math.pow(2,53),c=-t,w=/^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/,y=/^((\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)))$/,d=this,S=0,f=0,T=!1,b=!1,k=[],m={data:[],errors:[],meta:{}};function Y(N){return a.skipEmptyLines==="greedy"?N.join("").trim()==="":N.length===1&&N[0].length===0}function z(){if(m&&p&&(rt("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+o.DefaultDelimiter+"'"),p=!1),a.skipEmptyLines&&(m.data=m.data.filter(function(W){return!Y(W)})),H()){let W=function(V,q){E(a.transformHeader)&&(V=a.transformHeader(V,q)),k.push(V)};var _=W;if(m)if(Array.isArray(m.data[0])){for(var N=0;H()&&N<m.data.length;N++)m.data[N].forEach(W);m.data.splice(0,1)}else m.data.forEach(W)}function x(W,V){for(var q=a.header?{}:[],O=0;O<W.length;O++){var A=O,Z=W[O],Z=((D,M)=>(J=>(a.dynamicTypingFunction&&a.dynamicTyping[J]===void 0&&(a.dynamicTyping[J]=a.dynamicTypingFunction(J)),(a.dynamicTyping[J]||a.dynamicTyping)===!0))(D)?M==="true"||M==="TRUE"||M!=="false"&&M!=="FALSE"&&((J=>{if(w.test(J)&&(J=parseFloat(J),c<J&&J<t))return 1})(M)?parseFloat(M):y.test(M)?new Date(M):M===""?null:M):M)(A=a.header?O>=k.length?"__parsed_extra":k[O]:A,Z=a.transform?a.transform(Z,A):Z);A==="__parsed_extra"?(q[A]=q[A]||[],q[A].push(Z)):q[A]=Z}return a.header&&(O>k.length?rt("FieldMismatch","TooManyFields","Too many fields: expected "+k.length+" fields but parsed "+O,f+V):O<k.length&&rt("FieldMismatch","TooFewFields","Too few fields: expected "+k.length+" fields but parsed "+O,f+V)),q}var P;m&&(a.header||a.dynamicTyping||a.transform)&&(P=1,!m.data.length||Array.isArray(m.data[0])?(m.data=m.data.map(x),P=m.data.length):m.data=x(m.data,0),a.header&&m.meta&&(m.meta.fields=k),f+=P)}function H(){return a.header&&k.length===0}function rt(N,x,P,_){N={type:N,code:x,message:P},_!==void 0&&(N.row=_),m.errors.push(N)}E(a.step)&&(u=a.step,a.step=function(N){m=N,H()?z():(z(),m.data.length!==0&&(S+=N.data.length,a.preview&&S>a.preview?n.abort():(m.data=m.data[0],u(m,d))))}),this.parse=function(N,x,P){var _=a.quoteChar||'"',_=(a.newline||(a.newline=this.guessLineEndings(N,_)),p=!1,a.delimiter?E(a.delimiter)&&(a.delimiter=a.delimiter(N),m.meta.delimiter=a.delimiter):((_=((W,V,q,O,A)=>{var Z,D,M,J;A=A||[",","	","|",";",o.RECORD_SEP,o.UNIT_SEP];for(var vt=0;vt<A.length;vt++){for(var ut,Et=A[vt],st=0,pt=0,X=0,lt=(M=void 0,new at({comments:O,delimiter:Et,newline:V,preview:10}).parse(W)),bt=0;bt<lt.data.length;bt++)q&&Y(lt.data[bt])?X++:(ut=lt.data[bt].length,pt+=ut,M===void 0?M=ut:0<ut&&(st+=Math.abs(ut-M),M=ut));0<lt.data.length&&(pt/=lt.data.length-X),(D===void 0||st<=D)&&(J===void 0||J<pt)&&1.99<pt&&(D=st,Z=Et,J=pt)}return{successful:!!(a.delimiter=Z),bestDelimiter:Z}})(N,a.newline,a.skipEmptyLines,a.comments,a.delimitersToGuess)).successful?a.delimiter=_.bestDelimiter:(p=!0,a.delimiter=o.DefaultDelimiter),m.meta.delimiter=a.delimiter),dt(a));return a.preview&&a.header&&_.preview++,i=N,n=new at(_),m=n.parse(i,x,P),z(),T?{meta:{paused:!0}}:m||{meta:{paused:!1}}},this.paused=function(){return T},this.pause=function(){T=!0,n.abort(),i=E(a.chunk)?"":i.substring(n.getCharIndex())},this.resume=function(){d.streamer._halted?(T=!1,d.streamer.parseChunk(i,!0)):setTimeout(d.resume,3)},this.aborted=function(){return b},this.abort=function(){b=!0,n.abort(),m.meta.aborted=!0,E(a.complete)&&a.complete(m),i=""},this.guessLineEndings=function(W,_){W=W.substring(0,1048576);var _=new RegExp(nt(_)+"([^]*?)"+nt(_),"gm"),P=(W=W.replace(_,"")).split("\r"),_=W.split(`
`),W=1<_.length&&_[0].length<P[0].length;if(P.length===1||W)return`
`;for(var V=0,q=0;q<P.length;q++)P[q][0]===`
`&&V++;return V>=P.length/2?`\r
`:"\r"}}function nt(a){return a.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function at(a){var i=(a=a||{}).delimiter,n=a.newline,p=a.comments,u=a.step,t=a.preview,c=a.fastMode,w=null,y=!1,d=a.quoteChar==null?'"':a.quoteChar,S=d;if(a.escapeChar!==void 0&&(S=a.escapeChar),(typeof i!="string"||-1<o.BAD_DELIMITERS.indexOf(i))&&(i=","),p===i)throw new Error("Comment character same as delimiter");p===!0?p="#":(typeof p!="string"||-1<o.BAD_DELIMITERS.indexOf(p))&&(p=!1),n!==`
`&&n!=="\r"&&n!==`\r
`&&(n=`
`);var f=0,T=!1;this.parse=function(b,k,m){if(typeof b!="string")throw new Error("Input must be a string");var Y=b.length,z=i.length,H=n.length,rt=p.length,N=E(u),x=[],P=[],_=[],W=f=0;if(!b)return st();if(c||c!==!1&&b.indexOf(d)===-1){for(var V=b.split(n),q=0;q<V.length;q++){if(_=V[q],f+=_.length,q!==V.length-1)f+=n.length;else if(m)return st();if(!p||_.substring(0,rt)!==p){if(N){if(x=[],J(_.split(i)),pt(),T)return st()}else J(_.split(i));if(t&&t<=q)return x=x.slice(0,t),st(!0)}}return st()}for(var O=b.indexOf(i,f),A=b.indexOf(n,f),Z=new RegExp(nt(S)+nt(d),"g"),D=b.indexOf(d,f);;)if(b[f]===d)for(D=f,f++;;){if((D=b.indexOf(d,D+1))===-1)return m||P.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:x.length,index:f}),ut();if(D===Y-1)return ut(b.substring(f,D).replace(Z,d));if(d===S&&b[D+1]===S)D++;else if(d===S||D===0||b[D-1]!==S){O!==-1&&O<D+1&&(O=b.indexOf(i,D+1));var M=vt((A=A!==-1&&A<D+1?b.indexOf(n,D+1):A)===-1?O:Math.min(O,A));if(b.substr(D+1+M,z)===i){_.push(b.substring(f,D).replace(Z,d)),b[f=D+1+M+z]!==d&&(D=b.indexOf(d,f)),O=b.indexOf(i,f),A=b.indexOf(n,f);break}if(M=vt(A),b.substring(D+1+M,D+1+M+H)===n){if(_.push(b.substring(f,D).replace(Z,d)),Et(D+1+M+H),O=b.indexOf(i,f),D=b.indexOf(d,f),N&&(pt(),T))return st();if(t&&x.length>=t)return st(!0);break}P.push({type:"Quotes",code:"InvalidQuotes",message:"Trailing quote on quoted field is malformed",row:x.length,index:f}),D++}}else if(p&&_.length===0&&b.substring(f,f+rt)===p){if(A===-1)return st();f=A+H,A=b.indexOf(n,f),O=b.indexOf(i,f)}else if(O!==-1&&(O<A||A===-1))_.push(b.substring(f,O)),f=O+z,O=b.indexOf(i,f);else{if(A===-1)break;if(_.push(b.substring(f,A)),Et(A+H),N&&(pt(),T))return st();if(t&&x.length>=t)return st(!0)}return ut();function J(X){x.push(X),W=f}function vt(X){var lt=0;return lt=X!==-1&&(X=b.substring(D+1,X))&&X.trim()===""?X.length:lt}function ut(X){return m||(X===void 0&&(X=b.substring(f)),_.push(X),f=Y,J(_),N&&pt()),st()}function Et(X){f=X,J(_),_=[],A=b.indexOf(n,f)}function st(X){if(a.header&&!k&&x.length&&!y){var lt=x[0],bt=Object.create(null),Dt=new Set(lt);let qt=!1;for(let kt=0;kt<lt.length;kt++){let mt=lt[kt];if(bt[mt=E(a.transformHeader)?a.transformHeader(mt,kt):mt]){let wt,Pt=bt[mt];for(;wt=mt+"_"+Pt,Pt++,Dt.has(wt););Dt.add(wt),lt[kt]=wt,bt[mt]++,qt=!0,(w=w===null?{}:w)[wt]=mt}else bt[mt]=1,lt[kt]=mt;Dt.add(mt)}qt&&console.warn("Duplicate headers found and renamed."),y=!0}return{data:x,errors:P,meta:{delimiter:i,linebreak:n,aborted:T,truncated:!!X,cursor:W+(k||0),renamedHeaders:w}}}function pt(){u(st()),x=[],P=[]}},this.abort=function(){T=!0},this.getCharIndex=function(){return f}}function yt(a){var i=a.data,n=L[i.workerId],p=!1;if(i.error)n.userError(i.error,i.file);else if(i.results&&i.results.data){var u={abort:function(){p=!0,it(i.workerId,{data:[],errors:[],meta:{aborted:!0}})},pause:Q,resume:Q};if(E(n.userStep)){for(var t=0;t<i.results.data.length&&(n.userStep({data:i.results.data[t],errors:i.results.errors,meta:i.results.meta},u),!p);t++);delete i.results}else E(n.userChunk)&&(n.userChunk(i.results,u,i.file),delete i.results)}i.finished&&!p&&it(i.workerId,i.results)}function it(a,i){var n=L[a];E(n.userComplete)&&n.userComplete(i),n.terminate(),delete L[a]}function Q(){throw new Error("Not implemented.")}function dt(a){if(typeof a!="object"||a===null)return a;var i,n=Array.isArray(a)?[]:{};for(i in a)n[i]=dt(a[i]);return n}function tt(a,i){return function(){a.apply(i,arguments)}}function E(a){return typeof a=="function"}return o.parse=function(a,i){var n=(i=i||{}).dynamicTyping||!1;if(E(n)&&(i.dynamicTypingFunction=n,n={}),i.dynamicTyping=n,i.transform=!!E(i.transform)&&i.transform,!i.worker||!o.WORKERS_SUPPORTED)return n=null,o.NODE_STREAM_INPUT,typeof a=="string"?(a=(p=>p.charCodeAt(0)!==65279?p:p.slice(1))(a),n=new(i.download?$:j)(i)):a.readable===!0&&E(a.read)&&E(a.on)?n=new G(i):(l.File&&a instanceof File||a instanceof Object)&&(n=new F(i)),n.stream(a);(n=(()=>{var p;return!!o.WORKERS_SUPPORTED&&(p=(()=>{var u=l.URL||l.webkitURL||null,t=r.toString();return o.BLOB_URL||(o.BLOB_URL=u.createObjectURL(new Blob(["var global = (function() { if (typeof self !== 'undefined') { return self; } if (typeof window !== 'undefined') { return window; } if (typeof global !== 'undefined') { return global; } return {}; })(); global.IS_PAPA_WORKER=true; ","(",t,")();"],{type:"text/javascript"})))})(),(p=new l.Worker(p)).onmessage=yt,p.id=R++,L[p.id]=p)})()).userStep=i.step,n.userChunk=i.chunk,n.userComplete=i.complete,n.userError=i.error,i.step=E(i.step),i.chunk=E(i.chunk),i.complete=E(i.complete),i.error=E(i.error),delete i.worker,n.postMessage({input:a,config:i,workerId:n.id})},o.unparse=function(a,i){var n=!1,p=!0,u=",",t=`\r
`,c='"',w=c+c,y=!1,d=null,S=!1,f=((()=>{if(typeof i=="object"){if(typeof i.delimiter!="string"||o.BAD_DELIMITERS.filter(function(k){return i.delimiter.indexOf(k)!==-1}).length||(u=i.delimiter),typeof i.quotes!="boolean"&&typeof i.quotes!="function"&&!Array.isArray(i.quotes)||(n=i.quotes),typeof i.skipEmptyLines!="boolean"&&typeof i.skipEmptyLines!="string"||(y=i.skipEmptyLines),typeof i.newline=="string"&&(t=i.newline),typeof i.quoteChar=="string"&&(c=i.quoteChar),typeof i.header=="boolean"&&(p=i.header),Array.isArray(i.columns)){if(i.columns.length===0)throw new Error("Option columns is empty");d=i.columns}i.escapeChar!==void 0&&(w=i.escapeChar+c),i.escapeFormulae instanceof RegExp?S=i.escapeFormulae:typeof i.escapeFormulae=="boolean"&&i.escapeFormulae&&(S=/^[=+\-@\t\r].*$/)}})(),new RegExp(nt(c),"g"));if(typeof a=="string"&&(a=JSON.parse(a)),Array.isArray(a)){if(!a.length||Array.isArray(a[0]))return T(null,a,y);if(typeof a[0]=="object")return T(d||Object.keys(a[0]),a,y)}else if(typeof a=="object")return typeof a.data=="string"&&(a.data=JSON.parse(a.data)),Array.isArray(a.data)&&(a.fields||(a.fields=a.meta&&a.meta.fields||d),a.fields||(a.fields=Array.isArray(a.data[0])?a.fields:typeof a.data[0]=="object"?Object.keys(a.data[0]):[]),Array.isArray(a.data[0])||typeof a.data[0]=="object"||(a.data=[a.data])),T(a.fields||[],a.data||[],y);throw new Error("Unable to serialize unrecognized input");function T(k,m,Y){var z="",H=(typeof k=="string"&&(k=JSON.parse(k)),typeof m=="string"&&(m=JSON.parse(m)),Array.isArray(k)&&0<k.length),rt=!Array.isArray(m[0]);if(H&&p){for(var N=0;N<k.length;N++)0<N&&(z+=u),z+=b(k[N],N);0<m.length&&(z+=t)}for(var x=0;x<m.length;x++){var P=(H?k:m[x]).length,_=!1,W=H?Object.keys(m[x]).length===0:m[x].length===0;if(Y&&!H&&(_=Y==="greedy"?m[x].join("").trim()==="":m[x].length===1&&m[x][0].length===0),Y==="greedy"&&H){for(var V=[],q=0;q<P;q++){var O=rt?k[q]:q;V.push(m[x][O])}_=V.join("").trim()===""}if(!_){for(var A=0;A<P;A++){0<A&&!W&&(z+=u);var Z=H&&rt?k[A]:A;z+=b(m[x][Z],A)}x<m.length-1&&(!Y||0<P&&!W)&&(z+=t)}}return z}function b(k,m){var Y,z;return k==null?"":k.constructor===Date?JSON.stringify(k).slice(1,25):(z=!1,S&&typeof k=="string"&&S.test(k)&&(k="'"+k,z=!0),Y=k.toString().replace(f,w),(z=z||n===!0||typeof n=="function"&&n(k,m)||Array.isArray(n)&&n[m]||((H,rt)=>{for(var N=0;N<rt.length;N++)if(-1<H.indexOf(rt[N]))return!0;return!1})(Y,o.BAD_DELIMITERS)||-1<Y.indexOf(u)||Y.charAt(0)===" "||Y.charAt(Y.length-1)===" ")?c+Y+c:Y)}},o.RECORD_SEP="",o.UNIT_SEP="",o.BYTE_ORDER_MARK="\uFEFF",o.BAD_DELIMITERS=["\r",`
`,'"',o.BYTE_ORDER_MARK],o.WORKERS_SUPPORTED=!g&&!!l.Worker,o.NODE_STREAM_INPUT=1,o.LocalChunkSize=10485760,o.RemoteChunkSize=5242880,o.DefaultDelimiter=",",o.Parser=at,o.ParserHandle=et,o.NetworkStreamer=$,o.FileStreamer=F,o.StringStreamer=j,o.ReadableStreamStreamer=G,l.jQuery&&((h=l.jQuery).fn.parse=function(a){var i=a.config||{},n=[];return this.each(function(t){if(!(h(this).prop("tagName").toUpperCase()==="INPUT"&&h(this).attr("type").toLowerCase()==="file"&&l.FileReader)||!this.files||this.files.length===0)return!0;for(var c=0;c<this.files.length;c++)n.push({file:this.files[c],inputElem:this,instanceConfig:h.extend({},i)})}),p(),this;function p(){if(n.length===0)E(a.complete)&&a.complete();else{var t,c,w,y,d=n[0];if(E(a.before)){var S=a.before(d.file,d.inputElem);if(typeof S=="object"){if(S.action==="abort")return t="AbortError",c=d.file,w=d.inputElem,y=S.reason,void(E(a.error)&&a.error({name:t},c,w,y));if(S.action==="skip")return void u();typeof S.config=="object"&&(d.instanceConfig=h.extend(d.instanceConfig,S.config))}else if(S==="skip")return void u()}var f=d.instanceConfig.complete;d.instanceConfig.complete=function(T){E(f)&&f(T,d.file,d.inputElem),u()},o.parse(d.file,d.instanceConfig)}}function u(){n.splice(0,1),p()}}),C&&(l.onmessage=function(a){a=a.data,o.WORKER_ID===void 0&&a&&(o.WORKER_ID=a.workerId),typeof a.input=="string"?l.postMessage({workerId:o.WORKER_ID,results:o.parse(a.input,a.config),finished:!0}):(l.File&&a.input instanceof File||a.input instanceof Object)&&(a=o.parse(a.input,a.config))&&l.postMessage({workerId:o.WORKER_ID,results:a,finished:!0})}),($.prototype=Object.create(v.prototype)).constructor=$,(F.prototype=Object.create(v.prototype)).constructor=F,(j.prototype=Object.create(j.prototype)).constructor=j,(G.prototype=Object.create(v.prototype)).constructor=G,o})}(Ct)),Ct.exports}var Ht=Vt();const At=Yt(Ht),Qt=document.getElementById("app");function Zt(){try{const e=JSON.parse(localStorage.getItem("srwdd-state"));if(e)return{pilots:Array.isArray(e.pilots)?e.pilots:[],skills:Array.isArray(e.skills)?e.skills:[],units:Array.isArray(e.units)?e.units:[]}}catch{}return{pilots:[],skills:[],units:[]}}function ct(){localStorage.setItem("srwdd-state",JSON.stringify({pilots:I.pilots.map(e=>e.data||e),skills:I.skills.map(e=>e.data||e),units:I.units.map(e=>e.data||e)}))}function Ft(e){return["pilot","skill","unit"].includes(e)?e:"pilot"}function Jt(){const e=new URLSearchParams(window.location.search);return Ft(e.get("view"))}function $t(e){const s=Ft(e),r=new URL(window.location.href);r.searchParams.set("view",s),window.history.replaceState(null,"",r)}let I=Zt(),B=Jt(),gt=null,_t=null,ht=null,ft=null,St=!1,Nt=!1,xt={pilot:{key:"id",dir:"asc"},skill:{key:"id",dir:"asc"},unit:{key:"id",dir:"asc"}};function Wt(e){return new Bt({data:e},I.skills)}function Rt(e){return new Tt({data:ie(e)})}function Ot(e){const s=String(e??"").trim();if(s==="")return"";if(s==="-")return"-";const r=Number(s);return Number.isNaN(r)?s:r}function K(){var u;const e=I.pilots.map(t=>t instanceof Bt?t:Wt(t)),s=I.skills.map(t=>t instanceof It?t:new It({data:t})),r=I.units.map(t=>t instanceof Tt?t:Rt(t));I.pilots=e,I.skills=s,I.units=r,I.pilots.forEach(t=>{t.skillList=I.skills}),!gt&&e.length>0&&(gt=String(e[0].id));const l=e.find(t=>String(t.id)===String(gt)),h=(l==null?void 0:l.equippedSkillIds)||[],g=new Set(h.map(String)),C=(l==null?void 0:l.name)||"",L=s.map(t=>{const c=Array.isArray(t.pilotNames)?t.pilotNames:[],w=C&&c.some(y=>y.includes(C));return{skill:t,eligible:w}}),R=Number((u=l==null?void 0:l.data)==null?void 0:u.skillSlots)||0,o=h.length,v=xt.pilot,$=xt.skill,F=xt.unit,j=[...e].sort((t,c)=>Lt(t,c,v.key,v.dir)),G=[...s].sort((t,c)=>Lt(t,c,$.key,$.dir)),et=[...r].sort((t,c)=>Lt(t,c,F.key,F.dir)),nt=new Map(e.map(t=>[String(t.id),t])),at=r.find(t=>String(t.id)===String(_t)),yt=(at==null?void 0:at.pilotId)||"",it=B==="unit"?r.find(t=>String(t.id)===String(ft)):null,Q=(it==null?void 0:it.data)||{},dt=Q.terrain||{},tt=Q.specialAbility||{},E=Q.normalWeapon||{},a=E.range||{},i=B==="skill"?s.find(t=>String(t.id)===String(ht)):null,n=(i==null?void 0:i.data)||{},p=Array.isArray(n.pilotNames)?n.pilotNames.join(", "):n.pilotNames||"";if(Qt.innerHTML=`
    <div class="app-shell">
      <nav class="navbar navbar-expand sticky-top app-navbar">
        <div class="container">
          <span class="navbar-brand app-title">SRWDD</span>
          <ul class="nav nav-pills app-tabs">
            <li class="nav-item">
              <button id="view-pilot" class="nav-link ${B==="pilot"?"active":""}" type="button">パイロット</button>
            </li>
            <li class="nav-item">
              <button id="view-skill" class="nav-link ${B==="skill"?"active":""}" type="button">スキル</button>
            </li>
            <li class="nav-item">
              <button id="view-unit" class="nav-link ${B==="unit"?"active":""}" type="button">機体</button>
            </li>
          </ul>
        </div>
      </nav>
      <div class="container py-4 app-content">
    ${B==="pilot"?`
    <div class="card border-0 shadow-sm rounded-4 mb-4">
      <div class="card-header bg-transparent border-0 pt-3">
        <div class="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2">
          <h2 class="h6 mb-0">パイロットデータ</h2>
          <div class="d-flex flex-wrap gap-2 align-items-center">
            <input type="file" id="pilot-csv" accept=".csv" class="form-control form-control-sm" />
            <button id="export-pilot" class="btn btn-sm btn-primary">
              <i class="bi bi-download me-1"></i>CSVエクスポート
            </button>
          </div>
        </div>
      </div>
      <div class="card-body">
      <div class="table-responsive">
      <table class="table table-sm table-striped table-hover align-middle mb-0">
        <thead class="table-light">
          <tr>
            <th rowspan="2" data-sort="id" class="sortable">ID</th><th rowspan="2" data-sort="name" class="sortable">名前</th>
            <th colspan="4">基礎</th>
            <th colspan="4">基本スキル</th>
            <th colspan="4">特殊スキル</th>
            <th colspan="4">合計</th>
            <th rowspan="2" class="text-center">操作</th>
          </tr>
          <tr>
            <th data-sort="baseAttack" class="sortable">攻</th><th data-sort="baseDefense" class="sortable">防</th><th data-sort="baseAccuracy" class="sortable">照</th><th data-sort="baseMobility" class="sortable">運</th>
            <th data-sort="basicSkillAttack" class="sortable">攻</th><th data-sort="basicSkillDefense" class="sortable">防</th><th data-sort="basicSkillAccuracy" class="sortable">照</th><th data-sort="basicSkillMobility" class="sortable">運</th>
            <th data-sort="specialSkillAttack" class="sortable">攻</th><th data-sort="specialSkillDefense" class="sortable">防</th><th data-sort="specialSkillAccuracy" class="sortable">照</th><th data-sort="specialSkillMobility" class="sortable">運</th>
            <th data-sort="totalAttack" class="sortable">攻</th><th data-sort="totalDefense" class="sortable">防</th><th data-sort="totalAccuracy" class="sortable">照</th><th data-sort="totalMobility" class="sortable">運</th>
          </tr>
        </thead>
        <tbody>
          ${j.map((t,c)=>`
            <tr>
              <td>${t.id||""}</td>
              <td>${t.name||""}</td>
              <td>${t.baseAttack}</td><td>${t.baseDefense}</td><td>${t.baseAccuracy}</td><td>${t.baseMobility}</td>
              <td>${t.basicSkillAttack}</td><td>${t.basicSkillDefense}</td><td>${t.basicSkillAccuracy}</td><td>${t.basicSkillMobility}</td>
              <td>${t.specialSkillAttack}</td><td>${t.specialSkillDefense}</td><td>${t.specialSkillAccuracy}</td><td>${t.specialSkillMobility}</td>
              <td>${t.totalAttack}</td><td>${t.totalDefense}</td><td>${t.totalAccuracy}</td><td>${t.totalMobility}</td>
              <td class="text-center">
                <button class="pilot-equip btn btn-sm btn-outline-secondary" data-id="${t.id}" title="装備" aria-label="装備">
                  <i class="bi bi-gear"></i>
                </button>
                <button class="pilot-delete btn btn-sm btn-danger" data-index="${c}" title="削除" aria-label="削除">
                  <i class="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
      </div>
      </div>
    </div>
    <div class="card border-0 shadow-sm rounded-4 mb-4">
      <div class="card-header bg-transparent border-0 pt-3">
        <h2 class="h6 mb-0">パイロット追加</h2>
      </div>
      <div class="card-body">
      <form id="pilot-form" class="row g-3">
        <div class="col-12 col-md-3">
          <label class="form-label small">名前</label>
          <input id="pilot-name" name="name" placeholder="名前" required class="form-control" />
        </div>
        <div class="col-12">
          <div class="border rounded p-3 bg-light">
            <div class="fw-semibold mb-2">基礎ステータス</div>
            <div class="row g-2">
              <div class="col-6 col-md-3"><input name="baseAttack" type="number" placeholder="攻撃" class="form-control" /></div>
              <div class="col-6 col-md-3"><input name="baseDefense" type="number" placeholder="防御" class="form-control" /></div>
              <div class="col-6 col-md-3"><input name="baseAccuracy" type="number" placeholder="照準" class="form-control" /></div>
              <div class="col-6 col-md-3"><input name="baseMobility" type="number" placeholder="運動" class="form-control" /></div>
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="border rounded p-3 bg-light">
            <div class="fw-semibold mb-2">基本スキル</div>
            <div class="row g-2">
              <div class="col-6 col-md-3"><input name="basicSkillAttack" type="number" placeholder="攻撃" class="form-control" /></div>
              <div class="col-6 col-md-3"><input name="basicSkillDefense" type="number" placeholder="防御" class="form-control" /></div>
              <div class="col-6 col-md-3"><input name="basicSkillAccuracy" type="number" placeholder="照準" class="form-control" /></div>
              <div class="col-6 col-md-3"><input name="basicSkillMobility" type="number" placeholder="運動" class="form-control" /></div>
            </div>
          </div>
        </div>
        <div class="col-12">
          <button type="submit" class="btn btn-primary">追加</button>
        </div>
      </form>
      </div>
    </div>
    `:B==="skill"?`
    <div class="card border-0 shadow-sm rounded-4 mb-4">
      <div class="card-header bg-transparent border-0 pt-3">
        <div class="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2">
          <h2 class="h6 mb-0">スキルデータ</h2>
          <div class="d-flex flex-wrap gap-2 align-items-center">
            <input type="file" id="skill-csv" accept=".csv" class="form-control form-control-sm" />
            <button id="export-skill" class="btn btn-sm btn-primary">
              <i class="bi bi-download me-1"></i>CSVエクスポート
            </button>
          </div>
        </div>
      </div>
      <div class="card-body">
      <div class="table-responsive">
      <table class="table table-sm table-striped table-hover align-middle mb-0">
        <thead class="table-light">
          <tr>
            <th data-sort="id" class="sortable">ID</th>
            <th data-sort="name" class="sortable">名前</th>
            <th data-sort="pilotNames" class="sortable">対応パイロット</th>
            <th data-sort="effect" class="sortable">効果</th>
            <th data-sort="attack" class="sortable">攻撃</th>
            <th data-sort="defense" class="sortable">防御</th>
            <th data-sort="accuracy" class="sortable">照準</th>
            <th data-sort="mobility" class="sortable">運動</th>
            <th class="text-center">操作</th>
          </tr>
        </thead>
        <tbody>
          ${G.map(t=>{var c;return`
            <tr>
              <td>${t.id||""}</td>
              <td>${t.name||""}</td>
              <td>${((c=t.pilotNames)==null?void 0:c.join(", "))||""}</td>
              <td>${t.effect||""}</td>
              <td>${t.attack||0}</td>
              <td>${t.defense||0}</td>
              <td>${t.accuracy||0}</td>
              <td>${t.mobility||0}</td>
              <td class="text-center">
                <button class="skill-edit btn btn-sm btn-outline-secondary" data-id="${t.id}" title="更新" aria-label="更新">
                  <i class="bi bi-pencil"></i>
                </button>
                <button class="skill-delete btn btn-sm btn-danger" data-id="${t.id}" title="削除" aria-label="削除">
                  <i class="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          `}).join("")}
        </tbody>
      </table>
      </div>
      </div>
    </div>
    <div class="card border-0 shadow-sm rounded-4 mb-4">
      <div class="card-header bg-transparent border-0 pt-3">
        <h2 class="h6 mb-0">${i?"スキル更新":"スキル追加"}</h2>
      </div>
      <div class="card-body">
      <form id="skill-form" class="row g-3">
        <div class="col-12 col-md-4">
          <label class="form-label small">名前</label>
          <input name="name" placeholder="名前" required class="form-control" value="${ot(n.name||"")}" />
        </div>
        <div class="col-12 col-md-4">
          <label class="form-label small">対応パイロット</label>
          <input name="pilotNames" placeholder="対応パイロット（カンマ区切り可）" class="form-control" list="pilot-name-list" autocomplete="off" value="${ot(p)}" />
          <datalist id="pilot-name-list">
            ${e.map(t=>`<option value="${t.name}">`).join("")}
          </datalist>
        </div>
        <div class="col-12 col-md-4">
          <label class="form-label small">その他効果</label>
          <input name="effect" placeholder="その他効果" class="form-control" value="${ot(n.effect||"")}" />
        </div>
        <div class="col-6 col-md-3"><input name="attack" type="number" placeholder="攻撃" class="form-control" value="${n.attack??""}" /></div>
        <div class="col-6 col-md-3"><input name="defense" type="number" placeholder="防御" class="form-control" value="${n.defense??""}" /></div>
        <div class="col-6 col-md-3"><input name="accuracy" type="number" placeholder="照準" class="form-control" value="${n.accuracy??""}" /></div>
        <div class="col-6 col-md-3"><input name="mobility" type="number" placeholder="運動" class="form-control" value="${n.mobility??""}" /></div>
        <div class="col-12">
          <button type="submit" class="btn btn-primary">${i?"更新":"追加"}</button>
          ${i?'<button type="button" id="cancel-skill-edit" class="btn btn-outline-secondary ms-2">キャンセル</button>':""}
        </div>
      </form>
      </div>
    </div>
    `:B==="unit"?`
    <div class="card border-0 shadow-sm rounded-4 mb-4">
      <div class="card-header bg-transparent border-0 pt-3">
        <div class="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2">
          <h2 class="h6 mb-0">機体データ</h2>
          <div class="d-flex flex-wrap gap-2 align-items-center">
            <input type="file" id="unit-csv" accept=".csv" class="form-control form-control-sm" />
            <button id="export-unit" class="btn btn-sm btn-primary">
              <i class="bi bi-download me-1"></i>CSVエクスポート
            </button>
          </div>
        </div>
      </div>
      <div class="card-body">
      <div class="table-responsive">
      <table class="table table-sm table-striped table-hover align-middle mb-0">
        <thead class="table-light">
          <tr>
            <th rowspan="3" data-sort="id" class="sortable">ID</th>
            <th rowspan="3" data-sort="name" class="sortable">名前</th>
            <th rowspan="3" data-sort="pilotId" class="sortable">パイロット</th>
            <th rowspan="3" data-sort="size" class="sortable">サイズ</th>
            <th rowspan="3" data-sort="type" class="sortable">タイプ</th>
            <th rowspan="3" data-sort="hp" class="sortable">HP</th>
            <th rowspan="3" data-sort="attack" class="sortable">攻撃力</th>
            <th rowspan="3" data-sort="defense" class="sortable">防御力</th>
            <th rowspan="3" data-sort="accuracy" class="sortable">照準値</th>
            <th rowspan="3" data-sort="mobility" class="sortable">運動性</th>
            <th rowspan="3" data-sort="movement" class="sortable">移動</th>
            <th rowspan="3" data-sort="speed" class="sortable">速さ</th>
            <th rowspan="3" data-sort="specialAbilityName" class="sortable">特殊能力名</th>
            <th rowspan="3" data-sort="specialAbilityEffect" class="sortable">特殊能力効果</th>
            <th rowspan="3" data-sort="terrainAir" class="sortable">空</th>
            <th rowspan="3" data-sort="terrainLand" class="sortable">陸</th>
            <th rowspan="3" data-sort="terrainSea" class="sortable">海</th>
            <th rowspan="3" data-sort="terrainSpace" class="sortable">宇</th>
            <th colspan="6">通常攻撃</th>
            <th rowspan="3" class="text-center">操作</th>
          </tr>
          <tr>
            <th rowspan="2" data-sort="normalWeaponName" class="sortable">名前</th>
            <th rowspan="2" data-sort="normalWeaponType" class="sortable">ﾀｲﾌﾟ</th>
            <th colspan="2">射程</th>
            <th rowspan="2" data-sort="normalWeaponAction" class="sortable">ｱｸｼｮﾝ</th>
            <th rowspan="2" data-sort="normalWeaponUses" class="sortable">回数</th>
          </tr>
          <tr>
            <th data-sort="normalWeaponRangeMin" class="sortable">min</th>
            <th data-sort="normalWeaponRangeMax" class="sortable">max</th>
          </tr>
        </thead>
        <tbody>
          ${et.map(t=>{var T,b,k,m,Y,z,H,rt,N,x,P,_,W,V,q,O,A,Z;const c=nt.get(String(t.pilotId)),w=!!c,y=(Number(t.attack)||0)+(Number(c==null?void 0:c.totalAttack)||0),d=(Number(t.defense)||0)+(Number(c==null?void 0:c.totalDefense)||0),S=(Number(t.accuracy)||0)+(Number(c==null?void 0:c.totalAccuracy)||0),f=(Number(t.mobility)||0)+(Number(c==null?void 0:c.totalMobility)||0);return`
            <tr>
              <td>${t.id||""}</td>
              <td>${t.name||""}</td>
              <td>${(c==null?void 0:c.name)||""}</td>
              <td>${t.size||""}</td>
              <td>${t.type||""}</td>
              <td>${t.hp||0}</td>
              <td>
                <div>${t.attack||0}</div>
                ${w?`<div class="small text-secondary text-nowrap">${y}</div>`:""}
              </td>
              <td>
                <div>${t.defense||0}</div>
                ${w?`<div class="small text-secondary text-nowrap">${d}</div>`:""}
              </td>
              <td>
                <div>${t.accuracy||0}</div>
                ${w?`<div class="small text-secondary text-nowrap">${S}</div>`:""}
              </td>
              <td>
                <div>${t.mobility||0}</div>
                ${w?`<div class="small text-secondary text-nowrap">${f}</div>`:""}
              </td>
              <td>${t.movement||0}</td>
              <td>${t.speed||0}</td>
              <td>${((T=t.specialAbility)==null?void 0:T.name)||""}</td>
              <td>${((b=t.specialAbility)==null?void 0:b.effect)||""}</td>
              <td>${((m=(k=t.data)==null?void 0:k.terrain)==null?void 0:m.air)||"C"}</td>
              <td>${((z=(Y=t.data)==null?void 0:Y.terrain)==null?void 0:z.land)||"C"}</td>
              <td>${((rt=(H=t.data)==null?void 0:H.terrain)==null?void 0:rt.sea)||"C"}</td>
              <td>${((x=(N=t.data)==null?void 0:N.terrain)==null?void 0:x.space)||"C"}</td>
              <td>${((P=t.normalWeapon)==null?void 0:P.name)||""}</td>
              <td>${((_=t.normalWeapon)==null?void 0:_.type)||""}</td>
              <td>${((V=(W=t.normalWeapon)==null?void 0:W.range)==null?void 0:V.min)||0}</td>
              <td>${((O=(q=t.normalWeapon)==null?void 0:q.range)==null?void 0:O.max)||0}</td>
              <td>${((A=t.normalWeapon)==null?void 0:A.action)||0}</td>
              <td>${((Z=t.normalWeapon)==null?void 0:Z.uses)||0}</td>
              <td class="text-center">
                <button class="unit-edit btn btn-sm btn-outline-secondary" data-id="${t.id}" title="更新" aria-label="更新">
                  <i class="bi bi-pencil"></i>
                </button>
                <button class="unit-select-pilot btn btn-sm btn-outline-secondary" data-id="${t.id}" title="パイロット選択" aria-label="パイロット選択">
                  <i class="bi bi-person"></i>
                </button>
                <button class="unit-delete btn btn-sm btn-danger" data-id="${t.id}" title="削除" aria-label="削除">
                  <i class="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          `}).join("")}
        </tbody>
      </table>
      </div>
      </div>
    </div>
    <div class="card border-0 shadow-sm rounded-4 mb-4">
      <div class="card-header bg-transparent border-0 pt-3">
        <h2 class="h6 mb-0">${it?"機体更新":"機体追加"}</h2>
      </div>
      <div class="card-body">
      <form id="unit-form" class="row g-3">
        <div class="col-12 col-md-4">
          <label class="form-label small">名前</label>
          <input name="name" placeholder="名前" required class="form-control" value="${ot(Q.name||"")}" />
        </div>
        <div class="col-6 col-md-4">
          <label class="form-label small">サイズ</label>
          <input name="size" placeholder="サイズ" class="form-control" value="${ot(Q.size||"")}" />
        </div>
        <div class="col-6 col-md-4">
          <label class="form-label small">タイプ</label>
          <input name="type" placeholder="タイプ" class="form-control" value="${ot(Q.type||"")}" />
        </div>
        <div class="col-6 col-md-3"><input name="hp" type="number" placeholder="HP" class="form-control" value="${Q.hp??""}" /></div>
        <div class="col-6 col-md-3"><input name="attack" type="number" placeholder="攻撃" class="form-control" value="${Q.attack??""}" /></div>
        <div class="col-6 col-md-3"><input name="defense" type="number" placeholder="防御" class="form-control" value="${Q.defense??""}" /></div>
        <div class="col-6 col-md-3"><input name="accuracy" type="number" placeholder="照準" class="form-control" value="${Q.accuracy??""}" /></div>
        <div class="col-6 col-md-3"><input name="mobility" type="number" placeholder="運動" class="form-control" value="${Q.mobility??""}" /></div>
        <div class="col-6 col-md-3"><input name="movement" type="number" placeholder="移動" class="form-control" value="${Q.movement??""}" /></div>
        <div class="col-6 col-md-3"><input name="speed" type="number" placeholder="速さ" class="form-control" value="${Q.speed??""}" /></div>
        <div class="col-12 mt-1">
          <div class="border rounded p-3 bg-light">
            <div class="fw-semibold mb-2">特殊能力</div>
            <div class="row g-2">
              <div class="col-12 col-md-4"><input name="specialAbilityName" placeholder="特殊能力名" class="form-control" value="${ot(tt.name||"")}" /></div>
              <div class="col-12 col-md-8"><input name="specialAbilityEffect" placeholder="特殊能力効果" class="form-control" value="${ot(tt.effect||"")}" /></div>
            </div>
          </div>
        </div>
        <div class="col-12 mt-1">
          <div class="border rounded p-3 bg-light">
            <div class="fw-semibold mb-2">地形適性（S/A/B/C/D）</div>
            <div class="row g-2">
              <div class="col-6 col-md-3"><input name="terrainAir" placeholder="空" class="form-control" maxlength="1" value="${ot(it&&dt.air||"")}" /></div>
              <div class="col-6 col-md-3"><input name="terrainLand" placeholder="陸" class="form-control" maxlength="1" value="${ot(it&&dt.land||"")}" /></div>
              <div class="col-6 col-md-3"><input name="terrainSea" placeholder="海" class="form-control" maxlength="1" value="${ot(it&&dt.sea||"")}" /></div>
              <div class="col-6 col-md-3"><input name="terrainSpace" placeholder="宇" class="form-control" maxlength="1" value="${ot(it&&dt.space||"")}" /></div>
            </div>
          </div>
        </div>
        <div class="col-12 mt-1">
          <div class="border rounded p-3 bg-light">
            <div class="fw-semibold mb-2">通常攻撃</div>
            <div class="row g-2">
              <div class="col-12 col-md-3"><input name="normalWeaponName" placeholder="名前" class="form-control" value="${ot(E.name||"")}" /></div>
              <div class="col-12 col-md-3"><input name="normalWeaponType" placeholder="タイプ" class="form-control" value="${ot(E.type||"")}" /></div>
              <div class="col-6 col-md-2"><input name="normalWeaponRangeMin" type="number" placeholder="射程（min）" class="form-control" value="${a.min??""}" /></div>
              <div class="col-6 col-md-2"><input name="normalWeaponRangeMax" type="number" placeholder="射程（max）" class="form-control" value="${a.max??""}" /></div>
              <div class="col-6 col-md-1"><input name="normalWeaponAction" type="text" inputmode="numeric" placeholder="アク" class="form-control" value="${E.action??""}" /></div>
              <div class="col-6 col-md-1"><input name="normalWeaponUses" type="text" inputmode="numeric" placeholder="回数" class="form-control" value="${E.uses??""}" /></div>
            </div>
          </div>
        </div>
        <div class="col-12">
          <button type="submit" class="btn btn-primary">${it?"更新":"追加"}</button>
          ${it?'<button type="button" id="cancel-unit-edit" class="btn btn-outline-secondary ms-2">キャンセル</button>':""}
        </div>
      </form>
      </div>
    </div>
    `:""}
    ${B==="pilot"?`
    <div class="modal fade" id="equip-modal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title fs-6">スキル装備</h3>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="閉じる"></button>
          </div>
          <div class="modal-body">
            <div class="row g-2 align-items-end mb-3">
              <div class="col-12 col-md-5">
                <label class="form-label small">パイロット</label>
                <select id="equip-pilot" class="form-select">
                  ${e.map(t=>`<option value="${t.id}" ${String(t.id)===String(gt)?"selected":""}>${t.name||t.id}</option>`).join("")}
                </select>
              </div>
              <div class="col-6 col-md-3">
                <label class="form-label small">装備枠</label>
                <input id="equip-slots" type="number" min="0" value="${R}" class="form-control" />
              </div>
              <div class="col-6 col-md-4 text-md-end">
                <span id="equip-count" class="badge text-bg-dark">${o}/${R}</span>
              </div>
            </div>
            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-2" id="equip-list">
              ${L.filter(({eligible:t})=>t).map(({skill:t},c)=>{const w=(t==null?void 0:t.id)??"",y=g.has(String(w))?"checked":"",d=(t==null?void 0:t.name)||"(名称未設定)",S=`equip-skill-${w||c}`;return`<div class="col equip-tile">
                  <input class="btn-check equip-skill" type="checkbox" id="${S}" value="${w}" ${y} />
                  <label class="btn btn-outline-dark w-100 text-start" for="${S}">${d}</label>
                </div>`}).join("")}
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">閉じる</button>
          </div>
        </div>
      </div>
    </div>
    `:""}
    ${B==="unit"?`
    <div class="modal fade" id="unit-pilot-modal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title fs-6">パイロット選択</h3>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="閉じる"></button>
          </div>
          <div class="modal-body">
            <label class="form-label small">${(at==null?void 0:at.name)||""}</label>
            <select id="unit-pilot" class="form-select">
              <option value="">未設定</option>
              ${e.map(t=>`<option value="${t.id}" ${String(t.id)===String(yt)?"selected":""}>${t.name||t.id}</option>`).join("")}
            </select>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">閉じる</button>
          </div>
        </div>
      </div>
    </div>
    `:""}
      </div>
    </div>
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
      <div id="app-toast" class="toast align-items-center text-bg-dark border-0" role="status" aria-live="polite" aria-atomic="true">
        <div class="d-flex">
          <div id="app-toast-message" class="toast-body"></div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="閉じる"></button>
        </div>
      </div>
    </div>
  `,document.getElementById("view-pilot").onclick=()=>{B="pilot",$t(B),St=!1,K()},document.getElementById("view-skill").onclick=()=>{B="skill",$t(B),St=!1,K()},document.getElementById("view-unit").onclick=()=>{B="unit",$t(B),St=!1,K()},B==="pilot"){document.getElementById("pilot-csv").onchange=Gt,document.getElementById("export-pilot").onclick=Xt,document.getElementById("pilot-form").onsubmit=oe,document.querySelectorAll(".pilot-equip").forEach(d=>{d.onclick=()=>{gt=d.getAttribute("data-id"),St=!0,K()}});const t=document.getElementById("equip-pilot"),c=document.getElementById("equip-slots"),w=document.getElementById("equip-modal"),y=document.getElementById("equip-count");if(w&&window.bootstrap){const d=window.bootstrap.Modal.getOrCreateInstance(w);St&&d.show(),w.addEventListener("hidden.bs.modal",()=>{St=!1})}t&&(t.onchange=()=>{gt=t.value,K()}),c&&(c.onchange=()=>{const d=I.pilots.find(b=>String(b.id)===String(gt));if(!d)return;d.data=d.data||{};const S=Number(c.value)||0;d.data.skillSlots=S;const f=Array.from(document.querySelectorAll(".equip-skill:checked"));f.length>S&&f.slice(S).forEach(k=>{k.checked=!1});const T=new Set(Array.from(document.querySelectorAll(".equip-skill:checked")).map(b=>String(b.value)));d.data.equippedSkillIds=Array.from(T),ct(),y&&(y.textContent=`${T.size}/${S}`)}),document.querySelectorAll(".equip-skill").forEach(d=>{d.onchange=()=>{var k;const S=I.pilots.find(m=>String(m.id)===String(gt));if(!S)return;const f=Number((k=S.data)==null?void 0:k.skillSlots)||0,T=new Set(S.equippedSkillIds.map(String)),b=d.value;if(d.checked){if(T.size>=f){d.checked=!1;return}T.add(String(b))}else T.delete(String(b));S.data=S.data||{},S.data.equippedSkillIds=Array.from(T),ct(),y&&(y.textContent=`${T.size}/${f}`)}})}else if(B==="skill"){document.getElementById("skill-csv").onchange=ae,document.getElementById("export-skill").onclick=le,document.getElementById("skill-form").onsubmit=ce,document.querySelectorAll(".skill-edit").forEach(c=>{c.onclick=()=>{ht=c.getAttribute("data-id"),K()}});const t=document.getElementById("cancel-skill-edit");t&&(t.onclick=()=>{ht=null,K()})}else{document.getElementById("unit-csv").onchange=se,document.getElementById("export-unit").onclick=re,document.getElementById("unit-form").onsubmit=de,document.querySelectorAll(".unit-edit").forEach(y=>{y.onclick=()=>{ft=y.getAttribute("data-id"),K()}});const t=document.getElementById("cancel-unit-edit");t&&(t.onclick=()=>{ft=null,K()}),document.querySelectorAll(".unit-select-pilot").forEach(y=>{y.onclick=()=>{_t=y.getAttribute("data-id"),Nt=!0,K()}});const c=document.getElementById("unit-pilot-modal"),w=document.getElementById("unit-pilot");if(c&&window.bootstrap){const y=window.bootstrap.Modal.getOrCreateInstance(c);Nt&&y.show(),c.addEventListener("hidden.bs.modal",()=>{Nt=!1,B==="unit"&&K()})}w&&(w.onchange=()=>{var S;const y=I.units.find(f=>String(f.id)===String(_t));if(!y)return;y.data=y.data||{},y.data.pilotId=w.value||"",ct();const d=(S=window.bootstrap)==null?void 0:S.Modal.getOrCreateInstance(c);Nt=!1,d==null||d.hide()})}document.querySelectorAll("th.sortable").forEach(t=>{t.style.cursor="pointer",t.onclick=()=>{const c=t.getAttribute("data-sort");if(!c)return;const y=xt[B==="pilot"?"pilot":B==="skill"?"skill":"unit"];y.key===c?y.dir=y.dir==="asc"?"desc":"asc":(y.key=c,y.dir="asc"),K()}}),B==="pilot"?document.querySelectorAll(".pilot-delete").forEach(t=>{t.onclick=()=>{const c=Number(t.getAttribute("data-index"));isNaN(c)||(I.pilots.splice(c,1),ct(),K())}}):B==="skill"?document.querySelectorAll(".skill-delete").forEach(t=>{t.onclick=()=>{const c=t.getAttribute("data-id"),w=I.skills.findIndex(y=>{var d;return String(y.id||((d=y.data)==null?void 0:d.id))===String(c)});w!==-1&&(String(ht)===String(c)&&(ht=null),I.skills.splice(w,1),ct(),K())}}):document.querySelectorAll(".unit-delete").forEach(t=>{t.onclick=()=>{const c=t.getAttribute("data-id"),w=I.units.findIndex(y=>{var d;return String(y.id||((d=y.data)==null?void 0:d.id))===String(c)});w!==-1&&(String(ft)===String(c)&&(ft=null),String(_t)===String(c)&&(_t=null),I.units.splice(w,1),ct(),K())}})}function Lt(e,s,r,l){const h=Ut(e,r),g=Ut(s,r);return h<g?l==="asc"?-1:1:h>g?l==="asc"?1:-1:0}function Ut(e,s){var h,g,C,L,R,o,v,$,F,j,G,et,nt,at,yt,it,Q,dt;if(e instanceof Tt){if(s==="specialAbilityName")return String(((h=e.specialAbility)==null?void 0:h.name)||"").toLowerCase();if(s==="specialAbilityEffect")return String(((g=e.specialAbility)==null?void 0:g.effect)||"").toLowerCase();if(s==="terrainAir")return String(((L=(C=e.data)==null?void 0:C.terrain)==null?void 0:L.air)||"");if(s==="terrainLand")return String(((o=(R=e.data)==null?void 0:R.terrain)==null?void 0:o.land)||"");if(s==="terrainSea")return String((($=(v=e.data)==null?void 0:v.terrain)==null?void 0:$.sea)||"");if(s==="terrainSpace")return String(((j=(F=e.data)==null?void 0:F.terrain)==null?void 0:j.space)||"");if(s==="normalWeaponName")return String(((G=e.normalWeapon)==null?void 0:G.name)||"").toLowerCase();if(s==="normalWeaponType")return String(((et=e.normalWeapon)==null?void 0:et.type)||"").toLowerCase();if(s==="normalWeaponRangeMin")return Number(((at=(nt=e.normalWeapon)==null?void 0:nt.range)==null?void 0:at.min)||0);if(s==="normalWeaponRangeMax")return Number(((it=(yt=e.normalWeapon)==null?void 0:yt.range)==null?void 0:it.max)||0);if(s==="normalWeaponAction"){const tt=(Q=e.normalWeapon)==null?void 0:Q.action,E=Number(tt);return Number.isNaN(E)?String(tt??"").toLowerCase():E}if(s==="normalWeaponUses"){const tt=(dt=e.normalWeapon)==null?void 0:dt.uses,E=Number(tt);return Number.isNaN(E)?String(tt??"").toLowerCase():E}}const r=e==null?void 0:e[s];if(Array.isArray(r))return r.join(",");if(r==null)return"";const l=Number(r);return!isNaN(l)&&String(r).trim()!==""?l:String(r).toLowerCase()}function ot(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function zt(e){var l;const s=document.getElementById("app-toast"),r=document.getElementById("app-toast-message");!s||!r||(r.textContent=e,(l=window.bootstrap)!=null&&l.Toast&&window.bootstrap.Toast.getOrCreateInstance(s,{delay:1800}).show())}function Gt(e){const s=e.target.files[0];s&&At.parse(s,{header:!0,complete:r=>{I.pilots=r.data.map(l=>Wt(ee(l))),ct(),K()}})}function Xt(){const e=At.unparse(I.pilots.map(h=>te(h.data||h))),s=new Blob([e],{type:"text/csv"}),r=URL.createObjectURL(s),l=document.createElement("a");l.href=r,l.download="pilots.csv",l.click(),URL.revokeObjectURL(r)}function te(e){var s,r,l,h,g,C,L,R,o,v,$,F,j,G,et,nt;return{id:e.id||"",name:e.name||"",baseAttack:((r=(s=e.status)==null?void 0:s.base)==null?void 0:r.attack)??0,baseDefense:((h=(l=e.status)==null?void 0:l.base)==null?void 0:h.defense)??0,baseAccuracy:((C=(g=e.status)==null?void 0:g.base)==null?void 0:C.accuracy)??0,baseMobility:((R=(L=e.status)==null?void 0:L.base)==null?void 0:R.mobility)??0,basicSkillAttack:((v=(o=e.status)==null?void 0:o.basicSkill)==null?void 0:v.attack)??0,basicSkillDefense:((F=($=e.status)==null?void 0:$.basicSkill)==null?void 0:F.defense)??0,basicSkillAccuracy:((G=(j=e.status)==null?void 0:j.basicSkill)==null?void 0:G.accuracy)??0,basicSkillMobility:((nt=(et=e.status)==null?void 0:et.basicSkill)==null?void 0:nt.mobility)??0,skillSlots:e.skillSlots??0,equippedSkillIds:Array.isArray(e.equippedSkillIds)?e.equippedSkillIds.join(","):e.equippedSkillIds||""}}function ee(e){const s={base:{attack:Number(e.baseAttack||e.attack||0),defense:Number(e.baseDefense||e.defense||0),accuracy:Number(e.baseAccuracy||e.accuracy||0),mobility:Number(e.baseMobility||e.mobility||0)},basicSkill:{attack:Number(e.basicSkillAttack||0),defense:Number(e.basicSkillDefense||0),accuracy:Number(e.basicSkillAccuracy||0),mobility:Number(e.basicSkillMobility||0)}};return{id:e.id||"",name:e.name||"",status:s,skillSlots:Number(e.skillSlots||0),equippedSkillIds:typeof e.equippedSkillIds=="string"?e.equippedSkillIds.split(",").map(r=>r.trim()).filter(Boolean):[]}}function ae(e){const s=e.target.files[0];s&&At.parse(s,{header:!0,complete:r=>{I.skills=r.data.map(l=>new It({data:l})),ht=null,ct(),K()}})}function ie(e){var r,l,h,g,C,L,R,o,v,$,F,j,G,et;const s=nt=>{const at=String(nt||"C").trim().toUpperCase();return["S","A","B","C","D"].includes(at)?at:"C"};return{id:e.id||"",name:e.name||"",pilotId:e.pilotId||"",size:e.size||"",type:e.type||"",hp:Number(e.hp||0),attack:Number(e.attack||0),defense:Number(e.defense||0),accuracy:Number(e.accuracy||0),mobility:Number(e.mobility||0),movement:Number(e.movement||0),speed:Number(e.speed||0),specialAbility:{name:e.specialAbilityName||((r=e.specialAbility)==null?void 0:r.name)||"",effect:e.specialAbilityEffect||((l=e.specialAbility)==null?void 0:l.effect)||""},terrain:{air:s(e.terrainAir||((h=e.terrain)==null?void 0:h.air)),land:s(e.terrainLand||((g=e.terrain)==null?void 0:g.land)),sea:s(e.terrainSea||((C=e.terrain)==null?void 0:C.sea)),space:s(e.terrainSpace||((L=e.terrain)==null?void 0:L.space))},normalWeapon:{name:e.normalWeaponName||((R=e.normalWeapon)==null?void 0:R.name)||"",type:e.normalWeaponType||((o=e.normalWeapon)==null?void 0:o.type)||"",range:{min:Number(e.normalWeaponRangeMin||(($=(v=e.normalWeapon)==null?void 0:v.range)==null?void 0:$.min)||0),max:Number(e.normalWeaponRangeMax||((j=(F=e.normalWeapon)==null?void 0:F.range)==null?void 0:j.max)||0)},action:Ot(e.normalWeaponAction??((G=e.normalWeapon)==null?void 0:G.action)),uses:Ot(e.normalWeaponUses??((et=e.normalWeapon)==null?void 0:et.uses))}}}function se(e){const s=e.target.files[0];s&&At.parse(s,{header:!0,complete:r=>{I.units=r.data.map(l=>Rt(l)),ft=null,_t=null,Nt=!1,ct(),K()}})}function ne(e){var r,l,h,g,C,L,R,o,v,$,F,j,G,et;const s=e.data||e;return{id:s.id||"",name:s.name||"",pilotId:s.pilotId||"",size:s.size||"",type:s.type||"",hp:s.hp||0,attack:s.attack||0,defense:s.defense||0,accuracy:s.accuracy||0,mobility:s.mobility||0,movement:s.movement||0,speed:s.speed||0,specialAbilityName:((r=s.specialAbility)==null?void 0:r.name)||"",specialAbilityEffect:((l=s.specialAbility)==null?void 0:l.effect)||"",terrainAir:((h=s.terrain)==null?void 0:h.air)||"C",terrainLand:((g=s.terrain)==null?void 0:g.land)||"C",terrainSea:((C=s.terrain)==null?void 0:C.sea)||"C",terrainSpace:((L=s.terrain)==null?void 0:L.space)||"C",normalWeaponName:((R=s.normalWeapon)==null?void 0:R.name)||"",normalWeaponType:((o=s.normalWeapon)==null?void 0:o.type)||"",normalWeaponRangeMin:(($=(v=s.normalWeapon)==null?void 0:v.range)==null?void 0:$.min)||0,normalWeaponRangeMax:((j=(F=s.normalWeapon)==null?void 0:F.range)==null?void 0:j.max)||0,normalWeaponAction:((G=s.normalWeapon)==null?void 0:G.action)??"",normalWeaponUses:((et=s.normalWeapon)==null?void 0:et.uses)??""}}function re(){const e=At.unparse(I.units.map(h=>ne(h))),s=new Blob([e],{type:"text/csv"}),r=URL.createObjectURL(s),l=document.createElement("a");l.href=r,l.download="units.csv",l.click(),URL.revokeObjectURL(r)}function le(){const e=At.unparse(I.skills.map(h=>h.data||h)),s=new Blob([e],{type:"text/csv"}),r=URL.createObjectURL(s),l=document.createElement("a");l.href=r,l.download="skills.csv",l.click(),URL.revokeObjectURL(r)}function oe(e){e.preventDefault();const s=e.target,r=new FormData(s),l=r.get("name")||"",h={base:{attack:Number(r.get("baseAttack"))||0,defense:Number(r.get("baseDefense"))||0,accuracy:Number(r.get("baseAccuracy"))||0,mobility:Number(r.get("baseMobility"))||0},basicSkill:{attack:Number(r.get("basicSkillAttack"))||0,defense:Number(r.get("basicSkillDefense"))||0,accuracy:Number(r.get("basicSkillAccuracy"))||0,mobility:Number(r.get("basicSkillMobility"))||0}},g=I.pilots.reduce((L,R)=>{var v;const o=Number(R.id||((v=R.data)==null?void 0:v.id));return!isNaN(o)&&o>L?o:L},0),C={id:String(g+1),name:l,status:h,skillSlots:0,equippedSkillIds:[]};I.pilots.push(Wt(C)),s.reset(),ct(),K()}function ce(e){var R;e.preventDefault();const s=e.target,r=new FormData(s);let l=!1;const h=r.get("name")||"",g=r.get("pilotNames")||"",C=r.get("effect")||"",L={name:h,pilotNames:g,effect:C,attack:Number(r.get("attack"))||0,defense:Number(r.get("defense"))||0,accuracy:Number(r.get("accuracy"))||0,mobility:Number(r.get("mobility"))||0};if(ht){const o=I.skills.findIndex(v=>{var $;return String(v.id||(($=v.data)==null?void 0:$.id))===String(ht)});if(o!==-1){const v=I.skills[o],$=String(v.id||((R=v.data)==null?void 0:R.id)||ht);I.skills[o]=new It({data:{id:$,...L}}),l=!0}ht=null}else{const o=I.skills.reduce((v,$)=>{var j;const F=Number($.id||((j=$.data)==null?void 0:j.id));return!isNaN(F)&&F>v?F:v},0);I.skills.push(new It({data:{id:String(o+1),...L}}))}s.reset(),ct(),K(),l&&zt("スキルを更新しました")}function de(e){var C,L;e.preventDefault();const s=e.target,r=new FormData(s);let l=!1;const h=I.units.reduce((R,o)=>{var $;const v=Number(o.id||(($=o.data)==null?void 0:$.id));return!isNaN(v)&&v>R?v:R},0),g={name:r.get("name")||"",size:r.get("size")||"",type:r.get("type")||"",hp:Number(r.get("hp"))||0,attack:Number(r.get("attack"))||0,defense:Number(r.get("defense"))||0,accuracy:Number(r.get("accuracy"))||0,mobility:Number(r.get("mobility"))||0,movement:Number(r.get("movement"))||0,speed:Number(r.get("speed"))||0,specialAbility:{name:r.get("specialAbilityName")||"",effect:r.get("specialAbilityEffect")||""},terrain:{air:String(r.get("terrainAir")||"C").toUpperCase(),land:String(r.get("terrainLand")||"C").toUpperCase(),sea:String(r.get("terrainSea")||"C").toUpperCase(),space:String(r.get("terrainSpace")||"C").toUpperCase()},normalWeapon:{name:r.get("normalWeaponName")||"",type:r.get("normalWeaponType")||"",range:{min:Number(r.get("normalWeaponRangeMin"))||0,max:Number(r.get("normalWeaponRangeMax"))||0},action:Ot(r.get("normalWeaponAction")),uses:Ot(r.get("normalWeaponUses"))}};if(ft){const R=I.units.findIndex(o=>{var v;return String(o.id||((v=o.data)==null?void 0:v.id))===String(ft)});if(R!==-1){const o=I.units[R],v=String(o.id||((C=o.data)==null?void 0:C.id)||ft),$=o.pilotId||((L=o.data)==null?void 0:L.pilotId)||"";I.units[R]=Rt({id:v,pilotId:$,...g}),l=!0}ft=null}else I.units.push(Rt({id:String(h+1),pilotId:"",...g}));s.reset(),ct(),K(),l&&zt("機体を更新しました")}$t(B);K();
