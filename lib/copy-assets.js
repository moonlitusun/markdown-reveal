const fse = require('fs-extra');

const log = require('./utils/log');
const { ASSETS_PATH, DEFAULT_CONFIG_PATH } = require('./constant/path');
const { getOutputPath } = require('./helper/output-path');

function filterDemoFunc(src) {
  return !src.includes('demo.html');
}

async function copyAssets() {
  const outputPath = getOutputPath();
  const configPath = `${outputPath}/config.yml`;

  await fse.copy(ASSETS_PATH, outputPath, { filter: filterDemoFunc })

  if (!fse.pathExistsSync(configPath)) {
    await fse.copy(DEFAULT_CONFIG_PATH, configPath)
  } else {
    log.noteByCfg('Already have a config.yml file, skip this step!');
  }

  log.infoByCfg('Copy static resource successfully!');
}

module.exports = copyAssets;