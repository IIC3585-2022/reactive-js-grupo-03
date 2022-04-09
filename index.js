import { setGameBoard, drawGame } from './src/app';
import { MAP_PICTURE } from './src/setup/map/picture';

const gameGrid = setGameBoard('#game');
const gameDrawable = drawGame(gameGrid);
gameDrawable.setMap(MAP_PICTURE.map);
gameDrawable.drawMaze();
gameDrawable.drawPoints();
