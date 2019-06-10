const path = require('path');

const isObject = require('./isObject');

module.exports = function analyzeDirConfigField(field, filePath) {
  const key = path.parse(filePath).name;

  return isObject(field) ? field[key] : field;
}
