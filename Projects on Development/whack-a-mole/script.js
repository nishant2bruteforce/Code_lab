// Whack-a-Mole: simple beginner-friendly implementation
// Author: generated for Code_lab

const board = document.getElementById('board');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const startBtn = document.getElementById('start');
const resetBtn = document.getElementById('reset');
const durationSelect = document.getElementById('duration');

let lastHole;
let timeUp = false;
let score = 0;
let gameTime = parseInt(durationSelect.value, 10) || 30;

// Create 9 holes (3x3 grid). This keeps the HTML simple and is easy for beginners.
function createHoles(count = 9) {
  board.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const hole = document.createElement('div');
    hole.className = 'hole';
    // mole element inside the hole
    const mole = document.createElement('div');
    mole.className = 'mole';
    mole.textContent = '';
    // Add click listener for whacking
    mole.addEventListener('click', whack);
    hole.appendChild(mole);
    board.appendChild(hole);
  }
}

// Utility: random time between min and max (ms)
function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

// Choose a random hole, avoiding the last one
function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole === lastHole) return randomHole(holes);
  lastHole = hole;
  return hole;
}

// Show moles repeatedly until timeUp is true
function peep() {
  const holes = document.querySelectorAll('.hole');
  const time = randomTime(400, 1200); // mole visible time
  const hole = randomHole(holes);
  const mole = hole.querySelector('.mole');

  // pop up
  mole.classList.add('up', 'pop');

  // remove 'pop' after animation so it can replay next time
  setTimeout(() => mole.classList.remove('pop'), 220);

  setTimeout(() => {
    mole.classList.remove('up');
    if (!timeUp) peep();
  }, time);
}

function startGame() {
  score = 0;
  scoreEl.textContent = score;
  gameTime = parseInt(durationSelect.value, 10) || 30;
  timeEl.textContent = gameTime;
  timeUp = false;
  startBtn.disabled = true;
  durationSelect.disabled = true;

  peep();

  const endTime = Date.now() + gameTime * 1000;

  const timer = setInterval(() => {
    const remaining = Math.round((endTime - Date.now()) / 1000);
    timeEl.textContent = remaining >= 0 ? remaining : 0;
    if (remaining <= 0) {
      timeUp = true;
      clearInterval(timer);
      startBtn.disabled = false;
      durationSelect.disabled = false;
      // Ensure all moles hide
      document.querySelectorAll('.mole').forEach(m => m.classList.remove('up'));
    }
  }, 250);
}

function whack(e) {
  // Only count real user clicks (no programmatic events)
  if (!e.isTrusted) return;
  if (!this.classList.contains('up')) return;
  score++;
  this.classList.remove('up');
  // tiny feedback
  this.classList.add('pop');
  setTimeout(() => this.classList.remove('pop'), 200);
  scoreEl.textContent = score;
}

function resetGame() {
  score = 0;
  scoreEl.textContent = score;
  timeUp = true;
  startBtn.disabled = false;
  durationSelect.disabled = false;
  timeEl.textContent = durationSelect.value;
  document.querySelectorAll('.mole').forEach(m => m.classList.remove('up'));
}

// Initialize
createHoles(9);
timeEl.textContent = gameTime;

startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', resetGame);

// Accessibility: allow keyboard whacking (space/enter) when focused on a mole
board.addEventListener('keydown', (e) => {
  if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('mole')) {
    e.preventDefault();
    e.target.click();
  }
});
