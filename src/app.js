import Pacman from './pacman';

// import { easeLinear } from 'd3';
import { setDivGrid, setSVGG } from './assets/js/window';
import { MAP, drawCircles, drawCubes, subscribeCircles, deleteCircles, drawCharacter } from './assets/js/map/index';
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

export const timeTransition = 400;

export const pacman1 = new Pacman(18, 17, 1, CUBE_SIZE, MAP_PICTURE.map, p1Keys);
export const pacman2 = new Pacman(10, 17, 1, CUBE_SIZE, MAP_PICTURE.map, p2Keys);

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
    async subscribePoints() {
      await mazeMap.subscribeObserver(
        subscribeCircles({ cubeSize: CUBE_SIZE }),
      );
    },
    drawMob(mobList) {
      mazeMap.insertElements(
        mobList,
        drawCharacter({
          cubeSize: CUBE_SIZE,
          width: CUBE_SIZE * 0.75,
          height: CUBE_SIZE * 0.75,
        })(timeTransition),
      );
    },
  };
};

export { setGameBoard, drawGame };
