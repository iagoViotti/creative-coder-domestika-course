import { math, color } from 'canvas-sketch-util';
import { Vector } from './Vector.js';

export class Dot {
  constructor(x, y) {
    {
      this.pos = new Vector(x, y);
      this.radius = 50;
      this.color = `black`;
      this.backgroundColor = `white`;
    }
  }

  setColor(color) {
    this.color = color;
    return this;
  }

  setBGColor(color) {
    this.backgroundColor = color;
    return this;
  }

  setRadius(radius) {
    this.radius = radius;
    return this;
  }

  draw(context, translateX, translateY) {

    context.fillStyle = this.backgroundColor;
    context.save()

    context.lineWidth = 5;
    context.strokeStyle = this.color;

    context.translate(new Vector(translateX, translateY).x, new Vector(translateX, translateY).y);

    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2, false);
    context.fill();
    context.stroke();
    context.restore();
    return this;
  }

  // mousePull(mouse, translateX, translateY, noise) {
  //   const maxRange = 250;
  //   const distance = mouse.position.getDistance(new Vector(translateX, translateY));

  //   if (distance < (maxRange + (noise * 10))) {
  //     this.radius = math.mapRange(maxRange - distance, 15, 1000, 5, 25);
  //     const newColor = color.offsetHSL(this.color, math.mapRange(maxRange - distance, 0, maxRange, 0, -150) + noise / 2, 0, 0).hex;
  //     this.setColor(newColor);
  //     this.wiggle(noise);
  //   }    
  //   return this;
  // }

  mousePull(mouse, translateX, translateY, noise) {
    const maxRange = 350;
    const distance = mouse.pos.getDistance(new Vector(translateX, translateY));

    if (distance < (maxRange + (noise * 10))) {
      this.radius = math.mapRange(distance, 0, maxRange, 1, this.radius);
      // const newColor = color.offsetHSL(this.color, math.mapRange(maxRange - distance, 0, maxRange, 0, -150) + noise / 2, 0, 0).hex;
      // const newBGColor = color.offsetHSL(this.backgroundColor, math.mapRange(maxRange - distance, 0, maxRange, 0, -150) + noise / 2, 0, 0).hex;
      // this.setColor(newColor);
      // this.setBGColor(newBGColor);
      this.wiggle(noise);
    }    
    return this;
  }

  wiggle(noise) {
    this.radius = this.radius + (noise);
    this.color = color.offsetHSL(this.color, noise * 10, 0, 0).hex;
    return this;
  }
}