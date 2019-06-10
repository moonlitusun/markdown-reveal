const fse = require('fs-extra');
const path = require('path');
const open = require('open');


const log = require('./utils/log');
const { getOutputPath } = require('./helper/output-path');
const { getConfig } = require('./helper/config');

function generateHtml(content, destPath) {
  const {
    openInBrower,
  } = getConfig();

  const htmlPath = `${getOutputPath()}/${path.parse(destPath).name}.html`;
  
  fse.outputFile(htmlPath, content)
    .then(() => {
      log.infoByCfg(`Write ${htmlPath} successfully!`);

      if (openInBrower) open(htmlPath);
    })
    .catch(err => log.error(`Write ${htmlPath} is wrong: ${err}`))
}

module.exports = generateHtml;