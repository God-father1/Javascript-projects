var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;
// if we click on start button
document.getElementById('startreset').onclick = function () {
    // if playing 
    if (playing == true) {
        location.reload();
    }
    else if (playing == false) {
        playing = true;
        score = 0;
        document.getElementById('scorevalue').innerHTML = score;
        show('timeremaining');
        timeremaining = 60;
        hide('gameover');
        document.getElementById('timeremainingvalue').innerHTML = timeremaining;
        document.getElementById('startreset').innerHTML = "Reset Game";
        // start countdown
        startcountdown();
        generateQA();
        // generate a question and multiple option

    }
}

for(var i =1; i<5; i++){
    document.getElementById('box' + i).onclick = function () {
        if (playing == true) {
            if (this.innerHTML == correctAnswer) {
                score++;
                document.getElementById('scorevalue').innerHTML = score;
                hide('wrong');
                show('correct');
                setTimeout(function () { hide('correct'); }, 1000);
                generateQA();
            }
            else {
                hide('correct');
                show('wrong');
                setTimeout(function () { hide('wrong'); }, 1000);
            }
        }
    };
}

// document.getElementById('box2').onclick = function () {
//     if (playing == true) {
//         if (this.innerHTML == correctAnswer) {
//             score++;
//             document.getElementById('scorevalue').innerHTML = score;
//             hide('wrong');
//             show('correct');
//             setTimeout(function () { hide('correct'); }, 1000);
//             generateQA();
//         }
//         else {
//             hide('correct');
//             show('wrong');
//             setTimeout(function () { hide('wrong'); }, 1000);
//         }
//     }
// };
// document.getElementById('box3').onclick = function () {
//     if (playing == true) {
//         if (this.innerHTML == correctAnswer) {
//             score++;
//             document.getElementById('scorevalue').innerHTML = score;
//             hide('wrong');
//             show('correct');
//             setTimeout(function () { hide('correct'); }, 1000);
//             generateQA();
//         }
//         else {
//             hide('correct');
//             show('wrong');
//             setTimeout(function () { hide('wrong'); }, 1000);
//         }
//     }
// };
// document.getElementById('box4').onclick = function () {
//     if (playing == true) {
//         if (this.innerHTML == correctAnswer) {
//             score++;
//             document.getElementById('scorevalue').innerHTML = score;
//             hide('wrong');
//             show('correct');
//             setTimeout(function () { hide('correct'); }, 1000);
//             generateQA();
//         }
//         else {
//             hide('correct');
//             show('wrong');
//             setTimeout(function () { hide('wrong'); }, 1000);
//         }
//     }
// };

// if playing 
// reload page
// if not playing
// set score to 0
// show countdown box
// reduce time by 1 sec

// loop
// timeleft? 
// yes continue
// : no game over

// change button to reset
// generate new question and answers

// if we click on answer box
// if we are playing
// correct?
// yes 
// increase score by 1
// show correct box for 1 sec
// generate new QA
// no
// show error box for 1sec

function startcountdown() {
    action = setInterval(function () {
        timeremaining--;
        document.getElementById('timeremainingvalue').innerHTML = timeremaining;
        if (timeremaining == 0) {
            stopcountdown();
            show('gameover');
            score = document.getElementById('scorevalue').innerHTML;
            document.getElementById('gameover').innerHTML = "<p>Game Over</p><p>Your score is " + score + ".</p>";
            hide('timeremaining');
            hide('correct');
            hide('wrong');
            playing = false;
            document.getElementById('startreset').innerHTML = "Start Game";
        }
    }, 1000);
}
function stopcountdown() {
    clearInterval(action);
}

function hide(id) {
    document.getElementById(id).style.display = 'none';
}
function show(id) {
    document.getElementById(id).style.display = 'block';
}

function generateQA() {
    var x = Math.round(Math.random() * 99) + 1;
    var y = Math.round(Math.random() * 99) + 1;
    correctAnswer = x * y;
    document.getElementById('question').innerHTML = x + 'x' + y;
    correctPosition = Math.round(Math.random() * 3) + 1;
    document.getElementById('box' + correctPosition).innerHTML = correctAnswer;
    var answers = [correctAnswer];
    for (var i = 1; i < 5; i++) {
        if (i == correctPosition) {
            continue;
        }
        else {
            var wronganswer;
            do {
                wronganswer = (1 + Math.round(Math.random() * 99)) * (1 + Math.round(Math.random() * 99));
            } while (answers.indexOf(wronganswer) > -1);
            document.getElementById('box' + i).innerHTML = wronganswer;
            answers.push(wronganswer);

        }
    }
}