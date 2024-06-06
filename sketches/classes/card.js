import { math } from 'canvas-sketch-util';
import { Vector } from './Vector.js';

export class Card {
  constructor(x, y) {
    {
      this.pos = new Vector(x, y);
      this.radius = 10;
      this.color = `black`;
    }
  }

  setColor(color) {
    this.color = color;
    return this;
  }

  setRadius(radius) {
    this.radius = radius;
    return this;
  }

  draw(context, translateX, translateY, playhead, cellw, cellh) {
    const t = Math.sin(playhead * Math.PI);
    const thickness = Math.max(5, Math.pow(t, 0.55) * cellw * 0.5);
    const rotation = playhead * Math.PI;
    context.save()

    context.lineWidth = 5;
    context.strokeStyle = this.color;

    context.translate(new Vector(translateX, translateY).x, new Vector(translateX, translateY).y);

    context.fillStyle = 'antiquewhite';
    context.save();
    context.translate(cellw/2, cellh/2);
    context.rotate(rotation);
    context.fillRect(-thickness / 2, -length / 2, thickness, length);
    context.restore();
    return this;
  }

  mousePull(mouse, translateX, translateY, noise) {
    const maxRange = 250;
    const distance = mouse.position.getDistance(new Vector(translateX, translateY));

    if (distance < maxRange) {
      this.radius = math.mapRange(maxRange - distance, 15, 1000, 5, 25);
      this.wiggle(noise);
    }
    return this;
  }

  wiggle(noise) {
    this.radius = this.radius + noise;
    return this;
  }
}









