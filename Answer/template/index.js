/**
 * Created by zhangyunfan on 15-10-4.
 */

$('body').click(function(e) {
    var img = $('img')[0];
    var x = e.pageX;
    var y = e.pageY;
    console.log(e.pageX/img.width + ' ' + e.pageY/img.height)
});

