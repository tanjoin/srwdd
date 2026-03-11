(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const h of document.querySelectorAll('link[rel="modulepreload"]'))c(h);new MutationObserver(h=>{for(const b of h)if(b.type==="childList")for(const $ of b.addedNodes)$.tagName==="LINK"&&$.rel==="modulepreload"&&c($)}).observe(document,{childList:!0,subtree:!0});function r(h){const b={};return h.integrity&&(b.integrity=h.integrity),h.referrerPolicy&&(b.referrerPolicy=h.referrerPolicy),h.crossOrigin==="use-credentials"?b.credentials="include":h.crossOrigin==="anonymous"?b.credentials="omit":b.credentials="same-origin",b}function c(h){if(h.ep)return;h.ep=!0;const b=r(h);fetch(h.href,b)}})();class Ft{constructor(s,r=[]){s?Object.assign(this,s):this.data={},this.skillList=r}get id(){return this.data.id}get name(){return this.data.name}get status(){return this.data.status||{}}get baseAttack(){var s;return((s=this.status.base)==null?void 0:s.attack)||0}get baseDefense(){var s;return((s=this.status.base)==null?void 0:s.defense)||0}get baseAccuracy(){var s;return((s=this.status.base)==null?void 0:s.accuracy)||0}get baseMobility(){var s;return((s=this.status.base)==null?void 0:s.mobility)||0}get basicSkillAttack(){var s;return((s=this.status.basicSkill)==null?void 0:s.attack)||0}get basicSkillDefense(){var s;return((s=this.status.basicSkill)==null?void 0:s.defense)||0}get basicSkillAccuracy(){var s;return((s=this.status.basicSkill)==null?void 0:s.accuracy)||0}get basicSkillMobility(){var s;return((s=this.status.basicSkill)==null?void 0:s.mobility)||0}get equippedSkillIds(){return Array.isArray(this.data.equippedSkillIds)?this.data.equippedSkillIds:typeof this.data.equippedSkillIds=="string"?this.data.equippedSkillIds.split(",").map(s=>s.trim()).filter(Boolean):[]}get specialSkillAttack(){return this._sumSpecialSkill("attack")}get specialSkillDefense(){return this._sumSpecialSkill("defense")}get specialSkillAccuracy(){return this._sumSpecialSkill("accuracy")}get specialSkillMobility(){return this._sumSpecialSkill("mobility")}_sumSpecialSkill(s){if(!this.skillList)return 0;const r=(this.name||"").trim();if(!r)return 0;const c=new Set(this.equippedSkillIds.map(String));return c.size===0?0:this.skillList.filter(b=>{const $=(b==null?void 0:b.id)!=null?String(b.id):"";return c.has($)?(Array.isArray(b.pilotNames)?b.pilotNames:[]).some(H=>H.includes(r)):!1}).reduce((b,$)=>b+(Number($[s])||0),0)}get spiritCommands(){return this.data.spiritCommands||[]}get skills(){return this.data.skills||[]}get totalAttack(){return this.baseAttack+this.basicSkillAttack+this.specialSkillAttack}get totalDefense(){return this.baseDefense+this.basicSkillDefense+this.specialSkillDefense}get totalAccuracy(){return this.baseAccuracy+this.basicSkillAccuracy+this.specialSkillAccuracy}get totalMobility(){return this.baseMobility+this.basicSkillMobility+this.specialSkillMobility}}class xt{constructor(s){s?Object.assign(this,s):this.data={}}get id(){return this.data.id}get name(){return this.data.name}get pilotNames(){return Array.isArray(this.data.pilotNames)?this.data.pilotNames:typeof this.data.pilotNames=="string"?this.data.pilotNames.split(",").map(s=>s.trim()).filter(Boolean):[]}get description(){return this.data.description}get level(){return this.data.level}get attack(){return this.data.attack}get defense(){return this.data.defense}get accuracy(){return this.data.accuracy}get mobility(){return this.data.mobility}get effect(){return this.data.effect||""}}class Y{static get TYPE_AIR(){return"空"}static get TYPE_LAND(){return"陸"}static get TYPE_SEA(){return"海"}static get TYPE_SPACE(){return"宇"}static get RANK_A(){return"A"}static get RANK_B(){return"B"}static get RANK_C(){return"C"}static get RANK_S(){return"S"}constructor(s){s?Object.assign(this,s):this.data={}}get type(){return this.data.type}get rank(){return this.data.rank}}class jt{static get TYPE_FINISHER(){return"必殺技"}static get TYPE_SUPPORT(){return"支援"}constructor(s){s?Object.assign(this,s):this.data={}}get id(){return this.data.id}get name(){return this.data.name}get type(){return this.data.type}get attack(){return this.data.attack||0}get defense(){return this.data.defense||0}get accuracy(){return this.data.accuracy||0}get mobility(){return this.data.mobility||0}get movement(){return this.data.movement||0}get speed(){return this.data.speed||0}get trait(){return this.data.trait||0}get power(){return this.data.power||0}get hitRate(){return this.data.hitRate||0}get range(){return this.data.range||{min:0,max:0}}get action(){return this.data.action||0}get uses(){return this.data.uses||0}get mainSlot(){return this.data.main||{name:"",description:"",effect:[]}}get finisherSlot(){return this.data.finisherSlot||{name:"",description:"",effect:[]}}get subSlot(){return this.data.subSlot||{name:"",description:"",effect:[]}}}class Tt{static get TYPE_ATTACK(){return"攻撃特化"}static get TYPE_ATTACK_DEFENSE(){return"攻撃&防御"}static get TYPE_ATTACK_ACCURACY(){return"攻撃&照準"}static get TYPE_ATTACK_EVASION(){return"攻撃&回避"}static get TYPE_DEFENSE(){return"防御特化"}static get TYPE_DEFENSE_ACCURACY(){return"防御&照準"}static get TYPE_DEFENSE_EVASION(){return"防御&回避"}static get TYPE_ACCURACY(){return"照準特化"}static get TYPE_ACCURACY_EVASION(){return"照準&回避"}static get TYPE_EVASION(){return"回避特化"}static get TYPE_BALANCED(){return"バランス"}static get SIZE_LL(){return"LL"}static get SIZE_L(){return"L"}static get SIZE_M(){return"M"}static get SIZE_S(){return"S"}static get SIZE_SS(){return"SS"}static get WEAPON_PHYSICAL(){return"実弾"}static get WEAPON_STRIKE(){return"打撃"}static get WEAPON_SLASH(){return"斬撃"}static get WEAPON_BEAM(){return"ビーム"}static get WEAPON_SPECIAL(){return"特殊"}constructor(s){s?Object.assign(this,s):this.data={}}get id(){return this.data.id}get name(){return this.data.name}get pilotId(){return this.data.pilotId||""}get size(){return this.data.size}get type(){return this.data.type}get terrain(){const s=this.data.terrain;return Array.isArray(s)?s:s&&typeof s=="object"?[new Y({data:{type:Y.TYPE_AIR,rank:s.air||Y.RANK_C}}),new Y({data:{type:Y.TYPE_LAND,rank:s.land||Y.RANK_C}}),new Y({data:{type:Y.TYPE_SEA,rank:s.sea||Y.RANK_C}}),new Y({data:{type:Y.TYPE_SPACE,rank:s.space||Y.RANK_C}})]:[new Y({data:{type:Y.TYPE_LAND,rank:Y.RANK_C}}),new Y({data:{type:Y.TYPE_SEA,rank:Y.RANK_C}}),new Y({data:{type:Y.TYPE_AIR,rank:Y.RANK_C}}),new Y({data:{type:Y.TYPE_SPACE,rank:Y.RANK_C}})]}get specialAbility(){return this.data.specialAbility||{name:"",effect:""}}get hp(){return this.data.hp||0}get attack(){return this.data.attack||0}get defense(){return this.data.defense||0}get accuracy(){return this.data.accuracy||0}get mobility(){return this.data.mobility||0}get movement(){return this.data.movement||0}get speed(){return this.data.speed||0}get normalWeapon(){const s=this.data.normalWeapon||{};return new jt({data:{name:s.name||"",type:s.type||"",range:s.range||{min:0,max:0},action:s.action??"",uses:s.uses??""}})}}function Yt(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Ot={exports:{}};/* @license
Papa Parse
v5.5.3
https://github.com/mholt/PapaParse
License: MIT
*/var Kt=Ot.exports,Ut;function Vt(){return Ut||(Ut=1,function(e,s){((r,c)=>{e.exports=c()})(Kt,function r(){var c=typeof self<"u"?self:typeof window<"u"?window:c!==void 0?c:{},h,b=!c.document&&!!c.postMessage,$=c.IS_PAPA_WORKER||!1,F={},H=0,p={};function N(a){this._handle=null,this._finished=!1,this._completed=!1,this._halted=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},(function(i){var n=lt(i);n.chunkSize=parseInt(n.chunkSize),i.step||i.chunk||(n.chunkSize=null),this._handle=new V(n),(this._handle.streamer=this)._config=n}).call(this,a),this.parseChunk=function(i,n){var d=parseInt(this._config.skipFirstNLines)||0;if(this.isFirstChunk&&0<d){let _=this._config.newline;_||(m=this._config.quoteChar||'"',_=this._handle.guessLineEndings(i,m)),i=[...i.split(_).slice(d)].join(_)}this.isFirstChunk&&w(this._config.beforeFirstChunk)&&(m=this._config.beforeFirstChunk(i))!==void 0&&(i=m),this.isFirstChunk=!1,this._halted=!1;var d=this._partialLine+i,m=(this._partialLine="",this._handle.parse(d,this._baseIndex,!this._finished));if(!this._handle.paused()&&!this._handle.aborted()){if(i=m.meta.cursor,d=(this._finished||(this._partialLine=d.substring(i-this._baseIndex),this._baseIndex=i),m&&m.data&&(this._rowCount+=m.data.length),this._finished||this._config.preview&&this._rowCount>=this._config.preview),$)c.postMessage({results:m,workerId:p.WORKER_ID,finished:d});else if(w(this._config.chunk)&&!n){if(this._config.chunk(m,this._handle),this._handle.paused()||this._handle.aborted())return void(this._halted=!0);this._completeResults=m=void 0}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(m.data),this._completeResults.errors=this._completeResults.errors.concat(m.errors),this._completeResults.meta=m.meta),this._completed||!d||!w(this._config.complete)||m&&m.meta.aborted||(this._config.complete(this._completeResults,this._input),this._completed=!0),d||m&&m.meta.paused||this._nextChunk(),m}this._halted=!0},this._sendError=function(i){w(this._config.error)?this._config.error(i):$&&this._config.error&&c.postMessage({workerId:p.WORKER_ID,error:i,finished:!1})}}function D(a){var i;(a=a||{}).chunkSize||(a.chunkSize=p.RemoteChunkSize),N.call(this,a),this._nextChunk=b?function(){this._readChunk(),this._chunkLoaded()}:function(){this._readChunk()},this.stream=function(n){this._input=n,this._nextChunk()},this._readChunk=function(){if(this._finished)this._chunkLoaded();else{if(i=new XMLHttpRequest,this._config.withCredentials&&(i.withCredentials=this._config.withCredentials),b||(i.onload=X(this._chunkLoaded,this),i.onerror=X(this._chunkError,this)),i.open(this._config.downloadRequestBody?"POST":"GET",this._input,!b),this._config.downloadRequestHeaders){var n,d=this._config.downloadRequestHeaders;for(n in d)i.setRequestHeader(n,d[n])}var m;this._config.chunkSize&&(m=this._start+this._config.chunkSize-1,i.setRequestHeader("Range","bytes="+this._start+"-"+m));try{i.send(this._config.downloadRequestBody)}catch(_){this._chunkError(_.message)}b&&i.status===0&&this._chunkError()}},this._chunkLoaded=function(){i.readyState===4&&(i.status<200||400<=i.status?this._chunkError():(this._start+=this._config.chunkSize||i.responseText.length,this._finished=!this._config.chunkSize||this._start>=(n=>(n=n.getResponseHeader("Content-Range"))!==null?parseInt(n.substring(n.lastIndexOf("/")+1)):-1)(i),this.parseChunk(i.responseText)))},this._chunkError=function(n){n=i.statusText||n,this._sendError(new Error(n))}}function L(a){(a=a||{}).chunkSize||(a.chunkSize=p.LocalChunkSize),N.call(this,a);var i,n,d=typeof FileReader<"u";this.stream=function(m){this._input=m,n=m.slice||m.webkitSlice||m.mozSlice,d?((i=new FileReader).onload=X(this._chunkLoaded,this),i.onerror=X(this._chunkError,this)):i=new FileReaderSync,this._nextChunk()},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk()},this._readChunk=function(){var m=this._input,_=(this._config.chunkSize&&(_=Math.min(this._start+this._config.chunkSize,this._input.size),m=n.call(m,this._start,_)),i.readAsText(m,this._config.encoding));d||this._chunkLoaded({target:{result:_}})},this._chunkLoaded=function(m){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(m.target.result)},this._chunkError=function(){this._sendError(i.error)}}function x(a){var i;N.call(this,a=a||{}),this.stream=function(n){return i=n,this._nextChunk()},this._nextChunk=function(){var n,d;if(!this._finished)return n=this._config.chunkSize,i=n?(d=i.substring(0,n),i.substring(n)):(d=i,""),this._finished=!i,this.parseChunk(d)}}function W(a){N.call(this,a=a||{});var i=[],n=!0,d=!1;this.pause=function(){N.prototype.pause.apply(this,arguments),this._input.pause()},this.resume=function(){N.prototype.resume.apply(this,arguments),this._input.resume()},this.stream=function(m){this._input=m,this._input.on("data",this._streamData),this._input.on("end",this._streamEnd),this._input.on("error",this._streamError)},this._checkIsFinished=function(){d&&i.length===1&&(this._finished=!0)},this._nextChunk=function(){this._checkIsFinished(),i.length?this.parseChunk(i.shift()):n=!0},this._streamData=X(function(m){try{i.push(typeof m=="string"?m:m.toString(this._config.encoding)),n&&(n=!1,this._checkIsFinished(),this.parseChunk(i.shift()))}catch(_){this._streamError(_)}},this),this._streamError=X(function(m){this._streamCleanUp(),this._sendError(m)},this),this._streamEnd=X(function(){this._streamCleanUp(),d=!0,this._streamData("")},this),this._streamCleanUp=X(function(){this._input.removeListener("data",this._streamData),this._input.removeListener("end",this._streamEnd),this._input.removeListener("error",this._streamError)},this)}function V(a){var i,n,d,m,_=Math.pow(2,53),z=-_,it=/^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/,Z=/^((\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)))$/,v=this,j=0,y=0,t=!1,l=!1,u=[],o={data:[],errors:[],meta:{}};function f(g){return a.skipEmptyLines==="greedy"?g.join("").trim()==="":g.length===1&&g[0].length===0}function k(){if(o&&d&&(q("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+p.DefaultDelimiter+"'"),d=!1),a.skipEmptyLines&&(o.data=o.data.filter(function(M){return!f(M)})),R()){let M=function(Q,U){w(a.transformHeader)&&(Q=a.transformHeader(Q,U)),u.push(Q)};var A=M;if(o)if(Array.isArray(o.data[0])){for(var g=0;R()&&g<o.data.length;g++)o.data[g].forEach(M);o.data.splice(0,1)}else o.data.forEach(M)}function S(M,Q){for(var U=a.header?{}:[],O=0;O<M.length;O++){var E=O,J=M[O],J=((C,B)=>(G=>(a.dynamicTypingFunction&&a.dynamicTyping[G]===void 0&&(a.dynamicTyping[G]=a.dynamicTypingFunction(G)),(a.dynamicTyping[G]||a.dynamicTyping)===!0))(C)?B==="true"||B==="TRUE"||B!=="false"&&B!=="FALSE"&&((G=>{if(it.test(G)&&(G=parseFloat(G),z<G&&G<_))return 1})(B)?parseFloat(B):Z.test(B)?new Date(B):B===""?null:B):B)(E=a.header?O>=u.length?"__parsed_extra":u[O]:E,J=a.transform?a.transform(J,E):J);E==="__parsed_extra"?(U[E]=U[E]||[],U[E].push(J)):U[E]=J}return a.header&&(O>u.length?q("FieldMismatch","TooManyFields","Too many fields: expected "+u.length+" fields but parsed "+O,y+Q):O<u.length&&q("FieldMismatch","TooFewFields","Too few fields: expected "+u.length+" fields but parsed "+O,y+Q)),U}var P;o&&(a.header||a.dynamicTyping||a.transform)&&(P=1,!o.data.length||Array.isArray(o.data[0])?(o.data=o.data.map(S),P=o.data.length):o.data=S(o.data,0),a.header&&o.meta&&(o.meta.fields=u),y+=P)}function R(){return a.header&&u.length===0}function q(g,S,P,A){g={type:g,code:S,message:P},A!==void 0&&(g.row=A),o.errors.push(g)}w(a.step)&&(m=a.step,a.step=function(g){o=g,R()?k():(k(),o.data.length!==0&&(j+=g.data.length,a.preview&&j>a.preview?n.abort():(o.data=o.data[0],m(o,v))))}),this.parse=function(g,S,P){var A=a.quoteChar||'"',A=(a.newline||(a.newline=this.guessLineEndings(g,A)),d=!1,a.delimiter?w(a.delimiter)&&(a.delimiter=a.delimiter(g),o.meta.delimiter=a.delimiter):((A=((M,Q,U,O,E)=>{var J,C,B,G;E=E||[",","	","|",";",p.RECORD_SEP,p.UNIT_SEP];for(var kt=0;kt<E.length;kt++){for(var pt,Et=E[kt],at=0,mt=0,tt=0,nt=(B=void 0,new rt({comments:O,delimiter:Et,newline:Q,preview:10}).parse(M)),gt=0;gt<nt.data.length;gt++)U&&f(nt.data[gt])?tt++:(pt=nt.data[gt].length,mt+=pt,B===void 0?B=pt:0<pt&&(at+=Math.abs(pt-B),B=pt));0<nt.data.length&&(mt/=nt.data.length-tt),(C===void 0||at<=C)&&(G===void 0||G<mt)&&1.99<mt&&(C=at,J=Et,G=mt)}return{successful:!!(a.delimiter=J),bestDelimiter:J}})(g,a.newline,a.skipEmptyLines,a.comments,a.delimitersToGuess)).successful?a.delimiter=A.bestDelimiter:(d=!0,a.delimiter=p.DefaultDelimiter),o.meta.delimiter=a.delimiter),lt(a));return a.preview&&a.header&&A.preview++,i=g,n=new rt(A),o=n.parse(i,S,P),k(),t?{meta:{paused:!0}}:o||{meta:{paused:!1}}},this.paused=function(){return t},this.pause=function(){t=!0,n.abort(),i=w(a.chunk)?"":i.substring(n.getCharIndex())},this.resume=function(){v.streamer._halted?(t=!1,v.streamer.parseChunk(i,!0)):setTimeout(v.resume,3)},this.aborted=function(){return l},this.abort=function(){l=!0,n.abort(),o.meta.aborted=!0,w(a.complete)&&a.complete(o),i=""},this.guessLineEndings=function(M,A){M=M.substring(0,1048576);var A=new RegExp(et(A)+"([^]*?)"+et(A),"gm"),P=(M=M.replace(A,"")).split("\r"),A=M.split(`
`),M=1<A.length&&A[0].length<P[0].length;if(P.length===1||M)return`
`;for(var Q=0,U=0;U<P.length;U++)P[U][0]===`
`&&Q++;return Q>=P.length/2?`\r
`:"\r"}}function et(a){return a.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function rt(a){var i=(a=a||{}).delimiter,n=a.newline,d=a.comments,m=a.step,_=a.preview,z=a.fastMode,it=null,Z=!1,v=a.quoteChar==null?'"':a.quoteChar,j=v;if(a.escapeChar!==void 0&&(j=a.escapeChar),(typeof i!="string"||-1<p.BAD_DELIMITERS.indexOf(i))&&(i=","),d===i)throw new Error("Comment character same as delimiter");d===!0?d="#":(typeof d!="string"||-1<p.BAD_DELIMITERS.indexOf(d))&&(d=!1),n!==`
`&&n!=="\r"&&n!==`\r
`&&(n=`
`);var y=0,t=!1;this.parse=function(l,u,o){if(typeof l!="string")throw new Error("Input must be a string");var f=l.length,k=i.length,R=n.length,q=d.length,g=w(m),S=[],P=[],A=[],M=y=0;if(!l)return at();if(z||z!==!1&&l.indexOf(v)===-1){for(var Q=l.split(n),U=0;U<Q.length;U++){if(A=Q[U],y+=A.length,U!==Q.length-1)y+=n.length;else if(o)return at();if(!d||A.substring(0,q)!==d){if(g){if(S=[],G(A.split(i)),mt(),t)return at()}else G(A.split(i));if(_&&_<=U)return S=S.slice(0,_),at(!0)}}return at()}for(var O=l.indexOf(i,y),E=l.indexOf(n,y),J=new RegExp(et(j)+et(v),"g"),C=l.indexOf(v,y);;)if(l[y]===v)for(C=y,y++;;){if((C=l.indexOf(v,C+1))===-1)return o||P.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:S.length,index:y}),pt();if(C===f-1)return pt(l.substring(y,C).replace(J,v));if(v===j&&l[C+1]===j)C++;else if(v===j||C===0||l[C-1]!==j){O!==-1&&O<C+1&&(O=l.indexOf(i,C+1));var B=kt((E=E!==-1&&E<C+1?l.indexOf(n,C+1):E)===-1?O:Math.min(O,E));if(l.substr(C+1+B,k)===i){A.push(l.substring(y,C).replace(J,v)),l[y=C+1+B+k]!==v&&(C=l.indexOf(v,y)),O=l.indexOf(i,y),E=l.indexOf(n,y);break}if(B=kt(E),l.substring(C+1+B,C+1+B+R)===n){if(A.push(l.substring(y,C).replace(J,v)),Et(C+1+B+R),O=l.indexOf(i,y),C=l.indexOf(v,y),g&&(mt(),t))return at();if(_&&S.length>=_)return at(!0);break}P.push({type:"Quotes",code:"InvalidQuotes",message:"Trailing quote on quoted field is malformed",row:S.length,index:y}),C++}}else if(d&&A.length===0&&l.substring(y,y+q)===d){if(E===-1)return at();y=E+R,E=l.indexOf(n,y),O=l.indexOf(i,y)}else if(O!==-1&&(O<E||E===-1))A.push(l.substring(y,O)),y=O+k,O=l.indexOf(i,y);else{if(E===-1)break;if(A.push(l.substring(y,E)),Et(E+R),g&&(mt(),t))return at();if(_&&S.length>=_)return at(!0)}return pt();function G(tt){S.push(tt),M=y}function kt(tt){var nt=0;return nt=tt!==-1&&(tt=l.substring(C+1,tt))&&tt.trim()===""?tt.length:nt}function pt(tt){return o||(tt===void 0&&(tt=l.substring(y)),A.push(tt),y=f,G(A),g&&mt()),at()}function Et(tt){y=tt,G(A),A=[],E=l.indexOf(n,y)}function at(tt){if(a.header&&!u&&S.length&&!Z){var nt=S[0],gt=Object.create(null),Pt=new Set(nt);let qt=!1;for(let St=0;St<nt.length;St++){let ht=nt[St];if(gt[ht=w(a.transformHeader)?a.transformHeader(ht,St):ht]){let Nt,Mt=gt[ht];for(;Nt=ht+"_"+Mt,Mt++,Pt.has(Nt););Pt.add(Nt),nt[St]=Nt,gt[ht]++,qt=!0,(it=it===null?{}:it)[Nt]=ht}else gt[ht]=1,nt[St]=ht;Pt.add(ht)}qt&&console.warn("Duplicate headers found and renamed."),Z=!0}return{data:S,errors:P,meta:{delimiter:i,linebreak:n,aborted:t,truncated:!!tt,cursor:M+(u||0),renamedHeaders:it}}}function mt(){m(at()),S=[],P=[]}},this.abort=function(){t=!0},this.getCharIndex=function(){return y}}function ut(a){var i=a.data,n=F[i.workerId],d=!1;if(i.error)n.userError(i.error,i.file);else if(i.results&&i.results.data){var m={abort:function(){d=!0,ct(i.workerId,{data:[],errors:[],meta:{aborted:!0}})},pause:dt,resume:dt};if(w(n.userStep)){for(var _=0;_<i.results.data.length&&(n.userStep({data:i.results.data[_],errors:i.results.errors,meta:i.results.meta},m),!d);_++);delete i.results}else w(n.userChunk)&&(n.userChunk(i.results,m,i.file),delete i.results)}i.finished&&!d&&ct(i.workerId,i.results)}function ct(a,i){var n=F[a];w(n.userComplete)&&n.userComplete(i),n.terminate(),delete F[a]}function dt(){throw new Error("Not implemented.")}function lt(a){if(typeof a!="object"||a===null)return a;var i,n=Array.isArray(a)?[]:{};for(i in a)n[i]=lt(a[i]);return n}function X(a,i){return function(){a.apply(i,arguments)}}function w(a){return typeof a=="function"}return p.parse=function(a,i){var n=(i=i||{}).dynamicTyping||!1;if(w(n)&&(i.dynamicTypingFunction=n,n={}),i.dynamicTyping=n,i.transform=!!w(i.transform)&&i.transform,!i.worker||!p.WORKERS_SUPPORTED)return n=null,p.NODE_STREAM_INPUT,typeof a=="string"?(a=(d=>d.charCodeAt(0)!==65279?d:d.slice(1))(a),n=new(i.download?D:x)(i)):a.readable===!0&&w(a.read)&&w(a.on)?n=new W(i):(c.File&&a instanceof File||a instanceof Object)&&(n=new L(i)),n.stream(a);(n=(()=>{var d;return!!p.WORKERS_SUPPORTED&&(d=(()=>{var m=c.URL||c.webkitURL||null,_=r.toString();return p.BLOB_URL||(p.BLOB_URL=m.createObjectURL(new Blob(["var global = (function() { if (typeof self !== 'undefined') { return self; } if (typeof window !== 'undefined') { return window; } if (typeof global !== 'undefined') { return global; } return {}; })(); global.IS_PAPA_WORKER=true; ","(",_,")();"],{type:"text/javascript"})))})(),(d=new c.Worker(d)).onmessage=ut,d.id=H++,F[d.id]=d)})()).userStep=i.step,n.userChunk=i.chunk,n.userComplete=i.complete,n.userError=i.error,i.step=w(i.step),i.chunk=w(i.chunk),i.complete=w(i.complete),i.error=w(i.error),delete i.worker,n.postMessage({input:a,config:i,workerId:n.id})},p.unparse=function(a,i){var n=!1,d=!0,m=",",_=`\r
`,z='"',it=z+z,Z=!1,v=null,j=!1,y=((()=>{if(typeof i=="object"){if(typeof i.delimiter!="string"||p.BAD_DELIMITERS.filter(function(u){return i.delimiter.indexOf(u)!==-1}).length||(m=i.delimiter),typeof i.quotes!="boolean"&&typeof i.quotes!="function"&&!Array.isArray(i.quotes)||(n=i.quotes),typeof i.skipEmptyLines!="boolean"&&typeof i.skipEmptyLines!="string"||(Z=i.skipEmptyLines),typeof i.newline=="string"&&(_=i.newline),typeof i.quoteChar=="string"&&(z=i.quoteChar),typeof i.header=="boolean"&&(d=i.header),Array.isArray(i.columns)){if(i.columns.length===0)throw new Error("Option columns is empty");v=i.columns}i.escapeChar!==void 0&&(it=i.escapeChar+z),i.escapeFormulae instanceof RegExp?j=i.escapeFormulae:typeof i.escapeFormulae=="boolean"&&i.escapeFormulae&&(j=/^[=+\-@\t\r].*$/)}})(),new RegExp(et(z),"g"));if(typeof a=="string"&&(a=JSON.parse(a)),Array.isArray(a)){if(!a.length||Array.isArray(a[0]))return t(null,a,Z);if(typeof a[0]=="object")return t(v||Object.keys(a[0]),a,Z)}else if(typeof a=="object")return typeof a.data=="string"&&(a.data=JSON.parse(a.data)),Array.isArray(a.data)&&(a.fields||(a.fields=a.meta&&a.meta.fields||v),a.fields||(a.fields=Array.isArray(a.data[0])?a.fields:typeof a.data[0]=="object"?Object.keys(a.data[0]):[]),Array.isArray(a.data[0])||typeof a.data[0]=="object"||(a.data=[a.data])),t(a.fields||[],a.data||[],Z);throw new Error("Unable to serialize unrecognized input");function t(u,o,f){var k="",R=(typeof u=="string"&&(u=JSON.parse(u)),typeof o=="string"&&(o=JSON.parse(o)),Array.isArray(u)&&0<u.length),q=!Array.isArray(o[0]);if(R&&d){for(var g=0;g<u.length;g++)0<g&&(k+=m),k+=l(u[g],g);0<o.length&&(k+=_)}for(var S=0;S<o.length;S++){var P=(R?u:o[S]).length,A=!1,M=R?Object.keys(o[S]).length===0:o[S].length===0;if(f&&!R&&(A=f==="greedy"?o[S].join("").trim()==="":o[S].length===1&&o[S][0].length===0),f==="greedy"&&R){for(var Q=[],U=0;U<P;U++){var O=q?u[U]:U;Q.push(o[S][O])}A=Q.join("").trim()===""}if(!A){for(var E=0;E<P;E++){0<E&&!M&&(k+=m);var J=R&&q?u[E]:E;k+=l(o[S][J],E)}S<o.length-1&&(!f||0<P&&!M)&&(k+=_)}}return k}function l(u,o){var f,k;return u==null?"":u.constructor===Date?JSON.stringify(u).slice(1,25):(k=!1,j&&typeof u=="string"&&j.test(u)&&(u="'"+u,k=!0),f=u.toString().replace(y,it),(k=k||n===!0||typeof n=="function"&&n(u,o)||Array.isArray(n)&&n[o]||((R,q)=>{for(var g=0;g<q.length;g++)if(-1<R.indexOf(q[g]))return!0;return!1})(f,p.BAD_DELIMITERS)||-1<f.indexOf(m)||f.charAt(0)===" "||f.charAt(f.length-1)===" ")?z+f+z:f)}},p.RECORD_SEP="",p.UNIT_SEP="",p.BYTE_ORDER_MARK="\uFEFF",p.BAD_DELIMITERS=["\r",`
`,'"',p.BYTE_ORDER_MARK],p.WORKERS_SUPPORTED=!b&&!!c.Worker,p.NODE_STREAM_INPUT=1,p.LocalChunkSize=10485760,p.RemoteChunkSize=5242880,p.DefaultDelimiter=",",p.Parser=rt,p.ParserHandle=V,p.NetworkStreamer=D,p.FileStreamer=L,p.StringStreamer=x,p.ReadableStreamStreamer=W,c.jQuery&&((h=c.jQuery).fn.parse=function(a){var i=a.config||{},n=[];return this.each(function(_){if(!(h(this).prop("tagName").toUpperCase()==="INPUT"&&h(this).attr("type").toLowerCase()==="file"&&c.FileReader)||!this.files||this.files.length===0)return!0;for(var z=0;z<this.files.length;z++)n.push({file:this.files[z],inputElem:this,instanceConfig:h.extend({},i)})}),d(),this;function d(){if(n.length===0)w(a.complete)&&a.complete();else{var _,z,it,Z,v=n[0];if(w(a.before)){var j=a.before(v.file,v.inputElem);if(typeof j=="object"){if(j.action==="abort")return _="AbortError",z=v.file,it=v.inputElem,Z=j.reason,void(w(a.error)&&a.error({name:_},z,it,Z));if(j.action==="skip")return void m();typeof j.config=="object"&&(v.instanceConfig=h.extend(v.instanceConfig,j.config))}else if(j==="skip")return void m()}var y=v.instanceConfig.complete;v.instanceConfig.complete=function(t){w(y)&&y(t,v.file,v.inputElem),m()},p.parse(v.file,v.instanceConfig)}}function m(){n.splice(0,1),d()}}),$&&(c.onmessage=function(a){a=a.data,p.WORKER_ID===void 0&&a&&(p.WORKER_ID=a.workerId),typeof a.input=="string"?c.postMessage({workerId:p.WORKER_ID,results:p.parse(a.input,a.config),finished:!0}):(c.File&&a.input instanceof File||a.input instanceof Object)&&(a=p.parse(a.input,a.config))&&c.postMessage({workerId:p.WORKER_ID,results:a,finished:!0})}),(D.prototype=Object.create(N.prototype)).constructor=D,(L.prototype=Object.create(N.prototype)).constructor=L,(x.prototype=Object.create(x.prototype)).constructor=x,(W.prototype=Object.create(N.prototype)).constructor=W,p})}(Ot)),Ot.exports}var Qt=Vt();const At=Yt(Qt),Zt=document.getElementById("app");function Jt(){try{const e=JSON.parse(localStorage.getItem("srwdd-state"));if(e)return{pilots:Array.isArray(e.pilots)?e.pilots:[],skills:Array.isArray(e.skills)?e.skills:[],units:Array.isArray(e.units)?e.units:[]}}catch{}return{pilots:[],skills:[],units:[]}}function ot(){localStorage.setItem("srwdd-state",JSON.stringify({pilots:I.pilots.map(e=>e.data||e),skills:I.skills.map(e=>e.data||e),units:I.units.map(e=>e.data||e)}))}function Ht(e){return["pilot","skill","unit","ranking"].includes(e)?e:"pilot"}function Gt(){const e=new URLSearchParams(window.location.search);return Ht(e.get("view"))}function It(e){const s=Ht(e),r=new URL(window.location.href);r.searchParams.set("view",s),window.history.replaceState(null,"",r)}let I=Jt(),T=Gt(),yt=null,_t=null,ft=null,bt=null,Ct="",vt=!1,$t=!1,wt={pilot:{key:"id",dir:"asc"},skill:{key:"id",dir:"asc"},unit:{key:"id",dir:"asc"},ranking:{key:"score",dir:"desc"}};function Wt(e){return new Ft({data:e},I.skills)}function Dt(e){return new Tt({data:se(e)})}function Lt(e){const s=String(e??"").trim();if(s==="")return"";if(s==="-")return"-";const r=Number(s);return Number.isNaN(r)?s:r}function K(){var y;const e=I.pilots.map(t=>t instanceof Ft?t:Wt(t)),s=I.skills.map(t=>t instanceof xt?t:new xt({data:t})),r=I.units.map(t=>t instanceof Tt?t:Dt(t));I.pilots=e,I.skills=s,I.units=r,I.pilots.forEach(t=>{t.skillList=I.skills}),!yt&&e.length>0&&(yt=String(e[0].id));const c=e.find(t=>String(t.id)===String(yt)),h=(c==null?void 0:c.equippedSkillIds)||[],b=new Set(h.map(String)),$=(c==null?void 0:c.name)||"",F=s.map(t=>{const l=Array.isArray(t.pilotNames)?t.pilotNames:[],u=$&&l.some(o=>o.includes($));return{skill:t,eligible:u}}),H=Number((y=c==null?void 0:c.data)==null?void 0:y.skillSlots)||0,p=h.length,N=wt.pilot,D=wt.skill,L=wt.unit,x=[...e].sort((t,l)=>Rt(t,l,N.key,N.dir)),W=[...s].sort((t,l)=>Rt(t,l,D.key,D.dir)),V=[...r].sort((t,l)=>Rt(t,l,L.key,L.dir)),et=W.filter(t=>Ct?(Array.isArray(t.pilotNames)?t.pilotNames:[]).some(u=>String(u).includes(Ct)):!0),rt=new Map(e.map(t=>[String(t.id),t])),ut=wt.ranking,ct=r.map(t=>{var S,P;const l=rt.get(String(t.pilotId));if(!l)return null;const u=(Number(t.attack)||0)+(Number(l.totalAttack)||0),o=(Number(t.defense)||0)+(Number(l.totalDefense)||0),f=(Number(t.accuracy)||0)+(Number(l.totalAccuracy)||0),k=(Number(t.mobility)||0)+(Number(l.totalMobility)||0),R=Number(((S=t.data)==null?void 0:S.baseHp)??t.baseHp??t.hp)||0,q=Number(((P=t.data)==null?void 0:P.partsIncreaseHp)??t.partsIncreaseHp??0)||0,g=Math.round(R/9+q*(2/3)+u+o+f*10+k*10);return{unitId:String(t.id||""),unitName:t.name||"",pilotName:l.name||"",hp:Number(t.hp)||0,baseHp:R,partsIncreaseHp:q,movement:Number(t.movement)||0,speed:Number(t.speed)||0,attack:u,defense:o,accuracy:f,mobility:k,total:u+o+f+k,combatPower:g}}).filter(Boolean),dt={hp:.15,attack:.22,defense:.22,accuracy:.18,mobility:.18,movement:.025,speed:.025},lt=Object.keys(dt),X=lt.reduce((t,l)=>{const u=Math.max(...ct.map(o=>Number(o[l])||0),0);return t[l]=u>0?u:1,t},{}),w=ct.map(t=>{const l=lt.reduce((u,o)=>{const f=(Number(t[o])||0)/X[o];return u+f*dt[o]},0);return{...t,score:Number((l*100).toFixed(2))}}).sort((t,l)=>Rt(t,l,ut.key,ut.dir)),a=r.find(t=>String(t.id)===String(_t)),i=(a==null?void 0:a.pilotId)||"",n=T==="unit"?r.find(t=>String(t.id)===String(bt)):null,d=(n==null?void 0:n.data)||{},m=d.terrain||{},_=d.specialAbility||{},z=d.normalWeapon||{},it=z.range||{},Z=T==="skill"?s.find(t=>String(t.id)===String(ft)):null,v=(Z==null?void 0:Z.data)||{},j=Array.isArray(v.pilotNames)?v.pilotNames.join(", "):v.pilotNames||"";if(Zt.innerHTML=`
    <div class="app-shell">
      <nav class="navbar navbar-expand sticky-top app-navbar">
        <div class="container">
          <span class="navbar-brand app-title">SRWDD</span>
          <ul class="nav nav-pills app-tabs">
            <li class="nav-item">
              <button id="view-pilot" class="nav-link ${T==="pilot"?"active":""}" type="button">パイロット</button>
            </li>
            <li class="nav-item">
              <button id="view-skill" class="nav-link ${T==="skill"?"active":""}" type="button">スキル</button>
            </li>
            <li class="nav-item">
              <button id="view-unit" class="nav-link ${T==="unit"?"active":""}" type="button">機体</button>
            </li>
            <li class="nav-item">
              <button id="view-ranking" class="nav-link ${T==="ranking"?"active":""}" type="button">ランキング</button>
            </li>
          </ul>
        </div>
      </nav>
      <div class="container py-4 app-content">
    ${T==="pilot"?`
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
          ${x.map((t,l)=>`
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
                <button class="pilot-delete btn btn-sm btn-danger" data-index="${l}" title="削除" aria-label="削除">
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
    `:T==="skill"?`
    <div class="card border-0 shadow-sm rounded-4 mb-4">
      <div class="card-header bg-transparent border-0 pt-3">
        <div class="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2">
          <h2 class="h6 mb-0">スキルデータ</h2>
          <div class="d-flex flex-wrap gap-2 align-items-center">
            <select id="skill-filter-pilot" class="form-select form-select-sm">
              <option value="">全パイロット</option>
              ${Array.from(new Set(e.map(t=>t.name).filter(Boolean))).map(t=>`<option value="${st(t)}" ${Ct===t?"selected":""}>${t}</option>`).join("")}
            </select>
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
          ${et.map(t=>{var l;return`
            <tr>
              <td>${t.id||""}</td>
              <td>${t.name||""}</td>
              <td>${((l=t.pilotNames)==null?void 0:l.join(", "))||""}</td>
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
        <h2 class="h6 mb-0">${Z?"スキル更新":"スキル追加"}</h2>
      </div>
      <div class="card-body">
      <form id="skill-form" class="row g-3">
        <div class="col-12 col-md-4">
          <label class="form-label small">名前</label>
          <input name="name" placeholder="名前" required class="form-control" value="${st(v.name||"")}" />
        </div>
        <div class="col-12 col-md-4">
          <label class="form-label small">対応パイロット</label>
          <input name="pilotNames" placeholder="対応パイロット（カンマ区切り可）" class="form-control" list="pilot-name-list" autocomplete="off" value="${st(j)}" />
          <datalist id="pilot-name-list">
            ${e.map(t=>`<option value="${t.name}">`).join("")}
          </datalist>
        </div>
        <div class="col-12 col-md-4">
          <label class="form-label small">その他効果</label>
          <input name="effect" placeholder="その他効果" class="form-control" value="${st(v.effect||"")}" />
        </div>
        <div class="col-6 col-md-3"><input name="attack" type="number" placeholder="攻撃" class="form-control" value="${v.attack??""}" /></div>
        <div class="col-6 col-md-3"><input name="defense" type="number" placeholder="防御" class="form-control" value="${v.defense??""}" /></div>
        <div class="col-6 col-md-3"><input name="accuracy" type="number" placeholder="照準" class="form-control" value="${v.accuracy??""}" /></div>
        <div class="col-6 col-md-3"><input name="mobility" type="number" placeholder="運動" class="form-control" value="${v.mobility??""}" /></div>
        <div class="col-12">
          <button type="submit" class="btn btn-primary">${Z?"更新":"追加"}</button>
          ${Z?'<button type="button" id="cancel-skill-edit" class="btn btn-outline-secondary ms-2">キャンセル</button>':""}
        </div>
      </form>
      </div>
    </div>
    `:T==="unit"?`
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
            <th rowspan="3" data-sort="speed" class="sortable">ｽﾋﾟｰﾄﾞ</th>
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
          ${V.map(t=>{var u,o,f,k,R,q,g,S,P,A,M,Q,U,O,E,J,C,B;const l=rt.get(String(t.pilotId));return`
            <tr>
              <td>${t.id||""}</td>
              <td>${t.name||""}</td>
              <td>${(l==null?void 0:l.name)||""}</td>
              <td>${t.size||""}</td>
              <td>${t.type||""}</td>
              <td>${t.hp||0}</td>
              <td>${t.attack||0}</td>
              <td>${t.defense||0}</td>
              <td>${t.accuracy||0}</td>
              <td>${t.mobility||0}</td>
              <td>${t.movement||0}</td>
              <td>${t.speed||0}</td>
              <td>${((u=t.specialAbility)==null?void 0:u.name)||""}</td>
              <td>${((o=t.specialAbility)==null?void 0:o.effect)||""}</td>
              <td>${((k=(f=t.data)==null?void 0:f.terrain)==null?void 0:k.air)||"C"}</td>
              <td>${((q=(R=t.data)==null?void 0:R.terrain)==null?void 0:q.land)||"C"}</td>
              <td>${((S=(g=t.data)==null?void 0:g.terrain)==null?void 0:S.sea)||"C"}</td>
              <td>${((A=(P=t.data)==null?void 0:P.terrain)==null?void 0:A.space)||"C"}</td>
              <td>${((M=t.normalWeapon)==null?void 0:M.name)||""}</td>
              <td>${((Q=t.normalWeapon)==null?void 0:Q.type)||""}</td>
              <td>${((O=(U=t.normalWeapon)==null?void 0:U.range)==null?void 0:O.min)||0}</td>
              <td>${((J=(E=t.normalWeapon)==null?void 0:E.range)==null?void 0:J.max)||0}</td>
              <td>${((C=t.normalWeapon)==null?void 0:C.action)||0}</td>
              <td>${((B=t.normalWeapon)==null?void 0:B.uses)||0}</td>
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
        <h2 class="h6 mb-0">${n?"機体更新":"機体追加"}</h2>
      </div>
      <div class="card-body">
      <form id="unit-form" class="row g-3">
        <div class="col-12 col-md-4">
          <label class="form-label small">名前</label>
          <input name="name" placeholder="名前" required class="form-control" value="${st(d.name||"")}" />
        </div>
        <div class="col-6 col-md-4">
          <label class="form-label small">サイズ</label>
          <input name="size" placeholder="サイズ" class="form-control" value="${st(d.size||"")}" />
        </div>
        <div class="col-6 col-md-4">
          <label class="form-label small">タイプ</label>
          <input name="type" placeholder="タイプ" class="form-control" value="${st(d.type||"")}" />
        </div>
        <div class="col-6 col-md-3"><input name="hp" type="number" placeholder="HP" class="form-control" value="${d.hp??""}" /></div>
        <div class="col-6 col-md-3"><input name="baseHp" type="number" placeholder="基礎HP" class="form-control" value="${d.baseHp??""}" /></div>
        <div class="col-6 col-md-3"><input name="partsIncreaseHp" type="number" placeholder="ﾊﾟｰﾂ増加HP" class="form-control" value="${d.partsIncreaseHp??""}" /></div>
        <div class="col-6 col-md-3"><input name="attack" type="number" placeholder="攻撃" class="form-control" value="${d.attack??""}" /></div>
        <div class="col-6 col-md-3"><input name="defense" type="number" placeholder="防御" class="form-control" value="${d.defense??""}" /></div>
        <div class="col-6 col-md-3"><input name="accuracy" type="number" placeholder="照準" class="form-control" value="${d.accuracy??""}" /></div>
        <div class="col-6 col-md-3"><input name="mobility" type="number" placeholder="運動" class="form-control" value="${d.mobility??""}" /></div>
        <div class="col-6 col-md-3"><input name="movement" type="number" placeholder="移動" class="form-control" value="${d.movement??""}" /></div>
        <div class="col-6 col-md-3"><input name="speed" type="number" placeholder="ｽﾋﾟｰﾄﾞ" class="form-control" value="${d.speed??""}" /></div>
        <div class="col-12 mt-1">
          <div class="border rounded p-3 bg-light">
            <div class="fw-semibold mb-2">特殊能力</div>
            <div class="row g-2">
              <div class="col-12 col-md-4"><input name="specialAbilityName" placeholder="特殊能力名" class="form-control" value="${st(_.name||"")}" /></div>
              <div class="col-12 col-md-8"><input name="specialAbilityEffect" placeholder="特殊能力効果" class="form-control" value="${st(_.effect||"")}" /></div>
            </div>
          </div>
        </div>
        <div class="col-12 mt-1">
          <div class="border rounded p-3 bg-light">
            <div class="fw-semibold mb-2">地形適性（S/A/B/C/D）</div>
            <div class="row g-2">
              <div class="col-6 col-md-3"><input name="terrainAir" placeholder="空" class="form-control" maxlength="1" value="${st(n&&m.air||"")}" /></div>
              <div class="col-6 col-md-3"><input name="terrainLand" placeholder="陸" class="form-control" maxlength="1" value="${st(n&&m.land||"")}" /></div>
              <div class="col-6 col-md-3"><input name="terrainSea" placeholder="海" class="form-control" maxlength="1" value="${st(n&&m.sea||"")}" /></div>
              <div class="col-6 col-md-3"><input name="terrainSpace" placeholder="宇" class="form-control" maxlength="1" value="${st(n&&m.space||"")}" /></div>
            </div>
          </div>
        </div>
        <div class="col-12 mt-1">
          <div class="border rounded p-3 bg-light">
            <div class="fw-semibold mb-2">通常攻撃</div>
            <div class="row g-2">
              <div class="col-12 col-md-3"><input name="normalWeaponName" placeholder="名前" class="form-control" value="${st(z.name||"")}" /></div>
              <div class="col-12 col-md-3"><input name="normalWeaponType" placeholder="タイプ" class="form-control" value="${st(z.type||"")}" /></div>
              <div class="col-6 col-md-2"><input name="normalWeaponRangeMin" type="number" placeholder="射程（min）" class="form-control" value="${it.min??""}" /></div>
              <div class="col-6 col-md-2"><input name="normalWeaponRangeMax" type="number" placeholder="射程（max）" class="form-control" value="${it.max??""}" /></div>
              <div class="col-6 col-md-1"><input name="normalWeaponAction" type="text" inputmode="numeric" placeholder="アク" class="form-control" value="${z.action??""}" /></div>
              <div class="col-6 col-md-1"><input name="normalWeaponUses" type="text" inputmode="numeric" placeholder="回数" class="form-control" value="${z.uses??""}" /></div>
            </div>
          </div>
        </div>
        <div class="col-12">
          <button type="submit" class="btn btn-primary">${n?"更新":"追加"}</button>
          ${n?'<button type="button" id="cancel-unit-edit" class="btn btn-outline-secondary ms-2">キャンセル</button>':""}
        </div>
      </form>
      </div>
    </div>
    `:T==="ranking"?`
    <div class="card border-0 shadow-sm rounded-4 mb-4">
      <div class="card-header bg-transparent border-0 pt-3">
        <h2 class="h6 mb-0">重み付きランキング（機体+パイロット）</h2>
      </div>
      <div class="card-body">
      ${w.length===0?`
        <div class="text-muted small">パイロットが設定された機体がありません。</div>
      `:`
      <div class="small text-muted mb-2">スコア重み: HP 15%、攻22%、防22%、照18%、運18%、移2.5%、速2.5%</div>
      <div class="small text-muted mb-2">戦力値: 基礎HP/9 + パーツ増加HP×2/3 + 攻撃力 + 防御力 + 照準値×10 + 運動性×10</div>
      <div class="table-responsive">
      <table class="table table-sm table-striped table-hover align-middle mb-0">
        <thead class="table-light">
          <tr>
            <th>#</th>
            <th data-sort="unitName" class="sortable">機体</th>
            <th data-sort="pilotName" class="sortable">パイロット</th>
            <th data-sort="hp" class="sortable">HP</th>
            <th data-sort="attack" class="sortable">攻撃力</th>
            <th data-sort="defense" class="sortable">防御力</th>
            <th data-sort="accuracy" class="sortable">照準値</th>
            <th data-sort="mobility" class="sortable">運動性</th>
            <th data-sort="movement" class="sortable">移動力</th>
            <th data-sort="speed" class="sortable">スピード</th>
            <th data-sort="combatPower" class="sortable">戦力値</th>
            <th data-sort="score" class="sortable">スコア</th>
          </tr>
        </thead>
        <tbody>
          ${w.map((t,l)=>`
            <tr>
              <td>${l+1}</td>
              <td>${t.unitName}</td>
              <td>${t.pilotName}</td>
              <td>${t.hp}</td>
              <td>${t.attack}</td>
              <td>${t.defense}</td>
              <td>${t.accuracy}</td>
              <td>${t.mobility}</td>
              <td>${t.movement}</td>
              <td>${t.speed}</td>
              <td>${t.combatPower}</td>
              <td class="fw-semibold">${t.score}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
      </div>
      `}
      </div>
    </div>
    `:""}
    ${T==="pilot"?`
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
                  ${e.map(t=>`<option value="${t.id}" ${String(t.id)===String(yt)?"selected":""}>${t.name||t.id}</option>`).join("")}
                </select>
              </div>
              <div class="col-6 col-md-3">
                <label class="form-label small">装備枠</label>
                <input id="equip-slots" type="number" min="0" value="${H}" class="form-control" />
              </div>
              <div class="col-6 col-md-4 text-md-end">
                <span id="equip-count" class="badge text-bg-dark">${p}/${H}</span>
              </div>
            </div>
            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-2" id="equip-list">
              ${F.filter(({eligible:t})=>t).map(({skill:t},l)=>{const u=(t==null?void 0:t.id)??"",o=b.has(String(u))?"checked":"",f=(t==null?void 0:t.name)||"(名称未設定)",k=`equip-skill-${u||l}`;return`<div class="col equip-tile">
                  <input class="btn-check equip-skill" type="checkbox" id="${k}" value="${u}" ${o} />
                  <label class="btn btn-outline-dark w-100 text-start" for="${k}">${f}</label>
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
    ${T==="unit"?`
    <div class="modal fade" id="unit-pilot-modal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title fs-6">パイロット選択</h3>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="閉じる"></button>
          </div>
          <div class="modal-body">
            <label class="form-label small">${(a==null?void 0:a.name)||""}</label>
            <select id="unit-pilot" class="form-select">
              <option value="">未設定</option>
              ${e.map(t=>`<option value="${t.id}" ${String(t.id)===String(i)?"selected":""}>${t.name||t.id}</option>`).join("")}
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
  `,document.getElementById("view-pilot").onclick=()=>{T="pilot",It(T),vt=!1,K()},document.getElementById("view-skill").onclick=()=>{T="skill",It(T),vt=!1,K()},document.getElementById("view-unit").onclick=()=>{T="unit",It(T),vt=!1,K()},document.getElementById("view-ranking").onclick=()=>{T="ranking",It(T),vt=!1,K()},T==="pilot"){document.getElementById("pilot-csv").onchange=Xt,document.getElementById("export-pilot").onclick=te,document.getElementById("pilot-form").onsubmit=ce,document.querySelectorAll(".pilot-equip").forEach(f=>{f.onclick=()=>{yt=f.getAttribute("data-id"),vt=!0,K()}});const t=document.getElementById("equip-pilot"),l=document.getElementById("equip-slots"),u=document.getElementById("equip-modal"),o=document.getElementById("equip-count");if(u&&window.bootstrap){const f=window.bootstrap.Modal.getOrCreateInstance(u);vt&&f.show(),u.addEventListener("hidden.bs.modal",()=>{vt=!1})}t&&(t.onchange=()=>{yt=t.value,K()}),l&&(l.onchange=()=>{const f=I.pilots.find(g=>String(g.id)===String(yt));if(!f)return;f.data=f.data||{};const k=Number(l.value)||0;f.data.skillSlots=k;const R=Array.from(document.querySelectorAll(".equip-skill:checked"));R.length>k&&R.slice(k).forEach(S=>{S.checked=!1});const q=new Set(Array.from(document.querySelectorAll(".equip-skill:checked")).map(g=>String(g.value)));f.data.equippedSkillIds=Array.from(q),ot(),o&&(o.textContent=`${q.size}/${k}`)}),document.querySelectorAll(".equip-skill").forEach(f=>{f.onchange=()=>{var S;const k=I.pilots.find(P=>String(P.id)===String(yt));if(!k)return;const R=Number((S=k.data)==null?void 0:S.skillSlots)||0,q=new Set(k.equippedSkillIds.map(String)),g=f.value;if(f.checked){if(q.size>=R){f.checked=!1;return}q.add(String(g))}else q.delete(String(g));k.data=k.data||{},k.data.equippedSkillIds=Array.from(q),ot(),o&&(o.textContent=`${q.size}/${R}`)}})}else if(T==="skill"){const t=document.getElementById("skill-filter-pilot");t&&(t.onchange=()=>{Ct=t.value||"",K()}),document.getElementById("skill-csv").onchange=ie,document.getElementById("export-skill").onclick=oe,document.getElementById("skill-form").onsubmit=de,document.querySelectorAll(".skill-edit").forEach(u=>{u.onclick=()=>{ft=u.getAttribute("data-id"),K()}});const l=document.getElementById("cancel-skill-edit");l&&(l.onclick=()=>{ft=null,K()})}else if(T==="unit"){document.getElementById("unit-csv").onchange=ne,document.getElementById("export-unit").onclick=le,document.getElementById("unit-form").onsubmit=ue,document.querySelectorAll(".unit-edit").forEach(o=>{o.onclick=()=>{bt=o.getAttribute("data-id"),K()}});const t=document.getElementById("cancel-unit-edit");t&&(t.onclick=()=>{bt=null,K()}),document.querySelectorAll(".unit-select-pilot").forEach(o=>{o.onclick=()=>{_t=o.getAttribute("data-id"),$t=!0,K()}});const l=document.getElementById("unit-pilot-modal"),u=document.getElementById("unit-pilot");if(l&&window.bootstrap){const o=window.bootstrap.Modal.getOrCreateInstance(l);$t&&o.show(),l.addEventListener("hidden.bs.modal",()=>{$t=!1,T==="unit"&&K()})}u&&(u.onchange=()=>{var k;const o=I.units.find(R=>String(R.id)===String(_t));if(!o)return;o.data=o.data||{},o.data.pilotId=u.value||"",ot();const f=(k=window.bootstrap)==null?void 0:k.Modal.getOrCreateInstance(l);$t=!1,f==null||f.hide()})}document.querySelectorAll("th.sortable").forEach(t=>{t.style.cursor="pointer",t.onclick=()=>{const l=t.getAttribute("data-sort");if(!l)return;const o=wt[T==="pilot"?"pilot":T==="skill"?"skill":T==="unit"?"unit":"ranking"];o.key===l?o.dir=o.dir==="asc"?"desc":"asc":(o.key=l,o.dir="asc"),K()}}),T==="pilot"?document.querySelectorAll(".pilot-delete").forEach(t=>{t.onclick=()=>{const l=Number(t.getAttribute("data-index"));isNaN(l)||(I.pilots.splice(l,1),ot(),K())}}):T==="skill"?document.querySelectorAll(".skill-delete").forEach(t=>{t.onclick=()=>{const l=t.getAttribute("data-id"),u=I.skills.findIndex(o=>{var f;return String(o.id||((f=o.data)==null?void 0:f.id))===String(l)});u!==-1&&(String(ft)===String(l)&&(ft=null),I.skills.splice(u,1),ot(),K())}}):document.querySelectorAll(".unit-delete").forEach(t=>{t.onclick=()=>{const l=t.getAttribute("data-id"),u=I.units.findIndex(o=>{var f;return String(o.id||((f=o.data)==null?void 0:f.id))===String(l)});u!==-1&&(String(bt)===String(l)&&(bt=null),String(_t)===String(l)&&(_t=null),I.units.splice(u,1),ot(),K())}})}function Rt(e,s,r,c){const h=Bt(e,r),b=Bt(s,r);return h<b?c==="asc"?-1:1:h>b?c==="asc"?1:-1:0}function Bt(e,s){var h,b,$,F,H,p,N,D,L,x,W,V,et,rt,ut,ct,dt,lt;if(e instanceof Tt){if(s==="specialAbilityName")return String(((h=e.specialAbility)==null?void 0:h.name)||"").toLowerCase();if(s==="specialAbilityEffect")return String(((b=e.specialAbility)==null?void 0:b.effect)||"").toLowerCase();if(s==="terrainAir")return String(((F=($=e.data)==null?void 0:$.terrain)==null?void 0:F.air)||"");if(s==="terrainLand")return String(((p=(H=e.data)==null?void 0:H.terrain)==null?void 0:p.land)||"");if(s==="terrainSea")return String(((D=(N=e.data)==null?void 0:N.terrain)==null?void 0:D.sea)||"");if(s==="terrainSpace")return String(((x=(L=e.data)==null?void 0:L.terrain)==null?void 0:x.space)||"");if(s==="normalWeaponName")return String(((W=e.normalWeapon)==null?void 0:W.name)||"").toLowerCase();if(s==="normalWeaponType")return String(((V=e.normalWeapon)==null?void 0:V.type)||"").toLowerCase();if(s==="normalWeaponRangeMin")return Number(((rt=(et=e.normalWeapon)==null?void 0:et.range)==null?void 0:rt.min)||0);if(s==="normalWeaponRangeMax")return Number(((ct=(ut=e.normalWeapon)==null?void 0:ut.range)==null?void 0:ct.max)||0);if(s==="normalWeaponAction"){const X=(dt=e.normalWeapon)==null?void 0:dt.action,w=Number(X);return Number.isNaN(w)?String(X??"").toLowerCase():w}if(s==="normalWeaponUses"){const X=(lt=e.normalWeapon)==null?void 0:lt.uses,w=Number(X);return Number.isNaN(w)?String(X??"").toLowerCase():w}}const r=e==null?void 0:e[s];if(Array.isArray(r))return r.join(",");if(r==null)return"";const c=Number(r);return!isNaN(c)&&String(r).trim()!==""?c:String(r).toLowerCase()}function st(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function zt(e){var c;const s=document.getElementById("app-toast"),r=document.getElementById("app-toast-message");!s||!r||(r.textContent=e,(c=window.bootstrap)!=null&&c.Toast&&window.bootstrap.Toast.getOrCreateInstance(s,{delay:1800}).show())}function Xt(e){const s=e.target.files[0];s&&At.parse(s,{header:!0,complete:r=>{I.pilots=r.data.map(c=>Wt(ae(c))),ot(),K()}})}function te(){const e=At.unparse(I.pilots.map(h=>ee(h.data||h))),s=new Blob([e],{type:"text/csv"}),r=URL.createObjectURL(s),c=document.createElement("a");c.href=r,c.download="pilots.csv",c.click(),URL.revokeObjectURL(r)}function ee(e){var s,r,c,h,b,$,F,H,p,N,D,L,x,W,V,et;return{id:e.id||"",name:e.name||"",baseAttack:((r=(s=e.status)==null?void 0:s.base)==null?void 0:r.attack)??0,baseDefense:((h=(c=e.status)==null?void 0:c.base)==null?void 0:h.defense)??0,baseAccuracy:(($=(b=e.status)==null?void 0:b.base)==null?void 0:$.accuracy)??0,baseMobility:((H=(F=e.status)==null?void 0:F.base)==null?void 0:H.mobility)??0,basicSkillAttack:((N=(p=e.status)==null?void 0:p.basicSkill)==null?void 0:N.attack)??0,basicSkillDefense:((L=(D=e.status)==null?void 0:D.basicSkill)==null?void 0:L.defense)??0,basicSkillAccuracy:((W=(x=e.status)==null?void 0:x.basicSkill)==null?void 0:W.accuracy)??0,basicSkillMobility:((et=(V=e.status)==null?void 0:V.basicSkill)==null?void 0:et.mobility)??0,skillSlots:e.skillSlots??0,equippedSkillIds:Array.isArray(e.equippedSkillIds)?e.equippedSkillIds.join(","):e.equippedSkillIds||""}}function ae(e){const s={base:{attack:Number(e.baseAttack||e.attack||0),defense:Number(e.baseDefense||e.defense||0),accuracy:Number(e.baseAccuracy||e.accuracy||0),mobility:Number(e.baseMobility||e.mobility||0)},basicSkill:{attack:Number(e.basicSkillAttack||0),defense:Number(e.basicSkillDefense||0),accuracy:Number(e.basicSkillAccuracy||0),mobility:Number(e.basicSkillMobility||0)}};return{id:e.id||"",name:e.name||"",status:s,skillSlots:Number(e.skillSlots||0),equippedSkillIds:typeof e.equippedSkillIds=="string"?e.equippedSkillIds.split(",").map(r=>r.trim()).filter(Boolean):[]}}function ie(e){const s=e.target.files[0];s&&At.parse(s,{header:!0,complete:r=>{I.skills=r.data.map(c=>new xt({data:c})),ft=null,ot(),K()}})}function se(e){var H,p,N,D,L,x,W,V,et,rt,ut,ct,dt,lt;const s=X=>{const w=String(X||"C").trim().toUpperCase();return["S","A","B","C","D"].includes(w)?w:"C"},r=Number(e.baseHp??e.baseHP??e.hpBase??0),c=Number(e.partsIncreaseHp??e.partsHpIncrease??e.increaseHp??0),h=Number(e.hp||0),b=r||(h>0?h:0),$=c||Math.max(h-b,0),F=h||b+$;return{id:e.id||"",name:e.name||"",pilotId:e.pilotId||"",size:e.size||"",type:e.type||"",hp:F,baseHp:b,partsIncreaseHp:$,attack:Number(e.attack||0),defense:Number(e.defense||0),accuracy:Number(e.accuracy||0),mobility:Number(e.mobility||0),movement:Number(e.movement||0),speed:Number(e.speed||0),specialAbility:{name:e.specialAbilityName||((H=e.specialAbility)==null?void 0:H.name)||"",effect:e.specialAbilityEffect||((p=e.specialAbility)==null?void 0:p.effect)||""},terrain:{air:s(e.terrainAir||((N=e.terrain)==null?void 0:N.air)),land:s(e.terrainLand||((D=e.terrain)==null?void 0:D.land)),sea:s(e.terrainSea||((L=e.terrain)==null?void 0:L.sea)),space:s(e.terrainSpace||((x=e.terrain)==null?void 0:x.space))},normalWeapon:{name:e.normalWeaponName||((W=e.normalWeapon)==null?void 0:W.name)||"",type:e.normalWeaponType||((V=e.normalWeapon)==null?void 0:V.type)||"",range:{min:Number(e.normalWeaponRangeMin||((rt=(et=e.normalWeapon)==null?void 0:et.range)==null?void 0:rt.min)||0),max:Number(e.normalWeaponRangeMax||((ct=(ut=e.normalWeapon)==null?void 0:ut.range)==null?void 0:ct.max)||0)},action:Lt(e.normalWeaponAction??((dt=e.normalWeapon)==null?void 0:dt.action)),uses:Lt(e.normalWeaponUses??((lt=e.normalWeapon)==null?void 0:lt.uses))}}}function ne(e){const s=e.target.files[0];s&&At.parse(s,{header:!0,complete:r=>{I.units=r.data.map(c=>Dt(c)),bt=null,_t=null,$t=!1,ot(),K()}})}function re(e){var r,c,h,b,$,F,H,p,N,D,L,x,W,V;const s=e.data||e;return{id:s.id||"",name:s.name||"",pilotId:s.pilotId||"",size:s.size||"",type:s.type||"",hp:s.hp||0,baseHp:s.baseHp||0,partsIncreaseHp:s.partsIncreaseHp||0,attack:s.attack||0,defense:s.defense||0,accuracy:s.accuracy||0,mobility:s.mobility||0,movement:s.movement||0,speed:s.speed||0,specialAbilityName:((r=s.specialAbility)==null?void 0:r.name)||"",specialAbilityEffect:((c=s.specialAbility)==null?void 0:c.effect)||"",terrainAir:((h=s.terrain)==null?void 0:h.air)||"C",terrainLand:((b=s.terrain)==null?void 0:b.land)||"C",terrainSea:(($=s.terrain)==null?void 0:$.sea)||"C",terrainSpace:((F=s.terrain)==null?void 0:F.space)||"C",normalWeaponName:((H=s.normalWeapon)==null?void 0:H.name)||"",normalWeaponType:((p=s.normalWeapon)==null?void 0:p.type)||"",normalWeaponRangeMin:((D=(N=s.normalWeapon)==null?void 0:N.range)==null?void 0:D.min)||0,normalWeaponRangeMax:((x=(L=s.normalWeapon)==null?void 0:L.range)==null?void 0:x.max)||0,normalWeaponAction:((W=s.normalWeapon)==null?void 0:W.action)??"",normalWeaponUses:((V=s.normalWeapon)==null?void 0:V.uses)??""}}function le(){const e=At.unparse(I.units.map(h=>re(h))),s=new Blob([e],{type:"text/csv"}),r=URL.createObjectURL(s),c=document.createElement("a");c.href=r,c.download="units.csv",c.click(),URL.revokeObjectURL(r)}function oe(){const e=At.unparse(I.skills.map(h=>h.data||h)),s=new Blob([e],{type:"text/csv"}),r=URL.createObjectURL(s),c=document.createElement("a");c.href=r,c.download="skills.csv",c.click(),URL.revokeObjectURL(r)}function ce(e){e.preventDefault();const s=e.target,r=new FormData(s),c=r.get("name")||"",h={base:{attack:Number(r.get("baseAttack"))||0,defense:Number(r.get("baseDefense"))||0,accuracy:Number(r.get("baseAccuracy"))||0,mobility:Number(r.get("baseMobility"))||0},basicSkill:{attack:Number(r.get("basicSkillAttack"))||0,defense:Number(r.get("basicSkillDefense"))||0,accuracy:Number(r.get("basicSkillAccuracy"))||0,mobility:Number(r.get("basicSkillMobility"))||0}},b=I.pilots.reduce((F,H)=>{var N;const p=Number(H.id||((N=H.data)==null?void 0:N.id));return!isNaN(p)&&p>F?p:F},0),$={id:String(b+1),name:c,status:h,skillSlots:0,equippedSkillIds:[]};I.pilots.push(Wt($)),s.reset(),ot(),K()}function de(e){var H;e.preventDefault();const s=e.target,r=new FormData(s);let c=!1;const h=r.get("name")||"",b=r.get("pilotNames")||"",$=r.get("effect")||"",F={name:h,pilotNames:b,effect:$,attack:Number(r.get("attack"))||0,defense:Number(r.get("defense"))||0,accuracy:Number(r.get("accuracy"))||0,mobility:Number(r.get("mobility"))||0};if(ft){const p=I.skills.findIndex(N=>{var D;return String(N.id||((D=N.data)==null?void 0:D.id))===String(ft)});if(p!==-1){const N=I.skills[p],D=String(N.id||((H=N.data)==null?void 0:H.id)||ft);I.skills[p]=new xt({data:{id:D,...F}}),c=!0}ft=null}else{const p=I.skills.reduce((N,D)=>{var x;const L=Number(D.id||((x=D.data)==null?void 0:x.id));return!isNaN(L)&&L>N?L:N},0);I.skills.push(new xt({data:{id:String(p+1),...F}}))}s.reset(),ot(),K(),c&&zt("スキルを更新しました")}function ue(e){var N,D;e.preventDefault();const s=e.target,r=new FormData(s);let c=!1;const h=String(r.get("hp")??"").trim(),b=Number(r.get("baseHp"))||0,$=Number(r.get("partsIncreaseHp"))||0,F=h===""?b+$:Number(h)||0,H=I.units.reduce((L,x)=>{var V;const W=Number(x.id||((V=x.data)==null?void 0:V.id));return!isNaN(W)&&W>L?W:L},0),p={name:r.get("name")||"",size:r.get("size")||"",type:r.get("type")||"",hp:F,baseHp:b,partsIncreaseHp:$,attack:Number(r.get("attack"))||0,defense:Number(r.get("defense"))||0,accuracy:Number(r.get("accuracy"))||0,mobility:Number(r.get("mobility"))||0,movement:Number(r.get("movement"))||0,speed:Number(r.get("speed"))||0,specialAbility:{name:r.get("specialAbilityName")||"",effect:r.get("specialAbilityEffect")||""},terrain:{air:String(r.get("terrainAir")||"C").toUpperCase(),land:String(r.get("terrainLand")||"C").toUpperCase(),sea:String(r.get("terrainSea")||"C").toUpperCase(),space:String(r.get("terrainSpace")||"C").toUpperCase()},normalWeapon:{name:r.get("normalWeaponName")||"",type:r.get("normalWeaponType")||"",range:{min:Number(r.get("normalWeaponRangeMin"))||0,max:Number(r.get("normalWeaponRangeMax"))||0},action:Lt(r.get("normalWeaponAction")),uses:Lt(r.get("normalWeaponUses"))}};if(bt){const L=I.units.findIndex(x=>{var W;return String(x.id||((W=x.data)==null?void 0:W.id))===String(bt)});if(L!==-1){const x=I.units[L],W=String(x.id||((N=x.data)==null?void 0:N.id)||bt),V=x.pilotId||((D=x.data)==null?void 0:D.pilotId)||"";I.units[L]=Dt({id:W,pilotId:V,...p}),c=!0}bt=null}else I.units.push(Dt({id:String(H+1),pilotId:"",...p}));s.reset(),ot(),K(),c&&zt("機体を更新しました")}It(T);K();
