define("common/comm_report.js",["biz_wap/utils/ajax.js","biz_wap/utils/ajax_wx.js","biz_common/utils/comm_report.js","biz_wap/jsapi/leaveReport.js"],function(t){
"use strict";
var o=t("biz_wap/utils/ajax.js"),r=t("biz_wap/utils/ajax_wx.js").joinUrl,e=t("biz_common/utils/comm_report.js"),a=t("biz_wap/jsapi/leaveReport.js");
return{
report:function(t,r,a){
e.report("wap",o,t,r,a);
},
leaveReport:function(t,o){
a.addReport(function(){
return"function"==typeof o&&(o=o()),o?{
reportUrl:r("https://mp.weixin.qq.com"+e.getUrl("wap","report")),
reportData:e.getData(t,o,!0),
method:"POST"
}:!1;
});
}
};
});define("biz_wap/utils/device.js",[],function(){
"use strict";
function s(s){
{
var e=s.match(/MQQBrowser\/(\d+\.\d+)/i),r=s.match(/QQ\/(\d+\.(\d+)\.(\d+)\.(\d+))/i)||s.match(/V1_AND_SQ_([\d\.]+)/),i=s.match(/MicroMessenger\/((\d+)\.(\d+))\.(\d+)/)||s.match(/MicroMessenger\/((\d+)\.(\d+))/),t=s.match(/Mac\sOS\sX\s(\d+[\.|_]\d+)/),n=s.match(/Windows(\s+\w+)?\s+?(\d+\.\d+)/),a=s.match(/Linux\s/),d=s.match(/MiuiBrowser\/(\d+\.\d+)/i),h=s.match(/MI-ONE/),c=s.match(/MI PAD/),w=s.match(/UCBrowser\/(\d+\.\d+(\.\d+\.\d+)?)/)||s.match(/\sUC\s/),u=s.match(/IEMobile(\/|\s+)(\d+\.\d+)/)||s.match(/WPDesktop/),b=s.match(/(ipod).*\s([\d_]+)/i),p=s.match(/(ipad).*\s([\d_]+)/i),v=s.match(/(iphone)\sos\s([\d_]+)/i),m=s.match(/Chrome\/(\d+\.\d+)/),f=s.match(/Mozilla.*Linux.*Android.*AppleWebKit.*Mobile Safari/),l=s.match(/(android)\s([\d\.]+)/i);
s.indexOf("HTC")>-1;
}
if(o.browser=o.browser||{},o.os=o.os||{},window.ActiveXObject){
var M=6;
(window.XMLHttpRequest||s.indexOf("MSIE 7.0")>-1)&&(M=7),(window.XDomainRequest||s.indexOf("Trident/4.0")>-1)&&(M=8),
s.indexOf("Trident/5.0")>-1&&(M=9),s.indexOf("Trident/6.0")>-1&&(M=10),o.browser.ie=!0,
o.browser.version=M;
}else s.indexOf("Trident/7.0")>-1&&(o.browser.ie=!0,o.browser.version=11);
l&&(this.os.android=!0,this.os.version=l[2]),b&&(this.os.ios=this.os.ipod=!0,this.os.version=b[2].replace(/_/g,".")),
p&&(this.os.ios=this.os.ipad=!0,this.os.version=p[2].replace(/_/g,".")),v&&(this.os.iphone=this.os.ios=!0,
this.os.version=v[2].replace(/_/g,".")),n&&(this.os.windows=!0,this.os.version=n[2]),
t&&(this.os.Mac=!0,this.os.version=t[1]),a&&(this.os.Linux=!0),s.indexOf("lepad_hls")>0&&(this.os.LePad=!0),
c&&(this.os.MIPAD=!0),e&&(this.browser.MQQ=!0,this.browser.version=e[1]),r&&(this.browser.MQQClient=!0,
this.browser.version=r[1]),i&&(this.browser.WeChat=!0,this.browser.mmversion=this.browser.version=i[1]),
d&&(this.browser.MIUI=!0,this.browser.version=d[1]),w&&(this.browser.UC=!0,this.browser.version=w[1]||0/0),
u&&(this.browser.IEMobile=!0,this.browser.version=u[2]),f&&(this.browser.AndriodBrowser=!0),
h&&(this.browser.M1=!0),m&&(this.browser.Chrome=!0,this.browser.version=m[1]),this.os.windows&&(this.os.win64="undefined"!=typeof navigator.platform&&"win64"==navigator.platform.toLowerCase()?!0:!1),
(this.os.Mac||this.os.windows||this.os.Linux)&&(this.os.pc=!0);
var g={
iPad7:"iPad; CPU OS 7",
LePad:"lepad_hls",
XiaoMi:"MI-ONE",
SonyDTV:"SonyDTV",
SamSung:"SAMSUNG",
HTC:"HTC",
VIVO:"vivo"
};
for(var O in g)this.os[O]=-1!==s.indexOf(g[O]);
o.os.phone=o.os.phone||/windows phone/i.test(s),this.os.getNumVersion=function(){
return parseFloat(o.os.version,"10");
},this.os.hasTouch="ontouchstart"in window,this.os.hasTouch&&this.os.ios&&this.os.getNumVersion()<6&&(this.os.hasTouch=!1),
o.browser.WeChat&&o.browser.version<5&&(this.os.hasTouch=!1),o.browser.getNumVersion=function(){
return parseFloat(o.browser.version,"10");
},o.browser.isFFCanOcx=function(){
return o.browser.firefox&&o.browser.getNumVersion()>=3?!0:!1;
},o.browser.isCanOcx=function(){
return!(!o.os.windows||!o.browser.ie&&!o.browser.isFFCanOcx()&&!o.browser.webkit);
},o.browser.isNotIESupport=function(){
return!!o.os.windows&&(!!o.browser.webkit||o.browser.isFFCanOcx());
},o.userAgent={},o.userAgent.browserVersion=o.browser.version,o.userAgent.osVersion=o.os.version,
delete o.userAgent.version;
}
var o={};
s.call(o,window.navigator.userAgent);
var e=function(){
var s=window.navigator.userAgent,e=null;
if(o.os.android){
if(o.browser.MQQ&&o.browser.getNumVersion()>=4.2)return!0;
if(-1!=s.indexOf("MI2"))return!0;
if(o.os.version>="4"&&(e=s.match(/MicroMessenger\/((\d+)\.(\d+))\.(\d+)/))&&e[1]>=4.2)return!0;
if(o.os.version>="4.1")return!0;
}
return!1;
}(),r=function(){
var s=document.createElement("video");
if("function"==typeof s.canPlayType){
if("probably"==s.canPlayType('video/mp4; codecs="mp4v.20.8"'))return!0;
if("probably"==s.canPlayType('video/mp4; codecs="avc1.42E01E"')||"probably"==s.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"'))return!0;
}
return!1;
}(),i=function(){
return console.info("[canSupportAutoPlay]",o.os.ios,o.os.getNumVersion()),o.os.ios&&o.os.getNumVersion()<10?!1:!0;
}();
return o.canSupportVideo=r||e,o.canSupportVideoMp4=r,o.canSupportH5Video=e,o.canSupportAutoPlay=i,
o;
});define("biz_common/dom/attr.js",[],function(){
"use strict";
function t(t,e,n){
return"undefined"==typeof n?t.getAttribute(e):t.setAttribute(e,n);
}
function e(t,e,n,r){
t.style.setProperty?(r=r||null,t.style.setProperty(e,n,r)):"undefined"!=typeof t.style.cssText&&(r=r?"!"+r:"",
t.style.cssText+=";"+e+":"+n+r+";");
}
return{
attr:t,
setProperty:e
};
});define("common/utils.js",["biz_common/utils/url/parse.js","biz_wap/jsapi/core.js","biz_wap/utils/wapsdk.js","biz_wap/utils/storage.js","biz_wap/utils/device.js","biz_wap/utils/mmversion.js","biz_wap/jsapi/log.js","biz_wap/utils/jsmonitor_report.js","biz_common/dom/event.js"],function(e){
"use strict";
function t(){
return"1"===i.getQuery("isNativePage")||"2"===i.getQuery("isNativePage");
}
function n(e){
var t=arguments.length<=1||void 0===arguments[1]?50:arguments[1],n=void 0;
return function(){
for(var i=arguments.length,o=Array(i),r=0;i>r;r++)o[r]=arguments[r];
var a=this,s=function(){
n=null,e.apply(a,o);
};
n||(n=setTimeout(s,t));
};
}
var i=e("biz_common/utils/url/parse.js"),o=e("biz_wap/jsapi/core.js"),r=e("biz_wap/utils/wapsdk.js"),a=e("biz_wap/utils/storage.js"),s=e("biz_wap/utils/device.js"),c=e("biz_wap/utils/mmversion.js"),u=e("biz_wap/jsapi/log.js"),g=e("biz_wap/utils/jsmonitor_report.js"),p=e("biz_common/dom/event.js");
try{
"undefined"==typeof parent.window.hasListenMpPageAction&&(parent.window.hasListenMpPageAction=!1),
"undefined"==typeof parent.window.hasListenStateChange&&(parent.window.hasListenStateChange=!1);
}catch(l){}
var d=[],f=[],w=new a("history4secondopen"),h="from",m=!1,_={
status:"loading"
},v=[],y={
isNativePage:t,
isNewNativePage:function(){
return"2"===i.getQuery("isNativePage");
},
isOldNativePage:function(){
return"1"===i.getQuery("isNativePage");
},
__useWcSlPlayer:!1,
isWcSlPage:function(){
return y.__useWcSlPlayer;
},
getPlayerType:function(){
return y.isWcSlPage()?3:t()?2:1;
},
getParam:function(e){
if(!e)return null;
var t=location.href.match(new RegExp("(\\?|&)"+e+"=([^&]+)"));
return t?t[2]:null;
},
insertAfter:function(e,t){
var n=t.parentNode;
n.lastChild===t?n.appendChild(e):n.insertBefore(e,t.nextSibling);
},
getInnerHeight:function(){
var e=window.getInnerHeight&&window.getInnerHeight();
return e||window.innerHeight||document.documentElement.clientHeight;
},
getInnerWidth:function(){
return window.innerWidth||document.documentElement.clientWidth;
},
getScrollTop:function(){
return document.documentElement.scrollTop||window.pageYOffset||document.body.scrollTop;
},
getDocumentHeight:function(){
return document.body.scrollHeight;
},
getElementActualTop:function(e){
var t=e.getBoundingClientRect(),n=t.top-this.getScrollTop();
return n;
},
getElementTop:function(e){
return e.getBoundingClientRect().top;
},
getElementHeight:function(e){
return e.getBoundingClientRect().height;
},
isScrollEnd:function(e){
return this.getScrollTop()+this.getInnerHeight()+e>=this.getDocumentHeight();
},
listenStateChange:function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
f.push(e.cb);
try{
if(parent.window.hasListenStateChange)return;
}catch(t){}
o.on("activity:state_change",function(e){
f.forEach(function(t){
t(e);
});
});
try{
parent.window.hasListenStateChange=!0;
}catch(t){}
},
listenMpPageAction:function(e){
d.push(e);
try{
if(parent.window.hasListenMpPageAction)return;
}catch(t){}
o.on("onMPPageAction",function(e){
d.forEach(function(t){
t(e);
});
});
try{
parent.window.hasListenMpPageAction=!0;
}catch(t){}
},
getIosMainVersion:function(){
var e=navigator.userAgent.toLowerCase().match(/cpu iphone os (.*?) like mac os/);
return e&&e[1]&&parseInt(e[1].split("_")[0],10);
},
report120081:function(e,t){
r.jsmonitor({
id:120081,
key:e,
value:t
});
},
loadNewPageKeepingHistoryStackIfSecOpen:function(e){
window.__second_open__&&"string"==typeof e&&/^https?:\/\/mp.weixin.qq.com\//.test(e)&&w.set(h,location.href,Date.now()+1e4),
location.href=e.replace(/#.*$/,"")+"#wechat_redirect";
},
initNewPageHistoryStackFromSecOpen:function(){
var e=w.get(h);
if(e&&"string"==typeof e&&/^https?:\/\/mp.weixin.qq.com\//.test(e)&&(w.remove(h),
history&&history.replaceState&&history.pushState)){
var t=location.href;
try{
history.replaceState({
__mock_secopen_history_stack_reload__:1
},"",e),history.pushState({
__mock_secopen_history_stack_reload__:1
},"",t);
}catch(n){
console.error("[initNewPageHistoryStackFromSecOpen]",n);
}
}
m||(m=!0,window.addEventListener("popstate",function(e){
e.state&&1===e.state.__mock_secopen_history_stack_reload__&&location.reload();
}));
},
initWebCompt:function(e,t){
(s.os.iphone&&c.isWechat&&c.gtVersion("7.0.14",1)||s.os.android&&c.isWechat&&c.gtVersion("7.0.15",1))&&!function(){
var n=function(){
for(;v.length;){
var e=v.shift();
e(_);
}
};
document.addEventListener("WeixinOpenTagsReady",function(){
_={
status:"ready"
},n();
}),document.addEventListener("WeixinOpenTagsError",function(e){
_={
status:"error",
error:e&&e.detail&&e.detail.errMsg
},n();
}),o.invoke("handleMPPageAction",{
action:"wxConfig",
appid:"wxmpfakeid",
webComptList:e
},function(i){
console.log("wx config web compt result",e,i),u.info("wx config web compt result",e,i),
i&&i.err_msg&&-1===i.err_msg.indexOf(":ok")&&(_={
status:"error",
error:i.err_msg
},n()),"function"==typeof t&&t(i);
});
}();
},
initWebComptForWcSlVideoSharePage:function(){
o.invoke("handleDeviceInfo",{
action:"setOrientation",
orientation:0,
lock:!0
});
var e=function(e){
-1!==e.err_msg.indexOf(":ok")?y.initNewPageHistoryStackFromSecOpen():(window.__failConfigWxOpen=!0,
u.info("failed to config wxopen: res not ok"),g.setSum(221515,s.os.iphone?7:8,1),
window.WX_BJ_REPORT&&window.WX_BJ_REPORT.BadJs&&e&&window.WX_BJ_REPORT.BadJs.report("WcSlPlayer:CfgError",(window.__second_open__?"secopen:":"h5:")+JSON.stringify(e)));
};
if(c.isAndroid){
var t=c.getInner();
t>"27001037"&&"27001060">t||t>="27001100"?y.initWebCompt(["wxOpen","wxAd"],e):c.gtVersion("7.0.15",1)?(y.initWebCompt(["wxAd"]),
window.__failConfigWxOpen=!0,u.info("failed to config wxopen: android version check failed (gt 7.0.15)")):(window.__failConfigWxOpen=!0,
u.info("failed to config wxopen: android version check failed"));
}else c.gtVersion("7.0.15",1)?y.initWebCompt(["wxOpen","wxAd"],e):(window.__failConfigWxOpen=!0,
u.info("failed to config wxopen: ios version check failed"));
},
getWebComptStatus:function(e){
return"function"!=typeof e?_:("loading"===_.status?v.push(e):e(_),!0);
},
debounce:n,
bindDebounceScrollEvent:function(e){
var t=arguments.length<=1||void 0===arguments[1]?window:arguments[1],i=arguments.length<=2||void 0===arguments[2]?50:arguments[2],o=n(e,i);
p.on(t,"scroll",o);
}
};
return y;
});define("biz_wap/jsapi/core.js",["biz_wap/utils/mmversion.js"],function(e,i,n,o){
"use strict";
var t=(e("biz_wap/utils/mmversion.js"),window.__moon_report||function(){}),r=8,d={},a=!1;
try{
d=top.window.document;
}catch(w){
a=!0;
}
var c={},f={
ready:function(e){
var i=function(){
try{
e&&(window.onBridgeReadyTime=window.onBridgeReadyTime||+new Date,e());
}catch(i){
throw t([{
offset:r,
log:"ready",
e:i
}]),i;
}
window.jsapiReadyTime=Date.now();
};
a||"undefined"!=typeof top.window.WeixinJSBridge&&top.window.WeixinJSBridge.invoke?i():d.addEventListener?d.addEventListener("WeixinJSBridgeReady",i,!1):d.attachEvent&&(d.attachEvent("WeixinJSBridgeReady",i),
d.attachEvent("onWeixinJSBridgeReady",i));
},
invoke:function(e,i,n){
this.ready(function(){
return a?!1:"object"!=typeof top.window.WeixinJSBridge?(o("请在微信中打开此链接！"),!1):void top.window.WeixinJSBridge.invoke(e,i,function(i){
try{
if(n){
n.apply(window,arguments);
var o=i&&i.err_msg?", err_msg-> "+i.err_msg:"";
console.info("[jsapi] invoke->"+e+o);
}
}catch(d){
throw t([{
offset:r,
log:"invoke;methodName:"+e,
e:d
}]),d;
}
});
});
},
call:function(e){
this.ready(function(){
if(a)return!1;
if("object"!=typeof top.window.WeixinJSBridge)return!1;
try{
top.window.WeixinJSBridge.call(e);
}catch(i){
throw t([{
offset:r,
log:"call;methodName:"+e,
e:i
}]),i;
}
});
},
on:function(e,i){
this.ready(function(){
return a?!1:"object"==typeof top.window.WeixinJSBridge&&top.window.WeixinJSBridge.on?(c[e]||(c[e]=[]),
c[e].push(i),void(c[e].length>1||top.window.WeixinJSBridge.on(e,function(){
try{
if(c[e]&&c[e].length){
for(var i,n=0;n<c[e].length;n++)i=c[e][n].apply(window,arguments);
return i;
}
}catch(o){
throw t([{
offset:r,
log:"on;eventName:"+e,
e:o
}]),o;
}
}))):!1;
});
}
};
return f;
});define("pages/video_ctrl.js",[],function(){
"use strict";
function i(i){
i=i||window;
var n=i.cgiData;
return n&&2==n.ori_status&&1==n.is_mp_video&&(n.nick_name||n.hit_username)?!0:!1;
}
function n(i){
return i=i||window,!1;
}
function e(){
return!1;
}
function t(){
return-1!=r.indexOf("&dd=1")?!1:"54"==parent.window.appmsg_type?!1:!0;
}
function o(){
var i;
if(parent==window)i=window;else try{
{
parent.window.__videoDefaultRatio;
}
i=parent.window;
}catch(n){
i=window;
}
var e=i.__videoDefaultRatio||16/9;
return"54"==i.appmsg_type?e:e;
}
var r=window.location.href;
return{
showPauseTips:t,
showVideoLike:e,
showVideoDetail:n,
showReprint:i,
getRatio:o
};
});define("pages/video_plugin/video_like.js",["pages/video_plugin/base.js","pages/loadscript.js","biz_common/tmpl.js","pages/slider.js","biz_common/dom/event.js","pages/video_like.html.js"],function(e){
"use strict";
function i(){
this._g={
likePage:0,
likePageSize:3,
likeData:null
};
}
function t(e){
var i="https://sec.video.qq.com/p/like.video/fcgi-bin/like?callback=video_like_callback&otype=json&size=#size#&id=#vid#&openid=#openid#&playright=7&pidx=#pidx#&msgtype=179&tablist=9&account=#account#";
i=i.replace("#size#",e.size||9).replace("#vid#",e.vid||"").replace("#openid#",window.cgiData&&window.cgiData.txvideo_openid?window.cgiData.txvideo_openid:"").replace("#pidx#",e.pidx||0).replace("#account#",e.account||"");
var t=+new Date;
n({
url:i,
callbackName:"video_like_callback",
timeout:3e4,
callback:function(i){
var o=+new Date,n=o-t;
if(!i)return void("function"==typeof e.onError&&e.onError(-1,n));
if(0!=i.ret)return void("function"==typeof e.onError&&e.onError(-2,n));
var r=i.tablist[0],a=r.media_info;
return a&&0!=a.length?void e.onSuc({
data:a,
rtype:r.rtype,
tad:r.tab_id,
c_time:n
}):void("function"==typeof e.onError&&e.onError(-1,n));
},
onerror:function(i){
var o=+new Date,n=o-t;
"function"==typeof e.onError&&e.onError(i,n);
}
});
}
var o=e("pages/video_plugin/base.js"),n=e("pages/loadscript.js"),r=e("biz_common/tmpl.js"),a=e("pages/slider.js"),d=e("biz_common/dom/event.js"),l=e("pages/video_like.html.js");
return o.inherit(i,o.Class),i.prototype.init=function(){
this.player._debug("setBlockEvt showEndContent"),this.setBlockEvt("showEndContent");
},i.prototype.ariaReplayHandler=function(){
return this._replay(),1;
},i.prototype.showEndContentHandler=function(){
this.player._debug("show video like");
var e=this,i=this.player,o=this.player._o,n=this._g;
return n.likeData?(this._afterGetLikeInfo(),1):(n.monitorUid||(n.monitorUid=i._trigger("initMonitor",64728)),
t({
vid:o.vid,
ckey:o.ckey,
account:o.__biz,
uin:o.uin,
onSuc:function(t){
i._trigger("setMonitor",n.monitorUid,{
27:1,
28:1,
30:Math.min(t.c_time,6e4)
}),i._trigger("sendMonitor",n.monitorUid),i.extendMpReportData({
rtype:t.rtype,
tad:t.tad
}),n.likeData=t.data,n.likePage=0,e._afterGetLikeInfo();
},
onError:function(e,t){
switch(i._trigger("setMonitor",n.monitorUid,{
27:1,
29:1,
30:Math.min(t,6e4)
}),1*e){
case-1:
i.extendMpReportData({
videoerror:3
}),i._trigger("setMonitor",n.monitorUid,{
34:1
});
break;

case-2:
i._trigger("setMonitor",n.monitorUid,{
35:1
});
break;

case 500:
i.extendMpReportData({
videoerror:31
}),i._trigger("setMonitor",n.monitorUid,{
31:1
});
break;

case 400:
i.extendMpReportData({
videoerror:32
}),i._trigger("setMonitor",n.monitorUid,{
32:1
});
break;

default:
i.extendMpReportData({
videoerror:33
}),i._trigger("setMonitor",n.monitorUid,{
33:1
});
}
i._trigger("sendMonitor",n.monitorUid),n.likeData=null;
var o=i._g.myPlayer,r=o.getEndDom();
r.html(""),r.hide(),i.__showEndContentHandler();
}
}),1);
},i.prototype._afterGetLikeInfo=function(){
this._showLike(),this._bindLikeEvent();
},i.prototype._showLike=function(){
for(var e=this.player,i=e.getMpReportData(),t=this._g,o=t.likePage,n=t.likePageSize,d=t.likeData,p=-1,_=[],s=0,c=d.length;c>s;s++)s%n==0&&(p++,
_[p]=[]),_[p].push(d[s]);
var g=e._g.myPlayer,f=g.getEndDom();
f.html(r.tmpl(l,{
like:_,
cur:o
},!1)),f.show();
var k=window.parent.window.innerHeight||window.parent.document.documentElement.clientHeight,u=f.height(),v=!0;
u>2*k/3&&(v=!1),new a({
stopMoveEvent:v,
titleId:"like_title",
titleTag:"span",
contentId:"like_info_dd",
contentTag:"dd",
func:function(e){
var t=0,o=e*n;
for(d.length;;o++){
if(t++,t>n)return;
var r=d[o];
if(!r)return;
""==i.like_kv_vid?i.like_kv_vid=r.id:-1==i.like_kv_vid.indexOf(r.id)&&(i.like_kv_vid+="+"+r.id),
""==i.like_kv_alginfo?i.like_kv_alginfo=r.alginfo:-1==i.like_kv_alginfo.indexOf(r.alginfo)&&(i.like_kv_alginfo+="+"+r.alginfo);
}
}
});
},i.prototype._replay=function(){
var e=(this._g,this.player),i=e._g.myPlayer,t=i.getEndDom();
t.html(""),t.hide(),e._trigger("replay");
},i.prototype._bindLikeEvent=function(){
var e=this,i=(this._g,this.player),t=i._g.myPlayer,o=(i.getMpReportData(),t.getEndDom());
d.tap(o.find(".js_replay")[0],function(){
e._replay();
}),d.tap(o.find("dl[id=like_info_dd]")[0],function(e){
var t=e.target||e.srcElement,n=o.find("dl[id=like_info_dd]")[0],r="li";
if(t.nodeName.toLowerCase()!=r)for(;t=t.parentNode;){
if(t==n||t==document.body||t==document){
t=null;
break;
}
if(t.nodeName.toLowerCase()==r)break;
}
if(t){
var a=t.getAttribute("data-id"),d=t.getAttribute("data-id_type"),l=t.getAttribute("data-alginfo"),p=t.getAttribute("data-pcurl");
i._trigger("openapp",{
id:a,
id_type:d,
alginfo:l,
pc_open_url:p,
fromId:760
});
}
});
},i.prototype.beforeOpenAppHandler=function(){
var e=arguments[1].res,i=arguments[1].instance,t=e.type,o=i._o.vid,n=i._o.alginfo;
n&&this._setLikeClickReport(t,o,n);
},i.prototype.getAppDownloadDomHandler=function(){
var e,i=(this._g,this.player),t=i._g.myPlayer;
if(t&&t.isEnd()){
e=$("#end_download");
var n={
main:e,
progress_main:e.find(".js_progress_main"),
download_btn:e.find(".js_download_btn"),
progress_text:e.find(".js_progress_text"),
suc_main:e.find(".js_suc_main"),
progress:e.find(".js_progress"),
suc_text:e.find(".js_suc_text")
};
return{
data:n,
code:7
};
}
return o.BASE_BITSET;
},i.prototype.openAppPcUrlHandler=function(){
var e=arguments[1].instance,i=e._o.vid,t=e._o.alginfo;
t&&this._setLikeClickReport(1,i,t);
},i.prototype._setLikeClickReport=function(e,i,t){
var o=this.player.getMpReportData();
o.like_click_type=e,""==o.like_click_vid?o.like_click_vid=i:-1==o.like_click_vid.indexOf(i)&&(o.like_click_vid+="+"+i),
""==o.like_click_alginfo?o.like_click_alginfo=t:-1==o.like_click_alginfo.indexOf(t)&&(o.like_click_alginfo+="+"+t);
},i;
});define("pages/video_plugin/video_app.js",["pages/iframe_communicate.js","pages/video_plugin/base.js","pages/loadscript.js","biz_wap/jsapi/core.js","pages/video_plugin/sha1.js","biz_common/dom/event.js","pages/app_open.js"],function(o,t,a,n){
"use strict";
function e(){
this._g={
appInfo:{},
downloadStatus:{
progress:0,
status:0,
androidDownloadId:null
}
},this._defineEvent();
}
function i(o){
if(m.loadingMd5!==!0&&"function"==typeof o.callback){
var t=d({
vid:o.vid,
id:o.id,
id_type:o.id_type,
fromId:o.fromId
});
if(t.android_md5||"android"!=m.system)return void o.callback(t);
var a=o.callbackName||"DownInfoCallback",n="https://sec.video.qq.com/p/mcgi.v/commdatav2?cmd=39&confid="+o.fromId+"&platform=aphone&callback="+a;
m.loadingMd5=!0,p({
url:n,
timeout:3e4,
callbackName:a,
callback:function(a){
m.loadingMd5=!1,a&&a.md5&&(t.android_md5=a.md5,m.android_md5=a.md5),o.callback(t);
},
onerror:function(){
m.loadingMd5=!1;
}
});
}
}
function d(o){
var t="video_id="+o.id;
return 1==o.id_type?t="cover_id="+o.id:2==o.id_type&&(t="column_id="+o.id),{
packageUrl:m.packageUrl,
packageName:m.packageName,
ios_open_url:"tenvideo2://?action=5&callback=weixin%3A%2F%2F&sender=%e5%be%ae%e4%bf%a1&"+t+"&from="+o.fromId+"&wxplugopenid="+(window.cgiData&&window.cgiData.txvideo_openid?window.cgiData.txvideo_openid:""),
android_open_url:m.android_open_url.replace("#defaultArg#",t).replace("#fromId#",o.fromId),
wp_open_url:"",
pc_open_url:"http://v.qq.com/page/"+o.vid+".html",
wp_download_url:"",
ios_download_url:"https://itunes.apple.com/cn/app/id458318329?mt=8",
android_md5:m.android_md5,
android_download_url:"http://mcgi.v.qq.com/commdatav2?cmd=4&platform=aphone&confid="+o.fromId,
task_name:"腾讯视频",
title:"腾讯视频",
thumb_url:"http://i.gtimg.cn/qqlive/images/20150608/logo_app.png",
download_fail_callback:function(){
setTimeout(function(){
n("腾讯视频户端下载失败，请检查下载任务");
},0);
},
check_downloading_callback:function(){
setTimeout(function(){
n("正在下载腾讯视频户端，请稍后");
},0);
}
};
}
function s(o){
w.checkInstallState({
callback:o,
packageUrl:m.packageUrl,
packageName:m.packageName
});
}
o("pages/iframe_communicate.js");
var r=o("pages/iframe_communicate.js"),l=o("pages/video_plugin/base.js"),p=o("pages/loadscript.js"),_=o("biz_wap/jsapi/core.js"),c=o("pages/video_plugin/sha1.js"),u=o("biz_common/dom/event.js"),w=o("pages/app_open.js"),m={
debug:window.parent.window.location.href.indexOf("&vconsole=1")>=0?!0:!1,
android_md5:"",
system:w.getSystemType(),
loadingMd5:!1,
packageUrl:"tenvideo2://",
packageName:"com.tencent.qqlive",
sha1_key:"e6673c1cda34653754ab03792617eda636c5ff",
android_open_url:"tenvideo2://?action=5&jumpaction=1000&sender=%e5%be%ae%e4%bf%a1&#defaultArg#&from=#fromId#&wxplugopenid="+(window.cgiData&&window.cgiData.txvideo_openid?window.cgiData.txvideo_openid:"")
};
return l.inherit(e,l.Class),e.prototype.init=function(){
this.setBlockEvt("openapp"),this._removePostmessageListener(),this._addPostmessageListener();
},e.prototype.destroy=function(){
this._removePostmessageListener();
},e.prototype._defineEvent=function(){
var o=this;
this._g._event={
txAppDownloadStatusChanged:function(t){
var a=o._g.downloadStatus,n=t.downloadStatus;
for(var e in n)a.hasOwnProperty(e)&&(a[e]=n[e]);
}
};
},e.prototype._removePostmessageListener=function(){
r.removeListener({
type:"txAppDownloadStatusChanged",
func:this._g._event.txAppDownloadStatusChanged
});
},e.prototype._addPostmessageListener=function(){
r.addListener({
type:"txAppDownloadStatusChanged",
func:this._g._event.txAppDownloadStatusChanged
});
},e.prototype.playerReadyHandler=function(){
var o=this,t=(this._g,this.player),a=this._getDownloadDom();
return u.tap(a.main[0],function(){
t._trigger("openapp",{
vid:t._o.vid,
id:t._o.vid,
fromId:787
});
}),s(function(t){
t&&o._setDownloadStatus({
status:2
});
}),l.BASE_BITSET;
},e.prototype.userplayHandler=function(){
var o=this._getDownloadDom();
return o.main.hide(),l.BASE_BITSET;
},e.prototype.userpauseHandler=function(){
var o=this._g;
if(this._beforeAndroidDownload(!1)!==!1){
this._setDownloadStatus({
progress:0
}),o.downloadTimeoutId&&window.clearTimeout(o.downloadTimeoutId);
var t=this._getDownloadDom();
t.main.show(),this._showDownloadStatus();
}
return l.BASE_BITSET;
},e.prototype.openappHandler=function(){
var o=arguments[1],t=this,a=this.player,n=this._g,e=o.id,d=o.id,s=o.id_type,r=o.alginfo,l=o.pc_open_url,p=n.appInfo[e];
return p?(p.open(),1):(i({
vid:e,
id:d,
id_type:s,
fromId:o.fromId,
callback:function(i){
i.alginfo=r||"",i.vid=e,i.id=d,i.pc_open_url=l||"",i.id_type=s,i.fromId=o.fromId,
i.before_open_callback=function(o){
t._clearCommData(),a._trigger("beforeOpenApp",{
res:o,
instance:this
});
},i.final_fail_callback=function(){
var o=this._o.pc_open_url;
o&&(a._trigger("openAppPcUrl",{
instance:this
}),top!=window?window.parent.window.location.href=o:window.location.href=o);
},i.beforeDownload=function(){
return t._beforeAndroidDownload(!0);
},i.download_start_callback=function(){
t._androidDownloadStart(this._o);
},i.download_complete_callback=function(){
t._androidDownloadComplete();
},i.download_fail_callback=function(){
t._androidDownloadFail(!0);
},i.download_remove_callback=function(){
t._androidDownloadFail(!1);
},i.check_downloading_callback=function(o){
t._androidDownloading(o,!0);
},n.appInfo[e]=new w.create(i),n.appInfo[e].open();
}
}),1);
},e.prototype._writeCommData=function(o){
var t="video_id="+o.id;
1==o.id_type?t="cover_id="+o.id:2==o.id_type&&(t="column_id="+o.id);
var a=new c("SHA-1","TEXT",{
numRounds:1
}),n={
report_id:123,
from:"微信",
start_time_stamp:+new Date,
validate_time_interval:6e5,
action_url:m.android_open_url.replace("#defaultArg#",t).replace("#fromId#",o.fromId)
};
n=JSON.stringify(n),a.update(n+m.sha1_key);
var e=a.getHash("HEX"),i=JSON.stringify({
open_launch_config:{
content:n,
sha1:e
}
});
!!m.debug&&window.parent.window.console.log("data:"+i),this._writeCommDataJsapi({
data:i
});
},e.prototype._clearCommData=function(){
this._writeCommDataJsapi({
data:""
});
},e.prototype._writeCommDataJsapi=function(o){
_.invoke("writeCommData",{
packageName:m.packageName,
data:o.data||""
},function(t){
!!m.debug&&window.parent.window.console.log("writeCommData res:"+JSON.stringify(t)),
/:ok$/.test(t.err_msg)?"function"==typeof o.onSuccess&&o.onSuccess():"function"==typeof o.onError&&o.onError();
});
},e.prototype._androidDownloadFail=function(o){
this._clearCommData(),this._stopDownloadBar(),o===!0&&setTimeout(function(){
n("腾讯视频户端下载失败，请检查检查网络状态或稍后再试");
},0);
},e.prototype._stopDownloadBar=function(){
this._setDownloadStatus({
status:0,
androidDownloadId:null,
progress:0
}),this._resetDownloadBar(!1);
},e.prototype._androidDownloadComplete=function(){
this._completeDownloadBar();
},e.prototype._resetDownloadBar=function(o){
var t=this._g;
t.downloadTimeoutId&&window.clearTimeout(t.downloadTimeoutId);
var a=this._getDownloadDom();
this._updateDownloadBar(),o?a.main.show():a.main.hide(),this._showDownloadStatus();
},e.prototype._downloadProgressTimeout=function(){
var o=this,t=this._g;
t.downloadTimeoutId&&window.clearTimeout(t.downloadTimeoutId),t.downloadTimeoutId=setTimeout(function(){
var t=o._getDownloadStatus();
if(1*t.status===1){
var a=Math.min(t.progress+5,90);
o._updateDownloadBar(a),o._downloadProgressTimeout();
}else 1*t.status===2?o._completeDownloadBar():o._resetDownloadBar(!1);
},500);
},e.prototype._startDownloadBar=function(){
this._setDownloadStatus({
status:1
}),this._resetDownloadBar(!0),this._downloadProgressTimeout();
},e.prototype._androidDownloadStart=function(o){
this._setDownloadStatus({
progress:0,
androidDownloadId:o.id
}),this._startDownloadBar(),this._writeCommData(o);
},e.prototype._beforeAndroidDownload=function(o){
var t=this._getDownloadStatus();
return 1*t.status===1?(this._androidDownloading(t.androidDownloadId,o),!1):1*t.status===2?(this._completeDownloadBar(o),
!1):void 0;
},e.prototype._completeDownloadBar=function(o){
var t=this._g,a=this._getDownloadStatus();
a.androidDownloadId&&o?w.install(a.androidDownloadId):o&&n("腾讯视频户端下载完成，请检查下载任务并安装"),
t.downloadTimeoutId&&window.clearTimeout(t.downloadTimeoutId),this._updateDownloadBar(100),
this._setDownloadStatus({
status:2
});
var e=this._getDownloadDom();
e.main.show(),this._showDownloadStatus();
},e.prototype._showDownloadStatus=function(o){
var t=this._getDownloadStatus();
o=o||this._getDownloadDom(),0==t.status?(o.progress_main.hide(),o.download_btn.show().find(".js_download_text").text("下载"),
o.main.find(".js_installStatus").text("安装"),o.suc_main.hide()):1==t.status?(o.progress_main.show(),
o.main.find(".js_installStatus").text("安装"),o.download_btn.hide(),o.suc_main.hide()):2==t.status&&(o.progress_main.hide(),
o.download_btn.show().find(".js_download_text").text("打开"),o.main.find(".js_installStatus").text("打开"),
o.suc_main.show());
},e.prototype._updateDownloadBar=function(o){
var t=this._getDownloadDom(),a=o||this._getDownloadStatus().progress||0;
this._setDownloadStatus({
progress:a
}),t.progress.css({
width:a+"%"
}),t.progress_text.text(a+"%");
},e.prototype._getDownloadDom=function(){
return this.player._trigger("getAppDownloadDom");
},e.prototype._androidDownloading=function(o,t){
t&&n("正在下载腾讯视频户端，请稍后"),this._startDownloadBar();
},e.prototype._setDownloadStatus=function(o){
r.broadcastMessage({
type:"txAppDownloadStatusChanged",
data:{
downloadStatus:o
}
});
},e.prototype._getDownloadStatus=function(){
return this._g.downloadStatus;
},e;
});define("pages/video_plugin/pause_tips.js",["pages/video_plugin/base.js"],function(s){
"use strict";
function e(){
this._g={};
}
var n=s("pages/video_plugin/base.js");
return n.inherit(e,n.Class),e.prototype.hidePauseTipsHandler=function(){
this.getDownloadDom().main.hide();
},e.prototype.getAppDownloadDomHandler=function(){
var s=(this._g,this),e=this.player,i=e._g.myPlayer;
return i&&!i.isEnd()?{
data:s.getDownloadDom(),
code:7
}:n.BASE_BITSET;
},e.prototype.getDownloadDom=function(){
var s=$("#ing_download_"+this.player._g.myPlayer.id),e={
main:s,
progress_main:s.find(".js_progress_main"),
download_btn:s.find(".js_download_btn"),
progress_text:s.find(".js_progress_text"),
suc_main:s.find(".js_suc_main"),
progress:s.find(".js_progress"),
suc_text:s.find(".js_suc_text")
};
return e;
},e;
});var _extends=Object.assign||function(e){
for(var t=1;t<arguments.length;t++){
var i=arguments[t];
for(var o in i)Object.prototype.hasOwnProperty.call(i,o)&&(e[o]=i[o]);
}
return e;
};
define("pages/qq_video_info.js",["biz_wap/zepto/zepto.js","biz_wap/zepto/event.js","biz_wap/zepto/touch.js","biz_wap/ui/weui.js","biz_common/utils/string/html.js","a/a_utils.js","pages/iframe_communicate.js","biz_wap/jsapi/core.js","biz_wap/utils/mmversion.js","biz_common/utils/url/parse.js","biz_wap/utils/ajax.js","pages/loadscript.js","pages/video_plugin/video_monitor.js","biz_wap/utils/localstorage.js","biz_wap/utils/storage.js","pages/version4video.js","biz_common/dom/event.js","pages/report.js","new_video/plugin/proxy.js","new_video/plugin/ad.js","new_video/plugin/danmu.js","new_video/player.js","new_video/ctl.js","biz_common/tmpl.js","pages/video_error.html.js","pages/create_txv.js","biz_wap/utils/jsmonitor_report.js","biz_wap/jsapi/leaveReport.js","common/comm_report.js","biz_wap/jsapi/log.js"],function(e){
"use strict";
function t(e){
this._o={
bizUserName:"",
bizNickName:"",
videoTitle:"",
headImgUrl:"",
jsapiFullScreen:!0,
canShareVideo:!0,
videoMd5:"",
pauseShowControll:!0,
preview:!1,
isInIframe:!1,
fromid:0,
ori_status:3,
is_mp_video:0,
plugins:[],
oriVid:"",
vid:"",
ckey:"",
ckey_ad:"",
width:0,
height:0,
container:"",
autoplay:!1,
loop:!1,
resume:J.resume,
__biz:"",
uin:"",
mid:"",
idx:"",
comment_id:"",
scene_type:0,
hit_bizuin:"",
hit_vid:"",
totalRange:10,
noAd:!1,
isVideoSharePage:!1,
useWcSlPlayer:!1,
useDanmu:!1,
auto:{
loadRetryTime:0,
isShowTip:!1,
isChangeAuto:!1,
isShowSuc:!1
},
onReady:function(){},
onUserplay:function(){}
},m(this._o,e),(!J.isWechat||!J.isIOS&&!J.isAndroid||J.isIOS&&I.ltVersion("7.0.9",!1)||J.isAndroid&&I.ltVersion("7.0.10",!1)||!this._o.videoMd5)&&(this._o.jsapiFullScreen=!1,
this._o.canShareVideo=!1),this._o.is_mp_video||this._o.useWcSlPlayer||(this._o.pauseShowControll=!1),
!this._o.headImgUrl&&this._o.jsapiFullScreen&&J.isAndroid&&(this._o.headImgUrl="http://mmbiz.qpic.cn/mmbiz/a5icZrUmbV8p5jb6RZ8aYfjfS2AVle8URwBt8QIu6XbGewB9wiaWYWkPwq4R7pfdsFibuLkic16UcxDSNYtB8HnC1Q/0"),
this._o.oriVid=this._o.oriVid||this._o.vid,1!=this._o.ori_status&&2!=this._o.ori_status&&(this._o.ori_status=3),
this._init({
noProxy:this._o.useWcSlPlayer
}),"number"==typeof this._o.leaveReport12710Type&&this._leaveReport12710();
}
function i(e){
function t(o){
var r=Math.floor(Math.max(o.width,o.height));
if(r>3841)switch(1*o.format_id){
case 10002:
o=e.url_info[i["480p"].index],F.setSum(27302,6,1),t(o);
break;

case 10003:
o=e.url_info[i["270p"].index],F.setSum(27302,7,1);
}
return o;
}
for(var i={},o=0;o<e.url_info.length;o++){
var r=e.url_info[o];
switch(1*r.format_id){
case 20003:
J.isWechat&&J.isAndroid&&I.gtVersion("7.0.16",1)&&(i["1080p"]={
index:o
});
break;

case 10002:
i["720p"]={
index:o
};
break;

case 10003:
i["480p"]={
index:o
};
break;

case 10004:
i["270p"]={
index:o
};
}
}
var a=void 0;
if(J.playerStatus&&J.playerStatus.formatId&&1*e.is_mp_video_urgent_state!==1)switch(1*J.playerStatus.formatId){
case 10002:
i["720p"]&&(a=e.url_info[i["720p"].index]);
break;

case 10003:
i["480p"]&&(a=e.url_info[i["480p"].index]);
break;

case 10004:
i["270p"]&&(a=e.url_info[i["270p"].index]);
}
a||(1*e.is_mp_video_urgent_state===1?i["270p"]?a=e.url_info[i["270p"].index]:i["480p"]&&(a=e.url_info[i["480p"].index]):J.isPc||"wifi"==J.networkType?i["720p"]?a=e.url_info[i["720p"].index]:i["480p"]&&(a=e.url_info[i["480p"].index]):i["480p"]?a=e.url_info[i["480p"].index]:i["720p"]&&(a=e.url_info[i["720p"].index])),
a||(a=e.url_info[0]),a=t(a);
var n=Math.floor(a.duration_ms/1e3),s=(parseFloat(a.filesize)/1024/1024).toFixed(2);
return{
formatid:a.format_id,
time:n,
title:a.title||"",
width:a.width,
height:a.height,
file_size:a.filesize,
totalUrl:a.url,
rate:Math.round(a.filesize/1024*8/n),
flow:s,
ori_url_info:e.url_info
};
}
function o(e){
function t(){
S({
type:"GET",
dataType:"json",
timeout:3e4,
url:s,
success:function(e){
if(e&&e.base_resp&&0==e.base_resp.ret){
var t="",o=void 0;
if(e.is_mp_video_delete?(t="该视频已被发布者删除",o=72):e.is_mp_video_forbid?(t="该视频因违规已下架",
o=73):1*e.is_mp_video_transing===1?(t="正在转码，转码完成后可播放",o=78):e.is_mp_video_checking?(t="审核中",
o=75):e.is_mp_video_check_fail?(t="审核失败",o=76):1*e.is_appmsg_unauthorized===1&&(t="该视频因未经授权使用而无法查看",
o=77),t&&"undefined"!=typeof o)return void n({
err_msg:t,
code:o
});
if(e.url_info&&e.url_info.length>0)return void a({
data:i(e)
});
n({
err_msg:W,
code:71
});
}else n({
err_msg:"当前视频不存在，暂无法观看",
code:74
});
},
error:function(e){
var t=void 0;
t=e?e.status>=200&&e.status<400?81:e.status>=400&&e.status<500?82:e.status>=500&&e.status<600?83:0==e.status&&4==e.readyState?84:85:80,
n({
err_msg:W,
code:t
});
}
});
}
var o=e.retry||1,a="function"==typeof e.onSuccess?e.onSuccess:function(){},n=function(i){
return i&&i.code>=80&&i.code<=85&&o>0?(o--,void t()):void("function"==typeof e.onError&&e.onError(i));
},s=["/mp/videoplayer?action=get_mp_video_play_url","&preview=",e.preview?"1":"0","&__biz=",e.__biz,"&mid=",e.mid,"&idx=",e.idx,"&vid=",e.vid,e.auto?"&isauto=true":""].join("");
r(t);
}
function r(e){
window.networkType||J.networkType||J.isPc?e():K?P.invoke("getNetworkType",{},function(t){
J.networkType=Q[t.err_msg]||"fail",("network_type:edge"==t.err_msg||"network_type:wwan"==t.err_msg)&&(t.detailtype||t.subtype)&&(J.networkType=t.detailtype||t.subtype),
e();
}):e();
}
function a(e){
function t(){
D({
url:i,
timeout:3e4,
callbackName:"video_dynamic_callback",
callback:function(t){
var i=+new Date,r=i-o;
t=t||{},"undefined"==typeof t.em&&(t.em=0);
var a=t.em,s=void 0;
if(!R.getQuery("channel_session_id")||61!==t.em&&62!==t.em||S({
type:"POST",
dataType:"json",
timeout:3e4,
url:"/mp/videochannel_profile_page",
data:{
action:"report_tx_video",
vid:e.vid,
status:t.em
},
success:function(e){
console.log(e);
}
}),0==t.em){
if(t.exem>0?a=-4:0==t.exem&&t.vl&&t.vl.vi&&t.vl.vi[0]&&8==t.vl.vi[0].st&&(a=t.preview>0?-5:-3),
0!=a||t.vl&&t.vl.vi&&t.vl.vi[0]||(a=-2),0==a){
var d=t.vl.vi[0];
if(s={
newVid:d.lnk,
time:Math.floor(d.td),
title:d.ti,
width:d.vw,
height:d.vh,
file_size:d.fs,
rate:Math.round(d.fs/1024*8/d.td),
flow:(parseFloat(d.fs)/1024/1024).toFixed(2)
},d.ul&&d.ul.ui&&d.ul.ui[0]){
var _=d.ul.ui[0],c=_.url+d.fn,p=t.fl,g="";
if(p&&p.cnt>0){
for(var u=p.fi,l={},h=0;h<u.length;h++){
var v=u[h];
switch(v.name){
case"msd":
l["270P"]={
index:h
};
break;

case"mp4":
l["480p"]={
index:h
};
}
var f;
J.isPc||"wifi"==J.networkType?l["480p"]?f=u[l["480p"].index]:l["270P"]&&(f=u[l["270P"].index]):l["270P"]?f=u[l["270P"].index]:l["480p"]&&(f=u[l["480p"].index]),
f||(f=u[0]),s.formatid=f.id,g=f.name,s.resolution=(f.cname||"").replace(/^.*;\((:?.*)P\)$/,"$1")||0;
}
s.format=g,s.vt=_.vt,s.totalUrl=[c,-1!=c.indexOf("?")?"&":"?","vkey=",d.fvkey,"&sdtfrom=",U.getsdtfrom(),"&type=",1==_.dt?"tflv":2==_.dt||0==_.dt?"mp4":"","&platform=",U.getPlatformType(),"&fmt=",g,"&level=",d.level,"&br=",d.br,"&sp=",d.sp].join("");
}else a=-2;
}
}else a=t.em;
0==a?(U.getinfoReport({
vid:e.vid,
val:r,
val1:a,
vurl:s.totalUrl
}),e.onSuc({
data:s,
oriData:t,
c_time:r,
ret_code:a
})):(U.getinfoReport({
vid:e.vid,
val:r,
val1:a,
vurl:""
}),e.onError(-2,{
ret_code:a,
c_time:r,
err_msg:n(1*a,1*t.exem,t)
}));
}else e.onError(a,{
ret_code:a,
c_time:r,
err_msg:n(a)
});
},
onerror:function(t){
var i=void 0,r=+new Date,a=r-o;
switch(1*t){
case 400:
i=-22;
break;

case 500:
i=-21;
break;

default:
i=-23;
}
"function"==typeof e.onError&&e.onError(i,{
ret_code:i,
c_time:a,
err_msg:n(-1)
}),U.getinfoReport({
vid:e.vid,
val:a,
val1:i,
vurl:""
});
}
});
}
var i="https://h5vv6.video.qq.com/getvinfo?vid=#vid#&dtype=1&otype=json&callback=video_dynamic_callback&appVer=1&encryptVer=6.3&platform=61001&cKey=#ckey#&sdtfrom=#sdtfrom#";
i=i.replace("#vid#",e.vid).replace("#ckey#",e.ckey).replace("#sdtfrom#",U.getsdtfrom()),
i=i+"&device="+U.getPlatformType()+"&use_proxy_sdk="+(C.isUseProxy()?1:0);
var o=+new Date;
r(t);
}
function n(e,t){
var i="";
switch(1*e){
case-4:
i="因版权限制，该视频不支持播放";
break;

case-5:
i="因版权限制，该视频不支持播放";
break;

case-3:
i="因版权限制，该视频不支持播放";
break;

case 61:
i="当前视频不存在，暂无法观看";
break;

case 62:
i="当前视频已下架，暂无法观看";
break;

case 63:
i="视频加载失败，暂无法观看";
break;

case 65:
i="视频加载失败，暂无法观看";
break;

case 67:
i="视频加载失败，暂无法观看";
break;

case 69:
i="视频格式不支持移动端观看，请在电脑上观看";
break;

case 71:
i="视频加载失败，暂无法观看";
break;

case 73:
i="视频加载失败，暂无法观看";
break;

case 74:
i="视频加载失败，暂无法观看";
break;

case 80:
switch(1*t){
case 1:
i="很抱歉，当前IP地址所在地区暂不支持播放";
break;

case 2:
i="因版权限制，暂不支持播放";
break;

default:
i="因版权限制，该视频不支持播放";
}
break;

case 81:
i="视频加载失败，暂无法观看";
break;

case 82:
i="视频加载失败，暂无法观看";
break;

case 83:
switch(1*t){
case-1:
i=W;
break;

case-2:
i="因版权限制，该视频不支持播放";
break;

default:
i="该片为付费视频，请前往腾讯视频观看";
}
break;

case 84:
i="很抱歉，根据您的IP地址，暂无法播放";
break;

default:
i=W;
}
return i;
}
function s(e){
var t="https://h5vv.video.qq.com/getextinfo?otype=json&callback=video_static_callback&vid="+e.vid;
D({
url:t,
timeout:3e4,
callbackName:"video_static_callback",
callback:function(t){
if(!t||"o"!=t.s||t.vl.cnt<=0)return void("function"==typeof e.onError&&e.onError(-1));
var i=t.vl.vi[0],o={
title:i.title||"视频",
desc:1*i.desc===0?"":i.desc||"",
director:i.director||"",
leading_actor:i.leading_actor||"",
costar:i.costar||"",
time:Math.floor(i.td)||0
};
if(i.pl&&i.pl.cnt>0){
var r=i.pl.pi;
o.p400_300=r[0]?r[0].url:"",o.p140_100=r[1]?r[1].url:"",o.p120_90=r[2]?r[2].url:"",
o.p400_300=o.p400_300&&-1==o.p400_300.indexOf("http")?"http://"+o.p400_300:o.p400_300,
o.p140_100=o.p140_100&&-1==o.p140_100.indexOf("http")?"http://"+o.p140_100:o.p140_100,
o.p120_90=o.p120_90&&-1==o.p120_90.indexOf("http")?"http://"+o.p120_90:o.p120_90;
}
e.onSuc(o);
},
onerror:function(t){
"function"==typeof e.onError&&e.onError(t);
}
});
}
function d(e){
for(var t=1e8,i=0,o=0,r=e.length;r>o;o++)i=(i<<5)+i+e.charCodeAt(o);
return i%t;
}
function _(e,t,i){
return i?"/mp/videoplayer?action=get_mp_video_cover&vid="+e:location.protocol+"//puui.qpic.cn/qqvideo/0/"+e+"/0";
}
function c(e,t,i,o){
var r=x.get(J.cachekey+o);
if(!r)return null;
try{
if(r=JSON.parse(r)||{},!r.time||Date.now()-J.cacheTime>1*r.time)return h(o),r.videoInfo={
status:p(e,t,i,o)
},r;
}catch(a){
return h(o),null;
}
return r=r.videoInfo?r:{
videoInfo:{}
},r.videoInfo.status=p(e,t,i,o),r.videoInfo?r:null;
}
function p(e,t,i,o){
var r=x.get(J.cachekey+e+t+i+o);
if(!r)return null;
try{
r=JSON.parse(r)||{};
}catch(a){
return v(e,t,i,o),null;
}
return r;
}
function g(){
var e=x.get(J.cachekey+"playerStatus");
if(e){
try{
e=JSON.parse(e)||{};
}catch(t){
return void h("playerStatus");
}
e.playerStatus&&(J.playerStatus=e.playerStatus,console.log("get player status cache",J.playerStatus));
}
}
function u(e,t,i,o,r,a){
var n={
dynamicData:r.dynamicData||null,
coverUrl:r.coverUrl||""
};
x.set(J.cachekey+o,JSON.stringify({
time:a||Date.now(),
videoInfo:n
})),r.status&&x.set(J.cachekey+e+t+i+o,JSON.stringify(r.status));
}
function l(){
x.set(J.cachekey+"playerStatus",JSON.stringify({
playerStatus:J.playerStatus
}));
}
function h(e){
x.remove(J.cachekey+e);
}
function v(e,t,i,o){
x.remove(J.cachekey+e+t+i+o);
}
function f(e){
return document.getElementById(e);
}
function m(e,t){
for(var i in t)e[i]=t[i];
}
function y(){
w(),b(),g();
}
function w(){
P.invoke("getNetworkType",{},function(e){
J.networkType=Q[e.err_msg]||"fail",("network_type:edge"==e.err_msg||"network_type:wwan"==e.err_msg)&&(e.detailtype||e.subtype)&&(J.networkType=e.detailtype||e.subtype);
});
}
function b(){
z.on(window,"load",function(){
if(window.__wxjs_is_wkwebview){
J.videoDataLs=new j("video_report_11949");
var e=J.videoDataLs.getData();
for(var t in e){
var i=+new Date;
i-(e[t].exp-J.videoDataLsExpTime)>6e4&&(U.videoreport({
data:e[t].val,
async:!0
}),J.videoDataLs.remove(t));
}
J.neeedTimoutSaveReportData=!0;
}else J.neeedTimoutSaveReportData=!1;
});
var e=function(){
if(!J.hasLeaveReport){
J.hasLeaveReport=!0;
for(var e=0;e<J.videoInstance.length;e++){
var t=J.videoInstance[e];
t.mpVideoReport(),t.destroy();
}
}
};
window.top===window&&H.addReport(e),window.top===window&&H.addSpecificReport("native_data",function(){
var e=J.videoInstance[0];
return{
video_data:{
vid:e._o.vid,
lastPlayedTime:e._g.myPlayer.getCurTime(),
lastPlayedTimeExpiredTime:(Date.now()+J.cacheTime)/1e3
}
};
}),z.on(window,"unload",e);
}
-1!=location.href.indexOf("__td=qq.com")&&(document.domain="qq.com"),e("biz_wap/zepto/zepto.js"),
e("biz_wap/zepto/event.js"),e("biz_wap/zepto/touch.js"),e("biz_wap/ui/weui.js"),
e("biz_common/utils/string/html.js");
var k=e("a/a_utils.js"),T=e("pages/iframe_communicate.js"),P=e("biz_wap/jsapi/core.js"),I=e("biz_wap/utils/mmversion.js"),R=e("biz_common/utils/url/parse.js"),S=e("biz_wap/utils/ajax.js"),D=e("pages/loadscript.js"),M=e("pages/video_plugin/video_monitor.js"),x=e("biz_wap/utils/localstorage.js"),j=e("biz_wap/utils/storage.js"),C=e("pages/version4video.js"),z=e("biz_common/dom/event.js"),U=e("pages/report.js"),V=e("new_video/plugin/proxy.js"),E=e("new_video/plugin/ad.js"),L=e("new_video/plugin/danmu.js"),O=e("new_video/player.js"),A=e("new_video/ctl.js"),q=e("biz_common/tmpl.js"),B=e("pages/video_error.html.js"),W="视频加载失败，请刷新页面重试",N=e("pages/create_txv.js"),F=e("biz_wap/utils/jsmonitor_report.js"),H=e("biz_wap/jsapi/leaveReport.js"),G=(e("common/comm_report.js"),
e("biz_wap/jsapi/log.js")),J={
isUseProxy:C.isUseProxy(),
isWechat:I.isWechat,
isAndroid:I.isAndroid,
isIOS:I.isIOS,
isGoTx:window.parent.window.location.href.indexOf("&_gotx=1")>0,
_debug:window.parent.window.location.href.indexOf("&vconsole=1")>0,
cachekey:"qqmovieStatus_",
videoDataLs:null,
videoDataLsExpTime:864e7,
cacheTime:6e5,
videoInfo:{},
videoInstance:[],
neeedTimoutSaveReportData:!0,
networkType:"",
isPc:/(WindowsNT)|(Windows NT)|(Macintosh)/i.test(navigator.userAgent),
hasLeaveReport:!1,
playerStatus:{
formatId:null
}
},Q={
"network_type:fail":"fail",
"network_type:edge":"2g/3g",
"network_type:wwan":"2g/3g",
"network_type:wifi":"wifi"
};
y(),t.prototype._init=function(e){
function t(){
try{
for(var e=window.parent.document.getElementsByTagName("iframe"),t=0;t<e.length;t++)if(window===e[t].contentWindow&&e[t].adVidFromAppmsg||e[t].adVidFromAppmsg===window.realVid&&window.realVid)return!0;
}catch(i){}
}
e=e||{},this.destroy(),J.videoInstance.push(this),this._report=U.getVideoReportData(),
this._g={
gWidth:e.gWidth||this._o.width,
gHeight:e.gHeight||this._o.height,
playRangeInfo:[],
dynamicErrMsg:"",
hasReportProxyError:e.hasReportProxyError===!0,
noProxy:e.noProxy===!0,
hasDestroy:!1,
reportDataTimeoutId:null,
reportDataLsKey:this._o.vid+"_"+Math.random(),
hasReport:!1,
isShowTx:!1,
dataCount:0,
targetDataCount:2,
coverUrl:"",
cacheStartTs:0,
vInfo:{
status:null,
coverUrl:"",
dynamicData:null,
is_report_pv:!1
},
dom:{
page_content:f("page-content"),
js_mpvedio:f("js_mpvedio")
},
initialData:null
},this._getRatio(),this._initPlugins(e),this._initReportData(),this._defineEvent(),
k.report115849(71);
var i=setInterval(function(){
window.adVidFromAppmsg&&(k.report115849(75),clearInterval(i));
},500),o=setInterval(function(){
t()&&(k.report115849(76),clearInterval(o));
},500);
if(this._isGotoTx()===!0)return void k.report115849(70);
this._getCache(),window.__timelineInitialData?(this._g.initialData=window.__timelineInitialData,
this._setCoverUrl()):this._setCoverUrl(),this._getDynamic(),this._cacheOnPageInvisible();
var r=setInterval(function(){
window.adVidFromAppmsg&&(k.report115849(83),clearInterval(r));
},500),n=setInterval(function(){
t()&&(k.report115849(84),clearInterval(n));
},500);
this._reportH265VideoSupport();
var s=this;
C.isUseAd()&&this._o.noAd!==!0&&(this._g.myAdPlugin=new E({
fromid:this._o.fromid,
videoReportType:this.getReportTypeBySceneType(),
isMpVideo:s._o.is_mp_video,
vid:this._o.vid,
ratio:this._o.ratio,
oriVid:this._o.oriVid,
tmpGetAd:function(e,t){
a({
vid:"b0163rzlnn7",
ckey:s._o.ckey_ad,
onSuc:function(t){
e&&e(t);
},
onError:function(){
t&&t();
}
});
}
})),this._cacheReportData();
},t.prototype._getRatio=function(){
for(var e=this._o.width/this._o.height,t=[4/3,16/9],i=t[0],o=Math.abs(i-e),r=1,a=t.length;a>r;r++){
var n=Math.abs(t[r]-e);
o>n&&(o=n,i=t[r]);
}
this._o.ratio=i;
},t.prototype._isGotoTx=function(){
var e=this,t=this._o;
if((!t.ckey||J.isGoTx)&&!t.is_mp_video){
e._g.isShowTx=!0;
var i=$(this._o.container),o=i.attr("id");
o||(o="js_tx_video_container_"+Math.random(),i.attr("id",o)),N.createTxVideo({
win:window,
containerId:o,
vid:t.vid,
width:e._g.gWidth,
height:e._g.gHeight,
autoplay:!1,
allowFullScreen:!0,
onSuccess:function(t){
e._g.txPlayer=t.player,e._g.dataCount=e._g.targetDataCount,e.videoDataReady();
},
onError:function(){}
});
var r=this._g.monitorUid;
if(1==window.is_login)this._trigger("setMonitor",r,{
38:1
});else if(this._trigger("setMonitor",r,{
39:1
}),1===window.parent.is_login){
var a=JSON.stringify({
tag:"video_player_login_status",
uin:window.user_uin,
bizUin:encodeURIComponent(t.__biz),
appmsgBizUin:encodeURIComponent(window.parent.biz),
appmsgUserUin:window.parent.user_uin,
isSecOpen:!!window.parent.__second_open__
});
F.setLogs({
id:115849,
key:73,
value:1,
lc:1,
log0:a
});
}
return this._trigger("sendMonitor",r),!0;
}
return!1;
},t.prototype._reportH265VideoSupport=function(){
var e=this._g.monitorUid2;
this._trigger("setMonitor",e,{
36:1
});
var t=document.createElement("video");
if("function"==typeof t.canPlayType){
var i=t.canPlayType('video/mp4; codecs="hevc"');
("maybe"==i.toLowerCase()||"probably"==i.toLowerCase())&&this._trigger("setMonitor",e,{
37:1
});
}
this._trigger("sendMonitor",e);
},t.prototype._initPlugins=function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
if(!e.hasInitPlugins){
var t=this._o.plugins||[];
t.push(new M),this._blockPlugin={};
for(var i=0,o=t.length;o>i;++i){
var r=t[i];
r.setPlayer(this),!!r.init&&r.init();
}
this.plugins=t;
}
},t.prototype.isInFullScreen=function(){
return this._g.myPlayer?this._g.myPlayer.isInFullScreen():!1;
},t.prototype._initReportData=function(){
var e=this._report,t=this._o;
e.mid=t.mid,e.__biz=t.__biz,e.idx=t.idx,e.vid=t.vid,e.commentid=t.comment_id,e.scene_type=t.scene_type,
e.auto_play=t.autoplay?1:0,e.fromid=t.fromid,e.hit_bizuin=t.hit_bizuin,e.hit_vid=t.hit_vid,
this._g.monitorUid=this._trigger("initMonitor",64728),this._g.monitorUid2=this._trigger("initMonitor",110644);
},t.prototype._initPlayRangeInfo=function(e){
function t(e,t){
for(var i=[{
start:0,
end:e,
hasReport:!1
}];;){
var o=i[i.length-1];
if(o.end>=t)break;
i.push({
start:o.end,
end:o.end+e,
hasReport:!1
});
}
return i;
}
if(!(e.durationMs<=0)){
var i=this._o.totalRange;
this._g.playRangeInfo=1e3*i>=e.durationMs?t(1e3,e.durationMs):t(Math.ceil(e.durationMs/i),e.durationMs);
}
},t.prototype._reportCurRangeInfo=function(e){
var t=this._g.playRangeInfo;
if(t&&0!==t.length)for(var i=t.length,o=this._o,r=0;i>r;r++){
var a=t[r];
if(a.start<e.curTime&&a.end>=e.curTime){
a.hasReport||(a.hasReport=!0,A.report({
step:14,
vid:o.vid,
hit_bizuin:o.hit_bizuin,
hit_vid:o.hit_vid,
traceid:this._getTraceId(),
orderid:this._getOrderid(),
ori_status:this._getOriStatus(),
type:this.getReportTypeBySceneType(),
fromid:this._getFromid(),
total_range:i,
current_range:r+1,
duration:this._report.duration_ms||t[i-1].end
}));
break;
}
}
},t.prototype._defineEvent=function(){
var e=this;
this._g.event={
afterRemoveLoading:function(){
e._afterRemoveLoading();
}
};
},t.prototype.videoDataReady=function(){
var e=this;
this._g.dataCount===this._g.targetDataCount&&(this._g.isShowTx?this._removeLoading():this._g.vInfo.dynamicData?this._createPlayer({
onLoaded:function(){
setTimeout(function(){
e._removeLoading();
},0);
}
}):(this._removeLoading(),G.error("qq_video_info: failed to create player because no dynamic data")));
},t.prototype._removeLoading=function(){
this._o.isInIframe?(T.addListener({
type:"afterRemoveLoading",
func:this._g.event.afterRemoveLoading
}),T.postMessage({
type:"removeVideoLoading",
data:{
vid:this._o.oriVid
}
})):this._afterRemoveLoading();
},t.prototype._afterRemoveLoading=function(){
if(!this._g.isShowTx&&!this._g.vInfo.dynamicData)if(this._o.is_mp_video){
var e=1;
(72==this._report.videoerror||73==this._report.videoerror)&&(e=2),this._showError(this._g.dynamicErrMsg,e);
}else this._showError(this._g.dynamicErrMsg||"");
T.removeListener({
type:"afterRemoveLoading",
func:this._g.event.afterRemoveLoading
}),this._bindResize(),this._o.onReady.call(this),this._trigger("videoReady");
},t.prototype._setCoverUrl=function(){
function e(){
S({
type:"GET",
dataType:"json",
timeout:3e4,
url:a,
success:function(e){
e&&e.base_resp&&0==e.base_resp.ret&&e.url&&(i._g.coverUrl=e.url),i._g.dataCount++,
i.videoDataReady();
},
error:r
});
}
var t="";
if(this._g.initialData&&this._g.initialData.initialCover?t=this._g.initialData.initialCover:this._o.is_mp_video&&window.__mpVideoCoverUrl?t=window.__mpVideoCoverUrl:this._g.vInfo.coverUrl&&(t=this._g.vInfo.coverUrl),
t)return this._g.coverUrl=t,this._g.dataCount++,void this.videoDataReady();
if(this._g.coverUrl=this._getCover(),!this._o.is_mp_video)return this._g.dataCount++,
void this.videoDataReady();
var i=this,o=1,r=function(){
return o>0?(o--,void e()):(i._g.dataCount++,void i.videoDataReady());
},a=this._g.coverUrl+"&f=json";
e();
},t.prototype._getDynamic=function(){
var e=this,t=this._o,r=this._g;
if(t.is_mp_video&&window.__mpVideoTransInfo&&window.__mpVideoTransInfo.length>0)return r.dataCount++,
r.vInfo.dynamicData={
data:i({
url_info:window.__mpVideoTransInfo.map(function(e){
return e.url=e.url.htmlDecode(),e;
})
})
},void this.videoDataReady();
if(r.vInfo.dynamicData){
r.dataCount++;
var n=r.vInfo.dynamicData;
return this._report.getvinfo_ret="undefined"!=typeof n.ret_code?n.ret_code:-2,this._report.getvinfo_time=n.c_time||0,
t.is_mp_video&&n.data&&n.data.ori_url_info&&n.data.ori_url_info.length>0&&(r.vInfo.dynamicData={
data:i({
url_info:n.data.ori_url_info
})
}),void this.videoDataReady();
}
var s=this._report,d=r.monitorUid,_=r.monitorUid2;
return t.is_mp_video?void o({
preview:t.preview,
vid:t.vid,
__biz:t.__biz,
mid:t.mid,
idx:t.idx,
auto:!(!J.isAndroid||!I.gtVersion("7.0.16",1)),
onSuccess:function(t){
e._trigger("setMonitor",_,{
4:1,
5:1
}),e._trigger("sendMonitor",_),r.dataCount++,r.vInfo.dynamicData=t,e.videoDataReady();
},
onError:function(t){
switch(e._trigger("setMonitor",_,{
4:1,
6:1
}),1*t.code){
case 80:
e._trigger("setMonitor",_,{
7:1,
24:1
});
break;

case 81:
e._trigger("setMonitor",_,{
7:1,
25:1
});
break;

case 82:
e._trigger("setMonitor",_,{
7:1,
26:1
});
break;

case 83:
e._trigger("setMonitor",_,{
7:1,
27:1
});
break;

case 84:
e._trigger("setMonitor",_,{
7:1,
28:1
});
break;

case 85:
e._trigger("setMonitor",_,{
7:1,
29:1
});
break;

case 71:
e._trigger("setMonitor",_,{
8:1
});
break;

case 72:
e._trigger("setMonitor",_,{
9:1
});
break;

case 73:
e._trigger("setMonitor",_,{
10:1
});
break;

case 74:
e._trigger("setMonitor",_,{
11:1
});
break;

case 75:
e._trigger("setMonitor",_,{
34:1
});
break;

case 76:
e._trigger("setMonitor",_,{
35:1
});
}
e._trigger("sendMonitor",_),s.videoerror=t.code,e._g.dynamicErrMsg=t.err_msg||"",
s.duration_ms=0,r.vInfo.dynamicData=null,e._g.dataCount=e._g.targetDataCount,e.videoDataReady();
}
}):void a({
vid:t.vid,
ckey:t.ckey,
onSuc:function(t){
if(e._trigger("setMonitor",d,{
10:1,
11:1,
13:Math.min(t.c_time,6e4)
}),t.data.width&&t.data.height){
var i=Math.round(10*t.data.width/t.data.height*1);
i>20?i=20:0>i&&(i=0);
var o=41+2*i,a={};
a[o]=1,e._trigger("setMonitor",d,a);
}else e._trigger("setMonitor",d,{
83:1
});
e._trigger("sendMonitor",d),r.dataCount++,r.vInfo.dynamicData=t,s.getvinfo_ret=t.ret_code,
s.getvinfo_time=t.c_time,s.file_size=t.data.file_size,s.rate=t.data.rate,s.resolution=t.data.resolution,
s.format=t.data.format,s.vt=t.data.vt,s.video_ext=U.getsdtfrom(),e.videoDataReady();
},
onError:function(t,i){
if(e._trigger("setMonitor",d,{
10:1,
12:1,
13:Math.min(i.c_time,6e4)
}),-2==t)switch(1*i.ret_code){
case-2:
e._trigger("setMonitor",d,{
17:1
}),s.videoerror=2;
break;

case-3:
e._trigger("setMonitor",d,{
40:1
}),s.videoerror=53;
break;

case-4:
e._trigger("setMonitor",d,{
109:1
}),s.videoerror=54;
break;

case-5:
e._trigger("setMonitor",d,{
110:1
}),s.videoerror=55;
break;

case 61:
e._trigger("setMonitor",d,{
18:1
}),s.videoerror=25;
break;

case 62:
e._trigger("setMonitor",d,{
19:1
}),s.videoerror=26;
break;

case 64:
e._trigger("setMonitor",d,{
20:1
}),s.videoerror=27;
break;

case 67:
e._trigger("setMonitor",d,{
21:1
}),s.videoerror=28;
break;

case 69:
e._trigger("setMonitor",d,{
22:1
}),s.videoerror=52;
break;

case 80:
e._trigger("setMonitor",d,{
23:1
}),s.videoerror=29;
break;

case 81:
e._trigger("setMonitor",d,{
24:1
}),s.videoerror=50;
break;

case 85:
e._trigger("setMonitor",d,{
25:1
}),s.videoerror=51;
break;

default:
e._trigger("setMonitor",d,{
26:1
}),s.videoerror=24;
}else{
switch(1*t){
case-22:
e._trigger("setMonitor",d,{
15:1
});
break;

case-21:
e._trigger("setMonitor",d,{
14:1
});
break;

case-23:
e._trigger("setMonitor",d,{
16:1
});
}
s.videoerror=-1*t;
}
e._trigger("sendMonitor",d),e._g.dynamicErrMsg=i.err_msg||"",s.getvinfo_ret=i.ret_code,
s.duration_ms=0,s.getvinfo_time=i.c_time||0,r.vInfo.dynamicData=null,e._g.dataCount=e._g.targetDataCount,
e.videoDataReady();
}
});
},t.prototype._createPlayer=function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],t=this,i=this._g,o=this._o,r=i.vInfo,a=this._report,n=r.dynamicData.data,s=[];
i.myAdPlugin&&s.push(i.myAdPlugin),i.noProxy!==!0&&J.isUseProxy&&s.push(new V({
vid:o.vid,
data:n,
cdn_url:n.totalUrl
})),o.useDanmu===!0&&s.push(new L({
bizUin:window.cgiData.biz,
msgId:1*window.cgiData.mid,
idx:1*window.cgiData.idx,
vid:o.vid
})),a.duration_ms=parseInt(1e3*n.time),this._initPlayRangeInfo({
durationMs:a.duration_ms
}),a.vtitle=window.cgiData&&window.cgiData.video_title&&window.cgiData.video_title.htmlDecode()||n.title||"";
var d=!1,_=i.monitorUid,c=i.monitorUid2,p=t.getReportTypeBySceneType(),g=void 0;
n.ori_url_info&&!function(){
var e={
10002:"超清",
10003:"高清",
10004:"流畅",
20003:"自动"
};
g=[],n.ori_url_info.forEach(function(t){
(1*t.format_id!==20003||J.isWechat&&J.isAndroid&&I.gtVersion("7.0.16",1))&&g.push({
name:t.video_quality_wording||e[t.format_id],
formatId:t.format_id,
height:t.height,
width:t.width,
src:t.url
});
});
}();
var u=[{
rate:.5,
name:"0.5倍"
},{
rate:.75,
name:"0.75倍"
},{
rate:1,
name:"1.0倍"
},{
rate:1.5,
name:"1.5倍"
},{
rate:2,
name:"2.0倍"
}],h=R.getQuery("play_time"),v=0;
i.initialData?v=i.initialData.initialTime||0:""!==h?v=1*h||0:r.status&&!r.status.isEnd&&(v=r.status.playTime||0),
G.info("qq_video_info: begin to create player"),i.myPlayer=new O({
__biz:o.__biz,
mid:o.mid,
idx:o.idx,
bizUserName:o.bizUserName,
bizNickName:o.bizNickName,
videoTitle:a.vtitle,
videoReportType:p,
defineCSS:!0,
container:o.container,
cover:i.coverUrl,
ratio:o.ratio,
width:i.gWidth,
height:i.gHeight,
videoWidth:n.width,
videoHeight:n.height,
duration:n.time,
autoplay:o.autoplay,
autoReplay:o.autoReplay,
isVideoSharePage:o.isVideoSharePage,
flowNotice:o.flowNotice,
flow:n.flow,
loop:o.loop,
plugins:s,
src:n.totalUrl,
headImgUrl:o.headImgUrl,
jsapiFullScreen:o.jsapiFullScreen,
canShareVideo:o.canShareVideo,
pauseShowControll:o.pauseShowControll,
videoMd5:o.videoMd5,
useWcSlPlayer:o.useWcSlPlayer,
initialTime:v,
resolutionInfo:g,
playbackRateInfo:u,
playbackRateBtnInfoDefaultId:2,
extinfo:{
hit_bizuin:o.hit_bizuin,
hit_vid:o.hit_vid,
vid:o.vid,
preview:o.preview,
pageplayer:t
},
onLoaded:function(){
"function"==typeof e.onLoaded&&e.onLoaded(),G.info("qq_video_info: succ created player");
},
onTimeupdate:function(e,r){
if(!d){
d=!0,A.report({
step:6,
vid:o.vid,
traceid:t._getTraceId(),
orderid:t._getOrderid(),
type:p,
fromid:t._o.fromid
});
var n=this.getLog(),s=n.loadwait||0;
t._qqVideoReport({
step:6,
loadwait:s
});
}
i.is_report_pv||(i.is_report_pv=!0,t._trigger("clearMonitor",_),t._trigger("clearMonitor",c),
t._o.is_mp_video?(t._trigger("setMonitor",c,{
12:1,
13:1
}),t._trigger("sendMonitor",c)):(t._trigger("setMonitor",_,{
0:1,
1:1
}),t._trigger("sendMonitor",_))),a.last_ms=parseInt(1e3*r.currentTime),a.video_play_time=parseInt(1e3*r.currentTime),
t._reportCurRangeInfo({
curTime:a.last_ms
}),t._trigger("timeupdate",r);
},
onBeginPlay:function(){
var e=r.status,i=this;
1*v>0&&1*v<.99*n.time&&(i.play(v),e&&e.playTime&&(e.playTime=0)),a.client_time_when_play=Math.round(+new Date/1e3),
a.click_play_button=1,"string"==typeof o.container&&"#"==o.container.charAt(0)&&"number"==typeof o.__count__&&o.__hasReport===!1&&(0==o.__count__?(new Image).src="/mp/jsreport?key=103&content=video_test&r="+Math.random():1==o.__count__?(new Image).src="/mp/jsreport?key=104&content=video_test&r="+Math.random():o.__count__>=2&&((new Image).src="/mp/jsreport?key=105&content=video_test&r="+Math.random()),
o.__hasReport=!0),t._trigger("beginPlay");
},
onDurationchange:function(){
if(this._useWcSlPlayer()){
var e=r.status;
e&&1*e.playbackRate!==1&&(this.setPlaybackRate(e.playbackRate),e.playbackRate=1);
}
},
onFullscreenchange:function(e,i){
t._trigger("fullscreenchange",i);
},
onAriaReplay:function(){
t._trigger("ariaReplay");
},
onStatusChange:function(e,i){
"loading"!==i.status||"seeked"!==i.subStatus&&"seeking"!==i.subStatus||t._initPlayRangeInfo({
durationMs:a.duration_ms
}),t._trigger("statusChange",i);
},
onAfterReplay:function(){
t._trigger("afterReplay");
},
onHandDragComplete:function(e,i){
t._trigger("handDragComplete",i);
},
onBarDragComplete:function(e,i){
t._trigger("barDragComplete",i);
},
onEnd:function(){
this.hideControllBar(),this.autoChangeTip({
type:"autoChange",
option:"hide"
}),this.autoChangeTip({
type:"autoSuc",
option:"hide"
}),a.hasended=1,A.report({
step:7,
vid:o.vid,
ext1:1e3*n.time,
traceid:t._getTraceId(),
orderid:t._getOrderid(),
type:p,
fromid:t._o.fromid
}),t._debug("onend isend:"+this.isEnd()),t._trigger("hidePauseTips"),t._trigger("showEndContent"),
t._reportCurRangeInfo({
curTime:a.last_ms
}),t._initPlayRangeInfo({
durationMs:a.duration_ms
});
},
onError:function(e,o){
if(a.videoerror=!o||!o.errorcode||o.errorcode>5||o.errorcode<=0?46:o.errorcode+40,
J.isUseProxy&&!t._g.noProxy?J.isAndroid?t._trigger("setMonitor",c,{
30:1
}):J.isIOS&&t._trigger("setMonitor",c,{
32:1
}):J.isUseProxy&&t._g.noProxy&&!t._g.hasReportProxyError&&(t._g.hasReportProxyError=!0,
J.isAndroid?t._trigger("setMonitor",c,{
31:1
}):J.isIOS&&t._trigger("setMonitor",c,{
33:1
})),t._o.is_mp_video){
switch(i.is_report_pv||(i.is_report_pv=!0,t._trigger("setMonitor",c,{
12:1
})),t._trigger("setMonitor",c,{
14:1
}),1*o.errorcode){
case 1:
t._trigger("setMonitor",c,{
15:1
});
break;

case 2:
t._trigger("setMonitor",c,{
16:1
});
break;

case 3:
t._trigger("setMonitor",c,{
17:1
});
break;

case 4:
t._trigger("setMonitor",c,{
18:1
});
break;

case 5:
t._trigger("setMonitor",c,{
19:1
});
break;

case 6:
t._trigger("setMonitor",c,{
39:1
});
break;

default:
t._trigger("setMonitor",c,{
20:1
});
}
t._trigger("sendMonitor",c);
}else{
switch(i.is_report_pv||(i.is_report_pv=!0,t._trigger("setMonitor",_,{
0:1
})),t._trigger("setMonitor",_,{
2:1,
3:1
}),1*o.errorcode){
case 1:
t._trigger("setMonitor",_,{
4:1
});
break;

case 2:
t._trigger("setMonitor",_,{
5:1
});
break;

case 3:
t._trigger("setMonitor",_,{
6:1
});
break;

case 4:
t._trigger("setMonitor",_,{
7:1
});
break;

case 5:
t._trigger("setMonitor",_,{
8:1
});
break;

default:
t._trigger("setMonitor",_,{
9:1
});
}
t._trigger("sendMonitor",_),t._trigger("sendMonitor",c);
}
a.v_err_code=o.errorcode,t._showError(),t._qqVideoReport({
step:1999,
val:a.videoerror
}),t._initPlayRangeInfo({
durationMs:a.duration_ms
});
},
onFirstBufferingTime:function(e,i){
t._trigger("firstBufferingTime",i);
},
onPlayingBufferingTime:function(e,i){
t._trigger("playingBufferingTime",i);
},
onFlowNotice:function(e,i){
t._trigger("flowNotice",i);
},
onUserplay:function(e,i){
t._trigger("userplay",i);
},
onUserpause:function(e,i){
t._trigger("userpause",_extends({
curTime:this.getCurTime()
},i)),a.pause_num=(a.pause_num||0)+1;
},
onWaiting:function(e,o){
if(J.isWechat&&J.isAndroid&&I.gtVersion("7.0.16",1)){
var r={
10004:1,
10003:2,
10002:3,
20003:4
},a={
"自动":"20003",
"超清":"10002",
"高清":"10003",
"流畅":"10004"
},n={
WiFI:1,
"2G":2,
"3G":3,
"4G":4
};
o&&!function(){
for(var e=3,s=i.myPlayer,d=s.getResolutionInfo(),_=d?d.src:null,c=t._o.auto.loadRetryTime,p=t._o.auto.isShowTip,g=null,u=5e3,l=$(".js_auto_change_tip_mask")[0],h=void 0,v=void 0,f=i.vInfo.dynamicData?i.vInfo.dynamicData.data.ori_url_info.map(function(e){
var t=e.video_quality_wording,i=a[t];
return{
formatId:i,
src:e.url,
name:t
};
}):[],m=0;m<f.length;m++)"20003"===f[m].formatId&&(h=f[m].src),f[m].src===_&&(v=r[[f[m].formatId]]);
var y=function(e){
var i=$(".js_auto_change_tip")[0];
z.tap(i,function(){
t._o.auto.isChangeAuto=!0,t._trigger("autoTip",{
networkType:networkType,
DefinitionBefore:e.definitionBefore
});
});
},w=function(){
z.on(l,"tap",function(e){
e.cancelBubble=!0,i.myPlayer.autoChangeTip({
type:"autoChange",
option:"hide"
}),s.hideControllBar();
});
},b=function(){
g&&clearTimeout(g),g=setTimeout(function(){
i.myPlayer.autoChangeTip({
type:"autoChange",
option:"hide"
});
},u);
},k=function(){
s.hideControllBar(),i.myPlayer.autoChangeTip({
type:"autoChange",
option:"show"
}),p=!0;
var e=-1;
P.invoke("getNetworkType",{},function(t){
e=n[Q[t.err_msg]]||0,("network_type:edge"==t.err_msg||"network_type:wwan"==t.err_msg)&&(t.detailtype||t.subtype)&&(e=n[t.detailtype]||n[t.subtype]);
}),y({
networkType:e,
definitionBefore:v
}),t._trigger("showTip");
},T=o.action;
_!==h&&h&&(p||("changeToAuto"===T||++c>e?(k(),b(),w()):t._o.auto.loadRetryTime+=1)),
t._o.auto.isShowTip=p;
}();
}
},
onPlay:function(e,o){
console.log("[onPlaying]",i.myPlayer.getResolutionInfo()),t._o.auto.isChangeAuto===!0&&t._o.auto.isShowSuc===!1&&i.myPlayer.getResolutionInfo()&&i.myPlayer.getResolutionInfo().src.indexOf("m3u8")&&!function(){
var e=null,o=4e3,r=function(){
e&&clearTimeout(e),e=setTimeout(function(){
i.myPlayer.autoChangeTip({
type:"autoSuc",
option:"hide"
});
},o);
};
i.myPlayer.hideControllBar(),i.myPlayer.autoChangeTip({
type:"autoSuc",
option:"show"
}),r(),t._o.auto.isShowSuc=!0;
}(),t._trigger("play",o);
},
onAfterCheckVideoFit:function(e,i){
var o={
97:1
};
i.needToFit===!0&&(o[98]=1,o[100]=1,i.os.ios&&(o[103]=1),i.os.android&&(o[106]=1),
i.supportObjectFit===!0&&(o[101]=1,i.os.ios&&(o[104]=1),i.os.android&&(o[107]=1))),
t._trigger("setMonitor",_,o),t._trigger("sendMonitor",_);
},
onBindError:function(e,i){
t._trigger("bindError",i);
},
onRateChange:function(e,i){
t._trigger("rateChange",i);
},
onResolutionChange:function(e,i){
"changed"===i.action&&(J.playerStatus.formatId=i.infoAfter&&i.infoAfter.formatId||null,
l()),t._trigger("resolutionChange",i);
},
onBrightnessChange:function(e,i){
t._trigger("brightnessChange",i);
},
onVolumeChange:function(e,i){
t._trigger("volumeChange",i);
},
onProfileJump:function(e,i){
t._trigger("profileJump",i);
},
onProcessStateChange:function(e,i){
t._trigger("processStateChange",i);
},
onGetDanmuInfo:function(e,i){
t._trigger("getDanmuInfo",i);
},
onCanplay:function(e,i){
t._trigger("canplay",i);
},
onShowControllBar:function(e,i){
t._trigger("showControlBar",i);
},
onHideControllBar:function(e,i){
t._trigger("hideControlBar",i);
},
canMePlay:function(e){
o.checkNoPaid?S({
type:"GET",
dataType:"json",
timeout:3e4,
url:"/mp/videoplayer?action=check_video_paid_status&__biz="+o.__biz+"&mid="+o.mid+"&idx="+o.idx,
success:function(t){
var i=1==t.can_play;
i?e():window.weui.confirm("此视频来自于付费内容，在原文付费后才可播放",{
buttons:[{
type:"default",
label:"取消"
},{
label:"前往原文",
onClick:function(){
o.openArticle();
}
}]
});
},
error:function(e){
var t=void 0;
t=e?e.status>=200&&e.status<400?81:e.status>=400&&e.status<500?82:e.status>=500&&e.status<600?83:0==e.status&&4==e.readyState?84:85:80,
onError({
err_msg:W,
code:t
});
}
}):e();
},
onShowMenu:function(e,i){
t._trigger("showMenu",i);
}
}),this._pvReport(),this._trigger("playerReady"),o.__count__=0,o.__hasReport=!1,
"string"==typeof o.container&&"#"==o.container.charAt(0)&&document.getElementById(o.container.substr(1)).getElementsByClassName("js_video_play_controll")[0].addEventListener("click",function(){
o.__count__++;
});
},t.prototype.getReportTypeBySceneType=function(){
return 0==this._o.scene_type?1:1==this._o.scene_type||2==this._o.scene_type?2:4==this._o.scene_type?3:7==this._o.scene_type?4:0;
},t.prototype._getFromid=function(){
return this._o.fromid;
},t.prototype._bindResize=function(){
var e=this;
z.on(window,"resize",function(){
return e._g.myPlayer&&e._g.myPlayer._useWcSlPlayer()?void(e._g.myPlayer.isInFullScreen()||setTimeout(function(){
var t=$(e._o.container),i=t.offset().width;
0!=i&&e.setVideoCSS({
width:i+"px"
});
},0)):void(e._o.height&&e._o.width&&(e._g.isShowTx&&e._g.txPlayer?setTimeout(function(){
try{
var t=$(e._o.container),i=e._o.width/e._o.height,o=t.offset().width,r=Math.floor(o/i);
0!=o&&(e._g.gWidth=o,e._g.gHeight=r,t.css({
height:r+"px"
}),e._g.txPlayer.resize({
width:o,
height:r
}));
}catch(a){}
},0):setTimeout(function(){
var t=$(e._o.container),i=e._o.width/e._o.height,o=t.offset().width,r=Math.floor(o/i);
0!=o&&(e._g.gWidth=o,e._g.gHeight=r,e.setVideoCSS({
width:o+"px",
height:r+"px"
}),t.css({
height:r+"px"
}));
},0)));
},!1);
},t.prototype._setBlockPlugin=function(e,t){
this._blockPlugin[e]=t;
},t.prototype._trigger=function(e){
var t=void 0,i=void 0,o=this.plugins,r=this._blockPlugin[e]||this._blockPlugin.all,a=0;
if(r&&"function"==typeof r.recv&&(t=r.recv.apply(r,arguments),"[object Object]"==Object.prototype.toString.call(t)?(a|=t.code,
i=t.data):a|=t,1&a))return i;
for(var n=0,s=o.length;s>n&&(t=o[n].recv.apply(o[n],arguments),"[object Object]"==Object.prototype.toString.call(t)?(a|=t.code,
i=t.data):a|=t,!(2&a));++n);
if(!(this._blockInnerHandler||4&a)){
var d=this["__"+e+"Handler"];
d&&(t=d.apply(this,arguments),"[object Object]"==Object.prototype.toString.call(t)&&(i=t.data));
}
return 8&a||this.__triggerOutside.apply(this,arguments),i;
},t.prototype.__triggerOutside=function(){
var e=this._o,t=arguments,i=t[0];
if(i){
i=i.substr(0,1).toUpperCase()+i.substr(1);
var o=e["on"+i];
"function"==typeof o&&o.apply(this,t);
}
},t.prototype._getCover=function(){
var e=this._o;
return _(e.vid,e.ratio,e.is_mp_video);
},t.prototype._cacheData=function(){
var e=this._g.myPlayer,t=this._g.vInfo;
e&&(t.status||(t.status={}),"function"==typeof e.isEnd&&(t.status.isEnd=e.isEnd()),
"function"==typeof e.getCurTime&&(t.status.playTime=e.getCurTime()),"function"==typeof e.getPlaybackRate&&(t.status.playbackRate=e.getPlaybackRate()),
!this._g.initialData&&this._g.coverUrl&&(t.coverUrl=this._g.coverUrl),u(this._o.__biz,this._o.mid,this._o.idx,this._o.vid,this._g.vInfo,this._g.cacheStartTs));
},t.prototype._getCache=function(){
var e=c(this._o.__biz,this._o.mid,this._o.idx,this._o.vid);
if(e){
var t=this._g.vInfo;
t.dynamicData=e.videoInfo.dynamicData||null,t.coverUrl=e.videoInfo.coverUrl||"",
t.status=e.videoInfo.status||null,this._g.cacheStartTs=e.time||null;
}
},t.prototype._clearCache=function(){
h(this._o.vid);
},t.prototype._qqVideoReport=function(e){
var t={
step:e.step,
loadwait:e.loadwait||0,
val:e.val||0,
vid:this._o.vid
};
6==e.step&&(t.vt=this._report.vt),U.qqvideo_common_report(t);
},t.prototype._pvReport=function(){
this._qqVideoReport({
step:3
});
},t.prototype._showError=function(e,t){
t=t||1;
var i=this,o=this._report.videoerror,r=f(this._o.container.replace(/^#/,""));
if(r){
e=e||W;
var a=!1;
e===W&&(a=!0),r.innerHTML=q.tmpl(B,{
errType:t,
msg:e,
errcode:o,
showBtn:a,
width:r.offsetWidth,
height:r.offsetHeight,
is_mp_video:this._o.is_mp_video
},!1);
{
var n=$(r).find(".js_video_errormsg_btn");
$(r).find(".js_video_errormsg_loading"),$(r).find(".js_error_area");
}
z.tap(n[0],function(){
i._reInit();
});
}
},t.prototype._reInit=function(){
var e=f(this._o.container.replace(/^#/,""));
e.innerHTML="";
var t=!1,i=!1;
J.isUseProxy&&this._report.videoerror>=41&&this._report.videoerror<=46&&(t=!0,this._g.noProxy&&(i=!0)),
this._init({
noProxy:t,
hasReportProxyError:i,
hasInitPlugins:!0,
gWidth:this._g.gWidth,
gHeight:this._g.gHeight
});
},t.prototype.__showEndContentHandler=function(){
this._debug("resetVideo"),this._g.myPlayer._useWcSlPlayer()?this._g.myPlayer.showCover():this._g.myPlayer.resetVideo(),
this._g.myPlayer.hidePlayBtn();
},t.prototype._debug=function(){},t.prototype.__ariaReplayHandler=function(){
this.__replayHandler();
},t.prototype.__replayHandler=function(){
this._g.is_report_pv=!1,this._qqVideoReport({
step:3
}),this._report.replay=1,this._g.myPlayer.replay();
},t.prototype._getTraceId=function(){
var e=this._g.myAdPlugin;
return e?e.getTraceId():0;
},t.prototype._getOrderid=function(){
var e=this._g.myAdPlugin;
return e?e.getOrderid():0;
},t.prototype._getOriStatus=function(){
return this._o.ori_status;
},t.prototype._getPlayerReportData=function(){
var e=this._report,t=this._g.myPlayer,i=this._g.myAdPlugin;
t&&(e.quick_play=t.hasDrag()?1:0,e.full_screen=t.hasFullScreen()?1:0,e.drag_times=t.getDrag().join(":|:"),
e.play_time=this.getRealPlayTime()),i&&(e.ad_play_time=i.getAdPlaytime(),e.traceid=i.getTraceId(),
e.orderid=i.getOrderid()),e.webviewid=A.getWebviewid();
},t.prototype._cacheReportData=function(){
var e=this;
this._g.reportDataTimeoutId&&(clearTimeout(this._g.reportDataTimeoutId),this._g.reportDataTimeoutId=null),
!J.videoDataLs||this._g.hasReport||this._g.hasDestroy||(this._getPlayerReportData(),
J.videoDataLs.set(this._g.reportDataLsKey,this._report,+new Date+J.videoDataLsExpTime)),
J.neeedTimoutSaveReportData&&!this._g.hasDestroy&&(this._g.reportDataTimeoutId=window.setTimeout(function(){
e._cacheReportData();
},1e3));
},t.prototype.getVid=function(){
return this._o.vid;
},t.prototype.pause=function(){
this._g.myPlayer&&this._g.myPlayer.pause4outer();
},t.prototype.play=function(e){
this._g.myPlayer&&this._g.myPlayer.play4outer(e);
},t.prototype.getRealPlayTime=function(){
var e=0;
return this._g.myPlayer&&(e=Math.round(1e3*this._g.myPlayer.getPlayTotalTime())),
e;
},t.prototype.getCurrentTime=function(){
var e=0,t=this._g.myPlayer;
return this._g.myPlayer&&(e=t.getCurTime()),e;
},t.prototype.getVideoData=function(){
return this._g.vInfo&&this._g.vInfo.dynamicData&&this._g.vInfo.dynamicData.data?this._g.vInfo.dynamicData.data:null;
},t.prototype.getReportData=function(){
return this._report;
},t.prototype.mpVideoReport=function(e){
if(e=e||{},!this._g.hasReport&&!this._g.hasDestroy){
this._g.hasReport=!0;
var t=this._report;
0===t.videoerror?this.cacheData():this.clearCache(),J.videoDataLs&&J.videoDataLs.remove(this._g.reportDataLsKey),
this._getPlayerReportData(),J._debug&&console.log("report video data:"+JSON.stringify(t)),
U.videoreport({
data:t,
async:e.async
});
}
},t.prototype.extendMpReportData=function(e){
m(this._report,e);
},t.prototype.getMpReportData=function(){
return this._report;
},t.prototype.clearCache=function(){
this._clearCache();
},t.prototype.cacheData=function(){
this._cacheData();
},t.prototype._cacheOnPageInvisible=function(){
var e=this;
document.addEventListener("visibilitychange",function(){
document.hidden&&e.cacheData();
});
},t.prototype._leaveReport12710=function(){
var e=this,t={
type:this._o.leaveReport12710Type,
step:17,
useruin:this._o.uin,
bizuin:this._o.__biz,
mid:this._o.mid,
idx:this._o.idx,
vid:this._o.vid
};
H.addReport(function(){
var i=e.getRealPlayTime();
if(!i)return!1;
var o=e.getVideoData();
return t.duration=Math.round(1e3*o.time),t.clienttime=Date.now(),t.real_play_time=i,
{
reportUrl:"https://mp.weixin.qq.com/mp/ad_video_report?action=video_play_exit_report",
reportData:Object.keys(t).map(function(e){
return e+"="+encodeURIComponent(t[e]||"");
}).join("&"),
method:"POST"
};
});
},t.prototype.setWidth=function(e){
this._g.myPlayer.setWidth(e);
},t.prototype.setHeight=function(e){
this._g.myPlayer.setHeight(e);
},t.prototype.renderLike=function(){
var e=this._g.myPlayer;
e&&e.isEnd()&&this._trigger("showEndContent");
},t.prototype.setVideoCSS=function(e){
var t=this,i=this._g.myPlayer,o=this._g.myAdPlugin;
i&&(i.setVideoCSS(e),o&&o.setSize(e),setTimeout(function(){
t.renderLike();
},0));
var r=$(this._o.container).find(".js_error_box");
r&&r.length>0&&r.css(e);
},t.prototype.destroy=function(){
for(var e=0;e<J.videoInstance.length;e++)J.videoInstance[e]===this&&(J.videoInstance.splice(e,1),
e--);
this._g&&(this._g.event&&T.removeListener({
type:"afterRemoveLoading",
func:this._g.event.afterRemoveLoading
}),this._g.myPlayer&&this._g.myPlayer.destroy(),this._g.hasDestroy=!0);
},t.prototype.supportWcSlPlayer=function(){
return!!this._g.myPlayer&&this._g.myPlayer.supportWcSlPlayer();
};
var K=-1!=navigator.userAgent.indexOf("MicroMessenger")&&(I.isIOS||I.isAndroid||I.isWp);
return{
getHashByVid:d,
mpVideoPlayer:t,
getFormatTime:O._getFormatTime,
getCoverByVid:_,
getQQVideoStaticInfo:s
};
});define("biz_common/dom/event.js",[],function(){
"use strict";
function t(){
return f&&(new Date).getTime()-f<200?!0:!1;
}
function e(){
return h.isPc||h.isWp?!1:!0;
}
function n(n,i,a,o){
e()?(i.tap_handler=function(e){
if(-1==h.tsTime||+new Date-h.tsTime>200||t())return void(h.tsTime=-1);
var n=e.changedTouches[0];
return Math.abs(h.y-n.clientY)<=5&&Math.abs(h.x-n.clientX)<=5?i.call(this,e):void 0;
},r(n,"touchend",o,i.tap_handler,a)):r(n,"click",o,i,a);
}
function i(t,e,n,i){
var a=this,o=0;
if(h.isPc||h.isWp){
var c,u,d,l=!1;
r(t,"mousedown",i,function(t){
d=!1,l=!0,c=t.clientX,u=t.clientY,o=setTimeout(function(){
d=!0,o=0,e.call(a,t);
},500),t.preventDefault();
}),r(t,"mousemove",i,function(t){
l&&(Math.abs(u-t.clientY)>5||Math.abs(c-t.clientX)>5)&&(clearTimeout(o),o=0);
}),r(t,"mouseup",i,function(){
l=!1,clearTimeout(o);
}),r(t,"click",i,function(){
return d?!1:void 0;
});
}else r(t,"touchstart",i,function(t){
o=setTimeout(function(){
o=0,e.call(a,t);
},500);
}),r(t,"touchmove",i,function(t){
var e=t.changedTouches[0];
(Math.abs(h.y-e.clientY)>5||Math.abs(h.x-e.clientX)>5)&&(clearTimeout(o),o=0);
}),r(t,"touchend",i,function(t){
o?(clearTimeout(o),o=0):t.preventDefault();
});
}
function a(t,e){
if(!t||!e||t.nodeType!=t.ELEMENT_NODE)return!1;
var n=t.webkitMatchesSelector||t.msMatchesSelector||t.matchesSelector;
return n?n.call(t,e):(e=e.substr(1),t.className.indexOf(e)>-1);
}
function o(t,e,n){
for(;t&&!a(t,e);)t=t!==n&&t.nodeType!==t.DOCUMENT_NODE&&t.parentNode;
return t;
}
function r(t,e,a,r,c){
var u,d,l;
return"input"==e&&h.isPc,t?("function"==typeof a&&(c=r,r=a,a=""),"string"!=typeof a&&(a=""),
t==window&&"load"==e&&/complete|loaded/.test(document.readyState)?r({
type:"load"
}):"tap"==e?n(t,r,c,a):"longtap"===e?i(t,r,c,a):("unload"==e&&"onpagehide"in window&&(e="pagehide"),
u=function(t){
var e=r(t);
return e===!1&&(t.stopPropagation&&t.stopPropagation(),t.preventDefault&&t.preventDefault()),
e;
},a&&"."==a.charAt(0)&&(l=function(e){
var n=e.target||e.srcElement,i=o(n,a,t);
return i?(e.delegatedTarget=i,u(e)):void 0;
}),d=l||u,r[e+"_handler"]=d,t.addEventListener?void t.addEventListener(e,d,!!c):t.attachEvent?void t.attachEvent("on"+e,d,!!c):void 0)):void 0;
}
function c(t,n,i,a){
if(t){
var o,r=n;
return"tap"==r&&(e()?(r="touchend",o=i.tap_handler&&i.tap_handler.touchend_handler?i.tap_handler.touchend_handler:i):r="click"),
o=i[r+"_handler"]||i,t.removeEventListener?void t.removeEventListener(r,o,!!a):t.detachEvent?void t.detachEvent("on"+r,o,!!a):void("tap"==r&&e()?(i.tap_handler&&(i.tap_handler.touchend_handler=null),
i.tap_handler=null):i[r+"_handler"]=null);
}
}
function u(){
if("hidden"in document)return"hidden";
for(var t=0;t<v.length;t++)if(v[t]+"Hidden"in document)return v[t]+"Hidden";
return null;
}
function d(){
if("visibilityState"in document)return"visibilityState";
for(var t=0;t<v.length;t++)if(v[t]+"VisibilityState"in document)return v[t]+"VisibilityState";
return null;
}
function l(t){
var e=u();
if(e){
var n=e.replace(/[H|h]idden/,"")+"visibilitychange";
document.addEventListener(n,function(){
var e="hidden"!==document[d()];
"function"==typeof t&&t(e);
},!1);
}
}
var s=navigator.userAgent,h={
isPc:/(WindowsNT)|(Windows NT)|(Macintosh)/i.test(navigator.userAgent),
isWp:/Windows\sPhone/i.test(s),
tsTime:-1
},v=["webkit","moz","ms","o"];
e()&&r(document,"touchstart",function(t){
var e=t.changedTouches[0];
h.x=e.clientX,h.y=e.clientY,h.tsTime=+new Date;
});
var f;
return window.addEventListener("scroll",function(){
f=(new Date).getTime();
},!0),{
on:r,
off:c,
tap:n,
longtap:i,
bindVisibilityChangeEvt:l
};
});var _extends=Object.assign||function(e){
for(var a=1;a<arguments.length;a++){
var i=arguments[a];
for(var t in i)Object.prototype.hasOwnProperty.call(i,t)&&(e[t]=i[t]);
}
return e;
};
define("pages/video_plugin/video_tail.js",["biz_wap/jsapi/core.js","common/utils.js","biz_wap/utils/device.js","common/comm_report.js","pages/video_plugin/base.js","video/video_tail_utils.js","pages/video_collection/report.js","appmsg/like_and_share.js","pages/video_collection/weapp_channel.js"],function(e){
"use strict";
function a(e,a){
e&&e.contentWindow&&e.contentWindow.postMessage(a,location.origin||"*");
}
function i(e){
this._g={
hasInit:0,
tailIframe:null,
status:"init",
opt:e
};
}
var t=e("biz_wap/jsapi/core.js"),n=e("common/utils.js"),r=e("biz_wap/utils/device.js"),l=e("common/comm_report.js"),o=e("pages/video_plugin/base.js"),s=e("video/video_tail_utils.js"),d=e("pages/video_collection/report.js"),c=e("appmsg/like_and_share.js"),g=e("pages/video_collection/weapp_channel.js");
return o.inherit(i,o.Class),i.prototype.playerReadyHandler=function(){
this.__initVideoTail();
},i.prototype.fullscreenchangeHandler=function(e,i){
if(1===this._g.hasInit){
var t=_extends({},i);
if(r.os.android&&this.player._g.myPlayer&&this.player._g.myPlayer.opt.width<=this.player._g.myPlayer.opt.height)if(i.state){
var n=this.player._g.myPlayer.getWcSlPlayerAndroidSafeAreaInsets();
t.padding=n.top+"px 0 0 0";
}else t.padding="0";
a(this._g.tailIframe,{
hostEnvEvent:"onWcSlPlayerFullscreenChange",
res:t
});
}else i.state?this.videoTailPanel.removeClass("video_screen_half"):this.videoTailPanel.addClass("video_screen_half");
},i.prototype.updateOpt=function(e){
_extends(this._g.opt,e);
},i.prototype.showEndContentHandler=function(){
var e=this;
1===this._g.hasInit?(this._g.tailIframe.style.display="",s.sendMPPageData(JSON.stringify({
dataType:"syncLikeStatus",
isLike:this._g.opt.isLike,
likeNum:this._g.opt.likeNum
}),"adWeb"),s.sendMPPageData(JSON.stringify({
dataType:"syncTestFlag",
testFlag:this._g.opt.testFlag
}),"adWeb"),a(this._g.tailIframe,{
hostEnvEvent:"onMPAdWebviewStateChange",
res:{
state:"appear"
}
})):s.initWebTailPanel(_extends({
replay:function(){
e.player._trigger("replay");
},
fallback:function(){
setTimeout(function(){
e.player._g.myPlayer&&e.player._g.myPlayer.showPlayBtn();
});
}
},this._g.opt));
},i.prototype.__initVideoTail=function(){
var e=this;
this._g.hasInit||(this.videoTailPanel=$("#js_video_tail_panel"),this.videoTailPanel[0].addEventListener("touchmove",function(a){
e.player.isInFullScreen()&&a.preventDefault();
}),this.player._g.myPlayer&&this.player._g.myPlayer._useWcSlPlayer()?!function(){
e._g.hasInit=1,e._g.tailIframe=$('<iframe class="'+e.videoTailPanel.attr("class")+'" style="display:none;padding:0;'+e.videoTailPanel.attr("style")+'" frameborder="no" border="0" scrolling="no"></iframe>')[0],
e.player._g.myPlayer.container.find(".js_page_video").prepend(e._g.tailIframe),s.initTailIframe4WcSlPlayer(e._g.tailIframe,e.player._g.myPlayer.id),
e.videoTailPanel.parent().remove(),e.__initWcSlVideoTailListeners();
var a=function t(){
e._g.tailIframe.removeEventListener("load",t),e.fullscreenchangeHandler("fullscreenchange",{
state:e.player.isInFullScreen()
});
};
e._g.tailIframe.addEventListener("load",a);
var i=function n(){
e._g.tailIframe.removeEventListener("error",n),e._g.tailIframe.remove(),e._g.tailIframe=null,
e._g.hasInit=2,e.player._g.myPlayer.container.find(".js_page_video").prepend(e.videoTailPanel.parent()),
e.fullscreenchangeHandler("fullscreenchange",{
state:e.player.isInFullScreen()
}),console.error("[Video Tail Plugin] Failed to init iframe tail, fallback to h5 tail");
};
e._g.tailIframe.addEventListener("error",i);
}():(this._g.hasInit=2,this.player._g.myPlayer&&this.player._g.myPlayer.container.find(".js_page_video").prepend(this.videoTailPanel.parent())));
},i.prototype.__initWcSlVideoTailListeners=function(){
var e=this;
c.onLikeChange(function(a,i){
e._g.opt.isLike=a,e._g.opt.likeNum=i,s.sendMPPageData(JSON.stringify({
dataType:"syncLikeStatus",
isLike:a,
likeNum:i
}),"adWeb");
}),s.onReceiveMPPageData(function(a){
var i=e.player&&e.player._g.myPlayer;
if("sharePage"===a.data)return void t.invoke("handleMPPageAction",{
action:"share"
});
if("triggerLikeBtn"===a.data)return void c.triggerLike(6);
if("openChannel"===a.data)return void(i.isInFullScreen()?(i.exitFullScreen(),setTimeout(function(){
g.openChannel(187);
},250)):g.openChannel(187));
"hasSubscribed"===a.data&&s.setTailOpts({
hasSubscribed:!0
});
var n=void 0;
try{
n=JSON.parse(a.data);
}catch(r){
return;
}
"commReport"===n.dataType&&l.report(n.logId,n.logData);
}),window.addEventListener("message",function(i){
var t=void 0;
if(event.origin?t=event.origin:event.originalEvent&&(t=event.originalEvent.origin),
/^http(s)?\:\/\/mp\.weixin\.qq\.com$/.test(t)&&event.source){
var r=e.player._g.myPlayer;
if(r&&i.data.__wcSlPlayerLoadTailRelateVideo__)return r.exitFullScreen(),d.leaveReportNowForSwitchVideo(),
void n.loadNewPageKeepingHistoryStackIfSecOpen(i.data.__wcSlPlayerLoadTailRelateVideo__);
if(r&&i.data.__videoTailPlayerId__&&i.data.__videoTailPlayerId__===r.id){
var l=i.data.data;
switch(i.data.action){
case"handleMPPageAction":
var o={
callbackId:i.data.callbackId,
res:{
err_msg:"handleMPPageAction:ok"
}
};
switch(l.action){
case"sendMPPageData":
s.emitHostEnvEvent4WcSlPlayer({
data:{
hostEnvEvent:"onReceiveMPPageData",
res:l
}
});
break;

case"opPlayer":
"play"===l.opType&&r.replay();
break;

case"closeAdWebview":
var c=function(){
var a=e._g.tailIframe.getAttribute("class"),i=e._g.tailIframe.getAttribute("style");
e._g.tailIframe.remove(),e._g.tailIframe=$('<iframe class="'+a+'" style="display:none;'+i+'" frameborder="no" border="0" scrolling="no"></iframe>')[0],
e.player._g.myPlayer.container.find(".js_page_video").prepend(e._g.tailIframe),s.initTailIframe4WcSlPlayer(e._g.tailIframe,e.player._g.myPlayer.id,!0);
var t=function r(){
e._g.tailIframe.removeEventListener("load",r),e.fullscreenchangeHandler("fullscreenchange",{
state:e.player.isInFullScreen()
});
};
e._g.tailIframe.addEventListener("load",t);
var n=function l(){
e._g.tailIframe.removeEventListener("error",l),e._g.tailIframe.remove(),e._g.tailIframe=null,
e._g.hasInit=2,e.player._g.myPlayer.container.find(".js_page_video").prepend(e.videoTailPanel.parent()),
e.fullscreenchangeHandler("fullscreenchange",{
state:e.player.isInFullScreen()
}),console.error("[Video Tail Plugin] Failed to init iframe tail, fallback to h5 tail");
};
return e._g.tailIframe.addEventListener("error",n),"break";
}();
if("break"===c)break;
}
o.callbackId&&a(e._g.tailIframe,o);
}
}
}
});
},i;
});define("pages/iframe_communicate.js",["biz_common/dom/event.js","biz_common/dom/attr.js","pages/video_ctrl.js"],function(e){
"use strict";
function t(){
window.addEventListener("message",o,!1);
}
function o(e){
var t;
if(e.origin?t=e.origin:e.originalEvent&&(t=e.originalEvent.origin),/^http(s)?\:\/\/mp\.weixin\.qq\.com$/.test(t)&&e.source){
var o=e.data;
if(o&&o.type){
if(!/^mpvideo_/.test(o.type))return;
for(var s=o.type.replace(/^mpvideo_/,""),a=p.postMessageEvt[s]||[],i=0;i<a.length;i++)a[i].func(o.data);
}
}
}
function s(e){
var t=e.type;
/^mpvideo_/.test(t)||(t="mpvideo_"+t);
var o={
data:e.data,
type:t
};
window.parent.postMessage(o,document.location.protocol+"//mp.weixin.qq.com");
}
function a(e){
var t=e.type;
/^broadcast_/.test(t)||(t="broadcast_"+t),s({
type:t,
data:e.data
});
}
function i(e){
var t=e.type;
/^mpvideo_/.test(t)&&(t=t.replace(/^mpvideo_/,"")),p.postMessageEvt[t]||(p.postMessageEvt[t]=[]),
p.postMessageEvt[t].push({
func:e.func
});
}
function n(e){
var t=e.type;
/^mpvideo_/.test(t)&&(t=t.replace(/^mpvideo_/,""));
for(var o=p.postMessageEvt[t]||[],s=0;s<o.length;s++)o[s].func===e.func&&(o.splice(s,1),
s--);
}
var r=(e("biz_common/dom/event.js"),e("biz_common/dom/attr.js")),p=(e("pages/video_ctrl.js"),
r.setProperty,{
postMessageEvt:{}
});
return t(),{
broadcastMessage:a,
postMessage:s,
addListener:i,
removeListener:n
};
});define("common/init_share_btn.js",["biz_wap/jsapi/core.js","biz_common/dom/event.js","common/utils.js"],function(n){
"use strict";
function t(n){
var t=n.shareFuncFlag;
if(void 0!==t&&0===(1&t)&&0===(2&t)||void 0!==n.funcFlag&&(8&n.funcFlag)>0&&(16&n.funcFlag)>0)for(var e=0;e<u.length;e++)u[e].setAttribute("disabled","true");
}
var e=n("biz_wap/jsapi/core.js"),o=n("biz_common/dom/event.js"),i=n("common/utils.js"),a=void 0,c=!1,s="js_share_button",u=document.getElementsByClassName(s);
if(u.length){
for(var r=0;r<u.length;r++)o.on(u[r],"tap",function(){});
o.on(document.body,"tap","."+s,function(){
c&&(a?a():e.invoke("handleMPPageAction",{
action:"share"
}));
}),i.listenMpPageAction(function(n){
"setFuncFlag"===n.action&&(c=!0,t(n));
}),e.invoke("handleMPPageAction",{
action:"getFuncFlag"
},function(n){
c=!0,t(n);
});
}
var l=function(){
return u;
};
return{
getShareBtnDom:l,
setShareBtnClickCb:function(n){
a=n;
}
};
});define("biz_common/utils/string/html.js",[],function(){
"use strict";
return String.prototype.html=function(t){
var e,n=["&#96;","`","&#39;","'","&quot;",'"',"&nbsp;"," ","&gt;",">","&lt;","<","&yen;","¥","&amp;","&"],r=["&","&amp;","¥","&yen;","<","&lt;",">","&gt;"," ","&nbsp;",'"',"&quot;","'","&#39;","`","&#96;"];
e=t?r:n;
for(var o=0,i=this;o<e.length;o+=2)i=i.replace(new RegExp(e[o],"g"),e[o+1]);
return i;
},String.prototype.htmlEncode=function(){
return this.html(!0);
},String.prototype.htmlDecode=function(){
return this.html(!1);
},String.prototype.getPureText=function(){
return this.replace(/<\/?[^>]*\/?>/g,"");
},String.prototype.htmlLite=function(t){
var e=["&#96;","`","&#39;","'","&quot;",'"',"&gt;",">","&lt;","<","&amp;","&"];
t&&e.reverse();
for(var n=0,r=this;n<e.length;n+=2)r=r.replace(new RegExp(e[n],"g"),e[n+1]);
return r;
},String.prototype.htmlEncodeLite=function(){
return this.htmlLite(!0);
},String.prototype.htmlDecodeLite=function(){
return this.htmlLite(!1);
},{
htmlDecode:function(t){
return t.htmlDecode();
},
htmlEncode:function(t){
return t.htmlEncode();
},
getPureText:function(t){
return t.getPureText();
},
htmlEncodeLite:function(t){
return t.htmlEncodeLite();
},
htmlDecodeLite:function(t){
return t.htmlDecodeLite();
}
};
});