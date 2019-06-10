const { getConfig } = require('./helper/config');
const analyzeDirConfigField = require('./utils/dir-cfg-field');

function analyzeAdditionalScripts(destPath) {
  let { scripts, links } = getConfig();
  scripts = analyzeDirConfigField(scripts, destPath);
  links = analyzeDirConfigField(links, destPath);

  baseAnalyze(scripts, 1);
  baseAnalyze(links, 2);

  return { scripts: baseAnalyze(scripts, 1), links: baseAnalyze(links, 2) };
}

function baseAnalyze(list, type) {
  let result = '';

  if (list && Array.isArray(list)) {
    list.forEach(item => result += getScriptTag(item, type))
  }

  return result;
}

function getScriptTag(value, type) {
  if (type === 1) return `<script src="${value}"></script> \n`;

  if (type === 2) return `<link rel="stylesheet" href="${value}"></link> \n`;
}

module.exports = analyzeAdditionalScripts;