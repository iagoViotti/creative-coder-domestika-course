const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
import { Agent } from './classes/agent.js';

const settings = {
  dimensions: [1080, 1080],
  animate: true,
};

// const degToRad = (deg) => {
//   return deg / 180 * Math.PI;
// }

// const randomRange = (min, max) => {
//   return Math.random() * (max - min) + min;
// }

const sketch = ({ _context, width, height }) => {
  const agents = [];

  for (let i = 0; i < 50; i++) {
    const x = random.range(0, width);
    const y = random.range(0, height);

    agents.push(new Agent(x, y));
  }
  return ({ context, width, height }) => {
    context.fillStyle = 'lightgrey';
    context.fillRect(0, 0, width, height);

    for (let i = 0; i < agents.length; i++) {
      const agent = agents[i];
      for (let j = i + 1; j < agents.length; j++) {
        const other = agents[j];

        const dist = agent.pos.getDistance(other.pos);
        
        if (dist > 200) continue;

        context.lineWidth = math.mapRange(dist, 0, 200, 10, 1);

        context.strokeStyle = 'white';
        
        context.beginPath();
        context.moveTo(agent.pos.x, agent.pos.y);
        context.lineTo(other.pos.x, other.pos.y);
        context.stroke()
      }
    }

    agents.forEach(agent => {
      agent.update();
      agent.draw(context);
      agent.bounce(width, height);
    });
  };
};


canvasSketch(sketch, settings);
