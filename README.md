## Easycanvas

![https://github.com/chenzhuo1992/easycanvas/blob/master/demos/index.html](https://github.com/chenzhuo1992/easycanvas/blob/master/demos/index.gif?raw=true)

See demo code [here](https://github.com/chenzhuo1992/easycanvas/blob/master/demos/index.html), 30 lines only!

### Introduction

A lite(30kb) canvas library, includes a Chrome plugin for debugging. Support physics and animations with high performace. Suits mobile, PC(including IE) and Chinese '微信小程序/小游戏'.

Expandable: Support highly decoupled components and custom API/events.

### More Information

- [English](https://github.com/chenzhuo1992/easycanvas/blob/master/readme/build/readme.English.md).
- [中文](https://github.com/chenzhuo1992/easycanvas/blob/master/readme/build/readme.Chinese.md).
- [资料：Easycanvas实现高仿热血传奇游戏](https://github.com/chenzhuo1992/Mir2/wiki/%E3%80%8AJS%E5%AE%9E%E7%8E%B0%E7%83%AD%E8%A1%80%E4%BC%A0%E5%A5%87%E3%80%8B1.%E5%BC%80%E5%8F%91%E5%89%8D%E7%9A%84%E5%87%86%E5%A4%87).

### More demos

- `npm run dev`, then `localhost:8080/demos/demo1.html`.

### Chrome Plugin

Throw `./plugin/dist` to `Chrome://extensions`.

### Build files

#### Base:

- `build/easycanvas.js`: Node module.

- `build/easycanvas.standalone.dev.js`: Standalone version, support chrome develop tools.

- `build/easycanvas.standalone.prod.js`: Standalone version for production mode, 20kb+.

#### Plugins(Components):

`Following plugins support node version, 'standalone.dev' and 'standalone.prod' version.`

- `build/plugin.gif[.*].js`([Guide](https://github.com/chenzhuo1992/easycanvas/blob/master/readme/build/plugin.gif.English.md),[介绍](https://github.com/chenzhuo1992/easycanvas/blob/master/readme/build/plugin.gif.Chinese.md)): Support gif rendering.

- `build/plugin.physics[.*].js`([Guide](https://github.com/chenzhuo1992/easycanvas/blob/master/readme/build/plugin.physics.English.md),[介绍](https://github.com/chenzhuo1992/easycanvas/blob/master/readme/build/plugin.physics.Chinese.md)): Expanded physics to sprites.

- `build/plugin.number[.*].js`: A component of numbers countdown effect.

- `build/plugin.shuttle[.*].js`([Guide](https://github.com/chenzhuo1992/easycanvas/blob/master/readme/build/plugin.shuttle.English.md),[介绍](https://github.com/chenzhuo1992/easycanvas/blob/master/readme/build/plugin.shuttle.Chinese.md)): A component of background effect, likes shuttle.

- `build/plugin.webgl[.*].js`([Guide](https://github.com/chenzhuo1992/easycanvas/blob/master/readme/build/plugin.webgl.English.md),[介绍](https://github.com/chenzhuo1992/easycanvas/blob/master/readme/build/plugin.webgl.Chinese.md)): Support webgl rendering.
