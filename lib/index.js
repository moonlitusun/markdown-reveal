const readConfig = require('./read-config-sync');
const markedFile = require('./marked-file');
const copyAssets = require('./copy-assets');
const generateHtml = require('./generate-html');

const { setOutputPath } = require('./helper/output-path');
const { setConfig } = require('./helper/config');
const { log } = require('./utils/log');

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

  if (typeof outputPath !== 'undefined') setOutputPath(outputPath);

  // From config.yml
  setConfig(readConfig());

  // From command line
  if (typeof logProcess !== 'undefined') setConfig({ logProcess });
  if (typeof openInBrower !== 'undefined') setConfig({ openInBrower });

  markedFile(filePath)
    .then(content => {
      copyAssets();
      generateHtml(content);
    })
    .catch(err => log.error(`MarkedFile is wrong: ${err}`));
}

module.exports = marker;