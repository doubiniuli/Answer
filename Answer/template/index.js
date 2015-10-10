/**
 * Created by zhangyunfan on 15-10-4.
 */

$('body').click(function(e) {
    var img = $('body')[0];
    var x = e.pageX;
    var y = e.pageY;
    console.log(e.pageX/img.clientX + ' ' + e.pageY/img.clientY)
});

