
function getBackgroundId(s) {
    return '#P' + s + '-img';
}

function getTextGroundId(s) {
    return '#P' + s + '-text';
}

function changeCorrectAnswerColor(correct) {
    var txtName = getTextGroundId(correct);
    var txt = $(txtName)[0];

    $(txt).addClass(' correct-answer ')
}

function showFlag() {
    $($('#flag')[0]).removeClass('hidden')
}

function showCorrectResult() {
    $($('#correctResult')[0]).removeClass('hidden')
}

function showWaResult() {
    $($('#errorResult')[0]).removeClass('hidden');
    $($('#errorText')[0]).removeClass('hidden');
}

function jump2next() {
    window.location = '/participant/problem?name=' + commonInfo.next + '&correct=' + commonInfo.correctNum;
}

function clickChoices(s) {
    if (commonInfo.isAnswered) {
        jump2next();
        return;
    }

    commonInfo.isAnswered = true;
    var bgName = getBackgroundId(s);
    var bg = $(bgName)[0];
    bg.src = '/static/normal.png';

    var textName = getTextGroundId(s);
    var text = $($(textName)[0]);
    if (s !== commonInfo.correctAnswer) {
        text.addClass(' failed-answer ');
        showWaResult();
    } else {
        commonInfo.correctNum += 1;
        showCorrectResult();
    }

    changeCorrectAnswerColor(commonInfo.correctAnswer);
    showFlag();
}
var clickCount = 0;
$('body').click(function() {
    if (clickCount > 0 && commonInfo.isAnswered) {
        jump2next();
    }
    clickCount += 1;
});

//$('#PAText')[0].outerText = choiceTextMap['A'];

