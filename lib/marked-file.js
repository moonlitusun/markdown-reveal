const fse = require('fs-extra');
const ejs = require('ejs');
const marked = require('marked');

const generateSidebat = require('./generate-sidebar');
const analyzeAdditionalScripts = require('./analyze-additional-scripts');

const log = require('./utils/log');
const { DEFAULT_TITLE } = require('./constant/default');
const { EJS_TPL_PATH } = require('./constant/path');
const { getConfig } = require('./helper/config');

function markedFile(targetPath) {
  return new Promise((resolve, reject) => {
    if (!fse.pathExistsSync(targetPath)) return reject(`no such file or directory, ${targetPath}`);
    
    const stat = fse.lstatSync(targetPath);

    console.log(stat.isFile());

    const { title = DEFAULT_TITLE } = getConfig();

    fse.readFile(targetPath, (err, data) => {
      if (err) reject(`Analyze ${targetPath} content is Wrong, ${err}`);

      log.infoByCfg(`Analyze ${targetPath} content successfully!`);

      const mdContent = marked(data.toString());
      const { sidebarData, contentWithSidebar } = generateSidebat(mdContent);
      const { scripts, links } = analyzeAdditionalScripts();

      const tplData = {
        title,
        navTreeData: JSON.stringify(sidebarData),  
        content: contentWithSidebar,
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