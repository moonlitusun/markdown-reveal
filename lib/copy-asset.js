const fs = require('fs');

const { log, logStatic } = require('./shared/log');
const copyDir = require('./shared/copyDir');
const { ASSET_PATH, DEFAULT_CONFIG_PATH } = require('./constant/path');

const { getOutputPath } = require('./helper/output-path');

function copyAsset() {
  const outputPath = getOutputPath();
  const configPath = `${outputPath}/config.yml`;

  copyDir(ASSET_PATH, outputPath);

  if (!fs.existsSync(configPath)) {
    fs.copyFile(DEFAULT_CONFIG_PATH, configPath, (err) => {
      if (err) logStatic(`Copy config.yml file is wrong: ${err}`, 'red');

      log('Copy config.yml file successfully !', 'green');
    });
  } else {
    log('Already have a config.yml file, skip the current step !', 'cyanBright');
  }
  
  log('Copy static resource successfully !', 'green');
}

module.exports = copyAsset;