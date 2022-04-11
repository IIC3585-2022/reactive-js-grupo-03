const { setDivGrid, setSVGG } = require('./assets/js/window');
const { MAP, drawCircles, drawCubes, deleteCircles, drawCharacter } = require('./assets/js/map/index');
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
                    width: CUBE_SIZE / 2,
                    height: CUBE_SIZE / 2,
                })(2000),
            );
        }
    };
};

export { setGameBoard, drawGame };
