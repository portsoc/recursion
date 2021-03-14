function factorial(n) {
  let retval = 1;
  for (let i = 2; i <= n; i += 1) {
    retval *= i;
  }
  return retval;
}

console.log(factorial(7));
// shows 5040 because that's 7*6*5*4*3*2*1
