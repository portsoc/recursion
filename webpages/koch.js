/*
 * Recursive turtle drawings.
 */

import { stepDelayKey as keyDelay, stepDelayAnimationFrame as animDelay } from './delays.js';

import * as T from './turtle-lib.js';

async function main() {
  await T.ready();

  T.reset(-45, 0, -90, 'navy', 4);

  await simpleLine(90);

  // await kochLine(90);

  // await kochKochLine(90);


  // await recursiveKochLine(90, 0);
  // await recursiveKochLine(90, 1);
  // await recursiveKochLine(90, 2);


  // T.reset(-45, 0, -90, 'orange', 9);
  // await recursiveKochLine(90, 1);
  //
  // T.reset(-45, 0, -90, 'red', 6);
  // await recursiveKochLine(90, 2);
  //
  // T.reset(-45, 0, -90, 'blue', 3);
  // await recursiveKochLine(90, 3);


  // await kochFlake(90, 3);


  // for (let i = 0; i <= 10; i += 1) {
  //   T.reset(-45, 0, -90, 'navy', 2);
  //   await kochFlake(90, i);
  //   await keyDelay();
  // }

  // finished
  const status = document.querySelector('#status');
  status.textContent = 'Done.';
}


async function simpleLine(size) {
  // await keyDelay();
  // await animDelay();
  T.forward(size);
}

async function kochLine(size) {
  const s = size / 3;

  await simpleLine(s);
  T.turnLeft(60);

  await simpleLine(s);
  T.turnRight(120);

  await simpleLine(s);
  T.turnLeft(60);

  await simpleLine(s);
}


async function kochKochLine(size) {
  const s = size / 3;

  await kochLine(s);
  T.turnLeft(60);

  await kochLine(s);
  T.turnRight(120);

  await kochLine(s);
  T.turnLeft(60);

  await kochLine(s);
}

async function recursiveKochLine(size, breaks = 0) {
  const s = size / 3;
  if (breaks--) {
    await recursiveKochLine(s, breaks);
    T.turnLeft(60);
    await recursiveKochLine(s, breaks);
    T.turnRight(120);
    await recursiveKochLine(s, breaks);
    T.turnLeft(60);
    await recursiveKochLine(s, breaks);
  } else {
    await simpleLine(size);
  }
}

async function kochFlake(size, breaks = 1) {
  await recursiveKochLine(size, breaks);
  T.turnRight(120);
  await recursiveKochLine(size, breaks);
  T.turnRight(120);
  await recursiveKochLine(size, breaks);
}

main();
console.log('ok');
