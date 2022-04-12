import { fromEvent } from 'rxjs';
import { gameDrawable } from '../index';
import { timeTransition } from './app';

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
function frame(pacmans) {
  // TODO: dibujar pacman y fantasmas
  pacmans.forEach(p => p.move());
  const [{ x: x1, y: y1 }, { x: x2, y: y2 }] = pacmans;
  gameDrawable.drawMob([
    {
      x: x1,
      y: y1,
      number: 0,
      image: 'https://upload.wikimedia.org/wikipedia/commons/2/26/Pacman_HD.png',
    },
    {
      x: x2,
      y: y2,
      number: 0,
      image: 'https://upload.wikimedia.org/wikipedia/commons/2/26/Pacman_HD.png',
    },
  ]);
}

export function gameLooper(pacmans) {
  let iterations = 0;
  const gLoop = setInterval(() => {
    iterations++;
    // TODO: cambiar para que el juego se detenga al observar evento de pausa/fin de juego
    if (iterations === 300) clearInterval(gLoop);
    frame(pacmans);
  }, timeTransition);
}

function updateScore(playerNum, counter) {
  const element = document.getElementById(`score${playerNum}-value`);
  element.innerHTML = counter.next().value;
}

// function* countdown(start) {
//   for (let i = start; i >= 0; i -= 1) yield i;
// }

// Scores
function getPlayerObservables() {
  const playerDivs = [...document.querySelectorAll('div.player-wrapper')];
  return playerDivs.map((playerDiv) => fromEvent(playerDiv, 'eatDot'));
}

function* counter() {
  let count = 0;
  while (true) yield count += 1;
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
