<h1 align="center">Marker</h1>

<h5 align="center">Fast, flexible & convert your makedown file to a beautiful html page.</h5>

# :two_hearts: :email: Installation

**npm**

```bash
npm install markdown-reveal -g
```

**yarn**

```bash
yarn global add markdown-reveal
```

# :smiling_imp: Usage

```bash
Usage: mk [option]

Options:
  -v, --version        Output the version number
  -f, --file <file>    The file path that to convert
  -u, --output [file]  The file path that to output
  -l, --logProcess     Log process
  -o, --openInBrower   Open in the brower
  -h, --help           Output usage information
```

**e.g**:

```bash
mk -f './demo.md' -u 'demo'
```

# :wrench: Configuration

You can customize the configuration in `config.yml`

```yml
# @desc: Open html in brower
# @type: boolean
openInBrower: false

# @desc: Log process
# @type: boolean
logProcess: true

# @desc: html title
# @type: string
# @default: marker
title: 'marker'

# @desc: Whether to display the title number
# @type: boolean
showSerialNumber: false

# @desc: Whether to expand all nodes
# @type: boolean
openAllNode: false

# @desc: Additional custom scripts that need to be introduced
# @type: Array
# @example:
#  scripts:
#   - 'xxx1'
#   - 'xxx2'
scripts:

# @desc: Additional custom links that need to be introduced
# @type: Array
# @example:
#  links:
#   - 'xxx1'
#   - 'xxx2'
links:
```

# :flashlight: TODOLIST

- [ ] Support convert folder
- [ ] Compress static resources
- [ ] link animate
