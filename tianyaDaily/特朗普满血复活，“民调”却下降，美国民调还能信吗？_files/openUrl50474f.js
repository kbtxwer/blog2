define("biz_common/utils/monitor.js",[],function(){
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
});define("biz_wap/utils/ajax_load_js.js",["biz_wap/utils/ajax.js","biz_wap/utils/localstorage.js"],function(e){
"use strict";
function n(e){
var n=d(e.url,e.version),o=function(){},i=function(){};
if("function"==typeof e.onSuccess&&(o=e.onSuccess),"function"==typeof e.onError&&(i=e.onError),
c(e.win,n))return void o({
code:1,
queueIndex:0
});
if(e.useCache){
var a=u(e.url,e.version);
if(a&&t({
win:e.win,
funcStr:a,
useCache:!1,
url:e.url,
version:e.version
}),c(e.win,n))return void o({
code:2,
queueIndex:0
});
}
if(S.callbackQueue.push({
options:e,
onSuccess:o,
onError:i
}),"undefined"==typeof S.jsLoadState[n]&&(S.jsLoadState[n]=-1),-1==S.jsLoadState[n]){
var s=e.url;
s+=-1==s.indexOf("?")?"?"+S.customerParam+"="+e.version:"&"+S.customerParam+"="+e.version,
r({
originUrl:e.url,
version:e.version,
url:s,
key:n
});
}
}
function r(e){
S.jsLoadState[e.key]=1,w({
url:e.url,
notJoinUrl:!0,
timeout:1e4,
type:"POST",
dataType:"text",
noXRequestedWidthHeader:!0,
success:function(n){
if(1==S.jsLoadState[e.key]){
S.jsLoadState[e.key]=-1;
var r=!0;
r=n?t({
win:null,
funcStr:n,
useCache:!0,
url:e.originUrl,
version:e.version
}):!1,o(r?{
code:3,
type:"suc",
funcStr:n
}:{
code:51,
type:"err"
});
}
},
error:function(){
1==S.jsLoadState[e.key]&&(S.jsLoadState[e.key]=-1,o({
code:52,
type:"err"
}));
},
complete:function(){
1==S.jsLoadState[e.key]&&(S.jsLoadState[e.key]=-1,o({
code:53,
type:"err"
}));
}
});
}
function t(e){
var n=e.win||window,r=!0;
try{
n.eval(e.funcStr),r=!0;
}catch(t){
r=!1;
}
return r?(s({
url:e.url,
version:e.version,
win:n
}),e.useCache&&a(e.url,e.version,e.funcStr),!0):(l({
url:e.url,
version:e.version,
win:n
}),i(e.url),!1);
}
function o(e){
for(var n=0,r=S.callbackQueue.length;r>n;n++){
var o=S.callbackQueue[n],u=o.options,i=u.win,a=d(u.url,u.version);
"suc"==e.type?(e.funcStr&&!c(i,a)&&t({
win:i,
funcStr:e.funcStr,
useCache:!1,
url:u.url,
version:u.version
}),o.onSuccess({
code:e.code,
queueIndex:n
})):o.onError({
code:e.code,
queueIndex:n
});
}
S.callbackQueue=[];
}
function u(e,n){
var r=f(e),t=y.get(r);
if(!t)return null;
var o;
try{
o=JSON.parse(t);
}catch(u){}
if(o){
var a=+new Date,c=1*o.time;
return a-c>S.lsTimeout||o.version!=n||!o.func?(i(e),null):o.func;
}
}
function i(e){
var n=f(e);
y.remove(n);
}
function a(e,n,r){
var t={
version:n,
func:r,
time:+new Date
},o=f(e);
try{
y.set(o,JSON.stringify(t));
}catch(u){}
}
function c(e,n){
return e=e||window,e[S.winCacheKey]&&e[S.winCacheKey][n]&&e[S.winCacheKey][n].state===!0?!0:!1;
}
function s(e){
var n=d(e.url,e.version),r=e.win||window;
r[S.winCacheKey]||(r[S.winCacheKey]={}),r[S.winCacheKey][n]||(r[S.winCacheKey][n]={}),
r[S.winCacheKey][n].state=!0;
}
function l(e){
var n=d(e.url,e.version),r=e.win||window;
if(r[S.winCacheKey]&&r[S.winCacheKey][n])try{
delete r[S.winCacheKey][n];
}catch(t){}
}
function f(e){
return encodeURIComponent(e);
}
function d(e,n){
return encodeURIComponent(e)+"_"+n||"";
}
function v(e){
l(e),i(e.url);
}
var w=e("biz_wap/utils/ajax.js"),y=e("biz_wap/utils/localstorage.js"),S={
jsLoadState:{},
winCacheKey:"__loadExternalJsStates__",
lsTimeout:1728e5,
customerParam:"wxv",
callbackQueue:[]
};
return{
ClearCache:v,
Load:n
};
});define("new_video/plugin/util.js",["biz_wap/utils/storage.js"],function(e){
"use strict";
var t=e("biz_wap/utils/storage.js"),n=new t("player"),r=function(e){
var t="VIDEO_NOTICE_"+e,r=n.get(t),i=void 0,o=(new Date).getHours();
i=4>o?(new Date).setHours(0,0,0,0)+144e5:(new Date).setHours(0,0,0,0)+1008e5;
var u=1;
r&&r.noticeTime&&(u=r.noticeTime+1),n.set(t,{
noticeTime:u
},i);
},i=function(e){
var t=["2g","3g","4g","2g/3g"];
return e?t.indexOf(e)>-1:!1;
},o=function(e,t){
var i="VIDEO_NOTICE_"+t,o=n.get(i);
if(!o)return r(t),!0;
if(o&&5===t){
var u=o.noticeTime;
if(1===u&&e>=200||2===u&&e>=300)return r(e,t),!0;
}
return!1;
},u=function(e,t){
var n=Object.getOwnPropertyNames(e),r=Object.getOwnPropertyNames(t);
if(n.length!==r.length)return!1;
for(var i=0;i<n.length;i++){
var o=n[i],u=e[o],s=t[o];
if(u!==s)return!1;
}
return!0;
},s=function(e){
return"no"===e||"none"===e;
};
return{
storeNoticeInfo:r,
isMobileNetwork:i,
isVideoNeedFlowNotice:o,
isObjectValueEqual:u,
isNoneNetwork:s
};
});define("new_video/player.html.js",[],function(){
return'<div id="js_mpvedio_<#=id#>" class="js_mpvedio">\n    <!--\n        page_video_skin-vertical 落地页 竖屏 全屏\n        page_video_skin-horizontal 落地页 横屏 全屏\n    -->\n    <div class="js_page_video page_video ratio_primary <#if(ratio==(4/3)){#>video_skin_primary<#}#>" style="width:<#=width#>px;height:<#=height#>px;display:<#=display#>;">\n        <!--ps: @拉风\n            1.全屏body添加扩展类： full_screen_mv\n            2.全屏是竖屏播放的情况：需要给page_video这个div加一个margin-left,margin-top\n            这两个值是page_video设置的高度和宽度的一半的负数；\n            3.如果是横屏的话(横屏默认为全屏)，page_video上设置的宽度和高度去掉即可。\n        -->\n    \n        <!-- <div class="wrp_loading js_loading">\n            <div class="wrp_svg">\n                <svg  class="rotate_svg" width="64" height="64" xmlns="http://www.w3.org/2000/svg">\n                    <circle cx="50%" cy="50%" r="40%" stroke-width="4"/>\n                    <path fill="#fff" stroke="#f00" stroke-width="4" fill-opacity="0" d="M4.5 35\n                   A 26 26, 0,0,0, 27 56" transform="rotate(330.191 30 30)">\n                 <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 30 30" to="360 30 30" dur="5s" repeatCount="indefinite"></animateTransform>\n    \n              </path>\n                </svg>\n                <svg class="loader_bg" xmlns="http://www.w3.org/2000/svg" width="64" height="64">\n                    <circle cx="50%" cy="50%" r="40%" style="fill:#a5a4a2;stroke:#a5a4a2;stroke-width:4;fill-opacity:0;"></circle>\n                </svg>\n            </div>\n        </div> -->\n        <!--全屏时播放结束，展示尾贴内容的时候，显示退出全屏按钮-->\n        <div class="js_video_fullscreen_end video_full-screen__head" style="display: none; z-index: 9999;">\n            <div class="video_full-screen__article-title">\n                <a href="javascript:;" class="js_video_fullscreen_end_exit video_full-screen__article-arrow exit"></a>\n            </div>\n        </div>\n        <!--全屏时顶部profile信息-->\n        <div class="js_video_fullscreen_profile video_full-screen__head" style="display: none;">\n            <div class="video_full-screen__head__inner">\n                <div class="video_full-screen__head__body">\n                    <div class="js_video_fullscreen_profile_exit video_full-screen__head__item">\n                        <div class="video_full-screen__article-title">\n                            <a href="javascript:;" class="video_full-screen__article-arrow"></a>\n                            <span class="js_video_fullscreen_title video_full-screen__article-title-text"></span>\n                        </div>\n                    </div><br/>\n                    <div class="js_video_fullscreen_go_profile video_full-screen__head__item">\n                        <div class="video_full-screen__account-info">\n                            <span class="js_video_fullscreen_head video_full-screen__account-avatar"></span>\n                            <span class="js_video_fullscreen_name video_full-screen__account-name"></span>\n                        </div>\n                    </div>\n                </div>\n                <!-- 更多菜单入口-->\n                <a class="video_menu_more js_video_fullscreen_menu_more" href="javascript:;" style="display: none;"></a>\n            </div>\n        </div>\n\n        <!-- 清晰度切换，顶部tips-->\n        <div class="change_tip_container js_auto_change_tip_mask" style="display: none;">\n            <!--\n                tips 出现动画加className video__top-tips__showIn\n                tips 隐藏动画加className video__top-tips__showOut\n            -->\n            <div class="video__top-tips__mask">\n                <div class="video__top-tips js_auto_change_tip" style="display: none;">视频卡顿，建议切换到自动 <a class="video__top-tips__link js_auto_change_link" href="javascript:;">立即切换</a></div>\n                <div class="video__top-tips js_auto_change_suc_tip" style="display: none;">已成功切换至自动模式</div>\n            </div>\n        </div>\n        \n        <!--下载腾讯视频-->\n        <div id="ing_download_<#=id#>" class="app_download_container" style="display:none;">\n            <# if (window.cgiData) { #>\n            <img class="app_thumb" src="<#=window.cgiData.appImg||""#>">\n            <# } else { #>\n            <img class="app_thumb" src="">\n            <# } #>\n            <span class="btn_app_download_wrp js_download_btn">\n                <span class="btn_app_download js_download_text">下载</span>\n            </span>\n            <span class="btn_app_download_wrp js_progress_main" style="display:none;">\n                <span class="btn_app_download progress_text js_progress_text"></span>\n                <span class="app_download_progress js_progress" style="width:0%;"></span>\n            </span>\n            <div class="app_download_info">\n                <strong class="app_download_title">提升3倍流畅度</strong>\n                <p class="app_download_desc"><span class="js_installStatus"></span>腾讯视频客户端</p>\n            </div>\n        </div>\n    \n        <!-- 视频加载失败 -->\n        <!--\n        <div class="wx_video_error_box">\n            <div class="wx_video_error_msg">\n                <p>视频加载失败，请刷新重试</p>\n                <a class="wx_video_error_msg_btn" href="javascript:;">刷新</a>\n            </div>\n            <img class="wx_video_error_loading" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADkAAAA5CAMAAAC7xnO3AAAAY1BMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+aRQ2gAAAAIXRSTlMAOx20pMJbzBQNTDGTh2ohLCZmeUF2hEmXCFdxUquef4yHE17nAAACnklEQVRIx9WW2xqiIBSFRc1AUATJU1a+/1MOm0NYKvnNXM260ZLftRcbqCQinOLI0yiY/iXKuUZPjx5Fk+6RhF1yHiVF0wC6IZfr9fqIkpRqdNyQ9AoiUU8g+YZ8Xn96YmNKvkhkLMskKgEo/yJzaxkXeZsGsjeWKEIFU/FBZgA+D5yEwGtTgR0J18lYUvdcLZ1YkUjLf+a0saYYSG/J3Hury+WSkTCjCETtF6Mvd8QGJMZSWIfsAlKhWGRl5zQ1ZNBDgy/zzvvFavWUK7SyTRs+rsiUZS/4LHIHyo8VgBx7vDkKx2WhPS7dD1Q6cNlu2dTa0gMys4bz/vJR6ph8ADgcVcSVUkfnhzJTc6gRj8fbCOHk30UI2KC+V4gKjskJQqC5frFHli0kafogFIfFkAXVCSqdAFVR8pmtVCWiXCtaarbWpGtQAYx7sjf2GCbfjFRQpH7lTLucveSMBE7+Z6VqViT2/PVs0d7hPk9TUcTaUuVaT8k/f/v6SXOgyG7InZaSvM8vj/309LrbvpSAORDH2/kWGyHhm/u5AYUc8qdFBRRrsV749bRv6I5x1OY50GZUUxQz9aGplAXZcOQ1DL3vwsTyvHQ2YWgjZV2rDTmxYRjUuoBvcQDr7QRLBiiNzJ4BawG3FLtTmEMGBigTRyC2oIKht1vbwLWrKmXKBZal+yApDGhm4q5JCVdNdrZeQBe8B44WnE2NGmxrR1bCvMugHdkhSwMWI9wjIGeosnPlJmNrst6PQrpeFkBSyAmkdD016DYqAVC6HHcNtnCPgazcuytAd5IqB/qYtq4bkP7vnEaL3W4KH9/HhKBAKl8XFUlMIWYIek4hZgh6UtjHBLVA4pPkCKRf9jOQ5Kwp1UvPDyb3qkPJaRG8Ln7f8Q8Bki/Kj5IYnQAAAABJRU5ErkJggg==">\n        </div>\n        -->\n        <!--菊花-->\n        <div class="wrp_loading js_loading start_loading"  style="display:none;">\n            <div class="mid_opr">\n                <i class="wx_video_loading">\n                </i>\n                <!--\n                <div style="display:none" class="spinner" role="progressbar"\n                    style="position: absolute; width: 0px; z-index: 2000000000; left: 50%; top: 50%;backface-visibility:hidden; -webkit-backface-visibility:hidden;">\n                    <div style="position: absolute; top: -1px; opacity: 0.25; animation: opacity-60-25-0-12 1.25s linear infinite;-webkit-animation: opacity-60-25-0-12 1.25s linear infinite;">\n                        <div\n                            style="position: absolute; width: 9.68px; height: 3.08px; box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px 1px; transform-origin: left 50% 0px; transform: rotate(0deg) translate(9.24px, 0px);-webkit-transform-origin: left 50% 0px; -webkit-transform: rotate(0deg) translate(9.24px, 0px); border-radius: 1px; background: rgb(253, 253, 253);"></div>\n                    </div>\n                    <div style="position: absolute; top: -1px; opacity: 0.25; animation: opacity-60-25-1-12 1.25s linear infinite;-webkit-animation: opacity-60-25-1-12 1.25s linear infinite;">\n                        <div\n                            style="position: absolute; width: 9.68px; height: 3.08px; box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px 1px; transform-origin: left 50% 0px; transform: rotate(30deg) translate(9.24px, 0px);-webkit-transform-origin: left 50% 0px; -webkit-transform: rotate(30deg) translate(9.24px, 0px); border-radius: 1px; background: rgb(253, 253, 253);"></div>\n                    </div>\n                    <div style="position: absolute; top: -1px; opacity: 0.25; animation: opacity-60-25-2-12 1.25s linear infinite;-webkit-animation: opacity-60-25-2-12 1.25s linear infinite;">\n                        <div\n                            style="position: absolute; width: 9.68px; height: 3.08px; box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px 1px; transform-origin: left 50% 0px; transform: rotate(60deg) translate(9.24px, 0px);-webkit-transform-origin: left 50% 0px; -webkit-transform: rotate(60deg) translate(9.24px, 0px); border-radius: 1px; background: rgb(253, 253, 253);"></div>\n                    </div>\n                    <div style="position: absolute; top: -1px; opacity: 0.25; animation: opacity-60-25-3-12 1.25s linear infinite;-webkit-animation: opacity-60-25-3-12 1.25s linear infinite;">\n                        <div\n                            style="position: absolute; width: 9.68px; height: 3.08px; box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px 1px; transform-origin: left 50% 0px; transform: rotate(90deg) translate(9.24px, 0px);-webkit-transform-origin: left 50% 0px; -webkit-transform: rotate(90deg) translate(9.24px, 0px); border-radius: 1px; background: rgb(253, 253, 253);"></div>\n                    </div>\n                    <div style="position: absolute; top: -1px; opacity: 0.25; animation: opacity-60-25-4-12 1.25s linear infinite;-webkit-animation: opacity-60-25-4-12 1.25s linear infinite;">\n                        <div\n                            style="position: absolute; width: 9.68px; height: 3.08px; box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px 1px; transform-origin: left 50% 0px; transform: rotate(120deg) translate(9.24px, 0px);-webkit-transform-origin: left 50% 0px; -webkit-transform: rotate(120deg) translate(9.24px, 0px); border-radius: 1px; background: rgb(253, 253, 253);"></div>\n                    </div>\n                    <div style="position: absolute; top: -1px; opacity: 0.25; animation: opacity-60-25-5-12 1.25s linear infinite;-webkit-animation: opacity-60-25-5-12 1.25s linear infinite;">\n                        <div\n                            style="position: absolute; width: 9.68px; height: 3.08px; box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px 1px; transform-origin: left 50% 0px; transform: rotate(150deg) translate(9.24px, 0px);-webkit-transform-origin: left 50% 0px; -webkit-transform: rotate(150deg) translate(9.24px, 0px); border-radius: 1px; background: rgb(253, 253, 253);"></div>\n                    </div>\n                    <div style="position: absolute; top: -1px; opacity: 0.25; animation: opacity-60-25-6-12 1.25s linear infinite;-webkit-animation: opacity-60-25-6-12 1.25s linear infinite;">\n                        <div\n                            style="position: absolute; width: 9.68px; height: 3.08px; box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px 1px; transform-origin: left 50% 0px; transform: rotate(180deg) translate(9.24px, 0px);-webkit-transform-origin: left 50% 0px; -webkit-transform: rotate(180deg) translate(9.24px, 0px); border-radius: 1px; background: rgb(253, 253, 253);"></div>\n                    </div>\n                    <div style="position: absolute; top: -1px; opacity: 0.25; animation: opacity-60-25-7-12 1.25s linear infinite;-webkit-animation: opacity-60-25-7-12 1.25s linear infinite;">\n                        <div\n                            style="position: absolute; width: 9.68px; height: 3.08px; box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px 1px; transform-origin: left 50% 0px; transform: rotate(210deg) translate(9.24px, 0px);-webkit-transform-origin: left 50% 0px; -webkit-transform: rotate(210deg) translate(9.24px, 0px); border-radius: 1px; background: rgb(253, 253, 253);"></div>\n                    </div>\n                    <div style="position: absolute; top: -1px; opacity: 0.25; animation: opacity-60-25-8-12 1.25s linear infinite;-webkit-animation: opacity-60-25-8-12 1.25s linear infinite;">\n                        <div\n                            style="position: absolute; width: 9.68px; height: 3.08px; box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px 1px; transform-origin: left 50% 0px; transform: rotate(240deg) translate(9.24px, 0px);-webkit-transform-origin: left 50% 0px; -webkit-transform: rotate(240deg) translate(9.24px, 0px); border-radius: 1px; background: rgb(253, 253, 253);"></div>\n                    </div>\n                    <div style="position: absolute; top: -1px; opacity: 0.25; animation: opacity-60-25-9-12 1.25s linear infinite;-webkit-animation: opacity-60-25-9-12 1.25s linear infinite;">\n                        <div\n                            style="position: absolute; width: 9.68px; height: 3.08px; box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px 1px; transform-origin: left 50% 0px; transform: rotate(270deg) translate(9.24px, 0px);-webkit-transform-origin: left 50% 0px; -webkit-transform: rotate(270deg) translate(9.24px, 0px); border-radius: 1px; background: rgb(253, 253, 253);"></div>\n                    </div>\n                    <div style="position: absolute; top: -1px; opacity: 0.25; animation: opacity-60-25-10-12 1.25s linear infinite;-webkit-animation: opacity-60-25-10-12 1.25s linear infinite;">\n                        <div\n                            style="position: absolute; width: 9.68px; height: 3.08px; box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px 1px; transform-origin: left 50% 0px; transform: rotate(300deg) translate(9.24px, 0px);-webkit-transform-origin: left 50% 0px; -webkit-transform: rotate(300deg) translate(9.24px, 0px); border-radius: 1px; background: rgb(253, 253, 253);"></div>\n                    </div>\n                    <div style="position: absolute; top: -1px; opacity: 0.25; animation: opacity-60-25-11-12 1.25s linear infinite;-webkit-animation: opacity-60-25-11-12 1.25s linear infinite;">\n                        <div\n                            style="position: absolute; width: 9.68px; height: 3.08px; box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px 1px; transform-origin: left 50% 0px; transform: rotate(330deg) translate(9.24px, 0px);-webkit-transform-origin: left 50% 0px; -webkit-transform: rotate(330deg) translate(9.24px, 0px); border-radius: 1px; background: rgb(253, 253, 253);"></div>\n                    </div>\n                </div>\n                -->\n            </div>\n            <!--\n            <svg version="1.1" class="svg_loader" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n            width="60px" height="60px" viewBox="0 0 60 60" enable-background="new 0 0 60 60" xml:space="preserve">\n    \n            <circle cx="30" cy="30" r="26" style="fill:#a5a4a2;stroke:#a5a4a2;stroke-width:4;fill-opacity:0" />\n            <path  fill="#fff" stroke="#fff"  stroke-width="4"  fill-opacity="0" d="M4.5 35A 26 26, 0,0,0, 27 56" style="stroke-linecap:round;">\n            <animateTransform attributeType="xml"\n            attributeName="transform"\n            type="rotate"\n            from="0 30 30"\n            to="360 30 30"\n            dur="0.5s"\n            repeatCount="indefinite"/>\n            </path>\n            </svg>\n            -->\n        </div>\n    \n        <!-- 播放按钮 z-index:12 -->\n        <div class="video_pause_controll js_video_pause_controll" style="display: none;">\n            <a class="btn_pause js_btn_pause">\n                <i class="icon_pause"></i>\n            </a>\n        </div>\n    \n        <!-- 互选视频广告 静音btn 静音状态className:muting -->\n        <# if(ad_muted_btn){ #>\n        <span class="js_muted_btn video_muted_btn muting">静音</span>\n        <# } #>\n    \n        <!-- 视频广告 z-index:13 -->\n        <div class="video_ad js_ad_controll" style="display:none;">\n            <span class="button_left_time video_ad_time_meta mpad_more_innervideo_container js_ad_opt_list_btn">广告                <!--投诉入口 begin-->\n                <div href="javascript:;" class="mpad_more js_ad_opt_list_btn" style="<# if(!parseInt(parent.window.can_see_complaint)){ #>display: none<# } #>">\n                    <ul class="mpad_more_list js_ad_opt_list" style="display:none;">\n                        <li class="mpad_more_list_ele">\n                            <a class="mpad_more_list_ele_container js_complain_btn" href="javascript:;">投诉</a>\n                        </li>\n                    </ul>\n                </div>\n                <!--投诉入口 end-->\n                <span class="button_left_time_num js_play_time"></span></span>\n            <a href="javascript:;" class="btn_close js_btn_can_close_ad video_ad_time_meta" style="display:none;">可在<span class="js_can_close_time">(5s)</span>后关闭</a>\n            <a href="javascript:;" class="btn_close js_btn_close_ad video_ad_time_meta" style="display:none;">关闭<i></i></a>\n    \n        </div>\n        <!-- 视频广告详情入口 -->\n        <div class="video_ad_detail js_ad_detail" style="display:none;">\n            <!--带小程序logo时，className 去掉with_arrow，加className with_weapp-->\n            <a href="javascript:;" class="btn btn_ad_detail with_arrow js_btn_ad_detail">\n                <!-- 小程序图标 -->\n                <span class="icon26_weapp_white js_video_post_weapp_icon" style="display:none;"></span>了解详情            </a>\n        </div>\n        <!--带小程序icon-->\n        <!-- <div class="video_ad_detail js_ad_detail" style="display:none;">\n            <a href="javascript:;" class="btn btn_ad_detail with_weapp js_btn_ad_detail">\n                <span class="icon26_weapp_white js_video_post_weapp_icon"></span>\n                了解详情\n            </a>\n        </div> -->\n    \n        <div class="video_ad_detail js_ad_app" style="display:none;">\n            <a href="javascript:;" class="btn btn_ad_detail with_arrow js_btn_ad_app">下载应用</a>\n        </div>\n    \n         <!--最后的视频推荐 z-index:11-->\n        <div class="js_end_dom continue_play none">\n            <!--\n            <div class="continue_inner">\n                <div class="hd_opr"><a href="#" class="btn_replay"><i class="icon_replay"></i>重新播放</a></div>\n                <div class="tit_desc">以下视频将跳到腾讯视频播放</div>\n                <ul class="video_list">\n                   <li class="video_item">\n                       <a href="#" class="inner_item">\n                           <img  class="cover" src="<%@GetResFullName($images_path$pages/default_avator.png)%>"/>\n                           <div class="desc">\n                            这里是video的标题啊标题京东覅是\n                           </div>\n                       </a>\n                   </li>\n                </ul>\n            </div>\n            -->\n        </div>\n        \n        <!-- 无障碍按钮 -->\n        <em data-status="0" role="button" class="js_btn_play_aria btn_pause_accessibility"></em>\n        <!--封面-->\n        <!-- 跟播放器相同比例是style加上：\n            -webkit-background-size:cover;background-size:cover;  -->\n        <#if(cover){#>\n        <div class="js_poster_cover poster_cover" style="background-image:url(<#=cover#>);-webkit-background-size:<#if(useWcSlPlayer){#>contain<#}else{#>cover<#}#>;background-size:<#if(useWcSlPlayer){#>contain<#}else{#>cover<#}#>;">\n            <!-- <img aria-labelledby="封面" alt="封面" src="<#=cover#>">\n            <div class="poster_cover_mask"></div> -->\n        </div>\n        <#}#>\n        <!--大播放-->\n        <div style="display:none;" class="full_screen_opr js_video_play_controll">\n            <div class="mid_play_box js_btn_play" role="button">\n                <i class="icon_mid_play"></i>\n                <p class="js_video_length video_length" style="display:none;"></p>\n            </div>\n        </div>\n\n        <!-- 视频分享 -->\n        <#if(canShareVideo){#>\n        <div class="js_share_btn_contain top_screen_opr" style="display: none;">\n            <div class="wx_video_share_area">\n            <button type="button" class="js_share_btn wx_video_share_btn">分享视频</button>\n            </div>\n        </div>\n        <#}#>\n    \n        <!--流量提示-->\n        <div class="top_screen_opr flex_screen_hide js_video_flow" style="display: none">\n            <div class="wx_video_flow">\n                <p class="wx_video_flow_tips js_flow_notice_1" style="display: none">\n                    当前为非Wi-Fi环境，请注意流量消耗                </p>\n                <p class="wx_video_flow_tips js_flow_notice_2" style="display: none">\n                    正在使用流量播放，该视频预计消耗                    <span class="js_video_flow_num"></span>\n                </p>\n            </div>\n        </div>\n    \n        <!--mask,暂停状态下，提醒状态等的半透明蒙层-->\n        <div class="video_mask none"></div>\n    \n        <!--快进。后退 操作 快进：next,快退，pre-->\n        <!--亮度，音量调节也复用一波-->\n        <div  class="mid_opr fast_pre_next none js_forward">\n            <p class="video_length">\n                <span class="played_time js_forward_play_time">03:30</span>\n                <span class="js_forward_seperator">/</span>\n                <span class="total_time js_forward_total_time">03:30</span>\n            </p>\n            <div class="video_processor_bar">\n                <div class="processor_bar_inner js_forward_bar" style="width:30%;"></div>\n            </div>\n        </div>\n\n        <!--控制栏-->\n        <!--消失opr_fade_out  出现opr_fade_in-->\n        <!--消失opr_fade_out  出现opr_fade_in-->\n        <div class="js_controll video_opr" style="display:none;">\n             <div class="opr_inner">\n                <div class="opr_inner_fl">\n                    <div class="js_switch switch switch_on"><!--switch_off 关闭，switch on开启-->\n                        <a href="javascript:;" class="btn_opr"></a>\n                    </div>\n                    <div class="played_time js_now_play_time">00:00</div>/<div class="total_time js_total_time">00:00</div>\n                </div>\n                <!-- <div class="wrp_pop_play"><a href="#" class="pop_play">小窗</a></div> -->\n                \n\n                <div class="opr_inner_fr">\n                    <#if(_initUseWcSlPlayer){#>\n                        <!--倍速播放-->\n                        <#if(playbackRateInfo && playbackRateInfo.length){#>\n                        <div class="play_setting_mode play_setting_mode__rate js_playback_mode_change">\n                            <a href="javascript:;" id="play_setting_mode__rate" class="play_setting">倍速</a>\n                        </div>\n                        <#}#>\n                        <!--清晰度切换-->\n                        <#if(resolutionInfo && resolutionInfo.length){#>\n                        <div class="play_setting_mode js_play_mode_change" style="display: none;">\n                            <a href="javascript:;" class="play_setting"><#=initResolutionName#></a>\n                        </div>\n                        <#}#>\n                    <#}#>\n                    <#if(!_mustHideFullScreen){#>\n                    <div class="js_full_screen_control screenSize_control full"><i class="icon_control"></i></div>  <!--全屏className：full,小窗className：small-->\n                    <#}#>\n                </div>\n             </div>\n        </div>\n\n        <#if(_initUseWcSlPlayer){#>\n        <div class="js_sub_setting video_full-screen__footer video_full-screen__footer__sub-setting">\n            <#if(playbackRateInfo && playbackRateInfo.length){#>\n            <div class="video_full-screen__sub-setting video_full-screen__sub-setting__speed js_playback_mode_select" style="display: none;">\n                <#playbackRateInfo.forEach(function(_info, idx){#>\n                <a href="javascript:;" class="video_full-screen__sub-setting__item <#if(_info.initCurrent){#>current<#}#> js_playback_<#=idx#>"><#=_info.name#></a>\n                <#});#>\n            </div>\n            <#}#>\n            <#if(resolutionInfo && resolutionInfo.length){#>\n            <div class="video_full-screen__sub-setting video_full-screen__sub-setting__ratio js_play_mode_select" style="display: none;">\n                <#resolutionInfo.forEach(function(_info, idx){#>\n                <a href="javascript:;" class="video_full-screen__sub-setting__item <#if(_info.initCurrent){#>current<#}#> js_resolution_<#=idx#>"><#=_info.name#></a>\n                <#});#>\n            </div>\n            <#}#>\n        </div>\n        <#}#>\n\n        <!--进度条-->\n        <!--收起滑块wrp_play_bar_hide_speed-dot-->\n        <div class="js_play_bar_wrapper wrp_play_bar wrp_play_bar_hide_speed-dot">\n            <!--\n                拖动进度条\n                加className wrp_progress__draging\n            -->\n            <div class="js_progress_bar wrp_progress" style="display:none;">\n                <div class="progress_bar">\n                    <div class="background_bar"></div><!--背景条-->\n                    <div class="js_played_bar played_bar" style="width:0%"></div><!--进度条-->\n                    <div class="js_buffer_bar buffer_bar" style="width:0%"></div><!--缓冲条-->\n                    <div class="js_played_speed_cnt wrp_speed_dot"><i class="speed_dot" style="left:0%"></i></div>\n                </div>\n            </div>\n        </div>\n        <!--视频-->\n        <div class="js_inner inner not_fullscreen">\n            <div class="js_video_poster video_poster" <#if(!_initUseWcSlPlayer){#>style="display:none;"<#}#>>\n                <div class="video_mask"></div>\n                <#if(_initUseWcSlPlayer){#>\n                <wx-open-video src="<#=src#>" width="<#=width#>" height="<#=height#>" style="display:block;"\n                    fullscreen-after-orientation-change hide-ios-exit-btn-when-fullscreen\n                    <#if(typeof initialTime===\'number\' && autoplay){#>initial-time="<#=initialTime#>" autoplay<#}#>\n                >\n                </wx-open-video>\n                <#}else{#>\n                <video class="<#if(videoFit){#>video_fill<#}#>" webkit-playsinline playsinline <#if(videoCrossOrigin){#>crossorigin="anonymous"<#}#>>\n                    您的浏览器不支持 video 标签                </video>\n                <#}#>\n            </div>\n        </div>\n    \n    </div>\n    \n        <!--全屏遮罩-->\n    <div class="js_full_mask full_mask" style=""></div>\n    <!--\n    11 菊花\n    10 最后的视频推荐\n    9封面上边的控制按钮\n    8  以后的广告浮层\n    7 封面\n    6 视频+控制条 （在里边控制条z-index>视频） -->\n</div>\n    ';
});!function(e){
var c="object"==typeof window&&window||"object"==typeof self&&self;
"function"==typeof define?define("biz_common/utils/emoji_data.js",[],function(c,o){
"use strict";
return e(o);
}):c&&"undefined"==typeof c.__emojiData&&(c.__emojiData=e({}));
}(function(){
return[{
id:0,
cn:"[微笑]",
hk:"[微笑]",
us:"[Smile]",
code:"/::)",
web_code:"/微笑",
style:"icon_smiley_0"
},{
id:1,
cn:"[撇嘴]",
hk:"[撇嘴]",
us:"[Grimace]",
code:"/::~",
web_code:"/撇嘴",
style:"icon_smiley_1"
},{
id:2,
cn:"[色]",
hk:"[色]",
us:"[Drool]",
code:"/::B",
web_code:"/色",
style:"icon_smiley_2"
},{
id:3,
cn:"[发呆]",
hk:"[發呆]",
us:"[Scowl]",
code:"/::|",
web_code:"/发呆",
style:"icon_smiley_3"
},{
id:4,
cn:"[得意]",
hk:"[得意]",
us:"[CoolGuy]",
code:"/:8-)",
web_code:"/得意",
style:"icon_smiley_4"
},{
id:5,
cn:"[流泪]",
hk:"[流淚]",
us:"[Sob]",
code:"/::<",
web_code:"/流泪",
style:"icon_smiley_5"
},{
id:6,
cn:"[害羞]",
hk:"[害羞]",
us:"[Shy]",
code:"/::$",
web_code:"/害羞",
style:"icon_smiley_6"
},{
id:7,
cn:"[闭嘴]",
hk:"[閉嘴]",
us:"[Silent]",
code:"/::X",
web_code:"/闭嘴",
style:"icon_smiley_7"
},{
id:8,
cn:"[睡]",
hk:"[睡]",
us:"[Sleep]",
code:"/::Z",
web_code:"/睡",
style:"icon_smiley_8"
},{
id:9,
cn:"[大哭]",
hk:"[大哭]",
us:"[Cry]",
code:"/::'(",
web_code:"/大哭",
style:"icon_smiley_9"
},{
id:10,
cn:"[尴尬]",
hk:"[尷尬]",
us:"[Awkward]",
code:"/::-|",
web_code:"/尴尬",
style:"icon_smiley_10"
},{
id:11,
cn:"[发怒]",
hk:"[發怒]",
us:"[Angry]",
code:"/::@",
web_code:"/发怒",
style:"icon_smiley_11"
},{
id:12,
cn:"[调皮]",
hk:"[調皮]",
us:"[Tongue]",
code:"/::P",
web_code:"/调皮",
style:"icon_smiley_12"
},{
id:13,
cn:"[呲牙]",
hk:"[呲牙]",
us:"[Grin]",
code:"/::D",
web_code:"/呲牙",
style:"icon_smiley_13"
},{
id:14,
cn:"[惊讶]",
hk:"[驚訝]",
us:"[Surprise]",
code:"/::O",
web_code:"/惊讶",
style:"icon_smiley_14"
},{
id:15,
cn:"[难过]",
hk:"[難過]",
us:"[Frown]",
code:"/::(",
web_code:"/难过",
style:"icon_smiley_15"
},{
id:16,
cn:"[酷]",
hk:"[酷]",
us:"[Ruthless]",
code:"/::+",
web_code:"/酷",
style:"icon_smiley_16"
},{
id:17,
cn:"[冷汗]",
hk:"[冷汗]",
us:"[Blush]",
code:"/:--b",
web_code:"/冷汗",
style:"icon_smiley_17"
},{
id:18,
cn:"[抓狂]",
hk:"[抓狂]",
us:"[Scream]",
code:"/::Q",
web_code:"/抓狂",
style:"icon_smiley_18"
},{
id:19,
cn:"[吐]",
hk:"[吐]",
us:"[Puke]",
code:"/::T",
web_code:"/吐",
style:"icon_smiley_19"
},{
id:20,
cn:"[偷笑]",
hk:"[偷笑]",
us:"[Chuckle]",
code:"/:,@P",
web_code:"/偷笑",
style:"icon_smiley_20"
},{
id:21,
cn:"[愉快]",
hk:"[愉快]",
us:"[Joyful]",
code:"/:,@-D",
web_code:"/可爱",
style:"icon_smiley_21"
},{
id:22,
cn:"[白眼]",
hk:"[白眼]",
us:"[Slight]",
code:"/::d",
web_code:"/白眼",
style:"icon_smiley_22"
},{
id:23,
cn:"[傲慢]",
hk:"[傲慢]",
us:"[Smug]",
code:"/:,@o",
web_code:"/傲慢",
style:"icon_smiley_23"
},{
id:24,
cn:"[饥饿]",
hk:"[饑餓]",
us:"[Hungry]",
code:"/::g",
web_code:"/饥饿",
style:"icon_smiley_24"
},{
id:25,
cn:"[困]",
hk:"[累]",
us:"[Drowsy]",
code:"/:|-)",
web_code:"/困",
style:"icon_smiley_25"
},{
id:26,
cn:"[惊恐]",
hk:"[驚恐]",
us:"[Panic]",
code:"/::!",
web_code:"/惊恐",
style:"icon_smiley_26"
},{
id:27,
cn:"[流汗]",
hk:"[流汗]",
us:"[Sweat]",
code:"/::L",
web_code:"/流汗",
style:"icon_smiley_27"
},{
id:28,
cn:"[憨笑]",
hk:"[大笑]",
us:"[Laugh]",
code:"/::>",
web_code:"/憨笑",
style:"icon_smiley_28"
},{
id:29,
cn:"[悠闲]",
hk:"[悠閑]",
us:"[Commando]",
code:"/::,@",
web_code:"/大兵",
style:"icon_smiley_29"
},{
id:30,
cn:"[奋斗]",
hk:"[奮鬥]",
us:"[Determined]",
code:"/:,@f",
web_code:"/奋斗",
style:"icon_smiley_30"
},{
id:31,
cn:"[咒骂]",
hk:"[咒罵]",
us:"[Scold]",
code:"/::-S",
web_code:"/咒骂",
style:"icon_smiley_31"
},{
id:32,
cn:"[疑问]",
hk:"[疑問]",
us:"[Shocked]",
code:"/:?",
web_code:"/疑问",
style:"icon_smiley_32"
},{
id:33,
cn:"[嘘]",
hk:"[噓]",
us:"[Shhh]",
code:"/:,@x",
web_code:"/嘘",
style:"icon_smiley_33"
},{
id:34,
cn:"[晕]",
hk:"[暈]",
us:"[Dizzy]",
code:"/:,@@",
web_code:"/晕",
style:"icon_smiley_34"
},{
id:35,
cn:"[疯了]",
hk:"[瘋了]",
us:"[Tormented]",
code:"/::8",
web_code:"/折磨",
style:"icon_smiley_35"
},{
id:36,
cn:"[衰]",
hk:"[衰]",
us:"[Toasted]",
code:"/:,@!",
web_code:"/衰",
style:"icon_smiley_36"
},{
id:37,
cn:"[骷髅]",
hk:"[骷髏頭]",
us:"[Skull]",
code:"/:!!!",
web_code:"/骷髅",
style:"icon_smiley_37"
},{
id:38,
cn:"[敲打]",
hk:"[敲打]",
us:"[Hammer]",
code:"/:xx",
web_code:"/敲打",
style:"icon_smiley_38"
},{
id:39,
cn:"[再见]",
hk:"[再見]",
us:"[Wave]",
code:"/:bye",
web_code:"/再见",
style:"icon_smiley_39"
},{
id:40,
cn:"[擦汗]",
hk:"[擦汗]",
us:"[Speechless]",
code:"/:wipe",
web_code:"/擦汗",
style:"icon_smiley_40"
},{
id:41,
cn:"[抠鼻]",
hk:"[摳鼻]",
us:"[NosePick]",
code:"/:dig",
web_code:"/抠鼻",
style:"icon_smiley_41"
},{
id:42,
cn:"[鼓掌]",
hk:"[鼓掌]",
us:"[Clap]",
code:"/:handclap",
web_code:"/鼓掌",
style:"icon_smiley_42"
},{
id:43,
cn:"[糗大了]",
hk:"[羞辱]",
us:"[Shame]",
code:"/:&-(",
web_code:"/糗大了",
style:"icon_smiley_43"
},{
id:44,
cn:"[坏笑]",
hk:"[壞笑]",
us:"[Trick]",
code:"/:B-)",
web_code:"/坏笑",
style:"icon_smiley_44"
},{
id:45,
cn:"[左哼哼]",
hk:"[左哼哼]",
us:"[Bah！L]",
code:"/:<@",
web_code:"/左哼哼",
style:"icon_smiley_45"
},{
id:46,
cn:"[右哼哼]",
hk:"[右哼哼]",
us:"[Bah！R]",
code:"/:@>",
web_code:"/右哼哼",
style:"icon_smiley_46"
},{
id:47,
cn:"[哈欠]",
hk:"[哈欠]",
us:"[Yawn]",
code:"/::-O",
web_code:"/哈欠",
style:"icon_smiley_47"
},{
id:48,
cn:"[鄙视]",
hk:"[鄙視]",
us:"[Pooh-pooh]",
code:"/:>-|",
web_code:"/鄙视",
style:"icon_smiley_48"
},{
id:49,
cn:"[委屈]",
hk:"[委屈]",
us:"[Shrunken]",
code:"/:P-(",
web_code:"/委屈",
style:"icon_smiley_49"
},{
id:50,
cn:"[快哭了]",
hk:"[快哭了]",
us:"[TearingUp]",
code:"/::'|",
web_code:"/快哭了",
style:"icon_smiley_50"
},{
id:51,
cn:"[阴险]",
hk:"[陰險]",
us:"[Sly]",
code:"/:X-)",
web_code:"/阴险",
style:"icon_smiley_51"
},{
id:52,
cn:"[亲亲]",
hk:"[親親]",
us:"[Kiss]",
code:"/::*",
web_code:"/亲亲",
style:"icon_smiley_52"
},{
id:53,
cn:"[吓]",
hk:"[嚇]",
us:"[Wrath]",
code:"/:@x",
web_code:"/吓",
style:"icon_smiley_53"
},{
id:54,
cn:"[可怜]",
hk:"[可憐]",
us:"[Whimper]",
code:"/:8*",
web_code:"/可怜",
style:"icon_smiley_54"
},{
id:55,
cn:"[菜刀]",
hk:"[菜刀]",
us:"[Cleaver]",
code:"/:pd",
web_code:"/菜刀",
style:"icon_smiley_55"
},{
id:56,
cn:"[西瓜]",
hk:"[西瓜]",
us:"[Watermelon]",
code:"/:<W>",
web_code:"/西瓜",
style:"icon_smiley_56"
},{
id:57,
cn:"[啤酒]",
hk:"[啤酒]",
us:"[Beer]",
code:"/:beer",
web_code:"/啤酒",
style:"icon_smiley_57"
},{
id:58,
cn:"[篮球]",
hk:"[籃球]",
us:"[Basketball]",
code:"/:basketb",
web_code:"/篮球",
style:"icon_smiley_58"
},{
id:59,
cn:"[乒乓]",
hk:"[乒乓]",
us:"[PingPong]",
code:"/:oo",
web_code:"/乒乓",
style:"icon_smiley_59"
},{
id:60,
cn:"[咖啡]",
hk:"[咖啡]",
us:"[Coffee]",
code:"/:coffee",
web_code:"/咖啡",
style:"icon_smiley_60"
},{
id:61,
cn:"[饭]",
hk:"[飯]",
us:"[Rice]",
code:"/:eat",
web_code:"/饭",
style:"icon_smiley_61"
},{
id:62,
cn:"[猪头]",
hk:"[豬頭]",
us:"[Pig]",
code:"/:pig",
web_code:"/猪头",
style:"icon_smiley_62"
},{
id:63,
cn:"[玫瑰]",
hk:"[玫瑰]",
us:"[Rose]",
code:"/:rose",
web_code:"/玫瑰",
style:"icon_smiley_63"
},{
id:64,
cn:"[凋谢]",
hk:"[枯萎]",
us:"[Wilt]",
code:"/:fade",
web_code:"/凋谢",
style:"icon_smiley_64"
},{
id:65,
cn:"[嘴唇]",
hk:"[嘴唇]",
us:"[Lips]",
code:"/:showlove",
web_code:"/示爱",
style:"icon_smiley_65"
},{
id:66,
cn:"[爱心]",
hk:"[愛心]",
us:"[Heart]",
code:"/:heart",
web_code:"/爱心",
style:"icon_smiley_66"
},{
id:67,
cn:"[心碎]",
hk:"[心碎]",
us:"[BrokenHeart]",
code:"/:break",
web_code:"/心碎",
style:"icon_smiley_67"
},{
id:68,
cn:"[蛋糕]",
hk:"[蛋糕]",
us:"[Cake]",
code:"/:cake",
web_code:"/蛋糕",
style:"icon_smiley_68"
},{
id:69,
cn:"[闪电]",
hk:"[閃電]",
us:"[Lightning]",
code:"/:li",
web_code:"/闪电",
style:"icon_smiley_69"
},{
id:70,
cn:"[炸弹]",
hk:"[炸彈]",
us:"[Bomb]",
code:"/:bome",
web_code:"/炸弹",
style:"icon_smiley_70"
},{
id:71,
cn:"[刀]",
hk:"[刀]",
us:"[Dagger]",
code:"/:kn",
web_code:"/刀",
style:"icon_smiley_71"
},{
id:72,
cn:"[足球]",
hk:"[足球]",
us:"[Soccer]",
code:"/:footb",
web_code:"/足球",
style:"icon_smiley_72"
},{
id:73,
cn:"[瓢虫]",
hk:"[甲蟲]",
us:"[Ladybug]",
code:"/:ladybug",
web_code:"/瓢虫",
style:"icon_smiley_73"
},{
id:74,
cn:"[便便]",
hk:"[便便]",
us:"[Poop]",
code:"/:shit",
web_code:"/便便",
style:"icon_smiley_74"
},{
id:75,
cn:"[月亮]",
hk:"[月亮]",
us:"[Moon]",
code:"/:moon",
web_code:"/月亮",
style:"icon_smiley_75"
},{
id:76,
cn:"[太阳]",
hk:"[太陽]",
us:"[Sun]",
code:"/:sun",
web_code:"/太阳",
style:"icon_smiley_76"
},{
id:77,
cn:"[礼物]",
hk:"[禮物]",
us:"[Gift]",
code:"/:gift",
web_code:"/礼物",
style:"icon_smiley_77"
},{
id:78,
cn:"[拥抱]",
hk:"[擁抱]",
us:"[Hug]",
code:"/:hug",
web_code:"/拥抱",
style:"icon_smiley_78"
},{
id:79,
cn:"[强]",
hk:"[強]",
us:"[ThumbsUp]",
code:"/:strong",
web_code:"/强",
style:"icon_smiley_79"
},{
id:80,
cn:"[弱]",
hk:"[弱]",
us:"[ThumbsDown]",
code:"/:weak",
web_code:"/弱",
style:"icon_smiley_80"
},{
id:81,
cn:"[握手]",
hk:"[握手]",
us:"[Shake]",
code:"/:share",
web_code:"/握手",
style:"icon_smiley_81"
},{
id:82,
cn:"[胜利]",
hk:"[勝利]",
us:"[Peace]",
code:"/:v",
web_code:"/胜利",
style:"icon_smiley_82"
},{
id:83,
cn:"[抱拳]",
hk:"[抱拳]",
us:"[Fight]",
code:"/:@)",
web_code:"/抱拳",
style:"icon_smiley_83"
},{
id:84,
cn:"[勾引]",
hk:"[勾引]",
us:"[Beckon]",
code:"/:jj",
web_code:"/勾引",
style:"icon_smiley_84"
},{
id:85,
cn:"[拳头]",
hk:"[拳頭]",
us:"[Fist]",
code:"/:@@",
web_code:"/拳头",
style:"icon_smiley_85"
},{
id:86,
cn:"[差劲]",
hk:"[差勁]",
us:"[Pinky]",
code:"/:bad",
web_code:"/差劲",
style:"icon_smiley_86"
},{
id:87,
cn:"[爱你]",
hk:"[愛你]",
us:"[RockOn]",
code:"/:lvu",
web_code:"/爱你",
style:"icon_smiley_87"
},{
id:88,
cn:"[NO]",
hk:"[NO]",
us:"[Nuh-uh]",
code:"/:no",
web_code:"/NO",
style:"icon_smiley_88"
},{
id:89,
cn:"[OK]",
hk:"[OK]",
us:"[OK]",
code:"/:ok",
web_code:"/OK",
style:"icon_smiley_89"
},{
id:90,
cn:"[爱情]",
hk:"[愛情]",
us:"[InLove]",
code:"/:love",
web_code:"/爱情",
style:"icon_smiley_90"
},{
id:91,
cn:"[飞吻]",
hk:"[飛吻]",
us:"[Blowkiss]",
code:"/:<L>",
web_code:"/飞吻",
style:"icon_smiley_91"
},{
id:92,
cn:"[跳跳]",
hk:"[跳跳]",
us:"[Waddle]",
code:"/:jump",
web_code:"/跳跳",
style:"icon_smiley_92"
},{
id:93,
cn:"[发抖]",
hk:"[發抖]",
us:"[Tremble]",
code:"/:shake",
web_code:"/发抖",
style:"icon_smiley_93"
},{
id:94,
cn:"[怄火]",
hk:"[噴火]",
us:"[Aaagh!]",
code:"/:<O>",
web_code:"/怄火",
style:"icon_smiley_94"
},{
id:95,
cn:"[转圈]",
hk:"[轉圈]",
us:"[Twirl]",
code:"/:circle",
web_code:"/转圈",
style:"icon_smiley_95"
},{
id:96,
cn:"[磕头]",
hk:"[磕頭]",
us:"[Kotow]",
code:"/:kotow",
web_code:"/磕头",
style:"icon_smiley_96"
},{
id:97,
cn:"[回头]",
hk:"[回頭]",
us:"[Dramatic]",
code:"/:turn",
web_code:"/回头",
style:"icon_smiley_97"
},{
id:98,
cn:"[跳绳]",
hk:"[跳繩]",
us:"[JumpRope]",
code:"/:skip",
web_code:"/跳绳",
style:"icon_smiley_98"
},{
id:99,
cn:"[投降]",
hk:"[投降]",
us:"[Surrender]",
code:"/:oY",
web_code:"/挥手",
style:"icon_smiley_99"
},{
id:100,
cn:"[激动]",
hk:"[激動]",
us:"[Hooray]",
code:"/:#-0",
web_code:"/激动",
style:"icon_smiley_100"
},{
id:101,
cn:"[乱舞]",
hk:"[亂舞]",
us:"[Meditate]",
code:"/:hiphot",
web_code:"/街舞",
style:"icon_smiley_101"
},{
id:102,
cn:"[献吻]",
hk:"[獻吻]",
us:"[Smooch]",
code:"/:kiss",
web_code:"/献吻",
style:"icon_smiley_102"
},{
id:103,
cn:"[左太极]",
hk:"[左太極]",
us:"[TaiChi L]",
code:"/:<&",
web_code:"/左太极",
style:"icon_smiley_103"
},{
id:104,
cn:"[右太极]",
hk:"[右太極]",
us:"[TaiChi R]",
code:"/:&>",
web_code:"/右太极",
style:"icon_smiley_104"
},{
id:204,
cn:"[嘿哈]",
hk:"[吼嘿]",
us:"[Hey]",
code:"",
web_code:"",
style:"icon_emoji_wx_4"
},{
id:205,
cn:"[捂脸]",
hk:"[掩面]",
us:"[Facepalm]",
code:"",
web_code:"",
style:"icon_emoji_wx_5"
},{
id:202,
cn:"[奸笑]",
hk:"[奸笑]",
us:"[Smirk]",
code:"",
web_code:"",
style:"icon_emoji_wx_2"
},{
id:206,
cn:"[机智]",
hk:"[機智]",
us:"[Smart]",
code:"",
web_code:"",
style:"icon_emoji_wx_6"
},{
id:212,
cn:"[皱眉]",
hk:"[皺眉]",
us:"[Moue]",
code:"",
web_code:"",
style:"icon_emoji_wx_12"
},{
id:211,
cn:"[耶]",
hk:"[歐耶]",
us:"[Yeah!]",
code:"",
web_code:"",
style:"icon_emoji_wx_11"
},{
id:207,
cn:"[茶]",
hk:"[茶]",
us:"[Tea]",
code:"",
web_code:"",
style:"icon_emoji_wx_7"
},{
id:209,
cn:"[红包]",
hk:"[Packet]",
us:"[Packet]",
code:"",
web_code:"",
style:"icon_emoji_wx_9"
},{
id:210,
cn:"[蜡烛]",
hk:"[蠟燭]",
us:"[Candle]",
code:"",
web_code:"",
style:"icon_emoji_wx_10"
},{
id:215,
cn:"[福]",
hk:"[福]",
us:"[Blessing]",
code:"",
web_code:"",
style:"icon_emoji_wx_15"
},{
id:214,
cn:"[鸡]",
hk:"[小雞]",
us:"[Chick]",
code:"",
web_code:"",
style:"icon_emoji_wx_14"
},{
id:300,
cn:"[笑脸]",
emoji:"😄",
hk:"",
us:"",
code:"\\ue415",
web_code:"",
style:"icon_emoji_ios_0"
},{
id:301,
cn:"[生病]",
emoji:"😷",
hk:"",
us:"",
code:"\\ue40c",
web_code:"",
style:"icon_emoji_ios_1"
},{
id:302,
cn:"[破涕为笑]",
emoji:"😂",
hk:"",
us:"",
code:"\\ue412",
web_code:"",
style:"icon_emoji_ios_2"
},{
id:303,
cn:"[吐舌]",
emoji:"😝",
hk:"",
us:"",
code:"\\ue409",
web_code:"",
style:"icon_emoji_ios_3"
},{
id:304,
cn:"[脸红]",
emoji:"😳",
hk:"",
us:"",
code:"\\ue40d",
web_code:"",
style:"icon_emoji_ios_4"
},{
id:305,
cn:"[恐惧]",
emoji:"😱",
hk:"",
us:"",
code:"\\ue107",
web_code:"",
style:"icon_emoji_ios_5"
},{
id:306,
cn:"[失望]",
emoji:"😔",
hk:"",
us:"",
code:"\\ue403",
web_code:"",
style:"icon_emoji_ios_6"
},{
id:307,
cn:"[无语]",
emoji:"😒",
hk:"",
us:"",
code:"\\ue40e",
web_code:"",
style:"icon_emoji_ios_7"
},{
id:308,
cn:"[鬼魂]",
emoji:"👻",
hk:"",
us:"",
code:"\\ue11b",
web_code:"",
style:"icon_emoji_ios_8"
},{
id:309,
cn:"[合十]",
emoji:"🙏",
hk:"",
us:"",
code:"\\ue41d",
web_code:"",
style:"icon_emoji_ios_9"
},{
id:310,
cn:"[强壮]",
emoji:"💪",
hk:"",
us:"",
code:"\\ue14c",
web_code:"",
style:"icon_emoji_ios_10"
},{
id:311,
cn:"[庆祝]",
emoji:"🎉",
hk:"",
us:"",
code:"\\ue312",
web_code:"",
style:"icon_emoji_ios_11"
},{
id:312,
cn:"[礼物]",
emoji:"🎁",
hk:"",
us:"",
code:"\\ue112",
web_code:"",
style:"icon_emoji_ios_12"
},{
id:313,
cn:"[吃瓜]",
hk:"[吃西瓜]",
us:"[Onlooker]",
code:"",
web_code:"",
style:"icon_emoji_wx_Watermelon"
},{
id:314,
cn:"[加油]",
hk:"[加油]",
us:"[GoForIt]",
code:"",
web_code:"",
style:"icon_emoji_wx_Addoil"
},{
id:315,
cn:"[汗]",
hk:"[汗]",
us:"[Sweats]",
code:"",
web_code:"",
style:"icon_emoji_wx_Sweat"
},{
id:316,
cn:"[天啊]",
hk:"[天啊]",
us:"[OMG]",
code:"",
web_code:"",
style:"icon_emoji_wx_Shocked"
},{
id:317,
cn:"[Emm]",
hk:"[一言難盡]",
us:"[Emm]",
code:"",
web_code:"",
style:"icon_emoji_wx_Cold"
},{
id:318,
cn:"[社会社会]",
hk:"[失敬失敬]",
us:"[Respect]",
code:"",
web_code:"",
style:"icon_emoji_wx_Social"
},{
id:319,
cn:"[旺柴]",
hk:"[旺柴]",
us:"[Doge]",
code:"",
web_code:"",
style:"icon_emoji_wx_Yellowdog"
},{
id:320,
cn:"[好的]",
hk:"[好的]",
us:"[NoProb]",
code:"",
web_code:"",
style:"icon_emoji_wx_NoProb"
},{
id:321,
cn:"[打脸]",
hk:"[打臉]",
us:"[MyBad]",
code:"",
web_code:"",
style:"icon_emoji_wx_Slap"
},{
id:322,
cn:"[加油加油]",
hk:"[加油！]",
us:"[KeepFighting]",
code:"",
web_code:"",
style:"icon_emoji_wx_KeepFighting"
},{
id:323,
cn:"[哇]",
hk:"[哇]",
us:"[Wow]",
code:"",
web_code:"",
style:"icon_emoji_wx_Wow"
},{
id:324,
cn:"[發]",
hk:"[發]",
us:"[Rich]",
code:"",
web_code:"",
style:"icon_emoji_wx_16"
},{
id:"17_1",
cn:"[囧]",
hk:"[囧]",
us:"[Blush]",
code:"",
web_code:"",
style:"icon_smiley_17"
},{
id:"39_1",
cn:"[再见]",
hk:"[再見]",
us:"[Bye]",
code:"",
web_code:"",
style:"icon_smiley_39"
},{
id:"83_1",
cn:"[抱拳]",
hk:"[抱拳]",
us:"[Salute]",
code:"",
web_code:"",
style:"icon_smiley_83"
},{
id:"212_1",
cn:"[皱眉]",
hk:"[皺眉]",
us:"[Concerned]",
code:"",
web_code:"",
style:"icon_emoji_wx_12"
}];
});var _extends=Object.assign||function(t){
for(var e=1;e<arguments.length;e++){
var i=arguments[e];
for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n]);
}
return t;
};
define("pages/bottom_input_bar.js",["page/pages/bottom_input_bar.css","biz_wap/jsapi/core.js","biz_common/utils/emoji_panel_data.js","biz_common/utils/emoji_data.js","biz_wap/utils/mmversion.js","biz_common/dom/event.js","appmsg/set_font_size.js"],function(require,exports,module,alert){
"use strict";
function BottomInputBar(t){
this.opt={
placeholder:"",
limit:0
},this.opt=_extends(this.opt,t),this.state={
inChooseEmoji:!1,
listener:{},
limit:this.opt.limit,
show:!1,
keyboardHeight:0,
androidTriggeringEmoji:!1,
androidShowingKeybroad:!1,
androidOriWinInnerHeight:window.innerHeight,
androidMinWinInnerHeight:window.innerHeight
},this.__isComposition=!1,this.__mount(),this.__bindEvent();
}
require("page/pages/bottom_input_bar.css");
var JSAPI=require("biz_wap/jsapi/core.js"),panelData=require("biz_common/utils/emoji_panel_data.js"),emojiData=require("biz_common/utils/emoji_data.js"),mmversion=require("biz_wap/utils/mmversion.js"),DomEvent=require("biz_common/dom/event.js"),fontSize=require("appmsg/set_font_size.js"),getEmojiText=function getEmojiText(emoji){
for(var i=0;i<emojiData.length;i++){
var e=emojiData[i];
switch(emoji){
case e.cn:
return e.emoji||e.cn;

case e.hk:
return e.emoji||e.hk;

case e.us:
return e.emoji||e.us;

case e.emoji:
return e.emoji;

case e.code:
return e.emoji||e.cn;

default:
if(!mmversion.isIOS&&e.code.startsWith("\\ue"))try{
var c=eval("'"+e.code+"'");
if(emoji===c)return e.emoji||e.cn;
}catch(err){}
}
}
return"";
},getRealHeightOfIOSNativePanel=function(t,e){
JSAPI.invoke("handleDeviceInfo",{
action:"getUIParams"
},function(i){
var n=t;
i.isShowBottomBar&&(n-=i.bottomBarHeight),n=Math.max(n,0),"function"==typeof e&&e(n);
});
},tpl='<div class="comment__push__container" style="display: none;"><div class="js_bottom_input_mask comment__push__mask"></div><div class="js_bottom_input_wrapper comment__push"><div class="comment__push__wrp"><div class="js_bottom_input_faker comment__push__input__faker"></div><textarea class="js_bottom_input comment__push__input" autofocus></textarea></div><div class="comment__push__extend"><a href="javascript:;" class="js_bottom_input_emoji comment__push__emoji"></a><a href="javascript:;" class="js_bottom_input_submit comment__push__send">发送</a></div></div></div>';
return BottomInputBar.prototype.__mount=function(){
this.$el=$(tpl),mmversion.isAndroid&&fontSize.keepNormalFontSizeForAndroid(this.$el[0]),
this.inputEle=this.$el.find(".js_bottom_input")[0],this.mask=this.$el.find(".js_bottom_input_mask")[0],
0!==this.state.limit&&this.inputEle.setAttribute("maxlength",this.state.limit),this.inputEle.setAttribute("placeholder",this.__filterContent(this.opt.placeholder)),
mmversion.isIOS||this.__initEmojiPanel(),document.body.append(this.$el[0]);
},BottomInputBar.prototype.__bindEvent=function(){
var t=this;
DomEvent.tap(this.$el.find(".js_bottom_input_wrapper")[0],function(e){
e.target!==t.inputEle&&e.preventDefault();
}),DomEvent.tap(this.mask,function(e){
t.hide(),e.preventDefault();
}),DomEvent.tap(this.inputEle,function(e){
t.state.inChooseEmoji&&(t.__triggerEmojiPanel(),e.preventDefault());
}),DomEvent.on(this.inputEle,"focus",function(){
t.__emit("focus");
}),DomEvent.on(this.inputEle,"compositionstart",function(){
t.__isComposition=!0;
}),DomEvent.on(this.inputEle,"compositionend",function(){
t.__isComposition=!1,t.__emit("input",{
data:t.getContent(),
inputType:"setContent"
});
}),DomEvent.on(this.inputEle,"blur",function(){
mmversion.isIOS&&!t.state.inChooseEmoji&&t.hide(),t.__emit("blur");
}),DomEvent.on(this.inputEle,"input",function(e){
t.__emit("input",{
data:e.target.value,
inputType:"inputContent"
});
}),DomEvent.tap(this.$el.find(".js_bottom_input_submit")[0],function(e){
t.__onSend(),e.preventDefault();
}),DomEvent.tap(this.$el.find(".js_bottom_input_emoji")[0],function(e){
t.__triggerEmojiPanel(),e.preventDefault();
}),this.addListener("input",this.__onInput.bind(this)),mmversion.isIOS&&window.addEventListener("scroll",function(){
t.hide();
}),window.addEventListener("resize",function(){
t.state.androidTriggeringEmoji?(t.state.androidTriggeringEmoji=!1,t.state.keyboardHeight=Math.max(window.innerHeight-t.state.keyboardHeight,0),
t.$el.find(".js_bottom_input_emoji_panel").css({
height:t.state.keyboardHeight
}),t.$el.find(".js_bottom_input_wrapper").css({
opacity:1,
bottom:t.state.keyboardHeight
})):t.state.androidShowingKeybroad?(t.$el.find(".js_bottom_input_wrapper").css({
opacity:1,
bottom:0
}),t.state.show=!0,t.state.androidShowingKeybroad=!1,t.state.androidMinWinInnerHeight=window.innerHeight,
t.__emit("show")):mmversion.isIOS?t.hide():t.state.show&&(window.innerHeight>t.state.androidOriWinInnerHeight-10?t.hide():(t.state.androidMinWinInnerHeight>window.innerHeight&&(t.state.androidMinWinInnerHeight=window.innerHeight),
t.$el.find(".js_bottom_input_wrapper").css({
bottom:window.innerHeight-t.state.androidMinWinInnerHeight
})));
}),JSAPI.on("onGetKeyboardHeight",function(e){
mmversion.isIOS&&e.height&&getRealHeightOfIOSNativePanel(e.height,function(e){
t.state.keyboardHeight=e,t.$el.find(".js_bottom_input_wrapper").css({
opacity:1,
transition:"",
bottom:e,
transform:"translate3d(0, 0, 0)"
});
});
}),mmversion.isIOS&&JSAPI.on("onGetSmiley",function(e){
if("[DELETE_EMOTION]"===e.smiley)return void t.delContent();
if("[DONE_EMOTION]"===e.smiley)return void t.hide();
var i=getEmojiText(e.smiley);
i&&t.insertContent(i);
});
},BottomInputBar.prototype.__emit=function(t){
for(var e=arguments.length,i=Array(e>1?e-1:0),n=1;e>n;n++)i[n-1]=arguments[n];
return"string"!=typeof t?void console.error("[bottomInputBar] event must be a string"):void(void 0!==this.state.listener[t]&&this.state.listener[t].forEach(function(t){
t.apply(void 0,i);
}));
},BottomInputBar.prototype.__onSend=function(){
var t=this.__filterContent(this.getContent());
t=t.replace(/\n/g," "),"function"==typeof this.opt.submitCallback?this.opt.submitCallback(t):console.error("[BottomInputBar] submitCallback not a func!"),
this.hide(),this.clear();
},BottomInputBar.prototype.__triggerEmojiPanel=function(){
var t=this;
if(this.state.inChooseEmoji=!this.state.inChooseEmoji,mmversion.isIOS)if(this.state.inChooseEmoji)this.$el.find(".js_bottom_input_emoji").removeClass("comment__push__emoji").addClass("comment__push__keyboard"),
this.inputEle.blur(),JSAPI.invoke("showSmileyPanel",{
hidden:!1,
duration:.01
},function(e){
getRealHeightOfIOSNativePanel(e.height,function(e){
var i=parseFloat(t.$el.find(".js_bottom_input_wrapper").css("bottom")),n=i-e;
t.$el.find(".js_bottom_input_wrapper").css("transform","translate3d(0, "+n+"px, 0)");
});
});else{
this.$el.find(".js_bottom_input_emoji").removeClass("comment__push__keyboard").addClass("comment__push__emoji"),
JSAPI.invoke("showSmileyPanel",{
hidden:!0
},function(){});
var e=this.$el.find(".js_bottom_input_wrapper").css("bottom"),i=this.$el.find(".js_bottom_input_wrapper").css("transform");
this.$el.find(".js_bottom_input_wrapper").css({
opacity:0,
transition:"none",
bottom:(window.innerHeight-this.state.keyboardHeight)/2-1,
transform:"translate3d(0, 0, 0)"
}),this.inputEle.focus(),this.$el.find(".js_bottom_input_wrapper").css({
bottom:e,
transform:i
}),setTimeout(function(){
t.$el.find(".js_bottom_input_wrapper").css({
opacity:1,
transition:"",
bottom:t.state.keyboardHeight,
transform:"translate3d(0, 0, 0)"
});
});
}else this.state.androidTriggeringEmoji=!0,this.state.keyboardHeight=window.innerHeight,
this.state.inChooseEmoji?(this.$el.find(".js_bottom_input_emoji").removeClass("comment__push__emoji").addClass("comment__push__keyboard"),
this.inputEle.blur(),JSAPI.invoke("handleDeviceInfo",{
action:"hideKeyBoard"
},function(){}),setTimeout(function(){
t.$el.find(".js_bottom_input_emoji_panel").css("display","");
},200)):(this.$el.find(".js_bottom_input_emoji").removeClass("comment__push__keyboard").addClass("comment__push__emoji"),
this.$el.find(".js_bottom_input_emoji_panel").css("display","none"),this.inputEle.focus());
},BottomInputBar.prototype.__onInput=function(t){
var e=this.__filterContent(this.getContent());
return t.isComposing||this.__isComposition?void $(".js_bottom_input_faker").html(e.replace(/\n/g,"<br/>")):void this.setInputValue(e);
},BottomInputBar.prototype.__filterContent=function(t){
var e=t;
return e;
},BottomInputBar.prototype.__filterWordsLimit=function(t){
var e=t;
return e;
},BottomInputBar.prototype.addListener=function(t,e){
return"string"!=typeof t?void console.error("[BottomInputBar] event must be a string"):(void 0===this.state.listener[t]&&(this.state.listener[t]=[]),
void this.state.listener[t].push(e));
},BottomInputBar.prototype.show=function(){
this.state.show||(this.$el.css("display",""),mmversion.isIOS?(JSAPI.invoke("handleMPPageAction",{
action:"opInputAccessoryView",
show:!1
},function(){}),this.$el.find(".js_bottom_input_wrapper").css({
opacity:0,
bottom:0,
transform:"translate3d(0, 10px, 1px)"
}),this.inputEle.focus(),this.__emit("show"),this.state.show=!0):(this.$el.find(".js_bottom_input_wrapper").css({
opacity:0,
bottom:window.innerHeight
}),this.inputEle.focus(),this.state.androidShowingKeybroad=!0,this.state.androidOriWinInnerHeight=window.innerHeight));
},BottomInputBar.prototype.hide=function(){
this.state.show&&(this.state.inChooseEmoji&&(this.state.inChooseEmoji=!1,this.$el.find(".js_bottom_input_emoji").removeClass("comment__push__keyboard").addClass("comment__push__emoji"),
mmversion.isIOS?JSAPI.invoke("showSmileyPanel",{
hidden:!0
},function(){}):this.$el.find(".js_bottom_input_emoji_panel").css("display","none")),
mmversion.isIOS?JSAPI.invoke("handleMPPageAction",{
action:"opInputAccessoryView",
show:!0
},function(){}):JSAPI.invoke("handleDeviceInfo",{
action:"hideKeyBoard"
},function(){}),this.$el.css("display","none"),this.$el.find(".js_bottom_input_wrapper").attr("style",null),
this.inputEle.blur(),this.state.show=!1,this.__emit("hide"));
},BottomInputBar.prototype.setFullscreenStyle=function(t){
t?this.$el.addClass("comment__push__container__horizontal"):this.$el.removeClass("comment__push__container__horizontal");
},BottomInputBar.prototype.clear=function(){
this.setInputValue("");
},BottomInputBar.prototype.getContent=function(t,e){
return this.inputEle.value.substring(t,e);
},BottomInputBar.prototype.setLimit=function(t){
this.state.limit=t,0!==this.state.limit?this.inputEle.setAttribute("maxlength",this.state.limit):this.inputEle.removeAttribute("maxlength");
},BottomInputBar.prototype.setInputValue=function(t){
this.inputEle.value=t,$(".js_bottom_input_faker").html(t.replace(/\n/g,"<br/>"));
},BottomInputBar.prototype.setContent=function(t){
var e=this.__filterContent(t);
this.setInputValue(e),this.__emit("input",{
data:t,
inputType:"setContent"
});
},BottomInputBar.prototype.insertContent=function(t){
var e=this.getContent(0,this.inputEle.selectionStart),i=this.getContent(this.inputEle.selectionEnd);
if(!(0!==this.state.limit&&t.length+e.length+i.length>this.state.limit)){
var n=this.inputEle.selectionStart+t.length,o=this.__filterContent(e+t+i);
this.setInputValue(o),this.inputEle.setSelectionRange(n,n),this.__emit("input",{
data:t,
inputType:"insertContent"
});
}
},BottomInputBar.prototype.delContent=function(){
var t=this.getContent(0,this.inputEle.selectionStart),e=this.getContent(this.inputEle.selectionEnd),i=void 0,n=void 0,o=void 0;
if(this.inputEle.selectionStart===this.inputEle.selectionEnd){
for(var s=0;s<emojiData.length;s++){
var a=emojiData[s];
if(a.cn&&t.endsWith(a.cn)){
i=t.substring(0,t.length-a.cn.length)+e,n=t.substring(t.length-a.cn.length,t.length),
o=this.inputEle.selectionStart-a.cn.length;
break;
}
if(a.hk&&t.endsWith(a.hk)){
i=t.substring(0,t.length-a.hk.length)+e,n=t.substring(t.length-a.hk.length,t.length),
o=this.inputEle.selectionStart-a.hk.length;
break;
}
if(a.us&&t.endsWith(a.us)){
i=t.substring(0,t.length-a.us.length)+e,n=t.substring(t.length-a.us.length,t.length),
o=this.inputEle.selectionStart-a.us.length;
break;
}
if(a.emoji&&t.endsWith(a.emoji)){
i=t.substring(0,t.length-a.emoji.length)+e,n=t.substring(t.length-a.emoji.length,t.length),
o=this.inputEle.selectionStart-a.emoji.length;
break;
}
}
"string"!=typeof i&&(i=t.substring(0,t.length-1)+e,n=t[t.length-1],o=this.inputEle.selectionStart-1);
}else i=t+e,n=this.getContent(this.inputEle.selectionStart,this.inputEle.selectionEnd),
o=this.inputEle.selectionStart;
i=this.__filterContent(i),this.setInputValue(i),this.inputEle.setSelectionRange(o,o),
this.__emit("input",{
data:n,
inputType:"delContent"
});
},BottomInputBar.prototype.__initEmojiPanel=function(){
for(var t=this,e=16,i=7,n=32,o=[],s={},a=[],r=0;r<panelData.length;r++)for(var m=0;m<emojiData.length;m++)if(emojiData[m].id===panelData[r]){
a[r]=emojiData[m];
break;
}
for(var r=0;i>r;r++)for(var m=0;e>m;m++){
var p=r*e+m;
a[p]&&o.push({
name:a[p].style,
title:a[p].emoji?a[p].emoji:a[p].cn,
bp:"background-position: 0 -"+p*n+"px;",
id:a[p].id
});
}
for(var r=0;r<a.length;r++)s[a[r].style]=a[r].emoji||a[r].cn;
var _=document.createDocumentFragment();
o.forEach(function(t,e){
var i=document.createElement("li"),n=document.createElement("span");
i.className="comment_primary_emotion_item js_emotion_item",i.setAttribute("data-index",e),
n.className="comment_primary_emotion",n.setAttribute("style",t.bp),n.setAttribute("text-name",t.name),
i.appendChild(n),_.appendChild(i);
}),this.$el.append('<div class="js_bottom_input_emoji_panel comment__emoji__panel" style="display: none;"></div>'),
this.$el.find(".js_bottom_input_emoji_panel").append(_);
var l=void 0;
DomEvent.on(this.$el.find(".js_bottom_input_emoji_panel")[0],"touchstart",function(t){
l=t.changedTouches[0].clientY;
}),DomEvent.on(this.$el.find(".js_bottom_input_emoji_panel")[0],"touchmove",function(e){
var i=e.changedTouches[0].clientY,n=t.$el.find(".js_bottom_input_emoji_panel")[0].scrollTop,o=t.$el.find(".js_bottom_input_emoji_panel")[0].scrollHeight,s=t.$el.find(".js_bottom_input_emoji_panel")[0].clientHeight;
(.5>n&&i>l||.5>o-n-s&&l>i)&&e.preventDefault();
}),DomEvent.tap(this.$el.find(".js_bottom_input_emoji_panel")[0],function(e){
if("comment_primary_emotion"===e.target.className){
var i=s[e.target.getAttribute("text-name")];
i&&t.insertContent(i);
}
});
},BottomInputBar;
});function _typeof2(t){
return t&&"undefined"!=typeof Symbol&&t.constructor===Symbol?"symbol":typeof t;
}
var _extends=Object.assign||function(t){
for(var e=1;e<arguments.length;e++){
var i=arguments[e];
for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n]);
}
return t;
};
define("new_video/plugin/danmu_util.js",[],function(){
"use strict";
function t(e){
return(t="function"==typeof Symbol&&"symbol"===_typeof2(Symbol.iterator)?function(t){
return"undefined"==typeof t?"undefined":_typeof2(t);
}:function(t){
return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":"undefined"==typeof t?"undefined":_typeof2(t);
})(e);
}
function e(t,e){
if(!(t instanceof e))throw new TypeError("Cannot call a class as a function");
}
function i(t,e){
for(var i=0;i<e.length;i++){
var n=e[i];
n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n);
}
}
function n(t,e,n){
return e&&i(t.prototype,e),n&&i(t,n),t;
}
function a(t,e){
if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");
t.prototype=Object.create(e&&e.prototype,{
constructor:{
value:t,
writable:!0,
configurable:!0
}
}),e&&o(t,e);
}
function s(t){
return(s=Object.setPrototypeOf?Object.getPrototypeOf:function(t){
return t.__proto__||Object.getPrototypeOf(t);
})(t);
}
function o(t,e){
return(o=Object.setPrototypeOf||function(t,e){
return t.__proto__=e,t;
})(t,e);
}
function r(t){
if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
return t;
}
function l(t,e){
return!e||"object"!==("undefined"==typeof e?"undefined":_typeof2(e))&&"function"!=typeof e?r(t):e;
}
function h(t,e){
return c(t)||u(t,e)||f();
}
function c(t){
return Array.isArray(t)?t:void 0;
}
function u(t,e){
var i=[],n=!0,a=!1,s=void 0;
try{
for(var o,r=t[Symbol.iterator]();!(n=(o=r.next()).done)&&(i.push(o.value),!e||i.length!==e);n=!0);
}catch(l){
a=!0,s=l;
}finally{
try{
n||null==r["return"]||r["return"]();
}finally{
if(a)throw s;
}
}
return i;
}
function f(){
throw new TypeError("Invalid attempt to destructure non-iterable instance");
}
function d(t,e){
return e={
exports:{}
},t(e,e.exports),e.exports;
}
function p(t,e,i){
this.now=0,this.afternow=0,this.delta=0,this.fps=t||10,this.interval=parseInt(1e3/t,10),
this.callback=e||"",this.timecount=0,this.running=!1,this.timemode=i||"auto",this.index=Date.now(),
"timeout"!==this.timemode&&(this.timemode="auto"),window.requestAnimationFrame=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame;
}
function m(t,e,i){
return new p(t,e,i);
}
function g(t){
var e=[],i=0,n=200,a=[],s={
get:function(){
if(e.length)return e.shift();
if(n>i){
i+=1;
var a=new t;
return a;
}
return null;
},
save:function(t){
t&&e.push(t);
},
getLength:function(){
return e.length;
},
getAll:function(){
return a;
}
};
return s;
}
function _(t,i,o,r){
var c=i||null,u=o||null,f=!!r,d=function(){
function t(){
e(this,t),this._left=0,this._top=0,this._bottom=0,this._dom=null,this._animate=null,
this._trail=-1,this._width=0,this.el=null,this.elText=null,this.fontSize=0,this.height=0,
this.enableColor=!0,this.currentColor="",this.id=null,this.originContent="",this.isSys=!1,
this.count=0,this.isStar=!1;
}
return n(t,[{
key:"render",
value:function(t,e,i){
this.el||(this.write(),this.addClickEvent());
var n;
t.html?(this.el.innerHTML=t.html,n=t.html.length||0):(this.el.innerText=t.content,
n=t.content.length||0),t.contentLength||(t.contentLength=n),this._width=t.width?t.width:e?t.contentLength*e:t.contentLength*i/1.5,
this.font(e,i),t.gradienColor?this.gradienColor(t.gradienColor):this.color(t.color||"#ffffff"),
this.id=t.id?t.id:null,this.originContent=t.originContent?t.originContent:"",this.isSys=!!t.isSys,
this.isStar=!!t.isStar,this.count=0,this.isStar?he.addClass(this.el,"txp_barrage_item_speaker"):he.removeClass(this.el,"txp_barrage_item_speaker"),
t.isself?he.addClass(this.el,"txp_barrage_item_self"):he.removeClass(this.el,"txp_barrage_item_self");
}
},{
key:"font",
value:function(t,e){
t?this.fontSize!==+t&&(this.fontSize=t,this.height=Math.ceil(1.5*t),this.el.style.fontSize="".concat(t,"px"),
this.el.style.lineHeight="".concat(this.height-6,"px"),this.el.style.height="".concat(this.height,"px")):e&&this.height!==+e&&(this.height=e,
this.el.style.height="".concat(this.height,"px"),this.el.style.lineHeight="".concat(this.height,"px"),
this.el.style.padding=0);
}
},{
key:"color",
value:function(t){
t&&(this.disableColor(),he.css(this.el,"color",t));
}
},{
key:"gradienColor",
value:function(t){
t?t[1]!==t[0]?(he.css(this.el,"color",t[1]),he.css(this.el,"background-image","linear-gradient(to right,".concat(t[0]," 0,").concat(t[1]," 100%)")),
he.css(this.el,"-webkit-text-fill-color","transparent"),he.css(this.el,"background-repeat","repeat"),
he.css(this.el,"-webkit-background-clip","text"),he.css(this.el,"text-shadow","none")):this.color(t[1]):this.disableColor();
}
},{
key:"disableColor",
value:function(){
he.css(this.el,"background-image",""),he.css(this.el,"-webkit-text-fill-color",""),
he.css(this.el,"background-repeat",""),he.css(this.el,"-webkit-background-clip",""),
he.css(this.el,"text-shadow","");
}
},{
key:"addClickEvent",
value:function(){
var t=this;
c&&this.el.addEventListener("click",function(){
c(t);
}),u&&this.el.addEventListener("contextmenu",function(e){
t.isSys||(e.stopPropagation(),e.preventDefault(),u({
danmuItem:t,
x:e.clientX,
y:e.clientY
}));
});
}
},{
key:"left",
get:function(){
return this._left;
}
},{
key:"trail",
get:function(){
return this._trail;
},
set:function(t){
this._trail=t>0?t:-1;
}
},{
key:"width",
get:function(){
return this._width;
}
}]),t;
}(),p=function(i){
function o(){
var t;
return e(this,o),t=l(this,s(o).call(this)),t.isHove=!1,t;
}
return a(o,i),n(o,[{
key:"write",
value:function(){
var e=this,i=document.createElement("div");
i.innerHTML=oe,this.el=i.firstChild,t.appendChild(this.el);
var n=this.el.getElementsByClassName("txp_text"),a=h(n,1),s=a[0];
this.elText=s,f&&(this.el.addEventListener("mouseenter",function(){
e.isSys||e.isStar||(he.addClass(e.el,"txp_barrage_item_hover"),e.isHove=!0);
}),this.el.addEventListener("mouseleave",function(){
e.isSys||e.isStar||(he.removeClass(e.el,"txp_barrage_item_hover"),e.isHove=!1);
}));
}
},{
key:"move",
value:function(t,e){
return this.isStar&&3>t&&t>-10&&this.count<120?void(this.count+=1):(this._left=t,
e>=0&&e!==this._top&&(this._top=e),this.el.style.transform="translate3D(".concat(this._left,"px, ").concat(this._top,"px, 1px)"),
void("number"!=typeof window.top.__fontScaleBackForAndroid__||1===window.top.__fontScaleBackForAndroid__||this.el.getAttribute("mp-original-font-size")||(this.el.style.transform+=" scale3d(".concat(window.top.__fontScaleBackForAndroid__,", ").concat(window.top.__fontScaleBackForAndroid__,", 1)"))));
}
}]),o;
}(d),m=function(t){
function i(){
var t;
return e(this,i),t=l(this,s(i).call(this)),t["class"]="txp_animate",t.hide="txp_none",
t.available=!0,t.isHover=!1,t.paused=!1,t;
}
return a(i,t),n(i,[{
key:"pauseAnimate",
value:function(t){
t&&(this.paused=!0),he.css(this.el,"opacity",1),he.css(this.el,"animation-play-state","paused"),
he.css(this.el,"-webkit-animation-play-state","paused");
}
},{
key:"resumeAnimate",
value:function(t){
t&&(this.paused=!1),he.css(this.el,"opacity",""),he.css(this.el,"animation-play-state","running"),
he.css(this.el,"-webkit-animation-play-state","running");
}
},{
key:"removeAnimate",
value:function(){
var t=this;
this.el&&(he.removeClass(this.el,this["class"]),he.addClass(this.el,this.hide)),
setTimeout(function(){
t.available=!0;
},100);
}
},{
key:"startAnimate",
value:function(){
this.available=!1,he.addClass(this.el,this["class"]),he.removeClass(this.el,this.hide);
}
},{
key:"setBottom",
value:function(t){
t>=0&&t!==this._bottom&&(this._bottom=t),this.el.style.bottom="".concat(this._bottom,"px"),
this.startAnimate();
}
},{
key:"setTop",
value:function(t){
t>=0&&t!==this._top&&(this._top=t),this.el.style.top="".concat(this._top,"px"),this.startAnimate();
}
},{
key:"addEvent",
value:function(){
var t=this;
this.el.addEventListener("animationend",function(){
t.removeAnimate();
}),this.el.addEventListener("mouseenter",function(){
he.addClass(t.el,"txp_barrage_item_hover"),t.pauseAnimate(),t.isHover=!0;
}),this.el.addEventListener("mouseleave",function(){
he.removeClass(t.el,"txp_barrage_item_hover"),t.paused||t.resumeAnimate(),t.isHover=!1;
});
}
}]),i;
}(d),g=function(i){
function o(){
return e(this,o),l(this,s(o).apply(this,arguments));
}
return a(o,i),n(o,[{
key:"write",
value:function(){
var e=document.createElement("div");
e.innerHTML=re,this.el=e.firstChild,t.appendChild(this.el);
var i=this.el.getElementsByClassName("txp_text"),n=h(i,1),a=n[0];
this.elText=a,this.addEvent();
}
}]),o;
}(m),_=function(i){
function o(){
return e(this,o),l(this,s(o).apply(this,arguments));
}
return a(o,i),n(o,[{
key:"write",
value:function(){
var e=document.createElement("div");
e.innerHTML=le,this.el=e.firstChild,t.appendChild(this.el);
var i=this.el.getElementsByClassName("txp_text"),n=h(i,1),a=n[0];
this.elText=a,this.addEvent();
}
}]),o;
}(m);
return{
baseBarrage:d,
scrollBarrage:p,
TopBarrage:g,
BottomBarrage:_
};
}
function b(t){
return"string"!=typeof t?t:t.replace(/\?.+/g,"");
}
function y(){}
function v(t){
return"function"==typeof Array.isArray?Array.isArray(t):"[object Array]"===Object.prototype.toString.call(t);
}
function x(t,e){
var i,n={
xs:{
xxs:12,
xs:14,
s:16,
m:18,
l:20,
xl:22,
xxl:26
},
s:{
xxs:13,
xs:17,
s:19,
m:21,
l:23,
xl:25,
xxl:29
},
m:{
xxs:15,
xs:19,
s:21,
m:23,
l:25,
xl:27,
xxl:31
},
l:{
xxs:17,
xs:21,
s:23,
m:25,
l:27,
xl:29,
xxl:33
},
xl:{
xxs:25,
xs:29,
s:31,
m:33,
l:35,
xl:37,
xxl:41
}
};
return i=1024>=t?n.xs:t>1024&&1240>=t?n.s:t>1240&&1600>=t?n.m:t>1600&&1920>=t?n.l:t>1920?n.xl:n.m,
i[e];
}
function w(t){
t.prototype.start=function(t){
this.dataset.state=1,this._start(t);
},t.prototype.pause=function(){
this.dataset.state=2,this._pause();
},t.prototype.setFont=function(t){
var e=["xxs","xs","s","m","l","xl","xxl"];
e.indexOf(t)>-1&&(this.dataset.fontSetting=t),this.updateFont(),this.updateLineNum();
},t.prototype.setRate=function(t){
this.dataset.rate!==t&&(this.dataset.rate=t,this.dataset.realSpeed={
0:this.dataset.speed*this.dataset.rate*1.2,
1:this.dataset.speed*this.dataset.rate
});
},t.prototype.setOpacity=function(t){
this._setOpacity(t);
},t.prototype.setLine=function(t){
this.dataset.userNum=t,this.updateLineNum();
},t.prototype.enableColor=function(){
this._toggleColor(!0);
},t.prototype.disableColor=function(){
this._toggleColor(!1);
},t.prototype.hideScroll=function(){
this._clearScroll(),this.dataset.enableScroll=!1;
},t.prototype.showScroll=function(){
this.dataset.enableScroll=!0;
},t.prototype.hideTop=function(){
this._handlePosition("top","clear"),this.dataset.enableTop=!1;
},t.prototype.showTop=function(){
this.dataset.enableTop=!0;
},t.prototype.hideBottom=function(){
this._handlePosition("bottom","clear"),this.dataset.enableBottom=!1;
},t.prototype.showBottom=function(){
this.dataset.enableBotton=!0;
},t.prototype.switchOn=function(){
this.start();
},t.prototype.play=t.prototype.switchOn,t.prototype.switchOff=function(){
this.pause(),this._clear();
},t.prototype.end=t.prototype.switchOff,t.prototype.updateTime=function(t){
this.index=t;
},t.prototype.add=function(t){
t&&this._addDanmu(JSON.parse(JSON.stringify(t)));
};
}
function k(t){
t.prototype._createTopDanmu=function(){
var t=5;
this.dataset.topList||(this.dataset.topList=[]);
var e,i,n=this.dataset.topList;
if(n.length<t)e=new this.Factory.TopBarrage,n.push(e),i=n.length;else for(var a=0,s=n.length;s>a;a+=1)if(n[a].available){
e=n[a],i=a;
break;
}
if(e){
var o=this.list.get(this.dataset.index,5);
o&&(this.dataset.enableColor||(o.color="#ffffff",o.gradienColor=[],o.gradienColor.push("#ffffff"),
o.gradienColor.push("#ffffff")),this.emit("showDanmu",o),e.render(o,this.dataset.fontSize,this.dataset.lineHeight),
e.setTop(i*this.dataset.lineHeight));
}
},t.prototype._createBottomDanmu=function(){
var t=5;
this.dataset.bottomList||(this.dataset.bottomList=[]);
var e,i,n=this.dataset.bottomList;
if(n.length<t)e=new this.Factory.BottomBarrage,n.push(e),i=n.length;else for(var a=0,s=n.length;s>a;a+=1)if(n[a].available){
e=n[a],i=a;
break;
}
if(e){
var o=this.list.get(this.dataset.index,6);
o&&(this.emit("showDanmu",o),this.dataset.enableColor||(o.color="#ffffff",o.gradienColor=[],
o.gradienColor.push("#ffffff"),o.gradienColor.push("#ffffff")),e.render(o,this.dataset.fontSize,this.dataset.lineHeight),
e.setBottom(i*this.dataset.lineHeight+this.dataset.marginBottom));
}
},t.prototype._handlePosition=function(t,e){
var i,n={
clear:"removeAnimate",
pause:"pauseAnimate",
resume:"resumeAnimate"
},a=n[e]||"";
switch(t){
case"top":
i=this.dataset.topList;
break;

case"bottom":
i=this.dataset.bottomList;
}
if(i&&a)for(var s=0,o=i.length;o>s;s+=1)i[s][a]&&i[s][a](!0);
},t.prototype._createTop=function(){
this.dataset.enableTop&&this._createTopDanmu();
},t.prototype._createBottom=function(){
this.dataset.enableBottom&&this._createBottomDanmu();
},t.prototype._createPositionDanmu=function(){
this._createScroll(),this._createTop(),this._createBottom();
};
}
"function"!=typeof Object.assign&&Object.defineProperty(Object,"assign",{
value:function(t){
if(null==t)throw new TypeError("Cannot convert undefined or null to object");
for(var e=Object(t),i=1;i<arguments.length;i+=1){
var n=arguments[i];
if(null!=n)for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a]);
}
return e;
},
writable:!0,
configurable:!0
});
{
var S=void 0,C=function(t){
return t!==S&&null!==t;
},O={
object:!0,
"function":!0,
undefined:!0
},B=function(t){
return C(t)?hasOwnProperty.call(O,"undefined"==typeof t?"undefined":_typeof2(t)):!1;
},A=function(t){
if(!B(t))return!1;
try{
return t.constructor?t.constructor.prototype===t:!1;
}catch(e){
return!1;
}
},j=function(t){
if("function"!=typeof t)return!1;
if(!hasOwnProperty.call(t,"length"))return!1;
try{
if("number"!=typeof t.length)return!1;
if("function"!=typeof t.call)return!1;
if("function"!=typeof t.apply)return!1;
}catch(e){
return!1;
}
return!A(t);
},T=/^\s*class[\s{\/}]/,E=Function.prototype.toString,P=function(t){
return j(t)?T.test(E.call(t))?!1:!0:!1;
},L=function(){
var t,e=Object.assign;
return"function"!=typeof e?!1:(t={
foo:"raz"
},e(t,{
bar:"dwa"
},{
trzy:"trzy"
}),t.foo+t.bar+t.trzy==="razdwatrzy");
},N=function(){
try{
return Object.keys("primitive"),!0;
}catch(t){
return!1;
}
},z=function(){},H=z(),F=function(t){
return t!==H&&null!==t;
},D=Object.keys,M=function(t){
return D(F(t)?Object(t):t);
},q=N()?Object.keys:M,$=function(t){
if(!F(t))throw new TypeError("Cannot use null or undefined");
return t;
},R=Math.max,I=function(t,e){
var i,n,a,s=R(arguments.length,2);
for(t=Object($(t)),a=function(n){
try{
t[n]=e[n];
}catch(a){
i||(i=a);
}
},n=1;s>n;++n)e=arguments[n],q(e).forEach(a);
if(void 0!==i)throw i;
return t;
},U=L()?Object.assign:I,J=Array.prototype.forEach,W=Object.create,X=function(t,e){
var i;
for(i in t)e[i]=t[i];
},Y=function(){
var t=W(null);
return J.call(arguments,function(e){
F(e)&&X(Object(e),t);
}),t;
},G="razdwatrzy",K=function(){
return"function"!=typeof G.contains?!1:G.contains("dwa")===!0&&G.contains("foo")===!1;
},Q=String.prototype.indexOf,V=function(t){
return Q.call(this,t,arguments[1])>-1;
},Z=K()?String.prototype.contains:V,te=d(function(t){
var e=t.exports=function(t,e){
var i,n,a,s,o;
return arguments.length<2||"string"!=typeof t?(s=e,e=t,t=null):s=arguments[2],C(t)?(i=Z.call(t,"c"),
n=Z.call(t,"e"),a=Z.call(t,"w")):(i=a=!0,n=!1),o={
value:e,
configurable:i,
enumerable:n,
writable:a
},s?U(Y(s),o):o;
};
e.gs=function(t,e,i){
var n,a,s,o;
return"string"!=typeof t?(s=i,i=e,e=t,t=null):s=arguments[3],C(e)?P(e)?C(i)?P(i)||(s=i,
i=void 0):i=void 0:(s=e,e=i=void 0):e=void 0,C(t)?(n=Z.call(t,"c"),a=Z.call(t,"e")):(n=!0,
a=!1),o={
get:e,
set:i,
configurable:n,
enumerable:a
},s?U(Y(s),o):o;
};
}),ee=function(t){
if("function"!=typeof t)throw new TypeError(t+" is not a function");
return t;
},ie=d(function(t,e){
var i,n,a,s,o,r,l,h=Function.prototype.apply,c=Function.prototype.call,u=Object.create,f=Object.defineProperty,d=Object.defineProperties,p=Object.prototype.hasOwnProperty,m={
configurable:!0,
enumerable:!1,
writable:!0
};
i=function(t,e){
var i;
return ee(e),p.call(this,"__ee__")?i=this.__ee__:(i=m.value=u(null),f(this,"__ee__",m),
m.value=null),i[t]?"object"===_typeof2(i[t])?i[t].push(e):i[t]=[i[t],e]:i[t]=e,this;
},n=function(t,e){
var n,s;
return ee(e),s=this,i.call(this,t,n=function(){
a.call(s,t,n),h.call(e,this,arguments);
}),n.__eeOnceListener__=e,this;
},a=function(t,e){
var i,n,a,s;
if(ee(e),!p.call(this,"__ee__"))return this;
if(i=this.__ee__,!i[t])return this;
if(n=i[t],"object"===("undefined"==typeof n?"undefined":_typeof2(n)))for(s=0;a=n[s];++s)(a===e||a.__eeOnceListener__===e)&&(2===n.length?i[t]=n[s?0:1]:n.splice(s,1));else(n===e||n.__eeOnceListener__===e)&&delete i[t];
return this;
},s=function(t){
var e,i,n,a,s;
if(p.call(this,"__ee__")&&(a=this.__ee__[t]))if("object"===("undefined"==typeof a?"undefined":_typeof2(a))){
for(i=arguments.length,s=new Array(i-1),e=1;i>e;++e)s[e-1]=arguments[e];
for(a=a.slice(),e=0;n=a[e];++e)h.call(n,this,s);
}else switch(arguments.length){
case 1:
c.call(a,this);
break;

case 2:
c.call(a,this,arguments[1]);
break;

case 3:
c.call(a,this,arguments[1],arguments[2]);
break;

default:
for(i=arguments.length,s=new Array(i-1),e=1;i>e;++e)s[e-1]=arguments[e];
h.call(a,this,s);
}
},o={
on:i,
once:n,
off:a,
emit:s
},r={
on:te(i),
once:te(n),
off:te(a),
emit:te(s)
},l=d({},r),t.exports=e=function(t){
return null==t?u(l):d(Object(t),r);
},e.methods=o;
});
ie.methods;
}
p.prototype={
setCallBack:function(t){
t&&(this.callback=t);
},
start:function(t){
t&&(this.callback=t),this.running||(this.running=!0,this.afternow=Date.now(),this._timeupdate());
},
stop:function(){
this.running&&(this.running=!1),window.requestAnimationFrame?window.cancelAnimationFrame(this.timecount):clearTimeout(this.timecount),
this.timecount=0;
},
isRunning:function(){
return this.running;
},
_timeupdate:function(){
window.requestAnimationFrame&&"timeout"!==this.timemode?this._rafMode():this._timeoutMode();
},
_rafMode:function(){
var t=this;
this.timecount=requestAnimationFrame(function(){
t._timeupdate();
}),this.now=Date.now(),this.delta=this.now-this.afternow,this.delta>=this.interval&&this.callback&&(this.afternow=this.now-this.delta%this.interval,
this.callback((this.delta/this.interval).toFixed(2)));
},
_timeoutMode:function(){
this.timecount=setTimeout(this._timeupdate,this.interval),this.callback();
}
};
var ne=m,ae='<txpdiv class="txp_barrage txp_barrage_external" style="position:absolute;top:0;left:0;width:100%;height:100%;overflow: hidden;">\n        <style type="text/css">\n            .txp_barrage{\n                top: 0px;\n                right:0px;\n                bottom: 0px;\n                left: 0px;\n                \n                position: absolute;\n                margin: auto;\n            }\n            .txp_barrage .txp_barrage_avatar,.txp_barrage .txp_barrage_emoji{\n                height: 100%;\n                width:unset;\n            }\n            .txp_barrage .txp_barrage_avatar{\n                margin-right:unset; \n            }\n            .txp_barrage .txp_barrage_item .txp_text{\n                height: 100%;\n                background: inherit;\n                -webkit-text-fill-color: inherit;\n                padding: 0 10px;\n            }\n            .txp_barrage .txp_barrage_item_bubble{\n                border-radius:  9999px;\n            }\n            .txp_barrage_item_bubble_front{\n                display: inline-block;\n                position: relative;\n                height: 100%;\n                vertical-align: unset;\n            }\n            .txp_barrage_item_bubble_front .txp_barrage_vipicon{\n                right: 0;\n                bottom: 0;\n                top:unset;\n                left: unset;\n                height: 40%;\n            }\n            .txp_barrage .txp_svg_icon_like{\n                height: 60%;\n                width:unset;\n                vertical-align: unset;\n            }\n            .txp_barrage .txp_barrage_badge{\n                height: 100%;\n                background: unset;\n                -webkit-text-fill-color: white;\n                color: white;\n            }\n            .txp_barrage .txp_barrage_badge .txp_icon_text{\n                -webkit-text-fill-color: white;\n            }\n            .txp_barrage .txp_barrage_item_hover {\n                background: rgba(0,0,0,0.7) !important;\n                color:white !important;\n                border-radius: 99999px;\n                z-index: 1;\n                -webkit-text-fill-color:unset !important;\n            }\n            .txp_barrage .txp_barrage_item_speaker {\n                background-image: linear-gradient(to right,rgba(255,92,56,0.9) 0,rgba(253,177,41,0.9) 100%)!important;\n                color:white !important;\n                border-radius: 99999px;\n                z-index: 1;\n                -webkit-text-fill-color:unset !important;\n                text-shadow: unset !important;\n                stroke: unset !important;           \n\n            }\n            .txp_barrage .txp_barrage_item_speaker .txp_barrage_item_wrapper{\n                background: unset !important;\n            }\n            .txp_barrage .txp_barrage_itxp_barrage_item_speakertem_star .txp_text{\n                background: unset !important;\n            }\n\n            .txp_barrage .txp_barrage_item {\n                padding: 4px 20px 4px 10px;            \n            }\n            .txp_barrage .txp_barrage_item_wrapper{\n                background: inherit;\n                -webkit-text-fill-color: inherit;\n            }\n            \n\n            .txp_barrage .txp_barrage_item_hover .txp_barrage_item_wrapper{\n                background: unset !important;\n            }\n            .txp_barrage .txp_barrage_item_hover .txp_text{\n                background: unset !important;\n            }\n            .txp_barrage .txp_barrage_badge{\n                background: inherit;\n                -webkit-text-fill-color: inherit;\n            }\n            .txp_barrage .txp_icon_text{\n                background: inherit;\n                -webkit-text-fill-color: inherit;\n            }\n            .txp_barrage .txp_barrage_item_self{\n                \n                border: 1px solid white;\n                border-radius: 99999px;\n    \n            }\n            .txp_barrage .like{\n                -webkit-text-fill-color: red;\n            }\n    </style>\n    <svg class="txp_svg_sprite" display="none" version="1.1" xmlns="http://www.w3.org/2000/svg">\n        <symbol id="txp_svg_icon_like" viewBox="0 0 20 20">\n            <path d="M18.4 8.5l-2 9.4c-0.2 0.6-0.2 1.1-0.6 1.3 -0.4 0.3-1 0.2-1.9 0.2 -2.9 0-10.4 0-10.4 0l0-12 2.1-5c0 0 0.6-2 1.7-2 1.4 0 1.2 2 1.2 2s0 1.3 0 3c0 0.7 0.2 1 1 1 6.5 0 6.9 0 6.9 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0 1.6-0.2 1.9 0.5C18.5 7.4 18.6 7.9 18.4 8.5zM1.5 19.5c-0.6 0-1-0.4-1-1v-10c0-0.6 0.4-1 1-1s1 0.4 1 1v10C2.5 19.1 2.1 19.5 1.5 19.5z"></path>\n        </symbol>\n    </svg>\n    \n</txpdiv>',se=g,oe='<txpdiv class="txp_barrage_item">\n    <txpdiv class="txp_text"></txpdiv>\n</txpdiv>',re='<txpdiv class="txp_barrage_item_top">\n    <txpdiv class="txp_text"></txpdiv>\n</txpdiv>',le='<txpdiv class="txp_barrage_item_bottom">\n    <txpdiv class="txp_text"></txpdiv>\n</txpdiv>',he={
hasClass:function(t,e){
return t&&t.className&&t.className.indexOf(e)>-1;
},
addClass:function(t,e){
if(!this.hasClass(t,e)&&t)if(t.className&&0!==t.className.length){
var i=t.className.split(" ");
i.push(e),t.className=i.join(" ");
}else t.className=e;
},
removeClass:function(t,e){
if(this.hasClass(t,e)){
var i=t.className.split(" "),n=i.indexOf(e);
i.splice(n,1),t.className=i.join(" ");
}
},
css:function ge(e,i,n){
if(e&&i){
if("undefined"==typeof n&&"string"==typeof i)return;
if("undefined"==typeof n&&"object"===t(i)){
var ge=i;
for(var a in ge)ge.hasOwnProperty(a)&&(/width|height|left|right|top|bottom/.test(a)&&"number"==typeof ge[a]&&(ge[a]="".concat(ge[a],"px")),
e.style[a]=ge[a]);
}else if("string"==typeof i&&("string"==typeof n||"number"==typeof n)){
var s=n;
/width|height|left|right|top|bottom/i.test(i)&&"number"==typeof n&&(s="".concat(n,"px")),
e.style[i]=s;
}
}
}
},ce={},ue={
loadCss:function(t){
var e=1,i=function s(t,i,n){
var a=document.createElement("link");
a.rel="stylesheet",a.type="text/css",a.onload=function(){
i();
},a.onerror=function(){
return e>=3?void n():(e+=1,a.parentNode.removeChild(a),void s("".concat(b(t),"?v=").concat(parseInt(1e10*Math.random())),i,n));
},a.href=t,document.head.appendChild(a);
},n=function(){
for(var e=document.querySelectorAll('link[rel="stylesheet"]'),i=function(t){
var e=t,i=e.indexOf("?");
i>0&&(e=e.slice(0,i));
var n=e.lastIndexOf("/");
return n>0&&(e=e.slice(n+1,e.length)),e;
},n=i(t),a=null,s=e.length,o=0;s>o;o+=1)if(a=e[o],a&&a.href){
var r=i(a.href);
if(r===n)return!0;
}
return!1;
},a=new Promise(function(e,a){
var s=n();
s?e():i(t,e,a);
});
return a;
},
loadScript:function(t){
function e(){
s.test(n.readyState)&&(n.onload=null,n.onerror=null,n.onreadystatechange=null,n=null,
r(!0));
}
var i=t||{};
i.onsuccess=i.onsuccess||y;
var n=document.createElement("script"),a=document.getElementsByTagName("head")[0],s=/^(?:loaded|complete|undefined)$/;
if(i.url){
var o=b(i.url),r=function(t){
var e;
if(ce[o])for(;ce[o].length>0;)e=ce[o].shift(),"function"==typeof e&&e(t);
};
if(ce[o]&&ce[o].length)return void ce[o].push(i.onsuccess);
ce[o]=[i.onsuccess],n.async="async",n.src=i.url,n.charset="utf-8",i.crossorigin&&n.setAttribute("crossorigin",""),
n.onerror=function(){
n.onload=null,n.onerror=null,n.onreadystatechange=null,n=null,r(!1);
},n.onload=e,n.onerror=e,n.onreadystatechange=e,a.appendChild(n);
}
},
hasExsit:function(t){
for(var e=b(t),i=document.getElementsByTagName("script"),n=0,a=i.length;a>n;n+=1)if(i[n].src&&-1!==i[n].src.indexOf(e))return!0;
return!1;
}
},fe=function(){
function t(){
e(this,t),this.domlist=[],this.lastDom={};
}
return n(t,[{
key:"handleDom",
value:function(t){
for(var e=this.domlist.length-1;e>=0;e-=1)t&&t(this.domlist[e])&&this.domlist.splice(e,1);
}
},{
key:"checkLast",
value:function(t){
var e=this;
Object.keys(this.lastDom).forEach(function(i){
t(e.lastDom[i],i);
});
}
},{
key:"push",
value:function(t,e){
this.domlist.push(t),this.lastDom[e]=t;
}
}]),t;
}(),de=function(){
function t(i){
e(this,t),this.list={
scroll:{
show:{},
cache:{}
}
},this.enablePosition=!!i,this.enablePosition&&(this.list.top={
show:{},
cache:{}
},this.list.bottom={
show:{},
cache:{}
});
}
return n(t,[{
key:"addList",
value:function(t){
if(v(t))for(var e=0,i=t.length;i>e;e+=1)this.addBarrage(t[e]);else this.addBarrage(t);
}
},{
key:"addBarrage",
value:function(t){
if("[object Object]"===Object.prototype.toString.call(t)&&(t.html||t.content)){
var e=t.position||1;
this.enablePosition||(e=1),this.add(t,e);
}
}
},{
key:"getList",
value:function(t){
var e;
switch(t){
case 1:
e=this.list.scroll;
break;

case 5:
e=this.list.top;
break;

case 6:
e=this.list.bottom;
break;

default:
e=this.list.scroll;
}
return e;
}
},{
key:"add",
value:function(t,e){
var i,n=this.getList(e);
i=t.mustShow?n.show:n.cache,t.index?(i[t.index]||(i[t.index]=[]),i[t.index].push(t)):(i.priority||(i.priority=[]),
i.priority.push(t));
}
},{
key:"get",
value:function(t,e){
var i=this.getList(e);
return i.show.priority&&i.show.priority.length?i.show.priority.shift():i.show[t]&&i.show[t].length?i.show[t].shift():i.cache[t]&&i.cache[t].length?i.cache[t].shift():i.cache.priority&&i.cache.priority.length?i.cache.priority.shift():null;
}
},{
key:"reset",
value:function(){
this.list.scroll.show={},this.list.scroll.cache={},this.enablePosition&&(this.list.top.show={},
this.list.top.cache={},this.list.bottom.show={},this.list.bottom.cache={});
}
},{
key:"clear",
value:function(){
this.list.scroll.cache={},this.enablePosition&&(this.list.top.cache={},this.list.bottom.cache={});
}
}]),t;
}(),pe={
fps:60,
speed:2,
rate:1,
top:!1,
bottom:!1,
star:!1,
gift:!1,
lineHeight:36,
enableSetArea:!1,
userNum:5,
interval:30,
cssUrl:"",
fontSize:"xs",
opacity:1,
enableColor:!0,
enablePosition:!1,
enableEgg:!1,
autoFont:!0,
loop:!1,
marginBottom:0,
enableMouseEvent:!1
},me=function(){
function t(i){
e(this,t),ie(this);
var n={};
_extends(n,pe,i),n.cssUrl&&this._loadStyle(n.cssUrl),this._initDataset(n),this._write(n.wrapper),
this._windowResize(),this.Timer=ne(n.fps),this.Timer.setCallBack(this.Animation.bind(this));
var a,s;
this._clickHandler&&(a=this._clickHandler.bind(this)),this._menuHandler&&(s=this._menuHandler.bind(this)),
this.Factory=_(this.dataset.$container,a,s,this.dataset.enableMouseEvent),this.BarragePool=se(this.Factory.scrollBarrage),
this.active=new fe,this.list=new de(this.dataset.enablePosition);
}
return n(t,[{
key:"_loadStyle",
value:function(t){
var e=this;
ue.loadCss(t).then(function(){
e.updateSize();
});
}
},{
key:"_initDataset",
value:function(t){
this.dataset={
currentBlock:0,
index:0,
interval:t.interval,
width:"",
height:"",
speed:t.speed,
rate:t.rate,
realSpeed:{
0:t.speed*t.rate*1.2,
1:t.speed*t.rate*1
},
keyMap:{},
lineHeight:t.lineHeight,
state:3,
timerState:3,
fps:t.fps,
count:0,
fontSetting:t.fontSize,
fontSize:t.autoFont?x(window.innerWidth,t.fontSize):0,
opacity:t.opacity,
userNum:t.userNum,
maxNum:0,
actualNum:0,
enableColor:t.enableColor,
enableScroll:!0,
enableTop:!0,
enableBottom:!0,
enableStar:!0,
enablePosition:t.enablePosition,
enableEgg:t.enableEgg,
autoFont:t.autoFont,
loop:t.loop,
marginBottom:t.marginBottom,
enableMouseEvent:t.enableMouseEvent
};
}
},{
key:"_write",
value:function(t){
var e=document.createElement("div");
e.innerHTML=ae,this.dataset.$container=e.firstChild,this.dataset.$scroll=this.dataset.$container.querySelector(".txp_barrage_scroll_wrap"),
t.appendChild(this.dataset.$container),this.updateSize(),this._setOpacity(this.dataset.opacity);
}
},{
key:"_setOpacity",
value:function(t){
this.dataset.$container.style.opacity=t||1;
}
},{
key:"_start",
value:function(t){
this.dataset.timerState=1,this.updateSize(),this.Timer.start(t),this._handlePosition("top","resume"),
this._handlePosition("bottom","resume");
}
},{
key:"_pause",
value:function(){
this.dataset.timerState=2,this.Timer.stop(),this._handlePosition("top","pause"),
this._handlePosition("bottom","pause");
}
},{
key:"Animation",
value:function(){
this._defaultAnimation();
}
},{
key:"_defaultAnimation",
value:function(t){
this.dataset.count>this.dataset.fps/2&&(this.dataset.count=0,this._create()),this._animate(t),
this.dataset.count+=1;
}
},{
key:"_getAvailable",
value:function(){
var t=this,e=[],i=0;
e.push({
start:0,
end:0
}),this.active.checkLast(function(n,a){
if(n.left+n.width+50>=t.dataset.width){
var s=n.height,o=a*s,r=(a-1)*s;
if(r===e[i].end)e[i].end=o;else if(r>e[i].end)e.push({
start:r,
end:o
}),i+=1;else for(var l=0,h=e.length;h-1>l;l+=1)if(e[l].start>=o&&(0===l||e[l-1].end<=r)){
e.splice(l,0,{
start:r,
end:o
}),i+=1;
break;
}
}
});
for(var n=this.dataset.actualNum,a=1,s=0,o=[];n>=a;){
var r=(a-1)*this.dataset.lineHeight,l=a*this.dataset.lineHeight;
e[s+1]?(r>=e[s].end&&l<=e[s+1].start&&o.push(a),l>e[s+1].end&&(s+=1)):r>=e[s].end&&o.push(a),
a+=1;
}
return o;
}
},{
key:"_create",
value:function(){
this.dataset.enablePosition?this._createPositionDanmu():this._createScroll();
}
},{
key:"_createScroll",
value:function(){
if(this.dataset.enableScroll){
var t=this._getAvailable();
if(t.length)for(var e=0,i=t.length;i>e;e+=1){
var n=t[e],a=this.list.get(this.dataset.index,1);
if(this.dataset.loop&&this._addDanmu(a),!a)break;
this._createScrollDanmu(a,n);
}
}
}
},{
key:"_createScrollDanmu",
value:function(t,e){
this.emit("showDanmu",t);
var i=this.BarragePool.get();
i&&((!this.dataset.enableColor||t.isStar)&&(t.color="#ffffff",t.gradienColor=[],
t.gradienColor.push("#ffffff"),t.gradienColor.push("#ffffff")),i.render(t,this.dataset.fontSize,this.dataset.lineHeight),
i.move(this.dataset.width,(e-1)*this.dataset.lineHeight),i.trail=e,this.active.push(i,e));
}
},{
key:"_animate",
value:function(){
var t=this;
this.active.handleDom(function(e){
if(!e.isHove){
var i=t.dataset.realSpeed[e.trail%2];
e.isSys&&(i*=2);
var n=e.left-i;
if(e.move(n),n+e.width+50<0)return t.BarragePool.save(e),!0;
}
return!1;
});
}
},{
key:"_toggleColor",
value:function(t){
t?this.dataset.enableColor=!0:(this.dataset.enableColor=!1,this.active.handleDom(function(t){
return t.color("#ffffff"),!1;
}));
}
},{
key:"_clear",
value:function(){
this._clearScroll(),this.dataset.enablePosition&&(this._handlePosition("top","clear"),
this._handlePosition("bottom","clear"));
}
},{
key:"_clearScroll",
value:function(){
this.active.handleDom(function(t){
return t.move(-t.width-100),!1;
});
}
},{
key:"_addDanmu",
value:function(t){
this.list.addList(t);
}
},{
key:"_windowResize",
value:function(){
var t=this,e=null;
window.onresize=function(){
1===t.dataset.state&&1===t.dataset.timerState&&t._pause(),e&&clearTimeout(e),e=setTimeout(function(){
1===t.dataset.state&&t._start(),t.updateSize();
},300);
};
}
},{
key:"updateSize",
value:function(){
this.dataset.width=this.dataset.$container.clientWidth,this.dataset.height=this.dataset.$container.clientHeight,
this.updateFont(),this.updateLineNum();
}
},{
key:"updateLineNum",
value:function(){
this.dataset.maxNum=parseInt((this.dataset.height-this.dataset.marginBottom)/this.dataset.lineHeight,10),
this.dataset.maxNum=this.dataset.maxNum>=0?this.dataset.maxNum:0,this.dataset.actualNum=this.dataset.userNum>this.dataset.maxNum?this.dataset.maxNum:this.dataset.userNum,
this.emit("lineUpdate",this.dataset.maxNum);
}
},{
key:"updateFont",
value:function(){
this.dataset.autoFont&&(this.dataset.fontSize=x(this.dataset.width,this.dataset.fontSetting),
this.dataset.lineHeight=Math.ceil(1.5*this.dataset.fontSize));
}
},{
key:"index",
set:function(t){
var e=t?parseInt(t,10):0;
if(e!==this.dataset.index&&(this.dataset.index=e,1===this.dataset.state)){
var i=Math.floor((e+1)/this.dataset.interval);
i!==this.dataset.currentBlock&&(this.dataset.currentBlock=i,this.emit("blockChange",e));
}
},
get:function(){
return this.dataset.index;
}
}]),t;
}();
return k(me),w(me),me;
});define("a/wxopen_card.js",["biz_wap/jsapi/core.js","biz_common/utils/report.js","biz_wap/utils/mmversion.js","biz_wap/utils/jsmonitor_report.js","biz_wap/utils/openUrl.js"],function(e){
"use strict";
function i(e,i){
c("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+e+i);
}
function t(e){
var t=e.url||"";
t=t.replace(/&amp;/g,"&");
var n=t.indexOf("?"),c=0;
(119==e.pt||120==e.pt)&&(c=2),e.report_param="&tid="+e.traceid+"&ticket="+e.ticket+"&aid="+e.aid,
t.indexOf("?")>=0?t=t.slice(0,n)+".html"+t.slice(n):t+=".html";
var d="",w="";
if(document.getElementsByTagName("mpcpc")[0]&&document.getElementsByTagName("mpcpc")[0].dataset&&(d=document.getElementsByTagName("mpcpc")[0].dataset.category_id_list),
"undefined"==typeof l){
var l;
l=window.cgiData&&window.cgiData.__biz?window.cgiData.__biz:window.parent.biz;
}
w=e.traceid+":"+d+":"+l+":"+e.aid+":"+e.pos_type,console.log("sceneNote",w);
var g={
scene:1067,
sceneNote:w,
userName:e.weapp_info.original_id+"@app",
relativeURL:t,
appVersion:1
},f=!1,v=navigator.userAgent.match(/MicroMessenger\/(\d+)\.(\d+)\.(\d+)/);
if(v){
var b=Number(v[1]),j=Number(v[2]),z=Number(v[3]);
b>6?f=!0:6===b&&j>5?f=!0:6===b&&5===j&&z>=3&&(f=!0);
}
return console.log("canJumpOnTap : ",f,e.weapp_info.original_id,navigator.userAgent),
f?(u.setSum(110696,0,1),a?u.setSum(110696,3,1):(a=!0,o=+new Date),r?+new Date-r<2e3&&(u.setSum(110696,4,1),
setTimeout(function(){
r=0;
},2e3)):r=+new Date,p?+new Date-p<3e3&&(u.setSum(110696,5,1),setTimeout(function(){
p=0;
},3e3)):p=+new Date,s?+new Date-s<4e3&&(u.setSum(110696,6,1),setTimeout(function(){
s=0;
},4e3)):s=+new Date,void m.invoke("openWeApp",g,function(t){
var n=+new Date-o;
"openWeApp:ok"===t.err_msg&&i(125+c,e.report_param),"system:function_not_exist"===t.err_msg&&(_("https://mp.weixin.qq.com/mp/waerrpage?type=upgrade&original_id="+encodeURIComponent(e.weapp_info.original_id)+"#wechat_redirect"),
i(126+c,e.report_param)),u.setAvg(110696,2,n),a=!1;
})):(_("https://mp.weixin.qq.com/mp/waerrpage?type=upgrade&original_id="+encodeURIComponent(e.weapp_info.original_id)+"#wechat_redirect"),
void i(126+c,e.report_param));
}
function n(e){
m.invoke("preloadMiniProgramContacts",{
userNames:[e.weapp_info.original_id+"@app"]
},function(){}),m.invoke("preloadMiniProgramEnv",{
userNames:[e.weapp_info.original_id+"@app"]
},function(){});
}
var a,o,r,p,s,m=e("biz_wap/jsapi/core.js"),c=e("biz_common/utils/report.js"),u=(e("biz_wap/utils/mmversion.js"),
e("biz_wap/utils/jsmonitor_report.js")),_=e("biz_wap/utils/openUrl.js").openUrlWithExtraWebview;
return{
openWxopen:t,
startConnect:n
};
});define("new_video/plugin/frameAd.js",["new_video/plugin/frameAd.html.js","cdg_module/dist/sdk.js","biz_common/tmpl.js","biz_wap/utils/ajax.js","biz_wap/jsapi/core.js","pages/iframe_communicate.js"],function(a){
"use strict";
var t=a("new_video/plugin/frameAd.html.js"),o=a("cdg_module/dist/sdk.js"),e=a("biz_common/tmpl.js"),n=a("biz_wap/utils/ajax.js"),i=a("biz_wap/jsapi/core.js"),d=a("pages/iframe_communicate.js"),r=0,s=function(a){
var s=a.duration||0,p=this,p=this,c=p.container=$(a.container);
p.opt=a,p.duration=s,p.currentTime=0,p.clock=null,p.onHandler=a.onHandler,p.hasPlay=!1,
a.id=p.id=r++,c.append(e.tmpl(t,a,!1)),p.dom=$("#js_mpvedio_frame_"+p.id);
var l=this.adIframe=$("#js_mpvedio_main_frame_"+p.id).get(0);
window.parent.originalVideoAdFrames.push(l),l.setAttribute("src",location.protocol+"//mp.weixin.qq.com/mp/readtemplate?t=pages/video_cdg_ad_iframe"),
window.addEventListener("message",function(t){
var e=t.data;
console.log("framead receive data",t),console.info("cdg ad video frame connection: ",e.action),
t.source!==window&&t.source==l.contentWindow&&"onFrameReady"==e.action&&(l.contentWindow.addEventListener("message",function(t){
if(t.source==l.contentWindow){
var o=t.data;
if("onSDKReady"==o.action)12==p.opt.adData.product_type&&p.opt.adData.app_info?i.invoke("getInstallState",{
packageName:p.opt.adData.app_info.apk_name
},function(a){
var t=a.err_msg,o=t.lastIndexOf("_")+1,e=t.substring(o);
1*e>=p.opt.adData.app_info.version_code&&t.indexOf("get_install_state:yes")>-1&&(p.opt.adData.is_app_installed=!0),
p.opt.adData.is_app_installed&&("string"==typeof p.opt.adData.button_action&&(p.opt.adData.button_action=JSON.parse(p.opt.adData.button_action.html())),
p.opt.adData.button_action.button_text="已安装"),l.contentWindow.postMessage({
action:"setAdData",
value:p.opt.adData
},"*");
}):l.contentWindow.postMessage({
action:"setAdData",
value:p.opt.adData
},"*"),l.contentWindow.postMessage({
action:"setPageData",
value:{
user_uin:"777",
publisher_appid:p.opt.appmsgData.biz,
appmsg_id:p.opt.appmsgData.appmsgid,
item_idx:p.opt.appmsgData.idx,
duration_ms:p.opt.videoDuration,
vid:p.opt.appmsgData.vid,
page_enter_time:10,
url:window.parent.location.href,
appid:p.opt.adData.cdg_appid
}
},"*");else if("onAdReady"==o.action);else if("onError"==o.action)p.hasPlay?(p.dom.hide(),
p.opt.onEnd&&a.onEnd("end"),window.parent.originalVideoAdCurrentFrame=null):p.opt.onError();else if("onLand"==o.action);else if("onClose"==o.action)p.dom.hide(),
p.opt.onEnd&&a.onEnd("end"),window.parent.originalVideoAdCurrentFrame=null;else if("onProxy"==o.action){
var e=o.value.proxyData.methodName,r=o.value.proxyId,s=o.value.proxyData.args;
if(console.info("cdg ad video frame connection[proxy]: ",e,r),"calRqt"==e||"adDataReport"==e)return void p.opt.JSAPI.invoke(e,s,function(a){
l.contentWindow.postMessage({
proxyId:r,
proxyData:a
},"*");
});
if("ajaxPost"==e){
var c=o.value.proxyData.args.url||o.value.proxyData.url,r=o.value.proxyId,u=o.value.proxyData.args.data;
return void n({
url:c,
type:"post",
data:u,
success:function(a){
try{
l.contentWindow.postMessage({
proxyId:r,
proxyData:a
},"*");
}catch(t){
console.log("ajaxPost catch");
}
},
error:function(a){
try{
l.contentWindow.postMessage({
proxyId:r,
proxyData:a
},"*");
}catch(t){
console.log("ajaxPost catch");
}
},
complete:function(a){
try{
l.contentWindow.postMessage({
proxyId:r,
proxyData:a
},"*");
}catch(t){
console.log("ajaxPost catch");
}
}
});
}
if(p.opt.adData.is_app_installed)return;
p.onHandler(o.value),window.parent.originalVideoAdCurrentFrame=l,l.contentWindow.postMessage({
action:"pauseAd"
},"*");
}else if("onResume"==o.action){
for(var m=0;m<window.parent.originalVideoAdFrames.length;m++)window.parent.originalVideoAdFrames[m].contentWindow.postMessage({
action:"pauseAd",
value:""
},"*");
d.broadcastMessage({
type:"broadcastPlay",
data:{
id:null
}
}),p.adIframe.contentWindow.postMessage({
action:"playAd",
value:""
},"*"),window.parent.originalVideoAdCurrentFrame=l;
}
}
}),l.contentWindow.postMessage({
action:"initSDKCode",
value:o
},"*"));
});
};
return s.prototype._trigger=function(a){
var t=this;
t[a]&&t[a]();
},s.prototype._getContainer=function(){
return this.dom;
},s.prototype.beginPlay=function(){
var a=this,t=a.dom;
t.show(),a.adIframe.contentWindow.postMessage({
action:"showAd",
value:""
},"*");
for(var o=0;o<window.parent.originalVideoAdFrames.length;o++)window.parent.originalVideoAdFrames[o].contentWindow.postMessage({
action:"pauseAd",
value:""
},"*");
d.broadcastMessage({
type:"broadcastPlay",
data:{
id:null
}
}),a.adIframe.contentWindow.postMessage({
action:"playAd",
value:""
},"*"),a.hasPlay=!0,window.parent.originalVideoAdCurrentFrame=a.adIframe;
},s.prototype._hidePlayer=function(){
this.dom.hide();
},s.prototype.play=function(){
this.dom.show(),this.beginPlay();
},s.prototype.pause=function(){
var a=this;
a.clock&&clearTimeout(a.clock);
},s.prototype.setVideoCSS=function(a){
this._getContainer().css(a);
},s.prototype.timeupdate=function(){
{
var a=this;
a.opt;
}
},s;
});define("new_video/plugin/imgAd.js",["new_video/plugin/imgAd.html.js","biz_common/tmpl.js"],function(t){
"use strict";
var i=t("new_video/plugin/imgAd.html.js"),o=t("biz_common/tmpl.js"),e=0,n=function(t){
var n=t.duration||0,r=this,r=this,u=r.container=$(t.container);
r.opt=t,r.duration=n,r.currentTime=0,r.clock=null,t.id=r.id=e++,u.append(o.tmpl(i,t,!1)),
r.dom=$("#js_mpvedio_imgad_"+r.id),this._getImageRatio();
};
return n.prototype._getImageRatio=function(){
var t=this,i=this.opt,o=new window.Image;
o.onload=function(){
var e=o.naturalWidth||o.width||0,n=o.naturalHeight||o.height||0;
e&&n&&Math.abs(e/n-i.ratio)<=.1&&t.dom.find(".js_img").css({
"-webkit-background-size":"cover",
"background-size":"cover"
}),o.onload=null,o=null;
},o.src=i.imgUrl;
},n.prototype._trigger=function(t){
var i=this;
i[t]&&i[t]();
},n.prototype._getContainer=function(){
return this.dom;
},n.prototype.beginPlay=function(){
var t=this,i=t.dom;
i.show(),t.clock=setTimeout(function(){
t.timeupdate();
},100);
},n.prototype._hidePlayer=function(){
this.dom.hide();
},n.prototype.play=function(){
this.dom.show(),this.beginPlay();
},n.prototype.pause=function(){
var t=this;
t.clock&&clearTimeout(t.clock);
},n.prototype.setVideoCSS=function(t){
this._getContainer().css(t);
},n.prototype.timeupdate=function(){
var t=this,i=t.opt;
return t.currentTime>t.duration?void(i.onEnd&&i.onEnd("end")):(t.currentTime+=100,
setTimeout(function(){
t.timeupdate();
},100),void(i.onTimeupdate&&i.onTimeupdate("end",{
currentTime:t.currentTime/1e3
})));
},n;
});define("biz_wap/utils/hashrouter.js",[],function(){
"use strict";
function t(t,e){
h.push([t,e]);
}
function e(){
var t,e,s,i,r=a.hash.substr(1),o=!1,u=[];
for(t=0;t<h.length;t++)if(e=h[t],s=e[0],i=e[1],"default"!==s){
if("string"==typeof s&&s==r||s instanceof RegExp&&s.test(r)){
i(n),o=!0;
break;
}
}else u.push(i);
o||u.forEach(function(t){
t(n);
}),n=r;
}
var s,a,n,h;
try{
s=top.window,a=s.location,n=a.hash.substr(1),h=s.__HashMap=s.__HashMap||[];
}catch(i){
s=null,a={},n="",h=[];
}
return s&&!s.__hasListenedHashChange&&(s.addEventListener("hashchange",e),s.addEventListener("load",e),
s.__hasListenedHashChange=!0),{
get:t
};
});define("new_video/plugin_base.js",[],function(){
"use strict";
var t=0,o=function(t,o){
var e=function(){};
e.prototype=o.prototype,t.prototype=new e,t.prototype.constructor=t,t.uber=o.prototype;
},e=function(){
this.player=null;
};
return e.prototype.setPlayer=function(t){
this.player=t;
},e.prototype.setBlockEvt=function(t){
this.player._setBlockPlugin(t,this);
},e.prototype.setUnblockEvt=function(t){
this.player._setBlockPlugin(t,null);
},e.prototype.recv=function(o){
var e=this[o+"Handler"];
return"function"==typeof e?e.apply(this,arguments):t;
},{
Class:e,
inherit:o,
BASE_BITSET:t
};
});define("appmsg/log.js",["biz_wap/utils/log.js"],function(i){
"use strict";
var s=i("biz_wap/utils/log.js");
return function(i,t){
s(i,t);
};
});define("biz_common/utils/respTypes.js",[],function(require,exports,module,alert){
"use strict";
var logList=[],log=function(r){
logList.push(r);
},printLog=function(){
for(var r=0,e=logList.length;e>r;++r)console.log("[RespType]"+logList[r]);
},isArray=function(r){
return"[object Array]"==Object.prototype.toString.call(r);
},getValueType=function(r){
return isArray(r)?"array":typeof r;
},parseRtDesc=function(r,e){
var t="mix",o=!1,c=e;
if(e){
var n="_R",s=e.indexOf(n),i=e.length-n.length;
o=-1!=s&&s==i,c=o?e.substring(0,i):e;
}
return"string"==typeof r?t=r:isArray(r)?t="array":"object"==typeof r&&(t="object"),
{
key:c,
type:t,
isRequired:o
};
},checkForArrayRtDesc=function(r,e){
if(!isArray(r))return!1;
for(var t=0,o=r.length;o>t;++t){
for(var c,n=r[t],s=0,i=0===e.length;c=e[s++];)if(checkForRtDesc(n,c)){
i=!0;
break;
}
if(!i)return!1;
}
return!0;
},checkForStringRtDesc=function(r,e){
var t=getValueType(r),o=parseRtDesc(e),c=o.type==t;
return c||log("miss match type : "+t+" !== "+o.type),c;
},checkForObjectRtDesc=function(r,e){
if("object"!=typeof r||isArray(r))return log("must be object"),!1;
var t=r,o=r;
for(var c in e)if(e.hasOwnProperty(c)){
var n=e[c],s=parseRtDesc(n,c),i=s.key;
o=t[i];
var u=getValueType(o);
if(s.isRequired&&void 0===o)return log("is required @key="+i),!1;
if(void 0!==o){
if(u!=s.type&&"mix"!=s.type)return log("miss match type : "+u+" !== "+s.type+" @key="+i),
!1;
if(("array"==u||"object"==u)&&"mix"!=s.type&&!checkForRtDesc(o,n))return!1;
}
}
return!0;
},checkForRtDesc=function(r,e){
return isArray(e)?checkForArrayRtDesc(r,e):"object"==typeof e?checkForObjectRtDesc(r,e):"string"==typeof e?checkForStringRtDesc(r,e):!1;
},check=function(json,rtDescs){
if("string"==typeof json)try{
json=eval("("+json+")");
}catch(e){
return log("parse json error"),!1;
}
if("object"!=typeof json)return log("must be object"),!1;
isArray(rtDesc)||(rtDescs=[rtDescs]);
for(var rtDesc,i=0;rtDesc=rtDescs[i++];)if(checkForRtDesc(json,rtDesc))return!0;
return!1;
};
return{
check:function(r,e){
logList=[];
try{
var t=check(r,e);
return t||printLog(),t;
}catch(o){
return logList.push("[rtException]"+o.toString()),printLog(),!1;
}
},
getMsg:function(){
return logList.join(";");
}
};
});define("biz_wap/utils/openUrl.js",["biz_wap/jsapi/core.js","biz_wap/utils/mmversion.js"],function(e){
"use strict";
function r(e){
var r=document.createElement("a");
return r.href=e,{
source:e,
protocol:r.protocol.replace(":",""),
host:r.hostname,
port:r.port,
query:r.search,
params:function(){
for(var e,t={},i=r.search.replace(/^\?/,"").split("&"),a=i.length,o=0;a>o;o++)i[o]&&(e=i[o].split("="),
t[e[0]]=e[1]);
return t;
}(),
file:(r.pathname.match(/([^\/?#]+)$/i)||[,""])[1],
hash:r.hash.replace("#",""),
path:r.pathname.replace(/^([^\/])/,"/$1"),
relative:(r.href.match(/tps?:\/\/[^\/]+(.+)/)||[,""])[1],
segments:r.pathname.replace(/^\//,"").split("/")
};
}
function t(e,t){
var o;
t=t||1,0==e.indexOf("/")&&(o=r(location.href),e=o.protocol+"://"+o.host+e,console.log("openUrlWithExtraWebview with relative path:",e)),
e=e.replace(/(#[^#]*)+/,function(e,r){
return r;
}),-1!==navigator.userAgent.indexOf("MicroMessenger")&&(a.isIOS||a.isAndroid||a.isWp)?i.invoke("openUrlWithExtraWebview",{
url:e,
openType:t
},function(r){
-1==r.err_msg.indexOf("ok")&&(location.href=e);
}):location.href=e;
}
var i=e("biz_wap/jsapi/core.js"),a=e("biz_wap/utils/mmversion.js");
return{
openUrlWithExtraWebview:t
};
});