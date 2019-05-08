const chalk = require('chalk');

const { getConfig } = require('../helper/config');

function logStatic(content, color) {
  console.log(chalk[color](content));
}

function log(content, color) {
  const { logProcess } = getConfig();

  if (logProcess) logStatic(content, color);
}

module.exports = { log, logStatic };
