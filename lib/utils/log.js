const chalk = require('chalk');

const { getConfig } = require('../helper/config');

class log {
  static info(msg) {
    log.basis(chalk.green('info'), msg);
  }
  static infoByCfg(msg) {
    if (getConfig().logProcess) log.info(msg);
  }
  static warn(msg) {
    log.basis(chalk.yellow('warn'), msg);
  }
  static warnByCfg(msg) {
    if (getConfig().logProcess) log.warn(msg);
  }
  static error(msg) {
    log.basis(chalk.red('error'), msg);
  }
  static errorByCfg(msg) {
    if (getConfig().logProcess) log.error(msg);
  }
  static note(msg) {
    log.basis(chalk.blue('note'), msg);
  }
  static noteByCfg(msg) {
    if (getConfig().logProcess) log.note(msg);
  }
  static basis(prefix, msg) {
    console.log(`${prefix} ${new Date()}: ${msg}`);
  }
}

module.exports = log;
