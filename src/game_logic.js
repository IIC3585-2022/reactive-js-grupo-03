import { fromEvent } from 'rxjs';

function getPlayer() {
  const prompt = (...args) => 'Player';
  return {
    name: prompt('What is your name?'),
    points: 0,
  };
}

export function getPlayers(numberOfPlayers) {
  return Array(numberOfPlayers).fill(0).map(getPlayer);
}

// Cada frame del juego
function frame(p1, p2) {
  // TODO: dibujar pacman y fantasmas
  console.log(p1.x, p2.y);
}

function updateScore(playerNum, counter) {
  const element = document.getElementById(`score${playerNum}-value`);
  element.innerHTML = counter.next().value;
}

// function* countdown(start) {
//   for (let i = start; i >= 0; i -= 1) yield i;
// }

function getPlayerObservables() {
  const playerDivs = [...document.querySelectorAll('div.player-wrapper')];
  return playerDivs.map((playerDiv) => fromEvent(playerDiv, 'eatDot'));
}

function* counter() {
  let count = 0;
  while (true) yield count += 1;
}

export function gameLooper(pacman1, pacman2) {
  let iterations = 0;
  const gLoop = setInterval(() => {
    iterations++;
    // TODO: cambiar para que el juego se detenga al observar evento de pausa/fin de juego
    if (iterations === 5) clearInterval(gLoop);
    frame(pacman1, pacman2);
  }, 1000 / 50);
}

export function makePlayerSubscriptions() {
  const player1Score = counter();
  const player2Score = counter();
  const [clickP1$, clickP2$] = getPlayerObservables();
  clickP1$.subscribe(() => updateScore(1, player1Score));
  clickP2$.subscribe(() => updateScore(2, player2Score));
}

export function updateContentById(id, newContent) {
  document.getElementById(id).innerHTML = newContent;
}

export function signalEvent(id, event) {
  document.getElementById(id).dispatchEvent(event);
}
