var problem_list = ["orenoyumehasubeteFacebookdekanaeteikukara",
    "morihirokigaitakedo、oobayashinoshigotoppuriwomecchiyahometeta",
    "minagenyasutairuninatteikuna",
    "jidaigaorenioitsuitekita。。。",
    "kabukahamadamadasagaru"
];
var problem_list_kana = ["俺の夢は全てFacebookで叶えていくから",
    "森ひろきがいたけど、大林の仕事っぷりをメッチャ褒めてた",
    "皆原野スタイルになっていくな",
    "時代が俺に追いついてきた。。。",
    "株価はまだまだ下がる"
];
var num = Math.round(Math.random() * (problem_list.length - 1));
var QUESTION = problem_list[num];
var kana = problem_list_kana[num];
var p = document.getElementById('kana');
p.innerHTML = kana;
console.log(kana);
var types = QUESTION.split('').map(function(str) {
    var type = document.createElement('span');
    type.className = 'type';
    type.textContent = str;
    document.querySelector('.container').appendChild(type);

    return type;
});

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
                timerEnd();
            }
        } else {
            next.classList.add('ng');
        }
    }
});