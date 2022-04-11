import { setGameBoard, drawGame } from './src/app';
import { MAP_PICTURE } from './src/setup/map/picture';

const gameGrid = setGameBoard('#game');
const gameDrawable = drawGame(gameGrid);

gameDrawable.setMap(MAP_PICTURE.map)
    .then(gameDrawable.drawMaze())
    .then(gameDrawable.drawPoints())
    .then(
        gameDrawable.drawMob([{
            x: 12,
            y: 17,
            number: 0,
            image: 'https://upload.wikimedia.org/wikipedia/commons/2/26/Pacman_HD.png',
        }, {
            x: 14,
            y: 17,
            number: 0,
            image: 'https://upload.wikimedia.org/wikipedia/commons/2/26/Pacman_HD.png',
        }])
    );
