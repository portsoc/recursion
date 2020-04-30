/*
 * recursive stringification of JS objects
 */

function stringify(value) {
  if (value == null) {
    return 'null';
  }

  if (typeof value === 'number') {
    return value.toString();
  }

  if (typeof value === 'string') {
    return '"' + value + '"';
  }

  if (Array.isArray(value)) {
    return stringifyArray(value);
  }

  if (typeof value === 'object' && value != null) {
    return stringifyObject(value);
  }
}

function stringifyArray(arr) {
  let retval = '[';
  for (let i = 0; i < arr.length; i += 1) {
    retval += stringify(arr[i]);
    if (i < arr.length - 1) {
      retval += ',';
    }
  }
  retval += ']';
  return retval;
}

function stringifyObject(obj) {
  let retval = '{';
  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    retval += '"' + key + '":';
    retval += stringify(obj[key]);
    if (i < keys.length - 1) {
      retval += ',';
    }
  }
  retval += '}';
  return retval;
}

const complexObj = {
  none: null,
  pi: 3.14,
  arr: [
    { age: 18, name: 'me' },
    'another value',
    0,
  ],
};

console.log(stringify(complexObj));
console.log(JSON.stringify(complexObj));

// missing functionality:
// - undefined
// - NaN
// - strings and keys that contain double quotes
// - sparse arrays
// - pretty-printing
// - probably more…
