import { pacman1, pacman2, setGameBoard, drawGame } from './src/app';
import { MAP_PICTURE } from './src/setup/map/picture';
import { gameLooper, makePlayerSubscriptions } from './src/game_logic';

const gameGrid = setGameBoard('#game');
export const gameDrawable = drawGame(gameGrid);

gameDrawable.setMap(MAP_PICTURE.map)
  .then(gameDrawable.drawMaze())
  .then(gameDrawable.drawPoints())
  .then(gameDrawable.drawMob([
    {
      x: pacman1.x,
      y: pacman1.y,
      number: 0,
      image: 'https://upload.wikimedia.org/wikipedia/commons/2/26/Pacman_HD.png',
    }, {
      x: pacman2.x,
      y: pacman2.y,
      number: 0,
      image: 'https://upload.wikimedia.org/wikipedia/commons/2/26/Pacman_HD.png',
    },
  ]),
  );

makePlayerSubscriptions();

gameLooper([pacman1, pacman2]);
