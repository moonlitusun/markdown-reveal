const { DEFAULT_OUTPUT_PATH } = require('../constant/path');

let outputPath = DEFAULT_OUTPUT_PATH;

function getOutputPath() {
  return outputPath;
}

function setOutputPath(realPath = DEFAULT_OUTPUT_PATH) {
  return outputPath = realPath;
}

module.exports = { getOutputPath, setOutputPath };