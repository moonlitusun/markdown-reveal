const fse = require('fs-extra');

const log = require('./utils/log');
const { ASSETS_PATH } = require('./constant/path');
const { getOutputPath } = require('./helper/output-path');
const { getPathOfDefaultConfig, getPathOfUserConfig } = require('./helper/config-path');

async function copyAsset() {
  const outputPath = getOutputPath();
  const userConfigPath = getPathOfUserConfig();

  await fse.copy(`${ASSETS_PATH}/css`, `${outputPath}/css`);
  log.infoByCfg(`Copy js resource successfully!`);

  await fse.copy(`${ASSETS_PATH}/js`, `${outputPath}/js`);
  log.infoByCfg(`Copy css resource successfully!`);

  if (!fse.pathExistsSync(userConfigPath)) {
    await fse.copy(getPathOfDefaultConfig(), userConfigPath);
    log.infoByCfg(`Copy config file successfully!`);
  } else {
    log.noteByCfg('Already have a config file, skip this step!');
  }
}

module.exports = copyAsset;