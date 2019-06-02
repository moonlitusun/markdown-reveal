const config = {};

function getConfig() {
  return config;
}

function customConfig(configList) {
  Reflect.ownKeys(configList).forEach(item => {
    if (typeof configList[item] !== 'undefined') {
      setConfig({ [item]: configList[item] })
    }
  })
}

function setConfig(configList) {
  Object.assign(config, configList);
}

module.exports = { getConfig, customConfig, setConfig };