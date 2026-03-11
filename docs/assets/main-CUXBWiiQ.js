(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const f of document.querySelectorAll('link[rel="modulepreload"]'))c(f);new MutationObserver(f=>{for(const m of f)if(m.type==="childList")for(const M of m.addedNodes)M.tagName==="LINK"&&M.rel==="modulepreload"&&c(M)}).observe(document,{childList:!0,subtree:!0});function n(f){const m={};return f.integrity&&(m.integrity=f.integrity),f.referrerPolicy&&(m.referrerPolicy=f.referrerPolicy),f.crossOrigin==="use-credentials"?m.credentials="include":f.crossOrigin==="anonymous"?m.credentials="omit":m.credentials="same-origin",m}function c(f){if(f.ep)return;f.ep=!0;const m=n(f);fetch(f.href,m)}})();class Dt{constructor(r,n=[]){r?Object.assign(this,r):this.data={},this.skillList=n}get id(){return this.data.id}get name(){return this.data.name}get status(){return this.data.status||{}}get baseAttack(){var r;return((r=this.status.base)==null?void 0:r.attack)||0}get baseDefense(){var r;return((r=this.status.base)==null?void 0:r.defense)||0}get baseAccuracy(){var r;return((r=this.status.base)==null?void 0:r.accuracy)||0}get baseMobility(){var r;return((r=this.status.base)==null?void 0:r.mobility)||0}get basicSkillAttack(){var r;return((r=this.status.basicSkill)==null?void 0:r.attack)||0}get basicSkillDefense(){var r;return((r=this.status.basicSkill)==null?void 0:r.defense)||0}get basicSkillAccuracy(){var r;return((r=this.status.basicSkill)==null?void 0:r.accuracy)||0}get basicSkillMobility(){var r;return((r=this.status.basicSkill)==null?void 0:r.mobility)||0}get equippedSkillIds(){return Array.isArray(this.data.equippedSkillIds)?this.data.equippedSkillIds:typeof this.data.equippedSkillIds=="string"?this.data.equippedSkillIds.split(",").map(r=>r.trim()).filter(Boolean):[]}get specialSkillAttack(){return this._sumSpecialSkill("attack")}get specialSkillDefense(){return this._sumSpecialSkill("defense")}get specialSkillAccuracy(){return this._sumSpecialSkill("accuracy")}get specialSkillMobility(){return this._sumSpecialSkill("mobility")}_sumSpecialSkill(r){if(!this.skillList)return 0;const n=(this.name||"").trim();if(!n)return 0;const c=new Set(this.equippedSkillIds.map(String));return c.size===0?0:this.skillList.filter(m=>{const M=(m==null?void 0:m.id)!=null?String(m.id):"";return c.has(M)?(Array.isArray(m.pilotNames)?m.pilotNames:[]).some(X=>X.includes(n)):!1}).reduce((m,M)=>m+(Number(M[r])||0),0)}get spiritCommands(){return this.data.spiritCommands||[]}get skills(){return this.data.skills||[]}get totalAttack(){return this.baseAttack+this.basicSkillAttack+this.specialSkillAttack}get totalDefense(){return this.baseDefense+this.basicSkillDefense+this.specialSkillDefense}get totalAccuracy(){return this.baseAccuracy+this.basicSkillAccuracy+this.specialSkillAccuracy}get totalMobility(){return this.baseMobility+this.basicSkillMobility+this.specialSkillMobility}}class St{constructor(r){r?Object.assign(this,r):this.data={}}get id(){return this.data.id}get name(){return this.data.name}get pilotNames(){return Array.isArray(this.data.pilotNames)?this.data.pilotNames:typeof this.data.pilotNames=="string"?this.data.pilotNames.split(",").map(r=>r.trim()).filter(Boolean):[]}get description(){return this.data.description}get level(){return this.data.level}get attack(){return this.data.attack}get defense(){return this.data.defense}get accuracy(){return this.data.accuracy}get mobility(){return this.data.mobility}get effect(){return this.data.effect||""}}function $t(s){return s&&s.__esModule&&Object.prototype.hasOwnProperty.call(s,"default")?s.default:s}var _t={exports:{}};/* @license
Papa Parse
v5.5.3
https://github.com/mholt/PapaParse
License: MIT
*/var Lt=_t.exports,Ot;function Mt(){return Ot||(Ot=1,function(s,r){((n,c)=>{s.exports=c()})(Lt,function n(){var c=typeof self<"u"?self:typeof window<"u"?window:c!==void 0?c:{},f,m=!c.document&&!!c.postMessage,M=c.IS_PAPA_WORKER||!1,K={},X=0,d={};function x(t){this._handle=null,this._finished=!1,this._completed=!1,this._halted=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},(function(e){var i=C(e);i.chunkSize=parseInt(i.chunkSize),e.step||e.chunk||(i.chunkSize=null),this._handle=new mt(i),(this._handle.streamer=this)._config=i}).call(this,t),this.parseChunk=function(e,i){var l=parseInt(this._config.skipFirstNLines)||0;if(this.isFirstChunk&&0<l){let b=this._config.newline;b||(o=this._config.quoteChar||'"',b=this._handle.guessLineEndings(e,o)),e=[...e.split(b).slice(l)].join(b)}this.isFirstChunk&&_(this._config.beforeFirstChunk)&&(o=this._config.beforeFirstChunk(e))!==void 0&&(e=o),this.isFirstChunk=!1,this._halted=!1;var l=this._partialLine+e,o=(this._partialLine="",this._handle.parse(l,this._baseIndex,!this._finished));if(!this._handle.paused()&&!this._handle.aborted()){if(e=o.meta.cursor,l=(this._finished||(this._partialLine=l.substring(e-this._baseIndex),this._baseIndex=e),o&&o.data&&(this._rowCount+=o.data.length),this._finished||this._config.preview&&this._rowCount>=this._config.preview),M)c.postMessage({results:o,workerId:d.WORKER_ID,finished:l});else if(_(this._config.chunk)&&!i){if(this._config.chunk(o,this._handle),this._handle.paused()||this._handle.aborted())return void(this._halted=!0);this._completeResults=o=void 0}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(o.data),this._completeResults.errors=this._completeResults.errors.concat(o.errors),this._completeResults.meta=o.meta),this._completed||!l||!_(this._config.complete)||o&&o.meta.aborted||(this._config.complete(this._completeResults,this._input),this._completed=!0),l||o&&o.meta.paused||this._nextChunk(),o}this._halted=!0},this._sendError=function(e){_(this._config.error)?this._config.error(e):M&&this._config.error&&c.postMessage({workerId:d.WORKER_ID,error:e,finished:!1})}}function W(t){var e;(t=t||{}).chunkSize||(t.chunkSize=d.RemoteChunkSize),x.call(this,t),this._nextChunk=m?function(){this._readChunk(),this._chunkLoaded()}:function(){this._readChunk()},this.stream=function(i){this._input=i,this._nextChunk()},this._readChunk=function(){if(this._finished)this._chunkLoaded();else{if(e=new XMLHttpRequest,this._config.withCredentials&&(e.withCredentials=this._config.withCredentials),m||(e.onload=D(this._chunkLoaded,this),e.onerror=D(this._chunkError,this)),e.open(this._config.downloadRequestBody?"POST":"GET",this._input,!m),this._config.downloadRequestHeaders){var i,l=this._config.downloadRequestHeaders;for(i in l)e.setRequestHeader(i,l[i])}var o;this._config.chunkSize&&(o=this._start+this._config.chunkSize-1,e.setRequestHeader("Range","bytes="+this._start+"-"+o));try{e.send(this._config.downloadRequestBody)}catch(b){this._chunkError(b.message)}m&&e.status===0&&this._chunkError()}},this._chunkLoaded=function(){e.readyState===4&&(e.status<200||400<=e.status?this._chunkError():(this._start+=this._config.chunkSize||e.responseText.length,this._finished=!this._config.chunkSize||this._start>=(i=>(i=i.getResponseHeader("Content-Range"))!==null?parseInt(i.substring(i.lastIndexOf("/")+1)):-1)(e),this.parseChunk(e.responseText)))},this._chunkError=function(i){i=e.statusText||i,this._sendError(new Error(i))}}function it(t){(t=t||{}).chunkSize||(t.chunkSize=d.LocalChunkSize),x.call(this,t);var e,i,l=typeof FileReader<"u";this.stream=function(o){this._input=o,i=o.slice||o.webkitSlice||o.mozSlice,l?((e=new FileReader).onload=D(this._chunkLoaded,this),e.onerror=D(this._chunkError,this)):e=new FileReaderSync,this._nextChunk()},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk()},this._readChunk=function(){var o=this._input,b=(this._config.chunkSize&&(b=Math.min(this._start+this._config.chunkSize,this._input.size),o=i.call(o,this._start,b)),e.readAsText(o,this._config.encoding));l||this._chunkLoaded({target:{result:b}})},this._chunkLoaded=function(o){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(o.target.result)},this._chunkError=function(){this._sendError(e.error)}}function U(t){var e;x.call(this,t=t||{}),this.stream=function(i){return e=i,this._nextChunk()},this._nextChunk=function(){var i,l;if(!this._finished)return i=this._config.chunkSize,e=i?(l=e.substring(0,i),e.substring(i)):(l=e,""),this._finished=!e,this.parseChunk(l)}}function V(t){x.call(this,t=t||{});var e=[],i=!0,l=!1;this.pause=function(){x.prototype.pause.apply(this,arguments),this._input.pause()},this.resume=function(){x.prototype.resume.apply(this,arguments),this._input.resume()},this.stream=function(o){this._input=o,this._input.on("data",this._streamData),this._input.on("end",this._streamEnd),this._input.on("error",this._streamError)},this._checkIsFinished=function(){l&&e.length===1&&(this._finished=!0)},this._nextChunk=function(){this._checkIsFinished(),e.length?this.parseChunk(e.shift()):i=!0},this._streamData=D(function(o){try{e.push(typeof o=="string"?o:o.toString(this._config.encoding)),i&&(i=!1,this._checkIsFinished(),this.parseChunk(e.shift()))}catch(b){this._streamError(b)}},this),this._streamError=D(function(o){this._streamCleanUp(),this._sendError(o)},this),this._streamEnd=D(function(){this._streamCleanUp(),l=!0,this._streamData("")},this),this._streamCleanUp=D(function(){this._input.removeListener("data",this._streamData),this._input.removeListener("end",this._streamEnd),this._input.removeListener("error",this._streamError)},this)}function mt(t){var e,i,l,o,b=Math.pow(2,53),j=-b,st=/^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/,at=/^((\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)))$/,y=this,$=0,h=0,Z=!1,p=!1,v=[],u={data:[],errors:[],meta:{}};function B(S){return t.skipEmptyLines==="greedy"?S.join("").trim()==="":S.length===1&&S[0].length===0}function F(){if(u&&l&&(rt("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+d.DefaultDelimiter+"'"),l=!1),t.skipEmptyLines&&(u.data=u.data.filter(function(O){return!B(O)})),J()){let O=function(z,q){_(t.transformHeader)&&(z=t.transformHeader(z,q)),v.push(z)};var g=O;if(u)if(Array.isArray(u.data[0])){for(var S=0;J()&&S<u.data.length;S++)u.data[S].forEach(O);u.data.splice(0,1)}else u.data.forEach(O)}function A(O,z){for(var q=t.header?{}:[],I=0;I<O.length;I++){var k=I,G=O[I],G=((E,N)=>(P=>(t.dynamicTypingFunction&&t.dynamicTyping[P]===void 0&&(t.dynamicTyping[P]=t.dynamicTypingFunction(P)),(t.dynamicTyping[P]||t.dynamicTyping)===!0))(E)?N==="true"||N==="TRUE"||N!=="false"&&N!=="FALSE"&&((P=>{if(st.test(P)&&(P=parseFloat(P),j<P&&P<b))return 1})(N)?parseFloat(N):at.test(N)?new Date(N):N===""?null:N):N)(k=t.header?I>=v.length?"__parsed_extra":v[I]:k,G=t.transform?t.transform(G,k):G);k==="__parsed_extra"?(q[k]=q[k]||[],q[k].push(G)):q[k]=G}return t.header&&(I>v.length?rt("FieldMismatch","TooManyFields","Too many fields: expected "+v.length+" fields but parsed "+I,h+z):I<v.length&&rt("FieldMismatch","TooFewFields","Too few fields: expected "+v.length+" fields but parsed "+I,h+z)),q}var L;u&&(t.header||t.dynamicTyping||t.transform)&&(L=1,!u.data.length||Array.isArray(u.data[0])?(u.data=u.data.map(A),L=u.data.length):u.data=A(u.data,0),t.header&&u.meta&&(u.meta.fields=v),h+=L)}function J(){return t.header&&v.length===0}function rt(S,A,L,g){S={type:S,code:A,message:L},g!==void 0&&(S.row=g),u.errors.push(S)}_(t.step)&&(o=t.step,t.step=function(S){u=S,J()?F():(F(),u.data.length!==0&&($+=S.data.length,t.preview&&$>t.preview?i.abort():(u.data=u.data[0],o(u,y))))}),this.parse=function(S,A,L){var g=t.quoteChar||'"',g=(t.newline||(t.newline=this.guessLineEndings(S,g)),l=!1,t.delimiter?_(t.delimiter)&&(t.delimiter=t.delimiter(S),u.meta.delimiter=t.delimiter):((g=((O,z,q,I,k)=>{var G,E,N,P;k=k||[",","	","|",";",d.RECORD_SEP,d.UNIT_SEP];for(var bt=0;bt<k.length;bt++){for(var lt,kt=k[bt],Y=0,ot=0,H=0,tt=(N=void 0,new a({comments:I,delimiter:kt,newline:z,preview:10}).parse(O)),ht=0;ht<tt.data.length;ht++)q&&B(tt.data[ht])?H++:(lt=tt.data[ht].length,ot+=lt,N===void 0?N=lt:0<lt&&(Y+=Math.abs(lt-N),N=lt));0<tt.data.length&&(ot/=tt.data.length-H),(E===void 0||Y<=E)&&(P===void 0||P<ot)&&1.99<ot&&(E=Y,G=kt,P=ot)}return{successful:!!(t.delimiter=G),bestDelimiter:G}})(S,t.newline,t.skipEmptyLines,t.comments,t.delimitersToGuess)).successful?t.delimiter=g.bestDelimiter:(l=!0,t.delimiter=d.DefaultDelimiter),u.meta.delimiter=t.delimiter),C(t));return t.preview&&t.header&&g.preview++,e=S,i=new a(g),u=i.parse(e,A,L),F(),Z?{meta:{paused:!0}}:u||{meta:{paused:!1}}},this.paused=function(){return Z},this.pause=function(){Z=!0,i.abort(),e=_(t.chunk)?"":e.substring(i.getCharIndex())},this.resume=function(){y.streamer._halted?(Z=!1,y.streamer.parseChunk(e,!0)):setTimeout(y.resume,3)},this.aborted=function(){return p},this.abort=function(){p=!0,i.abort(),u.meta.aborted=!0,_(t.complete)&&t.complete(u),e=""},this.guessLineEndings=function(O,g){O=O.substring(0,1048576);var g=new RegExp(nt(g)+"([^]*?)"+nt(g),"gm"),L=(O=O.replace(g,"")).split("\r"),g=O.split(`
`),O=1<g.length&&g[0].length<L[0].length;if(L.length===1||O)return`
`;for(var z=0,q=0;q<L.length;q++)L[q][0]===`
`&&z++;return z>=L.length/2?`\r
`:"\r"}}function nt(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function a(t){var e=(t=t||{}).delimiter,i=t.newline,l=t.comments,o=t.step,b=t.preview,j=t.fastMode,st=null,at=!1,y=t.quoteChar==null?'"':t.quoteChar,$=y;if(t.escapeChar!==void 0&&($=t.escapeChar),(typeof e!="string"||-1<d.BAD_DELIMITERS.indexOf(e))&&(e=","),l===e)throw new Error("Comment character same as delimiter");l===!0?l="#":(typeof l!="string"||-1<d.BAD_DELIMITERS.indexOf(l))&&(l=!1),i!==`
`&&i!=="\r"&&i!==`\r
`&&(i=`
`);var h=0,Z=!1;this.parse=function(p,v,u){if(typeof p!="string")throw new Error("Input must be a string");var B=p.length,F=e.length,J=i.length,rt=l.length,S=_(o),A=[],L=[],g=[],O=h=0;if(!p)return Y();if(j||j!==!1&&p.indexOf(y)===-1){for(var z=p.split(i),q=0;q<z.length;q++){if(g=z[q],h+=g.length,q!==z.length-1)h+=i.length;else if(u)return Y();if(!l||g.substring(0,rt)!==l){if(S){if(A=[],P(g.split(e)),ot(),Z)return Y()}else P(g.split(e));if(b&&b<=q)return A=A.slice(0,b),Y(!0)}}return Y()}for(var I=p.indexOf(e,h),k=p.indexOf(i,h),G=new RegExp(nt($)+nt(y),"g"),E=p.indexOf(y,h);;)if(p[h]===y)for(E=h,h++;;){if((E=p.indexOf(y,E+1))===-1)return u||L.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:A.length,index:h}),lt();if(E===B-1)return lt(p.substring(h,E).replace(G,y));if(y===$&&p[E+1]===$)E++;else if(y===$||E===0||p[E-1]!==$){I!==-1&&I<E+1&&(I=p.indexOf(e,E+1));var N=bt((k=k!==-1&&k<E+1?p.indexOf(i,E+1):k)===-1?I:Math.min(I,k));if(p.substr(E+1+N,F)===e){g.push(p.substring(h,E).replace(G,y)),p[h=E+1+N+F]!==y&&(E=p.indexOf(y,h)),I=p.indexOf(e,h),k=p.indexOf(i,h);break}if(N=bt(k),p.substring(E+1+N,E+1+N+J)===i){if(g.push(p.substring(h,E).replace(G,y)),kt(E+1+N+J),I=p.indexOf(e,h),E=p.indexOf(y,h),S&&(ot(),Z))return Y();if(b&&A.length>=b)return Y(!0);break}L.push({type:"Quotes",code:"InvalidQuotes",message:"Trailing quote on quoted field is malformed",row:A.length,index:h}),E++}}else if(l&&g.length===0&&p.substring(h,h+rt)===l){if(k===-1)return Y();h=k+J,k=p.indexOf(i,h),I=p.indexOf(e,h)}else if(I!==-1&&(I<k||k===-1))g.push(p.substring(h,I)),h=I+F,I=p.indexOf(e,h);else{if(k===-1)break;if(g.push(p.substring(h,k)),kt(k+J),S&&(ot(),Z))return Y();if(b&&A.length>=b)return Y(!0)}return lt();function P(H){A.push(H),O=h}function bt(H){var tt=0;return tt=H!==-1&&(H=p.substring(E+1,H))&&H.trim()===""?H.length:tt}function lt(H){return u||(H===void 0&&(H=p.substring(h)),g.push(H),h=B,P(g),S&&ot()),Y()}function kt(H){h=H,P(g),g=[],k=p.indexOf(i,h)}function Y(H){if(t.header&&!v&&A.length&&!at){var tt=A[0],ht=Object.create(null),At=new Set(tt);let Rt=!1;for(let gt=0;gt<tt.length;gt++){let ct=tt[gt];if(ht[ct=_(t.transformHeader)?t.transformHeader(ct,gt):ct]){let yt,Ct=ht[ct];for(;yt=ct+"_"+Ct,Ct++,At.has(yt););At.add(yt),tt[gt]=yt,ht[ct]++,Rt=!0,(st=st===null?{}:st)[yt]=ct}else ht[ct]=1,tt[gt]=ct;At.add(ct)}Rt&&console.warn("Duplicate headers found and renamed."),at=!0}return{data:A,errors:L,meta:{delimiter:e,linebreak:i,aborted:Z,truncated:!!H,cursor:O+(v||0),renamedHeaders:st}}}function ot(){o(Y()),A=[],L=[]}},this.abort=function(){Z=!0},this.getCharIndex=function(){return h}}function w(t){var e=t.data,i=K[e.workerId],l=!1;if(e.error)i.userError(e.error,e.file);else if(e.results&&e.results.data){var o={abort:function(){l=!0,Q(e.workerId,{data:[],errors:[],meta:{aborted:!0}})},pause:T,resume:T};if(_(i.userStep)){for(var b=0;b<e.results.data.length&&(i.userStep({data:e.results.data[b],errors:e.results.errors,meta:e.results.meta},o),!l);b++);delete e.results}else _(i.userChunk)&&(i.userChunk(e.results,o,e.file),delete e.results)}e.finished&&!l&&Q(e.workerId,e.results)}function Q(t,e){var i=K[t];_(i.userComplete)&&i.userComplete(e),i.terminate(),delete K[t]}function T(){throw new Error("Not implemented.")}function C(t){if(typeof t!="object"||t===null)return t;var e,i=Array.isArray(t)?[]:{};for(e in t)i[e]=C(t[e]);return i}function D(t,e){return function(){t.apply(e,arguments)}}function _(t){return typeof t=="function"}return d.parse=function(t,e){var i=(e=e||{}).dynamicTyping||!1;if(_(i)&&(e.dynamicTypingFunction=i,i={}),e.dynamicTyping=i,e.transform=!!_(e.transform)&&e.transform,!e.worker||!d.WORKERS_SUPPORTED)return i=null,d.NODE_STREAM_INPUT,typeof t=="string"?(t=(l=>l.charCodeAt(0)!==65279?l:l.slice(1))(t),i=new(e.download?W:U)(e)):t.readable===!0&&_(t.read)&&_(t.on)?i=new V(e):(c.File&&t instanceof File||t instanceof Object)&&(i=new it(e)),i.stream(t);(i=(()=>{var l;return!!d.WORKERS_SUPPORTED&&(l=(()=>{var o=c.URL||c.webkitURL||null,b=n.toString();return d.BLOB_URL||(d.BLOB_URL=o.createObjectURL(new Blob(["var global = (function() { if (typeof self !== 'undefined') { return self; } if (typeof window !== 'undefined') { return window; } if (typeof global !== 'undefined') { return global; } return {}; })(); global.IS_PAPA_WORKER=true; ","(",b,")();"],{type:"text/javascript"})))})(),(l=new c.Worker(l)).onmessage=w,l.id=X++,K[l.id]=l)})()).userStep=e.step,i.userChunk=e.chunk,i.userComplete=e.complete,i.userError=e.error,e.step=_(e.step),e.chunk=_(e.chunk),e.complete=_(e.complete),e.error=_(e.error),delete e.worker,i.postMessage({input:t,config:e,workerId:i.id})},d.unparse=function(t,e){var i=!1,l=!0,o=",",b=`\r
`,j='"',st=j+j,at=!1,y=null,$=!1,h=((()=>{if(typeof e=="object"){if(typeof e.delimiter!="string"||d.BAD_DELIMITERS.filter(function(v){return e.delimiter.indexOf(v)!==-1}).length||(o=e.delimiter),typeof e.quotes!="boolean"&&typeof e.quotes!="function"&&!Array.isArray(e.quotes)||(i=e.quotes),typeof e.skipEmptyLines!="boolean"&&typeof e.skipEmptyLines!="string"||(at=e.skipEmptyLines),typeof e.newline=="string"&&(b=e.newline),typeof e.quoteChar=="string"&&(j=e.quoteChar),typeof e.header=="boolean"&&(l=e.header),Array.isArray(e.columns)){if(e.columns.length===0)throw new Error("Option columns is empty");y=e.columns}e.escapeChar!==void 0&&(st=e.escapeChar+j),e.escapeFormulae instanceof RegExp?$=e.escapeFormulae:typeof e.escapeFormulae=="boolean"&&e.escapeFormulae&&($=/^[=+\-@\t\r].*$/)}})(),new RegExp(nt(j),"g"));if(typeof t=="string"&&(t=JSON.parse(t)),Array.isArray(t)){if(!t.length||Array.isArray(t[0]))return Z(null,t,at);if(typeof t[0]=="object")return Z(y||Object.keys(t[0]),t,at)}else if(typeof t=="object")return typeof t.data=="string"&&(t.data=JSON.parse(t.data)),Array.isArray(t.data)&&(t.fields||(t.fields=t.meta&&t.meta.fields||y),t.fields||(t.fields=Array.isArray(t.data[0])?t.fields:typeof t.data[0]=="object"?Object.keys(t.data[0]):[]),Array.isArray(t.data[0])||typeof t.data[0]=="object"||(t.data=[t.data])),Z(t.fields||[],t.data||[],at);throw new Error("Unable to serialize unrecognized input");function Z(v,u,B){var F="",J=(typeof v=="string"&&(v=JSON.parse(v)),typeof u=="string"&&(u=JSON.parse(u)),Array.isArray(v)&&0<v.length),rt=!Array.isArray(u[0]);if(J&&l){for(var S=0;S<v.length;S++)0<S&&(F+=o),F+=p(v[S],S);0<u.length&&(F+=b)}for(var A=0;A<u.length;A++){var L=(J?v:u[A]).length,g=!1,O=J?Object.keys(u[A]).length===0:u[A].length===0;if(B&&!J&&(g=B==="greedy"?u[A].join("").trim()==="":u[A].length===1&&u[A][0].length===0),B==="greedy"&&J){for(var z=[],q=0;q<L;q++){var I=rt?v[q]:q;z.push(u[A][I])}g=z.join("").trim()===""}if(!g){for(var k=0;k<L;k++){0<k&&!O&&(F+=o);var G=J&&rt?v[k]:k;F+=p(u[A][G],k)}A<u.length-1&&(!B||0<L&&!O)&&(F+=b)}}return F}function p(v,u){var B,F;return v==null?"":v.constructor===Date?JSON.stringify(v).slice(1,25):(F=!1,$&&typeof v=="string"&&$.test(v)&&(v="'"+v,F=!0),B=v.toString().replace(h,st),(F=F||i===!0||typeof i=="function"&&i(v,u)||Array.isArray(i)&&i[u]||((J,rt)=>{for(var S=0;S<rt.length;S++)if(-1<J.indexOf(rt[S]))return!0;return!1})(B,d.BAD_DELIMITERS)||-1<B.indexOf(o)||B.charAt(0)===" "||B.charAt(B.length-1)===" ")?j+B+j:B)}},d.RECORD_SEP="",d.UNIT_SEP="",d.BYTE_ORDER_MARK="\uFEFF",d.BAD_DELIMITERS=["\r",`
`,'"',d.BYTE_ORDER_MARK],d.WORKERS_SUPPORTED=!m&&!!c.Worker,d.NODE_STREAM_INPUT=1,d.LocalChunkSize=10485760,d.RemoteChunkSize=5242880,d.DefaultDelimiter=",",d.Parser=a,d.ParserHandle=mt,d.NetworkStreamer=W,d.FileStreamer=it,d.StringStreamer=U,d.ReadableStreamStreamer=V,c.jQuery&&((f=c.jQuery).fn.parse=function(t){var e=t.config||{},i=[];return this.each(function(b){if(!(f(this).prop("tagName").toUpperCase()==="INPUT"&&f(this).attr("type").toLowerCase()==="file"&&c.FileReader)||!this.files||this.files.length===0)return!0;for(var j=0;j<this.files.length;j++)i.push({file:this.files[j],inputElem:this,instanceConfig:f.extend({},e)})}),l(),this;function l(){if(i.length===0)_(t.complete)&&t.complete();else{var b,j,st,at,y=i[0];if(_(t.before)){var $=t.before(y.file,y.inputElem);if(typeof $=="object"){if($.action==="abort")return b="AbortError",j=y.file,st=y.inputElem,at=$.reason,void(_(t.error)&&t.error({name:b},j,st,at));if($.action==="skip")return void o();typeof $.config=="object"&&(y.instanceConfig=f.extend(y.instanceConfig,$.config))}else if($==="skip")return void o()}var h=y.instanceConfig.complete;y.instanceConfig.complete=function(Z){_(h)&&h(Z,y.file,y.inputElem),o()},d.parse(y.file,y.instanceConfig)}}function o(){i.splice(0,1),l()}}),M&&(c.onmessage=function(t){t=t.data,d.WORKER_ID===void 0&&t&&(d.WORKER_ID=t.workerId),typeof t.input=="string"?c.postMessage({workerId:d.WORKER_ID,results:d.parse(t.input,t.config),finished:!0}):(c.File&&t.input instanceof File||t.input instanceof Object)&&(t=d.parse(t.input,t.config))&&c.postMessage({workerId:d.WORKER_ID,results:t,finished:!0})}),(W.prototype=Object.create(x.prototype)).constructor=W,(it.prototype=Object.create(x.prototype)).constructor=it,(U.prototype=Object.create(U.prototype)).constructor=U,(V.prototype=Object.create(x.prototype)).constructor=V,d})}(_t)),_t.exports}var Tt=Mt();const wt=$t(Tt),Ft=document.getElementById("app");function jt(){try{const s=JSON.parse(localStorage.getItem("srwdd-state"));if(s&&Array.isArray(s.pilots))return{pilots:s.pilots,skills:Array.isArray(s.skills)?s.skills:[]}}catch{}return{pilots:[],skills:[]}}function pt(){localStorage.setItem("srwdd-state",JSON.stringify({pilots:R.pilots.map(s=>s.data||s),skills:R.skills.map(s=>s.data||s)}))}let R=jt(),dt="pilot",ft=null,ut=null,vt=!1,Et={pilot:{key:"id",dir:"asc"},skill:{key:"id",dir:"asc"}};function xt(s){return new Dt({data:s},R.skills)}function et(){var nt;const s=R.pilots.map(a=>a instanceof Dt?a:xt(a)),r=R.skills.map(a=>a instanceof St?a:new St({data:a}));R.pilots=s,R.skills=r,R.pilots.forEach(a=>{a.skillList=R.skills}),!ft&&s.length>0&&(ft=String(s[0].id));const n=s.find(a=>String(a.id)===String(ft)),c=(n==null?void 0:n.equippedSkillIds)||[],f=new Set(c.map(String)),m=(n==null?void 0:n.name)||"",M=r.map(a=>{const w=Array.isArray(a.pilotNames)?a.pilotNames:[],Q=m&&w.some(T=>T.includes(m));return{skill:a,eligible:Q}}),K=Number((nt=n==null?void 0:n.data)==null?void 0:nt.skillSlots)||0,X=c.length,d=Et.pilot,x=Et.skill,W=[...s].sort((a,w)=>qt(a,w,d.key,d.dir)),it=[...r].sort((a,w)=>qt(a,w,x.key,x.dir)),U=dt==="skill"?r.find(a=>String(a.id)===String(ut)):null,V=(U==null?void 0:U.data)||{},mt=Array.isArray(V.pilotNames)?V.pilotNames.join(", "):V.pilotNames||"";if(Ft.innerHTML=`
    <div class="app-shell">
      <nav class="navbar navbar-expand sticky-top app-navbar">
        <div class="container">
          <span class="navbar-brand app-title">SRWDD</span>
          <ul class="nav nav-pills app-tabs">
            <li class="nav-item">
              <button id="view-pilot" class="nav-link ${dt==="pilot"?"active":""}" type="button">パイロット</button>
            </li>
            <li class="nav-item">
              <button id="view-skill" class="nav-link ${dt==="skill"?"active":""}" type="button">スキル</button>
            </li>
          </ul>
        </div>
      </nav>
      <div class="container py-4 app-content">
    ${dt==="pilot"?`
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
          ${W.map((a,w)=>`
            <tr>
              <td>${a.id||""}</td>
              <td>${a.name||""}</td>
              <td>${a.baseAttack}</td><td>${a.baseDefense}</td><td>${a.baseAccuracy}</td><td>${a.baseMobility}</td>
              <td>${a.basicSkillAttack}</td><td>${a.basicSkillDefense}</td><td>${a.basicSkillAccuracy}</td><td>${a.basicSkillMobility}</td>
              <td>${a.specialSkillAttack}</td><td>${a.specialSkillDefense}</td><td>${a.specialSkillAccuracy}</td><td>${a.specialSkillMobility}</td>
              <td>${a.totalAttack}</td><td>${a.totalDefense}</td><td>${a.totalAccuracy}</td><td>${a.totalMobility}</td>
              <td class="text-center">
                <button class="pilot-equip btn btn-sm btn-outline-secondary" data-id="${a.id}" title="装備" aria-label="装備">
                  <i class="bi bi-gear"></i>
                </button>
                <button class="pilot-delete btn btn-sm btn-danger" data-index="${w}" title="削除" aria-label="削除">
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
    `:`
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
          ${it.map(a=>{var w;return`
            <tr>
              <td>${a.id||""}</td>
              <td>${a.name||""}</td>
              <td>${((w=a.pilotNames)==null?void 0:w.join(", "))||""}</td>
              <td>${a.effect||""}</td>
              <td>${a.attack||0}</td>
              <td>${a.defense||0}</td>
              <td>${a.accuracy||0}</td>
              <td>${a.mobility||0}</td>
              <td class="text-center">
                <button class="skill-edit btn btn-sm btn-outline-secondary" data-id="${a.id}" title="更新" aria-label="更新">
                  <i class="bi bi-pencil"></i>
                </button>
                <button class="skill-delete btn btn-sm btn-danger" data-id="${a.id}" title="削除" aria-label="削除">
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
        <h2 class="h6 mb-0">${U?"スキル更新":"スキル追加"}</h2>
      </div>
      <div class="card-body">
      <form id="skill-form" class="row g-3">
        <div class="col-12 col-md-4">
          <label class="form-label small">名前</label>
          <input name="name" placeholder="名前" required class="form-control" value="${It(V.name||"")}" />
        </div>
        <div class="col-12 col-md-4">
          <label class="form-label small">対応パイロット</label>
          <input name="pilotNames" placeholder="対応パイロット（カンマ区切り可）" class="form-control" list="pilot-name-list" autocomplete="off" value="${It(mt)}" />
          <datalist id="pilot-name-list">
            ${s.map(a=>`<option value="${a.name}">`).join("")}
          </datalist>
        </div>
        <div class="col-12 col-md-4">
          <label class="form-label small">その他効果</label>
          <input name="effect" placeholder="その他効果" class="form-control" value="${It(V.effect||"")}" />
        </div>
        <div class="col-6 col-md-3"><input name="attack" type="number" placeholder="攻撃" class="form-control" value="${V.attack??""}" /></div>
        <div class="col-6 col-md-3"><input name="defense" type="number" placeholder="防御" class="form-control" value="${V.defense??""}" /></div>
        <div class="col-6 col-md-3"><input name="accuracy" type="number" placeholder="照準" class="form-control" value="${V.accuracy??""}" /></div>
        <div class="col-6 col-md-3"><input name="mobility" type="number" placeholder="運動" class="form-control" value="${V.mobility??""}" /></div>
        <div class="col-12">
          <button type="submit" class="btn btn-primary">${U?"更新":"追加"}</button>
          ${U?'<button type="button" id="cancel-skill-edit" class="btn btn-outline-secondary ms-2">キャンセル</button>':""}
        </div>
      </form>
      </div>
    </div>
    `}
    ${dt==="pilot"?`
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
                  ${s.map(a=>`<option value="${a.id}" ${String(a.id)===String(ft)?"selected":""}>${a.name||a.id}</option>`).join("")}
                </select>
              </div>
              <div class="col-6 col-md-3">
                <label class="form-label small">装備枠</label>
                <input id="equip-slots" type="number" min="0" value="${K}" class="form-control" />
              </div>
              <div class="col-6 col-md-4 text-md-end">
                <span id="equip-count" class="badge text-bg-dark">${X}/${K}</span>
              </div>
            </div>
            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-2" id="equip-list">
              ${M.filter(({eligible:a})=>a).map(({skill:a},w)=>{const Q=(a==null?void 0:a.id)??"",T=f.has(String(Q))?"checked":"",C=(a==null?void 0:a.name)||"(名称未設定)",D=`equip-skill-${Q||w}`;return`<div class="col equip-tile">
                  <input class="btn-check equip-skill" type="checkbox" id="${D}" value="${Q}" ${T} />
                  <label class="btn btn-outline-dark w-100 text-start" for="${D}">${C}</label>
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
  `,document.getElementById("view-pilot").onclick=()=>{dt="pilot",vt=!1,et()},document.getElementById("view-skill").onclick=()=>{dt="skill",vt=!1,et()},dt==="pilot"){document.getElementById("pilot-csv").onchange=Pt,document.getElementById("export-pilot").onclick=Ut,document.getElementById("pilot-form").onsubmit=Vt,document.querySelectorAll(".pilot-equip").forEach(C=>{C.onclick=()=>{ft=C.getAttribute("data-id"),vt=!0,et()}});const a=document.getElementById("equip-pilot"),w=document.getElementById("equip-slots"),Q=document.getElementById("equip-modal"),T=document.getElementById("equip-count");if(Q&&window.bootstrap){const C=window.bootstrap.Modal.getOrCreateInstance(Q);vt&&C.show(),Q.addEventListener("hidden.bs.modal",()=>{vt=!1})}a&&(a.onchange=()=>{ft=a.value,et()}),w&&(w.onchange=()=>{const C=R.pilots.find(e=>String(e.id)===String(ft));if(!C)return;C.data=C.data||{};const D=Number(w.value)||0;C.data.skillSlots=D;const _=Array.from(document.querySelectorAll(".equip-skill:checked"));_.length>D&&_.slice(D).forEach(i=>{i.checked=!1});const t=new Set(Array.from(document.querySelectorAll(".equip-skill:checked")).map(e=>String(e.value)));C.data.equippedSkillIds=Array.from(t),pt(),T&&(T.textContent=`${t.size}/${D}`)}),document.querySelectorAll(".equip-skill").forEach(C=>{C.onchange=()=>{var i;const D=R.pilots.find(l=>String(l.id)===String(ft));if(!D)return;const _=Number((i=D.data)==null?void 0:i.skillSlots)||0,t=new Set(D.equippedSkillIds.map(String)),e=C.value;if(C.checked){if(t.size>=_){C.checked=!1;return}t.add(String(e))}else t.delete(String(e));D.data=D.data||{},D.data.equippedSkillIds=Array.from(t),pt(),T&&(T.textContent=`${t.size}/${_}`)}})}else{document.getElementById("skill-csv").onchange=Kt,document.getElementById("export-skill").onclick=Wt,document.getElementById("skill-form").onsubmit=Jt,document.querySelectorAll(".skill-edit").forEach(w=>{w.onclick=()=>{ut=w.getAttribute("data-id"),et()}});const a=document.getElementById("cancel-skill-edit");a&&(a.onclick=()=>{ut=null,et()})}document.querySelectorAll("th.sortable").forEach(a=>{a.style.cursor="pointer",a.onclick=()=>{const w=a.getAttribute("data-sort");if(!w)return;const T=Et[dt==="pilot"?"pilot":"skill"];T.key===w?T.dir=T.dir==="asc"?"desc":"asc":(T.key=w,T.dir="asc"),et()}}),dt==="pilot"?document.querySelectorAll(".pilot-delete").forEach(a=>{a.onclick=()=>{const w=Number(a.getAttribute("data-index"));isNaN(w)||(R.pilots.splice(w,1),pt(),et())}}):document.querySelectorAll(".skill-delete").forEach(a=>{a.onclick=()=>{const w=a.getAttribute("data-id"),Q=R.skills.findIndex(T=>{var C;return String(T.id||((C=T.data)==null?void 0:C.id))===String(w)});Q!==-1&&(String(ut)===String(w)&&(ut=null),R.skills.splice(Q,1),pt(),et())}})}function qt(s,r,n,c){const f=Nt(s,n),m=Nt(r,n);return f<m?c==="asc"?-1:1:f>m?c==="asc"?1:-1:0}function Nt(s,r){const n=s==null?void 0:s[r];if(Array.isArray(n))return n.join(",");if(n==null)return"";const c=Number(n);return!isNaN(c)&&String(n).trim()!==""?c:String(n).toLowerCase()}function It(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function Bt(s){var c;const r=document.getElementById("app-toast"),n=document.getElementById("app-toast-message");!r||!n||(n.textContent=s,(c=window.bootstrap)!=null&&c.Toast&&window.bootstrap.Toast.getOrCreateInstance(r,{delay:1800}).show())}function Pt(s){const r=s.target.files[0];r&&wt.parse(r,{header:!0,complete:n=>{R.pilots=n.data.map(c=>xt(Ht(c))),pt(),et()}})}function Ut(){const s=wt.unparse(R.pilots.map(f=>zt(f.data||f))),r=new Blob([s],{type:"text/csv"}),n=URL.createObjectURL(r),c=document.createElement("a");c.href=n,c.download="pilots.csv",c.click(),URL.revokeObjectURL(n)}function zt(s){var r,n,c,f,m,M,K,X,d,x,W,it,U,V,mt,nt;return{id:s.id||"",name:s.name||"",baseAttack:((n=(r=s.status)==null?void 0:r.base)==null?void 0:n.attack)??0,baseDefense:((f=(c=s.status)==null?void 0:c.base)==null?void 0:f.defense)??0,baseAccuracy:((M=(m=s.status)==null?void 0:m.base)==null?void 0:M.accuracy)??0,baseMobility:((X=(K=s.status)==null?void 0:K.base)==null?void 0:X.mobility)??0,basicSkillAttack:((x=(d=s.status)==null?void 0:d.basicSkill)==null?void 0:x.attack)??0,basicSkillDefense:((it=(W=s.status)==null?void 0:W.basicSkill)==null?void 0:it.defense)??0,basicSkillAccuracy:((V=(U=s.status)==null?void 0:U.basicSkill)==null?void 0:V.accuracy)??0,basicSkillMobility:((nt=(mt=s.status)==null?void 0:mt.basicSkill)==null?void 0:nt.mobility)??0,skillSlots:s.skillSlots??0,equippedSkillIds:Array.isArray(s.equippedSkillIds)?s.equippedSkillIds.join(","):s.equippedSkillIds||""}}function Ht(s){const r={base:{attack:Number(s.baseAttack||s.attack||0),defense:Number(s.baseDefense||s.defense||0),accuracy:Number(s.baseAccuracy||s.accuracy||0),mobility:Number(s.baseMobility||s.mobility||0)},basicSkill:{attack:Number(s.basicSkillAttack||0),defense:Number(s.basicSkillDefense||0),accuracy:Number(s.basicSkillAccuracy||0),mobility:Number(s.basicSkillMobility||0)}};return{id:s.id||"",name:s.name||"",status:r,skillSlots:Number(s.skillSlots||0),equippedSkillIds:typeof s.equippedSkillIds=="string"?s.equippedSkillIds.split(",").map(n=>n.trim()).filter(Boolean):[]}}function Kt(s){const r=s.target.files[0];r&&wt.parse(r,{header:!0,complete:n=>{R.skills=n.data.map(c=>new St({data:c})),ut=null,pt(),et()}})}function Wt(){const s=wt.unparse(R.skills.map(f=>f.data||f)),r=new Blob([s],{type:"text/csv"}),n=URL.createObjectURL(r),c=document.createElement("a");c.href=n,c.download="skills.csv",c.click(),URL.revokeObjectURL(n)}function Vt(s){s.preventDefault();const r=s.target,n=new FormData(r),c=n.get("name")||"",f={base:{attack:Number(n.get("baseAttack"))||0,defense:Number(n.get("baseDefense"))||0,accuracy:Number(n.get("baseAccuracy"))||0,mobility:Number(n.get("baseMobility"))||0},basicSkill:{attack:Number(n.get("basicSkillAttack"))||0,defense:Number(n.get("basicSkillDefense"))||0,accuracy:Number(n.get("basicSkillAccuracy"))||0,mobility:Number(n.get("basicSkillMobility"))||0}},m=R.pilots.reduce((K,X)=>{var x;const d=Number(X.id||((x=X.data)==null?void 0:x.id));return!isNaN(d)&&d>K?d:K},0),M={id:String(m+1),name:c,status:f,skillSlots:0,equippedSkillIds:[]};R.pilots.push(xt(M)),r.reset(),pt(),et()}function Jt(s){var X;s.preventDefault();const r=s.target,n=new FormData(r);let c=!1;const f=n.get("name")||"",m=n.get("pilotNames")||"",M=n.get("effect")||"",K={name:f,pilotNames:m,effect:M,attack:Number(n.get("attack"))||0,defense:Number(n.get("defense"))||0,accuracy:Number(n.get("accuracy"))||0,mobility:Number(n.get("mobility"))||0};if(ut){const d=R.skills.findIndex(x=>{var W;return String(x.id||((W=x.data)==null?void 0:W.id))===String(ut)});if(d!==-1){const x=R.skills[d],W=String(x.id||((X=x.data)==null?void 0:X.id)||ut);R.skills[d]=new St({data:{id:W,...K}}),c=!0}ut=null}else{const d=R.skills.reduce((x,W)=>{var U;const it=Number(W.id||((U=W.data)==null?void 0:U.id));return!isNaN(it)&&it>x?it:x},0);R.skills.push(new St({data:{id:String(d+1),...K}}))}r.reset(),pt(),et(),c&&Bt("スキルを更新しました")}et();
