
var appid = "wx6ee8795bbaee6f5d";
//var appid = "wx704bcfcf388ec118";
var url = document.location.href;
var titleFinal = title;
var desc = "";
var link = "http://tramps.yaohehe.com/static/index.html";
var imgUrl = "http://tramps.yaohehe.com/static/small-img/index.jpg";


$.ajax({
	type: 'GET',
	url: '/participant/weixin?app_id=' + appid + '&url=' + encodeURIComponent(url),
	dataType: 'jsonp',
	success: function (data) {
		console.log(data);
		wx.config({
			debug: false,
			appId: appid,
			timestamp: data.timestamp,
			nonceStr: data.noncestr,
			signature: data.signature,
			jsApiList: [
				'checkJsApi',
				'onMenuShareTimeline',
				'onMenuShareAppMessage',
				'onMenuShareQQ',
				'onMenuShareWeibo',
				'hideMenuItems',
				'showMenuItems'
			]
		});
	}
})

wx.ready(function(){

wx.onMenuShareTimeline({
    title: titleFinal, // 分享标题
    link: link, // 分享链接
    imgUrl: imgUrl, // 分享图标
    success: function () {
        // 用户确认分享后执行的回调函数
    },
    cancel: function () {
        // 用户取消分享后执行的回调函数
    }
});

wx.onMenuShareAppMessage({
    title: titleFinal, // 分享标题
    desc: desc, // 分享描述
    link: link, // 分享链接
    imgUrl: imgUrl, // 分享图标
    type: '', // 分享类型,music、video或link，不填默认为link
    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
    success: function () {
        // 用户确认分享后执行的回调函数
    },
    cancel: function () {
        // 用户取消分享后执行的回调函数
    }
});

wx.onMenuShareQQ({
    title: titleFinal, // 分享标题
    desc: desc, // 分享描述
    link: link, // 分享链接
    imgUrl: imgUrl, // 分享图标
    success: function () {
       // 用户确认分享后执行的回调函数
    },
    cancel: function () {
       // 用户取消分享后执行的回调函数
    }
});


wx.onMenuShareWeibo({
    title: titleFinal, // 分享标题
    desc: desc, // 分享描述
    link: link, // 分享链接
    imgUrl: imgUrl, // 分享图标
    success: function () {
       // 用户确认分享后执行的回调函数
    },
    cancel: function () {
        // 用户取消分享后执行的回调函数
    }
});

wx.onMenuShareQZone({
    title: titleFinal, // 分享标题
    desc: desc, // 分享描述
    link: link, // 分享链接
    imgUrl: imgUrl, // 分享图标
    success: function () {
       // 用户确认分享后执行的回调函数
    },
    cancel: function () {
        // 用户取消分享后执行的回调函数
    }
});
});
