import { Observable } from 'rxjs';
import move from './movement';
import * as d3 from 'd3';

export default class Ghost {
  constructor(x, y, velocity, size, map) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.velocity = velocity;
    this.map = map;

    this.currentDirection = null;
    this.requestedDirection = null;
  }

  draw() {
    this.move();
  }

  canMove(direction) {
    if (direction == move.left) return [-1, 0].includes(this.map[this.y][this.x - 1])
    if (direction == move.up) return [-1, 0].includes(this.map[this.y - 1][this.x])
    if (direction == move.right) return [-1, 0].includes(this.map[this.y][this.x + 1])
    if (direction == move.down) return [-1, 0].includes(this.map[this.y + 1][this.x])
    return false;
  }

  move = () => {
    if (this.canMove(this.currentDirection % 4 + 3)) {
      if (Math.random() > 0.5) {
        console.log(this.currentDirection % 4 + 3);
        this.currentDirection = this.currentDirection % 4 + 3;
      }
    }
    if (this.canMove(this.currentDirection % 4 + 5)) {
      if (Math.random() > 0.5) {
        this.currentDirection = this.currentDirection % 4 + 3;
      }
    }
    if (this.canMove(this.requestedDirection)) {
      this.currentDirection = this.requestedDirection;
    }
    if (!this.canMove(this.currentDirection)) {
      this.currentDirection = move.stop;
      let directions = Object.values(move);
      let newdir = directions[Math.floor(Math.random() * directions.length)];
      if (this.canMove(newdir)) {
        this.currentDirection = newdir;
      }
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
}}
