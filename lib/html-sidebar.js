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
    data = [], // jstree data
    stack = [], // headers level form
    headerDomList = $('h1, h2, h3, h4, h5, h6');

  headerDomList.each(function() {
    const
      level = $(this).get(0).tagName.replace('h', '');

    while (stack.length < level) {
      stack.push(0);
    }

    while (stack.length > level) {
      stack.pop();
    }

    console.log(stack);

    stack[stack.length - 1] += 1;
    
    let textContent = $(this).text();

    const
      parentNodeIndex = stack.slice(0, -1).join('.'),
      currNodeIndex = stack.join('.'),

      parentNodeId = !parentNodeIndex ? '#' : (parentNodeIndex),
      currNodeId = currNodeIndex;

    $(this).attr('id', `tree${currNodeIndex}`);

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