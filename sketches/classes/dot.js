import { math } from 'canvas-sketch-util';
import { Vector } from './Vector.js';
const random = require('canvas-sketch-util/random');

export class Dot {
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
  
  draw(context, translateX, translateY) {

    context.save()

    context.lineWidth = 5;
    context.strokeStyle = this.color;

    context.translate(new Vector(translateX, translateY).x, new Vector(translateX, translateY).y  );

    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2, false);
    context.fill();
    context.stroke();
    context.restore();
    return this;
  }

  mousePull(mouse, translateX, translateY) {
    const maxRange = 250;
    const distance = mouse.getDistance(new Vector(translateX, translateY));

    if (distance < maxRange) {
      this.radius = math.mapRange(maxRange - distance, 15, 800, 5, 25);
    }
    
    return this;
  }

}