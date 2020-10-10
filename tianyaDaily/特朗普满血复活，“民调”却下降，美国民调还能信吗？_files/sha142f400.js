define("biz_common/utils/report.js",[],function(){
"use strict";
return function(n){
var e=new Image;
e.src=n;
};
});define("appmsg/weapp_common.js",["biz_wap/utils/ajax.js","biz_wap/jsapi/core.js"],function(e,p,a,n){
"use strict";
function o(e){
return e.indexOf(h)>-1?e:""+e+h;
}
function t(){
var e=navigator.userAgent.match(/MicroMessenger\/(\d+)\.(\d+)\.(\d+)/);
if(e){
var p=Number(e[1]),a=Number(e[2]),n=Number(e[3]);
p>6?w.canJumpOnTap=!0:6===p&&a>5?w.canJumpOnTap=!0:6===p&&5===a&&n>=3&&(w.canJumpOnTap=!0);
}else navigator.userAgent.match(/MicroMessenger\//)||(w.isNonWechat=!0);
r();
}
function r(){
try{
w.appidSnInfo=JSON.parse(window.weapp_sn_arr_json).weapp_card_list;
}catch(e){
w.appidSnInfo=[];
}
if(!w.appidSnInfo||0==w.appidSnInfo.length)return w.getInfoState=1,void i();
for(var p={
__biz:window.biz||"",
mid:window.mid||"",
idx:window.idx||"",
uin:window.uin||"",
key:window.key||"",
pass_ticket:window.pass_ticket||"",
weapp_num:w.appidSnInfo.length
},a={},n={},o=0;o<p.weapp_num;o++){
var t=w.appidSnInfo[o].appid,r=w.appidSnInfo[o].sn;
a[t]?a[t].push(o):(a[t]=[o],p["weapp_appid_"+o]=w.appidSnInfo[o].appid,w.appidSnDict[t]=r),
n[r]?n[r].push(o):(n[r]=[o],p["weapp_sn_"+o]=w.appidSnInfo[o].sn);
}
var c="/mp/appmsg_weapp?action=batch_get_weapp";
for(var s in p)c+="&"+s+"="+encodeURIComponent(p[s]);
l({
url:c,
type:"GET",
dataType:"json",
async:!0,
success:function(e){
try{
if(console.log("weapp_common success:",e),w.appidInfoResp=e,e.base_resp.ret)throw new Error("Fetch weapp info but get ret="+e.base_resp.ret);
w.data={
infoMap:{},
appid:e.appid||"",
appmsg_compact_url:e.appmsg_compact_url||"",
pathArgs:"appid="+encodeURIComponent(e.appid)+(e.appmsg_compact_url?"&appmsg_compact_url="+encodeURIComponent(e.appmsg_compact_url):"")
};
for(var p=e.weapp_info,a=0;a<p.length;a++){
var n=p[a].weapp_appid;
w.data.infoMap[n]=p[a];
}
w.getInfoState=4;
}catch(o){
w.getInfoState=3,w.appidInfoCatchErr=o;
}
i();
},
error:function(){
w.getInfoState=2,i();
}
});
}
function i(){
if(1==w.getInfoState||2==w.getInfoState)for(var e=0,p=w.appInfoErrQueue.length;p>e;e++){
var a=w.appInfoErrQueue[e];
"function"==typeof a&&a({
code:w.getInfoState
});
}else if(3==w.getInfoState)for(var e=0,p=w.appInfoErrQueue.length;p>e;e++){
var a=w.appInfoErrQueue[e];
"function"==typeof a&&a({
code:w.getInfoState,
resp:w.appidInfoResp,
catchErr:w.appidInfoCatchErr
});
}else if(4==w.getInfoState)for(var e=0,p=w.appInfoSucQueue.length;p>e;e++){
var a=w.appInfoSucQueue[e];
"function"==typeof a&&a({
resp:w.appidInfoResp,
data:w.data
});
}
w.appInfoErrQueue=[],w.appInfoSucQueue=[];
}
function c(e){
console.log("getAppidInfo",w),1!=w.getInfoState&&2!=w.getInfoState||"function"!=typeof e.onError?3==w.getInfoState&&"function"==typeof e.onError?e.onError({
code:w.getInfoState,
resp:w.appidInfoResp,
catchErr:w.appidInfoCatchErr
}):4==w.getInfoState&&"function"==typeof e.onSuccess?e.onSuccess({
resp:w.appidInfoResp,
data:w.data
}):("function"==typeof e.onSuccess&&w.appInfoSucQueue.push(e.onSuccess),"function"==typeof e.onError&&w.appInfoErrQueue.push(e.onError)):e.onError({
code:w.getInfoState
});
}
function s(e,p){
var a={
__biz:window.biz||"",
mid:window.mid||"",
idx:window.idx||"",
weapp_appid:e.appid||"",
weapp_sn:w.appidSnDict[e.appid]||"",
path:e.path||""
},n="/mp/appmsg_weapp?action=get_wxa_code";
for(var o in a)n+="&"+o+"="+encodeURIComponent(a[o]);
l({
url:n,
type:"GET",
dataType:"json",
async:!0,
success:function(e){
e.base_resp&&0===e.base_resp.ret?p&&p(e.url):p&&p();
},
error:function(){
p&&p();
}
});
}
function f(e){
if(!e)return"";
var p="",a=e.indexOf("?"),n=w.data&&w.data.pathArgs?w.data.pathArgs:"";
return p=a>=0?e.slice(0,a)+(a>0?".html":"")+e.slice(a)+"&"+n:e+(""!==e?".html?":"?")+n,
p.replace(/&amp;/g,"&");
}
function u(e){
var p="",a=e.indexOf("?");
return p=e.slice(0,a)+(a>0?".html":"")+e.slice(a);
}
function d(e){
e=e||{};
var p;
if(e.options)p=e.options,p.relativeURL&&(p.relativeURL=p.relativeURL.replace(/&amp;/g,"&"),
p.relativeURL.indexOf(".html")<0&&(p.relativeURL=f(p.relativeURL)));else if(e.appid&&(w.data||e.cps_weapp_username)){
var a;
e.cps_weapp_username?(a={},a.weapp_username=e.cps_weapp_username,a.app_version=e.cps_weapp_version):a=w.data.infoMap[e.appid],
a&&(p={
userName:a.weapp_username,
scene:e.scene,
sceneNote:e.sceneNote,
relativeURL:f(e.path)
},void 0!==a.app_version&&(p.appVersion=a.app_version),e.cps_weapp_username&&(p.relativeURL=u(e.path)));
}
p&&(e.privateExtraData&&(p.privateExtraData=e.privateExtraData),e.sourceAppId&&(p.sourceAppId=e.sourceAppId),
p.scene=p.scene||1058,p.appVersion=p.appVersion||1,p.userName=o(p.userName),console.log("weapp257",p),
w.canJumpOnTap?I.invoke("openWeApp",p,function(p){
"system:function_not_exist"===p.err_msg?w.isNonWechat?("function"!=typeof e.beforeNonWechatWarn||e.beforeNonWechatWarn()!==!1)&&_():("function"!=typeof e.beforeJumpBackupPage||e.beforeJumpBackupPage()!==!1)&&m(e.appid):"function"==typeof e.onJsapiCallback&&e.onJsapiCallback(p);
}):w.isNonWechat?("function"!=typeof e.beforeNonWechatWarn||e.beforeNonWechatWarn()!==!1)&&_():("function"!=typeof e.beforeJumpBackupPage||e.beforeJumpBackupPage()!==!1)&&m(e.appid));
}
function m(e){
location.href="https://mp.weixin.qq.com/mp/waerrpage?type=upgrade&appid="+encodeURIComponent(e)+"#wechat_redirect";
}
function _(){
setTimeout(function(){
n("请在微信内打开小程序");
},0);
}
function g(e){
var p={
userNames:[o(e)]
};
I.invoke("preloadMiniProgramContacts",p),I.invoke("preloadMiniProgramEnv",p);
}
var l=e("biz_wap/utils/ajax.js"),I=e("biz_wap/jsapi/core.js"),w={
canJumpOnTap:!1,
isNonWechat:!1,
data:null,
appidInfoResp:null,
appidInfoCatchErr:null,
appInfoSucQueue:[],
appInfoErrQueue:[],
appidSnInfo:[],
appidSnDict:{},
getInfoState:0
},h="@app";
return t(),{
canJumpOnTap:w.canJumpOnTap,
isNonWechat:w.isNonWechat,
getAppidInfo:c,
getAppidCode:s,
appidSnInfo:w.appidSnInfo,
getRelativeURL:f,
jumpUrl:d,
preloadMiniProgram:g
};
});var _extends=Object.assign||function(e){
for(var t=1;t<arguments.length;t++){
var i=arguments[t];
for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n]);
}
return e;
};
define("pages/similar_video_utils.js",["biz_common/tmpl.js","biz_common/dom/event.js","common/utils.js","pages/video_collection/report.js","biz_common/utils/url/parse.js","appmsg/related_article_feedback.js","biz_wap/jsapi/core.js","biz_wap/utils/mmversion.js","common/comm_report.js","pages/similar_video_tpl.html.js"],function(e){
"use strict";
function t(e){
var t=Math.floor(e/60),i=e-60*t;
return 10>i&&(i="0"+i),10>t&&(t="0"+t),t+":"+i;
}
function i(i){
for(var n=e("pages/similar_video_tpl.html.js"),o=0;o<i.length;o++)i[o].formatDuration=t(i[o].duration);
return r.tmpl(n,{
list:i,
reason:[{
value:1,
name:"内容质量低"
},{
value:2,
name:"不看此公众号"
}]
},!1);
}
function n(){
return document.documentElement.scrollTop||document.body.scrollTop;
}
function o(){
for(var e=document.getElementsByClassName("js_related_item"),t=n(),i=0;i<e.length;i++){
var o=e[i];
1*o.getAttribute("data-hasreport")!==1&&o.clientHeight+o.offsetTop>=t+o.clientHeight/2&&o.clientHeight+o.offsetTop<=t+o.clientHeight/2+d.getInnerHeight()&&!function(e,t){
var i=e.getAttribute("data-url"),n=e.getAttribute("data-time"),o=e.getAttribute("data-recalltype");
e.setAttribute("data-hasreport",1),g.report(18832,_extends({
Actiontype:1,
Type:1,
Bizuin:c.getQuery("__biz",i),
Msgid:window.parseInt(c.getQuery("mid",i),10)||0,
Itemidx:window.parseInt(c.getQuery("idx",i),10)||0,
Sendtimestamp:window.parseInt(n)||0,
Pos:t+1,
Recalltype:1*o,
Mmversion:w,
Isreaded:0
},h));
}(o,i);
}
f.size()>0&&v&&"none"!==v.style.display&&1*v.getAttribute("data-hasreport")!==1&&v.clientHeight+v.offsetTop>=t+v.clientHeight/2&&v.clientHeight+v.offsetTop<=t+v.clientHeight/2+d.getInnerHeight()&&!function(e){
e.setAttribute("data-hasreport",1),g.report(18832,_extends({
Actiontype:1,
Type:4,
Bizuin:0,
Msgid:0,
Itemidx:0,
Sendtimestamp:0,
Mmversion:w,
Pos:0
},h));
}(v);
}
function s(e){
f=e.data,f&&f.length&&(_=e.container,b=e.listContainer,b&&(b.innerHTML=i(e.data),
_.style.display="block",v=document.getElementsByClassName("js_more_similar_video"),
e.isOpenVideoChannel&&(v.style.display="block"),a.on(e.container,"tap",".js_similar_video_item",function(t){
var i=t.delegatedTarget,n=i.getAttribute("data-idx"),o=i.getAttribute("data-url");
o=o.replace("#rd","&sessionid="+window.enterid+"&channel_session_id="+c.getQuery("channel_session_id")+"&subscene="+(e.subscene||"")+"&scene="+(e.scene||"")+"#rd");
var s={
url:o,
title:f[n].title,
digest:f[n].digest,
cover:f[n].cover,
pubTime:f[n].publish_time,
duration:f[n].duration,
vid:f[n].vid,
videoWidth:f[n].videoWidth,
videoHeight:f[n].videoHeight,
srcUserName:f[n].srcUserName||f[n].username,
srcDisplayName:f[n].srcDisplayName||f[n].displayname
};
if(g.report(18832,_extends({
Actiontype:2,
Type:1,
Bizuin:c.getQuery("__biz",o),
Msgid:window.parseInt(c.getQuery("mid",o),10)||0,
Itemidx:window.parseInt(c.getQuery("idx",o),10)||0,
Sendtimestamp:window.parseInt(s.pubTime)||0,
Pos:n+1,
Recalltype:1,
Isreaded:0
},h)),e.useSwitchVideo||d.isNativePage()){
if(window.hasChannelTwoTab&&"none"!==document.getElementById("back_tab").style.display){
var r=document.getElementById("back_tab").offsetTop,a=document.createElement("div");
a.setAttribute("class","black_wrp"),a.style.cssText="height: "+r+"px; position:fixed;width: 100%;top:0px;background: black;z-index: 100;",
document.getElementById("js_article").appendChild(a);
}
m.invoke("handleMPPageAction",_extends({
action:"switchVideo",
scene:e.scene,
subscene:e.subscene,
channelSessionId:window.channel_session_id,
landingType:window.isFromVideoChannel?1:2
},s),function(e){
console.log(JSON.stringify(e));
});
}else if(!window.__failConfigWxOpen&&d.isWcSlPage())l.leaveReportNowForSwitchVideo(),
d.loadNewPageKeepingHistoryStackIfSecOpen(s.url);else{
var p=i.getElementsByClassName("js_relate_cover_img")[0],w=window.getComputedStyle(p),_=p.getBoundingClientRect(),b=document.createElement("canvas");
b.style.width=w.width,b.style.height=w.height,b.width=parseFloat(w.width),b.height=parseFloat(w.height);
var v=b.getContext("2d"),y="";
try{
v.drawImage(p,0,0,_.width,_.height),y=b.toDataURL();
}catch(j){
console.error(j);
}
u.isAndroid&&(y=""),m.invoke("openWebViewUseFastLoad",_extends({
scene:e.scene,
item_show_type:5,
openType:0,
subscene:e.subscene,
channelSessionId:window.channel_session_id,
currentInfo:{
url:s.cover,
data:y,
pos:{
x:_.left-parseFloat(w.paddingLeft)-parseFloat(w.borderLeftWidth),
y:_.top-parseFloat(w.paddingTop)-parseFloat(w.borderTopWidth),
width:_.width-parseFloat(w.paddingLeft)-parseFloat(w.paddingRight)-parseFloat(w.borderLeftWidth)-parseFloat(w.borderRightWidth),
height:_.height-parseFloat(w.paddingTop)-parseFloat(w.paddingBottom)-parseFloat(w.borderTopWidth)-parseFloat(w.borderBottomWidth)
}
}
},s),function(e){
console.log(e),e&&e.err_msg&&-1===e.err_msg.indexOf("ok")&&m.invoke("openUrlWithExtraWebview",{
url:s.url,
openType:1
},function(e){
e&&e.err_msg&&-1===e.err_msg.indexOf("ok")&&(window.location.href=s.url);
});
});
}
}),a.on(e.container,"tap",".js_more_similar_video",function(){
g.report(18832,_extends({
Actiontype:2,
Type:4,
Bizuin:0,
Msgid:0,
Itemidx:0,
Sendtimestamp:0,
Pos:0,
Mmversion:w
},h)),m.invoke("launchMiniProgram",{
referrerAppId:"wx792f0292c9a85439",
targetAppId:"wx792f0292c9a85439",
path:"pages/doubleVideos/doubleVideos",
envVersion:"release",
scene:"123"
},function(){});
}),a.on(window,"scroll",o),p.init({
container:_,
biz:window.biz,
mid:window.mid,
idx:window.idx,
vid:c.getQuery("vid",location.href)||window.cgiData.vid,
isVideo:!0,
dislikeCb:function(e){
e.parentNode.removeChild(e);
}
})));
}
var r=e("biz_common/tmpl.js"),a=e("biz_common/dom/event.js"),d=e("common/utils.js"),l=e("pages/video_collection/report.js"),c=e("biz_common/utils/url/parse.js"),p=e("appmsg/related_article_feedback.js"),m=e("biz_wap/jsapi/core.js"),u=e("biz_wap/utils/mmversion.js"),g=e("common/comm_report.js"),w=0;
u.isIOS?w=1:u.isAndroid&&(w=2);
var h={
Bizuin_from:window.biz,
Msgid_from:window.parseInt(window.mid,10)||0,
Itemidx_from:window.parseInt(window.idx,10)||0,
Scene:window.parseInt(window.source,10)||0,
Subscene:window.parseInt(window.subscene,10)||0,
Sessionid:window.sessionid||"",
Enterid:window.parseInt(window.enterid,10)||0,
Useruin:1*window.user_uin,
Mmversion:w,
SharePageType:1
},_=void 0,b=void 0,v=void 0,f=[];
return{
init:s
};
});define("appmsg/set_font_size.js",["biz_wap/utils/mmversion.js","biz_wap/jsapi/core.js","biz_wap/utils/device.js","biz_wap/utils/localstorage.js"],function(t){
"use strict";
function e(t,e){
for(var o=[],i=document.createTreeWalker(t,4);i.nextNode();){
var n=i.currentNode.parentNode,s=n.getAttribute("mp-original-font-size");
s||(s=getComputedStyle(n).fontSize,n.setAttribute("mp-original-font-size",s));
var a=n.getAttribute("mp-original-line-height");
a||(a=getComputedStyle(n).lineHeight,n.setAttribute("mp-original-line-height",a)),
o.push([n,s,a]);
}
o.forEach(function(t){
t[0].style.fontSize=parseFloat(t[1])*e+"px",t[0].style.lineHeight=parseFloat(t[2])*e+"px";
});
}
function o(t){
p||"function"!=typeof t||window.top.__fontScaleChangeCbList__.push(t);
}
function i(t){
a.os.android&&!function(){
var i={
1:.8,
2:1,
3:1.1,
4:1.12,
5:1.125,
6:1.4,
7:1.55,
8:1.65
},n=_.get("__font_scale_back_for_android__")||1;
e(t,n),!p&&(window.top.__fontScaleBackForAndroid__=n),o(function(o){
var s=i[o.fontSize]||1;
e(t,n/s),!p&&(window.top.__fontScaleBackForAndroid__=1/s),_.set("__font_scale_back_for_android__",1/s);
});
}();
}
var n=t("biz_wap/utils/mmversion.js"),s=t("biz_wap/jsapi/core.js"),a=t("biz_wap/utils/device.js"),_=t("biz_wap/utils/localstorage.js"),p=!1;
try{
p=!window.top.document;
}catch(l){
p=!0;
}
return p||window.top.__fontScaleChangeCbList__||(window.top.__fontScaleChangeCbList__=[]),
window.top===window&&s.on("menu:setfont",function(t){
if(n.isIOS&&location.href.match(/fontScale=\d+/))parseFloat(t.fontScale)<=0&&(t.fontScale=100),
a.os.ipad&&a.os.getNumVersion()>=13?(e(document.getElementsByTagName("html").item(0),t.fontScale/100),
window.ipados13_font_scale=t.fontScale):document.getElementsByTagName("html").item(0).style.webkitTextSizeAdjust=t.fontScale+"%";else if(n.isAndroid)s.invoke("setFontSizeCallback",{
fontSize:t.fontSize
});else if(n.isWindows){
var o,i=t.fontGear||2,_=["appmsg_desktop_fontsize_1","appmsg_desktop_fontsize_2","appmsg_desktop_fontsize_3","appmsg_desktop_fontsize_4","appmsg_desktop_fontsize_5","appmsg_desktop_fontsize_6"];
(o=document.body.classList).remove.apply(o,_),document.body.classList.add("appmsg_desktop_fontsize_"+i);
}
window.__fontScaleChangeCbList__.forEach(function(e){
return e(t);
});
}),{
setFontSize:e,
onFontScaleChange:o,
keepNormalFontSizeForAndroid:i
};
});define("appmsg/retry_ajax.js",["biz_wap/utils/ajax.js","biz_wap/jsapi/core.js"],function(require,exports,module,alert){
"use strict";
function Retry_ajax(e){
checkAjaxDo(e),e&&(e.success=function(a){
dealWithSucceed(a,e);
},e.error=function(){
dealWithFailed(e);
}),ajax(e);
}
function checkAjaxDo(e){
var a=isContainExceptLike(e,failedQueue),i=isContainAjax(e,failedQueue);
-1===i&&a>-1&&failedQueue.splice(a,1);
}
function isContainExceptLike(e,a){
var i=-1;
for(var r in a){
var t=a[r];
if(e.url||-1!=e.url.indexOf("&like=")||-1!=t.url.indexOf("&like=")){
if(!(e.url.indexOf("&like=")>-1&&t.url.indexOf("&like=")>-1))continue;
if(removeLikeParam(e.url)!==removeLikeParam(t.url))continue;
}else if(!t.url||t.url!==e.url)continue;
if(e.data&&t.data){
var u=e.data,n=t.data;
if(!isEqualExceptLike(u,n))continue;
}
i=r;
break;
}
return i;
}
function isContainAjax(e,a){
var i=-1;
for(var r in a){
var t=a[r];
if(e.url&&t.url&&e.url==t.url){
if(e.data&&t.data){
var u=e.data,n=t.data;
if(!isEqual(u,n))continue;
}
i=r;
break;
}
}
return i;
}
function removeLikeParam(e){
var a=e.indexOf("&like="),i=e.substring(0,a)+e.substring(a+7);
return i;
}
function isEqualExceptLike(e,a){
var i=Object.getOwnPropertyNames(e),r=Object.getOwnPropertyNames(a);
if(i.length!=r.length)return!1;
for(var t=0;t<i.length;t++){
var u=i[t];
if("like"!==u&&e[u]!==a[u])return!1;
}
return!0;
}
function isEqual(e,a){
var i=Object.getOwnPropertyNames(e),r=Object.getOwnPropertyNames(a);
if(i.length!=r.length)return!1;
for(var t=0;t<i.length;t++){
var u=i[t];
if(e[u]!==a[u])return!1;
}
return!0;
}
function dealWithSucceed(res,obj){
try{
var data=eval("("+res+")");
}catch(e){
var data=!1;
}
if(data&&data.base_resp&&0===data.base_resp.ret){
var findIndex=isContainExceptLike(obj,failedQueue);
findIndex>-1&&failedQueue.splice(findIndex,1);
}else dealWithFailed(obj);
}
function dealWithFailed(e){
var a=isContainExceptLike(e,failedQueue);
if(-1===a){
if(e.failedTimes=1,failedQueue.length>=MAX_QUEUE_LEN)return;
failedQueue.push(e);
}else{
var i=isContainAjax(e,failedQueue);
if(i>-1){
if(failedQueue[a].failedTimes++,e.failedTimes=failedQueue[a].failedTimes,e.failedTimes>MAX_FAILED_TIMES)return void failedQueue.splice(i,1);
}else failedQueue.splice(i,1),e.failedTimes=1,failedQueue.push(e);
}
Retry_ajax(e);
}
var ajax=require("biz_wap/utils/ajax.js"),JSAPI=require("biz_wap/jsapi/core.js"),failedQueue=[],MAX_FAILED_TIMES=2,MAX_QUEUE_LEN=20;
return Retry_ajax;
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
});define("biz_common/dom/class.js",[],function(){
"use strict";
function s(s,a){
return s.classList?s.classList.contains(a):s.className.match(new RegExp("(\\s|^)"+a+"(\\s|$)"));
}
function a(s,a){
s.classList?s.classList.add(a):this.hasClass(s,a)||(s.className+=" "+a);
}
function e(a,e){
if(a.classList)a.classList.remove(e);else if(s(a,e)){
var c=new RegExp("(\\s|^)"+e+"(\\s|$)");
a.className=a.className.replace(c," ");
}
}
function c(c,l){
s(c,l)?e(c,l):a(c,l);
}
return{
hasClass:s,
addClass:a,
removeClass:e,
toggleClass:c
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
});define("a/a_config.js",[],function(){
"use strict";
var e={
ANDROID_APP_PRODUCT_TYPE:12,
IOS_APP_PRODUCT_TYPE:19,
ADD_CONTACT_PRODUCT_TYPE:23,
MINI_GAME_PRODUCT_TYPE:46,
CARD_PRODUCT_TYPE:36,
SHOP_PRODUCT_TYPE:30,
WECHATCARD_PRODUCT_TYPE:47,
BRAND_WECHAT_PRODUCT_TYPE:29,
BRAND_GDT_PRODUCT_TYPE:31
},t={
POS_BOTTOM:0,
POS_MID:4,
POS_SPONSOR:3,
POS_AD_BEFORE_VIDEO:7,
POS_AD_AFTER_VIDEO:9
},o={
AD_DEST_TYPE:0,
OUTER_DEST_TYPE:1,
APPDETAIL_DEST_TYPE:2,
BIZ_DEST_TYPE:3,
APPINFO_PAGE_DEST_TYPE:4,
WECHAT_SHOP_DEST_TYPE:5,
WECHAT_APPLET_DEST_TYPE:6,
LEAF_DEST_TYPE:7,
CANVAS_AD_DEST_TYPE:9
},a=function(){
var e=18e4;
return window.user_uin&&!isNaN(parseInt(window.user_uin,10))&&(parseInt(window.user_uin,10)%10===2||parseInt(window.user_uin,10)%10===3)&&(e=3e4),
console.info("[广告时间缓存实验]",e),e;
}(),_=["openUrlWithExtraWebview","openADCanvas","addContact","profile","getInstallState","installDownloadTask","addDownloadTask","pauseDownloadTask","resumeDownloadTask","queryDownloadTask","launchApplication","writeCommData","adDataReport","downloadAppInternal","wxdownload:progress_change","menu:share:appmessage","menu:share:timeline","menu:share:weibo","menu:share:facebook","menu:general:share","launch3rdApp","addDownloadTaskStraight","sendAppMessage","shareTimeline","getNetworkType","jumpToBizProfile","shareWeibo","shareFB","imagePreview","getBackgroundAudioState","openWeApp","preloadMiniProgramContacts","preloadMiniProgramEnv","calRqt","openCardDetail","batchAddCard","handleMPPageAction","makePhoneCall","getOAID","saveWaid","batchPreloadMiniProgram","onScreenShot","handleAdAction","activity:state_change","getAdIdInfo","onWebPageUrlExposed"],i=["/mp/advertisement_report","/mp/ad_report","/mp/ad_video_report","/mp/jsmonitor","/mp/ad_complaint","/mp/jsreport","/tp/datacenter/report","/mp/getappmsgad","/mp/ad_biz_info"],p=[/(https?:)?\/\/mp\.weixin\.qq\.com\/mp\/advertisement_report/,/(https?:)?\/\/mp\.weixin\.qq\.com\/mp\/ad_report/,/(https?:)?\/\/mp\.weixin\.qq\.com\/mp\/ad_video_report/,/(https?:)?\/\/mp\.weixin\.qq\.com\/mp\/jsmonitor/,/(https?:)?\/\/mp\.weixin\.qq\.com\/mp\/ad_complaint/,/(https?:)?\/\/mp\.weixin\.qq\.com\/mp\/jsreport/,/(https?:)?\/\/mp\.weixin\.qq\.com\/tp\/datacenter\/report/,/(https?:)?\/\/mp\.weixin\.qq\.com\/mp\/getappmsgad/,/(https?:)?\/\/mp\.weixin\.qq\.com\/mp\/ad_biz_info/,/(https?:)?\/\/mp\.weixin\.qq\.com\/tp\/goods_info/,/(https?:)?\/\/mp\.weixin\.qq\.com\/tp\/app_mobile/,/(https?:)?\/\/mp\.weixin\.qq\.com\/tp\/datareport\/report/,/(https?:)?\/\/mp\.weixin\.qq\.com\/promotion\/wxalandpage\/getcanvasinfo/],n="转化按钮",d="广告文案或辅助信息",r={
hint_txt:"创意-20200827_1",
url:"https://ad.weixin.qq.com/guide/196?weixinadkey=59d5cf0b4fbf7d2f66cd90aaa82a5208057512dd06fcb64d7fd57e71ec15945e1744ac499e05a04999381c3bf30c21ca&amp;gdt_vid=wx0clsqxat6lzly601&amp;weixinadinfo=315019981.wx0clsqxat6lzly601.75.1",
type:"0",
rl:"http://ad.wx.com:12638/cgi-bin/click?viewid=AQM1xOr6MFeZmWeZrowCvQcrvQUBUq4o8ER2yFgwF9grPdtUR9bIJQ8laqMAJjGlkGLuVbyABIPX6Eifa2%2FK%2Buq17IIT21tYcUnpeU4VqEEsEQhc5Pa7C7drAvl0Mz30CNepODMXeD%2BEdny8SmmxN7prV78e1L2S6oqhNjrnTqM1t40ZGU84httoAODXEjmE89IX0ncOiP1oTsgm1tYwahSkxN6HLZIb6bhxZrc5ba3mCKMZ5GV4UEyDuQCyySxtA5QTt0eQJJA%2FSgHe79yTxUrzzoGrtlhK0O3HussVeRjKcvLkE6w%2FpQBnropwT%2FmE23RT2bOoyw%2BVCMlWTtk%2Bvxh%2FIOFAmrWHYzDuNkDNRo3um26RD2TFpeyRasbZoFRAV7RA9k4P3REAH4vemxktbNq24rtuF6MFGEcXpcGOD%2FxZJlBmInM7rguFAhRQWvCy3nIpO7knN2rl2DZv%2FcfkuoP4bedzUMcxtrU2Wz%2B82EG9ULHJunGHT%2F%2BcWj%2Bv8n%2Fh9bUtAtk7Fr1HBQdkQ8SbYadhRDWWuSEC2iMfqpMyzNqLltdxhyXxMRpsruPb2p4WoHnSvuGfbnkXIKcDppOTLB38xStPIbbaaR4FC%2B4AOF1UqbtMor9JJQQNz3vspSngY%2F37uYiQXAKNYB2RAB%2BbfoYMSS2VcJvY%2B0lWH3%2BYFTmBs6%2BxixGTJmB4%2FXZZcNs4PgRs6OoIefEnLz%2FvwoAvrs%2FUPotqevoiHfq%2FlLILAzo28D%2FKSU9hOOHXrS4LrUYhK47WKSeoglnagaOZI5kGZa9iBcwj9V6FR4HEml51P9u5xaTOnPZjfEAx5l6BBxTT4379irAZCB2Zfcd6wBU2Eo5p9yXVSH%2FCH8yVAgIEsrJ9oeqpO%2FwozsQ2PkXw%2Bz77B56hYp1zYG7HK%2BCDjx1NSisa6g8PFa72xOb8wpjZ9Lao70oGSWshIjCH4kWfKX0P8uFJc22L%2FZihKj0J%2BqgC1LgiMc6SXmFHdvTSIxTRKm9GImpbVfLTN3xrT%2BGGutwMTfgWta7EDR7d6HXQBA1orNotnnK37GOw1jHud8fzQkfuMN%2F7DO6kW0wAXs4LDMhJpnHi2%2Ba4VjL8Yjh0wmTZkVy4iIPYDmYSAzuJ3aP3cXuGv%2B1JwF%2Fod7hCA6RBYwZN2fXvO5AUo7FdoRr8ssPB7eAiNhcFonMv5%2Bt8L1b7QLoXGlplvxh9Fz669q43xnDsEy8ucOfyush8RiYLPxGj4YFr2gy6%2BAV5u%2FMgZIShq149jRn42%2B%2BnmzPC8JdiiIe4p5Ec7KFFrv%2F302DcKBPI9lQDsC1xWAvIfJcnxC%2FqYgDikLE1SsurxV2PV1icS%2BpU706S2LmnpyAsZw%3D%3D",
apurl:"http://ad.wx.com:12638/cgi-bin/exposure?viewid=AQM1xOr6MFeZmWeZrowCvQcrvQUBUq4o8ER2yFgwF9grPdtUR9bIJQ8laqMAJjGlkGLuVbyABIPX6Eifa2%2FK%2Buq17IIT21tYcUnpeU4VqEEsEQhc5Pa7C7drAvl0Mz30CNepODMXeD%2BEdny8SmmxN7prV78e1L2S6oqhNjrnTqM1t40ZGU84httoAODXEjmE89IX0ncOiP1oTsgm1tYwahSkxN6HLZIb6bhxZrc5ba3mCKMZ5GV4UEyDuQCyySxtA5QTt0eQJJA%2FSgHe79yTxUrzzoGrtlhK0O3HussVeRjKcvLkE6w%2FpQBnropwT%2FmE23RT2bOoyw%2BVCMlWTtk%2Bvxh%2FIOFAmrWHYzDuNkDNRo3um26RD2TFpeyRasbZoFRAV7RA9k4P3REAH4vemxktbNq24rtuF6MFGEcXpcGOD%2FxZJlBmInM7rguFAhRQWvCy3nIpO7knN2rl2DZv%2FcfkuoP4bedzUMcxtrU2Wz%2B82EG9ULHJunGHT%2F%2BcWj%2Bv8n%2Fh9bUtAtk7Fr1HBQdkQ8SbYadhRDWWuSEC2iMfqpMyzNqLltdxhyXxMRpsruPb2p4WoHnSvuGfbnkXIKcDppOTLB38xStPIbbaaR4FC%2B4AOF1UqbtMor9JJQQNz3vspSngY%2F37uYiQXAKNYB2RAB%2BbfoYMSS2VcJvY%2B0lWH3%2BYFTmBs6%2BxixGTJmB4%2FXZZcNs4PgRs6OoIefEnLz%2FvwoAvrs%2FUPotqevoiHfq%2FlLILAzo28D%2FKSU9hOOHXrS4LrUYhK47WKSeoglnagaOZI5kGZa9iBcwj9V6FR4HEml51P9u5xaTOnPZjfEAx5l6BBxTT4379irAZCB2Zfcd6wBU2Eo5p9yXVSH%2FCH8yVAgIEsrJ9oeqpO%2FwozsQ2PkXw%2Bz77B56hYp1zYG7HK%2BCDjx1NSisa6g8PFa72xOb8wpjZ9Lao70oGSWshIjCH4kWfKX0P8uFJc22L%2FZihKj0J%2BqgC1LgiMc6SXmFHdvTSIxTRKm9GImpbVfLTN3xrT%2BGGutwMTfgWta7EDR7d6HXQBA1orNotnnK37GOw1jHud8fzQkfuMN%2F7DO6kW0wAXs4LDMhJpnHi2%2Ba4VjL8Yjh0wmTZkVy4iIPYDmYSAzuJ3aP3cXuGv%2B1JwF%2Fod7hCA6RBYwZN2fXvO5AUo7FdoRr8ssPB7eAiNhcFonMv5%2Bt8L1b7QLoXGlplvxh9Fz669q43xnDsEy8ucOfyush8RiYLPxGj4YFr2gy6%2BAV5u%2FMgZIShq149jRn42%2B%2BnmzPC8JdiiIe4p5Ec7KFFrv%2F302DcKBPI9lQDsC1xWAvIfJcnxC%2FqYgDikLE1SsurxV2PV1icS%2BpU706S2LmnpyAsZw%3D%3D",
traceid:"wx0clsqxat6lzly601",
group_id:"wx0clsqxat6lzly600_wx0clsqxat6lzly601",
ticket:"",
pt:2,
image_url:"http://wxsnsdythumb.wxs.qq.com/141/20204/snscosdownload/SH/reserved/5f4604790009bfd700000000b3679d090000008d00004eec?m=1c9e9086c11018ef774e28ee3b744a67&amp;ck=1c9e9086c11018ef774e28ee3b744a67",
ad_desc:"",
biz_appid:"wx69618ae091cf2c76",
biz_info:{
user_name:"gh_1e80bb81a1d2",
nick_name:"微信广告",
head_img:"https://wxa.wxs.qq.com/res/images/bizsdk/preview/wxlogo.png",
biz_uin:3094043316,
signature:"微信广告"
},
pos_type:4,
watermark_type:0,
logo:"",
is_cpm:0,
dest_type:1,
material_width:960,
material_height:540,
ad_width:0,
ad_height:0,
use_new_protocol:2,
product_type:29,
material_type:0,
crt_exp_tid:0,
crt_exp_info:"",
flow_exp_info:"[{&quot;exp_para&quot;:[{&quot;name&quot;:94574,&quot;value&quot;:&quot;gb&quot;},{&quot;name&quot;:100036,&quot;value&quot;:&quot;1&quot;}]}]",
watermark_text:"活动推广",
crt_size:"484",
button_action:"{&quot;button_text&quot;:&quot;"+n+"&quot;,&quot;jump_type&quot;:1,&quot;jump_url&quot;:&quot;https:\\/\\/ad.weixin.qq.com\\/guide\\/196?weixinadkey=bd80a7a5a0e57a3b971b1c372bb06a3748f8f01c44f1bfe1a0aa4fe927e21037fc57ddfe77f5e0648611197259574f4b&amp;gdt_vid=wx0clsqxat6lzly601&amp;weixinadinfo=315019981.wx0clsqxat6lzly601.75.1&quot;,&quot;text_type&quot;:0}",
position_index:21,
shop_image:[],
material_id_list:[],
uxinfo:"315019981|wx0clsqxat6lzly601|289237697|0|1598496949|0|0|9020229299926746||AgI0AyUHOnPeccmEYhaAko8Pr4P95P7Vl6qjqKrxaR/CSGQ3e+STumguP/V43UuYT8o=|315020504",
ext_info:"{}",
ad_token:"bf8463b9a4b692768c820c412bb705a73e8a9dd2c769f22549e4bb5aeaaeccc1358b60b6ce7546f95cfdf7f73d187572",
crt_info:"[{&quot;width&quot;:960,&quot;height&quot;:540,&quot;thumb_url&quot;:&quot;http://wxsnsdythumb.wxs.qq.com/141/20204/snscosdownload/SH/reserved/5f4604790009bfd700000000b3679d090000008d00004eec?m=1c9e9086c11018ef774e28ee3b744a67&amp;ck=1c9e9086c11018ef774e28ee3b744a67&quot;,&quot;image_url&quot;:&quot;http://wxsnsdythumb.wxs.qq.com/141/20204/snscosdownload/SH/reserved/5f4604790009bfd700000000b3679d090000008d00004eec?m=1c9e9086c11018ef774e28ee3b744a67&amp;ck=1c9e9086c11018ef774e28ee3b744a67&quot;,&quot;size&quot;:18323,&quot;image_md5&quot;:&quot;1c9e9086c11018ef774e28ee3b744a67&quot;,&quot;materialId&quot;:&quot;112199640&quot;,&quot;card_info&quot;:{&quot;mp_tag_type&quot;:2,&quot;mp_brandeffect_isopen&quot;:0,&quot;mp_tags&quot;:[&quot;"+d+"&quot;]}}]",
reranking_ext_info:"{&quot;tid&quot;:315020504}",
ext_back_comm:"{&quot;pctr&quot;:0.019999999553}"
};
return{
defaultMidAdData:r,
AD_TYPE:e,
AD_POS:t,
AD_CACHE_TIME:a,
AD_DEST_TYPE:o,
AD_FRAME_DOMAIN:"https://wxa.wxs.qq.com",
INVALID_METHOD_NAME_MSG_PREFIX:"Invalid methodName",
INVALID_METHOD_TYPE_MSG_PREFIX:"Invalid methodType",
INVALID_ARGS_MSG_PREFIX:"Invalid args",
INVALID_REQ_PATH_MSG_PREFIX:"Invalid request path",
AD_IFRAME_HIDE_CLASS:"iframe_ad_dn",
AD_JSAPI_WHITE_LIST:_,
AD_REQ_PATH_WHITE_LIST:i,
AD_WEB_COMPT_REQ_PATH_WHITE_LIST:p,
ORIGIN_VIDEO_VID_PREFIX:"wxv",
AD_VIDEO_END_ACTION:"adVideoEnd",
AD_VIDEO_PLAY_ACTION:"onVideoPlayV2",
AD_PLAY_VIDEO_ACTION:"playVideoV2",
GET_APPMSGAD_READY_STATUS_ACTION:"getAppmsgadReadyStatus",
APPMSGAD_READY_ACTION:"appmsgadReady",
HAS_AD_DATA_QUERY_KEY:"has_ad_data",
GET_AD_DATA_AFTER_VIDEO_ACTION_NAME:"getAdDataAfterVideo",
SET_PAGE_DATA_ACTION_NAME:"setPageDataV2",
SEND_AD_VID_ACTION:"sendAdVid",
GET_AD_VID_ACTION:"getAdVid"
};
});define("biz_common/utils/comm_report.js",[],function(){
"use strict";
var r={
web:{
report:"/cgi-bin/webreport"
},
wap:{
report:"/mp/wapcommreport"
}
},e=function(r,e){
return e=JSON.parse(JSON.stringify(e)),e.log_id=r,console.log("[comm_report] reportjson: ",e),
JSON.stringify(e);
},o=!1,t=[],n={
web:{
report:function(o,t,n,s){
s=s||{},o.post({
url:r.web.report,
data:{
reportjson:e(t,n)
},
async:s.async,
success:s.success,
error:s.error
});
},
leaveReport:function(r,e,s){
if(t.push([r,e,s]),!o){
o=!0;
var c=!1,p=function(){
c||(c=!0,t.forEach(function(r){
n.web.report(r[0],r[1],r[2]);
}));
};
window.addEventListener("beforeunload",p,!1),window.addEventListener("unload",p,!1);
}
}
},
wap:{
report:function(o,t,n,s){
s=s||{},o({
type:"POST",
dataType:"json",
url:r.wap.report,
data:{
reportjson:e(t,n)
},
async:s.async,
success:s.success,
error:s.error
});
}
}
};
return{
report:function(r,e,o,t,s){
n[r].report(e,o,t,s);
},
leaveReport:function(r,e,o,t){
n[r].leaveReport(e,o,t);
},
getUrl:function(e,o){
return r[e][o];
},
getData:function(r,o,t){
var n=e(r,o);
return t&&(n=encodeURIComponent(n)),"reportjson="+n;
}
};
});define("biz_wap/utils/ajax_wx.js",["biz_common/utils/string/html.js","biz_common/utils/url/parse.js","biz_wap/jsapi/core.js","biz_wap/utils/mmversion.js"],function(e){
"use strict";
function t(e){
var t={};
return"undefined"!=typeof uin&&(t.uin=uin),"undefined"!=typeof key&&(t.key=key),
"undefined"!=typeof pass_ticket&&(t.pass_ticket=pass_ticket),"undefined"!=typeof wxtoken&&(t.wxtoken=wxtoken),
"undefined"!=typeof window.devicetype&&(t.devicetype=window.devicetype),"undefined"!=typeof window.clientversion&&(t.clientversion=window.clientversion),
window.biz&&(t.__biz=window.biz),r.getQuery("enterid")&&(t.enterid=r.getQuery("enterid")),
"undefined"!=typeof appmsg_token?t.appmsg_token=appmsg_token:e.indexOf("advertisement_report")>-1&&((new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=68064_13_1&r="+Math.random()),
t.x5=p?"1":"0",t.f="json",r.join(e,t);
}
function n(e,t){
return e.url.indexOf(t)>-1&&-1===e.url.indexOf("action=")&&(!e.data||!e.data.action);
}
function o(e){
var t=a.isIOS&&a.gtVersion("7.0.10",!0)||a.isAndroid&&a.gtVersion("7.0.12",!0);
s.invoke("currentMpInfo",{
userName:window.user_name,
brandName:t&&""===window.nickname?"未命名公众号":window.title,
title:window.msg_title||"",
brandIcon:hd_head_img.replace(/\/0$/,"/132"),
itemShowType:window.item_show_type,
isPaySubscribe:window.isPaySubscribe,
topBarStyle:t?1:0,
topBarShowed:e
},function(){});
}
function i(e){
console.log(e),/^(http:\/\/|https:\/\/|\/\/)/.test(e.url)?/^\/\//.test(e.url)&&(e.url="https:"+e.url):e.url="https://mp.weixin.qq.com/"+e.url.replace(/^\//,""),
e.url+=-1==e.url.indexOf("?")?"?fasttmplajax=1":"&fasttmplajax=1","html"==e.f||-1!=e.url.indexOf("?f=json")&&-1!=e.url.indexOf("&f=json")||(e.url+="&f=json"),
e.notJoinUrl||"html"==e.f||(e.url=t(e.url));
var i=null;
if("object"==typeof e.data){
var p=e.data;
i=[];
for(var d in p)p.hasOwnProperty(d)&&i.push(d+"="+encodeURIComponent(p[d]));
i=i.join("&");
}else i="string"==typeof e.data?e.data:null;
console.log("before request");
var m=1,c=function(e,t){
return s.invoke("request",{
url:e.url,
method:e.type,
data:t,
header:{
Cookie:document.cookie
}
},function(i){
if(console.log("jsapiRequest",i.err_msg),i.err_msg.indexOf(":ok")>-1){
n(e,"/mp/getappmsgext")&&(window.receiveGetAppmsgExt=i.statusCode+"|"+Date.now()),
n(e,"/mp/getappmsgad")&&(window.receiveGetAppmsgAd=i.statusCode+"|"+Date.now());
var p={};
if(i.data){
console.log(e.dataType),console.log(e);
try{
if(p="json"==e.dataType?JSON.parse(i.data):i.data,p&&p.base_resp&&1*p.base_resp.ret!==0&&"undefined"!=typeof window.WX_BJ_REPORT&&window.WX_BJ_REPORT.BadJs&&Math.random()<.001){
var d=e.url;
-1!==url.indexOf("?")&&(d=url.substr(0,url.indexOf("?")),r.getQuery("action",url)&&(d=d+"?action="+r.getQuery("action",url))),
("/mp/getappmsgext"!==d&&"/mp/getappmsgad"!==d||"undefined"!=typeof p.base_resp.ret)&&window.WX_BJ_REPORT.BadJs.report(d,"ret="+p.base_resp.ret,{
mid:window.PAGE_MID,
view:"wap_retcode"
});
}
}catch(u){
return console.error(u),void(e.error&&e.error({},{
type:1,
error:u
}));
}
}
var l={};
try{
l=JSON.parse(i.data);
}catch(u){}
l.base_resp&&"-3"==l.base_resp.ret&&m>0&&(a.isIOS||a.isAndroid&&window.clientversion>27000600)?(m--,
s.invoke("updatePageAuth",{},function(n){
if(console.log("updatePageAuth",n),(new Image).src="https://mp.weixin.qq.com/mp/jsmonitor?idkey=112287_3_1",
n&&n.err_msg&&n.err_msg.indexOf(":ok")>-1){
window.top.pass_ticket=encodeURIComponent(r.getQuery("pass_ticket",n.fullUrl).html(!1).replace(/\s/g,"+")),
e.pass_ticket&&(e.pass_ticket=window.top.pass_ticket),console.warn("[skeleton] updatePageAuth resetTopbar");
var i=a.isIOS&&a.gtVersion("7.0.10",!0);
if("0"===window.item_show_type&&i){
var s=document.documentElement.scrollTop||window.pageYOffset||document.body.scrollTop||0;
o(s>40?!0:!1);
}
c(e,t),(new Image).src="https://mp.weixin.qq.com/mp/jsmonitor?idkey=112287_4_1";
}else e.success&&e.success(p);
})):e.success&&e.success(p);
}else if(i.err_msg.indexOf("no permission")>-1)Ajax(e),(new Image).src="https://mp.weixin.qq.com/mp/jsmonitor?idkey=112287_31_1";else{
e.error&&e.error({},i),(new Image).src="https://mp.weixin.qq.com/mp/jsmonitor?idkey=112287_32_1";
var w=.001;
if(Math.random()<w){
var f="request: "+JSON.stringify(e.type)+" "+JSON.stringify(e.url)+" ;;;; cookie: "+JSON.stringify(document.cookie)+" ;;;; data: "+JSON.stringify(t)+" ;;;; resp: "+JSON.stringify(i);
(new Image).src="https://badjs.weixinbridge.com/badjs?id=226&level=4&msg="+encodeURIComponent(f)+"&uin="+encodeURIComponent(window.uin)+"&from="+encodeURIComponent(window.location.href);
}
}
e.complete&&e.complete();
});
};
return n(e,"/mp/getappmsgext")&&(window.startGetAppmsgExtTime=Date.now()),n(e,"/mp/getappmsgad")&&(window.startGetAppmsgAdTime=Date.now()),
c(e,i);
}
e("biz_common/utils/string/html.js");
var r=e("biz_common/utils/url/parse.js"),s=e("biz_wap/jsapi/core.js"),a=e("biz_wap/utils/mmversion.js"),p=-1!=navigator.userAgent.indexOf("TBS/");
return{
ajax:i,
joinUrl:t
};
});define("biz_wap/utils/wapsdk.js",["biz_common/utils/wxgspeedsdk.js","biz_wap/utils/jsmonitor_report.js"],function(s){
"use strict";
function e(s){
var e=.001;
"number"==typeof s.sample&&(e=s.sample);
var i=Math.random();
e>i&&n.saveSpeeds(s);
}
function i(s){
var e=s.sample||.001,i=Math.random();
e>i&&n.setBasicTime(s);
}
function t(){
n.send();
}
function a(s){
var s=s||[];
if(!s.length){
var e=s;
s=[],s.push(e);
}
for(var i=0;i<s.length;i++){
var e=s[i],t=e.id,a=e.key,n=e.value||1;
void 0!==t&&void 0!==a&&o.setSum(t,a,n);
}
}
var n=s("biz_common/utils/wxgspeedsdk.js"),o=s("biz_wap/utils/jsmonitor_report.js");
return{
saveSpeeds:e,
setBasicTime:i,
send:t,
jsmonitor:a
};
});define("pages/video_like.html.js",[],function(){
return'<div class="wrp_video_continue" aria-hidden="true">\n    <div class="wrp_video_continue_inner">\n        <div class="tit_desc"><span>以下视频将跳到腾讯视频播放</span></div>\n        <dl id="like_info_dd" class="dl_video_continue">  \n            <# for(var i=0,il=like.length;i<il;i++){ #>\n            <dd class="dd_continue_inner" >\n            <# var a=like[i]; #>\n            <ul class="js_video_list video_list">\n                <# for(var j=0,jl=a.length;j<jl;j++){ #>\n                <# var d=a[j]; #>\n                <li data-id="<#=d.id#>" data-id_type="<#=d.id_type#>" data-alginfo="<#=d.alginfo#>" data-pcurl="<#=d.playurl#>" class="video_item clearfix">\n                <a href="javascript:;" class="inner_item">\n                    <img  class="cover" src="" back_src="<#=d.pic3url#>"/>\n                    <div class="desc">\n                        <#=d.title#>\n                    </div>\n                </a>\n                </li> \n                <# } #>\n            </ul>\n            </dd>\n            <# } #> \n        </dl>\n        <div class="continue_opr"><a href="javascript:;" class="btn_replay js_replay" aria-hidden="true"><i class="icon_replay"></i>重新播放</a></div>\n        <div id="like_title" class="continue_nav">\n            <# for(var i=0,il=like.length;i<il;i++){ #>\n            <span class="nav_dot <# if(i==cur){ #>current<# } #>"></span>\n            <# } #>\n        </div>\n        <div id="end_download" class="inner_app_download_container" style="display:none;">\n            <div class="inner_app_download_bd js_progress_main" style="display:table-cell;">\n                <p class="inner_app_download_tips">正在下载腾讯视频，马上就能看哟</p>\n                <div class="app_download_progress_wrp">\n                    <div class="app_download_progress js_progress" style="width:50%"></div>\n                </div>\n            </div>\n            <div class="inner_app_download_bd success js_suc_main" style="display:none;">\n                <p class="inner_app_download_tips js_suc_text">安装完成后，点击以上视频播放</p>\n            </div>\n        </div>\n    </div>\n</div>\n\n';
});define("pages/slider.js",["biz_wap/zepto/zepto.js"],function(t){
"use strict";
function i(t){
this.opt={
titleId:"",
titleTag:"",
contentId:"",
contentTag:"",
className:"current",
autoLag:5e3,
backAttr:"back_src",
stopMoveEvent:!0,
func:function(){}
},n(this.opt,t),this._g={
diffX:0,
diffY:0,
ratio:1,
current:0,
_imgs:[],
_cont:[],
oContent:null,
perWidth:0,
minX:0,
maxX:0,
_tabs:[],
xStyle:"translate3d(0, 0, 0)",
isMoving:!1
},this._init();
}
function n(t,i){
for(var n in i)t[n]=i[n];
}
return t("biz_wap/zepto/zepto.js"),i.prototype={
_init:function(){
{
var t=this,i=t.opt;
t._g;
}
i.contentId&&(this._initContent(),this._bindEvent()),this._setAuto();
},
_initContent:function(){
var t=this,i=t.opt,n=t._g;
n.oContent=$("#"+i.contentId),n.perWidth=n.oContent.width(),n.oContent.find(i.contentTag).each(function(){
var t=$(this),i=t[0].style;
i.width=n.perWidth+"px",i.visibility="hidden",i["float"]="left",n._cont.push(t);
}),n.totalWidth=n.perWidth*n._cont.length,n.maxX=n.perWidth/4,n.minX=-n.totalWidth+n.perWidth-n.maxX;
var o=n.oContent[0].style;
if(o.width=n.totalWidth+"px",o.webkitTransform=n.xStyle,o.transform=n.xStyle,i.titleId){
n.oTitle=$("#"+i.titleId);
var e=0;
n.oTitle.find(i.titleTag).each(function(){
var t=$(this);
t.attr("index",e++),n._tabs.push(t);
});
}
this._showItem(n.current);
},
_bindEvent:function(){
var t=this,i=(t.opt,t._g);
i.oContent.on("touchstart",function(t){
if(!i.isMoving){
var n=t.touches[0];
i.x=n.clientX,i.y=n.clientY;
}
}).on("touchmove",function(n){
var o=n.touches[0],e=o.clientX-i.x,s=o.clientY-i.y;
Math.abs(e)>Math.abs(s)&&(t._stopAuto(),n.preventDefault(),n.stopPropagation(),i.diffX=e,
t._moveWrapper());
}).on("touchend",function(){
i.isMoving||(t._slideTo(),t._setAuto());
}).on("touchcancel",function(){
i.isMoving||(t._slideTo(),t._setAuto());
});
},
_moveWrapper:function(){
var t=(this.opt,this._g),i=-t.current*t.perWidth+t.diffX;
i>t.maxX?i=t.maxX:i<t.minX&&(i=t.minX);
var n="translate3d("+i+"px, 0, 0)",o=t.oContent[0].style;
o.webkitTransform=n,o.transform=n;
},
_slideTo:function(t){
var i,n=(this.opt,this._g),o=n.current;
if("undefined"!=typeof t)o=t,i=-n.ratio;else{
var e=parseInt(n.diffX/n.perWidth),s=n.diffX%n.perWidth;
i=Math.abs(s)/s*1,o-=e,Math.abs(s)>70&&(o-=i);
}
o>n._cont.length-1?o=n._cont.length-1:0>o&&(o=0);
for(var a=Math.abs(n.current-o),r=0;a>r;r++)this._showItem(n.current-i);
n.current=o,0==n.current?n.ratio=1:n.current==n._cont.length-1&&(n.ratio=-1),n.diffX=0,
this._animateTo(),this._setAuto();
},
_animateTo:function(){
{
var t=(this.opt,this._g);
-t.current*t.perWidth;
}
t.isMoving=!0,this._addAnimation(),this._moveWrapper(),setTimeout(function(){
t.isMoving=!1;
var i=t.oContent[0].style;
i.transition="",i.webkitTransition="";
},300);
},
_addAnimation:function(){
var t="all 0.3s ease",i=this._g.oContent[0].style;
i.transition=t,i.webkitTransition=t;
},
_showItem:function(t){
var i=this.opt,n=this._g;
if(!(0>t||t>n._cont.length)){
if(n._cont[t]&&n._imgs[t]!==!0&&(n._cont[t][0].style.visibility="visible",$(n._cont[t]).find("img").each(function(){
var t=$(this);
t.attr("src",t.attr(i.backAttr));
}),n._imgs[t]=!0),n._tabs[t]){
for(var o=0,e=n._tabs.length;e>o;o++)o!=t&&n._tabs[o].removeClass(i.className);
n._tabs[t].addClass(i.className);
}
i.func(t);
}
},
_setAuto:function(t){
var i=this,n=i.opt,o=i._g;
this._stopAuto(),t!==!0||o.isMoving?o.autoIntr=setInterval(function(){
o.isMoving||i._slideTo(o.current+1*o.ratio);
},n.autoLag):i._slideTo(o.current+1*o.ratio);
},
_stopAuto:function(){
!!this._g.autoIntr&&clearInterval(this._g.autoIntr);
}
},i;
});define("pages/app_open.js",["pages/version4video.js","biz_wap/jsapi/app.js","biz_wap/jsapi/core.js"],function(o,a,n,e){
"use strict";
function t(o){
this._o={
pc_open_url:"",
packageUrl:"",
packageName:"",
wp_open_url:"",
wp_download_url:"",
ios_open_url:"",
android_open_url:"",
ios_download_url:"",
android_download_url:"",
android_md5:"",
task_name:"",
autoInstall:!0,
download_fail_callback:function(){},
download_remove_callback:function(){},
check_downloading_callback:function(){},
final_fail_callback:function(){},
before_open_callback:function(){},
beforeDownload:function(){},
download_start_callback:function(){},
download_complete_callback:function(){}
},this._g={},l(this._o,o);
}
function d(o){
r.installDownloadTask({
download_id:o
},function(){});
}
function l(o,a){
for(var n in a)o[n]=a[n];
}
function i(){
return w.system;
}
function s(o){
"function"==typeof o.callback&&("ios"==w.system&&o.packageUrl||"android"==w.system&&o.packageName?r.getInstallState({
packageUrl:o.packageUrl||"",
packageName:o.packageName||""
},function(a){
var n=a.err_msg;
o.callback(n.indexOf("get_install_state:yes")>-1?!0:!1);
}):o.callback(!1));
}
var _=o("pages/version4video.js"),c=_.device,r=o("biz_wap/jsapi/app.js"),p=o("biz_wap/jsapi/core.js"),w={
system:"other",
inWechat:c.inWechat,
windowWechat:/WindowsWechat/i.test(navigator.userAgent),
macWechat:/wechat.*mac os/i.test(navigator.userAgent),
debug:parent.window.location.href.indexOf("&vconsole=1")>=0?!0:!1
};
return function(){
w.system=c.is_ios?"ios":c.is_android?"android":c.is_wp?"wp":c.is_pc?"pc":"other";
}(),t.prototype._checkInstallState=function(){
var o=this,a=this._o,n=this._g;
"ios"==w.system&&a.packageUrl||"android"==w.system&&a.packageName?r.getInstallState({
packageUrl:a.packageUrl||"",
packageName:a.packageName||""
},function(a){
var e=a.err_msg;
e.indexOf("get_install_state:yes")>-1?(n.installed=!0,o._openApp()):(n.installed=!1,
o._downloadApp());
}):"wp"==w.system&&a.wp_open_url&&a.wp_download_url?o._openWpApp():a.final_fail_callback.call(o);
},t.prototype._openApp=function(){
function o(o){
p.invoke("launchApplication",{
schemeUrl:o
},function(n){
w.debug&&parent.window.console.log("launchApplication res:"+JSON.stringify(n)),/:ok$/.test(n.err_msg)||a._jumpUrl(o);
});
}
var a=this,n=this._o;
"ios"==w.system&&n.ios_open_url?(n.before_open_callback.call(this,{
type:5
}),o(n.ios_open_url)):"android"==w.system&&n.android_open_url&&(n.before_open_callback.call(this,{
type:3
}),o(n.android_open_url));
},t.prototype._jumpUrl=function(o){
w.inWechat?w.windowWechat||w.macWechat?window.location.href=o:p.invoke("openUrlWithExtraWebview",{
url:o,
openType:1
},function(a){
-1==a.err_msg.indexOf("ok")&&(window.location.href=o);
}):window.location.href=o;
},t.prototype._downloadApp=function(){
var o=this._o,a=this._g;
"ios"==w.system&&o.ios_download_url?(o.before_open_callback.call(this,{
type:4
}),this._jumpUrl(o.ios_download_url)):"android"==w.system&&o.android_download_url&&o.android_md5&&("undefined"!=typeof a.download_id?this._checkDownloadAndroidApp():(o.before_open_callback.call(this,{
type:2
}),this._downloadAndroidApp()));
},t.prototype._openWpApp=function(){
var o=this._o,a=document.createElement("iframe"),n=(new Date).valueOf();
a.style.display="none",a.src=o.wp_open_url,document.body.appendChild(a),setTimeout(function(){
var a=(new Date).valueOf();
1550>a-n&&(window.location.href=o.wp_download_url);
},1500);
},t.prototype._checkDownloadAndroidApp=function(){
var o=this,a=this._o,n=this._g;
r.queryDownloadTask({
download_id:n.download_id
},function(e){
return w.debug&&parent.window.console.log("queryDownloadTask res:"+JSON.stringify(e)),
e&&"undefined"!=typeof e.state&&"default"!=e.state?void("download_succ"==e.state?(a.download_complete_callback.call(o,n.download_id),
a.autoInstall&&o._installAndroidApp()):"download_fail"==e.state?o._downloadFail():"downloading"==e.state&&a.check_downloading_callback.call(o,n.download_id)):void o._downloadRemoved();
});
},t.prototype._downloadAndroidApp=function(){
var o=this,a=this._o,n=this._g;
if(n.download_id=void 0,a.beforeDownload.call(this)!==!1){
var t={
title:a.title||"",
thumb_url:a.thumb_url||"",
task_name:a.task_name,
task_url:a.android_download_url,
file_md5:a.android_md5
};
w.debug&&parent.window.console.log("addDownloadTask param:"+JSON.stringify(t)),r.addDownloadTask(t,function(t){
w.debug&&parent.window.console.log("addDownloadTask res:"+JSON.stringify(t)),/:ok$/.test(t.err_msg)?(n.download_id=t.download_id,
a.download_start_callback.call(o,n.download_id),o._downloadStateChange()):/:fail_network_not_connected$/.test(t.err_msg)?setTimeout(function(){
e("当前网络不可用，请检查");
},0):/:fail_sdcard_not_ready$/.test(t.err_msg)?setTimeout(function(){
e("sd卡不可用，请检查");
},0):/:fail_sdcard_has_not_enough_space$/.test(t.err_msg)&&setTimeout(function(){
e("手机空间不足，请检查");
},0);
});
}
},t.prototype._downloadStateChange=function(){
var o=this,a=this._o,n=this._g;
r.downloadStateChange(function(e){
return w.debug&&parent.window.console.log("downloadStateChange res:"+JSON.stringify(e)),
e&&"undefined"!=typeof e.download_id&&"download_removed"!=e.state?e.download_id!=n.download_id?void o._downloadRemoved():void("download_succ"==e.state?(a.download_complete_callback.call(o,n.download_id),
a.autoInstall&&o._installAndroidApp()):"download_fail"==e.state&&o._downloadFail()):void o._downloadRemoved();
});
},t.prototype._installAndroidApp=function(){
var o=(this._o,this._g);
"undefined"!=typeof o.download_id&&r.installDownloadTask({
download_id:o.download_id
},function(o){
w.debug&&parent.window.console.log("installDownloadTask res:"+JSON.stringify(o));
});
},t.prototype._downloadRemoved=function(){
var o=this._g,a=this._o;
o.download_id=void 0,a.download_remove_callback.call(this);
},t.prototype._downloadFail=function(){
var o=this._g,a=this._o;
o.download_id=void 0,a.download_fail_callback.call(this);
},t.prototype.open=function(){
var o=this._o;
"pc"==w.system&&o.pc_open_url?(o.before_open_callback.call(this,{
type:1
}),top!=window?parent.window.open(o.pc_open_url):window.open(o.pc_open_url)):!w.inWechat||"ios"!=w.system&&"android"!=w.system&&"wp"!=w.system?o.final_fail_callback.call(this):this._checkInstallState();
},{
install:d,
create:t,
getSystemType:i,
checkInstallState:s
};
});define("pages/video_plugin/sha1.js",[],function(){
"use strict";
var r=function(){
function r(r,t,n){
var e,o,h,p,l,d,v,A,w,F=0,R=[],B=0,U=!1,y=[],T=[],H=!1;
if(n=n||{},e=n.encoding||"UTF8",w=n.numRounds||1,h=c(t,e),w!==parseInt(w,10)||1>w)throw Error("numRounds must a integer >= 1");
if("SHA-1"!==r)throw Error("Chosen SHA variant is not supported");
l=512,d=b,v=g,p=160,A=function(r){
return r.slice();
},o=E(r),this.setHMACKey=function(t,n,a){
var u;
if(!0===U)throw Error("HMAC key already set");
if(!0===H)throw Error("Cannot set HMAC key after calling update");
if(e=(a||{}).encoding||"UTF8",n=c(n,e)(t),t=n.binLen,n=n.value,u=l>>>3,a=u/4-1,t/8>u){
for(n=v(n,t,0,E(r),p);n.length<=a;)n.push(0);
n[a]&=4294967040;
}else if(u>t/8){
for(;n.length<=a;)n.push(0);
n[a]&=4294967040;
}
for(t=0;a>=t;t+=1)y[t]=909522486^n[t],T[t]=1549556828^n[t];
o=d(y,o),F=l,U=!0;
},this.update=function(r){
var t,n,e,a=0,u=l>>>5;
for(t=h(r,R,B),r=t.binLen,n=t.value,t=r>>>5,e=0;t>e;e+=u)r>=a+l&&(o=d(n.slice(e,e+u),o),
a+=l);
F+=a,R=n.slice(a>>>5),B=r%l,H=!0;
},this.getHash=function(t,n){
var e,c,h,l;
if(!0===U)throw Error("Cannot call getHash after setting HMAC key");
switch(h=s(n),t){
case"HEX":
e=function(r){
return a(r,p,h);
};
break;

case"B64":
e=function(r){
return u(r,p,h);
};
break;

case"BYTES":
e=function(r){
return i(r,p);
};
break;

case"ARRAYBUFFER":
try{
c=new ArrayBuffer(0);
}catch(b){
throw Error("ARRAYBUFFER not supported by this environment");
}
e=function(r){
return f(r,p);
};
break;

default:
throw Error("format must be HEX, B64, BYTES, or ARRAYBUFFER");
}
for(l=v(R.slice(),B,F,A(o),p),c=1;w>c;c+=1)l=v(l,p,0,E(r),p);
return e(l);
},this.getHMAC=function(t,n){
var e,c,h,b;
if(!1===U)throw Error("Cannot call getHMAC without first setting HMAC key");
switch(h=s(n),t){
case"HEX":
e=function(r){
return a(r,p,h);
};
break;

case"B64":
e=function(r){
return u(r,p,h);
};
break;

case"BYTES":
e=function(r){
return i(r,p);
};
break;

case"ARRAYBUFFER":
try{
e=new ArrayBuffer(0);
}catch(g){
throw Error("ARRAYBUFFER not supported by this environment");
}
e=function(r){
return f(r,p);
};
break;

default:
throw Error("outputFormat must be HEX, B64, BYTES, or ARRAYBUFFER");
}
return c=v(R.slice(),B,F,A(o),p),b=d(T,E(r)),b=v(c,p,l,b,p),e(b);
};
}
function t(r,t,n){
var e,o,a,u,i,f=r.length;
if(t=t||[0],n=n||0,i=n>>>3,0!==f%2)throw Error("String of HEX type must be in byte increments");
for(e=0;f>e;e+=2){
if(o=parseInt(r.substr(e,2),16),isNaN(o))throw Error("String of HEX type contains invalid characters");
for(u=(e>>>1)+i,a=u>>>2;t.length<=a;)t.push(0);
t[a]|=o<<8*(3-u%4);
}
return{
value:t,
binLen:4*f+n
};
}
function n(r,t,n){
var e,o,a,u,i=[],i=t||[0];
for(n=n||0,o=n>>>3,e=0;e<r.length;e+=1)t=r.charCodeAt(e),u=e+o,a=u>>>2,i.length<=a&&i.push(0),
i[a]|=t<<8*(3-u%4);
return{
value:i,
binLen:8*r.length+n
};
}
function e(r,t,n){
var e,o,a,u,i,f,s=[],c=0,s=t||[0];
if(n=n||0,t=n>>>3,-1===r.search(/^[a-zA-Z0-9=+\/]+$/))throw Error("Invalid character in base-64 string");
if(o=r.indexOf("="),r=r.replace(/\=/g,""),-1!==o&&o<r.length)throw Error("Invalid '=' found in base-64 string");
for(o=0;o<r.length;o+=4){
for(i=r.substr(o,4),a=u=0;a<i.length;a+=1)e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(i[a]),
u|=e<<18-6*a;
for(a=0;a<i.length-1;a+=1){
for(f=c+t,e=f>>>2;s.length<=e;)s.push(0);
s[e]|=(u>>>16-8*a&255)<<8*(3-f%4),c+=1;
}
}
return{
value:s,
binLen:8*c+n
};
}
function o(r,t,n){
var e,o,a,u=[],u=t||[0];
for(n=n||0,e=n>>>3,t=0;t<r.byteLength;t+=1)a=t+e,o=a>>>2,u.length<=o&&u.push(0),
u[o]|=r[t]<<8*(3-a%4);
return{
value:u,
binLen:8*r.byteLength+n
};
}
function a(r,t,n){
var e="";
t/=8;
var o,a;
for(o=0;t>o;o+=1)a=r[o>>>2]>>>8*(3-o%4),e+="0123456789abcdef".charAt(a>>>4&15)+"0123456789abcdef".charAt(15&a);
return n.outputUpper?e.toUpperCase():e;
}
function u(r,t,n){
var e,o,a,u="",i=t/8;
for(e=0;i>e;e+=3)for(o=i>e+1?r[e+1>>>2]:0,a=i>e+2?r[e+2>>>2]:0,a=(r[e>>>2]>>>8*(3-e%4)&255)<<16|(o>>>8*(3-(e+1)%4)&255)<<8|a>>>8*(3-(e+2)%4)&255,
o=0;4>o;o+=1)u+=t>=8*e+6*o?"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(a>>>6*(3-o)&63):n.b64Pad;
return u;
}
function i(r,t){
var n,e,o="",a=t/8;
for(n=0;a>n;n+=1)e=r[n>>>2]>>>8*(3-n%4)&255,o+=String.fromCharCode(e);
return o;
}
function f(r,t){
var n,e=t/8,o=new ArrayBuffer(e);
for(n=0;e>n;n+=1)o[n]=r[n>>>2]>>>8*(3-n%4)&255;
return o;
}
function s(r){
var t={
outputUpper:!1,
b64Pad:"=",
shakeLen:-1
};
if(r=r||{},t.outputUpper=r.outputUpper||!1,!0===r.hasOwnProperty("b64Pad")&&(t.b64Pad=r.b64Pad),
"boolean"!=typeof t.outputUpper)throw Error("Invalid outputUpper formatting option");
if("string"!=typeof t.b64Pad)throw Error("Invalid b64Pad formatting option");
return t;
}
function c(r,a){
var u;
switch(a){
case"UTF8":
case"UTF16BE":
case"UTF16LE":
break;

default:
throw Error("encoding must be UTF8, UTF16BE, or UTF16LE");
}
switch(r){
case"HEX":
u=t;
break;

case"TEXT":
u=function(r,t,n){
var e,o,u,i,f,s=[],c=[],h=0,s=t||[0];
if(t=n||0,u=t>>>3,"UTF8"===a)for(e=0;e<r.length;e+=1)for(n=r.charCodeAt(e),c=[],
128>n?c.push(n):2048>n?(c.push(192|n>>>6),c.push(128|63&n)):55296>n||n>=57344?c.push(224|n>>>12,128|n>>>6&63,128|63&n):(e+=1,
n=65536+((1023&n)<<10|1023&r.charCodeAt(e)),c.push(240|n>>>18,128|n>>>12&63,128|n>>>6&63,128|63&n)),
o=0;o<c.length;o+=1){
for(f=h+u,i=f>>>2;s.length<=i;)s.push(0);
s[i]|=c[o]<<8*(3-f%4),h+=1;
}else if("UTF16BE"===a||"UTF16LE"===a)for(e=0;e<r.length;e+=1){
for(n=r.charCodeAt(e),"UTF16LE"===a&&(o=255&n,n=o<<8|n>>>8),f=h+u,i=f>>>2;s.length<=i;)s.push(0);
s[i]|=n<<8*(2-f%4),h+=2;
}
return{
value:s,
binLen:8*h+t
};
};
break;

case"B64":
u=e;
break;

case"BYTES":
u=n;
break;

case"ARRAYBUFFER":
try{
u=new ArrayBuffer(0);
}catch(i){
throw Error("ARRAYBUFFER not supported by this environment");
}
u=o;
break;

default:
throw Error("format must be HEX, TEXT, B64, BYTES, or ARRAYBUFFER");
}
return u;
}
function h(r,t){
return r<<t|r>>>32-t;
}
function p(r,t){
var n=(65535&r)+(65535&t);
return((r>>>16)+(t>>>16)+(n>>>16)&65535)<<16|65535&n;
}
function l(r,t,n,e,o){
var a=(65535&r)+(65535&t)+(65535&n)+(65535&e)+(65535&o);
return((r>>>16)+(t>>>16)+(n>>>16)+(e>>>16)+(o>>>16)+(a>>>16)&65535)<<16|65535&a;
}
function E(r){
var t=[];
if("SHA-1"!==r)throw Error("No SHA variants supported");
return t=[1732584193,4023233417,2562383102,271733878,3285377520];
}
function b(r,t){
var n,e,o,a,u,i,f,s=[];
for(n=t[0],e=t[1],o=t[2],a=t[3],u=t[4],f=0;80>f;f+=1)s[f]=16>f?r[f]:h(s[f-3]^s[f-8]^s[f-14]^s[f-16],1),
i=20>f?l(h(n,5),e&o^~e&a,u,1518500249,s[f]):40>f?l(h(n,5),e^o^a,u,1859775393,s[f]):60>f?l(h(n,5),e&o^e&a^o&a,u,2400959708,s[f]):l(h(n,5),e^o^a,u,3395469782,s[f]),
u=a,a=o,o=h(e,30),e=n,n=i;
return t[0]=p(n,t[0]),t[1]=p(e,t[1]),t[2]=p(o,t[2]),t[3]=p(a,t[3]),t[4]=p(u,t[4]),
t;
}
function g(r,t,n,e){
var o;
for(o=(t+65>>>9<<4)+15;r.length<=o;)r.push(0);
for(r[t>>>5]|=128<<24-t%32,t+=n,r[o]=4294967295&t,r[o-1]=t/4294967296|0,t=r.length,
o=0;t>o;o+=16)e=b(r.slice(o,o+16),e);
return e;
}
return r;
}(window);
return r;
});