<h1 align="center">Markdown-reveal</h1>

<h5 align="center">快速，自由配置 & 将markdown文件转换成一个漂亮的html页面的实用工具。</h5>

[English](./README.md) | 简体中文

# 特点

[x] 支持转换文件夹，并可自由添加规则

# 🏡 安装

```bash
npm install markdown-reveal -g
```

```bash
yarn add markdown-reveal global
```

# 🤚 命令行使用

**基本使用**

```bash
mk -f my-markdown.md
```

这时，会生成一个名为`maker`的目录，如下：

```bash
.
├── my-markdown.md
├── marker
|   ├── config.yml # 更自由化的配置文件，具体使用会在下面说明
|   └── index.html
|   └── index.css
|   └── index.js
```

命令行的参数列表如下：

- ✨ `-h | --help`

  查看帮助信息

- ✨ `-f | --file <filePath>`

  **必需参数** 指定要转换的文件地址

- ✨ `-u | --output [filePath]`

  **可选参数** 指定要输出的地址，默认为`./marker`

- ✨ `-l | --logProcess`

  **可选参数** 是否打印日志，此参数也可在`config.yml`中配置，但优先级最高

- ✨ `-o | --openInBrower`

  **可选参数** 完成后是否需要自动在浏览器打开页面以供预览，此参数也可在`config.yml`中配置，但优先级最高

# ⚙ 高级配置

在`config.yml`中你可以拥有更自由和更高级的配置，具体参数如下：

- ✨ openInBrower

与同名参数`openInBrower`作用一样，如果嫌每次都在命令行里输入比较麻烦，可以在这里单独设置

```yml


# @desc: html title
# @type: string | object
# @default: marker
# @example
title:

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

# @desc: Whether to display the title number
# @type: boolean
showSerialNumber: false

# @desc: Whether to expand all nodes
# @type: boolean
openAllNode: false

# @desc: Open html in brower
# @type: boolean
openInBrower: false

# @desc: Log process
# @type: boolean
logProcess: true
```

# todolist

开本地服务器调试
支持主题皮肤
支持选择是否显示菜单栏