const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');
// const Tweakpane = require('tweakpane');
import { Dot } from './classes/dot.js';
import { Vector } from './classes/Vector.js';

const settings = {
  dimensions: [window.innerWidth, window.innerHeight],
  animate: true,
};

const params = {
  cols: 20,
  rows: 15,
  scaleMin: 1,
  scaleMax: 30,
  freq: 0.001,
  amp: 0.2,
  frame: 0,
  animate: true,
  lineCap: 'butt',
}

const sketch = () => {
  let mouse = new Vector(0, 0);
  const agents = [];
  window.addEventListener('mousemove', (event) => {
    mouse = new Vector(event.clientX, event.clientY);
  });

  return ({ context, width, height, frame }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const cols = params.cols;
    const rows = params.rows;
    const numCells = cols * rows;

    const gridw = width * 0.8;
    const gridh = height * 0.8;
    const cellw = gridw / cols;
    const cellh = gridh / rows;
    const margx = (width - gridw) * 0.5;
    const margy = (height - gridh) * 0.5;

    for (let i = 0; i < numCells; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = col * cellw;
      const y = row * cellh;
      const f = params.animate ? frame : params.frame
      const noise2D = random.noise2D(x + (f * 10), y, params.freq);
      const noise3D = random.noise3D(x, y, f * 10, params.freq)
      // const scale = (noise + 1) / 2 * 20;

      
      const translateX = x + margx + cellw * 0.5;
      const translateY = y + margy + cellh * 0.5;
      agents.push(new Dot(x, y)
      .setRadius(3)
      .setColor('red')
      .mousePull(mouse, translateX, translateY)
      .draw(context, translateX, translateY)
    );
    }
  };
};

// const createPane = () => {
//   const pane = new Tweakpane.Pane();
//   let folder
//   folder = pane.addFolder({ title: 'Grid' });
//   folder.addInput(params, 'lineCap', { options: {butt: 'butt', round: 'round', square: 'square'}})
//   folder.addInput(params, 'cols', { min: 2, max: 50, step: 1 });
//   folder.addInput(params, 'rows', { min: 2, max: 50, step: 1 });
//   folder.addInput(params, 'scaleMin', { min: 1, max: 100 });
//   folder.addInput(params, 'scaleMax', { min: 1, max: 100 });

//   folder = pane.addFolder({ title: 'Noise' });
//   folder.addInput(params, 'freq', { min: -0.01, max: 0.01 });
//   folder.addInput(params, 'amp', { min: 0, max: 1 });
//   folder.addInput(params, 'frame', { min: 0, max: 999 })
//   folder.addInput(params, 'animate')
// }

// createPane();
canvasSketch(sketch, settings);

