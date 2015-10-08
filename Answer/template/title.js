
var acceptLeft = 0.09;
var acceptTop = 0.73;
var acceptRight = 0.45;
var acceptBottom = 0.79;


function isAcceptButton(x, y) {
    return ptInRect(x, y, acceptLeft, acceptTop, acceptRight, acceptBottom);
}


var shareLeft = 0.55;
var shareTop = 0.73;
var shareRight = 0.91;
var shareBottom = 0.79;
var showSharePng = false;

function isShareButton(x, y) {
    return ptInRect(x, y, shareLeft, shareTop, shareRight, shareBottom);
}

$('body').click(function (e) {
    var img = $('body')[0];
    var width = img.clientWidth;
    var height = img.clientHeight;
    var x = e.pageX / width;
    var y = e.pageY / height;

    if (showSharePng) {
        showSharePng = false;
        $($("#share_jpg")[0]).addClass("hidden")
        return
    }

    if (isAcceptButton(x, y)) {
        window.location.href="/static/submit.html";
    } else if (isShareButton(x, y)) {
        if (!showSharePng) {
            showSharePng = true;
            $($("#share_jpg")[0]).removeClass("hidden")
        }
    }
});

var appid = "wx6ee8795bbaee6f5d";
var url = document.location.href;
var title = "赛道学霸挑战赛，你想参与吗？";
var desc = "";
var link = "http://www.zhaopg.com/static/index.html";
var imgUrl = "http://www.zhaopg.com/static/small-img/index.jpg";


$.ajax({
	type: 'GET',
	url: '/participant/weixin?appid=' + appid + '&url=' + encodeURIComponent(url),
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
    title: title, // 分享标题
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
    title: title, // 分享标题
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
    title: title, // 分享标题
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
    title: title, // 分享标题
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
    title: title, // 分享标题
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
