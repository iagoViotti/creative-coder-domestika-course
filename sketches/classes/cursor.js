import { Vector } from './Vector.js';

export class Cursor {
  constructor(x, y) {
    this.pos = new Vector(x, y);
    this.lastMoveTime = Date.now();
    this.animating = false;
    this.click = false;
  }

  setPositon(x, y) {
    this.pos = new Vector(x, y);
  };
}