const fs = require('fs');

const { DEFAULT_CONFIG_PATH } = require('../constant/path');

const { getOutputPath } = require('./output-path');

function getConfigPath() {
  const userConfigPath = `${getOutputPath()}/config.yml`;
  const configPath = fs.existsSync(userConfigPath) ? userConfigPath : DEFAULT_CONFIG_PATH;

  return configPath;
}

module.exports = { getConfigPath };