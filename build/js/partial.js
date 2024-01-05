/*! jQuery v3.7.1 | (c) OpenJS Foundation and other contributors | jquery.org/license */
!function(e,t){"use strict";"object"==typeof module&&"object"==typeof module.exports?module.exports=e.document?t(e,!0):function(e){if(!e.document)throw new Error("jQuery requires a window with a document");return t(e)}:t(e)}("undefined"!=typeof window?window:this,function(ie,e){"use strict";var oe=[],r=Object.getPrototypeOf,ae=oe.slice,g=oe.flat?function(e){return oe.flat.call(e)}:function(e){return oe.concat.apply([],e)},s=oe.push,se=oe.indexOf,n={},i=n.toString,ue=n.hasOwnProperty,o=ue.toString,a=o.call(Object),le={},v=function(e){return"function"==typeof e&&"number"!=typeof e.nodeType&&"function"!=typeof e.item},y=function(e){return null!=e&&e===e.window},C=ie.document,u={type:!0,src:!0,nonce:!0,noModule:!0};function m(e,t,n){var r,i,o=(n=n||C).createElement("script");if(o.text=e,t)for(r in u)(i=t[r]||t.getAttribute&&t.getAttribute(r))&&o.setAttribute(r,i);n.head.appendChild(o).parentNode.removeChild(o)}function x(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?n[i.call(e)]||"object":typeof e}var t="3.7.1",l=/HTML$/i,ce=function(e,t){return new ce.fn.init(e,t)};function c(e){var t=!!e&&"length"in e&&e.length,n=x(e);return!v(e)&&!y(e)&&("array"===n||0===t||"number"==typeof t&&0<t&&t-1 in e)}function fe(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()}ce.fn=ce.prototype={jquery:t,constructor:ce,length:0,toArray:function(){return ae.call(this)},get:function(e){return null==e?ae.call(this):e<0?this[e+this.length]:this[e]},pushStack:function(e){var t=ce.merge(this.constructor(),e);return t.prevObject=this,t},each:function(e){return ce.each(this,e)},map:function(n){return this.pushStack(ce.map(this,function(e,t){return n.call(e,t,e)}))},slice:function(){return this.pushStack(ae.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},even:function(){return this.pushStack(ce.grep(this,function(e,t){return(t+1)%2}))},odd:function(){return this.pushStack(ce.grep(this,function(e,t){return t%2}))},eq:function(e){var t=this.length,n=+e+(e<0?t:0);return this.pushStack(0<=n&&n<t?[this[n]]:[])},end:function(){return this.prevObject||this.constructor()},push:s,sort:oe.sort,splice:oe.splice},ce.extend=ce.fn.extend=function(){var e,t,n,r,i,o,a=arguments[0]||{},s=1,u=arguments.length,l=!1;for("boolean"==typeof a&&(l=a,a=arguments[s]||{},s++),"object"==typeof a||v(a)||(a={}),s===u&&(a=this,s--);s<u;s++)if(null!=(e=arguments[s]))for(t in e)r=e[t],"__proto__"!==t&&a!==r&&(l&&r&&(ce.isPlainObject(r)||(i=Array.isArray(r)))?(n=a[t],o=i&&!Array.isArray(n)?[]:i||ce.isPlainObject(n)?n:{},i=!1,a[t]=ce.extend(l,o,r)):void 0!==r&&(a[t]=r));return a},ce.extend({expando:"jQuery"+(t+Math.random()).replace(/\D/g,""),isReady:!0,error:function(e){throw new Error(e)},noop:function(){},isPlainObject:function(e){var t,n;return!(!e||"[object Object]"!==i.call(e))&&(!(t=r(e))||"function"==typeof(n=ue.call(t,"constructor")&&t.constructor)&&o.call(n)===a)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},globalEval:function(e,t,n){m(e,{nonce:t&&t.nonce},n)},each:function(e,t){var n,r=0;if(c(e)){for(n=e.length;r<n;r++)if(!1===t.call(e[r],r,e[r]))break}else for(r in e)if(!1===t.call(e[r],r,e[r]))break;return e},text:function(e){var t,n="",r=0,i=e.nodeType;if(!i)while(t=e[r++])n+=ce.text(t);return 1===i||11===i?e.textContent:9===i?e.documentElement.textContent:3===i||4===i?e.nodeValue:n},makeArray:function(e,t){var n=t||[];return null!=e&&(c(Object(e))?ce.merge(n,"string"==typeof e?[e]:e):s.call(n,e)),n},inArray:function(e,t,n){return null==t?-1:se.call(t,e,n)},isXMLDoc:function(e){var t=e&&e.namespaceURI,n=e&&(e.ownerDocument||e).documentElement;return!l.test(t||n&&n.nodeName||"HTML")},merge:function(e,t){for(var n=+t.length,r=0,i=e.length;r<n;r++)e[i++]=t[r];return e.length=i,e},grep:function(e,t,n){for(var r=[],i=0,o=e.length,a=!n;i<o;i++)!t(e[i],i)!==a&&r.push(e[i]);return r},map:function(e,t,n){var r,i,o=0,a=[];if(c(e))for(r=e.length;o<r;o++)null!=(i=t(e[o],o,n))&&a.push(i);else for(o in e)null!=(i=t(e[o],o,n))&&a.push(i);return g(a)},guid:1,support:le}),"function"==typeof Symbol&&(ce.fn[Symbol.iterator]=oe[Symbol.iterator]),ce.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(e,t){n["[object "+t+"]"]=t.toLowerCase()});var pe=oe.pop,de=oe.sort,he=oe.splice,ge="[\\x20\\t\\r\\n\\f]",ve=new RegExp("^"+ge+"+|((?:^|[^\\\\])(?:\\\\.)*)"+ge+"+$","g");ce.contains=function(e,t){var n=t&&t.parentNode;return e===n||!(!n||1!==n.nodeType||!(e.contains?e.contains(n):e.compareDocumentPosition&&16&e.compareDocumentPosition(n)))};var f=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;function p(e,t){return t?"\0"===e?"\ufffd":e.slice(0,-1)+"\\"+e.charCodeAt(e.length-1).toString(16)+" ":"\\"+e}ce.escapeSelector=function(e){return(e+"").replace(f,p)};var ye=C,me=s;!function(){var e,b,w,o,a,T,r,C,d,i,k=me,S=ce.expando,E=0,n=0,s=W(),c=W(),u=W(),h=W(),l=function(e,t){return e===t&&(a=!0),0},f="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",t="(?:\\\\[\\da-fA-F]{1,6}"+ge+"?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",p="\\["+ge+"*("+t+")(?:"+ge+"*([*^$|!~]?=)"+ge+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+t+"))|)"+ge+"*\\]",g=":("+t+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+p+")*)|.*)\\)|)",v=new RegExp(ge+"+","g"),y=new RegExp("^"+ge+"*,"+ge+"*"),m=new RegExp("^"+ge+"*([>+~]|"+ge+")"+ge+"*"),x=new RegExp(ge+"|>"),j=new RegExp(g),A=new RegExp("^"+t+"$"),D={ID:new RegExp("^#("+t+")"),CLASS:new RegExp("^\\.("+t+")"),TAG:new RegExp("^("+t+"|[*])"),ATTR:new RegExp("^"+p),PSEUDO:new RegExp("^"+g),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+ge+"*(even|odd|(([+-]|)(\\d*)n|)"+ge+"*(?:([+-]|)"+ge+"*(\\d+)|))"+ge+"*\\)|)","i"),bool:new RegExp("^(?:"+f+")$","i"),needsContext:new RegExp("^"+ge+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+ge+"*((?:-\\d)?\\d*)"+ge+"*\\)|)(?=[^-]|$)","i")},N=/^(?:input|select|textarea|button)$/i,q=/^h\d$/i,L=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,H=/[+~]/,O=new RegExp("\\\\[\\da-fA-F]{1,6}"+ge+"?|\\\\([^\\r\\n\\f])","g"),P=function(e,t){var n="0x"+e.slice(1)-65536;return t||(n<0?String.fromCharCode(n+65536):String.fromCharCode(n>>10|55296,1023&n|56320))},M=function(){V()},R=J(function(e){return!0===e.disabled&&fe(e,"fieldset")},{dir:"parentNode",next:"legend"});try{k.apply(oe=ae.call(ye.childNodes),ye.childNodes),oe[ye.childNodes.length].nodeType}catch(e){k={apply:function(e,t){me.apply(e,ae.call(t))},call:function(e){me.apply(e,ae.call(arguments,1))}}}function I(t,e,n,r){var i,o,a,s,u,l,c,f=e&&e.ownerDocument,p=e?e.nodeType:9;if(n=n||[],"string"!=typeof t||!t||1!==p&&9!==p&&11!==p)return n;if(!r&&(V(e),e=e||T,C)){if(11!==p&&(u=L.exec(t)))if(i=u[1]){if(9===p){if(!(a=e.getElementById(i)))return n;if(a.id===i)return k.call(n,a),n}else if(f&&(a=f.getElementById(i))&&I.contains(e,a)&&a.id===i)return k.call(n,a),n}else{if(u[2])return k.apply(n,e.getElementsByTagName(t)),n;if((i=u[3])&&e.getElementsByClassName)return k.apply(n,e.getElementsByClassName(i)),n}if(!(h[t+" "]||d&&d.test(t))){if(c=t,f=e,1===p&&(x.test(t)||m.test(t))){(f=H.test(t)&&U(e.parentNode)||e)==e&&le.scope||((s=e.getAttribute("id"))?s=ce.escapeSelector(s):e.setAttribute("id",s=S)),o=(l=Y(t)).length;while(o--)l[o]=(s?"#"+s:":scope")+" "+Q(l[o]);c=l.join(",")}try{return k.apply(n,f.querySelectorAll(c)),n}catch(e){h(t,!0)}finally{s===S&&e.removeAttribute("id")}}}return re(t.replace(ve,"$1"),e,n,r)}function W(){var r=[];return function e(t,n){return r.push(t+" ")>b.cacheLength&&delete e[r.shift()],e[t+" "]=n}}function F(e){return e[S]=!0,e}function $(e){var t=T.createElement("fieldset");try{return!!e(t)}catch(e){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function B(t){return function(e){return fe(e,"input")&&e.type===t}}function _(t){return function(e){return(fe(e,"input")||fe(e,"button"))&&e.type===t}}function z(t){return function(e){return"form"in e?e.parentNode&&!1===e.disabled?"label"in e?"label"in e.parentNode?e.parentNode.disabled===t:e.disabled===t:e.isDisabled===t||e.isDisabled!==!t&&R(e)===t:e.disabled===t:"label"in e&&e.disabled===t}}function X(a){return F(function(o){return o=+o,F(function(e,t){var n,r=a([],e.length,o),i=r.length;while(i--)e[n=r[i]]&&(e[n]=!(t[n]=e[n]))})})}function U(e){return e&&"undefined"!=typeof e.getElementsByTagName&&e}function V(e){var t,n=e?e.ownerDocument||e:ye;return n!=T&&9===n.nodeType&&n.documentElement&&(r=(T=n).documentElement,C=!ce.isXMLDoc(T),i=r.matches||r.webkitMatchesSelector||r.msMatchesSelector,r.msMatchesSelector&&ye!=T&&(t=T.defaultView)&&t.top!==t&&t.addEventListener("unload",M),le.getById=$(function(e){return r.appendChild(e).id=ce.expando,!T.getElementsByName||!T.getElementsByName(ce.expando).length}),le.disconnectedMatch=$(function(e){return i.call(e,"*")}),le.scope=$(function(){return T.querySelectorAll(":scope")}),le.cssHas=$(function(){try{return T.querySelector(":has(*,:jqfake)"),!1}catch(e){return!0}}),le.getById?(b.filter.ID=function(e){var t=e.replace(O,P);return function(e){return e.getAttribute("id")===t}},b.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&C){var n=t.getElementById(e);return n?[n]:[]}}):(b.filter.ID=function(e){var n=e.replace(O,P);return function(e){var t="undefined"!=typeof e.getAttributeNode&&e.getAttributeNode("id");return t&&t.value===n}},b.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&C){var n,r,i,o=t.getElementById(e);if(o){if((n=o.getAttributeNode("id"))&&n.value===e)return[o];i=t.getElementsByName(e),r=0;while(o=i[r++])if((n=o.getAttributeNode("id"))&&n.value===e)return[o]}return[]}}),b.find.TAG=function(e,t){return"undefined"!=typeof t.getElementsByTagName?t.getElementsByTagName(e):t.querySelectorAll(e)},b.find.CLASS=function(e,t){if("undefined"!=typeof t.getElementsByClassName&&C)return t.getElementsByClassName(e)},d=[],$(function(e){var t;r.appendChild(e).innerHTML="<a id='"+S+"' href='' disabled='disabled'></a><select id='"+S+"-\r\\' disabled='disabled'><option selected=''></option></select>",e.querySelectorAll("[selected]").length||d.push("\\["+ge+"*(?:value|"+f+")"),e.querySelectorAll("[id~="+S+"-]").length||d.push("~="),e.querySelectorAll("a#"+S+"+*").length||d.push(".#.+[+~]"),e.querySelectorAll(":checked").length||d.push(":checked"),(t=T.createElement("input")).setAttribute("type","hidden"),e.appendChild(t).setAttribute("name","D"),r.appendChild(e).disabled=!0,2!==e.querySelectorAll(":disabled").length&&d.push(":enabled",":disabled"),(t=T.createElement("input")).setAttribute("name",""),e.appendChild(t),e.querySelectorAll("[name='']").length||d.push("\\["+ge+"*name"+ge+"*="+ge+"*(?:''|\"\")")}),le.cssHas||d.push(":has"),d=d.length&&new RegExp(d.join("|")),l=function(e,t){if(e===t)return a=!0,0;var n=!e.compareDocumentPosition-!t.compareDocumentPosition;return n||(1&(n=(e.ownerDocument||e)==(t.ownerDocument||t)?e.compareDocumentPosition(t):1)||!le.sortDetached&&t.compareDocumentPosition(e)===n?e===T||e.ownerDocument==ye&&I.contains(ye,e)?-1:t===T||t.ownerDocument==ye&&I.contains(ye,t)?1:o?se.call(o,e)-se.call(o,t):0:4&n?-1:1)}),T}for(e in I.matches=function(e,t){return I(e,null,null,t)},I.matchesSelector=function(e,t){if(V(e),C&&!h[t+" "]&&(!d||!d.test(t)))try{var n=i.call(e,t);if(n||le.disconnectedMatch||e.document&&11!==e.document.nodeType)return n}catch(e){h(t,!0)}return 0<I(t,T,null,[e]).length},I.contains=function(e,t){return(e.ownerDocument||e)!=T&&V(e),ce.contains(e,t)},I.attr=function(e,t){(e.ownerDocument||e)!=T&&V(e);var n=b.attrHandle[t.toLowerCase()],r=n&&ue.call(b.attrHandle,t.toLowerCase())?n(e,t,!C):void 0;return void 0!==r?r:e.getAttribute(t)},I.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},ce.uniqueSort=function(e){var t,n=[],r=0,i=0;if(a=!le.sortStable,o=!le.sortStable&&ae.call(e,0),de.call(e,l),a){while(t=e[i++])t===e[i]&&(r=n.push(i));while(r--)he.call(e,n[r],1)}return o=null,e},ce.fn.uniqueSort=function(){return this.pushStack(ce.uniqueSort(ae.apply(this)))},(b=ce.expr={cacheLength:50,createPseudo:F,match:D,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(O,P),e[3]=(e[3]||e[4]||e[5]||"").replace(O,P),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||I.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&I.error(e[0]),e},PSEUDO:function(e){var t,n=!e[6]&&e[2];return D.CHILD.test(e[0])?null:(e[3]?e[2]=e[4]||e[5]||"":n&&j.test(n)&&(t=Y(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(O,P).toLowerCase();return"*"===e?function(){return!0}:function(e){return fe(e,t)}},CLASS:function(e){var t=s[e+" "];return t||(t=new RegExp("(^|"+ge+")"+e+"("+ge+"|$)"))&&s(e,function(e){return t.test("string"==typeof e.className&&e.className||"undefined"!=typeof e.getAttribute&&e.getAttribute("class")||"")})},ATTR:function(n,r,i){return function(e){var t=I.attr(e,n);return null==t?"!="===r:!r||(t+="","="===r?t===i:"!="===r?t!==i:"^="===r?i&&0===t.indexOf(i):"*="===r?i&&-1<t.indexOf(i):"$="===r?i&&t.slice(-i.length)===i:"~="===r?-1<(" "+t.replace(v," ")+" ").indexOf(i):"|="===r&&(t===i||t.slice(0,i.length+1)===i+"-"))}},CHILD:function(d,e,t,h,g){var v="nth"!==d.slice(0,3),y="last"!==d.slice(-4),m="of-type"===e;return 1===h&&0===g?function(e){return!!e.parentNode}:function(e,t,n){var r,i,o,a,s,u=v!==y?"nextSibling":"previousSibling",l=e.parentNode,c=m&&e.nodeName.toLowerCase(),f=!n&&!m,p=!1;if(l){if(v){while(u){o=e;while(o=o[u])if(m?fe(o,c):1===o.nodeType)return!1;s=u="only"===d&&!s&&"nextSibling"}return!0}if(s=[y?l.firstChild:l.lastChild],y&&f){p=(a=(r=(i=l[S]||(l[S]={}))[d]||[])[0]===E&&r[1])&&r[2],o=a&&l.childNodes[a];while(o=++a&&o&&o[u]||(p=a=0)||s.pop())if(1===o.nodeType&&++p&&o===e){i[d]=[E,a,p];break}}else if(f&&(p=a=(r=(i=e[S]||(e[S]={}))[d]||[])[0]===E&&r[1]),!1===p)while(o=++a&&o&&o[u]||(p=a=0)||s.pop())if((m?fe(o,c):1===o.nodeType)&&++p&&(f&&((i=o[S]||(o[S]={}))[d]=[E,p]),o===e))break;return(p-=g)===h||p%h==0&&0<=p/h}}},PSEUDO:function(e,o){var t,a=b.pseudos[e]||b.setFilters[e.toLowerCase()]||I.error("unsupported pseudo: "+e);return a[S]?a(o):1<a.length?(t=[e,e,"",o],b.setFilters.hasOwnProperty(e.toLowerCase())?F(function(e,t){var n,r=a(e,o),i=r.length;while(i--)e[n=se.call(e,r[i])]=!(t[n]=r[i])}):function(e){return a(e,0,t)}):a}},pseudos:{not:F(function(e){var r=[],i=[],s=ne(e.replace(ve,"$1"));return s[S]?F(function(e,t,n,r){var i,o=s(e,null,r,[]),a=e.length;while(a--)(i=o[a])&&(e[a]=!(t[a]=i))}):function(e,t,n){return r[0]=e,s(r,null,n,i),r[0]=null,!i.pop()}}),has:F(function(t){return function(e){return 0<I(t,e).length}}),contains:F(function(t){return t=t.replace(O,P),function(e){return-1<(e.textContent||ce.text(e)).indexOf(t)}}),lang:F(function(n){return A.test(n||"")||I.error("unsupported lang: "+n),n=n.replace(O,P).toLowerCase(),function(e){var t;do{if(t=C?e.lang:e.getAttribute("xml:lang")||e.getAttribute("lang"))return(t=t.toLowerCase())===n||0===t.indexOf(n+"-")}while((e=e.parentNode)&&1===e.nodeType);return!1}}),target:function(e){var t=ie.location&&ie.location.hash;return t&&t.slice(1)===e.id},root:function(e){return e===r},focus:function(e){return e===function(){try{return T.activeElement}catch(e){}}()&&T.hasFocus()&&!!(e.type||e.href||~e.tabIndex)},enabled:z(!1),disabled:z(!0),checked:function(e){return fe(e,"input")&&!!e.checked||fe(e,"option")&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,!0===e.selected},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeType<6)return!1;return!0},parent:function(e){return!b.pseudos.empty(e)},header:function(e){return q.test(e.nodeName)},input:function(e){return N.test(e.nodeName)},button:function(e){return fe(e,"input")&&"button"===e.type||fe(e,"button")},text:function(e){var t;return fe(e,"input")&&"text"===e.type&&(null==(t=e.getAttribute("type"))||"text"===t.toLowerCase())},first:X(function(){return[0]}),last:X(function(e,t){return[t-1]}),eq:X(function(e,t,n){return[n<0?n+t:n]}),even:X(function(e,t){for(var n=0;n<t;n+=2)e.push(n);return e}),odd:X(function(e,t){for(var n=1;n<t;n+=2)e.push(n);return e}),lt:X(function(e,t,n){var r;for(r=n<0?n+t:t<n?t:n;0<=--r;)e.push(r);return e}),gt:X(function(e,t,n){for(var r=n<0?n+t:n;++r<t;)e.push(r);return e})}}).pseudos.nth=b.pseudos.eq,{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})b.pseudos[e]=B(e);for(e in{submit:!0,reset:!0})b.pseudos[e]=_(e);function G(){}function Y(e,t){var n,r,i,o,a,s,u,l=c[e+" "];if(l)return t?0:l.slice(0);a=e,s=[],u=b.preFilter;while(a){for(o in n&&!(r=y.exec(a))||(r&&(a=a.slice(r[0].length)||a),s.push(i=[])),n=!1,(r=m.exec(a))&&(n=r.shift(),i.push({value:n,type:r[0].replace(ve," ")}),a=a.slice(n.length)),b.filter)!(r=D[o].exec(a))||u[o]&&!(r=u[o](r))||(n=r.shift(),i.push({value:n,type:o,matches:r}),a=a.slice(n.length));if(!n)break}return t?a.length:a?I.error(e):c(e,s).slice(0)}function Q(e){for(var t=0,n=e.length,r="";t<n;t++)r+=e[t].value;return r}function J(a,e,t){var s=e.dir,u=e.next,l=u||s,c=t&&"parentNode"===l,f=n++;return e.first?function(e,t,n){while(e=e[s])if(1===e.nodeType||c)return a(e,t,n);return!1}:function(e,t,n){var r,i,o=[E,f];if(n){while(e=e[s])if((1===e.nodeType||c)&&a(e,t,n))return!0}else while(e=e[s])if(1===e.nodeType||c)if(i=e[S]||(e[S]={}),u&&fe(e,u))e=e[s]||e;else{if((r=i[l])&&r[0]===E&&r[1]===f)return o[2]=r[2];if((i[l]=o)[2]=a(e,t,n))return!0}return!1}}function K(i){return 1<i.length?function(e,t,n){var r=i.length;while(r--)if(!i[r](e,t,n))return!1;return!0}:i[0]}function Z(e,t,n,r,i){for(var o,a=[],s=0,u=e.length,l=null!=t;s<u;s++)(o=e[s])&&(n&&!n(o,r,i)||(a.push(o),l&&t.push(s)));return a}function ee(d,h,g,v,y,e){return v&&!v[S]&&(v=ee(v)),y&&!y[S]&&(y=ee(y,e)),F(function(e,t,n,r){var i,o,a,s,u=[],l=[],c=t.length,f=e||function(e,t,n){for(var r=0,i=t.length;r<i;r++)I(e,t[r],n);return n}(h||"*",n.nodeType?[n]:n,[]),p=!d||!e&&h?f:Z(f,u,d,n,r);if(g?g(p,s=y||(e?d:c||v)?[]:t,n,r):s=p,v){i=Z(s,l),v(i,[],n,r),o=i.length;while(o--)(a=i[o])&&(s[l[o]]=!(p[l[o]]=a))}if(e){if(y||d){if(y){i=[],o=s.length;while(o--)(a=s[o])&&i.push(p[o]=a);y(null,s=[],i,r)}o=s.length;while(o--)(a=s[o])&&-1<(i=y?se.call(e,a):u[o])&&(e[i]=!(t[i]=a))}}else s=Z(s===t?s.splice(c,s.length):s),y?y(null,t,s,r):k.apply(t,s)})}function te(e){for(var i,t,n,r=e.length,o=b.relative[e[0].type],a=o||b.relative[" "],s=o?1:0,u=J(function(e){return e===i},a,!0),l=J(function(e){return-1<se.call(i,e)},a,!0),c=[function(e,t,n){var r=!o&&(n||t!=w)||((i=t).nodeType?u(e,t,n):l(e,t,n));return i=null,r}];s<r;s++)if(t=b.relative[e[s].type])c=[J(K(c),t)];else{if((t=b.filter[e[s].type].apply(null,e[s].matches))[S]){for(n=++s;n<r;n++)if(b.relative[e[n].type])break;return ee(1<s&&K(c),1<s&&Q(e.slice(0,s-1).concat({value:" "===e[s-2].type?"*":""})).replace(ve,"$1"),t,s<n&&te(e.slice(s,n)),n<r&&te(e=e.slice(n)),n<r&&Q(e))}c.push(t)}return K(c)}function ne(e,t){var n,v,y,m,x,r,i=[],o=[],a=u[e+" "];if(!a){t||(t=Y(e)),n=t.length;while(n--)(a=te(t[n]))[S]?i.push(a):o.push(a);(a=u(e,(v=o,m=0<(y=i).length,x=0<v.length,r=function(e,t,n,r,i){var o,a,s,u=0,l="0",c=e&&[],f=[],p=w,d=e||x&&b.find.TAG("*",i),h=E+=null==p?1:Math.random()||.1,g=d.length;for(i&&(w=t==T||t||i);l!==g&&null!=(o=d[l]);l++){if(x&&o){a=0,t||o.ownerDocument==T||(V(o),n=!C);while(s=v[a++])if(s(o,t||T,n)){k.call(r,o);break}i&&(E=h)}m&&((o=!s&&o)&&u--,e&&c.push(o))}if(u+=l,m&&l!==u){a=0;while(s=y[a++])s(c,f,t,n);if(e){if(0<u)while(l--)c[l]||f[l]||(f[l]=pe.call(r));f=Z(f)}k.apply(r,f),i&&!e&&0<f.length&&1<u+y.length&&ce.uniqueSort(r)}return i&&(E=h,w=p),c},m?F(r):r))).selector=e}return a}function re(e,t,n,r){var i,o,a,s,u,l="function"==typeof e&&e,c=!r&&Y(e=l.selector||e);if(n=n||[],1===c.length){if(2<(o=c[0]=c[0].slice(0)).length&&"ID"===(a=o[0]).type&&9===t.nodeType&&C&&b.relative[o[1].type]){if(!(t=(b.find.ID(a.matches[0].replace(O,P),t)||[])[0]))return n;l&&(t=t.parentNode),e=e.slice(o.shift().value.length)}i=D.needsContext.test(e)?0:o.length;while(i--){if(a=o[i],b.relative[s=a.type])break;if((u=b.find[s])&&(r=u(a.matches[0].replace(O,P),H.test(o[0].type)&&U(t.parentNode)||t))){if(o.splice(i,1),!(e=r.length&&Q(o)))return k.apply(n,r),n;break}}}return(l||ne(e,c))(r,t,!C,n,!t||H.test(e)&&U(t.parentNode)||t),n}G.prototype=b.filters=b.pseudos,b.setFilters=new G,le.sortStable=S.split("").sort(l).join("")===S,V(),le.sortDetached=$(function(e){return 1&e.compareDocumentPosition(T.createElement("fieldset"))}),ce.find=I,ce.expr[":"]=ce.expr.pseudos,ce.unique=ce.uniqueSort,I.compile=ne,I.select=re,I.setDocument=V,I.tokenize=Y,I.escape=ce.escapeSelector,I.getText=ce.text,I.isXML=ce.isXMLDoc,I.selectors=ce.expr,I.support=ce.support,I.uniqueSort=ce.uniqueSort}();var d=function(e,t,n){var r=[],i=void 0!==n;while((e=e[t])&&9!==e.nodeType)if(1===e.nodeType){if(i&&ce(e).is(n))break;r.push(e)}return r},h=function(e,t){for(var n=[];e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n},b=ce.expr.match.needsContext,w=/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;function T(e,n,r){return v(n)?ce.grep(e,function(e,t){return!!n.call(e,t,e)!==r}):n.nodeType?ce.grep(e,function(e){return e===n!==r}):"string"!=typeof n?ce.grep(e,function(e){return-1<se.call(n,e)!==r}):ce.filter(n,e,r)}ce.filter=function(e,t,n){var r=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType?ce.find.matchesSelector(r,e)?[r]:[]:ce.find.matches(e,ce.grep(t,function(e){return 1===e.nodeType}))},ce.fn.extend({find:function(e){var t,n,r=this.length,i=this;if("string"!=typeof e)return this.pushStack(ce(e).filter(function(){for(t=0;t<r;t++)if(ce.contains(i[t],this))return!0}));for(n=this.pushStack([]),t=0;t<r;t++)ce.find(e,i[t],n);return 1<r?ce.uniqueSort(n):n},filter:function(e){return this.pushStack(T(this,e||[],!1))},not:function(e){return this.pushStack(T(this,e||[],!0))},is:function(e){return!!T(this,"string"==typeof e&&b.test(e)?ce(e):e||[],!1).length}});var k,S=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;(ce.fn.init=function(e,t,n){var r,i;if(!e)return this;if(n=n||k,"string"==typeof e){if(!(r="<"===e[0]&&">"===e[e.length-1]&&3<=e.length?[null,e,null]:S.exec(e))||!r[1]&&t)return!t||t.jquery?(t||n).find(e):this.constructor(t).find(e);if(r[1]){if(t=t instanceof ce?t[0]:t,ce.merge(this,ce.parseHTML(r[1],t&&t.nodeType?t.ownerDocument||t:C,!0)),w.test(r[1])&&ce.isPlainObject(t))for(r in t)v(this[r])?this[r](t[r]):this.attr(r,t[r]);return this}return(i=C.getElementById(r[2]))&&(this[0]=i,this.length=1),this}return e.nodeType?(this[0]=e,this.length=1,this):v(e)?void 0!==n.ready?n.ready(e):e(ce):ce.makeArray(e,this)}).prototype=ce.fn,k=ce(C);var E=/^(?:parents|prev(?:Until|All))/,j={children:!0,contents:!0,next:!0,prev:!0};function A(e,t){while((e=e[t])&&1!==e.nodeType);return e}ce.fn.extend({has:function(e){var t=ce(e,this),n=t.length;return this.filter(function(){for(var e=0;e<n;e++)if(ce.contains(this,t[e]))return!0})},closest:function(e,t){var n,r=0,i=this.length,o=[],a="string"!=typeof e&&ce(e);if(!b.test(e))for(;r<i;r++)for(n=this[r];n&&n!==t;n=n.parentNode)if(n.nodeType<11&&(a?-1<a.index(n):1===n.nodeType&&ce.find.matchesSelector(n,e))){o.push(n);break}return this.pushStack(1<o.length?ce.uniqueSort(o):o)},index:function(e){return e?"string"==typeof e?se.call(ce(e),this[0]):se.call(this,e.jquery?e[0]:e):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){return this.pushStack(ce.uniqueSort(ce.merge(this.get(),ce(e,t))))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),ce.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return d(e,"parentNode")},parentsUntil:function(e,t,n){return d(e,"parentNode",n)},next:function(e){return A(e,"nextSibling")},prev:function(e){return A(e,"previousSibling")},nextAll:function(e){return d(e,"nextSibling")},prevAll:function(e){return d(e,"previousSibling")},nextUntil:function(e,t,n){return d(e,"nextSibling",n)},prevUntil:function(e,t,n){return d(e,"previousSibling",n)},siblings:function(e){return h((e.parentNode||{}).firstChild,e)},children:function(e){return h(e.firstChild)},contents:function(e){return null!=e.contentDocument&&r(e.contentDocument)?e.contentDocument:(fe(e,"template")&&(e=e.content||e),ce.merge([],e.childNodes))}},function(r,i){ce.fn[r]=function(e,t){var n=ce.map(this,i,e);return"Until"!==r.slice(-5)&&(t=e),t&&"string"==typeof t&&(n=ce.filter(t,n)),1<this.length&&(j[r]||ce.uniqueSort(n),E.test(r)&&n.reverse()),this.pushStack(n)}});var D=/[^\x20\t\r\n\f]+/g;function N(e){return e}function q(e){throw e}function L(e,t,n,r){var i;try{e&&v(i=e.promise)?i.call(e).done(t).fail(n):e&&v(i=e.then)?i.call(e,t,n):t.apply(void 0,[e].slice(r))}catch(e){n.apply(void 0,[e])}}ce.Callbacks=function(r){var e,n;r="string"==typeof r?(e=r,n={},ce.each(e.match(D)||[],function(e,t){n[t]=!0}),n):ce.extend({},r);var i,t,o,a,s=[],u=[],l=-1,c=function(){for(a=a||r.once,o=i=!0;u.length;l=-1){t=u.shift();while(++l<s.length)!1===s[l].apply(t[0],t[1])&&r.stopOnFalse&&(l=s.length,t=!1)}r.memory||(t=!1),i=!1,a&&(s=t?[]:"")},f={add:function(){return s&&(t&&!i&&(l=s.length-1,u.push(t)),function n(e){ce.each(e,function(e,t){v(t)?r.unique&&f.has(t)||s.push(t):t&&t.length&&"string"!==x(t)&&n(t)})}(arguments),t&&!i&&c()),this},remove:function(){return ce.each(arguments,function(e,t){var n;while(-1<(n=ce.inArray(t,s,n)))s.splice(n,1),n<=l&&l--}),this},has:function(e){return e?-1<ce.inArray(e,s):0<s.length},empty:function(){return s&&(s=[]),this},disable:function(){return a=u=[],s=t="",this},disabled:function(){return!s},lock:function(){return a=u=[],t||i||(s=t=""),this},locked:function(){return!!a},fireWith:function(e,t){return a||(t=[e,(t=t||[]).slice?t.slice():t],u.push(t),i||c()),this},fire:function(){return f.fireWith(this,arguments),this},fired:function(){return!!o}};return f},ce.extend({Deferred:function(e){var o=[["notify","progress",ce.Callbacks("memory"),ce.Callbacks("memory"),2],["resolve","done",ce.Callbacks("once memory"),ce.Callbacks("once memory"),0,"resolved"],["reject","fail",ce.Callbacks("once memory"),ce.Callbacks("once memory"),1,"rejected"]],i="pending",a={state:function(){return i},always:function(){return s.done(arguments).fail(arguments),this},"catch":function(e){return a.then(null,e)},pipe:function(){var i=arguments;return ce.Deferred(function(r){ce.each(o,function(e,t){var n=v(i[t[4]])&&i[t[4]];s[t[1]](function(){var e=n&&n.apply(this,arguments);e&&v(e.promise)?e.promise().progress(r.notify).done(r.resolve).fail(r.reject):r[t[0]+"With"](this,n?[e]:arguments)})}),i=null}).promise()},then:function(t,n,r){var u=0;function l(i,o,a,s){return function(){var n=this,r=arguments,e=function(){var e,t;if(!(i<u)){if((e=a.apply(n,r))===o.promise())throw new TypeError("Thenable self-resolution");t=e&&("object"==typeof e||"function"==typeof e)&&e.then,v(t)?s?t.call(e,l(u,o,N,s),l(u,o,q,s)):(u++,t.call(e,l(u,o,N,s),l(u,o,q,s),l(u,o,N,o.notifyWith))):(a!==N&&(n=void 0,r=[e]),(s||o.resolveWith)(n,r))}},t=s?e:function(){try{e()}catch(e){ce.Deferred.exceptionHook&&ce.Deferred.exceptionHook(e,t.error),u<=i+1&&(a!==q&&(n=void 0,r=[e]),o.rejectWith(n,r))}};i?t():(ce.Deferred.getErrorHook?t.error=ce.Deferred.getErrorHook():ce.Deferred.getStackHook&&(t.error=ce.Deferred.getStackHook()),ie.setTimeout(t))}}return ce.Deferred(function(e){o[0][3].add(l(0,e,v(r)?r:N,e.notifyWith)),o[1][3].add(l(0,e,v(t)?t:N)),o[2][3].add(l(0,e,v(n)?n:q))}).promise()},promise:function(e){return null!=e?ce.extend(e,a):a}},s={};return ce.each(o,function(e,t){var n=t[2],r=t[5];a[t[1]]=n.add,r&&n.add(function(){i=r},o[3-e][2].disable,o[3-e][3].disable,o[0][2].lock,o[0][3].lock),n.add(t[3].fire),s[t[0]]=function(){return s[t[0]+"With"](this===s?void 0:this,arguments),this},s[t[0]+"With"]=n.fireWith}),a.promise(s),e&&e.call(s,s),s},when:function(e){var n=arguments.length,t=n,r=Array(t),i=ae.call(arguments),o=ce.Deferred(),a=function(t){return function(e){r[t]=this,i[t]=1<arguments.length?ae.call(arguments):e,--n||o.resolveWith(r,i)}};if(n<=1&&(L(e,o.done(a(t)).resolve,o.reject,!n),"pending"===o.state()||v(i[t]&&i[t].then)))return o.then();while(t--)L(i[t],a(t),o.reject);return o.promise()}});var H=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;ce.Deferred.exceptionHook=function(e,t){ie.console&&ie.console.warn&&e&&H.test(e.name)&&ie.console.warn("jQuery.Deferred exception: "+e.message,e.stack,t)},ce.readyException=function(e){ie.setTimeout(function(){throw e})};var O=ce.Deferred();function P(){C.removeEventListener("DOMContentLoaded",P),ie.removeEventListener("load",P),ce.ready()}ce.fn.ready=function(e){return O.then(e)["catch"](function(e){ce.readyException(e)}),this},ce.extend({isReady:!1,readyWait:1,ready:function(e){(!0===e?--ce.readyWait:ce.isReady)||(ce.isReady=!0)!==e&&0<--ce.readyWait||O.resolveWith(C,[ce])}}),ce.ready.then=O.then,"complete"===C.readyState||"loading"!==C.readyState&&!C.documentElement.doScroll?ie.setTimeout(ce.ready):(C.addEventListener("DOMContentLoaded",P),ie.addEventListener("load",P));var M=function(e,t,n,r,i,o,a){var s=0,u=e.length,l=null==n;if("object"===x(n))for(s in i=!0,n)M(e,t,s,n[s],!0,o,a);else if(void 0!==r&&(i=!0,v(r)||(a=!0),l&&(a?(t.call(e,r),t=null):(l=t,t=function(e,t,n){return l.call(ce(e),n)})),t))for(;s<u;s++)t(e[s],n,a?r:r.call(e[s],s,t(e[s],n)));return i?e:l?t.call(e):u?t(e[0],n):o},R=/^-ms-/,I=/-([a-z])/g;function W(e,t){return t.toUpperCase()}function F(e){return e.replace(R,"ms-").replace(I,W)}var $=function(e){return 1===e.nodeType||9===e.nodeType||!+e.nodeType};function B(){this.expando=ce.expando+B.uid++}B.uid=1,B.prototype={cache:function(e){var t=e[this.expando];return t||(t={},$(e)&&(e.nodeType?e[this.expando]=t:Object.defineProperty(e,this.expando,{value:t,configurable:!0}))),t},set:function(e,t,n){var r,i=this.cache(e);if("string"==typeof t)i[F(t)]=n;else for(r in t)i[F(r)]=t[r];return i},get:function(e,t){return void 0===t?this.cache(e):e[this.expando]&&e[this.expando][F(t)]},access:function(e,t,n){return void 0===t||t&&"string"==typeof t&&void 0===n?this.get(e,t):(this.set(e,t,n),void 0!==n?n:t)},remove:function(e,t){var n,r=e[this.expando];if(void 0!==r){if(void 0!==t){n=(t=Array.isArray(t)?t.map(F):(t=F(t))in r?[t]:t.match(D)||[]).length;while(n--)delete r[t[n]]}(void 0===t||ce.isEmptyObject(r))&&(e.nodeType?e[this.expando]=void 0:delete e[this.expando])}},hasData:function(e){var t=e[this.expando];return void 0!==t&&!ce.isEmptyObject(t)}};var _=new B,z=new B,X=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,U=/[A-Z]/g;function V(e,t,n){var r,i;if(void 0===n&&1===e.nodeType)if(r="data-"+t.replace(U,"-$&").toLowerCase(),"string"==typeof(n=e.getAttribute(r))){try{n="true"===(i=n)||"false"!==i&&("null"===i?null:i===+i+""?+i:X.test(i)?JSON.parse(i):i)}catch(e){}z.set(e,t,n)}else n=void 0;return n}ce.extend({hasData:function(e){return z.hasData(e)||_.hasData(e)},data:function(e,t,n){return z.access(e,t,n)},removeData:function(e,t){z.remove(e,t)},_data:function(e,t,n){return _.access(e,t,n)},_removeData:function(e,t){_.remove(e,t)}}),ce.fn.extend({data:function(n,e){var t,r,i,o=this[0],a=o&&o.attributes;if(void 0===n){if(this.length&&(i=z.get(o),1===o.nodeType&&!_.get(o,"hasDataAttrs"))){t=a.length;while(t--)a[t]&&0===(r=a[t].name).indexOf("data-")&&(r=F(r.slice(5)),V(o,r,i[r]));_.set(o,"hasDataAttrs",!0)}return i}return"object"==typeof n?this.each(function(){z.set(this,n)}):M(this,function(e){var t;if(o&&void 0===e)return void 0!==(t=z.get(o,n))?t:void 0!==(t=V(o,n))?t:void 0;this.each(function(){z.set(this,n,e)})},null,e,1<arguments.length,null,!0)},removeData:function(e){return this.each(function(){z.remove(this,e)})}}),ce.extend({queue:function(e,t,n){var r;if(e)return t=(t||"fx")+"queue",r=_.get(e,t),n&&(!r||Array.isArray(n)?r=_.access(e,t,ce.makeArray(n)):r.push(n)),r||[]},dequeue:function(e,t){t=t||"fx";var n=ce.queue(e,t),r=n.length,i=n.shift(),o=ce._queueHooks(e,t);"inprogress"===i&&(i=n.shift(),r--),i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,function(){ce.dequeue(e,t)},o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return _.get(e,n)||_.access(e,n,{empty:ce.Callbacks("once memory").add(function(){_.remove(e,[t+"queue",n])})})}}),ce.fn.extend({queue:function(t,n){var e=2;return"string"!=typeof t&&(n=t,t="fx",e--),arguments.length<e?ce.queue(this[0],t):void 0===n?this:this.each(function(){var e=ce.queue(this,t,n);ce._queueHooks(this,t),"fx"===t&&"inprogress"!==e[0]&&ce.dequeue(this,t)})},dequeue:function(e){return this.each(function(){ce.dequeue(this,e)})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,t){var n,r=1,i=ce.Deferred(),o=this,a=this.length,s=function(){--r||i.resolveWith(o,[o])};"string"!=typeof e&&(t=e,e=void 0),e=e||"fx";while(a--)(n=_.get(o[a],e+"queueHooks"))&&n.empty&&(r++,n.empty.add(s));return s(),i.promise(t)}});var G=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,Y=new RegExp("^(?:([+-])=|)("+G+")([a-z%]*)$","i"),Q=["Top","Right","Bottom","Left"],J=C.documentElement,K=function(e){return ce.contains(e.ownerDocument,e)},Z={composed:!0};J.getRootNode&&(K=function(e){return ce.contains(e.ownerDocument,e)||e.getRootNode(Z)===e.ownerDocument});var ee=function(e,t){return"none"===(e=t||e).style.display||""===e.style.display&&K(e)&&"none"===ce.css(e,"display")};function te(e,t,n,r){var i,o,a=20,s=r?function(){return r.cur()}:function(){return ce.css(e,t,"")},u=s(),l=n&&n[3]||(ce.cssNumber[t]?"":"px"),c=e.nodeType&&(ce.cssNumber[t]||"px"!==l&&+u)&&Y.exec(ce.css(e,t));if(c&&c[3]!==l){u/=2,l=l||c[3],c=+u||1;while(a--)ce.style(e,t,c+l),(1-o)*(1-(o=s()/u||.5))<=0&&(a=0),c/=o;c*=2,ce.style(e,t,c+l),n=n||[]}return n&&(c=+c||+u||0,i=n[1]?c+(n[1]+1)*n[2]:+n[2],r&&(r.unit=l,r.start=c,r.end=i)),i}var ne={};function re(e,t){for(var n,r,i,o,a,s,u,l=[],c=0,f=e.length;c<f;c++)(r=e[c]).style&&(n=r.style.display,t?("none"===n&&(l[c]=_.get(r,"display")||null,l[c]||(r.style.display="")),""===r.style.display&&ee(r)&&(l[c]=(u=a=o=void 0,a=(i=r).ownerDocument,s=i.nodeName,(u=ne[s])||(o=a.body.appendChild(a.createElement(s)),u=ce.css(o,"display"),o.parentNode.removeChild(o),"none"===u&&(u="block"),ne[s]=u)))):"none"!==n&&(l[c]="none",_.set(r,"display",n)));for(c=0;c<f;c++)null!=l[c]&&(e[c].style.display=l[c]);return e}ce.fn.extend({show:function(){return re(this,!0)},hide:function(){return re(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each(function(){ee(this)?ce(this).show():ce(this).hide()})}});var xe,be,we=/^(?:checkbox|radio)$/i,Te=/<([a-z][^\/\0>\x20\t\r\n\f]*)/i,Ce=/^$|^module$|\/(?:java|ecma)script/i;xe=C.createDocumentFragment().appendChild(C.createElement("div")),(be=C.createElement("input")).setAttribute("type","radio"),be.setAttribute("checked","checked"),be.setAttribute("name","t"),xe.appendChild(be),le.checkClone=xe.cloneNode(!0).cloneNode(!0).lastChild.checked,xe.innerHTML="<textarea>x</textarea>",le.noCloneChecked=!!xe.cloneNode(!0).lastChild.defaultValue,xe.innerHTML="<option></option>",le.option=!!xe.lastChild;var ke={thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};function Se(e,t){var n;return n="undefined"!=typeof e.getElementsByTagName?e.getElementsByTagName(t||"*"):"undefined"!=typeof e.querySelectorAll?e.querySelectorAll(t||"*"):[],void 0===t||t&&fe(e,t)?ce.merge([e],n):n}function Ee(e,t){for(var n=0,r=e.length;n<r;n++)_.set(e[n],"globalEval",!t||_.get(t[n],"globalEval"))}ke.tbody=ke.tfoot=ke.colgroup=ke.caption=ke.thead,ke.th=ke.td,le.option||(ke.optgroup=ke.option=[1,"<select multiple='multiple'>","</select>"]);var je=/<|&#?\w+;/;function Ae(e,t,n,r,i){for(var o,a,s,u,l,c,f=t.createDocumentFragment(),p=[],d=0,h=e.length;d<h;d++)if((o=e[d])||0===o)if("object"===x(o))ce.merge(p,o.nodeType?[o]:o);else if(je.test(o)){a=a||f.appendChild(t.createElement("div")),s=(Te.exec(o)||["",""])[1].toLowerCase(),u=ke[s]||ke._default,a.innerHTML=u[1]+ce.htmlPrefilter(o)+u[2],c=u[0];while(c--)a=a.lastChild;ce.merge(p,a.childNodes),(a=f.firstChild).textContent=""}else p.push(t.createTextNode(o));f.textContent="",d=0;while(o=p[d++])if(r&&-1<ce.inArray(o,r))i&&i.push(o);else if(l=K(o),a=Se(f.appendChild(o),"script"),l&&Ee(a),n){c=0;while(o=a[c++])Ce.test(o.type||"")&&n.push(o)}return f}var De=/^([^.]*)(?:\.(.+)|)/;function Ne(){return!0}function qe(){return!1}function Le(e,t,n,r,i,o){var a,s;if("object"==typeof t){for(s in"string"!=typeof n&&(r=r||n,n=void 0),t)Le(e,s,n,r,t[s],o);return e}if(null==r&&null==i?(i=n,r=n=void 0):null==i&&("string"==typeof n?(i=r,r=void 0):(i=r,r=n,n=void 0)),!1===i)i=qe;else if(!i)return e;return 1===o&&(a=i,(i=function(e){return ce().off(e),a.apply(this,arguments)}).guid=a.guid||(a.guid=ce.guid++)),e.each(function(){ce.event.add(this,t,i,r,n)})}function He(e,r,t){t?(_.set(e,r,!1),ce.event.add(e,r,{namespace:!1,handler:function(e){var t,n=_.get(this,r);if(1&e.isTrigger&&this[r]){if(n)(ce.event.special[r]||{}).delegateType&&e.stopPropagation();else if(n=ae.call(arguments),_.set(this,r,n),this[r](),t=_.get(this,r),_.set(this,r,!1),n!==t)return e.stopImmediatePropagation(),e.preventDefault(),t}else n&&(_.set(this,r,ce.event.trigger(n[0],n.slice(1),this)),e.stopPropagation(),e.isImmediatePropagationStopped=Ne)}})):void 0===_.get(e,r)&&ce.event.add(e,r,Ne)}ce.event={global:{},add:function(t,e,n,r,i){var o,a,s,u,l,c,f,p,d,h,g,v=_.get(t);if($(t)){n.handler&&(n=(o=n).handler,i=o.selector),i&&ce.find.matchesSelector(J,i),n.guid||(n.guid=ce.guid++),(u=v.events)||(u=v.events=Object.create(null)),(a=v.handle)||(a=v.handle=function(e){return"undefined"!=typeof ce&&ce.event.triggered!==e.type?ce.event.dispatch.apply(t,arguments):void 0}),l=(e=(e||"").match(D)||[""]).length;while(l--)d=g=(s=De.exec(e[l])||[])[1],h=(s[2]||"").split(".").sort(),d&&(f=ce.event.special[d]||{},d=(i?f.delegateType:f.bindType)||d,f=ce.event.special[d]||{},c=ce.extend({type:d,origType:g,data:r,handler:n,guid:n.guid,selector:i,needsContext:i&&ce.expr.match.needsContext.test(i),namespace:h.join(".")},o),(p=u[d])||((p=u[d]=[]).delegateCount=0,f.setup&&!1!==f.setup.call(t,r,h,a)||t.addEventListener&&t.addEventListener(d,a)),f.add&&(f.add.call(t,c),c.handler.guid||(c.handler.guid=n.guid)),i?p.splice(p.delegateCount++,0,c):p.push(c),ce.event.global[d]=!0)}},remove:function(e,t,n,r,i){var o,a,s,u,l,c,f,p,d,h,g,v=_.hasData(e)&&_.get(e);if(v&&(u=v.events)){l=(t=(t||"").match(D)||[""]).length;while(l--)if(d=g=(s=De.exec(t[l])||[])[1],h=(s[2]||"").split(".").sort(),d){f=ce.event.special[d]||{},p=u[d=(r?f.delegateType:f.bindType)||d]||[],s=s[2]&&new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),a=o=p.length;while(o--)c=p[o],!i&&g!==c.origType||n&&n.guid!==c.guid||s&&!s.test(c.namespace)||r&&r!==c.selector&&("**"!==r||!c.selector)||(p.splice(o,1),c.selector&&p.delegateCount--,f.remove&&f.remove.call(e,c));a&&!p.length&&(f.teardown&&!1!==f.teardown.call(e,h,v.handle)||ce.removeEvent(e,d,v.handle),delete u[d])}else for(d in u)ce.event.remove(e,d+t[l],n,r,!0);ce.isEmptyObject(u)&&_.remove(e,"handle events")}},dispatch:function(e){var t,n,r,i,o,a,s=new Array(arguments.length),u=ce.event.fix(e),l=(_.get(this,"events")||Object.create(null))[u.type]||[],c=ce.event.special[u.type]||{};for(s[0]=u,t=1;t<arguments.length;t++)s[t]=arguments[t];if(u.delegateTarget=this,!c.preDispatch||!1!==c.preDispatch.call(this,u)){a=ce.event.handlers.call(this,u,l),t=0;while((i=a[t++])&&!u.isPropagationStopped()){u.currentTarget=i.elem,n=0;while((o=i.handlers[n++])&&!u.isImmediatePropagationStopped())u.rnamespace&&!1!==o.namespace&&!u.rnamespace.test(o.namespace)||(u.handleObj=o,u.data=o.data,void 0!==(r=((ce.event.special[o.origType]||{}).handle||o.handler).apply(i.elem,s))&&!1===(u.result=r)&&(u.preventDefault(),u.stopPropagation()))}return c.postDispatch&&c.postDispatch.call(this,u),u.result}},handlers:function(e,t){var n,r,i,o,a,s=[],u=t.delegateCount,l=e.target;if(u&&l.nodeType&&!("click"===e.type&&1<=e.button))for(;l!==this;l=l.parentNode||this)if(1===l.nodeType&&("click"!==e.type||!0!==l.disabled)){for(o=[],a={},n=0;n<u;n++)void 0===a[i=(r=t[n]).selector+" "]&&(a[i]=r.needsContext?-1<ce(i,this).index(l):ce.find(i,this,null,[l]).length),a[i]&&o.push(r);o.length&&s.push({elem:l,handlers:o})}return l=this,u<t.length&&s.push({elem:l,handlers:t.slice(u)}),s},addProp:function(t,e){Object.defineProperty(ce.Event.prototype,t,{enumerable:!0,configurable:!0,get:v(e)?function(){if(this.originalEvent)return e(this.originalEvent)}:function(){if(this.originalEvent)return this.originalEvent[t]},set:function(e){Object.defineProperty(this,t,{enumerable:!0,configurable:!0,writable:!0,value:e})}})},fix:function(e){return e[ce.expando]?e:new ce.Event(e)},special:{load:{noBubble:!0},click:{setup:function(e){var t=this||e;return we.test(t.type)&&t.click&&fe(t,"input")&&He(t,"click",!0),!1},trigger:function(e){var t=this||e;return we.test(t.type)&&t.click&&fe(t,"input")&&He(t,"click"),!0},_default:function(e){var t=e.target;return we.test(t.type)&&t.click&&fe(t,"input")&&_.get(t,"click")||fe(t,"a")}},beforeunload:{postDispatch:function(e){void 0!==e.result&&e.originalEvent&&(e.originalEvent.returnValue=e.result)}}}},ce.removeEvent=function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n)},ce.Event=function(e,t){if(!(this instanceof ce.Event))return new ce.Event(e,t);e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||void 0===e.defaultPrevented&&!1===e.returnValue?Ne:qe,this.target=e.target&&3===e.target.nodeType?e.target.parentNode:e.target,this.currentTarget=e.currentTarget,this.relatedTarget=e.relatedTarget):this.type=e,t&&ce.extend(this,t),this.timeStamp=e&&e.timeStamp||Date.now(),this[ce.expando]=!0},ce.Event.prototype={constructor:ce.Event,isDefaultPrevented:qe,isPropagationStopped:qe,isImmediatePropagationStopped:qe,isSimulated:!1,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=Ne,e&&!this.isSimulated&&e.preventDefault()},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=Ne,e&&!this.isSimulated&&e.stopPropagation()},stopImmediatePropagation:function(){var e=this.originalEvent;this.isImmediatePropagationStopped=Ne,e&&!this.isSimulated&&e.stopImmediatePropagation(),this.stopPropagation()}},ce.each({altKey:!0,bubbles:!0,cancelable:!0,changedTouches:!0,ctrlKey:!0,detail:!0,eventPhase:!0,metaKey:!0,pageX:!0,pageY:!0,shiftKey:!0,view:!0,"char":!0,code:!0,charCode:!0,key:!0,keyCode:!0,button:!0,buttons:!0,clientX:!0,clientY:!0,offsetX:!0,offsetY:!0,pointerId:!0,pointerType:!0,screenX:!0,screenY:!0,targetTouches:!0,toElement:!0,touches:!0,which:!0},ce.event.addProp),ce.each({focus:"focusin",blur:"focusout"},function(r,i){function o(e){if(C.documentMode){var t=_.get(this,"handle"),n=ce.event.fix(e);n.type="focusin"===e.type?"focus":"blur",n.isSimulated=!0,t(e),n.target===n.currentTarget&&t(n)}else ce.event.simulate(i,e.target,ce.event.fix(e))}ce.event.special[r]={setup:function(){var e;if(He(this,r,!0),!C.documentMode)return!1;(e=_.get(this,i))||this.addEventListener(i,o),_.set(this,i,(e||0)+1)},trigger:function(){return He(this,r),!0},teardown:function(){var e;if(!C.documentMode)return!1;(e=_.get(this,i)-1)?_.set(this,i,e):(this.removeEventListener(i,o),_.remove(this,i))},_default:function(e){return _.get(e.target,r)},delegateType:i},ce.event.special[i]={setup:function(){var e=this.ownerDocument||this.document||this,t=C.documentMode?this:e,n=_.get(t,i);n||(C.documentMode?this.addEventListener(i,o):e.addEventListener(r,o,!0)),_.set(t,i,(n||0)+1)},teardown:function(){var e=this.ownerDocument||this.document||this,t=C.documentMode?this:e,n=_.get(t,i)-1;n?_.set(t,i,n):(C.documentMode?this.removeEventListener(i,o):e.removeEventListener(r,o,!0),_.remove(t,i))}}}),ce.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(e,i){ce.event.special[e]={delegateType:i,bindType:i,handle:function(e){var t,n=e.relatedTarget,r=e.handleObj;return n&&(n===this||ce.contains(this,n))||(e.type=r.origType,t=r.handler.apply(this,arguments),e.type=i),t}}}),ce.fn.extend({on:function(e,t,n,r){return Le(this,e,t,n,r)},one:function(e,t,n,r){return Le(this,e,t,n,r,1)},off:function(e,t,n){var r,i;if(e&&e.preventDefault&&e.handleObj)return r=e.handleObj,ce(e.delegateTarget).off(r.namespace?r.origType+"."+r.namespace:r.origType,r.selector,r.handler),this;if("object"==typeof e){for(i in e)this.off(i,t,e[i]);return this}return!1!==t&&"function"!=typeof t||(n=t,t=void 0),!1===n&&(n=qe),this.each(function(){ce.event.remove(this,e,n,t)})}});var Oe=/<script|<style|<link/i,Pe=/checked\s*(?:[^=]|=\s*.checked.)/i,Me=/^\s*<!\[CDATA\[|\]\]>\s*$/g;function Re(e,t){return fe(e,"table")&&fe(11!==t.nodeType?t:t.firstChild,"tr")&&ce(e).children("tbody")[0]||e}function Ie(e){return e.type=(null!==e.getAttribute("type"))+"/"+e.type,e}function We(e){return"true/"===(e.type||"").slice(0,5)?e.type=e.type.slice(5):e.removeAttribute("type"),e}function Fe(e,t){var n,r,i,o,a,s;if(1===t.nodeType){if(_.hasData(e)&&(s=_.get(e).events))for(i in _.remove(t,"handle events"),s)for(n=0,r=s[i].length;n<r;n++)ce.event.add(t,i,s[i][n]);z.hasData(e)&&(o=z.access(e),a=ce.extend({},o),z.set(t,a))}}function $e(n,r,i,o){r=g(r);var e,t,a,s,u,l,c=0,f=n.length,p=f-1,d=r[0],h=v(d);if(h||1<f&&"string"==typeof d&&!le.checkClone&&Pe.test(d))return n.each(function(e){var t=n.eq(e);h&&(r[0]=d.call(this,e,t.html())),$e(t,r,i,o)});if(f&&(t=(e=Ae(r,n[0].ownerDocument,!1,n,o)).firstChild,1===e.childNodes.length&&(e=t),t||o)){for(s=(a=ce.map(Se(e,"script"),Ie)).length;c<f;c++)u=e,c!==p&&(u=ce.clone(u,!0,!0),s&&ce.merge(a,Se(u,"script"))),i.call(n[c],u,c);if(s)for(l=a[a.length-1].ownerDocument,ce.map(a,We),c=0;c<s;c++)u=a[c],Ce.test(u.type||"")&&!_.access(u,"globalEval")&&ce.contains(l,u)&&(u.src&&"module"!==(u.type||"").toLowerCase()?ce._evalUrl&&!u.noModule&&ce._evalUrl(u.src,{nonce:u.nonce||u.getAttribute("nonce")},l):m(u.textContent.replace(Me,""),u,l))}return n}function Be(e,t,n){for(var r,i=t?ce.filter(t,e):e,o=0;null!=(r=i[o]);o++)n||1!==r.nodeType||ce.cleanData(Se(r)),r.parentNode&&(n&&K(r)&&Ee(Se(r,"script")),r.parentNode.removeChild(r));return e}ce.extend({htmlPrefilter:function(e){return e},clone:function(e,t,n){var r,i,o,a,s,u,l,c=e.cloneNode(!0),f=K(e);if(!(le.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||ce.isXMLDoc(e)))for(a=Se(c),r=0,i=(o=Se(e)).length;r<i;r++)s=o[r],u=a[r],void 0,"input"===(l=u.nodeName.toLowerCase())&&we.test(s.type)?u.checked=s.checked:"input"!==l&&"textarea"!==l||(u.defaultValue=s.defaultValue);if(t)if(n)for(o=o||Se(e),a=a||Se(c),r=0,i=o.length;r<i;r++)Fe(o[r],a[r]);else Fe(e,c);return 0<(a=Se(c,"script")).length&&Ee(a,!f&&Se(e,"script")),c},cleanData:function(e){for(var t,n,r,i=ce.event.special,o=0;void 0!==(n=e[o]);o++)if($(n)){if(t=n[_.expando]){if(t.events)for(r in t.events)i[r]?ce.event.remove(n,r):ce.removeEvent(n,r,t.handle);n[_.expando]=void 0}n[z.expando]&&(n[z.expando]=void 0)}}}),ce.fn.extend({detach:function(e){return Be(this,e,!0)},remove:function(e){return Be(this,e)},text:function(e){return M(this,function(e){return void 0===e?ce.text(this):this.empty().each(function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=e)})},null,e,arguments.length)},append:function(){return $e(this,arguments,function(e){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||Re(this,e).appendChild(e)})},prepend:function(){return $e(this,arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=Re(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return $e(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return $e(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},empty:function(){for(var e,t=0;null!=(e=this[t]);t++)1===e.nodeType&&(ce.cleanData(Se(e,!1)),e.textContent="");return this},clone:function(e,t){return e=null!=e&&e,t=null==t?e:t,this.map(function(){return ce.clone(this,e,t)})},html:function(e){return M(this,function(e){var t=this[0]||{},n=0,r=this.length;if(void 0===e&&1===t.nodeType)return t.innerHTML;if("string"==typeof e&&!Oe.test(e)&&!ke[(Te.exec(e)||["",""])[1].toLowerCase()]){e=ce.htmlPrefilter(e);try{for(;n<r;n++)1===(t=this[n]||{}).nodeType&&(ce.cleanData(Se(t,!1)),t.innerHTML=e);t=0}catch(e){}}t&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var n=[];return $e(this,arguments,function(e){var t=this.parentNode;ce.inArray(this,n)<0&&(ce.cleanData(Se(this)),t&&t.replaceChild(e,this))},n)}}),ce.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,a){ce.fn[e]=function(e){for(var t,n=[],r=ce(e),i=r.length-1,o=0;o<=i;o++)t=o===i?this:this.clone(!0),ce(r[o])[a](t),s.apply(n,t.get());return this.pushStack(n)}});var _e=new RegExp("^("+G+")(?!px)[a-z%]+$","i"),ze=/^--/,Xe=function(e){var t=e.ownerDocument.defaultView;return t&&t.opener||(t=ie),t.getComputedStyle(e)},Ue=function(e,t,n){var r,i,o={};for(i in t)o[i]=e.style[i],e.style[i]=t[i];for(i in r=n.call(e),t)e.style[i]=o[i];return r},Ve=new RegExp(Q.join("|"),"i");function Ge(e,t,n){var r,i,o,a,s=ze.test(t),u=e.style;return(n=n||Xe(e))&&(a=n.getPropertyValue(t)||n[t],s&&a&&(a=a.replace(ve,"$1")||void 0),""!==a||K(e)||(a=ce.style(e,t)),!le.pixelBoxStyles()&&_e.test(a)&&Ve.test(t)&&(r=u.width,i=u.minWidth,o=u.maxWidth,u.minWidth=u.maxWidth=u.width=a,a=n.width,u.width=r,u.minWidth=i,u.maxWidth=o)),void 0!==a?a+"":a}function Ye(e,t){return{get:function(){if(!e())return(this.get=t).apply(this,arguments);delete this.get}}}!function(){function e(){if(l){u.style.cssText="position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0",l.style.cssText="position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%",J.appendChild(u).appendChild(l);var e=ie.getComputedStyle(l);n="1%"!==e.top,s=12===t(e.marginLeft),l.style.right="60%",o=36===t(e.right),r=36===t(e.width),l.style.position="absolute",i=12===t(l.offsetWidth/3),J.removeChild(u),l=null}}function t(e){return Math.round(parseFloat(e))}var n,r,i,o,a,s,u=C.createElement("div"),l=C.createElement("div");l.style&&(l.style.backgroundClip="content-box",l.cloneNode(!0).style.backgroundClip="",le.clearCloneStyle="content-box"===l.style.backgroundClip,ce.extend(le,{boxSizingReliable:function(){return e(),r},pixelBoxStyles:function(){return e(),o},pixelPosition:function(){return e(),n},reliableMarginLeft:function(){return e(),s},scrollboxSize:function(){return e(),i},reliableTrDimensions:function(){var e,t,n,r;return null==a&&(e=C.createElement("table"),t=C.createElement("tr"),n=C.createElement("div"),e.style.cssText="position:absolute;left:-11111px;border-collapse:separate",t.style.cssText="box-sizing:content-box;border:1px solid",t.style.height="1px",n.style.height="9px",n.style.display="block",J.appendChild(e).appendChild(t).appendChild(n),r=ie.getComputedStyle(t),a=parseInt(r.height,10)+parseInt(r.borderTopWidth,10)+parseInt(r.borderBottomWidth,10)===t.offsetHeight,J.removeChild(e)),a}}))}();var Qe=["Webkit","Moz","ms"],Je=C.createElement("div").style,Ke={};function Ze(e){var t=ce.cssProps[e]||Ke[e];return t||(e in Je?e:Ke[e]=function(e){var t=e[0].toUpperCase()+e.slice(1),n=Qe.length;while(n--)if((e=Qe[n]+t)in Je)return e}(e)||e)}var et=/^(none|table(?!-c[ea]).+)/,tt={position:"absolute",visibility:"hidden",display:"block"},nt={letterSpacing:"0",fontWeight:"400"};function rt(e,t,n){var r=Y.exec(t);return r?Math.max(0,r[2]-(n||0))+(r[3]||"px"):t}function it(e,t,n,r,i,o){var a="width"===t?1:0,s=0,u=0,l=0;if(n===(r?"border":"content"))return 0;for(;a<4;a+=2)"margin"===n&&(l+=ce.css(e,n+Q[a],!0,i)),r?("content"===n&&(u-=ce.css(e,"padding"+Q[a],!0,i)),"margin"!==n&&(u-=ce.css(e,"border"+Q[a]+"Width",!0,i))):(u+=ce.css(e,"padding"+Q[a],!0,i),"padding"!==n?u+=ce.css(e,"border"+Q[a]+"Width",!0,i):s+=ce.css(e,"border"+Q[a]+"Width",!0,i));return!r&&0<=o&&(u+=Math.max(0,Math.ceil(e["offset"+t[0].toUpperCase()+t.slice(1)]-o-u-s-.5))||0),u+l}function ot(e,t,n){var r=Xe(e),i=(!le.boxSizingReliable()||n)&&"border-box"===ce.css(e,"boxSizing",!1,r),o=i,a=Ge(e,t,r),s="offset"+t[0].toUpperCase()+t.slice(1);if(_e.test(a)){if(!n)return a;a="auto"}return(!le.boxSizingReliable()&&i||!le.reliableTrDimensions()&&fe(e,"tr")||"auto"===a||!parseFloat(a)&&"inline"===ce.css(e,"display",!1,r))&&e.getClientRects().length&&(i="border-box"===ce.css(e,"boxSizing",!1,r),(o=s in e)&&(a=e[s])),(a=parseFloat(a)||0)+it(e,t,n||(i?"border":"content"),o,r,a)+"px"}function at(e,t,n,r,i){return new at.prototype.init(e,t,n,r,i)}ce.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=Ge(e,"opacity");return""===n?"1":n}}}},cssNumber:{animationIterationCount:!0,aspectRatio:!0,borderImageSlice:!0,columnCount:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,gridArea:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnStart:!0,gridRow:!0,gridRowEnd:!0,gridRowStart:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,scale:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeMiterlimit:!0,strokeOpacity:!0},cssProps:{},style:function(e,t,n,r){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var i,o,a,s=F(t),u=ze.test(t),l=e.style;if(u||(t=Ze(s)),a=ce.cssHooks[t]||ce.cssHooks[s],void 0===n)return a&&"get"in a&&void 0!==(i=a.get(e,!1,r))?i:l[t];"string"===(o=typeof n)&&(i=Y.exec(n))&&i[1]&&(n=te(e,t,i),o="number"),null!=n&&n==n&&("number"!==o||u||(n+=i&&i[3]||(ce.cssNumber[s]?"":"px")),le.clearCloneStyle||""!==n||0!==t.indexOf("background")||(l[t]="inherit"),a&&"set"in a&&void 0===(n=a.set(e,n,r))||(u?l.setProperty(t,n):l[t]=n))}},css:function(e,t,n,r){var i,o,a,s=F(t);return ze.test(t)||(t=Ze(s)),(a=ce.cssHooks[t]||ce.cssHooks[s])&&"get"in a&&(i=a.get(e,!0,n)),void 0===i&&(i=Ge(e,t,r)),"normal"===i&&t in nt&&(i=nt[t]),""===n||n?(o=parseFloat(i),!0===n||isFinite(o)?o||0:i):i}}),ce.each(["height","width"],function(e,u){ce.cssHooks[u]={get:function(e,t,n){if(t)return!et.test(ce.css(e,"display"))||e.getClientRects().length&&e.getBoundingClientRect().width?ot(e,u,n):Ue(e,tt,function(){return ot(e,u,n)})},set:function(e,t,n){var r,i=Xe(e),o=!le.scrollboxSize()&&"absolute"===i.position,a=(o||n)&&"border-box"===ce.css(e,"boxSizing",!1,i),s=n?it(e,u,n,a,i):0;return a&&o&&(s-=Math.ceil(e["offset"+u[0].toUpperCase()+u.slice(1)]-parseFloat(i[u])-it(e,u,"border",!1,i)-.5)),s&&(r=Y.exec(t))&&"px"!==(r[3]||"px")&&(e.style[u]=t,t=ce.css(e,u)),rt(0,t,s)}}}),ce.cssHooks.marginLeft=Ye(le.reliableMarginLeft,function(e,t){if(t)return(parseFloat(Ge(e,"marginLeft"))||e.getBoundingClientRect().left-Ue(e,{marginLeft:0},function(){return e.getBoundingClientRect().left}))+"px"}),ce.each({margin:"",padding:"",border:"Width"},function(i,o){ce.cssHooks[i+o]={expand:function(e){for(var t=0,n={},r="string"==typeof e?e.split(" "):[e];t<4;t++)n[i+Q[t]+o]=r[t]||r[t-2]||r[0];return n}},"margin"!==i&&(ce.cssHooks[i+o].set=rt)}),ce.fn.extend({css:function(e,t){return M(this,function(e,t,n){var r,i,o={},a=0;if(Array.isArray(t)){for(r=Xe(e),i=t.length;a<i;a++)o[t[a]]=ce.css(e,t[a],!1,r);return o}return void 0!==n?ce.style(e,t,n):ce.css(e,t)},e,t,1<arguments.length)}}),((ce.Tween=at).prototype={constructor:at,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||ce.easing._default,this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(ce.cssNumber[n]?"":"px")},cur:function(){var e=at.propHooks[this.prop];return e&&e.get?e.get(this):at.propHooks._default.get(this)},run:function(e){var t,n=at.propHooks[this.prop];return this.options.duration?this.pos=t=ce.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):this.pos=t=e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):at.propHooks._default.set(this),this}}).init.prototype=at.prototype,(at.propHooks={_default:{get:function(e){var t;return 1!==e.elem.nodeType||null!=e.elem[e.prop]&&null==e.elem.style[e.prop]?e.elem[e.prop]:(t=ce.css(e.elem,e.prop,""))&&"auto"!==t?t:0},set:function(e){ce.fx.step[e.prop]?ce.fx.step[e.prop](e):1!==e.elem.nodeType||!ce.cssHooks[e.prop]&&null==e.elem.style[Ze(e.prop)]?e.elem[e.prop]=e.now:ce.style(e.elem,e.prop,e.now+e.unit)}}}).scrollTop=at.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},ce.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2},_default:"swing"},ce.fx=at.prototype.init,ce.fx.step={};var st,ut,lt,ct,ft=/^(?:toggle|show|hide)$/,pt=/queueHooks$/;function dt(){ut&&(!1===C.hidden&&ie.requestAnimationFrame?ie.requestAnimationFrame(dt):ie.setTimeout(dt,ce.fx.interval),ce.fx.tick())}function ht(){return ie.setTimeout(function(){st=void 0}),st=Date.now()}function gt(e,t){var n,r=0,i={height:e};for(t=t?1:0;r<4;r+=2-t)i["margin"+(n=Q[r])]=i["padding"+n]=e;return t&&(i.opacity=i.width=e),i}function vt(e,t,n){for(var r,i=(yt.tweeners[t]||[]).concat(yt.tweeners["*"]),o=0,a=i.length;o<a;o++)if(r=i[o].call(n,t,e))return r}function yt(o,e,t){var n,a,r=0,i=yt.prefilters.length,s=ce.Deferred().always(function(){delete u.elem}),u=function(){if(a)return!1;for(var e=st||ht(),t=Math.max(0,l.startTime+l.duration-e),n=1-(t/l.duration||0),r=0,i=l.tweens.length;r<i;r++)l.tweens[r].run(n);return s.notifyWith(o,[l,n,t]),n<1&&i?t:(i||s.notifyWith(o,[l,1,0]),s.resolveWith(o,[l]),!1)},l=s.promise({elem:o,props:ce.extend({},e),opts:ce.extend(!0,{specialEasing:{},easing:ce.easing._default},t),originalProperties:e,originalOptions:t,startTime:st||ht(),duration:t.duration,tweens:[],createTween:function(e,t){var n=ce.Tween(o,l.opts,e,t,l.opts.specialEasing[e]||l.opts.easing);return l.tweens.push(n),n},stop:function(e){var t=0,n=e?l.tweens.length:0;if(a)return this;for(a=!0;t<n;t++)l.tweens[t].run(1);return e?(s.notifyWith(o,[l,1,0]),s.resolveWith(o,[l,e])):s.rejectWith(o,[l,e]),this}}),c=l.props;for(!function(e,t){var n,r,i,o,a;for(n in e)if(i=t[r=F(n)],o=e[n],Array.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),(a=ce.cssHooks[r])&&"expand"in a)for(n in o=a.expand(o),delete e[r],o)n in e||(e[n]=o[n],t[n]=i);else t[r]=i}(c,l.opts.specialEasing);r<i;r++)if(n=yt.prefilters[r].call(l,o,c,l.opts))return v(n.stop)&&(ce._queueHooks(l.elem,l.opts.queue).stop=n.stop.bind(n)),n;return ce.map(c,vt,l),v(l.opts.start)&&l.opts.start.call(o,l),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always),ce.fx.timer(ce.extend(u,{elem:o,anim:l,queue:l.opts.queue})),l}ce.Animation=ce.extend(yt,{tweeners:{"*":[function(e,t){var n=this.createTween(e,t);return te(n.elem,e,Y.exec(t),n),n}]},tweener:function(e,t){v(e)?(t=e,e=["*"]):e=e.match(D);for(var n,r=0,i=e.length;r<i;r++)n=e[r],yt.tweeners[n]=yt.tweeners[n]||[],yt.tweeners[n].unshift(t)},prefilters:[function(e,t,n){var r,i,o,a,s,u,l,c,f="width"in t||"height"in t,p=this,d={},h=e.style,g=e.nodeType&&ee(e),v=_.get(e,"fxshow");for(r in n.queue||(null==(a=ce._queueHooks(e,"fx")).unqueued&&(a.unqueued=0,s=a.empty.fire,a.empty.fire=function(){a.unqueued||s()}),a.unqueued++,p.always(function(){p.always(function(){a.unqueued--,ce.queue(e,"fx").length||a.empty.fire()})})),t)if(i=t[r],ft.test(i)){if(delete t[r],o=o||"toggle"===i,i===(g?"hide":"show")){if("show"!==i||!v||void 0===v[r])continue;g=!0}d[r]=v&&v[r]||ce.style(e,r)}if((u=!ce.isEmptyObject(t))||!ce.isEmptyObject(d))for(r in f&&1===e.nodeType&&(n.overflow=[h.overflow,h.overflowX,h.overflowY],null==(l=v&&v.display)&&(l=_.get(e,"display")),"none"===(c=ce.css(e,"display"))&&(l?c=l:(re([e],!0),l=e.style.display||l,c=ce.css(e,"display"),re([e]))),("inline"===c||"inline-block"===c&&null!=l)&&"none"===ce.css(e,"float")&&(u||(p.done(function(){h.display=l}),null==l&&(c=h.display,l="none"===c?"":c)),h.display="inline-block")),n.overflow&&(h.overflow="hidden",p.always(function(){h.overflow=n.overflow[0],h.overflowX=n.overflow[1],h.overflowY=n.overflow[2]})),u=!1,d)u||(v?"hidden"in v&&(g=v.hidden):v=_.access(e,"fxshow",{display:l}),o&&(v.hidden=!g),g&&re([e],!0),p.done(function(){for(r in g||re([e]),_.remove(e,"fxshow"),d)ce.style(e,r,d[r])})),u=vt(g?v[r]:0,r,p),r in v||(v[r]=u.start,g&&(u.end=u.start,u.start=0))}],prefilter:function(e,t){t?yt.prefilters.unshift(e):yt.prefilters.push(e)}}),ce.speed=function(e,t,n){var r=e&&"object"==typeof e?ce.extend({},e):{complete:n||!n&&t||v(e)&&e,duration:e,easing:n&&t||t&&!v(t)&&t};return ce.fx.off?r.duration=0:"number"!=typeof r.duration&&(r.duration in ce.fx.speeds?r.duration=ce.fx.speeds[r.duration]:r.duration=ce.fx.speeds._default),null!=r.queue&&!0!==r.queue||(r.queue="fx"),r.old=r.complete,r.complete=function(){v(r.old)&&r.old.call(this),r.queue&&ce.dequeue(this,r.queue)},r},ce.fn.extend({fadeTo:function(e,t,n,r){return this.filter(ee).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(t,e,n,r){var i=ce.isEmptyObject(t),o=ce.speed(e,n,r),a=function(){var e=yt(this,ce.extend({},t),o);(i||_.get(this,"finish"))&&e.stop(!0)};return a.finish=a,i||!1===o.queue?this.each(a):this.queue(o.queue,a)},stop:function(i,e,o){var a=function(e){var t=e.stop;delete e.stop,t(o)};return"string"!=typeof i&&(o=e,e=i,i=void 0),e&&this.queue(i||"fx",[]),this.each(function(){var e=!0,t=null!=i&&i+"queueHooks",n=ce.timers,r=_.get(this);if(t)r[t]&&r[t].stop&&a(r[t]);else for(t in r)r[t]&&r[t].stop&&pt.test(t)&&a(r[t]);for(t=n.length;t--;)n[t].elem!==this||null!=i&&n[t].queue!==i||(n[t].anim.stop(o),e=!1,n.splice(t,1));!e&&o||ce.dequeue(this,i)})},finish:function(a){return!1!==a&&(a=a||"fx"),this.each(function(){var e,t=_.get(this),n=t[a+"queue"],r=t[a+"queueHooks"],i=ce.timers,o=n?n.length:0;for(t.finish=!0,ce.queue(this,a,[]),r&&r.stop&&r.stop.call(this,!0),e=i.length;e--;)i[e].elem===this&&i[e].queue===a&&(i[e].anim.stop(!0),i.splice(e,1));for(e=0;e<o;e++)n[e]&&n[e].finish&&n[e].finish.call(this);delete t.finish})}}),ce.each(["toggle","show","hide"],function(e,r){var i=ce.fn[r];ce.fn[r]=function(e,t,n){return null==e||"boolean"==typeof e?i.apply(this,arguments):this.animate(gt(r,!0),e,t,n)}}),ce.each({slideDown:gt("show"),slideUp:gt("hide"),slideToggle:gt("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,r){ce.fn[e]=function(e,t,n){return this.animate(r,e,t,n)}}),ce.timers=[],ce.fx.tick=function(){var e,t=0,n=ce.timers;for(st=Date.now();t<n.length;t++)(e=n[t])()||n[t]!==e||n.splice(t--,1);n.length||ce.fx.stop(),st=void 0},ce.fx.timer=function(e){ce.timers.push(e),ce.fx.start()},ce.fx.interval=13,ce.fx.start=function(){ut||(ut=!0,dt())},ce.fx.stop=function(){ut=null},ce.fx.speeds={slow:600,fast:200,_default:400},ce.fn.delay=function(r,e){return r=ce.fx&&ce.fx.speeds[r]||r,e=e||"fx",this.queue(e,function(e,t){var n=ie.setTimeout(e,r);t.stop=function(){ie.clearTimeout(n)}})},lt=C.createElement("input"),ct=C.createElement("select").appendChild(C.createElement("option")),lt.type="checkbox",le.checkOn=""!==lt.value,le.optSelected=ct.selected,(lt=C.createElement("input")).value="t",lt.type="radio",le.radioValue="t"===lt.value;var mt,xt=ce.expr.attrHandle;ce.fn.extend({attr:function(e,t){return M(this,ce.attr,e,t,1<arguments.length)},removeAttr:function(e){return this.each(function(){ce.removeAttr(this,e)})}}),ce.extend({attr:function(e,t,n){var r,i,o=e.nodeType;if(3!==o&&8!==o&&2!==o)return"undefined"==typeof e.getAttribute?ce.prop(e,t,n):(1===o&&ce.isXMLDoc(e)||(i=ce.attrHooks[t.toLowerCase()]||(ce.expr.match.bool.test(t)?mt:void 0)),void 0!==n?null===n?void ce.removeAttr(e,t):i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:(e.setAttribute(t,n+""),n):i&&"get"in i&&null!==(r=i.get(e,t))?r:null==(r=ce.find.attr(e,t))?void 0:r)},attrHooks:{type:{set:function(e,t){if(!le.radioValue&&"radio"===t&&fe(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},removeAttr:function(e,t){var n,r=0,i=t&&t.match(D);if(i&&1===e.nodeType)while(n=i[r++])e.removeAttribute(n)}}),mt={set:function(e,t,n){return!1===t?ce.removeAttr(e,n):e.setAttribute(n,n),n}},ce.each(ce.expr.match.bool.source.match(/\w+/g),function(e,t){var a=xt[t]||ce.find.attr;xt[t]=function(e,t,n){var r,i,o=t.toLowerCase();return n||(i=xt[o],xt[o]=r,r=null!=a(e,t,n)?o:null,xt[o]=i),r}});var bt=/^(?:input|select|textarea|button)$/i,wt=/^(?:a|area)$/i;function Tt(e){return(e.match(D)||[]).join(" ")}function Ct(e){return e.getAttribute&&e.getAttribute("class")||""}function kt(e){return Array.isArray(e)?e:"string"==typeof e&&e.match(D)||[]}ce.fn.extend({prop:function(e,t){return M(this,ce.prop,e,t,1<arguments.length)},removeProp:function(e){return this.each(function(){delete this[ce.propFix[e]||e]})}}),ce.extend({prop:function(e,t,n){var r,i,o=e.nodeType;if(3!==o&&8!==o&&2!==o)return 1===o&&ce.isXMLDoc(e)||(t=ce.propFix[t]||t,i=ce.propHooks[t]),void 0!==n?i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:e[t]=n:i&&"get"in i&&null!==(r=i.get(e,t))?r:e[t]},propHooks:{tabIndex:{get:function(e){var t=ce.find.attr(e,"tabindex");return t?parseInt(t,10):bt.test(e.nodeName)||wt.test(e.nodeName)&&e.href?0:-1}}},propFix:{"for":"htmlFor","class":"className"}}),le.optSelected||(ce.propHooks.selected={get:function(e){var t=e.parentNode;return t&&t.parentNode&&t.parentNode.selectedIndex,null},set:function(e){var t=e.parentNode;t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex)}}),ce.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){ce.propFix[this.toLowerCase()]=this}),ce.fn.extend({addClass:function(t){var e,n,r,i,o,a;return v(t)?this.each(function(e){ce(this).addClass(t.call(this,e,Ct(this)))}):(e=kt(t)).length?this.each(function(){if(r=Ct(this),n=1===this.nodeType&&" "+Tt(r)+" "){for(o=0;o<e.length;o++)i=e[o],n.indexOf(" "+i+" ")<0&&(n+=i+" ");a=Tt(n),r!==a&&this.setAttribute("class",a)}}):this},removeClass:function(t){var e,n,r,i,o,a;return v(t)?this.each(function(e){ce(this).removeClass(t.call(this,e,Ct(this)))}):arguments.length?(e=kt(t)).length?this.each(function(){if(r=Ct(this),n=1===this.nodeType&&" "+Tt(r)+" "){for(o=0;o<e.length;o++){i=e[o];while(-1<n.indexOf(" "+i+" "))n=n.replace(" "+i+" "," ")}a=Tt(n),r!==a&&this.setAttribute("class",a)}}):this:this.attr("class","")},toggleClass:function(t,n){var e,r,i,o,a=typeof t,s="string"===a||Array.isArray(t);return v(t)?this.each(function(e){ce(this).toggleClass(t.call(this,e,Ct(this),n),n)}):"boolean"==typeof n&&s?n?this.addClass(t):this.removeClass(t):(e=kt(t),this.each(function(){if(s)for(o=ce(this),i=0;i<e.length;i++)r=e[i],o.hasClass(r)?o.removeClass(r):o.addClass(r);else void 0!==t&&"boolean"!==a||((r=Ct(this))&&_.set(this,"__className__",r),this.setAttribute&&this.setAttribute("class",r||!1===t?"":_.get(this,"__className__")||""))}))},hasClass:function(e){var t,n,r=0;t=" "+e+" ";while(n=this[r++])if(1===n.nodeType&&-1<(" "+Tt(Ct(n))+" ").indexOf(t))return!0;return!1}});var St=/\r/g;ce.fn.extend({val:function(n){var r,e,i,t=this[0];return arguments.length?(i=v(n),this.each(function(e){var t;1===this.nodeType&&(null==(t=i?n.call(this,e,ce(this).val()):n)?t="":"number"==typeof t?t+="":Array.isArray(t)&&(t=ce.map(t,function(e){return null==e?"":e+""})),(r=ce.valHooks[this.type]||ce.valHooks[this.nodeName.toLowerCase()])&&"set"in r&&void 0!==r.set(this,t,"value")||(this.value=t))})):t?(r=ce.valHooks[t.type]||ce.valHooks[t.nodeName.toLowerCase()])&&"get"in r&&void 0!==(e=r.get(t,"value"))?e:"string"==typeof(e=t.value)?e.replace(St,""):null==e?"":e:void 0}}),ce.extend({valHooks:{option:{get:function(e){var t=ce.find.attr(e,"value");return null!=t?t:Tt(ce.text(e))}},select:{get:function(e){var t,n,r,i=e.options,o=e.selectedIndex,a="select-one"===e.type,s=a?null:[],u=a?o+1:i.length;for(r=o<0?u:a?o:0;r<u;r++)if(((n=i[r]).selected||r===o)&&!n.disabled&&(!n.parentNode.disabled||!fe(n.parentNode,"optgroup"))){if(t=ce(n).val(),a)return t;s.push(t)}return s},set:function(e,t){var n,r,i=e.options,o=ce.makeArray(t),a=i.length;while(a--)((r=i[a]).selected=-1<ce.inArray(ce.valHooks.option.get(r),o))&&(n=!0);return n||(e.selectedIndex=-1),o}}}}),ce.each(["radio","checkbox"],function(){ce.valHooks[this]={set:function(e,t){if(Array.isArray(t))return e.checked=-1<ce.inArray(ce(e).val(),t)}},le.checkOn||(ce.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})});var Et=ie.location,jt={guid:Date.now()},At=/\?/;ce.parseXML=function(e){var t,n;if(!e||"string"!=typeof e)return null;try{t=(new ie.DOMParser).parseFromString(e,"text/xml")}catch(e){}return n=t&&t.getElementsByTagName("parsererror")[0],t&&!n||ce.error("Invalid XML: "+(n?ce.map(n.childNodes,function(e){return e.textContent}).join("\n"):e)),t};var Dt=/^(?:focusinfocus|focusoutblur)$/,Nt=function(e){e.stopPropagation()};ce.extend(ce.event,{trigger:function(e,t,n,r){var i,o,a,s,u,l,c,f,p=[n||C],d=ue.call(e,"type")?e.type:e,h=ue.call(e,"namespace")?e.namespace.split("."):[];if(o=f=a=n=n||C,3!==n.nodeType&&8!==n.nodeType&&!Dt.test(d+ce.event.triggered)&&(-1<d.indexOf(".")&&(d=(h=d.split(".")).shift(),h.sort()),u=d.indexOf(":")<0&&"on"+d,(e=e[ce.expando]?e:new ce.Event(d,"object"==typeof e&&e)).isTrigger=r?2:3,e.namespace=h.join("."),e.rnamespace=e.namespace?new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,e.result=void 0,e.target||(e.target=n),t=null==t?[e]:ce.makeArray(t,[e]),c=ce.event.special[d]||{},r||!c.trigger||!1!==c.trigger.apply(n,t))){if(!r&&!c.noBubble&&!y(n)){for(s=c.delegateType||d,Dt.test(s+d)||(o=o.parentNode);o;o=o.parentNode)p.push(o),a=o;a===(n.ownerDocument||C)&&p.push(a.defaultView||a.parentWindow||ie)}i=0;while((o=p[i++])&&!e.isPropagationStopped())f=o,e.type=1<i?s:c.bindType||d,(l=(_.get(o,"events")||Object.create(null))[e.type]&&_.get(o,"handle"))&&l.apply(o,t),(l=u&&o[u])&&l.apply&&$(o)&&(e.result=l.apply(o,t),!1===e.result&&e.preventDefault());return e.type=d,r||e.isDefaultPrevented()||c._default&&!1!==c._default.apply(p.pop(),t)||!$(n)||u&&v(n[d])&&!y(n)&&((a=n[u])&&(n[u]=null),ce.event.triggered=d,e.isPropagationStopped()&&f.addEventListener(d,Nt),n[d](),e.isPropagationStopped()&&f.removeEventListener(d,Nt),ce.event.triggered=void 0,a&&(n[u]=a)),e.result}},simulate:function(e,t,n){var r=ce.extend(new ce.Event,n,{type:e,isSimulated:!0});ce.event.trigger(r,null,t)}}),ce.fn.extend({trigger:function(e,t){return this.each(function(){ce.event.trigger(e,t,this)})},triggerHandler:function(e,t){var n=this[0];if(n)return ce.event.trigger(e,t,n,!0)}});var qt=/\[\]$/,Lt=/\r?\n/g,Ht=/^(?:submit|button|image|reset|file)$/i,Ot=/^(?:input|select|textarea|keygen)/i;function Pt(n,e,r,i){var t;if(Array.isArray(e))ce.each(e,function(e,t){r||qt.test(n)?i(n,t):Pt(n+"["+("object"==typeof t&&null!=t?e:"")+"]",t,r,i)});else if(r||"object"!==x(e))i(n,e);else for(t in e)Pt(n+"["+t+"]",e[t],r,i)}ce.param=function(e,t){var n,r=[],i=function(e,t){var n=v(t)?t():t;r[r.length]=encodeURIComponent(e)+"="+encodeURIComponent(null==n?"":n)};if(null==e)return"";if(Array.isArray(e)||e.jquery&&!ce.isPlainObject(e))ce.each(e,function(){i(this.name,this.value)});else for(n in e)Pt(n,e[n],t,i);return r.join("&")},ce.fn.extend({serialize:function(){return ce.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=ce.prop(this,"elements");return e?ce.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!ce(this).is(":disabled")&&Ot.test(this.nodeName)&&!Ht.test(e)&&(this.checked||!we.test(e))}).map(function(e,t){var n=ce(this).val();return null==n?null:Array.isArray(n)?ce.map(n,function(e){return{name:t.name,value:e.replace(Lt,"\r\n")}}):{name:t.name,value:n.replace(Lt,"\r\n")}}).get()}});var Mt=/%20/g,Rt=/#.*$/,It=/([?&])_=[^&]*/,Wt=/^(.*?):[ \t]*([^\r\n]*)$/gm,Ft=/^(?:GET|HEAD)$/,$t=/^\/\//,Bt={},_t={},zt="*/".concat("*"),Xt=C.createElement("a");function Ut(o){return function(e,t){"string"!=typeof e&&(t=e,e="*");var n,r=0,i=e.toLowerCase().match(D)||[];if(v(t))while(n=i[r++])"+"===n[0]?(n=n.slice(1)||"*",(o[n]=o[n]||[]).unshift(t)):(o[n]=o[n]||[]).push(t)}}function Vt(t,i,o,a){var s={},u=t===_t;function l(e){var r;return s[e]=!0,ce.each(t[e]||[],function(e,t){var n=t(i,o,a);return"string"!=typeof n||u||s[n]?u?!(r=n):void 0:(i.dataTypes.unshift(n),l(n),!1)}),r}return l(i.dataTypes[0])||!s["*"]&&l("*")}function Gt(e,t){var n,r,i=ce.ajaxSettings.flatOptions||{};for(n in t)void 0!==t[n]&&((i[n]?e:r||(r={}))[n]=t[n]);return r&&ce.extend(!0,e,r),e}Xt.href=Et.href,ce.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Et.href,type:"GET",isLocal:/^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(Et.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":zt,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":JSON.parse,"text xml":ce.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?Gt(Gt(e,ce.ajaxSettings),t):Gt(ce.ajaxSettings,e)},ajaxPrefilter:Ut(Bt),ajaxTransport:Ut(_t),ajax:function(e,t){"object"==typeof e&&(t=e,e=void 0),t=t||{};var c,f,p,n,d,r,h,g,i,o,v=ce.ajaxSetup({},t),y=v.context||v,m=v.context&&(y.nodeType||y.jquery)?ce(y):ce.event,x=ce.Deferred(),b=ce.Callbacks("once memory"),w=v.statusCode||{},a={},s={},u="canceled",T={readyState:0,getResponseHeader:function(e){var t;if(h){if(!n){n={};while(t=Wt.exec(p))n[t[1].toLowerCase()+" "]=(n[t[1].toLowerCase()+" "]||[]).concat(t[2])}t=n[e.toLowerCase()+" "]}return null==t?null:t.join(", ")},getAllResponseHeaders:function(){return h?p:null},setRequestHeader:function(e,t){return null==h&&(e=s[e.toLowerCase()]=s[e.toLowerCase()]||e,a[e]=t),this},overrideMimeType:function(e){return null==h&&(v.mimeType=e),this},statusCode:function(e){var t;if(e)if(h)T.always(e[T.status]);else for(t in e)w[t]=[w[t],e[t]];return this},abort:function(e){var t=e||u;return c&&c.abort(t),l(0,t),this}};if(x.promise(T),v.url=((e||v.url||Et.href)+"").replace($t,Et.protocol+"//"),v.type=t.method||t.type||v.method||v.type,v.dataTypes=(v.dataType||"*").toLowerCase().match(D)||[""],null==v.crossDomain){r=C.createElement("a");try{r.href=v.url,r.href=r.href,v.crossDomain=Xt.protocol+"//"+Xt.host!=r.protocol+"//"+r.host}catch(e){v.crossDomain=!0}}if(v.data&&v.processData&&"string"!=typeof v.data&&(v.data=ce.param(v.data,v.traditional)),Vt(Bt,v,t,T),h)return T;for(i in(g=ce.event&&v.global)&&0==ce.active++&&ce.event.trigger("ajaxStart"),v.type=v.type.toUpperCase(),v.hasContent=!Ft.test(v.type),f=v.url.replace(Rt,""),v.hasContent?v.data&&v.processData&&0===(v.contentType||"").indexOf("application/x-www-form-urlencoded")&&(v.data=v.data.replace(Mt,"+")):(o=v.url.slice(f.length),v.data&&(v.processData||"string"==typeof v.data)&&(f+=(At.test(f)?"&":"?")+v.data,delete v.data),!1===v.cache&&(f=f.replace(It,"$1"),o=(At.test(f)?"&":"?")+"_="+jt.guid+++o),v.url=f+o),v.ifModified&&(ce.lastModified[f]&&T.setRequestHeader("If-Modified-Since",ce.lastModified[f]),ce.etag[f]&&T.setRequestHeader("If-None-Match",ce.etag[f])),(v.data&&v.hasContent&&!1!==v.contentType||t.contentType)&&T.setRequestHeader("Content-Type",v.contentType),T.setRequestHeader("Accept",v.dataTypes[0]&&v.accepts[v.dataTypes[0]]?v.accepts[v.dataTypes[0]]+("*"!==v.dataTypes[0]?", "+zt+"; q=0.01":""):v.accepts["*"]),v.headers)T.setRequestHeader(i,v.headers[i]);if(v.beforeSend&&(!1===v.beforeSend.call(y,T,v)||h))return T.abort();if(u="abort",b.add(v.complete),T.done(v.success),T.fail(v.error),c=Vt(_t,v,t,T)){if(T.readyState=1,g&&m.trigger("ajaxSend",[T,v]),h)return T;v.async&&0<v.timeout&&(d=ie.setTimeout(function(){T.abort("timeout")},v.timeout));try{h=!1,c.send(a,l)}catch(e){if(h)throw e;l(-1,e)}}else l(-1,"No Transport");function l(e,t,n,r){var i,o,a,s,u,l=t;h||(h=!0,d&&ie.clearTimeout(d),c=void 0,p=r||"",T.readyState=0<e?4:0,i=200<=e&&e<300||304===e,n&&(s=function(e,t,n){var r,i,o,a,s=e.contents,u=e.dataTypes;while("*"===u[0])u.shift(),void 0===r&&(r=e.mimeType||t.getResponseHeader("Content-Type"));if(r)for(i in s)if(s[i]&&s[i].test(r)){u.unshift(i);break}if(u[0]in n)o=u[0];else{for(i in n){if(!u[0]||e.converters[i+" "+u[0]]){o=i;break}a||(a=i)}o=o||a}if(o)return o!==u[0]&&u.unshift(o),n[o]}(v,T,n)),!i&&-1<ce.inArray("script",v.dataTypes)&&ce.inArray("json",v.dataTypes)<0&&(v.converters["text script"]=function(){}),s=function(e,t,n,r){var i,o,a,s,u,l={},c=e.dataTypes.slice();if(c[1])for(a in e.converters)l[a.toLowerCase()]=e.converters[a];o=c.shift();while(o)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!u&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u=o,o=c.shift())if("*"===o)o=u;else if("*"!==u&&u!==o){if(!(a=l[u+" "+o]||l["* "+o]))for(i in l)if((s=i.split(" "))[1]===o&&(a=l[u+" "+s[0]]||l["* "+s[0]])){!0===a?a=l[i]:!0!==l[i]&&(o=s[0],c.unshift(s[1]));break}if(!0!==a)if(a&&e["throws"])t=a(t);else try{t=a(t)}catch(e){return{state:"parsererror",error:a?e:"No conversion from "+u+" to "+o}}}return{state:"success",data:t}}(v,s,T,i),i?(v.ifModified&&((u=T.getResponseHeader("Last-Modified"))&&(ce.lastModified[f]=u),(u=T.getResponseHeader("etag"))&&(ce.etag[f]=u)),204===e||"HEAD"===v.type?l="nocontent":304===e?l="notmodified":(l=s.state,o=s.data,i=!(a=s.error))):(a=l,!e&&l||(l="error",e<0&&(e=0))),T.status=e,T.statusText=(t||l)+"",i?x.resolveWith(y,[o,l,T]):x.rejectWith(y,[T,l,a]),T.statusCode(w),w=void 0,g&&m.trigger(i?"ajaxSuccess":"ajaxError",[T,v,i?o:a]),b.fireWith(y,[T,l]),g&&(m.trigger("ajaxComplete",[T,v]),--ce.active||ce.event.trigger("ajaxStop")))}return T},getJSON:function(e,t,n){return ce.get(e,t,n,"json")},getScript:function(e,t){return ce.get(e,void 0,t,"script")}}),ce.each(["get","post"],function(e,i){ce[i]=function(e,t,n,r){return v(t)&&(r=r||n,n=t,t=void 0),ce.ajax(ce.extend({url:e,type:i,dataType:r,data:t,success:n},ce.isPlainObject(e)&&e))}}),ce.ajaxPrefilter(function(e){var t;for(t in e.headers)"content-type"===t.toLowerCase()&&(e.contentType=e.headers[t]||"")}),ce._evalUrl=function(e,t,n){return ce.ajax({url:e,type:"GET",dataType:"script",cache:!0,async:!1,global:!1,converters:{"text script":function(){}},dataFilter:function(e){ce.globalEval(e,t,n)}})},ce.fn.extend({wrapAll:function(e){var t;return this[0]&&(v(e)&&(e=e.call(this[0])),t=ce(e,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstElementChild)e=e.firstElementChild;return e}).append(this)),this},wrapInner:function(n){return v(n)?this.each(function(e){ce(this).wrapInner(n.call(this,e))}):this.each(function(){var e=ce(this),t=e.contents();t.length?t.wrapAll(n):e.append(n)})},wrap:function(t){var n=v(t);return this.each(function(e){ce(this).wrapAll(n?t.call(this,e):t)})},unwrap:function(e){return this.parent(e).not("body").each(function(){ce(this).replaceWith(this.childNodes)}),this}}),ce.expr.pseudos.hidden=function(e){return!ce.expr.pseudos.visible(e)},ce.expr.pseudos.visible=function(e){return!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)},ce.ajaxSettings.xhr=function(){try{return new ie.XMLHttpRequest}catch(e){}};var Yt={0:200,1223:204},Qt=ce.ajaxSettings.xhr();le.cors=!!Qt&&"withCredentials"in Qt,le.ajax=Qt=!!Qt,ce.ajaxTransport(function(i){var o,a;if(le.cors||Qt&&!i.crossDomain)return{send:function(e,t){var n,r=i.xhr();if(r.open(i.type,i.url,i.async,i.username,i.password),i.xhrFields)for(n in i.xhrFields)r[n]=i.xhrFields[n];for(n in i.mimeType&&r.overrideMimeType&&r.overrideMimeType(i.mimeType),i.crossDomain||e["X-Requested-With"]||(e["X-Requested-With"]="XMLHttpRequest"),e)r.setRequestHeader(n,e[n]);o=function(e){return function(){o&&(o=a=r.onload=r.onerror=r.onabort=r.ontimeout=r.onreadystatechange=null,"abort"===e?r.abort():"error"===e?"number"!=typeof r.status?t(0,"error"):t(r.status,r.statusText):t(Yt[r.status]||r.status,r.statusText,"text"!==(r.responseType||"text")||"string"!=typeof r.responseText?{binary:r.response}:{text:r.responseText},r.getAllResponseHeaders()))}},r.onload=o(),a=r.onerror=r.ontimeout=o("error"),void 0!==r.onabort?r.onabort=a:r.onreadystatechange=function(){4===r.readyState&&ie.setTimeout(function(){o&&a()})},o=o("abort");try{r.send(i.hasContent&&i.data||null)}catch(e){if(o)throw e}},abort:function(){o&&o()}}}),ce.ajaxPrefilter(function(e){e.crossDomain&&(e.contents.script=!1)}),ce.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(e){return ce.globalEval(e),e}}}),ce.ajaxPrefilter("script",function(e){void 0===e.cache&&(e.cache=!1),e.crossDomain&&(e.type="GET")}),ce.ajaxTransport("script",function(n){var r,i;if(n.crossDomain||n.scriptAttrs)return{send:function(e,t){r=ce("<script>").attr(n.scriptAttrs||{}).prop({charset:n.scriptCharset,src:n.url}).on("load error",i=function(e){r.remove(),i=null,e&&t("error"===e.type?404:200,e.type)}),C.head.appendChild(r[0])},abort:function(){i&&i()}}});var Jt,Kt=[],Zt=/(=)\?(?=&|$)|\?\?/;ce.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=Kt.pop()||ce.expando+"_"+jt.guid++;return this[e]=!0,e}}),ce.ajaxPrefilter("json jsonp",function(e,t,n){var r,i,o,a=!1!==e.jsonp&&(Zt.test(e.url)?"url":"string"==typeof e.data&&0===(e.contentType||"").indexOf("application/x-www-form-urlencoded")&&Zt.test(e.data)&&"data");if(a||"jsonp"===e.dataTypes[0])return r=e.jsonpCallback=v(e.jsonpCallback)?e.jsonpCallback():e.jsonpCallback,a?e[a]=e[a].replace(Zt,"$1"+r):!1!==e.jsonp&&(e.url+=(At.test(e.url)?"&":"?")+e.jsonp+"="+r),e.converters["script json"]=function(){return o||ce.error(r+" was not called"),o[0]},e.dataTypes[0]="json",i=ie[r],ie[r]=function(){o=arguments},n.always(function(){void 0===i?ce(ie).removeProp(r):ie[r]=i,e[r]&&(e.jsonpCallback=t.jsonpCallback,Kt.push(r)),o&&v(i)&&i(o[0]),o=i=void 0}),"script"}),le.createHTMLDocument=((Jt=C.implementation.createHTMLDocument("").body).innerHTML="<form></form><form></form>",2===Jt.childNodes.length),ce.parseHTML=function(e,t,n){return"string"!=typeof e?[]:("boolean"==typeof t&&(n=t,t=!1),t||(le.createHTMLDocument?((r=(t=C.implementation.createHTMLDocument("")).createElement("base")).href=C.location.href,t.head.appendChild(r)):t=C),o=!n&&[],(i=w.exec(e))?[t.createElement(i[1])]:(i=Ae([e],t,o),o&&o.length&&ce(o).remove(),ce.merge([],i.childNodes)));var r,i,o},ce.fn.load=function(e,t,n){var r,i,o,a=this,s=e.indexOf(" ");return-1<s&&(r=Tt(e.slice(s)),e=e.slice(0,s)),v(t)?(n=t,t=void 0):t&&"object"==typeof t&&(i="POST"),0<a.length&&ce.ajax({url:e,type:i||"GET",dataType:"html",data:t}).done(function(e){o=arguments,a.html(r?ce("<div>").append(ce.parseHTML(e)).find(r):e)}).always(n&&function(e,t){a.each(function(){n.apply(this,o||[e.responseText,t,e])})}),this},ce.expr.pseudos.animated=function(t){return ce.grep(ce.timers,function(e){return t===e.elem}).length},ce.offset={setOffset:function(e,t,n){var r,i,o,a,s,u,l=ce.css(e,"position"),c=ce(e),f={};"static"===l&&(e.style.position="relative"),s=c.offset(),o=ce.css(e,"top"),u=ce.css(e,"left"),("absolute"===l||"fixed"===l)&&-1<(o+u).indexOf("auto")?(a=(r=c.position()).top,i=r.left):(a=parseFloat(o)||0,i=parseFloat(u)||0),v(t)&&(t=t.call(e,n,ce.extend({},s))),null!=t.top&&(f.top=t.top-s.top+a),null!=t.left&&(f.left=t.left-s.left+i),"using"in t?t.using.call(e,f):c.css(f)}},ce.fn.extend({offset:function(t){if(arguments.length)return void 0===t?this:this.each(function(e){ce.offset.setOffset(this,t,e)});var e,n,r=this[0];return r?r.getClientRects().length?(e=r.getBoundingClientRect(),n=r.ownerDocument.defaultView,{top:e.top+n.pageYOffset,left:e.left+n.pageXOffset}):{top:0,left:0}:void 0},position:function(){if(this[0]){var e,t,n,r=this[0],i={top:0,left:0};if("fixed"===ce.css(r,"position"))t=r.getBoundingClientRect();else{t=this.offset(),n=r.ownerDocument,e=r.offsetParent||n.documentElement;while(e&&(e===n.body||e===n.documentElement)&&"static"===ce.css(e,"position"))e=e.parentNode;e&&e!==r&&1===e.nodeType&&((i=ce(e).offset()).top+=ce.css(e,"borderTopWidth",!0),i.left+=ce.css(e,"borderLeftWidth",!0))}return{top:t.top-i.top-ce.css(r,"marginTop",!0),left:t.left-i.left-ce.css(r,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var e=this.offsetParent;while(e&&"static"===ce.css(e,"position"))e=e.offsetParent;return e||J})}}),ce.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(t,i){var o="pageYOffset"===i;ce.fn[t]=function(e){return M(this,function(e,t,n){var r;if(y(e)?r=e:9===e.nodeType&&(r=e.defaultView),void 0===n)return r?r[i]:e[t];r?r.scrollTo(o?r.pageXOffset:n,o?n:r.pageYOffset):e[t]=n},t,e,arguments.length)}}),ce.each(["top","left"],function(e,n){ce.cssHooks[n]=Ye(le.pixelPosition,function(e,t){if(t)return t=Ge(e,n),_e.test(t)?ce(e).position()[n]+"px":t})}),ce.each({Height:"height",Width:"width"},function(a,s){ce.each({padding:"inner"+a,content:s,"":"outer"+a},function(r,o){ce.fn[o]=function(e,t){var n=arguments.length&&(r||"boolean"!=typeof e),i=r||(!0===e||!0===t?"margin":"border");return M(this,function(e,t,n){var r;return y(e)?0===o.indexOf("outer")?e["inner"+a]:e.document.documentElement["client"+a]:9===e.nodeType?(r=e.documentElement,Math.max(e.body["scroll"+a],r["scroll"+a],e.body["offset"+a],r["offset"+a],r["client"+a])):void 0===n?ce.css(e,t,i):ce.style(e,t,n,i)},s,n?e:void 0,n)}})}),ce.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){ce.fn[t]=function(e){return this.on(t,e)}}),ce.fn.extend({bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)},hover:function(e,t){return this.on("mouseenter",e).on("mouseleave",t||e)}}),ce.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),function(e,n){ce.fn[n]=function(e,t){return 0<arguments.length?this.on(n,null,e,t):this.trigger(n)}});var en=/^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;ce.proxy=function(e,t){var n,r,i;if("string"==typeof t&&(n=e[t],t=e,e=n),v(e))return r=ae.call(arguments,2),(i=function(){return e.apply(t||this,r.concat(ae.call(arguments)))}).guid=e.guid=e.guid||ce.guid++,i},ce.holdReady=function(e){e?ce.readyWait++:ce.ready(!0)},ce.isArray=Array.isArray,ce.parseJSON=JSON.parse,ce.nodeName=fe,ce.isFunction=v,ce.isWindow=y,ce.camelCase=F,ce.type=x,ce.now=Date.now,ce.isNumeric=function(e){var t=ce.type(e);return("number"===t||"string"===t)&&!isNaN(e-parseFloat(e))},ce.trim=function(e){return null==e?"":(e+"").replace(en,"$1")},"function"==typeof define&&define.amd&&define("jquery",[],function(){return ce});var tn=ie.jQuery,nn=ie.$;return ce.noConflict=function(e){return ie.$===ce&&(ie.$=nn),e&&ie.jQuery===ce&&(ie.jQuery=tn),ce},"undefined"==typeof e&&(ie.jQuery=ie.$=ce),ce});
/*!
* country-region-selector
* ------------------------
* 1.0.0
* @author Ben Keen
* @repo https://github.com/benkeen/country-region-selector
* @licence MIT
*/

!function (a, n) { if ("function" == typeof define && define.amd) define([], n); else if ("object" == typeof exports) try { module.exports = n(require()) } catch (a) { module.exports = n() } else a.crs = n() }(this, function () { "use strict"; var m = !0, h = !0, M = [], l = [["Afghanistan", "AF", "Badakhshan~BDS|Badghis~BDG|Baghlan~BGL|Balkh~BAL|Bamyan~BAM|Daykundi~DAY|Farah~FRA|Faryab~FYB|Ghazni~GHA|Ghor~GHO|Helmand~HEL|Herat~HER|Jowzjan~JOW|Kabul~KAB|Kandahar~KAN|Kapisa~KAP|Khost~KHO|Kunar~KNR|Kunduz~KDZ|Laghman~LAG|Logar~LOW|Maidan Wardak~WAR|Nangarhar~NAN|Nimruz~NIM|Nuristan~NUR|Paktia~PIA|Paktika~PKA|Panjshir~PAN|Parwan~PAR|Samangan~SAM|Sar-e Pol~SAR|Takhar~TAK|Urozgan~ORU|Zabul~ZAB"], ["Åland Islands", "AX", "Brändö~BR|Eckerö~EC|Finström~FN|Föglö~FG|Geta~GT|Hammarland~HM|Jomala~JM|Kumlinge~KM|Kökar~KK|Lemland~LE|Lumparland~LU|Mariehamn~MH|Saltvik~SV|Sottunga~ST|Sund~SD|Vårdö~VR"], ["Albania", "AL", "Berat~01|Dibër~09|Durrës~02|Elbasan~03|Fier~04|Gjirokastër~05|Korçë~06|Kukës~07|Lezhë~08|Shkodër~10|Tirana~11|Vlorë~12"], ["Algeria", "DZ", "Adrar~01|Aïn Defla~44|Aïn Témouchent~46|Algiers~16|Annaba~23|Batna~05|Béchar~08|Béjaïa~06|Biskra~07|Blida~09|Bordj Bou Arréridj~34|Bouïra~10|Boumerdès~35|Chlef~02|Constantine~25|Djelfa~17|El Bayadh~32|El Oued~39|El Tarf~36|Ghardaïa~47|Guelma~24|Illizi~33|Jijel~18|Khenchela~40|Laghouat~03|Mascara~29|Médéa~26|Mila~43|Mostaganem~27|Msila~28|Naâma~45|Oran~31|Ouargla~30|Oum el Bouaghi~04|Relizane~48|Saïda~20|Sétif~19|Sidi Bel Abbès~22|Skikda~21|Souk Ahras~41|Tamanghasset~11|Tébessa~12|Tiaret~14|Tindouf~37|Tipaza~42|Tissemsilt~38|Tizi Ouzou~15|Tlemcen~13"], ["American Samoa", "AS", "Tutuila~01|Aunu'u~02|Ta'ū~03|Ofu‑Olosega~04|Rose Atoll~21|Swains Island~22"], ["Andorra", "AD", "Andorra la Vella~07|Canillo~02|Encamp~03|Escaldes-Engordany~08|La Massana~04|Ordino~05|Sant Julià de Lòria~06"], ["Angola", "AO", "Bengo~BGO|Benguela~BGU|Bié~BIE|Cabinda~CAB|Cuando Cubango~CCU|Cuanza Norte~CNO|Cuanza Sul~CUS|Cunene~CNN|Huambo~HUA|Huíla~HUI|Luanda~LUA|Lunda Norte~LNO|Lunda Sul~LSU|Malanje~MAL|Moxico~MOX|Namibe~NAM|Uíge~UIG|Zaire~ZAI"], ["Anguilla", "AI", "Anguilla~01|Anguillita Island~02|Blowing Rock~03|Cove Cay~04|Crocus Cay~05|Deadman's Cay~06|Dog Island~07|East Cay~08|Little Island~09|Little Scrub Island~10|Mid Cay~11|North Cay~12|Prickly Pear Cays~13|Rabbit Island~14|Sandy Island/Sand Island~15|Scilly Cay~16|Scrub Island~17|Seal Island~18|Sombrero/Hat Island~19|South Cay~20|South Wager Island~21|West Cay~22"], ["Antarctica", "AQ", "Antarctica~AQ"], ["Antigua and Barbuda", "AG", "Antigua Island~01|Barbuda Island~02|Bird Island~04|Bishop Island~05|Blake Island~06|Crump Island~09|Dulcina Island~10|Exchange Island~11|Five Islands~12|Great Bird Island~13|Green Island~14|Guiana Island~15|Hawes Island~17|Hells Gate Island~16|Henry Island~18|Johnson Island~19|Kid Island~20|Lobster Island~22|Maiden Island~24|Moor Island~25|Nanny Island~26|Pelican Island~27|Prickly Pear Island~28|Rabbit Island~29|Red Head Island~31|Redonda Island~03|Sandy Island~32|Smith Island~33|The Sisters~34|Vernon Island~35|Wicked Will Island~36|York Island~37"], ["Argentina", "AR", "Buenos Aires~B|Capital Federal~C|Catamarca~K|Chaco~H|Chubut~U|Córdoba~X|Corrientes~W|Entre Ríos~E|Formosa~P|Jujuy~Y|La Pampa~L|La Rioja~F|Mendoza~M|Misiones~N|Neuquén~Q|Río Negro~R|Salta~A|San Juan~J|San Luis~D|Santa Cruz~Z|Santa Fe~S|Santiago del Estero~G|Tierra del Fuego~V|Tucumán~T"], ["Armenia", "AM", "Aragatsotn~AG|Ararat~AR|Armavir~AV|Gegharkunik~GR|Kotayk~KT|Lori~LO|Shirak~SH|Syunik~SU|Tavush~TV|Vayots Dzor~VD|Yerevan~ER"], ["Aruba", "AW", "Aruba~AW"], ["Australia", "AU", "Australian Capital Territory~ACT|New South Wales~NSW|Northern Territory~NT|Queensland~QLD|South Australia~SA|Tasmania~TAS|Victoria~VIC|Western Australia~WA"], ["Austria", "AT", "Burgenland~1|Kärnten~2|Niederösterreich~3|Oberösterreich~4|Salzburg~5|Steiermark~6|Tirol~7|Vorarlberg~8|Wien~9"], ["Azerbaijan", "AZ", "Abşeron~ABS|Ağcabədi~AGC|Ağdam~AGM|Ağdaş~AGS|Ağstafa~AGA|Ağsu~AGU|Astara~AST|Babək~BAB|Balakən~BAL|Bərdə~BAR|Beyləqan~BEY|Biləsuvar~BIL|Cəbrayıl~CAB|Cəlilabad~CAL|Culfa~CUL|Daşkəsən~DAS|Füzuli~FUZ|Gədəbəy~GAD|Goranboy~GOR|Göyçay~GOY|Göygöl~GYG|Hacıqabul~HAC|İmişli~IMI|İsmayıllı~ISM|Kəlbəcər~KAL|Kǝngǝrli~KAN|Kürdəmir~KUR|Laçın~LAC|Lənkəran~LAN|Lerik~LER|Masallı~MAS|Neftçala~NEF|Oğuz~OGU|Ordubad~ORD|Qəbələ~QAB|Qax~QAX|Qazax~QAZ|Qobustan~QOB|Quba~QBA|Qubadli~QBI|Qusar~QUS|Saatlı~SAT|Sabirabad~SAB|Şabran~SBN|Sədərək~SAD|Şahbuz~SAH|Şəki~SAK|Salyan~SAL|Şamaxı~SMI|Şəmkir~SKR|Samux~SMX|Şərur~SAR|Siyəzən~SIY|Şuşa~SUS|Tərtər~TAR|Tovuz~TOV|Ucar~UCA|Xaçmaz~XAC|Xızı~XIZ|Xocalı~XCI|Xocavənd~XVD|Yardımlı~YAR|Yevlax~YEV|Zəngilan~ZAN|Zaqatala~ZAQ|Zərdab~ZAR"], ["Bahamas", "BS", "Acklins Island~01|Berry Islands~22|Bimini~02|Black Point~23|Cat Island~03|Central Abaco~24|Crooked Island and Long Cay~28|East Grand Bahama~29|Exuma~04|Freeport~05|Fresh Creek~06|Governor's Harbour~07|Green Turtle Cay~08|Harbour Island~09|High Rock~10|Inagua~11|Kemps Bay~12|Long Island~13|Marsh Harbour~14|Mayaguana~15|Moore’s Island~40|New Providence~16|Nichollstown and Berry Islands~17|North Abaco~42|North Andros~41|North Eleuthera~33|Ragged Island~18|Rock Sound~19|San Salvador and Rum Cay~20|Sandy Point~21|South Abaco~35|South Andros~36|South Eleuthera~37|West Grand Bahama~39"], ["Bahrain", "BH", "Al Janūbīyah~14|Al Manāmah~13|Al Muḩarraq~15|Al Wusţá~16|Ash Shamālīyah~17"], ["Bangladesh", "BD", "Barisal~A|Chittagong~B|Dhaka~C|Khulna~D|Mymensingh~M|Rajshahi~E|Rangpur~F|Sylhet~G"], ["Barbados", "BB", "Christ Church~01|Saint Andrew~02|Saint George~03|Saint James~04|Saint John~05|Saint Joseph~06|Saint Lucy~07|Saint Michael~08|Saint Peter~09|Saint Philip~10|Saint Thomas~11"], ["Belarus", "BY", "Brest voblast~BR|Gorod Minsk~HO|Homiel voblast~HO|Hrodna voblast~HR|Mahilyow voblast~MA|Minsk voblast~MI|Vitsebsk voblast~VI"], ["Belgium", "BE", "Bruxelles-Capitale~BRU|Région Flamande~VLG|Région Wallonië~WAL"], ["Belize", "BZ", "Belize District~BZ|Cayo District~CY|Corozal District~CZL|Orange Walk District~OW|Stann Creek District~SC|Toledo District~TOL"], ["Benin", "BJ", "Alibori~AL|Atakora~AK|Atlantique~AQ|Borgou~BO|Collines Department~CO|Donga~DO|Kouffo~KO|Littoral Department~LI|Mono Department~MO|Ouémé~OU|Plateau~PL|Zou~ZO"], ["Bermuda", "BM", "City of Hamilton~03|Devonshire Parish~01|Hamilton Parish~02|Paget Parish~04|Pembroke Parish~05|Sandys Parish~08|Smith's Parish~09|Southampton Parish~10|St. George's Parish~07|Town of St. George~06|Warwick Parish~11"], ["Bhutan", "BT", "Bumthang~33|Chhukha~12|Dagana~22|Gasa~GA|Haa~13|Lhuntse~44|Mongar~42|Paro~11|Pemagatshel~43|Punakha~23|Samdrup Jongkhar~45|Samtse~14|Sarpang~31|Thimphu~15|Trashigang~41|Trashiyangtse~TY|Trongsa~32|Tsirang~21|Wangdue Phodrang~24|Zhemgang~34"], ["Bolivia", "BO", "Beni~B|Chuquisaca~H|Cochabamba~C|La Paz~L|Oruro~O|Pando~N|Potosí~P|Santa Cruz~S|Tarija~T"], ["Bonaire, Sint Eustatius and Saba", "BQ", "Bonaire~BO|Saba Isand~SA|Sint Eustatius~SE"], ["Bosnia and Herzegovina", "BA", "Brčko Distrikt~BRC|Federacija Bosne i Hercegovine~BIH|Republika Srpska~SRP"], ["Botswana", "BW", "Central~CE|Ghanzi~GH|Kgalagadi~KG|Kgatleng~KL|Kweneng~KW|North West~NW|North-East~NE|South East~SE|Southern~SO"], ["Bouvet Island", "BV", "Bouvet Island~BV"], ["Brazil", "BR", "Acre~AC|Alagoas~AL|Amapá~AP|Amazonas~AM|Bahia~BA|Ceará~CE|Distrito Federal~DF|Espírito Santo~ES|Goiás~GO|Maranhão~MA|Mato Grosso~MT|Mato Grosso do Sul~MS|Minas Gerais~MG|Pará~PA|Paraíba~PB|Paraná~PR|Pernambuco~PE|Piauí~PI|Rio de Janeiro~RJ|Rio Grande do Norte~RN|Rio Grande do Sul~RS|Rondônia~RO|Roraima~RR|Santa Catarina~SC|São Paulo~SP|Sergipe~SE|Tocantins~TO"], ["British Indian Ocean Territory", "IO", "British Indian Ocean Territory~IO"], ["Brunei Darussalam", "BN", "Belait~BE|Brunei Muara~BM|Temburong~TE|Tutong~TU"], ["Bulgaria", "BG", "Blagoevgrad~01|Burgas~02|Dobrich~08|Gabrovo~07|Jambol~28|Khaskovo~26|Kjustendil~10|Kurdzhali~09|Lovech~11|Montana~12|Pazardzhik~13|Pernik~14|Pleven~15|Plovdiv~16|Razgrad~17|Ruse~18|Shumen~27|Silistra~19|Sliven~20|Smoljan~21|Sofija~23|Sofija-Grad~22|Stara Zagora~24|Turgovishhe~25|Varna~03|Veliko Turnovo~04|Vidin~05|Vraca~06"], ["Burkina Faso", "BF", "Balé~BAL|Bam/Lake Bam~BAM|Banwa Province~BAN|Bazèga~BAZ|Bougouriba~BGR|Boulgou Province~BLG|Boulkiemdé~BLK|Comoé/Komoe~COM|Ganzourgou Province~GAN|Gnagna~GNA|Gourma Province~GOU|Houet~HOU|Ioba~IOB|Kadiogo~KAD|Kénédougou~KEN|Komondjari~KMD|Kompienga~KMP|Kossi Province~KOS|Koulpélogo~KOP|Kouritenga~KOT|Kourwéogo~KOW|Léraba~LER|Loroum~LOR|Mouhoun~MOU|Namentenga~NAM|Naouri/Nahouri~NAO|Nayala~NAY|Noumbiel~NOU|Oubritenga~OUB|Oudalan~OUD|Passoré~PAS|Poni~PON|Sanguié~SNG|Sanmatenga~SMT|Séno~SEN|Sissili~SIS|Soum~SOM|Sourou~SOR|Tapoa~TAP|Tui/Tuy~TUI|Yagha~YAG|Yatenga~YAT|Ziro~ZIR|Zondoma~ZON|Zoundwéogo~ZOU"], ["Burundi", "BI", "Bubanza~BB|Bujumbura Mairie~BM|Bujumbura Rural~BL|Bururi~BR|Cankuzo~CA|Cibitoke~CI|Gitega~GI|Karuzi~KR|Kayanza~KY|Kirundo~KI|Makamba~MA|Muramvya~MU|Muyinga~MY|Mwaro~MW|Ngozi~NG|Rutana~RT|Ruyigi~RY"], ["Cambodia", "KH", "Baat Dambang~2|Banteay Mean Chey~1|Kampong Chaam~3|Kampong Chhnang~4|Kampong Spueu~5|Kampong Thum~6|Kampot~7|Kandaal~8|Kaoh Kong~9|Kracheh~10|Krong Kaeb~23|Krong Pailin~24|Krong Preah Sihanouk~18|Mondol Kiri~11|Otdar Mean Chey~22|Phnom Penh~12|Pousaat~15|Preah Vihear~13|Prey Veaeng~14|Rotanah Kiri~16|Siem Reab~17|Stueng Treng~19|Svaay Rieng~20|Taakaev~21|Tbong Khmum~25"], ["Cameroon", "CM", "Adamaoua~AD|Centre~CE|Est~ES|Extrême-Nord~EN|Littoral~LT|Nord~NO|Nord-Ouest~NW|Ouest~OU|Sud~SU|Sud-Ouest~SW"], ["Canada", "CA", "Alberta~AB|British Columbia~BC|Manitoba~MB|New Brunswick~NB|Newfoundland and Labrador~NL|Northwest Territories~NT|Nova Scotia~NS|Nunavut~NU|Ontario~ON|Prince Edward Island~PE|Quebec~QC|Saskatchewan~SK|Yukon~YT"], ["Cape Verde", "CV", "Boa Vista~BV|Brava~BR|Calheta de São Miguel~CS|Maio~MA|Mosteiros~MO|Paúl~PA|Porto Novo~PN|Praia~PR|Ribeira Brava~RB|Ribeira Grande~RG|Sal~SL|Santa Catarina~CA|Santa Cruz~CR|São Domingos~SD|São Filipe~SF|São Nicolau~SN|São Vicente~SV|Tarrafal~TA|Tarrafal de São Nicolau~TS"], ["Cayman Islands", "KY", "Creek|Eastern|Midland|South Town|Spot Bay|Stake Bay|West End|Western"], ["Central African Republic", "CF", "Bamingui-Bangoran~BB|Bangui~BGF|Basse-Kotto~BK|Haute-Kotto~HK|Haut-Mbomou~HM|Kémo~KG|Lobaye~LB|Mambéré-Kadéï~HS|Mbomou~MB|Nana-Grebizi~10|Nana-Mambéré~NM|Ombella-M'Poko~MP|Ouaka~UK|Ouham~AC|Ouham Péndé~OP|Sangha-Mbaéré~SE|Vakaga~VK"], ["Chad", "TD", "Bahr el Ghazal~BG|Batha~BA|Borkou~BO|Chari-Baguirmi~CB|Ennedi-Est~EE|Ennedi-Ouest~EO|Guéra~GR|Hadjer Lamis~HL|Kanem~KA|Lac~LC|Logone Occidental~LO|Logone Oriental~LR|Mondoul~MA|Mayo-Kébbi-Est~ME|Moyen-Chari~MC|Ouaddai~OD|Salamat~SA|Sila~SI|Tandjilé~TA|Tibesti~TI|Ville de Ndjamena~ND|Wadi Fira~WF"], ["Chile", "CL", "Aisén del General Carlos Ibáñez del Campo~AI|Antofagasta~AN|Araucanía~AR|Arica y Parinacota~AP|Atacama~AT|Bío-Bío~BI|Coquimbo~CO|Libertador General Bernardo O'Higgins~LI|Los Lagos~LL|Los Ríos~LR|Magallanes y Antartica Chilena~MA|Marga-Marga~|Maule~ML|Región Metropolitana de Santiago~RM|Tarapacá~TA|Valparaíso~VS"], ["China", "CN", "Anhui~34|Beijing~11|Chongqing~50|Fujian~35|Gansu~62|Guangdong~44|Guangxi~45|Guizhou~52|Hainan~46|Hebei~13|Heilongjiang~23|Henan~41|Hong Kong~91|Hubei~42|Hunan~43|Inner Mongolia~15|Jiangsu~32|Jiangxi~36|Jilin~22|Liaoning~21|Macau~92|Ningxia~64|Qinghai~63|Shaanxi~61|Shandong~37|Shanghai~31|Shanxi~14|Sichuan~51|Tianjin~12|Tibet~54|Xinjiang~65|Yunnan~53|Zhejiang~33"], ["Christmas Island", "CX", "Christmas Island~CX"], ["Cocos (Keeling) Islands", "CC", "Direction Island~DI|Home Island~HM|Horsburgh Island~HR|North Keeling Island~NK|South Island~SI|West Island~WI"], ["Colombia", "CO", "Amazonas~AMA|Antioquia~ANT|Arauca~ARA|Archipiélago de San Andrés~SAP|Atlántico~ATL|Bogotá D.C.~DC|Bolívar~BOL|Boyacá~BOY|Caldas~CAL|Caquetá~CAQ|Casanare~CAS|Cauca~CAU|Cesar~CES|Chocó~CHO|Córdoba~COR|Cundinamarca~CUN|Guainía~GUA|Guaviare~GUV|Huila~HUI|La Guajira~LAG|Magdalena~MAG|Meta~MET|Nariño~NAR|Norte de Santander~NSA|Putumayo~PUT|Quindío~QUI|Risaralda~RIS|Santander~SAN|Sucre~SUC|Tolima~TOL|Valle del Cauca~VAC|Vaupés~VAU|Vichada~VID"], ["Comoros", "KM", "Andjazîdja~G|Andjouân~A|Moûhîlî~M"], ["Congo, Republic of the (Brazzaville)", "CG", "Bouenza~11|Brazzaville~BZV|Cuvette~8|Cuvette-Ouest~15|Kouilou~5|Lékoumou~2|Likouala~7|Niari~9|Plateaux~14|Pointe-Noire~16|Pool~12|Sangha~13"], ["Congo, the Democratic Republic of the (Kinshasa)", "CD", "Bandundu~BN|Bas-Congo~BC|Équateur~EQ|Kasaï-Occidental~KE|Kasaï-Oriental~KW|Katanga~KA|Kinshasa~KN|Maniema~MA|Nord-Kivu~NK|Orientale~OR|Sud-Kivu~SK"], ["Cook Islands", "CK", "Aitutaki|Atiu|Avarua|Mangaia|Manihiki|Ma'uke|Mitiaro|Nassau|Palmerston|Penrhyn|Pukapuka|Rakahanga"], ["Costa Rica", "CR", "Alajuela~2|Cartago~3|Guanacaste~5|Heredia~4|Limón~7|Puntarenas~6|San José~1"], ["Côte d'Ivoire, Republic of", "CI", "Agnéby~16|Bafing~17|Bas-Sassandra~09|Denguélé~10|Dix-Huit Montagnes~06|Fromager~18|Haut-Sassandra~02|Lacs~07|Lagunes~01|Marahoué~12|Moyen-Cavally~19|Moyen-Comoé~05|N'zi-Comoé~11|Savanes~03|Sud-Bandama~15|Sud-Comoé~13|Vallée du Bandama~04|Worodougou~14|Zanzan~08"], ["Croatia", "HR", "Bjelovarsko-Bilogorska Županija~07|Brodsko-Posavska Županija~12|Dubrovačko-Neretvanska Županija~19|Grad Zagreb~21|Istarska Županija~18|Karlovačka Županija~04|Koprivničko-Krizevačka Županija~06|Krapinsko-Zagorska Županija~02|Ličko-Senjska Županija~09|Međimurska Županija~20|Osječko-Baranjska Županija~14|Požeško-Slavonska Županija~11|Primorsko-Goranska Županija~08|Sisačko-Moslavačka Županija~03|Splitsko-Dalmatinska Županija~17|Sibensko-Kninska Županija~15|Varaždinska Županija~05|Virovitičko-Podravska Županija~10|Vukovarsko-Srijemska Županija~16|Zadarska Županija~13|Zagrebacka Zupanija~01"], ["Cuba", "CU", "Artemisa~15|Camagüey~09|Ciego de Ávila~08|Cienfuegos~06|Granma~12|Guantánamo~14|Holguín~11|Isla de la Juventud~99|La Habana~03|Las Tunas~10|Matanzas~04|Mayabeque~16|Pinar del Río~01|Sancti Spíritus~07|Santiago de Cuba~13|Villa Clara~05"], ["Curaçao", "CW", "Curaçao~CW"], ["Cyprus", "CY", "Ammochostos~04|Keryneia~05|Larnaka~03|Lefkosia~01|Lemesos~02|Pafos~05"], ["Czech Republic", "CZ", "Hlavní město Praha~PR|Jihočeský kraj~JC|Jihomoravský kraj~JM|Karlovarský kraj~KA|Královéhradecký kraj~KR|Liberecký kraj~LI|Moravskoslezský kraj~MO|Olomoucký kraj~OL|Pardubický kraj~PA|Plzeňský kraj~PL|Středočeský kraj~ST|Ústecký kraj~US|Vysočina~VY|Zlínský kraj~ZL"], ["Denmark", "DK", "Hovedstaden~84|Kujalleq~GL-KU|Midtjylland~82|Norderøerne~FO-01|Nordjylland~81|Østerø~FO-06|Qaasuitsup~GL-QA|Qeqqata~GL-QE|Sandø~FO-02|Sermersooq~GL-SM|Sjælland~85|Strømø~FO-03|Suderø~FO-04|Syddanmark~83|Vågø~FO-05"], ["Djibouti", "DJ", "Ali Sabieh~AS|Arta~AR|Dikhil~DI|Obock~OB|Tadjourah~TA"], ["Dominica", "DM", "Saint Andrew Parish~02|Saint David Parish~03|Saint George Parish~04|Saint John Parish~05|Saint Joseph Parish~06|Saint Luke Parish~07|Saint Mark Parish~08|Saint Patrick Parish~09|Saint Paul Parish~10|Saint Peter Parish~11"], ["Dominican Republic", "DO", "Cibao Central~02|Del Valle~37|Distrito Nacional~01|Enriquillo~38|Norcentral~04|Nordeste~34|Noroeste~34|Norte~35|Valdesia~42"], ["Ecuador", "EC", "Azuay~A|Bolívar~B|Cañar~F|Carchi~C|Chimborazo~H|Cotopaxi~X|El Oro~O|Esmeraldas~E|Galápagos~W|Guayas~G|Imbabura~I|Loja~L|Los Ríos~R|Manabí~M|Morona-Santiago~S|Napo~N|Orellana~D|Pastaza~Y|Pichincha~P|Santa Elena~SE|Santo Domingo de los Tsáchilas~SD|Sucumbíos~U|Tungurahua~T|Zamora-Chinchipe~Z"], ["Egypt", "EG", "Alexandria~ALX|Aswan~ASN|Asyout~AST|Bani Sueif~BNS|Beheira~BH|Cairo~C|Daqahlia~DK|Dumiat~DT|El Bahr El Ahmar~BA|El Ismailia~IS|El Suez~SUZ|El Wadi El Gedeed~WAD|Fayoum~FYM|Gharbia~GH|Giza~SUZ|Helwan~HU|Kafr El Sheikh~KFS|Luxor~LX|Matrouh~MT|Menia~MN|Menofia~MNF|North Sinai~SIN|Port Said~PTS|Qalubia~KB|Qena~KN|Sharqia~SHR|Sixth of October~SU|Sohag~SHG|South Sinai~JS"], ["El Salvador", "SV", "Ahuachapán~AH|Cabañas~CA|Cuscatlán~CU|Chalatenango~CH|La Libertad~LI|La Paz~PA|La Unión~UN|Morazán~MO|San Miguel~SM|San Salvador~SS|Santa Ana~SA|San Vicente~SV|Sonsonate~SO|Usulután~US"], ["Equatorial Guinea", "GQ", "Annobón~AN|Bioko Norte~BN|Bioko Sur~BS|Centro Sur~CS|Kié-Ntem~KN|Litoral~LI|Wele-Nzas~WN"], ["Eritrea", "ER", "Anseba~AN|Debub~DU|Debub-Keih-Bahri~DK|Gash-Barka~GB|Maekel~MA|Semien-Keih-Bahri~SK"], ["Estonia", "EE", "Harjumaa (Tallinn)~37|Hiiumaa (Kardla)~39|Ida-Virumaa (Johvi)~44|Järvamaa (Paide)~41|Jõgevamaa (Jogeva)~49|Läänemaa~57|Lääne-Virumaa (Rakvere)~59|Pärnumaa (Parnu)~67|Põlvamaa (Polva)~65|Raplamaa (Rapla)~70|Saaremaa (Kuessaare)~74|Tartumaa (Tartu)~78|Valgamaa (Valga)~82|Viljandimaa (Viljandi)~84|Võrumaa (Voru)~86"], ["Ethiopia", "ET", "Addis Ababa~AA|Afar~AF|Amhara~AM|Benshangul-Gumaz~BE|Dire Dawa~DD|Gambela~GA|Harari~HA|Oromia~OR|Somali~SO|Southern Nations Nationalities and People's Region~SN|Tigray~TI"], ["Falkland Islands (Islas Malvinas)", "FK", "Falkland Islands (Islas Malvinas)"], ["Faroe Islands", "FO", "Bordoy|Eysturoy|Mykines|Sandoy|Skuvoy|Streymoy|Suduroy|Tvoroyri|Vagar"], ["Fiji", "FJ", "Ba~01|Bua~01|Cakaudrove~03|Kadavu~04|Lau~05|Lomaiviti~06|Macuata~07|Nadroga and Navosa~08|Naitasiri~09|Namosi~10|Ra~011|Rewa~12|Rotuma~R|Serua~12|Tailevu~14"], ["Finland", "FI", "Ahvenanmaan lääni~AL|Etelä-Suomen lääni~ES|Itä-Suomen lääni~IS|Länsi-Suomen lääni~LS|Lapin lääni~LL|Oulun lääni~OL"], ["France", "FR", "Auvergne-Rhône-Alpes~ARA|Bourgogne-Franche-Comté~BFC|Bretagne~BRE|Centre-Val de Loire~CVL|Corse~COR|Grand Est~GES|Hauts-de-France~HDF|Île-de-France~IDF|Normandie~NOR|Nouvelle-Aquitaine~NAQ|Occitanie~OCC|Pays de la Loire~PDL|Provence-Alpes-Cote d'Azur~PAC|Clipperton~CP|Guadeloupe~GP|Guyane~GF|Martinique~MQ|Mayotte~YT|Novelle-Calédonie~NC|Polynésie~PF|Saint-Pierre-et-Miquelon~PM|Saint Barthélemy~BL|Saint Martin~MF|Réunion~RE|Terres Australes Françaises~TF|Wallis-et-Futuna~WF"], ["French Guiana", "GF", "French Guiana"], ["French Polynesia", "PF", "Archipel des Marquises|Archipel des Tuamotu|Archipel des Tubuai|Iles du Vent|Iles Sous-le-Vent"], ["French Southern and Antarctic Lands", "TF", "Adelie Land|Ile Crozet|Iles Kerguelen|Iles Saint-Paul et Amsterdam"], ["Gabon", "GA", "Estuaire~1|Haut-Ogooué~2|Moyen-Ogooué~3|Ngounié~4|Nyanga~5|Ogooué-Ivindo~6|Ogooué-Lolo~7|Ogooué-Maritime~8|Woleu-Ntem~9"], ["Gambia, The", "GM", "Banjul~B|Central River~M|Lower River~L|North Bank~N|Upper River~U|Western~W"], ["Georgia", "GE", "Abkhazia (Sokhumi)~AB|Ajaria (Bat'umi)~AJ|Guria~GU|Imereti~IM|K'akheti~KA|Kvemo Kartli~KK|Mtshkheta-Mtianeti~MM|Rach'a-Lexhkumi-KvemoSvaneti~RL|Samegrelo-Zemo Svaneti~SZ|Samtskhe-Javakheti~SJ|Shida Kartli~SK|Tbilisi~TB"], ["Germany", "DE", "Baden-Württemberg~BW|Bayern~BY|Berlin~BE|Brandenburg~BB|Bremen~HB|Hamburg~HH|Hessen~HE|Mecklenburg-Vorpommern~MV|Niedersachsen~NI|Nordrhein-Westfalen~NW|Rheinland-Pfalz~RP|Saarland~SL|Sachsen~SN|Sachsen-Anhalt~ST|Schleswig-Holstein~SH|Thüringen~TH"], ["Ghana", "GH", "Ashanti~AH|Brong-Ahafo~BA|Central~CP|Eastern~EP|Greater Accra~AA|Northern~NP|Upper East~UE|Upper West~UW|Volta~TV|Western~WP"], ["Gibraltar", "GI", "Gibraltar"], ["Greece", "GR", "Anatolikí Makedonía kai Thráki~A|Attikḯ~I|Dytikí Elláda~G|Dytikí Makedonía~C|Ionía Nísia~F|Kentrikí Makedonía~B|Krítí~M|Notío Aigaío~L|Peloponnísos~J|Stereá Elláda~H|Thessalía~E|Voreío Aigaío~K|Ípeiros~D|Ágion Óros~69"], ["Greenland", "GL", "Kommune Kujalleq~KU|Kommuneqarfik Sermersooq~SM|Qaasuitsup Kommunia~QA|Qeqqata Kommunia~QE"], ["Grenada", "GD", "Saint Andrew~01|Saint David~02|Saint George~03|Saint John~04|Saint Mark~05|Saint Patrick~06|Southern Grenadine Islands~10"], ["Guadeloupe", "GP", "Guadeloupe"], ["Guam", "GU", "Guam"], ["Guatemala", "GT", "Alta Verapaz~AV|Baja Verapaz~BV|Chimaltenango~CM|Chiquimula~CQ|El Progreso~PR|Escuintla~ES|Guatemala~GU|Huehuetenango~HU|Izabal~IZ|Jalapa~JA|Jutiapa~JU|Petén~PE|Quetzaltenango~QZ|Quiché~QC|Retalhuleu~Re|Sacatepéquez~SA|San Marcos~SM|Santa Rosa~SR|Sololá~SO|Suchitepéquez~SU|Totonicapán~TO|Zacapa~ZA"], ["Guernsey", "GG", "Castel|Forest|St. Andrew|St. Martin|St. Peter Port|St. Pierre du Bois|St. Sampson|St. Saviour|Torteval|Vale"], ["Guinea", "GN", "Boké~B|Conakry~C|Faranah~F|Kankan~K|Kindia~D|Labé~L|Mamou~M|Nzérékoré~N"], ["Guinea-Bissau", "GW", "Bafatá~BA|Biombo~BM|Bissau~BS|Bolama-Bijagos~BL|Cacheu~CA|Gabú~GA|Oio~OI|Quinara~QU|Tombali~TO"], ["Guyana", "GY", "Barima-Waini~BA|Cuyuni-Mazaruni~CU|Demerara-Mahaica~DE|East Berbice-Corentyne~EB|Essequibo Islands-West Demerara~ES|Mahaica-Berbice~MA|Pomeroon-Supenaam~PM|Potaro-Siparuni~PT|Upper Demerara-Berbice~UD|Upper Takutu-Upper Essequibo~UT"], ["Haiti", "HT", "Artibonite~AR|Centre~CE|Grand'Anse~GA|Nippes~NI|Nord~ND|Nord-Est~NE|Nord-Ouest~NO|Ouest~OU|Sud~SD|Sud-Est~SE"], ["Heard Island and McDonald Islands", "HM", "Heard Island and McDonald Islands"], ["Holy See (Vatican City)", "VA", "Holy See (Vatican City)~01"], ["Honduras", "HN", "Atlántida~AT|Choluteca~CH|Colón~CL|Comayagua~CM|Copán~CP|Cortés~CR|El Paraíso~EP|Francisco Morazan~FM|Gracias a Dios~GD|Intibucá~IN|Islas de la Bahía~IB|La Paz~LP|Lempira~LE|Ocotepeque~OC|Olancho~OL|Santa Bárbara~SB|Valle~VA|Yoro~YO"], ["Hong Kong", "HK", "Hong Kong"], ["Hungary", "HU", "Bács-Kiskun~BK|Baranya~BA|Békés~BE|Békéscsaba~BC|Borsod-Abauj-Zemplen~BZ|Budapest~BU|Csongrád~CS|Debrecen~DE|Dunaújváros~DU|Eger~EG|Érd~ER|Fejér~FE|Győr~GY|Győr-Moson-Sopron~GS|Hajdú-Bihar~HB|Heves~HE|Hódmezővásárhely~HV|Jász-Nagykun-Szolnok~N|Kaposvár~KV|Kecskemét~KM|Komárom-Esztergom~KE|Miskolc~MI|Nagykanizsa~NK|Nógrád~NO|Nyíregyháza~NY|Pécs~PS|Pest~PE|Salgótarján~ST|Somogy~SO|Sopron~SN|Szabolcs-á-Bereg~SZ|Szeged~SD|Székesfehérvár~SF|Szekszárd~SS|Szolnok~SK|Szombathely~SH|Tatabánya~TB|Tolna~TO|Vas~VA|Veszprém~VE|Veszprém (City)~VM|Zala~ZA|Zalaegerszeg~ZE"], ["Iceland", "IS", "Austurland~7|Höfuðborgarsvæði utan Reykjavíkur~1|Norðurland eystra~6|Norðurland vestra~5|Suðurland~8|Suðurnes~2|Vestfirðir~4|Vesturland~3"], ["India", "IN", "Andaman and Nicobar Islands~AN|Andhra Pradesh~AP|Arunachal Pradesh~AR|Assam~AS|Bihar~BR|Chandigarh~CH|Chhattisgarh~CT|Dadra and Nagar Haveli~DN|Daman and Diu~DD|Delhi~DL|Goa~GA|Gujarat~GJ|Haryana~HR|Himachal Pradesh~HP|Jammu and Kashmir~JK|Jharkhand~JH|Karnataka~KA|Kerala~KL|Lakshadweep~LD|Madhya Pradesh~MP|Maharashtra~MH|Manipur~MN|Meghalaya~ML|Mizoram~MZ|Nagaland~NL|Odisha~OR|Puducherry~PY|Punjab~PB|Rajasthan~RJ|Sikkim~WK|Tamil Nadu~TN|Telangana~TG|Tripura~TR|Uttarakhand~UT|Uttar Pradesh~UP|West Bengal~WB"], ["Indonesia", "ID", "Aceh~AC|Bali~BA|Bangka Belitung~BB|Banten~BT|Bengkulu~BE|Gorontalo~GO|Jakarta Raya~JK|Jambi~JA|Jawa Barat~JB|Jawa Tengah~JT|Jawa Timur~JI|Kalimantan Barat~KB|Kalimantan Selatan~KS|Kalimantan Tengah~KT|Kalimantan Timur~KI|Kalimantan Utara~KU|Kepulauan Riau~KR|Lampung~LA|Maluku~MA|Maluku Utara~MU|Nusa Tenggara Barat~NB|Nusa Tenggara Timur~NT|Papua~PA|Papua Barat~PB|Riau~RI|Sulawesi Selatan~SR|Sulawesi Tengah~ST|Sulawesi Tenggara~SG|Sulawesi Utara~SA|Sumatera Barat~SB|Sumatera Selatan~SS|Sumatera Utara~SU|Yogyakarta~YO"], ["Iran, Islamic Republic of", "IR", "Alborz~32|Ardabīl~03|Āz̄arbāyjān-e Gharbī~02|Āz̄arbāyjān-e Sharqī~01|Būshehr~06|Chahār Maḩāl va Bakhtīārī~08|Eşfahān~04|Fārs~14|Gīlān~19|Golestān~27|Hamadān~24|Hormozgān~23|Īlām~05|Kermān~15|Kermānshāh~17|Khorāsān-e Jonūbī~29|Khorāsān-e Raẕavī~30|Khorāsān-e Shomālī~61|Khūzestān~10|Kohgīlūyeh va Bowyer Aḩmad~18|Kordestān~16|Lorestān~20|Markazi~22|Māzandarān~21|Qazvīn~28|Qom~26|Semnān~12|Sīstān va Balūchestān~13|Tehrān~07|Yazd~25|Zanjān~11"], ["Iraq", "IQ", "Al Anbār~AN|Al Başrah~BA|Al Muthanná~MU|Al Qādisīyah~QA|An Najaf~NA|Arbīl~AR|As Sulaymānīyah~SU|Bābil~BB|Baghdād~BG|Dohuk~DA|Dhī Qār~DQ|Diyālá~DI|Karbalā'~KA|Kirkuk~KI|Maysān~MA|Nīnawá~NI|Şalāḩ ad Dīn~SD|Wāsiţ~WA"], ["Ireland", "IE", "Carlow~CW|Cavan~CN|Clare~CE|Cork~CO|Donegal~DL|Dublin~D|Galway~G|Kerry~KY|Kildare~KE|Kilkenny~KK|Laois~LS|Leitrim~LM|Limerick~LK|Longford~LD|Louth~LH|Mayo~MO|Meath~MH|Monaghan~MN|Offaly~OY|Roscommon~RN|Sligo~SO|Tipperary~TA|Waterford~WD|Westmeath~WH|Wexford~WX|Wicklow~WW"], ["Isle of Man", "IM", "Isle of Man"], ["Israel", "IL", "HaDarom~D|HaMerkaz~M|HaTsafon~Z|H̱efa~HA|Tel-Aviv~TA|Yerushalayim~JM"], ["Italy", "IT", "Abruzzo~65|Basilicata~77|Calabria~78|Campania~72|Emilia-Romagna~45|Friuli-Venezia Giulia~36|Lazio~62|Liguria~42|Lombardia~25|Marche~57|Molise~67|Piemonte~21|Puglia~75|Sardegna~88|Sicilia~82|Toscana~52|Trentino-Alto Adige~32|Umbria~55|Valle d'Aosta~23|Veneto~34"], ["Jamaica", "JM", "Clarendon~13|Hanover~09|Kingston~01|Manchester~12|Portland~04|Saint Andrew~02|Saint Ann~06|Saint Catherine~14|Saint Elizabeth~11|Saint James~08|Saint Mary~05|Saint Thomas~03|Trelawny~07|Westmoreland~10"], ["Japan", "JP", "Aichi~23|Akita~05|Aomori~02|Chiba~12|Ehime~38|Fukui~18|Fukuoka~40|Fukushima~07|Gifu~21|Gunma~10|Hiroshima~34|Hokkaido~01|Hyogo~28|Ibaraki~08|Ishikawa~17|Iwate~03|Kagawa~37|Kagoshima~46|Kanagawa~14|Kochi~39|Kumamoto~43|Kyoto~26|Mie~24|Miyagi~04|Miyazaki~45|Nagano~20|Nagasaki~42|Nara~29|Niigata~15|Oita~44|Okayama~33|Okinawa~47|Osaka~27|Saga~41|Saitama~11|Shiga~25|Shimane~32|Shizuoka~22|Tochigi~09|Tokushima~36|Tokyo~13|Tottori~31|Toyama~16|Wakayama~30|Yamagata~06|Yamaguchi~35|Yamanashi~19"], ["Jersey", "JE", "Jersey"], ["Jordan", "JO", "‘Ajlūn~AJ|Al 'Aqabah~AQ|Al Balqā’~BA|Al Karak~KA|Al Mafraq~MA|Al ‘A̅şimah~AM|Aţ Ţafīlah~AT|Az Zarqā’~AZ|Irbid~IR|Jarash~JA|Ma‘ān~MN|Mādabā~MD"], ["Kazakhstan", "KZ", "Almaty~ALA|Aqmola~AKM|Aqtobe~AKT|Astana~AST|Atyrau~ATY|Batys Qazaqstan~ZAP|Bayqongyr|Mangghystau~MAN|Ongtustik Qazaqstan~YUZ|Pavlodar~PAV|Qaraghandy~KAR|Qostanay~KUS|Qyzylorda~KZY|Shyghys Qazaqstan~VOS|Soltustik Qazaqstan~SEV|Zhambyl~ZHA"], ["Kenya", "KE", "Baringo~01|Bomet~02|Bungoma~03|Busia~04|Eleyo/Marakwet~05|Embu~06|Garissa~07|Homa Bay~08|Isiolo~09|Kajiado~10|Kakamega~11|Kericho~12|Kiambu~13|Kilifi~14|Kirinyaga~15|Kisii~16|Kisumu~17|Kitui~18|Kwale~19|Laikipia~20|Lamu~21|Machakos~22|Makueni~23|Mandera~24|Marsabit~25|Meru~26|Migori~27|Mombasa~28|Murang'a~29|Nairobi City~30|Nakuru~31|Nandi~32|Narok~33|Nyamira~34|Nyandarua~35|Nyeri~36|Samburu~37|Siaya~38|Taita/Taveta~39|Tana River~40|Tharaka-Nithi~41|Trans Nzoia~42|Turkana~43|Uasin Gishu~44|Vihiga~45|Wajir~46|West Pokot~47"], ["Kiribati", "KI", "Abaiang|Abemama|Aranuka|Arorae|Banaba|Beru|Butaritari|Central Gilberts|Gilbert Islands~G|Kanton|Kiritimati|Kuria|Line Islands~L|Maiana|Makin|Marakei|Nikunau|Nonouti|Northern Gilberts|Onotoa|Phoenix Islands~P|Southern Gilberts|Tabiteuea|Tabuaeran|Tamana|Tarawa|Teraina"], ["Korea, Democratic People's Republic of", "KP", "Chagang-do (Chagang Province)~04|Hamgyong-bukto (North Hamgyong Province)~09|Hamgyong-namdo (South Hamgyong Province)~08|Hwanghae-bukto (North Hwanghae Province)~06|Hwanghae-namdo (South Hwanghae Province)~05|Kangwon-do (Kangwon Province)~07|Nasŏn (Najin-Sŏnbong)~13|P'yongan-bukto (North P'yongan Province)~03|P'yongan-namdo (South P'yongan Province)~02|P'yongyang-si (P'yongyang City)~01|Yanggang-do (Yanggang Province)~10"], ["Korea, Republic of", "KR", "Ch'ungch'ongbuk-do~43|Ch'ungch'ongnam-do~44|Cheju-do~49|Chollabuk-do~45|Chollanam-do~46|Inch'on-Kwangyokhi~28|Kang-won-do~42|Kwangju-Kwangyokshi~28|Kyonggi-do~41|Kyongsangbuk-do~47|Kyongsangnam-do~48|Pusan-Kwangyokshi~26|Seoul-T'ukpyolshi~11|Sejong~50|Taegu-Kwangyokshi~27|Taejon-Kwangyokshi~30|Ulsan-Kwangyokshi~31"], ["Kuwait", "KW", "Al Aḩmadi~AH|Al Farwānīyah~FA|Al Jahrā’~JA|Al ‘Āşimah~KU|Ḩawallī~HA|Mubārak al Kabir~MU"], ["Kyrgyzstan", "KG", "Batken Oblasty~B|Bishkek Shaary~GB|Chuy Oblasty (Bishkek)~C|Jalal-Abad Oblasty~J|Naryn Oblasty~N|Osh Oblasty~O|Talas Oblasty~T|Ysyk-Kol Oblasty (Karakol)~Y"], ["Laos", "LA", "Attapu~AT|Bokèo~BK|Bolikhamxai~BL|Champasak~CH|Houaphan~HO|Khammouan~KH|Louang Namtha~LM|Louangphabang~LP|Oudômxai~OU|Phôngsali~PH|Salavan~SL|Savannakhét~SV|Vientiane~VI|Xaignabouli~XA|Xékong~XE|Xaisomboun~XS|Xiangkhouang~XI"], ["Latvia", "LV", "Aglona~001|Aizkraukle~002|Aizpute~003|Aknīste~004|Aloja~005|Alsunga~06|Alūksne~007|Amata~008|Ape~009|Auce~010|Ādaži~011|Babīte~012|Baldone~013|Baltinava~014|Balvi~015|Bauska~016|Beverīna~017|Brocēni~018|Burtnieki~019|Carnikava~020|Cesvaine~021|Cēsis~022|Cibla~023|Dagda~024|Daugavpils~025|Daugavpils (City)~DGV|Dobele~026|Dundaga~027|Durbe~028|Engure~029|Ērgļi~030|Garkalne~031|Grobiņa~032|Gulbene~033|Iecava~034|Ikšķile~035|Ilūkste~036|Inčukalns~037|Jaunjelgava~038|Jaunpiebalga~039|Jaunpils~040|Jelgava~041|Jelgava (City)~JEL|Jēkabpils~042|Jēkabpils (City)~JKB|Jūrmala (City)~JUR|Kandava~043|Kārsava~044|Kocēni~045|Koknese~046|Krāslava~047|Krimulda~048|Krustpils~049|Kuldīga~050|Ķegums~051|Ķekava~052|Lielvārde~053|Liepāja~LPX|Limbaži~054|Līgatne~055|Līvāni~056|Lubāna~057|Ludza~058|Madona~059|Mazsalaca~060|Mālpils~061|Mārupe~062|Mērsrags~063|Naukšēni~064|Nereta~065|Nīca~066|Ogre~067|Olaine~068|Ozolnieki~069|Pārgauja~070|Pāvilosta~071|Pļaviņas~072|Preiļi~073|Priekule~074|Priekuļi~075|Rauna~076|Rēzekne~077|Rēzekne (City)~REZ|Riebiņi~078|Rīga~RIX|Roja~079|Ropaži~080|Rucava~081|Rugāji~082|Rundāle~083|Rūjiena~084|Sala~085|Salacgrīva~086|Salaspils~087|Saldus~088|Saulkrasti~089|Sēja~090|Sigulda~091|Skrīveri~092|Skrunda~093|Smiltene~094|Stopiņi~095|Strenči~096|Talsi~097|Tērvete~098|Tukums~099|Vaiņode~100|Valka~101|Valmiera~VMR|Varakļāni~102|Vārkava~103|Vecpiebalga~104|Vecumnieki~105|Ventspils~106|Ventspils (City)~VEN|Viesīte~107|Viļaka~108|Viļāni~109|Zilupe~110"], ["Lebanon", "LB", "Aakkâr~AK|Baalbelk-Hermel~BH|Béqaa~BI|Beyrouth~BA|Liban-Nord~AS|Liban-Sud~JA|Mont-Liban~JL|Nabatîyé~NA"], ["Lesotho", "LS", "Berea~D|Butha-Buthe~B|Leribe~C|Mafeteng~E|Maseru~A|Mohales Hoek~F|Mokhotlong~J|Qacha's Nek~H|Quthing~G|Thaba-Tseka~K"], ["Liberia", "LR", "Bomi~BM|Bong~BG|Gbarpolu~GP|Grand Bassa~GB|Grand Cape Mount~CM|Grand Gedeh~GG|Grand Kru~GK|Lofa~LO|Margibi~MG|Maryland~MY|Montserrado~MO|Nimba~NI|River Cess~RI|River Geee~RG|Sinoe~SI"], ["Libya", "LY", "Al Buţnān~BU|Al Jabal al Akhḑar~JA|Al Jabal al Gharbī~JG|Al Jafārah~JA|Al Jufrah~JU|Al Kufrah~FK|Al Marj~MJ|Al Marquab~MB|Al Wāḩāt~WA|An Nuqaţ al Khams~NQ|Az Zāwiyah~ZA|Banghāzī~BA|Darnah~DR|Ghāt~GH|Mişrātah~MI|Murzuq~MQ|Nālūt~NL|Sabhā~SB|Surt~SR|Ţarābulus~TB|Yafran~WD|Wādī ash Shāţiʾ~WS"], ["Liechtenstein", "LI", "Balzers~01|Eschen~02|Gamprin~03|Mauren~04|Planken~05|Ruggell~06|Schaan~07|Schellenberg~08|Triesen~09|Triesenberg~10|Vaduz~11"], ["Lithuania", "LT", "Alytaus~AL|Kauno~KU|Klaipėdos~KL|Marijampolės~MR|Panevėžio~PN|Šiaulių~SA|Tauragės~TA|Telšių~TE|Utenos~UT|Vilniaus~VL"], ["Luxembourg", "LU", "Capellen~CA|Clevaux~CL|Diekirch~DI|Echternach~EC|Esch-sur-Alzette~ES|Grevenmacher~GR|Luxembourg~LU|Mersch~ME|Redange~RD|Remich~RM|Vianden~VD|Wiltz~WI"], ["Macao", "MO", "Macao"], ["Macedonia, Republic of", "MK", "Aračinovo~02|Berovo~03|Bitola~04|Bogdanci~05|Bogovinje~06|Bosilovo~07|Brvenica~08|Centar Župa~78|Čaška~08|Češinovo-Obleševo~81|Čučer Sandevo~82|Debar~21|Debarca~22|Delčevo~23|Demir Hisar~25|Demir Kapija~24|Doran~26|Dolneni~27|Gevgelija~18|Gostivar~19|Gradsko~20|Ilinden~34|Jegunovce~35|Karbinci~37|Kavadarci~36|Kičevo~40|Kočani~42|Konče~41|Kratovo~43|Kriva Palanka~44|Krivogaštani~45|Kruševo~46|Kumanovo~47|Lipkovo~48|Lozovo~49|Makedonska Kamenica~51|Makedonski Brod~52|Mavrovo i Rostuša~50|Mogila~53|Negotino~54|Novaci~55|Novo Selo~56|Ohrid~58|Pehčevo~60|Petrovec~59|Plasnica~61|Prilep~62|Probištip~63|Radoviš~|Rankovce~65|Resen~66|Rosoman~67|Skopje~85|Sopište~70|Staro Nagoričane~71|Struga~72|Strumica~73|Studeničani~74|Sveti Nikole~69|Štip~83|Tearce~75|Tetovo~76|Valandovo~10|Vasilevo~11|Veles~13|Vevčani~12|Vinica~14|Vrapčište~16|Zelenikovo~32|Zrnovci~33|Želino~30"], ["Madagascar", "MG", "Antananarivo~T|Antsiranana~D|Fianarantsoa~F|Mahajanga~M|Toamasina~A|Toliara~U"], ["Malawi", "MW", "Balaka~BA|Blantyre~BL|Chikwawa~CK|Chiradzulu~CR|Chitipa~CT|Dedza~DE|Dowa~DO|Karonga~KR|Kasungu~KS|Likoma~LK|Lilongwe~LI|Machinga~MH|Mangochi~MG|Mchinji~MC|Mulanje~MU|Mwanza~MW|Mzimba~MZ|Nkhata Bay~NE|Nkhotakota~NB|Nsanje~NS|Ntcheu~NU|Ntchisi~NI|Phalombe~PH|Rumphi~RU|Salima~SA|Thyolo~TH|Zomba~ZO"], ["Malaysia", "MY", "Johor~01|Kedah~02|Kelantan~03|Melaka~04|Negeri Sembilan~05|Pahang~06|Perak~08|Perlis~09|Pulau Pinang~07|Sabah~12|Sarawak~13|Selangor~10|Terengganu~11|Wilayah Persekutuan (Kuala Lumpur)~14|Wilayah Persekutuan (Labuan)~15|Wilayah Persekutuan (Putrajaya)~16"], ["Maldives", "MV", "Alifu Alifu~02|Alifu Dhaalu~00|Baa~20|Dhaalu~17|Faafu~14|Gaafu Alifu~27|Gaafu Dhaalu~28|Gnaviyani~29|Haa Alifu~07|Haa Dhaalu~23|Kaafu~29|Laamu~05|Lhaviyani~03|Malé~MLE|Meemu~12|Noonu~25|Raa~13|Seenu~01|Shaviyani~24|Thaa~08|Vaavu~04"], ["Mali", "ML", "Bamako~BKO|Gao~7|Kayes~1|Kidal~8|Koulikoro~2|Mopti~5|Segou~4|Sikasso~3|Tombouctou~6"], ["Malta", "MT", "Attard~01|Balzan~02|Birgu~03|Birkirkara~04|Birżebbuġa~05|Bormla~06|Dingli~07|Fgura~08|Floriana~09|Fontana~10|Guda~11|Gżira~12|Għajnsielem~13|Għarb~14|Għargħur~15|Għasri~16|Għaxaq~17|Ħamrun~18|Iklin~19|Isla~20|Kalkara~21|Kerċem~22|Kirkop~23|Lija~24|Luqa~25|Marsa~26|Marsaskala~27|Marsaxlokk~28|Mdina~29|Mellieħa~30|Mġarr~31|Mosta~32|Mqabba~33|Msida~34|Mtarfa~35|Munxar~36|Nadur~37|Naxxar~38|Paola~39|Pembroke~40|Pietà~41|Qala~42|Qormi~43|Qrendi~44|Rabat Għawdex~45|Rabat Malta~46|Safi~47|San Ġiljan~48|San Ġwann~49|San Lawrenz~50|San Pawl il-Baħar~51|Sannat~52|Santa Luċija~53|Santa Venera~54|Siġġiewi~55|Sliema~56|Swieqi~57|Tai Xbiex~58|Tarzien~59|Valletta~60|Xagħra~61|Xewkija~62|Xgħajra~63|Żabbar~64|Żebbuġ Għawde~65|Żebbuġ Malta~66|Żejtun~67|Żurrieq~68"], ["Marshall Islands", "MH", "Ailinglaplap~ALL|Ailuk~ALK|Arno~ARN|Aur~AUR|Bikini and Kili~KIL|Ebon~EBO|Jabat~JAB|Jaluit~JAL|Kwajalein~KWA|Lae~LAE|Lib~LIB|Likiep~LIK|Majuro~MAJ|Maloelap~MAL|Mejit~MEJ|Namdrik~NMK|Namu~NMU|Rongelap~RON|Ujae~UJA|Utrik~UTI|Wotho~WTH|Wotje~WTJ"], ["Martinique", "MQ", "Martinique"], ["Mauritania", "MR", "Adrar~07|Assaba~03|Brakna~05|Dakhlet Nouadhibou~08|Gorgol~04|Guidimaka~10|Hodh Ech Chargui~01|Hodh El Gharbi~02|Inchiri~12|Nouakchott Nord~14|Nouakchott Ouest~13|Nouakchott Sud~15|Tagant~09|Tiris Zemmour~11|Trarza~06"], ["Mauritius", "MU", "Agalega Islands~AG|Beau Bassin-Rose Hill~BR|Black River~BL|Cargados Carajos Shoals~CC|Curepipe~CU|Flacq~FL|Grand Port~GP|Moka~MO|Pamplemousses~PA|Plaines Wilhems~PW|Port Louis (City)~PU|Port Louis~PL|Riviere du Rempart~RR|Rodrigues Island~RO|Savanne~SA|Vacoas-Phoenix~CP"], ["Mayotte", "YT", "Dzaoudzi~01|Pamandzi~02|Mamoudzou~03|Dembeni~04|Bandrélé~05|Kani-Kéli~06|Bouéni~07|Chirongui~08|Sada~09|Ouangani~10|Chiconi~11|Tsingoni~12|M'Tsangamouji~13|Acoua~14|Mtsamboro~15|Bandraboua~16|Koungou~17"], ["Mexico", "MX", "Aguascalientes~AGU|Baja California~BCN|Baja California Sur~BCS|Campeche~CAM|Ciudad de México~DIF|Chiapas~CHP|Chihuahua~CHH|Coahuila de Zaragoza~COA|Colima~COL|Durango~DUR|Estado de México~MEX|Guanajuato~GUA|Guerrero~GRO|Hidalgo~HID|Jalisco~JAL|Michoacán de Ocampo~MIC|Morelos~MOR|Nayarit~NAY|Nuevo León~NLE|Oaxaca~OAX|Puebla~PUE|Querétaro de Arteaga~QUE|Quintana Roo~ROO|San Luis Potosí~SLP|Sinaloa~SIN|Sonora~SON|Tabasco~TAB|Tamaulipas~TAM|Tlaxcala~TLA|Veracruz~VER|Yucatán~YUC|Zacatecas~ZAC"], ["Micronesia, Federated States of", "FM", "Chuuk (Truk)~TRK|Kosrae~KSA|Pohnpei~PNI|Yap~YAP"], ["Moldova", "MD", "Aenii Noi~AN|Basarabeasca~BS|Bălți~BA|Bender~BD|Briceni~BR|Cahul~CA|Cantemir~CT|Călărași~CL|Căușeni~CS|Chișinău~CU|Cimișlia~CM|Criuleni~CR|Dondușeni~DO|Drochia~DR|Dubăsari~DU|Edineț~ED|Fălești~FA|Florești~FL|Găgăuzia~GA|Glodeni~GL|Hîncești~HI|Ialoveni~IA|Leova~LE|Nisporeni~NI|Ocnița~OC|Orhei~OR|Rezina~RE|Rîșcani~RI|Sîngerei~SI|Soroca~SO|Stînga Nistrului~SN|Strășeni~ST|Șoldănești~SD|Ștefan Vodă~SV|Taraclia~TA|Telenești~TE|Ungheni~UN"], ["Monaco", "MC", "Colle~CL|Condamine~CO|Fontvieille~FO|Gare~GA|Jardin Exotique~JE|Larvotto~LA|Malbousquet~MA|Monaco-Ville~MO|Moneghetti~MG|Monte-Carlo~MC|Moulins~MU|Port-Hercule~PH|Saint-Roman~SR|Sainte-Dévote~SD|Source~SO|Spélugues~SP|Vallon de la Rousse~VR"], ["Mongolia", "MN", "Arhangay~073|Bayan-Olgiy~071|Bayanhongor~069|Bulgan~067|Darhan~037|Dornod~061|Dornogovi~063|Dundgovi~059|Dzavhan~065|Govi-Altay~065|Govi-Sumber~064|Hovd~043|Hovsgol~041|Omnogovi~053|Ovorhangay~055|Selenge~049|Suhbaatar~051|Tov~047|Ulaanbaatar~1|Uvs~046"], ["Montenegro", "ME", "Andrijevica~01|Bar~02|Berane~03|Bijelo Polje~04|Budva~05|Cetinje~06|Danilovgrad~07|Gusinje~22|Herceg Novi~08|Kolašin~09|Kotor~10|Mojkovac~11|Nikšić~12|Petnica~23|Plav~13|Plužine~14|Pljevlja~15|Podgorica~16|Rožaje~17|Šavnik~18|Tivat~19|Ulcinj~20|Žabljak~21"], ["Montserrat", "MS", "Saint Anthony|Saint Georges|Saint Peter's"], ["Morocco", "MA", "Chaouia-Ouardigha~09|Doukhala-Abda~10|Fès-Boulemane~05|Gharb-Chrarda-Beni Hssen~02|Grand Casablanca~08|Guelmim-Es Semara~14|Laâyoune-Boujdour-Sakia el Hamra~15|Marrakech-Tensift-Al Haouz~11|Meknès-Tafilalet~06|Oriental~04|Oued ed Dahab-Lagouira~16|Souss-Massa-Drâa~13|Tadla-Azilal~12|Tanger-Tétouan~01|Taza-Al Hoceima-Taounate~03"], ["Mozambique", "MZ", "Cabo Delgado~P|Gaza~G|Inhambane~I|Manica~B|Maputo~L|Maputo (City)~MPM|Nampula~N|Niassa~A|Sofala~S|Tete~T|Zambezia~Q"], ["Myanmar", "MM", "Ayeyarwady~07|Bago~02|Chin~14|Kachin~11|Kayah~12|Kayin~13|Magway~03|Mandalay~04|Mon~15|Nay Pyi Taw~18|Rakhine~16|Sagaing~01|Shan~17|Tanintharyi~05|Yangon~06"], ["Namibia", "NA", "Erongo~ER|Hardap~HA|Kavango East~KE|Kavango West~KW|Karas~KA|Khomas~KH|Kunene~KU|Ohangwena~OW|Omaheke~OH|Omusati~OS|Oshana~ON|Oshikoto~OT|Otjozondjupa~OD|Zambezi~CA"], ["Nauru", "NR", "Aiwo~01|Anabar~02|Anetan~03|Anibare~04|Baiti~05|Boe~06|Buada~07|Denigomodu~08|Ewa~09|Ijuw~10|Meneng~11|Nibok~12|Uaboe~13|Yaren~14"], ["Nepal", "NP", "Bagmati~BA|Bheri~BH|Dhawalagiri~DH|Gandaki~GA|Janakpur~JA|Karnali~KA|Kosi~KO|Lumbini~LU|Mahakali~MA|Mechi~ME|Narayani~NA|Rapti~RA|Sagarmatha~SA|Seti~SE"], ["Netherlands", "NL", "Drenthe~DR|Flevoland~FL|Friesland~FR|Gelderland~GE|Groningen~GR|Limburg~LI|Noord-Brabant~NB|Noord-Holland~NH|Overijssel~OV|Utrecht~UT|Zeeland~ZE|Zuid-Holland~ZH"], ["New Caledonia", "NC", "Iles Loyaute|Nord|Sud"], ["New Zealand", "NZ", "Auckland~AUK|Bay of Plenty~BOP|Canterbury~CAN|Gisborne~GIS|Hawke's Bay~HKB|Marlborough~MBH|Manawatu-Wanganui~MWT|Northland~NTL|Nelson~NSN|Otago~OTA|Southland~STL|Taranaki~TKI|Tasman~TAS|Waikato~WKO|Wellington~WGN|West Coast~WTC|Chatham Islands Territory~CIT"], ["Nicaragua", "NI", "Boaco~BO|Carazo~CA|Chinandega~CI|Chontales~CO|Estelí~ES|Granada~GR|Jinotega~JI|León~LE|Madriz~MD|Managua~MN|Masaya~MS|Matagalpa~MT|Nueva Segovia~NS|Río San Juan~SJ|Rivas~RI|Atlántico Norte~AN|Atlántico Sur~AS"], ["Niger", "NE", "Agadez~1|Diffa~2|Dosso~3|Maradi~4|Niamey~8|Tahoua~5|Tillabéri~6|Zinder~7"], ["Nigeria", "NG", "Abia~AB|Abuja Federal Capital Territory~FC|Adamawa~AD|Akwa Ibom~AK|Anambra~AN|Bauchi~BA|Bayelsa~BY|Benue~BE|Borno~BO|Cross River~CR|Delta~DE|Ebonyi~EB|Edo~ED|Ekiti~EK|Enugu~EN|Gombe~GO|Imo~IM|Jigawa~JI|Kaduna~KD|Kano~KN|Katsina~KT|Kebbi~KE|Kogi~KO|Kwara~KW|Lagos~LA|Nassarawa~NA|Niger~NI|Ogun~OG|Ondo~ON|Osun~OS|Oyo~OY|Plateau~PL|Rivers~RI|Sokoto~SO|Taraba~TA|Yobe~YO|Zamfara~ZA"], ["Niue", "NU", "Niue"], ["Norfolk Island", "NF", "Norfolk Island"], ["Northern Mariana Islands", "MP", "Northern Islands|Rota|Saipan|Tinian"], ["Norway", "NO", "Akershus~02|Aust-Agder~09|Buskerud~06|Finnmark~20|Hedmark~04|Hordaland~12|Møre og Romsdal~15|Nordland~18|Nord-Trøndelag~17|Oppland~05|Oslo~03|Rogaland~11|Sogn og Fjordane~14|Sør-Trøndelag~16|Telemark~08|Troms~19|Vest-Agder~10|Vestfold~07|Østfold~01|Jan Mayen~22|Svalbard~21"], ["Oman", "OM", "Ad Dakhiliyah~DA|Al Buraymi~BU|Al Wusta~WU|Az Zahirah~ZA|Janub al Batinah~BS|Janub ash Sharqiyah~SS|Masqat~MA|Musandam~MU|Shamal al Batinah~BJ|Shamal ash Sharqiyah~SJ|Zufar~ZU"], ["Pakistan", "PK", "Āzād Kashmīr~JK|Balōchistān~BA|Gilgit-Baltistān~GB|Islāmābād~IS|Khaībar Pakhtūnkhwās~KP|Punjāb~PB|Sindh~SD|Federally Administered Tribal Areas~TA"], ["Palau", "PW", "Aimeliik~002|Airai~004|Angaur~010|Hatobohei~050|Kayangel~100|Koror~150|Melekeok~212|Ngaraard~214|Ngarchelong~218|Ngardmau~222|Ngatpang~224|Ngchesar~226|Ngeremlengui~227|Ngiwal~228|Peleliu~350|Sonsoral~350"], ["Palestine, State of", "PS", "Ak Khalīl~HBN|Al Quds~JEM|Arīḩā wal Aghwār~JRH|Bayt Laḩm~BTH|Dayr al Balaḩ~DEB|Ghazzah~GZA|Janīn~JEN|Khān Yūnis~KYS|Nāblus~NBS|Qalqīyah~QQA|Rafaḩ~RFH|Rām Allāh wal Bīrah~RBH|Salfīt~SLT|Shamāl Ghazzah~NGZ|Ţūbās~TBS|Ţūlkarm~TKM"], ["Panama", "PA", "Bocas del Toro~1|Chiriquí~4|Coclé~2|Colón~3|Darién~5|Emberá~EM|Herrera~6|Kuna Yala~KY|Los Santos~7|Ngäbe-Buglé~NB|Panamá~8|Panamá Oeste~10|Veraguas~9"], ["Papua New Guinea", "PG", "Bougainville~NSB|Central~CPM|Chimbu~CPK|East New Britain~EBR|East Sepik~ESW|Eastern Highlands~EHG|Enga~EPW|Gulf~GPK|Hela~HLA|Jiwaka~JWK|Madang~MOM|Manus~MRL|Milne Bay~MBA|Morobe~MPL|Port Moresby~NCD|New Ireland~NIK|Northern~NPP|Southern Highlands~SHM|West New Britain~WBK|West Sepik~SAN|Western~WPD|Western Highlands~WHM"], ["Paraguay", "PY", "Alto Paraguay~16|Alto Parana~10|Amambay~13|Asuncion~ASU|Caaguazu~5|Caazapa~6|Canindeyu~14|Central~11|Concepcion~1|Cordillera~3|Guaira~4|Itapua~7|Misiones~8|Neembucu~12|Paraguari~9|Presidente Hayes~15|San Pedro~2"], ["Peru", "PE", "Amazonas~AMA|Ancash~ANC|Apurimac~APU|Arequipa~ARE|Ayacucho~AYA|Cajamarca~CAJ|Callao~CAL|Cusco~CUS|Huancavelica~HUV|Huanuco~HUC|Ica~ICA|Junin~JUN|La Libertad~LAL|Lambayeque~LAM|Lima~LIM|Loreto~LOR|Madre de Dios~MDD|Moquegua~MOQ|Municipalidad Metropolitana de Lima~LMA|Pasco~PAS|Piura~PIU|Puno~PUN|San Martin~SAM|Tacna~TAC|Tumbes~TUM|Ucayali~UCA"], ["Philippines", "PH", "Abra~ABR|Agusan del Norte~AGN|Agusan del Sur~AGS|Aklan~AKL|Albay~ALB|Antique~ANT|Apayao~APA|Aurora~AUR|Basilan~BAS|Bataan~BAN|Batanes~BTN|Batangas~BTG|Benguet~BEN|Biliran~BIL|Bohol~BOH|Bukidnon~BUK|Bulacan~BUL|Cagayan~CAG|Camarines Norte~CAN|Camarines Sur~CAS|Camiguin~CAM|Capiz~CAP|Catanduanes~CAT|Cavite~CAV|Cebu~CEB|Compostela~COM|Cotabato~NCO|Davao del Norte~DAV|Davao del Sur~DAS|Davao Occidental~DVO|Davao Oriental~DAO|Dinagat Islands~DIN|Eastern Samar~EAS|Guimaras~GUI|Ifugao~IFU|Ilocos Norte~ILN|Ilocos Sur~ILS|Iloilo~ILI|Isabela~ISA|Kalinga~KAL|La Union~LUN|Laguna~LAG|Lanao del Norte~LAN|Lanao del Sur~LAS|Leyte~LEY|Maguindanao~MAG|Masbate~MAS|Metro Manila~00|Mindoro Occidental~MDC|Mindoro Oriental~MDR|Misamis Occidental~MSC|Misamis Oriental~MSR|Mountain Province~MOU|Negros Occidental~NEC|Negros Oriental~NER|Northern Samar~NSA|Nueva Ecija~NUE|Nueva Vizcaya~NUV|Palawan~PLW|Pampanga~PAM|Pangasinan~PAN|Quezon~QUE|Quirino~QUI|Rizal~RIZ|Romblon~ROM|Samar~WSA|Sarangani~SAR|Siquijor~SIG|Sorsogon~SOR|Southern Leyte~SLE|Sultan Kudarat~AUK|Sulu~SLU|Surigao del Norte~SUN|Surigao del Sur~SUR|Tarlac~TAR|Tawi-Tawi~TAW|Zambales~ZMB|Zamboanga del Norte~ZAN|Zamboanga del Sur~ZAS|Zamboanga Sibugay~ZSI"], ["Pitcairn", "PN", "Pitcairn Islands"], ["Poland", "PL", "Dolnośląskie~DS|Kujawsko-pomorskie~KP|Łódzkie~LD|Lubelskie~LU|Lubuskie~LB|Malopolskie~MA|Mazowieckie~MZ|Opolskie~OP|Podkarpackie~PK|Podlaskie~PD|Pomorskie~PM|Śląskie~SL|Świętokrzyskie~SK|Warmińsko-mazurskie~WN|Wielkopolskie~WP|Zachodniopomorskie~ZP"], ["Portugal", "PT", "Acores~20|Aveiro~01|Beja~02|Braga~03|Braganca~04|Castelo Branco~05|Coimbra~06|Evora~07|Faro~08|Guarda~09|Leiria~10|Lisboa~11|Madeira~30|Portalegre~12|Porto~13|Santarem~14|Setubal~15|Viana do Castelo~16|Vila Real~17|Viseu~18"], ["Puerto Rico", "PR", "Adjuntas|Aguada|Aguadilla|Aguas Buenas|Aibonito|Anasco|Arecibo|Arroyo|Barceloneta|Barranquitas|Bayamon|Cabo Rojo|Caguas|Camuy|Canovanas|Carolina|Cat|Ceiba|Ciales|Cidra|Coamo|Comerio|Corozal|Culebra|Dorado|Fajardo|Florida|Guanica|Guayama|Guayanilla|Guaynabo|Gurabo|Hatillo|Hormigueros|Humacao|Isabe|Juana Diaz|Juncos|Lajas|Lares|Las Marias|Las oiza|Luquillo|Manati|Maricao|Maunabo|Mayaguez|Moca|Morovis|Naguabo|Naranjito|Orocovis|Patillas|Penuelas|Ponce|Quebradillas|Rincon|Rio Grande|Sabana linas|San German|San Juan|San Lorenzo|San Sebastian|Santa Isabel|Toa Alta|Toa Baja|Trujillo Alto|Utuado|Vega Alta|Vega ues|Villalba|Yabucoa|Yauco"], ["Qatar", "QA", "Ad Dawḩah~DA|Al Khawr wa adh Dhakhīrah~KH|Al Wakrah~WA|Ar Rayyān~RA|Ash Shamāl~MS|Az̧ Za̧`āyin~ZA|Umm Şalāl~US"], ["Réunion", "RE", "Réunion"], ["Romania", "RO", "Alba~AB|Arad~AR|Arges~AG|Bacau~BC|Bihor~BH|Bistrita-Nasaud~BN|Botosani~BT|Braila~BR|Brasov~BV|Bucuresti~B|Buzau~BZ|Calarasi~CL|Caras-Severin~CS|Cluj~CJ|Constanta~CT|Covasna~CV|Dambovita~DB|Dolj~DJ|Galati~GL|Giurgiu~GR|Gorj~GJ|Harghita~HR|Hunedoara~HD|Ialomita~IL|Iasi~IS|Maramures~MM|Mehedinti~MH|Mures~MS|Neamt~NT|Olt~OT|Prahova~PH|Salaj~SJ|Satu Mare~SM|Sibiu~SB|Suceava~SV|Teleorman~TR|Timis~TM|Tulcea~TL|Valcea~VL|Vaslui~VS|Vrancea~VN"], ["Russian Federation", "RU", "Republic of Adygea~AD|Republic of Altai (Gorno-Altaysk)~AL|Altai Krai~ALT|Amur Oblast~AMU|Arkhangelsk Oblast~ARK|Astrakhan Oblast~AST|Republic of Bashkortostan~BA|Belgorod Oblast~BEL|Bryansk Oblast~BRY|Republic of Buryatia~BU|Chechen Republic~CE|Chelyabinsk Oblast~CHE|Chukotka Autonomous Okrug~CHU|Chuvash Republic~CU|Republic of Dagestan~DA|Republic of Ingushetia~IN|Irkutsk Oblast~IRK|Ivanovo Oblast~IVA|Jewish Autonomous Oblast~JEW|Kabardino-Balkar Republic~KB|Kaliningrad Oblast~KLN|Republic of Kalmykia~KL|Kaluga Oblast~KLU|Kamchatka Krai~KAM|Karachay-Cherkess Republic~KC|Republic of Karelia~KR|Khabarovsk Krai~KHA|Republic of Khakassia~KK|Khanty-Mansi Autonomous Okrug - Yugra~KHM|Kemerovo Oblast~KEM|Kirov Oblast~KIR|Komi Republic~KO|Kostroma Oblast~KOS|Krasnodar Krai~KDA|Krasnoyarsk Krai~KYA|Kurgan Oblast~KGN|Kursk Oblast~KRS|Leningrad Oblast~LEN|Lipetsk Oblast~LIP|Magadan Oblast~MAG|Mari El Republic~ME|Republic of Mordovia~MO|Moscow Oblast~MOS|Moscow~MOW|Murmansk Oblast~MU|Nenets Autonomous Okrug~NEN|Nizhny Novgorod Oblast~NIZ|Novgorod Oblast~NGR|Novosibirsk Oblast~NVS|Omsk Oblast~OMS|Orenburg Oblast~ORE|Oryol Oblast~ORL|Penza Oblast~PNZ|Perm Krai~PER|Primorsky Krai~PRI|Pskov Oblast~PSK|Rostov Oblast~ROS|Ryazan Oblast~RYA|Saint Petersburg~SPE|Sakha (Yakutia) Republic~SA|Sakhalin Oblast~SAK|Samara Oblast~SAM|Saratov Oblast~SAR|Republic of North Ossetia-Alania~NOA|Smolensk Oblast~SMO|Stavropol Krai~STA|Sverdlovsk Oblast~SVE|Tambov Oblast~TAM|Republic of Tatarstan~TA|Tomsk Oblast~TOM|Tuva Republic~TU|Tula Oblast~TUL|Tver Oblast~TVE|Tyumen Oblast~TYU|Udmurt Republic~UD|Ulyanovsk Oblast~ULY|Vladimir Oblast~VLA|Volgograd Oblast~VGG|Vologda Oblast~VLG|Voronezh Oblast~VOR|Yamalo-Nenets Autonomous Okrug~YAN|Yaroslavl Oblast~YAR|Zabaykalsky Krai~ZAB"], ["Rwanda", "RW", "Kigali~01|Eastern~02|Northern~03|Western~04|Southern~05"], ["Saint Barthélemy", "BL", "Au Vent~02|Sous le Vent~01"], ["Saint Helena, Ascension and Tristan da Cunha", "SH", "Ascension~AC|Saint Helena~HL|Tristan da Cunha~TA"], ["Saint Kitts and Nevis", "KN", "Saint Kitts~K|Nevis~N"], ["Saint Lucia", "LC", "Anse-la-Raye~01|Canaries~12|Castries~02|Choiseul~03|Dennery~05|Gros Islet~06|Laborie~07|Micoud~08|Soufriere~10|Vieux Fort~11"], ["Saint Martin", "MF", "Saint Martin"], ["Saint Pierre and Miquelon", "PM", "Miquelon|Saint Pierre"], ["Saint Vincent and the Grenadines", "VC", "Charlotte~01|Grenadines~06|Saint Andrew~02|Saint David~03|Saint George~04|Saint Patrick~05"], ["Samoa", "WS", "A'ana~AA|Aiga-i-le-Tai~AL|Atua~AT|Fa'asaleleaga~FA|Gaga'emauga~GE|Gagaifomauga~GI|Palauli~PA|Satupa'itea~SA|Tuamasaga~TU|Va'a-o-Fonoti~VF|Vaisigano~VS"], ["San Marino", "SM", "Acquaviva~01|Borgo Maggiore~06|Chiesanuova~02|Domagnano~03|Faetano~04|Fiorentino~05|Montegiardino~08|San Marino~07|Serravalle~09"], ["Sao Tome and Principe", "ST", "Principe~P|Sao Tome~S"], ["Saudi Arabia", "SA", "'Asir~14|Al Bahah~11|Al Hudud ash Shamaliyah~08|Al Jawf~12|Al Madinah al Munawwarah~03|Al Qasim~05|Ar Riyad~01|Ash Sharqiyah~04|Ha'il~06|Jazan~09|Makkah al Mukarramah~02|Najran~10|Tabuk~07"], ["Senegal", "SN", "Dakar~DK|Diourbel~DB|Fatick~FK|Kaffrine~KA|Kaolack~KL|Kedougou~KE|Kolda~KD|Louga~LG|Matam~MT|Saint-Louis~SL|Sedhiou~SE|Tambacounda~TC|Thies~TH|Ziguinchor~ZG"], ["Serbia", "RS", "Beograd (Belgrade)~00|Borski~14|Braničevski~11|Jablanički~23|Južnobački~06|Južnobanatski~04|Kolubarski~09|Kosovski~25|Kosovsko-Mitrovački~28|Kosovsko-Pomoravski~29|Mačvanski~08|Moravički~17|Nišavski~20|Pčinjski~24|Pećki~26|Pirotski~22|Podunavski~10|Pomoravski~13|Prizrenski~27|Rasinski~19|Raški~18|Severnobački~01|Severnobanatski~03|Srednjebanatski~02|Sremski~07|Šumadijski~12|Toplički~21|Zaječarski~15|Zapadnobački~05|Zlatiborski~16"], ["Seychelles", "SC", "Anse aux Pins~01|Anse Boileau~02|Anse Etoile~03|Anse Royale~05|Anu Cap~04|Baie Lazare~06|Baie Sainte Anne~07|Beau Vallon~08|Bel Air~09|Bel Ombre~10|Cascade~11|Glacis~12|Grand'Anse Mahe~13|Grand'Anse Praslin~14|La Digue~15|La Riviere Anglaise~16|Les Mamelles~24|Mont Buxton~17|Mont Fleuri~18|Plaisance~19|Pointe La Rue~20|Port Glaud~21|Roche Caiman~25|Saint Louis~22|Takamaka~23"], ["Sierra Leone", "SL", "Eastern~E|Northern~N|Southern~S|Western~W"], ["Singapore", "SG", "Central Singapore~01|North East~02|North West~03|South East~04|South West~05"], ["Sint Maarten (Dutch part)", "SX", "Sint Maarten"], ["Slovakia", "SK", "Banskobystricky~BC|Bratislavsky~BL|Kosicky~KI|Nitriansky~NI|Presovsky~PV|Trenciansky~TC|Trnavsky~TA|Zilinsky~ZI"], ["Slovenia", "SI", "Ajdovscina~001|Apace~195|Beltinci~002|Benedikt~148|Bistrica ob Sotli~149|Bled~003|Bloke~150|Bohinj~004|Borovnica~005|Bovec~006|Braslovce~151|Brda~007|Brezice~009|Brezovica~008|Cankova~152|Celje~011|Cerklje na Gorenjskem~012|Cerknica~013|Cerkno~014|Cerkvenjak~153|Cirkulane~196|Crensovci~015|Crna na Koroskem~016|Crnomelj~017|Destrnik~018|Divaca~019|Dobje~154|Dobrepolje~020|Dobrna~155|Dobrova-Polhov Gradec~021|Dobrovnik~156|Dol pri Ljubljani~022|Dolenjske Toplice~157|Domzale~023|Dornava~024|Dravograd~025|Duplek~026|Gorenja Vas-Poljane~027|Gorisnica~028|Gorje~207|Gornja Radgona~029|Gornji Grad~030|Gornji Petrovci~031|Grad~158|Grosuplje~032|Hajdina~159|Hoce-Slivnica~160|Hodos~161|Horjul~162|Hrastnik~034|Hrpelje-Kozina~035|Idrija~036|Ig~037|Ilirska Bistrica~038|Ivancna Gorica~039|Izola~040s|Jesenice~041|Jursinci~042|Kamnik~043|Kanal~044|Kidricevo~045|Kobarid~046|Kobilje~047|Kocevje~048|Komen~049|Komenda~164|Koper~050|Kodanjevica na Krki~197|Kostel~165|Kozje~051|Kranj~052|Kranjska Gora~053|Krizevci~166|Krsko~054|Kungota~055|Kuzma~056|Lasko~057|Lenart~058|Lendava~059|Litija~068|Ljubljana~061|Ljubno~062|Ljutomer~063|Log-Dragomer~208|Logatec~064|Loska Dolina~065|Loski Potok~066|Lovrenc na Pohorju~167|Lukovica~068|Luce~067|Majsperk~069|Makole~198|Maribor~070|Markovci~168|Medvode~071|Menges~072|Metlika~073|Mezica~074|Miklavz na Dravskem Polju~169|Miren-Kostanjevica~075|Mirna~212|Mirna Pec~170|Mislinja~076|Mokronog-Trebelno~199|Moravce~077|Moravske Toplice~078|Mozirje~079|Murska Sobota~080|Naklo~082|Nazarje~083|Nova Gorica~084|Novo Mesto~085|Odranci~086|Ormoz~087|Osilnica~088|Pesnica~089|Piran~090|Pivka~091|Podcetrtek~092|Podlehnik~172|Podvelka~093|Poljcane~200|Postojna~094|Prebold~174|Preddvor~095|Prevalje~175|Ptuj~096|Race-Fram~098|Radece~099|Radenci~100|Radlje ob Dravi~101|Radovljica~102|Ravne na Koroskem~103|Razkrizje~176|Recica ob Savinji~209|Rence-Vogrsko~201|Ribnica~104|Ribnica na Poboriu~177|Rogaska Slatina~106|Rogasovci~105|Rogatec~107|Ruse~108|Salovci~033|Selnica ob Dravi~178|Semic~109|Sempeter-Vrtojba~183|Sencur~117|Sentilj~118|Sentjernej~119|Sentjur~120|Sentrupert~211|Sevnica~110|Sezana~111|Skocjan~121|Skofja Loka~122|Skofljica~123|Slovenj Gradec~112|Slovenska Bistrica~113|Slovenske Konjice~114|Smarje pri elsah~124|Smarjeske Toplice~206|Smartno ob Paki~125|Smartno pri Litiji~194|Sodrazica~179|Solcava~180|Sostanj~126|Sredisce ob Dravi~202|Starse~115|Store~127|Straza~203|Sveta Ana~181|Sveta Trojica v Slovenskih Goricah~204|Sveta Andraz v Slovenskih Goricah~182|Sveti Jurij~116|Sveti Jurij v Slovenskih Goricah~210|Sveti Tomaz~205|Tabor~184|Tisina~128|Tolmin~128|Trbovlje~129|Trebnje~130|Trnovska Vas~185|Trzin~186|Trzic~131|Turnisce~132|Velenje~133|Velika Polana~187|Velike Lasce~134|Verzej~188|Videm~135|Vipava~136|Vitanje~137|Vodice~138|Vojnik~139|Vransko~189|Vrhnika~140|Vuzenica~141|Zagorje ob Savi~142|Zavrc~143|Zrece~144|Zalec~190|Zelezniki~146|Zetale~191|Ziri~147|Zirovnica~192|Zuzemberk~193"], ["Solomon Islands", "SB", "Central~CE|Choiseul~CH|Guadalcanal~GU|Honiara~CT|Isabel~IS|Makira-Ulawa~MK|Malaita~ML|Rennell and Bellona~RB|Temotu~TE|Western~WE"], ["Somalia", "SO", "Awdal~AW|Bakool~BK|Banaadir~BN|Bari~BR|Bay~BY|Galguduud~GA|Gedo~GE|Hiiraan~HI|Jubbada Dhexe~JD|Jubbada Hoose~JH|Mudug~MU|Nugaal~NU|Sanaag~SA|Shabeellaha Dhexe~SD|Shabeellaha Hoose~SH|Sool~SO|Togdheer~TO|Woqooyi Galbeed~WO"], ["South Africa", "ZA", "Eastern Cape~EC|Free State~FS|Gauteng~GT|KwaZulu-Natal~NL|Limpopo~LP|Mpumalanga~MP|Northern Cape~NC|North West~NW|Western Cape~WC"], ["South Georgia and South Sandwich Islands", "GS", "Bird Island|Bristol Island|Clerke Rocks|Montagu Island|Saunders Island|South Georgia|Southern Thule|Traversay Islands"], ["South Sudan", "SS", "Central Equatoria~CE|Eastern Equatoria~EE|Jonglei~JG|Lakes~LK|Northern Bahr el Ghazal~BN|Unity~UY|Upper Nile~NU|Warrap~WR|Western Bahr el Ghazal~BW|Western Equatoria~EW"], ["Spain", "ES", "Albacete~CM|Alicante~VC|Almería~AN|Araba/Álava~VI|Asturias~O|Ávila~AV|Badajoz~BA|Barcelona~B|Bizkaia~BI|Burgos~BU|Cáceres~CC|Cádiz~CA|Cantabria~S|Castellón~CS|Cueta~CU|Ciudad Real~CR|Córdoba~CO|A Coruña~C|Cuenca~CU|Gipuzkoa~SS|Girona~GI|Granada~GR|Guadalajara~GU|Huelva~H|Huesca~HU|Illes Balears~PM|Jaén~J|León~LE|Lleida~L|Lugo~LU|Madrid~M|Málaga~MA|Melilla~ML|Murcia~MU|Navarre~NA|Ourense~OR|Palencia~P|Las Palmas~GC|Pontevedra~PO|La Rioja~LO|Salamanca~SA|Santa Cruz de Tenerife~TF|Segovia~SG|Sevilla~SE|Soria~SO|Tarragona~T|Teruel~TE|Toledo~TO|Valencia~V|Valladolid~VA|Zamora~ZA|Zaragoza~Z"], ["Sri Lanka", "LK", "Basnahira~1|Dakunu~3|Madhyama~2|Naegenahira~5|Sabaragamuwa~9|Uturu~4|Uturumaeda~7|Vayamba~6|Uva~8"], ["Sudan", "SD", "Al Bahr al Ahmar~RS|Al Jazirah~GZ|Al Khartum~KH|Al Qadarif~GD|An Nil al Abyad~NW|An Nil al Azraq~NB|Ash Shamaliyah~NO|Gharb Darfur~DW|Gharb Kurdufan~GK|Janub Darfur~DS|Janub Kurdufan~KS|Kassala~KA|Nahr an Nil~NR|Shamal Darfur~DN|Sharq Darfur~DE|Shiamal Kurdufan~KN|Sinnar~SI|Wasat Darfur Zalinjay~DC"], ["Suriname", "SR", "Brokopondo~BR|Commewijne~CM|Coronie~CR|Marowijne~MA|Nickerie~NI|Para~PR|Paramaribo~PM|Saramacca~SA|Sipaliwini~SI|Wanica~WA"], ["Swaziland", "SZ", "Hhohho~HH|Lubombo~LU|Manzini~MA|Shiselweni~SH"], ["Sweden", "SE", "Blekinge~K|Dalarnas~W|Gotlands~X|Gavleborgs~I|Hallands~N|Jamtlands~Z|Jonkopings~F|Kalmar~H|Kronobergs~G|Norrbottens~BD|Orebro~T|Ostergotlands~E|Skane~M|Sodermanlands~D|Stockholm~AB|Varmlands~S|Vasterbottens~AC|Vasternorrlands~Y|Vastmanlands~U|Vastra Gotalands~O"], ["Switzerland", "CH", "Aargau~AG|Appenzell Ausserrhoden~AR|Appenzell Innerhoden~AI|Basel-Landschaft~BL|Basel-Stadt~BS|Bern~BE|Fribourg~FR|Genève~GE|Glarus~GL|Graubünden~GR|Jura~JU|Luzern~LU|Neuchâtel~NE|Nidwalden~NW|Obwalden~OW|Sankt Gallen~SG|Schaffhausen~SH|Schwyz~SZ|Solothurn~SO|Thurgau~TG|Ticino~TI|Uri~UR|Valais~VS|Vaud~VD|Zug~ZG|Zürich~ZH"], ["Syrian Arab Republic", "SY", "Al Hasakah~HA|Al Ladhiqiyah~LA|Al Qunaytirah~QU|Ar Raqqah~RA|As Suwayda'~SU|Dar'a~DR|Dayr az Zawr~DY|Dimashq~DI|Halab~HL|Hamah~HM|Hims~HI|Idlib~ID|Rif Dimashq~RD|Tartus~TA"], ["Taiwan", "TW", "Chang-hua~CHA|Chia-i~CYQ|Hsin-chu~HSQ|Hua-lien~HUA|Kao-hsiung~KHH|Keelung~KEE|Kinmen~KIN|Lienchiang~LIE|Miao-li~MIA|Nan-t'ou~NAN|P'eng-hu~PEN|New Taipei~NWT|P'ing-chung~PIF|T'ai-chung~TXG|T'ai-nan~TNN|T'ai-pei~TPE|T'ai-tung~TTT|T'ao-yuan~TAO|Yi-lan~ILA|Yun-lin~YUN"], ["Tajikistan", "TJ", "Dushanbe~DU|Kŭhistoni Badakhshon~GB|Khatlon~KT|Sughd~SU"], ["Tanzania, United Republic of", "TZ", "Arusha~01|Coast~19|Dar es Salaam~02|Dodoma~03|Iringa~04|Kagera~05|Kigoma~08|Kilimanjaro~09|Lindi~12|Manyara~26|Mara~13|Mbeya~14|Morogoro~16|Mtwara~17|Mwanza~18|Pemba North~06|Pemba South~10|Rukwa~20|Ruvuma~21|Shinyanga~22|Singida~23|Tabora~24|Tanga~25|Zanzibar North~07|Zanzibar Central/South~11|Zanzibar Urban/West~15"], ["Thailand", "TH", "Amnat Charoen~37|Ang Thong~15|Bueng Kan~38|Buri Ram~31|Chachoengsao~24|Chai Nat~18|Chaiyaphum~36|Chanthaburi~22|Chiang Mai~50|Chiang Rai~57|Chon Buri~20|Chumphon~86|Kalasin~46|Kamphaeng Phet~62|Kanchanaburi~71|Khon Kaen~40|Krabi~81|Krung Thep Mahanakhon (Bangkok)~10|Lampang~52|Lamphun~51|Loei~42|Lop Buri~16|Mae Hong Son~58|Maha Sarakham~44|Mukdahan~49|Nakhon Nayok~26|Nakhon Phathom~73|Nakhon Phanom~48|Nakhon Ratchasima~30|Nakhon Sawan~60|Nakhon Si Thammarat~80|Nan~55|Narathiwat~96|Nong Bua Lam Phu~39|Nong Khai~43|Nonthaburi~12|Pathum Thani~13|Pattani~94|Phangnga~82|Phatthalung~93|Phayao~56|Phetchabun~76|Phetchaburi~76|Phichit~66|Phitsanulok~65|Phra Nakhon Si Ayutthaya~14|Phrae~54|Phuket~83|Prachin Buri~25|Prachuap Khiri Khan~77|Ranong~85|Ratchaburi~70|Rayong~21|Roi Et~45|Sa Kaeo~27|Sakon Nakhon~47|Samut Prakan~11|Samut Sakhon~74|Samut Songkhram~75|Saraburi~19|Satun~91|Sing Buri~17|Si Sa ket~33|Songkhla~90|Sukhothai~64|Suphan Buri~72|Surat Thani~84|Surin~32|Tak~63|Trang~92|Trat~23|Ubon Ratchathani~34|Udon Thani~41|Uthai Thani~61|Uttaradit~53|Yala~95|Yasothon~35"], ["Timor-Leste", "TL", "Aileu~AL|Ainaro~AN|Baucau~BA|Bobonaro~BO|Cova Lima~CO|Dili~DI|Ermera~ER|Lautem~LA|Liquica~LI|Manatuto~MT|Manufahi~MF|Oecussi~OE|Viqueque~VI"], ["Togo", "TG", "Centre~C|Kara~K|Maritime~M|Plateaux~P|Savannes~S"], ["Tokelau", "TK", "Atafu|Fakaofo|Nukunonu"], ["Tonga", "TO", "'Eua~01|Ha'apai~02|Niuas~03|Tongatapu~04|Vava'u~05"], ["Trinidad and Tobago", "TT", "Arima~ARI|Chaguanas~CHA|Couva-Tabaquite-Talparo~CTT|Diefo Martin~DMN|Mayaro-Rio Claro~MRC|Penal-Debe~PED|Point Fortin~PTF|Port-of-Spain~POS|Princes Town~PRT|San Fernando~SFO|San Juan-Laventille~SJL|Sangre Grande~SGE|Siparia~SIP|Tobago~TOB|Tunapuna-Piarco~TUP"], ["Tunisia", "TN", "Ariana~12|Beja~31|Ben Arous~13|Bizerte~23|Gabes~81|Gafsa~71|Jendouba~32|Kairouan~41|Kasserine~42|Kebili~73|Kef~33|Mahdia~53|Medenine~82|Monastir~52|Nabeul~21|Sfax~61|Sidi Bouzid~43|Siliana~34|Sousse~51|Tataouine~83|Tozeur~72|Tunis~11|Zaghouan~22"], ["Turkey", "TR", "Adana~01|Adiyaman~02|Afyonkarahisar~03|Agri~04|Aksaray~68|Amasya~05|Ankara~06|Antalya~07|Ardahan~75|Artvin~08|Aydin~09|Balikesir~10|Bartin~74|Batman~72|Bayburt~69|Bilecik~11|Bingol~12|Bitlis~13|Bolu~14|Burdur~15|Bursa~16|Canakkale~17|Cankiri~18|Corum~19|Denizli~20|Diyarbakir~21|Duzce~81|Edirne~22|Elazig~23|Erzincan~24|Erzurum~25|Eskisehir~26|Gaziantep~27|Giresun~28|Gumushane~29|Hakkari~30|Hatay~31|Igdir~76|Isparta~32|Istanbul~34|Izmir~35|Kahramanmaras~46|Karabuk~78|Karaman~70|Kars~36|Kastamonu~37|Kayseri~38|Kilis~79|Kirikkale~71|Kirklareli~39|Kirsehir~40|Kocaeli~41|Konya~42|Kutahya~43|Malatya~44|Manisa~45|Mardin~47|Mersin~33|Mugla~48|Mus~49|Nevsehir~50|Nigde~51|Ordu~52|Osmaniye~80|Rize~53|Sakarya~54|Samsun~55|Sanliurfa~63|Siirt~56|Sinop~57|Sirnak~73|Sivas~58|Tekirdag~59|Tokat~60|Trabzon~61|Tunceli~62|Usak~64|Van~65|Yalova~77|Yozgat~66|Zonguldak~67"], ["Turkmenistan", "TM", "Ahal~A|Asgabat~S|Balkan~B|Dashoguz~D|Lebap~L|Mary~M"], ["Turks and Caicos Islands", "TC", "Turks and Caicos Islands"], ["Tuvalu", "TV", "Funafuti~FUN|Nanumanga~NMG|Nanumea~NMA|Niutao~NIT|Nui~NUI|Nukufetau~NKF|Nukulaelae~NKL|Vaitupu~VAU"], ["Uganda", "UG", "Abim~317|Adjumani~301|Amolatar~314|Amuria~216|Amuru~319|Apac~302|Arua~303|Budaka~217|Bududa~223|Bugiri~201|Bukedea~224|Bukwa~218|Buliisa~419|Bundibugyo~401|Bushenyi~402|Busia~202|Butaleja~219|Dokolo~318|Gulu~304|Hoima~403|Ibanda~416|Iganga~203|Isingiro~417|Jinja~204|Kaabong~315|Kabale~404|Kabarole~405|Kaberamaido~213|Kalangala~101|Kaliro~220|Kampala~102|Kamuli~205|Kamwenge~413|Kanungu~414|Kapchorwa~206|Kasese~406|Katakwi~207|Kayunga~112|Kibaale~407|Kiboga~103|Kiruhura~418|Kisoro~408|Kitgum~305|Koboko~316|Kotido~306|Kumi~208|Kyenjojo~415|Lira~307|Luwero~104|Lyantonde~116|Manafwa~221|Maracha~320|Masaka~105|Masindi~409|Mayuge~214|Mbale~209|Mbarara~410|Mityana~114|Moroto~308|Moyo~309|Mpigi~106|Mubende~107|Mukono~108|Nakapiripirit~311|Nakaseke~115|Nakasongola~109|Namutumba~222|Nebbi~310|Ntungamo~411|Oyam~321|Pader~312|Pallisa~210|Rakai~110|Rukungiri~412|Sembabule~111|Sironko~215|Soroti~211|Tororo~212|Wakiso~113|Yumbe~313"], ["Ukraine", "UA", "Cherkasy~71|Chernihiv~74|Chernivtsi~77|Dnipropetrovsk~12|Donetsk~14|Ivano-Frankivsk~26|Kharkiv~63|Kherson~65|Khmelnytskyi~68|Kiev~32|Kirovohrad~35|Luhansk~09|Lviv~46|Mykolaiv~48|Odessa~51|Poltava~53|Rivne~56|Sumy~59|Ternopil~61|Vinnytsia~05|Volyn~07|Zakarpattia~21|Zaporizhia~23|Zhytomyr~18|Avtonomna Respublika Krym~43|Kyïv~30|Sevastopol~40"], ["United Arab Emirates", "AE", "Abu Dhabi~AZ|Ajman~AJ|Dubai~DU|Fujairah~FU|Ras al Khaimah~RK|Sharjah~SH|Umm Al Quwain~UQ"], ["United Kingdom", "GB", "Avon~AVN|Bedfordshire~BDF|Berkshire~BRK|Bristol, City of~COB|Buckinghamshire~BKM|Cambridgeshire~CAM|Cheshire~CHS|Cleveland~CLV|Cornwall~CON|Cumbria~CMA|Derbyshire~DBY|Devon~DEV|Dorset~DOR|Durham~DUR|East Sussex~SXE|Essex~ESS|Gloucestershire~GLS|Greater London~LND|Greater Manchester~GTM|Hampshire (County of Southampton)~HAM|Hereford and Worcester~HWR|Herefordshire~HEF|Hertfordshire~HRT|Isle of Wight~IOW|Kent~KEN|Lancashire~LAN|Leicestershire~LEI|Lincolnshire~LIN|London~LDN|Merseyside~MSY|Middlesex~MDX|Norfolk~NFK|Northamptonshire~NTH|Northumberland~NBL|North Humberside~NHM|North Yorkshire~NYK|Nottinghamshire~NTT|Oxfordshire~OXF|Rutland~RUT|Shropshire~SAL|Somerset~SOM|South Humberside~SHM|South Yorkshire~SYK|Staffordshire~STS|Suffolk~SFK|Surrey~SRY|Tyne and Wear~TWR|Warwickshire~WAR|West Midlands~WMD|West Sussex~SXW|West Yorkshire~WYK|Wiltshire~WIL|Worcestershire~WOR|Antrim~ANT|Armagh~ARM|Belfast, City of~BLF|Down~DOW|Fermanagh~FER|Londonderry~LDY|Derry, City of~DRY|Tyrone~TYR|Aberdeen, City of~AN|Aberdeenshire~ABD|Angus (Forfarshire)~ANS|Argyll~AGB|Ayrshire~ARG|Banffshire~BAN|Berwickshire~BEW|Bute~BUT|Caithness~CAI|Clackmannanshire~CLK|Cromartyshire~COC|Dumfriesshire~DFS|Dunbartonshire (Dumbarton)~DNB|Dundee, City of~DD|East Lothian (Haddingtonshire)~ELN|Edinburgh, City of~EB|Fife~FIF|Glasgow, City of~GLA|Inverness-shire~INV|Kincardineshire~KCD|Kinross-shire~KRS|Kirkcudbrightshire~KKD|Lanarkshire~LKS|Midlothian (County of Edinburgh)~MLN|Moray (Elginshire)~MOR|Nairnshire~NAI|Orkney~OKI|Peeblesshire~PEE|Perthshire~PER|Renfrewshire~RFW|Ross and Cromarty~ROC|Ross-shire~ROS|Roxburghshire~ROX|Selkirkshire~SEL|Shetland (Zetland)~SHI|Stirlingshire~STI|Sutherland~SUT|West Lothian (Linlithgowshire)~WLN|Wigtownshire~WIG|Clwyd~CWD|Dyfed~DFD|Gwent~GNT|Gwynedd~GWN|Mid Glamorgan~MGM|Powys~POW|South Glamorgan~SGM|West Glamorgan~WGM"], ["United States", "US", "Alabama~AL|Alaska~AK|American Samoa~AS|Arizona~AZ|Arkansas~AR|California~CA|Colorado~CO|Connecticut~CT|Delaware~DE|District of Columbia~DC|Micronesia~FM|Florida~FL|Georgia~GA|Guam~GU|Hawaii~HI|Idaho~ID|Illinois~IL|Indiana~IN|Iowa~IA|Kansas~KS|Kentucky~KY|Louisiana~LA|Maine~ME|Marshall Islands~MH|Maryland~MD|Massachusetts~MA|Michigan~MI|Minnesota~MN|Mississippi~MS|Missouri~MO|Montana~MT|Nebraska~NE|Nevada~NV|New Hampshire~NH|New Jersey~NJ|New Mexico~NM|New York~NY|North Carolina~NC|North Dakota~ND|Northern Mariana Islands~MP|Ohio~OH|Oklahoma~OK|Oregon~OR|Palau~PW|Pennsylvania~PA|Puerto Rico~PR|Rhode Island~RI|South Carolina~SC|South Dakota~SD|Tennessee~TN|Texas~TX|Utah~UT|Vermont~VT|Virgin Islands~VI|Virginia~VA|Washington~WA|West Virginia~WV|Wisconsin~WI|Wyoming~WY|Armed Forces Americas~AA|Armed Forces Europe, Canada, Africa and Middle East~AE|Armed Forces Pacific~AP"], ["United States Minor Outlying Islands", "UM", "Baker Island~81|Howland Island~84|Jarvis Island~86|Johnston Atoll~67|Kingman Reef~89|Midway Islands~71|Navassa Island~76|Palmyra Atoll~95|Wake Island~79|Bajo Nuevo Bank~BN|Serranilla Bank~SB"], ["Uruguay", "UY", "Artigas~AR|Canelones~CA|Cerro Largo~CL|Colonia~CO|Durazno~DU|Flores~FS|Florida~FD|Lavalleja~LA|Maldonado~MA|Montevideo~MO|Paysandú~PA|Río Negro~RN|Rivera~RV|Rocha~RO|Salto~SA|San José~SJ|Soriano~SO|Tacuarembó~TA|Treinta y Tres~TT"], ["Uzbekistan", "UZ", "Toshkent shahri~TK|Andijon~AN|Buxoro~BU|Farg‘ona~FA|Jizzax~JI|Namangan~NG|Navoiy~NW|Qashqadaryo (Qarshi)~QA|Samarqand~SA|Sirdaryo (Guliston)~SI|Surxondaryo (Termiz)~SU|Toshkent wiloyati~TO|Xorazm (Urganch)~XO|Qoraqalpog‘iston Respublikasi (Nukus)~QR"], ["Vanuatu", "VU", "Malampa~MAP|Pénama~PAM|Sanma~SAM|Shéfa~SEE|Taféa~TAE|Torba~TOB"], ["Venezuela, Bolivarian Republic of", "VE", "Dependencias Federales~W|Distrito Federal~A|Amazonas~Z|Anzoátegui~B|Apure~C|Aragua~D|Barinas~E|Bolívar~F|Carabobo~G|Cojedes~H|Delta Amacuro~Y|Falcón~I|Guárico~J|Lara~K|Mérida~L|Miranda~M|Monagas~N|Nueva Esparta~O|Portuguesa~P|Sucre~R|Táchira~S|Trujillo~T|Vargas~X|Yaracuy~U|Zulia~V"], ["Vietnam", "VN", "Đồng Nai~39|Đồng Tháp~45|Gia Lai~30|Hà Giang~03|Hà Nam~63|Hà Tây~15|Hà Tĩnh~23|Hải Dương~61|Hậu Giang~73|Hòa Bình~14|Hưng Yên~66|Khánh Hòa~34|Kiên Giang~47|Kon Tum~28|Lai Châu~01|Lâm Đồng~35|Lạng Sơn~09|Lào Cai~02|Long An~41|Nam Định~67|Nghệ An~22|Ninh Bình~18|Ninh Thuận~36|Phú Thọ~68|Phú Yên~32|Quảng Bình~24|Quảng Nam~27|Quảng Ngãi~29|Quảng Ninh~13|Quảng Trị~25|Sóc Trăng~52|Sơn La~05|Tây Ninh~37|Thái Bình~20|Thái Nguyên~69|Thanh Hóa~21|Thừa Thiên–Huế~26|Tiền Giang~46|Trà Vinh~51|Tuyên Quang~07|Vĩnh Long~49|Vĩnh Phúc~70|Yên Bái~06|Cần Thơ~CT|Đà Nẵng~DN|Hà Nội~HN|Hải Phòng~HP|Hồ Chí Minh (Sài Gòn)~SG"], ["Virgin Islands, British", "VG", "Anegada~ANG|Jost Van Dyke~JVD|Tortola~TTA|Virgin Gorda~VGD"], ["Virgin Islands, U.S.", "VI", "St. Thomas~STH|St. John~SJO|St. Croix~SCR"], ["Wallis and Futuna", "WF", "Alo~ALO|Sigave~SIG|Wallis~WAL"], ["Western Sahara", "EH", "Es Smara~ESM|Boujdour~BOD|Laâyoune~LAA|Aousserd~AOU|Oued ed Dahab~OUD"], ["Yemen", "YE", "Abyān~AB|'Adan~AD|Aḑ Ḑāli'~DA|Al Bayḑā'~BA|Al Ḩudaydah~HU|Al Jawf~JA|Al Mahrah~MR|Al Maḩwīt~MW|'Amrān~AM|Dhamār~DH|Ḩaḑramawt~HD|Ḩajjah~HJ|Ibb~IB|Laḩij~LA|Ma'rib~MA|Raymah~RA|Şā‘dah~SD|Şan‘ā'~SN|Shabwah~SH|Tā‘izz~TA"], ["Zambia", "ZM", "Central~02|Copperbelt~08|Eastern~03|Luapula~04|Lusaka~09|Northern~05|North-Western~06|Southern~07|Western~01"], ["Zimbabwe", "ZW", "Bulawayo~BU|Harare~HA|Manicaland~MA|Mashonaland Central~MC|Mashonaland East~ME|Mashonaland West~MW|Masvingo~MV|Matabeleland North~MN|Matabeleland South~MS|Midlands~MI"]], a = function () { $(".crs-country").each(n) }, n = function () { var a = this; if ("true" !== a.getAttribute("data-crs-loaded")) { a.length = 0; var n = $(a).attr("data-default-option"), i = n || "Select country", e = a.getAttribute("data-show-default-option"); m = null === e || "true" === e; var r = $(a).attr("data-default-value"), o = $(a).attr("data-value"), l = 0; m && (this.options[0] = new Option(i, "")), k({ whitelist: a.getAttribute("data-whitelist"), blacklist: a.getAttribute("data-blacklist"), preferred: a.getAttribute("data-preferred"), preferredDelim: a.getAttribute("data-preferred-delim") }); for (var t = 0; t < M.length; t++) { var s = "shortcode" == o || "2-char" === o ? M[t][1] : M[t][0]; M[t][4] && (s = ""), a.options[a.length] = new Option(M[t][0], s), null != r && r === s && (l = t, m && l++) } this.selectedIndex = l; var u = $(a).attr("data-region-id"); if (u) { var d = $("#" + u)[0]; if (d) if (B(d), $(this).on("change", function () { b(a, d) }), r && 0 < a.selectedIndex) { b(a, d); var h = $(d).attr("data-default-value"), S = "shortcode" === d.getAttribute("data-value"); if (null !== h) { var A = m ? a.selectedIndex - 1 : a.selectedIndex, g = M[A][3]; c(d, g, h, S) } } else !1 === m && b(a, d); else console.error("Region dropdown DOM node with ID " + u + " not found."); a.setAttribute("data-crs-loaded", "true") } else console.error("Missing data-region-id on country-region-selector country field.") } }, B = function (a) { var n = $(a).attr("data-blank-option"), i = n || "-", e = a.getAttribute("data-show-default-option"); h = null === e || "true" === e, a.length = 0, h && (a.options[0] = new Option(i, ""), a.selectedIndex = 0) }, k = function (a) { var n = l, i = [], e = 0; if (a.whitelist) { var r = a.whitelist.split(","); for (e = 0; e < l.length; e++)-1 !== r.indexOf(l[e][1]) && i.push(l[e]); n = i } else if (a.blacklist) { var o = a.blacklist.split(","); for (e = 0; e < l.length; e++)-1 === o.indexOf(l[e][1]) && i.push(l[e]); n = i } a.preferred && (n = s(n, a.preferred, a.preferredDelim)), M = n, t() }, t = function () { for (var a = 0; a < M.length; a++) { for (var n = { hasShortcodes: /~/.test(M[a][2]), regions: [] }, i = M[a][2].split("|"), e = 0; e < i.length; e++) { var r = i[e].split("~"); n.regions.push([r[0], r[1]]) } M[a][3] = n } }, c = function (a, n, i, e) { for (var r = 0; r < n.regions.length; r++) { if ((e && n.hasShortcodes && n.regions[r][1] ? n.regions[r][1] : n.regions[r][0]) === i) { a.selectedIndex = h ? r + 1 : r; break } } }, b = function (a, n) { var i = m ? a.selectedIndex - 1 : a.selectedIndex, e = $(n).attr("data-default-option"), r = n.getAttribute("data-value"), o = e || "Select region"; if ("" === a.value) B(n); else { n.length = 0, h && (n.options[0] = new Option(o, "")); var l = M[i][3], t = "shortcode" === r && l.hasShortcodes, s = t ? 1 : 0; l.regions.sort(function (a, n) { var i = a[s].toLowerCase(), e = n[s].toLowerCase(); return i < e ? -1 : e < i ? 1 : 0 }); for (var u = 0; u < l.regions.length; u++) { var d = t ? l.regions[u][1] : l.regions[u][0]; n.options[n.length] = new Option(l.regions[u][0], d) } n.selectedIndex = 0 } }, s = function (a, n, i) { var e = n.split(",").reverse(), r = {}, o = !1, l = a.filter(function (a) { return -1 === e.indexOf(a[1]) || (r[a[1]] = a, !(o = !0)) }); o && i && l.unshift([i, "", "", {}, !0]); for (var t = 0; t < e.length; t++) { var s = e[t]; l.unshift(r[s]) } return l }; return $(a), { init: a } });
function r(n,t){for(var i=0;i<t.length;i++){var r=t[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}function Jt(n,t,i){t&&r(n.prototype,t),i&&r(n,i),Object.defineProperty(n,"prototype",{writable:!1})}
/*!
 * Splide.js
 * Version  : 4.1.4
 * License  : MIT
 * Copyright: 2022 Naotoshi Fujita
 */
var n,t;n=this,t=function(){"use strict";var v="(prefers-reduced-motion: reduce)",G=4,rn=5,r={CREATED:1,MOUNTED:2,IDLE:3,MOVING:G,SCROLLING:rn,DRAGGING:6,DESTROYED:7};function D(n){n.length=0}function o(n,t,i){return Array.prototype.slice.call(n,t,i)}function R(n){return n.bind.apply(n,[null].concat(o(arguments,1)))}function on(){}var p=setTimeout;function h(n){return requestAnimationFrame(n)}function u(n,t){return typeof t===n}function un(n){return!c(n)&&u("object",n)}var e=Array.isArray,x=R(u,"function"),C=R(u,"string"),en=R(u,"undefined");function c(n){return null===n}function m(n){try{return n instanceof(n.ownerDocument.defaultView||window).HTMLElement}catch(n){return!1}}function y(n){return e(n)?n:[n]}function g(n,t){y(n).forEach(t)}function b(n,t){return-1<n.indexOf(t)}function k(n,t){return n.push.apply(n,y(t)),n}function A(t,n,i){t&&g(n,function(n){n&&t.classList[i?"add":"remove"](n)})}function M(n,t){A(n,C(t)?t.split(" "):t,!0)}function L(n,t){g(t,n.appendChild.bind(n))}function O(n,i){g(n,function(n){var t=(i||n).parentNode;t&&t.insertBefore(n,i)})}function cn(n,t){return m(n)&&(n.msMatchesSelector||n.matches).call(n,t)}function S(n,t){n=n?o(n.children):[];return t?n.filter(function(n){return cn(n,t)}):n}function fn(n,t){return t?S(n,t)[0]:n.firstElementChild}var E=Object.keys;function w(t,i,n){t&&(n?E(t).reverse():E(t)).forEach(function(n){"__proto__"!==n&&i(t[n],n)})}function an(r){return o(arguments,1).forEach(function(i){w(i,function(n,t){r[t]=i[t]})}),r}function d(i){return o(arguments,1).forEach(function(n){w(n,function(n,t){e(n)?i[t]=n.slice():un(n)?i[t]=d({},un(i[t])?i[t]:{},n):i[t]=n})}),i}function sn(t,n){g(n||E(t),function(n){delete t[n]})}function P(n,i){g(n,function(t){g(i,function(n){t&&t.removeAttribute(n)})})}function I(i,t,r){un(t)?w(t,function(n,t){I(i,t,n)}):g(i,function(n){c(r)||""===r?P(n,t):n.setAttribute(t,String(r))})}function j(n,t,i){n=document.createElement(n);return t&&(C(t)?M:I)(n,t),i&&L(i,n),n}function _(n,t,i){if(en(i))return getComputedStyle(n)[t];c(i)||(n.style[t]=""+i)}function ln(n,t){_(n,"display",t)}function dn(n){n.setActive&&n.setActive()||n.focus({preventScroll:!0})}function z(n,t){return n.getAttribute(t)}function vn(n,t){return n&&n.classList.contains(t)}function N(n){return n.getBoundingClientRect()}function T(n){g(n,function(n){n&&n.parentNode&&n.parentNode.removeChild(n)})}function hn(n){return fn((new DOMParser).parseFromString(n,"text/html").body)}function F(n,t){n.preventDefault(),t&&(n.stopPropagation(),n.stopImmediatePropagation())}function pn(n,t){return n&&n.querySelector(t)}function gn(n,t){return t?o(n.querySelectorAll(t)):[]}function X(n,t){A(n,t,!1)}function mn(n){return n.timeStamp}function W(n){return C(n)?n:n?n+"px":""}var yn="splide",f="data-"+yn;function bn(n,t){if(!n)throw new Error("["+yn+"] "+(t||""))}var Y=Math.min,wn=Math.max,xn=Math.floor,kn=Math.ceil,U=Math.abs;function Sn(n,t,i){return U(n-t)<i}function En(n,t,i,r){var o=Y(t,i),t=wn(t,i);return r?o<n&&n<t:o<=n&&n<=t}function q(n,t,i){var r=Y(t,i),t=wn(t,i);return Y(wn(r,n),t)}function Ln(n){return(0<n)-(n<0)}function On(t,n){return g(n,function(n){t=t.replace("%s",""+n)}),t}function An(n){return n<10?"0"+n:""+n}var _n={};function zn(){var c=[];function i(n,i,r){g(n,function(t){t&&g(i,function(n){n.split(" ").forEach(function(n){n=n.split(".");r(t,n[0],n[1])})})})}return{bind:function(n,t,u,e){i(n,t,function(n,t,i){var r="addEventListener"in n,o=r?n.removeEventListener.bind(n,t,u,e):n.removeListener.bind(n,u);r?n.addEventListener(t,u,e):n.addListener(u),c.push([n,t,i,u,o])})},unbind:function(n,t,o){i(n,t,function(t,i,r){c=c.filter(function(n){return!!(n[0]!==t||n[1]!==i||n[2]!==r||o&&n[3]!==o)||(n[4](),!1)})})},dispatch:function(n,t,i){var r;return"function"==typeof CustomEvent?r=new CustomEvent(t,{bubbles:!0,detail:i}):(r=document.createEvent("CustomEvent")).initCustomEvent(t,!0,!1,i),n.dispatchEvent(r),r},destroy:function(){c.forEach(function(n){n[4]()}),D(c)}}}var B="mounted",H="move",Dn="moved",Mn="click",Pn="active",In="inactive",Rn="visible",Cn="hidden",J="refresh",K="updated",jn="resize",Nn="resized",Tn="scroll",V="scrolled",a="destroy",Gn="navigation:mounted",Fn="autoplay:play",Xn="autoplay:pause",Wn="lazyload:loaded",Yn="sk",Un="sh";function Q(n){var i=n?n.event.bus:document.createDocumentFragment(),r=zn();return n&&n.event.on(a,r.destroy),an(r,{bus:i,on:function(n,t){r.bind(i,y(n).join(" "),function(n){t.apply(t,e(n.detail)?n.detail:[])})},off:R(r.unbind,i),emit:function(n){r.dispatch(i,n,o(arguments,1))}})}function qn(t,n,i,r){var o,u,e=Date.now,c=0,f=!0,a=0;function s(){if(!f){if(c=t?Y((e()-o)/t,1):1,i&&i(c),1<=c&&(n(),o=e(),r&&++a>=r))return l();u=h(s)}}function l(){f=!0}function d(){u&&cancelAnimationFrame(u),f=!(u=c=0)}return{start:function(n){n||d(),o=e()-(n?c*t:0),f=!1,u=h(s)},rewind:function(){o=e(),c=0,i&&i(c)},pause:l,cancel:d,set:function(n){t=n},isPaused:function(){return f}}}function s(n){var t=n;return{set:function(n){t=n},is:function(n){return b(y(n),t)}}}var n="Arrow",Bn=n+"Left",Hn=n+"Right",t=n+"Up",n=n+"Down",Jn="ttb",l={width:["height"],left:["top","right"],right:["bottom","left"],x:["y"],X:["Y"],Y:["X"],ArrowLeft:[t,Hn],ArrowRight:[n,Bn]};var Z="role",$="tabindex",i="aria-",Kn=i+"controls",Vn=i+"current",Qn=i+"selected",nn=i+"label",Zn=i+"labelledby",$n=i+"hidden",nt=i+"orientation",tt=i+"roledescription",it=i+"live",rt=i+"busy",ot=i+"atomic",ut=[Z,$,"disabled",Kn,Vn,nn,Zn,$n,nt,tt],i=yn+"__",et=yn,ct=i+"track",ft=i+"list",at=i+"slide",st=at+"--clone",lt=at+"__container",dt=i+"arrows",vt=i+"arrow",ht=vt+"--prev",pt=vt+"--next",gt=i+"pagination",mt=gt+"__page",yt=i+"progress"+"__bar",bt=i+"toggle",wt=i+"sr",tn="is-active",xt="is-prev",kt="is-next",St="is-visible",Et="is-loading",Lt="is-focus-in",Ot="is-overflow",At=[tn,St,xt,kt,Et,Lt,Ot];var _t="touchstart mousedown",zt="touchmove mousemove",Dt="touchend touchcancel mouseup click";var Mt="slide",Pt="loop",It="fade";function Rt(o,r,t,u){var e,n=Q(o),i=n.on,c=n.emit,f=n.bind,a=o.Components,s=o.root,l=o.options,d=l.isNavigation,v=l.updateOnMove,h=l.i18n,p=l.pagination,g=l.slideFocus,m=a.Direction.resolve,y=z(u,"style"),b=z(u,nn),w=-1<t,x=fn(u,"."+lt);function k(){var n=o.splides.map(function(n){n=n.splide.Components.Slides.getAt(r);return n?n.slide.id:""}).join(" ");I(u,nn,On(h.slideX,(w?t:r)+1)),I(u,Kn,n),I(u,Z,g?"button":""),g&&P(u,tt)}function S(){e||E()}function E(){var n,t,i;e||(n=o.index,(i=L())!==vn(u,tn)&&(A(u,tn,i),I(u,Vn,d&&i||""),c(i?Pn:In,O)),i=function(){if(o.is(It))return L();var n=N(a.Elements.track),t=N(u),i=m("left",!0),r=m("right",!0);return xn(n[i])<=kn(t[i])&&xn(t[r])<=kn(n[r])}(),t=!i&&(!L()||w),o.state.is([G,rn])||I(u,$n,t||""),I(gn(u,l.focusableNodes||""),$,t?-1:""),g&&I(u,$,t?-1:0),i!==vn(u,St)&&(A(u,St,i),c(i?Rn:Cn,O)),i||document.activeElement!==u||(t=a.Slides.getAt(o.index))&&dn(t.slide),A(u,xt,r===n-1),A(u,kt,r===n+1))}function L(){var n=o.index;return n===r||l.cloneStatus&&n===t}var O={index:r,slideIndex:t,slide:u,container:x,isClone:w,mount:function(){w||(u.id=s.id+"-slide"+An(r+1),I(u,Z,p?"tabpanel":"group"),I(u,tt,h.slide),I(u,nn,b||On(h.slideLabel,[r+1,o.length]))),f(u,"click",R(c,Mn,O)),f(u,"keydown",R(c,Yn,O)),i([Dn,Un,V],E),i(Gn,k),v&&i(H,S)},destroy:function(){e=!0,n.destroy(),X(u,At),P(u,ut),I(u,"style",y),I(u,nn,b||"")},update:E,style:function(n,t,i){_(i&&x||u,n,t)},isWithin:function(n,t){return n=U(n-r),(n=w||!l.rewind&&!o.is(Pt)?n:Y(n,o.length-n))<=t}};return O}var Ct=f+"-interval";var jt={passive:!1,capture:!0};var Nt={Spacebar:" ",Right:Hn,Left:Bn,Up:t,Down:n};function Tt(n){return n=C(n)?n:n.key,Nt[n]||n}var Gt="keydown";var Ft=f+"-lazy",Xt=Ft+"-srcset",Wt="["+Ft+"], ["+Xt+"]";var Yt=[" ","Enter"];var Ut=Object.freeze({__proto__:null,Media:function(r,n,o){var u=r.state,t=o.breakpoints||{},e=o.reducedMotion||{},i=zn(),c=[];function f(n){n&&i.destroy()}function a(n,t){t=matchMedia(t);i.bind(t,"change",s),c.push([n,t])}function s(){var n=u.is(7),t=o.direction,i=c.reduce(function(n,t){return d(n,t[1].matches?t[0]:{})},{});sn(o),l(i),o.destroy?r.destroy("completely"===o.destroy):n?(f(!0),r.mount()):t!==o.direction&&r.refresh()}function l(n,t,i){d(o,n),t&&d(Object.getPrototypeOf(o),n),!i&&u.is(1)||r.emit(K,o)}return{setup:function(){var i="min"===o.mediaQuery;E(t).sort(function(n,t){return i?+n-+t:+t-+n}).forEach(function(n){a(t[n],"("+(i?"min":"max")+"-width:"+n+"px)")}),a(e,v),s()},destroy:f,reduce:function(n){matchMedia(v).matches&&(n?d(o,e):sn(o,E(e)))},set:l}},Direction:function(n,t,o){return{resolve:function(n,t,i){var r="rtl"!==(i=i||o.direction)||t?i===Jn?0:-1:1;return l[n]&&l[n][r]||n.replace(/width|left|right/i,function(n,t){n=l[n.toLowerCase()][r]||n;return 0<t?n.charAt(0).toUpperCase()+n.slice(1):n})},orient:function(n){return n*("rtl"===o.direction?1:-1)}}},Elements:function(n,t,i){var r,o,u,e=Q(n),c=e.on,f=e.bind,a=n.root,s=i.i18n,l={},d=[],v=[],h=[];function p(){r=y("."+ct),o=fn(r,"."+ft),bn(r&&o,"A track/list element is missing."),k(d,S(o,"."+at+":not(."+st+")")),w({arrows:dt,pagination:gt,prev:ht,next:pt,bar:yt,toggle:bt},function(n,t){l[t]=y("."+n)}),an(l,{root:a,track:r,list:o,slides:d});var n=a.id||function(n){return""+n+An(_n[n]=(_n[n]||0)+1)}(yn),t=i.role;a.id=n,r.id=r.id||n+"-track",o.id=o.id||n+"-list",!z(a,Z)&&"SECTION"!==a.tagName&&t&&I(a,Z,t),I(a,tt,s.carousel),I(o,Z,"presentation"),m()}function g(n){var t=ut.concat("style");D(d),X(a,v),X(r,h),P([r,o],t),P(a,n?t:["style",tt])}function m(){X(a,v),X(r,h),v=b(et),h=b(ct),M(a,v),M(r,h),I(a,nn,i.label),I(a,Zn,i.labelledby)}function y(n){n=pn(a,n);return n&&function(n,t){if(x(n.closest))return n.closest(t);for(var i=n;i&&1===i.nodeType&&!cn(i,t);)i=i.parentElement;return i}(n,"."+et)===a?n:void 0}function b(n){return[n+"--"+i.type,n+"--"+i.direction,i.drag&&n+"--draggable",i.isNavigation&&n+"--nav",n===et&&tn]}return an(l,{setup:p,mount:function(){c(J,g),c(J,p),c(K,m),f(document,_t+" keydown",function(n){u="keydown"===n.type},{capture:!0}),f(a,"focusin",function(){A(a,Lt,!!u)})},destroy:g})},Slides:function(r,o,u){var n=Q(r),t=n.on,e=n.emit,c=n.bind,f=(n=o.Elements).slides,a=n.list,s=[];function i(){f.forEach(function(n,t){d(n,t,-1)})}function l(){h(function(n){n.destroy()}),D(s)}function d(n,t,i){t=Rt(r,t,i,n);t.mount(),s.push(t),s.sort(function(n,t){return n.index-t.index})}function v(n){return n?p(function(n){return!n.isClone}):s}function h(n,t){v(t).forEach(n)}function p(t){return s.filter(x(t)?t:function(n){return C(t)?cn(n.slide,t):b(y(t),n.index)})}return{mount:function(){i(),t(J,l),t(J,i)},destroy:l,update:function(){h(function(n){n.update()})},register:d,get:v,getIn:function(n){var t=o.Controller,i=t.toIndex(n),r=t.hasFocus()?1:u.perPage;return p(function(n){return En(n.index,i,i+r-1)})},getAt:function(n){return p(n)[0]},add:function(n,o){g(n,function(n){var t,i,r;m(n=C(n)?hn(n):n)&&((t=f[o])?O(n,t):L(a,n),M(n,u.classes.slide),t=n,i=R(e,jn),t=gn(t,"img"),(r=t.length)?t.forEach(function(n){c(n,"load error",function(){--r||i()})}):i())}),e(J)},remove:function(n){T(p(n).map(function(n){return n.slide})),e(J)},forEach:h,filter:p,style:function(t,i,r){h(function(n){n.style(t,i,r)})},getLength:function(n){return(n?f:s).length},isEnough:function(){return s.length>u.perPage}}},Layout:function(t,n,i){var r,o,u,e=(a=Q(t)).on,c=a.bind,f=a.emit,a=n.Slides,s=n.Direction.resolve,l=(n=n.Elements).root,d=n.track,v=n.list,h=a.getAt,p=a.style;function g(){r=i.direction===Jn,_(l,"maxWidth",W(i.width)),_(d,s("paddingLeft"),y(!1)),_(d,s("paddingRight"),y(!0)),m(!0)}function m(n){var t=N(l);!n&&o.width===t.width&&o.height===t.height||(_(d,"height",function(){var n="";r&&(bn(n=b(),"height or heightRatio is missing."),n="calc("+n+" - "+y(!1)+" - "+y(!0)+")");return n}()),p(s("marginRight"),W(i.gap)),p("width",i.autoWidth?null:W(i.fixedWidth)||(r?"":w())),p("height",W(i.fixedHeight)||(r?i.autoHeight?null:w():b()),!0),o=t,f(Nn),u!==(u=O())&&(A(l,Ot,u),f("overflow",u)))}function y(n){var t=i.padding,n=s(n?"right":"left");return t&&W(t[n]||(un(t)?0:t))||"0px"}function b(){return W(i.height||N(v).width*i.heightRatio)}function w(){var n=W(i.gap);return"calc((100%"+(n&&" + "+n)+")/"+(i.perPage||1)+(n&&" - "+n)+")"}function x(){return N(v)[s("width")]}function k(n,t){n=h(n||0);return n?N(n.slide)[s("width")]+(t?0:L()):0}function S(n,t){var i,n=h(n);return n?(n=N(n.slide)[s("right")],i=N(v)[s("left")],U(n-i)+(t?0:L())):0}function E(n){return S(t.length-1)-S(0)+k(0,n)}function L(){var n=h(0);return n&&parseFloat(_(n.slide,s("marginRight")))||0}function O(){return t.is(It)||E(!0)>x()}return{mount:function(){var n,t,i;g(),c(window,"resize load",(n=R(f,jn),i=qn(t||0,n,null,1),function(){i.isPaused()&&i.start()})),e([K,J],g),e(jn,m)},resize:m,listSize:x,slideSize:k,sliderSize:E,totalSize:S,getPadding:function(n){return parseFloat(_(d,s("padding"+(n?"Right":"Left"))))||0},isOverflow:O}},Clones:function(c,i,f){var t,r=Q(c),n=r.on,a=i.Elements,s=i.Slides,o=i.Direction.resolve,l=[];function u(){if(n(J,d),n([K,jn],v),t=h()){var o=t,u=s.get().slice(),e=u.length;if(e){for(;u.length<o;)k(u,u);k(u.slice(-o),u.slice(0,o)).forEach(function(n,t){var i=t<o,r=function(n,t){n=n.cloneNode(!0);return M(n,f.classes.clone),n.id=c.root.id+"-clone"+An(t+1),n}(n.slide,t);i?O(r,u[0].slide):L(a.list,r),k(l,r),s.register(r,t-o+(i?0:e),n.index)})}i.Layout.resize(!0)}}function d(){e(),u()}function e(){T(l),D(l),r.destroy()}function v(){var n=h();t!==n&&(t<n||!n)&&r.emit(J)}function h(){var n,t=f.clones;return c.is(Pt)?en(t)&&(t=(n=f[o("fixedWidth")]&&i.Layout.slideSize(0))&&kn(N(a.track)[o("width")]/n)||f[o("autoWidth")]&&c.length||2*f.perPage):t=0,t}return{mount:u,destroy:e}},Move:function(r,c,o){var e,n=Q(r),t=n.on,f=n.emit,a=r.state.set,u=(n=c.Layout).slideSize,i=n.getPadding,s=n.totalSize,l=n.listSize,d=n.sliderSize,v=(n=c.Direction).resolve,h=n.orient,p=(n=c.Elements).list,g=n.track;function m(){c.Controller.isBusy()||(c.Scroll.cancel(),y(r.index),c.Slides.update())}function y(n){b(S(n,!0))}function b(n,t){r.is(It)||(t=t?n:function(n){{var t,i;r.is(Pt)&&(t=k(n),i=t>c.Controller.getEnd(),(t<0||i)&&(n=w(n,i)))}return n}(n),_(p,"transform","translate"+v("X")+"("+t+"px)"),n!==t&&f(Un))}function w(n,t){var i=n-L(t),r=d();return n-=h(r*(kn(U(i)/r)||1))*(t?1:-1)}function x(){b(E(),!0),e.cancel()}function k(n){for(var t=c.Slides.get(),i=0,r=1/0,o=0;o<t.length;o++){var u=t[o].index,e=U(S(u,!0)-n);if(!(e<=r))break;r=e,i=u}return i}function S(n,t){var i=h(s(n-1)-(n=n,"center"===(i=o.focus)?(l()-u(n,!0))/2:+i*u(n)||0));return t?(n=i,n=o.trimSpace&&r.is(Mt)?q(n,0,h(d(!0)-l())):n):i}function E(){var n=v("left");return N(p)[n]-N(g)[n]+h(i(!1))}function L(n){return S(n?c.Controller.getEnd():0,!!o.trimSpace)}return{mount:function(){e=c.Transition,t([B,Nn,K,J],m)},move:function(n,t,i,r){var o,u;n!==t&&(o=i<n,u=h(w(E(),o)),o?0<=u:u<=p[v("scrollWidth")]-N(g)[v("width")])&&(x(),b(w(E(),i<n),!0)),a(G),f(H,t,i,n),e.start(t,function(){a(3),f(Dn,t,i,n),r&&r()})},jump:y,translate:b,shift:w,cancel:x,toIndex:k,toPosition:S,getPosition:E,getLimit:L,exceededLimit:function(n,t){t=en(t)?E():t;var i=!0!==n&&h(t)<h(L(!1)),n=!1!==n&&h(t)>h(L(!0));return i||n},reposition:m}},Controller:function(o,u,e){var c,f,a,s,n=Q(o),t=n.on,i=n.emit,l=u.Move,d=l.getPosition,r=l.getLimit,v=l.toPosition,h=(n=u.Slides).isEnough,p=n.getLength,g=e.omitEnd,m=o.is(Pt),y=o.is(Mt),b=R(L,!1),w=R(L,!0),x=e.start||0,k=x;function S(){f=p(!0),a=e.perMove,s=e.perPage,c=_();var n=q(x,0,g?c:f-1);n!==x&&(x=n,l.reposition())}function E(){c!==_()&&i("ei")}function L(n,t){var i=a||(P()?1:s),i=O(x+i*(n?-1:1),x,!(a||P()));return-1===i&&y&&!Sn(d(),r(!n),1)?n?0:c:t?i:A(i)}function O(n,t,i){var r;return h()||P()?((r=function(n){if(y&&"move"===e.trimSpace&&n!==x)for(var t=d();t===v(n,!0)&&En(n,0,o.length-1,!e.rewind);)n<x?--n:++n;return n}(n))!==n&&(t=n,n=r,i=!1),n<0||c<n?n=a||!En(0,n,t,!0)&&!En(c,t,n,!0)?m?i?n<0?-(f%s||s):f:n:e.rewind?n<0?c:0:-1:z(D(n)):i&&n!==t&&(n=z(D(t)+(n<t?-1:1)))):n=-1,n}function A(n){return m?(n+f)%f||0:n}function _(){for(var n=f-(P()||m&&a?1:s);g&&0<n--;)if(v(f-1,!0)!==v(n,!0)){n++;break}return q(n,0,f-1)}function z(n){return q(P()?n:s*n,0,c)}function D(n){return P()?Y(n,c):xn((c<=n?f-1:n)/s)}function M(n){n!==x&&(k=x,x=n)}function P(){return!en(e.focus)||e.isNavigation}function I(){return o.state.is([G,rn])&&!!e.waitForTransition}return{mount:function(){S(),t([K,J,"ei"],S),t(Nn,E)},go:function(n,t,i){var r;I()||-1<(r=A(n=function(n){var t=x;{var i,r;C(n)?(r=n.match(/([+\-<>])(\d+)?/)||[],i=r[1],r=r[2],"+"===i||"-"===i?t=O(x+ +(""+i+(+r||1)),x):">"===i?t=r?z(+r):b(!0):"<"===i&&(t=w(!0))):t=m?n:q(n,0,c)}return t}(n)))&&(t||r!==x)&&(M(r),l.move(n,r,k,i))},scroll:function(n,t,i,r){u.Scroll.scroll(n,t,i,function(){var n=A(l.toIndex(d()));M(g?Y(n,c):n),r&&r()})},getNext:b,getPrev:w,getAdjacent:L,getEnd:_,setIndex:M,getIndex:function(n){return n?k:x},toIndex:z,toPage:D,toDest:function(n){return n=l.toIndex(n),y?q(n,0,c):n},hasFocus:P,isBusy:I}},Arrows:function(o,n,t){var i,r,u=Q(o),e=u.on,c=u.bind,f=u.emit,a=t.classes,s=t.i18n,l=n.Elements,d=n.Controller,v=l.arrows,h=l.track,p=v,g=l.prev,m=l.next,y={};function b(){var n=t.arrows;!n||g&&m||(p=v||j("div",a.arrows),g=S(!0),m=S(!1),i=!0,L(p,[g,m]),v||O(p,h)),g&&m&&(an(y,{prev:g,next:m}),ln(p,n?"":"none"),M(p,r=dt+"--"+t.direction),n&&(e([B,Dn,J,V,"ei"],E),c(m,"click",R(k,">")),c(g,"click",R(k,"<")),E(),I([g,m],Kn,h.id),f("arrows:mounted",g,m))),e(K,w)}function w(){x(),b()}function x(){u.destroy(),X(p,r),i?(T(v?[g,m]:p),g=m=null):P([g,m],ut)}function k(n){d.go(n,!0)}function S(n){return hn('<button class="'+a.arrow+" "+(n?a.prev:a.next)+'" type="button"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40" focusable="false"><path d="'+(t.arrowPath||"m15.5 0.932-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.6z")+'" />')}function E(){var n,t,i,r;g&&m&&(r=o.index,n=d.getPrev(),t=d.getNext(),i=-1<n&&r<n?s.last:s.prev,r=-1<t&&t<r?s.first:s.next,g.disabled=n<0,m.disabled=t<0,I(g,nn,i),I(m,nn,r),f("arrows:updated",g,m,n,t))}return{arrows:y,mount:b,destroy:x,update:E}},Autoplay:function(n,t,i){var r,o,u=Q(n),e=u.on,c=u.bind,f=u.emit,a=qn(i.interval,n.go.bind(n,">"),function(n){var t=l.bar;t&&_(t,"width",100*n+"%"),f("autoplay:playing",n)}),s=a.isPaused,l=t.Elements,d=(u=t.Elements).root,v=u.toggle,h=i.autoplay,p="pause"===h;function g(){s()&&t.Slides.isEnough()&&(a.start(!i.resetProgress),o=r=p=!1,b(),f(Fn))}function m(n){p=!!(n=void 0===n?!0:n),b(),s()||(a.pause(),f(Xn))}function y(){p||(r||o?m(!1):g())}function b(){v&&(A(v,tn,!p),I(v,nn,i.i18n[p?"play":"pause"]))}function w(n){n=t.Slides.getAt(n);a.set(n&&+z(n.slide,Ct)||i.interval)}return{mount:function(){h&&(i.pauseOnHover&&c(d,"mouseenter mouseleave",function(n){r="mouseenter"===n.type,y()}),i.pauseOnFocus&&c(d,"focusin focusout",function(n){o="focusin"===n.type,y()}),v&&c(v,"click",function(){p?g():m(!0)}),e([H,Tn,J],a.rewind),e(H,w),v&&I(v,Kn,l.track.id),p||g(),b())},destroy:a.cancel,play:g,pause:m,isPaused:s}},Cover:function(n,t,i){var r=Q(n).on;function o(i){t.Slides.forEach(function(n){var t=fn(n.container||n.slide,"img");t&&t.src&&u(i,t,n)})}function u(n,t,i){i.style("background",n?'center/cover no-repeat url("'+t.src+'")':"",!0),ln(t,n?"none":"")}return{mount:function(){i.cover&&(r(Wn,R(u,!0)),r([B,K,J],R(o,!0)))},destroy:R(o,!1)}},Scroll:function(n,c,u){var f,a,t=Q(n),i=t.on,s=t.emit,l=n.state.set,d=c.Move,v=d.getPosition,e=d.getLimit,h=d.exceededLimit,p=d.translate,g=n.is(Mt),m=1;function y(n,t,i,r,o){var u,e=v(),i=(x(),!i||g&&h()||(i=c.Layout.sliderSize(),u=Ln(n)*i*xn(U(n)/i)||0,n=d.toPosition(c.Controller.toDest(n%i))+u),Sn(e,n,1));m=1,t=i?0:t||wn(U(n-e)/1.5,800),a=r,f=qn(t,b,R(w,e,n,o),1),l(rn),s(Tn),f.start()}function b(){l(3),a&&a(),s(V)}function w(n,t,i,r){var o=v(),r=(n+(t-n)*(t=r,(n=u.easingFunc)?n(t):1-Math.pow(1-t,4))-o)*m;p(o+r),g&&!i&&h()&&(m*=.6,U(r)<10&&y(e(h(!0)),600,!1,a,!0))}function x(){f&&f.cancel()}function r(){f&&!f.isPaused()&&(x(),b())}return{mount:function(){i(H,x),i([K,J],r)},destroy:x,scroll:y,cancel:r}},Drag:function(e,o,c){var f,t,u,a,s,l,d,v,n=Q(e),i=n.on,h=n.emit,p=n.bind,g=n.unbind,m=e.state,y=o.Move,b=o.Scroll,w=o.Controller,x=o.Elements.track,k=o.Media.reduce,r=(n=o.Direction).resolve,S=n.orient,E=y.getPosition,L=y.exceededLimit,O=!1;function j(){var n=c.drag;C(!n),a="free"===n}function N(n){var t,i,r;l=!1,d||(t=R(n),i=n.target,r=c.noDrag,cn(i,"."+mt+", ."+vt)||r&&cn(i,r)||!t&&n.button||(w.isBusy()?F(n,!0):(v=t?x:window,s=m.is([G,rn]),u=null,p(v,zt,A,jt),p(v,Dt,_,jt),y.cancel(),b.cancel(),z(n))))}function A(n){var t,i,r,o,u;m.is(6)||(m.set(6),h("drag")),n.cancelable&&(s?(y.translate(f+D(n)/(O&&e.is(Mt)?5:1)),u=200<M(n),t=O!==(O=L()),(u||t)&&z(n),l=!0,h("dragging"),F(n)):U(D(u=n))>U(D(u,!0))&&(t=n,i=c.dragMinThreshold,r=un(i),o=r&&i.mouse||0,r=(r?i.touch:+i)||10,s=U(D(t))>(R(t)?r:o),F(n)))}function _(n){var t,i,r;m.is(6)&&(m.set(3),h("dragged")),s&&(i=function(n){return E()+Ln(n)*Y(U(n)*(c.flickPower||600),a?1/0:o.Layout.listSize()*(c.flickMaxPages||1))}(t=function(n){if(e.is(Pt)||!O){var t=M(n);if(t&&t<200)return D(n)/t}return 0}(t=n)),r=c.rewind&&c.rewindByDrag,k(!1),a?w.scroll(i,0,c.snap):e.is(It)?w.go(S(Ln(t))<0?r?"<":"-":r?">":"+"):e.is(Mt)&&O&&r?w.go(L(!0)?">":"<"):w.go(w.toDest(i),!0),k(!0),F(n)),g(v,zt,A),g(v,Dt,_),s=!1}function T(n){!d&&l&&F(n,!0)}function z(n){u=t,t=n,f=E()}function D(n,t){return I(n,t)-I(P(n),t)}function M(n){return mn(n)-mn(P(n))}function P(n){return t===n&&u||t}function I(n,t){return(R(n)?n.changedTouches[0]:n)["page"+r(t?"Y":"X")]}function R(n){return"undefined"!=typeof TouchEvent&&n instanceof TouchEvent}function C(n){d=n}return{mount:function(){p(x,zt,on,jt),p(x,Dt,on,jt),p(x,_t,N,jt),p(x,"click",T,{capture:!0}),p(x,"dragstart",F),i([B,K],j)},disable:C,isDragging:function(){return s}}},Keyboard:function(t,n,i){var r,o,u=Q(t),e=u.on,c=u.bind,f=u.unbind,a=t.root,s=n.Direction.resolve;function l(){var n=i.keyboard;n&&(r="global"===n?window:a,c(r,Gt,h))}function d(){f(r,Gt)}function v(){var n=o;o=!0,p(function(){o=n})}function h(n){o||((n=Tt(n))===s(Bn)?t.go("<"):n===s(Hn)&&t.go(">"))}return{mount:function(){l(),e(K,d),e(K,l),e(H,v)},destroy:d,disable:function(n){o=n}}},LazyLoad:function(i,n,o){var t=Q(i),r=t.on,u=t.off,e=t.bind,c=t.emit,f="sequential"===o.lazyLoad,a=[Dn,V],s=[];function l(){D(s),n.Slides.forEach(function(r){gn(r.slide,Wt).forEach(function(n){var t=z(n,Ft),i=z(n,Xt);t===n.src&&i===n.srcset||(t=o.classes.spinner,t=fn(i=n.parentElement,"."+t)||j("span",t,i),s.push([n,r,t]),n.src||ln(n,"none"))})}),(f?p:(u(a),r(a,d),d))()}function d(){(s=s.filter(function(n){var t=o.perPage*((o.preloadPages||1)+1)-1;return!n[1].isWithin(i.index,t)||v(n)})).length||u(a)}function v(n){var t=n[0];M(n[1].slide,Et),e(t,"load error",R(h,n)),I(t,"src",z(t,Ft)),I(t,"srcset",z(t,Xt)),P(t,Ft),P(t,Xt)}function h(n,t){var i=n[0],r=n[1];X(r.slide,Et),"error"!==t.type&&(T(n[2]),ln(i,""),c(Wn,i,r),c(jn)),f&&p()}function p(){s.length&&v(s.shift())}return{mount:function(){o.lazyLoad&&(l(),r(J,l))},destroy:R(D,s),check:d}},Pagination:function(l,n,d){var v,h,t=Q(l),p=t.on,g=t.emit,m=t.bind,y=n.Slides,b=n.Elements,w=n.Controller,x=w.hasFocus,r=w.getIndex,e=w.go,c=n.Direction.resolve,k=b.pagination,S=[];function E(){v&&(T(k?o(v.children):v),X(v,h),D(S),v=null),t.destroy()}function L(n){e(">"+n,!0)}function O(n,t){var i=S.length,r=Tt(t),o=A(),u=-1,o=(r===c(Hn,!1,o)?u=++n%i:r===c(Bn,!1,o)?u=(--n+i)%i:"Home"===r?u=0:"End"===r&&(u=i-1),S[u]);o&&(dn(o.button),e(">"+u),F(t,!0))}function A(){return d.paginationDirection||d.direction}function _(n){return S[w.toPage(n)]}function z(){var n,t=_(r(!0)),i=_(r());t&&(X(n=t.button,tn),P(n,Qn),I(n,$,-1)),i&&(M(n=i.button,tn),I(n,Qn,!0),I(n,$,"")),g("pagination:updated",{list:v,items:S},t,i)}return{items:S,mount:function n(){E(),p([K,J,"ei"],n);var t=d.pagination;if(k&&ln(k,t?"":"none"),t){p([H,Tn,V],z);var t=l.length,i=d.classes,r=d.i18n,o=d.perPage,u=x()?w.getEnd()+1:kn(t/o);M(v=k||j("ul",i.pagination,b.track.parentElement),h=gt+"--"+A()),I(v,Z,"tablist"),I(v,nn,r.select),I(v,nt,A()===Jn?"vertical":"");for(var e=0;e<u;e++){var c=j("li",null,v),f=j("button",{class:i.page,type:"button"},c),a=y.getIn(e).map(function(n){return n.slide.id}),s=!x()&&1<o?r.pageX:r.slideX;m(f,"click",R(L,e)),d.paginationKeyboard&&m(f,"keydown",R(O,e)),I(c,Z,"presentation"),I(f,Z,"tab"),I(f,Kn,a.join(" ")),I(f,nn,On(s,e+1)),I(f,$,-1),S.push({li:c,button:f,page:e})}z(),g("pagination:mounted",{list:v,items:S},_(l.index))}},destroy:E,getAt:_,update:z}},Sync:function(i,n,t){var r=t.isNavigation,o=t.slideFocus,u=[];function e(){var n,t;i.splides.forEach(function(n){n.isParent||(f(i,n.splide),f(n.splide,i))}),r&&(n=Q(i),(t=n.on)(Mn,s),t(Yn,l),t([B,K],a),u.push(n),n.emit(Gn,i.splides))}function c(){u.forEach(function(n){n.destroy()}),D(u)}function f(n,r){n=Q(n);n.on(H,function(n,t,i){r.go(r.is(Pt)?i:n)}),u.push(n)}function a(){I(n.Elements.list,nt,t.direction===Jn?"vertical":"")}function s(n){i.go(n.index)}function l(n,t){b(Yt,Tt(t))&&(s(n),F(t))}return{setup:R(n.Media.set,{slideFocus:en(o)?r:o},!0),mount:e,destroy:c,remount:function(){c(),e()}}},Wheel:function(e,c,f){var n=Q(e).bind,a=0;function t(n){var t,i,r,o,u;n.cancelable&&(t=(u=n.deltaY)<0,i=mn(n),r=f.wheelMinThreshold||0,o=f.wheelSleep||0,U(u)>r&&o<i-a&&(e.go(t?"<":">"),a=i),u=t,f.releaseWheel&&!e.state.is(G)&&-1===c.Controller.getAdjacent(u)||F(n))}return{mount:function(){f.wheel&&n(c.Elements.track,"wheel",t,jt)}}},Live:function(n,t,i){var r=Q(n).on,o=t.Elements.track,u=i.live&&!i.isNavigation,e=j("span",wt),c=qn(90,R(f,!1));function f(n){I(o,rt,n),n?(L(o,e),c.start()):(T(e),c.cancel())}function a(n){u&&I(o,it,n?"off":"polite")}return{mount:function(){u&&(a(!t.Autoplay.isPaused()),I(o,ot,!0),e.textContent="…",r(Fn,R(a,!0)),r(Xn,R(a,!1)),r([Dn,V],R(f,!0)))},disable:a,destroy:function(){P(o,[it,ot,rt]),T(e)}}}}),qt={type:"slide",role:"region",speed:400,perPage:1,cloneStatus:!0,arrows:!0,pagination:!0,paginationKeyboard:!0,interval:5e3,pauseOnHover:!0,pauseOnFocus:!0,resetProgress:!0,easing:"cubic-bezier(0.25, 1, 0.5, 1)",drag:!0,direction:"ltr",trimSpace:!0,focusableNodes:"a, button, textarea, input, select, iframe",live:!0,classes:{slide:at,clone:st,arrows:dt,arrow:vt,prev:ht,next:pt,pagination:gt,page:mt,spinner:i+"spinner"},i18n:{prev:"Previous slide",next:"Next slide",first:"Go to first slide",last:"Go to last slide",slideX:"Go to slide %s",pageX:"Go to page %s",play:"Start autoplay",pause:"Pause autoplay",carousel:"carousel",slide:"slide",select:"Select a slide to show",slideLabel:"%s of %s"},reducedMotion:{speed:0,rewindSpeed:0,autoplay:"pause"}};function Bt(n,t,i){var r=t.Slides;function o(){r.forEach(function(n){n.style("transform","translateX(-"+100*n.index+"%)")})}return{mount:function(){Q(n).on([B,J],o)},start:function(n,t){r.style("transition","opacity "+i.speed+"ms "+i.easing),p(t)},cancel:on}}function Ht(u,n,e){var c,f=n.Move,a=n.Controller,s=n.Scroll,t=n.Elements.list,l=R(_,t,"transition");function i(){l(""),s.cancel()}return{mount:function(){Q(u).bind(t,"transitionend",function(n){n.target===t&&c&&(i(),c())})},start:function(n,t){var i=f.toPosition(n,!0),r=f.getPosition(),o=function(n){var t=e.rewindSpeed;if(u.is(Mt)&&t){var i=a.getIndex(!0),r=a.getEnd();if(0===i&&r<=n||r<=i&&0===n)return t}return e.speed}(n);1<=U(i-r)&&1<=o?e.useScroll?s.scroll(i,o,!1,t):(l("transform "+o+"ms "+e.easing),f.translate(i,!0),c=t):(f.jump(n),t())},cancel:i}}t=function(){function i(n,t){this.event=Q(),this.Components={},this.state=s(1),this.splides=[],this.n={},this.t={};n=C(n)?pn(document,n):n;bn(n,n+" is invalid."),t=d({label:z(this.root=n,nn)||"",labelledby:z(n,Zn)||""},qt,i.defaults,t||{});try{d(t,JSON.parse(z(n,f)))}catch(n){bn(!1,"Invalid JSON")}this.n=Object.create(d({},t))}var n=i.prototype;return n.mount=function(n,t){var i=this,r=this.state,o=this.Components;return bn(r.is([1,7]),"Already mounted!"),r.set(1),this.i=o,this.r=t||this.r||(this.is(It)?Bt:Ht),this.t=n||this.t,w(an({},Ut,this.t,{Transition:this.r}),function(n,t){n=n(i,o,i.n);(o[t]=n).setup&&n.setup()}),w(o,function(n){n.mount&&n.mount()}),this.emit(B),M(this.root,"is-initialized"),r.set(3),this.emit("ready"),this},n.sync=function(n){return this.splides.push({splide:n}),n.splides.push({splide:this,isParent:!0}),this.state.is(3)&&(this.i.Sync.remount(),n.Components.Sync.remount()),this},n.go=function(n){return this.i.Controller.go(n),this},n.on=function(n,t){return this.event.on(n,t),this},n.off=function(n){return this.event.off(n),this},n.emit=function(n){var t;return(t=this.event).emit.apply(t,[n].concat(o(arguments,1))),this},n.add=function(n,t){return this.i.Slides.add(n,t),this},n.remove=function(n){return this.i.Slides.remove(n),this},n.is=function(n){return this.n.type===n},n.refresh=function(){return this.emit(J),this},n.destroy=function(t){void 0===t&&(t=!0);var n=this.event,i=this.state;return i.is(1)?Q(this).on("ready",this.destroy.bind(this,t)):(w(this.i,function(n){n.destroy&&n.destroy(t)},!0),n.emit(a),n.destroy(),t&&D(this.splides),i.set(7)),this},Jt(i,[{key:"options",get:function(){return this.n},set:function(n){this.i.Media.set(n,!0,!0)}},{key:"length",get:function(){return this.i.Slides.getLength(!0)}},{key:"index",get:function(){return this.i.Controller.getIndex()}}]),i}();return t.defaults={},t.STATES=r,t},"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(n="undefined"!=typeof globalThis?globalThis:n||self).Splide=t();
//# sourceMappingURL=splide.min.js.map
/*!
 * @splidejs/splide-extension-grid
 * Version  : 0.4.1
 * License  : MIT
 * Copyright: 2022 Naotoshi Fujita
*/(function(O){typeof define=="function"&&define.amd?define(O):O()})(function(){"use strict";function O(n){n.length=0}function S(n,t,i){return Array.prototype.slice.call(n,t,i)}function T(n){return n.bind.apply(n,[null].concat(S(arguments,1)))}function V(n,t){return typeof t===n}var Q=Array.isArray;T(V,"function"),T(V,"string"),T(V,"undefined");function X(n){return Q(n)?n:[n]}function Z(n,t){X(n).forEach(t)}var hn=Object.keys;function En(n,t,i){if(n){var r=hn(n);r=i?r.reverse():r;for(var f=0;f<r.length;f++){var a=r[f];if(a!=="__proto__"&&t(n[a],a)===!1)break}}return n}function gn(n){return S(arguments,1).forEach(function(t){En(t,function(i,r){n[r]=t[r]})}),n}var j="splide";function mn(){var n=[];function t(u,c,l,v){f(u,c,function(d,g,m){var _="addEventListener"in d,C=_?d.removeEventListener.bind(d,g,l,v):d.removeListener.bind(d,l);_?d.addEventListener(g,l,v):d.addListener(l),n.push([d,g,m,l,C])})}function i(u,c,l){f(u,c,function(v,d,g){n=n.filter(function(m){return m[0]===v&&m[1]===d&&m[2]===g&&(!l||m[3]===l)?(m[4](),!1):!0})})}function r(u,c,l){var v,d=!0;return typeof CustomEvent=="function"?v=new CustomEvent(c,{bubbles:d,detail:l}):(v=document.createEvent("CustomEvent"),v.initCustomEvent(c,d,!1,l)),u.dispatchEvent(v),v}function f(u,c,l){Z(u,function(v){v&&Z(c,function(d){d.split(" ").forEach(function(g){var m=g.split(".");l(v,m[0],m[1])})})})}function a(){n.forEach(function(u){u[4]()}),O(n)}return{bind:t,unbind:i,dispatch:r,destroy:a}}var pn="visible",yn="hidden",H="refresh",wn="updated",_n="destroy";function k(n){var t=n?n.event.bus:document.createDocumentFragment(),i=mn();function r(a,u){i.bind(t,X(a).join(" "),function(c){u.apply(u,Q(c.detail)?c.detail:[])})}function f(a){i.dispatch(t,a,S(arguments,1))}return n&&n.event.on(_n,i.destroy),gn(i,{bus:t,on:r,off:T(i.unbind,t),emit:f})}var Cn=j,$=j+"__slide",An=$+"__container";function nn(n){n.length=0}function I(n,t,i){return Array.prototype.slice.call(n,t,i)}function B(n){return n.bind.apply(n,[null].concat(I(arguments,1)))}function N(n,t){return typeof t===n}function bn(n){return!P(n)&&N("object",n)}var F=Array.isArray;B(N,"function");var G=B(N,"string"),Ln=B(N,"undefined");function P(n){return n===null}function Dn(n){return n instanceof HTMLElement}function U(n){return F(n)?n:[n]}function A(n,t){U(n).forEach(t)}function tn(n,t){return n.push.apply(n,U(t)),n}function rn(n,t,i){n&&A(t,function(r){r&&n.classList[i?"add":"remove"](r)})}function q(n,t){rn(n,G(t)?t.split(" "):t,!0)}function R(n,t){A(t,n.appendChild.bind(n))}function On(n,t){return Dn(n)&&(n.msMatchesSelector||n.matches).call(n,t)}function Tn(n,t){var i=n?I(n.children):[];return t?i.filter(function(r){return On(r,t)}):i}function on(n,t){return t?Tn(n,t)[0]:n.firstElementChild}var en=Object.keys;function un(n,t,i){if(n){var r=en(n);r=i?r.reverse():r;for(var f=0;f<r.length;f++){var a=r[f];if(a!=="__proto__"&&t(n[a],a)===!1)break}}return n}function $n(n){return I(arguments,1).forEach(function(t){un(t,function(i,r){n[r]=t[r]})}),n}function In(n,t){U(t||en(n)).forEach(function(i){delete n[i]})}function J(n,t){A(n,function(i){A(t,function(r){i&&i.removeAttribute(r)})})}function K(n,t,i){bn(t)?un(t,function(r,f){K(n,f,r)}):A(n,function(r){P(i)||i===""?J(r,t):r.setAttribute(t,String(i))})}function fn(n,t,i){var r=document.createElement(n);return t&&(G(t)?q(r,t):K(r,t)),i&&R(i,r),r}function p(n,t,i){if(Ln(i))return getComputedStyle(n)[t];P(i)||(n.style[t]=""+i)}function Nn(n,t){return n&&n.classList.contains(t)}function Rn(n){A(n,function(t){t&&t.parentNode&&t.parentNode.removeChild(t)})}function an(n,t){return t?I(n.querySelectorAll(t)):[]}function cn(n,t){rn(n,t,!1)}function x(n){return G(n)?n:n?n+"px":""}var xn="splide";function Mn(n,t){if(!n)throw new Error("["+xn+"] "+(t||""))}var Sn=Math.min,Un=Math.max,qn=Math.floor,Jn=Math.ceil,Kn=Math.abs;function Vn(n){return n<10?"0"+n:""+n}var sn=$+"__row",z=$+"--col",Hn={rows:1,cols:1,dimensions:[],gap:{}};function Bn(n){function t(){var f=n.rows,a=n.cols,u=n.dimensions;return F(u)&&u.length?u:[[f,a]]}function i(f){var a=t();return a[Sn(f,a.length-1)]}function r(f){for(var a=t(),u,c,l=0,v=0;v<a.length;v++){var d=a[v];if(u=d[0]||1,c=d[1]||1,l+=u*c,f<l)break}return Mn(u&&c,"Invalid dimension"),[u,c]}return{get:i,getAt:r}}function Fn(n,t,i){var r=k(n),f=r.on,a=r.destroy,u=n.Components,c=n.options,l=u.Direction.resolve,v=u.Slides.forEach;function d(){m(),c.slideFocus&&(f(pn,W),f(yn,Y))}function g(){v(function(e){var s=e.slide;D(s,!1),M(s).forEach(function(o){J(o,"style")}),b(s).forEach(function(o){L(o,!0),J(o,"style")})}),a()}function m(){v(function(e){var s=e.slide,o=i.get(e.isClone?e.slideIndex:e.index),h=o[0],E=o[1];_(h,s),C(E,s),b(e.slide).forEach(function(y,w){y.id=e.slide.id+"-col"+Vn(w+1),n.options.cover&&L(y)})})}function _(e,s){var o=t.gap.row,h="calc("+100/e+"%"+(o?" - "+x(o)+" * "+(e-1)/e:"")+")";M(s).forEach(function(E,y,w){p(E,"height",h),p(E,"display","flex"),p(E,"margin","0 0 "+x(o)+" 0"),p(E,"padding",0),y===w.length-1&&p(E,"marginBottom",0)})}function C(e,s){var o=t.gap.col,h="calc("+100/e+"%"+(o?" - "+x(o)+" * "+(e-1)/e:"")+")";b(s).forEach(function(E,y,w){p(E,"width",h),y!==w.length-1&&p(E,l("marginRight"),x(o))})}function L(e,s){var o=on(e,"."+An),h=on(o||e,"img");h&&h.src&&(p(o||e,"background",s?"":'center/cover no-repeat url("'+h.src+'")'),p(h,"display",s?"":"none"))}function M(e){return an(e,"."+sn)}function b(e){return an(e,"."+z)}function D(e,s){b(e).forEach(function(o){K(o,"tabindex",s?0:null)})}function W(e){D(e.slide,!0)}function Y(e){D(e.slide,!1)}return{mount:d,destroy:g}}function Gn(n,t,i){var r=k(n),f=r.on,a=r.off,u=t.Elements,c={},l=Bn(c),v=Fn(n,c,l),d=Cn+"--grid",g=[];function m(){_(),f(wn,_)}function _(){In(c),$n(c,Hn,i.grid||{}),Y()?(C(),tn(g,u.slides),q(n.root,d),R(u.list,b()),a(H),f(H,M),L()):e()&&(C(),L())}function C(){if(e()){var s=u.slides;v.destroy(),g.forEach(function(o){cn(o,z),R(u.list,o)}),Rn(s),cn(n.root,d),nn(s),tn(s,g),nn(g),a(H)}}function L(){n.refresh()}function M(){e()&&v.mount()}function b(){var s=[],o=0,h=0,E,y;return g.forEach(function(w,Pn){var dn=l.getAt(Pn),vn=dn[0],ln=dn[1];h||(o||(E=fn(w.tagName,$),s.push(E)),y=D(vn,w,E)),W(ln,w,y),++h>=ln&&(h=0,o=++o>=vn?0:o)}),s}function D(s,o,h){var E=o.tagName.toLowerCase()==="li"?"ul":"div";return fn(E,sn,h)}function W(s,o,h){return q(o,z),R(h,o),o}function Y(){if(i.grid){var s=c.rows,o=c.cols,h=c.dimensions;return s>1||o>1||F(h)&&h.length>0}return!1}function e(){return Nn(n.root,d)}return{mount:m,destroy:C}}typeof window<"u"&&(window.splide=window.splide||{},window.splide.Extensions=window.splide.Extensions||{},window.splide.Extensions.Grid=Gn)});
//# sourceMappingURL=splide-extension-grid.min.js.map
/*
 * International Telephone Input v18.2.1
 * https://github.com/jackocnr/intl-tel-input.git
 * Licensed under the MIT license
 */

!function(a){var b=function(a,b,c){"use strict";return function(){function d(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function e(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}function f(a,b,c){return b&&e(a.prototype,b),c&&e(a,c),a}for(var g=[["Afghanistan (‫افغانستان‬‎)","af","93"],["Albania (Shqipëri)","al","355"],["Algeria (‫الجزائر‬‎)","dz","213"],["American Samoa","as","1",5,["684"]],["Andorra","ad","376"],["Angola","ao","244"],["Anguilla","ai","1",6,["264"]],["Antigua and Barbuda","ag","1",7,["268"]],["Argentina","ar","54"],["Armenia (Հայաստան)","am","374"],["Aruba","aw","297"],["Australia","au","61",0],["Austria (Österreich)","at","43"],["Azerbaijan (Azərbaycan)","az","994"],["Bahamas","bs","1",8,["242"]],["Bahrain (‫البحرين‬‎)","bh","973"],["Bangladesh (বাংলাদেশ)","bd","880"],["Barbados","bb","1",9,["246"]],["Belarus (Беларусь)","by","375"],["Belgium (België)","be","32"],["Belize","bz","501"],["Benin (Bénin)","bj","229"],["Bermuda","bm","1",10,["441"]],["Bhutan (འབྲུག)","bt","975"],["Bolivia","bo","591"],["Bosnia and Herzegovina (Босна и Херцеговина)","ba","387"],["Botswana","bw","267"],["Brazil (Brasil)","br","55"],["British Indian Ocean Territory","io","246"],["British Virgin Islands","vg","1",11,["284"]],["Brunei","bn","673"],["Bulgaria (България)","bg","359"],["Burkina Faso","bf","226"],["Burundi (Uburundi)","bi","257"],["Cambodia (កម្ពុជា)","kh","855"],["Cameroon (Cameroun)","cm","237"],["Canada","ca","1",1,["204","226","236","249","250","289","306","343","365","387","403","416","418","431","437","438","450","506","514","519","548","579","581","587","604","613","639","647","672","705","709","742","778","780","782","807","819","825","867","873","902","905"]],["Cape Verde (Kabu Verdi)","cv","238"],["Caribbean Netherlands","bq","599",1,["3","4","7"]],["Cayman Islands","ky","1",12,["345"]],["Central African Republic (République centrafricaine)","cf","236"],["Chad (Tchad)","td","235"],["Chile","cl","56"],["China (中国)","cn","86"],["Christmas Island","cx","61",2],["Cocos (Keeling) Islands","cc","61",1],["Colombia","co","57"],["Comoros (‫جزر القمر‬‎)","km","269"],["Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)","cd","243"],["Congo (Republic) (Congo-Brazzaville)","cg","242"],["Cook Islands","ck","682"],["Costa Rica","cr","506"],["Côte d’Ivoire","ci","225"],["Croatia (Hrvatska)","hr","385"],["Cuba","cu","53"],["Curaçao","cw","599",0],["Cyprus (Κύπρος)","cy","357"],["Czech Republic (Česká republika)","cz","420"],["Denmark (Danmark)","dk","45"],["Djibouti","dj","253"],["Dominica","dm","1",13,["767"]],["Dominican Republic (República Dominicana)","do","1",2,["809","829","849"]],["Ecuador","ec","593"],["Egypt (‫مصر‬‎)","eg","20"],["El Salvador","sv","503"],["Equatorial Guinea (Guinea Ecuatorial)","gq","240"],["Eritrea","er","291"],["Estonia (Eesti)","ee","372"],["Ethiopia","et","251"],["Falkland Islands (Islas Malvinas)","fk","500"],["Faroe Islands (Føroyar)","fo","298"],["Fiji","fj","679"],["Finland (Suomi)","fi","358",0],["France","fr","33"],["French Guiana (Guyane française)","gf","594"],["French Polynesia (Polynésie française)","pf","689"],["Gabon","ga","241"],["Gambia","gm","220"],["Georgia (საქართველო)","ge","995"],["Germany (Deutschland)","de","49"],["Ghana (Gaana)","gh","233"],["Gibraltar","gi","350"],["Greece (Ελλάδα)","gr","30"],["Greenland (Kalaallit Nunaat)","gl","299"],["Grenada","gd","1",14,["473"]],["Guadeloupe","gp","590",0],["Guam","gu","1",15,["671"]],["Guatemala","gt","502"],["Guernsey","gg","44",1,["1481","7781","7839","7911"]],["Guinea (Guinée)","gn","224"],["Guinea-Bissau (Guiné Bissau)","gw","245"],["Guyana","gy","592"],["Haiti","ht","509"],["Honduras","hn","504"],["Hong Kong (香港)","hk","852"],["Hungary (Magyarország)","hu","36"],["Iceland (Ísland)","is","354"],["India (भारत)","in","91"],["Indonesia","id","62"],["Iran (‫ایران‬‎)","ir","98"],["Iraq (‫العراق‬‎)","iq","964"],["Ireland","ie","353"],["Isle of Man","im","44",2,["1624","74576","7524","7924","7624"]],["Israel (‫ישראל‬‎)","il","972"],["Italy (Italia)","it","39",0],["Jamaica","jm","1",4,["876","658"]],["Japan (日本)","jp","81"],["Jersey","je","44",3,["1534","7509","7700","7797","7829","7937"]],["Jordan (‫الأردن‬‎)","jo","962"],["Kazakhstan (Казахстан)","kz","7",1,["33","7"]],["Kenya","ke","254"],["Kiribati","ki","686"],["Kosovo","xk","383"],["Kuwait (‫الكويت‬‎)","kw","965"],["Kyrgyzstan (Кыргызстан)","kg","996"],["Laos (ລາວ)","la","856"],["Latvia (Latvija)","lv","371"],["Lebanon (‫لبنان‬‎)","lb","961"],["Lesotho","ls","266"],["Liberia","lr","231"],["Libya (‫ليبيا‬‎)","ly","218"],["Liechtenstein","li","423"],["Lithuania (Lietuva)","lt","370"],["Luxembourg","lu","352"],["Macau (澳門)","mo","853"],["Macedonia (FYROM) (Македонија)","mk","389"],["Madagascar (Madagasikara)","mg","261"],["Malawi","mw","265"],["Malaysia","my","60"],["Maldives","mv","960"],["Mali","ml","223"],["Malta","mt","356"],["Marshall Islands","mh","692"],["Martinique","mq","596"],["Mauritania (‫موريتانيا‬‎)","mr","222"],["Mauritius (Moris)","mu","230"],["Mayotte","yt","262",1,["269","639"]],["Mexico (México)","mx","52"],["Micronesia","fm","691"],["Moldova (Republica Moldova)","md","373"],["Monaco","mc","377"],["Mongolia (Монгол)","mn","976"],["Montenegro (Crna Gora)","me","382"],["Montserrat","ms","1",16,["664"]],["Morocco (‫المغرب‬‎)","ma","212",0],["Mozambique (Moçambique)","mz","258"],["Myanmar (Burma) (မြန်မာ)","mm","95"],["Namibia (Namibië)","na","264"],["Nauru","nr","674"],["Nepal (नेपाल)","np","977"],["Netherlands (Nederland)","nl","31"],["New Caledonia (Nouvelle-Calédonie)","nc","687"],["New Zealand","nz","64"],["Nicaragua","ni","505"],["Niger (Nijar)","ne","227"],["Nigeria","ng","234"],["Niue","nu","683"],["Norfolk Island","nf","672"],["North Korea (조선 민주주의 인민 공화국)","kp","850"],["Northern Mariana Islands","mp","1",17,["670"]],["Norway (Norge)","no","47",0],["Oman (‫عُمان‬‎)","om","968"],["Pakistan (‫پاکستان‬‎)","pk","92"],["Palau","pw","680"],["Palestine (‫فلسطين‬‎)","ps","970"],["Panama (Panamá)","pa","507"],["Papua New Guinea","pg","675"],["Paraguay","py","595"],["Peru (Perú)","pe","51"],["Philippines","ph","63"],["Poland (Polska)","pl","48"],["Portugal","pt","351"],["Puerto Rico","pr","1",3,["787","939"]],["Qatar (‫قطر‬‎)","qa","974"],["Réunion (La Réunion)","re","262",0],["Romania (România)","ro","40"],["Russia (Россия)","ru","7",0],["Rwanda","rw","250"],["Saint Barthélemy","bl","590",1],["Saint Helena","sh","290"],["Saint Kitts and Nevis","kn","1",18,["869"]],["Saint Lucia","lc","1",19,["758"]],["Saint Martin (Saint-Martin (partie française))","mf","590",2],["Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)","pm","508"],["Saint Vincent and the Grenadines","vc","1",20,["784"]],["Samoa","ws","685"],["San Marino","sm","378"],["São Tomé and Príncipe (São Tomé e Príncipe)","st","239"],["Saudi Arabia (‫المملكة العربية السعودية‬‎)","sa","966"],["Senegal (Sénégal)","sn","221"],["Serbia (Србија)","rs","381"],["Seychelles","sc","248"],["Sierra Leone","sl","232"],["Singapore","sg","65"],["Sint Maarten","sx","1",21,["721"]],["Slovakia (Slovensko)","sk","421"],["Slovenia (Slovenija)","si","386"],["Solomon Islands","sb","677"],["Somalia (Soomaaliya)","so","252"],["South Africa","za","27"],["South Korea (대한민국)","kr","82"],["South Sudan (‫جنوب السودان‬‎)","ss","211"],["Spain (España)","es","34"],["Sri Lanka (ශ්‍රී ලංකාව)","lk","94"],["Sudan (‫السودان‬‎)","sd","249"],["Suriname","sr","597"],["Svalbard and Jan Mayen","sj","47",1,["79"]],["Swaziland","sz","268"],["Sweden (Sverige)","se","46"],["Switzerland (Schweiz)","ch","41"],["Syria (‫سوريا‬‎)","sy","963"],["Taiwan (台灣)","tw","886"],["Tajikistan","tj","992"],["Tanzania","tz","255"],["Thailand (ไทย)","th","66"],["Timor-Leste","tl","670"],["Togo","tg","228"],["Tokelau","tk","690"],["Tonga","to","676"],["Trinidad and Tobago","tt","1",22,["868"]],["Tunisia (‫تونس‬‎)","tn","216"],["Turkey (Türkiye)","tr","90"],["Turkmenistan","tm","993"],["Turks and Caicos Islands","tc","1",23,["649"]],["Tuvalu","tv","688"],["U.S. Virgin Islands","vi","1",24,["340"]],["Uganda","ug","256"],["Ukraine (Україна)","ua","380"],["United Arab Emirates (‫الإمارات العربية المتحدة‬‎)","ae","971"],["United Kingdom","gb","44",0],["United States","us","1",0],["Uruguay","uy","598"],["Uzbekistan (Oʻzbekiston)","uz","998"],["Vanuatu","vu","678"],["Vatican City (Città del Vaticano)","va","39",1,["06698"]],["Venezuela","ve","58"],["Vietnam (Việt Nam)","vn","84"],["Wallis and Futuna (Wallis-et-Futuna)","wf","681"],["Western Sahara (‫الصحراء الغربية‬‎)","eh","212",1,["5288","5289"]],["Yemen (‫اليمن‬‎)","ye","967"],["Zambia","zm","260"],["Zimbabwe","zw","263"],["Åland Islands","ax","358",1,["18"]]],h=0;h<g.length;h++){var i=g[h];g[h]={name:i[0],iso2:i[1],dialCode:i[2],priority:i[3]||0,areaCodes:i[4]||null}}a.intlTelInputGlobals={getInstance:function(b){var c=b.getAttribute("data-intl-tel-input-id");return a.intlTelInputGlobals.instances[c]},instances:{}};var j=0,k={allowDropdown:!0,autoHideDialCode:!0,autoPlaceholder:"polite",customContainer:"",customPlaceholder:null,dropdownContainer:null,excludeCountries:[],formatOnDisplay:!0,geoIpLookup:null,hiddenInput:"",initialCountry:"",localizedCountries:null,nationalMode:!0,onlyCountries:[],placeholderNumberType:"MOBILE",preferredCountries:["us","gb"],separateDialCode:!1,utilsScript:""},l=["800","822","833","844","855","866","877","880","881","882","883","884","885","886","887","888","889"];a.addEventListener("load",function(){a.intlTelInputGlobals.windowLoaded=!0});var m=function(a,b){for(var c=Object.keys(a),d=0;d<c.length;d++)b(c[d],a[c[d]])},n=function(b){m(a.intlTelInputGlobals.instances,function(c){a.intlTelInputGlobals.instances[c][b]()})},o=function(){function e(a,b){var c=this;d(this,e),this.id=j++,this.a=a,this.b=null,this.c=null;var f=b||{};this.d={},m(k,function(a,b){c.d[a]=f.hasOwnProperty(a)?f[a]:b}),this.e=Boolean(a.getAttribute("placeholder"))}return f(e,[{key:"_init",value:function(){var a=this;if(this.d.nationalMode&&(this.d.autoHideDialCode=!1),this.d.separateDialCode&&(this.d.autoHideDialCode=this.d.nationalMode=!1),this.g=/Android.+Mobile|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),this.g&&(b.body.classList.add("iti-mobile"),this.d.dropdownContainer||(this.d.dropdownContainer=b.body)),"undefined"!=typeof Promise){var c=new Promise(function(b,c){a.h=b,a.i=c}),d=new Promise(function(b,c){a.i0=b,a.i1=c});this.promise=Promise.all([c,d])}else this.h=this.i=function(){},this.i0=this.i1=function(){};this.s={},this._b(),this._f(),this._h(),this._i(),this._i3()}},{key:"_b",value:function(){this._d(),this._d2(),this._e(),this.d.localizedCountries&&this._d0(),(this.d.onlyCountries.length||this.d.localizedCountries)&&this.p.sort(this._d1)}},{key:"_c",value:function(a,b,d){b.length>this.dialCodeMaxLen&&(this.dialCodeMaxLen=b.length),this.q.hasOwnProperty(b)||(this.q[b]=[]);for(var e=0;e<this.q[b].length;e++)if(this.q[b][e]===a)return;var f=d!==c?d:this.q[b].length;this.q[b][f]=a}},{key:"_d",value:function(){if(this.d.onlyCountries.length){var a=this.d.onlyCountries.map(function(a){return a.toLowerCase()});this.p=g.filter(function(b){return a.indexOf(b.iso2)>-1})}else if(this.d.excludeCountries.length){var b=this.d.excludeCountries.map(function(a){return a.toLowerCase()});this.p=g.filter(function(a){return-1===b.indexOf(a.iso2)})}else this.p=g}},{key:"_d0",value:function(){for(var a=0;a<this.p.length;a++){var b=this.p[a].iso2.toLowerCase();this.d.localizedCountries.hasOwnProperty(b)&&(this.p[a].name=this.d.localizedCountries[b])}}},{key:"_d1",value:function(a,b){return a.name.localeCompare(b.name)}},{key:"_d2",value:function(){this.dialCodeMaxLen=0,this.q={};for(var a=0;a<this.p.length;a++){var b=this.p[a];this._c(b.iso2,b.dialCode,b.priority)}for(var c=0;c<this.p.length;c++){var d=this.p[c];if(d.areaCodes)for(var e=this.q[d.dialCode][0],f=0;f<d.areaCodes.length;f++){for(var g=d.areaCodes[f],h=1;h<g.length;h++){var i=d.dialCode+g.substr(0,h);this._c(e,i),this._c(d.iso2,i)}this._c(d.iso2,d.dialCode+g)}}}},{key:"_e",value:function(){this.preferredCountries=[];for(var a=0;a<this.d.preferredCountries.length;a++){var b=this.d.preferredCountries[a].toLowerCase(),c=this._y(b,!1,!0);c&&this.preferredCountries.push(c)}}},{key:"_e2",value:function(a,c,d){var e=b.createElement(a);return c&&m(c,function(a,b){return e.setAttribute(a,b)}),d&&d.appendChild(e),e}},{key:"_f",value:function(){this.a.setAttribute("autocomplete","off");var a="iti";this.d.allowDropdown&&(a+=" iti--allow-dropdown"),this.d.separateDialCode&&(a+=" iti--separate-dial-code"),this.d.customContainer&&(a+=" ",a+=this.d.customContainer);var b=this._e2("div",{"class":a});if(this.a.parentNode.insertBefore(b,this.a),this.k=this._e2("div",{"class":"iti__flag-container"},b),b.appendChild(this.a),this.selectedFlag=this._e2("div",{"class":"iti__selected-flag",role:"combobox","aria-owns":"country-listbox"},this.k),this.l=this._e2("div",{"class":"iti__flag"},this.selectedFlag),this.d.separateDialCode&&(this.t=this._e2("div",{"class":"iti__selected-dial-code"},this.selectedFlag)),this.d.allowDropdown&&(this.selectedFlag.setAttribute("tabindex","0"),this.u=this._e2("div",{"class":"iti__arrow"},this.selectedFlag),this.m=this._e2("ul",{"class":"iti__country-list iti__hide",id:"country-listbox","aria-expanded":"false",role:"listbox"}),this.preferredCountries.length&&(this._g(this.preferredCountries,"iti__preferred"),this._e2("li",{"class":"iti__divider",role:"separator","aria-disabled":"true"},this.m)),this._g(this.p,"iti__standard"),this.d.dropdownContainer?(this.dropdown=this._e2("div",{"class":"iti iti--container"}),this.dropdown.appendChild(this.m)):this.k.appendChild(this.m)),this.d.hiddenInput){var c=this.d.hiddenInput,d=this.a.getAttribute("name");if(d){var e=d.lastIndexOf("[");-1!==e&&(c="".concat(d.substr(0,e),"[").concat(c,"]"))}this.hiddenInput=this._e2("input",{type:"hidden",name:c}),b.appendChild(this.hiddenInput)}}},{key:"_g",value:function(a,b){for(var c="",d=0;d<a.length;d++){var e=a[d];c+="<li class='iti__country ".concat(b,"' tabIndex='-1' id='iti-item-").concat(e.iso2,"' role='option' data-dial-code='").concat(e.dialCode,"' data-country-code='").concat(e.iso2,"'>"),c+="<div class='iti__flag-box'><div class='iti__flag iti__".concat(e.iso2,"'></div></div>"),c+="<span class='iti__country-name'>".concat(e.name,"</span>"),c+="<span class='iti__dial-code'>+".concat(e.dialCode,"</span>"),c+="</li>"}this.m.insertAdjacentHTML("beforeend",c)}},{key:"_h",value:function(){var a=this.a.value,b=this._5(a),c=this._w(a),d=this.d,e=d.initialCountry,f=d.nationalMode,g=d.autoHideDialCode,h=d.separateDialCode;b&&!c?this._v(a):"auto"!==e&&(e?this._z(e.toLowerCase()):b&&c?this._z("us"):(this.j=this.preferredCountries.length?this.preferredCountries[0].iso2:this.p[0].iso2,a||this._z(this.j)),a||f||g||h||(this.a.value="+".concat(this.s.dialCode))),a&&this._u(a)}},{key:"_i",value:function(){this._j(),this.d.autoHideDialCode&&this._l(),this.d.allowDropdown&&this._i2(),this.hiddenInput&&this._i0()}},{key:"_i0",value:function(){var a=this;this._a14=function(){a.hiddenInput.value=a.getNumber()},this.a.form&&this.a.form.addEventListener("submit",this._a14)}},{key:"_i1",value:function(){for(var a=this.a;a&&"LABEL"!==a.tagName;)a=a.parentNode;return a}},{key:"_i2",value:function(){var a=this;this._a9=function(b){a.m.classList.contains("iti__hide")?a.a.focus():b.preventDefault()};var b=this._i1();b&&b.addEventListener("click",this._a9),this._a10=function(){!a.m.classList.contains("iti__hide")||a.a.disabled||a.a.readOnly||a._n()},this.selectedFlag.addEventListener("click",this._a10),this._a11=function(b){a.m.classList.contains("iti__hide")&&-1!==["ArrowUp","ArrowDown"," ","Enter"].indexOf(b.key)&&(b.preventDefault(),b.stopPropagation(),a._n()),"Tab"===b.key&&a._2()},this.k.addEventListener("keydown",this._a11)}},{key:"_i3",value:function(){var b=this;this.d.utilsScript&&!a.intlTelInputUtils?a.intlTelInputGlobals.windowLoaded?a.intlTelInputGlobals.loadUtils(this.d.utilsScript):a.addEventListener("load",function(){a.intlTelInputGlobals.loadUtils(b.d.utilsScript)}):this.i0(),"auto"===this.d.initialCountry?this._i4():this.h()}},{key:"_i4",value:function(){a.intlTelInputGlobals.autoCountry?this.handleAutoCountry():a.intlTelInputGlobals.startedLoadingAutoCountry||(a.intlTelInputGlobals.startedLoadingAutoCountry=!0,"function"==typeof this.d.geoIpLookup&&this.d.geoIpLookup(function(b){a.intlTelInputGlobals.autoCountry=b.toLowerCase(),setTimeout(function(){return n("handleAutoCountry")})},function(){return n("rejectAutoCountryPromise")}))}},{key:"_j",value:function(){var a=this;this._a12=function(){a._v(a.a.value)&&a._8()},this.a.addEventListener("keyup",this._a12),this._a13=function(){setTimeout(a._a12)},this.a.addEventListener("cut",this._a13),this.a.addEventListener("paste",this._a13)}},{key:"_j2",value:function(a){var b=this.a.getAttribute("maxlength");return b&&a.length>b?a.substr(0,b):a}},{key:"_l",value:function(){var a=this;this._a8=function(){a._l2()},this.a.form&&this.a.form.addEventListener("submit",this._a8),this.a.addEventListener("blur",this._a8)}},{key:"_l2",value:function(){if("+"===this.a.value.charAt(0)){var a=this._m(this.a.value);a&&this.s.dialCode!==a||(this.a.value="")}}},{key:"_m",value:function(a){return a.replace(/\D/g,"")}},{key:"_m2",value:function(a){var c=b.createEvent("Event");c.initEvent(a,!0,!0),this.a.dispatchEvent(c)}},{key:"_n",value:function(){this.m.classList.remove("iti__hide"),this.m.setAttribute("aria-expanded","true"),this._o(),this.b&&(this._x(this.b,!1),this._3(this.b,!0)),this._p(),this.u.classList.add("iti__arrow--up"),this._m2("open:countrydropdown")}},{key:"_n2",value:function(a,b,c){c&&!a.classList.contains(b)?a.classList.add(b):!c&&a.classList.contains(b)&&a.classList.remove(b)}},{key:"_o",value:function(){var c=this;if(this.d.dropdownContainer&&this.d.dropdownContainer.appendChild(this.dropdown),!this.g){var d=this.a.getBoundingClientRect(),e=a.pageYOffset||b.documentElement.scrollTop,f=d.top+e,g=this.m.offsetHeight,h=f+this.a.offsetHeight+g<e+a.innerHeight,i=f-g>e;if(this._n2(this.m,"iti__country-list--dropup",!h&&i),this.d.dropdownContainer){var j=!h&&i?0:this.a.offsetHeight;this.dropdown.style.top="".concat(f+j,"px"),this.dropdown.style.left="".concat(d.left+b.body.scrollLeft,"px"),this._a4=function(){return c._2()},a.addEventListener("scroll",this._a4)}}}},{key:"_o2",value:function(a){for(var b=a;b&&b!==this.m&&!b.classList.contains("iti__country");)b=b.parentNode;return b===this.m?null:b}},{key:"_p",value:function(){var a=this;this._a0=function(b){var c=a._o2(b.target);c&&a._x(c,!1)},this.m.addEventListener("mouseover",this._a0),this._a1=function(b){var c=a._o2(b.target);c&&a._1(c)},this.m.addEventListener("click",this._a1);var c=!0;this._a2=function(){c||a._2(),c=!1},b.documentElement.addEventListener("click",this._a2);var d="",e=null;this._a3=function(b){b.preventDefault(),"ArrowUp"===b.key||"ArrowDown"===b.key?a._q(b.key):"Enter"===b.key?a._r():"Escape"===b.key?a._2():/^[a-zA-ZÀ-ÿ ]$/.test(b.key)&&(e&&clearTimeout(e),d+=b.key.toLowerCase(),a._s(d),e=setTimeout(function(){d=""},1e3))},b.addEventListener("keydown",this._a3)}},{key:"_q",value:function(a){var b="ArrowUp"===a?this.c.previousElementSibling:this.c.nextElementSibling;b&&(b.classList.contains("iti__divider")&&(b="ArrowUp"===a?b.previousElementSibling:b.nextElementSibling),this._x(b,!0))}},{key:"_r",value:function(){this.c&&this._1(this.c)}},{key:"_s",value:function(a){for(var b=0;b<this.p.length;b++)if(this._t(this.p[b].name,a)){var c=this.m.querySelector("#iti-item-".concat(this.p[b].iso2));this._x(c,!1),this._3(c,!0);break}}},{key:"_t",value:function(a,b){return a.substr(0,b.length).toLowerCase()===b}},{key:"_u",value:function(b){var c=b;if(this.d.formatOnDisplay&&a.intlTelInputUtils&&this.s){var d=!this.d.separateDialCode&&(this.d.nationalMode||"+"!==c.charAt(0)),e=intlTelInputUtils.numberFormat,f=e.NATIONAL,g=e.INTERNATIONAL,h=d?f:g;c=intlTelInputUtils.formatNumber(c,this.s.iso2,h)}c=this._7(c),this.a.value=c}},{key:"_v",value:function(a){var b=a,c=this.s.dialCode,d="1"===c;b&&this.d.nationalMode&&d&&"+"!==b.charAt(0)&&("1"!==b.charAt(0)&&(b="1".concat(b)),b="+".concat(b)),this.d.separateDialCode&&c&&"+"!==b.charAt(0)&&(b="+".concat(c).concat(b));var e=this._5(b),f=this._m(b),g=null;if(e){var h=this.q[this._m(e)],i=-1!==h.indexOf(this.s.iso2)&&f.length<=e.length-1;if(!("1"===c&&this._w(f))&&!i)for(var j=0;j<h.length;j++)if(h[j]){g=h[j];break}}else"+"===b.charAt(0)&&f.length?g="":b&&"+"!==b||(g=this.j);return null!==g&&this._z(g)}},{key:"_w",value:function(a){var b=this._m(a);if("1"===b.charAt(0)){var c=b.substr(1,3);return-1!==l.indexOf(c)}return!1}},{key:"_x",value:function(a,b){var c=this.c;c&&c.classList.remove("iti__highlight"),this.c=a,this.c.classList.add("iti__highlight"),b&&this.c.focus()}},{key:"_y",value:function(a,b,c){for(var d=b?g:this.p,e=0;e<d.length;e++)if(d[e].iso2===a)return d[e];if(c)return null;throw new Error("No country data for '".concat(a,"'"))}},{key:"_z",value:function(a){var b=this.s.iso2?this.s:{};this.s=a?this._y(a,!1,!1):{},this.s.iso2&&(this.j=this.s.iso2),this.l.setAttribute("class","iti__flag iti__".concat(a));var c=a?"".concat(this.s.name,": +").concat(this.s.dialCode):"Unknown";if(this.selectedFlag.setAttribute("title",c),this.d.separateDialCode){var d=this.s.dialCode?"+".concat(this.s.dialCode):"";this.t.innerHTML=d;var e=this.selectedFlag.offsetWidth||this._getHiddenSelectedFlagWidth();this.a.style.paddingLeft="".concat(e+6,"px")}if(this._0(),this.d.allowDropdown){var f=this.b;if(f&&(f.classList.remove("iti__active"),f.setAttribute("aria-selected","false")),a){var g=this.m.querySelector("#iti-item-".concat(a));g.setAttribute("aria-selected","true"),g.classList.add("iti__active"),this.b=g,this.m.setAttribute("aria-activedescendant",g.getAttribute("id"))}}return b.iso2!==a}},{key:"_getHiddenSelectedFlagWidth",value:function(){var a=this.a.parentNode.cloneNode();a.style.visibility="hidden",b.body.appendChild(a);var c=this.selectedFlag.cloneNode(!0);a.appendChild(c);var d=c.offsetWidth;return a.remove(),d}},{key:"_0",value:function(){var b="aggressive"===this.d.autoPlaceholder||!this.e&&"polite"===this.d.autoPlaceholder;if(a.intlTelInputUtils&&b){var c=intlTelInputUtils.numberType[this.d.placeholderNumberType],d=this.s.iso2?intlTelInputUtils.getExampleNumber(this.s.iso2,this.d.nationalMode,c):"";d=this._7(d),"function"==typeof this.d.customPlaceholder&&(d=this.d.customPlaceholder(d,this.s)),this.a.setAttribute("placeholder",d)}}},{key:"_1",value:function(a){var b=this._z(a.getAttribute("data-country-code"));this._2(),this._4(a.getAttribute("data-dial-code"),!0),this.a.focus();var c=this.a.value.length;this.a.setSelectionRange(c,c),b&&this._8()}},{key:"_2",value:function(){this.m.classList.add("iti__hide"),this.m.setAttribute("aria-expanded","false"),this.u.classList.remove("iti__arrow--up"),b.removeEventListener("keydown",this._a3),b.documentElement.removeEventListener("click",this._a2),this.m.removeEventListener("mouseover",this._a0),this.m.removeEventListener("click",this._a1),this.d.dropdownContainer&&(this.g||a.removeEventListener("scroll",this._a4),this.dropdown.parentNode&&this.dropdown.parentNode.removeChild(this.dropdown)),this._m2("close:countrydropdown")}},{key:"_3",value:function(c,d){var e=this.m,f=a.pageYOffset||b.documentElement.scrollTop,g=e.offsetHeight,h=e.getBoundingClientRect().top+f,i=h+g,j=c.offsetHeight,k=c.getBoundingClientRect().top+f,l=k+j,m=k-h+e.scrollTop,n=g/2-j/2;if(k<h)d&&(m-=n),e.scrollTop=m;else if(l>i){d&&(m+=n);var o=g-j;e.scrollTop=m-o}}},{key:"_4",value:function(a,b){var c,d=this.a.value,e="+".concat(a);if("+"===d.charAt(0)){var f=this._5(d);c=f?d.replace(f,e):e}else{if(this.d.nationalMode||this.d.separateDialCode)return;if(d)c=e+d;else{if(!b&&this.d.autoHideDialCode)return;c=e}}this.a.value=c}},{key:"_5",value:function(a){var b="";if("+"===a.charAt(0))for(var c="",d=0;d<a.length;d++){var e=a.charAt(d);if(!isNaN(parseInt(e,10))&&(c+=e,this.q[c]&&(b=a.substr(0,d+1)),c.length===this.dialCodeMaxLen))break}return b}},{key:"_6",value:function(){var a=this.a.value.trim(),b=this.s.dialCode,c=this._m(a);return(this.d.separateDialCode&&"+"!==a.charAt(0)&&b&&c?"+".concat(b):"")+a}},{key:"_7",value:function(a){var b=a;if(this.d.separateDialCode){var c=this._5(b);if(c){c="+".concat(this.s.dialCode);var d=" "===b[c.length]||"-"===b[c.length]?c.length+1:c.length;b=b.substr(d)}}return this._j2(b)}},{key:"_8",value:function(){this._m2("countrychange")}},{key:"handleAutoCountry",value:function(){"auto"===this.d.initialCountry&&(this.j=a.intlTelInputGlobals.autoCountry,this.a.value||this.setCountry(this.j),this.h())}},{key:"handleUtils",value:function(){a.intlTelInputUtils&&(this.a.value&&this._u(this.a.value),this._0()),this.i0()}},{key:"destroy",value:function(){var b=this.a.form;if(this.d.allowDropdown){this._2(),this.selectedFlag.removeEventListener("click",this._a10),this.k.removeEventListener("keydown",this._a11);var c=this._i1();c&&c.removeEventListener("click",this._a9)}this.hiddenInput&&b&&b.removeEventListener("submit",this._a14),this.d.autoHideDialCode&&(b&&b.removeEventListener("submit",this._a8),this.a.removeEventListener("blur",this._a8)),this.a.removeEventListener("keyup",this._a12),this.a.removeEventListener("cut",this._a13),this.a.removeEventListener("paste",this._a13),this.a.removeAttribute("data-intl-tel-input-id");var d=this.a.parentNode;d.parentNode.insertBefore(this.a,d),d.parentNode.removeChild(d),delete a.intlTelInputGlobals.instances[this.id]}},{key:"getExtension",value:function(){return a.intlTelInputUtils?intlTelInputUtils.getExtension(this._6(),this.s.iso2):""}},{key:"getNumber",value:function(b){if(a.intlTelInputUtils){var c=this.s.iso2;return intlTelInputUtils.formatNumber(this._6(),c,b)}return""}},{key:"getNumberType",value:function(){return a.intlTelInputUtils?intlTelInputUtils.getNumberType(this._6(),this.s.iso2):-99}},{key:"getSelectedCountryData",value:function(){return this.s}},{key:"getValidationError",value:function(){if(a.intlTelInputUtils){var b=this.s.iso2;return intlTelInputUtils.getValidationError(this._6(),b)}return-99}},{key:"isValidNumber",value:function(){var b=this._6().trim(),c=this.d.nationalMode?this.s.iso2:"";return a.intlTelInputUtils?intlTelInputUtils.isValidNumber(b,c):null}},{key:"setCountry",value:function(a){var b=a.toLowerCase();this.l.classList.contains("iti__".concat(b))||(this._z(b),this._4(this.s.dialCode,!1),this._8())}},{key:"setNumber",value:function(a){var b=this._v(a);this._u(a),b&&this._8()}},{key:"setPlaceholderNumberType",value:function(a){this.d.placeholderNumberType=a,this._0()}}]),e}()
;a.intlTelInputGlobals.getCountryData=function(){return g};var p=function(a,c,d){var e=b.createElement("script");e.onload=function(){n("handleUtils"),c&&c()},e.onerror=function(){n("rejectUtilsScriptPromise"),d&&d()},e.className="iti-load-utils",e.async=!0,e.src=a,b.body.appendChild(e)};return a.intlTelInputGlobals.loadUtils=function(b){if(!a.intlTelInputUtils&&!a.intlTelInputGlobals.startedLoadingUtilsScript){if(a.intlTelInputGlobals.startedLoadingUtilsScript=!0,"undefined"!=typeof Promise)return new Promise(function(a,c){return p(b,a,c)});p(b)}return null},a.intlTelInputGlobals.defaults=k,a.intlTelInputGlobals.version="16.0.0",function(b,c){var d=new o(b,c);return d._init(),b.setAttribute("data-intl-tel-input-id",d.id),a.intlTelInputGlobals.instances[d.id]=d,d}}()}(window,document);"object"==typeof module&&module.exports?module.exports=b:window.intlTelInput=b}();
/**
 * @popperjs/core v2.11.8 - MIT License
 */

!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).Popper={})}(this,(function(e){"use strict";function t(e){if(null==e)return window;if("[object Window]"!==e.toString()){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function n(e){return e instanceof t(e).Element||e instanceof Element}function r(e){return e instanceof t(e).HTMLElement||e instanceof HTMLElement}function o(e){return"undefined"!=typeof ShadowRoot&&(e instanceof t(e).ShadowRoot||e instanceof ShadowRoot)}var i=Math.max,a=Math.min,s=Math.round;function f(){var e=navigator.userAgentData;return null!=e&&e.brands&&Array.isArray(e.brands)?e.brands.map((function(e){return e.brand+"/"+e.version})).join(" "):navigator.userAgent}function c(){return!/^((?!chrome|android).)*safari/i.test(f())}function p(e,o,i){void 0===o&&(o=!1),void 0===i&&(i=!1);var a=e.getBoundingClientRect(),f=1,p=1;o&&r(e)&&(f=e.offsetWidth>0&&s(a.width)/e.offsetWidth||1,p=e.offsetHeight>0&&s(a.height)/e.offsetHeight||1);var u=(n(e)?t(e):window).visualViewport,l=!c()&&i,d=(a.left+(l&&u?u.offsetLeft:0))/f,h=(a.top+(l&&u?u.offsetTop:0))/p,m=a.width/f,v=a.height/p;return{width:m,height:v,top:h,right:d+m,bottom:h+v,left:d,x:d,y:h}}function u(e){var n=t(e);return{scrollLeft:n.pageXOffset,scrollTop:n.pageYOffset}}function l(e){return e?(e.nodeName||"").toLowerCase():null}function d(e){return((n(e)?e.ownerDocument:e.document)||window.document).documentElement}function h(e){return p(d(e)).left+u(e).scrollLeft}function m(e){return t(e).getComputedStyle(e)}function v(e){var t=m(e),n=t.overflow,r=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+o+r)}function y(e,n,o){void 0===o&&(o=!1);var i,a,f=r(n),c=r(n)&&function(e){var t=e.getBoundingClientRect(),n=s(t.width)/e.offsetWidth||1,r=s(t.height)/e.offsetHeight||1;return 1!==n||1!==r}(n),m=d(n),y=p(e,c,o),g={scrollLeft:0,scrollTop:0},b={x:0,y:0};return(f||!f&&!o)&&(("body"!==l(n)||v(m))&&(g=(i=n)!==t(i)&&r(i)?{scrollLeft:(a=i).scrollLeft,scrollTop:a.scrollTop}:u(i)),r(n)?((b=p(n,!0)).x+=n.clientLeft,b.y+=n.clientTop):m&&(b.x=h(m))),{x:y.left+g.scrollLeft-b.x,y:y.top+g.scrollTop-b.y,width:y.width,height:y.height}}function g(e){var t=p(e),n=e.offsetWidth,r=e.offsetHeight;return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function b(e){return"html"===l(e)?e:e.assignedSlot||e.parentNode||(o(e)?e.host:null)||d(e)}function x(e){return["html","body","#document"].indexOf(l(e))>=0?e.ownerDocument.body:r(e)&&v(e)?e:x(b(e))}function w(e,n){var r;void 0===n&&(n=[]);var o=x(e),i=o===(null==(r=e.ownerDocument)?void 0:r.body),a=t(o),s=i?[a].concat(a.visualViewport||[],v(o)?o:[]):o,f=n.concat(s);return i?f:f.concat(w(b(s)))}function O(e){return["table","td","th"].indexOf(l(e))>=0}function j(e){return r(e)&&"fixed"!==m(e).position?e.offsetParent:null}function E(e){for(var n=t(e),i=j(e);i&&O(i)&&"static"===m(i).position;)i=j(i);return i&&("html"===l(i)||"body"===l(i)&&"static"===m(i).position)?n:i||function(e){var t=/firefox/i.test(f());if(/Trident/i.test(f())&&r(e)&&"fixed"===m(e).position)return null;var n=b(e);for(o(n)&&(n=n.host);r(n)&&["html","body"].indexOf(l(n))<0;){var i=m(n);if("none"!==i.transform||"none"!==i.perspective||"paint"===i.contain||-1!==["transform","perspective"].indexOf(i.willChange)||t&&"filter"===i.willChange||t&&i.filter&&"none"!==i.filter)return n;n=n.parentNode}return null}(e)||n}var D="top",A="bottom",L="right",P="left",M="auto",k=[D,A,L,P],W="start",B="end",H="viewport",T="popper",R=k.reduce((function(e,t){return e.concat([t+"-"+W,t+"-"+B])}),[]),S=[].concat(k,[M]).reduce((function(e,t){return e.concat([t,t+"-"+W,t+"-"+B])}),[]),V=["beforeRead","read","afterRead","beforeMain","main","afterMain","beforeWrite","write","afterWrite"];function q(e){var t=new Map,n=new Set,r=[];function o(e){n.add(e.name),[].concat(e.requires||[],e.requiresIfExists||[]).forEach((function(e){if(!n.has(e)){var r=t.get(e);r&&o(r)}})),r.push(e)}return e.forEach((function(e){t.set(e.name,e)})),e.forEach((function(e){n.has(e.name)||o(e)})),r}function C(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&o(n)){var r=t;do{if(r&&e.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function N(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function I(e,r,o){return r===H?N(function(e,n){var r=t(e),o=d(e),i=r.visualViewport,a=o.clientWidth,s=o.clientHeight,f=0,p=0;if(i){a=i.width,s=i.height;var u=c();(u||!u&&"fixed"===n)&&(f=i.offsetLeft,p=i.offsetTop)}return{width:a,height:s,x:f+h(e),y:p}}(e,o)):n(r)?function(e,t){var n=p(e,!1,"fixed"===t);return n.top=n.top+e.clientTop,n.left=n.left+e.clientLeft,n.bottom=n.top+e.clientHeight,n.right=n.left+e.clientWidth,n.width=e.clientWidth,n.height=e.clientHeight,n.x=n.left,n.y=n.top,n}(r,o):N(function(e){var t,n=d(e),r=u(e),o=null==(t=e.ownerDocument)?void 0:t.body,a=i(n.scrollWidth,n.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),s=i(n.scrollHeight,n.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),f=-r.scrollLeft+h(e),c=-r.scrollTop;return"rtl"===m(o||n).direction&&(f+=i(n.clientWidth,o?o.clientWidth:0)-a),{width:a,height:s,x:f,y:c}}(d(e)))}function _(e,t,o,s){var f="clippingParents"===t?function(e){var t=w(b(e)),o=["absolute","fixed"].indexOf(m(e).position)>=0&&r(e)?E(e):e;return n(o)?t.filter((function(e){return n(e)&&C(e,o)&&"body"!==l(e)})):[]}(e):[].concat(t),c=[].concat(f,[o]),p=c[0],u=c.reduce((function(t,n){var r=I(e,n,s);return t.top=i(r.top,t.top),t.right=a(r.right,t.right),t.bottom=a(r.bottom,t.bottom),t.left=i(r.left,t.left),t}),I(e,p,s));return u.width=u.right-u.left,u.height=u.bottom-u.top,u.x=u.left,u.y=u.top,u}function F(e){return e.split("-")[0]}function U(e){return e.split("-")[1]}function z(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function X(e){var t,n=e.reference,r=e.element,o=e.placement,i=o?F(o):null,a=o?U(o):null,s=n.x+n.width/2-r.width/2,f=n.y+n.height/2-r.height/2;switch(i){case D:t={x:s,y:n.y-r.height};break;case A:t={x:s,y:n.y+n.height};break;case L:t={x:n.x+n.width,y:f};break;case P:t={x:n.x-r.width,y:f};break;default:t={x:n.x,y:n.y}}var c=i?z(i):null;if(null!=c){var p="y"===c?"height":"width";switch(a){case W:t[c]=t[c]-(n[p]/2-r[p]/2);break;case B:t[c]=t[c]+(n[p]/2-r[p]/2)}}return t}function Y(e){return Object.assign({},{top:0,right:0,bottom:0,left:0},e)}function G(e,t){return t.reduce((function(t,n){return t[n]=e,t}),{})}function J(e,t){void 0===t&&(t={});var r=t,o=r.placement,i=void 0===o?e.placement:o,a=r.strategy,s=void 0===a?e.strategy:a,f=r.boundary,c=void 0===f?"clippingParents":f,u=r.rootBoundary,l=void 0===u?H:u,h=r.elementContext,m=void 0===h?T:h,v=r.altBoundary,y=void 0!==v&&v,g=r.padding,b=void 0===g?0:g,x=Y("number"!=typeof b?b:G(b,k)),w=m===T?"reference":T,O=e.rects.popper,j=e.elements[y?w:m],E=_(n(j)?j:j.contextElement||d(e.elements.popper),c,l,s),P=p(e.elements.reference),M=X({reference:P,element:O,strategy:"absolute",placement:i}),W=N(Object.assign({},O,M)),B=m===T?W:P,R={top:E.top-B.top+x.top,bottom:B.bottom-E.bottom+x.bottom,left:E.left-B.left+x.left,right:B.right-E.right+x.right},S=e.modifiersData.offset;if(m===T&&S){var V=S[i];Object.keys(R).forEach((function(e){var t=[L,A].indexOf(e)>=0?1:-1,n=[D,A].indexOf(e)>=0?"y":"x";R[e]+=V[n]*t}))}return R}var K={placement:"bottom",modifiers:[],strategy:"absolute"};function Q(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some((function(e){return!(e&&"function"==typeof e.getBoundingClientRect)}))}function Z(e){void 0===e&&(e={});var t=e,r=t.defaultModifiers,o=void 0===r?[]:r,i=t.defaultOptions,a=void 0===i?K:i;return function(e,t,r){void 0===r&&(r=a);var i,s,f={placement:"bottom",orderedModifiers:[],options:Object.assign({},K,a),modifiersData:{},elements:{reference:e,popper:t},attributes:{},styles:{}},c=[],p=!1,u={state:f,setOptions:function(r){var i="function"==typeof r?r(f.options):r;l(),f.options=Object.assign({},a,f.options,i),f.scrollParents={reference:n(e)?w(e):e.contextElement?w(e.contextElement):[],popper:w(t)};var s,p,d=function(e){var t=q(e);return V.reduce((function(e,n){return e.concat(t.filter((function(e){return e.phase===n})))}),[])}((s=[].concat(o,f.options.modifiers),p=s.reduce((function(e,t){var n=e[t.name];return e[t.name]=n?Object.assign({},n,t,{options:Object.assign({},n.options,t.options),data:Object.assign({},n.data,t.data)}):t,e}),{}),Object.keys(p).map((function(e){return p[e]}))));return f.orderedModifiers=d.filter((function(e){return e.enabled})),f.orderedModifiers.forEach((function(e){var t=e.name,n=e.options,r=void 0===n?{}:n,o=e.effect;if("function"==typeof o){var i=o({state:f,name:t,instance:u,options:r}),a=function(){};c.push(i||a)}})),u.update()},forceUpdate:function(){if(!p){var e=f.elements,t=e.reference,n=e.popper;if(Q(t,n)){f.rects={reference:y(t,E(n),"fixed"===f.options.strategy),popper:g(n)},f.reset=!1,f.placement=f.options.placement,f.orderedModifiers.forEach((function(e){return f.modifiersData[e.name]=Object.assign({},e.data)}));for(var r=0;r<f.orderedModifiers.length;r++)if(!0!==f.reset){var o=f.orderedModifiers[r],i=o.fn,a=o.options,s=void 0===a?{}:a,c=o.name;"function"==typeof i&&(f=i({state:f,options:s,name:c,instance:u})||f)}else f.reset=!1,r=-1}}},update:(i=function(){return new Promise((function(e){u.forceUpdate(),e(f)}))},function(){return s||(s=new Promise((function(e){Promise.resolve().then((function(){s=void 0,e(i())}))}))),s}),destroy:function(){l(),p=!0}};if(!Q(e,t))return u;function l(){c.forEach((function(e){return e()})),c=[]}return u.setOptions(r).then((function(e){!p&&r.onFirstUpdate&&r.onFirstUpdate(e)})),u}}var $={passive:!0};var ee={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:function(e){var n=e.state,r=e.instance,o=e.options,i=o.scroll,a=void 0===i||i,s=o.resize,f=void 0===s||s,c=t(n.elements.popper),p=[].concat(n.scrollParents.reference,n.scrollParents.popper);return a&&p.forEach((function(e){e.addEventListener("scroll",r.update,$)})),f&&c.addEventListener("resize",r.update,$),function(){a&&p.forEach((function(e){e.removeEventListener("scroll",r.update,$)})),f&&c.removeEventListener("resize",r.update,$)}},data:{}};var te={name:"popperOffsets",enabled:!0,phase:"read",fn:function(e){var t=e.state,n=e.name;t.modifiersData[n]=X({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})},data:{}},ne={top:"auto",right:"auto",bottom:"auto",left:"auto"};function re(e){var n,r=e.popper,o=e.popperRect,i=e.placement,a=e.variation,f=e.offsets,c=e.position,p=e.gpuAcceleration,u=e.adaptive,l=e.roundOffsets,h=e.isFixed,v=f.x,y=void 0===v?0:v,g=f.y,b=void 0===g?0:g,x="function"==typeof l?l({x:y,y:b}):{x:y,y:b};y=x.x,b=x.y;var w=f.hasOwnProperty("x"),O=f.hasOwnProperty("y"),j=P,M=D,k=window;if(u){var W=E(r),H="clientHeight",T="clientWidth";if(W===t(r)&&"static"!==m(W=d(r)).position&&"absolute"===c&&(H="scrollHeight",T="scrollWidth"),W=W,i===D||(i===P||i===L)&&a===B)M=A,b-=(h&&W===k&&k.visualViewport?k.visualViewport.height:W[H])-o.height,b*=p?1:-1;if(i===P||(i===D||i===A)&&a===B)j=L,y-=(h&&W===k&&k.visualViewport?k.visualViewport.width:W[T])-o.width,y*=p?1:-1}var R,S=Object.assign({position:c},u&&ne),V=!0===l?function(e,t){var n=e.x,r=e.y,o=t.devicePixelRatio||1;return{x:s(n*o)/o||0,y:s(r*o)/o||0}}({x:y,y:b},t(r)):{x:y,y:b};return y=V.x,b=V.y,p?Object.assign({},S,((R={})[M]=O?"0":"",R[j]=w?"0":"",R.transform=(k.devicePixelRatio||1)<=1?"translate("+y+"px, "+b+"px)":"translate3d("+y+"px, "+b+"px, 0)",R)):Object.assign({},S,((n={})[M]=O?b+"px":"",n[j]=w?y+"px":"",n.transform="",n))}var oe={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:function(e){var t=e.state,n=e.options,r=n.gpuAcceleration,o=void 0===r||r,i=n.adaptive,a=void 0===i||i,s=n.roundOffsets,f=void 0===s||s,c={placement:F(t.placement),variation:U(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:"fixed"===t.options.strategy};null!=t.modifiersData.popperOffsets&&(t.styles.popper=Object.assign({},t.styles.popper,re(Object.assign({},c,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:a,roundOffsets:f})))),null!=t.modifiersData.arrow&&(t.styles.arrow=Object.assign({},t.styles.arrow,re(Object.assign({},c,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:f})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})},data:{}};var ie={name:"applyStyles",enabled:!0,phase:"write",fn:function(e){var t=e.state;Object.keys(t.elements).forEach((function(e){var n=t.styles[e]||{},o=t.attributes[e]||{},i=t.elements[e];r(i)&&l(i)&&(Object.assign(i.style,n),Object.keys(o).forEach((function(e){var t=o[e];!1===t?i.removeAttribute(e):i.setAttribute(e,!0===t?"":t)})))}))},effect:function(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach((function(e){var o=t.elements[e],i=t.attributes[e]||{},a=Object.keys(t.styles.hasOwnProperty(e)?t.styles[e]:n[e]).reduce((function(e,t){return e[t]="",e}),{});r(o)&&l(o)&&(Object.assign(o.style,a),Object.keys(i).forEach((function(e){o.removeAttribute(e)})))}))}},requires:["computeStyles"]};var ae={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:function(e){var t=e.state,n=e.options,r=e.name,o=n.offset,i=void 0===o?[0,0]:o,a=S.reduce((function(e,n){return e[n]=function(e,t,n){var r=F(e),o=[P,D].indexOf(r)>=0?-1:1,i="function"==typeof n?n(Object.assign({},t,{placement:e})):n,a=i[0],s=i[1];return a=a||0,s=(s||0)*o,[P,L].indexOf(r)>=0?{x:s,y:a}:{x:a,y:s}}(n,t.rects,i),e}),{}),s=a[t.placement],f=s.x,c=s.y;null!=t.modifiersData.popperOffsets&&(t.modifiersData.popperOffsets.x+=f,t.modifiersData.popperOffsets.y+=c),t.modifiersData[r]=a}},se={left:"right",right:"left",bottom:"top",top:"bottom"};function fe(e){return e.replace(/left|right|bottom|top/g,(function(e){return se[e]}))}var ce={start:"end",end:"start"};function pe(e){return e.replace(/start|end/g,(function(e){return ce[e]}))}function ue(e,t){void 0===t&&(t={});var n=t,r=n.placement,o=n.boundary,i=n.rootBoundary,a=n.padding,s=n.flipVariations,f=n.allowedAutoPlacements,c=void 0===f?S:f,p=U(r),u=p?s?R:R.filter((function(e){return U(e)===p})):k,l=u.filter((function(e){return c.indexOf(e)>=0}));0===l.length&&(l=u);var d=l.reduce((function(t,n){return t[n]=J(e,{placement:n,boundary:o,rootBoundary:i,padding:a})[F(n)],t}),{});return Object.keys(d).sort((function(e,t){return d[e]-d[t]}))}var le={name:"flip",enabled:!0,phase:"main",fn:function(e){var t=e.state,n=e.options,r=e.name;if(!t.modifiersData[r]._skip){for(var o=n.mainAxis,i=void 0===o||o,a=n.altAxis,s=void 0===a||a,f=n.fallbackPlacements,c=n.padding,p=n.boundary,u=n.rootBoundary,l=n.altBoundary,d=n.flipVariations,h=void 0===d||d,m=n.allowedAutoPlacements,v=t.options.placement,y=F(v),g=f||(y===v||!h?[fe(v)]:function(e){if(F(e)===M)return[];var t=fe(e);return[pe(e),t,pe(t)]}(v)),b=[v].concat(g).reduce((function(e,n){return e.concat(F(n)===M?ue(t,{placement:n,boundary:p,rootBoundary:u,padding:c,flipVariations:h,allowedAutoPlacements:m}):n)}),[]),x=t.rects.reference,w=t.rects.popper,O=new Map,j=!0,E=b[0],k=0;k<b.length;k++){var B=b[k],H=F(B),T=U(B)===W,R=[D,A].indexOf(H)>=0,S=R?"width":"height",V=J(t,{placement:B,boundary:p,rootBoundary:u,altBoundary:l,padding:c}),q=R?T?L:P:T?A:D;x[S]>w[S]&&(q=fe(q));var C=fe(q),N=[];if(i&&N.push(V[H]<=0),s&&N.push(V[q]<=0,V[C]<=0),N.every((function(e){return e}))){E=B,j=!1;break}O.set(B,N)}if(j)for(var I=function(e){var t=b.find((function(t){var n=O.get(t);if(n)return n.slice(0,e).every((function(e){return e}))}));if(t)return E=t,"break"},_=h?3:1;_>0;_--){if("break"===I(_))break}t.placement!==E&&(t.modifiersData[r]._skip=!0,t.placement=E,t.reset=!0)}},requiresIfExists:["offset"],data:{_skip:!1}};function de(e,t,n){return i(e,a(t,n))}var he={name:"preventOverflow",enabled:!0,phase:"main",fn:function(e){var t=e.state,n=e.options,r=e.name,o=n.mainAxis,s=void 0===o||o,f=n.altAxis,c=void 0!==f&&f,p=n.boundary,u=n.rootBoundary,l=n.altBoundary,d=n.padding,h=n.tether,m=void 0===h||h,v=n.tetherOffset,y=void 0===v?0:v,b=J(t,{boundary:p,rootBoundary:u,padding:d,altBoundary:l}),x=F(t.placement),w=U(t.placement),O=!w,j=z(x),M="x"===j?"y":"x",k=t.modifiersData.popperOffsets,B=t.rects.reference,H=t.rects.popper,T="function"==typeof y?y(Object.assign({},t.rects,{placement:t.placement})):y,R="number"==typeof T?{mainAxis:T,altAxis:T}:Object.assign({mainAxis:0,altAxis:0},T),S=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,V={x:0,y:0};if(k){if(s){var q,C="y"===j?D:P,N="y"===j?A:L,I="y"===j?"height":"width",_=k[j],X=_+b[C],Y=_-b[N],G=m?-H[I]/2:0,K=w===W?B[I]:H[I],Q=w===W?-H[I]:-B[I],Z=t.elements.arrow,$=m&&Z?g(Z):{width:0,height:0},ee=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:{top:0,right:0,bottom:0,left:0},te=ee[C],ne=ee[N],re=de(0,B[I],$[I]),oe=O?B[I]/2-G-re-te-R.mainAxis:K-re-te-R.mainAxis,ie=O?-B[I]/2+G+re+ne+R.mainAxis:Q+re+ne+R.mainAxis,ae=t.elements.arrow&&E(t.elements.arrow),se=ae?"y"===j?ae.clientTop||0:ae.clientLeft||0:0,fe=null!=(q=null==S?void 0:S[j])?q:0,ce=_+ie-fe,pe=de(m?a(X,_+oe-fe-se):X,_,m?i(Y,ce):Y);k[j]=pe,V[j]=pe-_}if(c){var ue,le="x"===j?D:P,he="x"===j?A:L,me=k[M],ve="y"===M?"height":"width",ye=me+b[le],ge=me-b[he],be=-1!==[D,P].indexOf(x),xe=null!=(ue=null==S?void 0:S[M])?ue:0,we=be?ye:me-B[ve]-H[ve]-xe+R.altAxis,Oe=be?me+B[ve]+H[ve]-xe-R.altAxis:ge,je=m&&be?function(e,t,n){var r=de(e,t,n);return r>n?n:r}(we,me,Oe):de(m?we:ye,me,m?Oe:ge);k[M]=je,V[M]=je-me}t.modifiersData[r]=V}},requiresIfExists:["offset"]};var me={name:"arrow",enabled:!0,phase:"main",fn:function(e){var t,n=e.state,r=e.name,o=e.options,i=n.elements.arrow,a=n.modifiersData.popperOffsets,s=F(n.placement),f=z(s),c=[P,L].indexOf(s)>=0?"height":"width";if(i&&a){var p=function(e,t){return Y("number"!=typeof(e="function"==typeof e?e(Object.assign({},t.rects,{placement:t.placement})):e)?e:G(e,k))}(o.padding,n),u=g(i),l="y"===f?D:P,d="y"===f?A:L,h=n.rects.reference[c]+n.rects.reference[f]-a[f]-n.rects.popper[c],m=a[f]-n.rects.reference[f],v=E(i),y=v?"y"===f?v.clientHeight||0:v.clientWidth||0:0,b=h/2-m/2,x=p[l],w=y-u[c]-p[d],O=y/2-u[c]/2+b,j=de(x,O,w),M=f;n.modifiersData[r]=((t={})[M]=j,t.centerOffset=j-O,t)}},effect:function(e){var t=e.state,n=e.options.element,r=void 0===n?"[data-popper-arrow]":n;null!=r&&("string"!=typeof r||(r=t.elements.popper.querySelector(r)))&&C(t.elements.popper,r)&&(t.elements.arrow=r)},requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function ve(e,t,n){return void 0===n&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function ye(e){return[D,L,A,P].some((function(t){return e[t]>=0}))}var ge={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:function(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,i=t.modifiersData.preventOverflow,a=J(t,{elementContext:"reference"}),s=J(t,{altBoundary:!0}),f=ve(a,r),c=ve(s,o,i),p=ye(f),u=ye(c);t.modifiersData[n]={referenceClippingOffsets:f,popperEscapeOffsets:c,isReferenceHidden:p,hasPopperEscaped:u},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":p,"data-popper-escaped":u})}},be=Z({defaultModifiers:[ee,te,oe,ie]}),xe=[ee,te,oe,ie,ae,le,he,me,ge],we=Z({defaultModifiers:xe});e.applyStyles=ie,e.arrow=me,e.computeStyles=oe,e.createPopper=we,e.createPopperLite=be,e.defaultModifiers=xe,e.detectOverflow=J,e.eventListeners=ee,e.flip=le,e.hide=ge,e.offset=ae,e.popperGenerator=Z,e.popperOffsets=te,e.preventOverflow=he,Object.defineProperty(e,"__esModule",{value:!0})}));
//# sourceMappingURL=popper.min.js.map
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e(require("@popperjs/core")):"function"==typeof define&&define.amd?define(["@popperjs/core"],e):(t=t||self).tippy=e(t.Popper)}(this,(function(t){"use strict";var e="undefined"!=typeof window&&"undefined"!=typeof document,n=!!e&&!!window.msCrypto,r={passive:!0,capture:!0},o=function(){return document.body};function i(t,e,n){if(Array.isArray(t)){var r=t[e];return null==r?Array.isArray(n)?n[e]:n:r}return t}function a(t,e){var n={}.toString.call(t);return 0===n.indexOf("[object")&&n.indexOf(e+"]")>-1}function s(t,e){return"function"==typeof t?t.apply(void 0,e):t}function u(t,e){return 0===e?t:function(r){clearTimeout(n),n=setTimeout((function(){t(r)}),e)};var n}function p(t,e){var n=Object.assign({},t);return e.forEach((function(t){delete n[t]})),n}function c(t){return[].concat(t)}function f(t,e){-1===t.indexOf(e)&&t.push(e)}function l(t){return t.split("-")[0]}function d(t){return[].slice.call(t)}function v(t){return Object.keys(t).reduce((function(e,n){return void 0!==t[n]&&(e[n]=t[n]),e}),{})}function m(){return document.createElement("div")}function g(t){return["Element","Fragment"].some((function(e){return a(t,e)}))}function h(t){return a(t,"MouseEvent")}function b(t){return!(!t||!t._tippy||t._tippy.reference!==t)}function y(t){return g(t)?[t]:function(t){return a(t,"NodeList")}(t)?d(t):Array.isArray(t)?t:d(document.querySelectorAll(t))}function w(t,e){t.forEach((function(t){t&&(t.style.transitionDuration=e+"ms")}))}function x(t,e){t.forEach((function(t){t&&t.setAttribute("data-state",e)}))}function E(t){var e,n=c(t)[0];return null!=n&&null!=(e=n.ownerDocument)&&e.body?n.ownerDocument:document}function O(t,e,n){var r=e+"EventListener";["transitionend","webkitTransitionEnd"].forEach((function(e){t[r](e,n)}))}function C(t,e){for(var n=e;n;){var r;if(t.contains(n))return!0;n=null==n.getRootNode||null==(r=n.getRootNode())?void 0:r.host}return!1}var T={isTouch:!1},A=0;function L(){T.isTouch||(T.isTouch=!0,window.performance&&document.addEventListener("mousemove",D))}function D(){var t=performance.now();t-A<20&&(T.isTouch=!1,document.removeEventListener("mousemove",D)),A=t}function k(){var t=document.activeElement;if(b(t)){var e=t._tippy;t.blur&&!e.state.isVisible&&t.blur()}}var R=Object.assign({appendTo:o,aria:{content:"auto",expanded:"auto"},delay:0,duration:[300,250],getReferenceClientRect:null,hideOnClick:!0,ignoreAttributes:!1,interactive:!1,interactiveBorder:2,interactiveDebounce:0,moveTransition:"",offset:[0,10],onAfterUpdate:function(){},onBeforeUpdate:function(){},onCreate:function(){},onDestroy:function(){},onHidden:function(){},onHide:function(){},onMount:function(){},onShow:function(){},onShown:function(){},onTrigger:function(){},onUntrigger:function(){},onClickOutside:function(){},placement:"top",plugins:[],popperOptions:{},render:null,showOnCreate:!1,touch:!0,trigger:"mouseenter focus",triggerTarget:null},{animateFill:!1,followCursor:!1,inlinePositioning:!1,sticky:!1},{allowHTML:!1,animation:"fade",arrow:!0,content:"",inertia:!1,maxWidth:350,role:"tooltip",theme:"",zIndex:9999}),P=Object.keys(R);function j(t){var e=(t.plugins||[]).reduce((function(e,n){var r,o=n.name,i=n.defaultValue;o&&(e[o]=void 0!==t[o]?t[o]:null!=(r=R[o])?r:i);return e}),{});return Object.assign({},t,e)}function M(t,e){var n=Object.assign({},e,{content:s(e.content,[t])},e.ignoreAttributes?{}:function(t,e){return(e?Object.keys(j(Object.assign({},R,{plugins:e}))):P).reduce((function(e,n){var r=(t.getAttribute("data-tippy-"+n)||"").trim();if(!r)return e;if("content"===n)e[n]=r;else try{e[n]=JSON.parse(r)}catch(t){e[n]=r}return e}),{})}(t,e.plugins));return n.aria=Object.assign({},R.aria,n.aria),n.aria={expanded:"auto"===n.aria.expanded?e.interactive:n.aria.expanded,content:"auto"===n.aria.content?e.interactive?null:"describedby":n.aria.content},n}function V(t,e){t.innerHTML=e}function I(t){var e=m();return!0===t?e.className="tippy-arrow":(e.className="tippy-svg-arrow",g(t)?e.appendChild(t):V(e,t)),e}function S(t,e){g(e.content)?(V(t,""),t.appendChild(e.content)):"function"!=typeof e.content&&(e.allowHTML?V(t,e.content):t.textContent=e.content)}function B(t){var e=t.firstElementChild,n=d(e.children);return{box:e,content:n.find((function(t){return t.classList.contains("tippy-content")})),arrow:n.find((function(t){return t.classList.contains("tippy-arrow")||t.classList.contains("tippy-svg-arrow")})),backdrop:n.find((function(t){return t.classList.contains("tippy-backdrop")}))}}function N(t){var e=m(),n=m();n.className="tippy-box",n.setAttribute("data-state","hidden"),n.setAttribute("tabindex","-1");var r=m();function o(n,r){var o=B(e),i=o.box,a=o.content,s=o.arrow;r.theme?i.setAttribute("data-theme",r.theme):i.removeAttribute("data-theme"),"string"==typeof r.animation?i.setAttribute("data-animation",r.animation):i.removeAttribute("data-animation"),r.inertia?i.setAttribute("data-inertia",""):i.removeAttribute("data-inertia"),i.style.maxWidth="number"==typeof r.maxWidth?r.maxWidth+"px":r.maxWidth,r.role?i.setAttribute("role",r.role):i.removeAttribute("role"),n.content===r.content&&n.allowHTML===r.allowHTML||S(a,t.props),r.arrow?s?n.arrow!==r.arrow&&(i.removeChild(s),i.appendChild(I(r.arrow))):i.appendChild(I(r.arrow)):s&&i.removeChild(s)}return r.className="tippy-content",r.setAttribute("data-state","hidden"),S(r,t.props),e.appendChild(n),n.appendChild(r),o(t.props,t.props),{popper:e,onUpdate:o}}N.$$tippy=!0;var H=1,U=[],_=[];function z(e,a){var p,g,b,y,A,L,D,k,P=M(e,Object.assign({},R,j(v(a)))),V=!1,I=!1,S=!1,N=!1,z=[],F=u(wt,P.interactiveDebounce),W=H++,X=(k=P.plugins).filter((function(t,e){return k.indexOf(t)===e})),Y={id:W,reference:e,popper:m(),popperInstance:null,props:P,state:{isEnabled:!0,isVisible:!1,isDestroyed:!1,isMounted:!1,isShown:!1},plugins:X,clearDelayTimeouts:function(){clearTimeout(p),clearTimeout(g),cancelAnimationFrame(b)},setProps:function(t){if(Y.state.isDestroyed)return;at("onBeforeUpdate",[Y,t]),bt();var n=Y.props,r=M(e,Object.assign({},n,v(t),{ignoreAttributes:!0}));Y.props=r,ht(),n.interactiveDebounce!==r.interactiveDebounce&&(pt(),F=u(wt,r.interactiveDebounce));n.triggerTarget&&!r.triggerTarget?c(n.triggerTarget).forEach((function(t){t.removeAttribute("aria-expanded")})):r.triggerTarget&&e.removeAttribute("aria-expanded");ut(),it(),J&&J(n,r);Y.popperInstance&&(Ct(),At().forEach((function(t){requestAnimationFrame(t._tippy.popperInstance.forceUpdate)})));at("onAfterUpdate",[Y,t])},setContent:function(t){Y.setProps({content:t})},show:function(){var t=Y.state.isVisible,e=Y.state.isDestroyed,n=!Y.state.isEnabled,r=T.isTouch&&!Y.props.touch,a=i(Y.props.duration,0,R.duration);if(t||e||n||r)return;if(et().hasAttribute("disabled"))return;if(at("onShow",[Y],!1),!1===Y.props.onShow(Y))return;Y.state.isVisible=!0,tt()&&($.style.visibility="visible");it(),dt(),Y.state.isMounted||($.style.transition="none");if(tt()){var u=rt(),p=u.box,c=u.content;w([p,c],0)}L=function(){var t;if(Y.state.isVisible&&!N){if(N=!0,$.offsetHeight,$.style.transition=Y.props.moveTransition,tt()&&Y.props.animation){var e=rt(),n=e.box,r=e.content;w([n,r],a),x([n,r],"visible")}st(),ut(),f(_,Y),null==(t=Y.popperInstance)||t.forceUpdate(),at("onMount",[Y]),Y.props.animation&&tt()&&function(t,e){mt(t,e)}(a,(function(){Y.state.isShown=!0,at("onShown",[Y])}))}},function(){var t,e=Y.props.appendTo,n=et();t=Y.props.interactive&&e===o||"parent"===e?n.parentNode:s(e,[n]);t.contains($)||t.appendChild($);Y.state.isMounted=!0,Ct()}()},hide:function(){var t=!Y.state.isVisible,e=Y.state.isDestroyed,n=!Y.state.isEnabled,r=i(Y.props.duration,1,R.duration);if(t||e||n)return;if(at("onHide",[Y],!1),!1===Y.props.onHide(Y))return;Y.state.isVisible=!1,Y.state.isShown=!1,N=!1,V=!1,tt()&&($.style.visibility="hidden");if(pt(),vt(),it(!0),tt()){var o=rt(),a=o.box,s=o.content;Y.props.animation&&(w([a,s],r),x([a,s],"hidden"))}st(),ut(),Y.props.animation?tt()&&function(t,e){mt(t,(function(){!Y.state.isVisible&&$.parentNode&&$.parentNode.contains($)&&e()}))}(r,Y.unmount):Y.unmount()},hideWithInteractivity:function(t){nt().addEventListener("mousemove",F),f(U,F),F(t)},enable:function(){Y.state.isEnabled=!0},disable:function(){Y.hide(),Y.state.isEnabled=!1},unmount:function(){Y.state.isVisible&&Y.hide();if(!Y.state.isMounted)return;Tt(),At().forEach((function(t){t._tippy.unmount()})),$.parentNode&&$.parentNode.removeChild($);_=_.filter((function(t){return t!==Y})),Y.state.isMounted=!1,at("onHidden",[Y])},destroy:function(){if(Y.state.isDestroyed)return;Y.clearDelayTimeouts(),Y.unmount(),bt(),delete e._tippy,Y.state.isDestroyed=!0,at("onDestroy",[Y])}};if(!P.render)return Y;var q=P.render(Y),$=q.popper,J=q.onUpdate;$.setAttribute("data-tippy-root",""),$.id="tippy-"+Y.id,Y.popper=$,e._tippy=Y,$._tippy=Y;var G=X.map((function(t){return t.fn(Y)})),K=e.hasAttribute("aria-expanded");return ht(),ut(),it(),at("onCreate",[Y]),P.showOnCreate&&Lt(),$.addEventListener("mouseenter",(function(){Y.props.interactive&&Y.state.isVisible&&Y.clearDelayTimeouts()})),$.addEventListener("mouseleave",(function(){Y.props.interactive&&Y.props.trigger.indexOf("mouseenter")>=0&&nt().addEventListener("mousemove",F)})),Y;function Q(){var t=Y.props.touch;return Array.isArray(t)?t:[t,0]}function Z(){return"hold"===Q()[0]}function tt(){var t;return!(null==(t=Y.props.render)||!t.$$tippy)}function et(){return D||e}function nt(){var t=et().parentNode;return t?E(t):document}function rt(){return B($)}function ot(t){return Y.state.isMounted&&!Y.state.isVisible||T.isTouch||y&&"focus"===y.type?0:i(Y.props.delay,t?0:1,R.delay)}function it(t){void 0===t&&(t=!1),$.style.pointerEvents=Y.props.interactive&&!t?"":"none",$.style.zIndex=""+Y.props.zIndex}function at(t,e,n){var r;(void 0===n&&(n=!0),G.forEach((function(n){n[t]&&n[t].apply(n,e)})),n)&&(r=Y.props)[t].apply(r,e)}function st(){var t=Y.props.aria;if(t.content){var n="aria-"+t.content,r=$.id;c(Y.props.triggerTarget||e).forEach((function(t){var e=t.getAttribute(n);if(Y.state.isVisible)t.setAttribute(n,e?e+" "+r:r);else{var o=e&&e.replace(r,"").trim();o?t.setAttribute(n,o):t.removeAttribute(n)}}))}}function ut(){!K&&Y.props.aria.expanded&&c(Y.props.triggerTarget||e).forEach((function(t){Y.props.interactive?t.setAttribute("aria-expanded",Y.state.isVisible&&t===et()?"true":"false"):t.removeAttribute("aria-expanded")}))}function pt(){nt().removeEventListener("mousemove",F),U=U.filter((function(t){return t!==F}))}function ct(t){if(!T.isTouch||!S&&"mousedown"!==t.type){var n=t.composedPath&&t.composedPath()[0]||t.target;if(!Y.props.interactive||!C($,n)){if(c(Y.props.triggerTarget||e).some((function(t){return C(t,n)}))){if(T.isTouch)return;if(Y.state.isVisible&&Y.props.trigger.indexOf("click")>=0)return}else at("onClickOutside",[Y,t]);!0===Y.props.hideOnClick&&(Y.clearDelayTimeouts(),Y.hide(),I=!0,setTimeout((function(){I=!1})),Y.state.isMounted||vt())}}}function ft(){S=!0}function lt(){S=!1}function dt(){var t=nt();t.addEventListener("mousedown",ct,!0),t.addEventListener("touchend",ct,r),t.addEventListener("touchstart",lt,r),t.addEventListener("touchmove",ft,r)}function vt(){var t=nt();t.removeEventListener("mousedown",ct,!0),t.removeEventListener("touchend",ct,r),t.removeEventListener("touchstart",lt,r),t.removeEventListener("touchmove",ft,r)}function mt(t,e){var n=rt().box;function r(t){t.target===n&&(O(n,"remove",r),e())}if(0===t)return e();O(n,"remove",A),O(n,"add",r),A=r}function gt(t,n,r){void 0===r&&(r=!1),c(Y.props.triggerTarget||e).forEach((function(e){e.addEventListener(t,n,r),z.push({node:e,eventType:t,handler:n,options:r})}))}function ht(){var t;Z()&&(gt("touchstart",yt,{passive:!0}),gt("touchend",xt,{passive:!0})),(t=Y.props.trigger,t.split(/\s+/).filter(Boolean)).forEach((function(t){if("manual"!==t)switch(gt(t,yt),t){case"mouseenter":gt("mouseleave",xt);break;case"focus":gt(n?"focusout":"blur",Et);break;case"focusin":gt("focusout",Et)}}))}function bt(){z.forEach((function(t){var e=t.node,n=t.eventType,r=t.handler,o=t.options;e.removeEventListener(n,r,o)})),z=[]}function yt(t){var e,n=!1;if(Y.state.isEnabled&&!Ot(t)&&!I){var r="focus"===(null==(e=y)?void 0:e.type);y=t,D=t.currentTarget,ut(),!Y.state.isVisible&&h(t)&&U.forEach((function(e){return e(t)})),"click"===t.type&&(Y.props.trigger.indexOf("mouseenter")<0||V)&&!1!==Y.props.hideOnClick&&Y.state.isVisible?n=!0:Lt(t),"click"===t.type&&(V=!n),n&&!r&&Dt(t)}}function wt(t){var e=t.target,n=et().contains(e)||$.contains(e);"mousemove"===t.type&&n||function(t,e){var n=e.clientX,r=e.clientY;return t.every((function(t){var e=t.popperRect,o=t.popperState,i=t.props.interactiveBorder,a=l(o.placement),s=o.modifiersData.offset;if(!s)return!0;var u="bottom"===a?s.top.y:0,p="top"===a?s.bottom.y:0,c="right"===a?s.left.x:0,f="left"===a?s.right.x:0,d=e.top-r+u>i,v=r-e.bottom-p>i,m=e.left-n+c>i,g=n-e.right-f>i;return d||v||m||g}))}(At().concat($).map((function(t){var e,n=null==(e=t._tippy.popperInstance)?void 0:e.state;return n?{popperRect:t.getBoundingClientRect(),popperState:n,props:P}:null})).filter(Boolean),t)&&(pt(),Dt(t))}function xt(t){Ot(t)||Y.props.trigger.indexOf("click")>=0&&V||(Y.props.interactive?Y.hideWithInteractivity(t):Dt(t))}function Et(t){Y.props.trigger.indexOf("focusin")<0&&t.target!==et()||Y.props.interactive&&t.relatedTarget&&$.contains(t.relatedTarget)||Dt(t)}function Ot(t){return!!T.isTouch&&Z()!==t.type.indexOf("touch")>=0}function Ct(){Tt();var n=Y.props,r=n.popperOptions,o=n.placement,i=n.offset,a=n.getReferenceClientRect,s=n.moveTransition,u=tt()?B($).arrow:null,p=a?{getBoundingClientRect:a,contextElement:a.contextElement||et()}:e,c=[{name:"offset",options:{offset:i}},{name:"preventOverflow",options:{padding:{top:2,bottom:2,left:5,right:5}}},{name:"flip",options:{padding:5}},{name:"computeStyles",options:{adaptive:!s}},{name:"$$tippy",enabled:!0,phase:"beforeWrite",requires:["computeStyles"],fn:function(t){var e=t.state;if(tt()){var n=rt().box;["placement","reference-hidden","escaped"].forEach((function(t){"placement"===t?n.setAttribute("data-placement",e.placement):e.attributes.popper["data-popper-"+t]?n.setAttribute("data-"+t,""):n.removeAttribute("data-"+t)})),e.attributes.popper={}}}}];tt()&&u&&c.push({name:"arrow",options:{element:u,padding:3}}),c.push.apply(c,(null==r?void 0:r.modifiers)||[]),Y.popperInstance=t.createPopper(p,$,Object.assign({},r,{placement:o,onFirstUpdate:L,modifiers:c}))}function Tt(){Y.popperInstance&&(Y.popperInstance.destroy(),Y.popperInstance=null)}function At(){return d($.querySelectorAll("[data-tippy-root]"))}function Lt(t){Y.clearDelayTimeouts(),t&&at("onTrigger",[Y,t]),dt();var e=ot(!0),n=Q(),r=n[0],o=n[1];T.isTouch&&"hold"===r&&o&&(e=o),e?p=setTimeout((function(){Y.show()}),e):Y.show()}function Dt(t){if(Y.clearDelayTimeouts(),at("onUntrigger",[Y,t]),Y.state.isVisible){if(!(Y.props.trigger.indexOf("mouseenter")>=0&&Y.props.trigger.indexOf("click")>=0&&["mouseleave","mousemove"].indexOf(t.type)>=0&&V)){var e=ot(!1);e?g=setTimeout((function(){Y.state.isVisible&&Y.hide()}),e):b=requestAnimationFrame((function(){Y.hide()}))}}else vt()}}function F(t,e){void 0===e&&(e={});var n=R.plugins.concat(e.plugins||[]);document.addEventListener("touchstart",L,r),window.addEventListener("blur",k);var o=Object.assign({},e,{plugins:n}),i=y(t).reduce((function(t,e){var n=e&&z(e,o);return n&&t.push(n),t}),[]);return g(t)?i[0]:i}F.defaultProps=R,F.setDefaultProps=function(t){Object.keys(t).forEach((function(e){R[e]=t[e]}))},F.currentInput=T;var W=Object.assign({},t.applyStyles,{effect:function(t){var e=t.state,n={popper:{position:e.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};Object.assign(e.elements.popper.style,n.popper),e.styles=n,e.elements.arrow&&Object.assign(e.elements.arrow.style,n.arrow)}}),X={mouseover:"mouseenter",focusin:"focus",click:"click"};var Y={name:"animateFill",defaultValue:!1,fn:function(t){var e;if(null==(e=t.props.render)||!e.$$tippy)return{};var n=B(t.popper),r=n.box,o=n.content,i=t.props.animateFill?function(){var t=m();return t.className="tippy-backdrop",x([t],"hidden"),t}():null;return{onCreate:function(){i&&(r.insertBefore(i,r.firstElementChild),r.setAttribute("data-animatefill",""),r.style.overflow="hidden",t.setProps({arrow:!1,animation:"shift-away"}))},onMount:function(){if(i){var t=r.style.transitionDuration,e=Number(t.replace("ms",""));o.style.transitionDelay=Math.round(e/10)+"ms",i.style.transitionDuration=t,x([i],"visible")}},onShow:function(){i&&(i.style.transitionDuration="0ms")},onHide:function(){i&&x([i],"hidden")}}}};var q={clientX:0,clientY:0},$=[];function J(t){var e=t.clientX,n=t.clientY;q={clientX:e,clientY:n}}var G={name:"followCursor",defaultValue:!1,fn:function(t){var e=t.reference,n=E(t.props.triggerTarget||e),r=!1,o=!1,i=!0,a=t.props;function s(){return"initial"===t.props.followCursor&&t.state.isVisible}function u(){n.addEventListener("mousemove",f)}function p(){n.removeEventListener("mousemove",f)}function c(){r=!0,t.setProps({getReferenceClientRect:null}),r=!1}function f(n){var r=!n.target||e.contains(n.target),o=t.props.followCursor,i=n.clientX,a=n.clientY,s=e.getBoundingClientRect(),u=i-s.left,p=a-s.top;!r&&t.props.interactive||t.setProps({getReferenceClientRect:function(){var t=e.getBoundingClientRect(),n=i,r=a;"initial"===o&&(n=t.left+u,r=t.top+p);var s="horizontal"===o?t.top:r,c="vertical"===o?t.right:n,f="horizontal"===o?t.bottom:r,l="vertical"===o?t.left:n;return{width:c-l,height:f-s,top:s,right:c,bottom:f,left:l}}})}function l(){t.props.followCursor&&($.push({instance:t,doc:n}),function(t){t.addEventListener("mousemove",J)}(n))}function d(){0===($=$.filter((function(e){return e.instance!==t}))).filter((function(t){return t.doc===n})).length&&function(t){t.removeEventListener("mousemove",J)}(n)}return{onCreate:l,onDestroy:d,onBeforeUpdate:function(){a=t.props},onAfterUpdate:function(e,n){var i=n.followCursor;r||void 0!==i&&a.followCursor!==i&&(d(),i?(l(),!t.state.isMounted||o||s()||u()):(p(),c()))},onMount:function(){t.props.followCursor&&!o&&(i&&(f(q),i=!1),s()||u())},onTrigger:function(t,e){h(e)&&(q={clientX:e.clientX,clientY:e.clientY}),o="focus"===e.type},onHidden:function(){t.props.followCursor&&(c(),p(),i=!0)}}}};var K={name:"inlinePositioning",defaultValue:!1,fn:function(t){var e,n=t.reference;var r=-1,o=!1,i=[],a={name:"tippyInlinePositioning",enabled:!0,phase:"afterWrite",fn:function(o){var a=o.state;t.props.inlinePositioning&&(-1!==i.indexOf(a.placement)&&(i=[]),e!==a.placement&&-1===i.indexOf(a.placement)&&(i.push(a.placement),t.setProps({getReferenceClientRect:function(){return function(t){return function(t,e,n,r){if(n.length<2||null===t)return e;if(2===n.length&&r>=0&&n[0].left>n[1].right)return n[r]||e;switch(t){case"top":case"bottom":var o=n[0],i=n[n.length-1],a="top"===t,s=o.top,u=i.bottom,p=a?o.left:i.left,c=a?o.right:i.right;return{top:s,bottom:u,left:p,right:c,width:c-p,height:u-s};case"left":case"right":var f=Math.min.apply(Math,n.map((function(t){return t.left}))),l=Math.max.apply(Math,n.map((function(t){return t.right}))),d=n.filter((function(e){return"left"===t?e.left===f:e.right===l})),v=d[0].top,m=d[d.length-1].bottom;return{top:v,bottom:m,left:f,right:l,width:l-f,height:m-v};default:return e}}(l(t),n.getBoundingClientRect(),d(n.getClientRects()),r)}(a.placement)}})),e=a.placement)}};function s(){var e;o||(e=function(t,e){var n;return{popperOptions:Object.assign({},t.popperOptions,{modifiers:[].concat(((null==(n=t.popperOptions)?void 0:n.modifiers)||[]).filter((function(t){return t.name!==e.name})),[e])})}}(t.props,a),o=!0,t.setProps(e),o=!1)}return{onCreate:s,onAfterUpdate:s,onTrigger:function(e,n){if(h(n)){var o=d(t.reference.getClientRects()),i=o.find((function(t){return t.left-2<=n.clientX&&t.right+2>=n.clientX&&t.top-2<=n.clientY&&t.bottom+2>=n.clientY})),a=o.indexOf(i);r=a>-1?a:r}},onHidden:function(){r=-1}}}};var Q={name:"sticky",defaultValue:!1,fn:function(t){var e=t.reference,n=t.popper;function r(e){return!0===t.props.sticky||t.props.sticky===e}var o=null,i=null;function a(){var s=r("reference")?(t.popperInstance?t.popperInstance.state.elements.reference:e).getBoundingClientRect():null,u=r("popper")?n.getBoundingClientRect():null;(s&&Z(o,s)||u&&Z(i,u))&&t.popperInstance&&t.popperInstance.update(),o=s,i=u,t.state.isMounted&&requestAnimationFrame(a)}return{onMount:function(){t.props.sticky&&a()}}}};function Z(t,e){return!t||!e||(t.top!==e.top||t.right!==e.right||t.bottom!==e.bottom||t.left!==e.left)}return e&&function(t){var e=document.createElement("style");e.textContent=t,e.setAttribute("data-tippy-stylesheet","");var n=document.head,r=document.querySelector("head>style,head>link");r?n.insertBefore(e,r):n.appendChild(e)}('.tippy-box[data-animation=fade][data-state=hidden]{opacity:0}[data-tippy-root]{max-width:calc(100vw - 10px)}.tippy-box{position:relative;background-color:#333;color:#fff;border-radius:4px;font-size:14px;line-height:1.4;white-space:normal;outline:0;transition-property:transform,visibility,opacity}.tippy-box[data-placement^=top]>.tippy-arrow{bottom:0}.tippy-box[data-placement^=top]>.tippy-arrow:before{bottom:-7px;left:0;border-width:8px 8px 0;border-top-color:initial;transform-origin:center top}.tippy-box[data-placement^=bottom]>.tippy-arrow{top:0}.tippy-box[data-placement^=bottom]>.tippy-arrow:before{top:-7px;left:0;border-width:0 8px 8px;border-bottom-color:initial;transform-origin:center bottom}.tippy-box[data-placement^=left]>.tippy-arrow{right:0}.tippy-box[data-placement^=left]>.tippy-arrow:before{border-width:8px 0 8px 8px;border-left-color:initial;right:-7px;transform-origin:center left}.tippy-box[data-placement^=right]>.tippy-arrow{left:0}.tippy-box[data-placement^=right]>.tippy-arrow:before{left:-7px;border-width:8px 8px 8px 0;border-right-color:initial;transform-origin:center right}.tippy-box[data-inertia][data-state=visible]{transition-timing-function:cubic-bezier(.54,1.5,.38,1.11)}.tippy-arrow{width:16px;height:16px;color:#333}.tippy-arrow:before{content:"";position:absolute;border-color:transparent;border-style:solid}.tippy-content{position:relative;padding:5px 9px;z-index:1}'),F.setDefaultProps({plugins:[Y,G,K,Q],render:N}),F.createSingleton=function(t,e){var n;void 0===e&&(e={});var r,o=t,i=[],a=[],s=e.overrides,u=[],f=!1;function l(){a=o.map((function(t){return c(t.props.triggerTarget||t.reference)})).reduce((function(t,e){return t.concat(e)}),[])}function d(){i=o.map((function(t){return t.reference}))}function v(t){o.forEach((function(e){t?e.enable():e.disable()}))}function g(t){return o.map((function(e){var n=e.setProps;return e.setProps=function(o){n(o),e.reference===r&&t.setProps(o)},function(){e.setProps=n}}))}function h(t,e){var n=a.indexOf(e);if(e!==r){r=e;var u=(s||[]).concat("content").reduce((function(t,e){return t[e]=o[n].props[e],t}),{});t.setProps(Object.assign({},u,{getReferenceClientRect:"function"==typeof u.getReferenceClientRect?u.getReferenceClientRect:function(){var t;return null==(t=i[n])?void 0:t.getBoundingClientRect()}}))}}v(!1),d(),l();var b={fn:function(){return{onDestroy:function(){v(!0)},onHidden:function(){r=null},onClickOutside:function(t){t.props.showOnCreate&&!f&&(f=!0,r=null)},onShow:function(t){t.props.showOnCreate&&!f&&(f=!0,h(t,i[0]))},onTrigger:function(t,e){h(t,e.currentTarget)}}}},y=F(m(),Object.assign({},p(e,["overrides"]),{plugins:[b].concat(e.plugins||[]),triggerTarget:a,popperOptions:Object.assign({},e.popperOptions,{modifiers:[].concat((null==(n=e.popperOptions)?void 0:n.modifiers)||[],[W])})})),w=y.show;y.show=function(t){if(w(),!r&&null==t)return h(y,i[0]);if(!r||null!=t){if("number"==typeof t)return i[t]&&h(y,i[t]);if(o.indexOf(t)>=0){var e=t.reference;return h(y,e)}return i.indexOf(t)>=0?h(y,t):void 0}},y.showNext=function(){var t=i[0];if(!r)return y.show(0);var e=i.indexOf(r);y.show(i[e+1]||t)},y.showPrevious=function(){var t=i[i.length-1];if(!r)return y.show(t);var e=i.indexOf(r),n=i[e-1]||t;y.show(n)};var x=y.setProps;return y.setProps=function(t){s=t.overrides||s,x(t)},y.setInstances=function(t){v(!0),u.forEach((function(t){return t()})),o=t,v(!1),d(),l(),u=g(y),y.setProps({triggerTarget:a})},u=g(y),y},F.delegate=function(t,e){var n=[],o=[],i=!1,a=e.target,s=p(e,["target"]),u=Object.assign({},s,{trigger:"manual",touch:!1}),f=Object.assign({touch:R.touch},s,{showOnCreate:!0}),l=F(t,u);function d(t){if(t.target&&!i){var n=t.target.closest(a);if(n){var r=n.getAttribute("data-tippy-trigger")||e.trigger||R.trigger;if(!n._tippy&&!("touchstart"===t.type&&"boolean"==typeof f.touch||"touchstart"!==t.type&&r.indexOf(X[t.type])<0)){var s=F(n,f);s&&(o=o.concat(s))}}}}function v(t,e,r,o){void 0===o&&(o=!1),t.addEventListener(e,r,o),n.push({node:t,eventType:e,handler:r,options:o})}return c(l).forEach((function(t){var e=t.destroy,a=t.enable,s=t.disable;t.destroy=function(t){void 0===t&&(t=!0),t&&o.forEach((function(t){t.destroy()})),o=[],n.forEach((function(t){var e=t.node,n=t.eventType,r=t.handler,o=t.options;e.removeEventListener(n,r,o)})),n=[],e()},t.enable=function(){a(),o.forEach((function(t){return t.enable()})),i=!1},t.disable=function(){s(),o.forEach((function(t){return t.disable()})),i=!0},function(t){var e=t.reference;v(e,"touchstart",d,r),v(e,"mouseover",d),v(e,"focusin",d),v(e,"click",d)}(t)})),l},F.hideAll=function(t){var e=void 0===t?{}:t,n=e.exclude,r=e.duration;_.forEach((function(t){var e=!1;if(n&&(e=b(n)?t.reference===n:t.popper===n.popper),!e){var o=t.props.duration;t.setProps({duration:r}),t.hide(),t.state.isDestroyed||t.setProps({duration:o})}}))},F.roundArrow='<svg width="16" height="6" xmlns="http://www.w3.org/2000/svg"><path d="M0 6s1.796-.013 4.67-3.615C5.851.9 6.93.006 8 0c1.07-.006 2.148.887 3.343 2.385C14.233 6.005 16 6 16 6H0z"></svg>',F}));
//# sourceMappingURL=tippy-bundle.umd.min.js.map
!function (t, e) { "object" == typeof exports && "undefined" != typeof module ? module.exports = e(require("jquery")) : "function" == typeof define && define.amd ? define(["jquery"], e) : (t = t || self).parsley = e(t.jQuery) }(this, function (h) { "use strict"; function n(t) { return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) { return typeof t } : function (t) { return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t })(t) } function l() { return (l = Object.assign || function (t) { for (var e = 1; e < arguments.length; e++) { var i = arguments[e]; for (var r in i) Object.prototype.hasOwnProperty.call(i, r) && (t[r] = i[r]) } return t }).apply(this, arguments) } function o(t, e) { return function (t) { if (Array.isArray(t)) return t }(t) || function (t, e) { if (!(Symbol.iterator in Object(t) || "[object Arguments]" === Object.prototype.toString.call(t))) return; var i = [], r = !0, n = !1, s = void 0; try { for (var a, o = t[Symbol.iterator](); !(r = (a = o.next()).done) && (i.push(a.value), !e || i.length !== e); r = !0); } catch (t) { n = !0, s = t } finally { try { r || null == o.return || o.return() } finally { if (n) throw s } } return i }(t, e) || function () { throw new TypeError("Invalid attempt to destructure non-iterable instance") }() } function u(t) { return function (t) { if (Array.isArray(t)) { for (var e = 0, i = new Array(t.length); e < t.length; e++)i[e] = t[e]; return i } }(t) || function (t) { if (Symbol.iterator in Object(t) || "[object Arguments]" === Object.prototype.toString.call(t)) return Array.from(t) }(t) || function () { throw new TypeError("Invalid attempt to spread non-iterable instance") }() } var t = 1, e = {}, d = { attr: function (t, e, i) { var r, n, s, a = new RegExp("^" + e, "i"); if (void 0 === i) i = {}; else for (r in i) i.hasOwnProperty(r) && delete i[r]; if (!t) return i; for (r = (s = t.attributes).length; r--;)(n = s[r]) && n.specified && a.test(n.name) && (i[this.camelize(n.name.slice(e.length))] = this.deserializeValue(n.value)); return i }, checkAttr: function (t, e, i) { return t.hasAttribute(e + i) }, setAttr: function (t, e, i, r) { t.setAttribute(this.dasherize(e + i), String(r)) }, getType: function (t) { return t.getAttribute("type") || "text" }, generateID: function () { return "" + t++ }, deserializeValue: function (e) { var t; try { return e ? "true" == e || "false" != e && ("null" == e ? null : isNaN(t = Number(e)) ? /^[\[\{]/.test(e) ? JSON.parse(e) : e : t) : e } catch (t) { return e } }, camelize: function (t) { return t.replace(/-+(.)?/g, function (t, e) { return e ? e.toUpperCase() : "" }) }, dasherize: function (t) { return t.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase() }, warn: function () { var t; window.console && "function" == typeof window.console.warn && (t = window.console).warn.apply(t, arguments) }, warnOnce: function (t) { e[t] || (e[t] = !0, this.warn.apply(this, arguments)) }, _resetWarnings: function () { e = {} }, trimString: function (t) { return t.replace(/^\s+|\s+$/g, "") }, parse: { date: function (t) { var e = t.match(/^(\d{4,})-(\d\d)-(\d\d)$/); if (!e) return null; var i = o(e.map(function (t) { return parseInt(t, 10) }), 4), r = (i[0], i[1]), n = i[2], s = i[3], a = new Date(r, n - 1, s); return a.getFullYear() !== r || a.getMonth() + 1 !== n || a.getDate() !== s ? null : a }, string: function (t) { return t }, integer: function (t) { return isNaN(t) ? null : parseInt(t, 10) }, number: function (t) { if (isNaN(t)) throw null; return parseFloat(t) }, boolean: function (t) { return !/^\s*false\s*$/i.test(t) }, object: function (t) { return d.deserializeValue(t) }, regexp: function (t) { var e = ""; return t = /^\/.*\/(?:[gimy]*)$/.test(t) ? (e = t.replace(/.*\/([gimy]*)$/, "$1"), t.replace(new RegExp("^/(.*?)/" + e + "$"), "$1")) : "^" + t + "$", new RegExp(t, e) } }, parseRequirement: function (t, e) { var i = this.parse[t || "string"]; if (!i) throw 'Unknown requirement specification: "' + t + '"'; var r = i(e); if (null === r) throw "Requirement is not a ".concat(t, ': "').concat(e, '"'); return r }, namespaceEvents: function (t, e) { return (t = this.trimString(t || "").split(/\s+/))[0] ? h.map(t, function (t) { return "".concat(t, ".").concat(e) }).join(" ") : "" }, difference: function (t, i) { var r = []; return h.each(t, function (t, e) { -1 == i.indexOf(e) && r.push(e) }), r }, all: function (t) { return h.when.apply(h, u(t).concat([42, 42])) }, objectCreate: Object.create || function (t) { if (1 < arguments.length) throw Error("Second argument not supported"); if ("object" != n(t)) throw TypeError("Argument must be an object"); i.prototype = t; var e = new i; return i.prototype = null, e }, _SubmitSelector: 'input[type="submit"], button:submit' }; function i() { } function r() { this.__id__ = d.generateID() } var s = { namespace: "data-parsley-", inputs: "input, textarea, select", excluded: "input[type=button], input[type=submit], input[type=reset], input[type=hidden]", priorityEnabled: !0, multiple: null, group: null, uiEnabled: !0, validationThreshold: 3, focus: "first", trigger: !1, triggerAfterFailure: "input", errorClass: "parsley-error", successClass: "parsley-success", classHandler: function () { }, errorsContainer: function () { }, errorsWrapper: '<ul class="parsley-errors-list"></ul>', errorTemplate: "<li></li>" }; r.prototype = { asyncSupport: !0, _pipeAccordingToValidationResult: function () { function t() { var t = h.Deferred(); return !0 !== e.validationResult && t.reject(), t.resolve().promise() } var e = this; return [t, t] }, actualizeOptions: function () { return d.attr(this.element, this.options.namespace, this.domOptions), this.parent && this.parent.actualizeOptions && this.parent.actualizeOptions(), this }, _resetOptions: function (t) { for (var e in this.domOptions = d.objectCreate(this.parent.options), this.options = d.objectCreate(this.domOptions), t) t.hasOwnProperty(e) && (this.options[e] = t[e]); this.actualizeOptions() }, _listeners: null, on: function (t, e) { return this._listeners = this._listeners || {}, (this._listeners[t] = this._listeners[t] || []).push(e), this }, subscribe: function (t, e) { h.listenTo(this, t.toLowerCase(), e) }, off: function (t, e) { var i = this._listeners && this._listeners[t]; if (i) if (e) for (var r = i.length; r--;)i[r] === e && i.splice(r, 1); else delete this._listeners[t]; return this }, unsubscribe: function (t) { h.unsubscribeTo(this, t.toLowerCase()) }, trigger: function (t, e, i) { e = e || this; var r, n = this._listeners && this._listeners[t]; if (n) for (var s = n.length; s--;)if (!1 === (r = n[s].call(e, e, i))) return r; return !this.parent || this.parent.trigger(t, e, i) }, asyncIsValid: function (t, e) { return d.warnOnce("asyncIsValid is deprecated; please use whenValid instead"), this.whenValid({ group: t, force: e }) }, _findRelated: function () { return this.options.multiple ? h(this.parent.element.querySelectorAll("[".concat(this.options.namespace, 'multiple="').concat(this.options.multiple, '"]'))) : this.$element } }; function c(t) { h.extend(!0, this, t) } c.prototype = { validate: function (t, e) { if (this.fn) return 3 < arguments.length && (e = [].slice.call(arguments, 1, -1)), this.fn(t, e); if (Array.isArray(t)) { if (!this.validateMultiple) throw "Validator `" + this.name + "` does not handle multiple values"; return this.validateMultiple.apply(this, arguments) } var i = arguments[arguments.length - 1]; if (this.validateDate && i._isDateInput()) return arguments[0] = d.parse.date(arguments[0]), null !== arguments[0] && this.validateDate.apply(this, arguments); if (this.validateNumber) return !t || !isNaN(t) && (arguments[0] = parseFloat(arguments[0]), this.validateNumber.apply(this, arguments)); if (this.validateString) return this.validateString.apply(this, arguments); throw "Validator `" + this.name + "` only handles multiple values" }, parseRequirements: function (t, e) { if ("string" != typeof t) return Array.isArray(t) ? t : [t]; var i = this.requirementType; if (Array.isArray(i)) { for (var r = function (t, e) { var i = t.match(/^\s*\[(.*)\]\s*$/); if (!i) throw 'Requirement is not an array: "' + t + '"'; var r = i[1].split(",").map(d.trimString); if (r.length !== e) throw "Requirement has " + r.length + " values when " + e + " are needed"; return r }(t, i.length), n = 0; n < r.length; n++)r[n] = d.parseRequirement(i[n], r[n]); return r } return h.isPlainObject(i) ? function (t, e, i) { var r = null, n = {}; for (var s in t) if (s) { var a = i(s); "string" == typeof a && (a = d.parseRequirement(t[s], a)), n[s] = a } else r = d.parseRequirement(t[s], e); return [r, n] }(i, t, e) : [d.parseRequirement(i, t)] }, requirementType: "string", priority: 2 }; function a(t, e) { this.__class__ = "ValidatorRegistry", this.locale = "en", this.init(t || {}, e || {}) } var p = { email: /^((([a-zA-Z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-zA-Z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))$/, number: /^-?(\d*\.)?\d+(e[-+]?\d+)?$/i, integer: /^-?\d+$/, digits: /^\d+$/, alphanum: /^\w+$/i, date: { test: function (t) { return null !== d.parse.date(t) } }, url: new RegExp("^(?:(?:https?|ftp)://)?(?:\\S+(?::\\S*)?@)?(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-zA-Z\\u00a1-\\uffff0-9]-*)*[a-zA-Z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-zA-Z\\u00a1-\\uffff0-9]-*)*[a-zA-Z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-zA-Z\\u00a1-\\uffff]{2,})))(?::\\d{2,5})?(?:/\\S*)?$") }; p.range = p.number; function f(t) { var e = ("" + t).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/); return e ? Math.max(0, (e[1] ? e[1].length : 0) - (e[2] ? +e[2] : 0)) : 0 } function m(s, a) { return function (t) { for (var e = arguments.length, i = new Array(1 < e ? e - 1 : 0), r = 1; r < e; r++)i[r - 1] = arguments[r]; return i.pop(), a.apply(void 0, [t].concat(u((n = s, i.map(d.parse[n]))))); var n } } function g(t) { return { validateDate: m("date", t), validateNumber: m("number", t), requirementType: t.length <= 2 ? "string" : ["string", "string"], priority: 30 } } a.prototype = { init: function (t, e) { for (var i in this.catalog = e, this.validators = l({}, this.validators), t) this.addValidator(i, t[i].fn, t[i].priority); window.Parsley.trigger("parsley:validator:init") }, setLocale: function (t) { if (void 0 === this.catalog[t]) throw new Error(t + " is not available in the catalog"); return this.locale = t, this }, addCatalog: function (t, e, i) { return "object" === n(e) && (this.catalog[t] = e), !0 === i ? this.setLocale(t) : this }, addMessage: function (t, e, i) { return void 0 === this.catalog[t] && (this.catalog[t] = {}), this.catalog[t][e] = i, this }, addMessages: function (t, e) { for (var i in e) this.addMessage(t, i, e[i]); return this }, addValidator: function (t, e, i) { if (this.validators[t]) d.warn('Validator "' + t + '" is already defined.'); else if (s.hasOwnProperty(t)) return void d.warn('"' + t + '" is a restricted keyword and is not a valid validator name.'); return this._setValidator.apply(this, arguments) }, hasValidator: function (t) { return !!this.validators[t] }, updateValidator: function (t, e, i) { return this.validators[t] ? this._setValidator.apply(this, arguments) : (d.warn('Validator "' + t + '" is not already defined.'), this.addValidator.apply(this, arguments)) }, removeValidator: function (t) { return this.validators[t] || d.warn('Validator "' + t + '" is not defined.'), delete this.validators[t], this }, _setValidator: function (t, e, i) { for (var r in "object" !== n(e) && (e = { fn: e, priority: i }), e.validate || (e = new c(e)), (this.validators[t] = e).messages || {}) this.addMessage(r, t, e.messages[r]); return this }, getErrorMessage: function (t) { var e; "type" === t.name ? e = (this.catalog[this.locale][t.name] || {})[t.requirements] : e = this.formatMessage(this.catalog[this.locale][t.name], t.requirements); return e || this.catalog[this.locale].defaultMessage || this.catalog.en.defaultMessage }, formatMessage: function (t, e) { if ("object" !== n(e)) return "string" == typeof t ? t.replace(/%s/i, e) : ""; for (var i in e) t = this.formatMessage(t, e[i]); return t }, validators: { notblank: { validateString: function (t) { return /\S/.test(t) }, priority: 2 }, required: { validateMultiple: function (t) { return 0 < t.length }, validateString: function (t) { return /\S/.test(t) }, priority: 512 }, type: { validateString: function (t, e, i) { var r = 2 < arguments.length && void 0 !== i ? i : {}, n = r.step, s = void 0 === n ? "any" : n, a = r.base, o = void 0 === a ? 0 : a, l = p[e]; if (!l) throw new Error("validator type `" + e + "` is not supported"); if (!t) return !0; if (!l.test(t)) return !1; if ("number" === e && !/^any$/i.test(s || "")) { var u = Number(t), d = Math.max(f(s), f(o)); if (f(u) > d) return !1; var h = function (t) { return Math.round(t * Math.pow(10, d)) }; if ((h(u) - h(o)) % h(s) != 0) return !1 } return !0 }, requirementType: { "": "string", step: "string", base: "number" }, priority: 256 }, pattern: { validateString: function (t, e) { return !t || e.test(t) }, requirementType: "regexp", priority: 64 }, minlength: { validateString: function (t, e) { return !t || t.length >= e }, requirementType: "integer", priority: 30 }, maxlength: { validateString: function (t, e) { return t.length <= e }, requirementType: "integer", priority: 30 }, length: { validateString: function (t, e, i) { return !t || t.length >= e && t.length <= i }, requirementType: ["integer", "integer"], priority: 30 }, mincheck: { validateMultiple: function (t, e) { return t.length >= e }, requirementType: "integer", priority: 30 }, maxcheck: { validateMultiple: function (t, e) { return t.length <= e }, requirementType: "integer", priority: 30 }, check: { validateMultiple: function (t, e, i) { return t.length >= e && t.length <= i }, requirementType: ["integer", "integer"], priority: 30 }, min: g(function (t, e) { return e <= t }), max: g(function (t, e) { return t <= e }), range: g(function (t, e, i) { return e <= t && t <= i }), equalto: { validateString: function (t, e) { if (!t) return !0; var i = h(e); return i.length ? t === i.val() : t === e }, priority: 256 }, euvatin: { validateString: function (t) { if (!t) return !0; return /^[A-Z][A-Z][A-Za-z0-9 -]{2,}$/.test(t) }, priority: 30 } } }; var v = {}; v.Form = { _actualizeTriggers: function () { var e = this; this.$element.on("submit.Parsley", function (t) { e.onSubmitValidate(t) }), this.$element.on("click.Parsley", d._SubmitSelector, function (t) { e.onSubmitButton(t) }), !1 !== this.options.uiEnabled && this.element.setAttribute("novalidate", "") }, focus: function () { if (!(this._focusedField = null) === this.validationResult || "none" === this.options.focus) return null; for (var t = 0; t < this.fields.length; t++) { var e = this.fields[t]; if (!0 !== e.validationResult && 0 < e.validationResult.length && void 0 === e.options.noFocus && (this._focusedField = e.$element, "first" === this.options.focus)) break } return null === this._focusedField ? null : this._focusedField.focus() }, _destroyUI: function () { this.$element.off(".Parsley") } }, v.Field = { _reflowUI: function () { if (this._buildUI(), this._ui) { var t = function t(e, i, r) { for (var n = [], s = [], a = 0; a < e.length; a++) { for (var o = !1, l = 0; l < i.length; l++)if (e[a].assert.name === i[l].assert.name) { o = !0; break } o ? s.push(e[a]) : n.push(e[a]) } return { kept: s, added: n, removed: r ? [] : t(i, e, !0).added } }(this.validationResult, this._ui.lastValidationResult); this._ui.lastValidationResult = this.validationResult, this._manageStatusClass(), this._manageErrorsMessages(t), this._actualizeTriggers(), !t.kept.length && !t.added.length || this._failedOnce || (this._failedOnce = !0, this._actualizeTriggers()) } }, getErrorsMessages: function () { if (!0 === this.validationResult) return []; for (var t = [], e = 0; e < this.validationResult.length; e++)t.push(this.validationResult[e].errorMessage || this._getErrorMessage(this.validationResult[e].assert)); return t }, addError: function (t, e) { var i = 1 < arguments.length && void 0 !== e ? e : {}, r = i.message, n = i.assert, s = i.updateClass, a = void 0 === s || s; this._buildUI(), this._addError(t, { message: r, assert: n }), a && this._errorClass() }, updateError: function (t, e) { var i = 1 < arguments.length && void 0 !== e ? e : {}, r = i.message, n = i.assert, s = i.updateClass, a = void 0 === s || s; this._buildUI(), this._updateError(t, { message: r, assert: n }), a && this._errorClass() }, removeError: function (t, e) { var i = (1 < arguments.length && void 0 !== e ? e : {}).updateClass, r = void 0 === i || i; this._buildUI(), this._removeError(t), r && this._manageStatusClass() }, _manageStatusClass: function () { this.hasConstraints() && this.needsValidation() && !0 === this.validationResult ? this._successClass() : 0 < this.validationResult.length ? this._errorClass() : this._resetClass() }, _manageErrorsMessages: function (t) { if (void 0 === this.options.errorsMessagesDisabled) { if (void 0 !== this.options.errorMessage) return t.added.length || t.kept.length ? (this._insertErrorWrapper(), 0 === this._ui.$errorsWrapper.find(".parsley-custom-error-message").length && this._ui.$errorsWrapper.append(h(this.options.errorTemplate).addClass("parsley-custom-error-message")), this._ui.$errorClassHandler.attr("aria-describedby", this._ui.errorsWrapperId), this._ui.$errorsWrapper.addClass("filled").attr("aria-hidden", "false").find(".parsley-custom-error-message").html(this.options.errorMessage)) : (this._ui.$errorClassHandler.removeAttr("aria-describedby"), this._ui.$errorsWrapper.removeClass("filled").attr("aria-hidden", "true").find(".parsley-custom-error-message").remove()); for (var e = 0; e < t.removed.length; e++)this._removeError(t.removed[e].assert.name); for (e = 0; e < t.added.length; e++)this._addError(t.added[e].assert.name, { message: t.added[e].errorMessage, assert: t.added[e].assert }); for (e = 0; e < t.kept.length; e++)this._updateError(t.kept[e].assert.name, { message: t.kept[e].errorMessage, assert: t.kept[e].assert }) } }, _addError: function (t, e) { var i = e.message, r = e.assert; this._insertErrorWrapper(), this._ui.$errorClassHandler.attr("aria-describedby", this._ui.errorsWrapperId), this._ui.$errorsWrapper.addClass("filled").attr("aria-hidden", "false").append(h(this.options.errorTemplate).addClass("parsley-" + t).html(i || this._getErrorMessage(r))) }, _updateError: function (t, e) { var i = e.message, r = e.assert; this._ui.$errorsWrapper.addClass("filled").find(".parsley-" + t).html(i || this._getErrorMessage(r)) }, _removeError: function (t) { this._ui.$errorClassHandler.removeAttr("aria-describedby"), this._ui.$errorsWrapper.removeClass("filled").attr("aria-hidden", "true").find(".parsley-" + t).remove() }, _getErrorMessage: function (t) { var e = t.name + "Message"; return void 0 !== this.options[e] ? window.Parsley.formatMessage(this.options[e], t.requirements) : window.Parsley.getErrorMessage(t) }, _buildUI: function () { if (!this._ui && !1 !== this.options.uiEnabled) { var t = {}; this.element.setAttribute(this.options.namespace + "id", this.__id__), t.$errorClassHandler = this._manageClassHandler(), t.errorsWrapperId = "parsley-id-" + (this.options.multiple ? "multiple-" + this.options.multiple : this.__id__), t.$errorsWrapper = h(this.options.errorsWrapper).attr("id", t.errorsWrapperId), t.lastValidationResult = [], t.validationInformationVisible = !1, this._ui = t } }, _manageClassHandler: function () { if ("string" == typeof this.options.classHandler && h(this.options.classHandler).length) return h(this.options.classHandler); var t = this.options.classHandler; if ("string" == typeof this.options.classHandler && "function" == typeof window[this.options.classHandler] && (t = window[this.options.classHandler]), "function" == typeof t) { var e = t.call(this, this); if (void 0 !== e && e.length) return e } else { if ("object" === n(t) && t instanceof jQuery && t.length) return t; t && d.warn("The class handler `" + t + "` does not exist in DOM nor as a global JS function") } return this._inputHolder() }, _inputHolder: function () { return this.options.multiple && "SELECT" !== this.element.nodeName ? this.$element.parent() : this.$element }, _insertErrorWrapper: function () { var t = this.options.errorsContainer; if (0 !== this._ui.$errorsWrapper.parent().length) return this._ui.$errorsWrapper.parent(); if ("string" == typeof t) { if (h(t).length) return h(t).append(this._ui.$errorsWrapper); "function" == typeof window[t] ? t = window[t] : d.warn("The errors container `" + t + "` does not exist in DOM nor as a global JS function") } return "function" == typeof t && (t = t.call(this, this)), "object" === n(t) && t.length ? t.append(this._ui.$errorsWrapper) : this._inputHolder().after(this._ui.$errorsWrapper) }, _actualizeTriggers: function () { var t, e = this, i = this._findRelated(); i.off(".Parsley"), this._failedOnce ? i.on(d.namespaceEvents(this.options.triggerAfterFailure, "Parsley"), function () { e._validateIfNeeded() }) : (t = d.namespaceEvents(this.options.trigger, "Parsley")) && i.on(t, function (t) { e._validateIfNeeded(t) }) }, _validateIfNeeded: function (t) { var e = this; t && /key|input/.test(t.type) && (!this._ui || !this._ui.validationInformationVisible) && this.getValue().length <= this.options.validationThreshold || (this.options.debounce ? (window.clearTimeout(this._debounced), this._debounced = window.setTimeout(function () { return e.validate() }, this.options.debounce)) : this.validate()) }, _resetUI: function () { this._failedOnce = !1, this._actualizeTriggers(), void 0 !== this._ui && (this._ui.$errorsWrapper.removeClass("filled").children().remove(), this._resetClass(), this._ui.lastValidationResult = [], this._ui.validationInformationVisible = !1) }, _destroyUI: function () { this._resetUI(), void 0 !== this._ui && this._ui.$errorsWrapper.remove(), delete this._ui }, _successClass: function () { this._ui.validationInformationVisible = !0, this._ui.$errorClassHandler.removeClass(this.options.errorClass).addClass(this.options.successClass) }, _errorClass: function () { this._ui.validationInformationVisible = !0, this._ui.$errorClassHandler.removeClass(this.options.successClass).addClass(this.options.errorClass) }, _resetClass: function () { this._ui.$errorClassHandler.removeClass(this.options.successClass).removeClass(this.options.errorClass) } }; function y(t, e, i) { this.__class__ = "Form", this.element = t, this.$element = h(t), this.domOptions = e, this.options = i, this.parent = window.Parsley, this.fields = [], this.validationResult = null } var _ = { pending: null, resolved: !0, rejected: !1 }; y.prototype = { onSubmitValidate: function (t) { var e = this; if (!0 !== t.parsley) { var i = this._submitSource || this.$element.find(d._SubmitSelector)[0]; if (this._submitSource = null, this.$element.find(".parsley-synthetic-submit-button").prop("disabled", !0), !i || null === i.getAttribute("formnovalidate")) { window.Parsley._remoteCache = {}; var r = this.whenValidate({ event: t }); "resolved" === r.state() && !1 !== this._trigger("submit") || (t.stopImmediatePropagation(), t.preventDefault(), "pending" === r.state() && r.done(function () { e._submit(i) })) } } }, onSubmitButton: function (t) { this._submitSource = t.currentTarget }, _submit: function (t) { if (!1 !== this._trigger("submit")) { if (t) { var e = this.$element.find(".parsley-synthetic-submit-button").prop("disabled", !1); 0 === e.length && (e = h('<input class="parsley-synthetic-submit-button" type="hidden">').appendTo(this.$element)), e.attr({ name: t.getAttribute("name"), value: t.getAttribute("value") }) } this.$element.trigger(l(h.Event("submit"), { parsley: !0 })) } }, validate: function (t) { if (1 <= arguments.length && !h.isPlainObject(t)) { d.warnOnce("Calling validate on a parsley form without passing arguments as an object is deprecated."); var e = Array.prototype.slice.call(arguments); t = { group: e[0], force: e[1], event: e[2] } } return _[this.whenValidate(t).state()] }, whenValidate: function (t) { var e, i = this, r = 0 < arguments.length && void 0 !== t ? t : {}, n = r.group, s = r.force, a = r.event; (this.submitEvent = a) && (this.submitEvent = l({}, a, { preventDefault: function () { d.warnOnce("Using `this.submitEvent.preventDefault()` is deprecated; instead, call `this.validationResult = false`"), i.validationResult = !1 } })), this.validationResult = !0, this._trigger("validate"), this._refreshFields(); var o = this._withoutReactualizingFormOptions(function () { return h.map(i.fields, function (t) { return t.whenValidate({ force: s, group: n }) }) }); return (e = d.all(o).done(function () { i._trigger("success") }).fail(function () { i.validationResult = !1, i.focus(), i._trigger("error") }).always(function () { i._trigger("validated") })).pipe.apply(e, u(this._pipeAccordingToValidationResult())) }, isValid: function (t) { if (1 <= arguments.length && !h.isPlainObject(t)) { d.warnOnce("Calling isValid on a parsley form without passing arguments as an object is deprecated."); var e = Array.prototype.slice.call(arguments); t = { group: e[0], force: e[1] } } return _[this.whenValid(t).state()] }, whenValid: function (t) { var e = this, i = 0 < arguments.length && void 0 !== t ? t : {}, r = i.group, n = i.force; this._refreshFields(); var s = this._withoutReactualizingFormOptions(function () { return h.map(e.fields, function (t) { return t.whenValid({ group: r, force: n }) }) }); return d.all(s) }, refresh: function () { return this._refreshFields(), this }, reset: function () { for (var t = 0; t < this.fields.length; t++)this.fields[t].reset(); this._trigger("reset") }, destroy: function () { this._destroyUI(); for (var t = 0; t < this.fields.length; t++)this.fields[t].destroy(); this.$element.removeData("Parsley"), this._trigger("destroy") }, _refreshFields: function () { return this.actualizeOptions()._bindFields() }, _bindFields: function () { var n = this, t = this.fields; return this.fields = [], this.fieldsMappedById = {}, this._withoutReactualizingFormOptions(function () { n.$element.find(n.options.inputs).not(n.options.excluded).not("[".concat(n.options.namespace, "excluded=true]")).each(function (t, e) { var i = new window.Parsley.Factory(e, {}, n); if ("Field" === i.__class__ || "FieldMultiple" === i.__class__) { var r = i.__class__ + "-" + i.__id__; void 0 === n.fieldsMappedById[r] && (n.fieldsMappedById[r] = i, n.fields.push(i)) } }), h.each(d.difference(t, n.fields), function (t, e) { e.reset() }) }), this }, _withoutReactualizingFormOptions: function (t) { var e = this.actualizeOptions; this.actualizeOptions = function () { return this }; var i = t(); return this.actualizeOptions = e, i }, _trigger: function (t) { return this.trigger("form:" + t) } }; function b(t, e, i, r, n) { var s = window.Parsley._validatorRegistry.validators[e], a = new c(s); l(this, { validator: a, name: e, requirements: i, priority: r = r || t.options[e + "Priority"] || a.priority, isDomConstraint: n = !0 === n }), this._parseRequirements(t.options) } function w(t, e, i, r) { this.__class__ = "Field", this.element = t, this.$element = h(t), void 0 !== r && (this.parent = r), this.options = i, this.domOptions = e, this.constraints = [], this.constraintsByName = {}, this.validationResult = !0, this._bindConstraints() } var F = { pending: null, resolved: !0, rejected: !(b.prototype = { validate: function (t, e) { var i; return (i = this.validator).validate.apply(i, [t].concat(u(this.requirementList), [e])) }, _parseRequirements: function (i) { var r = this; this.requirementList = this.validator.parseRequirements(this.requirements, function (t) { return i[r.name + ((e = t)[0].toUpperCase() + e.slice(1))]; var e }) } }) }; w.prototype = { validate: function (t) { 1 <= arguments.length && !h.isPlainObject(t) && (d.warnOnce("Calling validate on a parsley field without passing arguments as an object is deprecated."), t = { options: t }); var e = this.whenValidate(t); if (!e) return !0; switch (e.state()) { case "pending": return null; case "resolved": return !0; case "rejected": return this.validationResult } }, whenValidate: function (t) { var e, i = this, r = 0 < arguments.length && void 0 !== t ? t : {}, n = r.force, s = r.group; if (this.refresh(), !s || this._isInGroup(s)) return this.value = this.getValue(), this._trigger("validate"), (e = this.whenValid({ force: n, value: this.value, _refreshed: !0 }).always(function () { i._reflowUI() }).done(function () { i._trigger("success") }).fail(function () { i._trigger("error") }).always(function () { i._trigger("validated") })).pipe.apply(e, u(this._pipeAccordingToValidationResult())) }, hasConstraints: function () { return 0 !== this.constraints.length }, needsValidation: function (t) { return void 0 === t && (t = this.getValue()), !(!t.length && !this._isRequired() && void 0 === this.options.validateIfEmpty) }, _isInGroup: function (t) { return Array.isArray(this.options.group) ? -1 !== h.inArray(t, this.options.group) : this.options.group === t }, isValid: function (t) { if (1 <= arguments.length && !h.isPlainObject(t)) { d.warnOnce("Calling isValid on a parsley field without passing arguments as an object is deprecated."); var e = Array.prototype.slice.call(arguments); t = { force: e[0], value: e[1] } } var i = this.whenValid(t); return !i || F[i.state()] }, whenValid: function (t) { var r = this, e = 0 < arguments.length && void 0 !== t ? t : {}, i = e.force, n = void 0 !== i && i, s = e.value, a = e.group; if (e._refreshed || this.refresh(), !a || this._isInGroup(a)) { if (this.validationResult = !0, !this.hasConstraints()) return h.when(); if (null == s && (s = this.getValue()), !this.needsValidation(s) && !0 !== n) return h.when(); var o = this._getGroupedConstraints(), l = []; return h.each(o, function (t, e) { var i = d.all(h.map(e, function (t) { return r._validateConstraint(s, t) })); if (l.push(i), "rejected" === i.state()) return !1 }), d.all(l) } }, _validateConstraint: function (t, e) { var i = this, r = e.validate(t, this); return !1 === r && (r = h.Deferred().reject()), d.all([r]).fail(function (t) { i.validationResult instanceof Array || (i.validationResult = []), i.validationResult.push({ assert: e, errorMessage: "string" == typeof t && t }) }) }, getValue: function () { var t; return null == (t = "function" == typeof this.options.value ? this.options.value(this) : void 0 !== this.options.value ? this.options.value : this.$element.val()) ? "" : this._handleWhitespace(t) }, reset: function () { return this._resetUI(), this._trigger("reset") }, destroy: function () { this._destroyUI(), this.$element.removeData("Parsley"), this.$element.removeData("FieldMultiple"), this._trigger("destroy") }, refresh: function () { return this._refreshConstraints(), this }, _refreshConstraints: function () { return this.actualizeOptions()._bindConstraints() }, refreshConstraints: function () { return d.warnOnce("Parsley's refreshConstraints is deprecated. Please use refresh"), this.refresh() }, addConstraint: function (t, e, i, r) { if (window.Parsley._validatorRegistry.validators[t]) { var n = new b(this, t, e, i, r); "undefined" !== this.constraintsByName[n.name] && this.removeConstraint(n.name), this.constraints.push(n), this.constraintsByName[n.name] = n } return this }, removeConstraint: function (t) { for (var e = 0; e < this.constraints.length; e++)if (t === this.constraints[e].name) { this.constraints.splice(e, 1); break } return delete this.constraintsByName[t], this }, updateConstraint: function (t, e, i) { return this.removeConstraint(t).addConstraint(t, e, i) }, _bindConstraints: function () { for (var t = [], e = {}, i = 0; i < this.constraints.length; i++)!1 === this.constraints[i].isDomConstraint && (t.push(this.constraints[i]), e[this.constraints[i].name] = this.constraints[i]); for (var r in this.constraints = t, this.constraintsByName = e, this.options) this.addConstraint(r, this.options[r], void 0, !0); return this._bindHtml5Constraints() }, _bindHtml5Constraints: function () { null !== this.element.getAttribute("required") && this.addConstraint("required", !0, void 0, !0), null !== this.element.getAttribute("pattern") && this.addConstraint("pattern", this.element.getAttribute("pattern"), void 0, !0); var t = this.element.getAttribute("min"), e = this.element.getAttribute("max"); null !== t && null !== e ? this.addConstraint("range", [t, e], void 0, !0) : null !== t ? this.addConstraint("min", t, void 0, !0) : null !== e && this.addConstraint("max", e, void 0, !0), null !== this.element.getAttribute("minlength") && null !== this.element.getAttribute("maxlength") ? this.addConstraint("length", [this.element.getAttribute("minlength"), this.element.getAttribute("maxlength")], void 0, !0) : null !== this.element.getAttribute("minlength") ? this.addConstraint("minlength", this.element.getAttribute("minlength"), void 0, !0) : null !== this.element.getAttribute("maxlength") && this.addConstraint("maxlength", this.element.getAttribute("maxlength"), void 0, !0); var i = d.getType(this.element); return "number" === i ? this.addConstraint("type", ["number", { step: this.element.getAttribute("step") || "1", base: t || this.element.getAttribute("value") }], void 0, !0) : /^(email|url|range|date)$/i.test(i) ? this.addConstraint("type", i, void 0, !0) : this }, _isRequired: function () { return void 0 !== this.constraintsByName.required && !1 !== this.constraintsByName.required.requirements }, _trigger: function (t) { return this.trigger("field:" + t) }, _handleWhitespace: function (t) { return !0 === this.options.trimValue && d.warnOnce('data-parsley-trim-value="true" is deprecated, please use data-parsley-whitespace="trim"'), "squish" === this.options.whitespace && (t = t.replace(/\s{2,}/g, " ")), "trim" !== this.options.whitespace && "squish" !== this.options.whitespace && !0 !== this.options.trimValue || (t = d.trimString(t)), t }, _isDateInput: function () { var t = this.constraintsByName.type; return t && "date" === t.requirements }, _getGroupedConstraints: function () { if (!1 === this.options.priorityEnabled) return [this.constraints]; for (var t = [], e = {}, i = 0; i < this.constraints.length; i++) { var r = this.constraints[i].priority; e[r] || t.push(e[r] = []), e[r].push(this.constraints[i]) } return t.sort(function (t, e) { return e[0].priority - t[0].priority }), t } }; function C() { this.__class__ = "FieldMultiple" } C.prototype = { addElement: function (t) { return this.$elements.push(t), this }, _refreshConstraints: function () { var t; if (this.constraints = [], "SELECT" === this.element.nodeName) return this.actualizeOptions()._bindConstraints(), this; for (var e = 0; e < this.$elements.length; e++)if (h("html").has(this.$elements[e]).length) { t = this.$elements[e].data("FieldMultiple")._refreshConstraints().constraints; for (var i = 0; i < t.length; i++)this.addConstraint(t[i].name, t[i].requirements, t[i].priority, t[i].isDomConstraint) } else this.$elements.splice(e, 1); return this }, getValue: function () { if ("function" == typeof this.options.value) return this.options.value(this); if (void 0 !== this.options.value) return this.options.value; if ("INPUT" === this.element.nodeName) { var t = d.getType(this.element); if ("radio" === t) return this._findRelated().filter(":checked").val() || ""; if ("checkbox" === t) { var e = []; return this._findRelated().filter(":checked").each(function () { e.push(h(this).val()) }), e } } return "SELECT" === this.element.nodeName && null === this.$element.val() ? [] : this.$element.val() }, _init: function () { return this.$elements = [this.$element], this } }; function A(t, e, i) { this.element = t, this.$element = h(t); var r = this.$element.data("Parsley"); if (r) return void 0 !== i && r.parent === window.Parsley && (r.parent = i, r._resetOptions(r.options)), "object" === n(e) && l(r.options, e), r; if (!this.$element.length) throw new Error("You must bind Parsley on an existing element."); if (void 0 !== i && "Form" !== i.__class__) throw new Error("Parent instance must be a Form instance"); return this.parent = i || window.Parsley, this.init(e) } A.prototype = { init: function (t) { return this.__class__ = "Parsley", this.__version__ = "2.9.2", this.__id__ = d.generateID(), this._resetOptions(t), "FORM" === this.element.nodeName || d.checkAttr(this.element, this.options.namespace, "validate") && !this.$element.is(this.options.inputs) ? this.bind("parsleyForm") : this.isMultiple() ? this.handleMultiple() : this.bind("parsleyField") }, isMultiple: function () { var t = d.getType(this.element); return "radio" === t || "checkbox" === t || "SELECT" === this.element.nodeName && null !== this.element.getAttribute("multiple") }, handleMultiple: function () { var t, e, r = this; if (this.options.multiple = this.options.multiple || (t = this.element.getAttribute("name")) || this.element.getAttribute("id"), "SELECT" === this.element.nodeName && null !== this.element.getAttribute("multiple")) return this.options.multiple = this.options.multiple || this.__id__, this.bind("parsleyFieldMultiple"); if (!this.options.multiple) return d.warn("To be bound by Parsley, a radio, a checkbox and a multiple select input must have either a name or a multiple option.", this.$element), this; this.options.multiple = this.options.multiple.replace(/(:|\.|\[|\]|\{|\}|\$)/g, ""), t && h('input[name="' + t + '"]').each(function (t, e) { var i = d.getType(e); "radio" !== i && "checkbox" !== i || e.setAttribute(r.options.namespace + "multiple", r.options.multiple) }); for (var i = this._findRelated(), n = 0; n < i.length; n++)if (void 0 !== (e = h(i.get(n)).data("Parsley"))) { this.$element.data("FieldMultiple") || e.addElement(this.$element); break } return this.bind("parsleyField", !0), e || this.bind("parsleyFieldMultiple") }, bind: function (t, e) { var i; switch (t) { case "parsleyForm": i = h.extend(new y(this.element, this.domOptions, this.options), new r, window.ParsleyExtend)._bindFields(); break; case "parsleyField": i = h.extend(new w(this.element, this.domOptions, this.options, this.parent), new r, window.ParsleyExtend); break; case "parsleyFieldMultiple": i = h.extend(new w(this.element, this.domOptions, this.options, this.parent), new C, new r, window.ParsleyExtend)._init(); break; default: throw new Error(t + "is not a supported Parsley type") }return this.options.multiple && d.setAttr(this.element, this.options.namespace, "multiple", this.options.multiple), void 0 !== e ? this.$element.data("FieldMultiple", i) : (this.$element.data("Parsley", i), i._actualizeTriggers(), i._trigger("init")), i } }; var E = h.fn.jquery.split("."); if (parseInt(E[0]) <= 1 && parseInt(E[1]) < 8) throw "The loaded version of jQuery is too old. Please upgrade to 1.8.x or better."; E.forEach || d.warn("Parsley requires ES5 to run properly. Please include https://github.com/es-shims/es5-shim"); var x = l(new r, { element: document, $element: h(document), actualizeOptions: null, _resetOptions: null, Factory: A, version: "2.9.2" }); l(w.prototype, v.Field, r.prototype), l(y.prototype, v.Form, r.prototype), l(A.prototype, r.prototype), h.fn.parsley = h.fn.psly = function (t) { if (1 < this.length) { var e = []; return this.each(function () { e.push(h(this).parsley(t)) }), e } if (0 != this.length) return new A(this[0], t) }, void 0 === window.ParsleyExtend && (window.ParsleyExtend = {}), x.options = l(d.objectCreate(s), window.ParsleyConfig), window.ParsleyConfig = x.options, window.Parsley = window.psly = x, x.Utils = d, window.ParsleyUtils = {}, h.each(d, function (t, e) { "function" == typeof e && (window.ParsleyUtils[t] = function () { return d.warnOnce("Accessing `window.ParsleyUtils` is deprecated. Use `window.Parsley.Utils` instead."), d[t].apply(d, arguments) }) }); var $ = window.Parsley._validatorRegistry = new a(window.ParsleyConfig.validators, window.ParsleyConfig.i18n); window.ParsleyValidator = {}, h.each("setLocale addCatalog addMessage addMessages getErrorMessage formatMessage addValidator updateValidator removeValidator hasValidator".split(" "), function (t, e) { window.Parsley[e] = function () { return $[e].apply($, arguments) }, window.ParsleyValidator[e] = function () { var t; return d.warnOnce("Accessing the method '".concat(e, "' through Validator is deprecated. Simply call 'window.Parsley.").concat(e, "(...)'")), (t = window.Parsley)[e].apply(t, arguments) } }), window.Parsley.UI = v, window.ParsleyUI = { removeError: function (t, e, i) { var r = !0 !== i; return d.warnOnce("Accessing UI is deprecated. Call 'removeError' on the instance directly. Please comment in issue 1073 as to your need to call this method."), t.removeError(e, { updateClass: r }) }, getErrorsMessages: function (t) { return d.warnOnce("Accessing UI is deprecated. Call 'getErrorsMessages' on the instance directly."), t.getErrorsMessages() } }, h.each("addError updateError".split(" "), function (t, a) { window.ParsleyUI[a] = function (t, e, i, r, n) { var s = !0 !== n; return d.warnOnce("Accessing UI is deprecated. Call '".concat(a, "' on the instance directly. Please comment in issue 1073 as to your need to call this method.")), t[a](e, { message: i, assert: r, updateClass: s }) } }), !1 !== window.ParsleyConfig.autoBind && h(function () { h("[data-parsley-validate]").length && h("[data-parsley-validate]").parsley() }); function V() { d.warnOnce("Parsley's pubsub module is deprecated; use the 'on' and 'off' methods on parsley instances or window.Parsley") } var P = h({}); function O(e, i) { return e.parsleyAdaptedCallback || (e.parsleyAdaptedCallback = function () { var t = Array.prototype.slice.call(arguments, 0); t.unshift(this), e.apply(i || P, t) }), e.parsleyAdaptedCallback } var T = "parsley:"; function M(t) { return 0 === t.lastIndexOf(T, 0) ? t.substr(T.length) : t } return h.listen = function (t, e) { var i; if (V(), "object" === n(arguments[1]) && "function" == typeof arguments[2] && (i = arguments[1], e = arguments[2]), "function" != typeof e) throw new Error("Wrong parameters"); window.Parsley.on(M(t), O(e, i)) }, h.listenTo = function (t, e, i) { if (V(), !(t instanceof w || t instanceof y)) throw new Error("Must give Parsley instance"); if ("string" != typeof e || "function" != typeof i) throw new Error("Wrong parameters"); t.on(M(e), O(i)) }, h.unsubscribe = function (t, e) { if (V(), "string" != typeof t || "function" != typeof e) throw new Error("Wrong arguments"); window.Parsley.off(M(t), e.parsleyAdaptedCallback) }, h.unsubscribeTo = function (t, e) { if (V(), !(t instanceof w || t instanceof y)) throw new Error("Must give Parsley instance"); t.off(M(e)) }, h.unsubscribeAll = function (e) { V(), window.Parsley.off(M(e)), h("form,input,textarea,select").each(function () { var t = h(this).data("Parsley"); t && t.off(M(e)) }) }, h.emit = function (t, e) { V(); var i = e instanceof w || e instanceof y, r = Array.prototype.slice.call(arguments, i ? 2 : 1); r.unshift(M(t)), i || (e = window.Parsley), e.trigger.apply(e, u(r)) }, h.extend(!0, x, { asyncValidators: { default: { fn: function (t) { return 200 <= t.status && t.status < 300 }, url: !1 }, reverse: { fn: function (t) { return t.status < 200 || 300 <= t.status }, url: !1 } }, addAsyncValidator: function (t, e, i, r) { return x.asyncValidators[t] = { fn: e, url: i || !1, options: r || {} }, this } }), x.addValidator("remote", { requirementType: { "": "string", validator: "string", reverse: "boolean", options: "object" }, validateString: function (t, e, i, r) { var n, s, a = {}, o = i.validator || (!0 === i.reverse ? "reverse" : "default"); if (void 0 === x.asyncValidators[o]) throw new Error("Calling an undefined async validator: `" + o + "`"); -1 < (e = x.asyncValidators[o].url || e).indexOf("{value}") ? e = e.replace("{value}", encodeURIComponent(t)) : a[r.element.getAttribute("name") || r.element.getAttribute("id")] = t; var l = h.extend(!0, i.options || {}, x.asyncValidators[o].options); n = h.extend(!0, {}, { url: e, data: a, type: "GET" }, l), r.trigger("field:ajaxoptions", r, n), s = h.param(n), void 0 === x._remoteCache && (x._remoteCache = {}); function u() { var t = x.asyncValidators[o].fn.call(r, d, e, i); return t = t || h.Deferred().reject(), h.when(t) } var d = x._remoteCache[s] = x._remoteCache[s] || h.ajax(n); return d.then(u, u) }, priority: -1 }), x.on("form:submit", function () { x._remoteCache = {} }), r.prototype.addAsyncValidator = function () { return d.warnOnce("Accessing the method `addAsyncValidator` through an instance is deprecated. Simply call `Parsley.addAsyncValidator(...)`"), x.addAsyncValidator.apply(x, arguments) }, x.addMessages("en", { defaultMessage: "This value seems to be invalid.", type: { email: "This value should be a valid email.", url: "This value should be a valid url.", number: "This value should be a valid number.", integer: "This value should be a valid integer.", digits: "This value should be digits.", alphanum: "This value should be alphanumeric." }, notblank: "This value should not be blank.", required: "This value is required.", pattern: "This value seems to be invalid.", min: "This value should be greater than or equal to %s.", max: "This value should be lower than or equal to %s.", range: "This value should be between %s and %s.", minlength: "This value is too short. It should have %s characters or more.", maxlength: "This value is too long. It should have %s characters or fewer.", length: "This value length is invalid. It should be between %s and %s characters long.", mincheck: "You must select at least %s choices.", maxcheck: "You must select %s choices or fewer.", check: "You must select between %s and %s choices.", equalto: "This value should be the same.", euvatin: "It's not a valid VAT Identification Number." }), x.setLocale("en"), (new function () { var r = this, n = window || global; l(this, { isNativeEvent: function (t) { return t.originalEvent && !1 !== t.originalEvent.isTrusted }, fakeInputEvent: function (t) { r.isNativeEvent(t) && h(t.target).trigger("input") }, misbehaves: function (t) { r.isNativeEvent(t) && (r.behavesOk(t), h(document).on("change.inputevent", t.data.selector, r.fakeInputEvent), r.fakeInputEvent(t)) }, behavesOk: function (t) { r.isNativeEvent(t) && h(document).off("input.inputevent", t.data.selector, r.behavesOk).off("change.inputevent", t.data.selector, r.misbehaves) }, install: function () { if (!n.inputEventPatched) { n.inputEventPatched = "0.0.3"; for (var t = 0, e = ["select", 'input[type="checkbox"]', 'input[type="radio"]', 'input[type="file"]']; t < e.length; t++) { var i = e[t]; h(document).on("input.inputevent", i, { selector: i }, r.behavesOk).on("change.inputevent", i, { selector: i }, r.misbehaves) } } }, uninstall: function () { delete n.inputEventPatched, h(document).off(".inputevent") } }) }).install(), x });
//# sourceMappingURL=parsley.min.js.map
/*!
  Zoom 1.7.21
  license: MIT
  http://www.jacklmoore.com/zoom
*/
(function ($) {
  var defaults = {
    url: false,
    callback: false,
    target: false,
    duration: 120,
    on: 'mouseover', // other options: grab, click, toggle
    touch: true, // enables a touch fallback
    onZoomIn: false,
    onZoomOut: false,
    magnify: 1
  };

  // Core Zoom Logic, independent of event listeners.
  $.zoom = function (target, source, img, magnify) {
    var targetHeight,
      targetWidth,
      sourceHeight,
      sourceWidth,
      xRatio,
      yRatio,
      offset,
      $target = $(target),
      position = $target.css('position'),
      $source = $(source);

    // The parent element needs positioning so that the zoomed element can be correctly positioned within.
    target.style.position = /(absolute|fixed)/.test(position) ? position : 'relative';
    target.style.overflow = 'hidden';
    img.style.width = img.style.height = '';

    $(img)
      .addClass('zoomImg')
      .css({
        position: 'absolute',
        top: 0,
        left: 0,
        opacity: 0,
        width: img.width * magnify,
        height: img.height * magnify,
        border: 'none',
        maxWidth: 'none',
        maxHeight: 'none'
      })
      .appendTo(target);

    return {
      init: function () {
        targetWidth = $target.outerWidth();
        targetHeight = $target.outerHeight();

        if (source === target) {
          sourceWidth = targetWidth;
          sourceHeight = targetHeight;
        } else {
          sourceWidth = $source.outerWidth();
          sourceHeight = $source.outerHeight();
        }

        xRatio = (img.width - targetWidth) / sourceWidth;
        yRatio = (img.height - targetHeight) / sourceHeight;

        offset = $source.offset();
      },
      move: function (e) {
        var left = (e.pageX - offset.left),
          top = (e.pageY - offset.top);

        top = Math.max(Math.min(top, sourceHeight), 0);
        left = Math.max(Math.min(left, sourceWidth), 0);

        img.style.left = (left * -xRatio) + 'px';
        img.style.top = (top * -yRatio) + 'px';
      }
    };
  };

  $.fn.zoom = function (options) {
    return this.each(function () {
      var
        settings = $.extend({}, defaults, options || {}),
        //target will display the zoomed image
        target = settings.target && $(settings.target)[0] || this,
        //source will provide zoom location info (thumbnail)
        source = this,
        $source = $(source),
        img = document.createElement('img'),
        $img = $(img),
        mousemove = 'mousemove.zoom',
        clicked = false,
        touched = false;

      // If a url wasn't specified, look for an image element.
      if (!settings.url) {
        var srcElement = source.querySelector('img');
        if (srcElement) {
          settings.url = srcElement.getAttribute('data-src') || srcElement.currentSrc || srcElement.src;
        }
        if (!settings.url) {
          return;
        }
      }

      $source.one('zoom.destroy', function (position, overflow) {
        $source.off(".zoom");
        target.style.position = position;
        target.style.overflow = overflow;
        img.onload = null;
        $img.remove();
      }.bind(this, target.style.position, target.style.overflow));

      img.onload = function () {
        var zoom = $.zoom(target, source, img, settings.magnify);

        function start(e) {
          zoom.init();
          zoom.move(e);

          // Skip the fade-in for IE8 and lower since it chokes on fading-in
          // and changing position based on mousemovement at the same time.
          $img.stop()
            .fadeTo($.support.opacity ? settings.duration : 0, 1, $.isFunction(settings.onZoomIn) ? settings.onZoomIn.call(img) : false);
        }

        function stop() {
          $img.stop()
            .fadeTo(settings.duration, 0, $.isFunction(settings.onZoomOut) ? settings.onZoomOut.call(img) : false);
        }

        // Mouse events
        if (settings.on === 'grab') {
          $source
            .on('mousedown.zoom',
              function (e) {
                if (e.which === 1) {
                  $(document).one('mouseup.zoom',
                    function () {
                      stop();

                      $(document).off(mousemove, zoom.move);
                    }
                  );

                  start(e);

                  $(document).on(mousemove, zoom.move);

                  e.preventDefault();
                }
              }
            );
        } else if (settings.on === 'click') {
          $source.on('click.zoom',
            function (e) {
              if (clicked) {
                // bubble the event up to the document to trigger the unbind.
                return;
              } else {
                clicked = true;
                start(e);
                $(document).on(mousemove, zoom.move);
                $(document).one('click.zoom',
                  function () {
                    stop();
                    clicked = false;
                    $(document).off(mousemove, zoom.move);
                  }
                );
                return false;
              }
            }
          );
        } else if (settings.on === 'toggle') {
          $source.on('click.zoom',
            function (e) {
              if (clicked) {
                stop();
              } else {
                start(e);
              }
              clicked = !clicked;
            }
          );
        } else if (settings.on === 'mouseover') {
          zoom.init(); // Preemptively call init because IE7 will fire the mousemove handler before the hover handler.

          $source
            .on('mouseenter.zoom', start)
            .on('mouseleave.zoom', stop)
            .on(mousemove, zoom.move);
        }

        // Touch fallback
        if (settings.touch) {
          $source
            .on('touchstart.zoom', function (e) {
              e.preventDefault();
              if (touched) {
                touched = false;
                stop();
              } else {
                touched = true;
                start(e.originalEvent.touches[0] || e.originalEvent.changedTouches[0]);
              }
            })
            .on('touchmove.zoom', function (e) {
              e.preventDefault();
              zoom.move(e.originalEvent.touches[0] || e.originalEvent.changedTouches[0]);
            })
            .on('touchend.zoom', function (e) {
              e.preventDefault();
              if (touched) {
                touched = false;
                stop();
              }
            });
        }

        if ($.isFunction(settings.callback)) {
          settings.callback.call(img);
        }
      };

      img.setAttribute('role', 'presentation');
      img.alt = '';
      img.src = settings.url;
    });
  };

  $.fn.zoom.defaults = defaults;
}(window.jQuery));
// ==================================================
// fancyBox v3.5.7
//
// Licensed GPLv3 for open source use
// or fancyBox Commercial License for commercial use
//
// http://fancyapps.com/fancybox/
// Copyright 2019 fancyApps
//
// ==================================================
!function(t,e,n,o){"use strict";function i(t,e){var o,i,a,s=[],r=0;t&&t.isDefaultPrevented()||(t.preventDefault(),e=e||{},t&&t.data&&(e=h(t.data.options,e)),o=e.$target||n(t.currentTarget).trigger("blur"),(a=n.fancybox.getInstance())&&a.$trigger&&a.$trigger.is(o)||(e.selector?s=n(e.selector):(i=o.attr("data-fancybox")||"",i?(s=t.data?t.data.items:[],s=s.length?s.filter('[data-fancybox="'+i+'"]'):n('[data-fancybox="'+i+'"]')):s=[o]),r=n(s).index(o),r<0&&(r=0),a=n.fancybox.open(s,e,r),a.$trigger=o))}if(t.console=t.console||{info:function(t){}},n){if(n.fn.fancybox)return void console.info("fancyBox already initialized");var a={closeExisting:!1,loop:!1,gutter:50,keyboard:!0,preventCaptionOverlap:!0,arrows:!0,infobar:!0,smallBtn:"auto",toolbar:"auto",buttons:["zoom","slideShow","thumbs","close"],idleTime:3,protect:!1,modal:!1,image:{preload:!1},ajax:{settings:{data:{fancybox:!0}}},iframe:{tpl:'<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" allowfullscreen="allowfullscreen" allow="autoplay; fullscreen" src=""></iframe>',preload:!0,css:{},attr:{scrolling:"auto"}},video:{tpl:'<video class="fancybox-video" controls controlsList="nodownload" poster="{{poster}}"><source src="{{src}}" type="{{format}}" />Sorry, your browser doesn\'t support embedded videos, <a href="{{src}}">download</a> and watch with your favorite video player!</video>',format:"",autoStart:!0},defaultType:"image",animationEffect:"zoom",animationDuration:366,zoomOpacity:"auto",transitionEffect:"fade",transitionDuration:366,slideClass:"",baseClass:"",baseTpl:'<div class="fancybox-container" role="dialog" tabindex="-1"><div class="fancybox-bg"></div><div class="fancybox-inner"><div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div><div class="fancybox-toolbar">{{buttons}}</div><div class="fancybox-navigation">{{arrows}}</div><div class="fancybox-stage"></div><div class="fancybox-caption"><div class="fancybox-caption__body"></div></div></div></div>',spinnerTpl:'<div class="fancybox-loading"></div>',errorTpl:'<div class="fancybox-error"><p>{{ERROR}}</p></div>',btnTpl:{download:'<a download data-fancybox-download class="fancybox-button fancybox-button--download" title="{{DOWNLOAD}}" href="javascript:;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.62 17.09V19H5.38v-1.91zm-2.97-6.96L17 11.45l-5 4.87-5-4.87 1.36-1.32 2.68 2.64V5h1.92v7.77z"/></svg></a>',zoom:'<button data-fancybox-zoom class="fancybox-button fancybox-button--zoom" title="{{ZOOM}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.7 17.3l-3-3a5.9 5.9 0 0 0-.6-7.6 5.9 5.9 0 0 0-8.4 0 5.9 5.9 0 0 0 0 8.4 5.9 5.9 0 0 0 7.7.7l3 3a1 1 0 0 0 1.3 0c.4-.5.4-1 0-1.5zM8.1 13.8a4 4 0 0 1 0-5.7 4 4 0 0 1 5.7 0 4 4 0 0 1 0 5.7 4 4 0 0 1-5.7 0z"/></svg></button>',close:'<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 10.6L6.6 5.2 5.2 6.6l5.4 5.4-5.4 5.4 1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4-1.4-1.4-5.4 5.4z"/></svg></button>',arrowLeft:'<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}"><div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.28 15.7l-1.34 1.37L5 12l4.94-5.07 1.34 1.38-2.68 2.72H19v1.94H8.6z"/></svg></div></button>',arrowRight:'<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}"><div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.4 12.97l-2.68 2.72 1.34 1.38L19 12l-4.94-5.07-1.34 1.38 2.68 2.72H5v1.94z"/></svg></div></button>',smallBtn:'<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24"><path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z"/></svg></button>'},parentEl:"body",hideScrollbar:!0,autoFocus:!0,backFocus:!0,trapFocus:!0,fullScreen:{autoStart:!1},touch:{vertical:!0,momentum:!0},hash:null,media:{},slideShow:{autoStart:!1,speed:3e3},thumbs:{autoStart:!1,hideOnClose:!0,parentEl:".fancybox-container",axis:"y"},wheel:"auto",onInit:n.noop,beforeLoad:n.noop,afterLoad:n.noop,beforeShow:n.noop,afterShow:n.noop,beforeClose:n.noop,afterClose:n.noop,onActivate:n.noop,onDeactivate:n.noop,clickContent:function(t,e){return"image"===t.type&&"zoom"},clickSlide:"close",clickOutside:"close",dblclickContent:!1,dblclickSlide:!1,dblclickOutside:!1,mobile:{preventCaptionOverlap:!1,idleTime:!1,clickContent:function(t,e){return"image"===t.type&&"toggleControls"},clickSlide:function(t,e){return"image"===t.type?"toggleControls":"close"},dblclickContent:function(t,e){return"image"===t.type&&"zoom"},dblclickSlide:function(t,e){return"image"===t.type&&"zoom"}},lang:"en",i18n:{en:{CLOSE:"Close",NEXT:"Next",PREV:"Previous",ERROR:"The requested content cannot be loaded. <br/> Please try again later.",PLAY_START:"Start slideshow",PLAY_STOP:"Pause slideshow",FULL_SCREEN:"Full screen",THUMBS:"Thumbnails",DOWNLOAD:"Download",SHARE:"Share",ZOOM:"Zoom"},de:{CLOSE:"Schlie&szlig;en",NEXT:"Weiter",PREV:"Zur&uuml;ck",ERROR:"Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es sp&auml;ter nochmal.",PLAY_START:"Diaschau starten",PLAY_STOP:"Diaschau beenden",FULL_SCREEN:"Vollbild",THUMBS:"Vorschaubilder",DOWNLOAD:"Herunterladen",SHARE:"Teilen",ZOOM:"Vergr&ouml;&szlig;ern"}}},s=n(t),r=n(e),c=0,l=function(t){return t&&t.hasOwnProperty&&t instanceof n},d=function(){return t.requestAnimationFrame||t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame||t.oRequestAnimationFrame||function(e){return t.setTimeout(e,1e3/60)}}(),u=function(){return t.cancelAnimationFrame||t.webkitCancelAnimationFrame||t.mozCancelAnimationFrame||t.oCancelAnimationFrame||function(e){t.clearTimeout(e)}}(),f=function(){var t,n=e.createElement("fakeelement"),o={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(t in o)if(void 0!==n.style[t])return o[t];return"transitionend"}(),p=function(t){return t&&t.length&&t[0].offsetHeight},h=function(t,e){var o=n.extend(!0,{},t,e);return n.each(e,function(t,e){n.isArray(e)&&(o[t]=e)}),o},g=function(t){var o,i;return!(!t||t.ownerDocument!==e)&&(n(".fancybox-container").css("pointer-events","none"),o={x:t.getBoundingClientRect().left+t.offsetWidth/2,y:t.getBoundingClientRect().top+t.offsetHeight/2},i=e.elementFromPoint(o.x,o.y)===t,n(".fancybox-container").css("pointer-events",""),i)},b=function(t,e,o){var i=this;i.opts=h({index:o},n.fancybox.defaults),n.isPlainObject(e)&&(i.opts=h(i.opts,e)),n.fancybox.isMobile&&(i.opts=h(i.opts,i.opts.mobile)),i.id=i.opts.id||++c,i.currIndex=parseInt(i.opts.index,10)||0,i.prevIndex=null,i.prevPos=null,i.currPos=0,i.firstRun=!0,i.group=[],i.slides={},i.addContent(t),i.group.length&&i.init()};n.extend(b.prototype,{init:function(){var o,i,a=this,s=a.group[a.currIndex],r=s.opts;r.closeExisting&&n.fancybox.close(!0),n("body").addClass("fancybox-active"),!n.fancybox.getInstance()&&!1!==r.hideScrollbar&&!n.fancybox.isMobile&&e.body.scrollHeight>t.innerHeight&&(n("head").append('<style id="fancybox-style-noscroll" type="text/css">.compensate-for-scrollbar{margin-right:'+(t.innerWidth-e.documentElement.clientWidth)+"px;}</style>"),n("body").addClass("compensate-for-scrollbar")),i="",n.each(r.buttons,function(t,e){i+=r.btnTpl[e]||""}),o=n(a.translate(a,r.baseTpl.replace("{{buttons}}",i).replace("{{arrows}}",r.btnTpl.arrowLeft+r.btnTpl.arrowRight))).attr("id","fancybox-container-"+a.id).addClass(r.baseClass).data("FancyBox",a).appendTo(r.parentEl),a.$refs={container:o},["bg","inner","infobar","toolbar","stage","caption","navigation"].forEach(function(t){a.$refs[t]=o.find(".fancybox-"+t)}),a.trigger("onInit"),a.activate(),a.jumpTo(a.currIndex)},translate:function(t,e){var n=t.opts.i18n[t.opts.lang]||t.opts.i18n.en;return e.replace(/\{\{(\w+)\}\}/g,function(t,e){return void 0===n[e]?t:n[e]})},addContent:function(t){var e,o=this,i=n.makeArray(t);n.each(i,function(t,e){var i,a,s,r,c,l={},d={};n.isPlainObject(e)?(l=e,d=e.opts||e):"object"===n.type(e)&&n(e).length?(i=n(e),d=i.data()||{},d=n.extend(!0,{},d,d.options),d.$orig=i,l.src=o.opts.src||d.src||i.attr("href"),l.type||l.src||(l.type="inline",l.src=e)):l={type:"html",src:e+""},l.opts=n.extend(!0,{},o.opts,d),n.isArray(d.buttons)&&(l.opts.buttons=d.buttons),n.fancybox.isMobile&&l.opts.mobile&&(l.opts=h(l.opts,l.opts.mobile)),a=l.type||l.opts.type,r=l.src||"",!a&&r&&((s=r.match(/\.(mp4|mov|ogv|webm)((\?|#).*)?$/i))?(a="video",l.opts.video.format||(l.opts.video.format="video/"+("ogv"===s[1]?"ogg":s[1]))):r.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i)?a="image":r.match(/\.(pdf)((\?|#).*)?$/i)?(a="iframe",l=n.extend(!0,l,{contentType:"pdf",opts:{iframe:{preload:!1}}})):"#"===r.charAt(0)&&(a="inline")),a?l.type=a:o.trigger("objectNeedsType",l),l.contentType||(l.contentType=n.inArray(l.type,["html","inline","ajax"])>-1?"html":l.type),l.index=o.group.length,"auto"==l.opts.smallBtn&&(l.opts.smallBtn=n.inArray(l.type,["html","inline","ajax"])>-1),"auto"===l.opts.toolbar&&(l.opts.toolbar=!l.opts.smallBtn),l.$thumb=l.opts.$thumb||null,l.opts.$trigger&&l.index===o.opts.index&&(l.$thumb=l.opts.$trigger.find("img:first"),l.$thumb.length&&(l.opts.$orig=l.opts.$trigger)),l.$thumb&&l.$thumb.length||!l.opts.$orig||(l.$thumb=l.opts.$orig.find("img:first")),l.$thumb&&!l.$thumb.length&&(l.$thumb=null),l.thumb=l.opts.thumb||(l.$thumb?l.$thumb[0].src:null),"function"===n.type(l.opts.caption)&&(l.opts.caption=l.opts.caption.apply(e,[o,l])),"function"===n.type(o.opts.caption)&&(l.opts.caption=o.opts.caption.apply(e,[o,l])),l.opts.caption instanceof n||(l.opts.caption=void 0===l.opts.caption?"":l.opts.caption+""),"ajax"===l.type&&(c=r.split(/\s+/,2),c.length>1&&(l.src=c.shift(),l.opts.filter=c.shift())),l.opts.modal&&(l.opts=n.extend(!0,l.opts,{trapFocus:!0,infobar:0,toolbar:0,smallBtn:0,keyboard:0,slideShow:0,fullScreen:0,thumbs:0,touch:0,clickContent:!1,clickSlide:!1,clickOutside:!1,dblclickContent:!1,dblclickSlide:!1,dblclickOutside:!1})),o.group.push(l)}),Object.keys(o.slides).length&&(o.updateControls(),(e=o.Thumbs)&&e.isActive&&(e.create(),e.focus()))},addEvents:function(){var e=this;e.removeEvents(),e.$refs.container.on("click.fb-close","[data-fancybox-close]",function(t){t.stopPropagation(),t.preventDefault(),e.close(t)}).on("touchstart.fb-prev click.fb-prev","[data-fancybox-prev]",function(t){t.stopPropagation(),t.preventDefault(),e.previous()}).on("touchstart.fb-next click.fb-next","[data-fancybox-next]",function(t){t.stopPropagation(),t.preventDefault(),e.next()}).on("click.fb","[data-fancybox-zoom]",function(t){e[e.isScaledDown()?"scaleToActual":"scaleToFit"]()}),s.on("orientationchange.fb resize.fb",function(t){t&&t.originalEvent&&"resize"===t.originalEvent.type?(e.requestId&&u(e.requestId),e.requestId=d(function(){e.update(t)})):(e.current&&"iframe"===e.current.type&&e.$refs.stage.hide(),setTimeout(function(){e.$refs.stage.show(),e.update(t)},n.fancybox.isMobile?600:250))}),r.on("keydown.fb",function(t){var o=n.fancybox?n.fancybox.getInstance():null,i=o.current,a=t.keyCode||t.which;if(9==a)return void(i.opts.trapFocus&&e.focus(t));if(!(!i.opts.keyboard||t.ctrlKey||t.altKey||t.shiftKey||n(t.target).is("input,textarea,video,audio,select")))return 8===a||27===a?(t.preventDefault(),void e.close(t)):37===a||38===a?(t.preventDefault(),void e.previous()):39===a||40===a?(t.preventDefault(),void e.next()):void e.trigger("afterKeydown",t,a)}),e.group[e.currIndex].opts.idleTime&&(e.idleSecondsCounter=0,r.on("mousemove.fb-idle mouseleave.fb-idle mousedown.fb-idle touchstart.fb-idle touchmove.fb-idle scroll.fb-idle keydown.fb-idle",function(t){e.idleSecondsCounter=0,e.isIdle&&e.showControls(),e.isIdle=!1}),e.idleInterval=t.setInterval(function(){++e.idleSecondsCounter>=e.group[e.currIndex].opts.idleTime&&!e.isDragging&&(e.isIdle=!0,e.idleSecondsCounter=0,e.hideControls())},1e3))},removeEvents:function(){var e=this;s.off("orientationchange.fb resize.fb"),r.off("keydown.fb .fb-idle"),this.$refs.container.off(".fb-close .fb-prev .fb-next"),e.idleInterval&&(t.clearInterval(e.idleInterval),e.idleInterval=null)},previous:function(t){return this.jumpTo(this.currPos-1,t)},next:function(t){return this.jumpTo(this.currPos+1,t)},jumpTo:function(t,e){var o,i,a,s,r,c,l,d,u,f=this,h=f.group.length;if(!(f.isDragging||f.isClosing||f.isAnimating&&f.firstRun)){if(t=parseInt(t,10),!(a=f.current?f.current.opts.loop:f.opts.loop)&&(t<0||t>=h))return!1;if(o=f.firstRun=!Object.keys(f.slides).length,r=f.current,f.prevIndex=f.currIndex,f.prevPos=f.currPos,s=f.createSlide(t),h>1&&((a||s.index<h-1)&&f.createSlide(t+1),(a||s.index>0)&&f.createSlide(t-1)),f.current=s,f.currIndex=s.index,f.currPos=s.pos,f.trigger("beforeShow",o),f.updateControls(),s.forcedDuration=void 0,n.isNumeric(e)?s.forcedDuration=e:e=s.opts[o?"animationDuration":"transitionDuration"],e=parseInt(e,10),i=f.isMoved(s),s.$slide.addClass("fancybox-slide--current"),o)return s.opts.animationEffect&&e&&f.$refs.container.css("transition-duration",e+"ms"),f.$refs.container.addClass("fancybox-is-open").trigger("focus"),f.loadSlide(s),void f.preload("image");c=n.fancybox.getTranslate(r.$slide),l=n.fancybox.getTranslate(f.$refs.stage),n.each(f.slides,function(t,e){n.fancybox.stop(e.$slide,!0)}),r.pos!==s.pos&&(r.isComplete=!1),r.$slide.removeClass("fancybox-slide--complete fancybox-slide--current"),i?(u=c.left-(r.pos*c.width+r.pos*r.opts.gutter),n.each(f.slides,function(t,o){o.$slide.removeClass("fancybox-animated").removeClass(function(t,e){return(e.match(/(^|\s)fancybox-fx-\S+/g)||[]).join(" ")});var i=o.pos*c.width+o.pos*o.opts.gutter;n.fancybox.setTranslate(o.$slide,{top:0,left:i-l.left+u}),o.pos!==s.pos&&o.$slide.addClass("fancybox-slide--"+(o.pos>s.pos?"next":"previous")),p(o.$slide),n.fancybox.animate(o.$slide,{top:0,left:(o.pos-s.pos)*c.width+(o.pos-s.pos)*o.opts.gutter},e,function(){o.$slide.css({transform:"",opacity:""}).removeClass("fancybox-slide--next fancybox-slide--previous"),o.pos===f.currPos&&f.complete()})})):e&&s.opts.transitionEffect&&(d="fancybox-animated fancybox-fx-"+s.opts.transitionEffect,r.$slide.addClass("fancybox-slide--"+(r.pos>s.pos?"next":"previous")),n.fancybox.animate(r.$slide,d,e,function(){r.$slide.removeClass(d).removeClass("fancybox-slide--next fancybox-slide--previous")},!1)),s.isLoaded?f.revealContent(s):f.loadSlide(s),f.preload("image")}},createSlide:function(t){var e,o,i=this;return o=t%i.group.length,o=o<0?i.group.length+o:o,!i.slides[t]&&i.group[o]&&(e=n('<div class="fancybox-slide"></div>').appendTo(i.$refs.stage),i.slides[t]=n.extend(!0,{},i.group[o],{pos:t,$slide:e,isLoaded:!1}),i.updateSlide(i.slides[t])),i.slides[t]},scaleToActual:function(t,e,o){var i,a,s,r,c,l=this,d=l.current,u=d.$content,f=n.fancybox.getTranslate(d.$slide).width,p=n.fancybox.getTranslate(d.$slide).height,h=d.width,g=d.height;l.isAnimating||l.isMoved()||!u||"image"!=d.type||!d.isLoaded||d.hasError||(l.isAnimating=!0,n.fancybox.stop(u),t=void 0===t?.5*f:t,e=void 0===e?.5*p:e,i=n.fancybox.getTranslate(u),i.top-=n.fancybox.getTranslate(d.$slide).top,i.left-=n.fancybox.getTranslate(d.$slide).left,r=h/i.width,c=g/i.height,a=.5*f-.5*h,s=.5*p-.5*g,h>f&&(a=i.left*r-(t*r-t),a>0&&(a=0),a<f-h&&(a=f-h)),g>p&&(s=i.top*c-(e*c-e),s>0&&(s=0),s<p-g&&(s=p-g)),l.updateCursor(h,g),n.fancybox.animate(u,{top:s,left:a,scaleX:r,scaleY:c},o||366,function(){l.isAnimating=!1}),l.SlideShow&&l.SlideShow.isActive&&l.SlideShow.stop())},scaleToFit:function(t){var e,o=this,i=o.current,a=i.$content;o.isAnimating||o.isMoved()||!a||"image"!=i.type||!i.isLoaded||i.hasError||(o.isAnimating=!0,n.fancybox.stop(a),e=o.getFitPos(i),o.updateCursor(e.width,e.height),n.fancybox.animate(a,{top:e.top,left:e.left,scaleX:e.width/a.width(),scaleY:e.height/a.height()},t||366,function(){o.isAnimating=!1}))},getFitPos:function(t){var e,o,i,a,s=this,r=t.$content,c=t.$slide,l=t.width||t.opts.width,d=t.height||t.opts.height,u={};return!!(t.isLoaded&&r&&r.length)&&(e=n.fancybox.getTranslate(s.$refs.stage).width,o=n.fancybox.getTranslate(s.$refs.stage).height,e-=parseFloat(c.css("paddingLeft"))+parseFloat(c.css("paddingRight"))+parseFloat(r.css("marginLeft"))+parseFloat(r.css("marginRight")),o-=parseFloat(c.css("paddingTop"))+parseFloat(c.css("paddingBottom"))+parseFloat(r.css("marginTop"))+parseFloat(r.css("marginBottom")),l&&d||(l=e,d=o),i=Math.min(1,e/l,o/d),l*=i,d*=i,l>e-.5&&(l=e),d>o-.5&&(d=o),"image"===t.type?(u.top=Math.floor(.5*(o-d))+parseFloat(c.css("paddingTop")),u.left=Math.floor(.5*(e-l))+parseFloat(c.css("paddingLeft"))):"video"===t.contentType&&(a=t.opts.width&&t.opts.height?l/d:t.opts.ratio||16/9,d>l/a?d=l/a:l>d*a&&(l=d*a)),u.width=l,u.height=d,u)},update:function(t){var e=this;n.each(e.slides,function(n,o){e.updateSlide(o,t)})},updateSlide:function(t,e){var o=this,i=t&&t.$content,a=t.width||t.opts.width,s=t.height||t.opts.height,r=t.$slide;o.adjustCaption(t),i&&(a||s||"video"===t.contentType)&&!t.hasError&&(n.fancybox.stop(i),n.fancybox.setTranslate(i,o.getFitPos(t)),t.pos===o.currPos&&(o.isAnimating=!1,o.updateCursor())),o.adjustLayout(t),r.length&&(r.trigger("refresh"),t.pos===o.currPos&&o.$refs.toolbar.add(o.$refs.navigation.find(".fancybox-button--arrow_right")).toggleClass("compensate-for-scrollbar",r.get(0).scrollHeight>r.get(0).clientHeight)),o.trigger("onUpdate",t,e)},centerSlide:function(t){var e=this,o=e.current,i=o.$slide;!e.isClosing&&o&&(i.siblings().css({transform:"",opacity:""}),i.parent().children().removeClass("fancybox-slide--previous fancybox-slide--next"),n.fancybox.animate(i,{top:0,left:0,opacity:1},void 0===t?0:t,function(){i.css({transform:"",opacity:""}),o.isComplete||e.complete()},!1))},isMoved:function(t){var e,o,i=t||this.current;return!!i&&(o=n.fancybox.getTranslate(this.$refs.stage),e=n.fancybox.getTranslate(i.$slide),!i.$slide.hasClass("fancybox-animated")&&(Math.abs(e.top-o.top)>.5||Math.abs(e.left-o.left)>.5))},updateCursor:function(t,e){var o,i,a=this,s=a.current,r=a.$refs.container;s&&!a.isClosing&&a.Guestures&&(r.removeClass("fancybox-is-zoomable fancybox-can-zoomIn fancybox-can-zoomOut fancybox-can-swipe fancybox-can-pan"),o=a.canPan(t,e),i=!!o||a.isZoomable(),r.toggleClass("fancybox-is-zoomable",i),n("[data-fancybox-zoom]").prop("disabled",!i),o?r.addClass("fancybox-can-pan"):i&&("zoom"===s.opts.clickContent||n.isFunction(s.opts.clickContent)&&"zoom"==s.opts.clickContent(s))?r.addClass("fancybox-can-zoomIn"):s.opts.touch&&(s.opts.touch.vertical||a.group.length>1)&&"video"!==s.contentType&&r.addClass("fancybox-can-swipe"))},isZoomable:function(){var t,e=this,n=e.current;if(n&&!e.isClosing&&"image"===n.type&&!n.hasError){if(!n.isLoaded)return!0;if((t=e.getFitPos(n))&&(n.width>t.width||n.height>t.height))return!0}return!1},isScaledDown:function(t,e){var o=this,i=!1,a=o.current,s=a.$content;return void 0!==t&&void 0!==e?i=t<a.width&&e<a.height:s&&(i=n.fancybox.getTranslate(s),i=i.width<a.width&&i.height<a.height),i},canPan:function(t,e){var o=this,i=o.current,a=null,s=!1;return"image"===i.type&&(i.isComplete||t&&e)&&!i.hasError&&(s=o.getFitPos(i),void 0!==t&&void 0!==e?a={width:t,height:e}:i.isComplete&&(a=n.fancybox.getTranslate(i.$content)),a&&s&&(s=Math.abs(a.width-s.width)>1.5||Math.abs(a.height-s.height)>1.5)),s},loadSlide:function(t){var e,o,i,a=this;if(!t.isLoading&&!t.isLoaded){if(t.isLoading=!0,!1===a.trigger("beforeLoad",t))return t.isLoading=!1,!1;switch(e=t.type,o=t.$slide,o.off("refresh").trigger("onReset").addClass(t.opts.slideClass),e){case"image":a.setImage(t);break;case"iframe":a.setIframe(t);break;case"html":a.setContent(t,t.src||t.content);break;case"video":a.setContent(t,t.opts.video.tpl.replace(/\{\{src\}\}/gi,t.src).replace("{{format}}",t.opts.videoFormat||t.opts.video.format||"").replace("{{poster}}",t.thumb||""));break;case"inline":n(t.src).length?a.setContent(t,n(t.src)):a.setError(t);break;case"ajax":a.showLoading(t),i=n.ajax(n.extend({},t.opts.ajax.settings,{url:t.src,success:function(e,n){"success"===n&&a.setContent(t,e)},error:function(e,n){e&&"abort"!==n&&a.setError(t)}})),o.one("onReset",function(){i.abort()});break;default:a.setError(t)}return!0}},setImage:function(t){var o,i=this;setTimeout(function(){var e=t.$image;i.isClosing||!t.isLoading||e&&e.length&&e[0].complete||t.hasError||i.showLoading(t)},50),i.checkSrcset(t),t.$content=n('<div class="fancybox-content"></div>').addClass("fancybox-is-hidden").appendTo(t.$slide.addClass("fancybox-slide--image")),!1!==t.opts.preload&&t.opts.width&&t.opts.height&&t.thumb&&(t.width=t.opts.width,t.height=t.opts.height,o=e.createElement("img"),o.onerror=function(){n(this).remove(),t.$ghost=null},o.onload=function(){i.afterLoad(t)},t.$ghost=n(o).addClass("fancybox-image").appendTo(t.$content).attr("src",t.thumb)),i.setBigImage(t)},checkSrcset:function(e){var n,o,i,a,s=e.opts.srcset||e.opts.image.srcset;if(s){i=t.devicePixelRatio||1,a=t.innerWidth*i,o=s.split(",").map(function(t){var e={};return t.trim().split(/\s+/).forEach(function(t,n){var o=parseInt(t.substring(0,t.length-1),10);if(0===n)return e.url=t;o&&(e.value=o,e.postfix=t[t.length-1])}),e}),o.sort(function(t,e){return t.value-e.value});for(var r=0;r<o.length;r++){var c=o[r];if("w"===c.postfix&&c.value>=a||"x"===c.postfix&&c.value>=i){n=c;break}}!n&&o.length&&(n=o[o.length-1]),n&&(e.src=n.url,e.width&&e.height&&"w"==n.postfix&&(e.height=e.width/e.height*n.value,e.width=n.value),e.opts.srcset=s)}},setBigImage:function(t){var o=this,i=e.createElement("img"),a=n(i);t.$image=a.one("error",function(){o.setError(t)}).one("load",function(){var e;t.$ghost||(o.resolveImageSlideSize(t,this.naturalWidth,this.naturalHeight),o.afterLoad(t)),o.isClosing||(t.opts.srcset&&(e=t.opts.sizes,e&&"auto"!==e||(e=(t.width/t.height>1&&s.width()/s.height()>1?"100":Math.round(t.width/t.height*100))+"vw"),a.attr("sizes",e).attr("srcset",t.opts.srcset)),t.$ghost&&setTimeout(function(){t.$ghost&&!o.isClosing&&t.$ghost.hide()},Math.min(300,Math.max(1e3,t.height/1600))),o.hideLoading(t))}).addClass("fancybox-image").attr("src",t.src).appendTo(t.$content),(i.complete||"complete"==i.readyState)&&a.naturalWidth&&a.naturalHeight?a.trigger("load"):i.error&&a.trigger("error")},resolveImageSlideSize:function(t,e,n){var o=parseInt(t.opts.width,10),i=parseInt(t.opts.height,10);t.width=e,t.height=n,o>0&&(t.width=o,t.height=Math.floor(o*n/e)),i>0&&(t.width=Math.floor(i*e/n),t.height=i)},setIframe:function(t){var e,o=this,i=t.opts.iframe,a=t.$slide;t.$content=n('<div class="fancybox-content'+(i.preload?" fancybox-is-hidden":"")+'"></div>').css(i.css).appendTo(a),a.addClass("fancybox-slide--"+t.contentType),t.$iframe=e=n(i.tpl.replace(/\{rnd\}/g,(new Date).getTime())).attr(i.attr).appendTo(t.$content),i.preload?(o.showLoading(t),e.on("load.fb error.fb",function(e){this.isReady=1,t.$slide.trigger("refresh"),o.afterLoad(t)}),a.on("refresh.fb",function(){var n,o,s=t.$content,r=i.css.width,c=i.css.height;if(1===e[0].isReady){try{n=e.contents(),o=n.find("body")}catch(t){}o&&o.length&&o.children().length&&(a.css("overflow","visible"),s.css({width:"100%","max-width":"100%",height:"9999px"}),void 0===r&&(r=Math.ceil(Math.max(o[0].clientWidth,o.outerWidth(!0)))),s.css("width",r||"").css("max-width",""),void 0===c&&(c=Math.ceil(Math.max(o[0].clientHeight,o.outerHeight(!0)))),s.css("height",c||""),a.css("overflow","auto")),s.removeClass("fancybox-is-hidden")}})):o.afterLoad(t),e.attr("src",t.src),a.one("onReset",function(){try{n(this).find("iframe").hide().unbind().attr("src","//about:blank")}catch(t){}n(this).off("refresh.fb").empty(),t.isLoaded=!1,t.isRevealed=!1})},setContent:function(t,e){var o=this;o.isClosing||(o.hideLoading(t),t.$content&&n.fancybox.stop(t.$content),t.$slide.empty(),l(e)&&e.parent().length?((e.hasClass("fancybox-content")||e.parent().hasClass("fancybox-content"))&&e.parents(".fancybox-slide").trigger("onReset"),t.$placeholder=n("<div>").hide().insertAfter(e),e.css("display","inline-block")):t.hasError||("string"===n.type(e)&&(e=n("<div>").append(n.trim(e)).contents()),t.opts.filter&&(e=n("<div>").html(e).find(t.opts.filter))),t.$slide.one("onReset",function(){n(this).find("video,audio").trigger("pause"),t.$placeholder&&(t.$placeholder.after(e.removeClass("fancybox-content").hide()).remove(),t.$placeholder=null),t.$smallBtn&&(t.$smallBtn.remove(),t.$smallBtn=null),t.hasError||(n(this).empty(),t.isLoaded=!1,t.isRevealed=!1)}),n(e).appendTo(t.$slide),n(e).is("video,audio")&&(n(e).addClass("fancybox-video"),n(e).wrap("<div></div>"),t.contentType="video",t.opts.width=t.opts.width||n(e).attr("width"),t.opts.height=t.opts.height||n(e).attr("height")),t.$content=t.$slide.children().filter("div,form,main,video,audio,article,.fancybox-content").first(),t.$content.siblings().hide(),t.$content.length||(t.$content=t.$slide.wrapInner("<div></div>").children().first()),t.$content.addClass("fancybox-content"),t.$slide.addClass("fancybox-slide--"+t.contentType),o.afterLoad(t))},setError:function(t){t.hasError=!0,t.$slide.trigger("onReset").removeClass("fancybox-slide--"+t.contentType).addClass("fancybox-slide--error"),t.contentType="html",this.setContent(t,this.translate(t,t.opts.errorTpl)),t.pos===this.currPos&&(this.isAnimating=!1)},showLoading:function(t){var e=this;(t=t||e.current)&&!t.$spinner&&(t.$spinner=n(e.translate(e,e.opts.spinnerTpl)).appendTo(t.$slide).hide().fadeIn("fast"))},hideLoading:function(t){var e=this;(t=t||e.current)&&t.$spinner&&(t.$spinner.stop().remove(),delete t.$spinner)},afterLoad:function(t){var e=this;e.isClosing||(t.isLoading=!1,t.isLoaded=!0,e.trigger("afterLoad",t),e.hideLoading(t),!t.opts.smallBtn||t.$smallBtn&&t.$smallBtn.length||(t.$smallBtn=n(e.translate(t,t.opts.btnTpl.smallBtn)).appendTo(t.$content)),t.opts.protect&&t.$content&&!t.hasError&&(t.$content.on("contextmenu.fb",function(t){return 2==t.button&&t.preventDefault(),!0}),"image"===t.type&&n('<div class="fancybox-spaceball"></div>').appendTo(t.$content)),e.adjustCaption(t),e.adjustLayout(t),t.pos===e.currPos&&e.updateCursor(),e.revealContent(t))},adjustCaption:function(t){var e,n=this,o=t||n.current,i=o.opts.caption,a=o.opts.preventCaptionOverlap,s=n.$refs.caption,r=!1;s.toggleClass("fancybox-caption--separate",a),a&&i&&i.length&&(o.pos!==n.currPos?(e=s.clone().appendTo(s.parent()),e.children().eq(0).empty().html(i),r=e.outerHeight(!0),e.empty().remove()):n.$caption&&(r=n.$caption.outerHeight(!0)),o.$slide.css("padding-bottom",r||""))},adjustLayout:function(t){var e,n,o,i,a=this,s=t||a.current;s.isLoaded&&!0!==s.opts.disableLayoutFix&&(s.$content.css("margin-bottom",""),s.$content.outerHeight()>s.$slide.height()+.5&&(o=s.$slide[0].style["padding-bottom"],i=s.$slide.css("padding-bottom"),parseFloat(i)>0&&(e=s.$slide[0].scrollHeight,s.$slide.css("padding-bottom",0),Math.abs(e-s.$slide[0].scrollHeight)<1&&(n=i),s.$slide.css("padding-bottom",o))),s.$content.css("margin-bottom",n))},revealContent:function(t){var e,o,i,a,s=this,r=t.$slide,c=!1,l=!1,d=s.isMoved(t),u=t.isRevealed;return t.isRevealed=!0,e=t.opts[s.firstRun?"animationEffect":"transitionEffect"],i=t.opts[s.firstRun?"animationDuration":"transitionDuration"],i=parseInt(void 0===t.forcedDuration?i:t.forcedDuration,10),!d&&t.pos===s.currPos&&i||(e=!1),"zoom"===e&&(t.pos===s.currPos&&i&&"image"===t.type&&!t.hasError&&(l=s.getThumbPos(t))?c=s.getFitPos(t):e="fade"),"zoom"===e?(s.isAnimating=!0,c.scaleX=c.width/l.width,c.scaleY=c.height/l.height,a=t.opts.zoomOpacity,"auto"==a&&(a=Math.abs(t.width/t.height-l.width/l.height)>.1),a&&(l.opacity=.1,c.opacity=1),n.fancybox.setTranslate(t.$content.removeClass("fancybox-is-hidden"),l),p(t.$content),void n.fancybox.animate(t.$content,c,i,function(){s.isAnimating=!1,s.complete()})):(s.updateSlide(t),e?(n.fancybox.stop(r),o="fancybox-slide--"+(t.pos>=s.prevPos?"next":"previous")+" fancybox-animated fancybox-fx-"+e,r.addClass(o).removeClass("fancybox-slide--current"),t.$content.removeClass("fancybox-is-hidden"),p(r),"image"!==t.type&&t.$content.hide().show(0),void n.fancybox.animate(r,"fancybox-slide--current",i,function(){r.removeClass(o).css({transform:"",opacity:""}),t.pos===s.currPos&&s.complete()},!0)):(t.$content.removeClass("fancybox-is-hidden"),u||!d||"image"!==t.type||t.hasError||t.$content.hide().fadeIn("fast"),void(t.pos===s.currPos&&s.complete())))},getThumbPos:function(t){var e,o,i,a,s,r=!1,c=t.$thumb;return!(!c||!g(c[0]))&&(e=n.fancybox.getTranslate(c),o=parseFloat(c.css("border-top-width")||0),i=parseFloat(c.css("border-right-width")||0),a=parseFloat(c.css("border-bottom-width")||0),s=parseFloat(c.css("border-left-width")||0),r={top:e.top+o,left:e.left+s,width:e.width-i-s,height:e.height-o-a,scaleX:1,scaleY:1},e.width>0&&e.height>0&&r)},complete:function(){var t,e=this,o=e.current,i={};!e.isMoved()&&o.isLoaded&&(o.isComplete||(o.isComplete=!0,o.$slide.siblings().trigger("onReset"),e.preload("inline"),p(o.$slide),o.$slide.addClass("fancybox-slide--complete"),n.each(e.slides,function(t,o){o.pos>=e.currPos-1&&o.pos<=e.currPos+1?i[o.pos]=o:o&&(n.fancybox.stop(o.$slide),o.$slide.off().remove())}),e.slides=i),e.isAnimating=!1,e.updateCursor(),e.trigger("afterShow"),o.opts.video.autoStart&&o.$slide.find("video,audio").filter(":visible:first").trigger("play").one("ended",function(){Document.exitFullscreen?Document.exitFullscreen():this.webkitExitFullscreen&&this.webkitExitFullscreen(),e.next()}),o.opts.autoFocus&&"html"===o.contentType&&(t=o.$content.find("input[autofocus]:enabled:visible:first"),t.length?t.trigger("focus"):e.focus(null,!0)),o.$slide.scrollTop(0).scrollLeft(0))},preload:function(t){var e,n,o=this;o.group.length<2||(n=o.slides[o.currPos+1],e=o.slides[o.currPos-1],e&&e.type===t&&o.loadSlide(e),n&&n.type===t&&o.loadSlide(n))},focus:function(t,o){var i,a,s=this,r=["a[href]","area[href]",'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',"select:not([disabled]):not([aria-hidden])","textarea:not([disabled]):not([aria-hidden])","button:not([disabled]):not([aria-hidden])","iframe","object","embed","video","audio","[contenteditable]",'[tabindex]:not([tabindex^="-"])'].join(",");s.isClosing||(i=!t&&s.current&&s.current.isComplete?s.current.$slide.find("*:visible"+(o?":not(.fancybox-close-small)":"")):s.$refs.container.find("*:visible"),i=i.filter(r).filter(function(){return"hidden"!==n(this).css("visibility")&&!n(this).hasClass("disabled")}),i.length?(a=i.index(e.activeElement),t&&t.shiftKey?(a<0||0==a)&&(t.preventDefault(),i.eq(i.length-1).trigger("focus")):(a<0||a==i.length-1)&&(t&&t.preventDefault(),i.eq(0).trigger("focus"))):s.$refs.container.trigger("focus"))},activate:function(){var t=this;n(".fancybox-container").each(function(){var e=n(this).data("FancyBox");e&&e.id!==t.id&&!e.isClosing&&(e.trigger("onDeactivate"),e.removeEvents(),e.isVisible=!1)}),t.isVisible=!0,(t.current||t.isIdle)&&(t.update(),t.updateControls()),t.trigger("onActivate"),t.addEvents()},close:function(t,e){var o,i,a,s,r,c,l,u=this,f=u.current,h=function(){u.cleanUp(t)};return!u.isClosing&&(u.isClosing=!0,!1===u.trigger("beforeClose",t)?(u.isClosing=!1,d(function(){u.update()}),!1):(u.removeEvents(),a=f.$content,o=f.opts.animationEffect,i=n.isNumeric(e)?e:o?f.opts.animationDuration:0,f.$slide.removeClass("fancybox-slide--complete fancybox-slide--next fancybox-slide--previous fancybox-animated"),!0!==t?n.fancybox.stop(f.$slide):o=!1,f.$slide.siblings().trigger("onReset").remove(),i&&u.$refs.container.removeClass("fancybox-is-open").addClass("fancybox-is-closing").css("transition-duration",i+"ms"),u.hideLoading(f),u.hideControls(!0),u.updateCursor(),"zoom"!==o||a&&i&&"image"===f.type&&!u.isMoved()&&!f.hasError&&(l=u.getThumbPos(f))||(o="fade"),"zoom"===o?(n.fancybox.stop(a),s=n.fancybox.getTranslate(a),c={top:s.top,left:s.left,scaleX:s.width/l.width,scaleY:s.height/l.height,width:l.width,height:l.height},r=f.opts.zoomOpacity,
"auto"==r&&(r=Math.abs(f.width/f.height-l.width/l.height)>.1),r&&(l.opacity=0),n.fancybox.setTranslate(a,c),p(a),n.fancybox.animate(a,l,i,h),!0):(o&&i?n.fancybox.animate(f.$slide.addClass("fancybox-slide--previous").removeClass("fancybox-slide--current"),"fancybox-animated fancybox-fx-"+o,i,h):!0===t?setTimeout(h,i):h(),!0)))},cleanUp:function(e){var o,i,a,s=this,r=s.current.opts.$orig;s.current.$slide.trigger("onReset"),s.$refs.container.empty().remove(),s.trigger("afterClose",e),s.current.opts.backFocus&&(r&&r.length&&r.is(":visible")||(r=s.$trigger),r&&r.length&&(i=t.scrollX,a=t.scrollY,r.trigger("focus"),n("html, body").scrollTop(a).scrollLeft(i))),s.current=null,o=n.fancybox.getInstance(),o?o.activate():(n("body").removeClass("fancybox-active compensate-for-scrollbar"),n("#fancybox-style-noscroll").remove())},trigger:function(t,e){var o,i=Array.prototype.slice.call(arguments,1),a=this,s=e&&e.opts?e:a.current;if(s?i.unshift(s):s=a,i.unshift(a),n.isFunction(s.opts[t])&&(o=s.opts[t].apply(s,i)),!1===o)return o;"afterClose"!==t&&a.$refs?a.$refs.container.trigger(t+".fb",i):r.trigger(t+".fb",i)},updateControls:function(){var t=this,o=t.current,i=o.index,a=t.$refs.container,s=t.$refs.caption,r=o.opts.caption;o.$slide.trigger("refresh"),r&&r.length?(t.$caption=s,s.children().eq(0).html(r)):t.$caption=null,t.hasHiddenControls||t.isIdle||t.showControls(),a.find("[data-fancybox-count]").html(t.group.length),a.find("[data-fancybox-index]").html(i+1),a.find("[data-fancybox-prev]").prop("disabled",!o.opts.loop&&i<=0),a.find("[data-fancybox-next]").prop("disabled",!o.opts.loop&&i>=t.group.length-1),"image"===o.type?a.find("[data-fancybox-zoom]").show().end().find("[data-fancybox-download]").attr("href",o.opts.image.src||o.src).show():o.opts.toolbar&&a.find("[data-fancybox-download],[data-fancybox-zoom]").hide(),n(e.activeElement).is(":hidden,[disabled]")&&t.$refs.container.trigger("focus")},hideControls:function(t){var e=this,n=["infobar","toolbar","nav"];!t&&e.current.opts.preventCaptionOverlap||n.push("caption"),this.$refs.container.removeClass(n.map(function(t){return"fancybox-show-"+t}).join(" ")),this.hasHiddenControls=!0},showControls:function(){var t=this,e=t.current?t.current.opts:t.opts,n=t.$refs.container;t.hasHiddenControls=!1,t.idleSecondsCounter=0,n.toggleClass("fancybox-show-toolbar",!(!e.toolbar||!e.buttons)).toggleClass("fancybox-show-infobar",!!(e.infobar&&t.group.length>1)).toggleClass("fancybox-show-caption",!!t.$caption).toggleClass("fancybox-show-nav",!!(e.arrows&&t.group.length>1)).toggleClass("fancybox-is-modal",!!e.modal)},toggleControls:function(){this.hasHiddenControls?this.showControls():this.hideControls()}}),n.fancybox={version:"3.5.7",defaults:a,getInstance:function(t){var e=n('.fancybox-container:not(".fancybox-is-closing"):last').data("FancyBox"),o=Array.prototype.slice.call(arguments,1);return e instanceof b&&("string"===n.type(t)?e[t].apply(e,o):"function"===n.type(t)&&t.apply(e,o),e)},open:function(t,e,n){return new b(t,e,n)},close:function(t){var e=this.getInstance();e&&(e.close(),!0===t&&this.close(t))},destroy:function(){this.close(!0),r.add("body").off("click.fb-start","**")},isMobile:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),use3d:function(){var n=e.createElement("div");return t.getComputedStyle&&t.getComputedStyle(n)&&t.getComputedStyle(n).getPropertyValue("transform")&&!(e.documentMode&&e.documentMode<11)}(),getTranslate:function(t){var e;return!(!t||!t.length)&&(e=t[0].getBoundingClientRect(),{top:e.top||0,left:e.left||0,width:e.width,height:e.height,opacity:parseFloat(t.css("opacity"))})},setTranslate:function(t,e){var n="",o={};if(t&&e)return void 0===e.left&&void 0===e.top||(n=(void 0===e.left?t.position().left:e.left)+"px, "+(void 0===e.top?t.position().top:e.top)+"px",n=this.use3d?"translate3d("+n+", 0px)":"translate("+n+")"),void 0!==e.scaleX&&void 0!==e.scaleY?n+=" scale("+e.scaleX+", "+e.scaleY+")":void 0!==e.scaleX&&(n+=" scaleX("+e.scaleX+")"),n.length&&(o.transform=n),void 0!==e.opacity&&(o.opacity=e.opacity),void 0!==e.width&&(o.width=e.width),void 0!==e.height&&(o.height=e.height),t.css(o)},animate:function(t,e,o,i,a){var s,r=this;n.isFunction(o)&&(i=o,o=null),r.stop(t),s=r.getTranslate(t),t.on(f,function(c){(!c||!c.originalEvent||t.is(c.originalEvent.target)&&"z-index"!=c.originalEvent.propertyName)&&(r.stop(t),n.isNumeric(o)&&t.css("transition-duration",""),n.isPlainObject(e)?void 0!==e.scaleX&&void 0!==e.scaleY&&r.setTranslate(t,{top:e.top,left:e.left,width:s.width*e.scaleX,height:s.height*e.scaleY,scaleX:1,scaleY:1}):!0!==a&&t.removeClass(e),n.isFunction(i)&&i(c))}),n.isNumeric(o)&&t.css("transition-duration",o+"ms"),n.isPlainObject(e)?(void 0!==e.scaleX&&void 0!==e.scaleY&&(delete e.width,delete e.height,t.parent().hasClass("fancybox-slide--image")&&t.parent().addClass("fancybox-is-scaling")),n.fancybox.setTranslate(t,e)):t.addClass(e),t.data("timer",setTimeout(function(){t.trigger(f)},o+33))},stop:function(t,e){t&&t.length&&(clearTimeout(t.data("timer")),e&&t.trigger(f),t.off(f).css("transition-duration",""),t.parent().removeClass("fancybox-is-scaling"))}},n.fn.fancybox=function(t){var e;return t=t||{},e=t.selector||!1,e?n("body").off("click.fb-start",e).on("click.fb-start",e,{options:t},i):this.off("click.fb-start").on("click.fb-start",{items:this,options:t},i),this},r.on("click.fb-start","[data-fancybox]",i),r.on("click.fb-start","[data-fancybox-trigger]",function(t){n('[data-fancybox="'+n(this).attr("data-fancybox-trigger")+'"]').eq(n(this).attr("data-fancybox-index")||0).trigger("click.fb-start",{$trigger:n(this)})}),function(){var t=null;r.on("mousedown mouseup focus blur",".fancybox-button",function(e){switch(e.type){case"mousedown":t=n(this);break;case"mouseup":t=null;break;case"focusin":n(".fancybox-button").removeClass("fancybox-focus"),n(this).is(t)||n(this).is("[disabled]")||n(this).addClass("fancybox-focus");break;case"focusout":n(".fancybox-button").removeClass("fancybox-focus")}})}()}}(window,document,jQuery),function(t){"use strict";var e={youtube:{matcher:/(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i,params:{autoplay:1,autohide:1,fs:1,rel:0,hd:1,wmode:"transparent",enablejsapi:1,html5:1},paramPlace:8,type:"iframe",url:"https://www.youtube-nocookie.com/embed/$4",thumb:"https://img.youtube.com/vi/$4/hqdefault.jpg"},vimeo:{matcher:/^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/,params:{autoplay:1,hd:1,show_title:1,show_byline:1,show_portrait:0,fullscreen:1},paramPlace:3,type:"iframe",url:"//player.vimeo.com/video/$2"},instagram:{matcher:/(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,type:"image",url:"//$1/p/$2/media/?size=l"},gmap_place:{matcher:/(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i,type:"iframe",url:function(t){return"//maps.google."+t[2]+"/?ll="+(t[9]?t[9]+"&z="+Math.floor(t[10])+(t[12]?t[12].replace(/^\//,"&"):""):t[12]+"").replace(/\?/,"&")+"&output="+(t[12]&&t[12].indexOf("layer=c")>0?"svembed":"embed")}},gmap_search:{matcher:/(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(maps\/search\/)(.*)/i,type:"iframe",url:function(t){return"//maps.google."+t[2]+"/maps?q="+t[5].replace("query=","q=").replace("api=1","")+"&output=embed"}}},n=function(e,n,o){if(e)return o=o||"","object"===t.type(o)&&(o=t.param(o,!0)),t.each(n,function(t,n){e=e.replace("$"+t,n||"")}),o.length&&(e+=(e.indexOf("?")>0?"&":"?")+o),e};t(document).on("objectNeedsType.fb",function(o,i,a){var s,r,c,l,d,u,f,p=a.src||"",h=!1;s=t.extend(!0,{},e,a.opts.media),t.each(s,function(e,o){if(c=p.match(o.matcher)){if(h=o.type,f=e,u={},o.paramPlace&&c[o.paramPlace]){d=c[o.paramPlace],"?"==d[0]&&(d=d.substring(1)),d=d.split("&");for(var i=0;i<d.length;++i){var s=d[i].split("=",2);2==s.length&&(u[s[0]]=decodeURIComponent(s[1].replace(/\+/g," ")))}}return l=t.extend(!0,{},o.params,a.opts[e],u),p="function"===t.type(o.url)?o.url.call(this,c,l,a):n(o.url,c,l),r="function"===t.type(o.thumb)?o.thumb.call(this,c,l,a):n(o.thumb,c),"youtube"===e?p=p.replace(/&t=((\d+)m)?(\d+)s/,function(t,e,n,o){return"&start="+((n?60*parseInt(n,10):0)+parseInt(o,10))}):"vimeo"===e&&(p=p.replace("&%23","#")),!1}}),h?(a.opts.thumb||a.opts.$thumb&&a.opts.$thumb.length||(a.opts.thumb=r),"iframe"===h&&(a.opts=t.extend(!0,a.opts,{iframe:{preload:!1,attr:{scrolling:"no"}}})),t.extend(a,{type:h,src:p,origSrc:a.src,contentSource:f,contentType:"image"===h?"image":"gmap_place"==f||"gmap_search"==f?"map":"video"})):p&&(a.type=a.opts.defaultType)});var o={youtube:{src:"https://www.youtube.com/iframe_api",class:"YT",loading:!1,loaded:!1},vimeo:{src:"https://player.vimeo.com/api/player.js",class:"Vimeo",loading:!1,loaded:!1},load:function(t){var e,n=this;if(this[t].loaded)return void setTimeout(function(){n.done(t)});this[t].loading||(this[t].loading=!0,e=document.createElement("script"),e.type="text/javascript",e.src=this[t].src,"youtube"===t?window.onYouTubeIframeAPIReady=function(){n[t].loaded=!0,n.done(t)}:e.onload=function(){n[t].loaded=!0,n.done(t)},document.body.appendChild(e))},done:function(e){var n,o,i;"youtube"===e&&delete window.onYouTubeIframeAPIReady,(n=t.fancybox.getInstance())&&(o=n.current.$content.find("iframe"),"youtube"===e&&void 0!==YT&&YT?i=new YT.Player(o.attr("id"),{events:{onStateChange:function(t){0==t.data&&n.next()}}}):"vimeo"===e&&void 0!==Vimeo&&Vimeo&&(i=new Vimeo.Player(o),i.on("ended",function(){n.next()})))}};t(document).on({"afterShow.fb":function(t,e,n){e.group.length>1&&("youtube"===n.contentSource||"vimeo"===n.contentSource)&&o.load(n.contentSource)}})}(jQuery),function(t,e,n){"use strict";var o=function(){return t.requestAnimationFrame||t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame||t.oRequestAnimationFrame||function(e){return t.setTimeout(e,1e3/60)}}(),i=function(){return t.cancelAnimationFrame||t.webkitCancelAnimationFrame||t.mozCancelAnimationFrame||t.oCancelAnimationFrame||function(e){t.clearTimeout(e)}}(),a=function(e){var n=[];e=e.originalEvent||e||t.e,e=e.touches&&e.touches.length?e.touches:e.changedTouches&&e.changedTouches.length?e.changedTouches:[e];for(var o in e)e[o].pageX?n.push({x:e[o].pageX,y:e[o].pageY}):e[o].clientX&&n.push({x:e[o].clientX,y:e[o].clientY});return n},s=function(t,e,n){return e&&t?"x"===n?t.x-e.x:"y"===n?t.y-e.y:Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2)):0},r=function(t){if(t.is('a,area,button,[role="button"],input,label,select,summary,textarea,video,audio,iframe')||n.isFunction(t.get(0).onclick)||t.data("selectable"))return!0;for(var e=0,o=t[0].attributes,i=o.length;e<i;e++)if("data-fancybox-"===o[e].nodeName.substr(0,14))return!0;return!1},c=function(e){var n=t.getComputedStyle(e)["overflow-y"],o=t.getComputedStyle(e)["overflow-x"],i=("scroll"===n||"auto"===n)&&e.scrollHeight>e.clientHeight,a=("scroll"===o||"auto"===o)&&e.scrollWidth>e.clientWidth;return i||a},l=function(t){for(var e=!1;;){if(e=c(t.get(0)))break;if(t=t.parent(),!t.length||t.hasClass("fancybox-stage")||t.is("body"))break}return e},d=function(t){var e=this;e.instance=t,e.$bg=t.$refs.bg,e.$stage=t.$refs.stage,e.$container=t.$refs.container,e.destroy(),e.$container.on("touchstart.fb.touch mousedown.fb.touch",n.proxy(e,"ontouchstart"))};d.prototype.destroy=function(){var t=this;t.$container.off(".fb.touch"),n(e).off(".fb.touch"),t.requestId&&(i(t.requestId),t.requestId=null),t.tapped&&(clearTimeout(t.tapped),t.tapped=null)},d.prototype.ontouchstart=function(o){var i=this,c=n(o.target),d=i.instance,u=d.current,f=u.$slide,p=u.$content,h="touchstart"==o.type;if(h&&i.$container.off("mousedown.fb.touch"),(!o.originalEvent||2!=o.originalEvent.button)&&f.length&&c.length&&!r(c)&&!r(c.parent())&&(c.is("img")||!(o.originalEvent.clientX>c[0].clientWidth+c.offset().left))){if(!u||d.isAnimating||u.$slide.hasClass("fancybox-animated"))return o.stopPropagation(),void o.preventDefault();i.realPoints=i.startPoints=a(o),i.startPoints.length&&(u.touch&&o.stopPropagation(),i.startEvent=o,i.canTap=!0,i.$target=c,i.$content=p,i.opts=u.opts.touch,i.isPanning=!1,i.isSwiping=!1,i.isZooming=!1,i.isScrolling=!1,i.canPan=d.canPan(),i.startTime=(new Date).getTime(),i.distanceX=i.distanceY=i.distance=0,i.canvasWidth=Math.round(f[0].clientWidth),i.canvasHeight=Math.round(f[0].clientHeight),i.contentLastPos=null,i.contentStartPos=n.fancybox.getTranslate(i.$content)||{top:0,left:0},i.sliderStartPos=n.fancybox.getTranslate(f),i.stagePos=n.fancybox.getTranslate(d.$refs.stage),i.sliderStartPos.top-=i.stagePos.top,i.sliderStartPos.left-=i.stagePos.left,i.contentStartPos.top-=i.stagePos.top,i.contentStartPos.left-=i.stagePos.left,n(e).off(".fb.touch").on(h?"touchend.fb.touch touchcancel.fb.touch":"mouseup.fb.touch mouseleave.fb.touch",n.proxy(i,"ontouchend")).on(h?"touchmove.fb.touch":"mousemove.fb.touch",n.proxy(i,"ontouchmove")),n.fancybox.isMobile&&e.addEventListener("scroll",i.onscroll,!0),((i.opts||i.canPan)&&(c.is(i.$stage)||i.$stage.find(c).length)||(c.is(".fancybox-image")&&o.preventDefault(),n.fancybox.isMobile&&c.parents(".fancybox-caption").length))&&(i.isScrollable=l(c)||l(c.parent()),n.fancybox.isMobile&&i.isScrollable||o.preventDefault(),(1===i.startPoints.length||u.hasError)&&(i.canPan?(n.fancybox.stop(i.$content),i.isPanning=!0):i.isSwiping=!0,i.$container.addClass("fancybox-is-grabbing")),2===i.startPoints.length&&"image"===u.type&&(u.isLoaded||u.$ghost)&&(i.canTap=!1,i.isSwiping=!1,i.isPanning=!1,i.isZooming=!0,n.fancybox.stop(i.$content),i.centerPointStartX=.5*(i.startPoints[0].x+i.startPoints[1].x)-n(t).scrollLeft(),i.centerPointStartY=.5*(i.startPoints[0].y+i.startPoints[1].y)-n(t).scrollTop(),i.percentageOfImageAtPinchPointX=(i.centerPointStartX-i.contentStartPos.left)/i.contentStartPos.width,i.percentageOfImageAtPinchPointY=(i.centerPointStartY-i.contentStartPos.top)/i.contentStartPos.height,i.startDistanceBetweenFingers=s(i.startPoints[0],i.startPoints[1]))))}},d.prototype.onscroll=function(t){var n=this;n.isScrolling=!0,e.removeEventListener("scroll",n.onscroll,!0)},d.prototype.ontouchmove=function(t){var e=this;return void 0!==t.originalEvent.buttons&&0===t.originalEvent.buttons?void e.ontouchend(t):e.isScrolling?void(e.canTap=!1):(e.newPoints=a(t),void((e.opts||e.canPan)&&e.newPoints.length&&e.newPoints.length&&(e.isSwiping&&!0===e.isSwiping||t.preventDefault(),e.distanceX=s(e.newPoints[0],e.startPoints[0],"x"),e.distanceY=s(e.newPoints[0],e.startPoints[0],"y"),e.distance=s(e.newPoints[0],e.startPoints[0]),e.distance>0&&(e.isSwiping?e.onSwipe(t):e.isPanning?e.onPan():e.isZooming&&e.onZoom()))))},d.prototype.onSwipe=function(e){var a,s=this,r=s.instance,c=s.isSwiping,l=s.sliderStartPos.left||0;if(!0!==c)"x"==c&&(s.distanceX>0&&(s.instance.group.length<2||0===s.instance.current.index&&!s.instance.current.opts.loop)?l+=Math.pow(s.distanceX,.8):s.distanceX<0&&(s.instance.group.length<2||s.instance.current.index===s.instance.group.length-1&&!s.instance.current.opts.loop)?l-=Math.pow(-s.distanceX,.8):l+=s.distanceX),s.sliderLastPos={top:"x"==c?0:s.sliderStartPos.top+s.distanceY,left:l},s.requestId&&(i(s.requestId),s.requestId=null),s.requestId=o(function(){s.sliderLastPos&&(n.each(s.instance.slides,function(t,e){var o=e.pos-s.instance.currPos;n.fancybox.setTranslate(e.$slide,{top:s.sliderLastPos.top,left:s.sliderLastPos.left+o*s.canvasWidth+o*e.opts.gutter})}),s.$container.addClass("fancybox-is-sliding"))});else if(Math.abs(s.distance)>10){if(s.canTap=!1,r.group.length<2&&s.opts.vertical?s.isSwiping="y":r.isDragging||!1===s.opts.vertical||"auto"===s.opts.vertical&&n(t).width()>800?s.isSwiping="x":(a=Math.abs(180*Math.atan2(s.distanceY,s.distanceX)/Math.PI),s.isSwiping=a>45&&a<135?"y":"x"),"y"===s.isSwiping&&n.fancybox.isMobile&&s.isScrollable)return void(s.isScrolling=!0);r.isDragging=s.isSwiping,s.startPoints=s.newPoints,n.each(r.slides,function(t,e){var o,i;n.fancybox.stop(e.$slide),o=n.fancybox.getTranslate(e.$slide),i=n.fancybox.getTranslate(r.$refs.stage),e.$slide.css({transform:"",opacity:"","transition-duration":""}).removeClass("fancybox-animated").removeClass(function(t,e){return(e.match(/(^|\s)fancybox-fx-\S+/g)||[]).join(" ")}),e.pos===r.current.pos&&(s.sliderStartPos.top=o.top-i.top,s.sliderStartPos.left=o.left-i.left),n.fancybox.setTranslate(e.$slide,{top:o.top-i.top,left:o.left-i.left})}),r.SlideShow&&r.SlideShow.isActive&&r.SlideShow.stop()}},d.prototype.onPan=function(){var t=this;if(s(t.newPoints[0],t.realPoints[0])<(n.fancybox.isMobile?10:5))return void(t.startPoints=t.newPoints);t.canTap=!1,t.contentLastPos=t.limitMovement(),t.requestId&&i(t.requestId),t.requestId=o(function(){n.fancybox.setTranslate(t.$content,t.contentLastPos)})},d.prototype.limitMovement=function(){var t,e,n,o,i,a,s=this,r=s.canvasWidth,c=s.canvasHeight,l=s.distanceX,d=s.distanceY,u=s.contentStartPos,f=u.left,p=u.top,h=u.width,g=u.height;return i=h>r?f+l:f,a=p+d,t=Math.max(0,.5*r-.5*h),e=Math.max(0,.5*c-.5*g),n=Math.min(r-h,.5*r-.5*h),o=Math.min(c-g,.5*c-.5*g),l>0&&i>t&&(i=t-1+Math.pow(-t+f+l,.8)||0),l<0&&i<n&&(i=n+1-Math.pow(n-f-l,.8)||0),d>0&&a>e&&(a=e-1+Math.pow(-e+p+d,.8)||0),d<0&&a<o&&(a=o+1-Math.pow(o-p-d,.8)||0),{top:a,left:i}},d.prototype.limitPosition=function(t,e,n,o){var i=this,a=i.canvasWidth,s=i.canvasHeight;return n>a?(t=t>0?0:t,t=t<a-n?a-n:t):t=Math.max(0,a/2-n/2),o>s?(e=e>0?0:e,e=e<s-o?s-o:e):e=Math.max(0,s/2-o/2),{top:e,left:t}},d.prototype.onZoom=function(){var e=this,a=e.contentStartPos,r=a.width,c=a.height,l=a.left,d=a.top,u=s(e.newPoints[0],e.newPoints[1]),f=u/e.startDistanceBetweenFingers,p=Math.floor(r*f),h=Math.floor(c*f),g=(r-p)*e.percentageOfImageAtPinchPointX,b=(c-h)*e.percentageOfImageAtPinchPointY,m=(e.newPoints[0].x+e.newPoints[1].x)/2-n(t).scrollLeft(),v=(e.newPoints[0].y+e.newPoints[1].y)/2-n(t).scrollTop(),y=m-e.centerPointStartX,x=v-e.centerPointStartY,w=l+(g+y),$=d+(b+x),S={top:$,left:w,scaleX:f,scaleY:f};e.canTap=!1,e.newWidth=p,e.newHeight=h,e.contentLastPos=S,e.requestId&&i(e.requestId),e.requestId=o(function(){n.fancybox.setTranslate(e.$content,e.contentLastPos)})},d.prototype.ontouchend=function(t){var o=this,s=o.isSwiping,r=o.isPanning,c=o.isZooming,l=o.isScrolling;if(o.endPoints=a(t),o.dMs=Math.max((new Date).getTime()-o.startTime,1),o.$container.removeClass("fancybox-is-grabbing"),n(e).off(".fb.touch"),e.removeEventListener("scroll",o.onscroll,!0),o.requestId&&(i(o.requestId),o.requestId=null),o.isSwiping=!1,o.isPanning=!1,o.isZooming=!1,o.isScrolling=!1,o.instance.isDragging=!1,o.canTap)return o.onTap(t);o.speed=100,o.velocityX=o.distanceX/o.dMs*.5,o.velocityY=o.distanceY/o.dMs*.5,r?o.endPanning():c?o.endZooming():o.endSwiping(s,l)},d.prototype.endSwiping=function(t,e){var o=this,i=!1,a=o.instance.group.length,s=Math.abs(o.distanceX),r="x"==t&&a>1&&(o.dMs>130&&s>10||s>50);o.sliderLastPos=null,"y"==t&&!e&&Math.abs(o.distanceY)>50?(n.fancybox.animate(o.instance.current.$slide,{top:o.sliderStartPos.top+o.distanceY+150*o.velocityY,opacity:0},200),i=o.instance.close(!0,250)):r&&o.distanceX>0?i=o.instance.previous(300):r&&o.distanceX<0&&(i=o.instance.next(300)),!1!==i||"x"!=t&&"y"!=t||o.instance.centerSlide(200),o.$container.removeClass("fancybox-is-sliding")},d.prototype.endPanning=function(){var t,e,o,i=this;i.contentLastPos&&(!1===i.opts.momentum||i.dMs>350?(t=i.contentLastPos.left,e=i.contentLastPos.top):(t=i.contentLastPos.left+500*i.velocityX,e=i.contentLastPos.top+500*i.velocityY),o=i.limitPosition(t,e,i.contentStartPos.width,i.contentStartPos.height),o.width=i.contentStartPos.width,o.height=i.contentStartPos.height,n.fancybox.animate(i.$content,o,366))},d.prototype.endZooming=function(){var t,e,o,i,a=this,s=a.instance.current,r=a.newWidth,c=a.newHeight;a.contentLastPos&&(t=a.contentLastPos.left,e=a.contentLastPos.top,i={top:e,left:t,width:r,height:c,scaleX:1,scaleY:1},n.fancybox.setTranslate(a.$content,i),r<a.canvasWidth&&c<a.canvasHeight?a.instance.scaleToFit(150):r>s.width||c>s.height?a.instance.scaleToActual(a.centerPointStartX,a.centerPointStartY,150):(o=a.limitPosition(t,e,r,c),n.fancybox.animate(a.$content,o,150)))},d.prototype.onTap=function(e){var o,i=this,s=n(e.target),r=i.instance,c=r.current,l=e&&a(e)||i.startPoints,d=l[0]?l[0].x-n(t).scrollLeft()-i.stagePos.left:0,u=l[0]?l[0].y-n(t).scrollTop()-i.stagePos.top:0,f=function(t){var o=c.opts[t];if(n.isFunction(o)&&(o=o.apply(r,[c,e])),o)switch(o){case"close":r.close(i.startEvent);break;case"toggleControls":r.toggleControls();break;case"next":r.next();break;case"nextOrClose":r.group.length>1?r.next():r.close(i.startEvent);break;case"zoom":"image"==c.type&&(c.isLoaded||c.$ghost)&&(r.canPan()?r.scaleToFit():r.isScaledDown()?r.scaleToActual(d,u):r.group.length<2&&r.close(i.startEvent))}};if((!e.originalEvent||2!=e.originalEvent.button)&&(s.is("img")||!(d>s[0].clientWidth+s.offset().left))){if(s.is(".fancybox-bg,.fancybox-inner,.fancybox-outer,.fancybox-container"))o="Outside";else if(s.is(".fancybox-slide"))o="Slide";else{if(!r.current.$content||!r.current.$content.find(s).addBack().filter(s).length)return;o="Content"}if(i.tapped){if(clearTimeout(i.tapped),i.tapped=null,Math.abs(d-i.tapX)>50||Math.abs(u-i.tapY)>50)return this;f("dblclick"+o)}else i.tapX=d,i.tapY=u,c.opts["dblclick"+o]&&c.opts["dblclick"+o]!==c.opts["click"+o]?i.tapped=setTimeout(function(){i.tapped=null,r.isAnimating||f("click"+o)},500):f("click"+o);return this}},n(e).on("onActivate.fb",function(t,e){e&&!e.Guestures&&(e.Guestures=new d(e))}).on("beforeClose.fb",function(t,e){e&&e.Guestures&&e.Guestures.destroy()})}(window,document,jQuery),function(t,e){"use strict";e.extend(!0,e.fancybox.defaults,{btnTpl:{slideShow:'<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.5 5.4v13.2l11-6.6z"/></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.33 5.75h2.2v12.5h-2.2V5.75zm5.15 0h2.2v12.5h-2.2V5.75z"/></svg></button>'},slideShow:{autoStart:!1,speed:3e3,progress:!0}});var n=function(t){this.instance=t,this.init()};e.extend(n.prototype,{timer:null,isActive:!1,$button:null,init:function(){var t=this,n=t.instance,o=n.group[n.currIndex].opts.slideShow;t.$button=n.$refs.toolbar.find("[data-fancybox-play]").on("click",function(){t.toggle()}),n.group.length<2||!o?t.$button.hide():o.progress&&(t.$progress=e('<div class="fancybox-progress"></div>').appendTo(n.$refs.inner))},set:function(t){var n=this,o=n.instance,i=o.current;i&&(!0===t||i.opts.loop||o.currIndex<o.group.length-1)?n.isActive&&"video"!==i.contentType&&(n.$progress&&e.fancybox.animate(n.$progress.show(),{scaleX:1},i.opts.slideShow.speed),n.timer=setTimeout(function(){o.current.opts.loop||o.current.index!=o.group.length-1?o.next():o.jumpTo(0)},i.opts.slideShow.speed)):(n.stop(),o.idleSecondsCounter=0,o.showControls())},clear:function(){var t=this;clearTimeout(t.timer),t.timer=null,t.$progress&&t.$progress.removeAttr("style").hide()},start:function(){var t=this,e=t.instance.current;e&&(t.$button.attr("title",(e.opts.i18n[e.opts.lang]||e.opts.i18n.en).PLAY_STOP).removeClass("fancybox-button--play").addClass("fancybox-button--pause"),t.isActive=!0,e.isComplete&&t.set(!0),t.instance.trigger("onSlideShowChange",!0))},stop:function(){var t=this,e=t.instance.current;t.clear(),t.$button.attr("title",(e.opts.i18n[e.opts.lang]||e.opts.i18n.en).PLAY_START).removeClass("fancybox-button--pause").addClass("fancybox-button--play"),t.isActive=!1,t.instance.trigger("onSlideShowChange",!1),t.$progress&&t.$progress.removeAttr("style").hide()},toggle:function(){var t=this;t.isActive?t.stop():t.start()}}),e(t).on({"onInit.fb":function(t,e){e&&!e.SlideShow&&(e.SlideShow=new n(e))},"beforeShow.fb":function(t,e,n,o){var i=e&&e.SlideShow;o?i&&n.opts.slideShow.autoStart&&i.start():i&&i.isActive&&i.clear()},"afterShow.fb":function(t,e,n){var o=e&&e.SlideShow;o&&o.isActive&&o.set()},"afterKeydown.fb":function(n,o,i,a,s){var r=o&&o.SlideShow;!r||!i.opts.slideShow||80!==s&&32!==s||e(t.activeElement).is("button,a,input")||(a.preventDefault(),r.toggle())},"beforeClose.fb onDeactivate.fb":function(t,e){var n=e&&e.SlideShow;n&&n.stop()}}),e(t).on("visibilitychange",function(){var n=e.fancybox.getInstance(),o=n&&n.SlideShow;o&&o.isActive&&(t.hidden?o.clear():o.set())})}(document,jQuery),function(t,e){"use strict";var n=function(){for(var e=[["requestFullscreen","exitFullscreen","fullscreenElement","fullscreenEnabled","fullscreenchange","fullscreenerror"],["webkitRequestFullscreen","webkitExitFullscreen","webkitFullscreenElement","webkitFullscreenEnabled","webkitfullscreenchange","webkitfullscreenerror"],["webkitRequestFullScreen","webkitCancelFullScreen","webkitCurrentFullScreenElement","webkitCancelFullScreen","webkitfullscreenchange","webkitfullscreenerror"],["mozRequestFullScreen","mozCancelFullScreen","mozFullScreenElement","mozFullScreenEnabled","mozfullscreenchange","mozfullscreenerror"],["msRequestFullscreen","msExitFullscreen","msFullscreenElement","msFullscreenEnabled","MSFullscreenChange","MSFullscreenError"]],n={},o=0;o<e.length;o++){var i=e[o];if(i&&i[1]in t){for(var a=0;a<i.length;a++)n[e[0][a]]=i[a];return n}}return!1}();if(n){var o={request:function(e){e=e||t.documentElement,e[n.requestFullscreen](e.ALLOW_KEYBOARD_INPUT)},exit:function(){t[n.exitFullscreen]()},toggle:function(e){e=e||t.documentElement,this.isFullscreen()?this.exit():this.request(e)},isFullscreen:function(){return Boolean(t[n.fullscreenElement])},enabled:function(){return Boolean(t[n.fullscreenEnabled])}};e.extend(!0,e.fancybox.defaults,{btnTpl:{fullScreen:'<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fsenter" title="{{FULL_SCREEN}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 16h3v3h2v-5H5zm3-8H5v2h5V5H8zm6 11h2v-3h3v-2h-5zm2-11V5h-2v5h5V8z"/></svg></button>'},fullScreen:{autoStart:!1}}),e(t).on(n.fullscreenchange,function(){var t=o.isFullscreen(),n=e.fancybox.getInstance();n&&(n.current&&"image"===n.current.type&&n.isAnimating&&(n.isAnimating=!1,n.update(!0,!0,0),n.isComplete||n.complete()),n.trigger("onFullscreenChange",t),n.$refs.container.toggleClass("fancybox-is-fullscreen",t),n.$refs.toolbar.find("[data-fancybox-fullscreen]").toggleClass("fancybox-button--fsenter",!t).toggleClass("fancybox-button--fsexit",t))})}e(t).on({"onInit.fb":function(t,e){var i;if(!n)return void e.$refs.toolbar.find("[data-fancybox-fullscreen]").remove();e&&e.group[e.currIndex].opts.fullScreen?(i=e.$refs.container,i.on("click.fb-fullscreen","[data-fancybox-fullscreen]",function(t){t.stopPropagation(),t.preventDefault(),o.toggle()}),e.opts.fullScreen&&!0===e.opts.fullScreen.autoStart&&o.request(),e.FullScreen=o):e&&e.$refs.toolbar.find("[data-fancybox-fullscreen]").hide()},"afterKeydown.fb":function(t,e,n,o,i){e&&e.FullScreen&&70===i&&(o.preventDefault(),e.FullScreen.toggle())},"beforeClose.fb":function(t,e){e&&e.FullScreen&&e.$refs.container.hasClass("fancybox-is-fullscreen")&&o.exit()}})}(document,jQuery),function(t,e){"use strict";var n="fancybox-thumbs";e.fancybox.defaults=e.extend(!0,{btnTpl:{thumbs:'<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14.59 14.59h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76H5.65V5.65z"/></svg></button>'},thumbs:{autoStart:!1,hideOnClose:!0,parentEl:".fancybox-container",axis:"y"}},e.fancybox.defaults);var o=function(t){this.init(t)};e.extend(o.prototype,{$button:null,$grid:null,$list:null,isVisible:!1,isActive:!1,init:function(t){var e=this,n=t.group,o=0;e.instance=t,e.opts=n[t.currIndex].opts.thumbs,t.Thumbs=e,e.$button=t.$refs.toolbar.find("[data-fancybox-thumbs]");for(var i=0,a=n.length;i<a&&(n[i].thumb&&o++,!(o>1));i++);o>1&&e.opts?(e.$button.removeAttr("style").on("click",function(){e.toggle()}),e.isActive=!0):e.$button.hide()},create:function(){var t,o=this,i=o.instance,a=o.opts.parentEl,s=[];o.$grid||(o.$grid=e('<div class="'+n+" "+n+"-"+o.opts.axis+'"></div>').appendTo(i.$refs.container.find(a).addBack().filter(a)),o.$grid.on("click","a",function(){i.jumpTo(e(this).attr("data-index"))})),o.$list||(o.$list=e('<div class="'+n+'__list">').appendTo(o.$grid)),e.each(i.group,function(e,n){t=n.thumb,t||"image"!==n.type||(t=n.src),s.push('<a href="javascript:;" tabindex="0" data-index="'+e+'"'+(t&&t.length?' style="background-image:url('+t+')"':'class="fancybox-thumbs-missing"')+"></a>")}),o.$list[0].innerHTML=s.join(""),"x"===o.opts.axis&&o.$list.width(parseInt(o.$grid.css("padding-right"),10)+i.group.length*o.$list.children().eq(0).outerWidth(!0))},focus:function(t){var e,n,o=this,i=o.$list,a=o.$grid;o.instance.current&&(e=i.children().removeClass("fancybox-thumbs-active").filter('[data-index="'+o.instance.current.index+'"]').addClass("fancybox-thumbs-active"),n=e.position(),"y"===o.opts.axis&&(n.top<0||n.top>i.height()-e.outerHeight())?i.stop().animate({scrollTop:i.scrollTop()+n.top},t):"x"===o.opts.axis&&(n.left<a.scrollLeft()||n.left>a.scrollLeft()+(a.width()-e.outerWidth()))&&i.parent().stop().animate({scrollLeft:n.left},t))},update:function(){var t=this;t.instance.$refs.container.toggleClass("fancybox-show-thumbs",this.isVisible),t.isVisible?(t.$grid||t.create(),t.instance.trigger("onThumbsShow"),t.focus(0)):t.$grid&&t.instance.trigger("onThumbsHide"),t.instance.update()},hide:function(){this.isVisible=!1,this.update()},show:function(){this.isVisible=!0,this.update()},toggle:function(){this.isVisible=!this.isVisible,this.update()}}),e(t).on({"onInit.fb":function(t,e){var n;e&&!e.Thumbs&&(n=new o(e),n.isActive&&!0===n.opts.autoStart&&n.show())},"beforeShow.fb":function(t,e,n,o){var i=e&&e.Thumbs;i&&i.isVisible&&i.focus(o?0:250)},"afterKeydown.fb":function(t,e,n,o,i){var a=e&&e.Thumbs;a&&a.isActive&&71===i&&(o.preventDefault(),a.toggle())},"beforeClose.fb":function(t,e){var n=e&&e.Thumbs;n&&n.isVisible&&!1!==n.opts.hideOnClose&&n.$grid.hide()}})}(document,jQuery),function(t,e){"use strict";function n(t){var e={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"};return String(t).replace(/[&<>"'`=\/]/g,function(t){return e[t]})}e.extend(!0,e.fancybox.defaults,{btnTpl:{share:'<button data-fancybox-share class="fancybox-button fancybox-button--share" title="{{SHARE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M2.55 19c1.4-8.4 9.1-9.8 11.9-9.8V5l7 7-7 6.3v-3.5c-2.8 0-10.5 2.1-11.9 4.2z"/></svg></button>'},share:{url:function(t,e){return!t.currentHash&&"inline"!==e.type&&"html"!==e.type&&(e.origSrc||e.src)||window.location},
tpl:'<div class="fancybox-share"><h1>{{SHARE}}</h1><p><a class="fancybox-share__button fancybox-share__button--fb" href="https://www.facebook.com/sharer/sharer.php?u={{url}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m287 456v-299c0-21 6-35 35-35h38v-63c-7-1-29-3-55-3-54 0-91 33-91 94v306m143-254h-205v72h196" /></svg><span>Facebook</span></a><a class="fancybox-share__button fancybox-share__button--tw" href="https://twitter.com/intent/tweet?url={{url}}&text={{descr}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m456 133c-14 7-31 11-47 13 17-10 30-27 37-46-15 10-34 16-52 20-61-62-157-7-141 75-68-3-129-35-169-85-22 37-11 86 26 109-13 0-26-4-37-9 0 39 28 72 65 80-12 3-25 4-37 2 10 33 41 57 77 57-42 30-77 38-122 34 170 111 378-32 359-208 16-11 30-25 41-42z" /></svg><span>Twitter</span></a><a class="fancybox-share__button fancybox-share__button--pt" href="https://www.pinterest.com/pin/create/button/?url={{url}}&description={{descr}}&media={{media}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m265 56c-109 0-164 78-164 144 0 39 15 74 47 87 5 2 10 0 12-5l4-19c2-6 1-8-3-13-9-11-15-25-15-45 0-58 43-110 113-110 62 0 96 38 96 88 0 67-30 122-73 122-24 0-42-19-36-44 6-29 20-60 20-81 0-19-10-35-31-35-25 0-44 26-44 60 0 21 7 36 7 36l-30 125c-8 37-1 83 0 87 0 3 4 4 5 2 2-3 32-39 42-75l16-64c8 16 31 29 56 29 74 0 124-67 124-157 0-69-58-132-146-132z" fill="#fff"/></svg><span>Pinterest</span></a></p><p><input class="fancybox-share__input" type="text" value="{{url_raw}}" onclick="select()" /></p></div>'}}),e(t).on("click","[data-fancybox-share]",function(){var t,o,i=e.fancybox.getInstance(),a=i.current||null;a&&("function"===e.type(a.opts.share.url)&&(t=a.opts.share.url.apply(a,[i,a])),o=a.opts.share.tpl.replace(/\{\{media\}\}/g,"image"===a.type?encodeURIComponent(a.src):"").replace(/\{\{url\}\}/g,encodeURIComponent(t)).replace(/\{\{url_raw\}\}/g,n(t)).replace(/\{\{descr\}\}/g,i.$caption?encodeURIComponent(i.$caption.text()):""),e.fancybox.open({src:i.translate(i,o),type:"html",opts:{touch:!1,animationEffect:!1,afterLoad:function(t,e){i.$refs.container.one("beforeClose.fb",function(){t.close(null,0)}),e.$content.find(".fancybox-share__button").click(function(){return window.open(this.href,"Share","width=550, height=450"),!1})},mobile:{autoFocus:!1}}}))})}(document,jQuery),function(t,e,n){"use strict";function o(){var e=t.location.hash.substr(1),n=e.split("-"),o=n.length>1&&/^\+?\d+$/.test(n[n.length-1])?parseInt(n.pop(-1),10)||1:1,i=n.join("-");return{hash:e,index:o<1?1:o,gallery:i}}function i(t){""!==t.gallery&&n("[data-fancybox='"+n.escapeSelector(t.gallery)+"']").eq(t.index-1).focus().trigger("click.fb-start")}function a(t){var e,n;return!!t&&(e=t.current?t.current.opts:t.opts,""!==(n=e.hash||(e.$orig?e.$orig.data("fancybox")||e.$orig.data("fancybox-trigger"):""))&&n)}n.escapeSelector||(n.escapeSelector=function(t){return(t+"").replace(/([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g,function(t,e){return e?"\0"===t?"�":t.slice(0,-1)+"\\"+t.charCodeAt(t.length-1).toString(16)+" ":"\\"+t})}),n(function(){!1!==n.fancybox.defaults.hash&&(n(e).on({"onInit.fb":function(t,e){var n,i;!1!==e.group[e.currIndex].opts.hash&&(n=o(),(i=a(e))&&n.gallery&&i==n.gallery&&(e.currIndex=n.index-1))},"beforeShow.fb":function(n,o,i,s){var r;i&&!1!==i.opts.hash&&(r=a(o))&&(o.currentHash=r+(o.group.length>1?"-"+(i.index+1):""),t.location.hash!=="#"+o.currentHash&&(s&&!o.origHash&&(o.origHash=t.location.hash),o.hashTimer&&clearTimeout(o.hashTimer),o.hashTimer=setTimeout(function(){"replaceState"in t.history?(t.history[s?"pushState":"replaceState"]({},e.title,t.location.pathname+t.location.search+"#"+o.currentHash),s&&(o.hasCreatedHistory=!0)):t.location.hash=o.currentHash,o.hashTimer=null},300)))},"beforeClose.fb":function(n,o,i){i&&!1!==i.opts.hash&&(clearTimeout(o.hashTimer),o.currentHash&&o.hasCreatedHistory?t.history.back():o.currentHash&&("replaceState"in t.history?t.history.replaceState({},e.title,t.location.pathname+t.location.search+(o.origHash||"")):t.location.hash=o.origHash),o.currentHash=null)}}),n(t).on("hashchange.fb",function(){var t=o(),e=null;n.each(n(".fancybox-container").get().reverse(),function(t,o){var i=n(o).data("FancyBox");if(i&&i.currentHash)return e=i,!1}),e?e.currentHash===t.gallery+"-"+t.index||1===t.index&&e.currentHash==t.gallery||(e.currentHash=null,e.close()):""!==t.gallery&&i(t)}),setTimeout(function(){n.fancybox.getInstance()||i(o())},50))})}(window,document,jQuery),function(t,e){"use strict";var n=(new Date).getTime();e(t).on({"onInit.fb":function(t,e,o){e.$refs.stage.on("mousewheel DOMMouseScroll wheel MozMousePixelScroll",function(t){var o=e.current,i=(new Date).getTime();e.group.length<2||!1===o.opts.wheel||"auto"===o.opts.wheel&&"image"!==o.type||(t.preventDefault(),t.stopPropagation(),o.$slide.hasClass("fancybox-animated")||(t=t.originalEvent||t,i-n<250||(n=i,e[(-t.deltaY||-t.deltaX||t.wheelDelta||-t.detail)<0?"next":"previous"]())))})}})}(document,jQuery);
const $body = $("body");
const IS_VISIBLE = "is-visible",
  IS_ACTIVE = "is-active",
  BUTTON_LOADING = "button_loading",
  IS_HIDDEN = 'is-hidden',
  IS_EXPANDED = 'is-expanded',
  IS_MINIMIZED = 'is-minimized',
  IS_COPIED = 'is-copied',
  IS_ERROR = 'is-error'

/* #region  Extends */
$.fn.extend({
  exists: function () {
    return this.length;
  },
  setBackScreen: function (opacityVal, filterVal) {
    let target = this instanceof jQuery ? $(this).get(0) : this;
    Object.assign(target.style, {
      opacity: opacityVal,
      filter: `grayscale(${filterVal})`,
    });
  },
  isVisible: function () {
    let target = this instanceof jQuery ? $(this).get(0) : this;
    return window.getComputedStyle(target).getPropertyValue('display') !== 'none'
  },
  appendButtonLoadingState: function (time = 3000) {
    $(this).addClass(BUTTON_LOADING).prop("disabled", true);
    setTimeout(() => {
      $(this).removeClass(BUTTON_LOADING).prop("disabled", false);
    }, time);
  },
});
/* #endregion */


/* #region  Utils */
const getEvtDOM = (att) => {
  return $(`[data-evt="${att}"]`);
},
  getTransitionTime = (target) => {
    let el = target instanceof jQuery ? target[0] : target;
    return parseFloat(window.getComputedStyle(el).transitionDuration) * 1000;
  },
  windowLessDesktop = () => {
    if ($(window).width() < 991) {
      return true;
    }
  };

const initTelInput = () => {
  let telInputArr = Array.from($('[data-input="tel"]'));

  for (var i = 0; i < telInputArr.length; i++) {
    iti = intlTelInput(telInputArr[i], {
      initialCountry: "auto",
      preferredCountries: ["us", "gb", "br", "cn", "es", "it"],
      autoPlaceholder: "aggressive",
      utilsScript:
        "/assets/public-2020/js/plugins/phone/utils.js",
      geoIpLookup: function (callback) {
        fetch("https://ipinfo.io/json", {
          cache: "reload",
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Failed: " + response.status);
          })
          .then((ipjson) => {
            callback(ipjson.country);
          })
          .catch((e) => {
            callback("us");
          });
      },
    });
  }
};


const getOrdinalTxt = (n) => {
  return n % 10 == 1 && n % 100 != 11 ? 'st' : n % 10 == 2 && n % 100 != 12 ? 'nd' : n % 10 == 3 && n % 100 != 13 ? 'rd' : 'th'
}
/* #endregion */


/* #region  Ripple Click Effect */
class rippleClickEffect {
  constructor(el, event) {
    this._el = el;
    this._event = event;
    this.extend = {
      rippleClass: "eff_ripple-circle",
      animateClass: "ripple-circle_animated",
    };
  }
  push() {
    if (this._el.css("position") !== "relative") {
      Object.assign(this._el[0].style, { position: "relative" });
    }
    if (this._el.css("overflow") !== "hidden") {
      Object.assign(this._el[0].style, { overflow: "hidden" });
    }
    if (this._el.find(`.${this.extend.rippleClass}`).length == 0) {
      this._el.prepend($(`<span class="${this.extend.rippleClass}"></span>`));
    }
    let circle = this._el.find(`.${this.extend.rippleClass}`);
    circle.removeClass(`${this.extend.animateClass}`);
    if (!circle.height() && !circle.width()) {
      let d = Math.max(this._el.outerWidth(), this._el.outerHeight());
      circle.css({ height: d, width: d });
    }
    let x = this._event.pageX - this._el.offset().left - circle.width() / 2,
      y = this._event.pageY - this._el.offset().top - circle.height() / 2;
    circle
      .css({ top: y + "px", left: x + "px" })
      .addClass(this.extend.animateClass);
  }
}
let rippleTriggerArr = [
  ...$(
    ".product-option__head, .option-btn, .home-welcome__link, .sign-modal__main-btn, .item-protect__plans button"
  ),
];
$.each(rippleTriggerArr, function (i) {
  rippleTriggerArr[i].onclick = (e) => {
    const $thisRipple = new rippleClickEffect($(this), e);
    $thisRipple.push();
  };
});
/* #endregion */


/* #region  Lock & Unlock scroll // body scroll // overflow scroll */
function lockScroll() {
  setTimeout(function () {
    if (!document.body.hasAttribute("ib-scroll-lock")) {
      let o = window.pageYOffset || document.documentElement.scrollTop;
      document.body.setAttribute("ib-scroll-lock", o),
        (document.body.style.overflow = "hidden"),
        (document.body.style.position = "fixed"),
        (document.body.style.top = "-" + o + "px"),
        (document.body.style.left = "0"),
        (document.body.style.width = "100%");
    }
  }, 1);
}

function unlockScroll() {
  if (document.body.hasAttribute("ib-scroll-lock")) {
    let o = document.body.getAttribute("ib-scroll-lock");
    document.body.removeAttribute("ib-scroll-lock"),
      (document.body.style.overflow = ""),
      (document.body.style.position = ""),
      (document.body.style.top = ""),
      (document.body.style.left = ""),
      (document.body.style.width = ""),
      window.scroll(0, o);
  }
}
/* #endregion */


/* #region  Backdrop Class */
let contentBackdropTimer;
class contentBackdrop {
  constructor(parent = $body) {
    this._parent = parent;
    this.settings = { class: "ib-backdrop" };
  }
  show() {
    let el = $("<div>", { class: this.settings.class });
    el.on("mouseenter", function () {
      new contentBackdrop().hide(
        header.searchBlock.removeClass(IS_VISIBLE),
        unlockScroll()
      );
    });
    if (!this.elExist()) {
      this._parent.append(el);
      el.show();
      setTimeout(() => {
        Object.assign(el[0].style, { opacity: 1 });
      }, 1);
    } else {
      window.clearTimeout(contentBackdropTimer);
      let el = this._parent.find(`.${this.settings.class}`);
      Object.assign(el[0].style, { opacity: 1 });
    }
  }
  hide() {
    let el = this._parent.find(`.${this.settings.class}`);
    if (this.elExist()) {
      Object.assign(el[0].style, { opacity: 0 });
      contentBackdropTimer = window.setTimeout(function () {
        el.remove();
      }, parseFloat(window.getComputedStyle(el[0]).transitionDuration) * 1000 +
      1);
    }
  }
  elExist() {
    let el = this._parent.find(`.${this.settings.class}`);
    if (el.length !== 0) {
      return true;
    } else {
      return false;
    }
  }
  getEl() {
    let el = this._parent.find(`.${this.settings.class}`);
    return $(el);
  }
}
/* #endregion */


/* #region  Header JS */
const header = {
  init: function () {
    this.renderDOM();
    this.bindEvents();
    this.setDropdowns()
  },
  renderDOM: function () {
    // Login Dropdown
    this.loginBtn = $('[data-evt="toggleAccountDropdown"]');
    this.loginDropdown = $(".login-dropdown");

    // Search
    this.searchBtn = $('[data-evt="toggleSearch"]');
    this.searchBlock = $(".header-search");

    this.loginLink = $('.login-nav__link')
  },
  bindEvents: function () {
    this.loginBtn.on('mouseover mouseleave', function (evt) {
      let dd = header.loginDropdown
      if (dd.length) {
        switch (evt.type) {
          case 'mouseover':
            dd.css({ display: 'block', opacity: 1 })
            break;
          case 'mouseleave':
            dd.css({ display: 'none', opacity: 0 })
            break;
        }
      }
    })
    this.loginLink.click(function (e) {
      e.stopPropagation()
    })
    this.searchBtn.click(() => {
      const overlay = new contentBackdrop();
      let el = header.searchBlock;

      if (el.hasClass(IS_VISIBLE)) {
        el.removeClass(IS_VISIBLE);
        unlockScroll();
        overlay.hide();
      } else {
        lockScroll();
        overlay.show();
        el.addClass(IS_VISIBLE);
        el.find("input").focus();
      }
    });
  },
  setDropdowns: function (...args) {
    args = Array.from(document.querySelectorAll('.header__sub-link'))

    if (args.length !== 0 && args) {

      const dd = document.querySelector('.nav-drop')
      const cont = [...document.querySelectorAll('.nav-drop__content')]
      const subLink = [...document.querySelectorAll('.nav-drop_more')]
      const IS_ACTIVE = 'is-active'

      let hideDelayTime, showDelayTime

      if (dd && cont && subLink) {
        const pos = (el) => {
          return {
            top: el.getBoundingClientRect().top + el.offsetHeight,
            left: el.getBoundingClientRect().left + (el.offsetWidth / 2) - (dd.offsetWidth / 2)
          }
        }

        const fn = {
          initial: () => {
            dd.style.top = `${pos(args[0]).top}px`
            dd.style.left = `${pos(args[0]).left}px`
          },
          hide: () => {
            dd.style.opacity = 0
            dd.style.display = 'none'
            args.forEach(el => el.classList.remove(IS_ACTIVE))
          },
          show: (el) => {
            args.forEach(el => el.classList.remove(IS_ACTIVE))
            el.classList.add(IS_ACTIVE)
            dd.style.display = 'block'
            dd.style.top = `${pos(el).top}px`
            dd.style.left = `${pos(el).left}px`
            dd.style.opacity = 1
          },
          switchContent: (attr) => {
            cont.forEach(el => el.style.display = 'none')
            cont.filter(el => el.id == `dd_${attr}`).forEach(el => el.style.display = 'block')
          }
        }

        const { initial: setInitial, hide: hide, show: show, switchContent: switchContent } = fn

        for (let i = 0; i < subLink.length; i++) {
          const el = subLink[i],
            content = el.querySelector('.nav-drop__sub')
          el.onmouseover = () => { content.style.display = 'block' }
          el.onmouseleave = () => { content.style.display = 'none' }
        }

        dd.onmouseover = (e) => {
          if (hideDelayTime) window.clearTimeout(hideDelayTime)
        }

        dd.onmouseleave = (e) => {
          window.clearTimeout(showDelayTime)
          hideDelayTime = window.setTimeout(() => {
            hide()
          }, 150);
        }


        args.forEach((el) => {
          el.onmouseover = (e) => {
            const attr = el.dataset.dropdown
            if (attr) {
              window.clearTimeout(hideDelayTime)
              showDelayTime = window.setTimeout(() => {
                switchContent(attr)
                show(el)
              }, 200);
            }
          }

          el.onmouseleave = (e) => {
            window.clearTimeout(showDelayTime)
            hideDelayTime = window.setTimeout(() => {
              hide()
            }, 150);
          }
        })

        window.onscroll = () => {
          window.clearTimeout(showDelayTime)
          hide(); setInitial()
        }

        setInitial()
      }
    }
  }
};
/* #endregion */


/* #region  Menu */
const menu = {
  states: {
    isActive: false,
    overIsActive: false,
  },
  init: function () {
    this.renderDOM();
    this.bindEvents();
    this.initialState();
  },
  renderDOM: function () {
    // modal
    this.modal = $(".mob-menu");
    this.backdrop = $(".mob-menu__backdrop");
    this.container = $(".mob-menu__container");
    // content
    this.main = $(".mob-menu__main-content");
    this.over = $(".mob-menu__over-content");
    this.overHeading = $(".mob-menu__over-heading");
    this.scrollContent = $(".mob-menu__scroll-content");
    this.megaLink = $(".mob-menu__mega-link");
    // events
    this.evtToggle = $('[data-evt="toggleMenu"]');
    this.evtToggleOver = [...$(".mob-menu__nav-step, .mob-menu__step-back")];
  },
  bindEvents: function () {
    $.each(this.evtToggle, function (index) {
      $(menu.evtToggle[index]).click(function () {
        menu.toggle();
      });
    });
    $.each(this.evtToggleOver, function (index) {
      $(menu.evtToggleOver[index]).click(function () {
        menu.toggleOver($(this));
      });
    });
    this.megaLink.on("click", function () {
      if (menu.states.isActive) {
        menu.toggle();
      }
    });
  },
  toggleOver: function (target) {
    let main = this.main[0],
      over = this.over[0];
    if (!menu.states.overIsActive) {
      let attr = target.attr("data-menu-nav");
      if (!attr) {
        return false;
      } else {
        let content = $(".mob-menu__step-content"),
          toShow = content.filter(`[data-menu-over="${attr}"]`),
          title =
            attr == "engagement"
              ? "Engagement & Wedding"
              : `${attr} Collection`;
        if (toShow) {
          let scrollable = $(over).find(menu.scrollContent);
          scrollable[0].scrollTop = 0;
          menu.states.overIsActive = true;
          content.hide();
          toShow.show();
          Object.assign(main.style, { transform: "translateX(-30%)" });
          Object.assign(over.style, { transform: "translateX(0%)" });
          menu.overHeading.html(title);
        }
      }
    } else {
      menu.states.overIsActive = false;
      Object.assign(main.style, { transform: "translateX(0%)" });
      Object.assign(over.style, { transform: "translateX(100%)" });
    }
  },
  toggle: function () {
    if (!menu.states.isActive) {
      menu.open();
    } else {
      menu.close();
    }
  },
  open: function () {
    lockScroll();
    menu.states.isActive = true;
    this.modal.show();
    let scrollable = this.main.find(menu.scrollContent);
    scrollable[0].scrollTop = 0;
    setTimeout(() => {
      Object.assign(this.backdrop[0].style, { opacity: 1 });
      Object.assign(this.container[0].style, { transform: "translateX(0%)" });
    }, 2);
  },
  close: function () {
    unlockScroll();
    menu.states.isActive = false;
    Object.assign(this.backdrop[0].style, { opacity: 0 });
    Object.assign(this.container[0].style, { transform: "translateX(-100%)" });
    setTimeout(() => {
      this.modal.hide();
    }, getTransitionTime(menu.container));
    if (menu.states.overIsActive) {
      menu.states.overIsActive = false;
      Object.assign(menu.main[0].style, { transform: "translateX(0%)" });
      Object.assign(menu.over[0].style, { transform: "translateX(100%)" });
    }
  },
  initialState: function () {
    this.modal.hide();
    Object.assign(this.backdrop[0].style, { opacity: 0 });
    Object.assign(this.container[0].style, { transform: "translateX(-100%)" });
    Object.assign(this.over[0].style, { transform: "translateX(100%)" });
    this.states.isActive = false;
    this.states.overIsActive = false;
  },
};
/* #endregion */


/* #region  Cart Modal */
const cartModal = new Object({
  init: function () {
    this.renderDOM();
    this.bindToggle();
  },
  renderDOM: function () {
    this._ = $(".cart-modal");
    this.backdrop = this._.find(".cart-modal__backdrop");
    this.container = this._.find(".cart-modal__container");
    this.evtToggle = getEvtDOM("toggleCart");
  },
  bindToggle: function () {
    $(document).on('click', '[data-evt="toggleCart"]', function () {
      let el = $(".cart-modal")
      if (el.exists()) {
        let container = $(".cart-modal__container"),
          backdrop = $(".cart-modal__backdrop")
        if (el.isVisible()) {
          unlockScroll();
          Object.assign(backdrop[0].style, { opacity: 0 });
          Object.assign(container[0].style, { transform: "translateX(100%)" });
          setTimeout(() => {
            el.hide();
          }, getTransitionTime(container));
        } else {
          lockScroll();
          el.show();
          setTimeout(() => {
            Object.assign(backdrop[0].style, { opacity: 1 });
            Object.assign(container[0].style, { transform: "translateX(0%)" });
          }, 1);
        }
      }
    })
  },
  toggle: function () {
    let el = cartModal._;
    if (el.exists()) {
      if (el.isVisible()) {
        cartModal.close();
      } else {
        cartModal.open();
      }
    }
  },
  open: function () {
    lockScroll();
    this._.show();
    setTimeout(() => {
      Object.assign(this.backdrop[0].style, { opacity: 1 });
      Object.assign(this.container[0].style, { transform: "translateX(0%)" });
    }, 1);
  },
  close: function () {
    unlockScroll();
    Object.assign(this.backdrop[0].style, { opacity: 0 });
    Object.assign(this.container[0].style, { transform: "translateX(100%)" });
    setTimeout(() => {
      this._.hide();
    }, getTransitionTime(cartModal.container));
  },
});
/* #endregion */


/* #region  Currency Modal */
const currencyModal = new Object({
  init: function () {
    this.renderDOM();
    this.bindEvents();
  },
  renderDOM: function () {
    this._ = $(".cur-modal");
    this.backdrop = this._.find(".cur-modal__backdrop");
    this.container = this._.find(".cur-modal__container");
    this.evtToggle = getEvtDOM("toggleCurrency");
    this.input = this._.find("input");
  },
  bindEvents: function () {
    if (currencyModal.evtToggle.exists()) {
      $.each(currencyModal.evtToggle, (i) => {
        currencyModal.evtToggle[i].onclick = () => {
          currencyModal.toggle();
        };
      });
    }

    if (currencyModal.input.exists()) {
      currencyModal.input.on("keyup", function () {
        currencyModal.intraSearch($(this));
      });
    }
  },
  toggle: function () {
    this.input.val("").trigger("keyup");
    let modal = currencyModal._;
    if (modal.exists()) {
      if (modal.isVisible()) {
        currencyModal.close();
      } else {
        currencyModal.open();
      }
    }
  },
  open: function () {
    lockScroll();
    this._.show();
    setTimeout(() => {
      this.backdrop.css({ opacity: 1 });
      this.container.css({ transform: "translateX(0%)" });
    }, 1);
  },
  close: function () {
    unlockScroll();
    this.backdrop.css({ opacity: 0 });
    this.container.css({ transform: "translateX(100%)" });
    setTimeout(() => {
      this._.hide();
    }, getTransitionTime(currencyModal.backdrop));
  },
  intraSearch: function (input) {
    let val = input.val().toLowerCase(),
      arr = [...$(".cur-item")];
    $.each(arr, function (index) {
      let txt = $(arr[index]).find(".cur-item__name").text().toLowerCase();
      if (~txt.indexOf(val)) {
        $(arr[index]).show();
      } else {
        $(arr[index]).hide();
      }
    });
  },
});
/* #endregion */


/* #region  Page Banner */
const pageBanner = new Object({
  init: function () {
    const banner = $(".page-banner");
    let bannerText = $(".page-banner-text"),
      movingEl = $(".banner-move");
    movingEl.addClass(`banner-move-${bannerText.length}`);

    let closeBtn = $(".page-banner-close");
    closeBtn.click(function () {
      let height = banner[0].scrollHeight;
      banner.css({ "margin-top": `-${height}px` });
      setTimeout(() => {
        banner.remove();
      }, getTransitionTime(banner));
    });
  },
});
/* #endregion */


/* #region  Footer */
const footer = new Object({
  init: function () {
    function attach() {
      if (windowLessDesktop()) {
        let footerHeader = Array.from($(".footer-col__header"));

        $.each(footerHeader, function (i) {
          let col = $(footerHeader[i]).closest(".footer-col"),
            body = col.find(".footer-col__body");

          if (body.length && col.length) {
            footerHeader[i].onclick = () => {
              if (body.height() == 0) {
                let scrH = body.find(".footer-col__body-scroll")[0]
                  .scrollHeight;
                body.css({
                  height: `${scrH}px`,
                });
              } else {
                let h = body.css("height");
                body.css("height", h);
                setTimeout(() => {
                  body.css({
                    height: "0px",
                  });
                }, 1);
              }
            };
          }
        });
      }
    }

    $(window).on("load resize", function () {
      attach();
    });
  },
});
/* #endregion */


/* #region  Homepage SPLIDE */
const homePageSplide = new Object({
  init: function () {
    const homeSplideArr = Array.from(
      document.getElementsByClassName("home-splide")
    );

    $.each(homeSplideArr, function (i) {
      const el = homeSplideArr[i];
      let main = new Splide(el, {
        type: "loop",
        perPage: 5,
        perMove: 1,
        autoplay: 0,
        gap: "8px",
        arrows: 1,
        pagination: 0,
        speed: 750,
        breakpoints: {
          1680: {
            perPage: 6,
            perMove: 1,
          },
          1120: {
            perPage: 5,
            perMove: 1,
          },
          991: {
            perPage: 4,
            perMove: 1,
          },
          767: {
            grid: {
              rows: 2,
              cols: 3,
              gap: { row: "10px", col: "10px" },
            },
          },
          478: {
            grid: {
              rows: 2,
              cols: 2,
              gap: { row: "8px", col: "8px" },
            },
          },
        },
      }).mount(window.splide.Extensions);
    });
  },
});
/* #endregion */


/* #region  PG Data / Guide Modal Data / PGM Data */
const pgSelect = {
  initalized: undefined,
  init: function () {
    this.renderDOM();
    this.initalized = true;
  },
  getAttrDOM: function (att) {
    return $(`[data-pg-set="${att}"]`);
  },
  renderDOM: function () {
    // Shape
    this.shapeImg = this.getAttrDOM("shapeImg");
    this.shapeTitle = this.getAttrDOM("shapeTitle");
    this.shapeDescription = this.getAttrDOM("shapeDescription");

    // Color
    this.colorImg = this.getAttrDOM("colorImg");
    this.colorTitle = this.getAttrDOM("colorTitle");
    this.colorDescription = this.getAttrDOM("colorDescription");

    // Clarity
    this.clarityImg = this.getAttrDOM("clarityImg");
    this.clartyTitle = this.getAttrDOM("clarityTitle");
    this.clarityDescription = this.getAttrDOM("clarityDescription");

    // Ring Size
    this.currentSize = this.getAttrDOM("currentSize");
    this.circSize = this.getAttrDOM("circSize");
    this.dSize = this.getAttrDOM("dSize");
    this.euSize = this.getAttrDOM("euSize");
    this.ukSize = this.getAttrDOM("ukSize");
  },
  attachControls: function (sArr, sBtn) {
    if (!this.initalized) {
      pgSelect.init();
    }
    let selectArr = sArr,
      selectBtn = sBtn;
    for (let i = 0; i < selectArr.length; i++) {
      let thisAttr = selectArr[i].getAttribute("data-pg-select"),
        btnArr = Array.from($(selectArr[i]).find(selectBtn));

      function setPgSelectEvent() {
        let dataSet;
        switch (thisAttr) {
          case "shape":
            dataSet = pgSelect.shape;
            break;
          case "color":
            dataSet = pgSelect.color;
            break;
          case "clarity":
            dataSet = pgSelect.clarity;
            break;
          case "ring-size":
            dataSet = pgSelect.ringSize;
            break;
        }
        return { dataSet };
      }

      $.each(btnArr, function (i) {
        btnArr[i].onclick = () => {
          setPgSelectEvent().dataSet.changeDetails(i);
          $.each(btnArr, function (i) {
            btnArr[i].classList.remove("is-active");
          });
          $(this).addClass("is-active");
        };
      });
    }
  },
  shape: {
    changeDetails: function (index) {
      pgSelect.shapeImg.attr("src", pgSelect.data.shape[index].url);
      pgSelect.shapeTitle.html(pgSelect.data.shape[index].title);
      pgSelect.shapeDescription.html(pgSelect.data.shape[index].description);
    },
  },
  color: {
    changeDetails: function (index) {
      pgSelect.colorImg.attr("src", pgSelect.data.color[index].url);
      pgSelect.colorTitle.html(pgSelect.data.color[index].title);
      pgSelect.colorDescription.html(pgSelect.data.color[index].description);
    },
  },
  clarity: {
    changeDetails: function (index) {
      pgSelect.clarityImg.attr("src", pgSelect.data.clarity[index].url);
      pgSelect.clartyTitle.html(pgSelect.data.clarity[index].title);
      pgSelect.clarityDescription.html(
        pgSelect.data.clarity[index].description
      );
    },
  },
  ringSize: {
    changeDetails: function (index) {
      pgSelect.currentSize.html(pgSelect.data.ringSize[index].us);
      pgSelect.circSize.html(pgSelect.data.ringSize[index].circ);
      pgSelect.dSize.html(pgSelect.data.ringSize[index].diameter);
      pgSelect.euSize.html(pgSelect.data.ringSize[index].europe);
      pgSelect.ukSize.html(pgSelect.data.ringSize[index].uk);
    },
  },
  data: {
    shape: [
      {
        url: "https://i.ibb.co/ZBmcG0f/dmg-shape-round.png",
        title: "Round",
        description:
          "A classic and timeless shape, the round diamond is known for its brilliant sparkle and perfect symmetry.",
      },
      {
        url: "https://i.ibb.co/rdNkYyp/dmg-shape-priness.png",
        title: "Princess",
        description:
          "A square-shaped diamond with sharp corners and exceptional brilliance, known for its modern and clean lines.",
      },
      {
        url: "https://i.ibb.co/271bsCZ/dmg-shape-oval.png",
        title: "Oval",
        description:
          "A modified brilliant cut diamond with an elongated shape, known for its brilliance and ability to create the illusion of longer, slender fingers.",
      },
      {
        url: "https://i.ibb.co/qyQnV1f/dmg-shape-pear.png",
        title: "Pear",
        description:
          "An elegant combination of a round and marquise shape, sometimes called a teardrop, offering a unique and graceful appearance.",
      },
      {
        url: "https://i.ibb.co/NVdgJtv/dmg-shape-emerald.png",
        title: "Emerald",
        description:
          "A rectangular shape with stepped facets, highlighting the diamonds clarity and showcasing a timeless and sophisticated look.",
      },
    ],
    color: [
      {
        url: "https://i.ibb.co/MDnYmGh/dmg-color-near.png",
        title: "K - Last Grade",
        description:
          "The color may be visible to the unaided eye. Diamonds with a K-color grade can be a smart choice, offering excellent value for money.",
      },
      {
        url: "https://i.ibb.co/MDnYmGh/dmg-color-near.png",
        title: "J - Last Grade",
        description:
          'Color in diamonds graded as "near-colorless" may be slightly visible to the naked eye, especially in fancy shapes or diamonds larger than 1 carat.',
      },
      {
        url: "https://i.ibb.co/JkK4B3C/dmg-color-slight.png",
        title: "I - Slightly Detectable",
        description:
          "Upon close examination, the color may be barely noticeable, but it still provides exceptional value.",
      },
      {
        url: "https://i.ibb.co/J2JhPM4/dmg-color-clear.png",
        title: "H - Near Colorless",
        description:
          'The "near-colorless" grade of CA exhibits noticeable color only when compared to much higher color grades, offering excellent value.',
      },
      {
        url: "https://i.ibb.co/J2JhPM4/dmg-color-clear.png",
        title: "G - Almost Colorless",
        description:
          'This grade is the highest level of "near-colorless" and may show some color in comparison to the even higher "colorless" grades, but it offers excellent value.',
      },
      {
        url: "https://i.ibb.co/J2JhPM4/dmg-color-clear.png",
        title: "F - Colorless",
        description:
          'The "colorless" grade is most valued when placed in platinum or white gold, with a faint color that can be identified by a skilled gemologist.',
      },
      {
        url: "https://i.ibb.co/J2JhPM4/dmg-color-clear.png",
        title: "E - Colorless",
        description:
          'This grade, best showcased in platinum or white gold, is so "colorless" that even trained eyes would struggle to detect traces of color.',
      },
    ],
    clarity: [
      {
        url: "https://i.ibb.co/Gp8pKwK/clarity-i3.png",
        title: "I1, I2, I3 - Included",
        description:
          "Diamonds in this clarity range have inclusions that are easily visible under 10x magnification and may also be visible to the naked eye. These diamonds may have reduced brilliance and sparkle due to their inclusions.",
      },
      {
        url: "https://i.ibb.co/ZHBvJz9/clarity-si1-si2.png",
        title: "SI1 & SI2 - Slightly Included",
        description:
          "These grades have noticeable inclusions under 10x magnification, some of which might be visible to the naked eye. SI diamonds generally offer good value as they have inclusions that might not significantly affect the appearance of the diamond.",
      },
      {
        url: "https://i.ibb.co/27xG7GC/clarity-vs1-vs2.png",
        title: "VS1 & VS2 - Very Slightly Included",
        description:
          "These grades have minor inclusions that are visible under 10x magnification but are considered relatively small and not easily noticeable to the naked eye.",
      },
      {
        url: "https://i.ibb.co/d61wnL9/clarity-vvs1-vvs2.png",
        title: "VVS1 & VVS2 - Very, Very Slightly Included",
        description:
          "These grades indicate that inclusions are extremely difficult to see even under 10x magnification. VVS diamonds may have minor inclusions that are barely visible to a skilled grader.",
      },
      {
        url: "https://i.ibb.co/WKsqs99/clarity-fl-if.png",
        title: "FL & IF - Flawless",
        description:
          "These are the highest clarity grades. Flawless diamonds have no visible inclusions or blemishes under 10x magnification, even by a skilled grader. Internally Flawless diamonds have no internal inclusions but may have minor surface blemishes.",
      },
    ],
    ringSize: [
      { us: 4, europe: "47", uk: "H 1/2", diameter: "14.9", circ: "46.8" },
      { us: 4.5, europe: "48", uk: "I 1/2", diameter: "15.3", circ: "48" },
      { us: 5, europe: "49", uk: "J 1/2", diameter: "15.7", circ: "49.3" },
      { us: 5.5, europe: "51", uk: "K 1/2", diameter: "16.1", circ: "50.6" },
      { us: 6, europe: "52", uk: "L 1/2", diameter: "16.5", circ: "51.9" },
      { us: 6.5, europe: "53", uk: "M 1/2", diameter: "16.9", circ: "53.1" },
      { us: 7, europe: "54", uk: "N 1/2", diameter: "17.3", circ: "54.4" },
      { us: 7.5, europe: "55", uk: "O 1/2", diameter: "17.7", circ: "55.7" },
      { us: 8, europe: "57", uk: "P 1/2", diameter: "18.1", circ: "57.0" },
      { us: 8.5, europe: "58", uk: "Q 1/2", diameter: "18.5", circ: "58.3" },
      { us: 9, europe: "59", uk: "R 1/2", diameter: "19.0", circ: "59.5" },
      { us: 9.5, europe: "61", uk: "S 1/2", diameter: "19.4", circ: "60.8" },
      { us: 10, europe: "62", uk: "T 1/2", diameter: "19.8", circ: "62.1" },
      { us: 10.5, europe: "63", uk: "U 1/2", diameter: "20.2", circ: "63.4" },
      { us: 11, europe: "64", uk: "V 1/2", diameter: "20.6", circ: "64.6" },
      { us: 11.5, europe: "66", uk: "W 1/2", diameter: "21.0", circ: "65.9" },
      { us: 12, europe: "67", uk: "X 1/2", diameter: "21.4", circ: "67.2" },
      { us: 12.5, europe: "68", uk: "Z 1/2", diameter: "21.8", circ: "68.5" },
    ],
  },
};
/* #endregion */


/* #region  PG Modal / Guide Modal / PGM Modal */
const pgModal = new Object({
  initialized: undefined,
  init: function () {
    this.renderDOM();
    this.bindEvents();
    Object.values(this.initFn).forEach((target) => {
      if (typeof target === "function") target();
    });
    this.intialized = true;
  },

  renderDOM: function () {
    // Root
    this.modal = $(".pg-modal");
    this.container = $(".pg-modal__container");
    this.backdrop = $(".pg-modal__backdrop");
    this.close = $('[data-evt="closePgModal"]');

    // Sections
    this.section = $(".pg-section");
    this.row = $(".pg-row");
    this.scrollContainer = $(".pg-modal__overscroll");
    this.sectionBracelets = this.section.filter("#pgBracelets");
    this.sectionDiamonds = this.section.filter("#pgDiamonds");
    this.sectionRings = this.section.filter("#pgRings");
    this.sectionNecklaces = this.section.filter("#pgNecklaces");

    // Controls
    this.switchBtn = $(".pg-switch-btn");

    // Select Tabs
    this.selectArr = Array.from($(".pg-select"));
    this.selectBtn = $(".pg-select-btn");
  },
  bindEvents: function () {
    this.close.click(function () {
      pgModal.fn.closeModal();
    });
  },

  fn: {
    openModal: function (target) {
      lockScroll();
      pgModal.modal.show();
      setTimeout(() => {
        pgModal.backdrop.css({ opacity: 1 });
        pgModal.container.removeClass("is-hidden");
      }, 1);
      let att = $(target).attr("data-pg-open");
      pgModal.section.hide();
      switch (att) {
        case "diamonds":
          pgModal.sectionDiamonds.show();
          break;
        case "rings":
          pgModal.sectionRings.show();
          break;
        case "bracelets":
          pgModal.sectionBracelets.show();
          break;
        case "necklaces":
          pgModal.sectionNecklaces.show();
          break;
        default:
          pgModal.section[0].show();
          break;
      }
      pgModal.scrollContainer[0].scrollTop = 0;
      pgSelect.attachControls(pgModal.selectArr, pgModal.selectBtn);
    },
    closeModal: function () {
      unlockScroll();
      pgModal.backdrop.css({ opacity: 0 });
      pgModal.container.addClass("is-hidden");
      setTimeout(() => {
        pgModal.modal.hide();
      }, parseFloat(window.getComputedStyle(pgModal.container[0]).transitionDuration) * 1000);
    },
    setMobile: function () {
      if ($(window).width() < 480) {
        let arr = Array.from(pgModal.section);
        for (let i = 0; i < arr.length; i++) {
          let nArr = Array.from($(arr[i]).find(pgModal.row));
          $.each(nArr, function (i) {
            if (i > 0) {
              $(nArr[i]).hide();
            }
          });
        }
      }
    },
    attachSectionControls: function () {
      pgModal.section.each(function () {
        let btnArr = [...$(this).find(pgModal.switchBtn)];
        let rowArr = [...$(this).find(pgModal.row)];
        $.each(btnArr, function (i) {
          btnArr[i].onclick = () => {
            $.each(rowArr, function (i) {
              $(rowArr[i]).hide();
            });
            $.each(btnArr, function (i) {
              $(btnArr[i]).removeClass("is-active");
            });
            $(this).addClass("is-active");
            $(rowArr[i]).show();
          };
        });
      });
    },
  },

  initFn: {
    setInitial: () => {
      pgModal.fn.closeModal();
      pgModal.fn.setMobile();
      pgModal.fn.attachSectionControls();
    },
  },
});
/* #endregion */


/* #region  Product Page : Main */
const productPage = new Object({
  initialized: undefined,
  classes: {
    isActive: "is-active",
    isCollapsed: "is-collapsed",
  },

  init: function () {
    this.renderDOM();
    this.bindEvents();
    Object.values(this.initFn).forEach((target) => {
      if (typeof target === "function") target();
    });
    this.intialized = true;
    this.fn.initZoom()
  },
  renderDOM: function () {
    this.favButton = $(".product__add-fav");
    this.evtExpandSummary = $('[data-evt="expandSummary"]');
    this.summaryContainer = $(".product__item-summary");
    this.buyBtn = $(".buy-btn");
    this.moreBtn = $('.product__more-btn')
    // Options
    this.optionBtn = $(".option-btn");
    this.optionBlock = $(".product__item-option");
    this.optionBody = $(".product-option__body");
    this.optionHead = $(".product-option__head");
    // Gold Color
    this.goldOption = $(".option_gold-color");
    this.goldOptionBtn = this.goldOption.find(this.optionBtn);
    // Diamond Color
    this.dmColorOption = $(".option_diamond-color");
    this.dmColorOptionBtn = this.dmColorOption.find(this.optionBtn);
    // Ring Size
    this.ringOption = $(".option_ring-size");
    // Floating controls
    this.floatingBtn = $(".floating-btn-mobile");
    // Guide controls
    this.evtOpenGuide = $("[data-pg-open]");
  },
  bindEvents: function () {
    this.favButton[0].onclick = () => {
      productPage.fn.toggleFavState();
    };
    this.optionBtn.click(function () {
      if ($(this).not(`.${IS_ACTIVE}`)) {
        $(this).siblings().removeClass(IS_ACTIVE)
        $(this).addClass(IS_ACTIVE)
      }
    })
    this.optionHead.click(function () {
      productPage.fn.toggleOptionVisible($(this));
    });
    this.goldOptionBtn.click(function () {
      let thisAttr = $(this).attr("data-color");
      productPage.fn.switchGoldColor(thisAttr);
    });
    this.dmColorOptionBtn.click(function () {
      let thisAttr = $(this).attr("data-dm-color");
      productPage.fn.switchDiamondColor(thisAttr);
    });
    this.evtOpenGuide.click(function () {
      productPage.fn.openGuideModal($(this));
    });
    this.buyBtn.click(function () {
      $(this).addClass(BUTTON_LOADING);
      setTimeout(() => {
        $(this).removeClass(BUTTON_LOADING);
      }, 2000);
    });
    this.moreBtn.click(function () {
      productPage.fn.toggleMoreDetails($(this))
    })
  },

  fn: {
    toggleFavState: () => {
      // Active / Disactive Favorite Button
      let el = productPage.favButton[0],
        cls = productPage.classes.isActive,
        isActive = el.classList.contains(cls);

      if (isActive) {
        el.classList.remove(cls);
      } else {
        el.classList.add(cls);
      }
    },
    toggleButtonState: (target) => {
      // Active / Disactive Option Button
      let parent = target.closest(productPage.optionBody),
        els = [...parent.find(productPage.optionBtn)],
        cls = productPage.classes.isActive,
        isActived = els.filter((el) => el.classList.contains(cls));

      $(isActived).removeClass(cls);
      target.addClass(cls);
    },
    toggleOptionVisible: (target) => {
      // Show / Hide Option Body
      let thisOption = target.closest(productPage.optionBlock),
        thisBody = thisOption.find(productPage.optionBody),
        thisWrapper = thisBody.find(".product-option__wrapper"),
        isExpanded = thisBody[0].clientHeight !== 0;

      if (isExpanded) {
        const currentHeight = thisBody.css("height");

        thisOption.addClass(productPage.classes.isCollapsed);
        thisBody.css({ height: currentHeight });
        setTimeout(() => {
          thisBody.css({ height: 0 });
          thisWrapper.css({ transform: "translateY(-26px)", opacity: 0 });
        }, 3);
      } else {
        const transitionTime =
          parseFloat(
            window.getComputedStyle(thisBody[0]).transitionDuration
          ) * 1000,
          toHeight = thisWrapper[0].scrollHeight;

        thisOption.removeClass(productPage.classes.isCollapsed);
        thisBody.css({ height: `${toHeight}px` });
        thisWrapper.css({ transform: "translateY(0px)", opacity: 1 });
        setTimeout(() => {
          thisBody.css({ height: "auto" });
        }, transitionTime);
      }
    },
    switchGoldColor: (attr) => {
      // Toggle Gold Color Header Background
      let color, textColor
      switch (attr) {
        case "Yellow": color = "#f1e9d8", textColor = "#171c29"; break;
        case "Rose": color = "#f0dcda", textColor = "#171c29"; break;
        case "White": color = "#f1f1f1", textColor = "#171c29"; break;
        case "Red": color = "#d4474f", textColor = "#ffffff"; break;
        case "Steel": color = "#ebebeb", textColor = "#171c29"; break;
        case "Blue": color = "#e6f2f8", textColor = "#171c29"; break;
        case "Black": color = "#232323", textColor = "#ffffff"; break;
        case "Platinum": color = "#e7e7e4", textColor = "#171c29"; break;
        case "Two_tone": color = "linear-gradient(34deg, #ebe3d3, #f8f6f2 29%, #f1e9d8 55%, #fff)", textColor = "#171c29"; break;
        case "Tri_tone": color = "linear-gradient(34deg, #f0dcda, #f8f2f4 29%, #f1e9d8 55%, #fff)", textColor = "#171c29"; break;
        case "Tri_tone_rose": color = "linear-gradient(34deg, #f0dcda, #f8f2f4 29%, #f1e9d8 55%, #fff)", textColor = "#171c29"; break;
        case "Navy_blue": color = "#223164", textColor = "#ffffff"; break;
        case "Two_tone_rose": color = "linear-gradient(34deg, #f0dcda, #f8f2f4 29%, #f0dcda 55%, #fff)", textColor = "#171c29"; break;
        default: color = "#e6f2f8", textColor = "#171c29"; break;
      }
      productPage.goldOption
        .find(productPage.optionHead)
        .css({ "background": color, color: textColor });
    },
    switchDiamondColor: (attr) => {
      // Toggle Diamond Color Header Background
      let bgColor, textColor;
      switch (attr) {
        case "White":
          (bgColor = "#f0f0f0"), (textColor = "#171c29");
          break;
        case "Black":
          (bgColor = "#434343"), (textColor = "#ffffff");
          break;
        case "Blue":
          (bgColor = "#e3eeff"), (textColor = "#171c29");
          break;
        case "Yellow":
          (bgColor = "#fff9e4"), (textColor = "#171c29");
          break;
        default:
          (bgColor = "#f0f0f0"), (textColor = "#171c29");
          break;
      }
      productPage.dmColorOption
        .find(productPage.optionHead)
        .css({ "background-color": bgColor, color: textColor });
    },
    toggleMoreDetails: (target) => {
      // Show / Hide Warranty or More Details
      let $this = target,
        els = productPage.moreBtn,
        container = $('.product__about-wrap')

      els.removeClass(IS_ACTIVE)
      $this.addClass(IS_ACTIVE)

      container.hide()

      if ($this[0].classList.contains('for_more')) container.filter('.for_more').show()
      if ($this[0].classList.contains('for_warranty')) container.filter('.for_warranty').show()
    },
    openGuideModal: (target) => {
      if (target) {
        pgModal.fn.openModal(target);
      }
    },
  },

  initFn: {
    // Events Fires on initialization
    // checkSummary: () => {
    //   // If there is a list, then collapse description else nothing.
    //   let container = productPage.summaryContainer,
    //     list = container.find("ul"),
    //     cls = productPage.classes.isCollapsed;
    //   if (list.length == 0) {
    //     return false;
    //   } else {
    //     const button = $("<button>", {
    //       class: "product__summary-toggle",
    //       html: "Show More...",
    //     }).on("click", function () {
    //       if (container.hasClass(cls)) {
    //         container.removeClass(cls);
    //         this.innerHTML = "Show Less...";
    //       } else {
    //         container.addClass(cls);
    //         this.innerHTML = "Show More...";
    //       }
    //     });

    //     container.addClass(cls).append(button);
    //   }
    // },
    checkGoldColor: () => {
      // On load check active gold color
      let buttons = [...productPage.goldOptionBtn],
        isActived = buttons.filter((el) =>
          el.classList.contains(productPage.classes.isActive)
        ),
        thisAttr = $(isActived).data("color");
      productPage.fn.switchGoldColor(thisAttr);
    },
    checkGoldColorNumber: () => {
      const cont = productPage.goldOption,
        btn = cont.find(productPage.optionBtn)
      if (btn.length < 3) {
        cont.find('.options-block').css({ display: 'flex' })
      }
    },
    checkDmColor: () => {
      // On load check active diamond color
      let buttons = [...productPage.dmColorOptionBtn],
        isActived = buttons.filter((el) =>
          el.classList.contains(productPage.classes.isActive)
        ),
        thisAttr = $(isActived).data("dm-color");
      productPage.fn.switchDiamondColor(thisAttr);
    },
    checkRingSizes: () => {
      // If there is ring sizes less than 5.5 && more than 11.5 then add more buttons
      let thisOption = productPage.ringOption;
      let arr = Array.from(thisOption.find(productPage.optionBtn));
      if (arr.length > 15) {
        let sliced = [];
        sliced.push(arr.slice(0, 3), arr.slice(-3));
        $.each(sliced, function (i) {
          $(sliced[i]).hide();
        });

        let smallerBtn = $("<button>", {
          class: "option-btn",
          "data-option-sub": "smallerSizes",
        });

        let biggerBtn = $("<button>", {
          class: "option-btn",
          "data-option-sub": "biggerSizes",
        });

        smallerBtn.click(function () {
          $(this).remove();
          $.each(arr.slice(0, 3), function (i) {
            $(arr.slice(0, 3)[i]).css({ display: "flex" });
          });
        });
        biggerBtn.click(function () {
          $(this).remove();
          $.each(arr.slice(-3), function (i) {
            $(arr.slice(-3)[i]).css({ display: "flex" });
          });
        });

        let parent = thisOption.find(".options-block");

        parent.append(biggerBtn);
        parent.prepend(smallerBtn);
      }
    },
    initTippy: () => {
      // Initiale tippy
      if ($(window).width() >= 992) {
        tippy(".item-option__mark", {
          allowHTML: false,
          delay: 200,
          // theme: 'ib_options',
          maxWidth: 270,
        });
      }
    },
    initFloating: () => {
      // Initialize floating button mobile
      let el = productPage.floatingBtn,
        elHeight = el[0].scrollHeight;
      function attachTrigger() {
        let triggerEl = $("#productAddCart");
        if (triggerEl.length) {
          $(window).scroll(function () {
            let hT = triggerEl.offset().top,
              hH = triggerEl.outerHeight(),
              wH = $(window).height(),
              wS = $(this).scrollTop();

            if (wS + 100 > hT - wH && hT > wS + 100 && wS + 100 + wH > hT) {
              el.css({ transform: `translateY(${elHeight}px)` });
            } else {
              el.css({ transform: `translateY(0px)` });
            }
          });
        }
      }
      if (el.length > 0) {
        if ($(window).width() > 479) {
          el.hide();
        } else {
          attachTrigger();
        }
        $(window).on("load resize", function () {
          if ($(window).width() > 479) {
            el.hide();
          } else {
            el.show();
            attachTrigger();
          }
        });
      }
    },
    attachPayLaterBoxEvents: function (...args) {
      args = [...document.querySelectorAll('[data-paylater]')]

      const introEls = [...$('#payLaterBoxIntro').find('h3, p, button')]
      const details = document.getElementById('payLaterBoxDetails')

      if (args && args.length && details) {
        const toggle = () => {
          if (window.getComputedStyle(details).display == 'none') {
            details.style.display = 'block'; introEls.forEach((el) => { el.style.display = 'none' })
          } else {
            introEls.forEach((el) => { el.style.display = 'block' }); details.style.display = 'none'
          }
        }

        args.forEach(el => el.onclick = () => {
          toggle()
        })
      }
    }
  },
});
/* #endregion */


/* #region  Product Page SPLIDE */
const productSplide = new Object({
  initialized: undefined,
  init: function () {
    this.renderDOM();
    this.initSplide();
    this.initialized = true;
    this.initMoreSplide();
  },
  renderDOM: function () {
    this.sliderArr = Array.from(
      document.getElementsByClassName("product-slider")
    );
    this.thumbArr = Array.from(
      document.getElementsByClassName("product-slider_thumbnails")
    );
  },
  initSplide: function () {
    $.each(this.sliderArr, function (i) {
      const slider = productSplide.sliderArr[i];
      const thumbnails = productSplide.thumbArr[i];
      let main = new Splide(slider, {
        type: "loop",
        perPage: 2,
        perMove: 1,
        autoplay: false,
        pauseOnHover: true,
        pauseOnFocus: true,
        gap: "10px",
        arrows: false,
        pagination: false,
        speed: 750,
        breakpoints: {
          478: {
            perPage: 1,
            perMove: 1,
          },
        },
      });
      let thumb = new Splide(thumbnails, {
        fixedWidth: 58,
        gap: 6,
        rewind: true,
        pagination: false,
        arrows: false,
        cover: true,
        isNavigation: true,
      });
      main.sync(thumb);
      main.mount();
      thumb.mount();
    });
  },
  initMoreSplide: function () {
    const moreSliderArr = Array.from(
      document.getElementsByClassName("more-row__splide")
    );

    $.each(moreSliderArr, function (i) {
      const slider = moreSliderArr[i];
      let main = new Splide(slider, {
        type: "loop",
        perPage: 5,
        perMove: 1,
        autoplay: 0,
        gap: "12px",
        arrows: 1,
        pagination: 0,
        speed: 750,
        breakpoints: {
          1680: {
            perPage: 5,
            perMove: 1,
          },
          1120: {
            perPage: 4,
            perMove: 1,
          },
          991: {
            perPage: 4,
            perMove: 1,
          },
          767: {
            grid: {
              rows: 2,
              cols: 3,
              gap: { row: "10px", col: "10px" },
            },
          },
          478: {
            grid: {
              rows: 2,
              cols: 2,
              gap: { row: "10px", col: "10px" },
            },
          },
        },
      }).mount(window.splide.Extensions);
    });
  },
});

if (typeof productSplide.init === "function") {
  productSplide.init();
}
/* #endregion */


/* #region  Filter Modal */
const filterModal = {
  init: function () {
    this.renderDOM()
    this.bindEvents()
    this.reset()
  },
  renderDOM: function () {
    this._ = $('.filter-modal')
    this.backdrop = this._.find('.filter-modal__backdrop')
    this.container = this._.find('.filter-modal__container')
    this.content = this._.find('.filter-modal__content')
    this.evtFilter = $('[data-filter-evt]')
  },
  bindEvents: function () {
    this.evtFilter.click(function () {
      let thisAttr = $(this).attr('data-filter-evt')
      thisAttr == 'close' ? filterModal.close() : filterModal.open(thisAttr)
    })
    $('#filterSort a').click(function () {
      if (!$(this).hasClass(IS_ACTIVE)) {
        $(this).addClass(IS_ACTIVE).siblings().removeClass(IS_ACTIVE)
      }
    })
  },
  open: function (att) {
    lockScroll()
    this._.show()
    setTimeout(() => {
      this.backdrop.css({ opacity: 1 })
      this.container.css({ transform: 'translateX(0%)' })
    }, 1)
    this.content.hide()
    switch (att) {
      case 'openSort':
        this.content.filter('#filterSort').show()
        break;
      case 'openFilter':
        this.content.filter('#filterFilter').show()
        break
      default:
        break;
    }
  },
  close: function () {
    unlockScroll()
    this.backdrop.css({ opacity: 0 })
    this.container.css({ transform: 'translateX(100%)' })
    setTimeout(() => {
      this._.hide()
    }, getTransitionTime(this.container));
  },
  reset: function () {
    this.backdrop.css({ opacity: 0 })
    this._.hide()
    this.container.css({ transform: 'translateX(100%)' })
    this.content.eq(0).hide()
  }
}
/* #endregion */


/* #region  Page elements */
const pageEls = new Object({
  init: function () {
    Object.values(this.attachEvent).forEach((target) => {
      if (typeof target === 'function') target();
    })
  },
  attachEvent: {
    filterDropdown: () => {
      let dropdownEls = Array.from($('.filter-dropdown'))

      for (let i = 0; i < dropdownEls.length; i++) {
        const el = dropdownEls[i];
        $(el).hover(function () {
          let thisCurrent = $(this).find('.filter-dropdown__current'),
            list = $(this).find('.filter-dropdown__list'),
            scrollContainer = list.find('> div'),
            buttons = Array.from(scrollContainer.find('> div')),
            main = $(this).find('.filter-dropdown__main')

          const scrollH = scrollContainer[0].scrollHeight

          if (list.height() == 0) {
            list.css({ height: `${scrollH}px` })
            main.addClass(IS_ACTIVE)
          } else {
            list.css({ height: '0px' })
            main.removeClass(IS_ACTIVE)
          }

          $.each(buttons, function (i) {
            buttons[i].onclick = () => {
              let sibs = $(buttons[i]).siblings()
              sibs.removeClass(IS_ACTIVE)
              buttons[i].classList.add(IS_ACTIVE)

              let val = $(buttons[i]).html()
              thisCurrent.html(val)
            }
          })
        })
      }
    },
    pageFilters: () => {
      let filterRows = Array.from($('.filter-row'))
      for (let i = 0; i < filterRows.length; i++) {
        const el = $(filterRows[i]),
          header = el.find('.filter-row__header'),
          body = el.find('.filter-row__body'),
          container = el.find('.filter-row__container'),
          icon = header.find('svg')

        header.click(() => {
          let currentBodyHeight = body.height()
          if (currentBodyHeight !== 0) {
            body.css({ height: `${currentBodyHeight}px` })
            setTimeout(() => {
              body.css({ height: 0 })
              container.css({ transform: 'translateY(-24px)', opacity: 0 })
              icon.css({ transform: 'rotate(0deg)' })
            }, 1);
          } else {
            let scrollH = container[0].scrollHeight
            body.css({ height: scrollH })
            container.css({ transform: 'translateY(0px)', opacity: 1 })
            icon.css({ transform: 'rotate(180deg)' })
          }
        })
      }
    },
    faqLists: () => {
      let faqLists = Array.from($('.faq-list'))
      for (let i = 0; i < faqLists.length; i++) {
        const list = $(faqLists[i]),
          li = list.find('li')

        li.eq(0).find('.faq-body').css({ height: 'auto' })

        for (let n = 0; n < li.length; n++) {
          const el = $(li[n])
          let head = el.find('.faq-head'),
            body = el.find('.faq-body'),
            svg = el.find('svg')

          head.click(function () {
            if (body.height() == 0) {
              body.css({ height: 'auto' })
              svg.css({ transform: 'rotate(180deg)' })
            } else {
              body.css({ height: 0 })
              svg.css({ transform: 'rotate(0deg)' })
            }
          })
        }
      }
    }
    // togglePayModal: () => {
    //   let evt = [...$('[data-evt="togglePayModal"]')]
    //   evt.forEach((el) => {
    //     el.onclick = () => {
    //       let modal = $('.pay-modal')
    //       if (modal.length) {
    //         if (modal.isVisible()) {
    //           unlockScroll()
    //           modal.css({ opacity: 0 })
    //           setTimeout(() => {
    //             modal.hide()
    //           }, getTransitionTime(modal));
    //         } else {
    //           lockScroll()
    //           modal.show()
    //           setTimeout(() => {
    //             modal.css({ opacity: 1 })
    //           }, 1);
    //         }
    //       }
    //     }
    //   })
    // }
  }
})

const attachPayModal = () => {
  let evtOpenLater = $('[data-evt="payModalLater"]'),
    evtOpenCrypto = $('[data-evt="payModalCrypto"]'),
    evtClose = $('[data-evt="closePayModal"]'),
    crypto = $('#payModalCrypto'),
    later = $('#payModalLater'),
    modal = $('.pay-modal')

  const openModal = () => {
    lockScroll()
    modal.show()
    setTimeout(() => {
      modal.css({ opacity: 1 })
    }, 1);
  }

  const closeModal = () => {
    unlockScroll()
    modal.css({ opacity: 0 })
    setTimeout(() => {
      modal.hide()
    }, getTransitionTime(modal));
  }

  evtOpenLater.add(evtOpenCrypto).click(function () {
    openModal()
    crypto.add(later).hide()
    if ($(this).is(evtOpenCrypto)) {
      crypto.show()
    }
    if ($(this).is(evtOpenLater)) {
      later.show()
    }
  })

  evtClose.click(function () {
    closeModal()
  })
}
/* #endregion */


/* #region  My Bag */
const myBag = new Object({
  init: function () {
    Object.values(this.attachEvents).forEach((fn) => {
      if (fn !== undefined && typeof fn == 'function') fn();
    })
  },
  attachEvents: {

    toggleFloating: function () {
      const el = $('.mybag-floating'),
        triggerElPosition = $('.mybag-summary__footer').offset().top
      $(window).scroll(function () {
        let yScroll = window.scrollY
        if (yScroll < (triggerElPosition - screen.availHeight) || yScroll > (triggerElPosition)) {
          el.removeClass(IS_HIDDEN)
        } else {
          el.addClass(IS_HIDDEN)
        }
      })
    },

    attachToggleProtect: function () {
      const plans = $('.item-protect__plans'),
        button = plans.find('button')

      button.click(function () {
        if (!$(this).is(`.${IS_ACTIVE}`)) {
          let sbs = $(this).siblings()
          sbs.removeClass(IS_ACTIVE)
          $(this).addClass(IS_ACTIVE)
        }
      })
    }

  }
})
/* #endregion */


/* #region  Account page */
const account = new Object({
  init: function () {
    Object.values(this.attachEvents).forEach((fn) => {
      if (fn !== undefined && typeof fn == 'function') fn();
    })
  },
  attachEvents: {
    editAddress: function () {
      const evtEditAddress = Array.from($('[data-edit="address"]'))
      for (let i = 0; i < evtEditAddress.length; i++) {
        const el = evtEditAddress[i];

        $(el).click(function () {
          let details = $(this).closest('.profile-card').find('.profile-card__details'),
            form = details.filter('.form')
          if (form.isVisible()) {
            details.hide().not(form).show()
          } else {
            details.show().not(form).hide()
          }
        })

      }
    },
    toggleInvoiceHeight: function () {
      const invoiceHeader = Array.from($('.order__invoice-header'))
      for (let i = 0; i < invoiceHeader.length; i++) {
        const el = invoiceHeader[i];
        $(el).click(function () {
          let body = $(this).siblings('.order__invoice-body')
          if (body.height() == 0) {
            let sHeight = body[0].scrollHeight
            body.css({ height: `${sHeight}px` })
          } else {
            body.css({ height: `${body.height()}px` })
            setTimeout(() => {
              body.css({ height: "0px" })
            }, 1);
          }
        })
      }
    }
  }
})
/* #endregion */


/* #region  Location page */
const locationPage = new Object({
  init: function () {
    Object.values(this.attachEvents).forEach((fn) => {
      if (fn !== undefined && typeof fn == 'function') fn();
    })
  },
  attachEvents: {
    toggleStoresVisibility: function () {
      let headArr = [...$('.store-row__head')]
      $.each(headArr, function (i) {
        $(headArr[i]).click(function () {
          let rows = $('.store-row'),
            thisRow = $(this).closest(rows)
          if (thisRow.find('.store-row__body').isVisible()) {
            return false
          } else {
            rows.find('.store-row__body').show()
            rows.not(thisRow).find('.store-row__body').hide()
          }
        })
      })
    }
  }
})
/* #endregion */


/* #region Page Alers */
var alertTimer;
const pageAlerts = {
  classes: {
    fullWidth: 'page-alert_backdrop',
    error: 'page-alert_error',
    warning: 'page-alert_warning',
    info: 'page-alert_info',
    visible: 'is-visible'
  },
  init: function () {
    this.cacheDOM()
    this.bindEvents()
    // this.fullWidth()
  },
  cacheDOM: function () {
    this.container = $('.page-alert')
    this.title = $('.page-alert-title')
    this.subtitle = $('.page-alert-text')
    this.close = $('[data-evt="hidePageAlert"]')
  },
  bindEvents: function () {
    this.close.click(this.hideAlert.bind(this))
    clearTimeout(alertTimer)
  },
  fullWidth: function () {
    this.container.addClass(this.classes.fullWidth)
  },
  showAlert: function (errorType = function () { pageAlerts.resetAlert() }, title, text, hideTime = 2500) {
    clearTimeout(alertTimer)
    this.resetAlert();

    this.container.addClass(this.classes.visible).addClass(errorType)
    this.changeMsg(title, text)
    alertTimer = window.setTimeout(function () {
      pageAlerts.hideAlert()
    }, hideTime)
  },
  hideAlert: function () {
    this.container.removeClass(this.classes.visible)
  },
  changeMsg: function (title, text) {
    this.title.html(title)
    this.subtitle.html(text)
  },
  resetAlert: function () {
    this.container.removeClass(function () {
      let i = pageAlerts.classes
      return `${i.warning} ${i.info} ${i.error}`
    })
  }
}

function showMessage(type, title, msg) {
  var alert_type = (type === 'success') ? pageAlerts.classes.info : pageAlerts.classes.error;
  pageAlerts.showAlert(alert_type, title, msg);
}
/* #endregion */


/* #region Sell Pages */
const bookModal = {
  step: 1,
  apptData: {},

  root: document.querySelector('.book-sell'),
  backdrop: document.querySelector('.book-sell__backdrop'),
  container: document.querySelector('.book-sell__container'),

  evtNextStep: $('[data-evt="bookModalNext"]'),
  evtBackStep: $('[data-evt="bookModalBack"]'),
  evtToggle: $('[data-evt="toggleBookModal"]'),

  sectionDate: $('#bookSectionDate'),
  sectionPersonal: $('#bookSectionPersonal'),
  sectionConfirm: $('#bookSectionConfirm'),

  inputName: document.getElementById('bookFullName'),
  inputEmail: document.getElementById('bookEmail'),
  inputPhone: document.getElementById('bookPhone'),
  inputArr: [this.inputName, this.inputEmail, this.inputPhone],

  confirmName: document.getElementById('bookConfirmName'),
  confirmEmail: document.getElementById('bookConfirmEmail'),
  confirmPhone: document.getElementById('bookConfirmPhone'),
  confirmDate: document.getElementById('bookConfirmDate'),
  confirmTime: document.getElementById('bookConfirmTime'),

  init: function () {
    if (this.root !== null) {
      this.dateTime.init()
      this.attachEvents()
    }
  },

  close: function () {
    unlockScroll()
    this.container.style.transform = 'translateX(100%)'
    this.backdrop.style.opacity = 0
    setTimeout(() => {
      this.root.style.display = 'none'
    }, getTransitionTime(this.container));
  },
  open: function () {
    if (!$('.book-sell__date-box').length) { bookModal.dateTime.appendBoxes(bookModal.dateTime.getDates(true)) }
    lockScroll()
    this.root.style.display = 'block'
    setTimeout(() => {
      this.container.style.transform = 'translateX(0%)'
      this.backdrop.style.opacity = 1
    }, 1);
  },
  toggle: function () {
    if (window.getComputedStyle(this.root).getPropertyValue('display') !== 'none') {
      this.close()
    } else {
      this.open()
    }
  },
  attachEvents: function () {
    this.evtToggle.click(function () {
      bookModal.toggle()
    })
    this.evtNextStep.click(function () {
      switch (bookModal.step) {
        case 1:
          if (bookModal.apptData.date) {
            bookModal.step = 2
            bookModal.sectionDate.hide()
            bookModal.sectionPersonal.show()
            bookModal.observer()
          }
          break;
        case 2:
          if (bookModal.inputName.value && bookModal.inputEmail.value && bookModal.inputPhone.value) {
            bookModal.step = 3
            bookModal.sectionPersonal.hide()
            bookModal.sectionConfirm.show()
            bookModal.apptData.name = bookModal.inputName.value
            bookModal.apptData.email = bookModal.inputEmail.value
            bookModal.apptData.phone = bookModal.inputPhone.value
            bookModal.apptData.url = window.location.href;
            bookModal.observer()
          }
          break;
        case 3:
          bookModal.apptData.date_day = $('#bookConfirmDate').text();
          bookModal.apptData.time = $('#bookConfirmTime').text();
          //alert(JSON.stringify(bookModal.apptData)) // change later
          $.ajax({
            url: '/json/book-appointment',
            type: 'POST',
            data: { json: JSON.stringify(bookModal.apptData) },
            success: function (data) {
              bookModal.close()
              setTimeout(() => {
                bookModal.reset()
              }, getTransitionTime(bookModal.container));
            }
          });

          break;
      }
    })
    this.evtBackStep.click(function () {
      switch (bookModal.step) {
        case 1:
          bookModal.close()
          break;
        case 2:
          --bookModal.step
          bookModal.observer()
          bookModal.sectionPersonal.hide()
          bookModal.sectionDate.show()
          break;
        case 3:
          --bookModal.step
          bookModal.observer()
          bookModal.sectionConfirm.hide()
          bookModal.sectionPersonal.show()
          break;
      }
    })
    const attachInputObesrver = () => {
      let arr = [bookModal.inputName, bookModal.inputEmail, bookModal.inputPhone]
      arr.forEach((el) => { el.oninput = () => { bookModal.observer() } })
    }
    attachInputObesrver()
  },

  dateTime: {
    intervals: [[11, 0o0, 0o0], [13, 30, 0o0], [15, 30, 0o0], [16, 0o0, 0o0], [16, 30, 0o0]],
    daysPerView: 3,
    holder: document.getElementById('bookSellDates'),

    init: function () {
      this.attachEvents()
      this.appendBoxes(this.getDates(true))
    },
    renderHTML: (date) => {
      const weekday = date.toLocaleDateString('en-US', { weekday: 'long' }), day = date.getDate(), month = date.toLocaleDateString('en-US', { month: 'short' }), time = date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' })

      let ifPast = new Date() > date ? ' disabled' : ''
      let dayTime = date.getDay() == 6 ? 'Closed' : date.getDay() == 0 ? 'Closed' : time
      let isWeekend = date.getDay() == 6 ? ' is-closed' : date.getDay() == 0 ? ' is-closed' : ''

      return `
      <div class="book-sell__date-box${isWeekend}" data-time="${String(date)}"${ifPast}>
        <span>${weekday}, ${day}${getOrdinalTxt(day)} ${month}</span>
        <span>${dayTime}</span>
      </div>
      `
    },
    appendBoxes: function (arr) {
      arr.forEach((el) => this.holder.insertAdjacentHTML('beforeend', el))
    },
    getDates: function (isNext) {
      let daysArr = [], initial = 0
      let arr = [...document.querySelectorAll('.book-sell__date-box')]
      let initialDate

      if (arr.length == 0) {
        initialDate = new Date()
      } else {
        if (isNext == true) {
          initialDate = new Date(arr[arr.length - 1].getAttribute('data-time'))
        } else {
          initialDate = new Date(arr[0].getAttribute('data-time'))
        }
      }

      if (arr.length !== 0) {
        arr.forEach(el => el.remove());
        if (isNext == true) {
          initialDate.setDate(initialDate.getDate() + 1)
        } else { initialDate.setDate(initialDate.getDate() - 1) }
      }

      while (initial !== this.daysPerView) {
        let dayDate = new Date(initialDate)
        if (isNext == true) { daysArr.push(new Date(dayDate.setDate(initialDate.getDate() + initial))) } else {
          daysArr.push(new Date(dayDate.setDate(initialDate.getDate() - initial)))
        }
        ++initial
      }

      let ints = isNext == true ? this.intervals : this.intervals.slice().reverse()

      let htmlArr = daysArr.reduce((acc, date) => {
        ints.forEach((interval) => {
          let thisDate = new Date(date)
          thisDate.setHours(...interval)
          acc.push(this.renderHTML(thisDate))
        })
        return acc
      }, [])

      if (isNext == true) { return htmlArr } else { return htmlArr.reverse() }
    },
    attachEvents: function () {
      $('[data-switch-time]').click(function () {
        let attr = $(this).attr('data-switch-time')
        switch (attr) {
          case 'next':
            bookModal.dateTime.appendBoxes(bookModal.dateTime.getDates(true))
            break;
          case 'prev':
            if ([...document.querySelectorAll('.book-sell__date-box')][0])
              bookModal.dateTime.appendBoxes(bookModal.dateTime.getDates(false))
            break;
        }
      }),
        $(document).on('click', '.book-sell__date-box', function () {
          $(this).toggleClass(IS_ACTIVE).siblings().removeClass(IS_ACTIVE)
          bookModal.observer()
        })
    }
  },

  observer: function () {
    switch (this.step) {
      case 1:
        let activeDate = $('.book-sell__date-box').filter(`.${IS_ACTIVE}`)
        if (activeDate.length) {
          this.apptData.date = new Date(activeDate.attr('data-time'))
          this.evtNextStep.attr('disabled', false)
        } else {
          delete this.apptData.date
          this.evtNextStep.attr('disabled', true)
        }
        break;
      case 2:
        if (this.inputName.value && this.inputEmail.value && this.inputPhone.value && this.apptData.date) {
          this.evtNextStep.attr('disabled', false)
        } else {
          this.evtNextStep.attr('disabled', true)
        }
        break;
      case 3:
        this.confirmName.innerHTML = this.apptData.name
        this.confirmEmail.innerHTML = this.apptData.email
        this.confirmPhone.innerHTML = this.apptData.phone
        this.confirmDate.innerHTML = `${this.apptData.date.getDate()}${getOrdinalTxt(this.apptData.date.getDate())} ${this.apptData.date.toLocaleDateString('en-US', { month: 'long' })}`
        this.confirmTime.innerHTML = this.apptData.date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' })
        break;
    }
  },
  reset: function () {
    bookModal.step = 1
    let inputArr = [this.inputName, this.inputEmail, this.inputPhone]
    inputArr.forEach((el) => { el.value = '' })
    $('.book-sell__date-box').removeClass(IS_ACTIVE)
    bookModal.sectionConfirm.hide()
    bookModal.sectionPersonal.hide()
    bookModal.sectionDate.show()
    Object.values(bookModal.apptData).forEach((el) => {
      delete el
    })
    $('.book-sell__date-box').remove()
    bookModal.observer()
  }
}
const sellPage = {
  faqItems: [...document.querySelectorAll('.sell-faq-item')],
  init: function () {
    if (this.faqItems.length) {
      this.attachFaq()
      $('.sell-faq-item__main').eq(0).trigger('click')
    }
  },
  attachFaq: function () {
    this.faqItems.forEach((el, index) => {
      $(el).click(function () {
        let main = $(this).find('.sell-faq-item__main'),
          p = $(this).find('p'), svg = $(this).find('svg')
        if (main.height() == 0) {
          $(this).addClass(IS_ACTIVE)
          main.css({ height: `${p[0].scrollHeight}px` })
          svg.css({ transform: 'rotate(180deg)' })
        } else {
          $(this).removeClass(IS_ACTIVE)
          main.css({ height: `0px` })
          svg.css({ transform: 'rotate(0deg)' })
        }
      })
    })
  }
}
/* #endregion */


/* #region rootLoader */
const rootLoader = new Object({
  class: 'root_loader',
  renderHTML: () => { return `<div class=${rootLoader.class}></div>` },
  isExist: () => { return $(document).find(`.${rootLoader.class}`).length ? true : false },

  push: function (noLock = false) {
    if (!noLock) { lockScroll() }
    if (!this.isExist()) { $body.append(rootLoader.renderHTML()) }
  },
  remove: function (noUnlock = false) {
    if (!noUnlock) unlockScroll();
    if (this.isExist()) { $(document).find(`.${rootLoader.class}`).remove() }
  }
})
/* #endregion */


/* #region pageReset */
const passReset = {
  IS_EMPTY: 'is-empty',
  IS_DISABLED: 'is-disabled',
  init: function () {
    if ($('.pass-reset-page').length) {
      this.renderDOM()
      this.bindEvents()
    }
  },
  renderDOM: function () {
    this.form = $('#passResetForm')
    this.submitBtn = $('#passResetSubmit')
    this.inputArr = [...this.form.find('input[type="password"]')]
    this.error = $('.pass-reset-error')
    this.loader = $('.pass-reset-loader')
    this.main = $('.pass-reset__main')
    this.result = $('.pass-reset__result')
  },
  bindEvents: function () {
    // submit click
    $.each(this.submitBtn, function (i) {
      passReset.submitBtn[i].onclick = (e) => {
        e.preventDefault()
        passReset.form.submit()
      }
    })
    // input events
    $.each(this.inputArr, function (i) {
      passReset.inputArr[i].oninput = () => {
        let arr = passReset.inputArr
        let pass1 = arr[0].value, pass2 = arr[1].value
        if (pass2.length == 0) {
          passReset.hideError()
        } else {
          if (pass1.length !== pass2.length) { passReset.showError('Different password length') }
          else {
            passReset.hideError(); if (pass1 === pass2) { passReset.successError() }
            else { passReset.showError("Passwords don't match") }
          }
        }
      }
    })
    // form submit
    this.form[0].onsubmit = (e) => {
      e.preventDefault()
      if (passReset.formValid()) {
        Object.assign(passReset.submitBtn[0].style, { color: 'transparent', height: '14px', 'border-radius': '50px' })
        passReset.form.addClass(passReset.IS_DISABLED)
        passReset.hideError()
        passReset.loader[0].animate({ width: '100%' }, { duration: 3000, fill: 'forwards' }).onfinish = () => {
          const formData = new FormData(e.target), obj = {}
          formData.forEach((value, key) => (obj[key] = value))
          Object.assign(passReset.main[0].style, { opacity: 0 }); Object.assign(passReset.result[0].style, { opacity: 0 })
          setTimeout(() => {
            passReset.main.hide()
            passReset.result.show()
            setTimeout(() => {
              Object.assign(passReset.result[0].style, { opacity: 1 })
            }, 5);
          }, 401);
          // alert(JSON.stringify(obj))
        }
      }
    }
  },
  formValid: function () {
    let arr = passReset.inputArr
    arr.forEach(el => el.classList.remove(passReset.IS_EMPTY))

    if (arr.length !== 0) {
      let emptyInput = arr.filter(el => el.value.length == 0)

      if (emptyInput.length !== 0) {
        $.each(emptyInput, function (i) {
          emptyInput[i].classList.add(passReset.IS_EMPTY)
          setTimeout(() => {
            emptyInput[i].classList.remove(passReset.IS_EMPTY)
          }, 400);
        })
      } else {
        let pass1 = arr[0].value, pass2 = arr[1].value
        if (pass1 === pass2) {
          return true
        } else {
          return false
        }
      }

    }
  },
  showError: function (text = 'Something went wrong...') {
    this.error.html(text)
    Object.assign(this.error[0].style, { color: '#c02942', opacity: 1, transform: 'translateX(-50%) translateY(0px)' })
  },
  hideError: function () {
    Object.assign(this.error[0].style, { color: '#c02942', opacity: 0, transform: 'translateX(-50%) translateY(14px)' })
  },
  successError: function (text = 'Passwords match!') {
    this.error.html(text)
    Object.assign(this.error[0].style, { color: '#088d7b', opacity: 1, transform: 'translateX(-50%) translateY(0px)' })
  }
}
/* #endregion */


/* #region Sirv */
let sirvTimer
const sirvCards = {
  visibleClass: 'is-visible',
  init: function () {
    this.cacheDOM()
    this.bindEvents()
  },
  cacheDOM: function () {
    this.cards = $('.product-card')
  },
  bindEvents: function () {
    if (this.cards) {
      this.cards.on('mouseenter mouseleave touchstart touchend', function (e) {
        switch (e.type) {

          case 'touchstart':
            sirvCards.toggleSirv($(this), 1)
            break;

          case 'touchend':
            sirvCards.toggleSirv($(this), 0)
            break;
          case 'mouseenter':
            sirvCards.toggleSirv($(this), 1)
            break;
          case 'mouseleave':
            sirvCards.toggleSirv($(this), 0)
            break;
        }
      })
    }
  },
  toggleSirv: function ($this, state) {
    let sirv = $this.find('.product-picture_sirv')
    if (sirv.length !== 0) {
      let id = sirv.find('.Sirv').attr('id')
      if (state !== 0) {
        sirv.show()
        setTimeout(() => {
          sirv.addClass(this.visibleClass)
        }, 1);
        Sirv.instance(id).play()
      } else {
        Sirv.instance(id).pause()
        sirv.removeClass(this.visibleClass)
        sirvTimer = window.setTimeout(function () {
          sirv.hide()
        }, 300)
      }
    }
  }
}
/* #endregion */


const initPageObjects = () => {
  const objArr = [
    header,
    menu,
    cartModal,
    currencyModal,
    pageBanner,
    homePageSplide,
    pgModal,
    productPage,
    filterModal,
    footer,
    pageEls,
    myBag,
    account,
    locationPage,
    pageAlerts,
    sellPage,
    bookModal,
    passReset,
    sirvCards
  ];

  for (let i = 0; i < objArr.length; i++) {
    const obj = objArr[i];
    try {
      obj;
      if (typeof obj.init === "function" && typeof obj.init !== undefined) {
        obj.init();
      }
    } catch (error) {
      if (error instanceof ReferenceError) {
        console.log("obj not declared");
      } else {
        console.log("other error");
      }
    }
  }
};

function initProductZoom() {
  const isDesktop = window.innerWidth > 991
  window.removeSlider = (target) => {
    unlockScroll()
    const slider = target.closest('.zoom_slider'); slider.css({ opacity: 0 })
    setTimeout(() => { slider.hide() }, 400);
  }

  const setDesktopZoom = () => {
    [...document.querySelectorAll('.product-media__inner-wrap')].reduce((acc, el) => {
      if (el.querySelector('img') && el.querySelector('img') !== null) {
        if (!/(placeholder|store|pay)/gi.test(el.querySelector('img').getAttribute('src'))) {
          acc.push(el)
        }
      }
      return acc
    }, []).forEach((el) => { jQuery(el).zoom({ magnify: 1.6 }) })
  }
  const setMobileZoom = () => {
    const sliders = [...document.querySelectorAll('.product-slider')] // Get all existing sliders

    sliders.forEach((slider, index) => {
      const button = $('<button/>', { class: `product__zoom-btn zoom_btn${index}` }); button.appendTo($(slider)) // Create & append zoom button
      const renderNewSlider = (slider, index) => { // Get HTML new zoom slider
        let mediaArr = [...slider.querySelectorAll('img')].reduce((acc, img) => {
          const src = img.getAttribute('src')
          if (!acc.includes(src) && !/(placeholder|store|pay)/gi.test(src)) { acc.push(src) }
          return acc
        }, []).sort()

        this.renderMedia = () => {
          return mediaArr.reduce((acc, src) => {
            acc += `<div class="splide__slide"><img src="${src}"></div>`
            return acc
          }, '')
        }

        return `
          <div class="zoom_slider zsl${index}">
            <div>
              <div class="zoom_slider_logo"><img src="${String.raw`\themes\default\frontend\oct-2023/assets/logo.svg`}"></div>
              <button class="zoom_slider-close" onclick="removeSlider($(this))"></button>
              <div class="zoom-sl${index} splide">
                <div class="splide__track">
                  <div class="splide__list">
                  ${this.renderMedia()}
                  </div>
                </div>
                <div class="splide__arrows">
                  <div class="splide__arrow--prev"></div>
                  <div class="splide__arrow--next"></div>
                </div>
              </div>
            </div>
          </div>`
      }
      const appendNewSlider = (html) => { $body.append(html) } // Append Zoom Slider
      const initNewSlider = (index) => { // Splide Initialization
        this.settings = {
          type: "loop",
          perPage: 1,
          perMove: 1,
          autoplay: 0,
          gap: "12px",
          arrows: 1,
          pagination: 0,
          speed: 800,
          drag: false,
          dragAngleThreshold: 0
        }
        const zoomSlider = new Splide(`.zoom-sl${index}`, this.settings);
        zoomSlider.mount()
      }
      const initZoom = (index) => { // Initialize jQuery zoom for the new slider
        let slides = [...document.querySelector(`.zoom_slider.zsl${index}`).querySelectorAll('.splide__slide')]
        slides.forEach((slide) => {
          $(slide).zoom({
            magnify: 1.4,
            onZoomIn: function () {
              $(this).closest('.splide').css('border-color', '#e6eaec')
            },
            onZoomOut: function () {
              $(this).closest('.splide').css('border-color', '#0095c6')
            }
          })
        })
      }
      const showNewSlider = (index) => {
        let localSlider = $(`.zoom_slider.zsl${index}`)
        if (localSlider) { localSlider.show(); lockScroll(); setTimeout(() => { localSlider.css({ opacity: 1 }) }, 1); }
      }
      const openSlider = (index) => {
        let slider = $(`.zoom_slider.zsl${index}`)
        if (slider) { slider.show(); lockScroll(); setTimeout(() => { slider.css({ opacity: 1 }) }, 1); }
      }

      button.click(() => {
        const localSlider = document.querySelector(`.zoom_slider.zsl${index}`)
        if (!localSlider) {
          appendNewSlider(renderNewSlider(slider, index))
          initNewSlider(index)
          initZoom(index)
          showNewSlider(index)
        } else {
          openSlider(index)
        }
      })
    })
  }

  const setZoom = () => {
    $(document).ready(function () {
      if (isDesktop && $('.main_product').length) { setDesktopZoom() } else {
        setMobileZoom()
      }
    })
  }

  return setZoom()
}

function attachStickyScroll() {
  const bar = $('.filter-sidebar'), overlay = $('.filter-sidebar__overlay')
  if (bar.length && overlay.length) {
    const els = bar.find('.filter-row')
    $.each(els, function (i) {
      els[i].onclick = () => {
        let cont = $(this).find('.filter-row__container')
        setTimeout(() => {
          let currentHeight = bar.height()
          let scrollHeight = bar[0].scrollHeight
          if ((currentHeight - scrollHeight) <= -5) {
            overlay.css({ opacity: 1 })
          } else {
            overlay.css({ opacity: 0 })
          }
        }, getTransitionTime(cont));
      }
    })
    bar[0].addEventListener('scroll', function (e) {
      if (this.scrollTop + this.clientHeight >= this.scrollHeight) {
        overlay.css({ opacity: 0 })
      } else { overlay.css({ opacity: 1 }) }
    })
  }
}

const mailModal = new Object({
  init: function () {
    this.renderDOM()
    if (this.modal.length) {
      this.bindEvents()
    }
  },
  renderDOM: function () {
    this.modal = $('.mail-modal')
    this.backdrop = $('.mail-modal__backdrop')
    this.container = $('.mail-modal__container')
    this.evtClose = $('[data-mail-modal="close"]')
  },
  bindEvents: function () {
    this.evtClose.on('click', function () { mailModal.close() })
  },
  open: function () {
    lockScroll()
    this.modal.show()
    this.modal.find('input').focus()
    setTimeout(() => {
      this.backdrop.css({ opacity: 1 })
      this.container.css({ transform: 'translateY(0px)', opacity: 1 })
    }, 2);
  },
  close: function () {
    unlockScroll()
    this.backdrop.css({ opacity: 0 })
    this.container.css({ transform: 'translateY(42px)', opacity: 0 })
    setTimeout(() => {
      this.modal.hide()
    }, getTransitionTime(this.container));
  }
})

const bfsModal = new Object({
  transitionTime: () => { return getTransitionTime(bfsModal._) },
  init: function () {
    this.renderDOM()
    if (this._.length && this._ !== null) {
      this.attachEvents()
    }
  },
  renderDOM: function () {
    this._ = $('.bfs-modal')
    this.evtClose = $('[data-evt="closeBfsModal"]')
  },
  attachEvents: function () {
    this.evtClose.click(function (e) {
      bfsModal.close()
    })
  },
  open: function () {
    if (this._.length) {
      lockScroll()
      this._.show()
      setTimeout(() => {
        this._.css({ opacity: 1 })
      }, 1);
    }
  },
  close: function () {
    if (this._.length) {
      unlockScroll()
      this._.css({ opacity: 0 })
      setTimeout(() => {
        this._.hide()
      }, this.transitionTime());
    }
  }
})

const quizModal = {
  currentStep: undefined,
  isFinished: undefined,
  pollLength: undefined,
  maxStep: undefined,
  isInitialized: undefined,
  init: function () {
    this.renderDOM()
    this.setInitial()
    this.bindEvents()
  },
  renderDOM: function () {
    this.modal = $('.quiz-modal')
    this.container = this.modal.find('.quiz-container')
    this.backdrop = this.modal.find('.quiz-modal__backdrop')
    this.heightContainer = this.modal.find('.quiz-container-height')
    this.poll = this.modal.find('.quiz-poll')
    this.pollArr = [...this.poll]
    this.answers = this.modal.find('.quiz-answer')
    this.fullStepText = this.modal.find('.quiz-step-text')
    this.currentStepText = this.modal.find('.quiz-current-step')
    this.maxStepText = this.modal.find('.quiz-max-step')
    this.bar = this.modal.find('.quiz-bar')
    this.evtGoNext = $('[data-evt="quizGoNext"]')
    this.evtOpen = $('[data-evt="openQuizModal"]')
    this.closeBtn = $('[data-evt="closeQuizModal"]')
  },
  bindEvents: function () {
    this.evtGoNext.click(function () {
      quizModal.goNextStep()
    })
    this.closeBtn.click(function () {
      quizModal.close()
    })
    this.evtOpen.click(function () {
      quizModal.open()
    })
  },
  setInitial: function () {
    this.currentStep = 1, this.isFinished = false, this.pollLength = this.pollArr.length, this.maxStep = this.pollLength
    if (this.pollLength !== 0 && this.pollLength !== undefined && this.isInitialized !== true) {
      this.isInitialized = true
      quizModal.currentStepText.html(quizModal.currentStep)
      quizModal.maxStepText.html(quizModal.maxStep)
      this.modal.find('input[type="radio"]').prop('checked', false); this.evtGoNext.html('Next')
      // Object.assign(this.heightContainer[0].style, { height: `${this.getObjectScrollHeight(this.pollArr[0])}` })
      Object.assign(this.bar[0].style, { width: `${(100 / this.pollLength)}%` })
    } else {
      return false
    }
  },
  // utils
  getObjectScrollHeight: function (obj) {
    if (obj instanceof jQuery) {
      return `${obj[0].scrollHeight}px`
    } else {
      return `${obj.scrollHeight}px`
    }
  },
  noEmptyAnswers: function () {
    let parent = $(quizModal.pollArr[(quizModal.currentStep - 1)]),
      checkedRadio = parent.find('input[type="radio"]:checked'),
      answers = parent.find(quizModal.answers)
    if (checkedRadio.length == 0) {
      answers.css({ opacity: '0.3' }); setTimeout(() => { answers.css({ opacity: 1 }) }, 375);
    } else {
      return true
    }
  },
  goNextStep() {
    if (quizModal.currentStep !== quizModal.maxStep) {
      if (quizModal.noEmptyAnswers()) {
        Object.assign(quizModal.pollArr[(quizModal.currentStep - 1)].style, { opacity: 0 })
        Object.assign(quizModal.bar[0].style, { width: `${(100 / quizModal.pollLength) * (quizModal.currentStep + 1)}%` })
        $.each(quizModal.pollArr, function (i) {
          Object.assign(quizModal.pollArr[i].style, { transform: `translateX(-${(quizModal.currentStep * 100)}%)` })
        })
        Object.assign(quizModal.heightContainer[0].style, { height: `${quizModal.pollArr[quizModal.currentStep].scrollHeight}px` })
        ++quizModal.currentStep
        quizModal.currentStepText.html(quizModal.currentStep)
        if (quizModal.currentStep == quizModal.maxStep) {
          quizModal.evtGoNext.html('Show Results')
        }
      }
    } else {
      if (quizModal.noEmptyAnswers()) {
        Object.assign(quizModal.heightContainer[0].style, { height: '0px' })
        Object.assign(quizModal.bar[0].style, { width: '5%' })
        $.each(quizModal.pollArr, function (i) {
          Object.assign(quizModal.pollArr[i].style, { transform: `translateX(-${(quizModal.currentStep * 100)}%)` })
        })
        Object.assign(quizModal.pollArr[(quizModal.currentStep - 1)].style, { opacity: 0 })
        quizModal.evtGoNext.prop('disabled', true)
        quizModal.fullStepText.text('FINDING WATCHES')
        $('.quiz-close-btn').remove()
        quizModal.isFinished = true
        setTimeout(() => {
          quizModal.bar.animate({ width: '100%' }, 3000, function () { quizModal.close() })
        }, 600);
      }
    }
  },
  open: function () {
    lockScroll()
    quizModal.modal.show()
    Object.assign(this.heightContainer[0].style, { height: `${this.getObjectScrollHeight(this.pollArr[quizModal.currentStep - 1])}` })
    setTimeout(() => {
      Object.assign(quizModal.backdrop[0].style, { opacity: 1 })
      Object.assign(quizModal.container[0].style, { transform: 'translateY(0px)', opacity: 1 })
    }, 1);
  },
  close: function () {
    unlockScroll()
    let timeToHide = (parseFloat(window.getComputedStyle(quizModal.backdrop[0]).transitionDuration) * 1000)
    Object.assign(quizModal.backdrop[0].style, { opacity: 0 })
    Object.assign(quizModal.container[0].style, { transform: 'translateY(32px)', opacity: 0 })
    setTimeout(() => {
      quizModal.modal.hide()
    }, timeToHide);
  }
}

function toggleAdminBar() {
  let bar = document.querySelector('.iba-toolbar')
  if (bar && bar !== null) {
    if (bar.classList.contains(IS_MINIMIZED)) {
      bar.classList.remove(IS_MINIMIZED)
    } else {
      bar.classList.add(IS_MINIMIZED)
    }
  }
}

const attachCheckoutCopy = () => {
  const btnArr = [...document.querySelectorAll('.crypto-how-btn'), ...document.querySelectorAll('.copy-address-btn')]
  if (btnArr.length) {
    btnArr.forEach((btn) => {
      btn.onclick = () => {
        if (!window.getSelection().toString()) {
          let details = btn.closest('.checkout-form__radio-details')
          if (details !== null) {
            let address = details.querySelector('.copy-address-btn__typo').innerHTML
            async function copyAddress() {
              try {
                await navigator.clipboard.writeText(address);
                details.classList.add(IS_COPIED)
                setTimeout(() => {
                  details.classList.remove(IS_COPIED)
                }, 1300);
              } catch (err) {
                details.classList.remove(IS_COPIED, IS_ERROR)
                setTimeout(() => {
                  details.classList.remove(IS_COPIED, IS_ERROR)
                }, 2100);
              }
            }
            copyAddress()
          }
        }
      }
    })
  }
}


const salesModal = {
  init: function () {
    this.renderDOM()
    if (this.modal.length) {
      this.bindEvents()
    }
  },
  renderDOM: function () {
    this.modal = $('.sale-history-modal')
    this.container = $('.sale-history__container')
    this.evtClose = $('[data-evt="closeSalesModal"]')
  },
  bindEvents: function () {
    this.evtClose.click(function () {
      salesModal.close()
    })
  },
  open: function () {
    window.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault()
        salesModal.close()
      }
    }, { once: true })
    lockScroll()
    this.modal.show()
    setTimeout(() => {
      this.modal.css({ 'background-color': "rgba(13, 16, 26, .7)" })
      this.container.css({ 'transform': 'translateX(0%)' })
    }, 1);
  },
  close: function () {
    unlockScroll()
    this.modal.css({ 'background-color': "rgba(13, 16, 26, 0)" })
    this.container.css({ 'transform': 'translateX(100%)' })
    setTimeout(() => {
      this.modal.hide()
    }, getTransitionTime(this.modal));
  }
}

const formPage = new Object({
  uploadedImages: [],
  init: function () {
    if ($('.main_formpage').length) {
      this.bindEvents()
      // this.imgUpload()
      this.attachImagesUploader()
    }
  },
  bindEvents: function () {
    $('.formpage__upload-btn').click(function () {
      if ($('#image_upload').length) { $('#image_upload').trigger('click') }
    })
  },
  attachImagesUploader: () => {
    const uploadLabel = document.querySelector('.formpage__upload-label'),
      uploadInput = document.querySelector('#image_upload'),
      imagesWrap = $('.formpage__images-thumbnails')

    // Setting drag&drop event
    if (uploadLabel !== null) {
      uploadLabel.ondragover = (evt) => {
        evt.preventDefault()
        uploadLabel.classList.add(IS_ACTIVE)
      }
      uploadLabel.ondragleave = (evt) => {
        evt.preventDefault()
        uploadLabel.classList.remove(IS_ACTIVE)
      }
      uploadLabel.ondrop = (evt) => {
        evt.preventDefault()
        uploadLabel.classList.remove(IS_ACTIVE)

        const files = [], items = [...evt.dataTransfer.items]
        items.forEach((item, i) => {
          if (item.kind === 'file') {
            files.push(item.getAsFile())
          }
        })

        processFiles([...files])
      }
    }

    // Setting manual files upload
    if (uploadInput !== null) {
      uploadInput.onchange = (evt) => {
        const files = [...evt.target.files]

        processFiles(files)
      }
    }

    function processFiles(files) {
      if (files.length) {
        files.forEach((file, i) => {
          if (!file.type.match('image.*')) { return }

          let getIndex = () => {
            return $('.formpage__upload').length + 1
          }

          let reader = new FileReader()
          reader.onload = function (e) {
            let html =
              `
               <div class="formpage__upload" data-img-id="${getIndex()}">
                 <div class="formpage__input-boxes">
                   <div>
                     <input value="image_${getIndex()}" id="image_${getIndex()}" type="checkbox" checked>
                     <label for="image_${getIndex()}"></label>
                   </div>
                 </div>
                   <div data-name="${file.name}" style="background-image: url(${e.target.result})" class="formpage__upload-bg">
                 </div>
               </div>
             `
            imagesWrap.append(html)
          }
          reader.readAsDataURL(file)
        })
      }
    }

    // Setting checkbox toggle on appended images
    $body.on('click', ".formpage__upload", function () {
      // let html = 
      // `
      // <div class="formpage-zoom">
      //   <div></div>
      //   <div></div>
      // </div>
      // `
      let cb = $(this).find('input[type="checkbox"]'),
        active = cb.prop("checked") ? 1 : 0
      if (active) { cb.prop('checked', false) } else {
        cb.prop('checked', true)
      }
    });
  }
})


document.addEventListener("DOMContentLoaded", function () {
  initPageObjects();
  initTelInput();
  initProductZoom()
  attachStickyScroll()
  attachCheckoutCopy()
  attachPayModal()
  mailModal.init()
  bfsModal.init()
  quizModal.init()
  salesModal.init()
  formPage.init()
});
function initValidators() {
  $(".needs-validation").parsley({
    errorClass: 'is-invalid text-danger',
    successClass: 'is-valid',
    errorsWrapper: '<div class="invalid-feedback"></div>',
    errorTemplate: '<span></span>',
    trigger: 'change'
  });
}

function resetBtnStates(el) {
  el.removeClass('is-successful');
  el.removeClass('is-failed');
}

function showAlternativeBtnText(el, msg, css_class) {
  var original_msg = $(el).html();
  resetBtnStates($(el));
  $(el).addClass(css_class).html(msg);
  setTimeout(function () {
    resetBtnStates($(el));
    $(el).html(original_msg);
  }, 4000);
}

window.Parsley.on('form:submit', function () {
  //console.log("submit form");
  var form = $(this.$element[0]);
  var url = form.attr('action');
  var btn = form.find(".js-loading-btn");
  $.ajax({
    type: "POST",
    url: url,
    data: form.serialize(), // serializes the form's elements.
    success: function (data) {
      var r = $.parseJSON(data);
      if (!r.error) {
        //show success state on button and return message in r.msg
        showAlternativeBtnText(btn, r.msg, 'is-successful');
        window.setTimeout(function () {
          if (r.link != undefined && r.link != '') {
            window.location.href = r.link;
          } else {
            window.location.reload();
          }
        }, 3000);
      } else {
        //show failed state on button and return message in r.msg
        showAlternativeBtnText(btn, r.msg, 'is-failed');
      }
    }
  });
  return false;
});

const signModal = new Object({
  init: function () {
    this.renderDOM();
    this.bindEvents();
    this.attachSumbitEvents()
    this.attachOTP()
  },
  renderDOM: function () {
    this._ = $(".sign-modal");
    this.backdrop = this._.find(".sign-modal__backdrop");
    this.container = this._.find(".sign-modal__container");
    this.footer = this._.find(".sign-modal__footer");

    this.evtToggle = Array.from($('[data-evt="toggleSign"], .js-toggle-sign'));
    this.evtTogglePassVisible = $('[data-evt="togglePasswordVisible"]');
    this.evtSwitch = $("[data-sign-switch]");
    this.genderButton = $('.sign-modal__gender-select')

    this.view = $(".sign-modal-view");
    this.viewLogin = this.view.filter("#loginSignIn");
    this.viewPassword = this.view.filter("#loginPass");
    this.viewPhone = this.view.filter("#loginPhone");
    this.viewCode = this.view.filter("#loginCode");
    this.viewRegister = this.view.filter("#loginSignUp");

    this.submitBtn = this._.find(".js-submit")
    this.formsArr = [...this._.find('form')]
  },

  bindEvents: function () {
    // Toggle modal
    $.each(signModal.evtToggle, (i) => {
      let target = signModal.evtToggle[i];
      target.onclick = () => {
        signModal.toggle();
      };
    });
    // Switch password visibility
    this.evtTogglePassVisible.click(function () {
      let input = $(this).siblings("input");
      if (input.exists()) {
        let type = input.attr("type");
        if (type == "password") {
          input.attr("type", "text");
        } else {
          input.attr("type", "password");
        }
      }
    });
    // Switch View
    this.evtSwitch.click(function (e) {
      let att = $(this).data("sign-switch");
      e.preventDefault();
      signModal.switch(att);
    });
    this.genderButton.click(function () {
      $(this).siblings().removeClass(IS_ACTIVE)
      $(this).addClass(IS_ACTIVE)
      let attr = $(this).attr('data-gender')
      $('#signup_gender').val(attr)
    })
    // Button Loading State
    // this.submitBtn.click(function (e) {
    //   e.preventDefault();
    //   $(this).appendButtonLoadingState();
    // });
  },
  attachOTP: function () {
    const inputs = document.querySelectorAll('.signmodal-otp');

    inputs.forEach((input, index) => {
      input.dataset.index = index;
      input.addEventListener('keyup', handleOtp);
      input.addEventListener('paste', handleOnPasteOtp);
    });

    function handleOtp(e) {
      const input = e.target;
      let value = input.value;
      let isValidInput = value.match(/[0-9a-z]/gi);
      input.value = "";
      input.value = isValidInput ? value[0] : "";

      let fieldIndex = input.dataset.index;
      if (fieldIndex < inputs.length - 1 && isValidInput) {
        input.nextElementSibling.focus();
      }

      if (e.key === 'Backspace' && fieldIndex > 0) {
        input.previousElementSibling.focus();
      }

      if (fieldIndex == inputs.length - 1 && isValidInput) {
      }
    }

    function handleOnPasteOtp(e) {
      const data = e.clipboardData.getData('text');
      const value = data.split("");
      if (value.length === inputs.length) {
        inputs.forEach((input, index) => (input.value = value[index]));
      }
    }
  },
  attachSumbitEvents: function () {
    const arr = this.formsArr
    $.each(arr, function (index) {
      $(arr[index]).on('submit', function () {
        const btn = $(this).find('.js-submit')
        if ($(this).parsley().isValid()) {
          btn.appendButtonLoadingState()
        }
      })
    })
  },

  switch: function (type) {
    signModal.view
      .filter(function () {
        if ($(this).isVisible()) {
          return this;
        }
      })
      .hide();
    signModal.footer.hide();

    switch (type) {
      case "login":
        signModal.viewLogin.show();
        signModal.footer.show();
        break;
      case "phone":
        signModal.viewPhone.show();
        break;
      case "password":
        signModal.viewPassword.show();
        break;
      case "register":
        signModal.viewRegister.show();
        break;
      case "code":
        signModal.viewCode.show();
        break;
      default:
        signModal.viewLogin.show();
        signModal.footer.show();
        break;
    }
  },

  toggle: function () {
    if (signModal._.isVisible()) {
      signModal.close();
    } else {
      signModal.open();
    }
  },
  close: function () {
    unlockScroll();
    signModal.backdrop.css({ opacity: 0 });
    signModal.container.css({ transform: "translateX(100%)" });
    setTimeout(() => {
      signModal._.hide();
    }, getTransitionTime(signModal.container));
  },
  open: function (...args) {
    lockScroll();
    signModal._.show();
    setTimeout(() => {
      signModal.backdrop.css({ opacity: 1 });
      signModal.container.css({ transform: "translateX(0%)" });
    }, 1);
    if (menu.states.isActive) {
      menu.close();
    }

    if (args.length !== 0) {
      $.each(args, (i) => {
        signModal.switch(args[i]);
      });
    }
  },
});


document.addEventListener('DOMContentLoaded', function () {
  try {
    signModal;
    if (typeof signModal.init === "function" && typeof signModal.init !== undefined) {
      signModal.init();
    }
  } catch (error) {
    if (error instanceof ReferenceError) { console.log('sign obj not declated') }
  }
  initValidators()
})

/* LOGIN WITH PHONE NUMBER */
$(document).ready(function () {
  $('#btn_confirm_otp').on('click', function () {
    confirmLoginOtp();
  });
  $('#resend-otp-btn').on('click', function () {
    resendOtp();
  });
  $('#frm_login_otp').on('submit', function (e) {
    var phoneField = document.querySelector('#phone_input_Login');
    var iti = window.intlTelInputGlobals.getInstance(phoneField);
    e.preventDefault();
    var fullPhone = iti.getNumber();
    var countryCode = '+' + iti.getSelectedCountryData().dialCode;
    var phone = fullPhone.replace(countryCode, '');
    var btn = $(e.target).find(".js-loading-btn");
    $('#otp_phone').val(phone);
    $('#otp_country').val(countryCode);
    $.ajax({
      url: '/send-otp',
      type: 'POST',
      data: { country_code: countryCode, phone_number: phone },
      success: function (data) {
        var r = $.parseJSON(data);
        var MsgClass = (r.error) ? 'is-failed' : 'is-successful';
        showAlternativeBtnText(btn, r.msg, MsgClass);
        if (!r.error) {
          $('.sign-modal__phone-span').html(fullPhone);
          signModal.switch('code');
        }
      }

    });
  });
});


function confirmLoginOtp() {
  var otp = $('#otp_1').val() + $('#otp_2').val() + $('#otp_3').val() + $('#otp_4').val();
  var phone = $('#otp_phone').val();
  var countryCode = $('#otp_country').val();
  var btn = '#btn_confirm_otp';


  if (otp != '' && otp.length == 4) {
    $(btn).appendButtonLoadingState();
    $.ajax({
      url: '/confirm-otp',
      type: 'POST',
      data: { country_code: countryCode, phone_number: phone, otp_code: otp },
      success: function (data) {
        var r = $.parseJSON(data);
        var MsgClass = (r.error) ? 'is-failed' : 'is-successful';
        showAlternativeBtnText(btn, r.msg, MsgClass);
        if (!r.error) {
          window.location.reload();
        }
      }
    });
  } else {
    showAlternativeBtnText(btn, 'Enter 4 digits OTP', 'is-failed');
  }
}

function resendOtp() {
  var phone = $('#otp_phone').val();
  var countryCode = $('#otp_country').val();
  var btn = '#resend-otp-btn';
  $(btn).appendButtonLoadingState();
  $.ajax({
    url: '/resend-otp',
    type: 'POST',
    data: { country_code: countryCode, phone_number: phone },
    success: function (data) {
      var r = $.parseJSON(data);
      var MsgClass = (r.error) ? 'is-failed' : 'is-successful';
      showAlternativeBtnText(btn, r.msg, MsgClass);
    }
  })
}
function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

function saveCartEmail() {
  var email = $('#cart_email').val();
  if (email != '' && isEmail(email)) {
    $.ajax({
      type: "POST",
      url: '/json/cart-email',
      data: { email_address: email },
      success: function(data) {
        klaviyo.identify({ '$email': email });
        mailModal.close();
        showMessage('success', 'Thank you', 'Item was added to your cart.');
        $('.cart_trigger').click();
      }
    });
  } else {
    showMessage('error', 'Error', 'Please enter a valid email address !');
  }
}