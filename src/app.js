import { setDivGrid, setSVGG } from './assets/js/window';
import { MAP } from './assets/js/map/index';
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

const setGameMaze = (grid, id) => {
  return setSVGG(margin)(grid, id);
};

const drawPicture = (mapGrid) => (picture, cubeSize) => {
  const mapObj = MAP(mapGrid);
  mapObj.setMap(picture.map);
  mapObj.setHeight(picture.height);
  mapObj.setWidth(picture.width);
  mapObj.setCubeSize(cubeSize);
  mapObj.draw();
};

const drawMaze = (mapGrid) => { return drawPicture(mapGrid)(MAP_PICTURE, CUBE_SIZE); };

export { setGameBoard, drawMaze, setGameMaze };
