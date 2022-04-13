import { fromEvent } from 'rxjs';
import { gameDrawable } from '../index';
import { pac1Image, pac2Image, timeTransition } from './app';

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
function frame(mobs) {
  // TODO: dibujar pacman y fantasmas
  mobs.forEach(p => p.move());
  const [{ x: x1, y: y1 }, { x: x2, y: y2 }, { x: xg1, y: yg1 }, { x: xg2, y: yg2 }, { x: xg3, y: yg3 }, { x: xg4, y: yg4 }] = mobs;
  gameDrawable.drawMob([
    {
      x: x1,
      y: y1,
      number: 0,
      // eslint-disable-next-line max-len
      image: pac1Image,
    },
    {
      x: x2,
      y: y2,
      number: 0,
      image: pac2Image,
    },
    {
      x: xg1,
      y: yg1,
      number: 0,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Fantomo_ru%C4%9Da.svg/800px-Fantomo_ru%C4%9Da.svg.png',
    },{
      x: xg2,
      y: yg2,
      number: 0,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Fantomo_oran%C4%9Dkolora.svg/800px-Fantomo_oran%C4%9Dkolora.svg.png',
    },{
      x: xg3,
      y: yg3,
      number: 0,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Fantomo_roza.svg/800px-Fantomo_roza.svg.png',
    },{
      x: xg4,
      y: yg4,
      number: 0,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Fantomo_cejana.svg/800px-Fantomo_cejana.svg.png',
    },
  ]);
}

export function gameLooper(mobs) {
  [pacman1, pacman2, ...ghosts] = mobs;
  const gLoop = setInterval(() => {
    // TODO: cambiar para que el juego se detenga al observar evento de pausa/fin de juego
    frame(mobs);
    ghosts.forEach((ghost) => {
      if (ghost.checkCollision(pacman1) || ghost.checkCollision(pacman2)) {
        mobs.forEach((mob) => mob.currentDirection = 0)
        clearInterval(gLoop)
        // window.alert(`Han perdido!`)
      }
    })
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
  let points = 246;
  const player1Score = counter();
  const player2Score = counter();
  const [clickP1$, clickP2$] = getPlayerObservables();
  clickP1$.subscribe(() => {
    updateScore(1, player1Score)
    points -= 1;
    if (points === 0) {
      alert('you win');
    }
  });
  clickP2$.subscribe(() => {
    updateScore(2, player2Score)
    points -= 1;
    if (points === 0) {
      alert('you win');
    }
  });
}

export function updateContentById(id, newContent) {
  document.getElementById(id).innerHTML = newContent;
}

export function signalEvent(id, event) {
  document.getElementById(id).dispatchEvent(event);
}
