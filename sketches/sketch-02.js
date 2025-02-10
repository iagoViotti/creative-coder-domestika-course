// const canvasSketch = require('canvas-sketch');
import canvasSketch from 'canvas-sketch';
const { math, random } = require('canvas-sketch-util');

const settings = {
  dimensions: [1080, 1080]
};
/** UTILITY FUNCTIONS **/
// const degToRad = (degree) => degree / 180 * Math.PI;

// const randomRange = (min, max) => Math.random() * (max - min) + min;
/*****     ---      ******/
const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    context.fillStyle = 'white';

    const cx = 0;
    const cy = 0;
    const w = width * 0.01;
    const h = height * 3;
    let x, y;

    const num = 60;
    const radius = width * 0.8;

    for (let i = 0; i < num; i++) {
      const slice = math.degToRad(360 / num)
      const angle = slice * i;

      x = cx + radius * Math.sin(angle)
      y = cy + radius * Math.cos(angle)

      /**** saving ****/
      context.save();

      /** positioning **/
      context.translate(x, y);
      context.rotate(-angle)
      context.scale(random.range(1), random.range(0.5, 1))

      /** shaping **/
      context.beginPath();
      context.rect(- w * 0.5, random.range(0, -h * 0.5), w, h);
      context.fill();
      context.restore();
      /**** restoring ****/

      /**** saving ****/
      context.save();
      
      /** positioning **/
      context.translate(cx, cy);
      context.rotate(-angle);
      
      context.lineWidth = random.range(5, 10);
      context.strokeStyle = 'white'
      
      /** shaping **/
      context.beginPath();
      context.arc(0, 0, radius * random.range(0.7, 1.3), slice * random.range(1, -8), slice * random.range(1, 5));
      context.stroke();
      context.restore();
      /**** restoring ****/
    }

  };
};

canvasSketch(sketch, settings);
