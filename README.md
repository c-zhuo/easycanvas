## Easycanvas

![https://github.com/chenzhuo1992/easycanvas/blob/master/_forIO/index.html](https://github.com/chenzhuo1992/easycanvas/blob/master/_forIO/index.gif?raw=true)

### Introduction

A lite(20kb+) canvas library, includes a Chrome plugin for debugging. Support physics and animations with high performace. Suits mobile and PC(including IE).


### More Information

- [English](https://github.com/chenzhuo1992/easycanvas/blob/master/readme/build/English.md).
- [中文](https://github.com/chenzhuo1992/easycanvas/blob/master/readme/build/Chinese.md).

### Chrome Plugin

Throw `./plugin/dist` to `Chrome://extensions`.

### Build files

Base:

`build/easycanvas.js`: Node module, with gif2canvas supports.
`build/easycanvas.lite.js`: Node module, 30kb+.
`build/easycanvas.standalone.dev.js`: Standalone version, support chrome develop tools.
`build/easycanvas.standalone.prod.js`: Standalone version for production mode.

Plugin:

`build/plugin.physics[.*].js`: Node module, support physics.
