const { setGameBoard, drawGame } = require('./src/app');
const { MAP_PICTURE } = require('./src/setup/map/picture');

const gameGrid = setGameBoard("#game");
const gameDrawable = drawGame(gameGrid);
gameDrawable.setMap(MAP_PICTURE.map);
gameDrawable.drawMaze();
gameDrawable.drawPoints();