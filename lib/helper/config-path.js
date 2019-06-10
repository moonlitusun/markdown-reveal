const fse = require('fs-extra');

const { DEFAULT_CONFIG_PATH_WITH_FILE, DEFAULT_CONFIG_PATH_WITH_DIR } = require('../constant/path');
const { getOutputPath } = require('./output-path');
const { getConfig } = require('./config');

let configFilePath = 'file';
let defaultConfigPath = DEFAULT_CONFIG_PATH_WITH_FILE;

function switchTypeOfConfigPath(type) {
  if (type === 2) {
    configFilePath = 'dir';
    defaultConfigPath = DEFAULT_CONFIG_PATH_WITH_DIR;
  }
}

function getPathOfDefaultConfig() {
  return defaultConfigPath;
}

function getPathOfUserConfig() {
  return `${getOutputPath()}/config-${configFilePath}.yml`;
}

function getPathOfConfig() {
  const { type } = getConfig();
  switchTypeOfConfigPath(type);

  return fse.existsSync(getPathOfUserConfig()) ? getPathOfUserConfig() : getPathOfDefaultConfig();
}

module.exports = {
  getPathOfDefaultConfig,
  getPathOfUserConfig,
  getPathOfConfig,
  switchTypeOfConfigPath,
};
