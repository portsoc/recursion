/*
 * Recursive turtle drawings.
 */

import { stepDelayKey as stepDelay } from './delays.js';
import * as T from './turtle-lib.js';

async function main() {
  await T.ready();

  // draw two lines
  T.randomColor();
  T.forward(50);

  T.randomColor();
  T.turnRight(45);
  T.forward(30);


  // // draw a square
  // await square();


  // // draw N rotating squares
  // const N = 36;
  // for (let i = 0; i < N; i += 1) {
  //   await square();
  //   T.turnRight(360 / N);
  //   await stepDelay();
  // }


  // // simple tree
  // T.setY(-60);
  // await simpleTree();


  // // several parametric trees
  // T.setY(-60);
  // T.setX(0);
  // T.randomColor();
  // await tree(40, 40, 35, 0.75, 8);
  //
  // T.setX(-40);
  // T.randomColor();
  // await tree(30, 30, 35, 0.75, 8);
  //
  // T.setX(40);
  // T.randomColor();
  // await tree(30, 30, 50, 0.7, 4);


  // finished
  const status = document.querySelector('#status');
  status.textContent = 'Done.';
}


async function square(size = 50) { // eslint-disable-line no-unused-vars
  for (let i = 0; i < 4; i += 1) {
    T.forward(size);
    T.turnRight(90);
    await stepDelay();
  }
}


async function simpleTree(startLength = 20) { // eslint-disable-line no-unused-vars
  // draw stem
  T.forward(startLength);
  await stepDelay();

  // if the tree is big enough, draw branches
  if (startLength > 8) {
    T.turnLeft(30);
    await simpleTree(startLength * 0.8);
    T.turnRight(65);
    await simpleTree(startLength * 0.8);
    T.turnLeft(35);
  }

  // go back down the stem
  T.back(startLength);
}


async function tree(startLength = 20, left = 30, right = 35, scaling = 0.8, min = 8) { // eslint-disable-line no-unused-vars
  // draw stem
  T.forward(startLength);
  await stepDelay();

  // if the tree is big enough, draw branches
  if (startLength > min) {
    T.turnLeft(left);
    await tree(startLength * scaling, left, right, scaling, min);
    T.turnRight(left + right);
    await tree(startLength * scaling, left, right, scaling, min);
    T.turnLeft(right);
  }

  // go back down the stem
  T.back(startLength);
}

main();
