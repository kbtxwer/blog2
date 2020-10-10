define("appmsg/emotion/caret.js",[],function(e,t){
"use strict";
var t={};
return t.get=function(e){
var t=0;
if(document.selection){
e.focus();
var a=document.selection.createRange();
a.moveStart("character",-e.value.length),t=Sel.text.length;
}else(e.selectionStart||"0"==e.selectionStart)&&(t=e.selectionStart);
return t;
},t.set=function(e,t){
if(e.setSelectionRange)e.focus(),e.setSelectionRange(t,t);else if(e.createTextRange){
var a=e.createTextRange();
a.collapse(!0),a.moveEnd("character",t),a.moveStart("character",t),a.select();
}
},t;
});define("pages/similar_video_tpl.html.js",[],function(){
return'<# list.forEach(function (item, idx) { #>\n<li class="video-card__item js_similar_video_item js_related_item"  data-idx="<#=idx#>" data-url="<#=item.play_url#>" data-vid="<#=item.vid#>" data-time="<#=item.publish_time#>">\n  <div class="video-card__img-wrp">\n    <div class="video-card__img">\n      <img class="video-card__image-invisible js_similar_cover_img" src="<#=item.cover#>" alt="" >\n      <div class="video-card__duration_wrp">\n        <div class="video-card__duration_icon"></div>\n        <span class="video-card__duration"><#=item.formatDuration#></span>\n      </div>\n      <div class="video-card__mask-layer_full"></div>\n    </div>\n  </div>\n  <div class="video-card__desc-wrp">\n    <div class="video-card__desc"><#=item.title#></div>\n    <div class="video-card__detail">\n      <div class="video-card__source spacing_right read_num_wording"><#=item.srcDisplayName#></div>\n      <#if (item.like_num) { #>\n      <div class="video-card__source">赞<#=item.like_num#></div>\n      <# } #>\n    <div class="video-card__dislike-btn">\n        <button type="button" class="dislike_btn js_feedback_btn">不喜欢</button>\n      </div>\n      <!-- 去掉display:none;改用样式默认隐藏，加classnamme:feedback_dialog_show显示 -->\n      <div class="feedback_dialog_wrp js_feedback_dialog">\n        <div class="weui-mask js_mask"></div>\n        <!-- 底部时弹窗向上，加.feedback_dialog_pos_top -->\n        <div class="feedback_dialog js_dialog_wrp">\n          <div class="feedback_dialog_hd weui-flex">\n            <div class="weui-flex__item feedback_dialog_title">不看的原因</div>\n            <button type="button" class="weui-btn weui-btn_primary weui-btn_mini weui-btn_disabled js_submit">确定</button>\n          </div>\n          <div class="feedback_dialog_bd">\n            <ul class="feedback_tag_list">\n              <!-- 选中时tag加.feedback_tag_selected -->\n              <# reason.forEach(function(r) { #>\n              <li class="feedback_tag_item js_reason js_tag_item" data-value="<#=r.value#>"><#=r.name#></li>\n              <# }); #>\n            </ul>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</li>\n<# }); #>';
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
});define("a/appdialog_confirm.html.js",[],function(){
return'<div class="wx_profile_dialog_primary">\n    <div class="weui-mask"></div>\n    <div class="weui-dialog weui-skin_android">\n        <div class="weui-dialog__hd"><strong class="weui-dialog__title">是否立即下载该应用</strong></div>\n        <div class="weui-dialog__bd">\n            <div class="weui-flex">\n                <div class="wx_profile_info_avatar_wrp">\n                    <span class="wx_profile_info_avatar">\n                        <img src="<#=app_img_url#>" alt="">\n                    </span>\n                </div>\n                <div class="weui-flex__item">\n                    <strong class="wx_profile_info_title"><#=app_name#></strong>\n                </div>\n            </div>\n        </div>\n        <div class="weui-dialog__ft">\n            <a href="javascript:;" class="js_cancel weui-dialog__btn weui-dialog__btn_default">取消</a>\n            <a href="javascript:;" class="js_ok weui-dialog__btn weui-dialog__btn_primary">下载</a>\n        </div>\n    </div>\n</div>\n';
});;define('widget/wx_profile_dialog_primary.css', [], function(require, exports, module) {
	return ".radius_avatar{display:inline-block;background-color:#fff;padding:3px;border-radius:50%;-moz-border-radius:50%;-webkit-border-radius:50%;overflow:hidden;vertical-align:middle}.radius_avatar img{display:block;width:100%;height:100%;border-radius:50%;-moz-border-radius:50%;-webkit-border-radius:50%;background-color:#eee}.wx_profile_dialog_primary .weui-mask{position:fixed;z-index:1000;top:0;right:0;left:0;bottom:0;background:rgba(0,0,0,0.6)}.wx_profile_dialog_primary .weui-dialog{position:fixed;z-index:5000;width:80%;max-width:300px;top:50%;left:50%;-webkit-transform:translate(-50%,-65%);transform:translate(-50%,-65%);background-color:#fff;text-align:center;border-radius:3px;overflow:hidden}.wx_profile_dialog_primary .weui-dialog__hd{position:relative;padding:20px 20px 10px;text-align:left}.wx_profile_dialog_primary .weui-dialog__hd:after{content:\" \";position:absolute;left:20px;right:20px;bottom:0;height:1px;border-bottom:1px solid #d5d5d6;color:#d5d5d6;-webkit-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scaleY(0.5);transform:scaleY(0.5)}.wx_profile_dialog_primary .weui-dialog__title{font-weight:400;font-size:17px}.wx_profile_dialog_primary .weui-dialog__bd{padding:16px 20px;min-height:40px;font-size:15px;line-height:1.3;word-wrap:break-word;-webkit-hyphens:auto;-ms-hyphens:auto;hyphens:auto;color:#999}.wx_profile_dialog_primary .weui-dialog__bd:first-child{padding:2.7em 20px 1.7em;color:#353535}.wx_profile_dialog_primary .weui-dialog__ft{position:relative;line-height:44px;font-size:17px;display:-webkit-box;display:-webkit-flex;display:flex}.wx_profile_dialog_primary .weui-dialog__ft:after{content:\" \";position:absolute;left:0;top:0;right:0;height:1px;border-top:1px solid #d5d5d6;color:#d5d5d6;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(0.5);transform:scaleY(0.5)}.wx_profile_dialog_primary .weui-dialog__btn{display:block;-webkit-box-flex:1;-webkit-flex:1;flex:1;color:#3cc51f;text-decoration:none;-webkit-tap-highlight-color:rgba(0,0,0,0);position:relative}.wx_profile_dialog_primary .weui-dialog__btn:active{background-color:#eee}.wx_profile_dialog_primary .weui-dialog__btn:after{content:\" \";position:absolute;left:0;top:0;width:1px;bottom:0;border-left:1px solid #d5d5d6;color:#d5d5d6;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleX(0.5);transform:scaleX(0.5)}.wx_profile_dialog_primary .weui-dialog__btn:first-child:after{display:none}.wx_profile_dialog_primary .weui-dialog__btn_default{color:#353535}.wx_profile_dialog_primary .weui-dialog__btn_primary{color:#1aad19}.wx_profile_dialog_primary .weui-skin_android .weui-dialog{text-align:left;box-shadow:0 6px 30px 0 rgba(0,0,0,0.1)}.wx_profile_dialog_primary .weui-skin_android .weui-dialog__title{font-size:21px}.wx_profile_dialog_primary .weui-skin_android .weui-dialog__hd{text-align:left;padding:1.3em 1.6em 1.2em}.wx_profile_dialog_primary .weui-skin_android .weui-dialog__hd:after{display:none}.wx_profile_dialog_primary .weui-skin_android .weui-dialog__bd{color:#999;padding:0 1.6em 1.4em;font-size:17px;text-align:left}.wx_profile_dialog_primary .weui-skin_android .weui-dialog__bd:first-child{padding:1.6em 1.6em 2em;color:#353535}.wx_profile_dialog_primary .weui-skin_android .weui-dialog__ft{display:block;text-align:right;line-height:42px;font-size:16px;padding:0 1.6em .7em}.wx_profile_dialog_primary .weui-skin_android .weui-dialog__ft:after{display:none}.wx_profile_dialog_primary .weui-skin_android .weui-dialog__btn{display:inline-block;vertical-align:top;padding:0 .8em}.wx_profile_dialog_primary .weui-skin_android .weui-dialog__btn:after{display:none}.wx_profile_dialog_primary .weui-skin_android .weui-dialog__btn:active{background-color:rgba(0,0,0,0.06)}.wx_profile_dialog_primary .weui-skin_android .weui-dialog__btn:visited{background-color:rgba(0,0,0,0.06)}.wx_profile_dialog_primary .weui-skin_android .weui-dialog__btn:last-child{margin-right:-0.8em}.wx_profile_dialog_primary .weui-skin_android .weui-dialog__btn_default{color:#808080}@media screen and (min-width:1024px){.wx_profile_dialog_primary .weui-dialog{width:35%}}.wx_profile_dialog_primary .weui-flex{display:-webkit-box;display:-webkit-flex;display:flex}.wx_profile_dialog_primary .weui-flex__item{-webkit-box-flex:1;-webkit-flex:1;flex:1}.wx_profile_dialog_primary .weui-flex{-webkit-box-align:center;-webkit-align-items:center;align-items:center}.wx_profile_dialog_primary .weui-flex__item{word-wrap:break-word;-webkit-hyphens:auto;-ms-hyphens:auto;hyphens:auto}.wx_profile_info_avatar_wrp{padding-right:10px}.wx_profile_info_avatar{width:50px;height:50px;padding:0;display:inline-block;background-color:#fff;vertical-align:middle}.wx_profile_info_avatar img{display:block;width:100%;border-radius:10px}.wx_profile_info_title{display:block;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;font-size:16px;font-weight:400;text-align:left}";
});define("biz_common/utils/emoji_panel_data.js",[],function(){
"use strict";
return[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,17,18,19,20,21,22,23,25,26,27,28,29,30,31,32,33,34,36,37,38,39,40,41,42,44,45,46,47,48,49,50,51,52,54,55,56,57,60,62,63,64,65,66,67,68,70,74,75,76,78,79,80,81,82,83,84,85,89,92,93,94,95,300,301,302,303,304,305,306,307,204,205,202,206,212,211,313,314,315,316,317,318,319,320,321,322,323,308,309,310,311,312,209,324,215,214];
});function _classCallCheck(e,t){
if(!(e instanceof t))throw new TypeError("Cannot call a class as a function");
}
var _createClass=function(){
function e(e,t){
for(var n=0;n<t.length;n++){
var a=t[n];
a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a);
}
}
return function(t,n,a){
return n&&e(t.prototype,n),a&&e(t,a),t;
};
}();
define("appmsg/emotion/textarea.js",["appmsg/emotion/dom.js","appmsg/emotion/caret.js","biz_common/dom/class.js","biz_common/utils/emoji_data.js","biz_common/utils/emoji_panel_data.js"],function(e){
"use strict";
function t(e){
for(var t=0,n=l.length;n>t;t++)if(l[t]===e)return!0;
return!1;
}
for(var n=e("appmsg/emotion/dom.js"),a=e("appmsg/emotion/caret.js"),i=e("biz_common/dom/class.js"),s=e("biz_common/utils/emoji_data.js"),r=e("biz_common/utils/emoji_panel_data.js"),o={},l=[],u=0;u<s.length;u++){
var c=s[u];
o[c.id]=c;
}
for(var u=0;u<r.length;u++)l.push(o[r[u]].cn);
var m=function(){
function e(t){
_classCallCheck(this,e),this.textarea=t.inputArea,this.submitBtn=t.submitBtn,this.makeTextAreaFast(),
this.listenDelete();
}
return _createClass(e,[{
key:"insertEmotion",
value:function(e){
var t=this.textarea.el[0],i=a.get(t),s=t.value;
s=s.slice(0,i)+e+s.slice(i),t.value=s,a.set(t,i+e.length+1),t.blur(),n.later(function(){
t.blur();
}),this.setBtn(s);
}
},{
key:"makeTextAreaFast",
value:function(){
var e="translate3d(0, 0, 0)";
this.textarea.css({
webkitTransform:e,
transform:e
});
}
},{
key:"listenDelete",
value:function(){
var e=this,t=8;
this.textarea.on("keydown",function(n){
n.keyCode===t&&e.deleteEmotion(!0)&&n.preventDefault();
});
}
},{
key:"deleteEmotion",
value:function(e){
function i(){
var e=r-1;
0>e&&(e=0);
var t=o.slice(0,e),n=o.slice(r);
s.value=t+n,a.set(s,e);
}
var s=this.textarea.el[0],r=a.get(s),o=s.value,l=4,u=r-l;
0>u&&(u=0,l=r-u);
var c=o.slice(u,r),m=c.match(/\[([\u4e00-\u9fa5\w]+)\]$/g);
if(m){
var f=m[0],v=l-f.length,h=f.replace("[","").replace("]","");
if(t(h)){
var b=c.replace(f,""),d=o.slice(0,u)+b+o.slice(r);
s.value=d,a.set(s,u+v);
}else{
if(e)return!1;
i();
}
}else{
if(e)return!1;
i();
}
return e?(s.focus(),n.later(function(){
s.focus();
})):(s.blur(),n.later(function(){
s.blur();
})),this.setBtn(s.value),!0;
}
},{
key:"setBtn",
value:function(e){
if(this.submitBtn){
var t=this.submitBtn.el[0];
e.length<1?i.addClass(t,"btn_disabled"):i.removeClass(t,"btn_disabled");
}
}
},{
key:"inputEmotion",
value:function(e,t){
-1===e?this.deleteEmotion(t):this.insertEmotion(l[e-1]);
}
}]),e;
}();
return m;
});define("appmsg/emotion/nav.js",["appmsg/emotion/dom.js"],function(n){
"use strict";
function t(n,t){
o.each(t,function(o,a){
a===n?t[a].attr("class","emotion_nav current"):t[a].attr("class","emotion_nav");
});
}
var o=n("appmsg/emotion/dom.js");
return{
activeNav:t
};
});define("appmsg/emotion/common.js",[],function(){
"use strict";
return{
EMOTIONS_COUNT:112,
EMOTION_LI_SIZE:36,
EMOTION_SIZE:22
};
});function _classCallCheck(t,e){
if(!(t instanceof e))throw new TypeError("Cannot call a class as a function");
}
var _createClass=function(){
function t(t,e){
for(var i=0;i<e.length;i++){
var n=e[i];
n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n);
}
}
return function(e,i,n){
return i&&t(e.prototype,i),n&&t(e,n),e;
};
}();
define("appmsg/emotion/slide.js",["appmsg/emotion/nav.js"],function(t){
"use strict";
function e(t){
return t.touches&&t.touches.length>0?t.touches[0].clientX:t.clientX;
}
var i=t("appmsg/emotion/nav.js"),n=300,a=!1,r=void 0,s=!1,o=function(){
function t(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
_classCallCheck(this,t),this.currentPage=0,this.distX=0,this.opt=e,this.wrapper=e.emotionSlideWrapper,
this.commonWidth=e.commonWidth,r=-e.wrapperWidth+this.commonWidth,this.listenAndSlide();
var i="translate3d(0, 0, 0)";
this.wrapper.css({
webkitTransform:i,
transform:i
});
}
return _createClass(t,[{
key:"moveWrapper",
value:function(){
var t=this.commonWidth,e=t/4,i=-this.currentPage*t+this.distX;
i>e?i=e:r-e>i&&(i=r-e);
var n="translate3d("+i+"px, 0, 0)";
this.wrapper.css({
webkitTransform:n,
transform:n
});
}
},{
key:"addAnimation",
value:function(){
var t="all 0.3s ease";
this.wrapper.css({
transition:t,
webkitTransition:t
});
}
},{
key:"removeAnimation",
value:function(){
var t=this.wrapper.el[0].style;
t.transition="",t.webkitTransition="";
}
},{
key:"animateTo",
value:function(t){
var e=this;
a=!0,this.addAnimation(),this.moveWrapper(),setTimeout(function(){
a=!1,e.removeAnimation();
},n),i.activeNav(t,this.opt.navs);
}
},{
key:"slideToCertainPage",
value:function(){
var t=this.commonWidth,e=55,i=parseInt(this.distX/t,10),n=this.distX%t;
this.currentPage-=i,Math.abs(n)>e&&(this.currentPage-=Math.abs(n)/n*1),this.currentPage>this.opt.pageCount-1?this.currentPage=this.opt.pageCount-1:this.currentPage<0&&(this.currentPage=0),
this.distX=0,this.animateTo(this.currentPage);
}
},{
key:"listenAndSlide",
value:function(){
var t=this,i=void 0,n=void 0,r=function(n){
n.preventDefault(),n.stopPropagation(),a||(s=!0,i=e(n),t.isMoved=!1);
},o=function(){
a||(s=!1,t.slideToCertainPage());
},u=function(r){
r.preventDefault(),r.stopPropagation(),!a&&s&&(n=e(r),t.distX=n-i,t.moveWrapper(),
Math.abs(t.distX)>6&&(t.isMoved=!0));
};
this.wrapper.on("touchstart",r),this.wrapper.on("mousedown",r),this.wrapper.on("touchmove",u),
this.wrapper.on("mousemove",u),this.wrapper.on("touchend",o),this.wrapper.on("mouseup",o);
}
}]),t;
}();
return o;
});define("pages/mod/bottom_modal.html.js",[],function(){
return'<div class="wx_bottom_modal_wrp <#=extClass#>">\n  <div class="weui-half-screen-dialog wx_bottom_modal js_bottom_modal_content">\n    <div class="weui-half-screen-dialog__hd js_bottom_modal_hd">\n      <div class="weui-half-screen-dialog__hd__side">\n        <button class="weui-icon-btn js_close_bottom_modal">返回<i class="weui-icon-close-thin"></i></button>\n      </div>\n      <div class="weui-half-screen-dialog__hd__main">\n        <strong class="weui-half-screen-dialog__title js_bottom_modal_title">标题</strong>\n      </div>\n      <div class="weui-half-screen-dialog__hd__side">\n        <# if (hasBtn) { #>\n          <button class="weui-btn weui-btn_primary weui-btn_mini js_submit_bottom_modal"><#=btnText#></button>\n        <# } #>\n        <button class="weui-icon-btn" style="display:none;">更多<i class="weui-icon-more"></i></button>\n        <# if (isTopic) { #>\n          <div id="js_topic_detail" class="weui-btn__word-wrp">\n            <span class="weui-btn__word">详情</span>\n            <i class="weui_right_arrow"></i>\n          </div>\n        <# } #>\n      </div>\n    </div>\n    <div class="weui-half-screen-dialog__bd js_bottom_modal_bd"></div>\n  </div>\n  <# if (hasMask) { #>\n    <div class="weui-mask wx_bottom_modal_mask js_bottom_modal_mask"></div>\n  <# } #>\n</div>\n';
});;define('widget/wx-widget/wx_bottom_modal.css', [], function(require, exports, module) {
	return ".weui-mask{position:fixed;z-index:1000;top:0;right:0;left:0;bottom:0;background:rgba(0,0,0,0.6)}.weui-mask_transparent{position:fixed;z-index:1000;top:0;right:0;left:0;bottom:0}body{--weui-BTN-DISABLED-FONT-COLOR:rgba(0,0,0,0.2)}body[data-weui-theme='dark']{--weui-BTN-DISABLED-FONT-COLOR:rgba(255,255,255,0.2)}@media(prefers-color-scheme:dark){body:not([data-weui-theme='light']){--weui-BTN-DISABLED-FONT-COLOR:rgba(255,255,255,0.2)}}body{--weui-BTN-DEFAULT-BG:#f2f2f2}body[data-weui-theme='dark']{--weui-BTN-DEFAULT-BG:rgba(255,255,255,0.08)}@media(prefers-color-scheme:dark){body:not([data-weui-theme='light']){--weui-BTN-DEFAULT-BG:rgba(255,255,255,0.08)}}body{--weui-BTN-DEFAULT-COLOR:#06ae56}body[data-weui-theme='dark']{--weui-BTN-DEFAULT-COLOR:rgba(255,255,255,0.8)}@media(prefers-color-scheme:dark){body:not([data-weui-theme='light']){--weui-BTN-DEFAULT-COLOR:rgba(255,255,255,0.8)}}body{--weui-BTN-DEFAULT-ACTIVE-BG:#e6e6e6}body[data-weui-theme='dark']{--weui-BTN-DEFAULT-ACTIVE-BG:rgba(122,122,122,0.1536)}@media(prefers-color-scheme:dark){body:not([data-weui-theme='light']){--weui-BTN-DEFAULT-ACTIVE-BG:rgba(122,122,122,0.1536)}}body{--weui-DIALOG-LINE-COLOR:rgba(0,0,0,0.1)}body[data-weui-theme='dark']{--weui-DIALOG-LINE-COLOR:rgba(255,255,255,0.1)}@media(prefers-color-scheme:dark){body:not([data-weui-theme='light']){--weui-DIALOG-LINE-COLOR:rgba(255,255,255,0.1)}}body{--weui-BG-0:#ededed;--weui-BG-1:#f7f7f7;--weui-BG-2:#fff;--weui-BG-3:#f7f7f7;--weui-BG-4:#4c4c4c;--weui-BG-5:#fff;--weui-FG-0:rgba(0,0,0,0.9);--weui-FG-HALF:rgba(0,0,0,0.9);--weui-FG-1:rgba(0,0,0,0.5);--weui-FG-2:rgba(0,0,0,0.3);--weui-FG-3:rgba(0,0,0,0.1);--weui-RED:#fa5151;--weui-ORANGE:#fa9d3b;--weui-YELLOW:#ffc300;--weui-GREEN:#91d300;--weui-LIGHTGREEN:#95ec69;--weui-BRAND:#07c160;--weui-BLUE:#10aeff;--weui-INDIGO:#1485ee;--weui-PURPLE:#6467f0;--weui-WHITE:#fff;--weui-LINK:#576b95;--weui-TEXTGREEN:#06ae56;--weui-FG:black;--weui-BG:white;--weui-TAG-TEXT-ORANGE:#fa9d3b;--weui-TAG-BACKGROUND-ORANGE:rgba(250,157,59,0.1);--weui-TAG-TEXT-GREEN:#06ae56;--weui-TAG-BACKGROUND-GREEN:rgba(6,174,86,0.1);--weui-TAG-TEXT-BLUE:#10aeff;--weui-TAG-BACKGROUND-BLUE:rgba(16,174,255,0.1);--weui-TAG-TEXT-BLACK:rgba(0,0,0,0.5);--weui-TAG-BACKGROUND-BLACK:rgba(0,0,0,0.05)}@media(prefers-color-scheme:dark){body:not([data-weui-theme='light']){--weui-BG-0:#111;--weui-BG-1:#1e1e1e;--weui-BG-2:#191919;--weui-BG-3:#202020;--weui-BG-4:#404040;--weui-BG-5:#2c2c2c;--weui-FG-0:rgba(255,255,255,0.8);--weui-FG-HALF:rgba(255,255,255,0.6);--weui-FG-1:rgba(255,255,255,0.5);--weui-FG-2:rgba(255,255,255,0.3);--weui-FG-3:rgba(255,255,255,0.05);--weui-RED:#fa5151;--weui-ORANGE:#c87d2f;--weui-YELLOW:#cc9c00;--weui-GREEN:#74a800;--weui-LIGHTGREEN:#3eb575;--weui-BRAND:#07c160;--weui-BLUE:#10aeff;--weui-INDIGO:#1196ff;--weui-PURPLE:#8183ff;--weui-WHITE:rgba(255,255,255,0.8);--weui-LINK:#7d90a9;--weui-TEXTGREEN:#259c5c;--weui-FG:white;--weui-BG:black;--weui-TAG-TEXT-ORANGE:rgba(250,157,59,0.6);--weui-TAG-BACKGROUND-ORANGE:rgba(250,157,59,0.1);--weui-TAG-TEXT-GREEN:rgba(6,174,86,0.6);--weui-TAG-BACKGROUND-GREEN:rgba(6,174,86,0.1);--weui-TAG-TEXT-BLUE:rgba(16,174,255,0.6);--weui-TAG-BACKGROUND-BLUE:rgba(16,174,255,0.1);--weui-TAG-TEXT-BLACK:rgba(255,255,255,0.5);--weui-TAG-BACKGROUND-BLACK:rgba(255,255,255,0.05)}}body[data-weui-theme='dark']{--weui-BG-0:#111;--weui-BG-1:#1e1e1e;--weui-BG-2:#191919;--weui-BG-3:#202020;--weui-BG-4:#404040;--weui-BG-5:#2c2c2c;--weui-FG-0:rgba(255,255,255,0.8);--weui-FG-HALF:rgba(255,255,255,0.6);--weui-FG-1:rgba(255,255,255,0.5);--weui-FG-2:rgba(255,255,255,0.3);--weui-FG-3:rgba(255,255,255,0.05);--weui-RED:#fa5151;--weui-ORANGE:#c87d2f;--weui-YELLOW:#cc9c00;--weui-GREEN:#74a800;--weui-LIGHTGREEN:#3eb575;--weui-BRAND:#07c160;--weui-BLUE:#10aeff;--weui-INDIGO:#1196ff;--weui-PURPLE:#8183ff;--weui-LINK:#7d90a9;--weui-TEXTGREEN:#259c5c;--weui-FG:white;--weui-BG:black;--weui-TAG-TEXT-ORANGE:rgba(250,157,59,0.6);--weui-TAG-BACKGROUND-ORANGE:rgba(250,157,59,0.1);--weui-TAG-TEXT-GREEN:rgba(6,174,86,0.6);--weui-TAG-BACKGROUND-GREEN:rgba(6,174,86,0.1);--weui-TAG-TEXT-BLUE:rgba(16,174,255,0.6);--weui-TAG-BACKGROUND-BLUE:rgba(16,174,255,0.1);--weui-TAG-TEXT-BLACK:rgba(255,255,255,0.5);--weui-TAG-BACKGROUND-BLACK:rgba(255,255,255,0.05)}body{--weui-BG-COLOR-ACTIVE:#ececec}body[data-weui-theme='dark']{--weui-BG-COLOR-ACTIVE:#282828}@media(prefers-color-scheme:dark){body:not([data-weui-theme='light']){--weui-BG-COLOR-ACTIVE:#282828}}.weui-half-screen-dialog{position:fixed;left:0;right:0;bottom:0;max-height:75%;z-index:5000;line-height:1.4;background-color:#fff;background-color:var(--weui-BG-2);border-top-left-radius:12px;border-top-right-radius:12px;overflow:hidden;padding:0 24px;padding:0 calc(24px + constant(safe-area-inset-right)) constant(safe-area-inset-bottom) calc(24px + constant(safe-area-inset-left));padding:0 calc(24px + env(safe-area-inset-right)) env(safe-area-inset-bottom) calc(24px + env(safe-area-inset-left))}@media only screen and (max-height:558px){.weui-half-screen-dialog{max-height:none}}.weui-half-screen-dialog__hd{font-size:8px;height:8em;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.weui-half-screen-dialog__hd .weui-icon-btn{position:absolute;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.weui-half-screen-dialog__hd .weui-icon-btn:active{opacity:.5}.weui-half-screen-dialog__hd__side{position:relative;left:-8px}.weui-btn__word-wrp{font-size:15px;display:-webkit-box;display:-webkit-flex;display:flex;position:relative;right:2px}.weui-btn__word-wrp:active{opacity:.5}.weui-btn__word{color:rgba(0,0,0,0.5)}.weui_right_arrow{display:inline-block;vertical-align:middle;width:10px;height:20px;margin-left:4px;background-size:cover;background-image:url(\"data:image\/svg+xml;charset=utf8,%3Csvg xmlns='http:\/\/www.w3.org\/2000\/svg' width='10' height='20' viewBox='0 0 10 20'%3E  %3Cpath fill-opacity='.5' fill-rule='evenodd' d='M2.045 5.484l.884-.884 4.816 4.816a.83.83 0 0 1 0 1.177l-4.816 4.816-.884-.884 4.52-4.52-4.52-4.521z'\/%3E%3C\/svg%3E\")}.weui-half-screen-dialog__hd__main{-webkit-box-flex:1;-webkit-flex:1;flex:1}.weui-half-screen-dialog__hd__side+.weui-half-screen-dialog__hd__main{text-align:center;padding:0 40px}.weui-half-screen-dialog__hd__main+.weui-half-screen-dialog__hd__side{right:-8px;left:auto}.weui-half-screen-dialog__hd__main+.weui-half-screen-dialog__hd__side .weui-icon-btn{right:0}.weui-half-screen-dialog__title{display:block;color:rgba(0,0,0,0.9);color:var(--weui-FG-0);font-weight:700;font-size:15px}.weui-half-screen-dialog__subtitle{display:block;color:rgba(0,0,0,0.5);color:var(--weui-FG-1);font-size:10px}.weui-half-screen-dialog__bd{word-wrap:break-word;-webkit-hyphens:auto;-ms-hyphens:auto;hyphens:auto;overflow-y:auto;-webkit-overflow-scrolling:touch;padding-top:4px;padding-bottom:40px;font-size:14px;color:rgba(0,0,0,0.9);color:var(--weui-FG-0)}.weui-half-screen-dialog__desc{font-size:17px;font-weight:700;color:rgba(0,0,0,0.9);color:var(--weui-FG-0);line-height:1.4}.weui-half-screen-dialog__tips{padding-top:16px;font-size:14px;color:rgba(0,0,0,0.3);color:var(--weui-FG-2);line-height:1.4}.weui-half-screen-dialog__ft{padding:0 24px 32px;text-align:center}.weui-half-screen-dialog__ft .weui-btn:nth-last-child(n+2),.weui-half-screen-dialog__ft .weui-btn:nth-last-child(n+2)+.weui-btn{display:inline-block;vertical-align:top;margin:0 8px;width:120px}@media(prefers-color-scheme:dark){.weui-btn__word{color:rgba(255,255,255,0.5)}.weui_right_arrow{background-image:url(\"data:image\/svg+xml;charset=utf8,%3Csvg xmlns='http:\/\/www.w3.org\/2000\/svg' width='10' height='20' viewBox='0 0 10 20'%3E  %3Cpath fill='%23FFFFFF' fill-opacity='.5' fill-rule='evenodd' d='M2.045 5.484l.884-.884 4.816 4.816a.83.83 0 0 1 0 1.177l-4.816 4.816-.884-.884 4.52-4.52-4.52-4.521z'\/%3E%3C\/svg%3E\")}}.wx_bottom_modal{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-transition:all .3s;transition:all .3s;top:100%}.wx_bottom_modal .weui-half-screen-dialog__hd__side{min-width:64px}.wx_bottom_modal .weui-half-screen-dialog__hd__side+.weui-half-screen-dialog__hd__main{padding:0}.wx_bottom_modal .weui-half-screen-dialog__hd__main+.weui-half-screen-dialog__hd__side{text-align:right}.wx_bottom_modal .weui-half-screen-dialog__hd .weui-icon-btn{position:static;-webkit-transform:unset;transform:unset;background:transparent}.wx_bottom_modal.weui-half-screen-dialog{max-height:none;overflow:initial}.wx_bottom_modal .weui-half-screen-dialog__title{font-weight:400}.wx_bottom_modal .weui-half-screen-dialog__bd{-webkit-box-flex:1;-webkit-flex:1;flex:1;overflow-y:auto;position:relative;-ms-scroll-chaining:none;overscroll-behavior:contain}.wx_bottom_modal .album_keep_read_item{pointer-events:auto!important}.wx_bottom_modal_wrp{visibility:hidden}.wx_bottom_modal_show{visibility:visible}.wx_bottom_modal_form .wx_bottom_modal{-webkit-transition:none;transition:none;opacity:0}";
});define("pages/audition_tpl.html.js",[],function(){
return'<div id="js_music_dialog">\n    <div class="weui-mask"></div>\n    <div class="weui-dialog">\n        <div class="weui-dialog__bd"><#=msg#></div>\n        <div class="weui-dialog__ft">\n            <a href="javascript:void(0);" class="weui-dialog__btn weui-dialog__btn_primary js_submit">我知道了</a>\n        </div>\n    </div>\n</div>';
});define("pages/musicUrlReport.js",["biz_wap/utils/ajax.js"],function(s){
"use strict";
var e=s("biz_wap/utils/ajax.js"),r=function(){
var s=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],r=[""];
r.push(1*s.type===1?1:2),r.push(s.songid||""),r.push(s.musicid||""),r.push(s.jumpurlkey||""),
r.push(""),r.push(s.kugouParams||"");
for(var t=encodeURIComponent(s.responseData||""),u=2e3,a=parseInt(t.length/u,10),p=0;a>=p;p++){
var n=t.substr(p*u,u);
n&&r.push(n);
}
e({
url:"/mp/webcommreport?action=report",
type:"POST",
data:{
logid:18027,
buffer:r.join(",")
}
});
};
return{
reportRespData:r
};
});