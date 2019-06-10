const fse = require('fs-extra');
const yaml = require('js-yaml');

const log = require('./utils/log');
const { getPathOfConfig } = require('./helper/config-path');

function readConfigFile() {
  const configPath = getPathOfConfig();

  try {
    var doc = yaml.safeLoad(fse.readFileSync(configPath, 'utf8'));

    return doc;
  } catch (err) {
    log.error(`Read configuration file is error: ${err}`);
  }
}

module.exports = readConfigFile;