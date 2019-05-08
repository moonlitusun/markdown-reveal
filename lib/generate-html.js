const fs = require('fs');

const open = require('open');

const { log, logStatic } = require('./shared/log');

const { getOutputPath } = require('./helper/output-path');
const { getConfig } = require('./helper/config');

/**
 * generateHtml
 * 
 * @param {string} content The content that markdown file marked
 *
 */
function generateHtml(content) {
  const {
    openInBrower,
  } = getConfig();

  const outputPath = getOutputPath();

  const htmlPath = `${outputPath}/index.html`;

  fs.writeFile(htmlPath, content, (err) => {
    if (err) logStatic(`Generated HTML file is wrong: ${err}`, 'red');

    log('Generated HTML file successfully!', 'green');

    if (openInBrower) open(htmlPath);
  })
}

module.exports = generateHtml;