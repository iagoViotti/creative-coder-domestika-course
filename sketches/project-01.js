import canvasSketch from 'canvas-sketch';
import { random } from 'canvas-sketch-util';
// import Tweakpane from 'tweakpane';
import {Pane} from 'tweakpane';
import { Dot } from './classes/dot.js';
import { Vector } from './classes/Vector.js';
import { Cursor } from './classes/cursor.js';

const settings = {
  // dimensions: [window.innerWidth, window.innerHeight],
  animate: true,
};

const params = {
  cols: 28,
  rows: 14,
  freq: 0.005,
  animate: true,
  BGColor: { r: 255, g: 255, b: 255 },
}

const mouse = new Cursor(0, 0);

window.addEventListener('mousemove', (event) => {
  // mouse.pos = new Vector(event.clientX, event.clientY);
  // mouse.animating = true;
  // mouse.lastMoveTime = Date.now();

  //less memory costing method
  const now = Date.now();
  // Limit the event processing to approximately 60 FPS
  if (now - mouse.lastMoveTime > 16) { 
    mouse.pos = new Vector(event.clientX, event.clientY);
    mouse.animating = true;
    mouse.lastMoveTime = now;
  }
});

const sketch = () => {
  const agents = [];
  return ({ context, width, height, frame }) => {
    context.fillStyle = `rgb(${params.BGColor.r}, ${params.BGColor.g}, ${params.BGColor.b})`;
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
        .setRadius(20)
        .setColor('hotpink')
        .setBGColor('hotpink')
        .mousePull(mouse, translateX, translateY, noise3D)
        .draw(context, translateX, translateY, cellw)
      );
    }
  };
};

const createPane = () => {
  // const pane = new Tweakpane.Pane();
  const pane = new Pane();
  let folder
  folder = pane.addFolder({ title: 'Grid' });
  // folder.addInput(params, 'lineCap', { options: {butt: 'butt', round: 'round', square: 'square'}})
  folder.addInput(params, 'cols', { min: 2, max: 50, step: 1 });
  folder.addInput(params, 'rows', { min: 2, max: 50, step: 1 });
  // folder.addInput(params, 'scaleMin', { min: 1, max: 100 });
  // folder.addInput(params, 'scaleMax', { min: 1, max: 100 });

  folder = pane.addFolder({ title: 'Noise' });
  folder.addInput(params, 'freq', { min: -0.01, max: 0.01 });
  // folder.addInput(params, 'amp', { min: 0, max: 1 });
  // folder.addInput(params, 'frame', { min: 0, max: 999 })
  // folder.addInput(params, 'animate')
  folder = pane.addFolder({ title: 'Colouring' });
  folder.addInput(params, 'BGColor', { input: 'color' });

}


createPane();
canvasSketch(sketch, settings);

