const path = require('path');

const DEFAULT_TPL_PATH = path.resolve(__dirname, '../../template');
const DEFAULT_OUTPUT_PATH = './marker';

const DEFAULT_CONFIG_PATH_WITH_FILE = path.resolve('../config', './config-file.yml');
const DEFAULT_CONFIG_PATH_WITH_DIR = path.resolve('../config', './config-dir.yml');

const EJS_TPL_PATH = path.resolve(DEFAULT_TPL_PATH, './index.ejs');

const ASSETS_PATH = path.resolve(__dirname, '../../src/dist');


module.exports = {
  DEFAULT_TPL_PATH,
  DEFAULT_CONFIG_PATH_WITH_FILE,
  DEFAULT_CONFIG_PATH_WITH_DIR,
  EJS_TPL_PATH,

  ASSETS_PATH,

  DEFAULT_OUTPUT_PATH,
}