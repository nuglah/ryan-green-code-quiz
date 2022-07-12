var timerEl = document.getElementById("timer");
var timeInterval;
var startQuizBtn = document.getElementById("start-button");
var quiz = document.querySelector("#quiz");
var score = 0;
var timeLeft = 70;
var scoreDiv = document.getElementById("score-container");
var submitButton = document.getElementById("submit-button");
var hasClick = false;
var playAgain = document.getElementById("play-again");
var answer = "";

// Shows your current score when time runs out or all questions answered
function showScore() {
  document.getElementById("final-score").innerText = "Your score is " + score;
}

// Function for the countdown. Shows the score when the timer runs out
function countdown() {
  timeInterval = setInterval(function () {
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
      showScore();
    }
  }, 1000);
}

// This builds the actual quiz and creates questions and buttons for the answers to be clicked on
function renderQuiz(questionNumber) {
  console.log("run");
  //   var question = questions[questionNumber].questionText;
  answer = questions[questionNumber].answer;
  var displayWordElement = document.createElement("h3");
  var button1 = document.createElement("button");
  var button2 = document.createElement("button");
  var button3 = document.createElement("button");
  var button4 = document.createElement("button");

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
  //  this event listener will increase the score or decrease time based on if the answer is correct. It will also trigger the next question and remove the previous one.
  if (!hasClick) {
    hasClick = true;
    quiz.addEventListener("click", function (event) {
      event.preventDefault();
      if (event.target.innerText === answer) {
        //increment score
        console.log("increment score");
        score++;
      } else {
        console.log("reduce time");
        console.log("innerText ", event.target.innerText);
        console.log("answer ", answer);
        console.log("questionNumber ", questionNumber);
        timeLeft -= 5;
      }
      // advances to the next question in question array
      questionNumber++;
      if (questionNumber < questions.length) {
        console.log("true");
        quiz.innerHTML = "";
        renderQuiz(questionNumber);
      } else {
        clearInterval(timeInterval);
        scoreDiv.style.display = "block";
        quiz.innerHTML = "";
        showScore();
      }
    });
  }
}

// Starts the quiz function when start button is clicked on and starts the countdown
startQuizBtn.addEventListener("click", function (event) {
  event.preventDefault();
  countdown();
  renderQuiz(0);
  var x = document.getElementById("start-quiz");
  x.style.display = "none";
});

// The submit button you click that takes the intials and score and puts them in local storage. opens scores.html where the scores are displayed.
submitButton.addEventListener("click", function (event) {
  event.preventDefault();
  let scores = JSON.parse(localStorage.getItem("scores")) || [];

  const fname = document.getElementById("fname");
  const initials = fname.value;

  scores.push({ initials: initials, score: score });
  localStorage.setItem("scores", JSON.stringify(scores));
  window.open("ryan-green-code-quiz/scores.html", "_self");
});

playAgain.addEventListener("click", function (event) {
  event.preventDefault();
  window.open("index.html", "_self");
});
