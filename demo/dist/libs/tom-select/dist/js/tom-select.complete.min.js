/**
* Tom Select v2.2.2
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
g[s]=e}}const v=new RegExp(Object.keys(g).join("|")+"|[̀-ͯ·ʾʼ]","gu"),m=(e,t="NFKD")=>e.normalize(t),y=e=>c(e).reduce(((e,t)=>e+b(t)),""),b=e=>(e=m(e).toLowerCase().replace(v,(e=>g[e]||"")),m(e,"NFC"))
const O=e=>{const t={},i=(e,i)=>{const s=t[e]||new Set,o=new RegExp("^"+n(s)+"$","iu")
i.match(o)||(s.add(r(i)),t[e]=s)}
for(let t of function*(e){for(const[t,i]of e)for(let e=t;e<=i;e++){let t=String.fromCharCode(e),i=y(t)
i!=t.toLowerCase()&&(i.length>3||0!=i.length&&(yield{folded:i,composed:t,code_point:e}))}}(e))i(t.folded,t.folded),i(t.folded,t.composed)
return t},w=e=>{const t=O(e),s={}
let o=[]
for(let e in t){let i=t[e]
i&&(s[e]=n(i)),e.length>1&&o.push(r(e))}o.sort(((e,t)=>t.length-e.length))
const l=i(o)
return h=new RegExp("^"+l,"u"),s},_=(e,t=1)=>(t=Math.max(t,e.length-1),i(d(e).map((e=>((e,t=1)=>{let i=0
return e=e.map((e=>(p[e]&&(i+=e.length),p[e]||e))),i>=t?s(e):""})(e,t))))),I=(e,t=!0)=>{let n=e.length>1?1:0
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
class C{constructor(){this.parts=[],this.substrs=[],this.start=0,this.end=0}add(e){e&&(this.parts.push(e),this.substrs.push(e.substr),this.start=Math.min(e.start,this.start),this.end=Math.max(e.end,this.end))}last(){return this.parts[this.parts.length-1]}length(){return this.parts.length}clone(e,t){let i=new C,s=JSON.parse(JSON.stringify(this.parts)),n=s.pop()
for(const e of s)i.add(e)
let o=t.substr.substring(0,e-n.start),r=o.length
return i.add({start:n.start,end:n.start+r,length:r,substr:o}),i}}const A=e=>{var t
void 0===p&&(p=w(t||u)),e=y(e)
let i="",s=[new C]
for(let t=0;t<e.length;t++){let n=e.substring(t).match(h)
const o=e.substring(t,t+1),r=n?n[0]:null
let l=[],a=new Set
for(const e of s){const i=e.last()
if(!i||1==i.length||i.end<=t)if(r){const i=r.length
e.add({start:t,end:t+i,length:i,substr:r}),a.add("1")}else e.add({start:t,end:t+1,length:1,substr:o}),a.add("2")
else if(r){let s=e.clone(t,i)
const n=r.length
s.add({start:t,end:t+n,length:n,substr:r}),l.push(s)}else a.add("3")}if(l.length>0){l=l.sort(((e,t)=>e.length()-t.length()))
for(let e of l)S(e,s)||s.push(e)}else if(t>0&&1==a.size&&!a.has("3")){i+=I(s,!1)
let e=new C
const t=s[0]
t&&e.add(t.last()),s=[e]}}return i+=I(s,!0),i},x=(e,t)=>{if(e)return e[t]},k=(e,t)=>{if(e){for(var i,s=t.split(".");(i=s.shift())&&(e=e[i]););return e}},F=(e,t,i)=>{var s,n
return e?(e+="",null==t.regex||-1===(n=e.search(t.regex))?0:(s=t.string.length/e.length,0===n&&(s+=.5),s*i)):0},L=(e,t)=>{var i=e[t]
if("function"==typeof i)return i
i&&!Array.isArray(i)&&(e[t]=[i])},E=(e,t)=>{if(Array.isArray(e))e.forEach(t)
else for(var i in e)e.hasOwnProperty(i)&&t(e[i],i)},P=(e,t)=>"number"==typeof e&&"number"==typeof t?e>t?1:e<t?-1:0:(e=y(e+"").toLowerCase())>(t=y(t+"").toLowerCase())?1:t>e?-1:0
class T{constructor(e,t){this.items=void 0,this.settings=void 0,this.items=e,this.settings=t||{diacritics:!0}}tokenize(e,t,i){if(!e||!e.length)return[]
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
for(let o of i){if(n=o.field,s=("desc"===o.direction?-1:1)*P(r(n,e),r(n,t)))return s}return 0}:null}prepareSearch(e,t){const i={}
var s=Object.assign({},t)
if(L(s,"sort"),L(s,"sort_empty"),s.fields){L(s,"fields")
const e=[]
s.fields.forEach((t=>{"string"==typeof t&&(t={field:t,weight:1}),e.push(t),i[t.field]="weight"in t?t.weight:1})),s.fields=e}return{options:s,query:e.toLowerCase().trim(),tokens:this.tokenize(e,s.respect_word_boundaries,i),total:0,items:[],weights:i,getAttrFn:s.nesting?k:x}}search(e,t){var i,s,n=this
s=this.prepareSearch(e,t),t=s.options,e=s.query
const o=t.score||n._getScoreFunction(s)
e.length?E(n.items,((e,n)=>{i=o(e),(!1===t.filter||i>0)&&s.items.push({score:i,id:n})})):E(n.items,((e,t)=>{s.items.push({score:1,id:t})}))
const r=n._getSortFunction(s)
return r&&s.items.sort(r),s.total=s.items.length,"number"==typeof t.limit&&(s.items=s.items.slice(0,t.limit)),s}}const j=(e,t)=>{if(Array.isArray(e))e.forEach(t)
else for(var i in e)e.hasOwnProperty(i)&&t(e[i],i)},V=e=>{if(e.jquery)return e[0]
if(e instanceof HTMLElement)return e
if(q(e)){var t=document.createElement("template")
return t.innerHTML=e.trim(),t.content.firstChild}return document.querySelector(e)},q=e=>"string"==typeof e&&e.indexOf("<")>-1,D=(e,t)=>{var i=document.createEvent("HTMLEvents")
i.initEvent(t,!0,!1),e.dispatchEvent(i)},N=(e,t)=>{Object.assign(e.style,t)},H=(e,...t)=>{var i=M(t);(e=R(e)).map((e=>{i.map((t=>{e.classList.add(t)}))}))},z=(e,...t)=>{var i=M(t);(e=R(e)).map((e=>{i.map((t=>{e.classList.remove(t)}))}))},M=e=>{var t=[]
return j(e,(e=>{"string"==typeof e&&(e=e.trim().split(/[\11\12\14\15\40]/)),Array.isArray(e)&&(t=t.concat(e))})),t.filter(Boolean)},R=e=>(Array.isArray(e)||(e=[e]),e),B=(e,t,i)=>{if(!i||i.contains(e))for(;e&&e.matches;){if(e.matches(t))return e
e=e.parentNode}},K=(e,t=0)=>t>0?e[e.length-1]:e[0],Q=(e,t)=>{if(!e)return-1
t=t||e.nodeName
for(var i=0;e=e.previousElementSibling;)e.matches(t)&&i++
return i},G=(e,t)=>{j(t,((t,i)=>{null==t?e.removeAttribute(i):e.setAttribute(i,""+t)}))},U=(e,t)=>{e.parentNode&&e.parentNode.replaceChild(t,e)},J=(e,t)=>{if(null===t)return
if("string"==typeof t){if(!t.length)return
t=new RegExp(t,"i")}const i=e=>3===e.nodeType?(e=>{var i=e.data.match(t)
if(i&&e.data.length>0){var s=document.createElement("span")
s.className="highlight"
var n=e.splitText(i.index)
n.splitText(i[0].length)
var o=n.cloneNode(!0)
return s.appendChild(o),U(n,s),1}return 0})(e):((e=>{1!==e.nodeType||!e.childNodes||/(script|style)/i.test(e.tagName)||"highlight"===e.className&&"SPAN"===e.tagName||Array.from(e.childNodes).forEach((e=>{i(e)}))})(e),0)
i(e)},W="undefined"!=typeof navigator&&/Mac/.test(navigator.userAgent)?"metaKey":"ctrlKey"
var X={options:[],optgroups:[],plugins:[],delimiter:",",splitOn:null,persist:!0,diacritics:!0,create:null,createOnBlur:!1,createFilter:null,highlight:!0,openOnFocus:!0,shouldOpen:null,maxOptions:50,maxItems:null,hideSelected:null,duplicates:!1,addPrecedence:!1,selectOnTab:!1,preload:null,allowEmptyOption:!1,loadThrottle:300,loadingClass:"loading",dataAttr:null,optgroupField:"optgroup",valueField:"value",labelField:"text",disabledField:"disabled",optgroupLabelField:"label",optgroupValueField:"value",lockOptgroupOrder:!1,sortField:"$order",searchField:["text"],searchConjunction:"and",mode:null,wrapperClass:"ts-wrapper",controlClass:"ts-control",dropdownClass:"ts-dropdown",dropdownContentClass:"ts-dropdown-content",itemClass:"item",optionClass:"option",dropdownParent:null,controlInput:'<input type="text" autocomplete="off" size="1" />',copyClassesToDropdown:!1,placeholder:null,hidePlaceholder:null,shouldLoad:function(e){return e.length>0},render:{}}
const Y=e=>null==e?null:Z(e),Z=e=>"boolean"==typeof e?e?"1":"0":e+"",ee=e=>(e+"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"),te=(e,t)=>{var i
return function(s,n){var o=this
i&&(o.loading=Math.max(o.loading-1,0),clearTimeout(i)),i=setTimeout((function(){i=null,o.loadedSearches[s]=!0,e.call(o,s,n)}),t)}},ie=(e,t,i)=>{var s,n=e.trigger,o={}
for(s of(e.trigger=function(){var i=arguments[0]
if(-1===t.indexOf(i))return n.apply(e,arguments)
o[i]=arguments},i.apply(e,[]),e.trigger=n,t))s in o&&n.apply(e,o[s])},se=(e,t=!1)=>{e&&(e.preventDefault(),t&&e.stopPropagation())},ne=(e,t,i,s)=>{e.addEventListener(t,i,s)},oe=(e,t)=>!!t&&(!!t[e]&&1===(t.altKey?1:0)+(t.ctrlKey?1:0)+(t.shiftKey?1:0)+(t.metaKey?1:0)),re=(e,t)=>{const i=e.getAttribute("id")
return i||(e.setAttribute("id",t),t)},le=e=>e.replace(/[\\"']/g,"\\$&"),ae=(e,t)=>{t&&e.append(t)}
function ce(e,t){var i=Object.assign({},X,t),s=i.dataAttr,n=i.labelField,o=i.valueField,r=i.disabledField,l=i.optgroupField,a=i.optgroupLabelField,c=i.optgroupValueField,d=e.tagName.toLowerCase(),u=e.getAttribute("placeholder")||e.getAttribute("data-placeholder")
if(!u&&!i.allowEmptyOption){let t=e.querySelector('option[value=""]')
t&&(u=t.textContent)}var p,h,g,f,v,m,y={placeholder:u,options:[],optgroups:[],items:[],maxItems:null}
return"select"===d?(h=y.options,g={},f=1,v=e=>{var t=Object.assign({},e.dataset),i=s&&t[s]
return"string"==typeof i&&i.length&&(t=Object.assign(t,JSON.parse(i))),t},m=(e,t)=>{var s=Y(e.value)
if(null!=s&&(s||i.allowEmptyOption)){if(g.hasOwnProperty(s)){if(t){var a=g[s][l]
a?Array.isArray(a)?a.push(t):g[s][l]=[a,t]:g[s][l]=t}}else{var c=v(e)
c[n]=c[n]||e.textContent,c[o]=c[o]||s,c[r]=c[r]||e.disabled,c[l]=c[l]||t,c.$option=e,g[s]=c,h.push(c)}e.selected&&y.items.push(s)}},y.maxItems=e.hasAttribute("multiple")?null:1,j(e.children,(e=>{var t,i,s
"optgroup"===(p=e.tagName.toLowerCase())?((s=v(t=e))[a]=s[a]||t.getAttribute("label")||"",s[c]=s[c]||f++,s[r]=s[r]||t.disabled,y.optgroups.push(s),i=s[c],j(t.children,(e=>{m(e,i)}))):"option"===p&&m(e)}))):(()=>{const t=e.getAttribute(s)
if(t)y.options=JSON.parse(t),j(y.options,(e=>{y.items.push(e[o])}))
else{var r=e.value.trim()||""
if(!i.allowEmptyOption&&!r.length)return
const t=r.split(i.delimiter)
j(t,(e=>{const t={}
t[n]=e,t[o]=e,y.options.push(t)})),y.items=t}})(),Object.assign({},X,y,t)}var de=0
class ue extends(function(e){return e.plugins={},class extends e{constructor(...e){super(...e),this.plugins={names:[],settings:{},requested:{},loaded:{}}}static define(t,i){e.plugins[t]={name:t,fn:i}}initializePlugins(e){var t,i
const s=this,n=[]
if(Array.isArray(e))e.forEach((e=>{"string"==typeof e?n.push(e):(s.plugins.settings[e.name]=e.options,n.push(e.name))}))
else if(e)for(t in e)e.hasOwnProperty(t)&&(s.plugins.settings[t]=e[t],n.push(t))
for(;i=n.shift();)s.require(i)}loadPlugin(t){var i=this,s=i.plugins,n=e.plugins[t]
if(!e.plugins.hasOwnProperty(t))throw new Error('Unable to find "'+t+'" plugin')
s.requested[t]=!0,s.loaded[t]=n.fn.apply(i,[i.plugins.settings[t]||{}]),s.names.push(t)}require(e){var t=this,i=t.plugins
if(!t.plugins.loaded.hasOwnProperty(e)){if(i.requested[e])throw new Error('Plugin has circular dependency ("'+e+'")')
t.loadPlugin(e)}return i.loaded[e]}}}(t)){constructor(e,t){var i
super(),this.control_input=void 0,this.wrapper=void 0,this.dropdown=void 0,this.control=void 0,this.dropdown_content=void 0,this.focus_node=void 0,this.order=0,this.settings=void 0,this.input=void 0,this.tabIndex=void 0,this.is_select_tag=void 0,this.rtl=void 0,this.inputId=void 0,this._destroy=void 0,this.sifter=void 0,this.isOpen=!1,this.isDisabled=!1,this.isRequired=void 0,this.isInvalid=!1,this.isValid=!0,this.isLocked=!1,this.isFocused=!1,this.isInputHidden=!1,this.isSetup=!1,this.ignoreFocus=!1,this.ignoreHover=!1,this.hasOptions=!1,this.currentResults=void 0,this.lastValue="",this.caretPos=0,this.loading=0,this.loadedSearches={},this.activeOption=null,this.activeItems=[],this.optgroups={},this.options={},this.userOptions={},this.items=[],de++
var s=V(e)
if(s.tomselect)throw new Error("Tom Select already initialized on this element")
s.tomselect=this,i=(window.getComputedStyle&&window.getComputedStyle(s,null)).getPropertyValue("direction")
const n=ce(s,t)
this.settings=n,this.input=s,this.tabIndex=s.tabIndex||0,this.is_select_tag="select"===s.tagName.toLowerCase(),this.rtl=/rtl/i.test(i),this.inputId=re(s,"tomselect-"+de),this.isRequired=s.required,this.sifter=new T(this.options,{diacritics:n.diacritics}),n.mode=n.mode||(1===n.maxItems?"single":"multi"),"boolean"!=typeof n.hideSelected&&(n.hideSelected="multi"===n.mode),"boolean"!=typeof n.hidePlaceholder&&(n.hidePlaceholder="multi"!==n.mode)
var o=n.createFilter
"function"!=typeof o&&("string"==typeof o&&(o=new RegExp(o)),o instanceof RegExp?n.createFilter=e=>o.test(e):n.createFilter=e=>this.settings.duplicates||!this.options[e]),this.initializePlugins(n.plugins),this.setupCallbacks(),this.setupTemplates()
const r=V("<div>"),l=V("<div>"),a=this._render("dropdown"),c=V('<div role="listbox" tabindex="-1">'),d=this.input.getAttribute("class")||"",u=n.mode
var p
if(H(r,n.wrapperClass,d,u),H(l,n.controlClass),ae(r,l),H(a,n.dropdownClass,u),n.copyClassesToDropdown&&H(a,d),H(c,n.dropdownContentClass),ae(a,c),V(n.dropdownParent||r).appendChild(a),q(n.controlInput)){p=V(n.controlInput)
E(["autocorrect","autocapitalize","autocomplete"],(e=>{s.getAttribute(e)&&G(p,{[e]:s.getAttribute(e)})})),p.tabIndex=-1,l.appendChild(p),this.focus_node=p}else n.controlInput?(p=V(n.controlInput),this.focus_node=p):(p=V("<input/>"),this.focus_node=l)
this.wrapper=r,this.dropdown=a,this.dropdown_content=c,this.control=l,this.control_input=p,this.setup()}setup(){const e=this,t=e.settings,i=e.control_input,s=e.dropdown,n=e.dropdown_content,o=e.wrapper,l=e.control,a=e.input,c=e.focus_node,d={passive:!0},u=e.inputId+"-ts-dropdown"
G(n,{id:u}),G(c,{role:"combobox","aria-haspopup":"listbox","aria-expanded":"false","aria-controls":u})
const p=re(c,e.inputId+"-ts-control"),h="label[for='"+(e=>e.replace(/['"\\]/g,"\\$&"))(e.inputId)+"']",g=document.querySelector(h),f=e.focus.bind(e)
if(g){ne(g,"click",f),G(g,{for:p})
const t=re(g,e.inputId+"-ts-label")
G(c,{"aria-labelledby":t}),G(n,{"aria-labelledby":t})}if(o.style.width=a.style.width,e.plugins.names.length){const t="plugin-"+e.plugins.names.join(" plugin-")
H([o,s],t)}(null===t.maxItems||t.maxItems>1)&&e.is_select_tag&&G(a,{multiple:"multiple"}),t.placeholder&&G(i,{placeholder:t.placeholder}),!t.splitOn&&t.delimiter&&(t.splitOn=new RegExp("\\s*"+r(t.delimiter)+"+\\s*")),t.load&&t.loadThrottle&&(t.load=te(t.load,t.loadThrottle)),e.control_input.type=a.type,ne(s,"mousemove",(()=>{e.ignoreHover=!1})),ne(s,"mouseenter",(t=>{var i=B(t.target,"[data-selectable]",s)
i&&e.onOptionHover(t,i)}),{capture:!0}),ne(s,"click",(t=>{const i=B(t.target,"[data-selectable]")
i&&(e.onOptionSelect(t,i),se(t,!0))})),ne(l,"click",(t=>{var s=B(t.target,"[data-ts-item]",l)
s&&e.onItemSelect(t,s)?se(t,!0):""==i.value&&(e.onClick(),se(t,!0))})),ne(c,"keydown",(t=>e.onKeyDown(t))),ne(i,"keypress",(t=>e.onKeyPress(t))),ne(i,"input",(t=>e.onInput(t))),ne(c,"blur",(t=>e.onBlur(t))),ne(c,"focus",(t=>e.onFocus(t))),ne(i,"paste",(t=>e.onPaste(t)))
const v=t=>{const n=t.composedPath()[0]
if(!o.contains(n)&&!s.contains(n))return e.isFocused&&e.blur(),void e.inputState()
n==i&&e.isOpen?t.stopPropagation():se(t,!0)},m=()=>{e.isOpen&&e.positionDropdown()}
ne(document,"mousedown",v),ne(window,"scroll",m,d),ne(window,"resize",m,d),this._destroy=()=>{document.removeEventListener("mousedown",v),window.removeEventListener("scroll",m),window.removeEventListener("resize",m),g&&g.removeEventListener("click",f)},this.revertSettings={innerHTML:a.innerHTML,tabIndex:a.tabIndex},a.tabIndex=-1,a.insertAdjacentElement("afterend",e.wrapper),e.sync(!1),t.items=[],delete t.optgroups,delete t.options,ne(a,"invalid",(()=>{e.isValid&&(e.isValid=!1,e.isInvalid=!0,e.refreshState())})),e.updateOriginalInput(),e.refreshItems(),e.close(!1),e.inputState(),e.isSetup=!0,a.disabled?e.disable():e.enable(),e.on("change",this.onChange),H(a,"tomselected","ts-hidden-accessible"),e.trigger("initialize"),!0===t.preload&&e.preload()}setupOptions(e=[],t=[]){this.addOptions(e),E(t,(e=>{this.registerOptionGroup(e)}))}setupTemplates(){var e=this,t=e.settings.labelField,i=e.settings.optgroupLabelField,s={optgroup:e=>{let t=document.createElement("div")
return t.className="optgroup",t.appendChild(e.options),t},optgroup_header:(e,t)=>'<div class="optgroup-header">'+t(e[i])+"</div>",option:(e,i)=>"<div>"+i(e[t])+"</div>",item:(e,i)=>"<div>"+i(e[t])+"</div>",option_create:(e,t)=>'<div class="create">Add <strong>'+t(e.input)+"</strong>&hellip;</div>",no_results:()=>'<div class="no-results">No results found</div>',loading:()=>'<div class="spinner"></div>',not_loading:()=>{},dropdown:()=>"<div></div>"}
e.settings.render=Object.assign({},s,e.settings.render)}setupCallbacks(){var e,t,i={initialize:"onInitialize",change:"onChange",item_add:"onItemAdd",item_remove:"onItemRemove",item_select:"onItemSelect",clear:"onClear",option_add:"onOptionAdd",option_remove:"onOptionRemove",option_clear:"onOptionClear",optgroup_add:"onOptionGroupAdd",optgroup_remove:"onOptionGroupRemove",optgroup_clear:"onOptionGroupClear",dropdown_open:"onDropdownOpen",dropdown_close:"onDropdownClose",type:"onType",load:"onLoad",focus:"onFocus",blur:"onBlur"}
for(e in i)(t=this.settings[i[e]])&&this.on(e,t)}sync(e=!0){const t=this,i=e?ce(t.input,{delimiter:t.settings.delimiter}):t.settings
t.setupOptions(i.options,i.optgroups),t.setValue(i.items||[],!0),t.lastQuery=null}onClick(){var e=this
if(e.activeItems.length>0)return e.clearActiveItems(),void e.focus()
e.isFocused&&e.isOpen?e.blur():e.focus()}onMouseDown(){}onChange(){D(this.input,"input"),D(this.input,"change")}onPaste(e){var t=this
t.isInputHidden||t.isLocked?se(e):t.settings.splitOn&&setTimeout((()=>{var e=t.inputValue()
if(e.match(t.settings.splitOn)){var i=e.trim().split(t.settings.splitOn)
E(i,(e=>{Y(e)&&(this.options[e]?t.addItem(e):t.createItem(e))}))}}),0)}onKeyPress(e){var t=this
if(!t.isLocked){var i=String.fromCharCode(e.keyCode||e.which)
return t.settings.create&&"multi"===t.settings.mode&&i===t.settings.delimiter?(t.createItem(),void se(e)):void 0}se(e)}onKeyDown(e){var t=this
if(t.ignoreHover=!0,t.isLocked)9!==e.keyCode&&se(e)
else{switch(e.keyCode){case 65:if(oe(W,e)&&""==t.control_input.value)return se(e),void t.selectAll()
break
case 27:return t.isOpen&&(se(e,!0),t.close()),void t.clearActiveItems()
case 40:if(!t.isOpen&&t.hasOptions)t.open()
else if(t.activeOption){let e=t.getAdjacent(t.activeOption,1)
e&&t.setActiveOption(e)}return void se(e)
case 38:if(t.activeOption){let e=t.getAdjacent(t.activeOption,-1)
e&&t.setActiveOption(e)}return void se(e)
case 13:return void(t.canSelect(t.activeOption)?(t.onOptionSelect(e,t.activeOption),se(e)):(t.settings.create&&t.createItem()||document.activeElement==t.control_input&&t.isOpen)&&se(e))
case 37:return void t.advanceSelection(-1,e)
case 39:return void t.advanceSelection(1,e)
case 9:return void(t.settings.selectOnTab&&(t.canSelect(t.activeOption)&&(t.onOptionSelect(e,t.activeOption),se(e)),t.settings.create&&t.createItem()&&se(e)))
case 8:case 46:return void t.deleteSelection(e)}t.isInputHidden&&!oe(W,e)&&se(e)}}onInput(e){var t=this
if(!t.isLocked){var i=t.inputValue()
t.lastValue!==i&&(t.lastValue=i,t.settings.shouldLoad.call(t,i)&&t.load(i),t.refreshOptions(),t.trigger("type",i))}}onOptionHover(e,t){this.ignoreHover||this.setActiveOption(t,!1)}onFocus(e){var t=this,i=t.isFocused
if(t.isDisabled)return t.blur(),void se(e)
t.ignoreFocus||(t.isFocused=!0,"focus"===t.settings.preload&&t.preload(),i||t.trigger("focus"),t.activeItems.length||(t.showInput(),t.refreshOptions(!!t.settings.openOnFocus)),t.refreshState())}onBlur(e){if(!1!==document.hasFocus()){var t=this
if(t.isFocused){t.isFocused=!1,t.ignoreFocus=!1
var i=()=>{t.close(),t.setActiveItem(),t.setCaret(t.items.length),t.trigger("blur")}
t.settings.create&&t.settings.createOnBlur?t.createItem(null,i):i()}}}onOptionSelect(e,t){var i,s=this
t.parentElement&&t.parentElement.matches("[data-disabled]")||(t.classList.contains("create")?s.createItem(null,(()=>{s.settings.closeAfterSelect&&s.close()})):void 0!==(i=t.dataset.value)&&(s.lastQuery=null,s.addItem(i),s.settings.closeAfterSelect&&s.close(),!s.settings.hideSelected&&e.type&&/click/.test(e.type)&&s.setActiveOption(t)))}canSelect(e){return!!(this.isOpen&&e&&this.dropdown_content.contains(e))}onItemSelect(e,t){var i=this
return!i.isLocked&&"multi"===i.settings.mode&&(se(e),i.setActiveItem(t,e),!0)}canLoad(e){return!!this.settings.load&&!this.loadedSearches.hasOwnProperty(e)}load(e){const t=this
if(!t.canLoad(e))return
H(t.wrapper,t.settings.loadingClass),t.loading++
const i=t.loadCallback.bind(t)
t.settings.load.call(t,e,i)}loadCallback(e,t){const i=this
i.loading=Math.max(i.loading-1,0),i.lastQuery=null,i.clearActiveOption(),i.setupOptions(e,t),i.refreshOptions(i.isFocused&&!i.isInputHidden),i.loading||z(i.wrapper,i.settings.loadingClass),i.trigger("load",e,t)}preload(){var e=this.wrapper.classList
e.contains("preloaded")||(e.add("preloaded"),this.load(""))}setTextboxValue(e=""){var t=this.control_input
t.value!==e&&(t.value=e,D(t,"update"),this.lastValue=e)}getValue(){return this.is_select_tag&&this.input.hasAttribute("multiple")?this.items:this.items.join(this.settings.delimiter)}setValue(e,t){ie(this,t?[]:["change"],(()=>{this.clear(t),this.addItems(e,t)}))}setMaxItems(e){0===e&&(e=null),this.settings.maxItems=e,this.refreshState()}setActiveItem(e,t){var i,s,n,o,r,l,a=this
if("single"!==a.settings.mode){if(!e)return a.clearActiveItems(),void(a.isFocused&&a.showInput())
if("click"===(i=t&&t.type.toLowerCase())&&oe("shiftKey",t)&&a.activeItems.length){for(l=a.getLastActive(),(n=Array.prototype.indexOf.call(a.control.children,l))>(o=Array.prototype.indexOf.call(a.control.children,e))&&(r=n,n=o,o=r),s=n;s<=o;s++)e=a.control.children[s],-1===a.activeItems.indexOf(e)&&a.setActiveItemClass(e)
se(t)}else"click"===i&&oe(W,t)||"keydown"===i&&oe("shiftKey",t)?e.classList.contains("active")?a.removeActiveItem(e):a.setActiveItemClass(e):(a.clearActiveItems(),a.setActiveItemClass(e))
a.hideInput(),a.isFocused||a.focus()}}setActiveItemClass(e){const t=this,i=t.control.querySelector(".last-active")
i&&z(i,"last-active"),H(e,"active last-active"),t.trigger("item_select",e),-1==t.activeItems.indexOf(e)&&t.activeItems.push(e)}removeActiveItem(e){var t=this.activeItems.indexOf(e)
this.activeItems.splice(t,1),z(e,"active")}clearActiveItems(){z(this.activeItems,"active"),this.activeItems=[]}setActiveOption(e,t=!0){e!==this.activeOption&&(this.clearActiveOption(),e&&(this.activeOption=e,G(this.focus_node,{"aria-activedescendant":e.getAttribute("id")}),G(e,{"aria-selected":"true"}),H(e,"active"),t&&this.scrollToOption(e)))}scrollToOption(e,t){if(!e)return
const i=this.dropdown_content,s=i.clientHeight,n=i.scrollTop||0,o=e.offsetHeight,r=e.getBoundingClientRect().top-i.getBoundingClientRect().top+n
r+o>s+n?this.scroll(r-s+o,t):r<n&&this.scroll(r,t)}scroll(e,t){const i=this.dropdown_content
t&&(i.style.scrollBehavior=t),i.scrollTop=e,i.style.scrollBehavior=""}clearActiveOption(){this.activeOption&&(z(this.activeOption,"active"),G(this.activeOption,{"aria-selected":null})),this.activeOption=null,G(this.focus_node,{"aria-activedescendant":null})}selectAll(){const e=this
if("single"===e.settings.mode)return
const t=e.controlChildren()
t.length&&(e.hideInput(),e.close(),e.activeItems=t,E(t,(t=>{e.setActiveItemClass(t)})))}inputState(){var e=this
e.control.contains(e.control_input)&&(G(e.control_input,{placeholder:e.settings.placeholder}),e.activeItems.length>0||!e.isFocused&&e.settings.hidePlaceholder&&e.items.length>0?(e.setTextboxValue(),e.isInputHidden=!0):(e.settings.hidePlaceholder&&e.items.length>0&&G(e.control_input,{placeholder:""}),e.isInputHidden=!1),e.wrapper.classList.toggle("input-hidden",e.isInputHidden))}hideInput(){this.inputState()}showInput(){this.inputState()}inputValue(){return this.control_input.value.trim()}focus(){var e=this
e.isDisabled||(e.ignoreFocus=!0,e.control_input.offsetWidth?e.control_input.focus():e.focus_node.focus(),setTimeout((()=>{e.ignoreFocus=!1,e.onFocus()}),0))}blur(){this.focus_node.blur(),this.onBlur()}getScoreFunction(e){return this.sifter.getScoreFunction(e,this.getSearchOptions())}getSearchOptions(){var e=this.settings,t=e.sortField
return"string"==typeof e.sortField&&(t=[{field:e.sortField}]),{fields:e.searchField,conjunction:e.searchConjunction,sort:t,nesting:e.nesting}}search(e){var t,i,s=this,n=this.getSearchOptions()
if(s.settings.score&&"function"!=typeof(i=s.settings.score.call(s,e)))throw new Error('Tom Select "score" setting must be a function that returns a function')
return e!==s.lastQuery?(s.lastQuery=e,t=s.sifter.search(e,Object.assign(n,{score:i})),s.currentResults=t):t=Object.assign({},s.currentResults),s.settings.hideSelected&&(t.items=t.items.filter((e=>{let t=Y(e.id)
return!(t&&-1!==s.items.indexOf(t))}))),t}refreshOptions(e=!0){var t,i,s,n,o,r,l,a,c,d
const u={},p=[]
var h=this,g=h.inputValue()
const f=g===h.lastQuery||""==g&&null==h.lastQuery
var v,m=h.search(g),y=null,b=h.settings.shouldOpen||!1,O=h.dropdown_content
for(f&&(y=h.activeOption)&&(c=y.closest("[data-group]")),n=m.items.length,"number"==typeof h.settings.maxOptions&&(n=Math.min(n,h.settings.maxOptions)),n>0&&(b=!0),t=0;t<n;t++){let e=m.items[t]
if(!e)continue
let n=e.id,l=h.options[n]
if(void 0===l)continue
let a=Z(n),d=h.getOption(a,!0)
for(h.settings.hideSelected||d.classList.toggle("selected",h.items.includes(a)),o=l[h.settings.optgroupField]||"",i=0,s=(r=Array.isArray(o)?o:[o])&&r.length;i<s;i++){o=r[i],h.optgroups.hasOwnProperty(o)||(o="")
let e=u[o]
void 0===e&&(e=document.createDocumentFragment(),p.push(o)),i>0&&(d=d.cloneNode(!0),G(d,{id:l.$id+"-clone-"+i,"aria-selected":null}),d.classList.add("ts-cloned"),z(d,"active"),h.activeOption&&h.activeOption.dataset.value==n&&c&&c.dataset.group===o.toString()&&(y=d)),e.appendChild(d),u[o]=e}}h.settings.lockOptgroupOrder&&p.sort(((e,t)=>{const i=h.optgroups[e],s=h.optgroups[t]
return(i&&i.$order||0)-(s&&s.$order||0)})),l=document.createDocumentFragment(),E(p,(e=>{let t=u[e]
if(!t||!t.children.length)return
let i=h.optgroups[e]
if(void 0!==i){let e=document.createDocumentFragment(),s=h.render("optgroup_header",i)
ae(e,s),ae(e,t)
let n=h.render("optgroup",{group:i,options:e})
ae(l,n)}else ae(l,t)})),O.innerHTML="",ae(O,l),h.settings.highlight&&(v=O.querySelectorAll("span.highlight"),Array.prototype.forEach.call(v,(function(e){var t=e.parentNode
t.replaceChild(e.firstChild,e),t.normalize()})),m.query.length&&m.tokens.length&&E(m.tokens,(e=>{J(O,e.regex)})))
var w=e=>{let t=h.render(e,{input:g})
return t&&(b=!0,O.insertBefore(t,O.firstChild)),t}
if(h.loading?w("loading"):h.settings.shouldLoad.call(h,g)?0===m.items.length&&w("no_results"):w("not_loading"),(a=h.canCreate(g))&&(d=w("option_create")),h.hasOptions=m.items.length>0||a,b){if(m.items.length>0){if(y||"single"!==h.settings.mode||null==h.items[0]||(y=h.getOption(h.items[0])),!O.contains(y)){let e=0
d&&!h.settings.addPrecedence&&(e=1),y=h.selectable()[e]}}else d&&(y=d)
e&&!h.isOpen&&(h.open(),h.scrollToOption(y,"auto")),h.setActiveOption(y)}else h.clearActiveOption(),e&&h.isOpen&&h.close(!1)}selectable(){return this.dropdown_content.querySelectorAll("[data-selectable]")}addOption(e,t=!1){const i=this
if(Array.isArray(e))return i.addOptions(e,t),!1
const s=Y(e[i.settings.valueField])
return null!==s&&!i.options.hasOwnProperty(s)&&(e.$order=e.$order||++i.order,e.$id=i.inputId+"-opt-"+e.$order,i.options[s]=e,i.lastQuery=null,t&&(i.userOptions[s]=t,i.trigger("option_add",s,e)),s)}addOptions(e,t=!1){E(e,(e=>{this.addOption(e,t)}))}registerOption(e){return this.addOption(e)}registerOptionGroup(e){var t=Y(e[this.settings.optgroupValueField])
return null!==t&&(e.$order=e.$order||++this.order,this.optgroups[t]=e,t)}addOptionGroup(e,t){var i
t[this.settings.optgroupValueField]=e,(i=this.registerOptionGroup(t))&&this.trigger("optgroup_add",i,t)}removeOptionGroup(e){this.optgroups.hasOwnProperty(e)&&(delete this.optgroups[e],this.clearCache(),this.trigger("optgroup_remove",e))}clearOptionGroups(){this.optgroups={},this.clearCache(),this.trigger("optgroup_clear")}updateOption(e,t){const i=this
var s,n
const o=Y(e),r=Y(t[i.settings.valueField])
if(null===o)return
const l=i.options[o]
if(null==l)return
if("string"!=typeof r)throw new Error("Value must be set in option data")
const a=i.getOption(o),c=i.getItem(o)
if(t.$order=t.$order||l.$order,delete i.options[o],i.uncacheValue(r),i.options[r]=t,a){if(i.dropdown_content.contains(a)){const e=i._render("option",t)
U(a,e),i.activeOption===a&&i.setActiveOption(e)}a.remove()}c&&(-1!==(n=i.items.indexOf(o))&&i.items.splice(n,1,r),s=i._render("item",t),c.classList.contains("active")&&H(s,"active"),U(c,s)),i.lastQuery=null}removeOption(e,t){const i=this
e=Z(e),i.uncacheValue(e),delete i.userOptions[e],delete i.options[e],i.lastQuery=null,i.trigger("option_remove",e),i.removeItem(e,t)}clearOptions(e){const t=(e||this.clearFilter).bind(this)
this.loadedSearches={},this.userOptions={},this.clearCache()
const i={}
E(this.options,((e,s)=>{t(e,s)&&(i[s]=e)})),this.options=this.sifter.items=i,this.lastQuery=null,this.trigger("option_clear")}clearFilter(e,t){return this.items.indexOf(t)>=0}getOption(e,t=!1){const i=Y(e)
if(null===i)return null
const s=this.options[i]
if(null!=s){if(s.$div)return s.$div
if(t)return this._render("option",s)}return null}getAdjacent(e,t,i="option"){var s
if(!e)return null
s="item"==i?this.controlChildren():this.dropdown_content.querySelectorAll("[data-selectable]")
for(let i=0;i<s.length;i++)if(s[i]==e)return t>0?s[i+1]:s[i-1]
return null}getItem(e){if("object"==typeof e)return e
var t=Y(e)
return null!==t?this.control.querySelector(`[data-value="${le(t)}"]`):null}addItems(e,t){var i=this,s=Array.isArray(e)?e:[e]
const n=(s=s.filter((e=>-1===i.items.indexOf(e))))[s.length-1]
s.forEach((e=>{i.isPending=e!==n,i.addItem(e,t)}))}addItem(e,t){ie(this,t?[]:["change","dropdown_close"],(()=>{var i,s
const n=this,o=n.settings.mode,r=Y(e)
if((!r||-1===n.items.indexOf(r)||("single"===o&&n.close(),"single"!==o&&n.settings.duplicates))&&null!==r&&n.options.hasOwnProperty(r)&&("single"===o&&n.clear(t),"multi"!==o||!n.isFull())){if(i=n._render("item",n.options[r]),n.control.contains(i)&&(i=i.cloneNode(!0)),s=n.isFull(),n.items.splice(n.caretPos,0,r),n.insertAtCaret(i),n.isSetup){if(!n.isPending&&n.settings.hideSelected){let e=n.getOption(r),t=n.getAdjacent(e,1)
t&&n.setActiveOption(t)}n.isPending||n.settings.closeAfterSelect||n.refreshOptions(n.isFocused&&"single"!==o),0!=n.settings.closeAfterSelect&&n.isFull()?n.close():n.isPending||n.positionDropdown(),n.trigger("item_add",r,i),n.isPending||n.updateOriginalInput({silent:t})}(!n.isPending||!s&&n.isFull())&&(n.inputState(),n.refreshState())}}))}removeItem(e=null,t){const i=this
if(!(e=i.getItem(e)))return
var s,n
const o=e.dataset.value
s=Q(e),e.remove(),e.classList.contains("active")&&(n=i.activeItems.indexOf(e),i.activeItems.splice(n,1),z(e,"active")),i.items.splice(s,1),i.lastQuery=null,!i.settings.persist&&i.userOptions.hasOwnProperty(o)&&i.removeOption(o,t),s<i.caretPos&&i.setCaret(i.caretPos-1),i.updateOriginalInput({silent:t}),i.refreshState(),i.positionDropdown(),i.trigger("item_remove",o,e)}createItem(e=null,t=(()=>{})){3===arguments.length&&(t=arguments[2]),"function"!=typeof t&&(t=()=>{})
var i,s=this,n=s.caretPos
if(e=e||s.inputValue(),!s.canCreate(e))return t(),!1
s.lock()
var o=!1,r=e=>{if(s.unlock(),!e||"object"!=typeof e)return t()
var i=Y(e[s.settings.valueField])
if("string"!=typeof i)return t()
s.setTextboxValue(),s.addOption(e,!0),s.setCaret(n),s.addItem(i),t(e),o=!0}
return i="function"==typeof s.settings.create?s.settings.create.call(this,e,r):{[s.settings.labelField]:e,[s.settings.valueField]:e},o||r(i),!0}refreshItems(){var e=this
e.lastQuery=null,e.isSetup&&e.addItems(e.items),e.updateOriginalInput(),e.refreshState()}refreshState(){const e=this
e.refreshValidityState()
const t=e.isFull(),i=e.isLocked
e.wrapper.classList.toggle("rtl",e.rtl)
const s=e.wrapper.classList
var n
s.toggle("focus",e.isFocused),s.toggle("disabled",e.isDisabled),s.toggle("required",e.isRequired),s.toggle("invalid",!e.isValid),s.toggle("locked",i),s.toggle("full",t),s.toggle("input-active",e.isFocused&&!e.isInputHidden),s.toggle("dropdown-active",e.isOpen),s.toggle("has-options",(n=e.options,0===Object.keys(n).length)),s.toggle("has-items",e.items.length>0)}refreshValidityState(){var e=this
e.input.validity&&(e.isValid=e.input.validity.valid,e.isInvalid=!e.isValid)}isFull(){return null!==this.settings.maxItems&&this.items.length>=this.settings.maxItems}updateOriginalInput(e={}){const t=this
var i,s
const n=t.input.querySelector('option[value=""]')
if(t.is_select_tag){const e=[],r=t.input.querySelectorAll("option:checked").length
function o(i,s,o){return i||(i=V('<option value="'+ee(s)+'">'+ee(o)+"</option>")),i!=n&&t.input.append(i),e.push(i),(i!=n||r>0)&&(i.selected=!0),i}t.input.querySelectorAll("option:checked").forEach((e=>{e.selected=!1})),0==t.items.length&&"single"==t.settings.mode?o(n,"",""):t.items.forEach((n=>{if(i=t.options[n],s=i[t.settings.labelField]||"",e.includes(i.$option)){o(t.input.querySelector(`option[value="${le(n)}"]:not(:checked)`),n,s)}else i.$option=o(i.$option,n,s)}))}else t.input.value=t.getValue()
t.isSetup&&(e.silent||t.trigger("change",t.getValue()))}open(){var e=this
e.isLocked||e.isOpen||"multi"===e.settings.mode&&e.isFull()||(e.isOpen=!0,G(e.focus_node,{"aria-expanded":"true"}),e.refreshState(),N(e.dropdown,{visibility:"hidden",display:"block"}),e.positionDropdown(),N(e.dropdown,{visibility:"visible",display:"block"}),e.focus(),e.trigger("dropdown_open",e.dropdown))}close(e=!0){var t=this,i=t.isOpen
e&&(t.setTextboxValue(),"single"===t.settings.mode&&t.items.length&&t.hideInput()),t.isOpen=!1,G(t.focus_node,{"aria-expanded":"false"}),N(t.dropdown,{display:"none"}),t.settings.hideSelected&&t.clearActiveOption(),t.refreshState(),i&&t.trigger("dropdown_close",t.dropdown)}positionDropdown(){if("body"===this.settings.dropdownParent){var e=this.control,t=e.getBoundingClientRect(),i=e.offsetHeight+t.top+window.scrollY,s=t.left+window.scrollX
N(this.dropdown,{width:t.width+"px",top:i+"px",left:s+"px"})}}clear(e){var t=this
if(t.items.length){var i=t.controlChildren()
E(i,(e=>{t.removeItem(e,!0)})),t.showInput(),e||t.updateOriginalInput(),t.trigger("clear")}}insertAtCaret(e){const t=this,i=t.caretPos,s=t.control
s.insertBefore(e,s.children[i]||null),t.setCaret(i+1)}deleteSelection(e){var t,i,s,n,o,r=this
t=e&&8===e.keyCode?-1:1,i={start:(o=r.control_input).selectionStart||0,length:(o.selectionEnd||0)-(o.selectionStart||0)}
const l=[]
if(r.activeItems.length)n=K(r.activeItems,t),s=Q(n),t>0&&s++,E(r.activeItems,(e=>l.push(e)))
else if((r.isFocused||"single"===r.settings.mode)&&r.items.length){const e=r.controlChildren()
let s
t<0&&0===i.start&&0===i.length?s=e[r.caretPos-1]:t>0&&i.start===r.inputValue().length&&(s=e[r.caretPos]),void 0!==s&&l.push(s)}if(!r.shouldDelete(l,e))return!1
for(se(e,!0),void 0!==s&&r.setCaret(s);l.length;)r.removeItem(l.pop())
return r.showInput(),r.positionDropdown(),r.refreshOptions(!1),!0}shouldDelete(e,t){const i=e.map((e=>e.dataset.value))
return!(!i.length||"function"==typeof this.settings.onDelete&&!1===this.settings.onDelete(i,t))}advanceSelection(e,t){var i,s,n=this
n.rtl&&(e*=-1),n.inputValue().length||(oe(W,t)||oe("shiftKey",t)?(s=(i=n.getLastActive(e))?i.classList.contains("active")?n.getAdjacent(i,e,"item"):i:e>0?n.control_input.nextElementSibling:n.control_input.previousElementSibling)&&(s.classList.contains("active")&&n.removeActiveItem(i),n.setActiveItemClass(s)):n.moveCaret(e))}moveCaret(e){}getLastActive(e){let t=this.control.querySelector(".last-active")
if(t)return t
var i=this.control.querySelectorAll(".active")
return i?K(i,e):void 0}setCaret(e){this.caretPos=this.items.length}controlChildren(){return Array.from(this.control.querySelectorAll("[data-ts-item]"))}lock(){this.isLocked=!0,this.refreshState()}unlock(){this.isLocked=!1,this.refreshState()}disable(){var e=this
e.input.disabled=!0,e.control_input.disabled=!0,e.focus_node.tabIndex=-1,e.isDisabled=!0,this.close(),e.lock()}enable(){var e=this
e.input.disabled=!1,e.control_input.disabled=!1,e.focus_node.tabIndex=e.tabIndex,e.isDisabled=!1,e.unlock()}destroy(){var e=this,t=e.revertSettings
e.trigger("destroy"),e.off(),e.wrapper.remove(),e.dropdown.remove(),e.input.innerHTML=t.innerHTML,e.input.tabIndex=t.tabIndex,z(e.input,"tomselected","ts-hidden-accessible"),e._destroy(),delete e.input.tomselect}render(e,t){var i,s
const n=this
if("function"!=typeof this.settings.render[e])return null
if(!(s=n.settings.render[e].call(this,t,ee)))return null
if(s=V(s),"option"===e||"option_create"===e?t[n.settings.disabledField]?G(s,{"aria-disabled":"true"}):G(s,{"data-selectable":""}):"optgroup"===e&&(i=t.group[n.settings.optgroupValueField],G(s,{"data-group":i}),t.group[n.settings.disabledField]&&G(s,{"data-disabled":""})),"option"===e||"item"===e){const i=Z(t[n.settings.valueField])
G(s,{"data-value":i}),"item"===e?(H(s,n.settings.itemClass),G(s,{"data-ts-item":""})):(H(s,n.settings.optionClass),G(s,{role:"option",id:t.$id}),t.$div=s,n.options[i]=t)}return s}_render(e,t){const i=this.render(e,t)
if(null==i)throw"HTMLElement expected"
return i}clearCache(){E(this.options,(e=>{e.$div&&(e.$div.remove(),delete e.$div)}))}uncacheValue(e){const t=this.getOption(e)
t&&t.remove()}canCreate(e){return this.settings.create&&e.length>0&&this.settings.createFilter.call(this,e)}hook(e,t,i){var s=this,n=s[t]
s[t]=function(){var t,o
return"after"===e&&(t=n.apply(s,arguments)),o=i.apply(s,arguments),"instead"===e?o:("before"===e&&(t=n.apply(s,arguments)),t)}}}return ue.define("change_listener",(function(){ne(this.input,"change",(()=>{this.sync()}))})),ue.define("checkbox_options",(function(){var e=this,t=e.onOptionSelect
e.settings.hideSelected=!1
var i=function(e){setTimeout((()=>{var t=e.querySelector("input")
t instanceof HTMLInputElement&&(e.classList.contains("selected")?t.checked=!0:t.checked=!1)}),1)}
e.hook("after","setupTemplates",(()=>{var t=e.settings.render.option
e.settings.render.option=(i,s)=>{var n=V(t.call(e,i,s)),o=document.createElement("input")
o.addEventListener("click",(function(e){se(e)})),o.type="checkbox"
const r=Y(i[e.settings.valueField])
return r&&e.items.indexOf(r)>-1&&(o.checked=!0),n.prepend(o),n}})),e.on("item_remove",(t=>{var s=e.getOption(t)
s&&(s.classList.remove("selected"),i(s))})),e.on("item_add",(t=>{var s=e.getOption(t)
s&&i(s)})),e.hook("instead","onOptionSelect",((s,n)=>{if(n.classList.contains("selected"))return n.classList.remove("selected"),e.removeItem(n.dataset.value),e.refreshOptions(),void se(s,!0)
t.call(e,s,n),i(n)}))})),ue.define("clear_button",(function(e){const t=this,i=Object.assign({className:"clear-button",title:"Clear All",html:e=>`<div class="${e.className}" title="${e.title}">&#10799;</div>`},e)
t.on("initialize",(()=>{var e=V(i.html(i))
e.addEventListener("click",(e=>{t.isDisabled||(t.clear(),"single"===t.settings.mode&&t.settings.allowEmptyOption&&t.addItem(""),e.preventDefault(),e.stopPropagation())})),t.control.appendChild(e)}))})),ue.define("drag_drop",(function(){var e=this
if(!$.fn.sortable)throw new Error('The "drag_drop" plugin requires jQuery UI "sortable".')
if("multi"===e.settings.mode){var t=e.lock,i=e.unlock
e.hook("instead","lock",(()=>{var i=$(e.control).data("sortable")
return i&&i.disable(),t.call(e)})),e.hook("instead","unlock",(()=>{var t=$(e.control).data("sortable")
return t&&t.enable(),i.call(e)})),e.on("initialize",(()=>{var t=$(e.control).sortable({items:"[data-value]",forcePlaceholderSize:!0,disabled:e.isLocked,start:(e,i)=>{i.placeholder.css("width",i.helper.css("width")),t.css({overflow:"visible"})},stop:()=>{t.css({overflow:"hidden"})
var i=[]
t.children("[data-value]").each((function(){this.dataset.value&&i.push(this.dataset.value)})),e.setValue(i)}})}))}})),ue.define("dropdown_header",(function(e){const t=this,i=Object.assign({title:"Untitled",headerClass:"dropdown-header",titleRowClass:"dropdown-header-title",labelClass:"dropdown-header-label",closeClass:"dropdown-header-close",html:e=>'<div class="'+e.headerClass+'"><div class="'+e.titleRowClass+'"><span class="'+e.labelClass+'">'+e.title+'</span><a class="'+e.closeClass+'">&times;</a></div></div>'},e)
t.on("initialize",(()=>{var e=V(i.html(i)),s=e.querySelector("."+i.closeClass)
s&&s.addEventListener("click",(e=>{se(e,!0),t.close()})),t.dropdown.insertBefore(e,t.dropdown.firstChild)}))})),ue.define("caret_position",(function(){var e=this
e.hook("instead","setCaret",(t=>{"single"!==e.settings.mode&&e.control.contains(e.control_input)?(t=Math.max(0,Math.min(e.items.length,t)))==e.caretPos||e.isPending||e.controlChildren().forEach(((i,s)=>{s<t?e.control_input.insertAdjacentElement("beforebegin",i):e.control.appendChild(i)})):t=e.items.length,e.caretPos=t})),e.hook("instead","moveCaret",(t=>{if(!e.isFocused)return
const i=e.getLastActive(t)
if(i){const s=Q(i)
e.setCaret(t>0?s+1:s),e.setActiveItem(),z(i,"last-active")}else e.setCaret(e.caretPos+t)}))})),ue.define("dropdown_input",(function(){const e=this
e.settings.shouldOpen=!0,e.hook("before","setup",(()=>{e.focus_node=e.control,H(e.control_input,"dropdown-input")
const t=V('<div class="dropdown-input-wrap">')
t.append(e.control_input),e.dropdown.insertBefore(t,e.dropdown.firstChild)
const i=V('<input class="items-placeholder" tabindex="-1" />')
i.placeholder=e.settings.placeholder||"",e.control.append(i)})),e.on("initialize",(()=>{e.control_input.addEventListener("keydown",(t=>{switch(t.keyCode){case 27:return e.isOpen&&(se(t,!0),e.close()),void e.clearActiveItems()
case 9:e.focus_node.tabIndex=-1}return e.onKeyDown.call(e,t)})),e.on("blur",(()=>{e.focus_node.tabIndex=e.isDisabled?-1:e.tabIndex})),e.on("dropdown_open",(()=>{e.control_input.focus()}))
const t=e.onBlur
e.hook("instead","onBlur",(i=>{if(!i||i.relatedTarget!=e.control_input)return t.call(e)})),ne(e.control_input,"blur",(()=>e.onBlur())),e.hook("before","close",(()=>{e.isOpen&&e.focus_node.focus({preventScroll:!0})}))}))})),ue.define("input_autogrow",(function(){var e=this
e.on("initialize",(()=>{var t=document.createElement("span"),i=e.control_input
t.style.cssText="position:absolute; top:-99999px; left:-99999px; width:auto; padding:0; white-space:pre; ",e.wrapper.appendChild(t)
for(const e of["letterSpacing","fontSize","fontFamily","fontWeight","textTransform"])t.style[e]=i.style[e]
var s=()=>{t.textContent=i.value,i.style.width=t.clientWidth+"px"}
s(),e.on("update item_add item_remove",s),ne(i,"input",s),ne(i,"keyup",s),ne(i,"blur",s),ne(i,"update",s)}))})),ue.define("no_backspace_delete",(function(){var e=this,t=e.deleteSelection
this.hook("instead","deleteSelection",(i=>!!e.activeItems.length&&t.call(e,i)))})),ue.define("no_active_items",(function(){this.hook("instead","setActiveItem",(()=>{})),this.hook("instead","selectAll",(()=>{}))})),ue.define("optgroup_columns",(function(){var e=this,t=e.onKeyDown
e.hook("instead","onKeyDown",(i=>{var s,n,o,r
if(!e.isOpen||37!==i.keyCode&&39!==i.keyCode)return t.call(e,i)
e.ignoreHover=!0,r=B(e.activeOption,"[data-group]"),s=Q(e.activeOption,"[data-selectable]"),r&&(r=37===i.keyCode?r.previousSibling:r.nextSibling)&&(n=(o=r.querySelectorAll("[data-selectable]"))[Math.min(o.length-1,s)])&&e.setActiveOption(n)}))})),ue.define("remove_button",(function(e){const t=Object.assign({label:"&times;",title:"Remove",className:"remove",append:!0},e)
var i=this
if(t.append){var s='<a href="javascript:void(0)" class="'+t.className+'" tabindex="-1" title="'+ee(t.title)+'">'+t.label+"</a>"
i.hook("after","setupTemplates",(()=>{var e=i.settings.render.item
i.settings.render.item=(t,n)=>{var o=V(e.call(i,t,n)),r=V(s)
return o.appendChild(r),ne(r,"mousedown",(e=>{se(e,!0)})),ne(r,"click",(e=>{se(e,!0),i.isLocked||i.shouldDelete([o],e)&&(i.removeItem(o),i.refreshOptions(!1),i.inputState())})),o}}))}})),ue.define("restore_on_backspace",(function(e){const t=this,i=Object.assign({text:e=>e[t.settings.labelField]},e)
t.on("item_remove",(function(e){if(t.isFocused&&""===t.control_input.value.trim()){var s=t.options[e]
s&&t.setTextboxValue(i.text.call(t,s))}}))})),ue.define("virtual_scroll",(function(){const e=this,t=e.canLoad,i=e.clearActiveOption,s=e.loadCallback
var n,o,r={},l=!1,a=[]
if(e.settings.shouldLoadMore||(e.settings.shouldLoadMore=()=>{if(n.clientHeight/(n.scrollHeight-n.scrollTop)>.9)return!0
if(e.activeOption){var t=e.selectable()
if(Array.from(t).indexOf(e.activeOption)>=t.length-2)return!0}return!1}),!e.settings.firstUrl)throw"virtual_scroll plugin requires a firstUrl() method"
e.settings.sortField=[{field:"$order"},{field:"$score"}]
const c=t=>!("number"==typeof e.settings.maxOptions&&n.children.length>=e.settings.maxOptions)&&!(!(t in r)||!r[t]),d=(t,i)=>e.items.indexOf(i)>=0||a.indexOf(i)>=0
e.setNextUrl=(e,t)=>{r[e]=t},e.getUrl=t=>{if(t in r){const e=r[t]
return r[t]=!1,e}return r={},e.settings.firstUrl.call(e,t)},e.hook("instead","clearActiveOption",(()=>{if(!l)return i.call(e)})),e.hook("instead","canLoad",(i=>i in r?c(i):t.call(e,i))),e.hook("instead","loadCallback",((t,i)=>{if(l){if(o){const i=t[0]
void 0!==i&&(o.dataset.value=i[e.settings.valueField])}}else e.clearOptions(d)
s.call(e,t,i),l=!1})),e.hook("after","refreshOptions",(()=>{const t=e.lastValue
var i
c(t)?(i=e.render("loading_more",{query:t}))&&(i.setAttribute("data-selectable",""),o=i):t in r&&!n.querySelector(".no-results")&&(i=e.render("no_more_results",{query:t})),i&&(H(i,e.settings.optionClass),n.append(i))})),e.on("initialize",(()=>{a=Object.keys(e.options),n=e.dropdown_content,e.settings.render=Object.assign({},{loading_more:()=>'<div class="loading-more-results">Loading more results ... </div>',no_more_results:()=>'<div class="no-more-results">No more results</div>'},e.settings.render),n.addEventListener("scroll",(()=>{e.settings.shouldLoadMore.call(e)&&c(e.lastValue)&&(l||(l=!0,e.load.call(e,e.lastValue)))}))}))})),ue}))
var tomSelect=function(e,t){return new TomSelect(e,t)}
//# sourceMappingURL=tom-select.complete.min.js.map
