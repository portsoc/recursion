// turtle position
const t = {
  // will be initialized to centre of canvas
  x: null, // positive x points right
  y: null, // positive y points up

  heading: 0, // zero is up, 90 is to the left
  penDown: true,
  color: '#000',
  lineWidth: 2,
  showingTurtle: false,
};

// canvas info
const c = {
  el: null,
  ctx: null, // context
  h: null,
  w: null,
};

c.ready = new Promise(resolve => { c.setReady = resolve; });


window.addEventListener('load', initTurtleCanvas);

function initTurtleCanvas() {
  c.el = document.querySelector('#turtle-canvas');
  if (!c.el) return; // bailing

  c.ctx = c.el.getContext('2d');

  // reset canvas size to window size
  // the canvas is already scaled to this size in CSS
  // multiply by devicePixelRatio for smooth images
  c.el.width = c.el.scrollWidth * window.devicePixelRatio;
  c.el.height = c.el.scrollHeight * window.devicePixelRatio;

  // transform canvas coordinates so that the shorter side is 200 wide,
  // coordinates start in the centre, and y goes up
  c.s = Math.min(c.el.width, c.el.height) / 200;
  c.ctx.translate(c.el.width / 2, c.el.height / 2);
  c.ctx.scale(c.s, -c.s);

  c.w = Math.ceil(c.el.width / c.s);
  c.h = Math.ceil(c.el.height / c.s);

  reset();

  loadTurtleLogo();
}

export function reset(x = 0, y = 0, heading = 0, color = '#000', lineWidth = 8) {
  hideTurtle();

  t.x = x;
  t.y = y;
  t.heading = heading;
  t.penDown = true;

  setColor(color);
  setLineWidth(lineWidth);

  c.ctx.lineCap = 'round';

  showTurtle();
}

export function penDown() {
  t.penDown = true;
}

export function penUp() {
  t.penDown = false;
}

// todo add wrapping of canvas so if the turtle
// leaves to the right it emerges from the left
export function forward(l) {
  hideTurtle();

  const dx = -l * Math.sin(rad(t.heading));
  const dy = l * Math.cos(rad(t.heading));

  if (t.penDown) {
    line(t.x, t.y, t.x + dx, t.y + dy);
  }

  t.x += dx;
  t.y += dy;

  showTurtle();
}

export function back(l) {
  forward(-l);
}

export function turnLeft(deg) {
  hideTurtle();
  t.heading += deg;
  showTurtle();
}

export function turnRight(deg) {
  turnLeft(-deg);
}

export function clear() {
  hideTurtle();
  const ww = Math.ceil(c.w / 2); // half width
  const hh = Math.ceil(c.h / 2); // half height
  c.ctx.clearRect(-ww, -hh, ww * 2, hh * 2);
  showTurtle();
}

export function setColor(col) {
  t.color = col;
  c.ctx.strokeStyle = t.color;
}

export function setX(x) {
  hideTurtle();
  t.x = x;
  showTurtle();
}

export function setY(y) {
  hideTurtle();
  t.y = y;
  showTurtle();
}

export function setLineWidth(w) {
  t.lineWidth = w;
  c.ctx.lineWidth = t.lineWidth / c.s;
}

export function randomColor() {
  setColor(nextColor());
}

const colors = ['#a00', '#0a0', '#00a'];
function nextColor() {
  const retval = colors.pop();
  colors.unshift(retval);
  return retval;
}

export function show() {
  hideTurtle();
  t.showingTurtle = true;
  showTurtle();
}

export function hide() {
  hideTurtle();
  t.showingTurtle = false;
}


// shortcut notation
export { forward as f };
export { back as b };
export { turnLeft as l };
export { turnRight as r };

export function ready() {
  return c.ready;
}


// ///////////////////
// helper functions

function rad(deg) {
  return Math.PI * deg / 180;
}

function line(x1, y1, x2, y2) {
  c.ctx.beginPath();
  c.ctx.moveTo(x1, y1);
  c.ctx.lineTo(x2, y2);
  c.ctx.stroke();
}

let savedCanvasImage = null;
let turtleImage = null;

function loadTurtleLogo() {
  const img = new Image();
  img.src = 'turtle.png';
  img.addEventListener('load', () => {
    turtleImage = img;
    c.setReady();
  });
  img.addEventListener('error', () => {
    console.error('could not load turtle image', img.src);
  });

  return img;
}

function hideTurtle() {
  if (savedCanvasImage) {
    c.ctx.putImageData(savedCanvasImage, 0, 0);
    savedCanvasImage = null;
  }
}

function showTurtle() {
  if (!t.showingTurtle) return;
  if (savedCanvasImage) {
    throw new Error("showing turtle when it's already shown!");
  }

  if (turtleImage) {
    savedCanvasImage = c.ctx.getImageData(0, 0, c.el.width, c.el.height);

    const w = 10;
    const h = w / turtleImage.naturalWidth * turtleImage.naturalHeight;
    c.ctx.save();
    c.ctx.translate(t.x, t.y);
    c.ctx.rotate(rad(180 + t.heading));
    c.ctx.drawImage(turtleImage, -w / 2, -h / 2, w, h);
    c.ctx.restore();
  }
}
