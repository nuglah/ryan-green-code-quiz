var timerEl = document.getElementById("timer");
var startQuizBtn = document.getElementById("start-button");
var quiz = document.querySelector("#quiz");

function countdown() {
  var timeLeft = 20;

  var timeInterval = setInterval(function () {
    var x = document.getElementById("start-quiz");
    x.style.display = "none";
    if (timeLeft > 1) {
      timerEl.textContent = "Time: " + timeLeft;
      timeLeft--;
    } else if (timeLeft === 1) {
      timerEl.textContent = "Time: " + timeLeft;
      timeLeft--;
    } else {
      timerEl.textContent = "";
      clearInterval(timeInterval);
    }
  }, 1000);
}

function renderQuiz(questionNumber) {
  var question = questions[questionNumber].questionText;
  var answer = questions[questionNumber].answer;
  var displayWordElement = document.createElement("h3");
  var button1 = document.createElement("button");

  displayWordElement.textContent = question;
  button1.textContent = questions[questionNumber].choices[0];
  quiz.appendChild(displayWordElement);
  quiz.appendChild(button1);

  quiz.addEventListener("click", function (event) {
    event.preventDefault();
    if (event.target.innerText === answer) {
      //increment score
    }
    questionNumber++;
    if (questionNumber < questions.length) {
      renderQuiz(questionNumber);
    } else {
      // I am done show results write score to localstorage
    }
  });
}

startQuizBtn.addEventListener("click", function (event) {
  event.preventDefault();
  //check local storage for scores and sort score to get highest
  countdown();
  renderQuiz(0);
});
