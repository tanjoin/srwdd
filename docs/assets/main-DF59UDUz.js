(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const f of document.querySelectorAll('link[rel="modulepreload"]'))d(f);new MutationObserver(f=>{for(const m of f)if(m.type==="childList")for(const $ of m.addedNodes)$.tagName==="LINK"&&$.rel==="modulepreload"&&d($)}).observe(document,{childList:!0,subtree:!0});function n(f){const m={};return f.integrity&&(m.integrity=f.integrity),f.referrerPolicy&&(m.referrerPolicy=f.referrerPolicy),f.crossOrigin==="use-credentials"?m.credentials="include":f.crossOrigin==="anonymous"?m.credentials="omit":m.credentials="same-origin",m}function d(f){if(f.ep)return;f.ep=!0;const m=n(f);fetch(f.href,m)}})();class Nt{constructor(r,n=[]){r?Object.assign(this,r):this.data={},this.skillList=n}get id(){return this.data.id}get name(){return this.data.name}get status(){return this.data.status||{}}get baseAttack(){var r;return((r=this.status.base)==null?void 0:r.attack)||0}get baseDefense(){var r;return((r=this.status.base)==null?void 0:r.defense)||0}get baseAccuracy(){var r;return((r=this.status.base)==null?void 0:r.accuracy)||0}get baseMobility(){var r;return((r=this.status.base)==null?void 0:r.mobility)||0}get basicSkillAttack(){var r;return((r=this.status.basicSkill)==null?void 0:r.attack)||0}get basicSkillDefense(){var r;return((r=this.status.basicSkill)==null?void 0:r.defense)||0}get basicSkillAccuracy(){var r;return((r=this.status.basicSkill)==null?void 0:r.accuracy)||0}get basicSkillMobility(){var r;return((r=this.status.basicSkill)==null?void 0:r.mobility)||0}get equippedSkillIds(){return Array.isArray(this.data.equippedSkillIds)?this.data.equippedSkillIds:typeof this.data.equippedSkillIds=="string"?this.data.equippedSkillIds.split(",").map(r=>r.trim()).filter(Boolean):[]}get specialSkillAttack(){return this._sumSpecialSkill("attack")}get specialSkillDefense(){return this._sumSpecialSkill("defense")}get specialSkillAccuracy(){return this._sumSpecialSkill("accuracy")}get specialSkillMobility(){return this._sumSpecialSkill("mobility")}_sumSpecialSkill(r){if(!this.skillList)return 0;const n=(this.name||"").trim();if(!n)return 0;const d=new Set(this.equippedSkillIds.map(String));return d.size===0?0:this.skillList.filter(m=>{const $=(m==null?void 0:m.id)!=null?String(m.id):"";return d.has($)?(Array.isArray(m.pilotNames)?m.pilotNames:[]).some(G=>G.includes(n)):!1}).reduce((m,$)=>m+(Number($[r])||0),0)}get spiritCommands(){return this.data.spiritCommands||[]}get skills(){return this.data.skills||[]}get totalAttack(){return this.baseAttack+this.basicSkillAttack+this.specialSkillAttack}get totalDefense(){return this.baseDefense+this.basicSkillDefense+this.specialSkillDefense}get totalAccuracy(){return this.baseAccuracy+this.basicSkillAccuracy+this.specialSkillAccuracy}get totalMobility(){return this.baseMobility+this.basicSkillMobility+this.specialSkillMobility}}class St{constructor(r){r?Object.assign(this,r):this.data={}}get id(){return this.data.id}get name(){return this.data.name}get pilotNames(){return Array.isArray(this.data.pilotNames)?this.data.pilotNames:typeof this.data.pilotNames=="string"?this.data.pilotNames.split(",").map(r=>r.trim()).filter(Boolean):[]}get description(){return this.data.description}get level(){return this.data.level}get attack(){return this.data.attack}get defense(){return this.data.defense}get accuracy(){return this.data.accuracy}get mobility(){return this.data.mobility}get effect(){return this.data.effect||""}}function qt(s){return s&&s.__esModule&&Object.prototype.hasOwnProperty.call(s,"default")?s.default:s}var vt={exports:{}};/* @license
Papa Parse
v5.5.3
https://github.com/mholt/PapaParse
License: MIT
*/var Dt=vt.exports,Rt;function Lt(){return Rt||(Rt=1,function(s,r){((n,d)=>{s.exports=d()})(Dt,function n(){var d=typeof self<"u"?self:typeof window<"u"?window:d!==void 0?d:{},f,m=!d.document&&!!d.postMessage,$=d.IS_PAPA_WORKER||!1,H={},G=0,c={};function C(t){this._handle=null,this._finished=!1,this._completed=!1,this._halted=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},(function(e){var i=tt(e);i.chunkSize=parseInt(i.chunkSize),e.step||e.chunk||(i.chunkSize=null),this._handle=new _(i),(this._handle.streamer=this)._config=i}).call(this,t),this.parseChunk=function(e,i){var o=parseInt(this._config.skipFirstNLines)||0;if(this.isFirstChunk&&0<o){let b=this._config.newline;b||(l=this._config.quoteChar||'"',b=this._handle.guessLineEndings(e,l)),e=[...e.split(b).slice(o)].join(b)}this.isFirstChunk&&w(this._config.beforeFirstChunk)&&(l=this._config.beforeFirstChunk(e))!==void 0&&(e=l),this.isFirstChunk=!1,this._halted=!1;var o=this._partialLine+e,l=(this._partialLine="",this._handle.parse(o,this._baseIndex,!this._finished));if(!this._handle.paused()&&!this._handle.aborted()){if(e=l.meta.cursor,o=(this._finished||(this._partialLine=o.substring(e-this._baseIndex),this._baseIndex=e),l&&l.data&&(this._rowCount+=l.data.length),this._finished||this._config.preview&&this._rowCount>=this._config.preview),$)d.postMessage({results:l,workerId:c.WORKER_ID,finished:o});else if(w(this._config.chunk)&&!i){if(this._config.chunk(l,this._handle),this._handle.paused()||this._handle.aborted())return void(this._halted=!0);this._completeResults=l=void 0}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(l.data),this._completeResults.errors=this._completeResults.errors.concat(l.errors),this._completeResults.meta=l.meta),this._completed||!o||!w(this._config.complete)||l&&l.meta.aborted||(this._config.complete(this._completeResults,this._input),this._completed=!0),o||l&&l.meta.paused||this._nextChunk(),l}this._halted=!0},this._sendError=function(e){w(this._config.error)?this._config.error(e):$&&this._config.error&&d.postMessage({workerId:c.WORKER_ID,error:e,finished:!1})}}function X(t){var e;(t=t||{}).chunkSize||(t.chunkSize=c.RemoteChunkSize),C.call(this,t),this._nextChunk=m?function(){this._readChunk(),this._chunkLoaded()}:function(){this._readChunk()},this.stream=function(i){this._input=i,this._nextChunk()},this._readChunk=function(){if(this._finished)this._chunkLoaded();else{if(e=new XMLHttpRequest,this._config.withCredentials&&(e.withCredentials=this._config.withCredentials),m||(e.onload=V(this._chunkLoaded,this),e.onerror=V(this._chunkError,this)),e.open(this._config.downloadRequestBody?"POST":"GET",this._input,!m),this._config.downloadRequestHeaders){var i,o=this._config.downloadRequestHeaders;for(i in o)e.setRequestHeader(i,o[i])}var l;this._config.chunkSize&&(l=this._start+this._config.chunkSize-1,e.setRequestHeader("Range","bytes="+this._start+"-"+l));try{e.send(this._config.downloadRequestBody)}catch(b){this._chunkError(b.message)}m&&e.status===0&&this._chunkError()}},this._chunkLoaded=function(){e.readyState===4&&(e.status<200||400<=e.status?this._chunkError():(this._start+=this._config.chunkSize||e.responseText.length,this._finished=!this._config.chunkSize||this._start>=(i=>(i=i.getResponseHeader("Content-Range"))!==null?parseInt(i.substring(i.lastIndexOf("/")+1)):-1)(e),this.parseChunk(e.responseText)))},this._chunkError=function(i){i=e.statusText||i,this._sendError(new Error(i))}}function ct(t){(t=t||{}).chunkSize||(t.chunkSize=c.LocalChunkSize),C.call(this,t);var e,i,o=typeof FileReader<"u";this.stream=function(l){this._input=l,i=l.slice||l.webkitSlice||l.mozSlice,o?((e=new FileReader).onload=V(this._chunkLoaded,this),e.onerror=V(this._chunkError,this)):e=new FileReaderSync,this._nextChunk()},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk()},this._readChunk=function(){var l=this._input,b=(this._config.chunkSize&&(b=Math.min(this._start+this._config.chunkSize,this._input.size),l=i.call(l,this._start,b)),e.readAsText(l,this._config.encoding));o||this._chunkLoaded({target:{result:b}})},this._chunkLoaded=function(l){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(l.target.result)},this._chunkError=function(){this._sendError(e.error)}}function rt(t){var e;C.call(this,t=t||{}),this.stream=function(i){return e=i,this._nextChunk()},this._nextChunk=function(){var i,o;if(!this._finished)return i=this._config.chunkSize,e=i?(o=e.substring(0,i),e.substring(i)):(o=e,""),this._finished=!e,this.parseChunk(o)}}function a(t){C.call(this,t=t||{});var e=[],i=!0,o=!1;this.pause=function(){C.prototype.pause.apply(this,arguments),this._input.pause()},this.resume=function(){C.prototype.resume.apply(this,arguments),this._input.resume()},this.stream=function(l){this._input=l,this._input.on("data",this._streamData),this._input.on("end",this._streamEnd),this._input.on("error",this._streamError)},this._checkIsFinished=function(){o&&e.length===1&&(this._finished=!0)},this._nextChunk=function(){this._checkIsFinished(),e.length?this.parseChunk(e.shift()):i=!0},this._streamData=V(function(l){try{e.push(typeof l=="string"?l:l.toString(this._config.encoding)),i&&(i=!1,this._checkIsFinished(),this.parseChunk(e.shift()))}catch(b){this._streamError(b)}},this),this._streamError=V(function(l){this._streamCleanUp(),this._sendError(l)},this),this._streamEnd=V(function(){this._streamCleanUp(),o=!0,this._streamData("")},this),this._streamCleanUp=V(function(){this._input.removeListener("data",this._streamData),this._input.removeListener("end",this._streamEnd),this._input.removeListener("error",this._streamError)},this)}function _(t){var e,i,o,l,b=Math.pow(2,53),F=-b,et=/^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/,it=/^((\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)))$/,y=this,q=0,h=0,J=!1,p=!1,v=[],u={data:[],errors:[],meta:{}};function j(S){return t.skipEmptyLines==="greedy"?S.join("").trim()==="":S.length===1&&S[0].length===0}function M(){if(u&&o&&(st("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+c.DefaultDelimiter+"'"),o=!1),t.skipEmptyLines&&(u.data=u.data.filter(function(I){return!j(I)})),W()){let I=function(U,R){w(t.transformHeader)&&(U=t.transformHeader(U,R)),v.push(U)};var g=I;if(u)if(Array.isArray(u.data[0])){for(var S=0;W()&&S<u.data.length;S++)u.data[S].forEach(I);u.data.splice(0,1)}else u.data.forEach(I)}function A(I,U){for(var R=t.header?{}:[],x=0;x<I.length;x++){var k=x,Q=I[x],Q=((E,O)=>(P=>(t.dynamicTypingFunction&&t.dynamicTyping[P]===void 0&&(t.dynamicTyping[P]=t.dynamicTypingFunction(P)),(t.dynamicTyping[P]||t.dynamicTyping)===!0))(E)?O==="true"||O==="TRUE"||O!=="false"&&O!=="FALSE"&&((P=>{if(et.test(P)&&(P=parseFloat(P),F<P&&P<b))return 1})(O)?parseFloat(O):it.test(O)?new Date(O):O===""?null:O):O)(k=t.header?x>=v.length?"__parsed_extra":v[x]:k,Q=t.transform?t.transform(Q,k):Q);k==="__parsed_extra"?(R[k]=R[k]||[],R[k].push(Q)):R[k]=Q}return t.header&&(x>v.length?st("FieldMismatch","TooManyFields","Too many fields: expected "+v.length+" fields but parsed "+x,h+U):x<v.length&&st("FieldMismatch","TooFewFields","Too few fields: expected "+v.length+" fields but parsed "+x,h+U)),R}var D;u&&(t.header||t.dynamicTyping||t.transform)&&(D=1,!u.data.length||Array.isArray(u.data[0])?(u.data=u.data.map(A),D=u.data.length):u.data=A(u.data,0),t.header&&u.meta&&(u.meta.fields=v),h+=D)}function W(){return t.header&&v.length===0}function st(S,A,D,g){S={type:S,code:A,message:D},g!==void 0&&(S.row=g),u.errors.push(S)}w(t.step)&&(l=t.step,t.step=function(S){u=S,W()?M():(M(),u.data.length!==0&&(q+=S.data.length,t.preview&&q>t.preview?i.abort():(u.data=u.data[0],l(u,y))))}),this.parse=function(S,A,D){var g=t.quoteChar||'"',g=(t.newline||(t.newline=this.guessLineEndings(S,g)),o=!1,t.delimiter?w(t.delimiter)&&(t.delimiter=t.delimiter(S),u.meta.delimiter=t.delimiter):((g=((I,U,R,x,k)=>{var Q,E,O,P;k=k||[",","	","|",";",c.RECORD_SEP,c.UNIT_SEP];for(var mt=0;mt<k.length;mt++){for(var nt,gt=k[mt],Z=0,lt=0,z=0,Y=(O=void 0,new B({comments:x,delimiter:gt,newline:U,preview:10}).parse(I)),dt=0;dt<Y.data.length;dt++)R&&j(Y.data[dt])?z++:(nt=Y.data[dt].length,lt+=nt,O===void 0?O=nt:0<nt&&(Z+=Math.abs(nt-O),O=nt));0<Y.data.length&&(lt/=Y.data.length-z),(E===void 0||Z<=E)&&(P===void 0||P<lt)&&1.99<lt&&(E=Z,Q=gt,P=lt)}return{successful:!!(t.delimiter=Q),bestDelimiter:Q}})(S,t.newline,t.skipEmptyLines,t.comments,t.delimitersToGuess)).successful?t.delimiter=g.bestDelimiter:(o=!0,t.delimiter=c.DefaultDelimiter),u.meta.delimiter=t.delimiter),tt(t));return t.preview&&t.header&&g.preview++,e=S,i=new B(g),u=i.parse(e,A,D),M(),J?{meta:{paused:!0}}:u||{meta:{paused:!1}}},this.paused=function(){return J},this.pause=function(){J=!0,i.abort(),e=w(t.chunk)?"":e.substring(i.getCharIndex())},this.resume=function(){y.streamer._halted?(J=!1,y.streamer.parseChunk(e,!0)):setTimeout(y.resume,3)},this.aborted=function(){return p},this.abort=function(){p=!0,i.abort(),u.meta.aborted=!0,w(t.complete)&&t.complete(u),e=""},this.guessLineEndings=function(I,g){I=I.substring(0,1048576);var g=new RegExp(N(g)+"([^]*?)"+N(g),"gm"),D=(I=I.replace(g,"")).split("\r"),g=I.split(`
`),I=1<g.length&&g[0].length<D[0].length;if(D.length===1||I)return`
`;for(var U=0,R=0;R<D.length;R++)D[R][0]===`
`&&U++;return U>=D.length/2?`\r
`:"\r"}}function N(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function B(t){var e=(t=t||{}).delimiter,i=t.newline,o=t.comments,l=t.step,b=t.preview,F=t.fastMode,et=null,it=!1,y=t.quoteChar==null?'"':t.quoteChar,q=y;if(t.escapeChar!==void 0&&(q=t.escapeChar),(typeof e!="string"||-1<c.BAD_DELIMITERS.indexOf(e))&&(e=","),o===e)throw new Error("Comment character same as delimiter");o===!0?o="#":(typeof o!="string"||-1<c.BAD_DELIMITERS.indexOf(o))&&(o=!1),i!==`
`&&i!=="\r"&&i!==`\r
`&&(i=`
`);var h=0,J=!1;this.parse=function(p,v,u){if(typeof p!="string")throw new Error("Input must be a string");var j=p.length,M=e.length,W=i.length,st=o.length,S=w(l),A=[],D=[],g=[],I=h=0;if(!p)return Z();if(F||F!==!1&&p.indexOf(y)===-1){for(var U=p.split(i),R=0;R<U.length;R++){if(g=U[R],h+=g.length,R!==U.length-1)h+=i.length;else if(u)return Z();if(!o||g.substring(0,st)!==o){if(S){if(A=[],P(g.split(e)),lt(),J)return Z()}else P(g.split(e));if(b&&b<=R)return A=A.slice(0,b),Z(!0)}}return Z()}for(var x=p.indexOf(e,h),k=p.indexOf(i,h),Q=new RegExp(N(q)+N(y),"g"),E=p.indexOf(y,h);;)if(p[h]===y)for(E=h,h++;;){if((E=p.indexOf(y,E+1))===-1)return u||D.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:A.length,index:h}),nt();if(E===j-1)return nt(p.substring(h,E).replace(Q,y));if(y===q&&p[E+1]===q)E++;else if(y===q||E===0||p[E-1]!==q){x!==-1&&x<E+1&&(x=p.indexOf(e,E+1));var O=mt((k=k!==-1&&k<E+1?p.indexOf(i,E+1):k)===-1?x:Math.min(x,k));if(p.substr(E+1+O,M)===e){g.push(p.substring(h,E).replace(Q,y)),p[h=E+1+O+M]!==y&&(E=p.indexOf(y,h)),x=p.indexOf(e,h),k=p.indexOf(i,h);break}if(O=mt(k),p.substring(E+1+O,E+1+O+W)===i){if(g.push(p.substring(h,E).replace(Q,y)),gt(E+1+O+W),x=p.indexOf(e,h),E=p.indexOf(y,h),S&&(lt(),J))return Z();if(b&&A.length>=b)return Z(!0);break}D.push({type:"Quotes",code:"InvalidQuotes",message:"Trailing quote on quoted field is malformed",row:A.length,index:h}),E++}}else if(o&&g.length===0&&p.substring(h,h+st)===o){if(k===-1)return Z();h=k+W,k=p.indexOf(i,h),x=p.indexOf(e,h)}else if(x!==-1&&(x<k||k===-1))g.push(p.substring(h,x)),h=x+M,x=p.indexOf(e,h);else{if(k===-1)break;if(g.push(p.substring(h,k)),gt(k+W),S&&(lt(),J))return Z();if(b&&A.length>=b)return Z(!0)}return nt();function P(z){A.push(z),I=h}function mt(z){var Y=0;return Y=z!==-1&&(z=p.substring(E+1,z))&&z.trim()===""?z.length:Y}function nt(z){return u||(z===void 0&&(z=p.substring(h)),g.push(z),h=j,P(g),S&&lt()),Z()}function gt(z){h=z,P(g),g=[],k=p.indexOf(i,h)}function Z(z){if(t.header&&!v&&A.length&&!it){var Y=A[0],dt=Object.create(null),wt=new Set(Y);let xt=!1;for(let bt=0;bt<Y.length;bt++){let ot=Y[bt];if(dt[ot=w(t.transformHeader)?t.transformHeader(ot,bt):ot]){let kt,It=dt[ot];for(;kt=ot+"_"+It,It++,wt.has(kt););wt.add(kt),Y[bt]=kt,dt[ot]++,xt=!0,(et=et===null?{}:et)[kt]=ot}else dt[ot]=1,Y[bt]=ot;wt.add(ot)}xt&&console.warn("Duplicate headers found and renamed."),it=!0}return{data:A,errors:D,meta:{delimiter:e,linebreak:i,aborted:J,truncated:!!z,cursor:I+(v||0),renamedHeaders:et}}}function lt(){l(Z()),A=[],D=[]}},this.abort=function(){J=!0},this.getCharIndex=function(){return h}}function T(t){var e=t.data,i=H[e.workerId],o=!1;if(e.error)i.userError(e.error,e.file);else if(e.results&&e.results.data){var l={abort:function(){o=!0,K(e.workerId,{data:[],errors:[],meta:{aborted:!0}})},pause:ht,resume:ht};if(w(i.userStep)){for(var b=0;b<e.results.data.length&&(i.userStep({data:e.results.data[b],errors:e.results.errors,meta:e.results.meta},l),!o);b++);delete e.results}else w(i.userChunk)&&(i.userChunk(e.results,l,e.file),delete e.results)}e.finished&&!o&&K(e.workerId,e.results)}function K(t,e){var i=H[t];w(i.userComplete)&&i.userComplete(e),i.terminate(),delete H[t]}function ht(){throw new Error("Not implemented.")}function tt(t){if(typeof t!="object"||t===null)return t;var e,i=Array.isArray(t)?[]:{};for(e in t)i[e]=tt(t[e]);return i}function V(t,e){return function(){t.apply(e,arguments)}}function w(t){return typeof t=="function"}return c.parse=function(t,e){var i=(e=e||{}).dynamicTyping||!1;if(w(i)&&(e.dynamicTypingFunction=i,i={}),e.dynamicTyping=i,e.transform=!!w(e.transform)&&e.transform,!e.worker||!c.WORKERS_SUPPORTED)return i=null,c.NODE_STREAM_INPUT,typeof t=="string"?(t=(o=>o.charCodeAt(0)!==65279?o:o.slice(1))(t),i=new(e.download?X:rt)(e)):t.readable===!0&&w(t.read)&&w(t.on)?i=new a(e):(d.File&&t instanceof File||t instanceof Object)&&(i=new ct(e)),i.stream(t);(i=(()=>{var o;return!!c.WORKERS_SUPPORTED&&(o=(()=>{var l=d.URL||d.webkitURL||null,b=n.toString();return c.BLOB_URL||(c.BLOB_URL=l.createObjectURL(new Blob(["var global = (function() { if (typeof self !== 'undefined') { return self; } if (typeof window !== 'undefined') { return window; } if (typeof global !== 'undefined') { return global; } return {}; })(); global.IS_PAPA_WORKER=true; ","(",b,")();"],{type:"text/javascript"})))})(),(o=new d.Worker(o)).onmessage=T,o.id=G++,H[o.id]=o)})()).userStep=e.step,i.userChunk=e.chunk,i.userComplete=e.complete,i.userError=e.error,e.step=w(e.step),e.chunk=w(e.chunk),e.complete=w(e.complete),e.error=w(e.error),delete e.worker,i.postMessage({input:t,config:e,workerId:i.id})},c.unparse=function(t,e){var i=!1,o=!0,l=",",b=`\r
`,F='"',et=F+F,it=!1,y=null,q=!1,h=((()=>{if(typeof e=="object"){if(typeof e.delimiter!="string"||c.BAD_DELIMITERS.filter(function(v){return e.delimiter.indexOf(v)!==-1}).length||(l=e.delimiter),typeof e.quotes!="boolean"&&typeof e.quotes!="function"&&!Array.isArray(e.quotes)||(i=e.quotes),typeof e.skipEmptyLines!="boolean"&&typeof e.skipEmptyLines!="string"||(it=e.skipEmptyLines),typeof e.newline=="string"&&(b=e.newline),typeof e.quoteChar=="string"&&(F=e.quoteChar),typeof e.header=="boolean"&&(o=e.header),Array.isArray(e.columns)){if(e.columns.length===0)throw new Error("Option columns is empty");y=e.columns}e.escapeChar!==void 0&&(et=e.escapeChar+F),e.escapeFormulae instanceof RegExp?q=e.escapeFormulae:typeof e.escapeFormulae=="boolean"&&e.escapeFormulae&&(q=/^[=+\-@\t\r].*$/)}})(),new RegExp(N(F),"g"));if(typeof t=="string"&&(t=JSON.parse(t)),Array.isArray(t)){if(!t.length||Array.isArray(t[0]))return J(null,t,it);if(typeof t[0]=="object")return J(y||Object.keys(t[0]),t,it)}else if(typeof t=="object")return typeof t.data=="string"&&(t.data=JSON.parse(t.data)),Array.isArray(t.data)&&(t.fields||(t.fields=t.meta&&t.meta.fields||y),t.fields||(t.fields=Array.isArray(t.data[0])?t.fields:typeof t.data[0]=="object"?Object.keys(t.data[0]):[]),Array.isArray(t.data[0])||typeof t.data[0]=="object"||(t.data=[t.data])),J(t.fields||[],t.data||[],it);throw new Error("Unable to serialize unrecognized input");function J(v,u,j){var M="",W=(typeof v=="string"&&(v=JSON.parse(v)),typeof u=="string"&&(u=JSON.parse(u)),Array.isArray(v)&&0<v.length),st=!Array.isArray(u[0]);if(W&&o){for(var S=0;S<v.length;S++)0<S&&(M+=l),M+=p(v[S],S);0<u.length&&(M+=b)}for(var A=0;A<u.length;A++){var D=(W?v:u[A]).length,g=!1,I=W?Object.keys(u[A]).length===0:u[A].length===0;if(j&&!W&&(g=j==="greedy"?u[A].join("").trim()==="":u[A].length===1&&u[A][0].length===0),j==="greedy"&&W){for(var U=[],R=0;R<D;R++){var x=st?v[R]:R;U.push(u[A][x])}g=U.join("").trim()===""}if(!g){for(var k=0;k<D;k++){0<k&&!I&&(M+=l);var Q=W&&st?v[k]:k;M+=p(u[A][Q],k)}A<u.length-1&&(!j||0<D&&!I)&&(M+=b)}}return M}function p(v,u){var j,M;return v==null?"":v.constructor===Date?JSON.stringify(v).slice(1,25):(M=!1,q&&typeof v=="string"&&q.test(v)&&(v="'"+v,M=!0),j=v.toString().replace(h,et),(M=M||i===!0||typeof i=="function"&&i(v,u)||Array.isArray(i)&&i[u]||((W,st)=>{for(var S=0;S<st.length;S++)if(-1<W.indexOf(st[S]))return!0;return!1})(j,c.BAD_DELIMITERS)||-1<j.indexOf(l)||j.charAt(0)===" "||j.charAt(j.length-1)===" ")?F+j+F:j)}},c.RECORD_SEP="",c.UNIT_SEP="",c.BYTE_ORDER_MARK="\uFEFF",c.BAD_DELIMITERS=["\r",`
`,'"',c.BYTE_ORDER_MARK],c.WORKERS_SUPPORTED=!m&&!!d.Worker,c.NODE_STREAM_INPUT=1,c.LocalChunkSize=10485760,c.RemoteChunkSize=5242880,c.DefaultDelimiter=",",c.Parser=B,c.ParserHandle=_,c.NetworkStreamer=X,c.FileStreamer=ct,c.StringStreamer=rt,c.ReadableStreamStreamer=a,d.jQuery&&((f=d.jQuery).fn.parse=function(t){var e=t.config||{},i=[];return this.each(function(b){if(!(f(this).prop("tagName").toUpperCase()==="INPUT"&&f(this).attr("type").toLowerCase()==="file"&&d.FileReader)||!this.files||this.files.length===0)return!0;for(var F=0;F<this.files.length;F++)i.push({file:this.files[F],inputElem:this,instanceConfig:f.extend({},e)})}),o(),this;function o(){if(i.length===0)w(t.complete)&&t.complete();else{var b,F,et,it,y=i[0];if(w(t.before)){var q=t.before(y.file,y.inputElem);if(typeof q=="object"){if(q.action==="abort")return b="AbortError",F=y.file,et=y.inputElem,it=q.reason,void(w(t.error)&&t.error({name:b},F,et,it));if(q.action==="skip")return void l();typeof q.config=="object"&&(y.instanceConfig=f.extend(y.instanceConfig,q.config))}else if(q==="skip")return void l()}var h=y.instanceConfig.complete;y.instanceConfig.complete=function(J){w(h)&&h(J,y.file,y.inputElem),l()},c.parse(y.file,y.instanceConfig)}}function l(){i.splice(0,1),o()}}),$&&(d.onmessage=function(t){t=t.data,c.WORKER_ID===void 0&&t&&(c.WORKER_ID=t.workerId),typeof t.input=="string"?d.postMessage({workerId:c.WORKER_ID,results:c.parse(t.input,t.config),finished:!0}):(d.File&&t.input instanceof File||t.input instanceof Object)&&(t=c.parse(t.input,t.config))&&d.postMessage({workerId:c.WORKER_ID,results:t,finished:!0})}),(X.prototype=Object.create(C.prototype)).constructor=X,(ct.prototype=Object.create(C.prototype)).constructor=ct,(rt.prototype=Object.create(rt.prototype)).constructor=rt,(a.prototype=Object.create(C.prototype)).constructor=a,c})}(vt)),vt.exports}var $t=Lt();const _t=qt($t),Mt=document.getElementById("app");function Tt(){try{const s=JSON.parse(localStorage.getItem("srwdd-state"));if(s&&Array.isArray(s.pilots))return{pilots:s.pilots,skills:Array.isArray(s.skills)?s.skills:[]}}catch{}return{pilots:[],skills:[]}}function pt(){localStorage.setItem("srwdd-state",JSON.stringify({pilots:L.pilots.map(s=>s.data||s),skills:L.skills.map(s=>s.data||s)}))}let L=Tt(),ut="pilot",ft=null,yt=!1,At={pilot:{key:"id",dir:"asc"},skill:{key:"id",dir:"asc"}};function Et(s){return new Nt({data:s},L.skills)}function at(){var rt;const s=L.pilots.map(a=>a instanceof Nt?a:Et(a)),r=L.skills.map(a=>a instanceof St?a:new St({data:a}));L.pilots=s,L.skills=r,L.pilots.forEach(a=>{a.skillList=L.skills}),!ft&&s.length>0&&(ft=String(s[0].id));const n=s.find(a=>String(a.id)===String(ft)),d=(n==null?void 0:n.equippedSkillIds)||[],f=new Set(d.map(String)),m=(n==null?void 0:n.name)||"",$=r.map(a=>{const _=Array.isArray(a.pilotNames)?a.pilotNames:[],N=m&&_.some(B=>B.includes(m));return{skill:a,eligible:N}}),H=Number((rt=n==null?void 0:n.data)==null?void 0:rt.skillSlots)||0,G=d.length,c=At.pilot,C=At.skill,X=[...s].sort((a,_)=>Ot(a,_,c.key,c.dir)),ct=[...r].sort((a,_)=>Ot(a,_,C.key,C.dir));if(Mt.innerHTML=`
    <div class="app-shell">
      <nav class="navbar navbar-expand sticky-top app-navbar">
        <div class="container">
          <span class="navbar-brand app-title">SRWDD</span>
          <ul class="nav nav-pills app-tabs">
            <li class="nav-item">
              <button id="view-pilot" class="nav-link ${ut==="pilot"?"active":""}" type="button">パイロット</button>
            </li>
            <li class="nav-item">
              <button id="view-skill" class="nav-link ${ut==="skill"?"active":""}" type="button">スキル</button>
            </li>
          </ul>
        </div>
      </nav>
      <div class="container py-4 app-content">
    ${ut==="pilot"?`
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
          ${X.map((a,_)=>`
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
                <button class="pilot-delete btn btn-sm btn-danger" data-index="${_}" title="削除" aria-label="削除">
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
          ${ct.map((a,_)=>{var N;return`
            <tr>
              <td>${a.id||""}</td>
              <td>${a.name||""}</td>
              <td>${((N=a.pilotNames)==null?void 0:N.join(", "))||""}</td>
              <td>${a.effect||""}</td>
              <td>${a.attack||0}</td>
              <td>${a.defense||0}</td>
              <td>${a.accuracy||0}</td>
              <td>${a.mobility||0}</td>
              <td class="text-center">
                <button class="skill-delete btn btn-sm btn-danger" data-index="${_}" title="削除" aria-label="削除">
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
        <h2 class="h6 mb-0">スキル追加</h2>
      </div>
      <div class="card-body">
      <form id="skill-form" class="row g-3">
        <div class="col-12 col-md-4">
          <label class="form-label small">名前</label>
          <input name="name" placeholder="名前" required class="form-control" />
        </div>
        <div class="col-12 col-md-4">
          <label class="form-label small">対応パイロット</label>
          <input name="pilotNames" placeholder="対応パイロット（カンマ区切り可）" class="form-control" />
        </div>
        <div class="col-12 col-md-4">
          <label class="form-label small">その他効果</label>
          <input name="effect" placeholder="その他効果" class="form-control" />
        </div>
        <div class="col-6 col-md-3"><input name="attack" type="number" placeholder="攻撃" class="form-control" /></div>
        <div class="col-6 col-md-3"><input name="defense" type="number" placeholder="防御" class="form-control" /></div>
        <div class="col-6 col-md-3"><input name="accuracy" type="number" placeholder="照準" class="form-control" /></div>
        <div class="col-6 col-md-3"><input name="mobility" type="number" placeholder="運動" class="form-control" /></div>
        <div class="col-12">
          <button type="submit" class="btn btn-primary">追加</button>
        </div>
      </form>
      </div>
    </div>
    `}
    ${ut==="pilot"?`
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
                <input id="equip-slots" type="number" min="0" value="${H}" class="form-control" />
              </div>
              <div class="col-6 col-md-4 text-md-end">
                <span id="equip-count" class="badge text-bg-dark">${G}/${H}</span>
              </div>
            </div>
            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-2" id="equip-list">
              ${$.filter(({eligible:a})=>a).map(({skill:a},_)=>{const N=(a==null?void 0:a.id)??"",B=f.has(String(N))?"checked":"",T=(a==null?void 0:a.name)||"(名称未設定)",K=`equip-skill-${N||_}`;return`<div class="col equip-tile">
                  <input class="btn-check equip-skill" type="checkbox" id="${K}" value="${N}" ${B} />
                  <label class="btn btn-outline-dark w-100 text-start" for="${K}">${T}</label>
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
  `,document.getElementById("view-pilot").onclick=()=>{ut="pilot",yt=!1,at()},document.getElementById("view-skill").onclick=()=>{ut="skill",yt=!1,at()},ut==="pilot"){document.getElementById("pilot-csv").onchange=Ft,document.getElementById("export-pilot").onclick=jt,document.getElementById("pilot-form").onsubmit=Kt,document.querySelectorAll(".pilot-equip").forEach(T=>{T.onclick=()=>{ft=T.getAttribute("data-id"),yt=!0,at()}});const a=document.getElementById("equip-pilot"),_=document.getElementById("equip-slots"),N=document.getElementById("equip-modal"),B=document.getElementById("equip-count");if(N&&window.bootstrap){const T=window.bootstrap.Modal.getOrCreateInstance(N);yt&&T.show(),N.addEventListener("hidden.bs.modal",()=>{yt=!1})}a&&(a.onchange=()=>{ft=a.value,at()}),_&&(_.onchange=()=>{const T=L.pilots.find(V=>String(V.id)===String(ft));if(!T)return;T.data=T.data||{};const K=Number(_.value)||0;T.data.skillSlots=K;const ht=Array.from(document.querySelectorAll(".equip-skill:checked"));ht.length>K&&ht.slice(K).forEach(w=>{w.checked=!1});const tt=new Set(Array.from(document.querySelectorAll(".equip-skill:checked")).map(V=>String(V.value)));T.data.equippedSkillIds=Array.from(tt),pt(),B&&(B.textContent=`${tt.size}/${K}`)}),document.querySelectorAll(".equip-skill").forEach(T=>{T.onchange=()=>{var w;const K=L.pilots.find(t=>String(t.id)===String(ft));if(!K)return;const ht=Number((w=K.data)==null?void 0:w.skillSlots)||0,tt=new Set(K.equippedSkillIds.map(String)),V=T.value;if(T.checked){if(tt.size>=ht){T.checked=!1;return}tt.add(String(V))}else tt.delete(String(V));K.data=K.data||{},K.data.equippedSkillIds=Array.from(tt),pt(),B&&(B.textContent=`${tt.size}/${ht}`)}})}else document.getElementById("skill-csv").onchange=Ut,document.getElementById("export-skill").onclick=zt,document.getElementById("skill-form").onsubmit=Wt;document.querySelectorAll("th.sortable").forEach(a=>{a.style.cursor="pointer",a.onclick=()=>{const _=a.getAttribute("data-sort");if(!_)return;const B=At[ut==="pilot"?"pilot":"skill"];B.key===_?B.dir=B.dir==="asc"?"desc":"asc":(B.key=_,B.dir="asc"),at()}}),ut==="pilot"?document.querySelectorAll(".pilot-delete").forEach(a=>{a.onclick=()=>{const _=Number(a.getAttribute("data-index"));isNaN(_)||(L.pilots.splice(_,1),pt(),at())}}):document.querySelectorAll(".skill-delete").forEach(a=>{a.onclick=()=>{const _=Number(a.getAttribute("data-index"));isNaN(_)||(L.skills.splice(_,1),pt(),at())}})}function Ot(s,r,n,d){const f=Ct(s,n),m=Ct(r,n);return f<m?d==="asc"?-1:1:f>m?d==="asc"?1:-1:0}function Ct(s,r){const n=s==null?void 0:s[r];if(Array.isArray(n))return n.join(",");if(n==null)return"";const d=Number(n);return!isNaN(d)&&String(n).trim()!==""?d:String(n).toLowerCase()}function Ft(s){const r=s.target.files[0];r&&_t.parse(r,{header:!0,complete:n=>{L.pilots=n.data.map(d=>Et(Bt(d))),pt(),at()}})}function jt(){const s=_t.unparse(L.pilots.map(f=>Pt(f.data||f))),r=new Blob([s],{type:"text/csv"}),n=URL.createObjectURL(r),d=document.createElement("a");d.href=n,d.download="pilots.csv",d.click(),URL.revokeObjectURL(n)}function Pt(s){var r,n,d,f,m,$,H,G,c,C,X,ct,rt,a,_,N;return{id:s.id||"",name:s.name||"",baseAttack:((n=(r=s.status)==null?void 0:r.base)==null?void 0:n.attack)??0,baseDefense:((f=(d=s.status)==null?void 0:d.base)==null?void 0:f.defense)??0,baseAccuracy:(($=(m=s.status)==null?void 0:m.base)==null?void 0:$.accuracy)??0,baseMobility:((G=(H=s.status)==null?void 0:H.base)==null?void 0:G.mobility)??0,basicSkillAttack:((C=(c=s.status)==null?void 0:c.basicSkill)==null?void 0:C.attack)??0,basicSkillDefense:((ct=(X=s.status)==null?void 0:X.basicSkill)==null?void 0:ct.defense)??0,basicSkillAccuracy:((a=(rt=s.status)==null?void 0:rt.basicSkill)==null?void 0:a.accuracy)??0,basicSkillMobility:((N=(_=s.status)==null?void 0:_.basicSkill)==null?void 0:N.mobility)??0,skillSlots:s.skillSlots??0,equippedSkillIds:Array.isArray(s.equippedSkillIds)?s.equippedSkillIds.join(","):s.equippedSkillIds||""}}function Bt(s){const r={base:{attack:Number(s.baseAttack||s.attack||0),defense:Number(s.baseDefense||s.defense||0),accuracy:Number(s.baseAccuracy||s.accuracy||0),mobility:Number(s.baseMobility||s.mobility||0)},basicSkill:{attack:Number(s.basicSkillAttack||0),defense:Number(s.basicSkillDefense||0),accuracy:Number(s.basicSkillAccuracy||0),mobility:Number(s.basicSkillMobility||0)}};return{id:s.id||"",name:s.name||"",status:r,skillSlots:Number(s.skillSlots||0),equippedSkillIds:typeof s.equippedSkillIds=="string"?s.equippedSkillIds.split(",").map(n=>n.trim()).filter(Boolean):[]}}function Ut(s){const r=s.target.files[0];r&&_t.parse(r,{header:!0,complete:n=>{L.skills=n.data.map(d=>new St({data:d})),pt(),at()}})}function zt(){const s=_t.unparse(L.skills.map(f=>f.data||f)),r=new Blob([s],{type:"text/csv"}),n=URL.createObjectURL(r),d=document.createElement("a");d.href=n,d.download="skills.csv",d.click(),URL.revokeObjectURL(n)}function Kt(s){s.preventDefault();const r=s.target,n=new FormData(r),d=n.get("name")||"",f={base:{attack:Number(n.get("baseAttack"))||0,defense:Number(n.get("baseDefense"))||0,accuracy:Number(n.get("baseAccuracy"))||0,mobility:Number(n.get("baseMobility"))||0},basicSkill:{attack:Number(n.get("basicSkillAttack"))||0,defense:Number(n.get("basicSkillDefense"))||0,accuracy:Number(n.get("basicSkillAccuracy"))||0,mobility:Number(n.get("basicSkillMobility"))||0}},m=L.pilots.reduce((H,G)=>{var C;const c=Number(G.id||((C=G.data)==null?void 0:C.id));return!isNaN(c)&&c>H?c:H},0),$={id:String(m+1),name:d,status:f,skillSlots:0,equippedSkillIds:[]};L.pilots.push(Et($)),r.reset(),pt(),at()}function Wt(s){s.preventDefault();const r=s.target,n=new FormData(r),d=n.get("name")||"",f=n.get("pilotNames")||"",m=n.get("effect")||"",$=L.skills.reduce((G,c)=>{var X;const C=Number(c.id||((X=c.data)==null?void 0:X.id));return!isNaN(C)&&C>G?C:G},0),H={id:String($+1),name:d,pilotNames:f,effect:m,attack:Number(n.get("attack"))||0,defense:Number(n.get("defense"))||0,accuracy:Number(n.get("accuracy"))||0,mobility:Number(n.get("mobility"))||0};L.skills.push(new St({data:H})),r.reset(),pt(),at()}at();
