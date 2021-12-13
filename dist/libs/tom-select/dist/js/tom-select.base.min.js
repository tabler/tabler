/**
* Tom Select v1.7.8
* Licensed under the Apache License, Version 2.0 (the "License");
*/
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).TomSelect=t()}(this,(function(){"use strict"
function e(e,t){e.split(/\s+/).forEach((e=>{t(e)}))}class t{constructor(){this._events={}}on(t,i){e(t,(e=>{this._events[e]=this._events[e]||[],this._events[e].push(i)}))}off(t,i){var s=arguments.length
0!==s?e(t,(e=>{if(1===s)return delete this._events[e]
e in this._events!=!1&&this._events[e].splice(this._events[e].indexOf(i),1)})):this._events={}}trigger(t,...i){var s=this
e(t,(e=>{if(e in s._events!=!1)for(let t of s._events[e])t.apply(s,i)}))}}var i
const s="[̀-ͯ·ʾ]",n=new RegExp(s,"g")
var o
const r={"æ":"ae","ⱥ":"a","ø":"o"},l=new RegExp(Object.keys(r).join("|"),"g"),a=[[67,67],[160,160],[192,438],[452,652],[961,961],[1019,1019],[1083,1083],[1281,1289],[1984,1984],[5095,5095],[7429,7441],[7545,7549],[7680,7935],[8580,8580],[9398,9449],[11360,11391],[42792,42793],[42802,42851],[42873,42897],[42912,42922],[64256,64260],[65313,65338],[65345,65370]],c=e=>e.normalize("NFKD").replace(n,"").toLowerCase().replace(l,(function(e){return r[e]})),d=(e,t="|")=>e.length>1?"(?:"+e.join(t)+")":e[0],p=e=>{if(1===e.length)return[[e]]
var t=[]
return p(e.substring(1)).forEach((function(i){var s=i.slice(0)
s[0]=e.charAt(0)+s[0],t.push(s),(s=i.slice(0)).unshift(e.charAt(0)),t.push(s)})),t},u=e=>{void 0===o&&(o=(()=>{var e={}
a.forEach((t=>{for(let i=t[0];i<=t[1];i++){let t=String.fromCharCode(i),s=c(t)
s!=t.toLowerCase()&&(s in e||(e[s]=[s]),e[s].push(t))}}))
var t=Object.keys(e)
t=t.sort(((e,t)=>t.length-e.length)),i=new RegExp("("+d(t)+"[̀-ͯ·ʾ]*)","g")
var s={}
return t.sort(((e,t)=>e.length-t.length)).forEach((t=>{var i=p(t).map((t=>(t=t.map((t=>e.hasOwnProperty(t)?d(e[t]):t)),d(t,""))))
s[t]=d(i)})),s})())
return e.normalize("NFKD").toLowerCase().split(i).map((e=>{if(""==e)return""
const t=c(e)
if(o.hasOwnProperty(t))return o[t]
const i=e.normalize("NFC")
return i!=e?d([e,i]):e})).join("")},h=(e,t)=>{if(e)return e[t]},g=(e,t)=>{if(e){for(var i,s=t.split(".");(i=s.shift())&&(e=e[i]););return e}},m=(e,t,i)=>{var s,n
return e?-1===(n=(e+="").search(t.regex))?0:(s=t.string.length/e.length,0===n&&(s+=.5),s*i):0},f=e=>(e+"").replace(/([\$\(-\+\.\?\[-\^\{-\}])/g,"\\$1"),v=(e,t)=>{var i=e[t]
i&&!Array.isArray(i)&&(e[t]=[i])},y=(e,t)=>{if(Array.isArray(e))e.forEach(t)
else for(var i in e)e.hasOwnProperty(i)&&t(e[i],i)},O=(e,t)=>"number"==typeof e&&"number"==typeof t?e>t?1:e<t?-1:0:(e=c(e+"").toLowerCase())>(t=c(t+"").toLowerCase())?1:t>e?-1:0
class b{constructor(e,t){this.items=e,this.settings=t||{diacritics:!0}}tokenize(e,t,i){if(!e||!e.length)return[]
const s=[],n=e.split(/\s+/)
var o
return i&&(o=new RegExp("^("+Object.keys(i).map(f).join("|")+"):(.*)$")),n.forEach((e=>{let i,n=null,r=null
o&&(i=e.match(o))&&(n=i[1],e=i[2]),e.length>0&&(r=f(e),this.settings.diacritics&&(r=u(r)),t&&(r="\\b"+r)),s.push({string:e,regex:r?new RegExp(r,"iu"):null,field:n})})),s}getScoreFunction(e,t){var i=this.prepareSearch(e,t)
return this._getScoreFunction(i)}_getScoreFunction(e){const t=e.tokens,i=t.length
if(!i)return function(){return 0}
const s=e.options.fields,n=e.weights,o=s.length,r=e.getAttrFn
if(!o)return function(){return 1}
const l=1===o?function(e,t){const i=s[0].field
return m(r(t,i),e,n[i])}:function(e,t){var i=0
if(e.field){const s=r(t,e.field)
!e.regex&&s?i+=1/o:i+=m(s,e,1)}else y(n,((s,n)=>{i+=m(r(t,n),e,s)}))
return i/o}
return 1===i?function(e){return l(t[0],e)}:"and"===e.options.conjunction?function(e){for(var s,n=0,o=0;n<i;n++){if((s=l(t[n],e))<=0)return 0
o+=s}return o/i}:function(e){var s=0
return y(t,(t=>{s+=l(t,e)})),s/i}}getSortFunction(e,t){var i=this.prepareSearch(e,t)
return this._getSortFunction(i)}_getSortFunction(e){var t,i,s
const n=this,o=e.options,r=!e.query&&o.sort_empty?o.sort_empty:o.sort,l=[],a=[],c=function(t,i){return"$score"===t?i.score:e.getAttrFn(n.items[i.id],t)}
if(r)for(t=0,i=r.length;t<i;t++)(e.query||"$score"!==r[t].field)&&l.push(r[t])
if(e.query){for(s=!0,t=0,i=l.length;t<i;t++)if("$score"===l[t].field){s=!1
break}s&&l.unshift({field:"$score",direction:"desc"})}else for(t=0,i=l.length;t<i;t++)if("$score"===l[t].field){l.splice(t,1)
break}for(t=0,i=l.length;t<i;t++)a.push("desc"===l[t].direction?-1:1)
const d=l.length
if(d){if(1===d){const e=l[0].field,t=a[0]
return function(i,s){return t*O(c(e,i),c(e,s))}}return function(e,t){var i,s,n
for(i=0;i<d;i++)if(n=l[i].field,s=a[i]*O(c(n,e),c(n,t)))return s
return 0}}return null}prepareSearch(e,t){const i={}
var s=Object.assign({},t)
if(v(s,"sort"),v(s,"sort_empty"),s.fields){v(s,"fields")
const e=[]
s.fields.forEach((t=>{"string"==typeof t&&(t={field:t,weight:1}),e.push(t),i[t.field]="weight"in t?t.weight:1})),s.fields=e}return{options:s,query:e.toLowerCase().trim(),tokens:this.tokenize(e,s.respect_word_boundaries,i),total:0,items:[],weights:i,getAttrFn:s.nesting?g:h}}search(e,t){var i,s,n=this
s=this.prepareSearch(e,t),t=s.options,e=s.query
const o=t.score||n._getScoreFunction(s)
e.length?y(n.items,((e,n)=>{i=o(e),(!1===t.filter||i>0)&&s.items.push({score:i,id:n})})):y(n.items,((e,t)=>{s.items.push({score:1,id:t})}))
const r=n._getSortFunction(s)
return r&&s.items.sort(r),s.total=s.items.length,"number"==typeof t.limit&&(s.items=s.items.slice(0,t.limit)),s}}const w=e=>{if(e.jquery)return e[0]
if(e instanceof HTMLElement)return e
if(e.indexOf("<")>-1){let t=document.createElement("div")
return t.innerHTML=e.trim(),t.firstChild}return document.querySelector(e)},I=(e,t)=>{var i=document.createEvent("HTMLEvents")
i.initEvent(t,!0,!1),e.dispatchEvent(i)},C=(e,t)=>{Object.assign(e.style,t)},A=(e,...t)=>{var i=S(t);(e=F(e)).map((e=>{i.map((t=>{e.classList.add(t)}))}))},_=(e,...t)=>{var i=S(t);(e=F(e)).map((e=>{i.map((t=>{e.classList.remove(t)}))}))},S=e=>{var t=[]
for(let i of e)"string"==typeof i&&(i=i.trim().split(/[\11\12\14\15\40]/)),Array.isArray(i)&&(t=t.concat(i))
return t.filter(Boolean)},F=e=>(Array.isArray(e)||(e=[e]),e),x=(e,t,i)=>{if(!i||i.contains(e))for(;e&&e.matches;){if(e.matches(t))return e
e=e.parentNode}},k=(e,t=0)=>t>0?e[e.length-1]:e[0],P=(e,t)=>{if(!e)return-1
t=t||e.nodeName
for(var i=0;e=e.previousElementSibling;)e.matches(t)&&i++
return i},L=(e,t)=>{for(const i in t){let s=t[i]
null==s?e.removeAttribute(i):e.setAttribute(i,""+s)}},E=(e,t)=>{e.parentNode&&e.parentNode.replaceChild(t,e)},T=(e,t)=>{if(null===t)return
if("string"==typeof t){if(!t.length)return
t=new RegExp(t,"i")}const i=e=>3===e.nodeType?(e=>{var i=e.data.match(t)
if(i&&e.data.length>0){var s=document.createElement("span")
s.className="highlight"
var n=e.splitText(i.index)
n.splitText(i[0].length)
var o=n.cloneNode(!0)
return s.appendChild(o),E(n,s),1}return 0})(e):((e=>{if(1===e.nodeType&&e.childNodes&&!/(script|style)/i.test(e.tagName)&&("highlight"!==e.className||"SPAN"!==e.tagName))for(var t=0;t<e.childNodes.length;++t)t+=i(e.childNodes[t])})(e),0)
i(e)},q="undefined"!=typeof navigator&&/Mac/.test(navigator.userAgent)?"metaKey":"ctrlKey"
var V={options:[],optgroups:[],plugins:[],delimiter:",",splitOn:null,persist:!0,diacritics:!0,create:null,createOnBlur:!1,createFilter:null,highlight:!0,openOnFocus:!0,shouldOpen:null,maxOptions:50,maxItems:null,hideSelected:null,duplicates:!1,addPrecedence:!1,selectOnTab:!1,preload:null,allowEmptyOption:!1,closeAfterSelect:!1,loadThrottle:300,loadingClass:"loading",dataAttr:null,optgroupField:"optgroup",valueField:"value",labelField:"text",disabledField:"disabled",optgroupLabelField:"label",optgroupValueField:"value",lockOptgroupOrder:!1,sortField:"$order",searchField:["text"],searchConjunction:"and",mode:null,wrapperClass:"ts-control",inputClass:"ts-input",dropdownClass:"ts-dropdown",dropdownContentClass:"ts-dropdown-content",itemClass:"item",optionClass:"option",dropdownParent:null,controlInput:null,copyClassesToDropdown:!0,placeholder:null,hidePlaceholder:null,shouldLoad:function(e){return e.length>0},render:{}}
const j=e=>null==e?null:$(e),$=e=>"boolean"==typeof e?e?"1":"0":e+"",D=e=>(e+"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"),N=(e,t)=>{var i
return function(s,n){var o=this
i&&(o.loading=Math.max(o.loading-1,0),clearTimeout(i)),i=setTimeout((function(){i=null,o.loadedSearches[s]=!0,e.call(o,s,n)}),t)}},R=(e,t,i)=>{var s,n=e.trigger,o={}
for(s in e.trigger=function(){var i=arguments[0]
if(-1===t.indexOf(i))return n.apply(e,arguments)
o[i]=arguments},i.apply(e,[]),e.trigger=n,o)n.apply(e,o[s])},H=(e,t=!1)=>{e&&(e.preventDefault(),t&&e.stopPropagation())},z=(e,t,i,s)=>{e.addEventListener(t,i,s)},K=(e,t)=>!!t&&(!!t[e]&&1===(t.altKey?1:0)+(t.ctrlKey?1:0)+(t.shiftKey?1:0)+(t.metaKey?1:0)),M=(e,t)=>{const i=e.getAttribute("id")
return i||(e.setAttribute("id",t),t)},B=e=>e.replace(/[\\"']/g,"\\$&"),Q=(e,t)=>{t&&e.append(t)}
var G=0
class U extends(function(e){return e.plugins={},class extends e{constructor(...e){super(...e),this.plugins={names:[],settings:{},requested:{},loaded:{}}}static define(t,i){e.plugins[t]={name:t,fn:i}}initializePlugins(e){var t,i
const s=this,n=[]
if(Array.isArray(e))e.forEach((e=>{"string"==typeof e?n.push(e):(s.plugins.settings[e.name]=e.options,n.push(e.name))}))
else if(e)for(t in e)e.hasOwnProperty(t)&&(s.plugins.settings[t]=e[t],n.push(t))
for(;i=n.shift();)s.require(i)}loadPlugin(t){var i=this,s=i.plugins,n=e.plugins[t]
if(!e.plugins.hasOwnProperty(t))throw new Error('Unable to find "'+t+'" plugin')
s.requested[t]=!0,s.loaded[t]=n.fn.apply(i,[i.plugins.settings[t]||{}]),s.names.push(t)}require(e){var t=this,i=t.plugins
if(!t.plugins.loaded.hasOwnProperty(e)){if(i.requested[e])throw new Error('Plugin has circular dependency ("'+e+'")')
t.loadPlugin(e)}return i.loaded[e]}}}(t)){constructor(e,t){var i
super(),this.order=0,this.tab_key=!1,this.isOpen=!1,this.isDisabled=!1,this.isInvalid=!1,this.isLocked=!1,this.isFocused=!1,this.isInputHidden=!1,this.isSetup=!1,this.ignoreFocus=!1,this.hasOptions=!1,this.lastValue="",this.caretPos=0,this.loading=0,this.loadedSearches={},this.activeOption=null,this.activeItems=[],this.optgroups={},this.options={},this.userOptions={},this.items=[],this.renderCache={item:{},option:{}},G++
var s=w(e),n=this
if(s.tomselect)throw new Error("Tom Select already initialized on this element")
s.tomselect=this,i=(window.getComputedStyle&&window.getComputedStyle(s,null)).getPropertyValue("direction"),this.settings=function(e,t){var i=Object.assign({},V,t),s=i.dataAttr,n=i.labelField,o=i.valueField,r=i.disabledField,l=i.optgroupField,a=i.optgroupLabelField,c=i.optgroupValueField,d=e.tagName.toLowerCase(),p=e.getAttribute("placeholder")||e.getAttribute("data-placeholder")
if(!p&&!i.allowEmptyOption){let t=e.querySelector('option[value=""]')
t&&(p=t.textContent)}var u={placeholder:p,options:[],optgroups:[],items:[],maxItems:null}
return"select"===d?(()=>{var t,d=u.options,p={},h=1,g=e=>{var t=Object.assign({},e.dataset),i=s&&t[s]
return"string"==typeof i&&i.length&&(t=Object.assign(t,JSON.parse(i))),t},m=(e,t)=>{var s=j(e.value)
if(null!=s&&(s||i.allowEmptyOption)){if(p.hasOwnProperty(s)){if(t){var a=p[s][l]
a?Array.isArray(a)?a.push(t):p[s][l]=[a,t]:p[s][l]=t}}else{var c=g(e)
c[n]=c[n]||e.textContent,c[o]=c[o]||s,c[r]=c[r]||e.disabled,c[l]=c[l]||t,c.$option=e,p[s]=c,d.push(c)}e.selected&&u.items.push(s)}},f=e=>{var t,i;(i=g(e))[a]=i[a]||e.getAttribute("label")||"",i[c]=i[c]||h++,i[r]=i[r]||e.disabled,u.optgroups.push(i),t=i[c]
for(const i of e.children)m(i,t)}
u.maxItems=e.hasAttribute("multiple")?null:1
for(const i of e.children)"optgroup"===(t=i.tagName.toLowerCase())?f(i):"option"===t&&m(i)})():(()=>{const t=e.getAttribute(s)
if(t){u.options=JSON.parse(t)
for(const e of u.options)u.items.push(e[o])}else{var r=e.value.trim()||""
if(!i.allowEmptyOption&&!r.length)return
const t=r.split(i.delimiter)
for(const e of t){const t={}
t[n]=e,t[o]=e,u.options.push(t)}u.items=t}})(),Object.assign({},V,u,t)}(s,t),this.input=s,this.tabIndex=s.tabIndex||0,this.is_select_tag="select"===s.tagName.toLowerCase(),this.rtl=/rtl/i.test(i),this.inputId=M(s,"tomselect-"+G),this.isRequired=s.required,this.sifter=new b(this.options,{diacritics:this.settings.diacritics}),this.setupOptions(this.settings.options,this.settings.optgroups),delete this.settings.optgroups,delete this.settings.options,this.settings.mode=this.settings.mode||(1===this.settings.maxItems?"single":"multi"),"boolean"!=typeof this.settings.hideSelected&&(this.settings.hideSelected="multi"===this.settings.mode),"boolean"!=typeof this.settings.hidePlaceholder&&(this.settings.hidePlaceholder="multi"!==this.settings.mode)
var o=this.settings.createFilter
"function"!=typeof o&&("string"==typeof o&&(o=new RegExp(o)),o instanceof RegExp?this.settings.createFilter=e=>o.test(e):this.settings.createFilter=()=>!0),this.initializePlugins(this.settings.plugins),this.setupCallbacks(),this.setupTemplates()
var r,l,a,c,d,p,u,h,g
t=n.settings,s=n.input
const m={passive:!0},v=n.inputId+"-ts-dropdown"
if(p=n.settings.mode,u=s.getAttribute("class")||"",r=w("<div>"),A(r,t.wrapperClass,u,p),l=w('<div class="items">'),A(l,t.inputClass),Q(r,l),c=n._render("dropdown"),A(c,t.dropdownClass,p),d=w(`<div role="listbox" id="${v}" tabindex="-1">`),A(d,t.dropdownContentClass),Q(c,d),w(t.dropdownParent||r).appendChild(c),t.controlInput)a=w(t.controlInput)
else{a=w('<input type="text" autocomplete="off" size="1" />')
for(const e of["autocorrect","autocapitalize","autocomplete"])s.getAttribute(e)&&L(a,{[e]:s.getAttribute(e)})}t.controlInput||(a.tabIndex=s.disabled?-1:n.tabIndex,l.appendChild(a)),L(a,{role:"combobox",haspopup:"listbox","aria-expanded":"false","aria-controls":v}),g=M(a,n.inputId+"-tomselected")
let y="label[for='"+(e=>e.replace(/['"\\]/g,"\\$&"))(n.inputId)+"']",O=document.querySelector(y)
if(O){L(O,{for:g})
let e=M(O,n.inputId+"-ts-label")
L(d,{"aria-labelledby":e})}n.settings.copyClassesToDropdown&&A(c,u),r.style.width=s.style.width,n.plugins.names.length&&(h="plugin-"+n.plugins.names.join(" plugin-"),A([r,c],h)),(null===t.maxItems||t.maxItems>1)&&n.is_select_tag&&L(s,{multiple:"multiple"}),n.settings.placeholder&&L(a,{placeholder:t.placeholder}),!n.settings.splitOn&&n.settings.delimiter&&(n.settings.splitOn=new RegExp("\\s*"+f(n.settings.delimiter)+"+\\s*")),this.settings.load&&this.settings.loadThrottle&&(this.settings.load=N(this.settings.load,this.settings.loadThrottle)),this.control=l,this.control_input=a,this.wrapper=r,this.dropdown=c,this.dropdown_content=d,n.control_input.type=s.type,z(c,"click",(e=>{const t=x(e.target,"[data-selectable]")
t&&(n.onOptionSelect(e,t),H(e,!0))})),z(l,"click",(e=>{var t=x(e.target,"."+n.settings.itemClass,l)
t&&n.onItemSelect(e,t)?H(e,!0):""==a.value&&(n.onClick(),H(e,!0))})),z(a,"mousedown",(e=>{""!==a.value&&e.stopPropagation()})),z(a,"keydown",(e=>n.onKeyDown(e))),z(a,"keyup",(e=>n.onKeyUp(e))),z(a,"keypress",(e=>n.onKeyPress(e))),z(a,"resize",(()=>n.positionDropdown()),m),z(a,"blur",(()=>n.onBlur())),z(a,"focus",(e=>n.onFocus(e))),z(a,"paste",(e=>n.onPaste(e)))
const I=e=>{const t=e.composedPath()[0]
if(!r.contains(t)&&!c.contains(t))return n.isFocused&&n.blur(),void n.inputState()
H(e,!0)}
var C=()=>{n.isOpen&&n.positionDropdown()}
z(document,"mousedown",I),z(window,"sroll",C,m),z(window,"resize",C,m),this._destroy=()=>{document.removeEventListener("mousedown",I),window.removeEventListener("sroll",C),window.removeEventListener("resize",C)},this.revertSettings={innerHTML:s.innerHTML,tabIndex:s.tabIndex},s.tabIndex=-1,L(s,{hidden:"hidden"}),s.insertAdjacentElement("afterend",n.wrapper),n.setValue(t.items),t.items=[],z(s,"invalid",(e=>{H(e),n.isInvalid||(n.isInvalid=!0,n.refreshState())})),n.updateOriginalInput(),n.refreshItems(),n.close(!1),n.inputState(),n.isSetup=!0,s.disabled&&n.disable(),n.on("change",this.onChange),A(s,"tomselected"),n.trigger("initialize"),!0===t.preload&&n.load(""),n.setup()}setup(){}setupOptions(e=[],t=[]){for(const t of e)this.registerOption(t)
for(const e of t)this.registerOptionGroup(e)}setupTemplates(){var e=this,t=e.settings.labelField,i=e.settings.optgroupLabelField,s={optgroup:e=>{let t=document.createElement("div")
return t.className="optgroup",t.appendChild(e.options),t},optgroup_header:(e,t)=>'<div class="optgroup-header">'+t(e[i])+"</div>",option:(e,i)=>"<div>"+i(e[t])+"</div>",item:(e,i)=>"<div>"+i(e[t])+"</div>",option_create:(e,t)=>'<div class="create">Add <strong>'+t(e.input)+"</strong>&hellip;</div>",no_results:()=>'<div class="no-results">No results found</div>',loading:()=>'<div class="spinner"></div>',not_loading:()=>{},dropdown:()=>"<div></div>"}
e.settings.render=Object.assign({},s,e.settings.render)}setupCallbacks(){var e,t,i={initialize:"onInitialize",change:"onChange",item_add:"onItemAdd",item_remove:"onItemRemove",item_select:"onItemSelect",clear:"onClear",option_add:"onOptionAdd",option_remove:"onOptionRemove",option_clear:"onOptionClear",optgroup_add:"onOptionGroupAdd",optgroup_remove:"onOptionGroupRemove",optgroup_clear:"onOptionGroupClear",dropdown_open:"onDropdownOpen",dropdown_close:"onDropdownClose",type:"onType",load:"onLoad",focus:"onFocus",blur:"onBlur"}
for(e in i)(t=this.settings[i[e]])&&this.on(e,t)}onClick(){var e=this
if(e.activeItems.length>0)return e.clearActiveItems(),void e.focus()
e.isFocused&&e.isOpen?e.blur():e.focus()}onMouseDown(){}onChange(){I(this.input,"input"),I(this.input,"change")}onPaste(e){var t=this
t.isFull()||t.isInputHidden||t.isLocked?H(e):t.settings.splitOn&&setTimeout((()=>{var e=t.inputValue()
if(e.match(t.settings.splitOn)){var i=e.trim().split(t.settings.splitOn)
for(const e of i)t.createItem(e)}}),0)}onKeyPress(e){var t=this
if(!t.isLocked){var i=String.fromCharCode(e.keyCode||e.which)
return t.settings.create&&"multi"===t.settings.mode&&i===t.settings.delimiter?(t.createItem(),void H(e)):void 0}H(e)}onKeyDown(e){var t=this
if(t.isLocked)9!==e.keyCode&&H(e)
else{switch(e.keyCode){case 65:if(K(q,e))return void t.selectAll()
break
case 27:return t.isOpen&&(H(e,!0),t.close()),void t.clearActiveItems()
case 40:if(!t.isOpen&&t.hasOptions)t.open()
else if(t.activeOption){let e=t.getAdjacent(t.activeOption,1)
e&&t.setActiveOption(e)}return void H(e)
case 38:if(t.activeOption){let e=t.getAdjacent(t.activeOption,-1)
e&&t.setActiveOption(e)}return void H(e)
case 13:return void(t.isOpen&&t.activeOption?(t.onOptionSelect(e,t.activeOption),H(e)):t.settings.create&&t.createItem()&&H(e))
case 37:return void t.advanceSelection(-1,e)
case 39:return void t.advanceSelection(1,e)
case 9:return void(t.settings.selectOnTab&&(t.isOpen&&t.activeOption&&(t.tab_key=!0,t.onOptionSelect(e,t.activeOption),H(e),t.tab_key=!1),t.settings.create&&t.createItem()&&H(e)))
case 8:case 46:return void t.deleteSelection(e)}t.isInputHidden&&!K(q,e)&&H(e)}}onKeyUp(e){var t=this
if(t.isLocked)H(e)
else{var i=t.inputValue()
t.lastValue!==i&&(t.lastValue=i,t.settings.shouldLoad.call(t,i)&&t.load(i),t.refreshOptions(),t.trigger("type",i))}}onFocus(e){var t=this,i=t.isFocused
if(t.isDisabled)return t.blur(),void H(e)
t.ignoreFocus||(t.isFocused=!0,"focus"===t.settings.preload&&t.load(""),i||t.trigger("focus"),t.activeItems.length||(t.showInput(),t.refreshOptions(!!t.settings.openOnFocus)),t.refreshState())}onBlur(){var e=this
if(e.isFocused){e.isFocused=!1,e.ignoreFocus=!1
var t=()=>{e.close(),e.setActiveItem(),e.setCaret(e.items.length),e.trigger("blur")}
e.settings.create&&e.settings.createOnBlur?e.createItem(null,!1,t):t()}}onOptionSelect(e,t){var i,s=this
t&&(t.parentElement&&t.parentElement.matches("[data-disabled]")||(t.classList.contains("create")?s.createItem(null,!0,(()=>{s.settings.closeAfterSelect&&s.close()})):void 0!==(i=t.dataset.value)&&(s.lastQuery=null,s.addItem(i),s.settings.closeAfterSelect&&s.close(),!s.settings.hideSelected&&e.type&&/click/.test(e.type)&&s.setActiveOption(t))))}onItemSelect(e,t){var i=this
return!i.isLocked&&"multi"===i.settings.mode&&(H(e),i.setActiveItem(t,e),!0)}canLoad(e){return!!this.settings.load&&!this.loadedSearches.hasOwnProperty(e)}load(e){const t=this
if(!t.canLoad(e))return
A(t.wrapper,t.settings.loadingClass),t.loading++
const i=t.loadCallback.bind(t)
t.settings.load.call(t,e,i)}loadCallback(e,t){const i=this
i.loading=Math.max(i.loading-1,0),i.lastQuery=null,i.clearActiveOption(),i.setupOptions(e,t),i.refreshOptions(i.isFocused&&!i.isInputHidden),i.loading||_(i.wrapper,i.settings.loadingClass),i.trigger("load",e,t)}setTextboxValue(e=""){var t=this.control_input
t.value!==e&&(t.value=e,I(t,"update"),this.lastValue=e)}getValue(){return this.is_select_tag&&this.input.hasAttribute("multiple")?this.items:this.items.join(this.settings.delimiter)}setValue(e,t){R(this,t?[]:["change"],(()=>{this.clear(t),this.addItems(e,t)}))}setMaxItems(e){0===e&&(e=null),this.settings.maxItems=e,this.refreshState()}setActiveItem(e,t){var i,s,n,o,r,l,a=this
if("single"!==a.settings.mode){if(!e)return a.clearActiveItems(),void(a.isFocused&&a.showInput())
if("click"===(i=t&&t.type.toLowerCase())&&K("shiftKey",t)&&a.activeItems.length){for(l=a.getLastActive(),(n=Array.prototype.indexOf.call(a.control.children,l))>(o=Array.prototype.indexOf.call(a.control.children,e))&&(r=n,n=o,o=r),s=n;s<=o;s++)e=a.control.children[s],-1===a.activeItems.indexOf(e)&&a.setActiveItemClass(e)
H(t)}else"click"===i&&K(q,t)||"keydown"===i&&K("shiftKey",t)?e.classList.contains("active")?a.removeActiveItem(e):a.setActiveItemClass(e):(a.clearActiveItems(),a.setActiveItemClass(e))
a.hideInput(),a.isFocused||a.focus()}}setActiveItemClass(e){const t=this,i=t.control.querySelector(".last-active")
i&&_(i,"last-active"),A(e,"active last-active"),t.trigger("item_select",e),-1==t.activeItems.indexOf(e)&&t.activeItems.push(e)}removeActiveItem(e){var t=this.activeItems.indexOf(e)
this.activeItems.splice(t,1),_(e,"active")}clearActiveItems(){_(this.activeItems,"active"),this.activeItems=[]}setActiveOption(e){e!==this.activeOption&&(this.clearActiveOption(),e&&(this.activeOption=e,L(this.control_input,{"aria-activedescendant":e.getAttribute("id")}),L(e,{"aria-selected":"true"}),A(e,"active"),this.scrollToOption(e)))}scrollToOption(e,t){if(!e)return
const i=this.dropdown_content,s=i.clientHeight,n=i.scrollTop||0,o=e.offsetHeight,r=e.getBoundingClientRect().top-i.getBoundingClientRect().top+n
r+o>s+n?this.scroll(r-s+o,t):r<n&&this.scroll(r,t)}scroll(e,t){const i=this.dropdown_content
t&&(i.style.scrollBehavior=t),i.scrollTop=e,i.style.scrollBehavior=""}clearActiveOption(){this.activeOption&&(_(this.activeOption,"active"),L(this.activeOption,{"aria-selected":null})),this.activeOption=null,L(this.control_input,{"aria-activedescendant":null})}selectAll(){"single"!==this.settings.mode&&(this.activeItems=this.controlChildren(),this.activeItems.length&&(A(this.activeItems,"active"),this.hideInput(),this.close()),this.focus())}inputState(){var e=this
e.settings.controlInput||(e.activeItems.length>0||!e.isFocused&&this.settings.hidePlaceholder&&e.items.length>0?(e.setTextboxValue(),e.isInputHidden=!0,A(e.wrapper,"input-hidden")):(e.isInputHidden=!1,_(e.wrapper,"input-hidden")))}hideInput(){this.inputState()}showInput(){this.inputState()}inputValue(){return this.control_input.value.trim()}focus(){var e=this
e.isDisabled||(e.ignoreFocus=!0,e.control_input.focus(),setTimeout((()=>{e.ignoreFocus=!1,e.onFocus()}),0))}blur(){this.control_input.blur(),this.onBlur()}getScoreFunction(e){return this.sifter.getScoreFunction(e,this.getSearchOptions())}getSearchOptions(){var e=this.settings,t=e.sortField
return"string"==typeof e.sortField&&(t=[{field:e.sortField}]),{fields:e.searchField,conjunction:e.searchConjunction,sort:t,nesting:e.nesting}}search(e){var t,i,s,n=this,o=this.getSearchOptions()
if(n.settings.score&&"function"!=typeof(s=n.settings.score.call(n,e)))throw new Error('Tom Select "score" setting must be a function that returns a function')
if(e!==n.lastQuery?(n.lastQuery=e,i=n.sifter.search(e,Object.assign(o,{score:s})),n.currentResults=i):i=Object.assign({},n.currentResults),n.settings.hideSelected)for(t=i.items.length-1;t>=0;t--){let e=j(i.items[t].id)
e&&-1!==n.items.indexOf(e)&&i.items.splice(t,1)}return i}refreshOptions(e=!0){var t,i,s,n,o,r,l,a,c,d,p
const u={},h=[]
var g,m=this,f=m.inputValue(),v=m.search(f),y=m.activeOption,O=m.settings.shouldOpen||!1,b=m.dropdown_content
for(y&&(c=y.dataset.value,d=y.closest("[data-group]")),n=v.items.length,"number"==typeof m.settings.maxOptions&&(n=Math.min(n,m.settings.maxOptions)),n>0&&(O=!0),t=0;t<n;t++){let e=v.items[t].id,n=m.options[e],l=m.getOption(e,!0)
for(m.settings.hideSelected||l.classList.toggle("selected",m.items.includes(e)),o=n[m.settings.optgroupField]||"",i=0,s=(r=Array.isArray(o)?o:[o])&&r.length;i<s;i++)o=r[i],m.optgroups.hasOwnProperty(o)||(o=""),u.hasOwnProperty(o)||(u[o]=document.createDocumentFragment(),h.push(o)),i>0&&(l=l.cloneNode(!0),L(l,{id:n.$id+"-clone-"+i,"aria-selected":null}),l.classList.add("ts-cloned"),_(l,"active")),c==e&&d&&d.dataset.group===o&&(y=l),u[o].appendChild(l)}for(o of(this.settings.lockOptgroupOrder&&h.sort(((e,t)=>(m.optgroups[e]&&m.optgroups[e].$order||0)-(m.optgroups[t]&&m.optgroups[t].$order||0))),l=document.createDocumentFragment(),h))if(m.optgroups.hasOwnProperty(o)&&u[o].children.length){let e=document.createDocumentFragment(),t=m.render("optgroup_header",m.optgroups[o])
Q(e,t),Q(e,u[o])
let i=m.render("optgroup",{group:m.optgroups[o],options:e})
Q(l,i)}else Q(l,u[o])
if(b.innerHTML="",Q(b,l),m.settings.highlight&&(g=b.querySelectorAll("span.highlight"),Array.prototype.forEach.call(g,(function(e){var t=e.parentNode
t.replaceChild(e.firstChild,e),t.normalize()})),v.query.length&&v.tokens.length))for(const e of v.tokens)T(b,e.regex)
var w=e=>{let t=m.render(e,{input:f})
return t&&(O=!0,b.insertBefore(t,b.firstChild)),t}
if(m.settings.shouldLoad.call(m,f)?m.loading?w("loading"):0===v.items.length&&w("no_results"):w("not_loading"),(a=m.canCreate(f))&&(p=w("option_create")),m.hasOptions=v.items.length>0||a,O){if(v.items.length>0){if(!b.contains(y)&&"single"===m.settings.mode&&m.items.length&&(y=m.getOption(m.items[0])),!b.contains(y)){let e=0
p&&!m.settings.addPrecedence&&(e=1),y=m.selectable()[e]}}else p&&(y=p)
e&&!m.isOpen&&(m.open(),m.scrollToOption(y,"auto")),m.setActiveOption(y)}else m.clearActiveOption(),e&&m.isOpen&&m.close(!1)}selectable(){return this.dropdown_content.querySelectorAll("[data-selectable]")}addOption(e){var t,i=this
if(Array.isArray(e))for(const t of e)i.addOption(t)
else(t=i.registerOption(e))&&(i.userOptions[t]=!0,i.lastQuery=null,i.trigger("option_add",t,e))}registerOption(e){var t=j(e[this.settings.valueField])
return null!==t&&!this.options.hasOwnProperty(t)&&(e.$order=e.$order||++this.order,e.$id=this.inputId+"-opt-"+e.$order,this.options[t]=e,t)}registerOptionGroup(e){var t=j(e[this.settings.optgroupValueField])
return null!==t&&(e.$order=e.$order||++this.order,this.optgroups[t]=e,t)}addOptionGroup(e,t){var i
t[this.settings.optgroupValueField]=e,(i=this.registerOptionGroup(t))&&this.trigger("optgroup_add",i,t)}removeOptionGroup(e){this.optgroups.hasOwnProperty(e)&&(delete this.optgroups[e],this.clearCache(),this.trigger("optgroup_remove",e))}clearOptionGroups(){this.optgroups={},this.clearCache(),this.trigger("optgroup_clear")}updateOption(e,t){const i=this
var s,n
const o=j(e)
if(null===o)return
const r=j(t[i.settings.valueField]),l=i.getOption(o),a=i.getItem(o)
if(i.options.hasOwnProperty(o)){if("string"!=typeof r)throw new Error("Value must be set in option data")
if(t.$order=t.$order||i.options[o].$order,delete i.options[o],i.uncacheValue(r),i.uncacheValue(o,!1),i.options[r]=t,l){if(i.dropdown_content.contains(l)){const e=i._render("option",t)
E(l,e),i.activeOption===l&&i.setActiveOption(e)}l.remove()}a&&(-1!==(n=i.items.indexOf(o))&&i.items.splice(n,1,r),s=i._render("item",t),a.classList.contains("active")&&A(s,"active"),E(a,s)),i.lastQuery=null}}removeOption(e,t){const i=this
e=$(e),i.uncacheValue(e),delete i.userOptions[e],delete i.options[e],i.lastQuery=null,i.trigger("option_remove",e),i.removeItem(e,t)}clearOptions(){this.loadedSearches={},this.userOptions={},this.clearCache()
var e={}
for(let t in this.options)this.options.hasOwnProperty(t)&&this.items.indexOf(t)>=0&&(e[t]=this.options[t])
this.options=this.sifter.items=e,this.lastQuery=null,this.trigger("option_clear")}uncacheValue(e,t=!0){const i=this,s=i.renderCache.item,n=i.renderCache.option
if(s&&delete s[e],n&&delete n[e],t){const t=i.getOption(e)
t&&t.remove()}}getOption(e,t=!1){var i=j(e),s=this.rendered("option",i)
return!s&&t&&null!==i&&(s=this._render("option",this.options[i])),s}getAdjacent(e,t,i="option"){var s
if(!e)return null
s="item"==i?this.controlChildren():this.dropdown_content.querySelectorAll("[data-selectable]")
for(let i=0;i<s.length;i++)if(s[i]==e)return t>0?s[i+1]:s[i-1]
return null}getItem(e){if("object"==typeof e)return e
var t=j(e)
return null!==t?this.control.querySelector(`[data-value="${B(t)}"]`):null}addItems(e,t){var i=this,s=Array.isArray(e)?e:[e]
for(let e=0,n=(s=s.filter((e=>-1===i.items.indexOf(e)))).length;e<n;e++)i.isPending=e<n-1,i.addItem(s[e],t)}addItem(e,t){R(this,t?[]:["change"],(()=>{var i,s
const n=this,o=n.settings.mode,r=j(e)
if((!r||-1===n.items.indexOf(r)||("single"===o&&n.close(),"single"!==o&&n.settings.duplicates))&&null!==r&&n.options.hasOwnProperty(r)&&("single"===o&&n.clear(t),"multi"!==o||!n.isFull())){if(i=n._render("item",n.options[r]),n.control.contains(i)&&(i=i.cloneNode(!0)),s=n.isFull(),n.items.splice(n.caretPos,0,r),n.insertAtCaret(i),n.isSetup){let e=n.selectable()
if(!n.isPending&&n.settings.hideSelected){let e=n.getOption(r),t=n.getAdjacent(e,1)
t&&n.setActiveOption(t)}n.isPending||n.refreshOptions(n.isFocused&&"single"!==o),!e.length||n.isFull()?n.close():n.isPending||n.positionDropdown(),n.trigger("item_add",r,i),n.isPending||n.updateOriginalInput({silent:t})}(!n.isPending||!s&&n.isFull())&&n.refreshState()}}))}removeItem(e=null,t){const i=this
if(!(e=i.getItem(e)))return
var s,n
const o=e.dataset.value
s=P(e),e.remove(),e.classList.contains("active")&&(n=i.activeItems.indexOf(e),i.activeItems.splice(n,1),_(e,"active")),i.items.splice(s,1),i.lastQuery=null,!i.settings.persist&&i.userOptions.hasOwnProperty(o)&&i.removeOption(o,t),s<i.caretPos&&i.setCaret(i.caretPos-1),i.updateOriginalInput({silent:t}),i.refreshState(),i.positionDropdown(),i.trigger("item_remove",o,e)}createItem(e=null,t=!0,i=(()=>{})){var s,n=this,o=n.caretPos
if(e=e||n.inputValue(),!n.canCreate(e))return i(),!1
n.lock()
var r=!1,l=e=>{if(n.unlock(),!e||"object"!=typeof e)return i()
var s=j(e[n.settings.valueField])
if("string"!=typeof s)return i()
n.setTextboxValue(),n.addOption(e),n.setCaret(o),n.addItem(s),n.refreshOptions(t&&"single"!==n.settings.mode),i(e),r=!0}
return s="function"==typeof n.settings.create?n.settings.create.call(this,e,l):{[n.settings.labelField]:e,[n.settings.valueField]:e},r||l(s),!0}refreshItems(){var e=this
e.lastQuery=null,e.isSetup&&e.addItems(e.items),e.updateOriginalInput(),e.refreshState()}refreshState(){var e=this
e.refreshValidityState()
var t=e.isFull(),i=e.isLocked
e.wrapper.classList.toggle("rtl",e.rtl)
var s,n=e.control.classList
n.toggle("focus",e.isFocused),n.toggle("disabled",e.isDisabled),n.toggle("required",e.isRequired),n.toggle("invalid",e.isInvalid),n.toggle("locked",i),n.toggle("full",t),n.toggle("not-full",!t),n.toggle("input-active",e.isFocused&&!e.isInputHidden),n.toggle("dropdown-active",e.isOpen),n.toggle("has-options",(s=e.options,0===Object.keys(s).length)),n.toggle("has-items",e.items.length>0)}refreshValidityState(){var e=this
if(e.input.checkValidity){this.isRequired&&(e.input.required=!0)
var t=!e.input.checkValidity()
e.isInvalid=t,e.control_input.required=t,this.isRequired&&(e.input.required=!t)}}isFull(){return null!==this.settings.maxItems&&this.items.length>=this.settings.maxItems}updateOriginalInput(e={}){const t=this
var i,s,n,o
if(t.is_select_tag){const e=[]
function r(i,s,n){return i||(i=w('<option value="'+D(s)+'">'+D(n)+"</option>")),t.input.prepend(i),e.push(i),L(i,{selected:"true"}),i.selected=!0,i}if(t.input.querySelectorAll("option[selected]").forEach((e=>{L(e,{selected:null}),e.selected=!1})),0!=t.items.length||"single"!=t.settings.mode||t.isRequired)for(i=t.items.length-1;i>=0;i--)if(s=t.items[i],o=(n=t.options[s])[t.settings.labelField]||"",e.includes(n.$option)){r(t.input.querySelector(`option[value="${B(s)}"]:not([selected])`),s,o)}else n.$option=r(n.$option,s,o)
else r(t.input.querySelector('option[value=""]'),"","")}else t.input.value=t.getValue()
t.isSetup&&(e.silent||t.trigger("change",t.getValue()))}open(){var e=this
e.isLocked||e.isOpen||"multi"===e.settings.mode&&e.isFull()||(e.isOpen=!0,L(e.control_input,{"aria-expanded":"true"}),e.refreshState(),C(e.dropdown,{visibility:"hidden",display:"block"}),e.positionDropdown(),C(e.dropdown,{visibility:"visible",display:"block"}),e.focus(),e.trigger("dropdown_open",e.dropdown))}close(e=!0){var t=this,i=t.isOpen
e&&(t.setTextboxValue(),"single"===t.settings.mode&&t.items.length&&(t.hideInput(),t.tab_key||t.blur())),t.isOpen=!1,L(t.control_input,{"aria-expanded":"false"}),C(t.dropdown,{display:"none"}),t.settings.hideSelected&&t.clearActiveOption(),t.refreshState(),i&&t.trigger("dropdown_close",t.dropdown)}positionDropdown(){if("body"===this.settings.dropdownParent){var e=this.control,t=e.getBoundingClientRect(),i=e.offsetHeight+t.top+window.scrollY,s=t.left+window.scrollX
C(this.dropdown,{width:t.width+"px",top:i+"px",left:s+"px"})}}clear(e){var t=this
if(t.items.length){var i=t.controlChildren()
for(const e of i)t.removeItem(e,!0)
t.showInput(),e||t.updateOriginalInput(),t.trigger("clear")}}insertAtCaret(e){var t=this,i=Math.min(t.caretPos,t.items.length),s=t.control
0===i?s.insertBefore(e,s.firstChild):s.insertBefore(e,s.children[i]),t.setCaret(i+1)}deleteSelection(e){var t,i,s,n,o,r=this
t=e&&8===e.keyCode?-1:1,i={start:(o=r.control_input).selectionStart||0,length:(o.selectionEnd||0)-(o.selectionStart||0)}
const l=[]
if(r.activeItems.length){n=k(r.activeItems,t),s=P(n),t>0&&s++
for(const e of r.activeItems)l.push(e)}else if((r.isFocused||"single"===r.settings.mode)&&r.items.length){const e=r.controlChildren()
t<0&&0===i.start&&0===i.length?l.push(e[r.caretPos-1]):t>0&&i.start===r.inputValue().length&&l.push(e[r.caretPos])}const a=l.map((e=>e.dataset.value))
if(!a.length||"function"==typeof r.settings.onDelete&&!1===r.settings.onDelete.call(r,a,e))return!1
for(H(e,!0),void 0!==s&&r.setCaret(s);l.length;)r.removeItem(l.pop())
return r.showInput(),r.positionDropdown(),r.refreshOptions(!1),!0}advanceSelection(e,t){var i,s,n,o=this
o.rtl&&(e*=-1),o.inputValue().length||(K(q,t)||K("shiftKey",t)?(n=(s=o.getLastActive(e))?s.classList.contains("active")?o.getAdjacent(s,e,"item"):s:e>0?o.control_input.nextElementSibling:o.control_input.previousElementSibling)&&(n.classList.contains("active")&&o.removeActiveItem(s),o.setActiveItemClass(n)):o.isFocused&&!o.activeItems.length?o.setCaret(o.caretPos+e):(s=o.getLastActive(e))&&(i=P(s),o.setCaret(e>0?i+1:i),o.setActiveItem()))}getLastActive(e){let t=this.control.querySelector(".last-active")
if(t)return t
var i=this.control.querySelectorAll(".active")
return i?k(i,e):void 0}setCaret(e){var t=this
"single"===t.settings.mode||t.settings.controlInput?e=t.items.length:(e=Math.max(0,Math.min(t.items.length,e)))==t.caretPos||t.isPending||t.controlChildren().forEach(((i,s)=>{s<e?t.control_input.insertAdjacentElement("beforebegin",i):t.control.appendChild(i)})),t.caretPos=e}controlChildren(){return Array.from(this.control.getElementsByClassName(this.settings.itemClass))}lock(){this.close(),this.isLocked=!0,this.refreshState()}unlock(){this.isLocked=!1,this.refreshState()}disable(){var e=this
e.input.disabled=!0,e.control_input.disabled=!0,e.control_input.tabIndex=-1,e.isDisabled=!0,e.lock()}enable(){var e=this
e.input.disabled=!1,e.control_input.disabled=!1,e.control_input.tabIndex=e.tabIndex,e.isDisabled=!1,e.unlock()}destroy(){var e=this,t=e.revertSettings
e.trigger("destroy"),e.off(),e.wrapper.remove(),e.dropdown.remove(),e.input.innerHTML=t.innerHTML,e.input.tabIndex=t.tabIndex,_(e.input,"tomselected"),L(e.input,{hidden:null}),e.input.required=this.isRequired,e._destroy(),delete e.input.tomselect}render(e,t){return"function"!=typeof this.settings.render[e]?null:this._render(e,t)}_render(e,t){var i,s,n=""
const o=this
return("option"===e||"item"===e)&&(n=$(t[o.settings.valueField]),s=o.rendered(e,n))||null==(s=o.settings.render[e].call(this,t,D))||(s=w(s),"option"===e||"option_create"===e?t[o.settings.disabledField]?L(s,{"aria-disabled":"true"}):L(s,{"data-selectable":""}):"optgroup"===e&&(i=t.group[o.settings.optgroupValueField],L(s,{"data-group":i}),t.group[o.settings.disabledField]&&L(s,{"data-disabled":""})),"option"!==e&&"item"!==e||(L(s,{"data-value":n}),"item"===e?A(s,o.settings.itemClass):(A(s,o.settings.optionClass),L(s,{role:"option",id:t.$id})),o.renderCache[e][n]=s)),s}rendered(e,t){return null!==t&&this.renderCache[e].hasOwnProperty(t)?this.renderCache[e][t]:null}clearCache(e){var t=this
for(let e in t.options){const i=t.getOption(e)
i&&i.remove()}void 0===e?t.renderCache={item:{},option:{}}:t.renderCache[e]={}}canCreate(e){return this.settings.create&&e.length>0&&this.settings.createFilter.call(this,e)}hook(e,t,i){var s=this,n=s[t]
s[t]=function(){var t,o
return"after"===e&&(t=n.apply(s,arguments)),o=i.apply(s,arguments),"instead"===e?o:("before"===e&&(t=n.apply(s,arguments)),t)}}}return U}))
var tomSelect=function(e,t){return new TomSelect(e,t)}
//# sourceMappingURL=tom-select.base.min.js.map
