
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

