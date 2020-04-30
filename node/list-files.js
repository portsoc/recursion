const fs = require('fs').promises;

async function listDirectoryContents(dir = '.') {
  // get an array of files in the given directory
  const files = await fs.readdir(dir, {
    withFileTypes: true,
  });

  // list each file's name, with extra '/' for directories
  for (const file of files) {
    console.log(`${file.name}${fileTypeSymbol(file)}`);
  }
}

// determine symbol for a file;
// for now only directories get a symbol: '/'
function fileTypeSymbol(file) {
  if (file.isDirectory()) return '/';
  return '';
}

listDirectoryContents();
