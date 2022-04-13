/* eslint-disable no-unused-vars */

import { signalEvent } from './game_logic';
import move from './movement';
import * as d3 from 'd3';
import * as event from './events';

export default class Pacman {
  constructor(x, y, velocity, size, map, keys) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.velocity = velocity;
    this.map = map;
    this.keys = keys;

    this.currentDirection = null;
    this.requestedDirection = null;

    this.div = 'player' + (keys.up === 87 ? '1' : '2');

    document.addEventListener('keydown', this.#keyPress);

    this.loadImgs();
  }

  loadImgs() {
    const pacImg0 = new Image();
    pacImg0.src = './assets/sprites/pac0.png';
    const pacImg1 = new Image();
    pacImg1.src = './assets/sprites/pac1.png';
    const pacImg2 = new Image();
    pacImg2.src = './assets/sprites/pac2.png';

    this.pacImages = [pacImg0, pacImg1, pacImg2, pacImg1];
    this.pacImageIndex = 0;
  }

  #keyPress = (event) => {
    // left
    if (event.keyCode === this.keys.left) {
      if (this.currentDirection === move.right) this.currentDirection = move.left;
      this.requestedDirection = move.left;
    }
    // up
    if (event.keyCode === this.keys.up) {
      if (this.currentDirection === move.down) this.currentDirection = move.up;
      this.requestedDirection = move.up;
    }
    // right
    if (event.keyCode === this.keys.right) {
      if (this.currentDirection === move.left) this.currentDirection = move.right;
      this.requestedDirection = move.right;
    }
    // down
    if (event.keyCode === this.keys.down) {
      if (this.currentDirection === move.up) this.currentDirection = move.down;
      this.requestedDirection = move.down;
    }
  }

  canMove(direction) {
    if (direction == move.left) return [-1, 0].includes(this.map[this.y][this.x - 1])
    if (direction == move.up) return [-1, 0].includes(this.map[this.y - 1][this.x])
    if (direction == move.right) return [-1, 0].includes(this.map[this.y][this.x + 1])
    if (direction == move.down) return [-1, 0].includes(this.map[this.y + 1][this.x])
    return false;
  }

  move = () => {
    if (this.canMove(this.requestedDirection)) {
      this.currentDirection = this.requestedDirection;
    }
    if (!this.canMove(this.currentDirection)) {
      this.currentDirection = move.stop;
    }
    if (this.map[this.y][this.x] === 0) {
      this.map[this.y][this.x] = -1;
      d3.selectAll(
        `circle[cx='${(this.x + 1 / 2) * this.size}'][cy='${(this.y + 1 / 2) * this.size}']`
      ).remove();
      signalEvent(this.div, event.eatDot)
    }
    {
      switch (this.currentDirection) {
        case move.left:
          this.x -= this.velocity;
          break;
        case move.up:
          this.y -= this.velocity;
          break;
        case move.right:
          this.x += this.velocity;
          break;
        case move.down:
          this.y += this.velocity;
          break;
      }
    }
  }
}
