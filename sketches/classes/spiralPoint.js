import { Vector } from './Vector.js';
const random = require('canvas-sketch-util/random');

export class Agent {
  constructor(x, y) {
    {
      this.pos = new Vector(x, y);
      this.radius = 15;
      this.vel = new Vector(random.range(-3, 8), random.range(-1, 8));
      this.color = `hsl(${random.range(0, 250)}, ${random.range(50, 70)}%, ${random.range(50, 70)}%)`;
      // this.frameCount = frameCount;
      this.curveRadius = 0.15;
      this.t = 0;
      this.k = 0.05;
    }
  }

  getPos() {
    return this.pos;
  }

  setPos(x, y) {
    this.pos.x = x;
    this.pos.y = y;
  }

  draw(context) {

    context.save()

    context.lineWidth = 5;
    context.strokeStyle = this.color;

    context.translate(this.getPos().x, this.getPos().y);

    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2, false);
    context.fill();
    context.stroke();

    context.restore();
  }

  update() {
    this.t -= 0.02;
    this.setPos(
      this.getPos().x + (this.curveRadius * (this.t - this.vel.x) * Math.cos(this.t)),
      (this.getPos().y + (this.k * (this.t + this.vel.y)))
    );
  }

  bounce(width, height) {
    if (this.getPos().x <= 0) { this.setPos(width, this.getPos().y) }
    if (this.getPos().x >= width) { this.setPos(1, this.getPos().y) }
    if (this.getPos().y <= 0) { this.setPos(this.getPos().x, height) }
    if (this.getPos().y >= height) { this.setPos(this.getPos().x, 0) }
  }

}