
document.addEventListener('keydown', nextStep);

let pendingResolve = null;

function nextStep(e) {
  if (e.key === " " && pendingResolve) {
    const toResolve = pendingResolve;
    pendingResolve = null;
    toResolve();
  }
}

function stepDelay() {
  return new Promise(resolve => { pendingResolve = resolve; });
}

async function moveBlocks(n, from, to, through) {
  if (n < 1) return; // nothing to do

  if (n === 1) {
    console.log(`will move 1 block from ${getName(from)} to ${getName(to)}`)
    await stepDelay();
    const block = from.querySelector('.block');
    to.insertBefore(block, to.querySelector('.block'));
    return;
  }

  // we have more than one block to move, can't do it in a single step

  // move all but one blocks out of the way to the "through" tower
  await moveBlocks(n-1, from, through, to);

  // move last block to the "to" tower
  await moveBlocks(1, from, to, through);

  // move the rest of the blocks back from "through" to "to"
  await moveBlocks(n-1, through, to, from);
}

function getName(el) {
  const h2 = el.querySelector('h2');
  if (h2) return h2.textContent;

  return "noname";
}


async function main() {
  const towers = document.querySelectorAll('.tower');
  const n = towers[0].children.length;

  await moveBlocks(n, towers[0], towers[1], towers[2]);

  const status = document.querySelector('#status');
  status.textContent = 'All done, thanks for playing. Reload to restart.';
}

window.addEventListener('load', main);
