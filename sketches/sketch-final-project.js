const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');
const Tweakpane = require('tweakpane');

const settings = {
  dimensions: [window.innerWidth, window.innerHeight],
  animate: true,
};

const params = {
  cols: 200,
  scaleMin: 5,
  scaleMax: 12,
  freq: 0.001,
  amp: 1,
  frame: 0,
  animate: true,
  noiseType: 'noise2D',
  cp1x: 0,
  cp1y: 0,
  cp2x: 0.2,
  cp2y: 0.5,
  x: 0.3,
  y: window.innerHeight,
  backgroundColor: { r: 255, g: 255, b: 255 },
  strokeStyle: { r: 0, g: 0, b: 0 }
}

const sketch = () => {
  return ({ context, width, height, frame }) => {
    context.fillStyle = `rgb(${params.backgroundColor.r}, ${params.backgroundColor.g}, ${params.backgroundColor.b})`;
    context.fillRect(0, 0, width, height);

    const cols = params.cols;

    const gridw = width;
    const cellw = gridw / cols;

    context.translate(-(width * 0.5), 0);
    for (let i = 0; i < cols; i++) {
      const col = i % cols;
      const x = (col * cellw) * 2;
      const f = params.animate ? frame : params.frame
      const noise = params.noiseType === 'noise2D'
        ? random.noise2D(x + (f * 10), 0, params.freq, params.amp)
        : random.noise3D(x, 0, f * 10, params.freq, params.amp)
      const scale = math.mapRange(noise, -1, 1, params.scaleMin, params.scaleMax);

      context.save();
      context.translate(x, 0);

      context.strokeStyle = `rgb(${params.strokeStyle.r}, ${params.strokeStyle.g}, ${params.strokeStyle.b})`;
      context.lineWidth = scale;

      context.beginPath();
      context.beginPath();
      context.moveTo(0, 0);
      context.bezierCurveTo(
        (height * params.cp1x),
        (width * params.cp1y) * noise,
        (height * params.cp2x) * noise,
        (width * params.cp2y) * noise,
        (width * params.x),
        params.y
      );
      context.stroke();
      context.restore();
    }
  };
};
const createPane = () => {
  const pane = new Tweakpane.Pane();
  let folder
  folder = pane.addFolder({ title: 'Grid' });
  folder.addInput(params, 'cols', { min: 50, max: 250, step: 1 });
  folder.addInput(params, 'scaleMin', { min: 1, max: 100 });
  folder.addInput(params, 'scaleMax', { min: 1, max: 30 });

  folder = pane.addFolder({ title: 'Noise' });
  folder.addInput(params, 'amp', { min: 0, max: 1, step: 0.1 })
  folder.addInput(params, 'freq', { min: -0.005, max: 0.005, step: 0.0001 });
  folder.addInput(params, 'frame', { min: 0, max: 999 })
  folder.addInput(params, 'animate')
  folder.addInput(params, 'noiseType', { options: { noise2D: 'noise2D', noise3D: 'noise3D' } })

  folder = pane.addFolder({ title: 'Colouring' })
  folder.addInput(params, 'backgroundColor', { input: 'color' })
  folder.addInput(params, 'strokeStyle', { input: 'color' })

  folder = pane.addFolder({ title: 'Bezier', expanded: false });
  folder.addInput(params, 'cp1x', { min: -0.1, max: 1, step: 0.1 });
  folder.addInput(params, 'cp1y', { min: -0.1, max: 1, step: 0.1 });
  folder.addInput(params, 'cp2x', { min: -0.1, max: 1, step: 0.1 });
  folder.addInput(params, 'cp2y', { min: -0.1, max: 1, step: 0.1 });
  folder.addInput(params, 'x', { min: - 0.5, max: 0.5 });
}

createPane();
canvasSketch(sketch, settings);
