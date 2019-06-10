const fse = require('fs-extra');
const path = require('path');
const ejs = require('ejs');
const marked = require('marked');

const generateSidebar = require('./html-sidebar');
const analyzeAdditionalScripts = require('./html-script');
const writeHtml = require('./html-write');

const log = require('./utils/log');
const analyzeDirConfigField = require('./utils/dir-cfg-field');
const { EJS_TPL_PATH } = require('./constant/path');
const { getConfig } = require('./helper/config');

function baseGenerator(targetPath, destPath) {
  if (!fse.pathExistsSync(targetPath)) return log.error(`no such file or directory, ${targetPath}`);

  const { title } = getConfig();

  fse.readFile(targetPath, (err, data) => {
    if (err) log.error(`Analyze ${targetPath} content is Wrong, ${err}`);

    log.infoByCfg(`Analyze ${targetPath} content successfully!`);

    const mdContent = marked(data.toString());
    const { sidebarData, contentWithSidebar } = generateSidebar(mdContent, destPath);
    const { scripts, links } = analyzeAdditionalScripts(destPath);

    const tplData = {
      title: analyzeDirConfigField(title, destPath),
      navTreeData: JSON.stringify(sidebarData),
      content: contentWithSidebar,
      links,
      scripts,
    }

    ejs.renderFile(EJS_TPL_PATH, tplData, {}, (err, str) => {
      if (err) return log.error(`Convert ${targetPath} content to HTML content is Wrong, ${err}`);
      log.infoByCfg(`Convert ${targetPath} content to HTML content successfully!`);

      writeHtml(str, destPath);
    });
  })
}

function readdir(target) {
  fse.readdir(target)
    .then(res => {
      if (res.length) {
        res.forEach(item => {
          const currPath = path.resolve(target, item);
          const stats = fse.lstatSync(currPath);
          if (stats.isDirectory()) return readdir(currPath);

          if (path.extname(item) === '.md') {
            generateHTMLWithFile(currPath, currPath);
          }
        })
      }
    })
    .catch(err => log.error(`Read ${target} is error: ${err}`));
}

function generateHTMLWithFile(target) {
  return baseGenerator(target, path.basename(target));
}

function generateHTMLWithDir(target) {
  const stats = fse.lstatSync(target);

  if (!stats.isDirectory()) return log.error(`${target} is not a directory!`);

  readdir(target);
}

module.exports = { generateHTMLWithFile, generateHTMLWithDir };