const fs = require('fs').promises;
const path = require('path');

async function listDirectoryContents(dir = '.', prefix = '') {
  // get an array of files in the given directory
  const files = await fs.readdir(dir, {
    withFileTypes: true,
  });

  // list each file's name, with extra '/' for directories
  for (const file of files) {
    console.log(`${prefix}${file.name}${fileTypeSymbol(file)}`);

    // also list the contents of the directory
    if (file.isDirectory()) {
      const subdir = path.join(dir, file.name);
      const deeperPrefix = prefix + ' | ';

      await listDirectoryContents(subdir, deeperPrefix);
    }
  }
}

// determine symbol for a file;
// for now only directories get a symbol: '/'
function fileTypeSymbol(file) {
  if (file.isDirectory()) return '/';
  return '';
}

listDirectoryContents();
