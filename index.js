import { pacman1, pacman2, ghost1, ghost2, ghost3, ghost4, setGameBoard, drawGame } from './src/app';
import { MAP_PICTURE } from './src/setup/map/picture';
import { gameLooper } from './src/game_logic';

const gameGrid = setGameBoard('#game');
export const gameDrawable = drawGame(gameGrid);

gameDrawable.setMap(MAP_PICTURE.map)
  .then(gameDrawable.drawMaze())
  .then(gameDrawable.drawPoints())
  .then(gameDrawable.drawMob([
    {
      id: 'pacman1',
      x: pacman1.x,
      y: pacman1.y,
      number: 0,
      image: 'https://upload.wikimedia.org/wikipedia/commons/2/26/Pacman_HD.png',
    }, {
      id: 'pacman2',
      x: pacman2.x,
      y: pacman2.y,
      number: 0,
      image: 'https://upload.wikimedia.org/wikipedia/commons/2/26/Pacman_HD.png',
    }, {
      id: 'ghost',
      x: ghost1.x,
      y: ghost1.y,
      number: 0,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Fantomo_ru%C4%9Da.svg/800px-Fantomo_ru%C4%9Da.svg.png',
    }, {
      id: 'ghost',
      x: ghost2.x,
      y: ghost2.y,
      number: 0,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Fantomo_oran%C4%9Dkolora.svg/800px-Fantomo_oran%C4%9Dkolora.svg.png',
    }, {
      id: 'ghost',
      x: ghost3.x,
      y: ghost3.y,
      number: 0,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Fantomo_roza.svg/800px-Fantomo_roza.svg.png',
    }, {
      id: 'ghost',
      x: ghost4.x,
      y: ghost4.y,
      number: 0,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Fantomo_cejana.svg/800px-Fantomo_cejana.svg.png',
    },
  ]),
  );

gameLooper([pacman1, pacman2, ghost1, ghost2, ghost3, ghost4]);