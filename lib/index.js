const chalk = require('chalk');

const readConfig = require('./read-config-sync');
const markedFile = require('./marked-file');
const copyAsset = require('./copy-asset');
const generateHtml = require('./generate-html');

const { setOutputPath, getOutputPath } = require('./helper/output-path');
const { setConfig } = require('./helper/config');

const makeDirSync = require('./shared/makeDirSync');

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

  // from config.yml
  setConfig(readConfig());

  // from command line
  if (typeof logProcess !== 'undefined') setConfig({ logProcess });
  if (typeof openInBrower !== 'undefined') setConfig({ openInBrower });

  makeDirSync(getOutputPath());

  markedFile(filePath)
    .then(content => {
      copyAsset();
      generateHtml(content);
    })
    .catch(err => console.log(chalk.red(`MarkedFile is wrong: ${err}`)));
}

module.exports = marker;