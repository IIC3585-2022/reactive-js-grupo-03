import Pacman from './pacman';

import { setDivGrid, setSVGG } from './assets/js/window';
import { MAP, drawCircles, drawCubes, deleteCircles, drawCharacter } from './assets/js/map/index';
import { MAP_PICTURE } from './setup/map/picture';
import { CUBE_SIZE } from './setup/map/cube';

const margin = {
  top: 10,
  bottom: 10,
  right: 10,
  left: 10,
};

const p1Keys = {
  left: 65,
  up: 90,
  right: 68,
  down: 83,
};

const p2Keys = {
  left: 37,
  up: 38,
  right: 39,
  down: 40,
};

const setGameBoard = (id) => {
  return setDivGrid(margin, MAP_PICTURE.height * CUBE_SIZE, MAP_PICTURE.width * CUBE_SIZE)(id);
};

const setGameGrid = (grid, id) => {
  return setSVGG(margin, id)(grid);
};

const drawGame = (mapGrid) => {
  const mazeMap = MAP(setGameGrid(mapGrid, '#maze'));
  const _map = [];

  return {
    setMap(map) {
      _map.push(...map);
    },
    async drawMaze() {
      await mazeMap.draw(
        _map,
        drawCubes({
          cubeSize: CUBE_SIZE,
          width: CUBE_SIZE,
          height: CUBE_SIZE,
        }),
      );
    },
    async drawPoints() {
      await mazeMap.draw(
        _map,
        drawCircles({
          cubeSize: CUBE_SIZE,
          width: CUBE_SIZE / 6,
          height: CUBE_SIZE / 6,
        }),
      );
    },
    async deletePoints() {
      await mazeMap.delete(
        deleteCircles,
      );
    },
    drawMob(mobList) {
      const [{ x: x1, y: y1 }, { x: x2, y: y2 }] = mobList;
      const player1 = new Pacman(x1, y1, 1, CUBE_SIZE, MAP_PICTURE.map, p1Keys);
      const player2 = new Pacman(x2, y2, 1, CUBE_SIZE, MAP_PICTURE.map, p2Keys);
      mazeMap.insertElements(
        mobList,
        drawCharacter({
          cubeSize: CUBE_SIZE,
          width: CUBE_SIZE * 0.75,
          height: CUBE_SIZE * 0.75,
        })(2000),
      );
      return [player1, player2];
    },
  };
};

export { setGameBoard, drawGame };
