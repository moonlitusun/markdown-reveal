const fs = require('fs');
const path = require('path');

const { log } = require('../shared/log');

const makeDirSync = require('./makeDirSync');

/**
 * coryDir
 *
 * @param {string} entry
 * @param {string} output
 *
 */
function copyDir(entry, output){
  fs.readdir(entry, (err, paths) => {
    if(err) throw (err);

    paths.forEach(item => {
      const entryPath = path.resolve(entry, item);
      const outputPath = path.resolve(output, item);

      fs.stat(entryPath, (err, stats) => {
        if (err) throw err;

        if (stats.isFile()) {
          if (fs.existsSync(outputPath)) {
            log(`Already have a ${item} file, skip the current step !`, 'cyanBright');
          } else {
            const readable = fs.createReadStream(entryPath);
            const writable = fs.createWriteStream(outputPath);
            readable.pipe(writable);

            log(`Copy ${item} successfully!`, 'green');
          }
        }
        else if (stats.isDirectory()) {
          makeDirSync(outputPath);

          copyDir(entryPath, outputPath);
        }
      })
    })
  });
}

module.exports = copyDir;