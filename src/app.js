import Pacman from './pacman';

import { setDivGrid, setSVGG } from './assets/js/window';
import { MAP, drawCircles, drawCubes } from './assets/js/map/index';
import { MAP_PICTURE } from './setup/map/picture';
import { CUBE_SIZE } from './setup/map/cube';

const margin = {
  top: 10,
  bottom: 10,
  right: 10,
  left: 10,
};

const setGameBoard = (id) => {
  return setDivGrid(margin, MAP_PICTURE.height * CUBE_SIZE, MAP_PICTURE.width * CUBE_SIZE)(id);
};

const setGameGrid = (grid, id) => {
  return setSVGG(margin, id)(grid);
};

const drawGame = (mapGrid) => {
  const mazeMap = MAP(setGameGrid(mapGrid, '#maze'));
  const pointsMap = MAP(setGameGrid(mapGrid, '#points'));
  const _map = [];

  return {
    setMap(map) {
      _map.push(...map);
    },
    drawMaze() {
      mazeMap.draw(
        _map,
        drawCubes({
          cubeSize: CUBE_SIZE,
          width: CUBE_SIZE,
          height: CUBE_SIZE,
        })(e => true),
      );
    },
    drawPoints() {
      pointsMap.draw(
        _map,
        drawCircles({
          cubeSize: CUBE_SIZE,
          width: 5,
          height: 5,
        })(e => true),
      );
    },
  };
};

function getPacman(velocity) {
  for (let row = 0; row < MAP_PICTURE.height; row++) {
    for (let col = 0; col < MAP_PICTURE.width; col++) {
      if (MAP_PICTURE.map[row][col] === 15) {
        MAP_PICTURE.map[row][col] = 0;
        return new Pacman(col, row, velocity, CUBE_SIZE, MAP_PICTURE);
      }
    }
  }
}

export { setGameBoard, drawGame, getPacman };
