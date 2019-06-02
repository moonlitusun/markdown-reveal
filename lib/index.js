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
function marker(filePath, option = {}) {
  const {
    logProcess,
    openInBrower,
    outputPath,
  } = option;

  setOutputPath(outputPath);
  setConfig(readConfig());
  customConfig({ logProcess, openInBrower });

  markedFile(filePath)
    .then(content => {
      generateHtml(content);
      copyAssets();
    })
    .catch(err => log.error(`Marked file is wrong: ${err}`));
}

module.exports = marker;