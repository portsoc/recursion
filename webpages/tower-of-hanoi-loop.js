/*
 * Iterative solution to the Tower of Hanoi problem.
 */

import { stepDelayKey as stepDelay } from './delays.js';

async function moveBlocks(n, from, to, through) {
  if (n % 2 === 0) {
    // for even numbers of disks, need to reverse the order
    [to, through] = [through, to];
  }

  // simply do legal moves between pairs of towers:
  // from&to, from&through, to&through, loop until done
  do {
    await moveBlockBetween(from, to);

    // rotate the towers: move the last to be the first
    [from, to, through] = [through, from, to];
  } while (!isDone(from, to, through));
}

// move block between towers t1 and t2, whichever way is a legal move
async function moveBlockBetween(t1, t2) {
  const block1 = t1.querySelector('.block');
  const block2 = t2.querySelector('.block');

  const size1 = Number(block1?.dataset.size ?? Infinity);
  const size2 = Number(block2?.dataset.size ?? Infinity);

  if (size1 > size2) {
    await moveBlock(t2, t1);
  } else {
    await moveBlock(t1, t2);
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

function isDone(from, to, through) {
  // done when all the blocks are in just one element

  let nonEmptyCount = 0;

  if (from.querySelectorAll('.block').length > 0) nonEmptyCount += 1;
  if (to.querySelectorAll('.block').length > 0) nonEmptyCount += 1;
  if (through.querySelectorAll('.block').length > 0) nonEmptyCount += 1;

  return nonEmptyCount <= 1;
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
