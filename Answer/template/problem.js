
function getBackgroundId(s) {
    return '#P' + s + '-img';
}

function getTextGroundId(s) {
    return '#P' + s + '-text';
}

function clickChoices(s) {
    var bgName = getBackgroundId(s);
    var bg = $(bgName)[0];
//    $(bg)[0].src = 'normal.png';
    //sleep?
    bg.src = '/static/normal.png';

    var textName = getTextGroundId(s);
    var text = $(textName)[0];
    if (s === correctAnswer) {
        ;
    } else {

    }
}



//$('#PAText')[0].outerText = choiceTextMap['A'];

