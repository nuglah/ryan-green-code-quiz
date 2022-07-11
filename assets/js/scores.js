var highScores = document.querySelector("#high-scores");
var backButton = document.querySelector("#back");
var clearButton = document.querySelector("#clear");
var scores = JSON.parse(localStorage.getItem("scores")) || [];
let sortedScores = scores.sort((a, b) => (a.score > b.score ? -1 : 1));
for (var i = 0; i < sortedScores.length; i++) {
  var p = document.createElement("p");
  p.innerText = `${i + 1} - ${sortedScores[i].initials} - ${
    sortedScores[i].score
  }`;
  highScores.appendChild(p);
}

backButton.addEventListener("click", function (event) {
  event.preventDefault();
  window.open("../../index.html", "_self");
});

clearButton.addEventListener("click", function (event) {
  event.preventDefault();
  localStorage.removeItem("scores");
  highScores.style.display = "none";
});
