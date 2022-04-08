const { setGameBoard, drawMaze, setGameMaze } = require('./src/app');

const gameGrid = setGameBoard('#game');
const mazeGrid = setGameMaze(gameGrid, '#maze');
drawMaze(mazeGrid);
