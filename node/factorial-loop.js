function factorial(n) {
  let retval = 1;
  for (let i = 2; i <= n; i += 1) {
    retval *= i;
  }
  return retval;
}

console.log(factorial(4));
// shows 24 because that's 4*3*2*1
