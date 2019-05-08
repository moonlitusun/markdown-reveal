const fs = require('fs');

function makeDirSync(dirPath) {
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
}

module.exports = makeDirSync;