const config = {};

function getConfig() {
  return config;
}

function setCustomConfig(configList) {
  Reflect.ownKeys(configList).forEach(item => {
    if (typeof configList[item] !== 'undefined') setConfig({ [item]: configList[item] });
  })
}

function setConfig(configList) {
  Object.assign(config, configList);
}

module.exports = { getConfig, setCustomConfig, setConfig };