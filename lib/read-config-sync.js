const fs = require('fs');

const yaml = require('js-yaml');

const { logStatic } = require('./shared/log');
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
    var doc = yaml.safeLoad(fs.readFileSync(configPath, 'utf8'));

    return doc;
  } catch (e) {
    logStatic(`Read configuration error: ${e}`, 'red');
  }
}

module.exports = readConfig;