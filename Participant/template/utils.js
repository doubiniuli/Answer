/**
 * Created by lijun on 10/4/15.
 */

var submitLeft = 0.32;
var submitTop = 0.685;

var submitRight = 0.676;
var submitBottom = 0.74;

function ptInRect(x, y, left, top, right, bottom) {
    return (x >= left && x <= right && y >= top && y <= bottom);
}

$('body').click(function(e) {
    var img = $('body')[0];
    var width = img.clientWidth;
    var height = img.clientHeight;
    var x = e.pageX;
    var y = e.pageY;

    if (ptInRect(x / width, y / height, submitLeft, submitTop, submitRight, submitBottom)) {
        console.log("fuck you clicked in");
        $('user_info').submit();
        window.open("http://www.baidu.com", );
    }
});


