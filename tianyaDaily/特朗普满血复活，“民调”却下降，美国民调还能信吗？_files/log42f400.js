define("pages/audition_tpl.html.js",[],function(){
return'<div id="js_music_dialog">\n    <div class="weui-mask"></div>\n    <div class="weui-dialog">\n        <div class="weui-dialog__bd"><#=msg#></div>\n        <div class="weui-dialog__ft">\n            <a href="javascript:void(0);" class="weui-dialog__btn weui-dialog__btn_primary js_submit">我知道了</a>\n        </div>\n    </div>\n</div>';
});define("pages/player_tips.js",["biz_common/tmpl.js","pages/audition_tpl.html.js","biz_common/dom/event.js"],function(t){
"use strict";
function i(t){
this.parent=document.body,this.opt=t||{},this.init();
}
var n=t("biz_common/tmpl.js"),e=t("pages/audition_tpl.html.js"),o=t("biz_common/dom/event.js");
return i.prototype.init=function(){
var t=document.createElement("div");
t.innerHTML=n.tmpl(e,this.opt,!1),this.parent.appendChild(t),this.dom=document.getElementById("js_music_dialog");
var i=this;
o.on(i.dom.getElementsByClassName("js_submit")[0],"click",function(){
i.parent.removeChild(t),"function"==typeof i.opt.onClick&&i.opt.onClick();
});
},i;
});define("pages/video_communicate_adaptor.js",["pages/player_tips.js"],function(t){
"use strict";
function e(){
window.addEventListener("message",i,!1),p();
}
function i(t){
var e;
if(t.origin?e=t.origin:t.originalEvent&&(e=t.originalEvent.origin),/^http(s)?\:\/\/mp\.weixin\.qq\.com$/.test(e)&&t.source){
var i=t.data;
if(i&&i.type){
if(!/^mpvideo_/.test(i.type))return;
var o=i.type.replace(/^mpvideo_/,"");
/^broadcast_/.test(o)?u.postMessageEvt.broadcast({
data:i.data,
type:o
}):u.postMessageEvt[o]&&u.postMessageEvt[o](i.data);
}
}
}
function o(t){
var e=t.type.replace(/^broadcast_/,""),i=d();
if(i.length>0)for(var o=0,a=i.length;a>o;o++){
var r=i[o];
n({
win:r.contentWindow,
type:e,
data:t.data
});
}
n({
win:window,
type:e,
data:t.data
});
}
function n(t){
var e=t.type;
/^mpvideo_/.test(e)||(e="mpvideo_"+e);
var i={
data:t.data,
type:e
};
t.win.postMessage(i,document.location.protocol+"//mp.weixin.qq.com");
}
function a(){
var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
t.msg&&new f({
msg:t.msg
});
}
function r(t){
for(var e=d({
vid:t.vid
}),i=0,o=e.length;o>i;i++){
var a=e[i];
a.style.display="";
var r=a.parentNode,s=r.querySelectorAll('.js_img_loading[data-vid="'+t.vid+'"]');
if(s&&s.length>0)for(var i=0,o=s.length;o>i;i++)r.removeChild(s[i]);
n({
type:"afterRemoveLoading",
win:a.contentWindow
});
}
}
function d(t){
t=t||{};
for(var e=document.getElementsByTagName("iframe"),i=[],o=0,n=e.length;n>o;o++){
var a=e[o],r=a.getAttribute("src");
if(window.__second_open__&&(r=a.getAttribute("data-realsrc")),r&&-1!=r.indexOf("/mp/videoplayer")){
if("undefined"!=typeof t.vid){
var d=r.match(/[\?&]vid\=([^&]*)/);
if(!d||!d[1]||d[1]!=t.vid)continue;
}
i.push(a);
}
}
return i;
}
function s(t){
if(t.height){
var e=d({
vid:t.vid
});
if(0!=e.length){
var i=e[0],o=i.offsetHeight+1*t.height;
i.setAttribute("height",o),i.setAttribute("data-additionalheight",t.height),i.style.setProperty&&i.style.setProperty("height",o+"px","important");
}
}
}
function v(t){
u.videoInfo[t.vid]||(u.videoInfo[t.vid]={}),u.videoInfo[t.vid].ori_status=t.ori_status,
u.videoInfo[t.vid].hit_bizuin=t.hit_bizuin,u.videoInfo[t.vid].hit_vid=t.hit_vid;
}
function p(){
"function"==typeof window.__getVideoWh&&window.addEventListener("resize",function(){
for(var t=d(),e=0,i=t.length;i>e;e++){
var o=t[e];
setTimeout(function(t){
return function(){
var e=window.__getVideoWh(t),i=e.w,o=e.h,n=1*t.getAttribute("data-additionalheight");
n&&(o+=n),t.setAttribute("width",i),t.setAttribute("height",o),t.style.setProperty&&(t.style.setProperty("width",i+"px","important"),
t.style.setProperty("height",o+"px","important"));
};
}(o),50);
}
},!1);
}
function g(){
return u.videoInfo;
}
var f=t("pages/player_tips.js"),u={
videoInfo:{},
postMessageEvt:{
broadcast:o,
removeVideoLoading:r,
addVideoIframeHeight:s,
videoInited:v,
showTips:a
}
};
return e(),{
getVideoInfo:g
};
});define("biz_common/utils/emoji_panel_data.js",[],function(){
"use strict";
return[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,17,18,19,20,21,22,23,25,26,27,28,29,30,31,32,33,34,36,37,38,39,40,41,42,44,45,46,47,48,49,50,51,52,54,55,56,57,60,62,63,64,65,66,67,68,70,74,75,76,78,79,80,81,82,83,84,85,89,92,93,94,95,300,301,302,303,304,305,306,307,204,205,202,206,212,211,313,314,315,316,317,318,319,320,321,322,323,308,309,310,311,312,209,324,215,214];
});define("cdg_module/dist/sdk.js",[],function(){
"use strict";
return'!function(e){var t={};function o(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=0)}([function(e,t,o){"use strict";var n=o(1),r=o(2),a=o(3),i=document.createElement("script");i.onerror=function(e){(0,n.debug)("load entry script error."+JSON.stringify(e)),(0,r.notify)({action:a.ACTION_ON_ERROR,value:"js sdk load fail."})},i.onload=function(){},i.src="//wximg.qq.com/wxp/assets/wxsdk/dist/entry.v1555063197179.js",document.body.appendChild(i),window.messageQueue=[],window.isSDKReady=!1,(0,r.listener)(function(e){isSDKReady||window.messageQueue.push(e)})},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n="__WXAD__LOG__DEBUG",r="__WXAD__LOG__DETAIL";t.debug=function(e){if(1==localStorage.getItem(n))try{var t=localStorage.getItem(r);t?((t=JSON.parse(t)).logs=t.logs||[],t.logs.length>50&&t.logs.shift()):(t={}).logs=[];var o="["+(new Date).toString()+"]  ";t.logs.push(o+e),localStorage.setItem(r,JSON.stringify(t))}catch(e){console.log(e)}console.debug(e)},t.clear=function(){localStorage.setItem(r,"")}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.notify=function(e){console.log("ad iframe notify action:",e),window.postMessage(e,"*")},t.listener=function(e){n.push(e)};var n=[];window.addEventListener("message",function(e){e.source!==window&&(console.log("ad iframe recive action:",e.data),n.map(function(t){t.call(null,e.data)}))})},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.ACTION_SDK_READY="onSDKReady",t.ACTION_AD_READY="onAdReady",t.ACTION_ON_SHOW="onShow",t.ACTION_ON_CLOSE="onClose",t.ACTION_ON_ERROR="onError",t.ACTION_ON_LAND="onLand",t.ACTION_ON_REPORT="onReport",t.ACTION_ON_PROXY="onProxy",t.ACTION_ON_RESUME="onResume",t.ACTION_SET_ADDATA="setAdData",t.ACTION_SET_PAGEDATA="setPageData",t.ACTION_SET_VIDEOSTATE="setVideoState",t.ACTION_SHOW_AD="showAd",t.ACTION_HIDE_AD="hideAd",t.ACTION_PLAY_AD="playAd",t.ACTION_PAUSE_AD="pauseAd",t.ACTION_LAND_CALLBACK="landCallback",t.ACTION_PROXY_CALLBACK="proxyCallback",t.DEST_TYPE={GDT_SPREAD:0,OUT_LINK:1,BASIC_DETAILS:2,WECHAT_FOLLOW_TIPS:3,BIG_PIC_DETAILS:4,WECHAT_SHOP:5,WECHAT_APPLET:6,LEAF:7,CANVAS:9},t.AD_SOURCE={ORIGINAL_VIDEO:1004}}]);';
});define("new_video/plugin/frameAd.html.js",[],function(){
return'<!--前贴片广告：cdg广告侧提供的iframe-->\n<div id="js_mpvedio_frame_<#=id#>" style="background-color: #fff;position: absolute;top:0;left:0;z-index:999;width:<#=width#>px;height:<#=height#>px; display: none;">	  \n	<iframe id="js_mpvedio_main_frame_<#=id#>" style="border: 0;width:<#=width#>px;height:<#=height#>px;"></iframe>\n</div>\n';
});define("new_video/plugin/imgAd.html.js",[],function(){
return'<!--前贴片广告：图片展示区域-->\n<div id="js_mpvedio_imgad_<#=id#>" style="display:none;width:<#=width#>px;height:<#=height#>px;">   \n  <div class="video_ad js_ad_controll" style="display:none;">  \n    <span class="button_left_time video_ad_time_meta mpad_more_innervideo_container">广告      <!--投诉入口 begin-->\n            <div href="javascript:;" class="mpad_more js_ad_opt_list_btn" style="<# if(!parseInt(parent.window.can_see_complaint)){ #>display: none<# } #>">\n        <ul class="mpad_more_list js_ad_opt_list" style="display:none;">\n          <li class="mpad_more_list_ele">\n            <a class="mpad_more_list_ele_container js_complain_btn" href="javascript:;">投诉</a>\n          </li>\n        </ul>\n      </div>\n      <!--投诉入口 end-->\n      <span class="button_left_time_num js_play_time"></span></span>\n      <a href="javascript:void(0);" class="btn_close js_btn_can_close_ad video_ad_time_meta" style="display:none;">可在<span class="js_can_close_time">(5s)</span>后关闭</a>\n      <a href="javascript:void(0);" class="btn_close js_btn_close_ad video_ad_time_meta" style="display:none;">关闭<i></i></a>\n  </div>\n  <!-- 广告详情入口 -->\n  <div class="video_ad_detail js_ad_detail" style="display:none;">\n      <a href="javascript:;" class="btn btn_ad_detail with_arrow js_btn_ad_detail">了解详情</a>\n  </div>\n  <div class="video_ad_detail js_ad_app" style="display:none;">\n      <a href="javascript:;" class="btn btn_ad_detail with_arrow js_btn_ad_app">下载应用</a>\n  </div>\n\n    <!-- 跟播放器相同比例是style加上：\n    -webkit-background-size:cover;background-size:cover;  -->\n    <div style="background-image:url(<#=imgUrl#>);"  class="js_img imgad_cover">\n        <!--\n      <img src="<#=imgUrl#>">\n        -->\n  </div>\n</div>\n';
});define("pages/similar_video_tpl.html.js",[],function(){
return'<# list.forEach(function (item, idx) { #>\n<li class="video-card__item js_similar_video_item js_related_item"  data-idx="<#=idx#>" data-url="<#=item.play_url#>" data-vid="<#=item.vid#>" data-time="<#=item.publish_time#>">\n  <div class="video-card__img-wrp">\n    <div class="video-card__img">\n      <img class="video-card__image-invisible js_similar_cover_img" src="<#=item.cover#>" alt="" >\n      <div class="video-card__duration_wrp">\n        <div class="video-card__duration_icon"></div>\n        <span class="video-card__duration"><#=item.formatDuration#></span>\n      </div>\n      <div class="video-card__mask-layer_full"></div>\n    </div>\n  </div>\n  <div class="video-card__desc-wrp">\n    <div class="video-card__desc"><#=item.title#></div>\n    <div class="video-card__detail">\n      <div class="video-card__source spacing_right read_num_wording"><#=item.srcDisplayName#></div>\n      <#if (item.like_num) { #>\n      <div class="video-card__source">赞<#=item.like_num#></div>\n      <# } #>\n    <div class="video-card__dislike-btn">\n        <button type="button" class="dislike_btn js_feedback_btn">不喜欢</button>\n      </div>\n      <!-- 去掉display:none;改用样式默认隐藏，加classnamme:feedback_dialog_show显示 -->\n      <div class="feedback_dialog_wrp js_feedback_dialog">\n        <div class="weui-mask js_mask"></div>\n        <!-- 底部时弹窗向上，加.feedback_dialog_pos_top -->\n        <div class="feedback_dialog js_dialog_wrp">\n          <div class="feedback_dialog_hd weui-flex">\n            <div class="weui-flex__item feedback_dialog_title">不看的原因</div>\n            <button type="button" class="weui-btn weui-btn_primary weui-btn_mini weui-btn_disabled js_submit">确定</button>\n          </div>\n          <div class="feedback_dialog_bd">\n            <ul class="feedback_tag_list">\n              <!-- 选中时tag加.feedback_tag_selected -->\n              <# reason.forEach(function(r) { #>\n              <li class="feedback_tag_item js_reason js_tag_item" data-value="<#=r.value#>"><#=r.name#></li>\n              <# }); #>\n            </ul>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</li>\n<# }); #>';
});define("appmsg/related_article_feedback.js",["biz_wap/utils/ajax.js","biz_common/dom/class.js","biz_common/dom/event.js","biz_common/utils/url/parse.js","common/utils.js"],function(e){
"use strict";
function t(e,t){
for(;!e.parentNode.className.match(t);)e=e.parentNode;
return e.parentNode||"";
}
function i(e){
this.container=e.container,this.biz=e.biz,this.mid=e.mid,this.idx=e.idx,this.vid=e.vid,
this.isVideo=e.isVideo,this.dislikeCb=e.dislikeCb,"top"===e.position&&s.addClass(this.container.querySelector(".js_dialog_wrp"),"feedback_dialog_pos_top"),
this.bindEvent();
}
function o(e){
var o=e.container;
n.on(o,"touchstart",".js_feedback_btn",function(e){
e.stopPropagation();
},!0),n.on(o,"touchend",".js_feedback_btn",function(e){
e.stopPropagation();
},!0),n.on(o,"click",".js_feedback_btn",function(o){
o.stopPropagation();
var a=o.delegatedTarget,s=t(a,"js_related_item"),n=s.getBoundingClientRect(),d=268;
console.log(r.getInnerHeight()),console.log(n.bottom),l=new i({
container:s,
biz:e.biz,
mid:e.mid,
idx:e.idx,
isVideo:e.isVideo,
vid:e.vid,
position:r.getInnerHeight()-n.bottom<d?"top":"bottom",
dislikeCb:e.dislikeCb
}),l.show();
},!0);
}
var a=e("biz_wap/utils/ajax.js"),s=e("biz_common/dom/class.js"),n=e("biz_common/dom/event.js"),d=e("biz_common/utils/url/parse.js"),r=e("common/utils.js"),l=null;
return i.prototype.bindEvent=function(){
var e=this,i=this.container,o=this.biz,r=this.mid,l=this.idx,c=i.getAttribute("data-url"),u=new Set,_=new Set,m=i.querySelector(".js_submit");
this.tabClickEventHandler=function(e){
e.stopPropagation(),e.preventDefault();
var t=e.delegatedTarget,i=t.getAttribute("data-value");
s.hasClass(t,"js_reason")&&(i*=1),s.hasClass(t,"feedback_tag_selected")?(s.removeClass(t,"feedback_tag_selected"),
s.hasClass(t,"js_reason")?u.delete(i):_.delete(i)):(s.addClass(t,"feedback_tag_selected"),
s.hasClass(t,"js_reason")?u.add(i):_.add(i)),0===u.size&&0===_.size?s.addClass(m,"weui-btn_disabled"):s.removeClass(m,"weui-btn_disabled");
},this.submitDataHandler=function(n){
n.stopPropagation(),n.preventDefault();
var m=n.target;
if(!s.hasClass(m,"weui-btn_disabled")){
var h={
tacitly:Array.from(u),
keyword:Array.from(_)
},b={
biz_from:o,
mid_from:r,
idx_from:l,
biz:d.getQuery("__biz",c),
mid:d.getQuery("mid",c),
idx:d.getQuery("idx",c),
reason:JSON.stringify(h)
},p="/mp/relatedarticle?action=dislike";
e.isVideo&&(b.vid_from=e.vid,b.vid=i.getAttribute("data-vid"),p="/mp/video_similar?action=dislike"),
a({
type:"POST",
url:p,
dataType:"json",
data:b,
success:function(i){
if(console.log(i),i&&i.base_resp&&0===i.base_resp.ret){
e.hide(m);
var o=t(m,"js_related_item");
e.dislikeCb(o);
}else window.weui.alert("系统错误，请稍后重试");
}
});
}
},this.maskHandler=function(t){
t.stopPropagation(),t.preventDefault(),e.hide(t.target);
},this.maskTouchMoveHandler=function(e){
e.stopPropagation(),e.preventDefault();
},this.stopPropagationHandler=function(e){
e.stopPropagation();
},n.on(i,"click",".js_tag_item",this.tabClickEventHandler,!0),n.on(m,"click",this.submitDataHandler,!0),
n.on(i,"click",".js_mask",this.maskHandler,!0),n.on(i,"touchmove",".js_mask",this.maskTouchMoveHandler,!0),
n.on(i,"touchmove",".js_dialog_wrp",this.maskTouchMoveHandler,!0),n.on(i,"click",".js_dialog_wrp",this.maskTouchMoveHandler,!1),
n.on(i,"touchstart",".js_feedback_dialog",this.stopPropagationHandler,!0),n.on(i,"touchend",".js_feedback_dialog",this.stopPropagationHandler,!0);
},i.prototype.show=function(){
this.container.querySelector(".js_feedback_dialog").style.display="",s.addClass(this.container.querySelector(".js_feedback_dialog"),"feedback_dialog_show");
},i.prototype.hide=function(){
var e=this.container,t=e.querySelector(".js_submit");
n.off(e,"click",this.tabClickEventHandler,!0),n.off(t,"click",this.submitDataHandler,!0),
n.off(e,"click",this.maskHandler,!0),n.off(e,"touchmove",this.maskTouchMoveHandler,!0),
n.off(e,"click",this.maskTouchMoveHandler,!1),s.removeClass(this.container.querySelector(".js_feedback_dialog"),"feedback_dialog_show");
},{
init:o
};
});define("appmsg/i18n.js",[],function(e,n){
"use strict";
n.dealLikeReadShow_en=function(e){
if("undefined"==typeof LANG||!LANG)return 0===parseInt(e)?"":e;
if("en"==LANG){
var n="";
if(parseInt(e)>1e5)n="100k+";else if(parseInt(e)>1e4&&parseInt(e)<=1e5){
var r=""+parseInt(e)/1e3,t=r.indexOf(".");
n=-1===t?r+"k":r.substr(0,t)+"."+r.charAt(t+1)+"k";
}else n=0===parseInt(e)?"":e;
return n;
}
return"";
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
});define("appmsg/appmsg_report.js",["biz_wap/utils/ajax.js","pages/video_communicate_adaptor.js"],function(i){
"use strict";
function e(i){
if(!i)return null;
var e=location.href.match(new RegExp("(\\?|&)"+i+"=([^&]+)"));
return e?e[2]:null;
}
function o(i){
var o=i.link,t=i.action_type,n=o.split("?").pop();
if(n=n.split("#").shift(),""!=n){
var p=i.reportVid||window.reportVid,a=i.reportMid||window.reportMid,d=i.reportVoiceid||window.reportVoiceid,w=i.reportWeappid||window.reportWeappid,_=[],u=[],c=[];
if("undefined"==typeof i.ori_status_arr||"undefined"==typeof i.hit_bizuin_arr)for(var h=r.getVideoInfo(),f=0;f<p.length;f++){
var m=p[f];
_.push(h[m]&&"undefined"!=typeof h[m].ori_status?h[m].ori_status:0),u.push(h[m]&&"undefined"!=typeof h[m].hit_bizuin?h[m].hit_bizuin:""),
c.push(h[m]&&"undefined"!=typeof h[m].hit_vid?h[m].hit_vid:"");
}else _=i.ori_status_arr,u=i.hit_bizuin_arr,c=i.hit_vid_arr;
var y=[n,"action=share","action_type="+t,"scene="+(i.source||window.source||e("scene")),"subscene="+e("subscene"),"ascene="+(i.ascene||window.ascene||-1),"req_id="+(i.req_id||window.req_id||""),"vid="+("undefined"!=typeof p?p.join(";"):""),"musicid="+("undefined"!=typeof a?a.join(";"):""),"voiceid="+("undefined"!=typeof d?d.join(";"):""),"weappid="+("undefined"!=typeof w?w.join(";"):""),"item_show_type="+(i.item_show_type||window.item_show_type||0),"ori_status_arr="+_.join(";"),"hit_bizuin="+u.join(";"),"hit_vid_arr="+c.join(";"),"top_stories="+(i.top_stories||0),"content_url="+encodeURIComponent(window.location.href),"channel_session_id="+e("channel_session_id"),"is_pay_subscribe="+window.isPaySubscribe,"is_paid="+window.isPaid,"preview_percent="+window.previewPercent,"fee="+(window.paySubscribeInfo?window.paySubscribeInfo.fee:""),"worthy_cnt="+(window.paySubscribeInfo?window.paySubscribeInfo.like_cnt:""),"pay_cnt="+(window.paySubscribeInfo?window.paySubscribeInfo.pay_cnt:""),"album_id="+(window.appmsg_album_info?window.appmsg_album_info.id:""),"album_type="+(window.appmsg_album_info?0:""),"is_cartoon_copyright="+(window.isCartoonCopyright?1:2),"share_source="+i.share_source,"exptype="+window.exptype||"","expsessionid="+window.expsessionid||""];
i.hotspotjson?y.push("hotspotjson="+i.hotspotjson):window.hotspotInfoList&&y.push("hotspotjson="+JSON.stringify({
hotspotinfolist:window.hotspotInfoList
})),i.sharer_shareid&&y.push("sharer_shareid="+i.sharer_shareid),i.sharer_sharetime&&y.push("sharer_sharetime="+i.sharer_sharetime),
y=y.join("&"),s({
url:"/mp/appmsgreport",
type:"POST",
data:y,
async:!1,
timeout:2e3
});
}
}
function t(i){
s({
url:"/mp/appmsgreport?action=name_click",
data:{
url:location.href,
title:i.title||window.msg_title||"",
msgid:window.mid||"",
itemidx:window.idx||"",
__biz:window.biz||"",
ascene:window.ascene||-1,
isnew:i.isnew||0,
item_show_type:i.item_show_type||window.item_show_type||0,
hotspotjson:i.hotspotjson||""
},
type:"POST",
dataType:"json",
async:!0,
success:function(){}
});
}
function n(i){
s({
url:"/mp/appmsgreport?action=hotspotreport",
data:{
title:i.title||window.msg_title||"",
__biz:window.biz||"",
appmsgid:window.mid||"",
itemidx:window.idx||"",
scene:window.source||"",
hotspotjson:i.hotspotjson||""
},
type:"POST",
dataType:"json",
async:!0,
success:function(){}
});
}
var s=i("biz_wap/utils/ajax.js"),r=i("pages/video_communicate_adaptor.js");
return{
shareReport:o,
profileReport:t,
hotspotReport:n
};
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
});define("biz_wap/jsapi/app.js",["biz_wap/jsapi/core.js"],function(n){
"use strict";
var a=n("biz_wap/jsapi/core.js"),o={
getInstallState:function(n,o){
a.invoke("getInstallState",n,o);
},
launch3rdApp:function(n,o){
a.invoke("launch3rdApp",n,o);
},
addDownloadTask:function(n,o){
a.invoke("addDownloadTask",n,o);
},
cancelDownloadTask:function(n,o){
a.invoke("cancelDownloadTask",n,o);
},
queryDownloadTask:function(n,o){
a.invoke("queryDownloadTask",n,o);
},
installDownloadTask:function(n,o){
a.invoke("installDownloadTask",n,o);
},
downloadStateChange:function(n){
a.on("wxdownload:state_change",n);
}
};
return o;
});define("biz_wap/utils/log.js",["biz_wap/utils/mmversion.js","biz_wap/jsapi/core.js"],function(i){
"use strict";
var s=i("biz_wap/utils/mmversion.js"),e=i("biz_wap/jsapi/core.js");
return function(i,n,o){
"string"!=typeof i&&(i=JSON.stringify(i)),n=n||"info",o=o||function(){};
var t;
s.isIOS?t="writeLog":s.isAndroid&&(t="log"),t&&e.invoke(t,{
level:n,
msg:"[WechatFe]"+i
},o);
};
});