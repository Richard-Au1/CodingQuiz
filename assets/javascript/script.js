var questions = [
{

    prompt: "Which language is a coding language?",
    options: ["<javascript>", "<japanese>", "<penguin>", "<English>"],
    answer: "<javascript>"
},


{
    prompt: "How do you call a function?",
    options: ["function[]", "function()", "#function", ".function"],
    answer: "function()"
},


{
    prompt: "What is main in this example? (<main class= 'header'> ",
    options: ["element", "class", "header", "parameter"],
    answer: "element"
},


{
    prompt: "In JavaScript, which of the following is a OR operator?",
    options: ["||", "&&", "%", "/"],
    answer: "||"
},


{
    prompt: "A named element in a JavaScript program that is used to store information into a list is called: ",
    options: ["duck", "number", "array", "boolean"],
    answer: "array"
}];



var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#timer");
var choicesEl = document.querySelector("#options");
var submitBtn = document.querySelector("#submit-score");
var startBtn = document.querySelector("#start");
var nameEl = document.querySelector("#name");
var fbEl = document.querySelector("#fb");
var reStartBtn = document.querySelector("#restart");

var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

function quizStart() {
    timerId = setInterval(clockTick, 1000);
    timerEl.textContent = time;
    var introductionScreenEl = document.getElementById("start-screen");
    introductionScreenEl.setAttribute("class", "hide");
    questionsEl.removeAttribute("class");
    getQuestion();
}

function getQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
  var promptEl = document.getElementById("question-words")
    promptEl.textContent = currentQuestion.prompt;
    choicesEl.innerHTML = "";
    currentQuestion.options.forEach(function(choice, i) {
        var choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("value", choice);
        choiceBtn.textContent = i + 1 + ". " + choice;
        choiceBtn.onclick = questionClick;
        choicesEl.appendChild(choiceBtn);
    });
}

function questionClick() {
    if (this.value !== questions[currentQuestionIndex].answer) {
      time -= 10;
      if (time < 0) {
        time = 0;
      }
      timerEl.textContent = time;
      fbEl.textContent = `Incorrect, the correct answer was ${questions[currentQuestionIndex].answer}.`;
      fbEl.style.color = "red";
    } else {
      fbEl.textContent = "Correct! Next question";
      fbEl.style.color = "green";
    }
    fbEl.setAttribute("class", "fb");
    setTimeout(function() {
      fbEl.setAttribute("class", "fb hide");
    }, 2000);
    currentQuestionIndex++;
    if (currentQuestionIndex === questions.length) {
      quizEnd();
    } else {
      getQuestion();
    }
}

function quizEnd() {
    clearInterval(timerId);
    var endScreenEl = document.getElementById("quiz-end");
    endScreenEl.removeAttribute("class");
    var finalScoreEl = document.getElementById("score-final");
    finalScoreEl.textContent = time;
    questionsEl.setAttribute("class", "hide");
}

function clockTick() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
      quizEnd();
    }
}

function saveHighscore() {
    var name = nameEl.value.trim();
    if (name !== "") {
      var highscores =
        JSON.parse(window.localStorage.getItem("highscores")) || [];
      var newScore = {
        score: time,
        name: name
      };
      highscores.push(newScore);
      window.localStorage.setItem("highscores", JSON.stringify(highscores));
    }
}

function checkForEnter(event) {
    if (event.key === "Enter") {
        saveHighscore();
    }
}


nameEl.onkeyup = checkForEnter;

submitBtn.onclick = saveHighscore;

startBtn.onclick = quizStart;