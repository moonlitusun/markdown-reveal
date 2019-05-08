const { DEFAULT_OUTPUT_PATH } = require('../constant/path');

let outputPath = DEFAULT_OUTPUT_PATH;

function getOutputPath() {
  return outputPath;
}

function setOutputPath(userPath = DEFAULT_OUTPUT_PATH) {
  outputPath = userPath;

  return userPath;
}

module.exports = { getOutputPath, setOutputPath };