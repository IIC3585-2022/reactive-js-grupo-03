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

  checkCollision = (pacman) => 
    (pacman.x <= this.x + 0.9 && pacman.x >= this.x - 0.9 &&
    pacman.y <= this.y + 0.9 && pacman.y >= this.y - 0.9)
    ? true : false

  move = () => {
    if (this.currentDirection === move.left) {
      if (this.canMove(move.up)) {
        if (Math.random() > 0.5) {
          this.currentDirection = move.up;
        }
      } else if (this.canMove(move.down)) {
        if (Math.random() >= 0.1) {
          this.currentDirection = move.down;
        }
    }} else if (this.currentDirection === move.right) {
      if (this.canMove(move.up)) {
        if (Math.random() >= 0.5) {
          this.currentDirection = move.up;
        }
      } else if (this.canMove(move.down)) {
        if (Math.random() >= 0.1) {
          this.currentDirection = move.down;
        }
    }} else if (this.currentDirection === move.up) {
      if (this.canMove(move.left)) {
        if (Math.random() >= 0.5) {
          this.currentDirection = move.left;
        }
      } else if (this.canMove(move.right)) {
        if (Math.random() >= 0.1) {
          this.currentDirection = move.right;
        }
    }} else if (this.currentDirection === move.down) {
      if (this.canMove(move.left)) {
        if (Math.random() >= 0.5) {
          this.currentDirection = move.left;
        }
      } else if (this.canMove(move.right)) {
        if (Math.random() >= 0.1) {
          this.currentDirection = move.right;
        }
    }} if (!this.canMove(this.currentDirection)) {
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
