define("appmsg/reward_utils.js",["biz_wap/ui/weui.js","appmsg/reward_entry.js","biz_wap/utils/mmversion.js","biz_common/dom/class.js","biz_common/dom/event.js"],function(e){
"use strict";
e("biz_wap/ui/weui.js");
var r=e("appmsg/reward_entry.js"),n=e("biz_wap/utils/mmversion.js"),i=e("biz_common/dom/class.js"),a=e("biz_common/dom/event.js"),t=window.navigator.userAgent,d={
perLine:0,
hasBindResize:!1,
hasInit:!1,
pageContainerId:"img-content",
rewardInnerId:"js_reward_inner"
},s=function(e){
return document.getElementById(e);
},o=function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],r=e.pageContainerId||d.pageContainerId,n=e.rewardInnerId||d.rewardInnerId,i=window.innerWidth||document.documentElement.clientWidth;
try{
var a=s(r).getBoundingClientRect();
a.width&&(i=a.width);
}catch(t){}
var o=36;
d.perLine=Math.floor(.8*i/o);
var w=s(n);
return w&&(w.style.width=d.perLine*o+"px"),d.perLine;
},w=function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],n=e.pageContainerId||d.pageContainerId,i=e.rewardInnerId||d.rewardInnerId;
return e.can_reward&&s(n)&&s(i)?(d.hasBindResize||!function(){
d.hasBindResize=!0;
var n=window.innerWidth;
a.on(window,"resize",function(){
window.innerWidth!==n&&(n=window.innerWidth,o(e),d.hasInit&&r.render(d.perLine));
});
}(),d.perLine||o(e),d.perLine):0;
},_=function(e,o){
d.hasInit=!0;
var _=e.author_id||window.author_id;
e.reward_head_imgs=e.reward_head_imgs||[];
var m=s("js_author_name");
if(o.reward_entrance_enable_for_preview)if(n.isInMiniProgram)n.isInMiniProgram&&m&&i.removeClass(m,"rich_media_meta_link");else{
if(_||n.isAndroid){
var u=s("js_preview_reward_author");
u&&(u.style.display="block");
var p=s("js_preview_reward_author_wording");
o.reward_wording&&p&&(p.innerText=o.reward_wording,p.style.display="block");
var h=s("js_preview_reward_author_link");
h&&(window.item_show_type&&1*window.item_show_type===5||a.on(h,"tap",function(e){
e.preventDefault(),window.weui.alert("预览状态下无法操作");
}));
}
if(_){
var l=s("js_preview_reward_author_avatar"),c=s("js_preview_reward_author_head");
o.reward_author_head&&l&&c&&(c.setAttribute("src",o.reward_author_head),l.style.display="block");
var v=s("js_preview_reward_link_text");
v&&(v.innerText="喜欢作者");
}else n.isAndroid&&(s("js_preview_reward_author_name").style.display="none");
}else!n.isInMiniProgram&&(t.indexOf("WindowsWechat")>-1||n.isIOS||n.isAndroid)?(r.handle(e,w({
pageContainerId:o.pageContainerId,
rewardInnerId:o.rewardInnerId,
can_reward:1==e.can_reward?!0:!1
})),m&&e.rewardsn&&e.timestamp&&(m.setAttribute("data-rewardsn",e.rewardsn),m.setAttribute("data-timestamp",e.timestamp),
m.setAttribute("data-canreward",e.can_reward)),m&&!e.can_reward&&i.removeClass(m,"rich_media_meta_link")):m&&i.removeClass(m,"rich_media_meta_link");
};
return{
init:_,
getCountPerLine:w
};
});define("biz_common/ui/imgonepx.js",[],function(){
"use strict";
return"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkJDQzA1MTVGNkE2MjExRTRBRjEzODVCM0Q0NEVFMjFBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkJDQzA1MTYwNkE2MjExRTRBRjEzODVCM0Q0NEVFMjFBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QkNDMDUxNUQ2QTYyMTFFNEFGMTM4NUIzRDQ0RUUyMUEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QkNDMDUxNUU2QTYyMTFFNEFGMTM4NUIzRDQ0RUUyMUEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6p+a6fAAAAD0lEQVR42mJ89/Y1QIABAAWXAsgVS/hWAAAAAElFTkSuQmCC";
});define("appmsg/malicious_wording.js",[],function(){
"use strict";
var i={
0:{
90041:"此标题包含夸大误导信息",
20012:"此标题包含低俗恶俗内容"
},
1:{
90041:"",
20012:""
},
2:{
90041:"此文章包含夸大误导信息",
20012:"此文章包含低俗恶俗内容"
}
},s={
0:{
90041:"标题使用夸大、煽动、低俗等词语造成误导或引人不适",
20012:"标题使用低俗或恶俗词语造成不正当影响或引人不适"
},
1:{
90041:"摘要包含误导、煽动的信息引人不适或造成微信用户混淆",
20012:"摘要包含低俗或恶俗内容造成不正当影响或引人不适"
},
2:{
90041:"文章包含误导、煽动的信息引人不适或造成微信用户混淆",
20012:"文章包含低俗或恶俗内容造成不正当影响或引人不适"
}
};
return{
maliciousTitleMap:i,
maliciousDescMap:s
};
});!function(n){
"use strict";
function t(n,t){
var r=(65535&n)+(65535&t),u=(n>>16)+(t>>16)+(r>>16);
return u<<16|65535&r;
}
function r(n,t){
return n<<t|n>>>32-t;
}
function u(n,u,e,o,c,f){
return t(r(t(t(u,n),t(o,f)),c),e);
}
function e(n,t,r,e,o,c,f){
return u(t&r|~t&e,n,t,o,c,f);
}
function o(n,t,r,e,o,c,f){
return u(t&e|r&~e,n,t,o,c,f);
}
function c(n,t,r,e,o,c,f){
return u(t^r^e,n,t,o,c,f);
}
function f(n,t,r,e,o,c,f){
return u(r^(t|~e),n,t,o,c,f);
}
function i(n,r){
n[r>>5]|=128<<r%32,n[(r+64>>>9<<4)+14]=r;
var u,i,h,a,g,l=1732584193,d=-271733879,v=-1732584194,C=271733878;
for(u=0;u<n.length;u+=16)i=l,h=d,a=v,g=C,l=e(l,d,v,C,n[u],7,-680876936),C=e(C,l,d,v,n[u+1],12,-389564586),
v=e(v,C,l,d,n[u+2],17,606105819),d=e(d,v,C,l,n[u+3],22,-1044525330),l=e(l,d,v,C,n[u+4],7,-176418897),
C=e(C,l,d,v,n[u+5],12,1200080426),v=e(v,C,l,d,n[u+6],17,-1473231341),d=e(d,v,C,l,n[u+7],22,-45705983),
l=e(l,d,v,C,n[u+8],7,1770035416),C=e(C,l,d,v,n[u+9],12,-1958414417),v=e(v,C,l,d,n[u+10],17,-42063),
d=e(d,v,C,l,n[u+11],22,-1990404162),l=e(l,d,v,C,n[u+12],7,1804603682),C=e(C,l,d,v,n[u+13],12,-40341101),
v=e(v,C,l,d,n[u+14],17,-1502002290),d=e(d,v,C,l,n[u+15],22,1236535329),l=o(l,d,v,C,n[u+1],5,-165796510),
C=o(C,l,d,v,n[u+6],9,-1069501632),v=o(v,C,l,d,n[u+11],14,643717713),d=o(d,v,C,l,n[u],20,-373897302),
l=o(l,d,v,C,n[u+5],5,-701558691),C=o(C,l,d,v,n[u+10],9,38016083),v=o(v,C,l,d,n[u+15],14,-660478335),
d=o(d,v,C,l,n[u+4],20,-405537848),l=o(l,d,v,C,n[u+9],5,568446438),C=o(C,l,d,v,n[u+14],9,-1019803690),
v=o(v,C,l,d,n[u+3],14,-187363961),d=o(d,v,C,l,n[u+8],20,1163531501),l=o(l,d,v,C,n[u+13],5,-1444681467),
C=o(C,l,d,v,n[u+2],9,-51403784),v=o(v,C,l,d,n[u+7],14,1735328473),d=o(d,v,C,l,n[u+12],20,-1926607734),
l=c(l,d,v,C,n[u+5],4,-378558),C=c(C,l,d,v,n[u+8],11,-2022574463),v=c(v,C,l,d,n[u+11],16,1839030562),
d=c(d,v,C,l,n[u+14],23,-35309556),l=c(l,d,v,C,n[u+1],4,-1530992060),C=c(C,l,d,v,n[u+4],11,1272893353),
v=c(v,C,l,d,n[u+7],16,-155497632),d=c(d,v,C,l,n[u+10],23,-1094730640),l=c(l,d,v,C,n[u+13],4,681279174),
C=c(C,l,d,v,n[u],11,-358537222),v=c(v,C,l,d,n[u+3],16,-722521979),d=c(d,v,C,l,n[u+6],23,76029189),
l=c(l,d,v,C,n[u+9],4,-640364487),C=c(C,l,d,v,n[u+12],11,-421815835),v=c(v,C,l,d,n[u+15],16,530742520),
d=c(d,v,C,l,n[u+2],23,-995338651),l=f(l,d,v,C,n[u],6,-198630844),C=f(C,l,d,v,n[u+7],10,1126891415),
v=f(v,C,l,d,n[u+14],15,-1416354905),d=f(d,v,C,l,n[u+5],21,-57434055),l=f(l,d,v,C,n[u+12],6,1700485571),
C=f(C,l,d,v,n[u+3],10,-1894986606),v=f(v,C,l,d,n[u+10],15,-1051523),d=f(d,v,C,l,n[u+1],21,-2054922799),
l=f(l,d,v,C,n[u+8],6,1873313359),C=f(C,l,d,v,n[u+15],10,-30611744),v=f(v,C,l,d,n[u+6],15,-1560198380),
d=f(d,v,C,l,n[u+13],21,1309151649),l=f(l,d,v,C,n[u+4],6,-145523070),C=f(C,l,d,v,n[u+11],10,-1120210379),
v=f(v,C,l,d,n[u+2],15,718787259),d=f(d,v,C,l,n[u+9],21,-343485551),l=t(l,i),d=t(d,h),
v=t(v,a),C=t(C,g);
return[l,d,v,C];
}
function h(n){
var t,r="";
for(t=0;t<32*n.length;t+=8)r+=String.fromCharCode(n[t>>5]>>>t%32&255);
return r;
}
function a(n){
var t,r=[];
for(r[(n.length>>2)-1]=void 0,t=0;t<r.length;t+=1)r[t]=0;
for(t=0;t<8*n.length;t+=8)r[t>>5]|=(255&n.charCodeAt(t/8))<<t%32;
return r;
}
function g(n){
return h(i(a(n),8*n.length));
}
function l(n,t){
var r,u,e=a(n),o=[],c=[];
for(o[15]=c[15]=void 0,e.length>16&&(e=i(e,8*n.length)),r=0;16>r;r+=1)o[r]=909522486^e[r],
c[r]=1549556828^e[r];
return u=i(o.concat(a(t)),512+8*t.length),h(i(c.concat(u),640));
}
function d(n){
var t,r,u="0123456789abcdef",e="";
for(r=0;r<n.length;r+=1)t=n.charCodeAt(r),e+=u.charAt(t>>>4&15)+u.charAt(15&t);
return e;
}
function v(n){
return unescape(encodeURIComponent(n));
}
function C(n){
return g(v(n));
}
function s(n){
return d(C(n));
}
function A(n,t){
return l(v(n),v(t));
}
function m(n,t){
return d(A(n,t));
}
n.md5=function(n,t,r){
return t?r?A(t,n):m(t,n):r?C(n):s(n);
};
}("function"==typeof jQuery?jQuery:this);define("complain/utils/const.js",[],function(A,i,g){
"use strict";
g.exports={
WRAP_TAG:"span",
IMG_TAG:"IMG",
HIGHLIGHT_ID:"highlight-id",
IMG_ID:"img-id",
CAMEL_HIGHLIGHT_ID:"highlightId",
CAMEL_IMG_ID:"imgId",
NODE_TYPE:{
text:1,
img:2
},
placeHolder:"data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg=="
};
});define("complain/utils/dom.js",["complain/utils/utils.js","complain/utils/const.js"],function(e,t,r){
"use strict";
function n(e){
for(var t=arguments.length<=1||void 0===arguments[1]?"className":arguments[1],r=arguments.length<=2||void 0===arguments[2]?y:arguments[2],n=0;n<r.length;n++)if(e[t]&&"string"==typeof e[t]&&e[t].indexOf(r[n])>-1)return!0;
return!1;
}
function a(e){
var t=e.$blockNode,r=e.$node;
if(null===t)return null;
var n=[],a=[],o=0;
for(n.push(t);n.length>0;){
var i=n.pop();
if(3===i.nodeType&&i.nodeValue!==r.nodeValue)a.push(i),o+=i.textContent.length;else if(1===i.nodeType){
if(o+=1,i===r)break;
}else if(i.nodeValue===r.nodeValue){
o+=i.textContent.length;
break;
}
for(var d=i.childNodes,s=d.length-1;s>=0;s--)n.push(d[s]);
}
return o;
}
function o(e){
var t=j(e),r=+t.dataset.index,n=0,a={
$blockNode:t,
$node:e,
paraIndex:r,
offset:n
},o=f();
return{
start:a,
end:a,
id:o
};
}
function i(e){
return e.tagName===h||3===e.nodeType?e:e.childNodes[0];
}
function d(e,t,r,n){
e.style.setProperty?(n=n||null,e.style.setProperty(t,r,n)):"undefined"!=typeof e.style.cssText&&(n=n?"!"+n:"",
e.style.cssText+=";"+t+":"+r+n+";");
}
function s(e){
if(!e)return!1;
var t=e.nodeType,r=e.tagName;
return 3===t?!1:r===h?!0:!1;
}
function u(e){
return e.reduce(function(t,r,n){
if(0===n)return r.type===x.text?t.text.push(r.data):r.type===x.img&&t.pic.push(r.data),
t;
if(r.type===x.text){
if(e[n-1].type===x.text){
var a=t.text.pop();
a+=r.data,t.text.push(a);
}else t.text.push(r.data);
return t;
}
return r.type===x.img&&t.pic.push(r.data),t;
},{
audio:[],
pic:[],
video:[],
text:[]
});
}
function p(e,t){
w[t]=e;
}
function l(e,t){
var r=o(e),n=Y([{
$node:e,
type:x.img,
idx:r.start.paraIndex
}],t),a=J(r),i=u(n);
return{
meta:{
anchorTree:n,
anchorMeta:a,
anchorBrief:i
},
range:r
};
}
function c(e,t){
var r=e.childNodes,n=t,a=null,o=0;
for(o=0;o<r.length;o++)if(a=r[o],3===a.nodeType){
var i=a.length;
if(i>n)break;
n-=i;
}
return{
$node:a,
cursor:n
};
}
var _=e("complain/utils/utils.js"),f=_.uuid,g=e("complain/utils/const.js"),m=g.WRAP_TAG,h=g.IMG_TAG,x=g.NODE_TYPE,v=["P","DIV","SECTION","LI","H1","H2","H3","H4","H5","H6","TABLE","PRE","BLOCKQUOTE"],y=["js_product_container","js_blockquote_wrap"],b=["IFRAME","VIDEO","MPVOICE","MPGONGYI","QQMUSIC","MPSHOP","MP-WEAPP","MP-MINIPROGRAM","MPPRODUCT","MPCPS"],N=["js_mpvideo"],T=["js_product_container"],w={},E=function(e){
var t=arguments.length<=1||void 0===arguments[1]?v:arguments[1];
if(!e||1!==e.nodeType)return!1;
for(var r=0;r<e.children.length;r++)if(-1!==t.indexOf(e.children[r].tagName))return!0;
return!1;
},R=function(e){
var t=e.parentNode;
return e.parentNode.removeChild(e),t.children&&t.children.length?!1:!0;
},O=function(e,t){
var r=t.getNestedStructure,a=void 0===r?!0:r,o=t.removeIgoreEle,i=void 0===o?!1:o,d=function s(e,t){
var r=e.children;
if(!r)return[];
if(!r.length)return r;
for(var a=void 0,o=[],d=0;d<r.length;d++)a=r[d],n(a,"id",N)||n(a,"className",T)?i&&(a.parentNode.removeChild(a),
d-=1):E(a,b)?i&&(R(a),d-=1):E(a,v)&&!n(a)?(o=o.concat(s(a,t)),t&&(a.getAttribute("data-index")||o.push(a))):a.getAttribute("data-index")||o.push(a);
return o;
}(e,a);
return[].slice.call(d);
};
O.paragraphStartIdx=1e6;
var k=function(e,t,r,n){
try{
e.splitText(t);
}catch(a){
"undefined"!=typeof WX_BJ_REPORT&&WX_BJ_REPORT.BadJs&&WX_BJ_REPORT.BadJs.report("ArticleMask:Error","splitText Error",{
mid:"mmbizwap:articlemask_Monitor",
_info:{
type:"getSplitTextNode textnode",
startOffset:t,
endOffset:r
}
});
}
var o=e.nextSibling;
try{
o.splitText(r-t);
}catch(i){
"undefined"!=typeof WX_BJ_REPORT&&WX_BJ_REPORT.BadJs&&WX_BJ_REPORT.BadJs.report("ArticleMask:Error","splitText Error",{
mid:"mmbizwap:articlemask_Monitor",
_info:{
type:"getSplitTextNode nextSibling",
startOffset:t,
endOffset:r
}
});
}
return[{
$node:o,
type:x.text,
idx:n
}];
},j=function F(e){
return-1!==v.indexOf(e.tagName)&&"undefined"!=typeof e.dataset.index?e:F(e.parentNode);
},P=function K(e){
return e?-1!==v.indexOf(e.tagName)?e:K(e.parentNode):e;
},$=function(e){
var t=e.start,r=e.end,n=e.$container,a=t.$node,o=t.offset,i=r.$node,d=r.offset,s=[],u=[],p=!1,l=!1,c=0;
for(s.push(n);s.length>0;){
var _=s.pop(),f=_.nodeType,g=_.tagName;
if(_.dataset&&_.dataset.index&&(c=+_.dataset.index),p&&!l&&(3===f&&u.push({
$node:_,
type:x.text,
idx:c
}),g===h&&u.push({
$node:_,
type:x.img,
idx:c
})),_===a){
if(3===f){
try{
_.splitText(o);
}catch(m){
WX_BJ_REPORT.BadJs.report("ArticleMask:Error","splitText Error",{
mid:"mmbizwap:articlemask_Monitor",
_info:{
type:"getNodes startNode",
startOffset:o,
endOffset:d
}
});
}
var v=_.nextSibling;
u.push({
$node:v,
type:x.text,
idx:c
});
}else u.push(g===h?{
$node:_,
type:x.img,
idx:c
}:{
$node:_,
type:x.text,
idx:c
});
p=!0;
}
if(_===i||l){
if(l||(l=!0),_===i&&u.pop(),3===f){
try{
_.splitText(d);
}catch(m){
"undefined"!=typeof WX_BJ_REPORT&&WX_BJ_REPORT.BadJs&&WX_BJ_REPORT.BadJs.report("ArticleMask:Error","splitText Error",{
mid:"mmbizwap:articlemask_Monitor",
_info:{
type:"getSplitTextNode endNode",
startOffset:o,
endOffset:d
}
});
}
u.push({
$node:_,
type:x.text,
idx:c
});
break;
}
if(g===h){
u.push({
$node:_,
type:x.img,
idx:c
});
break;
}
for(var y=_.childNodes,b=y.length-1;b>=0;b--)s.push(y[b]);
}
for(var N=_.childNodes,b=N.length-1;b>=0;b--)s.push(N[b]);
}
return u;
},B=function(e){
var t=e.start,r=e.end,n=t.$node,a=t.offset,o=r.$node,i=r.offset;
return n===o&&n instanceof Text?k(n,a,i,t.paraIndex):$(e);
},q=function(e){
return e&&(e.nodeValue||e.innerText);
},S=function(e,t,r){
var n=r===e?t:e;
if(!q(e)||!q(t))return n;
var a=(e.nodeValue||e.innerText)+(t.nodeValue||t.innerText);
return r.nodeValue=a,r.parentNode.removeChild(n),r;
},I=function(e,t){
var r=[],n=0,a=0,o=void 0;
for(r.push(e);r.length>0&&(o=r.pop(),!(3===o.nodeType&&(a=t-n,n+=o.textContent.length,
n>=t)));)for(var i=o.childNodes,d=i.length-1;d>=0;d--)r.push(i[d]);
return{
$parentNode:e,
$node:o,
offset:a
};
},C=function(e){
var t=e.$node,r=e.$parentNode,n=Number(r.dataset.index),o=a(r,t);
return{
parentIndex:n,
fromParentoffset:o
};
},M=function(){
var e=window.getSelection();
if(null===e.anchorNode)return null;
var t=e.getRangeAt(0);
if(!t||!e.toString())return null;
var r=t.startContainer,n=t.endContainer,a=t.commonAncestorContainer,o=t.startOffset,i=t.endOffset,d=j(r),s=j(n),u=d&&d.dataset.index,p=s&&s.dataset.index,l={
$blockNode:d,
$node:r,
offset:o,
paraIndex:Number(u)
},c={
$blockNode:s,
$node:n,
offset:i,
paraIndex:Number(p)
},_="string"==typeof a?a.parentNode:a,g=f();
return{
start:l,
end:c,
$container:_,
id:g
};
},A=function(e,t){
if(!e)return null;
if(3===e.nodeType){
var r=document.createElement(m);
return r.setAttribute("data-splitid",t),r.appendChild(e.cloneNode(!1)),e.parentNode&&e.parentNode.replaceChild(r,e),
r;
}
return e;
},J=function(e){
var t=e.start,r=e.end,n=e.id,o=a(t),i=t.$node===r.$node?r.offset-t.offset+o:a(r),d={
id:n,
start:{
para_offset:o,
para_index:t.paraIndex
},
end:{
para_offset:i,
para_index:r.paraIndex
}
};
return d;
},W=function(e){
return function(t){
var r=t.para_offset,n=t.para_index,a=e[n],o=[],i=0,d=0,s=void 0;
for(o.push(a);o.length>0&&(s=o.pop(),!(3===s.nodeType&&(d=r-i,i+=s.textContent.length,
i>=r)))&&!(1===s.nodeType&&(d=r-i,i+=1,i>=r));)for(var u=s.childNodes,p=u.length-1;p>=0;p--)o.push(u[p]);
return{
$blockNode:a,
$node:s,
offset:d,
paraIndex:n
};
};
},X=function(e,t,r){
var n=W(t);
return{
start:n(e.start),
end:n(e.end),
id:e.id,
$container:r
};
},z=function(e){
window.getSelection().removeAllRanges();
var t=window.getSelection(),r=document.createRange(),n=i(w.start),a=i(w.end);
r.setStart(n,e.start.offset),r.setEnd(a,e.end.offset),t.addRange(r);
},V=function(e,t){
var r=[],n=0;
for(r.push(e);r.length>0;){
var a=r.pop();
if(a===t)break;
n++;
for(var o=a.children,i=0;i<o.length;i++)r.push(o[i]);
}
return n;
},H=function(e,t){
var r=[],n=0,a=null;
for(r.push(e);r.length>0;){
var o=r.pop();
if(n===t){
a=o;
break;
}
n++;
for(var i=o.children,d=0;d<i.length;d++)r.push(i[d]);
}
return a;
},G=function(e,t){
return e&&"string"==typeof e&&-1!==e.indexOf(t)?!0:!1;
},D=function(e){
var t="rich_pages,blockquote_info,blockquote_biz,blockquote_other,blockquote_article,js_jump_icon,h5_image_link,js_banner_container,js_list_container,js_cover,js_tx_video_container,js_product_err_container,js_product_loop_content,js_product_container,img_loading,list-paddingleft-1,list-paddingleft-2,list-paddingleft-3,selectTdClass,noBorderTable,ue-table-interlace-color-single,ue-table-interlace-color-double,__bg_gif,weapp_text_link,weapp_image_link,js_img_loading,wx_video_context,db,wx_video_thumb_primary,wx_video_play_btn,wx_video_mask,qqmusic_area,tc,tips_global,unsupport_tips,qqmusic_wrp,appmsg_card_context,appmsg_card_active,qqmusic_bd,play_area,icon_qqmusic_switch,pic_qqmusic_default,qqmusic_thumb,access_area,qqmusic_songname,qqmusic_singername,qqmusic_source,js_audio_frame,share_audio_context,flex_context,pages_reset,share_audio_switch,icon_share_audio_switch,share_audio_info,flex_bd,share_audio_title,share_audio_tips,share_audio_progress_wrp,share_audio_progress,share_audio_progress_inner,share_audio_progress_buffer,share_audio_progress_loading,share_audio_progress_loading_inner,share_audio_progress_handle,share_audio_desc,share_audio_length_current,share_audio_length_total,video_iframe,vote_iframe,js_editor_vote_card,res_iframe,card_iframe,js_editor_card,weapp_display_element,js_weapp_display_element,weapp_card,app_context,weapp_card_bd,weapp_card_profile,radius_avatar,weapp_card_avatar,weapp_card_nickname,weapp_card_info,weapp_card_title,weapp_card_thumb_wrp,weapp_card_ft,weapp_card_logo,js_pay_btn,pay,pay__mask,wx_video_loading,js_redpacketcover,js_uneditable,js_uneditablemouseover,js_editor_qqmusic,js_editor_audio,ct_geography_loc_tip,js_poi_entry".split(","),r="qa__",n=[new RegExp("^weui"),new RegExp("^appmsg"),new RegExp("^audio"),new RegExp("^music"),new RegExp("^cps_inner"),new RegExp("^bizsvr_"),new RegExp("^code-snippet"),new RegExp("^"+r),new RegExp("^wx-edui-"),new RegExp("^wx_"),new RegExp("^wx-"),new RegExp("^js_darkmode__")];
if(!e)return null;
for(var a=e.split(/\s+/),o=[],i=0,d=a.length;d>i;++i){
var s=a[i];
if(s&&-1!==t.indexOf(s))o.push(s);else for(var u=0,p=n.length;p>u;u++)if(n[u].test(s)){
o.push(s);
break;
}
}
var l=o.join(".");
return l&&"."+l;
},L=function Z(e){
var t=arguments.length<=1||void 0===arguments[1]?"":arguments[1],r=arguments.length<=2||void 0===arguments[2]?document.body:arguments[2];
if(!e||e===r)return t;
var n=e.getAttribute("id"),a=e.getAttribute("class"),o=e.tagName.toLowerCase(),i=null;
if(n&&!G(a,"articlepart-selector-area_choice-button_wrap"))return t?"#"+n+">"+t:"#"+n;
var d=D(a);
return i=d?d:G(a,"js_choice-img")?".js_choice-img":G(a,"articlepart-selector-area_choice")&&e.dataset.splitid?"":o,
Z(e.parentNode,[i,t].filter(function(e){
return!!e;
}).join(">"),r);
},Q=function(e,t){
for(var r=L(e,"",t),n=t.querySelectorAll(r),a=n.length,o=null,i=0;a>i;i++)if(e===n[i]){
o=i;
break;
}
null===o&&"undefined"!=typeof WX_BJ_REPORT&&WX_BJ_REPORT.BadJs&&WX_BJ_REPORT.BadJs.report("ArticleMask:Error","selector:node not find",{
mid:"mmbizwap:articlemask_Monitor",
_info:{
selector:r
}
});
var d=(r||"").replace(">.js_choice-img>",">")+("|"+a+" "+(o||0));
return d;
},U=function(e){
return e.map(function(e){
var t=e.$node,r=e.type,n=e.idx,a=0,o=null,i="",d=j(t);
if(r===x.text){
var s=V(d,t.parentNode);
t&&t.data&&(a=s,o=t.data,i=t.previousSibling&&t.previousSibling.data);
}else if(r===x.img){
var u=d.getElementsByTagName("img");
o=t.src,a=Array.prototype.slice.call(u).slice(0).indexOf(t);
}
return{
data:o,
index:a,
idx:n,
type:r,
meta:i
};
}).filter(function(e){
return e.index>-1&&!!e.data;
});
},Y=function(e,t){
var r=t||document.getElementById("js_content");
return e.map(function(e){
var t=e.$node,n=e.type,a=e.idx,o=null,i=null,d="";
return n===x.text?t&&t.data&&(o=Q(t.parentNode,r),i=t.data,d=t.previousSibling&&t.previousSibling.data):n===x.img&&(o=Q(t,r),
i=t.src),{
data:i,
idx:a,
type:n,
meta:d,
selector:o
};
}).filter(function(e){
return!!e.selector&&!!e.data;
});
};
r.exports={
getDomMeta:C,
getContent:u,
getParaList:O,
getBlockNode:j,
getSelectedNodes:B,
connectSiblingText:S,
getTextNodeByOffset:I,
getBlockOffset:a,
getSelection:M,
transferTextToElement:A,
serialize:J,
deSerialize:X,
resetRange:z,
serializeToC:U,
setProperty:d,
hasImgNode:s,
nodeToSelection:o,
saveNode:p,
serializeNode:l,
getNodeByIndex:H,
findChildIndex:c,
serializeToC2:Y,
blockEleTagName:v,
getPureBlockNode:P
};
});define("album/utils/report.js",["common/comm_report.js"],function(e){
"use strict";
var o=e("common/comm_report.js"),r=window.WX_BJ_REPORT||{},n=function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],n={
BizUin:window.biz,
MsgId:1*window.mid,
ItemIdx:1*window.idx,
ItemShowType:1*window.item_show_type||0,
SessionId:window.sessionid+"",
EnterId:1*window.enterid,
Scene:1*window.source,
SubScene:1*window.subscene,
AlbumId:e.albumId+"",
AlbumType:1*e.albumType,
EventType:1*e.eventType,
Vid:e.vid,
Audioid:e.audioid||"",
Title:e.title||""
};
o.report(19647,n,{
success:function(e){
1*e.err_code!==0&&"undefined"!=typeof r&&r.BadJs&&r.BadJs.report("mmdata report failed","log_id: 19647",{
mid:"mmbizwap:album_Monitor",
_info:{
postData:n,
errCode:e.err_code,
errMsg:e.err_msg
}
});
}
});
},i=function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],n={
BizUin:window.biz,
Scene:1*window.source,
SubScene:1*window.subscene,
EnterId:1*window.enterid,
SceneNote:e.sceneNote+"",
AlbumId:e.albumId+"",
AlbumType:1*e.albumType,
EventType:1*e.eventType
};
o.report(19648,n,{
async:e.async||!0,
success:function(e){
1*e.err_code!==0&&"undefined"!=typeof r&&r.BadJs&&r.BadJs.report("mmdata report failed","log_id: 19648",{
mid:"mmbizwap:album_Monitor",
_info:{
postData:n,
errCode:e.err_code,
errMsg:e.err_msg
}
});
}
});
},d=function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],n={
BizUin:window.biz,
MsgId:1*e.msgid,
ItemIdx:1*e.itemidx,
Pos:1*e.pos,
Scene:1*window.source,
SubScene:1*window.subscene,
EnterId:1*window.enterid,
SceneNote:e.sceneNote+"",
AlbumId:e.albumId+"",
AlbumType:1*e.albumType,
EventType:1*e.eventType,
Vid:e.vid
};
o.report(19649,n,{
success:function(e){
1*e.err_code!==0&&"undefined"!=typeof r&&r.BadJs&&r.BadJs.report("mmdata report failed","log_id: 19649",{
mid:"mmbizwap:album_Monitor",
_info:{
postData:n,
errCode:e.err_code,
errMsg:e.err_msg
}
});
}
}),1*e.eventType===1&&!function(){
var n={
BizUin:window.biz,
MsgId:1*e.msgid,
ItemIdx:1*e.itemidx,
AppMsgUrl:e.url,
Title:e.title,
IsReaded:1*e.isRead,
Scene:1*window.source,
SubScene:1*window.subscene
};
o.report(20805,n,{
success:function(e){
1*e.err_code!==0&&"undefined"!=typeof r&&r.BadJs&&r.BadJs.report("mmdata report failed","log_id: 20805",{
mid:"mmbizwap:album_Monitor",
_info:{
postData:n,
errCode:e.err_code,
errMsg:e.err_msg
}
});
}
});
}();
},t=function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],n={
bizuin:window.biz,
url:e.url+"",
ActionType:1*e.actionType,
Scene:1*window.source,
Network:window.__networkType+"",
AlbumId:e.albumId+"",
AlbumType:1*e.albumType,
ExpType:window.exptype||"",
ExpSessionIdStr:window.expsessionid||""
};
o.report(10380,n,{
success:function(e){
1*e.err_code!==0&&"undefined"!=typeof r&&r.BadJs&&r.BadJs.report("mmdata report failed","log_id: 10380",{
mid:"mmbizwap:album_Monitor",
_info:{
postData:n,
errCode:e.err_code,
errMsg:e.err_msg
}
});
}
});
},s=function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],n={
BizUin:window.biz,
Action:1*e.action,
AppMsgLikeType:window.appmsg_like_type,
Scene:1*window.source,
SubScene:1*window.subscene,
AlbumId:e.albumId+"",
AlbumType:1*e.albumType,
ExpType:window.exptype||"",
ExpSessionIdStr:window.expsessionid||""
};
o.report(14299,n,{
success:function(e){
1*e.err_code!==0&&"undefined"!=typeof r&&r.BadJs&&r.BadJs.report("mmdata report failed","log_id: 14299",{
mid:"mmbizwap:album_Monitor",
_info:{
postData:n,
errCode:e.err_code,
errMsg:e.err_msg
}
});
}
});
};
return{
cardReport:n,
albumActionReport:i,
articleActionReport:d,
shareReport:t,
likeReport:s
};
});define("common/color/light.js",[],function(){
"use strict";
return{
"BG-0":"#ededed",
"BG-1":"#f7f7f7",
"BG-2":"#ffffff",
"BG-3":"#f7f7f7",
"BG-4":"#4c4c4c",
"BG-5":"#ffffff",
"FG-0":"rgba(0, 0, 0, 0.9)",
"FG-HALF":"rgba(0, 0, 0, 0.9)",
"FG-1":"rgba(0, 0, 0, 0.5)",
"FG-2":"rgba(0, 0, 0, 0.3)",
"FG-3":"rgba(0, 0, 0, 0.1)",
RED:"#fa5151",
ORANGE:"#fa9d3b",
YELLOW:"#ffc300",
GREEN:"#91d300",
LIGHTGREEN:"#95ec69",
BRAND:"#07c160",
BLUE:"#10aeff",
INDIGO:"#1485ee",
PURPLE:"#6467f0",
WHITE:"#fff",
LINK:"#576b95",
TEXTGREEN:"#06ae56",
FG:"black",
BG:"white",
"TAG-TEXT-ORANGE":"#fa9d3b",
"TAG-BACKGROUND-ORANGE":"rgba(250, 157, 59, 0.1)",
"TAG-TEXT-GREEN":"#06ae56",
"TAG-BACKGROUND-GREEN":"rgba(6, 174, 86, 0.1)",
"TAG-TEXT-BLUE":"#10aeff",
"TAG-BACKGROUND-BLUE":"rgba(16, 174, 255, 0.1)",
"TAG-TEXT-BLACK":"rgba(0, 0, 0, 0.5)",
"TAG-BACKGROUND-BLACK":"rgba(0, 0, 0, 0.05)"
};
});define("biz_common/utils/monitor.js",[],function(){
"use strict";
function t(t,r){
if(null===t)return{};
for(var o={},e=Object.keys(t),n=0;n<e.length;n++){
var i=e[n];
r.indexOf(i)>=0||(o[i]=t[i]);
}
return o;
}
function r(t){
var r=[],o=null;
for(o in t)Object.prototype.hasOwnProperty.call(t,o)&&r.push(o+"="+encodeURIComponent(t[o]));
return r.join("&");
}
var o=[],e="/mp/jsmonitor?#wechat_redirect",n={};
return window.__monitor?window.__monitor:(n._reportOptions={
idkey:{}
},n.getReportData=function(t){
t=t||{};
var r,e,i=n._reportOptions.idkey||{},p=null;
try{
for(p in i)Object.prototype.hasOwnProperty.call(i,p)&&i[p]&&o.push(p+"_"+i[p]);
}catch(a){
return!1;
}
if(0===o.length)return!1;
try{
var c=n._reportOptions;
if(null!==c&&void 0!==c)for(e in c)Object.prototype.hasOwnProperty.call(c,e)&&(r[e]=c[e]);
}catch(a){
r={};
}
return r.idkey=o.join(";"),r.t=Math.random(),t.remove!==!1&&(o=[],n._reportOptions={
idkey:{}
}),r;
},n.setLogs=function(r){
var o=r.id,e=r.key,i=r.value,p=t(r,["id","key","value"]),a=n._reportOptions.idkey||{},c=o+"_"+e;
a[c]?a[c]+=i:a[c]=i,n._reportOptions.idkey=a;
try{
if(null!==p&&void 0!==p)for(var s in p)Object.prototype.hasOwnProperty.call(p,s)&&(n._reportOptions[s]=p[s]);
}catch(u){
console.log(u);
}
return n;
},n.setAvg=function(t,r,o){
var e=n._reportOptions.idkey||{},i=t+"_"+r,p=t+"_"+(r-1);
return e[i]?e[i]+=o:e[i]=o,e[p]?e[p]+=1:e[p]=1,n._reportOptions.idkey=e,n;
},n.setSum=function(t,r,o){
var e=n._reportOptions.idkey,i=t+"_"+r;
return e[i]?e[i]+=o:e[i]=o,n._reportOptions.idkey=e,n;
},n.send=function(t,o){
t!==!1&&(t=!0);
var i=n.getReportData();
i&&(o&&o instanceof Function?o({
url:e,
type:"POST",
mayAbort:!0,
data:i,
async:t,
timeout:2e3
}):(new Image).src=location.origin+"/mp/jsmonitor?"+r(i)+"#wechat_redirect");
},window.__monitor=n,n);
});define("biz_wap/utils/setMpInfo.js",["biz_wap/jsapi/core.js"],function(n,r,t){
"use strict";
function e(n,r){
a(i,n),o.invoke("currentMpInfo",i,r);
}
var o=n("biz_wap/jsapi/core.js"),i={},a=null;
a="function"==typeof Object.assign?Object.assign:function(){
var n=Array.prototype.slice.call(arguments);
if(null==n[0])throw new TypeError("Cannot convert undefined or null to object");
for(var r=Object(n[0]),t=1;t<n.length;t++){
var e=n[t];
if(null!=e)for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(r[o]=e[o]);
}
return r;
},t.exports={
currentMpInfo:e
};
});var _extends=Object.assign||function(e){
for(var n=1;n<arguments.length;n++){
var t=arguments[n];
for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);
}
return e;
};
define("pages/utils.js",["appmsg/appmsg_report.js","biz_common/utils/emoji_data.js","pages/version4video.js","biz_wap/utils/mmversion.js","biz_wap/jsapi/core.js","biz_common/dom/event.js","album/utils/report.js","common/utils.js","biz_common/utils/url/parse.js","appmsg/i18n.js"],function(e){
"use strict";
function n(e){
if(!e)return null;
var n=location.href.match(new RegExp("(\\?|&)"+e+"=([^&]+)"));
return n?n[2].split("#")[0]:null;
}
function t(e){
if(window.hasChannelTwoTab&&E.isNewNativePage()){
var n=void 0;
n=document.getElementById("tab").offsetTop-window.minHeight;
var t=document.body.offsetHeight,i=A+n;
if(i>t){
var o=n+A-document.body.offsetHeight,a=document.createElement("div");
a.setAttribute("class","empty_comment_element"),a.style.cssText="height: "+o+"px;",
document.getElementById(e).appendChild(a);
}
window.minMountHeight=i;
}
}
function i(){
x.on(window,"load",function(){
!window.__networkType&&R.inWechat&&!function(){
var e={
"network_type:fail":"fail",
"network_type:edge":"2g/3g",
"network_type:wwan":"2g/3g",
"network_type:wifi":"wifi"
};
I.invoke("getNetworkType",{},function(n){
window.__networkType=e[n.err_msg];
});
}();
},!1);
}
function o(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],n={
appId:e.appId,
img_url:e.img_url,
img_width:e.img_width,
img_height:e.img_height,
link:e.link.replace(/<br\/>/g,"\n"),
desc:e.desc.replace(/<br\/>/g,"\n"),
title:e.title
};
i(),/#wechat_redirect/.test(n.link)||(n.link+="#wechat_redirect");
var t="",o={
url:n.link,
actionType:0
},a=L;
e.isAlbum?(t="album",n=_extends({
album_id:e.album_id,
album_type:e.album_type
},n),o=_extends({
albumId:e.album_id,
albumType:e.album_type
},o)):"function"==typeof e.shareReport&&(a=function(n,t){
return e.shareReport(t.actionType);
}),I.on("menu:share:appmessage",function(e){
var i=void 0;
e&&"favorite"===e.scene?(i=24,n.link=U(n.link,"scene",V[1])):(i=1,n.link=U(n.link,"scene",V[0])),
o.url=n.link,o.actionType=i,a(t,o),I.invoke("sendAppMessage",n);
}),I.on("menu:share:timeline",function(){
n.link=U(n.link,"scene",V[2]),o.url=n.link,o.actionType=2,a(t,o),I.invoke("shareTimeline",n);
}),I.on("menu:share:weiboApp",function(){
n.link=U(n.link,"scene",V[3]),o.url=n.link,o.actionType=3,a(t,o),I.invoke("shareWeiboApp",{
img_url:n.img_url,
link:n.link,
title:n.title
});
}),I.on("menu:share:facebook",function(){
n.link=U(n.link,"scene",V[4]),o.url=n.link,o.actionType=7,a(t,o),I.invoke("shareFB",n);
}),I.on("menu:share:QZone",function(){
n.link=U(n.link,"scene",V[5]),o.url=n.link,o.actionType=5,a(t,o),I.invoke("shareQZone",n);
}),I.on("menu:share:qq",function(){
n.link=U(n.link,"scene",V[6]),o.url=n.link,o.actionType=5,a(t,o),I.invoke("shareQQ",n);
}),I.on("menu:share:email",function(){
n.link=U(n.link,"scene",V[7]),o.url=n.link,o.actionType=5,a(t,o),I.invoke("sendEmail",{
content:n.link,
title:n.title
});
});
}
function a(e){
for(var n=window.location.href,t=n.indexOf("?"),i=n.substr(t+1),o=i.split("&"),a=0;a<o.length;a++){
var r=o[a].split("=");
if(r[0].toUpperCase()==e.toUpperCase())return r[1];
}
return"";
}
function r(e,n){
I.invoke("createWebViewForFastLoad",{
scene:1
},function(){
e.forEach(function(e){
I.invoke("downloadPageDataForFastLoad",{
itemList:[{
item_show_type:5,
url:e[n]
}]
},function(e){
console.log(e);
});
});
});
}
function s(e,n,t){
var i=void 0;
return function(){
var o=this,a=arguments,r=function(){
i=null,t||e.apply(o,a);
},s=t&&!i;
clearTimeout(i),i=setTimeout(r,n),s&&e.apply(o,a);
};
}
function c(e){
var n=parseInt(e,10),t=0,i=0;
n>60&&(t=parseInt(n/60,10),n=parseInt(n%60,10),t>60&&(i=parseInt(t/60,10),t=parseInt(t%60,10))),
10>n&&(n="0"+n);
var o=":"+n;
return t>0?(10>t&&(t="0"+t),o=t+o):o="00"+o,i>0&&(0===parseInt(i,10)?i="":10>i&&(i="0"+i),
o=""+i+":"+o),o;
}
function l(e){
if("en"===window.LANG)return z.dealLikeReadShow_en(e);
var n="";
if(parseInt(e,10)>1e5)n="10万+";else if(parseInt(e,10)>1e4&&parseInt(e,10)<=1e5){
var t=""+parseInt(e,10)/1e4,i=t.indexOf(".");
n=-1===i?t+"万":t.substr(0,i)+"."+t.charAt(i+1)+"万";
}else n=0===parseInt(e,10)?"":e||"";
return n;
}
function u(e,n){
var t=void 0,i=void 0;
return function(){
var o=this,a=arguments,r=+new Date;
t&&t+n>r?(clearTimeout(i),i=setTimeout(function(){
t=r,e.apply(o,a);
},n)):(t=r,e.apply(o,a));
};
}
function d(){
var e=0,n=0,t=0;
return document.body&&(n=document.body.scrollTop),document.documentElement&&(t=document.documentElement.scrollTop),
e=n-t>0?n:t;
}
function m(){
var e=0,n=void 0,t=void 0;
return document.body&&(n=document.body.scrollHeight),document.documentElement&&(t=document.documentElement.scrollHeight),
e=n-t>0?n:t;
}
function p(){
var e=0;
return e="CSS1Compat"===document.compatMode?document.documentElement.clientHeight:document.body.clientHeight;
}
function g(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],n=location.origin+"/mp/videochannel_profile_page?biz_username="+encodeURIComponent(e.userName)+"&sessionid="+e.sessionId+"&__biz="+e.biz+"&scene="+e.scene+"&subscene="+e.subscene+"&channel_session_id="+e.channelSessionId+"#wechat_redirect";
M(n,!0);
}
function h(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],n=e.albumLink.replace("#wechat_redirect","")+("&scene="+e.scene+"&is_first_screen=1&subscene="+e.subscene+"&vid="+e.vid+"&scenenote="+e.scenenote+"#wechat_redirect");
M(n,!0);
}
function f(e){
return e.getBoundingClientRect().top;
}
function w(e){
return e.getBoundingClientRect().height;
}
function _(){
return d()+p()+30>=m();
}
function v(e,n){
return F.getQuery("__biz",e)+"_"+F.getQuery("mid",e)+"_"+F.getQuery("idx",e)+"_"+n;
}
function b(e,n){
var t="en"===window.LANG,i=t?"k":"万",o="",a=1e4*n,r=t?10*n:n;
if(e=parseInt(e,10),e>a)o=r+i+"+";else if(e>=1e4&&a>=e){
var s=""+(t?e/1e3:e/1e4),c=s.indexOf(".");
o=-1===c?s+i:s.substr(0,c)+"."+s.charAt(c+1)+i;
}else o=e;
return o||0;
}
function k(e,n){
if(n.useSwitchVideo||E.isNativePage())I.invoke("handleMPPageAction",_extends({
action:"switchVideo",
scene:n.clickScene,
channelSessionId:window.channel_session_id,
landingType:window.isFromVideoChannel?1:2,
subscene:n.clickSubScene
},e),function(e){
console.log(JSON.stringify(e));
});else if(n.isWcSlPlayerTailIframe&&window.top!==window)window.parent.postMessage({
__wcSlPlayerLoadTailRelateVideo__:e.url
},document.location.protocol+"//mp.weixin.qq.com");else if(!window.__failConfigWxOpen&&E.isWcSlPage())n.leaveReport(),
E.loadNewPageKeepingHistoryStackIfSecOpen(e.url);else{
console.log("==================JSAPI.invoke openWebViewUseFastLoad",window.__failConfigWxOpen,E.isWcSlPage());
var t=n.target.getElementsByClassName("js_relate_cover_img")[0],i=window.getComputedStyle(t),o=t.getBoundingClientRect(),a=document.createElement("canvas");
a.style.width=i.width,a.style.height=i.height,a.width=parseFloat(i.width),a.height=parseFloat(i.height);
var r=a.getContext("2d"),s="";
try{
r.drawImage(t,0,0,o.width,o.height),s=a.toDataURL();
}catch(c){
console.error(c);
}
T.isAndroid&&(s=""),I.invoke("openWebViewUseFastLoad",_extends({
scene:n.clickScene,
item_show_type:5,
openType:0,
subscene:n.clickSubScene,
channelSessionId:window.channel_session_id,
currentInfo:{
url:e.cover,
data:s,
pos:{
x:o.left-parseFloat(i.paddingLeft)-parseFloat(i.borderLeftWidth),
y:o.top-parseFloat(i.paddingTop)-parseFloat(i.borderTopWidth),
width:o.width-parseFloat(i.paddingLeft)-parseFloat(i.paddingRight)-parseFloat(i.borderLeftWidth)-parseFloat(i.borderRightWidth),
height:o.height-parseFloat(i.paddingTop)-parseFloat(i.paddingBottom)-parseFloat(i.borderTopWidth)-parseFloat(i.borderBottomWidth)
}
}
},e),function(t){
console.log(t),t&&t.err_msg&&-1===t.err_msg.indexOf("ok")&&I.invoke("openUrlWithExtraWebview",{
url:e.url,
openType:1
},function(t){
t&&t.err_msg&&-1===t.err_msg.indexOf("ok")&&(n.leaveReport(),window.location.href=e.url);
});
});
}
}
var y=e("appmsg/appmsg_report.js"),W=e("biz_common/utils/emoji_data.js"),j=e("pages/version4video.js"),T=e("biz_wap/utils/mmversion.js"),I=e("biz_wap/jsapi/core.js"),x=e("biz_common/dom/event.js"),S=e("album/utils/report.js"),E=e("common/utils.js"),F=e("biz_common/utils/url/parse.js"),z=e("appmsg/i18n.js"),A=E.getInnerHeight(),P=E.getInnerWidth(),R={
inWechat:j.device.inWechat,
windowWechat:/WindowsWechat/i.test(navigator.userAgent),
macWechat:/wechat.*mac os/i.test(navigator.userAgent),
emojiImg:'<img src="https://res.wx.qq.com/mpres/zh_CN/htmledition/comm_htmledition/images/pic/common/pic_blank.gif" class="icon_emotion_single #style#" alt="#name#">',
emojiDataMap:{}
};
!function(){
for(var e=0,n=W.length;n>e;e++){
var t=W[e];
t.cn&&!R.emojiDataMap[t.cn]&&(R.emojiDataMap[t.cn]={
index:e
}),t.hk&&!R.emojiDataMap[t.hk]&&(R.emojiDataMap[t.hk]={
index:e
}),t.us&&!R.emojiDataMap[t.us]&&(R.emojiDataMap[t.us]={
index:e
});
}
}();
var C=function(e){
return/\[[^\[\]]+\]/.test(e)?e.replace(/\[[^\[\]]+\]/g,function(e){
if(R.emojiDataMap[e]&&W[R.emojiDataMap[e].index]){
var n=W[R.emojiDataMap[e].index];
return R.emojiImg.replace("#name#",e).replace("#style#",n.style);
}
return e;
}):e;
},M=function(e,n){
R.inWechat?R.windowWechat||R.macWechat?n===!0?window.parent.open(e):window.parent.location.href=e:I.invoke("openUrlWithExtraWebview",{
url:e,
openType:1
},function(t){
-1==t.err_msg.indexOf("ok")&&(n===!0?window.parent.open(e):window.parent.location.href=e);
}):n===!0?window.open(e):location.href=e;
},N=function(){
!R.inWechat||R.windowWechat||R.macWechat?window.close():I.invoke("closeWindow",function(e){
-1==e.err_msg.indexOf("ok")&&window.close();
});
},O=function(e){
return document.getElementById(e);
},L=function(e){
var n=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];
"album"===e&&S.shareReport(n);
},q=function(e){
return document.getElementsByClassName(e);
},H=function(e){
return e.replace(/^\s+|\s+$/g,"");
},B=function(e,n){
return(n||document).querySelector(e);
},D=function(e,n){
return(n||document).querySelectorAll(e);
},U=function(e,n,t){
var i=new RegExp(n+"=[^&]*","gi"),o=n+"="+t;
return i.test(e)?e.replace(i,o):e.replace(/(#.*)?$/,""+(e.indexOf("?")>-1?"&":"?")+o+"$1");
},V=[1,24,2,3,43,22,23,5],Q=function(e){
var t=e.$container;
t&&!T.isInMiniProgram&&x.on(t,"tap",".js_go_profile",function(t){
var i=t.delegatedTarget;
i&&!function(){
var t=i.getAttribute("data-biz")||e.biz||window.biz||"";
if("function"==typeof e.beforeGo2Profile&&e.beforeGo2Profile(i),1==window.isprofileblock)I.invoke("openUrlWithExtraWebview",{
url:"https://mp.weixin.qq.com/mp/profileblock?__biz="+t+"#wechat_redirect",
openType:1
},function(e){
-1==e.err_msg.indexOf("ok")&&(location.href="https://mp.weixin.qq.com/mp/profileblock?__biz="+t+"#wechat_redirect");
});else{
var o=i.getAttribute("data-scene")||e.profile_scene||"";
y.profileReport({
isnew:0,
title:e.title||"",
item_show_type:e.item_show_type||""
}),console.log("channelSessionId"+n("channel_session_id")),I.invoke("profile",{
username:e.user_name,
profileReportInfo:"",
scene:o+"",
channelSessionId:n("channel_session_id"),
subscene:e.subscene
},function(){});
}
}();
});
},G=function(e){
var n=arguments.length<=1||void 0===arguments[1]?.5:arguments[1],t=arguments.length<=2||void 0===arguments[2]?"vertical":arguments[2],i=!1,o=0,a=0,r=!1,s=!1;
switch("number"==typeof n?(o=n,a=n):(o=n.vertical,a=n.horizontal),t){
case"vertical":
r=!0;
break;

case"horizontal":
s=!0;
break;

case"all":
r=!0,s=!0;
}
var c=e.getBoundingClientRect();
if(r){
var l=c.height*o;
c.bottom>l&&c.top<A-l&&(i=!0);
}
if(!s)return i;
if(r&&!i)return i;
var u=c.width*a;
return i=c.right>u&&c.left<P-u?!0:!1;
};
return{
jumpUrl:M,
closeWin:N,
trim:H,
getId:O,
qs:B,
qsAll:D,
inWechat:R.inWechat,
windowWechat:R.windowWechat,
macWechat:R.macWechat,
emojiFormat:C,
getParam:n,
go2ProfileEvent:Q,
prepareNativePage:r,
debounce:s,
throttle:u,
formatReadNum:l,
formatSeconds:c,
setTwoTabHeight:t,
getByClass:q,
getScrollTop:d,
getScrollHeight:m,
getWindowHeight:p,
shareMessage:o,
getElementTop:f,
formatAlbumnReadNum:b,
getElementHeight:w,
getQuery:a,
openAllVideoPage:g,
getNetWorkType:i,
getMoreVideoInfo:v,
isPageEnd:_,
openAlbumPage:h,
switchVideo:k,
checkExposedStatus:G
};
});define("tpl/appmsg/loading.html.js",[],function(){
return'<div style="display: none;">\n  <div class="weui-mask_transparent"></div>\n  <div class="weui-toast">\n    <i class="weui-loading weui-icon_toast"></i>\n    <p class="weui-toast__content js_loading_content"></p>\n  </div>\n</div>';
});define("biz_common/base64.js",[],function(r,t,n){
"use strict";
var e,c="2.1.9";
if("undefined"!=typeof n&&n.exports)try{}catch(o){}
var u="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",a=function(r){
for(var t={},n=0,e=r.length;e>n;n++)t[r.charAt(n)]=n;
return t;
}(u),h=String.fromCharCode,i=function(r){
if(r.length<2){
var t=r.charCodeAt(0);
return 128>t?r:2048>t?h(192|t>>>6)+h(128|63&t):h(224|t>>>12&15)+h(128|t>>>6&63)+h(128|63&t);
}
var t=65536+1024*(r.charCodeAt(0)-55296)+(r.charCodeAt(1)-56320);
return h(240|t>>>18&7)+h(128|t>>>12&63)+h(128|t>>>6&63)+h(128|63&t);
},f=/[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,A=function(r){
return r.replace(f,i);
},d=function(r){
var t=[0,2,1][r.length%3],n=r.charCodeAt(0)<<16|(r.length>1?r.charCodeAt(1):0)<<8|(r.length>2?r.charCodeAt(2):0),e=[u.charAt(n>>>18),u.charAt(n>>>12&63),t>=2?"=":u.charAt(n>>>6&63),t>=1?"=":u.charAt(63&n)];
return e.join("");
},g=function(r){
return r.replace(/[\s\S]{1,3}/g,d);
},s=e?function(r){
return(r.constructor===e.constructor?r:new e(r)).toString("base64");
}:function(r){
return g(A(r));
},C=function(r,t){
return t?s(String(r)).replace(/[+\/]/g,function(r){
return"+"==r?"-":"_";
}).replace(/=/g,""):s(String(r));
},l=function(r){
return C(r,!0);
},p=new RegExp(["[À-ß][-¿]","[à-ï][-¿]{2}","[ð-÷][-¿]{3}"].join("|"),"g"),S=function(r){
switch(r.length){
case 4:
var t=(7&r.charCodeAt(0))<<18|(63&r.charCodeAt(1))<<12|(63&r.charCodeAt(2))<<6|63&r.charCodeAt(3),n=t-65536;
return h((n>>>10)+55296)+h((1023&n)+56320);

case 3:
return h((15&r.charCodeAt(0))<<12|(63&r.charCodeAt(1))<<6|63&r.charCodeAt(2));

default:
return h((31&r.charCodeAt(0))<<6|63&r.charCodeAt(1));
}
},b=function(r){
return r.replace(p,S);
},v=function(r){
var t=r.length,n=t%4,e=(t>0?a[r.charAt(0)]<<18:0)|(t>1?a[r.charAt(1)]<<12:0)|(t>2?a[r.charAt(2)]<<6:0)|(t>3?a[r.charAt(3)]:0),c=[h(e>>>16),h(e>>>8&255),h(255&e)];
return c.length-=[0,0,2,1][n],c.join("");
},F=function(r){
return r.replace(/[\s\S]{1,4}/g,v);
},j=e?function(r){
return(r.constructor===e.constructor?r:new e(r,"base64")).toString();
}:function(r){
return b(F(r));
},m=function(r){
return j(String(r).replace(/[-_]/g,function(r){
return"-"==r?"+":"/";
}).replace(/[^A-Za-z0-9\+\/]/g,""));
};
return{
VERSION:c,
atob:F,
btoa:g,
fromBase64:m,
toBase64:C,
utob:A,
encode:C,
encodeURI:l,
btou:b,
decode:m
};
});define("biz_wap/jsapi/log.js",["biz_wap/jsapi/core.js","biz_wap/utils/mmversion.js"],function(i){
"use strict";
function o(i,o){
o=e+" "+o+" location:["+location.href+"]",n.isWechat&&n.isAndroid?r.invoke("log",{
level:i,
msg:o
}):n.isWechat&&(n.isIOS||n.isMac)&&r.invoke("writeLog",{
level:i,
msg:o
});
}
var r=i("biz_wap/jsapi/core.js"),n=i("biz_wap/utils/mmversion.js"),e="__wap__",a={
info:function(){
o("info",Array.prototype.join.apply(arguments));
},
warn:function(){
o("warn",Array.prototype.join.apply(arguments));
},
error:function(){
o("error",Array.prototype.join.apply(arguments));
},
debug:function(){
o("debug",Array.prototype.join.apply(arguments));
}
};
return a.log=a.info,a;
});define("biz_wap/utils/storage.js",[],function(){
"use strict";
function t(t){
if(!t)throw"require function name.";
this.key=t,this.init();
}
var e="__WXLS__",n=window.localStorage||{
getItem:function(){},
setItem:function(){},
removeItem:function(){},
key:function(){},
length:0
};
return t.getItem=function(t){
return t=e+t,n.getItem(t);
},t.setItem=function(i,r){
i=e+i;
for(var a=3;a--;)try{
n.setItem(i,r);
break;
}catch(o){
t.clear();
}
},t.clear=function(){
var t,i;
for(t=n.length-1;t>=0;t--)i=n.key(t),0==i.indexOf(e)&&n.removeItem(i);
},t.prototype={
constructor:t,
init:function(){
this.check();
},
getData:function(){
var e=t.getItem(this.key)||"{}";
try{
e=JSON.parse(e);
}catch(n){
e={};
}
return e;
},
check:function(){
var e,n,i=this.getData(),r={},a=+new Date;
for(e in i)n=i[e],+n.exp>a&&(r[e]=n);
t.setItem(this.key,JSON.stringify(r));
},
set:function(e,n,i){
var r=this.getData();
r[e]={
val:n,
exp:i||+new Date
},t.setItem(this.key,JSON.stringify(r));
},
get:function(t){
var e=this.getData();
return e=e[t],e?e.val||null:null;
},
remove:function(e){
var n=this.getData();
n[e]&&delete n[e],t.setItem(this.key,JSON.stringify(n));
}
},t;
});define("biz_common/utils/wxgspeedsdk.js",[],function(){
"use strict";
function e(e){
if(!e.pid||!e.speeds)return-1;
if(!e.speeds.length>0){
var n=e.speeds;
e.speeds=[],e.speeds.push(n);
}
e.user_define&&(p=e.user_define);
for(var t=d(e),o=0;o<e.speeds.length;o++){
var r=e.speeds[o];
r.time=parseInt(r.time),r.sid>20&&r.time>=0&&i(t,r.sid,r.time);
}
}
function n(){
s(function(){
setTimeout(function(){
for(var e in u)r({
pid_uin_rid:e,
speeds:u[e],
user_define:p
},c);
u={};
},100);
});
}
function t(e){
s(function(){
if(!e.pid||!e.time)return-1;
var n=d(e);
i(n,9,e.time);
});
}
function o(e){
s(function(){
var n=d(e);
u[n]||(u[n]=[]);
var t=window.performance||window.msPerformance||window.webkitPerformance||{};
if(t&&t.timing){
var o=t.timing||{};
i(n,1,o.domainLookupEnd-o.domainLookupStart),i(n,2,"https:"==location.protocol&&0!=o.secureConnectionStart?o.connectEnd-o.secureConnectionStart:0),
i(n,3,o.connectEnd-o.connectStart),i(n,4,o.responseStart-o.requestStart),i(n,5,o.responseEnd-o.responseStart),
i(n,6,o.domContentLoadedEventStart-o.domLoading),i(n,7,0==o.domComplete?0:o.domComplete-o.domLoading),
i(n,8,0==o.loadEventEnd?0:o.loadEventEnd-o.loadEventStart),function(){
setTimeout(function(){
o.loadEventEnd&&(i(n,7,0==o.domComplete?0:o.domComplete-o.domLoading),i(n,8,0==o.loadEventEnd?0:o.loadEventEnd-o.loadEventStart));
},0);
}(u),u[n][9]||i(n,9,o.domContentLoadedEventStart-o.navigationStart),i(n,10,o.redirectEnd-o.redirectStart),
i(n,11,o.domainLookupStart-o.fetchStart),i(n,12,o.domLoading-o.responseStart);
}
});
}
function i(e,n,t){
u[e]=u[e]||[],u[e][n]=u[e][n]||[],0>t||(21>n?u[e][n][0]=t:u[e][n].push(t));
}
function d(e){
return e&&e.pid?e.pid+"_"+(e.uin||0)+"_"+(e.rid||0):void(console&&console.error("Must provide a pid"));
}
function r(e,n){
var t=e.pid_uin_rid.split("_");
if(3!=t.length)return void(console&&console.error("pid,uin,rid, invalid args"));
var o="pid="+t[0]+"&uin="+t[1]+"&rid="+t[2];
e.user_define&&(o+="&user_define="+e.user_define);
for(var i=n+o+"&speeds=",d="",r=[],s=1;s<e.speeds.length;s++)if(e.speeds[s]){
for(var a=0;a<e.speeds[s].length;a++){
var p=s+"_"+e.speeds[s][a];
i.length+d.length+p.length<1024?d=d+p+";":(d.length&&r.push(i+d.substring(0,d.length-1)),
d=p+";");
}
s==e.speeds.length-1&&r.push(i+d.substring(0,d.length-1));
}
for(var s=0;s<r.length;s++)(new Image).src=r[s];
}
function s(e){
"complete"==document.readyState?e():f.push(e);
}
function a(){
for(var e=0;e<f.length;e++)f[e]();
f=[];
}
var p,u={},c="https://badjs.weixinbridge.com/frontend/reportspeed?",f=[];
return window.addEventListener?window.addEventListener("load",a,!1):window.attachEvent&&window.attachEvent("onload",a),
{
saveSpeeds:e,
send:n,
setFirstViewTime:t,
setBasicTime:o
};
});