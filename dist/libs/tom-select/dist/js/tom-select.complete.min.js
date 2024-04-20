/**
* Tom Select v2.3.1
* Licensed under the Apache License, Version 2.0 (the "License");
*/
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).TomSelect=t()}(this,(function(){"use strict"
function e(e,t){e.split(/\s+/).forEach((e=>{t(e)}))}class t{constructor(){this._events=void 0,this._events={}}on(t,i){e(t,(e=>{const t=this._events[e]||[]
t.push(i),this._events[e]=t}))}off(t,i){var s=arguments.length
0!==s?e(t,(e=>{if(1===s)return void delete this._events[e]
const t=this._events[e]
void 0!==t&&(t.splice(t.indexOf(i),1),this._events[e]=t)})):this._events={}}trigger(t,...i){var s=this
e(t,(e=>{const t=s._events[e]
void 0!==t&&t.forEach((e=>{e.apply(s,i)}))}))}}const i=e=>(e=e.filter(Boolean)).length<2?e[0]||"":1==l(e)?"["+e.join("")+"]":"(?:"+e.join("|")+")",s=e=>{if(!o(e))return e.join("")
let t="",i=0
const s=()=>{i>1&&(t+="{"+i+"}")}
return e.forEach(((n,o)=>{n!==e[o-1]?(s(),t+=n,i=1):i++})),s(),t},n=e=>{let t=c(e)
return i(t)},o=e=>new Set(e).size!==e.length,r=e=>(e+"").replace(/([\$\(\)\*\+\.\?\[\]\^\{\|\}\\])/gu,"\\$1"),l=e=>e.reduce(((e,t)=>Math.max(e,a(t))),0),a=e=>c(e).length,c=e=>Array.from(e),d=e=>{if(1===e.length)return[[e]]
let t=[]
const i=e.substring(1)
return d(i).forEach((function(i){let s=i.slice(0)
s[0]=e.charAt(0)+s[0],t.push(s),s=i.slice(0),s.unshift(e.charAt(0)),t.push(s)})),t},u=[[0,65535]]
let p,h
const g={},f={"/":"⁄∕",0:"߀",a:"ⱥɐɑ",aa:"ꜳ",ae:"æǽǣ",ao:"ꜵ",au:"ꜷ",av:"ꜹꜻ",ay:"ꜽ",b:"ƀɓƃ",c:"ꜿƈȼↄ",d:"đɗɖᴅƌꮷԁɦ",e:"ɛǝᴇɇ",f:"ꝼƒ",g:"ǥɠꞡᵹꝿɢ",h:"ħⱨⱶɥ",i:"ɨı",j:"ɉȷ",k:"ƙⱪꝁꝃꝅꞣ",l:"łƚɫⱡꝉꝇꞁɭ",m:"ɱɯϻ",n:"ꞥƞɲꞑᴎлԉ",o:"øǿɔɵꝋꝍᴑ",oe:"œ",oi:"ƣ",oo:"ꝏ",ou:"ȣ",p:"ƥᵽꝑꝓꝕρ",q:"ꝗꝙɋ",r:"ɍɽꝛꞧꞃ",s:"ßȿꞩꞅʂ",t:"ŧƭʈⱦꞇ",th:"þ",tz:"ꜩ",u:"ʉ",v:"ʋꝟʌ",vy:"ꝡ",w:"ⱳ",y:"ƴɏỿ",z:"ƶȥɀⱬꝣ",hv:"ƕ"}
for(let e in f){let t=f[e]||""
for(let i=0;i<t.length;i++){let s=t.substring(i,i+1)
g[s]=e}}const v=new RegExp(Object.keys(g).join("|")+"|[̀-ͯ·ʾʼ]","gu"),m=(e,t="NFKD")=>e.normalize(t),y=e=>c(e).reduce(((e,t)=>e+O(t)),""),O=e=>(e=m(e).toLowerCase().replace(v,(e=>g[e]||"")),m(e,"NFC"))
const b=e=>{const t={},i=(e,i)=>{const s=t[e]||new Set,o=new RegExp("^"+n(s)+"$","iu")
i.match(o)||(s.add(r(i)),t[e]=s)}
for(let t of function*(e){for(const[t,i]of e)for(let e=t;e<=i;e++){let t=String.fromCharCode(e),i=y(t)
i!=t.toLowerCase()&&(i.length>3||0!=i.length&&(yield{folded:i,composed:t,code_point:e}))}}(e))i(t.folded,t.folded),i(t.folded,t.composed)
return t},w=e=>{const t=b(e),s={}
let o=[]
for(let e in t){let i=t[e]
i&&(s[e]=n(i)),e.length>1&&o.push(r(e))}o.sort(((e,t)=>t.length-e.length))
const l=i(o)
return h=new RegExp("^"+l,"u"),s},_=(e,t=1)=>(t=Math.max(t,e.length-1),i(d(e).map((e=>((e,t=1)=>{let i=0
return e=e.map((e=>(p[e]&&(i+=e.length),p[e]||e))),i>=t?s(e):""})(e,t))))),C=(e,t=!0)=>{let n=e.length>1?1:0
return i(e.map((e=>{let i=[]
const o=t?e.length():e.length()-1
for(let t=0;t<o;t++)i.push(_(e.substrs[t]||"",n))
return s(i)})))},S=(e,t)=>{for(const i of t){if(i.start!=e.start||i.end!=e.end)continue
if(i.substrs.join("")!==e.substrs.join(""))continue
let t=e.parts
const s=e=>{for(const i of t){if(i.start===e.start&&i.substr===e.substr)return!1
if(1!=e.length&&1!=i.length){if(e.start<i.start&&e.end>i.start)return!0
if(i.start<e.start&&i.end>e.start)return!0}}return!1}
if(!(i.parts.filter(s).length>0))return!0}return!1}
class I{constructor(){this.parts=[],this.substrs=[],this.start=0,this.end=0}add(e){e&&(this.parts.push(e),this.substrs.push(e.substr),this.start=Math.min(e.start,this.start),this.end=Math.max(e.end,this.end))}last(){return this.parts[this.parts.length-1]}length(){return this.parts.length}clone(e,t){let i=new I,s=JSON.parse(JSON.stringify(this.parts)),n=s.pop()
for(const e of s)i.add(e)
let o=t.substr.substring(0,e-n.start),r=o.length
return i.add({start:n.start,end:n.start+r,length:r,substr:o}),i}}const A=e=>{var t
void 0===p&&(p=w(t||u)),e=y(e)
let i="",s=[new I]
for(let t=0;t<e.length;t++){let n=e.substring(t).match(h)
const o=e.substring(t,t+1),r=n?n[0]:null
let l=[],a=new Set
for(const e of s){const i=e.last()
if(!i||1==i.length||i.end<=t)if(r){const i=r.length
e.add({start:t,end:t+i,length:i,substr:r}),a.add("1")}else e.add({start:t,end:t+1,length:1,substr:o}),a.add("2")
else if(r){let s=e.clone(t,i)
const n=r.length
s.add({start:t,end:t+n,length:n,substr:r}),l.push(s)}else a.add("3")}if(l.length>0){l=l.sort(((e,t)=>e.length()-t.length()))
for(let e of l)S(e,s)||s.push(e)}else if(t>0&&1==a.size&&!a.has("3")){i+=C(s,!1)
let e=new I
const t=s[0]
t&&e.add(t.last()),s=[e]}}return i+=C(s,!0),i},x=(e,t)=>{if(e)return e[t]},k=(e,t)=>{if(e){for(var i,s=t.split(".");(i=s.shift())&&(e=e[i]););return e}},F=(e,t,i)=>{var s,n
return e?(e+="",null==t.regex||-1===(n=e.search(t.regex))?0:(s=t.string.length/e.length,0===n&&(s+=.5),s*i)):0},L=(e,t)=>{var i=e[t]
if("function"==typeof i)return i
i&&!Array.isArray(i)&&(e[t]=[i])},E=(e,t)=>{if(Array.isArray(e))e.forEach(t)
else for(var i in e)e.hasOwnProperty(i)&&t(e[i],i)},T=(e,t)=>"number"==typeof e&&"number"==typeof t?e>t?1:e<t?-1:0:(e=y(e+"").toLowerCase())>(t=y(t+"").toLowerCase())?1:t>e?-1:0
class P{constructor(e,t){this.items=void 0,this.settings=void 0,this.items=e,this.settings=t||{diacritics:!0}}tokenize(e,t,i){if(!e||!e.length)return[]
const s=[],n=e.split(/\s+/)
var o
return i&&(o=new RegExp("^("+Object.keys(i).map(r).join("|")+"):(.*)$")),n.forEach((e=>{let i,n=null,l=null
o&&(i=e.match(o))&&(n=i[1],e=i[2]),e.length>0&&(l=this.settings.diacritics?A(e)||null:r(e),l&&t&&(l="\\b"+l)),s.push({string:e,regex:l?new RegExp(l,"iu"):null,field:n})})),s}getScoreFunction(e,t){var i=this.prepareSearch(e,t)
return this._getScoreFunction(i)}_getScoreFunction(e){const t=e.tokens,i=t.length
if(!i)return function(){return 0}
const s=e.options.fields,n=e.weights,o=s.length,r=e.getAttrFn
if(!o)return function(){return 1}
const l=1===o?function(e,t){const i=s[0].field
return F(r(t,i),e,n[i]||1)}:function(e,t){var i=0
if(e.field){const s=r(t,e.field)
!e.regex&&s?i+=1/o:i+=F(s,e,1)}else E(n,((s,n)=>{i+=F(r(t,n),e,s)}))
return i/o}
return 1===i?function(e){return l(t[0],e)}:"and"===e.options.conjunction?function(e){var s,n=0
for(let i of t){if((s=l(i,e))<=0)return 0
n+=s}return n/i}:function(e){var s=0
return E(t,(t=>{s+=l(t,e)})),s/i}}getSortFunction(e,t){var i=this.prepareSearch(e,t)
return this._getSortFunction(i)}_getSortFunction(e){var t,i=[]
const s=this,n=e.options,o=!e.query&&n.sort_empty?n.sort_empty:n.sort
if("function"==typeof o)return o.bind(this)
const r=function(t,i){return"$score"===t?i.score:e.getAttrFn(s.items[i.id],t)}
if(o)for(let t of o)(e.query||"$score"!==t.field)&&i.push(t)
if(e.query){t=!0
for(let e of i)if("$score"===e.field){t=!1
break}t&&i.unshift({field:"$score",direction:"desc"})}else i=i.filter((e=>"$score"!==e.field))
return i.length?function(e,t){var s,n
for(let o of i){if(n=o.field,s=("desc"===o.direction?-1:1)*T(r(n,e),r(n,t)))return s}return 0}:null}prepareSearch(e,t){const i={}
var s=Object.assign({},t)
if(L(s,"sort"),L(s,"sort_empty"),s.fields){L(s,"fields")
const e=[]
s.fields.forEach((t=>{"string"==typeof t&&(t={field:t,weight:1}),e.push(t),i[t.field]="weight"in t?t.weight:1})),s.fields=e}return{options:s,query:e.toLowerCase().trim(),tokens:this.tokenize(e,s.respect_word_boundaries,i),total:0,items:[],weights:i,getAttrFn:s.nesting?k:x}}search(e,t){var i,s,n=this
s=this.prepareSearch(e,t),t=s.options,e=s.query
const o=t.score||n._getScoreFunction(s)
e.length?E(n.items,((e,n)=>{i=o(e),(!1===t.filter||i>0)&&s.items.push({score:i,id:n})})):E(n.items,((e,t)=>{s.items.push({score:1,id:t})}))
const r=n._getSortFunction(s)
return r&&s.items.sort(r),s.total=s.items.length,"number"==typeof t.limit&&(s.items=s.items.slice(0,t.limit)),s}}const N=(e,t)=>{if(Array.isArray(e))e.forEach(t)
else for(var i in e)e.hasOwnProperty(i)&&t(e[i],i)},j=e=>{if(e.jquery)return e[0]
if(e instanceof HTMLElement)return e
if($(e)){var t=document.createElement("template")
return t.innerHTML=e.trim(),t.content.firstChild}return document.querySelector(e)},$=e=>"string"==typeof e&&e.indexOf("<")>-1,V=(e,t)=>{var i=document.createEvent("HTMLEvents")
i.initEvent(t,!0,!1),e.dispatchEvent(i)},q=(e,t)=>{Object.assign(e.style,t)},D=(e,...t)=>{var i=H(t);(e=M(e)).map((e=>{i.map((t=>{e.classList.add(t)}))}))},R=(e,...t)=>{var i=H(t);(e=M(e)).map((e=>{i.map((t=>{e.classList.remove(t)}))}))},H=e=>{var t=[]
return N(e,(e=>{"string"==typeof e&&(e=e.trim().split(/[\11\12\14\15\40]/)),Array.isArray(e)&&(t=t.concat(e))})),t.filter(Boolean)},M=e=>(Array.isArray(e)||(e=[e]),e),z=(e,t,i)=>{if(!i||i.contains(e))for(;e&&e.matches;){if(e.matches(t))return e
e=e.parentNode}},B=(e,t=0)=>t>0?e[e.length-1]:e[0],K=(e,t)=>{if(!e)return-1
t=t||e.nodeName
for(var i=0;e=e.previousElementSibling;)e.matches(t)&&i++
return i},Q=(e,t)=>{N(t,((t,i)=>{null==t?e.removeAttribute(i):e.setAttribute(i,""+t)}))},G=(e,t)=>{e.parentNode&&e.parentNode.replaceChild(t,e)},U=(e,t)=>{if(null===t)return
if("string"==typeof t){if(!t.length)return
t=new RegExp(t,"i")}const i=e=>3===e.nodeType?(e=>{var i=e.data.match(t)
if(i&&e.data.length>0){var s=document.createElement("span")
s.className="highlight"
var n=e.splitText(i.index)
n.splitText(i[0].length)
var o=n.cloneNode(!0)
return s.appendChild(o),G(n,s),1}return 0})(e):((e=>{1!==e.nodeType||!e.childNodes||/(script|style)/i.test(e.tagName)||"highlight"===e.className&&"SPAN"===e.tagName||Array.from(e.childNodes).forEach((e=>{i(e)}))})(e),0)
i(e)},J="undefined"!=typeof navigator&&/Mac/.test(navigator.userAgent)?"metaKey":"ctrlKey"
var W={options:[],optgroups:[],plugins:[],delimiter:",",splitOn:null,persist:!0,diacritics:!0,create:null,createOnBlur:!1,createFilter:null,highlight:!0,openOnFocus:!0,shouldOpen:null,maxOptions:50,maxItems:null,hideSelected:null,duplicates:!1,addPrecedence:!1,selectOnTab:!1,preload:null,allowEmptyOption:!1,refreshThrottle:300,loadThrottle:300,loadingClass:"loading",dataAttr:null,optgroupField:"optgroup",valueField:"value",labelField:"text",disabledField:"disabled",optgroupLabelField:"label",optgroupValueField:"value",lockOptgroupOrder:!1,sortField:"$order",searchField:["text"],searchConjunction:"and",mode:null,wrapperClass:"ts-wrapper",controlClass:"ts-control",dropdownClass:"ts-dropdown",dropdownContentClass:"ts-dropdown-content",itemClass:"item",optionClass:"option",dropdownParent:null,controlInput:'<input type="text" autocomplete="off" size="1" />',copyClassesToDropdown:!1,placeholder:null,hidePlaceholder:null,shouldLoad:function(e){return e.length>0},render:{}}
const X=e=>null==e?null:Y(e),Y=e=>"boolean"==typeof e?e?"1":"0":e+"",Z=e=>(e+"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"),ee=(e,t)=>{var i
return function(s,n){var o=this
i&&(o.loading=Math.max(o.loading-1,0),clearTimeout(i)),i=setTimeout((function(){i=null,o.loadedSearches[s]=!0,e.call(o,s,n)}),t)}},te=(e,t,i)=>{var s,n=e.trigger,o={}
for(s of(e.trigger=function(){var i=arguments[0]
if(-1===t.indexOf(i))return n.apply(e,arguments)
o[i]=arguments},i.apply(e,[]),e.trigger=n,t))s in o&&n.apply(e,o[s])},ie=(e,t=!1)=>{e&&(e.preventDefault(),t&&e.stopPropagation())},se=(e,t,i,s)=>{e.addEventListener(t,i,s)},ne=(e,t)=>!!t&&(!!t[e]&&1===(t.altKey?1:0)+(t.ctrlKey?1:0)+(t.shiftKey?1:0)+(t.metaKey?1:0)),oe=(e,t)=>{const i=e.getAttribute("id")
return i||(e.setAttribute("id",t),t)},re=e=>e.replace(/[\\"']/g,"\\$&"),le=(e,t)=>{t&&e.append(t)}
function ae(e,t){var i=Object.assign({},W,t),s=i.dataAttr,n=i.labelField,o=i.valueField,r=i.disabledField,l=i.optgroupField,a=i.optgroupLabelField,c=i.optgroupValueField,d=e.tagName.toLowerCase(),u=e.getAttribute("placeholder")||e.getAttribute("data-placeholder")
if(!u&&!i.allowEmptyOption){let t=e.querySelector('option[value=""]')
t&&(u=t.textContent)}var p={placeholder:u,options:[],optgroups:[],items:[],maxItems:null}
return"select"===d?(()=>{var t,d=p.options,u={},h=1
let g=0
var f=e=>{var t=Object.assign({},e.dataset),i=s&&t[s]
return"string"==typeof i&&i.length&&(t=Object.assign(t,JSON.parse(i))),t},v=(e,t)=>{var s=X(e.value)
if(null!=s&&(s||i.allowEmptyOption)){if(u.hasOwnProperty(s)){if(t){var a=u[s][l]
a?Array.isArray(a)?a.push(t):u[s][l]=[a,t]:u[s][l]=t}}else{var c=f(e)
c[n]=c[n]||e.textContent,c[o]=c[o]||s,c[r]=c[r]||e.disabled,c[l]=c[l]||t,c.$option=e,c.$order=c.$order||++g,u[s]=c,d.push(c)}e.selected&&p.items.push(s)}}
p.maxItems=e.hasAttribute("multiple")?null:1,N(e.children,(e=>{var i,s,n
"optgroup"===(t=e.tagName.toLowerCase())?((n=f(i=e))[a]=n[a]||i.getAttribute("label")||"",n[c]=n[c]||h++,n[r]=n[r]||i.disabled,n.$order=n.$order||++g,p.optgroups.push(n),s=n[c],N(i.children,(e=>{v(e,s)}))):"option"===t&&v(e)}))})():(()=>{const t=e.getAttribute(s)
if(t)p.options=JSON.parse(t),N(p.options,(e=>{p.items.push(e[o])}))
else{var r=e.value.trim()||""
if(!i.allowEmptyOption&&!r.length)return
const t=r.split(i.delimiter)
N(t,(e=>{const t={}
t[n]=e,t[o]=e,p.options.push(t)})),p.items=t}})(),Object.assign({},W,p,t)}var ce=0
class de extends(function(e){return e.plugins={},class extends e{constructor(...e){super(...e),this.plugins={names:[],settings:{},requested:{},loaded:{}}}static define(t,i){e.plugins[t]={name:t,fn:i}}initializePlugins(e){var t,i
const s=this,n=[]
if(Array.isArray(e))e.forEach((e=>{"string"==typeof e?n.push(e):(s.plugins.settings[e.name]=e.options,n.push(e.name))}))
else if(e)for(t in e)e.hasOwnProperty(t)&&(s.plugins.settings[t]=e[t],n.push(t))
for(;i=n.shift();)s.require(i)}loadPlugin(t){var i=this,s=i.plugins,n=e.plugins[t]
if(!e.plugins.hasOwnProperty(t))throw new Error('Unable to find "'+t+'" plugin')
s.requested[t]=!0,s.loaded[t]=n.fn.apply(i,[i.plugins.settings[t]||{}]),s.names.push(t)}require(e){var t=this,i=t.plugins
if(!t.plugins.loaded.hasOwnProperty(e)){if(i.requested[e])throw new Error('Plugin has circular dependency ("'+e+'")')
t.loadPlugin(e)}return i.loaded[e]}}}(t)){constructor(e,t){var i
super(),this.control_input=void 0,this.wrapper=void 0,this.dropdown=void 0,this.control=void 0,this.dropdown_content=void 0,this.focus_node=void 0,this.order=0,this.settings=void 0,this.input=void 0,this.tabIndex=void 0,this.is_select_tag=void 0,this.rtl=void 0,this.inputId=void 0,this._destroy=void 0,this.sifter=void 0,this.isOpen=!1,this.isDisabled=!1,this.isReadOnly=!1,this.isRequired=void 0,this.isInvalid=!1,this.isValid=!0,this.isLocked=!1,this.isFocused=!1,this.isInputHidden=!1,this.isSetup=!1,this.ignoreFocus=!1,this.ignoreHover=!1,this.hasOptions=!1,this.currentResults=void 0,this.lastValue="",this.caretPos=0,this.loading=0,this.loadedSearches={},this.activeOption=null,this.activeItems=[],this.optgroups={},this.options={},this.userOptions={},this.items=[],this.refreshTimeout=null,ce++
var s=j(e)
if(s.tomselect)throw new Error("Tom Select already initialized on this element")
s.tomselect=this,i=(window.getComputedStyle&&window.getComputedStyle(s,null)).getPropertyValue("direction")
const n=ae(s,t)
this.settings=n,this.input=s,this.tabIndex=s.tabIndex||0,this.is_select_tag="select"===s.tagName.toLowerCase(),this.rtl=/rtl/i.test(i),this.inputId=oe(s,"tomselect-"+ce),this.isRequired=s.required,this.sifter=new P(this.options,{diacritics:n.diacritics}),n.mode=n.mode||(1===n.maxItems?"single":"multi"),"boolean"!=typeof n.hideSelected&&(n.hideSelected="multi"===n.mode),"boolean"!=typeof n.hidePlaceholder&&(n.hidePlaceholder="multi"!==n.mode)
var o=n.createFilter
"function"!=typeof o&&("string"==typeof o&&(o=new RegExp(o)),o instanceof RegExp?n.createFilter=e=>o.test(e):n.createFilter=e=>this.settings.duplicates||!this.options[e]),this.initializePlugins(n.plugins),this.setupCallbacks(),this.setupTemplates()
const r=j("<div>"),l=j("<div>"),a=this._render("dropdown"),c=j('<div role="listbox" tabindex="-1">'),d=this.input.getAttribute("class")||"",u=n.mode
var p
if(D(r,n.wrapperClass,d,u),D(l,n.controlClass),le(r,l),D(a,n.dropdownClass,u),n.copyClassesToDropdown&&D(a,d),D(c,n.dropdownContentClass),le(a,c),j(n.dropdownParent||r).appendChild(a),$(n.controlInput)){p=j(n.controlInput)
E(["autocorrect","autocapitalize","autocomplete","spellcheck"],(e=>{s.getAttribute(e)&&Q(p,{[e]:s.getAttribute(e)})})),p.tabIndex=-1,l.appendChild(p),this.focus_node=p}else n.controlInput?(p=j(n.controlInput),this.focus_node=p):(p=j("<input/>"),this.focus_node=l)
this.wrapper=r,this.dropdown=a,this.dropdown_content=c,this.control=l,this.control_input=p,this.setup()}setup(){const e=this,t=e.settings,i=e.control_input,s=e.dropdown,n=e.dropdown_content,o=e.wrapper,l=e.control,a=e.input,c=e.focus_node,d={passive:!0},u=e.inputId+"-ts-dropdown"
Q(n,{id:u}),Q(c,{role:"combobox","aria-haspopup":"listbox","aria-expanded":"false","aria-controls":u})
const p=oe(c,e.inputId+"-ts-control"),h="label[for='"+(e=>e.replace(/['"\\]/g,"\\$&"))(e.inputId)+"']",g=document.querySelector(h),f=e.focus.bind(e)
if(g){se(g,"click",f),Q(g,{for:p})
const t=oe(g,e.inputId+"-ts-label")
Q(c,{"aria-labelledby":t}),Q(n,{"aria-labelledby":t})}if(o.style.width=a.style.width,e.plugins.names.length){const t="plugin-"+e.plugins.names.join(" plugin-")
D([o,s],t)}(null===t.maxItems||t.maxItems>1)&&e.is_select_tag&&Q(a,{multiple:"multiple"}),t.placeholder&&Q(i,{placeholder:t.placeholder}),!t.splitOn&&t.delimiter&&(t.splitOn=new RegExp("\\s*"+r(t.delimiter)+"+\\s*")),t.load&&t.loadThrottle&&(t.load=ee(t.load,t.loadThrottle)),se(s,"mousemove",(()=>{e.ignoreHover=!1})),se(s,"mouseenter",(t=>{var i=z(t.target,"[data-selectable]",s)
i&&e.onOptionHover(t,i)}),{capture:!0}),se(s,"click",(t=>{const i=z(t.target,"[data-selectable]")
i&&(e.onOptionSelect(t,i),ie(t,!0))})),se(l,"click",(t=>{var s=z(t.target,"[data-ts-item]",l)
s&&e.onItemSelect(t,s)?ie(t,!0):""==i.value&&(e.onClick(),ie(t,!0))})),se(c,"keydown",(t=>e.onKeyDown(t))),se(i,"keypress",(t=>e.onKeyPress(t))),se(i,"input",(t=>e.onInput(t))),se(c,"blur",(t=>e.onBlur(t))),se(c,"focus",(t=>e.onFocus(t))),se(i,"paste",(t=>e.onPaste(t)))
const v=t=>{const n=t.composedPath()[0]
if(!o.contains(n)&&!s.contains(n))return e.isFocused&&e.blur(),void e.inputState()
n==i&&e.isOpen?t.stopPropagation():ie(t,!0)},m=()=>{e.isOpen&&e.positionDropdown()}
se(document,"mousedown",v),se(window,"scroll",m,d),se(window,"resize",m,d),this._destroy=()=>{document.removeEventListener("mousedown",v),window.removeEventListener("scroll",m),window.removeEventListener("resize",m),g&&g.removeEventListener("click",f)},this.revertSettings={innerHTML:a.innerHTML,tabIndex:a.tabIndex},a.tabIndex=-1,a.insertAdjacentElement("afterend",e.wrapper),e.sync(!1),t.items=[],delete t.optgroups,delete t.options,se(a,"invalid",(()=>{e.isValid&&(e.isValid=!1,e.isInvalid=!0,e.refreshState())})),e.updateOriginalInput(),e.refreshItems(),e.close(!1),e.inputState(),e.isSetup=!0,a.disabled?e.disable():a.readOnly?e.setReadOnly(!0):e.enable(),e.on("change",this.onChange),D(a,"tomselected","ts-hidden-accessible"),e.trigger("initialize"),!0===t.preload&&e.preload()}setupOptions(e=[],t=[]){this.addOptions(e),E(t,(e=>{this.registerOptionGroup(e)}))}setupTemplates(){var e=this,t=e.settings.labelField,i=e.settings.optgroupLabelField,s={optgroup:e=>{let t=document.createElement("div")
return t.className="optgroup",t.appendChild(e.options),t},optgroup_header:(e,t)=>'<div class="optgroup-header">'+t(e[i])+"</div>",option:(e,i)=>"<div>"+i(e[t])+"</div>",item:(e,i)=>"<div>"+i(e[t])+"</div>",option_create:(e,t)=>'<div class="create">Add <strong>'+t(e.input)+"</strong>&hellip;</div>",no_results:()=>'<div class="no-results">No results found</div>',loading:()=>'<div class="spinner"></div>',not_loading:()=>{},dropdown:()=>"<div></div>"}
e.settings.render=Object.assign({},s,e.settings.render)}setupCallbacks(){var e,t,i={initialize:"onInitialize",change:"onChange",item_add:"onItemAdd",item_remove:"onItemRemove",item_select:"onItemSelect",clear:"onClear",option_add:"onOptionAdd",option_remove:"onOptionRemove",option_clear:"onOptionClear",optgroup_add:"onOptionGroupAdd",optgroup_remove:"onOptionGroupRemove",optgroup_clear:"onOptionGroupClear",dropdown_open:"onDropdownOpen",dropdown_close:"onDropdownClose",type:"onType",load:"onLoad",focus:"onFocus",blur:"onBlur"}
for(e in i)(t=this.settings[i[e]])&&this.on(e,t)}sync(e=!0){const t=this,i=e?ae(t.input,{delimiter:t.settings.delimiter}):t.settings
t.setupOptions(i.options,i.optgroups),t.setValue(i.items||[],!0),t.lastQuery=null}onClick(){var e=this
if(e.activeItems.length>0)return e.clearActiveItems(),void e.focus()
e.isFocused&&e.isOpen?e.blur():e.focus()}onMouseDown(){}onChange(){V(this.input,"input"),V(this.input,"change")}onPaste(e){var t=this
t.isInputHidden||t.isLocked?ie(e):t.settings.splitOn&&setTimeout((()=>{var e=t.inputValue()
if(e.match(t.settings.splitOn)){var i=e.trim().split(t.settings.splitOn)
E(i,(e=>{X(e)&&(this.options[e]?t.addItem(e):t.createItem(e))}))}}),0)}onKeyPress(e){var t=this
if(!t.isLocked){var i=String.fromCharCode(e.keyCode||e.which)
return t.settings.create&&"multi"===t.settings.mode&&i===t.settings.delimiter?(t.createItem(),void ie(e)):void 0}ie(e)}onKeyDown(e){var t=this
if(t.ignoreHover=!0,t.isLocked)9!==e.keyCode&&ie(e)
else{switch(e.keyCode){case 65:if(ne(J,e)&&""==t.control_input.value)return ie(e),void t.selectAll()
break
case 27:return t.isOpen&&(ie(e,!0),t.close()),void t.clearActiveItems()
case 40:if(!t.isOpen&&t.hasOptions)t.open()
else if(t.activeOption){let e=t.getAdjacent(t.activeOption,1)
e&&t.setActiveOption(e)}return void ie(e)
case 38:if(t.activeOption){let e=t.getAdjacent(t.activeOption,-1)
e&&t.setActiveOption(e)}return void ie(e)
case 13:return void(t.canSelect(t.activeOption)?(t.onOptionSelect(e,t.activeOption),ie(e)):(t.settings.create&&t.createItem()||document.activeElement==t.control_input&&t.isOpen)&&ie(e))
case 37:return void t.advanceSelection(-1,e)
case 39:return void t.advanceSelection(1,e)
case 9:return void(t.settings.selectOnTab&&(t.canSelect(t.activeOption)&&(t.onOptionSelect(e,t.activeOption),ie(e)),t.settings.create&&t.createItem()&&ie(e)))
case 8:case 46:return void t.deleteSelection(e)}t.isInputHidden&&!ne(J,e)&&ie(e)}}onInput(e){if(this.isLocked)return
const t=this.inputValue()
this.lastValue!==t&&(this.lastValue=t,""!=t?(this.refreshTimeout&&clearTimeout(this.refreshTimeout),this.refreshTimeout=((e,t)=>t>0?setTimeout(e,t):(e.call(null),null))((()=>{this.refreshTimeout=null,this._onInput()}),this.settings.refreshThrottle)):this._onInput())}_onInput(){const e=this.lastValue
this.settings.shouldLoad.call(this,e)&&this.load(e),this.refreshOptions(),this.trigger("type",e)}onOptionHover(e,t){this.ignoreHover||this.setActiveOption(t,!1)}onFocus(e){var t=this,i=t.isFocused
if(t.isDisabled||t.isReadOnly)return t.blur(),void ie(e)
t.ignoreFocus||(t.isFocused=!0,"focus"===t.settings.preload&&t.preload(),i||t.trigger("focus"),t.activeItems.length||(t.inputState(),t.refreshOptions(!!t.settings.openOnFocus)),t.refreshState())}onBlur(e){if(!1!==document.hasFocus()){var t=this
if(t.isFocused){t.isFocused=!1,t.ignoreFocus=!1
var i=()=>{t.close(),t.setActiveItem(),t.setCaret(t.items.length),t.trigger("blur")}
t.settings.create&&t.settings.createOnBlur?t.createItem(null,i):i()}}}onOptionSelect(e,t){var i,s=this
t.parentElement&&t.parentElement.matches("[data-disabled]")||(t.classList.contains("create")?s.createItem(null,(()=>{s.settings.closeAfterSelect&&s.close()})):void 0!==(i=t.dataset.value)&&(s.lastQuery=null,s.addItem(i),s.settings.closeAfterSelect&&s.close(),!s.settings.hideSelected&&e.type&&/click/.test(e.type)&&s.setActiveOption(t)))}canSelect(e){return!!(this.isOpen&&e&&this.dropdown_content.contains(e))}onItemSelect(e,t){var i=this
return!i.isLocked&&"multi"===i.settings.mode&&(ie(e),i.setActiveItem(t,e),!0)}canLoad(e){return!!this.settings.load&&!this.loadedSearches.hasOwnProperty(e)}load(e){const t=this
if(!t.canLoad(e))return
D(t.wrapper,t.settings.loadingClass),t.loading++
const i=t.loadCallback.bind(t)
t.settings.load.call(t,e,i)}loadCallback(e,t){const i=this
i.loading=Math.max(i.loading-1,0),i.lastQuery=null,i.clearActiveOption(),i.setupOptions(e,t),i.refreshOptions(i.isFocused&&!i.isInputHidden),i.loading||R(i.wrapper,i.settings.loadingClass),i.trigger("load",e,t)}preload(){var e=this.wrapper.classList
e.contains("preloaded")||(e.add("preloaded"),this.load(""))}setTextboxValue(e=""){var t=this.control_input
t.value!==e&&(t.value=e,V(t,"update"),this.lastValue=e)}getValue(){return this.is_select_tag&&this.input.hasAttribute("multiple")?this.items:this.items.join(this.settings.delimiter)}setValue(e,t){te(this,t?[]:["change"],(()=>{this.clear(t),this.addItems(e,t)}))}setMaxItems(e){0===e&&(e=null),this.settings.maxItems=e,this.refreshState()}setActiveItem(e,t){var i,s,n,o,r,l,a=this
if("single"!==a.settings.mode){if(!e)return a.clearActiveItems(),void(a.isFocused&&a.inputState())
if("click"===(i=t&&t.type.toLowerCase())&&ne("shiftKey",t)&&a.activeItems.length){for(l=a.getLastActive(),(n=Array.prototype.indexOf.call(a.control.children,l))>(o=Array.prototype.indexOf.call(a.control.children,e))&&(r=n,n=o,o=r),s=n;s<=o;s++)e=a.control.children[s],-1===a.activeItems.indexOf(e)&&a.setActiveItemClass(e)
ie(t)}else"click"===i&&ne(J,t)||"keydown"===i&&ne("shiftKey",t)?e.classList.contains("active")?a.removeActiveItem(e):a.setActiveItemClass(e):(a.clearActiveItems(),a.setActiveItemClass(e))
a.inputState(),a.isFocused||a.focus()}}setActiveItemClass(e){const t=this,i=t.control.querySelector(".last-active")
i&&R(i,"last-active"),D(e,"active last-active"),t.trigger("item_select",e),-1==t.activeItems.indexOf(e)&&t.activeItems.push(e)}removeActiveItem(e){var t=this.activeItems.indexOf(e)
this.activeItems.splice(t,1),R(e,"active")}clearActiveItems(){R(this.activeItems,"active"),this.activeItems=[]}setActiveOption(e,t=!0){e!==this.activeOption&&(this.clearActiveOption(),e&&(this.activeOption=e,Q(this.focus_node,{"aria-activedescendant":e.getAttribute("id")}),Q(e,{"aria-selected":"true"}),D(e,"active"),t&&this.scrollToOption(e)))}scrollToOption(e,t){if(!e)return
const i=this.dropdown_content,s=i.clientHeight,n=i.scrollTop||0,o=e.offsetHeight,r=e.getBoundingClientRect().top-i.getBoundingClientRect().top+n
r+o>s+n?this.scroll(r-s+o,t):r<n&&this.scroll(r,t)}scroll(e,t){const i=this.dropdown_content
t&&(i.style.scrollBehavior=t),i.scrollTop=e,i.style.scrollBehavior=""}clearActiveOption(){this.activeOption&&(R(this.activeOption,"active"),Q(this.activeOption,{"aria-selected":null})),this.activeOption=null,Q(this.focus_node,{"aria-activedescendant":null})}selectAll(){const e=this
if("single"===e.settings.mode)return
const t=e.controlChildren()
t.length&&(e.inputState(),e.close(),e.activeItems=t,E(t,(t=>{e.setActiveItemClass(t)})))}inputState(){var e=this
e.control.contains(e.control_input)&&(Q(e.control_input,{placeholder:e.settings.placeholder}),e.activeItems.length>0||!e.isFocused&&e.settings.hidePlaceholder&&e.items.length>0?(e.setTextboxValue(),e.isInputHidden=!0):(e.settings.hidePlaceholder&&e.items.length>0&&Q(e.control_input,{placeholder:""}),e.isInputHidden=!1),e.wrapper.classList.toggle("input-hidden",e.isInputHidden))}inputValue(){return this.control_input.value.trim()}focus(){var e=this
e.isDisabled||e.isReadOnly||(e.ignoreFocus=!0,e.control_input.offsetWidth?e.control_input.focus():e.focus_node.focus(),setTimeout((()=>{e.ignoreFocus=!1,e.onFocus()}),0))}blur(){this.focus_node.blur(),this.onBlur()}getScoreFunction(e){return this.sifter.getScoreFunction(e,this.getSearchOptions())}getSearchOptions(){var e=this.settings,t=e.sortField
return"string"==typeof e.sortField&&(t=[{field:e.sortField}]),{fields:e.searchField,conjunction:e.searchConjunction,sort:t,nesting:e.nesting}}search(e){var t,i,s=this,n=this.getSearchOptions()
if(s.settings.score&&"function"!=typeof(i=s.settings.score.call(s,e)))throw new Error('Tom Select "score" setting must be a function that returns a function')
return e!==s.lastQuery?(s.lastQuery=e,t=s.sifter.search(e,Object.assign(n,{score:i})),s.currentResults=t):t=Object.assign({},s.currentResults),s.settings.hideSelected&&(t.items=t.items.filter((e=>{let t=X(e.id)
return!(t&&-1!==s.items.indexOf(t))}))),t}refreshOptions(e=!0){var t,i,s,n,o,r,l,a,c,d
const u={},p=[]
var h=this,g=h.inputValue()
const f=g===h.lastQuery||""==g&&null==h.lastQuery
var v=h.search(g),m=null,y=h.settings.shouldOpen||!1,O=h.dropdown_content
f&&(m=h.activeOption)&&(c=m.closest("[data-group]")),n=v.items.length,"number"==typeof h.settings.maxOptions&&(n=Math.min(n,h.settings.maxOptions)),n>0&&(y=!0)
const b=(e,t)=>{let i=u[e]
if(void 0!==i){let e=p[i]
if(void 0!==e)return[i,e.fragment]}let s=document.createDocumentFragment()
return i=p.length,p.push({fragment:s,order:t,optgroup:e}),[i,s]}
for(t=0;t<n;t++){let e=v.items[t]
if(!e)continue
let n=e.id,l=h.options[n]
if(void 0===l)continue
let a=Y(n),d=h.getOption(a,!0)
for(h.settings.hideSelected||d.classList.toggle("selected",h.items.includes(a)),o=l[h.settings.optgroupField]||"",i=0,s=(r=Array.isArray(o)?o:[o])&&r.length;i<s;i++){o=r[i]
let e=l.$order,t=h.optgroups[o]
void 0===t?o="":e=t.$order
const[s,a]=b(o,e)
i>0&&(d=d.cloneNode(!0),Q(d,{id:l.$id+"-clone-"+i,"aria-selected":null}),d.classList.add("ts-cloned"),R(d,"active"),h.activeOption&&h.activeOption.dataset.value==n&&c&&c.dataset.group===o.toString()&&(m=d)),a.appendChild(d),""!=o&&(u[o]=s)}}var w
h.settings.lockOptgroupOrder&&p.sort(((e,t)=>e.order-t.order)),l=document.createDocumentFragment(),E(p,(e=>{let t=e.fragment,i=e.optgroup
if(!t||!t.children.length)return
let s=h.optgroups[i]
if(void 0!==s){let e=document.createDocumentFragment(),i=h.render("optgroup_header",s)
le(e,i),le(e,t)
let n=h.render("optgroup",{group:s,options:e})
le(l,n)}else le(l,t)})),O.innerHTML="",le(O,l),h.settings.highlight&&(w=O.querySelectorAll("span.highlight"),Array.prototype.forEach.call(w,(function(e){var t=e.parentNode
t.replaceChild(e.firstChild,e),t.normalize()})),v.query.length&&v.tokens.length&&E(v.tokens,(e=>{U(O,e.regex)})))
var _=e=>{let t=h.render(e,{input:g})
return t&&(y=!0,O.insertBefore(t,O.firstChild)),t}
if(h.loading?_("loading"):h.settings.shouldLoad.call(h,g)?0===v.items.length&&_("no_results"):_("not_loading"),(a=h.canCreate(g))&&(d=_("option_create")),h.hasOptions=v.items.length>0||a,y){if(v.items.length>0){if(m||"single"!==h.settings.mode||null==h.items[0]||(m=h.getOption(h.items[0])),!O.contains(m)){let e=0
d&&!h.settings.addPrecedence&&(e=1),m=h.selectable()[e]}}else d&&(m=d)
e&&!h.isOpen&&(h.open(),h.scrollToOption(m,"auto")),h.setActiveOption(m)}else h.clearActiveOption(),e&&h.isOpen&&h.close(!1)}selectable(){return this.dropdown_content.querySelectorAll("[data-selectable]")}addOption(e,t=!1){const i=this
if(Array.isArray(e))return i.addOptions(e,t),!1
const s=X(e[i.settings.valueField])
return null!==s&&!i.options.hasOwnProperty(s)&&(e.$order=e.$order||++i.order,e.$id=i.inputId+"-opt-"+e.$order,i.options[s]=e,i.lastQuery=null,t&&(i.userOptions[s]=t,i.trigger("option_add",s,e)),s)}addOptions(e,t=!1){E(e,(e=>{this.addOption(e,t)}))}registerOption(e){return this.addOption(e)}registerOptionGroup(e){var t=X(e[this.settings.optgroupValueField])
return null!==t&&(e.$order=e.$order||++this.order,this.optgroups[t]=e,t)}addOptionGroup(e,t){var i
t[this.settings.optgroupValueField]=e,(i=this.registerOptionGroup(t))&&this.trigger("optgroup_add",i,t)}removeOptionGroup(e){this.optgroups.hasOwnProperty(e)&&(delete this.optgroups[e],this.clearCache(),this.trigger("optgroup_remove",e))}clearOptionGroups(){this.optgroups={},this.clearCache(),this.trigger("optgroup_clear")}updateOption(e,t){const i=this
var s,n
const o=X(e),r=X(t[i.settings.valueField])
if(null===o)return
const l=i.options[o]
if(null==l)return
if("string"!=typeof r)throw new Error("Value must be set in option data")
const a=i.getOption(o),c=i.getItem(o)
if(t.$order=t.$order||l.$order,delete i.options[o],i.uncacheValue(r),i.options[r]=t,a){if(i.dropdown_content.contains(a)){const e=i._render("option",t)
G(a,e),i.activeOption===a&&i.setActiveOption(e)}a.remove()}c&&(-1!==(n=i.items.indexOf(o))&&i.items.splice(n,1,r),s=i._render("item",t),c.classList.contains("active")&&D(s,"active"),G(c,s)),i.lastQuery=null}removeOption(e,t){const i=this
e=Y(e),i.uncacheValue(e),delete i.userOptions[e],delete i.options[e],i.lastQuery=null,i.trigger("option_remove",e),i.removeItem(e,t)}clearOptions(e){const t=(e||this.clearFilter).bind(this)
this.loadedSearches={},this.userOptions={},this.clearCache()
const i={}
E(this.options,((e,s)=>{t(e,s)&&(i[s]=e)})),this.options=this.sifter.items=i,this.lastQuery=null,this.trigger("option_clear")}clearFilter(e,t){return this.items.indexOf(t)>=0}getOption(e,t=!1){const i=X(e)
if(null===i)return null
const s=this.options[i]
if(null!=s){if(s.$div)return s.$div
if(t)return this._render("option",s)}return null}getAdjacent(e,t,i="option"){var s
if(!e)return null
s="item"==i?this.controlChildren():this.dropdown_content.querySelectorAll("[data-selectable]")
for(let i=0;i<s.length;i++)if(s[i]==e)return t>0?s[i+1]:s[i-1]
return null}getItem(e){if("object"==typeof e)return e
var t=X(e)
return null!==t?this.control.querySelector(`[data-value="${re(t)}"]`):null}addItems(e,t){var i=this,s=Array.isArray(e)?e:[e]
const n=(s=s.filter((e=>-1===i.items.indexOf(e))))[s.length-1]
s.forEach((e=>{i.isPending=e!==n,i.addItem(e,t)}))}addItem(e,t){te(this,t?[]:["change","dropdown_close"],(()=>{var i,s
const n=this,o=n.settings.mode,r=X(e)
if((!r||-1===n.items.indexOf(r)||("single"===o&&n.close(),"single"!==o&&n.settings.duplicates))&&null!==r&&n.options.hasOwnProperty(r)&&("single"===o&&n.clear(t),"multi"!==o||!n.isFull())){if(i=n._render("item",n.options[r]),n.control.contains(i)&&(i=i.cloneNode(!0)),s=n.isFull(),n.items.splice(n.caretPos,0,r),n.insertAtCaret(i),n.isSetup){if(!n.isPending&&n.settings.hideSelected){let e=n.getOption(r),t=n.getAdjacent(e,1)
t&&n.setActiveOption(t)}n.isPending||n.settings.closeAfterSelect||n.refreshOptions(n.isFocused&&"single"!==o),0!=n.settings.closeAfterSelect&&n.isFull()?n.close():n.isPending||n.positionDropdown(),n.trigger("item_add",r,i),n.isPending||n.updateOriginalInput({silent:t})}(!n.isPending||!s&&n.isFull())&&(n.inputState(),n.refreshState())}}))}removeItem(e=null,t){const i=this
if(!(e=i.getItem(e)))return
var s,n
const o=e.dataset.value
s=K(e),e.remove(),e.classList.contains("active")&&(n=i.activeItems.indexOf(e),i.activeItems.splice(n,1),R(e,"active")),i.items.splice(s,1),i.lastQuery=null,!i.settings.persist&&i.userOptions.hasOwnProperty(o)&&i.removeOption(o,t),s<i.caretPos&&i.setCaret(i.caretPos-1),i.updateOriginalInput({silent:t}),i.refreshState(),i.positionDropdown(),i.trigger("item_remove",o,e)}createItem(e=null,t=(()=>{})){3===arguments.length&&(t=arguments[2]),"function"!=typeof t&&(t=()=>{})
var i,s=this,n=s.caretPos
if(e=e||s.inputValue(),!s.canCreate(e))return t(),!1
s.lock()
var o=!1,r=e=>{if(s.unlock(),!e||"object"!=typeof e)return t()
var i=X(e[s.settings.valueField])
if("string"!=typeof i)return t()
s.setTextboxValue(),s.addOption(e,!0),s.setCaret(n),s.addItem(i),t(e),o=!0}
return i="function"==typeof s.settings.create?s.settings.create.call(this,e,r):{[s.settings.labelField]:e,[s.settings.valueField]:e},o||r(i),!0}refreshItems(){var e=this
e.lastQuery=null,e.isSetup&&e.addItems(e.items),e.updateOriginalInput(),e.refreshState()}refreshState(){const e=this
e.refreshValidityState()
const t=e.isFull(),i=e.isLocked
e.wrapper.classList.toggle("rtl",e.rtl)
const s=e.wrapper.classList
var n
s.toggle("focus",e.isFocused),s.toggle("disabled",e.isDisabled),s.toggle("readonly",e.isReadOnly),s.toggle("required",e.isRequired),s.toggle("invalid",!e.isValid),s.toggle("locked",i),s.toggle("full",t),s.toggle("input-active",e.isFocused&&!e.isInputHidden),s.toggle("dropdown-active",e.isOpen),s.toggle("has-options",(n=e.options,0===Object.keys(n).length)),s.toggle("has-items",e.items.length>0)}refreshValidityState(){var e=this
e.input.validity&&(e.isValid=e.input.validity.valid,e.isInvalid=!e.isValid)}isFull(){return null!==this.settings.maxItems&&this.items.length>=this.settings.maxItems}updateOriginalInput(e={}){const t=this
var i,s
const n=t.input.querySelector('option[value=""]')
if(t.is_select_tag){const o=[],r=t.input.querySelectorAll("option:checked").length
function l(e,i,s){return e||(e=j('<option value="'+Z(i)+'">'+Z(s)+"</option>")),e!=n&&t.input.append(e),o.push(e),(e!=n||r>0)&&(e.selected=!0),e}t.input.querySelectorAll("option:checked").forEach((e=>{e.selected=!1})),0==t.items.length&&"single"==t.settings.mode?l(n,"",""):t.items.forEach((e=>{if(i=t.options[e],s=i[t.settings.labelField]||"",o.includes(i.$option)){l(t.input.querySelector(`option[value="${re(e)}"]:not(:checked)`),e,s)}else i.$option=l(i.$option,e,s)}))}else t.input.value=t.getValue()
t.isSetup&&(e.silent||t.trigger("change",t.getValue()))}open(){var e=this
e.isLocked||e.isOpen||"multi"===e.settings.mode&&e.isFull()||(e.isOpen=!0,Q(e.focus_node,{"aria-expanded":"true"}),e.refreshState(),q(e.dropdown,{visibility:"hidden",display:"block"}),e.positionDropdown(),q(e.dropdown,{visibility:"visible",display:"block"}),e.focus(),e.trigger("dropdown_open",e.dropdown))}close(e=!0){var t=this,i=t.isOpen
e&&(t.setTextboxValue(),"single"===t.settings.mode&&t.items.length&&t.inputState()),t.isOpen=!1,Q(t.focus_node,{"aria-expanded":"false"}),q(t.dropdown,{display:"none"}),t.settings.hideSelected&&t.clearActiveOption(),t.refreshState(),i&&t.trigger("dropdown_close",t.dropdown)}positionDropdown(){if("body"===this.settings.dropdownParent){var e=this.control,t=e.getBoundingClientRect(),i=e.offsetHeight+t.top+window.scrollY,s=t.left+window.scrollX
q(this.dropdown,{width:t.width+"px",top:i+"px",left:s+"px"})}}clear(e){var t=this
if(t.items.length){var i=t.controlChildren()
E(i,(e=>{t.removeItem(e,!0)})),t.inputState(),e||t.updateOriginalInput(),t.trigger("clear")}}insertAtCaret(e){const t=this,i=t.caretPos,s=t.control
s.insertBefore(e,s.children[i]||null),t.setCaret(i+1)}deleteSelection(e){var t,i,s,n,o,r=this
t=e&&8===e.keyCode?-1:1,i={start:(o=r.control_input).selectionStart||0,length:(o.selectionEnd||0)-(o.selectionStart||0)}
const l=[]
if(r.activeItems.length)n=B(r.activeItems,t),s=K(n),t>0&&s++,E(r.activeItems,(e=>l.push(e)))
else if((r.isFocused||"single"===r.settings.mode)&&r.items.length){const e=r.controlChildren()
let s
t<0&&0===i.start&&0===i.length?s=e[r.caretPos-1]:t>0&&i.start===r.inputValue().length&&(s=e[r.caretPos]),void 0!==s&&l.push(s)}if(!r.shouldDelete(l,e))return!1
for(ie(e,!0),void 0!==s&&r.setCaret(s);l.length;)r.removeItem(l.pop())
return r.inputState(),r.positionDropdown(),r.refreshOptions(!1),!0}shouldDelete(e,t){const i=e.map((e=>e.dataset.value))
return!(!i.length||"function"==typeof this.settings.onDelete&&!1===this.settings.onDelete(i,t))}advanceSelection(e,t){var i,s,n=this
n.rtl&&(e*=-1),n.inputValue().length||(ne(J,t)||ne("shiftKey",t)?(s=(i=n.getLastActive(e))?i.classList.contains("active")?n.getAdjacent(i,e,"item"):i:e>0?n.control_input.nextElementSibling:n.control_input.previousElementSibling)&&(s.classList.contains("active")&&n.removeActiveItem(i),n.setActiveItemClass(s)):n.moveCaret(e))}moveCaret(e){}getLastActive(e){let t=this.control.querySelector(".last-active")
if(t)return t
var i=this.control.querySelectorAll(".active")
return i?B(i,e):void 0}setCaret(e){this.caretPos=this.items.length}controlChildren(){return Array.from(this.control.querySelectorAll("[data-ts-item]"))}lock(){this.setLocked(!0)}unlock(){this.setLocked(!1)}setLocked(e=this.isReadOnly||this.isDisabled){this.isLocked=e,this.refreshState()}disable(){this.setDisabled(!0),this.close()}enable(){this.setDisabled(!1)}setDisabled(e){this.focus_node.tabIndex=e?-1:this.tabIndex,this.isDisabled=e,this.input.disabled=e,this.control_input.disabled=e,this.setLocked()}setReadOnly(e){this.isReadOnly=e,this.input.readOnly=e,this.control_input.readOnly=e,this.setLocked()}destroy(){var e=this,t=e.revertSettings
e.trigger("destroy"),e.off(),e.wrapper.remove(),e.dropdown.remove(),e.input.innerHTML=t.innerHTML,e.input.tabIndex=t.tabIndex,R(e.input,"tomselected","ts-hidden-accessible"),e._destroy(),delete e.input.tomselect}render(e,t){var i,s
const n=this
if("function"!=typeof this.settings.render[e])return null
if(!(s=n.settings.render[e].call(this,t,Z)))return null
if(s=j(s),"option"===e||"option_create"===e?t[n.settings.disabledField]?Q(s,{"aria-disabled":"true"}):Q(s,{"data-selectable":""}):"optgroup"===e&&(i=t.group[n.settings.optgroupValueField],Q(s,{"data-group":i}),t.group[n.settings.disabledField]&&Q(s,{"data-disabled":""})),"option"===e||"item"===e){const i=Y(t[n.settings.valueField])
Q(s,{"data-value":i}),"item"===e?(D(s,n.settings.itemClass),Q(s,{"data-ts-item":""})):(D(s,n.settings.optionClass),Q(s,{role:"option",id:t.$id}),t.$div=s,n.options[i]=t)}return s}_render(e,t){const i=this.render(e,t)
if(null==i)throw"HTMLElement expected"
return i}clearCache(){E(this.options,(e=>{e.$div&&(e.$div.remove(),delete e.$div)}))}uncacheValue(e){const t=this.getOption(e)
t&&t.remove()}canCreate(e){return this.settings.create&&e.length>0&&this.settings.createFilter.call(this,e)}hook(e,t,i){var s=this,n=s[t]
s[t]=function(){var t,o
return"after"===e&&(t=n.apply(s,arguments)),o=i.apply(s,arguments),"instead"===e?o:("before"===e&&(t=n.apply(s,arguments)),t)}}}return de.define("change_listener",(function(){se(this.input,"change",(()=>{this.sync()}))})),de.define("checkbox_options",(function(e){var t=this,i=t.onOptionSelect
t.settings.hideSelected=!1
const s=Object.assign({className:"tomselect-checkbox",checkedClassNames:void 0,uncheckedClassNames:void 0},e)
var n=function(e,t){t?(e.checked=!0,s.uncheckedClassNames&&e.classList.remove(...s.uncheckedClassNames),s.checkedClassNames&&e.classList.add(...s.checkedClassNames)):(e.checked=!1,s.checkedClassNames&&e.classList.remove(...s.checkedClassNames),s.uncheckedClassNames&&e.classList.add(...s.uncheckedClassNames))},o=function(e){setTimeout((()=>{var t=e.querySelector("input."+s.className)
t instanceof HTMLInputElement&&n(t,e.classList.contains("selected"))}),1)}
t.hook("after","setupTemplates",(()=>{var e=t.settings.render.option
t.settings.render.option=(i,o)=>{var r=j(e.call(t,i,o)),l=document.createElement("input")
s.className&&l.classList.add(s.className),l.addEventListener("click",(function(e){ie(e)})),l.type="checkbox"
const a=X(i[t.settings.valueField])
return n(l,!!(a&&t.items.indexOf(a)>-1)),r.prepend(l),r}})),t.on("item_remove",(e=>{var i=t.getOption(e)
i&&(i.classList.remove("selected"),o(i))})),t.on("item_add",(e=>{var i=t.getOption(e)
i&&o(i)})),t.hook("instead","onOptionSelect",((e,s)=>{if(s.classList.contains("selected"))return s.classList.remove("selected"),t.removeItem(s.dataset.value),t.refreshOptions(),void ie(e,!0)
i.call(t,e,s),o(s)}))})),de.define("clear_button",(function(e){const t=this,i=Object.assign({className:"clear-button",title:"Clear All",html:e=>`<div class="${e.className}" title="${e.title}">&#10799;</div>`},e)
t.on("initialize",(()=>{var e=j(i.html(i))
e.addEventListener("click",(e=>{t.isLocked||(t.clear(),"single"===t.settings.mode&&t.settings.allowEmptyOption&&t.addItem(""),e.preventDefault(),e.stopPropagation())})),t.control.appendChild(e)}))})),de.define("drag_drop",(function(){var e=this
if("multi"!==e.settings.mode)return
var t=e.lock,i=e.unlock
let s,n=!0
e.hook("after","setupTemplates",(()=>{var t=e.settings.render.item
e.settings.render.item=(i,o)=>{const r=j(t.call(e,i,o))
Q(r,{draggable:"true"})
const l=e=>{e.preventDefault(),r.classList.add("ts-drag-over"),a(r,s)},a=(e,t)=>{var i,s,n
void 0!==t&&(((e,t)=>{do{var i
if(e==(t=null==(i=t)?void 0:i.previousElementSibling))return!0}while(t&&t.previousElementSibling)
return!1})(t,r)?(s=t,null==(n=(i=e).parentNode)||n.insertBefore(s,i.nextSibling)):((e,t)=>{var i
null==(i=e.parentNode)||i.insertBefore(t,e)})(e,t))}
return se(r,"mousedown",(e=>{n||ie(e),e.stopPropagation()})),se(r,"dragstart",(e=>{s=r,setTimeout((()=>{r.classList.add("ts-dragging")}),0)})),se(r,"dragenter",l),se(r,"dragover",l),se(r,"dragleave",(()=>{r.classList.remove("ts-drag-over")})),se(r,"dragend",(()=>{var t
document.querySelectorAll(".ts-drag-over").forEach((e=>e.classList.remove("ts-drag-over"))),null==(t=s)||t.classList.remove("ts-dragging"),s=void 0
var i=[]
e.control.querySelectorAll("[data-value]").forEach((e=>{if(e.dataset.value){let t=e.dataset.value
t&&i.push(t)}})),e.setValue(i)})),r}})),e.hook("instead","lock",(()=>(n=!1,t.call(e)))),e.hook("instead","unlock",(()=>(n=!0,i.call(e))))})),de.define("dropdown_header",(function(e){const t=this,i=Object.assign({title:"Untitled",headerClass:"dropdown-header",titleRowClass:"dropdown-header-title",labelClass:"dropdown-header-label",closeClass:"dropdown-header-close",html:e=>'<div class="'+e.headerClass+'"><div class="'+e.titleRowClass+'"><span class="'+e.labelClass+'">'+e.title+'</span><a class="'+e.closeClass+'">&times;</a></div></div>'},e)
t.on("initialize",(()=>{var e=j(i.html(i)),s=e.querySelector("."+i.closeClass)
s&&s.addEventListener("click",(e=>{ie(e,!0),t.close()})),t.dropdown.insertBefore(e,t.dropdown.firstChild)}))})),de.define("caret_position",(function(){var e=this
e.hook("instead","setCaret",(t=>{"single"!==e.settings.mode&&e.control.contains(e.control_input)?(t=Math.max(0,Math.min(e.items.length,t)))==e.caretPos||e.isPending||e.controlChildren().forEach(((i,s)=>{s<t?e.control_input.insertAdjacentElement("beforebegin",i):e.control.appendChild(i)})):t=e.items.length,e.caretPos=t})),e.hook("instead","moveCaret",(t=>{if(!e.isFocused)return
const i=e.getLastActive(t)
if(i){const s=K(i)
e.setCaret(t>0?s+1:s),e.setActiveItem(),R(i,"last-active")}else e.setCaret(e.caretPos+t)}))})),de.define("dropdown_input",(function(){const e=this
e.settings.shouldOpen=!0,e.hook("before","setup",(()=>{e.focus_node=e.control,D(e.control_input,"dropdown-input")
const t=j('<div class="dropdown-input-wrap">')
t.append(e.control_input),e.dropdown.insertBefore(t,e.dropdown.firstChild)
const i=j('<input class="items-placeholder" tabindex="-1" />')
i.placeholder=e.settings.placeholder||"",e.control.append(i)})),e.on("initialize",(()=>{e.control_input.addEventListener("keydown",(t=>{switch(t.keyCode){case 27:return e.isOpen&&(ie(t,!0),e.close()),void e.clearActiveItems()
case 9:e.focus_node.tabIndex=-1}return e.onKeyDown.call(e,t)})),e.on("blur",(()=>{e.focus_node.tabIndex=e.isDisabled?-1:e.tabIndex})),e.on("dropdown_open",(()=>{e.control_input.focus()}))
const t=e.onBlur
e.hook("instead","onBlur",(i=>{if(!i||i.relatedTarget!=e.control_input)return t.call(e)})),se(e.control_input,"blur",(()=>e.onBlur())),e.hook("before","close",(()=>{e.isOpen&&e.focus_node.focus({preventScroll:!0})}))}))})),de.define("input_autogrow",(function(){var e=this
e.on("initialize",(()=>{var t=document.createElement("span"),i=e.control_input
t.style.cssText="position:absolute; top:-99999px; left:-99999px; width:auto; padding:0; white-space:pre; ",e.wrapper.appendChild(t)
for(const e of["letterSpacing","fontSize","fontFamily","fontWeight","textTransform"])t.style[e]=i.style[e]
var s=()=>{t.textContent=i.value,i.style.width=t.clientWidth+"px"}
s(),e.on("update item_add item_remove",s),se(i,"input",s),se(i,"keyup",s),se(i,"blur",s),se(i,"update",s)}))})),de.define("no_backspace_delete",(function(){var e=this,t=e.deleteSelection
this.hook("instead","deleteSelection",(i=>!!e.activeItems.length&&t.call(e,i)))})),de.define("no_active_items",(function(){this.hook("instead","setActiveItem",(()=>{})),this.hook("instead","selectAll",(()=>{}))})),de.define("optgroup_columns",(function(){var e=this,t=e.onKeyDown
e.hook("instead","onKeyDown",(i=>{var s,n,o,r
if(!e.isOpen||37!==i.keyCode&&39!==i.keyCode)return t.call(e,i)
e.ignoreHover=!0,r=z(e.activeOption,"[data-group]"),s=K(e.activeOption,"[data-selectable]"),r&&(r=37===i.keyCode?r.previousSibling:r.nextSibling)&&(n=(o=r.querySelectorAll("[data-selectable]"))[Math.min(o.length-1,s)])&&e.setActiveOption(n)}))})),de.define("remove_button",(function(e){const t=Object.assign({label:"&times;",title:"Remove",className:"remove",append:!0},e)
var i=this
if(t.append){var s='<a href="javascript:void(0)" class="'+t.className+'" tabindex="-1" title="'+Z(t.title)+'">'+t.label+"</a>"
i.hook("after","setupTemplates",(()=>{var e=i.settings.render.item
i.settings.render.item=(t,n)=>{var o=j(e.call(i,t,n)),r=j(s)
return o.appendChild(r),se(r,"mousedown",(e=>{ie(e,!0)})),se(r,"click",(e=>{i.isLocked||(ie(e,!0),i.isLocked||i.shouldDelete([o],e)&&(i.removeItem(o),i.refreshOptions(!1),i.inputState()))})),o}}))}})),de.define("restore_on_backspace",(function(e){const t=this,i=Object.assign({text:e=>e[t.settings.labelField]},e)
t.on("item_remove",(function(e){if(t.isFocused&&""===t.control_input.value.trim()){var s=t.options[e]
s&&t.setTextboxValue(i.text.call(t,s))}}))})),de.define("virtual_scroll",(function(){const e=this,t=e.canLoad,i=e.clearActiveOption,s=e.loadCallback
var n,o,r={},l=!1,a=[]
if(e.settings.shouldLoadMore||(e.settings.shouldLoadMore=()=>{if(n.clientHeight/(n.scrollHeight-n.scrollTop)>.9)return!0
if(e.activeOption){var t=e.selectable()
if(Array.from(t).indexOf(e.activeOption)>=t.length-2)return!0}return!1}),!e.settings.firstUrl)throw"virtual_scroll plugin requires a firstUrl() method"
e.settings.sortField=[{field:"$order"},{field:"$score"}]
const c=t=>!("number"==typeof e.settings.maxOptions&&n.children.length>=e.settings.maxOptions)&&!(!(t in r)||!r[t]),d=(t,i)=>e.items.indexOf(i)>=0||a.indexOf(i)>=0
e.setNextUrl=(e,t)=>{r[e]=t},e.getUrl=t=>{if(t in r){const e=r[t]
return r[t]=!1,e}return e.clearPagination(),e.settings.firstUrl.call(e,t)},e.clearPagination=()=>{r={}},e.hook("instead","clearActiveOption",(()=>{if(!l)return i.call(e)})),e.hook("instead","canLoad",(i=>i in r?c(i):t.call(e,i))),e.hook("instead","loadCallback",((t,i)=>{if(l){if(o){const i=t[0]
void 0!==i&&(o.dataset.value=i[e.settings.valueField])}}else e.clearOptions(d)
s.call(e,t,i),l=!1})),e.hook("after","refreshOptions",(()=>{const t=e.lastValue
var i
c(t)?(i=e.render("loading_more",{query:t}))&&(i.setAttribute("data-selectable",""),o=i):t in r&&!n.querySelector(".no-results")&&(i=e.render("no_more_results",{query:t})),i&&(D(i,e.settings.optionClass),n.append(i))})),e.on("initialize",(()=>{a=Object.keys(e.options),n=e.dropdown_content,e.settings.render=Object.assign({},{loading_more:()=>'<div class="loading-more-results">Loading more results ... </div>',no_more_results:()=>'<div class="no-more-results">No more results</div>'},e.settings.render),n.addEventListener("scroll",(()=>{e.settings.shouldLoadMore.call(e)&&c(e.lastValue)&&(l||(l=!0,e.load.call(e,e.lastValue)))}))}))})),de}))
var tomSelect=function(e,t){return new TomSelect(e,t)}
//# sourceMappingURL=tom-select.complete.min.js.map
