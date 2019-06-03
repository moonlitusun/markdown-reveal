const readConfig = require('./read-config');
const markedFile = require('./marked-file');
const copyAssets = require('./copy-assets');
const generateHtml = require('./generate-html');

const log = require('./utils/log');
const { setOutputPath } = require('./helper/output-path');
const { setConfig, customConfig } = require('./helper/config');

/**
 * The parser
 *
 * @param {string} filePath The file path to convert
 * @param {Object} [options]
 * @param {string} options.outputPath The file path to output
 * @param {boolean} options.openInBrower open in brower
 * @param {boolean} options.log log process
 *
 */
function baseMarker(type) {
  return function (target, option) {
    const {
      logProcess,
      openInBrower,
      outputPath,
    } = option;
    
    setOutputPath(outputPath);
    setConfig(readConfig());
    customConfig({ logProcess, openInBrower });
    
    copyAssets();
    switch (type) {
      case 1:
        markedFile(target);
        break;
      case 2:
        // markedFile(target);
        console.log(2);
        break;
      default: break;
    }
  }
}

const makerWithFile = baseMarker(1);
const makerWithDir = baseMarker(2);

module.exports = { makerWithFile, makerWithDir };