const holes = document.querySelectorAll(".hole");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const restartBtn = document.getElementById("restart");

let score = 0;
let time = 30;
let timer = null;
let moleTimer = null;
let currentHole = null;

function randomHole() {
  const index = Math.floor(Math.random() * holes.length);
  return holes[index];
}

function showMole() {
  if (currentHole) currentHole.classList.remove("active");
  currentHole = randomHole();
  currentHole.classList.add("active");
}

function startGame() {
  score = 0;
  time = 30;
  scoreEl.textContent = score;
  timeEl.textContent = time;

  clearInterval(timer);
  clearInterval(moleTimer);

  moleTimer = setInterval(showMole, 800);

  timer = setInterval(() => {
    time--;
    timeEl.textContent = time;
    if (time <= 0) {
      endGame();
    }
  }, 1000);
}

function endGame() {
  clearInterval(timer);
  clearInterval(moleTimer);
  if (currentHole) currentHole.classList.remove("active");
  alert("ゲーム終了！スコア：" + score);
}

holes.forEach(hole => {
  hole.addEventListener("click", () => {
    if (hole.classList.contains("active")) {
      score++;
      scoreEl.textContent = score;
      hole.classList.remove("active");
    }
  });
});

restartBtn.addEventListener("click", startGame);

startGame();
