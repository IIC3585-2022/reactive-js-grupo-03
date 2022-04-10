import Pacman from './pacman';


const { MAP, drawCircles, drawCubes, deleteCircles } = require('./assets/js/map/index');
const { MAP_PICTURE } = require('./setup/map/picture');
const { CUBE_SIZE } = require('./setup/map/cube');

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
  const mazeMap = MAP(setGameGrid(mapGrid, "#maze"));
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
        })
      );
    },
    async drawPoints() {
      await mazeMap.draw(
        _map,
        drawCircles({
          cubeSize: CUBE_SIZE,
          width: 5,
          height: 5,
        })
      );
    },
    async deletePoints() {
      await mazeMap.delete(
        deleteCircles
      );
    }
  }
}
}

export { setGameBoard, drawGame, getPacman };
