import { Vector } from './point';
const random = require('canvas-sketch-util/random');

export class Agent {
  constructor(x, y) {
    {
      this.pos = new Vector(x, y);
      this.radius = random.range(5, 10);
      this.vel = new Vector(random.range(-1, 1), random.range(-1, 1));
      this.color = `beige`;
    }
  }

  draw(context) {

    context.save()

    context.lineWidth = 5;
    context.strokeStyle = this.color;

    context.translate(this.pos.x, this.pos.y);

    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2, false);
    context.fill();
    context.stroke();

    context.restore();
  }

  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  bounce(width, height) {
    if (this.pos.x <= 0 || this.pos.x >= width) {
      this.vel.x *= -1;
      this.color = `
      hsl(${random.range(0, 50)},
      ${random.range(50, 70)}%,
      ${random.range(50, 70)}%)`;
    }
    if (this.pos.y <= 0 || this.pos.y >= height) {
      this.vel.y *= -1;
      this.color = `
      hsl(${random.range(0, 50)},
      ${random.range(50, 70)}%,
      ${random.range(50, 70)}%)`;
    }
  }

}