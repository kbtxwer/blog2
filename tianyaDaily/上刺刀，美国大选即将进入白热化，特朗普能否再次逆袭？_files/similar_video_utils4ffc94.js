define("pages/music_report_conf.js",[],function(){
"use strict";
return{
m_pv:"28306_0",
m_wx_pv:"28306_1",
m_h5_pv:"28306_2",
m_unload_wx_pv:"28306_3",
v_pv:"28306_4",
v_wx_pv:"28306_5",
v_h5_pv:"28306_6",
v_unload_wx_pv:"28306_7",
force_h5:"28306_30",
m_h5_err_total:"28306_31",
m_h5_err_1:"28306_32",
m_h5_err_2:"28306_33",
m_h5_err_3:"28306_34",
m_h5_err_4:"28306_35",
m_h5_err_5:"28306_36",
v_h5_err_total:"28306_37",
v_h5_err_1:"28306_38",
v_h5_err_2:"28306_39",
v_h5_err_3:"28306_40",
v_h5_err_4:"28306_41",
v_h5_err_5:"28306_42",
m_wx_pv_2:"28306_43",
v_wx_pv_2:"28306_44",
m_wx_pv_1:"28306_50",
v_wx_pv_1:"28306_55",
m_wx_err_1:"28306_58",
m_wx_err_2:"28306_59",
v_wx_err_1:"28306_60",
v_wx_err_2:"28306_61",
v_stoped_android:"59288_1",
v_stoped_ios:"59288_0",
v_paused_android:"59288_7",
v_paused_ios:"59288_6",
m_stoped_android:"59288_3",
m_stoped_ios:"59288_2",
m_paused_android:"59288_9",
m_paused_ios:"59288_8",
k_stoped_android:"59288_5",
k_stoped_ios:"59288_4",
k_paused_android:"59288_11",
k_paused_ios:"59288_10",
k_pv:"28306_66",
k_wx_pv:"28306_67",
k_h5_pv:"28306_69",
k_unload_wx_pv:"28306_71",
k_h5_err_total:"28306_72",
k_h5_err_1:"28306_74",
k_h5_err_2:"28306_75",
k_h5_err_3:"28306_76",
k_h5_err_4:"28306_77",
k_h5_err_5:"28306_78",
k_wx_pv_1:"28306_79",
k_wx_pv_2:"28306_81",
k_wx_err_1:"28306_83",
k_wx_err_2:"28306_85",
aac_pv:"28306_104",
ios_aac_err_1:"28306_106",
ios_aac_err_2:"28306_108",
android_aac_err_1:"28306_110",
android_aac_err_2:"28306_112",
v_seek_err:"28306_114",
android_aac_err_3:"28306_116",
ios_aac_err_3:"28306_118",
QMClient_pv:"62866_0",
QMClient_play:"62866_1",
QMClient_js_num:"62866_2",
QMClient_js_suc:"62866_3",
QMClient_js_err:"62866_5",
QMClient_js_timeout:"62866_7",
QMClient_js_network:"62866_9"
};
});define("pages/report.js",["biz_wap/utils/ajax.js","pages/version4video.js"],function(e){
"use strict";
function i(e){
var i=["/mp/pagereport?type=","undefined"==typeof e.type?1:e.type,"&comment_id=",e.comment_id||"","&voiceid=",e.voiceid||"","&action=",e.action,"&__biz=",parent.window.biz||"","&mid=",parent.window.mid||"","&idx=",parent.window.idx||"","&scene=",parent.window.scene||"","&t=",Math.random()].join("");
s({
type:"GET",
url:i,
timeout:2e4
});
}
function t(e){
s({
type:"POST",
url:"/mp/videoreport?#wechat_redirect",
timeout:5e3,
async:e.async===!0?!0:!1,
data:e.data
});
}
function o(e){
for(var i=JSON.parse(JSON.stringify(e.data)),t=[],o=0,n=i.seek_position.length;n>o;o++){
var a=i.seek_position[o];
if(a&&a.length>0){
var d=a.join("#");
t.push(d||"");
}else t.push("");
}
i.seek_position=t;
for(var r=[],o=0,n=i.seek_loaded.length;n>o;o++){
var a=i.seek_loaded[o];
if(a&&a.length>0){
var d=a.join(",");
r.push(d||"");
}else r.push("");
}
i.seek_loaded=r;
for(var p=[],c=30;i.musicid.length>0;){
var a={};
for(var o in i)i.hasOwnProperty(o)&&("[object Array]"==Object.prototype.toString.call(i[o])?(a[o]=i[o].splice(0,c),
a[o]=a[o].join("mtitle"==o?";#":";")):a[o]=i[o]);
p.push(a);
}
return p;
}
function n(e){
var i=window.cgiData&&window.cgiData.txvideo_openid?window.cgiData.txvideo_openid:"",t=encodeURIComponent(parent.window.location.href.replace(/(\?|&)(key|uin)=([\S\s]*?)(&|$)/g,"$1").replace(/&$/,"")),o=["http://btrace.qq.com/kvcollect?BossId=2973&Pwd=1557019983&step=1009&vid=","undefined"!=typeof e.vid?e.vid:"","&platform=",d(),"&val=","undefined"!=typeof e.val?e.val:"","&val1=","undefined"!=typeof e.val1?e.val1:"","&vurl=",encodeURIComponent(e.vurl),"&t=",Math.random(),"&url=",t,"&wx_openid=",i].join(""),n=new Image;
n.src=o.substr(0,1024);
}
function a(e){
if(3==e.step||6==e.step||1999==e.step){
var i=window.cgiData&&window.cgiData.txvideo_openid?window.cgiData.txvideo_openid:"",t=encodeURIComponent(parent.window.location.href.replace(/(\?|&)(key|uin)=([\S\s]*?)(&|$)/g,"$1").replace(/&$/,"")),o=["http://btrace.qq.com/kvcollect?BossId=2973&Pwd=1557019983&step=",e.step,"&vid=","undefined"!=typeof e.vid?e.vid:"","&platform=",d(),"&loadwait=","undefined"!=typeof e.loadwait?e.loadwait:"","&val=","undefined"!=typeof e.val?e.val:"","&t=",Math.random(),"&url=",t,"undefined"!=typeof e.vt&&""!==e.vt&&6==e.step?"&vt="+e.vt:"","&wx_openid=",i].join(""),n=new Image;
n.src=o.substr(0,1024);
}
}
function d(){
var e=_.device;
return e.ipad?60101:e.is_android_phone?60301:e.iphone?60401:e.is_android_tablet?60501:"";
}
function r(){
var e=_.device;
return e.ipad?"v4010":e.is_android_phone&&_.isUseProxy()?"v5060":e.is_android_phone?"v5060":e.iphone&&_.isUseProxy()?"v3060":e.iphone?"v3060":e.is_android_tablet?"v6010":"";
}
function p(e){
var i={
mid:window.mid||0,
__biz:window.biz||0,
idx:window.idx||0,
musicid:[],
hasended:[],
commentid:[],
scene_type:e.type||0,
mtitle:[],
detail_click:[],
app_btn_kv:0,
app_btn_click:0,
app_btn_type:0,
errorcode:[],
seek:[],
seek_position:[],
duration2:[],
play_duration2:[],
play_last_time:[],
local_time:[],
seek_loaded:[]
};
return i;
}
function c(){
var e={
videoerror:0,
like_kv_vid:"",
like_click_vid:"",
like_kv_alginfo:"",
like_click_alginfo:"",
tad:"",
page:0,
like_click_type:0,
iplat:2,
ptype:1,
rtype:"",
getvinfo_ret:-1,
getvinfo_time:0,
v_err_code:0,
loadwait:0,
hasended:0,
last_ms:0,
duration_ms:0,
app_btn_kv:0,
app_btn_click:0,
app_btn_type:0,
mid:"",
__biz:"",
idx:"",
detail_click:0,
vtitle:"",
vid:"",
commentid:"",
scene_type:0,
replay:0,
full_screen:0,
quick_play:0,
ad_play_time:-1,
video_play_time:-1,
click_play_button:0,
traceid:"",
webviewid:"",
orderid:0,
play_time:0,
client_time_when_play:Math.round(+new Date/1e3),
drag_times:"",
pause_num:0,
h5_profile:0,
to_article:0,
desc_more_click:0,
desc_more_show:0,
fromid:0,
openid:window.cgiData&&window.cgiData.txvideo_openid?window.cgiData.txvideo_openid:"",
file_size:0,
rate:0,
resolution:0,
format:"",
vt:"",
video_ext:"unknown",
content_url:parent.window.location.href,
auto_play:0,
ori_status:3,
hit_bizuin:"",
sessionid:window.sessionid||"",
hit_vid:""
};
return e;
}
function l(e,i,t){
var o=0,n=[],a={};
if(i&&"[object String]"==Object.prototype.toString.call(i))o=1,"img"==t&&(i=encodeURIComponent(i)),
n.push("log0="+i),a.log0=i;else if(i&&"[object Array]"==Object.prototype.toString.call(i)){
o=i.length;
for(var d=0;o>d;d++){
var r="img"==t?encodeURIComponent(i[d]):i[d];
n.push("log"+d+"="+r),a["log"+d]=r;
}
}
if("img"==t){
var p=new Image,c="//mp.weixin.qq.com/mp/jsmonitor?idkey="+e;
o>0&&(c+="&lc="+o+"&"+n.join("&")),c+="&t="+Math.random(),p.src=c;
}else{
var l={};
o>0&&(l=a),l.idkey=e,l.lc=o,s({
type:"POST",
url:"//mp.weixin.qq.com/mp/jsmonitor?",
timeout:1e4,
data:l,
dataType:"json"
});
}
}
var s=e("biz_wap/utils/ajax.js"),_=e("pages/version4video.js");
return{
report:i,
videoreport:t,
getPlatformType:d,
getsdtfrom:r,
getinfoReport:n,
qqvideo_common_report:a,
musicreport:o,
getMusicReportData:p,
getVideoReportData:c,
logReport:l
};
});define("pages/player_adaptor.js",["pages/music_player.js","biz_wap/utils/jsmonitor_report.js","pages/loadscript.js","pages/music_report_conf.js"],function(t){
"use strict";
function i(t,i){
0!=t.type&&1!=t.type||!p.inQMClient?"function"==typeof i.callback&&i.callback(new a.init(t)):(p.initPlayerQueue.push(e("QMClient",t,i)),
n("QMClient"));
}
function e(t,i,e){
var n=p.config[t].func;
return function(t,i,e,n){
return function(){
"function"==typeof window[i]?"function"==typeof n.callback&&n.callback(new o(e,{
type:t
})):"function"==typeof n.callback&&n.callback(new a.init(e));
};
}(t,n,i,e);
}
function n(t){
var i=p.config[t];
if(1!=i.jsLoadState){
if(2==i.jsLoadState||3==i.jsLoadState)return void r();
i.jsLoadState=1;
var e=+new Date,n=l[t+"_js_num"];
n&&(n=n.split("_"),u.setSum(n[0],n[1],1)),c({
url:i.jsLink,
timeout:1e4,
type:"JS",
callback:function(){
+new Date-e;
2==i.jsLoadState,r();
var n=l[t+"_js_suc"];
n&&(n=n.split("_"),u.setSum(n[0],n[1],1));
},
onerror:function(n){
+new Date-e;
i.jsLoadState=3,r();
var s=l[t+"_js_err"],o=l[t+"_js_timeout"],a=l[t+"_js_network"];
if(s&&o&&a)switch(s=s.split("_"),o=o.split("_"),a=a.split("_"),u.setSum(s[0],s[1],1),
1*n){
case 400:
u.setSum(a[0],a[1],1);
break;

case 500:
u.setSum(o[0],o[1],1);
}
}
});
}
}
function r(){
for(var t=0,i=p.initPlayerQueue.length;i>t;t++)"function"==typeof p.initPlayerQueue[t]&&p.initPlayerQueue[t]();
p.initPlayerQueue=[];
}
function s(){
for(var t in p.config)"function"==typeof p[t+"EvInit"]&&p[t+"EvInit"]();
}
function o(t,i){
if(this.opt=t,this.opt2=i,this._g={
_blockPlugin:{},
playType:"-1"
},"QMClient"==i.type&&p.inQMClient){
var e=p.config[i.type];
e.playerObj||(p.config[i.type].playerObj=new window[e.func]),this._g.playType=i.type,
this.player=e.playerObj,this._initPlugins(),this._bindQMEvent();
}
}
var a=t("pages/music_player.js"),u=t("biz_wap/utils/jsmonitor_report.js"),c=t("pages/loadscript.js"),l=t("pages/music_report_conf.js"),p={
debug:location.href.indexOf("_qqclient=1")>0?!0:!1,
config:{
QMClient:{
func:"Player",
playerObj:null,
jsLink:"https://imgcache.qq.com/music/h5/player/player.js?max_age=604800&v=1",
jsLoadState:-1
}
},
inQMClient:!1,
initPlayerQueue:[]
};
return p.QMClientEvInit=function(){
if(p.inQMClient=window.navigator.userAgent.indexOf("QQMusic/")>0||p.debug?!0:!1,
p.inQMClient&&window.msg_cdn_url&&window.msg_title){
var t=window.location.href,i=a.getQuery("scene",t);
i&&(t=t.replace("&scene="+i,"").replace("?scene="+i,"")),t=t.replace(/#rd$/,"").replace(/#wechat_redirect$/,""),
-1==t.indexOf("?")&&(t+="?"),t+="&scene=112#wechat_redirect";
var e=function(t){
window.WebViewJavascriptBridge?t():document.addEventListener("WebViewJavascriptBridgeReady",t);
},n=(window.msg_title||"").html(!1),r=(window.msg_desc||"").html(!1);
e(function(){
M.client.invoke("ui","setActionBtn",{
type:"icon",
content:"share"
},function(){
M.client.invoke("other","callShareWeb",{
imgUrl:window.msg_cdn_url,
link:t,
title:n,
desc:r
});
});
});
}
},s(),o.prototype={
_initPlugins:function(){
this.opt.plugins||(this.opt.plugins=[]);
for(var t=this.opt.plugins,i=0,e=t.length;e>i;++i){
var n=t[i];
n.setPlayer(this),!!n.init&&n.init();
}
},
_trigger:function(t,i){
var e=this.opt,n=this._g,r=e.plugins,s=n._blockPlugin[t]||n._blockPlugin.all,o=0;
if(s&&"function"==typeof s.recv&&(o|=s.recv(t,i),1&o))return!1;
for(var a=0,u=r.length;u>a&&(o|=r[a].recv(t,i),!(2&o));++a);
if(!(4&o)){
var c=this["__"+t+"Handler"];
c&&c.call(this,i);
}
8&o||this.__triggerOutside(t,i);
},
__triggerOutside:function(){
var t=arguments,i=t[0];
if(i){
i=i.substr(0,1).toUpperCase()+i.substr(1);
var e=this.opt["on"+i];
"function"==typeof e&&e.apply(this,t);
}
},
_setBlockPlugin:function(t,i){
this._g._blockPlugin[t]=i;
},
_bindQMEvent:function(){
var t=this;
this.player.on("play",function(i){
i&&i.song&&i.song.mid==t.opt.mid?(t._trigger("statusChange",1),t._trigger("QMClientPlay")):t._trigger("statusChange",3);
}),this.player.on("pause",function(i){
i&&i.song&&i.song.mid==t.opt.mid&&t._trigger("statusChange",2);
}),this.player.on("stop",function(i){
i&&i.song&&i.song.mid==t.opt.mid&&t._trigger("statusChange",3);
});
},
play:function(){
"QMClient"==this._g.playType&&this.player.play(this.opt.mid);
},
pause:function(){
this.player.pause();
},
stop:function(){
this.player.stop();
},
getDuration:function(){
return this.opt.duration?this.opt.duration:"QMClient"==this._g.playType?this.player.duration||0:0;
},
getCurTime:function(){
return"QMClient"==this._g.playType?this.player.currentTime||0:0;
},
surportSeekRange:function(){
return!1;
},
getSrc:function(){
return"";
},
destory:function(){},
seek:function(){},
setDuration:function(){},
setSrc:function(){}
},{
create:i,
inQMClient:p.inQMClient
};
});define("pages/music_player.js",["biz_wap/utils/mmversion.js","pages/report.js","biz_common/dom/event.js","biz_wap/jsapi/core.js","pages/version4video.js","biz_wap/utils/jsmonitor_report.js","appmsg/log.js"],function(t){
"use strict";
function e(){
b.hasInit||(b.hasInit=!0,p(),c(),r());
}
function i(t){
var i=this;
e(),this._o={
plugins:[],
protocal:"",
wxIndex:0,
type:0,
src:"",
jsapi2Src:"",
mid:"",
autoPlay:!1,
duration:0,
needVioceMutex:!0,
title:"",
allowPause:!1,
singer:"",
epname:"",
coverImgUrl:"",
webUrl:"",
musicbar_url:"",
fileSize:0,
onStatusChange:function(){},
onTimeupdate:function(){},
onError:function(){},
onUpdateSeekRange:function(){},
albumId:"",
audioList:[],
playAudioId:""
},this._extend(t),this._o.audioList.length&&this._o.audioList.forEach(function(t){
t.srcId=b.wxtag+i._o.albumId+"_"+t.audioId;
}),this._status=-1,this._g={
mutexKey:"",
jsapiSrcId:"",
hasCheckPlay:!1,
playTimeoutId:null,
stateChangeCallback:{},
_blockPlugin:{},
hasInitH5Event:!1,
h5Event:{},
totalPlayTime:0
},this._initPlugins(),this._fixAndroidSizeLimit(),0!==b.surportType&&(this._initData(),
this._synPlayStatus());
}
function o(t){
T.invoke("musicPlay",{
app_id:"a",
title:"微信公众平台",
singer:"微信公众平台",
epname:"微信公众平台",
coverImgUrl:"http://res.wx.qq.com/mpres/htmledition/images/favicon.ico",
dataUrl:b.ev,
lowbandUrl:b.ev,
webUrl:"http://mp.weixin.qq.com/s?"
},function(e){
"function"==typeof t&&t(e);
});
}
function a(t){
n({
cur:t,
stopCur:!1
});
}
function n(t){
function e(){
if(b.mutexCount==s&&(s=0,b.mutexCount=0,"function"==typeof a)){
var t=0;
1==b.surportType?t=2e3:3==b.surportType&&(t=0),setTimeout(function(){
a();
},t);
}
}
if(0!=b.mutexCount)return void setTimeout(function(){
n(t);
},200);
var i=t.cur,o=t.stopCur===!0?!0:!1,a=t.callback,s=0;
for(var u in b.mutexPlayers)for(var r=0,p=b.mutexPlayers[u].length;p>r;r++)s++;
for(var u in b.mutexPlayers)for(var r=0,p=b.mutexPlayers[u].length;p>r;r++){
var d=b.mutexPlayers[u][r];
if(d&&d!==i){
var l=d.getSurportType(),c="";
2!=l||1!=d._status&&4!=d._status?1!=l&&3!=l||1!=d._status&&2!=d._status&&4!=d._status||(c="stop"):c=d._o.allowPause?"pause":"stop",
c&&"function"==typeof d[c]?d[c](o,function(){
b.mutexCount++,e();
}):(b.mutexCount++,e());
}else b.mutexCount++,e();
}
}
function s(){
return b.surportType;
}
function u(t,e){
return new i(t,e);
}
function r(){
b.surportType>0&&b.isAndroidLow&&window.addEventListener("canplay",function(t){
t.target&&"function"==typeof t.target.play&&t.target.play();
},!0);
}
function p(){
b.jsapiGlobalEvent={
error:_,
pause:y,
stop:h,
play:g,
preempted:h,
waiting:f
};
}
function d(t){
return"&"+b.wxtag+"="+t;
}
function l(t,e){
e=e||"info";
var i="[musicplay]"+t+"[location:"+location.href+"]";
I(i,e);
}
function c(){
T.on("onBackgroundAudioStateChange",function(t){
if(t.state){
var e;
t.albumId?(e=t.albumId,t.srcId=""):t.srcId&&t.audioId&&(e=t.srcId.match(new RegExp(b.wxtag+"(.*?)_"+t.audioId)))?(e=e[1],
t.srcId="",t.albumId=e):(e=P(b.wxtag,t.src)||"",e&&(e=d(e)));
var i=b.mutexPlayers[t.src]||b.mutexPlayers2[t.src]||b.mutexPlayers[e];
if(i){
var o;
if(t.srcId)for(var a=0,n=i.length;n>a;a++)i[a]._g.jsapiSrcId==t.srcId&&(o=i[a]);else if(1==i.length)o=i[0];else for(var a=0,n=i.length;n>a;a++)if(-1!=i[a]._status&&0!=i[a]._status&&3!=i[a]._status){
o=i[a];
break;
}
if(o&&o._g.stateChangeCallback){
t.albumId===o._o.albumId&&t.audioId!==o.getPlayAudioId()&&(o.setPlayAudioId(t.audioId),
o._initJsapiData());
var s=t.state;
"ended"==s&&(s="stop"),"wait"==s&&(s="waiting");
var u=!1,r=JSON.stringify(t||{});
if("error"==s){
o.jsapiLog("onBackgroundAudioStateChange error;res:"+r);
for(var p in o._g.stateChangeCallback)o._g.stateChangeCallback.hasOwnProperty(p)&&"function"==typeof o._g.stateChangeCallback[p]&&(u=!0,
o._g.stateChangeCallback[p](-1,t.errMsg||""),o._g.stateChangeCallback[p]=null);
}else"function"==typeof o._g.stateChangeCallback[s]&&(b.debug,o.jsapiLog("onBackgroundAudioStateChange "+s+";res:"+r),
u=!0,o._g.stateChangeCallback[s](0),o._g.stateChangeCallback[s]=null);
u||"function"!=typeof b.jsapiGlobalEvent[s]||(o.jsapiLog("onBackgroundAudioStateChange "+s+" unHandle;res:"+r),
b.jsapiGlobalEvent[s](t,o));
}
}
}
});
}
function _(t,e){
e.stop(!1),e._trigger("jsapi2PlayingErr");
}
function h(t,e){
e.stop(!1,null,t),e._trigger("jsapi2PlayingStop");
}
function y(t,e){
e.pause(!1,null,!0),e._trigger("jsapi2PlayingPause");
}
function g(t,e){
1!=e._status&&e.resume(!1,null,!0);
}
function f(t,e){
e.onload();
}
function m(){
for(var t in b.mutexPlayers)if(b.mutexPlayers.hasOwnProperty(t))for(var e=0,i=b.mutexPlayers[t].length;i>e;e++){
var o=b.mutexPlayers[t][e];
if(o&&1==o._status&&(1==o._surportType||3==o._surportType)){
o._trigger("unloadPlaying");
break;
}
}
}
function P(t){
var e=arguments[1]||window.location.search,i=new RegExp("(^|&)"+t+"=([^&]*)(&|$)"),o=e.substr(e.indexOf("?")+1).match(i);
return null!=o?o[2]:"";
}
function S(t,e,i){
function o(t,e){
for(;b.synPlayStatusArr.length>0;){
var i=b.synPlayStatusArr.shift();
i&&"function"==typeof i[t]&&i[t](e);
}
}
b.synPlayStatusArr.push({
_t:t,
onSuccess:e,
onError:i
}),b.synPlayStatusId&&clearTimeout(b.synPlayStatusId),b.synPlayStatusId=setTimeout(function(){
t._jsapi_getMusicPlayerState({
onSuccess:function(t){
o("onSuccess",t);
},
onError:function(t){
o("onError",t);
}
});
},0);
}
var v=t("biz_wap/utils/mmversion.js"),T=(t("pages/report.js"),t("biz_common/dom/event.js"),
t("biz_wap/jsapi/core.js")),A=t("pages/version4video.js"),I=(t("biz_wap/utils/jsmonitor_report.js"),
t("appmsg/log.js")),b={
hasInit:!1,
synPlayStatusId:null,
synPlayStatusArr:[],
inWechat:!A.device.inWechat||A.device.inWindowWechat||A.device.inMacWechat?!1:!0,
mutexCount:0,
ev:0!=window._empty_v.indexOf(window.location.protocol)?"http:"+window._empty_v:window._empty_v,
debug:location.href.indexOf("vconsole=1")>0||document.cookie&&document.cookie.indexOf("vconsole_open=1")>-1?!0:!1,
_playtype:1*P("_playtype")||0,
isAndroidLow:/android\s2\.3/i.test(navigator.userAgent),
isAndroid:v.isAndroid,
surportType:"addEventListener"in window?2:0,
mutexPlayers:{},
mutexPlayers2:{},
wxtag:"__wxtag__"
};
return i.prototype._initPlugins=function(){
for(var t=this._o.plugins,e=0,i=t.length;i>e;++e){
var o=t[e];
o.setPlayer(this),!!o.init&&o.init();
}
},i.prototype._trigger=function(t,e){
var i=this._o,o=this._g,a=i.plugins,n=o._blockPlugin[t]||o._blockPlugin.all,s=0;
if(n&&"function"==typeof n.recv&&(s|=n.recv(t,e),1&s))return!1;
for(var u=0,r=a.length;r>u&&(s|=a[u].recv(t,e),!(2&s));++u);
if(!(4&s)){
var p=this["__"+t+"Handler"];
p&&p.call(this,e);
}
8&s||this.__triggerOutside(t,e);
},i.prototype.__triggerOutside=function(){
var t=arguments,e=t[0];
if(e){
e=e.substr(0,1).toUpperCase()+e.substr(1);
var i=this._o["on"+e];
"function"==typeof i&&i.apply(this,t);
}
},i.prototype._setBlockPlugin=function(t,e){
this._g._blockPlugin[t]=e;
},i.prototype._synPlayStatus=function(){
function t(t){
if(s&&clearTimeout(s),n.hasCheckPlay===!0,n.hasCheckPlay=!0,o._surportType=3,b.surportType=3,
!!b.debug&&console.log("_synPlayStatus mutexKey:"+n.mutexKey),t&&t.audioListState)try{
t.audioListState=JSON.parse(t.audioListState),t.albumId=t.audioListState.albumId;
}catch(i){}
if(a.albumId){
if(t.albumId&&a.albumId===t.albumId){
var u="waiting"==t.playState||"seeked"==t.playState||"seeking"==t.playState||"play"==t.playState;
o._onAlbumSync({
action:"updatePlayStatus",
isPlay:u
});
}else o._onAlbumSync({
action:"updatePlayStatus",
isPlay:!1
});
e(t);
}else if(t.src&&(a.src==t.src||t.src.indexOf(n.mutexKey)>=0)){
if(t.srcId){
if(t.srcId!=n.jsapiSrcId)return;
}else if(b.mutexPlayers[n.mutexKey].length>1&&b.mutexPlayers[n.mutexKey][0]!==o)return;
e(t);
}
}
function e(t){
o._initJsapiData({
curTime:t.currentTime,
bufferedPercent:t.bufferedPercent,
starTime:+new Date-1e3*t.currentTime
}),o._trigger("jsapi2Begin2Play",t);
var e=o.jsApiData,i="waiting"==t.playState||"seeked"==t.playState||"seeking"==t.playState||"play"==t.playState;
!t.paused||i?(o._onPlay(),o._analogUpdateTime()):(o._onTimeupdate(null,e.curTime),
o._onPause()),o._getMusicPlayerState();
}
function i(){
s&&clearTimeout(s),n.hasCheckPlay!==!0&&(n.hasCheckPlay=!0,o._o.autoPlay&&o.play());
}
var o=this,a=this._o,n=this._g;
if(!b.inWechat||1*b._playtype>0)return n.hasCheckPlay=!0,void(o._o.autoPlay&&o.play());
var s;
S(o,t,i);
+new Date;
s=setTimeout(function(){
i();
},a.syncTimeout||1e4);
},i.prototype._fixAndroidSizeLimit=function(){
if(!(1*b._playtype>0)&&b.isAndroid){
var t=this._o;
!t.fileSize||t.fileSize>300||v.gtVersion("6.3.28",!0)||(this._trigger("androidForceH5"),
this._g._playtype=2);
}
},i.prototype._createAutoAndPlay=function(){
function t(){
function t(){
e._h5Audio.src=e._o.albumId&&e._o.playAudioId?e.getPlayAudioOpt().src:e._o.src;
}
e._trigger("h5Begin2Play"),e._h5Audio=document.createElement("audio"),e._initH5Data(!0),
e._H5bindEvent(!0),e._h5Audio.setAttribute("style","height:0;width:0;display:none"),
e._h5Audio.setAttribute("autoplay",""),e._status=0,e._onLoading(),b.isAndroidLow?(t(),
document.body.appendChild(e._h5Audio),e._h5Audio.load()):(document.body.appendChild(e._h5Audio),
setTimeout(function(){
t(),e._h5Audio.play();
},0)),e._surportType=2;
}
var e=this;
b.inWechat?this._stopJsapiPlay(!0,function(){
t();
}):t();
},i.prototype._destoryH5Audio=function(){
this._h5Audio&&(-1!=this._status&&"function"==typeof this._h5Audio.pause&&this._h5Audio.pause(),
document.body.removeChild(this._h5Audio),this._h5Audio=null,this._status=-1);
},i.prototype._onLoading=function(t){
this._status=4;
try{
a(this);
}catch(t){}
"function"==typeof this._o.onStatusChange&&this._o.onStatusChange.call(this,t||{},this._status),
this._endCountTime();
},i.prototype._onPlay=function(t){
this._status=1;
try{
a(this);
}catch(t){}
"function"==typeof this._o.onStatusChange&&this._o.onStatusChange.call(this,t||{},this._status),
this._startCountTime();
},i.prototype._onPause=function(t){
this._status=2,"function"==typeof this._o.onStatusChange&&this._o.onStatusChange.call(this,t||{},this._status),
this._endCountTime();
},i.prototype._onAlbumSync=function(t){
"function"==typeof this._o.onAlbumSync&&this._o.onAlbumSync.call(this,t||{});
},i.prototype.getAudioListState=function(t,e){
T.invoke("getBackgroundAudioState",{
albumId:t
},function(t){
if(t&&t.audioListState){
if("string"==typeof t.audioListState)try{
t.audioListState=JSON.parse(t.audioListState);
}catch(i){
t.audioListState={};
}
e(t.audioListState);
}
});
},i.prototype._onEnd=function(t){
this._status=3,"function"==typeof this._o.onStatusChange&&this._o.onStatusChange.call(this,t||{},this._status),
this._endCountTime();
},i.prototype._onLoadedmetadata=function(t){
"function"==typeof this._o.onLoadedmetadata&&this._o.onLoadedmetadata.call(this,t||{});
},i.prototype._onUpdateSeekRange=function(t){
this.surportSeekRange()&&(t=Math.max(t,0),t=Math.min(t,100),"function"==typeof this._o.onUpdateSeekRange&&this._o.onUpdateSeekRange.call(this,t));
},i.prototype._onTimeupdate=function(t,e){
"function"==typeof this._o.onTimeupdate&&this._o.onTimeupdate.call(this,t||{},e),
e>0&&this._startCountTime();
},i.prototype._onError=function(t,e){
this._status=-1,"function"==typeof this._o.onError&&this._o.onError.call(this,t||{},e);
},i.prototype._initH5Event=function(){
var t=this,e=this._o,i=this._g;
if(!t._g.hasInitH5Event){
t._g.hasInitH5Event=!0;
var o=i.h5Event;
o.canplaythrough=function(e){
t._h5Audio&&(!!b.debug&&console.log("h5 canplaythrough"),t._h5Data.firstCanplaythrough=!0,
t._onPlay(e),t._onUpdateSeekRange(t._h5Data.downloadDuration||0));
},o.play=function(e){
t._h5Audio&&(!!b.debug&&console.log("h5 "+e.type),t._h5Data.firstCanplaythrough===!0&&(t._onPlay(e),
t._onUpdateSeekRange(t._h5Data.downloadDuration||0)));
},o.ended=function(e){
t._h5Audio&&(!!b.debug&&console.log("h5 ended"),t._onUpdateSeekRange(t._h5Data.downloadDuration),
t._onEnd(e));
},o.pause=function(e){
t._h5Audio&&(!!b.debug&&console.log("h5 pause"),t._o.allowPause!==!0||0==t._h5Audio.currentTime?t._onEnd(e):t._onPause(e));
},o.waiting=function(e){
t._h5Audio&&(!!b.debug&&console.log("h5 "+e.type),(1==t._status||2==t._status||4==t._status)&&t._onLoading(e));
};
var a,n=100;
o.seeking=function(e){
t._h5Audio&&(!!b.debug&&console.log("h5 "+e.type),(1==t._status||2==t._status||4==t._status)&&t._onLoading(e),
a=setTimeout(function(){
!!b.debug&&console.log("seek loading Timeout excute"),a=null,t._trigger("seekNeed2Load");
},n));
},o.seeked=function(e){
t._h5Audio&&(!!b.debug&&console.log("h5 seeked"),(1==t._status||2==t._status||4==t._status)&&(t._onPlay(e),
t._h5Audio.play()),a&&(clearTimeout(a),a=null,t._trigger("seekNotNeed2Load")));
},o.error=function(e){
var i=1*e.target.error.code||5;
(1>i||i>5)&&(i=5),t._trigger("h5Error",{
code:i
}),t._onError(e,{
type:1,
code:i
}),t._destoryH5Audio();
},o.timeupdate=function(i){
t._h5Audio&&((1==t._status||4==t._status)&&t._onUpdateSeekRange(t._getH5DownloadDuration()),
1==t._status&&t._onTimeupdate(i,t._h5Audio.currentTime),"undefined"!=typeof e.duration&&1*e.duration>0&&t._h5Audio.currentTime>=e.duration&&t._h5Stop());
},o.loadedmetadata=function(e){
t._h5Audio&&t._onLoadedmetadata(e);
};
}
},i.prototype._H5bindEvent=function(t){
var e=(this._o,this._g),i={
canplaythrough:"canplaythrough",
play:"play",
playing:"play",
ended:"ended",
pause:"pause",
seeking:"seeking",
waiting:"waiting",
seeked:"seeked",
error:"error"
};
try{
for(var o in i)i.hasOwnProperty(o)&&this._h5Audio.removeEventListener(o,e.h5Event[i[o]]);
this._h5Audio.removeEventListener("timeupdate",e.h5Event.timeupdate),this._h5Audio.removeEventListener("loadedmetadata",e.h5Event.loadedmetadata);
}catch(a){}
if(t){
for(var o in i)i.hasOwnProperty(o)&&this._h5Audio.addEventListener(o,e.h5Event[i[o]],!1);
"function"==typeof this._o.onTimeupdate&&this._h5Audio.addEventListener("timeupdate",e.h5Event.timeupdate,!1),
"function"==typeof this._o.onLoadedmetadata&&this._h5Audio.addEventListener("loadedmetadata",e.h5Event.loadedmetadata,!1);
}
},i.prototype._initData=function(){
var t=this._o;
this._createMutexKey(),b.mutexPlayers[this._g.mutexKey]?b.mutexPlayers[this._g.mutexKey].push(this):b.mutexPlayers[this._g.mutexKey]=[this],
t.jsapi2Src&&t.jsapi2Src!=t.src&&(b.mutexPlayers2[t.jsapi2Src]?b.mutexPlayers2[t.jsapi2Src].push(this):b.mutexPlayers2[t.jsapi2Src]=[this]),
this._initH5Event();
},i.prototype._createMutexKey=function(){
if(this._o.albumId)this._g.mutexKey=this._o.albumId,this._g.jsapiSrcId=b.wxtag+"_"+this._o.wxIndex;else{
var t=this._o.mid||"";
this._o.src?(this._g.mutexKey=this._o.src,this._g.jsapiSrcId=b.wxtag+"_"+this._o.wxIndex):(this._g.mutexKey=d(t),
this._g.jsapiSrcId=this._g.mutexKey+"_"+this._o.wxIndex);
}
},i.prototype._extend=function(t){
for(var e in t)this._o[e]=t[e];
},i.prototype._initH5Data=function(t){
this._h5Data={
firstCanplaythrough:t===!0?!1:!0,
downloadDuration:0,
lastPlaytime:null
};
},i.prototype._initJsapiData=function(t){
t=t||{},this.jsApiData&&(this.jsApiData.updateTimeoutId&&clearTimeout(this.jsApiData.updateTimeoutId),
this.jsApiData.getStatusId&&clearTimeout(this.jsApiData.getStatusId)),this.jsApiData={
getStatusId:null,
getStatusTime:t.getStatusTime||2500,
updateTimeoutId:null,
seeking:!1,
starTime:t.starTime||+new Date,
curTime:t.curTime||0,
bufferedPercent:t.bufferedPercent||0,
duration:this._o.duration||t.duration||void 0,
lastPlaytime:null,
albumId:"",
audioId:""
};
},i.prototype._getMusicPlayerState=function(){
var t=this,e=t._o,i=t.jsApiData;
i&&i.getStatusId&&clearTimeout(i.getStatusId),t._jsapi_getMusicPlayerState({
onSuccess:function(o){
if(o&&o.audioListState&&"string"==typeof o.audioListState)try{
o.audioListState=JSON.parse(o.audioListState),o.albumId=o.audioListState.albumId;
}catch(a){
o.audioListState={};
}
(o.albumId&&o.albumId===e.albumId||o.src==e.jsapi2Src||o.src==e.src)&&(i.curTime=o.currentTime,
i.starTime=+new Date-1e3*o.currentTime,i.bufferedPercent=o.bufferedPercent,i.albumId=o.albumId||"",
i.audioId=o.audioId||"",(1==t._status||2==t._status||4==t._status)&&(i.getStatusId=setTimeout(function(){
t._getMusicPlayerState();
},i.getStatusTime)),t._onUpdateSeekRange(i.bufferedPercent),1==o.paused&&1==t._status?(b.debug&&console.log("_getMusicPlayerState force syn"),
t._pauseJsapiPlay(!1)):0==o.paused&&2==t._status&&(b.debug&&console.log("_getMusicPlayerState force syn"),
t._resumeJsapiPlay(!1))),t._o.onMusicPlayerInfo&&t._o.onMusicPlayerInfo(o);
},
onError:function(){
i.getStatusId=setTimeout(function(){
t._getMusicPlayerState();
},i.getStatusTime);
}
});
},i.prototype._analogUpdateTime=function(){
var t=this,e=t.jsApiData;
if(e){
if(e.updateTimeoutId&&clearTimeout(e.updateTimeoutId),1==t._status||2==t._status){
if(1==t._status&&(e.curTime=1*((+new Date-e.starTime)/1e3).toFixed(2)),e.curTime>=e.duration)return t._stopJsapiPlay(!1),
!0;
t._onTimeupdate(null,e.curTime);
}
return e.updateTimeoutId=setTimeout(function(){
t._analogUpdateTime();
},1e3),!1;
}
},i.prototype._jsapi_getMusicPlayerState=function(t){
var e=this._o,i={};
e.albumId&&(i.albumId=e.albumId),T.invoke("getBackgroundAudioState",{},function(i){
if(/:ok$/.test(i.err_msg)){
if(i.paused=1*i.paused,i.currentTime=i.currentTime?(1*i.currentTime).toFixed(2):0,
i.buffered){
var o=Math.floor(i.buffered/e.duration*100);
o=Math.max(o,0),o=Math.min(o,100),i.bufferedPercent=o;
}else i.bufferedPercent=0;
"function"==typeof t.onSuccess&&t.onSuccess(i);
}else"function"==typeof t.onError&&(console.log("get err invoke err",i),t.onError(i));
});
},i.prototype._jsapi_musicPlay=function(t){
if(this._h5Audio&&this._destoryH5Audio(),2==b._playtype)return void("function"==typeof t.onError&&t.onError({}));
var e=this,i=this._o;
this.jsapiLog("jsapi_musicPlay"),T.invoke("musicPlay",{
app_id:"a",
title:i.title,
singer:i.singer,
epname:i.epname,
coverImgUrl:i.coverImgUrl,
dataUrl:i.src,
lowbandUrl:i.src,
webUrl:i.webUrl
},function(o){
!!b.debug&&console.log("playlog:"+JSON.stringify(o||{})),o.err_msg.indexOf("ok")>=0?(e._trigger("jsapi1Begin2Play"),
e._surportType=1,b.surportType=1,e._initJsapiData(),e._onPlay(),"undefined"!=typeof i.duration&&1*i.duration>0&&e._analogUpdateTime(),
e._onUpdateSeekRange(0),"function"==typeof t.onSuccess&&t.onSuccess(o)):"function"==typeof t.onError&&t.onError(o);
});
},i.prototype._jsapi_setBackgroundAudioState=function(){
var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
this._h5Audio&&this._destoryH5Audio(),console.log("_playtype",b._playtype);
var e=t.onSuccess,i=t.onError,o=t.needStartMusicUI,a=t.playAudioId;
if("function"!=typeof e&&(e=function(){}),"function"!=typeof i&&(i=function(){}),
1*b._playtype>0){
var n={};
return n.err_code=1,void i(n);
}
var s=this,u=this._o,r=s._g;
console.log("invoke set setBackgroundAudioState with param",u),this.jsapiLog("jsapi_setBackgroundAudioState");
var p;
u.albumId?(s.setPlayAudioId(a),u.audioList.forEach(function(t){
t.audioId===a?(t.stopTime>=0&&t.stopTime<t.duration&&(t.startTime=t.stopTime),t.stopTime>=t.duration&&(t.startTime=0)):t.startTime=0,
t.isaac&&(t.src+="&voice_type=1");
}),p={
albumId:u.albumId,
playAudioId:a,
audioList:u.audioList
}):p={
protocol:u.protocal||"",
src:u.jsapi2Src||u.src,
lowbandUrl:u.jsapi2Src||u.src,
title:u.title,
epname:u.epname,
singer:u.singer,
srcId:r.jsapiSrcId,
coverImgUrl:u.coverImgUrl,
webUrl:u.webUrl,
musicbar_url:u.musicbar_url||"",
needStartMusicUI:1*o>0?1:0
},T.invoke("setBackgroundAudioState",p,function(t){
if(!!b.debug&&console.log("setBackgroundAudioState log:"+JSON.stringify(t||{})),
t.err_msg.indexOf("ok")>=0){
var a=1*s._status;
!o||1!==a&&2!==a&&4!==a?(e("waiting"),r.stateChangeCallback.play=function(t,o){
0==t?e("play"):0!=t&&i({
err_code:2,
err_msg:o||""
});
}):e();
}else t=t||{},t.err_code=1,i(t);
});
},i.prototype._jsapi_operateBackgroundAudio=function(t){
var e=this,i=(this._o,e._g),o=1*t.position||0,a=t.type;
this.jsapiLog("jsapi_operateBackgroundAudio;param:"+JSON.stringify(t||{})),T.invoke("operateBackgroundAudio",{
operationType:a,
currentTime:o
},function(e){
!!b.debug&&console.log("operateBackgroundAudio "+a+",position:"+o+", log:"+JSON.stringify(e||{})),
-1===e.err_msg.indexOf("ok")&&("function"==typeof t.onError&&t.onError(e),"seek"===a?(i.stateChangeCallback.seeking=null,
i.stateChangeCallback.seeked=null):i.stateChangeCallback[a]=null);
}),"seek"==a?(i.stateChangeCallback.seeking=function(e,i){
0==e&&"function"==typeof t.onSuccess?t.onSuccess("seeking",o):0!=e&&"function"==typeof t.onError&&t.onError({
err_msg:i||""
});
},i.stateChangeCallback.seeked=function(e,i){
0==e&&"function"==typeof t.onSuccess?t.onSuccess("seeked",o):0!=e&&"function"==typeof t.onError&&t.onError({
err_msg:i||""
});
}):i.stateChangeCallback[a]=function(e,i){
0==e&&"function"==typeof t.onSuccess?t.onSuccess():0!=e&&"function"==typeof t.onError&&t.onError({
err_msg:i||""
});
};
},i.prototype._jsapiPlay=function(){
{
var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],e=this;
this._o;
}
console.log("supporttype",b.surportType);
var i=t.onError,o=t.onSuccess,a=t.needStartMusicUI,n=t.playAudioId;
"function"!=typeof i&&(i=function(){}),"function"!=typeof o&&(o=function(){}),1==b.surportType?a?i():this._jsapi_musicPlay({
onError:function(){
e._h5Play({
playAudioId:n
});
}
}):this._jsapi_setBackgroundAudioState({
playAudioId:n,
needStartMusicUI:a,
onSuccess:function(t){
"waiting"===t?(e._trigger("jsapi2Begin2Play",t),e._initJsapiData(),e._surportType=3,
b.surportType=3,e._onLoading()):"play"===t&&(e._initJsapiData(),e._onPlay(),e._analogUpdateTime(),
e._getMusicPlayerState(),e._trigger("jsapi2PlaySuccess")),"function"==typeof o&&(o(),
o=null,i=null);
},
onError:function(t){
t&&1==t.err_code&&!a?e._jsapi_musicPlay({
onError:function(){
e._h5Play({
playAudioId:n
});
}
}):(a||e._h5Play({
playAudioId:n
}),e._trigger("jsapi2Begin2PlayErr")),"function"==typeof i&&(i(),i=null,o=null);
}
});
},i.prototype._getJsapiDownloadSec=function(){
this._getMusicPlayerState();
var t=Math.floor(this._o.duration*this.jsApiData.bufferedPercent/100);
return!!b.debug&&console.log("downloadSec:"+t),t;
},i.prototype._jsapiSeek=function(t){
function e(){
a.seeking=!1,i._onPlay(),a.starTime=+new Date-1e3*b.seekingPosition,i._analogUpdateTime(),
i._getMusicPlayerState();
}
var i=this,o=this._g,a=(this._o,this.jsApiData),n=parseInt(t,10);
this._o.duration&&n>=this._o.duration&&(n=this._o.duration-1),a.getStatusId&&clearTimeout(a.getStatusId),
a.updateTimeoutId&&clearTimeout(a.updateTimeoutId),a.seekWaitId&&clearTimeout(a.seekWaitId),
a.seeking=!0;
var s,u,r=100;
b.seekingPosition=n,a.starTime=+new Date-1e3*b.seekingPosition,console.log("begin to seek to",n),
this._jsapi_operateBackgroundAudio({
type:"seek",
position:n,
onError:function(){
i._trigger("seekErr"),!!b.debug&&console.log("seek callback fail"),a.seeking=!1,
i._analogUpdateTime(),i._getMusicPlayerState();
},
onSuccess:function(t){
console.log("jsapi seek res is ",t),"seeking"==t?(!!b.debug&&console.log("seeking callback success"),
a.seeking=!0,o.stateChangeCallback.play=function(){
console.log("seeked to play"),s&&(clearTimeout(s),s=null),e();
},u=setTimeout(function(){
u=null,i._trigger("seekNeed2Load");
},r)):"seeked"==t&&((2==i._status||4==i._status)&&(s=setTimeout(function(){
!!b.debug&&console.log("setTimeout to play"),o.stateChangeCallback.play=null,a.seeking=!1,
a.curTime=n,i._resumeJsapiPlay(!0);
},1e3)),u&&(clearTimeout(u),u=null,i._trigger("seekNotNeed2Load")));
}
}),i._getMusicPlayerState();
},i.prototype._resumeJsapiPlay=function(t,e){
function i(t){
var e=o.jsApiData;
e.starTime=+new Date-1e3*e.curTime,o._onPlay(),o._analogUpdateTime(),o._getMusicPlayerState(),
"function"==typeof t&&t();
}
var o=this;
1==this._surportType?this._jsapiPlay():3==this._surportType&&(t?this._jsapi_operateBackgroundAudio({
type:"play",
onError:function(){
o._stopJsapiPlay(!1,function(){
o.play();
});
},
onSuccess:function(){
i(e);
}
}):i(e));
},i.prototype._pauseJsapiPlay=function(t,e,i){
function o(t){
var e=a.jsApiData;
a._analogUpdateTime(),a._getMusicPlayerState(),e.updateTimeoutId=null,t===!0&&e&&e.getStatusId&&clearTimeout(e.getStatusId),
1==a._status&&a._onPause();
}
var a=this;
return 2==a._status?(o(e),void("function"==typeof i&&i())):void(1==this._surportType?this._stopJsapiPlay(t,i):3==this._surportType&&(t?this._jsapi_operateBackgroundAudio({
type:"pause",
onSuccess:function(){
o(e),"function"==typeof i&&i();
},
onError:function(){
a._stopJsapiPlay(!0,i);
}
}):(o(e),"function"==typeof i&&i())));
},i.prototype._stopJsapiPlay=function(t,e,i){
function a(t,e){
n._onTimeupdate(null,0),n._onUpdateSeekRange(0),n._onEnd(null,e),n._initJsapiData(),
"function"==typeof t&&t();
}
{
var n=this;
n.jsApiData;
}
t?1==n._surportType?o(function(){
a(e);
}):n._jsapi_operateBackgroundAudio({
type:"stop",
onSuccess:function(){
a(e,i);
},
onError:function(){
a(e,i);
}
}):a(e,i);
},i.prototype._getH5DownloadSec=function(){
var t=Math.floor(this._o.duration*this._getH5DownloadDuration()/100);
return!!b.debug&&console.log("h5 downloadSec:"+t),t;
},i.prototype._getH5DownloadDuration=function(){
if(!this._h5Audio)return 0;
if(this._h5Data.downloadDuration>=100)return 100;
var t=this._h5Audio.buffered,e=t.end(t.length-1);
return this._h5Data.downloadDuration=this._o.albumId&&this._o.playAudioId?parseInt(e/this.getPlayAudioOpt().duration*100,10):parseInt(e/this._o.duration*100,10),
this._h5Data.downloadDuration;
},i.prototype._h5Play=function(t){
0!==b.surportType&&(this.jsapiLog("h5Play"),this.setPlayAudioId(t.playAudioId),this._h5Audio?(this._h5Audio.ended||this._h5Audio.paused)&&(this._trigger("h5Begin2Play"),
this._initH5Data(),this._onLoading(),this._H5bindEvent(!0),this._h5Audio.currentTime=0):this._createAutoAndPlay());
},i.prototype._h5Resume=function(){
this._h5Audio&&this._h5Audio.play();
},i.prototype._h5Stop=function(){
this._h5Audio&&(this._onUpdateSeekRange(0),this._onEnd(),this._H5bindEvent(!1),this._h5Audio.pause(),
this._h5Audio.currentTime=0,this._initH5Data());
},i.prototype._h5Seek=function(t){
if(this._h5Audio){
var e=(this._h5Data,parseInt(t,10));
e=Math.min(e,this._o.duration),!!b.debug&&console.log("h5 seek position:"+e),this._h5Audio.currentTime=e;
}
},i.prototype._startCountTime=function(){
1!=this._surportType&&3!=this._surportType||!this.jsApiData?this._h5Audio&&this._h5Data&&null===this._h5Data.lastPlaytime&&(this._h5Data.lastPlaytime=this._h5Audio.currentTime):null===this.jsApiData.lastPlaytime&&(this.jsApiData.lastPlaytime=this.jsApiData.curTime);
},i.prototype._endCountTime=function(){
if(1!=this._surportType&&3!=this._surportType||!this.jsApiData){
if(this._h5Audio&&this._h5Data){
var t=this._h5Audio,e=this._h5Data;
t.currentTime>0&&t.currentTime>e.lastPlaytime&&null!==e.lastPlaytime&&(this._g.totalPlayTime+=t.currentTime-e.lastPlaytime),
e.lastPlaytime=null;
}
}else{
var i=this.jsApiData;
i.curTime>0&&i.curTime>i.lastPlaytime&&null!==i.lastPlaytime&&(this._g.totalPlayTime+=i.curTime-i.lastPlaytime),
i.lastPlaytime=null;
}
},i.prototype._delMutexPlayers=function(){
var t=this._o,e=this._g.mutexKey,i=b.mutexPlayers[e];
if(i){
for(var o=0,a=i.length;a>o;o++)if(i[o]===this){
i.splice(o,1);
break;
}
if(0==i.length)try{
delete b.mutexPlayers[e];
}catch(n){}
}
if(t.jsapi2Src&&b.mutexPlayers2[t.jsapi2Src]){
for(var s=b.mutexPlayers2[t.jsapi2Src],o=0,a=s.length;a>o;o++)if(s[o]===this){
s.splice(o,1);
break;
}
if(0==s.length)try{
delete b.mutexPlayers2[t.jsapi2Src];
}catch(n){}
}
},i.prototype.resetPlayTotalTime=function(){
this._g.totalPlayTime=0;
},i.prototype.getPlayTotalTime=function(){
return this._endCountTime(),this._g.totalPlayTime;
},i.prototype.surportSeekRange=function(){
return 1==b._playtype?!1:2==this._surportType||3==this._surportType?!0:!1;
},i.prototype.setSrc=function(t){
-1==t.indexOf("?")&&(t+="?"),t+=d(this._o.mid),this._o.src=t,this._delMutexPlayers(),
this._g.mutexKey=this._o.src,b.mutexPlayers[this._g.mutexKey]?b.mutexPlayers[this._g.mutexKey].push(this):b.mutexPlayers[this._g.mutexKey]=[this];
},i.prototype.getSrc=function(){
return this._o.src||"";
},i.prototype.setDuration=function(t){
this._o.duration=t||0;
},i.prototype.getSurportType=function(){
return this._surportType||0;
},i.prototype.getPlayStatus=function(){
return this._status;
},i.prototype.getCurTime=function(){
return 1!=this._surportType&&3!=this._surportType||!this.jsApiData?this._h5Audio?this._h5Audio.currentTime:0:this.jsApiData.curTime||0;
},i.prototype.getDuration=function(){
return this._o.duration||void 0;
},i.prototype.pause=function(t,e,i){
return i===!0||this._o.allowPause?void(1==this._surportType||3==this._surportType?this._pauseJsapiPlay(t===!1?!1:!0,!1,function(){
"function"==typeof e&&e();
},function(){
"function"==typeof e&&e();
}):2==this._surportType&&this._h5Audio&&"function"==typeof this._h5Audio.pause&&(this._h5Audio.pause(),
"function"==typeof e&&e())):void this.stop(t,e);
},i.prototype.stop=function(t,e,i){
return 1==this._surportType||3==this._surportType?void this._stopJsapiPlay(t===!1?!1:!0,e,i):(2==this._surportType&&this._h5Audio&&this._h5Stop(),
void("function"==typeof e&&e()));
},i.prototype.destory=function(){
this.stop(),this._h5Audio&&(document.body.removeChild(this._h5Audio),this._h5Audio=null),
this._delMutexPlayers();
},i.prototype.resume=function(t,e,i){
(i===!0||2==this._status&&this._o.allowPause)&&(2==this._surportType&&this._h5Audio?this._h5Resume():b.inWechat&&this._resumeJsapiPlay(t===!1?!1:!0));
},i.prototype.onload=function(){
this._onLoading();
},i.prototype.jsapiLog=function(t,e){
try{
var i=this._o,o={
type:i.type,
src:i.src,
mid:i.mid,
protocal:i.protocal,
webUrl:i.webUrl,
musicbar_url:i.musicbar_url
},a="["+JSON.stringify(o)+"]"+t;
l(a,e);
}catch(n){}
},i.prototype.openStartMusicUI=function(){
var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],e=t.onError,i=t.onSuccess;
"function"!=typeof e&&(e=function(){}),"function"!=typeof i&&(i=function(){}),v.isWechat&&(v.isIOS||v.isAndroid)&&v.gtVersion("7.0.5",!0)?this._jsapiPlay({
needStartMusicUI:!0,
onError:function(){
e();
},
onSuccess:function(){
i();
}
}):e();
},i.prototype.play=function(){
var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],e=this,i=this._g;
if(e._o.src||e._o.albumId){
if(2==e._status&&e._o.allowPause){
if(e._o.src)return void e.resume();
if(e._o.playAudioId&&e._o.playAudioId===t.playAudioId)return void e.resume();
}
return i.playTimeoutId&&clearTimeout(i.playTimeoutId),i.hasCheckPlay?void(b.inWechat?this._jsapiPlay({
playAudioId:t.playAudioId
}):0!=b.surportType&&this._h5Play({
playAudioId:t.playAudioId
})):void(i.playTimeoutId=setTimeout(function(){
e.play();
},1e3));
}
},i.prototype.seek=function(t){
{
var e=this;
this._g;
}
if(1==e._status||2==e._status||4==e._status)return 3==this._surportType?(this._endCountTime(),
void this._jsapiSeek(t)):2==this._surportType&&this._h5Audio?(this._endCountTime(),
void this._h5Seek(t)):void 0;
},i.prototype.getBackgroundAudioState=function(t){
t||(t={}),T.invoke("getBackgroundAudioState",{},function(e){
/:ok$/.test(e.err_msg)?(e.paused=1*e.paused,t.success&&t.success(e)):t.error&&t.error(e);
});
},i.prototype.setOption=function(t){
this._extend(t),t.duration&&this.jsApiData&&(this.jsApiData.duration=t.duration);
},i.prototype.reverseList=function(t){
this._o.audioList.reverse(),this.update(t);
},i.prototype.update=function(t){
if(1===this._status||4===this._status){
var e=this._o.playAudioId;
this._o.audioList.forEach(function(i){
i.startTime=t&&e&&i.audioId===e?t:0;
}),T.invoke("setBackgroundAudioState",{
albumId:this._o.albumId,
playAudioId:this._o.playAudioId||this.jsApiData.audioId,
audioList:this._o.audioList
}),this._o.audioList.forEach(function(t){
console.log(t.audioId);
});
}
},i.prototype.getPlayAudioOpt=function(t){
if(t=t||this._o.playAudioId,!t)return null;
for(var e=0;e<this._o.audioList.length;e++)if(this._o.audioList[e].audioId===t)return this._o.audioList[e];
},i.prototype.getPlayAudioId=function(){
return this._o.playAudioId;
},i.prototype.setPlayAudioId=function(t){
this._o.playAudioId=t;
},{
init:u,
triggerUnloadPlaying:m,
isAndroid:b.isAndroid,
getSurportType:s,
getQuery:P
};
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
});define("appmsg/more_read_tpl.html.js",[],function(){
return'<p class="read-more__desc">你还可以看</p>\n<div class="read-more__article__area">\n  <# list.forEach(function (item) { #>\n    <div class="read-more__article__item">\n      <a href="javascript:;" class="more_read_link"><#=item.title#></a>\n      <# if (item.fans_read_cnt > 0) { #>\n        <p class="read-more__article__extra"><#=item.fans_read_cnt#>位好友读过</p>\n      <# } #>\n    </div>\n  <# }); #>\n</div>';
});define("appmsg/friend_comment_tpl.html.js",[],function(){
return'<#if(window.new_appmsg){#>\n    <div class="discuss_container" id="js_friend_cmt_main" style="display:none">\n        <div class="mod_title_context">\n            <strong class="mod_title">朋友留言</strong>\n            <!-- 没有付费才给写留言入口 -->\n            <#if(window._copyright_stat!=1 || window.need_pay!=1){#>\n            <p class="discuss_icon_tips tr" id="js_cmt_addbtn3" style="display:none">\n                <a href="javascript:;" id="js_cmt_write3">写留言</a> <!-- 有留言的时候的写留言入口 -->\n            </p>\n            <#}#>\n        </div>\n        <!-- <ul class="discuss_list" id="js_friend_cmt_list"></ul> -->\n        <!-- _js_friend_cmt放全部留言，用来计算总高度，展开的时候赋值给js_friend_cmt  -->\n        <!-- js_friend_cmt初始的时候放前三条留言，展开的时候把总高度加上  -->\n        <ul class="friend_cmt_area hide" id="js_friend_cmt_list_hide"></ul>\n        <ul class="friend_cmt_area" id="js_friend_cmt_list"></ul>\n        <p class="friend_cmt_readmore" style="display:none;" id="js_more_friend_cmt_area">\n            <a href="javascript:void(0);" id="js_more_friend_cmt">更多朋友留言</a>\n        </p>\n    </div>\n\n    <!-- 没有付费才给写留言入口 -->\n    <#if(window._copyright_stat!=1 || window.need_pay!=1){#>\n    <div class="discuss_container" id="js_cmt_addbtn4" style="display:none">\n      <div class="mod_title_context">\n        <p class="discuss_icon_tips tc">\n          <a href="javascript:;" id="js_cmt_write4">写留言</a> <!-- 没有留言的时候的写留言入口 -->\n        </p>\n      </div>\n    </div>\n    <#}#>\n\n<#}else{#>\n    <div class="discuss_container" id="js_friend_cmt_main" style="display:none">\n        <p class="discuss_icon_tips title_bottom_tips tr" id="js_cmt_addbtn3" style="display:none">\n            <!-- 没有付费才给写留言入口 -->\n            <#if(window._copyright_stat!=1 || window.need_pay!=1){#>\n            <a href="javascript:;" id="js_cmt_write3"><img class="icon_edit" src="<#=window.comment_edit_icon#>" alt="">留言</a>\n            <#}#>\n        </p>\n        <div class="rich_tips with_line title_tips discuss_title_line">\n            <span class="tips">朋友留言</span>\n        </div>\n        <!-- <ul class="discuss_list" id="js_friend_cmt_list"></ul> -->\n        <!-- _js_friend_cmt放全部留言，用来计算总高度，展开的时候赋值给js_friend_cmt  -->\n        <!-- js_friend_cmt初始的时候放前三条留言，展开的时候把总高度加上  -->\n        <ul class="friend_cmt_area hide" id="js_friend_cmt_list_hide"></ul>\n        <ul class="friend_cmt_area" id="js_friend_cmt_list"></ul>\n        <p class="friend_cmt_readmore" style="display:none;" id="js_more_friend_cmt_area">\n            <a href="javascript:void(0);" id="js_more_friend_cmt">更多朋友留言</a>\n        </p>\n    </div>\n\n    <p class="discuss_icon_tips rich_split_tips tc" id="js_cmt_addbtn4" style="display:none">\n        <!-- 没有付费才给写留言入口 -->\n        <#if(window._copyright_stat!=1 || window.need_pay!=1){#>\n        <a href="javascript:;" id="js_cmt_write4"><img class="icon_edit" src="<#=window.comment_edit_icon#>" alt="">留言</a>\n        <#}#>\n    </p>\n\n<#}#>\n';
});define("appmsg/comment_pc_tpl.html.js",[],function(){
return' <!-- pc端文章页留言 -->\n<#if(window._copyright_stat!=1 || window.need_pay!=1){#>\n<div class="comment_primary_area" id="js_comment_pc" style="display:none">\n    <div class="comment_primary_form" id="js_cmt_addbtn_pc">\n        <div class="comment_primary_form_hd">  \n        <img src="http://mmbiz.qpic.cn/mmbiz/a5icZrUmbV8p5jb6RZ8aYfjfS2AVle8URwBt8QIu6XbGewB9wiaWYWkPwq4R7pfdsFibuLkic16UcxDSNYtB8HnC1Q/0" alt="" class="comment_primary_avatar"\n        id="js_avatar_pc">\n        </div>\n        <div class="comment_primary_form_bd" id="js_cmt_panel_pc">\n            <div class="comment_primary_input_default" id="js_cmt_input_pc" style="display: none">写下你的留言</div>\n            <div class="comment_primary_input_wrp" id="js_cmt_container_pc" style="display: none">\n                <div class="comment_primary_input" id="js_cmt_input" contenteditable="true"></div>\n                <div class="comment_primary_input_placeholder" id="js_cmt_input_holder"> \n                    留言将由公众号筛选后显示，对所有人可见                </div>\n\n                <div class="comment_primary_tool" id="js_comment_tool_pc">\n                    <div class="comment_primary_emotion_wrp" id="js_emotion_wrp_pc">\n                    <span class="icon_comment_primary_emotion">\n                    </span>\n                    </div>               \n                    <button disabled="disabled" class="reset_btn comment_primary_btn" id="js_cmt_submit">留言</button>\n                    <!-- 超出字数往comment_primary_counter加comment_primary_counter_warn  -->\n                    <span class="comment_primary_counter" id="js_length_notice_pc" style="display: none">\n                    <em id="js_word_length_pc"></em>\n                    /\n                    <span>600</span>\n                    </span>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class="comment_primary_list_wrp" id="js_cmt_myarea_pc" style="display:none">\n        <ul class="comment_primary_list" id="js_cmt_mylist_pc">\n        </ul>\n        <!-- 展开的时候js_expand_and_fold_pc加comment_primary_more_access_unfold  -->\n        <p class="comment_primary_more_access" id="js_expand_and_fold_pc" style="display: none;"></p>\n        <div class="rich_split_tips tc discuss_end_tips" style="display:block">\n        <div class="weui-loadmore weui-loadmore_line">\n            <span class="weui-loadmore__tips">以上留言被公众号精选后，将对所有人可见</span>\n        </div>\n        </div>\n    </div>\n\n    <div class="weui-toast__wrp weui-transition_opacity-hide" id="js_success_panel_pc">\n    <div class="weui-mask_transparent"></div>\n    <div class="weui-toast">\n        <i class="weui-icon-success-no-circle weui-icon_toast"></i>\n        <p class="weui-toast__content">已留言</p>\n    </div>\n    </div>\n\n    <div class="weui-toast__wrp weui-transition_opacity-hide" id="js_reply_success_pc">\n    <div class="weui-mask_transparent"></div>\n    <div class="weui-toast">\n        <i class="weui-icon-success-no-circle weui-icon_toast"></i>\n        <p class="weui-toast__content" id="js_reply_success_pc_content">已回复</p>\n    </div>\n    </div>\n</div>\n<#}#>\n';
});define("appmsg/comment_tpl.html.js",[],function(){
return'<#if(window.new_appmsg){#>\n\n    <div class="discuss_container" id="js_cmt_main" style="display:none">\n        <div class="mod_title_context">\n            <strong class="mod_title">精选留言</strong>\n            <#if(!isWxWork){#>\n            <p class="tips_global tr title_bottom_tips" id="js_cmt_nofans1" style="display:none;">作者已设置关注后才可以留言</p>\n                <!-- 没有付费才给写留言入口 -->\n                <#if(window._copyright_stat!=1 || window.need_pay!=1){#>\n                <p class="discuss_icon_tips tr" id="js_cmt_addbtn1" style="display:none">\n                    <a href="javascript:;" class="discuss_access" id="js_cmt_write1">写留言</a>\n                </p>\n                <#}#>\n            <#}#>\n        </div>\n        <div class="discuss_list_wrp" id="js_cmt_list_container">\n          <ul class="discuss_list" id="js_cmt_list"></ul>\n        </div>\n    </div>\n\n\n    <!-- 没有付费才给写留言入口 -->\n    <#if(!isWxWork && (window._copyright_stat!=1 || window.need_pay!=1)){#>\n    <div class="discuss_container" id="js_cmt_addbtn2" style="display:none">\n      <div class="mod_title_context">\n        <p class="discuss_icon_tips tc">\n          <a href="javascript:;" class="discuss_access" id="js_cmt_write2">写留言</a>\n        </p>\n      </div>\n    </div>\n    <#}#>\n    <#if(!isWxWork){#>\n    <div class="discuss_container" id="js_cmt_nofans2" style="display:none">\n      <div class="tips_global rich_split_tips tc" id="js_cmt_nofans2_inner">\n          作者已设置关注后才可以留言      </div>\n    </div>\n    <#}#>\n    <p class="rich_split_tips tc tips_global" id="js_cmt_tips" style="display:none;"></p>\n\n\n    <div class="weui-loadmore" id="js_cmt_loading">\n        <i class="weui-loading"></i>\n        <span class="weui-loadmore__tips">正在加载</span>\n    </div>\n\n    <div class="rich_split_tips tc discuss_end_tips" id="js_cmt_statement" style="display:none">\n        <div class="weui-loadmore weui-loadmore_line weui-loadmore_dot">\n            <span class="weui-loadmore__tips"></span>\n        </div>\n        <!--\n        以上留言由公众号审核产生，        <a href="http://kf.qq.com/touch/sappfaq/150211YfyMVj150313qmMbyi.html?scene_id=kf264">\n            了解留言功能详情        </a>\n        -->\n    </div>\n\n    <div class="discuss_more_tips dropdown_tips tc" style="display:none;" id="js_cmt_show_all">\n      <a href="javascript:;" id="js_cmt_show_all_wording">查看更多留言</a>\n    </div>\n    <div class="weui-dialog__wrp weui-transition_opacity-hide" id="js_delete_panel">\n      <div class="weui-mask"></div>\n      <div class="weui-dialog">\n        <div class="weui-dialog__bd">确定删除留言吗？</div>\n        <div class="weui-dialog__ft">\n          <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default" id="js_delete_cancel">取消</a>\n          <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" id="js_delete_confirm">删除</a>\n        </div>\n      </div>\n    </div>\n<#}else{#>\n    <div class="discuss_container" id="js_cmt_main" style="display:none">\n        <p class="discuss_icon_tips title_bottom_tips tr" id="js_cmt_addbtn1" style="display:none">\n            <!-- 没有付费才给写留言入口 -->\n            <#if(window._copyright_stat!=1 || window.need_pay!=1){#>\n            <a href="javascript:;" id="js_cmt_write1"><img class="icon_edit" src="<#=window.comment_edit_icon#>" alt="">留言</a>\n            <#}#>\n        </p>\n        <div class="rich_tips with_line title_tips discuss_title_line">\n            <span class="tips">精选留言</span>\n        </div>\n        <p class="tips_global tc title_bottom_tips" id="js_cmt_nofans1" style="display:none;">该文章作者已设置需关注才可以留言</p>\n        <ul class="discuss_list" id="js_cmt_list"></ul>\n    </div>\n\n\n    <p class="discuss_icon_tips rich_split_tips tc" id="js_cmt_addbtn2" style="display:none">\n        <!-- 没有付费才给写留言入口 -->\n        <#if(window._copyright_stat!=1 || window.need_pay!=1){#>\n        <a href="javascript:;" id="js_cmt_write2"><img class="icon_edit" src="<#=window.comment_edit_icon#>" alt="">留言</a>\n        <#}#>\n    </p>\n\n    <div class="tips_global rich_split_tips tc" id="js_cmt_nofans2" style="display:none;">\n        该文章作者已设置需关注才可以留言    </div>\n    <p class="rich_split_tips tc tips_global" id="js_cmt_tips" style="display:none;"></p>\n\n\n    <div class="rich_tips tips_global loading_tips" id="js_cmt_loading">\n        <img src="<#=window.comment_loading_img#>" class="rich_icon icon_loading_white" alt="">\n        <span class="tips">加载中</span>\n    </div>\n\n    <div class="rich_tips with_line tips_global" id="js_cmt_statement" style="display:none">\n        <span class="tips">以上留言由公众号筛选后显示</span>\n    </div>\n\n    <p class="rich_split_tips tc" id="js_cmt_qa" style="display:none;">\n        <a href="http://kf.qq.com/touch/sappfaq/150211YfyMVj150313qmMbyi.html?scene_id=kf264">\n            了解留言功能详情        </a>\n    </p>\n<#}#>\n\n';
});define("appmsg/emotion/emotion_pc.js",["biz_common/utils/emoji_data.js","biz_common/utils/emoji_panel_data.js","biz_common/dom/event.js","appmsg/emotion/emotion.js","common/utils.js","biz_wap/utils/mmversion.js"],function(e,t,o){
"use strict";
function n(){
for(var e=[],t=0;t<p.length;t++)for(var o=0;o<r.length;o++)if(r[o].id===p[t]){
e[t]=r[o];
break;
}
for(var t=0;j>t;t++)for(var o=0;f>o;o++){
var n=t*f+o;
e[n]&&v.push({
name:e[n].style,
title:e[n].emoji?e[n].emoji:e[n].cn,
bp:"background-position: 0 -"+n*w+"px;",
id:e[n].id
});
}
for(var t=0;t<e.length;t++)b[e[t].style]=e[t].emoji||e[t].cn;
}
function i(){
var e=document.createDocumentFragment();
v.forEach(function(t,o){
var n=document.createElement("li"),i=document.createElement("span");
n.className="comment_primary_emotion_item js_emotion_item",n.setAttribute("data-index",o),
i.className="comment_primary_emotion",i.setAttribute("style",t.bp),n.appendChild(i),
e.appendChild(n);
}),y.emotionList&&y.emotionList.appendChild(e);
}
function m(e){
window.scrollTo(0,window.scrollY+e.getBoundingClientRect().height);
}
function l(e){
return e.getBoundingClientRect().top+e.getBoundingClientRect().height>=g.getInnerHeight()?!0:!1;
}
function s(){
u.on(y.emotionSwitch,"click",function(){
var e=y.emotionPanel,t=e.style.display;
if("none"===t){
var o=window.getComputedStyle(document.getElementsByClassName("rich_media_tool")[0]).zoom,n=y.tool.getBoundingClientRect();
e.style.display="",e.style.left=n.left*o+"px",h.isWindows?e.style.top=window.scrollY+n.top*o+n.height*o+"px":h.isMac&&(e.style.top=(window.scrollY+n.top+n.height)*o+"px"),
l(e)&&m(e);
}else e.style.display="none";
});
}
function c(){
var e=y.emotionPanel;
if(""===e.style.display){
var t=window.getComputedStyle(document.getElementsByClassName("rich_media_tool")[0]).zoom,o=y.tool.getBoundingClientRect();
e.style.left=o.left*t+"px",h.isWindows?e.style.top=window.scrollY+o.top*t+o.height*t+"px":h.isMac&&(e.style.top=(window.scrollY+o.top+o.height)*t+"px");
}
}
function a(e){
var t=document.createElement("div"),o="",n="",i=[],m=void 0;
t.innerHTML=e;
for(var l=0;l<t.childNodes.length;l++){
var s=t.childNodes[l];
switch(s.nodeType){
case 1:
("IMG"===s.nodeName.toUpperCase()||"I"===s.nodeName.toUpperCase())&&(n=s.getAttribute("class"),
n&&(i=n.split(" "),i.length>1&&"icon_emotion_single"===i[0]&&(o=b[i[1]],m=document.createTextNode(o),
t.replaceChild(m,s))));
}
}
var c=t.innerHTML;
return c=c.replace(/<br.*?>/gi,"\n").replace(/<.*?>/g,"");
}
function d(){
y={
emotionSwitch:document.getElementById("js_emotion_wrp_pc"),
emotionPanel:document.getElementById("js_emotion_panel_pc"),
emotionList:document.getElementById("js_emotion_list_pc"),
input:document.getElementById("js_cmt_input"),
submit:document.getElementById("js_cmt_submit"),
tool:document.getElementById("js_comment_tool_pc")
},n(),i(),s(),window.onresize=function(){
c();
};
}
var r=e("biz_common/utils/emoji_data.js"),p=e("biz_common/utils/emoji_panel_data.js"),u=e("biz_common/dom/event.js"),_=e("appmsg/emotion/emotion.js").encode,g=e("common/utils.js"),h=e("biz_wap/utils/mmversion.js"),y={},f=16,j=7,w=24,v=[],b={};
o.exports={
init:d,
edata:v,
encode:_,
textFilter:a,
emotionPanelMove:c
};
});define("biz_wap/utils/position.js",[],function(){
"use strict";
function e(t,f){
var s=t.offsetLeft;
if(t.offsetParent&&t.offsetParent.className){
var a=t.offsetParent.className;
-1==a.indexOf(f)&&(s+=e(t.offsetParent,f));
}
return s;
}
function t(e,f){
var s=e.offsetTop;
if(e.offsetParent&&e.offsetParent.className){
var a=e.offsetParent.className;
-1==a.indexOf(f)&&(s+=t(e.offsetParent,f));
}
return s;
}
return{
getX:e,
getY:t
};
});define("biz_wap/utils/fakehash.js",["biz_common/dom/event.js"],function(t){
"use strict";
function s(t){
t=t||location.hash.substr(1);
var s,o,e,i,r=!1,c=[];
for(s=0;s<h.length;s++)o=h[s],e=o[0],i=o[1],e!==a?("string"==typeof e&&e===t||e instanceof RegExp&&e.test(t))&&(i(n),
r=!0):c.push(i);
if(!r)for(s=0;s<c.length;s++)c[s](n,t);
n=t;
}
var o=t("biz_common/dom/event.js"),h=[],a="__default_hash__",n=location.hash.substr(1);
return o.on(window,"popstate",function(t){
var o=a;
t.state&&t.state.hash&&(o=t.state.hash),s(o);
}),o.on(window,"hashchange",s),o.on(window,"load",function(){
history.state&&history.state.hash&&s(history.state.hash);
}),{
val:function(){
return history.state&&history.state.hash||location.hash.substr(1);
},
push:function(t){
history.pushState?(history.pushState({
hash:t
},document.title,location.href),s(t)):location.hash=t;
},
replace:function(t){
history.replaceState?(history.replaceState({
hash:t
},document.title,location.href),s(t)):this.push(t);
},
on:function(t,s){
"function"==typeof t&&(s=t,t=a),h.push([t,s]);
}
};
});define("appmsg/emotion/selection.js",[],function(e,n){
"use strict";
function t(e,n,t){
if(!t&&e===n)return!1;
if(e.compareDocumentPosition){
var o=e.compareDocumentPosition(n);
if(20===o||0===o)return!0;
}else if(e.contains(n))return!0;
return!1;
}
function o(e,n){
var o=n.commonAncestorContainer||n.parentElement&&n.parentElement()||null;
return o?t(e,o,!0):!1;
}
n.getSelection=function(){
return document.selection?document.selection:(window.getSelection||document.getSelection)();
},n.getRange=function(e){
var n=getSelection();
if(!n)return null;
var t=void 0;
return n.getRangeAt&&n.rangeCount?t=n.getRangeAt(0):n.getRangeAt||(t=n.createRange()),
t?e&&o(e,t)?t:e?null:t:null;
},n.setCursorToEnd=function(e){
if(e){
var n=getSelection();
n.extend&&(n.extend(e,e.length),n.collapseToEnd&&n.collapseToEnd());
}
},n.contains=t;
});define("appmsg/comment_report.js",["biz_wap/utils/ajax.js","biz_common/dom/event.js","biz_wap/utils/storage.js","common/utils.js","biz_common/dom/offset.js"],function(e){
"use strict";
function t(){
if(!m){
m=!0,setTimeout(function(){
m=!1;
},20);
var e=d.getInnerHeight(),t=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop,i=p.querySelectorAll(".js_comment_item"),s=r.querySelectorAll(".js_comment_item");
if(o=_.getOffset(p).offsetTop,n||(n=_.getOffset(r).offsetTop),s.length)for(var a=0;a<s.length&&n+s[a].offsetTop<t+e;a++)1!=s[a].getAttribute("data-hasreport")&&(s[a].setAttribute("data-hasreport",1),
f.data.push({
content_id:s[a].dataset.content_id,
is_elected_comment:1*s[a].dataset.elected,
is_friend_comment:1,
scene:2
}));
if(i.length)for(var a=0;a<i.length&&o+i[a].offsetTop<t+e;a++)1!=i[a].getAttribute("data-hasreport")&&(i[a].setAttribute("data-hasreport",1),
f.data.push({
content_id:i[a].dataset.content_id,
is_elected_comment:1,
is_friend_comment:1*i[a].dataset.friend,
scene:1
}));
c.set("comment_expose",f,Date.now()+6048e5);
}
}
var o,n,m,i=e("biz_wap/utils/ajax.js"),s=e("biz_common/dom/event.js"),a=e("biz_wap/utils/storage.js"),d=e("common/utils.js"),c=new a("comment_expose"),_=e("biz_common/dom/offset.js"),p=document.getElementById("js_cmt_area"),r=document.getElementById("js_friend_cmt_area"),f={
data:[],
appmsgid:"",
comment_id:"",
idx:"",
item_show_type:0,
biz:""
},u=function(e){
e&&e.data&&e.data.length&&(l(e),c.remove("comment_expose"));
},l=function(e){
i({
type:"post",
url:"/mp/appmsg_comment?action=exposurecomment",
data:{
comment_id:e.comment_id,
appmsgid:e.appmsgid,
idx:e.idx,
item_show_type:e.item_show_type,
__biz:e.biz,
data:JSON.stringify(e.data)
},
async:!1,
timeout:2e3
});
};
s.on(window,"scroll",t),s.on(window,"unload",function(){
u(f);
}),s.on(window,"load",function(){
var e=c.getData("comment_expose");
e&&e.comment_expose&&e.comment_expose.val&&e.comment_expose.val.appmsgid&&u(e.comment_expose.val),
t();
});
var g=function(e){
f.comment_id=e.comment_id,f.appmsgid=e.appmsgid,f.idx=e.idx,f.item_show_type=e.item_show_type||0,
f.biz=e.biz,setTimeout(function(){
t();
});
};
return g;
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
});