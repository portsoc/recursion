function factorial(n) {
  if (n <= 1) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}

console.log(factorial(7));
// shows 5040 because that's 7*6*5*4*3*2*1
