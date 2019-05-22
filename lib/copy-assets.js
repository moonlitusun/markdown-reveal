const fse = require('fs-extra');

const log = require('./utils/log');
const { ASSETS_PATH, DEFAULT_CONFIG_PATH } = require('./constant/path');
const { getOutputPath } = require('./helper/output-path');

function copyAssets() {
  const outputPath = getOutputPath();
  const configPath = `${outputPath}/config.yml`;

  fse.copy(ASSETS_PATH, outputPath, (err) => {
    if (err) log.error(`Copy assets folder is wrong: ${err}`);

    log.infoByCfg('Copy static resource successfully!');
  })

  fse.pathExists(configPath)
    .then(exists => {
      if (!exists) {
        fse.copy(DEFAULT_CONFIG_PATH, configPath, (err) => {
          if (err) log.error(`Copy config.yml file is wrong: ${err}`);
    
          log.infoByCfg('Copy config.yml file successfully !');
        });
      } else {
        log.noteByCfg('Already have a config.yml file, skip this step!');
      }
    })
}

module.exports = copyAssets;