const config = {};

function getConfig() {
  return config;
}

function setConfig(userConfig) {
  Object.assign(config, userConfig);
}

module.exports = { getConfig, setConfig };