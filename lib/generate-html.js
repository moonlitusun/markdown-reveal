const fse = require('fs-extra');
const open = require('open');

const log = require('./utils/log');
const { getOutputPath } = require('./helper/output-path');
const { getConfig } = require('./helper/config');

function generateHtml(content) {
  const {
    openInBrower,
  } = getConfig();

  const outputPath = getOutputPath();
  const htmlPath = `${outputPath}/index.html`;
  
  fse.outputFile(htmlPath, content)
    .then(() => {
      log.infoByCfg('Generated HTML file successfully!');

      if (openInBrower) open(htmlPath);
    })
    .catch(err => log.error(`Generated HTML file is wrong: ${err}`))
}

module.exports = generateHtml;