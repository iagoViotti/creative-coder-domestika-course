const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');
const Tweakpane = require('tweakpane');

const settings = {
  dimensions: [1080, 1080],
  animate: true,
};

const params = {
  cols: 10,
  rows: 10,
  lockProportion: false,
  scaleMin: 1,
  scaleMax: 30,
  freq: 0.001,
  hueAmp: 200,
  frame: 0,
  animate: true,
  noiseType: '2D',
  saturation: 50,
  lightness: 80
}

const sketch = () => {
  return ({ context, width, height, frame }) => {
    context.fillStyle = 'hsl(0, 0%, 90%)';
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
      const col = i % cols; // operation to get the column number
      const row = Math.floor(i / cols); // operation to get the row number

      const x = col * cellw;
      const y = row * cellh;
      const w = cellw * 0.8;
      const h = cellh * 0.8;

      const f = params.animate ? frame : params.frame

      const noise = (noiseType) => noiseType === '2D'
        ? random.noise2D(x + (f * 10), y, params.freq)
        : random.noise3D(x, y, f * 10, params.freq)

      const scale = math.mapRange(noise(params.noiseType),
        -1, 1, params.scaleMin, params.scaleMax);

      context.lineWidth = 5;
      context.strokeStyle = 'white';

      context.save()

      context.translate(x, y);
      context.translate(margx, margy);
      context.translate(cellw * 0.5, cellh * 0.5);

      context.beginPath();
      context.fillStyle = `hsl(${noise(params.noiseType) * params.hueAmp}, ${params.saturation}%, ${params.lightness}%)`;
      context.arc(0, 0, scale, 0, Math.PI * 2, false);
      context.fill();
      context.stroke();

      context.restore();
    }

  };
};
const createPane = () => {
  const pane = new Tweakpane.Pane();
  let folder
  folder = pane.addFolder({ title: 'Grid' });
  folder.addInput(params, 'cols', { min: 2, max: 40, step: 1 });
  folder.addInput(params, 'rows', { min: 2, max: 40, step: 1 });
  folder.addInput(params, 'scaleMin', { min: 1, max: 100 });
  folder.addInput(params, 'scaleMax', { min: 1, max: 100 });

  folder = pane.addFolder({ title: 'Noise' });
  folder.addInput(params, 'noiseType', { options: { '2D': '2D', '3D': '3D' } });
  folder.addInput(params, 'freq', { min: -0.01, max: 0.01 });
  folder.addInput(params, 'frame', { min: 0, max: 999 })
  folder.addInput(params, 'animate')

  folder = pane.addFolder({ title: 'Color HSL' });
  folder.addInput(params, 'hueAmp', { min: 1, max: 1000 });
  folder.addInput(params, 'saturation', { min: 0, max: 100 });
  folder.addInput(params, 'lightness', { min: 0, max: 100});
}

createPane();
canvasSketch(sketch, settings);

