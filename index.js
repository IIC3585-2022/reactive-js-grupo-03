import { setGameBoard, drawGame } from './src/app';
import { MAP_PICTURE } from './src/setup/map/picture';
import { gameLooper } from './src/game_logic';

const gameGrid = setGameBoard('#game');
const gameDrawable = drawGame(gameGrid);
gameDrawable.setMap(MAP_PICTURE.map);
gameDrawable.drawMaze();
gameDrawable.drawPoints();
const [pacman1, pacman2] = gameDrawable.drawMob([{
  x: 12,
  y: 17,
  number: 0,
  image: 'https://upload.wikimedia.org/wikipedia/commons/2/26/Pacman_HD.png',
}, {
  x: 14,
  y: 17,
  number: 0,
  image: 'https://upload.wikimedia.org/wikipedia/commons/2/26/Pacman_HD.png',
}]);

gameLooper(pacman1, pacman2);
