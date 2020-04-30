// this code has deep recursion and will cause stack overflow

function callItself(nTimes) {
  if (nTimes === 0) return; // no calling itself

  callItself(nTimes - 1);
}

console.log('100-deep recursion');
callItself(100);

console.log('1000-deep recursion');
callItself(1000);

console.log('10000-deep recursion');
callItself(10000);

console.log('100000-deep recursion');
callItself(100000);

console.log('1000000-deep recursion');
callItself(1000000);
