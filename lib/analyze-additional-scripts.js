const { getConfig } = require('./helper/config');

function analyzeAdditionalScripts() {
  const { scripts, links } = getConfig();

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