#! /usr/bin/env node
const program = require('commander');

const pjson = require('../package.json');
const handler = require('./index');

program
  .usage('[option]', '--type required')
  .version(pjson.version, '-v, --version')
  .option('-f, --file <file>', 'The file path that to convert')
  .option('-u, --output [file]', 'The file path that to output')
  .option('-l, --logProcess', 'Log process')
  .option('-o, --openInBrower', 'Open in the brower')
  .parse(process.argv);

if (program.file) {
  handler(program.file, {
    openInBrower: program.openInBrower,
    outputPath: program.output,
    logProcess: program.logProcess,
  })
}
