const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');

const settings = {
  dimensions: [1080, 1080],
  animate: true,
};

/******* canvas-sketch animation explanation *******/

// const animate = () => {
//   console.log('animate');
//   requestAnimationFrame(animate);
// }
// animate();

/******* canvas-sketch animation explanation *******/

const sketch = ({ context, width, height }) => {
  const agents = [];

  for (let i = 0; i < 3; i++) {
    const x = random.range(250, width - 250);
    const y = random.range(250, height - 250);
    const colors = [
      'rgba(76 ,188, 244 , 0.8)',
      'rgba(128,226,89, 0.8)',
      'rgba(237, 127, 55, 0.8)'
    ];
    agents.push(new Agent(x, y, colors[i]));
  }

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    agents.forEach(agent => {
      agent.update();
      agent.draw(context);
      agent.bounce(width, height);
    }
    );
  };
};

canvasSketch(sketch, settings);


class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getDistance(other) {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}

class Agent {
  constructor(x, y, color) {
    this.pos = new Vector(x, y);
    this.vel = new Vector(random.range(-1.2, 1.2), random.range(-1.2, 1.2));
    this.radius = 250;
    this.color = color;
  }

  draw(context) {
    context.fillStyle = this.color;

    context.save();
    context.translate(this.pos.x, this.pos.y);

    context.lineWidth = 0;
    context.strokeStyle = 'hsl(0, 0%, 0%, 0)';

    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.fill();
    context.stroke();

    context.restore();
  }

  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  bounce(width, height) {
    if (this.pos.x <= (0 + this.radius) || this.pos.x >= (width - this.radius)) {
      this.vel.x *= -1;
    }

    if (this.pos.y <= (0 + this.radius) || this.pos.y >= (height - this.radius)) {
      this.vel.y *= -1;
    }
  }
}