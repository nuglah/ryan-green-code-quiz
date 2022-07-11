var timerEl = document.getElementById("timer");
var startQuizBtn = document.getElementById("start-button");
var quiz = document.querySelector("#quiz");
var score = 0;
var timeLeft = 10;
var scoreDiv = document.getElementById("score-container");
var submitButton = document.getElementById("submit-button");

function countdown() {
  var timeInterval = setInterval(function () {
    if (timeLeft > 1) {
      timerEl.textContent = "Time: " + timeLeft;
      timeLeft--;
    } else if (timeLeft === 1) {
      timerEl.textContent = "Time: " + timeLeft;
      timeLeft--;
    } else {
      (timerEl.textContent = "Time is up"), clearInterval(timeInterval);
      scoreDiv.style.display = "block";
      quiz.innerHTML = "";
    }
  }, 1000);
}

function renderQuiz(questionNumber) {
  var question = questions[questionNumber].questionText;
  var answer = questions[questionNumber].answer;
  var displayWordElement = document.createElement("h3");
  var button1 = document.createElement("button");
  var button2 = document.createElement("button");
  var button3 = document.createElement("button");
  var button4 = document.createElement("button");

  //   displayWordElement.innerHTML = questions[0];

  //   button1.innerHTML = questions[0].choices[0];

  //   button2.innerHTML = questions[0].choices[1];

  //   button3.innerHTML = questions[0].choices[2];
  //   quiz.appendChild(displayWordElement);
  //   quiz.appendChild(button1);
  //   quiz.appendChild(button2);
  //   quiz.appendChild(button3);

  //   for (var i = 0; i < questions.length; i++) {
  //     // questions[i].appe()
  //   }

  displayWordElement.textContent = questions[questionNumber].questionText;
  button1.textContent = questions[questionNumber].choices[0];
  button2.textContent = questions[questionNumber].choices[1];
  button3.textContent = questions[questionNumber].choices[2];
  button4.textContent = questions[questionNumber].choices[3];
  quiz.appendChild(displayWordElement);
  quiz.appendChild(button1);
  quiz.appendChild(button2);
  quiz.appendChild(button3);
  quiz.appendChild(button4);

  quiz.addEventListener("click", function (event) {
    event.preventDefault();
    if (event.target.innerText === answer) {
      //increment score
      score++;
    } else {
      timeLeft -= 5;
    }
    questionNumber++;
    if (questionNumber < questions.length) {
      /* quiz.removeChild(displayWordElement);
      quiz.removeChild(button1);
      quiz.removeChild(button2);
      quiz.removeChild(button3);
      quiz.removeChild(button4); */

      quiz.innerHTML = "";

      renderQuiz(questionNumber);
    } else {
      // I am done show results write score to localstorage
    }
  });
}

function showScore() {
  var displayScore = document.createElement("h3");

  displayScore.textContent = "Score";
}

startQuizBtn.addEventListener("click", function (event) {
  event.preventDefault();
  countdown();
  renderQuiz(0);
  var x = document.getElementById("start-quiz");
  x.style.display = "none";
});

submitButton.addEventListener("click", function (event) {
  event.preventDefault();
  let scores = JSON.parse(localStorage.getItem("scores")) || [];
  let sortedScores = scores.sort((a, b) => (a.score > b.score ? -1 : 1));
  const fname = document.getElementById("fname");
  const initials = fname.value;

  scores.push({ initials: initials, score: score });
  localStorage.setItem("scores", JSON.stringify(scores));
  window.open("../../scores.html", "_self");
});
