const fs = require('fs').promises;
const path = require('path');

async function findFile(target, dir = '.') {
  // get an array of files in the given directory
  const files = await fs.readdir(dir, {
    withFileTypes: true,
  });

  // check each file name
  for (const file of files) {
    if (file.name === target) {
      // file found, say where
      return path.join(dir, file.name);
    }
  }

  // try subdirectories
  for (const file of files) {
    if (file.isDirectory()) {
      const subdir = path.join(dir, file.name);
      const found = await findFile(target, subdir);
      if (found) return found;
    }
  }

  // not found
  return null;
}

async function main() {
  // the first command-line parameter is the file name
  const fileName = process.argv[2];

  if (!fileName) {
    console.error('need a file name to look for');
    return;
  }

  const found = await findFile(fileName);
  if (found) {
    console.log(found);
  } else {
    console.error('not found');
  }
}

main();
