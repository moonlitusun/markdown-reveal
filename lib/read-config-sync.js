const fse = require('fs-extra');
const yaml = require('js-yaml');

const log = require('./utils/log');
const { getConfigPath } = require('./helper/config-path');

/**
 * readConfig
 *
 * @returns {string} yml to js string
 *
 */
function readConfig() {
  const configPath = getConfigPath();

  try {
    var doc = yaml.safeLoad(fse.readFileSync(configPath, 'utf8'));

    return doc;
  } catch (e) {
    log.error(`Read configuration error: ${e}`);
  }
}

module.exports = readConfig;