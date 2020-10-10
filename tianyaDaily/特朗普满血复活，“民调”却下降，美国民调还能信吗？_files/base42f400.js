define("pages/video_plugin/video_monitor.js",["pages/video_plugin/base.js","biz_wap/utils/jsmonitor_report.js","appmsg/log.js"],function(t){
"use strict";
function r(){
this._g={
reportData:{},
uid:+new Date,
random:Math.random(),
_debug:window.parent.window.location.href.indexOf("&vconsole=1")>0?!0:!1
};
}
var i=t("pages/video_plugin/base.js"),a=t("biz_wap/utils/jsmonitor_report.js"),o=t("appmsg/log.js");
return i.inherit(r,i.Class),r.prototype.init=function(){
this.setBlockEvt("initMonitor");
},r.prototype.getuid=function(){
return++this._g.uid;
},r.prototype.initDataByUid=function(t,r){
var i=this._g.reportData;
!r&&i[t]&&i[t].radio&&(r=i[t].radio),this._g.reportData[t]={
data:{},
radio:r||1
};
},r.prototype.initMonitorHandler=function(t,r,i){
var a=this.getuid()+"_"+r;
return this.initDataByUid(a,i),{
data:a,
code:7
};
},r.prototype.minusMonitorHandler=function(t,r,a){
var o=this._g.reportData[r];
if(!o||!a)return i.BASE_BITSET;
o=o.data;
for(var e in a){
var n=a[e];
a.hasOwnProperty(e)&&(o[e]||(o[e]={
key:e,
value:0
}),o[e].value=Math.max(0,o[e].value-n||1));
}
return i.BASE_BITSET;
},r.prototype.setMonitorHandler=function(t,r,a){
var o=this._g.reportData[r];
if(!o||!a)return i.BASE_BITSET;
o=o.data;
for(var e in a){
var n=a[e];
a.hasOwnProperty(e)&&(o[e]||(o[e]={
key:e,
value:0
}),o[e].value=n||1);
}
return i.BASE_BITSET;
},r.prototype.plusMonitorHandler=function(t,r,a){
var o=this._g.reportData[r];
if(!o||!a)return i.BASE_BITSET;
o=o.data;
for(var e in a)if(a.hasOwnProperty(e)){
var n=a[e];
o[e]||(o[e]={
key:e,
value:0
}),o[e].value=o[e].value+n||1;
}
return i.BASE_BITSET;
},r.prototype.clearMonitorHandler=function(t,r){
return this.initDataByUid(r),i.BASE_BITSET;
},r.prototype.sendMonitorHandler=function(t,r){
if(!r||-1==r.indexOf("_"))return i.BASE_BITSET;
var e=this._g.reportData[r];
if(!e)return i.BASE_BITSET;
if(this._g.random>e.radio&&!this._g._debug)return i.BASE_BITSET;
e=e.data;
var n=(r+"").split("_")[1];
for(var s in e)if(e.hasOwnProperty(s)){
var u=e[s];
u.value&&a.setSum(n,u.key,u.value);
}
return o("[Video] "+JSON.stringify(e)),this.initDataByUid(r),i.BASE_BITSET;
},r;
});define("pages/loadscript.js",[],function(){
"use strict";
function e(t){
e.counter||(e.counter=1);
var n="number"!=typeof t.retry?1:t.retry,o=t.win||window,r=o.document,a=r.createElement("script"),i=t.type||"JSONP",d=r.head||r.getElementsByTagName("head")[0]||r.documentElement,l=t.callbackName,c="uninitialized",u="undefined"==typeof t.successCode?200:t.successCode,s="undefined"==typeof t.timeoutCode?500:t.timeoutCode,f="undefined"==typeof t.scriptErrorCode?400:t.scriptErrorCode,m=!1,p=null;
"JSONP"!=i&&"JS"!=i&&(i="JSONP");
var y="";
y="JSONP"==i?t.url+"&t="+Math.random():t.url;
var h=function(e){
a&&!m&&(m=!0,p&&(clearTimeout(p),p=null),a.onload=a.onreadystatechange=a.onerror=null,
d&&a.parentNode&&d.removeChild(a),a=null,l&&-1==l.indexOf(".")&&(window[l]=null),
"JS"==i&&e==u&&"loaded"==c&&"function"==typeof t.callback?t.callback():e!=u&&"loaded"!=c&&"function"==typeof t.onerror&&t.onerror(e));
};
if(l&&"function"==typeof t.callback&&"JSONP"==i){
var w=l;
-1==l.indexOf(".")&&(l=window[l]?l+e.counter++:l,window[l]=function(){
c="loaded",t.callback.apply(null,arguments);
}),y=y.replace("="+w,"="+l);
}
a.onload=a.onreadystatechange=function(){
var e=navigator.userAgent.toLowerCase();
(-1!=e.indexOf("opera")||-1==e.indexOf("msie")||/loaded|complete/i.test(this.readyState))&&("JS"==i&&(c="loaded"),
h("loaded"==c?u:f));
},a.onerror=function(){
return n>0?(t.retry=n-1,p&&(clearTimeout(p),p=null),void e(t)):void h(f);
},t.timeout&&(p=setTimeout(function(){
h(s);
},parseInt(t.timeout,10))),c="loading",a.charset="utf-8",setTimeout(function(){
a.src=y;
try{
d.insertBefore(a,d.lastChild);
}catch(e){}
},0);
}
return e;
});define("biz_wap/utils/ajax.js",["biz_common/utils/string/html.js","biz_common/utils/url/parse.js","biz_common/utils/respTypes.js","biz_wap/utils/ajax_wx.js"],function(require,exports,module,alert){
"use strict";
function reqType(e,t){
return e.url.indexOf(t)>-1&&-1===e.url.indexOf("action=")&&(!e.data||!e.data.action);
}
function logClientLog(e){
try{
var t;
/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)?t="writeLog":/(Android)/i.test(navigator.userAgent)&&(t="log"),
t&&doLog(t,e);
}catch(r){
throw console.error(r),r;
}
}
function doLog(e,t){
var r,o,a={};
r=top!=window?top.window:window;
try{
o=r.WeixinJSBridge,a=r.document;
}catch(n){}
e&&o&&o.invoke?o.invoke(e,{
level:"info",
msg:"[WechatFe][ajax]"+t
}):setTimeout(function(){
a.addEventListener?a.addEventListener("WeixinJSBridgeReady",function(){
doLog(e,t);
},!1):a.attachEvent&&(a.attachEvent("WeixinJSBridgeReady",function(){
doLog(e,t);
}),a.attachEvent("onWeixinJSBridgeReady",function(){
doLog(e,t);
}));
},0);
}
function reportRt(e,t,r){
var o="";
if(r&&r.length){
var a=1e3,n=r.length,s=Math.ceil(n/a);
o=["&lc="+s];
for(var i=0;s>i;++i)o.push("&log"+i+"=[rtCheckError]["+i+"]"+encodeURIComponent(r.substr(i*a,a)));
o=o.join("");
}
var p,c="idkey="+e+"_"+t+"_1"+o+"&r="+Math.random();
if(window.ActiveXObject)try{
p=new ActiveXObject("Msxml2.XMLHTTP");
}catch(d){
try{
p=new ActiveXObject("Microsoft.XMLHTTP");
}catch(u){
p=!1;
}
}else window.XMLHttpRequest&&(p=new XMLHttpRequest);
p&&(p.open("POST",location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?",!0),p.setRequestHeader("cache-control","no-cache"),
p.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),
p.setRequestHeader("X-Requested-With","XMLHttpRequest"),p.send(c));
}
function reportAjaxLength(e,t,r){
var o="";
if(r&&r.length){
var a=1e3,n=r.length,s=Math.ceil(n/a);
o=["&lc="+s];
for(var i=0;s>i;++i)o.push("&log"+i+"=[Ajax Length Limit]["+i+"]"+encodeURIComponent(r.substr(i*a,a)));
o=o.join("");
}
var p,c="idkey="+e+"_"+t+"_1"+o+"&r="+Math.random();
if(window.ActiveXObject)try{
p=new ActiveXObject("Msxml2.XMLHTTP");
}catch(d){
try{
p=new ActiveXObject("Microsoft.XMLHTTP");
}catch(u){
p=!1;
}
}else window.XMLHttpRequest&&(p=new XMLHttpRequest);
p&&(p.open("POST",location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?",!0),p.setRequestHeader("cache-control","no-cache"),
p.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),
p.setRequestHeader("X-Requested-With","XMLHttpRequest"),p.send(c),(new Image).src="/mp/jsmonitor?idkey="+e+"_"+t+"_1"+o+"&r="+Math.random());
}
function Ajax(obj){
var type=(obj.type||"GET").toUpperCase(),url;
url=obj.notJoinUrl?obj.url:ajaxWx.joinUrl(obj.url),"html"==obj.f&&(url=url.replace("&f=json",""));
var mayAbort=!!obj.mayAbort,async="undefined"==typeof obj.async?!0:obj.async,xhr=new XMLHttpRequest,timer=null,data=null;
if("object"==typeof obj.data){
var d=obj.data;
data=[];
for(var k in d)d.hasOwnProperty(k)&&data.push(k+"="+encodeURIComponent(d[k]));
data=data.join("&");
}else data="string"==typeof obj.data?obj.data:null;
xhr.open(type,url,async);
var _onreadystatechange=xhr.onreadystatechange;
try{
url&&url.length>LENGTH_LIMIT&&reportAjaxLength(27613,17,"ajax get limit[length: "+url.length+"]"+url.substring(0,1024));
}catch(e){}
xhr.onreadystatechange=function(){
if("function"==typeof _onreadystatechange&&_onreadystatechange.apply(xhr),3==xhr.readyState&&obj.received&&obj.received(xhr),
4==xhr.readyState){
reqType(obj,"/mp/getappmsgext")&&(window.receiveGetAppmsgExt=xhr.status+"|"+Date.now(),
logClientLog("receive appmsgext response, status: "+xhr.status)),reqType(obj,"/mp/getappmsgad")&&(window.receiveGetAppmsgAd=xhr.status+"|"+Date.now(),
logClientLog("receive appmsgad response, status: "+xhr.status)),xhr.onreadystatechange=null;
var status=xhr.status;
if(status>=200&&400>status)try{
var responseText=xhr.responseText,resp=responseText;
if("json"==obj.dataType)try{
resp=eval("("+resp+")");
var rtId=obj.rtId,rtKey=obj.rtKey||0,rtDesc=obj.rtDesc,checkRet=!0;
if(rtId&&rtDesc&&RespTypes&&!RespTypes.check(resp,rtDesc)&&reportRt(rtId,rtKey,RespTypes.getMsg()+"[detail]"+responseText+";"+obj.url),
resp&&resp.base_resp&&1*resp.base_resp.ret!==0&&"undefined"!=typeof window.WX_BJ_REPORT&&window.WX_BJ_REPORT.BadJs&&Math.random()<.001){
var reportUrl=url;
-1!==url.indexOf("?")&&(reportUrl=url.substr(0,url.indexOf("?")),Url.getQuery("action",url)&&(reportUrl=reportUrl+"?action="+Url.getQuery("action",url))),
("/mp/getappmsgext"!==reportUrl&&"/mp/getappmsgad"!==reportUrl||"undefined"!=typeof resp.base_resp.ret)&&window.WX_BJ_REPORT.BadJs.report(reportUrl,"ret="+resp.base_resp.ret,{
mid:window.PAGE_MID,
view:"wap_retcode"
});
}
}catch(e){
return void(obj.error&&obj.error(xhr,{
type:1,
error:e
}));
}
obj.success&&obj.success(resp);
}catch(e){
throw __moon_report({
offset:MOON_AJAX_SUCCESS_OFFSET,
e:e
}),e;
}else{
try{
obj.error&&obj.error(xhr,{
type:2,
error:"status error",
status:status
});
}catch(e){
throw __moon_report({
offset:MOON_AJAX_ERROR_OFFSET,
e:e
}),e;
}
if(status||!mayAbort){
var __ajaxtest=window.__ajaxtest||"0";
__moon_report({
offset:MOON_AJAX_NETWORK_OFFSET,
log:"ajax_network_error["+status+"]["+__ajaxtest+"]: "+url+";host:"+location.host,
e:""
});
}
}
clearTimeout(timer);
try{
obj.complete&&obj.complete();
}catch(e){
throw __moon_report({
offset:MOON_AJAX_COMPLETE_OFFSET,
e:e
}),e;
}
obj.complete=null;
}
},"POST"==type&&xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),
obj.noXRequestedWidthHeader||xhr.setRequestHeader("X-Requested-With","XMLHttpRequest"),
"undefined"!=typeof obj.timeout&&(timer=setTimeout(function(){
xhr.abort("timeout");
try{
obj.complete&&obj.complete();
}catch(e){
throw __moon_report({
offset:MOON_AJAX_COMPLETE_OFFSET,
e:e
}),e;
}
obj.complete=null,__moon_report({
offset:MOON_AJAX_TIMEOUT_OFFSET,
log:"ajax_timeout_error: "+url,
e:""
});
},obj.timeout));
try{
xhr.send(data);
try{
data&&data.length>LENGTH_LIMIT&&reportAjaxLength(27613,18,"ajax post limit[length: "+data.length+"]"+data.substring(0,1024));
}catch(e){}
}catch(e){
obj.error&&obj.error(xhr,{
type:3,
error:e
});
}
return reqType(obj,"/mp/getappmsgext")&&(window.startGetAppmsgExtTime=Date.now(),
logClientLog("start get appmsgext, url: ",obj.url)),reqType(obj,"/mp/getappmsgad")&&(window.startGetAppmsgAdTime=Date.now(),
logClientLog("start get appmsgad, url: ",obj.url)),xhr;
}
require("biz_common/utils/string/html.js");
var Url=require("biz_common/utils/url/parse.js"),RespTypes=require("biz_common/utils/respTypes.js"),ajaxWx=require("biz_wap/utils/ajax_wx.js"),isx5=-1!=navigator.userAgent.indexOf("TBS/"),__moon_report=window.__moon_report||function(){},MOON_AJAX_SUCCESS_OFFSET=3,MOON_AJAX_NETWORK_OFFSET=4,MOON_AJAX_ERROR_OFFSET=5,MOON_AJAX_TIMEOUT_OFFSET=6,MOON_AJAX_COMPLETE_OFFSET=7,MOON_AJAX_GET_LIMIT_4K=17,MOON_AJAX_POST_LIMIT_4K=18,LENGTH_LIMIT=4096,doc={},isAcrossOrigin=!1;
try{
doc=top.window.document;
}catch(e){
isAcrossOrigin=!0;
}
return window.__second_open__||!isAcrossOrigin&&top.window.__second_open__?ajaxWx.ajax:Ajax;
});define("biz_common/utils/url/parse.js",[],function(){
"use strict";
function r(r){
var e=r.length,n=r.indexOf("?"),t=r.indexOf("#");
t=-1==t?e:t,n=-1==n?t:n;
var a=r.substr(0,n),i=r.substr(n+1,t-n-1),s=r.substr(t+1);
return{
host:a,
query_str:i,
hash:s
};
}
function e(e,n,t){
var a=r(e),i=a.query_str,s=[];
for(var o in n)n.hasOwnProperty(o)&&s.push(o+"="+(t?n[o]:encodeURIComponent(n[o])));
return s.length>0&&(i+=(""!=i?"&":"")+s.join("&")),a.host+(""!=i?"?"+i:"")+(""!=a.hash?"#"+a.hash:"");
}
function n(r,e,n,t){
r=r||location.href;
var a=r.indexOf("&"),i=r.length,s=r.replace(/^[\w\d]+:[\/\\]+/g,"").split("").reverse();
Array.prototype.indexOf||(Array.prototype.indexOf=function(r,e){
var n;
if(null==this)throw new TypeError('"this" is null or not defined');
var t=Object(this),a=t.length>>>0;
if(0===a)return-1;
var i=+e||0;
if(1/0===Math.abs(i)&&(i=0),i>=a)return-1;
for(n=Math.max(i>=0?i:a-Math.abs(i),0);a>n;){
if(n in t&&t[n]===r)return n;
n++;
}
return-1;
});
var o=i-1-s.indexOf("/");
-1!=a&&-1==r.indexOf("?")&&a>o&&(r=r.replace("&","?"));
var u=new RegExp("([\\?&]"+e+"=)[^&#]*");
if(!r.match(u)){
var h=r.indexOf("?");
return-1==h?r+"?"+e+"="+n:h==r.length-1?r+e+"="+n:r+"&"+e+"="+n;
}
return t===!0?r.replace(u,"$1"+n):r;
}
function t(r){
var e=arguments[1]||window.location.search,n=new RegExp("(^|&)"+r+"=([^&]*)(&|$)"),t=e.substr(e.indexOf("?")+1).match(n);
return null!=t?t[2]:"";
}
return{
parseUrl:r,
join:e,
addParam:n,
getQuery:t
};
});define("biz_wap/utils/mmversion.js",[],function(){
"use strict";
function n(){
var n=/MicroMessenger\/([\d\.]+)/i,t=c.match(n);
return t&&t[1]?t[1]:!1;
}
function t(){
var n=/MicroMessenger\/[\d\.]+\(0x(.+?)\)/i,t=c.match(n);
return t&&t[1]?t[1]:!1;
}
function i(t,i,r){
var e=n();
if(e){
e=e.split("."),t=t.split("."),/\d+/g.test(e[e.length-1])||e.pop();
for(var s,o,c=h["cp"+i],u=0,a=Math.max(e.length,t.length);a>u;++u){
s=e[u]||0,o=t[u]||0,s=parseInt(s)||0,o=parseInt(o)||0;
var d=h.cp0(s,o);
if(!d)return c(s,o);
}
return r||0==i?!0:!1;
}
}
function r(n){
return i(n,0);
}
function e(n,t){
return i(n,1,t);
}
function s(n,t){
return i(n,-1,t);
}
function o(){
return u?"ios":d?"android":g?"mac_os":p?"windows":"unknown";
}
var c=navigator.userAgent,u=/(iPhone|iPad|iPod|iOS)/i.test(c),a=/Windows\sPhone/i.test(c),d=/(Android)/i.test(c),f=/MicroMessenger\/([\d\.]+)/i.test(c),g=/mac\sos/i.test(c),p=/windows\snt/i.test(c)&&!a,w=d&&/miniprogram/.test(c.toLowerCase())||"miniprogram"==window.__wxjs_environment,m=f&&/wxwork/i.test(c),h={
"cp-1":function(n,t){
return t>n;
},
cp0:function(n,t){
return n==t;
},
cp1:function(n,t){
return n>t;
}
};
return{
get:n,
getInner:t,
cpVersion:i,
eqVersion:r,
gtVersion:e,
ltVersion:s,
getPlatform:o,
isWp:a,
isIOS:u,
isAndroid:d,
isInMiniProgram:w,
isWechat:f,
isMac:g,
isWindows:p,
is_wxwork:m
};
});function _typeof(e){
return e&&"undefined"!=typeof Symbol&&e.constructor===Symbol?"symbol":typeof e;
}
define("a/a_utils.js",["biz_wap/jsapi/core.js","biz_wap/utils/ajax.js","biz_wap/utils/mmversion.js","biz_common/utils/report.js","biz_common/dom/class.js","biz_common/utils/url/parse.js","biz_wap/utils/openUrl.js","biz_wap/utils/wapsdk.js","common/utils.js","a/a_config.js"],function(e){
"use strict";
function t(e,t){
w("/mp/ad_report?action=follow&type="+e+t);
}
function n(e,t){
h.jsmonitor({
id:115849,
key:e,
value:t
});
}
function r(e){
h.jsmonitor({
id:28307,
key:e
});
}
function i(e){
h.jsmonitor({
id:128729,
key:e
});
}
function o(e){
var t=j.AD_WEB_COMPT_REQ_PATH_WHITE_LIST.some(function(t){
return t.test(e);
});
return t;
}
function a(e){
if(!e)return"";
var t=document.createElement("a");
return t.href=e,t.hostname;
}
function s(e){
for(var t=[],n=0;n<e.length;++n){
var r=e[n],i="undefined"==typeof r?"undefined":_typeof(r);
r="string"===i?r.htmlDecode():r,"object"===i&&(r="[object Array]"===Object.prototype.toString.call(r)?s(r):p(r)),
t.push(r);
}
return t;
}
function p(e){
var t={};
for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){
var r=e[n],i="undefined"==typeof r?"undefined":_typeof(r);
r="string"===i?r.htmlDecode():r,"object"===i&&(r="[object Array]"===Object.prototype.toString.call(r)?s(r):p(r)),
t[n]=r;
}
return t;
}
function c(e,t){
var n=0;
g.isIOS?n=1:g.isAndroid&&(n=2);
var r={
creative_load_fail:[{
ts:parseInt(+new Date/1e3,10),
aid:parseInt(e.info.aid,10),
img_url:encodeURIComponent(t),
network_type:window.networkType,
errmsg:"",
os_type:n,
client_version:parseInt(window.clientversion,10),
traceid:e.info.traceid
}]
};
r=JSON.stringify(r),l({
url:"/mp/advertisement_report?action=extra_report&extra_data="+r+"&__biz="+window.biz,
timeout:2e3
});
}
function d(e,t){
var n={
ad_sign_data:t.adSignData,
ad_sign_k1:t.adSignK1,
ad_sign_k2:t.adSignK2,
ad_sign_md5:t.signMd5
};
return v.join(e,n,!0);
}
function u(e,t,n,r){
try{
e.postMessage(JSON.stringify({
action:t,
value:n
}),r||"*");
}catch(i){
console.log("postMessage error",i);
}
}
function _(e,t){
if(!e||!e.flow_exp_info)return"";
var n=e.flow_exp_info||"";
try{
n=JSON.parse(n.replace(/&quot;/g,'"'));
}catch(r){
return"";
}
if(!n.length)return"";
for(var i=0;i<n.length;i++)if(n[i].exp_para&&n[i].exp_para.length)for(var o=0;o<n[i].exp_para.length;o++)if(n[i].exp_para[o].name===t)return n[i].exp_para[o].value;
return null;
}
function f(e){
if(!e||!e.crt_exp_info)return{};
var t=e.crt_exp_info.htmlDecode(),n={};
try{
n=JSON.parse(t);
}catch(r){
n={},console.error("getCrtExpInfo fail: ",r);
}
return n;
}
var m=e("biz_wap/jsapi/core.js"),l=e("biz_wap/utils/ajax.js"),g=e("biz_wap/utils/mmversion.js"),w=e("biz_common/utils/report.js"),y=e("biz_common/dom/class.js"),v=e("biz_common/utils/url/parse.js"),b=e("biz_wap/utils/openUrl.js").openUrlWithExtraWebview,h=e("biz_wap/utils/wapsdk.js"),x=e("common/utils.js"),j=e("a/a_config.js"),z="pos_",S=[" ","-","(",":",'"',"'","：","（","—","－","“","‘"],O=["wximg.qq.com","wximg.gtimg.com","pgdt.gtimg.cn","mmsns.qpic.cn","mmbiz.qpic.cn","vweixinthumb.tc.qq.com","pp.myapp.com","wx.qlog.cn","mp.weixin.qq.com"],k=[350064395,3194181833,3191183081,3191008240,459315e3,2547206501,17516575,3194183798,3193008987,3191008237,3190008366,1314021127,3190008373,3192140177,3193183025,3191138746,3192008231,3191138747,3191138743,3193183023,3193183029,3192138635,3190138969,3192138631,3194182870,3192138630,3194182869,3192138629,3192138628,3193183024,3191138744,3192138627,3194182868,3193183031,3192138634,3190138972,3191138745,3192138633,3193183030,3190138971,3193183028,3193183027,3193183026,3190138970,3192138632,3192184240,3194248804,388382775,3193008989,3193008986,3194241008,3193240873,3193240874,3190179574],I={
report:t,
report115849:n,
report128729:i,
checkRequestUrlAllowed:o,
saveCopy:p,
joinSignParam:d,
postMessage:u,
getCrtExpInfo:f,
getExpParaVal:_,
checkShowCpc:function(e,t,n,r){
if(t)return!0;
if(!e)return!1;
var i=x.getInnerHeight(),o=i/2,a=e.offsetTop,s=n.offsetHeight,p=void 0;
if(o>a?p=1:i>a&&(p=2),p&&r){
var c=JSON.stringify({
biz_middle_not_exp:[{
scene:p,
traceid:r.traceid,
aid:+r.aid,
appmsg_id:+window.appmsgid,
item_idx:+window.idx
}]
});
l({
url:"/mp/advertisement_report?action=extra_report&extra_data="+c+"&__biz="+window.biz,
timeout:2e3
});
}
return o>a||o>s-a?!1:!0;
},
openWebAppStore:function(e,t){
return x.getIosMainVersion()>=12?void m.invoke("launchApplication",{
schemeUrl:e
},function(){}):void m.invoke("downloadAppInternal",{
appUrl:e
},function(n){
n.err_msg&&-1!==n.err_msg.indexOf("ok")||b("/mp/ad_redirect?url="+encodeURIComponent(e)+"&ticket="+t);
});
},
adOptReport:function(e,t,n,r){
var i=v.join("/mp/ad_complaint",{
action:"report",
type:e,
pos_type:t,
trace_id:n,
aid:r,
__biz:window.biz,
r:Math.random()
},!0);
w(i);
},
checkAdImg:function(e){
if(e){
var t=e.image_url||"",n=a(t);
n&&-1===O.indexOf(n)&&r(58);
}
},
formName:function(e){
for(var t=-1,n=0,r=S.length;r>n;++n){
var i=S[n],o=e.indexOf(i);
-1!==o&&(-1===t||t>o)&&(t=o);
}
return-1!==t&&(e=e.substring(0,t)),e;
},
formSize:function(e){
return"number"!=typeof e?e:(e>=1024?(e/=1024,e=e>=1024?(e/1024).toFixed(2)+"MB":e.toFixed(2)+"KB"):e=e.toFixed(2)+"B",
e);
},
isItunesLink:function(e){
return/^https?:\/\/(itunes|apps)\.apple\.com\//.test(e);
},
extend:function(e,t){
for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);
return e;
},
getPosKeyDesc:function(e,t){
var n=t?e+"_"+t:e;
return z+n;
},
openCanvasAd:function(e){
m.invoke("openADCanvas",{
canvasId:e.canvasId,
preLoad:0,
noStore:0,
extraData:JSON.stringify({
pos_type:e.pos_type
}),
adInfoXml:e.adInfoXml
},function(n){
0!==Number(n.ret)?(b(e.url),t(135,e.report_param)):t(134,e.report_param);
});
},
setBackgroundClass:function(){
window._has_comment||0!==window.adDatasRealNum||window._share_redirect_url||window.is_temp_url?y.removeClass(document.body,"rich_media_empty_extra"):y.addClass(document.body,"rich_media_empty_extra");
},
lazyLoadAdImg:function(e){
for(var t=document.getElementsByClassName("js_alazy_img"),n=function(n){
var i=t[n];
i.onload=function(){
r(54),i.src.indexOf("retry")>-1&&r(69);
},i.onerror=function(){
-1===i.src.indexOf("retry")?i.src=v.addParam(i.src,"retry",1):!function(){
r(98);
var t="other";
g.isIOS?t="iphone":g.isAndroid&&(t="android"),setTimeout(function(){
var n=window.networkType||"unknow",r=v.join("/tp/datacenter/report",{
cmd:"report",
id:900023,
uin:777,
os:t,
aid:e.aid,
image_url:encodeURIComponent(i.src),
type:e.type,
network:n
},!0);
l({
url:r,
async:!0
});
},500),c(e,i.src);
}(),r(57);
},i.src=i.dataset.src;
},i=0;i<t.length;i++)n(i);
},
reportUrlLength:function(e,t,r,i,o,a,s){
var p=d(s,{
adSignData:e,
adSignK1:t,
adSignK2:r,
signMd5:i,
viewidKeyObj:o
});
if(p.length>=4e3){
n(13);
var c=JSON.stringify({
biz_log_report:[{
pos_type:+a.pos_type,
traceid:a.tid,
aid:+a.aid,
log_type:1,
ext_info:"[url length:"+p.length+"]"+s.substring(0,2e3)
}]
});
l({
url:"/mp/advertisement_report?action=extra_report",
timeout:2e3,
data:{
extra_data:c,
__biz:window.biz
},
type:"post"
});
}
},
isVideoSharePageOnlyAd:function(){
return"5"===window.item_show_type&&"ad"===v.getQuery("render_type");
},
listenMessage:function(e,t,n){
arguments.length<3&&(n=t,t=null),e.addEventListener("message",function(e){
var r=void 0;
if(!t||e.origin===t){
if("object"!==_typeof(e.data))try{
r=JSON.parse(e.data);
}catch(i){
return;
}else r=e.data;
"function"==typeof n&&n(e,r);
}
});
},
isSample:function(e){
return k.indexOf(window.user_uin)>-1?!0:window.user_uin&&window.user_uin/100%1e3<=10*e?!0:!1;
},
broadcastFrame:function(e,t,n,r){
e=e||[];
for(var i=0;i<e.length;i++){
var o=e[i].src||e[i].getAttribute("data-realsrc");
(!r||r&&o.indexOf(r)>-1)&&u(e[i].contentWindow,t,n);
}
}
};
return I;
});define("biz_wap/ui/weui.js",[],function(){
"use strict";
function e(){
for(var e=document.getElementsByTagName("link"),i=/^http(s)?:\/\/res\.wx\.qq\.com\/open\/libs\/weui\/([^\/]*)\/weui(\.min)?\.css$/,n=0;n<e.length;n++){
var t=(e[n].href.match(i)||[])[2];
if(t){
if("1"===t[0])return!0;
console.warn("Weui.css("+t+") in page is deprecated. Weui.css(1.0+) will be insert in page automatically.");
}
}
return!1;
}
function i(){
var e=["actionSheet","alert","confirm","dialog","validate","checkIfBlur","gallery","loading","picker","datePicker","searchBar","slider","tab","toast","topTips","uploader"];
window.weui={};
for(var i=0;i<e.length;i++)!function(i){
window.weui[e[i]]=function(){
a.push({
name:e[i],
args:arguments
}),console.info(e[i]+" will be executed after weui.js loaded.");
};
}(i);
}
function n(){
var e=document.createElement("script");
e.onload=function(){
for(var e=0;e<a.length;e++)window.weui[a[e].name].apply(window,a[e].args);
},e.onerror=function(){
throw new Error("weui.js loaded fail.");
},e.src=r,document.body.appendChild(e);
}
var t="https://res.wx.qq.com/open/libs/weui/2.4.0/weui.min.css",r="https://res.wx.qq.com/open/libs/weuijs/1.2.1/weui.min.js",a=[];
if(!e()){
var o=document.createElement("link");
o.href=t,o.rel="stylesheet",document.head.appendChild(o);
}
i(),n();
});define("biz_wap/zepto/touch.js",["biz_wap/zepto/zepto.js"],function(e){
"use strict";
e("biz_wap/zepto/zepto.js"),function(e){
function t(e,t,o,n){
return Math.abs(e-t)>=Math.abs(o-n)?e-t>0?"Left":"Right":o-n>0?"Up":"Down";
}
function o(){
p=null,g.last&&(g.el&&"function"==typeof g.el.trigger&&g.el.trigger("longTap"),g={});
}
function n(){
p&&clearTimeout(p),p=null;
}
function i(){
a&&clearTimeout(a),l&&clearTimeout(l),c&&clearTimeout(c),p&&clearTimeout(p),a=l=c=p=null,
g={};
}
function r(e){
return("touch"==e.pointerType||e.pointerType==e.MSPOINTER_TYPE_TOUCH)&&e.isPrimary;
}
function u(e,t){
return e.type=="pointer"+t||e.type.toLowerCase()=="mspointer"+t;
}
var a,l,c,p,s,g={},f=750;
e(document).ready(function(){
var w,y,T,h,d=0,m=0;
"MSGesture"in window&&(s=new MSGesture,s.target=document.body),e(document).bind("MSGestureEnd",function(e){
var t=e.velocityX>1?"Right":e.velocityX<-1?"Left":e.velocityY>1?"Down":e.velocityY<-1?"Up":null;
t&&g.el&&"function"==typeof g.el.trigger&&(g.el.trigger("swipe"),g.el.trigger("swipe"+t));
}).on("touchstart MSPointerDown pointerdown",function(t){
(!(h=u(t,"down"))||r(t))&&(T=h?t:t.touches[0],t.touches&&1===t.touches.length&&g.x2&&(g.x2=void 0,
g.y2=void 0),w=Date.now(),y=w-(g.last||w),g.el=e("tagName"in T.target?T.target:T.target.parentNode),
a&&clearTimeout(a),g.x1=T.pageX,g.y1=T.pageY,y>0&&250>=y&&(g.isDoubleTap=!0),g.last=w,
p=setTimeout(o,f),s&&h&&s.addPointer(t.pointerId));
}).on("touchmove MSPointerMove pointermove",function(e){
(!(h=u(e,"move"))||r(e))&&(T=h?e:e.touches[0],n(),g.x2=T.pageX,g.y2=T.pageY,d+=Math.abs(g.x1-g.x2),
m+=Math.abs(g.y1-g.y2));
}).on("touchend MSPointerUp pointerup",function(o){
(!(h=u(o,"up"))||r(o))&&(n(),g.x2&&Math.abs(g.x1-g.x2)>30||g.y2&&Math.abs(g.y1-g.y2)>30?c=setTimeout(function(){
g.el&&"function"==typeof g.el.trigger&&(g.el.trigger("swipe"),g.el.trigger("swipe"+t(g.x1,g.x2,g.y1,g.y2))),
g={};
},0):"last"in g&&(30>d&&30>m?l=setTimeout(function(){
var t=e.Event("tap");
t.cancelTouch=i,g.el&&"function"==typeof g.el.trigger&&g.el.trigger(t),g.isDoubleTap?(g.el&&g.el.trigger("doubleTap"),
g={}):a=setTimeout(function(){
a=null,g.el&&g.el.trigger("singleTap"),g={};
},250);
},0):g={}),d=m=0);
}).on("touchcancel MSPointerCancel pointercancel",i),e(window).on("scroll",i);
}),["swipe","swipeLeft","swipeRight","swipeUp","swipeDown","doubleTap","tap","singleTap","longTap"].forEach(function(t){
e.fn[t]=function(e){
return this.on(t,e);
};
});
}(Zepto);
});define("biz_wap/zepto/event.js",["biz_wap/zepto/zepto.js"],function(e){
"use strict";
e("biz_wap/zepto/zepto.js"),function(e){
function n(e){
return e._zid||(e._zid=d++);
}
function t(e,t,o,u){
if(t=r(t),t.ns)var a=i(t.ns);
return(g[n(e)]||[]).filter(function(e){
return!(!e||t.e&&e.e!=t.e||t.ns&&!a.test(e.ns)||o&&n(e.fn)!==n(o)||u&&e.sel!=u);
});
}
function r(e){
var n=(""+e).split(".");
return{
e:n[0],
ns:n.slice(1).sort().join(" ")
};
}
function i(e){
return new RegExp("(?:^| )"+e.replace(" "," .* ?")+"(?: |$)");
}
function o(e,n){
return e.del&&!y&&e.e in E||!!n;
}
function u(e){
return b[e]||y&&E[e]||e;
}
function a(t,i,a,s,f,d,l){
var v=n(t),h=g[v]||(g[v]=[]);
i.split(/\s/).forEach(function(n){
if("ready"==n)return e(document).ready(a);
var i=r(n);
i.fn=a,i.sel=f,i.e in b&&(a=function(n){
var t=n.relatedTarget;
return!t||t!==this&&!e.contains(this,t)?i.fn.apply(this,arguments):void 0;
}),i.del=d;
var v=d||a;
i.proxy=function(e){
if(e=c(e),!e.isImmediatePropagationStopped()){
e.customData=s;
var n=v.apply(t,e._args==p?[e]:[e].concat(e._args));
return n===!1&&(e.preventDefault(),e.stopPropagation()),n;
}
},i.i=h.length,h.push(i),"addEventListener"in t&&t.addEventListener(u(i.e),i.proxy,o(i,l));
});
}
function s(e,r,i,a,s){
var c=n(e);
(r||"").split(/\s/).forEach(function(n){
t(e,n,i,a).forEach(function(n){
delete g[c][n.i],"removeEventListener"in e&&e.removeEventListener(u(n.e),n.proxy,o(n,s));
});
});
}
function c(n,t){
return(t||!n.isDefaultPrevented)&&(t||(t=n),e.each(_,function(e,r){
var i=t[e];
n[e]=function(){
return this[r]=P,i&&i.apply(t,arguments);
},n[r]=z;
}),(t.defaultPrevented!==p?t.defaultPrevented:"returnValue"in t?t.returnValue===!1:t.getPreventDefault&&t.getPreventDefault())&&(n.isDefaultPrevented=P)),
n;
}
function f(e){
var n,t={
originalEvent:e
};
for(n in e)w.test(n)||e[n]===p||(t[n]=e[n]);
return c(t,e);
}
var p,d=(e.zepto.qsa,1),l=Array.prototype.slice,v=e.isFunction,h=function(e){
return"string"==typeof e;
},g={},m={},y="onfocusin"in window,E={
focus:"focusin",
blur:"focusout"
},b={
mouseenter:"mouseover",
mouseleave:"mouseout"
};
m.click=m.mousedown=m.mouseup=m.mousemove="MouseEvents",e.event={
add:a,
remove:s
},e.proxy=function(t,r){
if(v(t)){
var i=function(){
return t.apply(r,arguments);
};
return i._zid=n(t),i;
}
if(h(r))return e.proxy(t[r],t);
throw new TypeError("expected function");
},e.fn.bind=function(e,n,t){
return this.on(e,n,t);
},e.fn.unbind=function(e,n){
return this.off(e,n);
},e.fn.one=function(e,n,t,r){
return this.on(e,n,t,r,1);
};
var P=function(){
return!0;
},z=function(){
return!1;
},w=/^([A-Z]|returnValue$|layer[XY]$)/,_={
preventDefault:"isDefaultPrevented",
stopImmediatePropagation:"isImmediatePropagationStopped",
stopPropagation:"isPropagationStopped"
};
e.fn.delegate=function(e,n,t){
return this.on(n,e,t);
},e.fn.undelegate=function(e,n,t){
return this.off(n,e,t);
},e.fn.live=function(n,t){
return e(document.body).delegate(this.selector,n,t),this;
},e.fn.die=function(n,t){
return e(document.body).undelegate(this.selector,n,t),this;
},e.fn.on=function(n,t,r,i,o){
var u,c,d=this;
return n&&!h(n)?(e.each(n,function(e,n){
d.on(e,t,r,n,o);
}),d):(h(t)||v(i)||i===!1||(i=r,r=t,t=p),(v(r)||r===!1)&&(i=r,r=p),i===!1&&(i=z),
d.each(function(p,d){
o&&(u=function(e){
return s(d,e.type,i),i.apply(this,arguments);
}),t&&(c=function(n){
var r,o=e(n.target).closest(t,d).get(0);
return o&&o!==d?(r=e.extend(f(n),{
currentTarget:o,
liveFired:d
}),(u||i).apply(o,[r].concat(l.call(arguments,1)))):void 0;
}),a(d,n,i,r,t,c||u);
}));
},e.fn.off=function(n,t,r){
var i=this;
return n&&!h(n)?(e.each(n,function(e,n){
i.off(e,t,n);
}),i):(h(t)||v(r)||r===!1||(r=t,t=p),r===!1&&(r=z),i.each(function(){
s(this,n,r,t);
}));
},e.fn.trigger=function(n,t){
return n=h(n)||e.isPlainObject(n)?e.Event(n):c(n),n._args=t,this.each(function(){
"dispatchEvent"in this?this.dispatchEvent(n):e(this).triggerHandler(n,t);
});
},e.fn.triggerHandler=function(n,r){
var i,o;
return this.each(function(u,a){
i=f(h(n)?e.Event(n):n),i._args=r,i.target=a,e.each(t(a,n.type||n),function(e,n){
return o=n.proxy(i),i.isImmediatePropagationStopped()?!1:void 0;
});
}),o;
},"focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(n){
e.fn[n]=function(e){
return e?this.bind(n,e):this.trigger(n);
};
}),["focus","blur"].forEach(function(n){
e.fn[n]=function(e){
return e?this.bind(n,e):this.each(function(){
try{
this[n]();
}catch(e){}
}),this;
};
}),e.Event=function(e,n){
h(e)||(n=e,e=n.type);
var t=document.createEvent(m[e]||"Events"),r=!0;
if(n)for(var i in n)"bubbles"==i?r=!!n[i]:t[i]=n[i];
return t.initEvent(e,r,!0),c(t);
};
}(Zepto);
});define("biz_wap/zepto/zepto.js",[],function(){
"use strict";
var t=function(){
function t(t){
return null==t?String(t):J[W.call(t)]||"object";
}
function n(n){
return"function"==t(n);
}
function e(t){
return null!=t&&t==t.window;
}
function i(t){
return null!=t&&t.nodeType==t.DOCUMENT_NODE;
}
function r(n){
return"object"==t(n);
}
function o(t){
return r(t)&&!e(t)&&Object.getPrototypeOf(t)==Object.prototype;
}
function s(t){
return t instanceof Array;
}
function u(t){
return"number"==typeof t.length;
}
function c(t){
return P.call(t,function(t){
return null!=t;
});
}
function a(t){
return t.length>0?C.fn.concat.apply([],t):t;
}
function l(t){
return t.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase();
}
function f(t){
return t in M?M[t]:M[t]=new RegExp("(^|\\s)"+t+"(\\s|$)");
}
function h(t,n){
return"number"!=typeof n||z[l(t)]?n:n+"px";
}
function p(t){
var n,e;
return j[t]||(n=L.createElement(t),L.body.appendChild(n),e=getComputedStyle(n,"").getPropertyValue("display"),
n.parentNode.removeChild(n),"none"==e&&(e="block"),j[t]=e),j[t];
}
function d(t){
return"children"in t?$.call(t.children):C.map(t.childNodes,function(t){
return 1==t.nodeType?t:void 0;
});
}
function g(t,n,e){
for(E in n)e&&(o(n[E])||s(n[E]))?(o(n[E])&&!o(t[E])&&(t[E]={}),s(n[E])&&!s(t[E])&&(t[E]=[]),
g(t[E],n[E],e)):n[E]!==x&&(t[E]=n[E]);
}
function m(t,n){
return null==n?C(t):C(t).filter(n);
}
function v(t,e,i,r){
return n(e)?e.call(t,i,r):e;
}
function y(t,n,e){
null==e?t.removeAttribute(n):t.setAttribute(n,e);
}
function b(t,n){
var e=t.className,i=e&&e.baseVal!==x;
return n===x?i?e.baseVal:e:void(i?e.baseVal=n:t.className=n);
}
function w(t){
var n;
try{
return t?"true"==t||("false"==t?!1:"null"==t?null:/^0/.test(t)||isNaN(n=Number(t))?/^[\[\{]/.test(t)?C.parseJSON(t):t:n):t;
}catch(e){
return t;
}
}
function N(t,n){
n(t);
for(var e in t.childNodes)N(t.childNodes[e],n);
}
var x,E,C,O,T,S,A=[],$=A.slice,P=A.filter,L=window.document,j={},M={},z={
"column-count":1,
columns:1,
"font-weight":1,
"line-height":1,
opacity:1,
"z-index":1,
zoom:1
},Z=/^\s*<(\w+|!)[^>]*>/,q=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,k=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,B=/^(?:body|html)$/i,R=/([A-Z])/g,V=["val","css","html","text","data","width","height","offset"],F=["after","prepend","before","append"],H=L.createElement("table"),I=L.createElement("tr"),U={
tr:L.createElement("tbody"),
tbody:H,
thead:H,
tfoot:H,
td:I,
th:I,
"*":L.createElement("div")
},_=/complete|loaded|interactive/,D=/^[\w-]*$/,J={},W=J.toString,X={},Y=L.createElement("div"),G={
tabindex:"tabIndex",
readonly:"readOnly",
"for":"htmlFor",
"class":"className",
maxlength:"maxLength",
cellspacing:"cellSpacing",
cellpadding:"cellPadding",
rowspan:"rowSpan",
colspan:"colSpan",
usemap:"useMap",
frameborder:"frameBorder",
contenteditable:"contentEditable"
};
X.matches=function(t,n){
if(!n||!t||1!==t.nodeType)return!1;
var e=t.webkitMatchesSelector||t.mozMatchesSelector||t.oMatchesSelector||t.matchesSelector;
if(e)return e.call(t,n);
var i,r=t.parentNode,o=!r;
return o&&(r=Y).appendChild(t),i=~X.qsa(r,n).indexOf(t),o&&Y.removeChild(t),i;
},T=function(t){
return t.replace(/-+(.)?/g,function(t,n){
return n?n.toUpperCase():"";
});
},S=function(t){
return P.call(t,function(n,e){
return t.indexOf(n)==e;
});
},X.fragment=function(t,n,e){
var i,r,s;
return q.test(t)&&(i=C(L.createElement(RegExp.$1))),i||(t.replace&&(t=t.replace(k,"<$1></$2>")),
n===x&&(n=Z.test(t)&&RegExp.$1),n in U||(n="*"),s=U[n],s.innerHTML=""+t,i=C.each($.call(s.childNodes),function(){
s.removeChild(this);
})),o(e)&&(r=C(i),C.each(e,function(t,n){
V.indexOf(t)>-1?r[t](n):r.attr(t,n);
})),i;
},X.Z=function(t,n){
t=t||[];
for(var e in C.fn)t[e]=C.fn[e];
return t.selector=n||"",t;
},X.isZ=function(t){
return t instanceof X.Z;
},X.init=function(t,e){
var i;
if(!t)return X.Z();
if("string"==typeof t)if(t=t.trim(),"<"==t[0]&&Z.test(t))i=X.fragment(t,RegExp.$1,e),
t=null;else{
if(e!==x)return C(e).find(t);
i=X.qsa(L,t);
}else{
if(n(t))return C(L).ready(t);
if(X.isZ(t))return t;
if(s(t))i=c(t);else if(r(t))i=[t],t=null;else if(Z.test(t))i=X.fragment(t.trim(),RegExp.$1,e),
t=null;else{
if(e!==x)return C(e).find(t);
i=X.qsa(L,t);
}
}
return X.Z(i,t);
},C=function(t,n){
return X.init(t,n);
},C.extend=function(t){
var n,e=$.call(arguments,1);
return"boolean"==typeof t&&(n=t,t=e.shift()),e.forEach(function(e){
g(t,e,n);
}),t;
},X.qsa=function(t,n){
var e,r="#"==n[0],o=!r&&"."==n[0],s=r||o?n.slice(1):n,u=D.test(s);
return i(t)&&u&&r?(e=t.getElementById(s))?[e]:[]:1!==t.nodeType&&9!==t.nodeType?[]:$.call(u&&!r?o?t.getElementsByClassName(s):t.getElementsByTagName(n):t.querySelectorAll(n));
},C.contains=function(t,n){
return t!==n&&t.contains(n);
},C.type=t,C.isFunction=n,C.isWindow=e,C.isArray=s,C.isPlainObject=o,C.isEmptyObject=function(t){
var n;
for(n in t)return!1;
return!0;
},C.inArray=function(t,n,e){
return A.indexOf.call(n,t,e);
},C.camelCase=T,C.trim=function(t){
return null==t?"":String.prototype.trim.call(t);
},C.uuid=0,C.support={},C.expr={},C.map=function(t,n){
var e,i,r,o=[];
if(u(t))for(i=0;i<t.length;i++)e=n(t[i],i),null!=e&&o.push(e);else for(r in t)e=n(t[r],r),
null!=e&&o.push(e);
return a(o);
},C.each=function(t,n){
var e,i;
if(u(t)){
for(e=0;e<t.length;e++)if(n.call(t[e],e,t[e])===!1)return t;
}else for(i in t)if(n.call(t[i],i,t[i])===!1)return t;
return t;
},C.grep=function(t,n){
return P.call(t,n);
},window.JSON&&(C.parseJSON=JSON.parse),C.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(t,n){
J["[object "+n+"]"]=n.toLowerCase();
}),C.fn={
forEach:A.forEach,
reduce:A.reduce,
push:A.push,
sort:A.sort,
indexOf:A.indexOf,
concat:A.concat,
map:function(t){
return C(C.map(this,function(n,e){
return t.call(n,e,n);
}));
},
slice:function(){
return C($.apply(this,arguments));
},
ready:function(t){
return _.test(L.readyState)&&L.body?t(C):L.addEventListener("DOMContentLoaded",function(){
t(C);
},!1),this;
},
get:function(t){
return t===x?$.call(this):this[t>=0?t:t+this.length];
},
toArray:function(){
return this.get();
},
size:function(){
return this.length;
},
remove:function(){
return this.each(function(){
null!=this.parentNode&&this.parentNode.removeChild(this);
});
},
each:function(t){
return A.every.call(this,function(n,e){
return t.call(n,e,n)!==!1;
}),this;
},
filter:function(t){
return n(t)?this.not(this.not(t)):C(P.call(this,function(n){
return X.matches(n,t);
}));
},
add:function(t,n){
return C(S(this.concat(C(t,n))));
},
is:function(t){
return this.length>0&&X.matches(this[0],t);
},
not:function(t){
var e=[];
if(n(t)&&t.call!==x)this.each(function(n){
t.call(this,n)||e.push(this);
});else{
var i="string"==typeof t?this.filter(t):u(t)&&n(t.item)?$.call(t):C(t);
this.forEach(function(t){
i.indexOf(t)<0&&e.push(t);
});
}
return C(e);
},
has:function(t){
return this.filter(function(){
return r(t)?C.contains(this,t):C(this).find(t).size();
});
},
eq:function(t){
return-1===t?this.slice(t):this.slice(t,+t+1);
},
first:function(){
var t=this[0];
return t&&!r(t)?t:C(t);
},
last:function(){
var t=this[this.length-1];
return t&&!r(t)?t:C(t);
},
find:function(t){
var n,e=this;
return n="object"==typeof t?C(t).filter(function(){
var t=this;
return A.some.call(e,function(n){
return C.contains(n,t);
});
}):1==this.length?C(X.qsa(this[0],t)):this.map(function(){
return X.qsa(this,t);
});
},
closest:function(t,n){
var e=this[0],r=!1;
for("object"==typeof t&&(r=C(t));e&&!(r?r.indexOf(e)>=0:X.matches(e,t));)e=e!==n&&!i(e)&&e.parentNode;
return C(e);
},
parents:function(t){
for(var n=[],e=this;e.length>0;)e=C.map(e,function(t){
return(t=t.parentNode)&&!i(t)&&n.indexOf(t)<0?(n.push(t),t):void 0;
});
return m(n,t);
},
parent:function(t){
return m(S(this.pluck("parentNode")),t);
},
children:function(t){
return m(this.map(function(){
return d(this);
}),t);
},
contents:function(){
return this.map(function(){
return $.call(this.childNodes);
});
},
siblings:function(t){
return m(this.map(function(t,n){
return P.call(d(n.parentNode),function(t){
return t!==n;
});
}),t);
},
empty:function(){
return this.each(function(){
this.innerHTML="";
});
},
pluck:function(t){
return C.map(this,function(n){
return n[t];
});
},
show:function(){
return this.each(function(){
"none"==this.style.display&&(this.style.display=""),"none"==getComputedStyle(this,"").getPropertyValue("display")&&(this.style.display=p(this.nodeName));
});
},
replaceWith:function(t){
return this.before(t).remove();
},
wrap:function(t){
var e=n(t);
if(this[0]&&!e)var i=C(t).get(0),r=i.parentNode||this.length>1;
return this.each(function(n){
C(this).wrapAll(e?t.call(this,n):r?i.cloneNode(!0):i);
});
},
wrapAll:function(t){
if(this[0]){
C(this[0]).before(t=C(t));
for(var n;(n=t.children()).length;)t=n.first();
C(t).append(this);
}
return this;
},
wrapInner:function(t){
var e=n(t);
return this.each(function(n){
var i=C(this),r=i.contents(),o=e?t.call(this,n):t;
r.length?r.wrapAll(o):i.append(o);
});
},
unwrap:function(){
return this.parent().each(function(){
C(this).replaceWith(C(this).children());
}),this;
},
clone:function(){
return this.map(function(){
return this.cloneNode(!0);
});
},
hide:function(){
return this.css("display","none");
},
toggle:function(t){
return this.each(function(){
var n=C(this);
(t===x?"none"==n.css("display"):t)?n.show():n.hide();
});
},
prev:function(t){
return C(this.pluck("previousElementSibling")).filter(t||"*");
},
next:function(t){
return C(this.pluck("nextElementSibling")).filter(t||"*");
},
html:function(t){
return 0===arguments.length?this.length>0?this[0].innerHTML:null:this.each(function(n){
var e=this.innerHTML;
C(this).empty().append(v(this,t,n,e));
});
},
text:function(t){
return 0===arguments.length?this.length>0?this[0].textContent:null:this.each(function(){
this.textContent=t===x?"":""+t;
});
},
attr:function(t,n){
var e;
return"string"==typeof t&&n===x?0==this.length||1!==this[0].nodeType?x:"value"==t&&"INPUT"==this[0].nodeName?this.val():!(e=this[0].getAttribute(t))&&t in this[0]?this[0][t]:e:this.each(function(e){
if(1===this.nodeType)if(r(t))for(E in t)y(this,E,t[E]);else y(this,t,v(this,n,e,this.getAttribute(t)));
});
},
removeAttr:function(t){
return this.each(function(){
1===this.nodeType&&y(this,t);
});
},
prop:function(t,n){
return t=G[t]||t,n===x?this[0]&&this[0][t]:this.each(function(e){
this[t]=v(this,n,e,this[t]);
});
},
data:function(t,n){
var e=this.attr("data-"+t.replace(R,"-$1").toLowerCase(),n);
return null!==e?w(e):x;
},
val:function(t){
return 0===arguments.length?this[0]&&(this[0].multiple?C(this[0]).find("option").filter(function(){
return this.selected;
}).pluck("value"):this[0].value):this.each(function(n){
this.value=v(this,t,n,this.value);
});
},
offset:function(t){
if(t)return this.each(function(n){
var e=C(this),i=v(this,t,n,e.offset()),r=e.offsetParent().offset(),o={
top:i.top-r.top,
left:i.left-r.left
};
"static"==e.css("position")&&(o.position="relative"),e.css(o);
});
if(0==this.length)return null;
var n=this[0].getBoundingClientRect();
return{
left:n.left+window.pageXOffset,
top:n.top+window.pageYOffset,
width:Math.round(n.width),
height:Math.round(n.height)
};
},
css:function(n,e){
if(arguments.length<2){
var i=this[0],r=getComputedStyle(i,"");
if(!i)return;
if("string"==typeof n)return i.style[T(n)]||r.getPropertyValue(n);
if(s(n)){
var o={};
return C.each(s(n)?n:[n],function(t,n){
o[n]=i.style[T(n)]||r.getPropertyValue(n);
}),o;
}
}
var u="";
if("string"==t(n))e||0===e?u=l(n)+":"+h(n,e):this.each(function(){
this.style.removeProperty(l(n));
});else for(E in n)n[E]||0===n[E]?u+=l(E)+":"+h(E,n[E])+";":this.each(function(){
this.style.removeProperty(l(E));
});
return this.each(function(){
this.style.cssText+=";"+u;
});
},
index:function(t){
return t?this.indexOf(C(t)[0]):this.parent().children().indexOf(this[0]);
},
hasClass:function(t){
return t?A.some.call(this,function(t){
return this.test(b(t));
},f(t)):!1;
},
addClass:function(t){
return t?this.each(function(n){
O=[];
var e=b(this),i=v(this,t,n,e);
i.split(/\s+/g).forEach(function(t){
C(this).hasClass(t)||O.push(t);
},this),O.length&&b(this,e+(e?" ":"")+O.join(" "));
}):this;
},
removeClass:function(t){
return this.each(function(n){
return t===x?b(this,""):(O=b(this),v(this,t,n,O).split(/\s+/g).forEach(function(t){
O=O.replace(f(t)," ");
}),void b(this,O.trim()));
});
},
toggleClass:function(t,n){
return t?this.each(function(e){
var i=C(this),r=v(this,t,e,b(this));
r.split(/\s+/g).forEach(function(t){
(n===x?!i.hasClass(t):n)?i.addClass(t):i.removeClass(t);
});
}):this;
},
scrollTop:function(t){
if(this.length){
var n="scrollTop"in this[0];
return t===x?n?this[0].scrollTop:this[0].pageYOffset:this.each(n?function(){
this.scrollTop=t;
}:function(){
this.scrollTo(this.scrollX,t);
});
}
},
scrollLeft:function(t){
if(this.length){
var n="scrollLeft"in this[0];
return t===x?n?this[0].scrollLeft:this[0].pageXOffset:this.each(n?function(){
this.scrollLeft=t;
}:function(){
this.scrollTo(t,this.scrollY);
});
}
},
position:function(){
if(this.length){
var t=this[0],n=this.offsetParent(),e=this.offset(),i=B.test(n[0].nodeName)?{
top:0,
left:0
}:n.offset();
return e.top-=parseFloat(C(t).css("margin-top"))||0,e.left-=parseFloat(C(t).css("margin-left"))||0,
i.top+=parseFloat(C(n[0]).css("border-top-width"))||0,i.left+=parseFloat(C(n[0]).css("border-left-width"))||0,
{
top:e.top-i.top,
left:e.left-i.left
};
}
},
offsetParent:function(){
return this.map(function(){
for(var t=this.offsetParent||L.body;t&&!B.test(t.nodeName)&&"static"==C(t).css("position");)t=t.offsetParent;
return t;
});
}
},C.fn.detach=C.fn.remove,["width","height"].forEach(function(t){
var n=t.replace(/./,function(t){
return t[0].toUpperCase();
});
C.fn[t]=function(r){
var o,s=this[0];
return r===x?e(s)?s["inner"+n]:i(s)?s.documentElement["scroll"+n]:(o=this.offset())&&o[t]:this.each(function(n){
s=C(this),s.css(t,v(this,r,n,s[t]()));
});
};
}),F.forEach(function(n,e){
var i=e%2;
C.fn[n]=function(){
var n,r,o=C.map(arguments,function(e){
return n=t(e),"object"==n||"array"==n||null==e?e:X.fragment(e);
}),s=this.length>1;
return o.length<1?this:this.each(function(t,n){
r=i?n:n.parentNode,n=0==e?n.nextSibling:1==e?n.firstChild:2==e?n:null,o.forEach(function(t){
if(s)t=t.cloneNode(!0);else if(!r)return C(t).remove();
N(r.insertBefore(t,n),function(t){
null==t.nodeName||"SCRIPT"!==t.nodeName.toUpperCase()||t.type&&"text/javascript"!==t.type||t.src||window.eval.call(window,t.innerHTML);
});
});
});
},C.fn[i?n+"To":"insert"+(e?"Before":"After")]=function(t){
return C(t)[n](this),this;
};
});
for(var K in C.fn)X.Z[K]=C.fn[K];
return X.uniq=S,X.deserializeValue=w,C.zepto=X,C;
}();
window.Zepto=t,void 0===window.$&&(window.$=t);
});define("pages/video_collection/weapp_channel.js",["appmsg/weapp_common.js","biz_common/utils/url/parse.js","biz_wap/jsapi/core.js"],function(e){
"use strict";
var o=e("appmsg/weapp_common.js"),s=e("biz_common/utils/url/parse.js"),p=e("biz_wap/jsapi/core.js"),a="wx792f0292c9a85439",i="gh_f92d56086797",n=!!s.getQuery("channel_session_id");
o.preloadMiniProgram(i);
var r=function(e,s){
n?p.invoke("closeWindow"):o.jumpUrl({
options:{
appId:a,
userName:i,
relativeURL:s||"pages/doubleVideos/doubleVideos.html",
scene:e||132
},
appid:a
});
};
return{
openChannel:r
};
});define("appmsg/like_and_share.js",["biz_common/dom/event.js","biz_common/dom/class.js","biz_wap/jsapi/core.js","pages/utils.js","appmsg/retry_ajax.js","biz_wap/utils/ajax.js","appmsg/set_font_size.js","common/comm_report.js","common/utils.js","biz_wap/utils/device.js","pages/similar_video_utils.js"],function(i,e,o,t){
"use strict";
var n=i("biz_common/dom/event.js"),s=i("biz_common/dom/class.js"),m=i("biz_wap/jsapi/core.js"),a=i("pages/utils.js"),r=a.formatReadNum,l=i("appmsg/retry_ajax.js"),d=(i("biz_wap/utils/ajax.js"),
i("appmsg/set_font_size.js")),w=i("common/comm_report.js"),p=i("common/utils.js"),u=i("biz_wap/utils/device.js"),_=(i("pages/similar_video_utils.js"),
function(i){
return document.getElementById(i);
}),c=function(i){
i.style.display="block";
},k={
likeNum:0,
isLike:0,
likeDom:_("like_old"),
likeNumDom:_("likeNum_old"),
shareDom:_("js_bottom_share"),
oprRightDom:_("js_bottom_opr_right"),
shareBottomBtn:_("js_bottom_share_btn"),
likeBottomBtn:_("js_bottom_zan_btn"),
similarZanCard:_("js_similar_video_card"),
overflowFontScale:1
},h=function(){
var i=0;
try{
i=1*window.atob(window.biz);
}catch(e){}
var o={
BizUin:i,
BizUinStr:window.biz||"",
AppMsgId:window.parseInt(window.mid,10)||0,
ItemIdx:window.parseInt(window.idx,10)||0,
ItemShowType:window.parseInt(window.item_show_type,10)||0,
SessionIdStr:window.sessionid||"",
EnterId:window.parseInt(window.enterid,10)||0,
Scene:window.parseInt(window.source,10)||0,
SubScene:window.parseInt(window.subscene,10)||0,
EventType:4
};
w.report(19048,o);
},g=function(i){
s.removeClass(k.oprRightDom,"sns_opr_overflow");
var e=k.oprRightDom.getBoundingClientRect().width,o=k.oprRightDom.querySelectorAll(".js_media_tool_meta"),t=0;
if(o&&o.length)for(var n=0;n<o.length;n++)t=t+o[n].getBoundingClientRect().width+parseFloat(window.getComputedStyle(o[n]).marginLeft)+parseFloat(window.getComputedStyle(o[n]).marginRight);
t>=e?(i&&i.fontScale&&(k.overflowFontScale=i.fontScale),s.addClass(k.oprRightDom,"sns_opr_overflow")):s.removeClass(k.oprRightDom,"sns_opr_overflow");
},j=function(){
s.addClass(k.likeDom,"praised"),k.likeNum++;
var i=k.likeNumDom.innerHTML;
("10万+"!==i||"100k+"!==i)&&(k.likeNumDom.innerHTML=r(k.likeNum)),k.likeNumDom.style.display="";
},f=function(){
s.removeClass(k.likeDom,"praised"),k.likeNum--;
var i=k.likeNumDom.innerHTML;
k.likeNum>=0&&"10万+"!==i&&"100k+"!==i&&(k.likeNumDom.innerHTML=r(k.likeNum)),0===k.likeNum&&(k.likeNumDom.style.display="none");
},v=[],y=function(i){
"function"==typeof i&&v.push(i);
},b=function(i){
k.isLike=k.isLike?0:1,k.isLike?j():f(),l({
url:"/mp/appmsg_like?__biz="+window.biz+"&mid="+window.mid+"&idx="+window.idx+"&like="+k.isLike+"&f=json&appmsgid="+window.appmsgid+"&itemidx="+window.itemidx,
data:{
scene:window.source,
appmsg_like_type:1,
item_show_type:parseInt(window.item_show_type,10),
client_version:window.clientversion,
is_temp_url:window.is_temp_url||0,
style:i||0,
exptype:window.exptype||"",
expsessionid:window.expsessionid||""
},
type:"POST"
}),v.forEach(function(i){
i(k.isLike,k.likeNum);
});
},D=function(i){
return k.likeBottomBtn&&k.likeBottomBtn.disabled===!0?void 0:window.is_temp_url?void("5"!==window.item_show_type||!p.isNativePage()||u.os.pc?window.weui.alert("预览状态下无法操作"):t("预览状态下无法操作")):void b(i);
};
n.on(k.likeDom,"click",function(){
return D();
}),n.on(k.shareDom,"click",function(){
k.shareBottomBtn&&k.shareBottomBtn.disabled===!0||(h(),m.invoke("handleMPPageAction",{
action:"share"
}));
});
var B=function(){
g(),d.onFontScaleChange(g),window.addEventListener("resize",g);
},N=function(i){
var e=i.shareShow,o=i.likeShow,t=i.likeNum,n=i.isLike,m=i.shareGray,a=i.likeGray;
k.likeNum=t,k.isLike=n,e&&k.shareDom&&c(k.shareDom),m&&k.shareBottomBtn&&(k.shareBottomBtn.disabled=!0),
o&&k.likeDom&&c(k.likeDom),a&&k.likeBottomBtn&&(k.likeBottomBtn.disabled=!0),o&&k.likeNumDom&&0!==t&&(k.likeNumDom.innerHTML=r(k.likeNum),
k.likeNumDom.style.display="",n&&s.addClass(k.likeDom,"praised")),B(),v.forEach(function(i){
i(k.isLike,k.likeNum);
});
};
return{
initLikeShareDom:N,
triggerLike:D,
onLikeChange:y
};
});define("pages/video_collection/report.js",["pages/utils.js","biz_wap/jsapi/core.js","common/utils.js","biz_wap/utils/localstorage.js","biz_wap/utils/device.js","biz_wap/jsapi/leaveReport.js","biz_wap/utils/wapsdk.js","biz_common/base64.js"],function(e){
"use strict";
function n(e){
switch(e.EventType){
case 1:
g=e.StartTime;
break;

case 10:
y=e.StartTime;
break;

case 15:
if(!g)return;
var n=y-g;
y&&n>0&&(p.saveSpeeds({
sample:v,
uin:l,
pid:u,
speeds:{
sid:window.__second_open__?21:24,
time:n
}
}),console.log("[Video Save Speed] enterToStartDownloadTime",n));
var i=e.EndTime-g;
console.log("[system]","预加载上报信息"),console.log("[system]",JSON.stringify(e)),0===e.playCount&&e.previousCompletedSize?(p.saveSpeeds({
sample:v,
uin:l,
pid:u,
speeds:{
sid:window.__second_open__?27:28,
time:i
}
}),console.log("[Video Save Speed] preload enterToPlayTime",i)):i>0&&(p.saveSpeeds({
sample:v,
uin:l,
pid:u,
speeds:{
sid:window.__second_open__?22:25,
time:i
}
}),console.log("[Video Save Speed] enterToPlayTime",i));
var o=e.EndTime-y;
y&&o>0&&(p.saveSpeeds({
sample:v,
uin:l,
pid:u,
speeds:{
sid:window.__second_open__?23:26,
time:o
}
}),console.log("[Video Save Speed] startDownloadToPlayTime",o)),p.send(),g=0;
}
}
function i(e){
"number"!=typeof e.StartTime&&(e.StartTime=Date.now()),"number"!=typeof e.EndTime&&(e.EndTime=Date.now()),
k.push({
type:5,
item:Object.keys(e).map(function(n){
return{
key:n,
val:e[n]+""
};
})
}),n(e);
}
function o(e){
T||(T=!0,i({
EventType:3
}),w.reportNow(e));
}
var t=e("pages/utils.js"),a=e("biz_wap/jsapi/core.js"),s=e("common/utils.js"),d=e("biz_wap/utils/localstorage.js"),r=e("biz_wap/utils/device.js"),w=e("biz_wap/jsapi/leaveReport.js"),p=e("biz_wap/utils/wapsdk.js"),c=e("biz_common/base64.js").toBase64,_="function"==typeof window.btoa?window.btoa:c,l="";
try{
l=window.encodeURIComponent(_(window.user_uin));
}catch(m){
l="";
}
var u=2181,v=.02;
p.setBasicTime({
sample:v,
uin:l,
pid:u
});
var g=0,y=0,T=!1,k=[];
return a.invoke("handleMPPageAction",{
action:"getEnterTime"
},function(e){
var n=e.clickTimeMs,o=d.get("__get_enter_video_common_time__");
n+""!==o?(d.set("__get_enter_video_common_time__",n),console.log("[Video Enter Time]",n)):n=0,
i({
EventType:1,
MiaoKai:window.__second_open__?1:0,
StartTime:n||window.enter_time||Date.now(),
EndTime:n||window.enter_time||Date.now()
});
}),window.addEventListener("load",function(){
i({
EventType:7
});
}),window.top===window&&w.addReport(function(e){
if(!s.isWcSlPage())return!1;
window.__second_open_auth_time__&&i({
EventType:6,
StartTime:window.__second_open_auth_time__,
EndTime:window.__second_open_auth_time__
}),e||i({
EventType:2
});
var n=navigator.userAgent.match(/Mozilla.*?\((.*?)\)(\s|$)/),o=navigator.userAgent.match(/Language\/(.*?)(\s|$)/),a=0,d=window.networkType;
switch(d||(d=navigator.userAgent.match(/NetType\/(.*?)(\s|$)/),d=d&&d[1]&&d[1].toLowerCase()),
d){
case"wifi":
a=1;
break;

case"2g":
a=2;
break;

case"3g":
a=3;
break;

case"2g/3g":
a=3;
break;

case"4g":
a=4;
}
var w={
type:5,
item:[{
key:"DeviceModel",
val:n&&n[1]||"unknown"
},{
key:"DeviceBrand",
val:n&&n[1]||"unknown"
},{
key:"OsName",
val:["ios","android","windows","Mac"].filter(function(e){
return r.os[e];
})[0]||"unknown"
},{
key:"OsVersion",
val:r.os.version||"unknown"
},{
key:"LanguageVersion",
val:o&&o[1]||"unknown"
},{
key:"NetType",
val:a+""
},{
key:"EnterId",
val:1*(window.enterid||window.cgiData.enterid||parseInt(Date.now()/1e3,10))+""
},{
key:"EnterPageId",
val:1*(window.enterid||window.cgiData.enterid||parseInt(Date.now()/1e3,10))+""
},{
key:"AppMsgUrl",
val:window.location.href
},{
key:"Vid",
val:window.cgiData.vid
},{
key:"Scene",
val:1*(window.scene||window.cgiData.scene||t.getParam("scene"))+""
},{
key:"SubScene",
val:1*(window.subscene||window.cgiData.subscene||t.getParam("subscene"))+""
}]
};
return{
reportUrl:"https://mp.weixin.qq.com/mp/videoh5report",
reportData:JSON.stringify({
report:k,
comm_fields:w
}),
method:"POST"
};
}),{
add19735ExtData:i,
leaveReportNowForSwitchVideo:o
};
});function _defineProperty(e,t,n){
return t in e?Object.defineProperty(e,t,{
value:n,
enumerable:!0,
configurable:!0,
writable:!0
}):e[t]=n,e;
}
function _typeof(e){
return e&&"undefined"!=typeof Symbol&&e.constructor===Symbol?"symbol":typeof e;
}
var _extends=Object.assign||function(e){
for(var t=1;t<arguments.length;t++){
var n=arguments[t];
for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i]);
}
return e;
};
define("video/video_tail_utils.js",["biz_wap/utils/ajax.js","biz_wap/jsapi/core.js","a/a_config.js","biz_common/utils/url/parse.js","a/a_utils.js","biz_wap/utils/mmversion.js","pages/utils.js","common/comm_report.js","biz_common/dom/event.js","biz_common/dom/class.js","common/utils.js"],function(e){
"use strict";
function t(e,t,n){
if(N){
var i={
__videoTailPlayerId__:N,
action:e,
data:t
};
"function"==typeof n&&(i.callbackId=F+Q++,G[i.callbackId]=n),window.parent.postMessage(i,document.location.protocol+"//mp.weixin.qq.com");
}else"function"!=typeof n&&(n=function(){}),z.invoke(e,t,n);
}
function n(e,t){
"function"==typeof t&&(G[e]?G[e].push(t):G[e]=[t],z.on(e,t));
}
function i(e){
"object"===_typeof(e.data)&&"string"==typeof e.data.hostEnvEvent&&G[e.data.hostEnvEvent]&&G[e.data.hostEnvEvent].forEach(function(t){
return t(e.data.res);
});
}
function o(){
return C.cpVersion("7.0.9",1,!0);
}
function a(e){
X=_extends(X,e);
}
function s(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
for(var t in e)e[t]&&(ot[t]=e[t]);
}
function r(){
return B.hasClass(it,"has_ad")?1:0;
}
function d(){
return _extends({
ReportWithTailAd:r()
},ot);
}
function c(){
t("handleMPPageAction",{
action:"closeAdWebview"
});
}
function l(e){
return o()||X.hasAd&&!e?void(e?X.hidePanelAd&&X.hidePanelAd():X.showTailPanel&&X.showTailPanel(X)):void c();
}
function u(){
return N?q:window.innerWidth===screen.width&&window.innerHeight===screen.height||window.innerWidth===screen.height&&window.innerHeight===screen.width;
}
function p(e){
var t;
return M.join(location.origin+"/mp/authreadtemplate?t=pages/video_tail",(t={
vid:window.cgiData.vid,
item_show_type:window.item_show_type,
idx:window.idx,
mid:window.mid,
sn:window.sn,
scene:window.scene,
appmsg_type:window.appmsg_type,
msg_title:window.msg_title,
ct:window.ct,
send_time:window.send_time,
abtest_cookie:window.abtest_cookie,
msg_daily_idx:window.msg_daily_idx,
user_uin:window.user_uin,
__biz:window.biz,
pos_type_list:9,
get_ad_after_video:1
},_defineProperty(t,D.HAS_AD_DATA_QUERY_KEY,e?1:0),_defineProperty(t,"enterid",window.enterid),
_defineProperty(t,"subscene",window.subscene),_defineProperty(t,"oriStatus",window.cgiData.ori_status),
_defineProperty(t,"hitBizUin",window.cgiData.hit_bizuin),_defineProperty(t,"hitVid",window.cgiData.hit_vid),
_defineProperty(t,"sessionid",window.sessionid),_defineProperty(t,"devicetype",window.devicetype),
_defineProperty(t,"playerType",H.getPlayerType()),_defineProperty(t,"hasSubscribed",X.hasSubscribed?1:0),
_defineProperty(t,"continueid",window.continueid+""),_defineProperty(t,"continueseq",1*M.getQuery("continueseq")||1),
t));
}
function _(e){
at=e;
}
function f(e,t,n){
if(!Y||n){
var i=p(at)+"&wcslplayerId="+t;
window.__second_open__?W({
url:i,
type:"GET",
f:"html",
success:function(t){
e.setAttribute("src",i),e.contentWindow.document.open("text/html","replace"),e.contentWindow.document.write(t),
e.contentWindow.document.close(),e.contentWindow.history.replaceState(null,null,i);
}
}):e.setAttribute("src",i),U=e,Y=!0;
}
}
function m(e){
Y||z.invoke("handleMPPageAction",{
action:"createAdWebview",
adUrl:p(e)
},function(e){
return e.err_msg.indexOf("fail")>-1?void k.report115849(40):void(Y=!0);
});
}
function w(e){
a({
showTailPanel:e.showTailPanel,
hidePanelAd:e.hidePanelAd
}),n("onMPAdWebviewStateChange",function(e){
"appear"===e.state&&(l(),X.hasAd&&setTimeout(function(){
X.showAd&&X.showAd();
},10));
});
}
function v(e){
function t(){
o=!0,setTimeout(function(){
return a?void(o=!1):(s+=d,(X.canCreateTailWebview||r>=i-s)&&m(),void t());
},1e3*d);
}
function n(){
z.invoke("handleMPPageAction",{
action:"getMPVideoState"
},function(n){
n.vid===e&&(s=parseInt(n.currentTime,10)>=parseInt(n.duration,10)?0:n.currentTime,
i=n.duration,"play"===n.state&&!o&&t());
});
}
var i=void 0,o=void 0,a=!1,s=0,r=10,d=.5;
z.on("onMPVideoStateChange",function(e){
"play"===e.state?(n(),a=!1):"enterFullScreen"!==e.state&&"exitFullScreen"!==e.state&&(a=!0);
}),n();
}
function y(e){
v(e),z.on("onMPAdWebviewStateChange",function(e){
"destroy"===e.state&&(Y=!1);
});
}
function b(e){
n("onReceiveMPPageData",function(t){
e&&e(t);
});
}
function g(e,n){
U&&"adWeb"===n?U.contentWindow.postMessage({
hostEnvEvent:"onReceiveMPPageData",
res:{
data:e
}
},document.location.protocol+"//mp.weixin.qq.com"):t("handleMPPageAction",{
action:"sendMPPageData",
data:e,
sendTo:n
});
}
function h(e){
var t=u(),n=void 0;
n=r()?t?184:183:t?181:180,V.report(17149,_extends({
EventType:t?46:47
},d())),e.dataset.scene=n;
}
function P(e){
Z&&(e?(et.style.display="none",tt.style.display="",!J&&(nt.style.display="")):(et.style.display="",
tt.style.display="none",nt.style.display="none"),J=e);
}
function T(){
if(Z){
var e=u();
e&&K||!e&&$||(V.report(17149,_extends({
EventType:e?70:71
},d())),e?K=!0:$=!0);
}
}
function j(){
V.report(17149,_extends({
EventType:u()?72:73
},d()));
}
function S(){
return J;
}
function I(e){
W({
url:"/mp/videochannel_profile_page?action=check_contact&biz_username="+e.userName+"&__biz="+e.biz,
dataType:"json",
success:function(t){
var n=1===t.subscribed;
e.success&&e.success(n);
}
});
}
function E(e){
function t(){
I({
userName:e.userName,
biz:e.biz,
success:function(e){
P(e),T(),e&&g("hasSubscribed","commshareWeb");
}
});
}
O.getId("js_tail_panel_account_name").innerHTML=e.nickname,O.getId("js_tail_panel_account_avatar").src=e.headImg,
e.subscribed||P(!1),e.notBindProfileEvt?!function(){
var e=it.getElementsByClassName("js_go_profile")[0];
R.tap(e,function(){
h(e);
});
}():O.go2ProfileEvent({
$container:it,
user_name:e.userName,
beforeGo2Profile:h
}),Z&&(R.on(et,"tap",function(){
var t=void 0;
j(),t=u()?"186":"185",z.invoke("addContact",{
webtype:"1",
username:e.userName,
scene:t,
scenenote:e.pageUrl||""
},function(e){
e.err_msg.indexOf("ok")>-1&&(P(!0),g("hasSubscribed","commshareWeb"));
});
}),R.bindVisibilityChangeEvt(function(e){
if(e){
var n=3;
t();
for(var i=1;n>=i;i++)setTimeout(t,200*n);
}
}));
}
function x(){
R.tap(O.getId("js_tail_share_button"),function(){
V.report(17149,_extends({
EventType:u()?53:54
},d()));
});
}
function A(e){
if(!o()||!it)return void(e.fallback&&e.fallback());
e.reportData.PlayerType=1,s(e.reportData),it.style.display="",$=!1;
var t={
Vid:ot.VideoId,
BizUin:ot.BizUserName,
msgid:ot.MsgId,
itemidx:ot.Idx,
Type:1,
ClientTime:Date.now(),
Fromid:ot.Scene,
SessionId:ot.SessionIdStr,
Device:C.isIOS?1:2
};
e.isAppMsg?V.report(12710,_extends({},ot,t,{
Step:17,
ClientTime:Date.now()
})):(V.report(17149,_extends({
EventType:65
},ot)),V.report(17149,_extends({
EventType:67
},ot)),V.report(17149,_extends({
EventType:69
},ot)),(!e.subscribed&&!L||!J&&L)&&T()),L||(E(e),x(),R.tap(O.getId("js_replay"),function(){
it.style.display="none",e.replay&&e.replay(),e.isAppMsg?V.report(12710,_extends({},ot,t,{
Step:18,
ClientTime:Date.now()
})):V.report(17149,_extends({
EventType:52
},ot));
}),L=!0);
}
var W=e("biz_wap/utils/ajax.js"),z=e("biz_wap/jsapi/core.js"),D=e("a/a_config.js"),M=e("biz_common/utils/url/parse.js"),k=e("a/a_utils.js"),C=e("biz_wap/utils/mmversion.js"),O=e("pages/utils.js"),V=e("common/comm_report.js"),R=e("biz_common/dom/event.js"),B=e("biz_common/dom/class.js"),H=e("common/utils.js"),N=M.getQuery("wcslplayerId"),q=!1,U=null,F="video_tail_callback_",Q=0,G={};
N&&window.addEventListener("message",function(e){
"object"===_typeof(e.data)&&"string"==typeof e.data.callbackId&&e.data.callbackId.startsWith(F)?(G[e.data.callbackId]&&G[e.data.callbackId](e.data.res),
delete G[e.data.callbackId]):i(e);
});
var L=!1,Y=!1,K=!1,$=!1,J=!0,X={},Z=C.isIOS&&C.cpVersion("7.0.15",1,!0);
Z=Z||C.isAndroid&&C.cpVersion("7.0.17",1,!0);
var et=O.getId("js_btn_account_subscription"),tt=O.getId("js_profile_icon"),nt=O.getId("js_subscription_success"),it=O.getId("js_video_tail_panel"),ot={
EnterId:parseInt(Date.now()/1e3,10),
ItemShowType:5
};
N&&n("onWcSlPlayerFullscreenChange",function(e){
q=e.state,"string"==typeof e.padding&&(document.body.style.padding=e.padding);
});
var at=!1;
return{
createTailWebview:m,
initEvent4TailWebview:w,
listenAndCreateTailWebview:v,
onReceiveMPPageData:b,
setTailOpts:a,
showTailPanel:l,
sendMPPageData:g,
handleTailWebviewState:y,
closeTailWebview:c,
initProfile:E,
initWebTailPanel:A,
isFullScreen:u,
getSubscribedStatus:S,
reportSubscribeBtnExpose:T,
changeSubscribeStatus:P,
getSubscribedData:I,
supportTailPanel:o,
getReportData:d,
initShareBtnReport:x,
setReportData:s,
setHasAdData4WcSlPlayer:_,
initTailIframe4WcSlPlayer:f,
emitHostEnvEvent4WcSlPlayer:i,
sendMessageToHostEnv:t
};
});define("pages/video_plugin/base.js",[],function(){
"use strict";
var t=0,e=function(t,e){
var n=function(){};
n.prototype=e.prototype,t.prototype=new n,t.prototype.constructor=t,t.uber=e.prototype;
},n=function(){
this.player=null;
};
return n.prototype.setPlayer=function(t){
this.player=t;
},n.prototype.setBlockEvt=function(t){
this.player._setBlockPlugin(t,this);
},n.prototype.setUnblockEvt=function(t){
this.player._setBlockPlugin(t,null);
},n.prototype.recv=function(e){
var n=this[e+"Handler"];
if("function"==typeof n){
var o=n.apply(this,arguments);
return"undefined"==typeof o||null===o?t:o;
}
return t;
},{
Class:n,
inherit:e,
BASE_BITSET:t
};
});