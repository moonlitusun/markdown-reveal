#! /usr/bin/env node
const program = require('commander');

const { version } = require('../package.json');
const handler = require('./index');

program
  .usage('[option]', '--type required')
  .version(version, '-v, --version')
  .option('-f, --file <filePath>', 'The file path that to convert')
  .option('-u, --output [filePath]', 'The file path that to output')
  .option('-l, --logProcess', 'Whether need to print process information')
  .option('-o, --openInBrower', 'Whether Open in the brower')
  .parse(process.argv);

if (program.file) {
  handler(program.file, {
    openInBrower: program.openInBrower,
    outputPath: program.output,
    logProcess: program.logProcess,
  })
}
