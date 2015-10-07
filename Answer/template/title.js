
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

function isShareButton(x, y) {
    return ptInRect(x, y, shareLeft, shareTop, shareRight, shareBottom);
}

$('body').click(function (e) {
    var img = $('body')[0];
    var width = img.clientWidth;
    var height = img.clientHeight;
    var x = e.pageX / width;
    var y = e.pageY / height;

    if (isAcceptButton(x, y)) {
        window.location.href="/static/submit.html";
    } else if (isShareButton(x, y)) {
    }
});

var appId = "wx6ee8795bbaee6f5d";
var url = document.location.href;
var title = "赛道学霸挑战赛，你想参与吗？";
var desc = "";
var link = "http://www.zhaopg.com/Public/images/11.png";
var imgUrl = "http://www.zhaopg.com/Public/images/11.png";


$.ajax({
	type: 'GET',
	url: 'http://test.agenda-bj.com.cn:8082/api/GetJsShareScript?appid=' + appid + '&url=' + encodeURIComponent(url),
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

wx.config({
    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: appId, // 必填，公众号的唯一标识
    timestamp: "1444234760", // 必填，生成签名的时间戳
    nonceStr: "PgVVTUUZHNmcqkg", // 必填，生成签名的随机串
    signature: "d3d25493007fab98b32e137ecb227ffc3c04f482",// 必填，签名，见附录1
    jsApiList: [
        'checkJsApi',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'hideMenuItems',
        'showMenuItems'
    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
});

wx.error(function (e) {
    console.log("log...");
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
