const cheerio = require('cheerio');
const path = require('path');
const { getOutputPath } = require('./helper/output-path');

const { getConfig } = require('./helper/config');
const log = require('./utils/log');

function generateSidebar(content = '', destPath) {
  const $ = cheerio.load(content);
  const {
    showSerialNumber,
    openAllNode,
  } = getConfig();

  const htmlPath = `${getOutputPath()}/${path.parse(destPath).name}.html`;

  const
    data = [],
    headerDomList = $('h1, h2, h3, h4, h5, h6');

  let stack = [];

  headerDomList.each(function() {
    const level = $(this).get(0).tagName.replace('h', '');

    let textContent = $(this).text();
    let parentNodeIndexWithSlice = -1;

    while (stack.length < level) {
      stack.push(0);
    }

    while (stack.length > level) {
      stack.pop();
    }

    const len = stack.length;

    stack[len - 1] += 1;
    
    while (stack[len + parentNodeIndexWithSlice - 1] === 0) {
      parentNodeIndexWithSlice--;
    }

    // Fixed when the first line starts with a small line number
    // Set all opening tags to h1
    if (stack[0] === 0) {
      stack = stack.slice(-1);
    }

    const
      parentNodeIndex = stack.slice(0, parentNodeIndexWithSlice).join('.'),
      currNodeIndex = stack.join('.'),

      parentNodeId = !parentNodeIndex ? '#' : (parentNodeIndex),
      currNodeId = currNodeIndex;

    $(this).attr('id', `mk-${currNodeIndex}`);

    if (showSerialNumber) {
      textContent = `<b>${currNodeIndex}</b>. ${textContent}`;
    }

    data.push({
      id: currNodeId,
      parent: parentNodeId,
      text: textContent,
      state: {
        opened: openAllNode,
      },
    })
  });

  log.infoByCfg(`Generate ${htmlPath} sidebar data successfully!`);

  return { contentWithSidebar: $.html('body >'), sidebarData: data };
}

module.exports = generateSidebar;