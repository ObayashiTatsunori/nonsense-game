var problem_list = ["aaaaaaaaaa", "bbbbbbb", "cccccccc", "ddddddddd", "eeeeeeeeeee"];
var num = Math.round(Math.random() * (problem_list.length - 1));
var QUESTION = problem_list[num];
console.log(num);
var types = QUESTION.split('').map(function(str) {
    var type = document.createElement('span');
    type.className = 'type';
    type.textContent = str;
    document.querySelector('.container').appendChild(type);
    return type;
});
// 追記 ココカラ
var timer = null;
var startTime = 0;

function timerStart() {
    startTime = new Date().getTime();
    timer = setInterval(function() {
        var time = (new Date().getTime() - startTime) / 1000;
        document.querySelector('.timer').textContent = time.toFixed(3);
    }, 10);
}

function timerEnd() {
    // var maxscore = 0;
    // if (maxscore > timer) {
    //     maxscore = timer;
    // }
    // document.querySelector('.maxscore').textContent = maxscore.toFixed(3);
    clearInterval(timer);
    timer = null;
}

document.addEventListener('keydown', function(event) {
    var keyCode = event.keyCode;
    if (keyCode === 13) { // enter key
        // XXX: implement retry
        return;
    }

    var key = '';
    if (keyCode === 32) { // space key
        key = ' ';
    }

    if (keyCode >= 65 && keyCode <= 90) { // a to z
        key = String.fromCharCode(keyCode);
        if (event.shiftKey) {
            key = key.toUpperCase();
        } else {
            key = key.toLowerCase();
        }
    }

    if (key) {
        if (timer === null) {
            timerStart();
        }
        var next = types[0];
        if (next.textContent === key) {
            next.classList.add('ok');
            types.shift();
            if (types.length === 0) {
                timerEnd(); // 変更
            }
        } else {
            next.classList.add('ng');
        }
    }
});