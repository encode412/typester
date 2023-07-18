const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const user = document.getElementById("user");
const difficultySelect = document.getElementById("difficulty");

// Words
const words = [
  "timothy",
  "encode",
  "education",
  "international",
  "omniman",
  "jasmine",
  "jasper",
  "jonathan",
  "diamond",
];
let scoress = [];
// Random Word
let randomWord;

// Init score
let score = 0;

// Set time
let time = 10;

// Set difficulty
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

//Set difficulty
difficultySelect.value =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

text.focus();

// Generate random word from array
function getRandomword() {
  return words[Math.floor(Math.random() * words.length)];
}

// Add word to DOM
function addWordToDom() {
  randomWord = getRandomword();
  word.innerHTML = randomWord;
}

// Update score
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}
//Update time
function updateTime() {
  time--;
  timeEl.innerHTML = time + "s";

  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
}
//End game
function gameOver() {
  endgameEl.innerHTML = `
<h1>Time ran out</h1>
<p>Your final score is ${score}</p>
<div style="display: flex;">
<button onclick = "location.reload()">Reload</button>
<button onclick = "checkScores()">Check scores</button>
</div>
`;
  endgameEl.style.display = "flex";
  localStorage.setItem("score", score);
}

function checkScores() {
  let userName = localStorage.getItem("user");
  console.log(userName);
}
// Start timer
const timeInterval = setInterval(updateTime, 1000);

addWordToDom();

// Event Listeners

text.addEventListener("input", (e) => {
  let insertedText = e.target.value;

  if (insertedText === randomWord) {
    addWordToDom();
    updateScore();
    //Clear word
    e.target.value = "";

    if (difficulty === "hard") {
      time += 2;
    } else if (difficulty === "medium") {
      time += 3;
    } else if (difficulty === "sage") {
      time += 1;
    } else {
      time += 4;
    }

    updateTime();
  }
});

window.onload = () => {
  let name = localStorage.getItem("user");
  console.log(name);
  // set user name
  if (
    localStorage.getItem("user") != undefined ||
    localStorage.getItem("user") !== null
  ) {
    user.innerHTML = `${name}`;
  }
};

// Settings btn
settingsBtn.addEventListener("click", () => {
  settings.classList.toggle("hide");
});
//Set difficulty
settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});
