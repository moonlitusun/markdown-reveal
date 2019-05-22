const fs = require('fs');
const marked = require('marked');
const ejs = require('ejs');

const generateNav = require('./generate-nav');
const analyzeAdditionalScripts = require('./analyze-additional-scripts');

const { DEFAULT_TITLE } = require('./constant/default');
const { EJS_TPL_PATH } = require('./constant/path');
const { getConfig } = require('./helper/config');
const log = require('./utils/log');

/**
 * Read markdown File ==> convert to HTML
 *
 * @param {string} mdPath The markdown File path
 *
 */
function markedFile(mdPath) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(mdPath)) return reject(`Error: ENOENT: no such file or directory, ${mdPath}`);

    const {
      title = DEFAULT_TITLE,
    } = getConfig();

    fs.readFile(mdPath, (err, data) => {
      if (err) reject(`Analyze markdown file content is Wrong, ${err}`);

      log.infoByCfg('Analyze markdown file content successfully!');

      const mdContent = marked(data.toString());
      const { navData, contentWithNav } = generateNav(mdContent);
      const { scripts, links } = analyzeAdditionalScripts();

      const tplData = {
        title,
        navTreeData: JSON.stringify(navData),  
        content: contentWithNav,
        links,
        scripts,
      }

      ejs.renderFile(EJS_TPL_PATH, tplData, {}, (err, str) => {
        if (err) reject(`Convert markdown content to HTML content is Wrong, ${err}`);

        log.infoByCfg('Convert markdown content to HTML content successfully!');
        resolve(str);
      });
    })
  })
}

module.exports = markedFile;