/*
 * Recursive solution to the Tower of Hanoi problem.
 */

import { stepDelayKey as stepDelay } from './delays.js';

async function moveBlocks(n, from, to, spare) {
  if (n < 1) return; // nothing to do

  // if only moving one block, just move it
  if (n === 1) {
    await moveBlock(from, to);
  } else {
    // we have more than one block to move, can't do it in a single step,
    // so we will do it as three steps:
    // 1. move all but one blocks out of the way to the "spare" tower,
    // 2. move the last block to the "to" tower,
    // 3. move the rest of the blocks back from "spare" to "to".

    await moveBlocks(n - 1, from, spare, to);
    await moveBlock(from, to);
    await moveBlocks(n - 1, spare, to, from);
  }
}

async function moveBlock(from, to) {
  // first report that we'll move the block and wait a bit
  console.log(`will move a block from ${getName(from)} to ${getName(to)}`);
  await stepDelay();

  // actually move the first block
  const block = from.querySelector('.block');
  to.insertBefore(block, to.querySelector('.block'));
}

function getName(el) {
  const h2 = el.querySelector('h2');
  if (h2) return h2.textContent;

  return 'noname';
}


async function main() {
  const towers = document.querySelectorAll('.tower');
  const n = towers[0].querySelectorAll('.block').length;

  await moveBlocks(n, towers[0], towers[2], towers[1]);

  const status = document.querySelector('#status');
  status.textContent = 'All done, thanks for playing. Reload to restart.';
}

window.addEventListener('load', main);
