// turtle position
const t = {
  // will be initialized to centre of canvas
  x: null, // positive x points right
  y: null, // positive y points up

  heading: 0, // zero is up, 90 is to the left
  penDown: true,
  color: '#000',
  lineWidth: 2,
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
  // and y goes up from the bottom
  c.s = Math.min(c.el.width, c.el.height) / 200;
  c.ctx.translate(0, c.el.height);
  c.ctx.scale(c.s, -c.s);

  c.w = Math.ceil(c.el.width / c.s);
  c.h = Math.ceil(c.el.height / c.s);

  reset();
  c.setReady();
}

export function reset() {
  t.x = c.w / 2;
  t.y = c.h / 2;
  t.heading = 0;
  t.penDown = true;

  setColor('#000');
  setLineWidth(8);

  c.ctx.lineCap = 'round';
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
  const dx = -l * Math.sin(rad(t.heading));
  const dy = l * Math.cos(rad(t.heading));

  if (t.penDown) {
    line(t.x, t.y, t.x + dx, t.y + dy);
  }

  t.x += dx;
  t.y += dy;
}

export function back(l) {
  forward(-l);
}

export function turnLeft(deg) {
  t.heading += deg;
}

export function turnRight(deg) {
  turnLeft(-deg);
}

export function clear() {
  c.ctx.clearRect(0, 0, c.w, c.h);
}

export function setColor(col) {
  t.color = col;
  c.ctx.strokeStyle = t.color;
}

export function setX(x) {
  t.x = x + c.w / 2;
}

export function setY(y) {
  t.y = y + c.h / 2;
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
