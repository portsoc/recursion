document.addEventListener('keydown', nextStep);

async function moveBlocks(n, from, to, through) {
  if (n < 1) return; // nothing to do

  if (n === 1) {
    console.log(`will move a block from ${getName(from)} to ${getName(to)}`);
    await stepDelayKey();

    // actually move the first block
    const block = from.querySelector('.block');
    to.insertBefore(block, to.querySelector('.block'));
    return;
  }

  // we have more than one block to move, can't do it in a single step

  // move all but one blocks out of the way to the "through" tower
  await moveBlocks(n - 1, from, through, to);

  // move last block to the "to" tower
  await moveBlocks(1, from, to, through);

  // move the rest of the blocks back from "through" to "to"
  await moveBlocks(n - 1, through, to, from);
}

function getName(el) {
  const h2 = el.querySelector('h2');
  if (h2) return h2.textContent;

  return 'noname';
}


const el = { /* will contain element handles */ };

async function main() {
  el.status = document.querySelector('#status');

  const towers = document.querySelectorAll('.tower');
  const n = towers[0].querySelectorAll('.block').length;

  await moveBlocks(n, towers[0], towers[1], towers[2]);

  el.status.textContent = 'All done, thanks for playing. Reload to restart.';
}

window.addEventListener('load', main);


/**
 * Advanced code
 *
 * stepDelayKey() returns a promise that's resolved on the next key press.
 *
 * stepDelayTimeout() resolves after the given number
 * of milliseconds (default 100).
 *
 * stepDelayAnimationFrame() resolves on the next animation frame.
 */

let pendingResolve = null;

function nextStep(e) {
  if (e.key === ' ' && pendingResolve) {
    const toResolve = pendingResolve;
    pendingResolve = null;
    toResolve();
  }
}

function stepDelayKey() { // eslint-disable-line no-unused-vars
  el.status.textContent = 'Press space to move the next block.';
  return new Promise(resolve => { pendingResolve = resolve; });
}

function stepDelayTimeout(ms = 100) { // eslint-disable-line no-unused-vars
  el.status.textContent = `Moving at ${ms}ms per step.`;
  return new Promise(resolve => setTimeout(resolve, ms));
}

function stepDelayAnimationFrame() { // eslint-disable-line no-unused-vars
  el.status.textContent = 'Moving at every animation frame.';
  return new Promise(resolve => requestAnimationFrame(resolve));
}
