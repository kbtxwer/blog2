define("pages/version4video.js",["biz_common/dom/event.js","biz_wap/jsapi/core.js","biz_wap/utils/device.js","new_video/ctl.js","biz_wap/utils/mmversion.js"],function(e){
"use strict";
function i(e,i){
i=i||"",i=["uin:"+d.user_uin,"resp:"+i].join("|"),(new Image).src="/mp/jsreport?key="+e+"&content="+i+"&r="+Math.random();
}
function n(){
return window.__second_open__?!0:-1!=p.indexOf("&_newvideoplayer=0")?!1:-1!=p.indexOf("&_newvideoplayer=1")?!0:1!=d.is_login?!1:d.use_tx_video_player?!1:c.canSupportVideo&&m.inWechat?m.is_ios||m.is_android?!0:!1:(d._hasReportCanSupportVideo||c.canSupportVideo||!m.inWechat||(d._hasReportCanSupportVideo=!0,
i(44)),!1);
}
function s(){
{
var e=p,i=window.location.href;
d.sn||"";
}
return-1==e.indexOf("&_videoad=0")||"5a2492d450d45369cd66e9af8ee97dbd"!=d.sn&&"f62e1cb98630008303667f77c17c43d7"!=d.sn&&"30c609ee11a3a74a056e863f0e20cae2"!=d.sn?x.isInMiniProgram?!1:-1!=e.indexOf("&_videoad=1")?!0:-1===e.indexOf("mp.weixin.qq.com/s")&&-1===e.indexOf("mp.weixin.qq.com/mp/appmsg/show")&&-1===e.indexOf("mp.weixin.qq.com/mp/authreadtemplate")?!1:"54"==d.appmsg_type?!1:-1!=i.indexOf("&xd=1")?!1:d.__appmsgCgiData&&d.__appmsgCgiData.can_use_page&&(m.is_ios||m.is_android)?!0:u.showAd()?!0:!1:!1;
}
function o(){
var e=p,i=t(),n=(new Date).getHours(),s=!1;
return d.user_uin?-1!=e.indexOf("&_proxy=0")?!1:-1==e.indexOf("mp.weixin.qq.com/s")&&-1==e.indexOf("mp.weixin.qq.com/mp/appmsg/show")?!1:(-1!=e.indexOf("&_proxy=1")&&(s=!0),
n>=9&&14>=n?!1:(m.inWechat&&m.is_android&&m.is_x5&&m.wechatVer>="6.2.2"&&(s=!0),
m.inWechat&&m.is_android&&m.is_xweb&&m.xweb_version>=16&&(s=!0),m.inWechat&&m.is_ios&&(-1!=f.indexOf("MicroMessenger/6.2.4")||m.wechatVer>="6.2.4")&&(s=!0),
s&&i&&i.isUseProxy?!0:!1)):!1;
}
function r(){
return y.networkType;
}
function t(){
var e={
isUseProxy:0,
isUsePreload:0,
experSet:0
},i=!1;
if(parseInt(window.user_uin)==parseInt(2930301160)?(e.experSet=1,i=!0):parseInt(window.user_uin)==parseInt(3190019565)?(e.experSet=2,
i=!0):parseInt(window.user_uin)==parseInt(3193024205)||parseInt(window.user_uin)==parseInt(2092846410)?(e.experSet=3,
i=!0):(parseInt(window.user_uin)==parseInt(3194023964)||parseInt(window.user_uin)==parseInt(3193170635)||2756892560==parseInt(window.user_uin)||3193060470==parseInt(window.user_uin)||3495278585==parseInt(window.user_uin)||parseInt(window.user_uin)==parseInt(3190047886))&&(e.experSet=4,
i=!0),i||(e.experSet=window.user_uin&&window.user_uin%100<=4?window.user_uin%4+1:1),
e)switch(e.experSet){
case 1:
e.isUseProxy=0,e.isUsePreload=0;
break;

case 2:
e.isUseProxy=0,e.isUsePreload=1;
break;

case 3:
e.isUseProxy=1,e.isUsePreload=0;
break;

case 4:
e.isUseProxy=1,e.isUsePreload=1;
break;

default:
e=!1;
}
return 10>P&&a(l,!1),l||(e.isUseProxy=0),h||(e.isUsePreload=0),0==e.isUseProxy&&0==e.isUsePreload?e.experSet=1:0==e.isUseProxy&&1==e.isUsePreload?e.experSet=2:1==e.isUseProxy&&0==e.isUsePreload?e.experSet=3:1==e.isUseProxy&&1==e.isUsePreload&&(e.experSet=4),
g===!1&&(console.info("[视频代理实验]",e),g=!0),e;
}
function a(e,i){
l=e,h=i;
}
var d,p,w=e("biz_common/dom/event.js"),_=e("biz_wap/jsapi/core.js"),c=e("biz_wap/utils/device.js"),u=e("new_video/ctl.js"),x=e("biz_wap/utils/mmversion.js"),f=window.navigator.userAgent,y={
networkType:""
},m={},l=!0,h=!0,g=!1,v=function(){
var e=navigator.userAgent.toLowerCase().match(/cpu iphone os (.*?) like mac os/);
return e&&e[1]&&parseInt(e[1].split("_")[0],10);
},P=v();
if(parent==window)d=window,p=window.location.href;else try{
p=parent.window.location.href,d=parent.window;
}catch(b){
p=window.location.href,d=window;
}
return function(e){
var i=c.os;
m.is_ios=/(iPhone|iPad|iPod|iOS)/i.test(e),m.is_android=!!i.android,m.is_wp=!!i.phone,
m.is_pc=!(i.phone||!i.Mac&&!i.windows),m.inWechat=/MicroMessenger/.test(e),m.inWindowWechat=/WindowsWechat/i.test(e),
m.inMacWechat=/wechat.*mac os/i.test(e),m.is_android_phone=m.is_android&&/Mobile/i.test(e),
m.is_android_tablet=m.is_android&&!/Mobile/i.test(e),m.ipad=/iPad/i.test(e),m.iphone=!m.ipad&&/(iphone)\sos\s([\d_]+)/i.test(e),
m.is_x5=/TBS\//.test(e)&&/MQQBrowser/i.test(e);
var n,s=/XWEB\/([\d\.]+)/i,o=e.match(s);
o&&o[1]&&(n=parseInt(o[1])),m.is_xweb=!!o,m.xweb_version=n;
var r=e.match(/MicroMessenger\/((\d+)(\.\d+)*)/);
m.wechatVer=r&&r[1]||0,w.on(window,"load",function(){
if(""==y.networkType&&m.inWechat){
var e={
"network_type:fail":"fail",
"network_type:edge":"2g/3g",
"network_type:wwan":"2g/3g",
"network_type:wifi":"wifi"
},i=["2g","3g","4g","2g/3g"];
_.invoke("getNetworkType",{},function(n){
y.networkType=e[n.err_msg]||"fail",window.networkType=y.networkType,("network_type:edge"==n.err_msg||"network_type:wwan"==n.err_msg)&&(n.detailtype&&i.indexOf(n.detailtype)>-1||n.subtype&&i.indexOf(n.subtype)>-1)&&(window.networkType=n.detailtype||n.subtype),
window.simType=n.simtype;
});
}
},!1);
}(window.navigator.userAgent),"undefined"==typeof d._hasReportCanSupportVideo&&(d._hasReportCanSupportVideo=!1),
{
device:m,
isShowMpVideo:n,
isUseProxy:o,
isUseAd:s,
getNetworkType:r,
proxyPreloadExper:t,
modifyExper:a
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
});var _extends=Object.assign||function(e){
for(var t=1;t<arguments.length;t++){
var a=arguments[t];
for(var i in a)Object.prototype.hasOwnProperty.call(a,i)&&(e[i]=a[i]);
}
return e;
};
define("a/a.js",["biz_wap/utils/mmversion.js","biz_common/utils/get_para_list.js","biz_common/utils/url/parse.js","biz_wap/utils/ajax.js","biz_wap/jsapi/core.js","biz_wap/utils/storage.js","appmsg/log.js","biz_common/dom/class.js","a/a_config.js","a/a_utils.js","common/utils.js","biz_common/dom/offset.js","a/appdialog_confirm.js","biz_common/utils/wxgspeedsdk.js","a/web_compt_ad.js","video/video_tail_utils.js"],function(require,exports,module,alert){
"use strict";
function processAdEleByPos(e){
var t;
e===AD_POS.POS_MID&&(t=document.getElementsByTagName("mpcpc")),adElCountMapByPos[e]=t.length;
for(var a=0;a<t.length;a++)el_gdt_areas[utils.getPosKeyDesc(e,a)]=t[a];
}
function initAdData(){
processAdEleByPos(AD_POS.POS_MID);
}
function checkNeedAds(){
var is_need_ad=1,_adInfo=null,screen_num=0;
if(!globalAdDebug){
var inwindowwx=-1!=navigator.userAgent.indexOf("WindowsWechat");
if(!document.getElementsByClassName||-1==navigator.userAgent.indexOf("MicroMessenger")||inwindowwx||mmversion.isInMiniProgram){
if(is_need_ad=0,js_sponsor_ad_area.style.display="none",js_bottom_ad_area.style.display="none",
adElCountMapByPos[AD_POS.POS_MID])for(var i=0;i<adElCountMapByPos[AD_POS.POS_MID];i++)el_gdt_areas[utils.getPosKeyDesc(AD_POS.POS_MID,i)].style.display="none";
}else if(window.localStorage&&-1===location.href.indexOf("mock"))try{
var _ad=adLS.get(lsKey);
_adInfo=_ad.info;
try{
_adInfo=eval("("+_adInfo+")");
}catch(e){
_adInfo=null;
}
var duration=Date.now()-_ad.time;
if(6e4>=duration?commonUtils.report120081(12):12e4>=duration?commonUtils.report120081(13):duration<AD_CONFIG.AD_CACHE_TIME&&commonUtils.report120081(14),
_adInfo&&duration<AD_CONFIG.AD_CACHE_TIME&&1*_adInfo.advertisement_num>0){
if(is_need_ad=0,window.user_uin&&!isNaN(parseInt(window.user_uin,10))&&parseInt(window.user_uin,10)%10!==2&&parseInt(window.user_uin,10)%10!==3){
var bizLogReport=[],sendData;
if(_adInfo.advertisement_info)for(var i in _adInfo.advertisement_info)bizLogReport.push({
pos_type:+_adInfo.advertisement_info[i].pos_type,
traceid:_adInfo.advertisement_info[i].traceid,
aid:+_adInfo.advertisement_info[i].aid,
log_type:9,
ext_info:JSON.stringify({
duplicate_time:duration
})
});
sendData=JSON.stringify({
biz_log_report:bizLogReport
}),ajax({
url:"/mp/advertisement_report?action=extra_report&extra_data="+sendData+"&__biz="+biz,
timeout:2e3
}),console.log("[广告命中缓存上报]",sendData);
}
}else adLS.remove(lsKey);
log("[Ad] is_need_ad: "+is_need_ad+" , adData:"+JSON.stringify(_ad));
}catch(e){
is_need_ad=1,_adInfo=null;
}
}
return{
is_need_ad:is_need_ad,
both_ad:0,
_adInfo:_adInfo
};
}
function insertAutoAdElement(e,t,a,i){
if(e.pos_type===AD_POS.POS_MID&&!adElCountMapByPos[AD_POS.POS_MID]){
if(!paragraphList){
var o=Date.now();
paragraphList=getParaList(contentWrp,{
getNestedStructure:e.position_index>=getParaList.paragraphStartIdx
}),Math.random()<.1&&(wxgSpeedSdk.saveSpeeds({
uin:window.user_uin,
pid:34,
speeds:[{
sid:37,
time:Date.now()-o
}]
}),wxgSpeedSdk.send());
}
var r=void 0!==e.position_index;
e.position_index=e.position_index>=getParaList.paragraphStartIdx?e.position_index-getParaList.paragraphStartIdx:e.position_index,
r=r&&e.position_index>=0&&e.position_index<paragraphList.length;
var n=i?(a+1)/(i+1)*paragraphList.length:paragraphList.length/2,s=r?e.position_index:Math.floor(n)-1;
s=0>s?0:s;
var d=paragraphList[s],p=d.parentNode,_=document.createElement("p");
p.appendChild(_);
var m=_.offsetWidth;
if(p.removeChild(_),m<.7*contentWrp.offsetWidth){
if(void 0!==e.position_index){
var l=JSON.stringify({
url:encodeURIComponent(location.href),
dataType:"mid_ad_width_url"
});
(new Image).src="/mp/jsmonitor?idkey=120081_23_1&lc=1&log0="+l+"&r="+Math.random();
}else commonUtils.report120081(15);
return;
}
var u=document.createElement("mpcpc");
el_gdt_areas[utils.getPosKeyDesc(AD_POS.POS_MID)]=u,commonUtils.insertAfter(u,d),
t&&utils.report115849(2);
}
}
function separateAdData(){
var e=arguments.length<=0||void 0===arguments[0]?[]:arguments[0],t=0,a=0,i=0,o=[],r=[],n=[],s=commonUtils.getWebComptStatus();
for(var d in e){
var p=e[d],_=utils.getCrtExpInfo(p),m=110==_.exp_type,l=mmversion.isAndroid&&mmversion.gtVersion("7.0.15",!0),u=p.pos_type===AD_POS.POS_MID&&"1"===utils.getExpParaVal(p,100280),c=!!urlParser.getQuery("forcewebcompt"),f=p.pos_type===AD_POS.POS_MID,A=p.pos_type===AD_POS.POS_AD_BEFORE_VIDEO,g=p.pos_type===AD_POS.POS_BOTTOM&&"1"===utils.getExpParaVal(p,100316),h=p.pos_type===AD_POS.POS_BOTTOM;
f&&t++,u&&a++,h&&i++,l&&(s&&"error"===s.status&&utils.report128729(64),s&&"loading"===s.status&&utils.report128729(65)),
s&&"ready"===s.status&&l&&(u||g||m||c)?n.push(p):f||A&&0===p.is_mp_video||h||p.pos_type===AD_POS.POS_AD_AFTER_VIDEO||A&&1===p.is_mp_video||p.pos_type===AD_POS.POS_SPONSOR?r.push(p):o.push(p);
}
if(i>1){
for(var I=[],v={
aid:Date.now(),
pos_type:AD_POS.POS_BOTTOM
},d=r.length-1;d>=0;d--)r[d].pos_type===AD_POS.POS_BOTTOM&&I.push(r.splice(d,1)[0]);
v.children=I.reverse(),v.flow_exp_info=v.children[0].flow_exp_info,r.push(v);
}
if(is_temp_url&&t<adElCountMapByPos[AD_POS.POS_MID])for(var d=t;d<adElCountMapByPos[AD_POS.POS_MID];d++){
var D=_extends({
aid:""+parseInt(Math.random()*Math.pow(10,9),10)
},AD_CONFIG.defaultMidAdData);
n.length?n.push(D):r.push(D);
}
return{
oldAdInfos:o,
newAdInfos:r,
webComponentAdInfos:n,
midAdDataCount:t,
webComptMidAdDataCount:a
};
}
function createAdFrame(e,t){
if(e){
var a=document.createElement("iframe"),i=utils.getExpParaVal(t,94574),o=urlParser.getQuery("forceframeversion");
i=o||i;
var r=i?i+"/":"",n=AD_CONFIG.AD_FRAME_DOMAIN+"/tmpl/"+r+"base_tmpl.html";
a.src=n,a.className="iframe_ad_container",a.scrolling="no",a.createIframeTime=Date.now(),
e.appendChild(a),mmversion.isIOS&&(a.style.width="1px",a.style.minWidth="100%");
var s=new Image;
s.onerror=function(){
utils.report115849(86);
},s.src="https://wxa.wxs.qq.com/images/icon/icon_video_go.png";
try{
localStorage.setItem("__WXLS_ad_iframe_url",n);
}catch(d){}
return a;
}
}
function postMessageToAdFrame(e,t,a){
utils.postMessage(e,t,a,AD_CONFIG.AD_FRAME_DOMAIN);
}
function invalidMsg(e,t){
return e+" | "+t;
}
function isVideoFrameHasVid(e,t){
var a=e.getAttribute("data-src"),i=e.src||a;
return/^http(s)*\:\/\/v\.qq\.com\/iframe\/(preview|player)\.html\?/.test(a)||/^http(s)*\:\/\/mp\.weixin\.qq\.com\/mp\/readtemplate\?t=pages\/video_player_tmpl/.test(a)?i&&i.indexOf("vid="+t)>-1:!1;
}
function proxyCallback(e,t,a){
postMessageToAdFrame(e,"proxyCallbackV2",{
proxyId:t.proxyId,
aid:t.aid,
proxyData:a
});
}
function androidAppDialogConfirm(e,t){
var a=t.proxyData||{};
appDialogConfirm({
app_name:a.args.app_name,
app_img_url:a.args.icon_url,
onOk:function(){
proxyCallback(e,t,{
err_msg:"appDialogConfirm:yes"
});
},
onCancel:function(){
proxyCallback(e,t,{
err_msg:"appDialogConfirm:cancel"
});
}
});
}
function AdFrame(){
this.aInfoMap={},this.iframes=document.getElementsByTagName("iframe");
}
function handleVideoSharePage(e){
e=e||document.body.offsetHeight,JSAPI.invoke("configMpAdAttrs",{
viewHeight:e
},function(t){
console.log("debug for configMpAdAttrs height: ",e,", response:",t);
});
}
function afterGetAdData(e,t){
isVideoSharePageOnlyAd&&urlParser.getQuery("adWidth")&&(document.documentElement.style.width=urlParser.getQuery("adWidth")+"px");
var a={},i=e.is_need_ad,o=e._adInfo;
if(0==i)a=o,a||(a={
advertisement_num:0
});else{
if(t.advertisement_num>0&&t.advertisement_info){
var r=t.advertisement_info;
a.advertisement_info=utils.saveCopy(r);
}
if(a.advertisement_num=t.advertisement_num,a.appid=t.appid,window._adRenderData=a,
a){
var n=utils.saveCopy(a),s=n.advertisement_info;
if(s)for(var d in s)(s[d].pos_type===AD_POS.POS_AD_BEFORE_VIDEO||s[d].pos_type===AD_POS.POS_AD_AFTER_VIDEO)&&(delete s[d],
n.advertisement_num--);
n.advertisement_num&&adLS.set(lsKey,{
info:JSON.stringify(n),
time:Date.now()
},+new Date+24e4);
}
}
a=a||{
advertisement_num:0
};
var p=separateAdData(a.advertisement_info),_=p.oldAdInfos,m=_.length,l=new WebComptAd;
m&&utils.report115849(72),l.config({
adElCountMapByPos:adElCountMapByPos,
insertAutoAdElement:insertAutoAdElement
}),l.handleAd(p.webComponentAdInfos,p.webComptMidAdDataCount),(new AdFrame).handleAdWithFrame(p.newAdInfos,p.midAdDataCount,a.appid),
!a.flag&&a.advertisement_num>0&&(window.adDatasRealNum=a.advertisement_num);
}
var mmversion=require("biz_wap/utils/mmversion.js"),getParaList=require("biz_common/utils/get_para_list.js"),urlParser=require("biz_common/utils/url/parse.js"),ajax=require("biz_wap/utils/ajax.js"),JSAPI=require("biz_wap/jsapi/core.js"),LS=require("biz_wap/utils/storage.js"),log=require("appmsg/log.js"),classList=require("biz_common/dom/class.js"),AD_CONFIG=require("a/a_config.js"),utils=require("a/a_utils.js"),commonUtils=require("common/utils.js"),offset=require("biz_common/dom/offset.js"),appDialogConfirm=require("a/appdialog_confirm.js"),wxgSpeedSdk=require("biz_common/utils/wxgspeedsdk.js"),WebComptAd=require("a/web_compt_ad.js"),videoTailUtils=require("video/video_tail_utils.js"),adLS=new LS("ad"),lsKey=[window.biz,window.sn,window.mid,window.idx].join("_"),globalAdDebug=!!urlParser.getQuery("mock")||!!urlParser.getQuery("rtx"),AD_POS=AD_CONFIG.AD_POS,__report=window.__report,js_bottom_ad_area=document.getElementById("js_bottom_ad_area"),js_sponsor_ad_area=document.getElementById("js_sponsor_ad_area"),el_gdt_areas={
pos_3:js_sponsor_ad_area,
pos_0:js_bottom_ad_area
},adElCountMapByPos={},contentWrp=document.getElementById("js_content"),msgPageWrp=document.getElementById("page-content"),isVideoSharePageOnlyAd=utils.isVideoSharePageOnlyAd(),paragraphList=void 0;
return AdFrame.prototype.initMidAd=function(e,t){
insertAutoAdElement(e,!0,t,this.midAdDataCount);
var a=document.getElementsByTagName("mpcpc")[t];
a&&(this.aInfoMap[e.aid].iframeEle=createAdFrame(a,e),__report&&__report(125),utils.report115849("0"));
},AdFrame.prototype.initAdBeforeVideo=function(e){
for(var t=[],a=[],i=0;i<this.iframes.length;i++){
var o=this.iframes[i];
if(t.push(o.getAttribute("data-src")),a.push(o.src),isVideoFrameHasVid(o,e.vid)){
var r=this.aInfoMap[e.aid],n=document.createElement("div");
n.className="mpad_relative";
var s=o.nextSibling;
commonUtils.insertAfter(n,o),n.appendChild(o);
var d=createAdFrame(n,e);
return classList.addClass(d,"mpad_absolute"),r.iframeEle=d,r.heightWidthRate=parseInt(o.style.height,10)/parseInt(o.style.width,10),
o.adVidFromAppmsg=e.vid,setTimeout(function(){
o.contentWindow?o.contentWindow.adVidFromAppmsg=e.vid:utils.report115849(51),utils.postMessage(o.contentWindow,AD_CONFIG.SEND_AD_VID_ACTION,{
adVidFromAppmsg:e.vid
});
},0),s&&n.appendChild(s),void(0===e.is_mp_video?utils.report115849(1):commonUtils.report120081(3));
}
}
},AdFrame.prototype.responseVideoGetAdVid=function(e){
for(var t=0;t<this.iframes.length;t++)if(e===this.iframes[t].contentWindow&&this.iframes[t].adVidFromAppmsg)return void utils.postMessage(e,AD_CONFIG.SEND_AD_VID_ACTION,{
adVidFromAppmsg:this.iframes[t].adVidFromAppmsg
});
utils.postMessage(e,AD_CONFIG.SEND_AD_VID_ACTION,{});
},AdFrame.prototype.initAdAfterVideo=function(e){
var t=document.getElementById("js_tail_video_ad_area"),a=createAdFrame(t,e);
this.aInfoMap[e.aid].heightWidthRate=t.offsetHeight/t.offsetWidth,this.aInfoMap[e.aid].iframeEle=a,
this.aInfoMap[e.aid].tailAdArea=t;
},AdFrame.prototype.initBottomAd=function(e){
this.aInfoMap[e.aid].iframeEle=createAdFrame(js_bottom_ad_area,e),utils.report115849(9);
},AdFrame.prototype.initSponsorAd=function(e){
this.aInfoMap[e.aid].iframeEle=createAdFrame(js_sponsor_ad_area,e),utils.report115849(63);
},AdFrame.prototype.onFrameReady=function(e){
var t,a="";
if(utils.report115849(99),(new Image).src="http://pingfore.qq.com/pingd?dm=wxa.wxs.qq.com&url=/tmpl/biz_frame_ready.html&rdm=-&rurl=-&rarg=-&pvid=NoCookie&scr=1080x1920&scl=24-bit&lang=zh-cn&java=0&pf=MacIntel&tz=-8&flash=-&ct=-&vs=tcss.3.1.5&ext=ls%3Dwxa.wxs.qq.com/tmpl/base_tmpl.html%3Btm%3D5&hurlcn=&reserved1=-1&tt=&rand="+Math.round(1e5*Math.random()),
this.mapInfoMap(function(a,i,o){
i.contentWindow===e&&(t=o);
}),t){
var i=t.iframeEle.parentNode,o="8"===window.item_show_type&&commonUtils.isNativePage();
t.aInfo.pos_type===AD_POS.POS_MID&&(a=i&&i.dataset&&i.dataset.category_id_list),
postMessageToAdFrame(e,AD_CONFIG.SET_PAGE_DATA_ACTION_NAME,{
biz:window.biz,
uin:window.uin,
scene:window.scene,
source:window.source,
idx:window.idx,
mid:window.mid,
isSg:window.isSg,
userUin:window.user_uin,
sn:window.sn,
appmsgid:window.appmsgid,
sendTime:window.send_time||"",
passTicket:decodeURIComponent(window.pass_ticket),
globalAdDebug:globalAdDebug,
bodyScrollTop:commonUtils.getScrollTop(),
contentOffsetHeight:msgPageWrp?msgPageWrp.offsetHeight:0,
adOffsetTop:offset.getOffset(t.iframeEle).offsetTop,
screenHeight:commonUtils.getInnerHeight(),
midCategoryIdList:a,
heightWidthRate:t.heightWidthRate,
createIframeTime:t.iframeEle.createIframeTime,
skin:o?"black":"white",
appid:this.appid,
pageUrl:location.href
}),postMessageToAdFrame(e,"setAdDataV2",t.aInfo);
}
},AdFrame.prototype.mapInfoMap=function(e,t){
for(var a in this.aInfoMap){
{
var i=this.aInfoMap[a],o=i.iframeEle;
i.aInfo.pos_type===AD_POS.POS_AD_AFTER_VIDEO;
}
this.aInfoMap.hasOwnProperty(a)&&o&&(!t||t&&t===a)&&e&&e(i.aInfo,o,i);
}
},AdFrame.prototype.broadcastAdFrame=function(e,t){
this.mapInfoMap(function(a,i){
postMessageToAdFrame(i.contentWindow,e,t);
});
},AdFrame.prototype.hasVideoPlayingInScreen=function(e,t){
try{
for(var a=e+t,i=0;i<this.iframes.length;i++){
var o=this.iframes[i],r=offset.getOffset(o).offsetTop;
if(("play"===o.contentWindow.videoStatus||"loading"===o.contentWindow.videoStatus)&&a>r&&e<r+o.offsetHeight)return!0;
}
}catch(n){
return!1;
}
},AdFrame.prototype.bindScrollEvent=function(){
var e=this;
commonUtils.bindDebounceScrollEvent(function(){
var t=commonUtils.getScrollTop(),a=commonUtils.getInnerHeight();
e.mapInfoMap(function(i,o){
var r=offset.getOffset(o).offsetTop;
o.contentWindow&&postMessageToAdFrame(o.contentWindow,"pageScrollV2",{
bodyScrollTop:t,
adOffsetTop:r,
screenHeight:a,
hasVideoPlayingInScreen:e.hasVideoPlayingInScreen(t,a)
});
});
});
},AdFrame.prototype.checkApiInvokeValid=function(e){
if(!this.aInfoMap[e.aid])return"Invalid aid";
var t=e.proxyData||{},a=this.aInfoMap[e.aid].aInfo,i=t.methodName;
return-1===AD_CONFIG.AD_JSAPI_WHITE_LIST.indexOf(i)?invalidMsg(AD_CONFIG.INVALID_METHOD_NAME_MSG_PREFIX,i):"addContact"!==i&&"profile"!==i||a&&a.biz_info&&t.args.username===a.biz_info.user_name?!0:invalidMsg(AD_CONFIG.INVALID_ARGS_MSG_PREFIX,"Invalid biz username");
},AdFrame.prototype.changeFrameStyle=function(e){
if(this.aInfoMap[e.aid]){
var t=this.aInfoMap[e.aid].iframeEle;
if(e.display===!1?classList.addClass(t,AD_CONFIG.AD_IFRAME_HIDE_CLASS):e.display===!0&&classList.removeClass(t,AD_CONFIG.AD_IFRAME_HIDE_CLASS),
e.height&&(t.style.height=e.height),isVideoSharePageOnlyAd&&handleVideoSharePage(parseInt(e.height,10)),
this.aInfoMap[e.aid].aInfo.pos_type===AD_POS.POS_BOTTOM&&!this.hasReportBottomTime&&"5"===window.item_show_type){
var a=Date.now()-window.logs.pagetime.page_begin;
if(this.hasReportBottomTime=!0,Math.random()>.1)return;
wxgSpeedSdk.saveSpeeds({
uin:window.uin,
pid:675,
speeds:[{
sid:28,
time:a
}]
}),wxgSpeedSdk.send();
}
}
},AdFrame.prototype.commonRequest=function(e,t){
var a=t.proxyData||{},i=a.args||{};
return-1===AD_CONFIG.AD_REQ_PATH_WHITE_LIST.indexOf(i.path)?void proxyCallback(e,t,{
err_msg:invalidMsg(AD_CONFIG.INVALID_REQ_PATH_MSG_PREFIX,i.path)
}):(ajax({
type:i.requestType,
url:i.path+"?"+(i.requestQuery||""),
data:i.requestBody||{},
mayAbort:!0,
success:function(a){
proxyCallback(e,t,{
err_msg:"request:success",
response:a
});
},
error:function(a,i){
proxyCallback(e,t,{
err_msg:"request:error",
xhr:a,
err_info:i
});
}
}),void("/mp/advertisement_report"===i.path&&i.requestQuery.indexOf("report_type=2")>-1&&utils.report115849(38)));
},AdFrame.prototype.onJsapiProxy=function(e,t){
function a(a){
proxyCallback(e,t,a),"openUrlWithExtraWebview"===i.methodName&&-1===a.err_msg.indexOf("ok")&&(location.href=i.args.url);
}
var i=t.proxyData||{},o=this.checkApiInvokeValid(t);
if("string"==typeof o)return void proxyCallback(e,t,{
err_msg:o
});
if("handleMPPageAction"===i.methodName&&"closeAdWebview"===i.args.action)return void videoTailUtils.showTailPanel(!0);
try{
"on"===i.methodType?JSAPI[i.methodType](i.methodName,a):JSAPI[i.methodType](i.methodName,i.args,a);
}catch(r){
console.error(r),proxyCallback(e,t,{
err_msg:invalidMsg(AD_CONFIG.INVALID_METHOD_TYPE_MSG_PREFIX,i.methodType)
});
}
"adDataReport"===i.methodName&&1===i.args.need_record_page_operation&&utils.report115849(41);
},AdFrame.prototype.onProxy=function(e,t){
if("jsapi"===t.proxyType)return void this.onJsapiProxy.apply(this,arguments);
var a=t.proxyData||{};
if("bizapi"===t.proxyType){
if("appDialogConfirm"===a.methodName)return void androidAppDialogConfirm.apply(this,arguments);
if("request"===a.methodName)return void this.commonRequest.apply(this,arguments);
if("addIdKeyReport"===a.methodName)return void(window.__addIdKeyReport&&window.__addIdKeyReport(a.args.id,a.args.key,a.args.val));
"removeADCache"===a.methodName&&adLS.remove(lsKey);
}
},AdFrame.prototype.bindAppVideoEvent=function(){
var e=this;
"5"===window.item_show_type&&(commonUtils.isNativePage()||commonUtils.isWcSlPage())&&this.hasAdAfterVideo?videoTailUtils.onReceiveMPPageData(function(t){
t.data===AD_CONFIG.GET_AD_DATA_AFTER_VIDEO_ACTION_NAME&&e.newAdInfos.map(function(e){
e.pos_type===AD_POS.POS_AD_AFTER_VIDEO&&videoTailUtils.sendMPPageData(JSON.stringify({
aInfo:e,
dataType:"adData"
}),"adWeb");
});
}):location.href.indexOf("/mp/authreadtemplate")>-1&&videoTailUtils.setTailOpts({
hasAd:this.hasAdAfterVideo,
showAd:function(){
e.mapInfoMap(function(e,t,a){
e.pos_type===AD_POS.POS_AD_AFTER_VIDEO&&(postMessageToAdFrame(t.contentWindow,AD_CONFIG.SET_PAGE_DATA_ACTION_NAME,{
heightWidthRate:a.tailAdArea.offsetHeight/a.tailAdArea.offsetWidth
}),postMessageToAdFrame(t.contentWindow,AD_CONFIG.AD_PLAY_VIDEO_ACTION,""));
});
}
});
},AdFrame.prototype.bindAdEvent=function(){
var e=this,t=document.getElementById("js_article");
utils.listenMessage(window,function(t,a){
var i=a.action,o=a.value||{};
if(i===AD_CONFIG.AD_VIDEO_PLAY_ACTION&&o.playAd&&utils.report115849(35),i===AD_CONFIG.AD_VIDEO_PLAY_ACTION&&(o.vid||o.aid))return o.playAd&&utils.report115849(25),
e.mapInfoMap(function(e,t){
var a=e.vid&&e.vid===o.vid;
a||e.aid===o.aid?a&&(postMessageToAdFrame(t.contentWindow,AD_CONFIG.AD_PLAY_VIDEO_ACTION,""),
o.playAd&&utils.report115849(21)):postMessageToAdFrame(t.contentWindow,"pauseVideoV2","");
}),void(o.aid&&utils.broadcastFrame(e.iframes,AD_CONFIG.AD_VIDEO_PLAY_ACTION,"","vid="));
if("mpvideo_broadcast_statusChange"===a.type)return void(t.source.videoStatus=a.data.status);
if(a.action===AD_CONFIG.GET_AD_VID_ACTION&&e.responseVideoGetAdVid(t.source),t.origin!==AD_CONFIG.AD_FRAME_DOMAIN);else switch(i){
case"onFrameReadyV2":
e.onFrameReady(t.source);
break;

case"onProxyV2":
e.onProxy(t.source,o);
break;

case"changeFrameStyle":
e.changeFrameStyle(o);
break;

case"onVideoEndV2":
e.mapInfoMap(function(t){
utils.broadcastFrame(e.iframes,AD_CONFIG.AD_VIDEO_END_ACTION,"","vid="+t.vid);
},o.aid);
}
}),t&&t.addEventListener("click",function(){
e.broadcastAdFrame("clickOutsideV2","");
}),this.bindScrollEvent();
},AdFrame.prototype.handleAdWithFrame=function(){
var e=arguments.length<=0||void 0===arguments[0]?[]:arguments[0],t=arguments.length<=1||void 0===arguments[1]?0:arguments[1],a=arguments[2],i=0,o=this;
this.midAdDataCount=t,this.newAdInfos=e,this.appid=a,e.forEach(function(e){
return o.aInfoMap[e.aid]={
aInfo:e
},e.pos_type===AD_POS.POS_MID?(o.initMidAd(e,i),void i++):e.pos_type===AD_POS.POS_AD_BEFORE_VIDEO?(0===e.is_mp_video?utils.report115849(18):commonUtils.report120081(2),
void o.initAdBeforeVideo(e)):e.pos_type===AD_POS.POS_BOTTOM?void o.initBottomAd(e):e.pos_type===AD_POS.POS_AD_AFTER_VIDEO?(o.hasAdAfterVideo=!0,
void(commonUtils.isWcSlPage()?videoTailUtils.setHasAdData4WcSlPlayer(!0):commonUtils.isNativePage()?videoTailUtils.createTailWebview(!0):(utils.report115849(33),
o.initAdAfterVideo(e)))):e.pos_type===AD_POS.POS_SPONSOR?void o.initSponsorAd(e):void 0;
}),videoTailUtils.setTailOpts({
canCreateTailWebview:!0
}),e.length&&(this.bindAppVideoEvent(),this.bindAdEvent());
},initAdData(),{
checkNeedAds:checkNeedAds,
afterGetAdData:afterGetAdData
};
});define("rt/appmsg/getappmsgext.rt.js",[],function(){
"use strict";
return{
base_resp:{
ret:"number",
errmsg:"string",
wxtoken:"number"
},
advertisement_num:"number",
advertisement_info:[{
hint_txt_R:"string",
url_R:"string",
type_R:"string",
rl_R:"string",
apurl_R:"string",
traceid_R:"string",
group_id_R:"string",
ticket:"string",
aid:"string",
pt:"number",
image_url:"string",
ad_desc:"string",
biz_appid:"string",
pos_type:"number",
watermark_type:"number",
logo:"string",
app_info:{},
biz_info:{},
card_info:{}
}],
comment_enabled:"number",
appmsgticket:{
ticket:"string"
},
self_head_imgs:"string",
appmsgstat:{
ret:"number",
show:"boolean",
is_login:"boolean",
like_num:"number",
liked:"boolean",
read_num:"number",
real_read_num:"number"
},
timestamp:"number",
reward_total_count:"number",
reward_head_imgs:["string"]
};
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
});define("biz_wap/utils/localstorage.js",[],function(){
"use strict";
var t={};
return t=window.localStorage?{
set:function(t,e){
null!==this.get(t)&&this.remove(t),localStorage.setItem(t,e);
},
get:function(t){
var e=localStorage.getItem(t);
return void 0===e?null:e;
},
remove:function(t){
localStorage.removeItem(t);
},
clear:function(){
localStorage.clear();
},
each:function(t){
for(var e,o=localStorage.length,n=0,t=t||function(){};o>n&&(e=localStorage.key(n),
t.call(this,e,this.get(e))!==!1);n++)localStorage.length<o&&(o--,n--);
}
}:{
set:function(){},
get:function(){},
remove:function(){},
clear:function(){},
each:function(){}
};
});define("common/comm_report.js",["biz_wap/utils/ajax.js","biz_wap/utils/ajax_wx.js","biz_common/utils/comm_report.js","biz_wap/jsapi/leaveReport.js"],function(t){
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
});define("sougou/index.js",["appmsg/emotion/emotion.js","biz_common/tmpl.js","appmsg/emotion/dom.js","biz_wap/utils/ajax.js","biz_common/dom/event.js","biz_common/utils/string/html.js","sougou/a_tpl.html.js","appmsg/cmt_tpl.html.js","appmsg/my_comment_tpl.html.js"],function(e){
"use strict";
function t(e){
var t=document.getElementById("js_cover"),o=[];
t&&o.push(t);
var n=document.getElementById("js_content");
if(n)for(var m=n.getElementsByTagName("img")||[],s=0,r=m.length;r>s;s++)o.push(m.item(s));
for(var a=[],s=0,r=o.length;r>s;s++){
var p=o[s],l=p.getAttribute("data-src")||p.getAttribute("src");
l&&(a.push(l),function(t){
i.on(p,"click",function(){
return"ios"==e?window.JSInvoker&&window.JSInvoker.openImageList&&window.JSInvoker.openImageList(JSON.stringify({
index:t,
array:a
})):window.JSInvoker&&JSInvoker.weixin_openImageList&&window.JSInvoker.weixin_openImageList(JSON.stringify({
index:t,
array:a
})),!1;
});
}(s));
}
}
var o=e("appmsg/emotion/emotion.js"),n=e("biz_common/tmpl.js"),m=e("appmsg/emotion/dom.js"),i=(e("biz_wap/utils/ajax.js"),
e("biz_common/dom/event.js"));
e("biz_common/utils/string/html.js");
e("sougou/a_tpl.html.js"),e("appmsg/cmt_tpl.html.js");
if(document.getElementById("js_report_article3")&&(document.getElementById("js_report_article3").style.display="none"),
document.getElementById("js_toobar3")&&(document.getElementById("js_toobar3").style.display="none"),
function(){
var t=e("appmsg/my_comment_tpl.html.js"),o=document.createElement("div");
o&&(o.innerHTML=n.tmpl(t,{}),document.body.appendChild(o));
}(),new o.Emotion({
emotionPanel:m("#js_emotion_panel"),
inputArea:m("#js_cmt_input"),
emotionPanelArrowWrp:m("#js_emotion_panel_arrow_wrp"),
emotionSwitcher:m("#js_emotion_switch"),
emotionSlideWrapper:m("#js_slide_wrapper"),
emotionNavBar:m("#js_navbar"),
submitBtn:m("#js_cmt_submit")
}),navigator.userAgent.toLowerCase().match(/ios/)){
var s=navigator.userAgent.toLowerCase().match(/(?:sogousearch\/ios\/)(.*)/);
if(s&&s[1]){
var r=s[1].replace(/\./g,"");
parseInt(r)>422&&t("ios");
}
}else t("android");
window.onerror=function(e){
var t=new Image;
t.src="/mp/jsreport?key=86&content="+e+"&r="+Math.random();
};
});define("biz_wap/safe/mutation_observer_report.js",[],function(){
"use strict";
window.addEventListener&&window.addEventListener("load",function(){
window.__moonsafe_mutation_report_keys||(window.__moonsafe_mutation_report_keys={});
var e=window.moon&&moon.moonsafe_id||29715,o=window.moon&&moon.moonsafe_key||0,t=[],n={},r=function(e){
return"[object Array]"==Object.prototype.toString.call(e);
},s=function(e,o,s){
s=s||1,n[e]||(n[e]=0),n[e]+=s,o&&(r(o)?t=t.concat(o):t.push(o)),setTimeout(function(){
a();
},1500);
},a=function(){
var r=[],s=t.length,i=["r="+Math.random()];
for(var c in n)n.hasOwnProperty(c)&&r.push(e+"_"+(1*c+1*o)+"_"+n[c]);
for(var c=0;s>c&&!(c>=10);++c)i.push("log"+c+"="+encodeURIComponent(t[c]));
if(!(0==r.length&&i.length<=1)){
var _,d="idkey="+r.join(";")+"&lc="+(i.length-1)+"&"+i.join("&");
if(window.ActiveXObject)try{
_=new ActiveXObject("Msxml2.XMLHTTP");
}catch(w){
try{
_=new ActiveXObject("Microsoft.XMLHTTP");
}catch(f){
_=!1;
}
}else window.XMLHttpRequest&&(_=new XMLHttpRequest);
_&&(_.open("POST",location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?",!0),_.setRequestHeader("cache-control","no-cache"),
_.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),
_.setRequestHeader("X-Requested-With","XMLHttpRequest"),_.onreadystatechange=function(){
4===_.readyState&&(t.length>10?(t=t.slice(10),a()):(t=[],n={}));
},t=[],n={},_.send(d));
}
};
try{
if(!window.__observer)return;
var i=window.__observer_data;
if(window.__observer.takeRecords){
var c=window.__observer.takeRecords();
if(c&&c.length){
i.count++;
var _=new Date;
c.forEach(function(e){
for(var o=e.addedNodes,t=0;t<o.length;t++){
var n=o[t];
if("SCRIPT"===n.tagName){
var r=n.src;
!r||/qq\.com/.test(r)||/weishi\.com/.test(r)||i.list.push(r);
}
}
}),i.exec_time+=new Date-_;
}
}
window.__observer.disconnect();
for(var d=window.__moonsafe_mutation_report_keys.observer||2,w=window.__moonsafe_mutation_report_keys.script_src||8,f=window.__moonsafe_mutation_report_keys.setattribute||9,u=window.__moonsafe_mutation_report_keys.ajax||10,m=25,v=0;v<i.list.length;v++){
var l=i.list[v],h=["[moonsafe][observer][url]:"+location.href,"[moonsafe][observer][src]:"+l,"[moonsafe][observer][ua]:"+navigator.userAgent];
i.list.length==v+1&&(h.push("[moonsafe][observer][count]:"+i.count),h.push("[moonsafe][observer][exec_time]:"+i.exec_time+"ms")),
s(d,h),"inlinescript_without_nonce"==l&&s(m,h);
}
var p=window.__danger_src;
if(p)for(var y=[{
key:"xmlhttprequest",
idkey:u
},{
key:"script_src",
idkey:w
},{
key:"script_setAttribute",
idkey:f
}],v=0;v<y.length;v++){
var b=y[v].key,g=p[b];
if(g&&g.length)for(var k=0;k<g.length;k++){
var h=["[moonsafe]["+b+"][url]:"+location.href,"[moonsafe]["+b+"][src]:"+g[k],"[moonsafe]["+b+"][ua]:"+navigator.userAgent];
s(y[v].idkey,h);
}
}
}catch(q){
var R=3,h=["[moonsafe][observer][exception]:"+q];
s(R,h);
}
},!1);
});define("appmsg/fereport.js",["biz_wap/utils/wapsdk.js","biz_common/utils/http.js","appmsg/log.js","biz_common/base64.js","biz_wap/utils/jsmonitor_report.js"],function(e){
"use strict";
function i(){
var e=window.performance||window.msPerformance||window.webkitPerformance;
if(e&&e.timing){
var i,n=e.timing,o=0,r=0,u=window.location.protocol,p=Math.random(),_=1>2*p,c=1>25*p,l=1>100*p,g=1>250*p,f=1>1e3*p,v=1>1e4*p,S=!0;
"https:"==u?(o=18,r=27,S=!1):"http:"==u&&(o=9,r=19);
var B=window.__wxgspeeds||{};
if(B&&B.moonloadtime&&B.moonloadedtime){
var h=B.moonloadedtime-B.moonloadtime;
i=localStorage&&JSON.parse(localStorage.getItem("__WXLS__moonarg"))&&"fromls"==JSON.parse(localStorage.getItem("__WXLS__moonarg")).method?21:22,
s.saveSpeeds({
sample:21==i||22==i&&f?1:0,
uin:window.encodeURIComponent(a.toBase64(window.user_uin))||uin,
pid:o,
speeds:{
sid:i,
time:h
},
user_define:m
});
}
B&&B.mod_downloadtime&&s.saveSpeeds({
uin:window.encodeURIComponent(a.toBase64(window.user_uin))||uin,
pid:o,
speeds:{
sid:24,
time:B.mod_downloadtime
},
user_define:m
});
var b=n.domContentLoadedEventStart-n.navigationStart;
if(b>3e3&&(s.setBasicTime({
sample:l&&S||c&&!S?1:0,
uin:window.encodeURIComponent(a.toBase64(window.user_uin))||uin,
pid:r
}),w.setLogs({
id:28307,
key:28,
value:1,
lc:1,
log0:window.encodeURIComponent(location.href)
})),0==window.optimizing_flag?s.setBasicTime({
sample:f,
uin:window.encodeURIComponent(a.toBase64(window.user_uin))||uin,
pid:467
}):1==window.optimizing_flag?s.setBasicTime({
sample:l,
uin:window.encodeURIComponent(a.toBase64(window.user_uin))||uin,
pid:468
}):2==window.optimizing_flag&&s.setBasicTime({
sample:l,
uin:window.encodeURIComponent(a.toBase64(window.user_uin))||uin,
pid:469
}),s.setBasicTime({
sample:g&&S||l&&!S?1:0,
uin:window.encodeURIComponent(a.toBase64(window.user_uin))||uin,
pid:o
}),t.htmlSize){
var I=t.htmlSize/(n.responseEnd-n.connectStart);
s.saveSpeeds({
sample:f,
uin:window.encodeURIComponent(a.toBase64(window.user_uin))||uin,
pid:o,
speeds:{
sid:25,
time:Math.round(I)
},
user_define:m
});
}
if(B&&B.combo_times)for(var R=1;R<B.combo_times.length;R++)s.saveSpeeds({
sample:g,
uin:window.encodeURIComponent(a.toBase64(window.user_uin))||uin,
pid:o,
speeds:{
sid:26,
time:B.combo_times[R]-B.combo_times[R-1]
},
user_define:m
});
if(B&&B.mod_num){
var C=B.hit_num/B.mod_num;
s.saveSpeeds({
sample:g,
uin:window.encodeURIComponent(a.toBase64(window.user_uin))||uin,
pid:o,
speeds:[{
sid:27,
time:Math.round(100*C)
},{
sid:28,
time:Math.round(1e3*C)
}],
user_define:m
});
}
var U=window.logs.pagetime.jsapi_ready_time-n.navigationStart;
s.saveSpeeds(156==o||155==o?{
sample:_,
uin:window.encodeURIComponent(a.toBase64(window.user_uin))||uin,
pid:o,
speeds:{
sid:31,
time:U
},
user_define:m
}:{
sample:f,
uin:window.encodeURIComponent(a.toBase64(window.user_uin))||uin,
pid:o,
speeds:{
sid:31,
time:U
},
user_define:m
}),s.send(),window.setTimeout(function(){
window.__moonclientlog&&d("[moon] "+window.__moonclientlog.join(" ^^^ "));
},250),window.setTimeout(function(){
window.onBridgeReadyTime&&(i=window.WeixinJSBridge&&window.WeixinJSBridge._createdByScriptTag?33:32,
s.saveSpeeds({
sample:v,
uin:window.encodeURIComponent(a.toBase64(window.user_uin))||uin,
pid:o,
speeds:{
sid:i,
time:window.onBridgeReadyTime-n.navigationStart
},
user_define:m
}),s.send());
},5e3);
}
}
function n(e){
for(var i=[],n=new DataView(e),o=0;o<n.byteLength;o+=4){
var s=n.getUint32(o),t=s.toString(16),d="00000000",a=(d+t).slice(-d.length);
i.push(a);
}
return i.join("");
}
function o(e,i){
var o=new TextEncoder("utf-8").encode(e),s=crypto.subtle||crypto.webkitSubtle;
return s.digest(i,o).then(function(e){
return n(e);
});
}
var s=e("biz_wap/utils/wapsdk.js"),t=e("biz_common/utils/http.js"),d=e("appmsg/log.js"),a=e("biz_common/base64.js"),w=e("biz_wap/utils/jsmonitor_report.js"),m=a.toBase64(JSON.stringify({
scene:window.source,
sessionid:window.sessionid
}));
i(),function(){
try{
var e=Math.random(),i=window.localStorage,n=[],t=[];
for(var d in i)-1!=d.indexOf("__MOON__")&&window.moon_map[d.substr(8)]&&n.push(i[d]);
if(window.crypto){
var w="";
w=.5>e?"SHA-256":"SHA-1";
for(var r=(new Date).getTime(),u=0;u<n.length;u++)t.push(o(n[u],w));
Promise.all(t).then(function(){
var i=(new Date).getTime(),n=i-r;
s.saveSpeeds({
uin:window.encodeURIComponent(a.toBase64(window.user_uin))||uin,
pid:108,
speeds:{
sid:.5>e?21:23,
time:n
},
user_define:m
}),s.send();
});
}else s.saveSpeeds({
uin:window.encodeURIComponent(a.toBase64(window.user_uin))||uin,
pid:108,
speeds:{
sid:24,
time:1
},
user_define:m
}),s.send();
}catch(p){}
}();
});define("appmsg/fereport_without_localstorage.js",["biz_wap/utils/wapsdk.js","biz_common/utils/http.js","appmsg/log.js","biz_common/base64.js","biz_wap/utils/jsmonitor_report.js"],function(e){
"use strict";
function i(){
var e=window.performance||window.msPerformance||window.webkitPerformance;
if(e&&e.timing){
var i,m=e.timing,w=0,p=0,u=window.location.protocol,r=Math.random(),_=1>2*r,l=1>25*r,c=1>100*r,g=1>250*r,f=1>1e3*r,S=1>1e4*r,B=!0;
"https:"==u?(w=462,p=464,B=!1):"http:"==u&&(w=417,p=463);
var v=window.__wxgspeeds||{};
if(v&&v.moonloadtime&&v.moonloadedtime){
var I=v.moonloadedtime-v.moonloadtime;
i=localStorage&&JSON.parse(localStorage.getItem("__WXLS__moonarg"))&&"fromls"==JSON.parse(localStorage.getItem("__WXLS__moonarg")).method?21:22,
o.saveSpeeds({
sample:21==i||22==i&&f?1:0,
uin:window.encodeURIComponent(d.toBase64(window.user_uin))||uin,
pid:w,
speeds:{
sid:i,
time:I
},
user_define:a
});
}
v&&v.mod_downloadtime&&o.saveSpeeds({
uin:window.encodeURIComponent(d.toBase64(window.user_uin))||uin,
pid:w,
speeds:{
sid:24,
time:v.mod_downloadtime
},
user_define:a
});
var R=m.domContentLoadedEventStart-m.navigationStart;
if(R>3e3&&(o.setBasicTime({
sample:c&&B||l&&!B?1:0,
uin:window.encodeURIComponent(d.toBase64(window.user_uin))||uin,
pid:p
}),t.setLogs({
id:28307,
key:28,
value:1,
lc:1,
log0:encodeURIComponent(location.href)
})),0==window.optimizing_flag?o.setBasicTime({
sample:f,
uin:window.encodeURIComponent(d.toBase64(window.user_uin))||uin,
pid:473
}):1==window.optimizing_flag?o.setBasicTime({
sample:c,
uin:window.encodeURIComponent(d.toBase64(window.user_uin))||uin,
pid:474
}):2==window.optimizing_flag&&o.setBasicTime({
sample:c,
uin:window.encodeURIComponent(d.toBase64(window.user_uin))||uin,
pid:475
}),o.setBasicTime({
sample:g&&B||c&&!B?1:0,
uin:window.encodeURIComponent(d.toBase64(window.user_uin))||uin,
pid:w
}),n.htmlSize){
var b=n.htmlSize/(m.responseEnd-m.connectStart);
o.saveSpeeds({
sample:f,
uin:window.encodeURIComponent(d.toBase64(window.user_uin))||uin,
pid:w,
speeds:{
sid:25,
time:Math.round(b)
},
user_define:a
});
}
if(v&&v.combo_times)for(var h=1;h<v.combo_times.length;h++)o.saveSpeeds({
sample:g,
uin:window.encodeURIComponent(d.toBase64(window.user_uin))||uin,
pid:w,
speeds:{
sid:26,
time:v.combo_times[h]-v.combo_times[h-1]
},
user_define:a
});
if(v&&v.mod_num){
var j=v.hit_num/v.mod_num;
o.saveSpeeds({
sample:g,
uin:window.encodeURIComponent(d.toBase64(window.user_uin))||uin,
pid:w,
speeds:[{
sid:27,
time:Math.round(100*j)
},{
sid:28,
time:Math.round(1e3*j)
}],
user_define:a
});
}
var C=window.logs.pagetime.jsapi_ready_time-m.navigationStart;
o.saveSpeeds(156==w||155==w?{
sample:_,
uin:window.encodeURIComponent(d.toBase64(window.user_uin))||uin,
pid:w,
speeds:{
sid:31,
time:C
},
user_define:a
}:{
sample:f,
uin:window.encodeURIComponent(d.toBase64(window.user_uin))||uin,
pid:w,
speeds:{
sid:31,
time:C
},
user_define:a
}),o.send(),window.setTimeout(function(){
window.__moonclientlog&&s("[moon] "+window.__moonclientlog.join(" ^^^ "));
},250),window.setTimeout(function(){
window.onBridgeReadyTime&&(i=window.WeixinJSBridge&&window.WeixinJSBridge._createdByScriptTag?33:32,
o.saveSpeeds({
sample:S,
uin:window.encodeURIComponent(d.toBase64(window.user_uin))||uin,
pid:w,
speeds:{
sid:i,
time:window.onBridgeReadyTime-m.navigationStart
},
user_define:a
}),o.send());
},5e3);
}
}
var o=e("biz_wap/utils/wapsdk.js"),n=e("biz_common/utils/http.js"),s=e("appmsg/log.js"),d=e("biz_common/base64.js"),t=e("biz_wap/utils/jsmonitor_report.js"),a=d.toBase64(JSON.stringify({
scene:window.source,
sessionid:window.sessionid
}));
i();
});define("appmsg/report.js",["biz_common/dom/event.js","biz_wap/utils/ajax.js","common/utils.js","appmsg/cdn_img_lib.js","biz_wap/utils/mmversion.js","biz_common/utils/report.js","biz_wap/utils/jsmonitor_report.js"],function(e){
"use strict";
function t(){
var t=(e("biz_wap/utils/mmversion.js"),e("biz_common/utils/report.js"),e("biz_wap/utils/jsmonitor_report.js")),r=!1,s=window.performance||window.msPerformance||window.webkitPerformance;
return function(){
return;
}(),s&&s.timing&&s.timing.navigationStart?(r=s.timing.navigationStart,function(){
return;
}(),function(){
function e(){
if(-1==n.indexOf("NetType/"))return!1;
for(var e=["2G","cmwap","cmnet","uninet","uniwap","ctwap","ctnet"],t=0,i=e.length;i>t;++t)if(-1!=n.indexOf(e[t]))return!0;
return!1;
}
var i=window.performance&&window.performance.timing,a=write_sceen_time-r,s=first_sceen__time-r,d=page_endtime-r,g=(window.onload_endtime||+new Date)-r;
-1!=navigator.userAgent.indexOf("MicroMessenger")&&(a=real_show_page_time-r,s=real_show_page_time-r);
var m=window.logs.jsapi_ready_time?window.logs.jsapi_ready_time-r:void 0,p=window.logs.a8key_ready_time?window.logs.a8key_ready_time-r:void 0,w=i&&i.connectEnd-i.connectStart,c=i&&i.secureConnectionStart&&i.connectEnd-i.secureConnectionStart,u=i&&i.domainLookupEnd&&i.domainLookupStart&&i.domainLookupEnd-i.domainLookupStart;
if(window.logs.pagetime.wtime=a,window.logs.pagetime.ftime=s,window.logs.pagetime.ptime=d,
window.logs.pagetime.onload_time=g,window.logs.pagetime.jsapi_ready_time=m,window.logs.pagetime.a8key_ready_time=p,
need_report_cost?o({
url:"/mp/report_cost",
type:"post",
data:{
id_key_list:["1|1|"+d,"1|2|"+s,"1|3|"+g,"1|4|"+m,"1|5|"+p,"1|6|"+w,"1|7|"+c,"1|8|"+u].join(";")
}
}):Math.random()<.01&&o({
url:"/mp/report_cost",
type:"post",
data:{
id_key_list:["#1|1|"+d,"1|2|"+s,"1|3|"+g,"1|4|"+m,"1|5|"+p,"1|6|"+w,"1|7|"+c,"1|8|"+u].join(";")
}
}),need_report_cost&&s>3e3){
var _=new Image,l=(new Date).getTime();
_.onload=function(){
var e=(new Date).getTime()-l,t=(new Date).getTime(),i=new Image;
i.onload=function(){
var i=(new Date).getTime()-t;
o({
url:"/mp/report_cost",
type:"post",
data:{
id_key_list:["^2|1|"+e,"2|2|"+i].join(";")
}
});
},i.src="http://ugc.qpic.cn/adapt/0/7d8963bb-aace-df23-0569-f8a4e388eacb/100?r="+Math.random();
},_.src="http://ugc.qpic.cn/adapt/0/7d8963bb-aace-df23-0569-f8a4e388eacb/100?r="+Math.random();
}
if(!(Math.random()>.2||0>g||0>a||0>s||0>d)){
if(m&&t.setAvg(27822,15,m),p&&t.setAvg(27822,17,p),d>=15e3)return void t.setAvg(27822,29,d);
t.setAvg(27822,1,d).setAvg(27822,3,g).setAvg(27822,5,s),window.isWeixinCached&&t.setAvg(27822,19,d),
e()?(t.setAvg(27822,9,d),window.isWeixinCached&&t.setAvg(27822,23,d)):"wifi"==networkType?(t.setAvg(27822,7,d),
window.isWeixinCached&&t.setAvg(27822,21,d)):"2g/3g"==networkType?(t.setAvg(27822,11,d),
window.isWeixinCached&&t.setAvg(27822,25,d)):"4g"==networkType?(t.setAvg(27822,14,d),
window.isWeixinCached&&t.setAvg(27822,26,d)):(t.setAvg(27822,13,d),window.isWeixinCached&&t.setAvg(27822,28,d)),
window.moon&&moon.clearSample&&(t.setAvg(27822,71,d),e()?t.setAvg(27822,73,d):"wifi"==networkType?t.setAvg(27822,75,d):"2g/3g"==networkType?t.setAvg(27822,77,d):"4g"==networkType?t.setAvg(27822,78,d):t.setAvg(27822,79,d)),
w&&t.setAvg(27822,65,w),c&&t.setAvg(27822,67,c),u&&t.setAvg(27822,69,u);
}
}(),function(){
window.logs.jsapi_ready_fail&&t.setSum(24729,55,window.logs.jsapi_ready_fail);
}(),function(){
var e=document.getElementById("js_toobar3"),t=document.getElementById("page-content");
if(t&&!(Math.random()>.1)){
var n=function o(){
var n=window.pageYOffset||document.documentElement.scrollTop,r=e.offsetTop;
if(n+a.getInnerHeight()>=r){
for(var d,g,m=t.getElementsByTagName("img"),p={},w=[],c=0,u=0,_=0,l=0,f=m.length;f>l;++l){
var v=m[l];
d=v.getAttribute("data-src")||v.getAttribute("src"),g=v.getAttribute("src"),d&&(d.isCDN()?u++:_++,
c++,p[g]={});
}
if(w.push("1="+1e3*c),w.push("2="+1e3*u),w.push("3="+1e3*_),s.getEntries){
var y=s.getEntries(),h=window.logs.img.download,k=[0,0,0],A=[0,0,0];
c=u=0;
for(var l=0,j=y.length;j>l;++l){
var T=y[l],b=T.name;
b&&"img"==T.initiatorType&&p[b]&&(b.isCDN()&&(A[0]+=T.duration,u++),k[0]+=T.duration,
c++,p[b]={
startTime:T.startTime,
responseEnd:T.responseEnd
});
}
k[0]>0&&c>0&&(k[2]=k[0]/c),A[0]>0&&u>0&&(A[2]=A[0]/u);
for(var l in h)if(h.hasOwnProperty(l)){
for(var M=h[l],x=0,E=0,C=0,z=0,S=0,f=M.length;f>S;++S){
var d=M[S];
if(p[d]&&p[d].startTime&&p[d].responseEnd){
var D=p[d].startTime,I=p[d].responseEnd;
x=Math.max(x,I),E=E?Math.min(E,D):D,d.isCDN()&&(C=Math.max(x,I),z=E?Math.min(E,D):D);
}
}
k[1]+=Math.round(x-E),A[1]+=Math.round(C-z);
}
for(var W=4,N=7,l=0;3>l;l++)k[l]=Math.round(k[l]),A[l]=Math.round(A[l]),k[l]>0&&(w.push(W+l+"="+k[l]),
"wifi"==networkType?w.push(W+l+6+"="+k[l]):("2g/3g"==networkType||"4g"==networkType)&&w.push(W+l+12+"="+k[l])),
A[l]>0&&(w.push(N+l+"="+A[l]),"wifi"==networkType?w.push(N+l+6+"="+A[l]):("2g/3g"==networkType||"4g"==networkType)&&w.push(N+l+12+"="+A[l]));
}
i.off(window,"scroll",o,!1);
}
};
i.on(window,"scroll",n,!1);
}
}(),void function(){
if(!(Math.random()>.001)){
var e=document.createElement("iframe"),t=[600,800,1e3,1200,1500,2e3,3e3,5e3,1e4,18e3],i=Math.ceil(10*Math.random())-1,n=uin+mid+idx+Math.ceil(1e3*Math.random())+(new Date).getTime();
e.style.display="none",e.id="js_ajax",e.setAttribute("data-time",i),e.src="/mp/iframetest?action=page&traceid="+n+"&devicetype="+devicetype+"&timeout="+t[i];
var o=document.getElementById("js_article");
o.appendChild(e);
}
}()):!1;
}
var i=e("biz_common/dom/event.js"),n=navigator.userAgent,o=e("biz_wap/utils/ajax.js"),a=e("common/utils.js");
e("appmsg/cdn_img_lib.js"),i.on(window,"load",function(){
if(""==networkType&&window.isInWeixinApp()){
var e={
"network_type:fail":"fail",
"network_type:edge":"2g/3g",
"network_type:wwan":"2g/3g",
"network_type:wifi":"wifi"
};
JSAPI.invoke("getNetworkType",{},function(i){
networkType=e[i.err_msg],("network_type:edge"==i.err_msg||"network_type:wwan"==i.err_msg)&&(i.detailtype&&"4g"==i.detailtype||i.subtype&&"4g"==i.subtype)&&(networkType="4g"),
t();
});
}else t();
},!1);
});