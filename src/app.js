import Pacman from './pacman';
import Ghost from './ghost';

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
  up: 87,
  right: 68,
  down: 83,
};

const p2Keys = {
  left: 37,
  up: 38,
  right: 39,
  down: 40,
};

export const pacman1 = new Pacman(9, 17, 1, CUBE_SIZE, MAP_PICTURE.map, p1Keys);
export const pacman2 = new Pacman(18, 17, 1, CUBE_SIZE, MAP_PICTURE.map, p2Keys);
export const ghost1 = new Ghost(21, 20, 1, CUBE_SIZE, MAP_PICTURE.map);
export const ghost2 = new Ghost(21, 5, 1, CUBE_SIZE, MAP_PICTURE.map);
export const ghost3 = new Ghost(6, 20, 1, CUBE_SIZE, MAP_PICTURE.map);
export const ghost4 = new Ghost(6, 5, 1, CUBE_SIZE, MAP_PICTURE.map);
// eslint-disable-next-line max-len
export const pac1Image = 'https://www.pikpng.com/pngl/b/321-3212184_pacman-retro-png-pac-man-8-bit-clipart.png';
export const pac2Image = 'https://thehistorybandits.files.wordpress.com/2015/11/png-ms.png';
export const timeTransition = 300;

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
    async setMap(map) {
      await _map.push(...map);
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
    async drawMob(mobList) {
      await mazeMap.insertElements(
        mobList,
        drawCharacter({
          cubeSize: CUBE_SIZE,
          width: CUBE_SIZE * 0.95,
          height: CUBE_SIZE * 0.95,
        })(timeTransition),
      );
    },
  };
};

export { setGameBoard, drawGame };
