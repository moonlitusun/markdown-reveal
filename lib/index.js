const readConfigFile = require('./config-read');
const { generateHTMLWithFile, generateHTMLWithDir } = require('./html-generate');
const copyAsset = require('./asset-copy');

const { setOutputPath } = require('./helper/output-path');
const { setConfig, setCustomConfig } = require('./helper/config');

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
    setCustomConfig({ type });
    setConfig(readConfigFile());
    setCustomConfig({ logProcess, openInBrower });
    
    copyAsset();
    switch (type) {
      case 1:
        generateHTMLWithFile(target);
        break;
      case 2:
        generateHTMLWithDir(target);
        break;
      default: break;
    }
  }
}

const makerWithFile = baseMarker(1);
const makerWithDir = baseMarker(2);

module.exports = { makerWithFile, makerWithDir };