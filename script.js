const gameBoard = document.getElementById("gameBoard");
const restartBtn = document.getElementById("restartBtn");
const startBtn = document.getElementById("startBtn");
const playerNameSpan = document.getElementById("playerName");
const playerInputModal = document.getElementById("playerInput");
const playerNameInput = document.getElementById("playerNameInput");

const moveCounter = document.getElementById("moveCounter");
const timerDisplay = document.getElementById("timer");

const resultModal = document.getElementById("result");
const resultName = document.getElementById("resultName");
const resultMoves = document.getElementById("resultMoves");
const resultTime = document.getElementById("resultTime");

let cards = [];
let flipped = [];
let matched = 0;
let moves = 0;
let timer = null;
let seconds = 0;
let playerName = "";


const imageSources = [
  'adidas-logo.png', 'allen-solly-logo.png', 'AUDI.png',
  'DELL.webp', 'FIAT.png', 'hp-logo.png',
  'Mec d.png', 'pizza hut.png', 'Renault.jpeg',
  'Toyota.png', 'WW.png', 'YAMAHA.webp',
];

const doubleImages = [...imageSources, ...imageSources, imageSources[0]]; 

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function startGame() {
  const shuffled = shuffle(doubleImages);
  gameBoard.innerHTML = "";
  matched = 0;
  moves = 0;
  moveCounter.textContent = moves;
  flipped = [];
  clearInterval(timer);
  seconds = 0;
  timerDisplay.textContent = "00:00";

  shuffled.forEach((src, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.index = index;
    card.dataset.image = src;

    const img = document.createElement("img");
    img.src = src;

    card.appendChild(img);
    gameBoard.appendChild(card);

    card.addEventListener("click", () => handleCardClick(card));
  });

  timer = setInterval(() => {
    seconds++;
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    timerDisplay.textContent = `${mins}:${secs}`;
  }, 1000);
}

function handleCardClick(card) {
  if (flipped.length === 2 || card.classList.contains("flipped")) return;

  card.classList.add("flipped");
  flipped.push(card);

  if (flipped.length === 2) {
    moves++;
    moveCounter.textContent = moves;
    const [first, second] = flipped;
    if (first.dataset.image === second.dataset.image) {
      matched += 2;
      flipped = [];
      if (matched >= 24) {
        clearInterval(timer);
        showResult();
      }
    } else {
      setTimeout(() => {
        first.classList.remove("flipped");
        second.classList.remove("flipped");
        flipped = [];
      }, 1000);
    }
  }
}

function showResult() {
  resultName.textContent = playerName;
  resultMoves.textContent = moves;
  resultTime.textContent = timerDisplay.textContent;
  resultModal.classList.remove("hidden");
}

startBtn.addEventListener("click", () => {
  playerName = playerNameInput.value.trim() || "Anonymous";
  playerInputModal.style.display = "none";
  playerNameSpan.textContent = playerName;
  startGame();
});

restartBtn.addEventListener("click", startGame);
