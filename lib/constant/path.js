const path = require('path');

const DEFAULT_TPL_PATH = path.resolve(__dirname, '../../template');
const DEFAULT_CONFIG_PATH = path.resolve(DEFAULT_TPL_PATH, './config.yml');
const EJS_TPL_PATH = path.resolve(DEFAULT_TPL_PATH, './index.ejs');

const ASSETS_PATH = path.resolve(__dirname, '../../assets-min/');

const DEFAULT_OUTPUT_PATH = './marker';

module.exports = {
  DEFAULT_TPL_PATH,
  DEFAULT_CONFIG_PATH,
  EJS_TPL_PATH,

  ASSETS_PATH,

  DEFAULT_OUTPUT_PATH,
}