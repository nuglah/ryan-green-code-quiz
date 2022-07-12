var highScores = document.querySelector("#high-scores");
var backButton = document.querySelector("#back");
var clearButton = document.querySelector("#clear");

// turns scores back into object so they can be sorted
var scores = JSON.parse(localStorage.getItem("scores")) || [];

// Sorts the scores so they appear in descending order on the scores.html and appends them to the page
let sortedScores = scores.sort((a, b) => (a.score > b.score ? -1 : 1));
for (var i = 0; i < sortedScores.length; i++) {
  var p = document.createElement("p");
  p.innerText = `${i + 1} - ${sortedScores[i].initials} - ${
    sortedScores[i].score
  }`;
  highScores.appendChild(p);
}

// Goes back to quiz
backButton.addEventListener("click", function (event) {
  event.preventDefault();
  window.open("../../index.html", "_self");
});

// Clears local stoarge and scores don't display on page
clearButton.addEventListener("click", function (event) {
  event.preventDefault();
  localStorage.removeItem("scores");
  highScores.style.display = "none";
});
