## Easycanvas

![https://github.com/chenzhuo1992/easycanvas/blob/master/demos/index.html](https://github.com/chenzhuo1992/easycanvas/blob/master/demos/index.gif?raw=true)

### Introduction

A lite(20kb+) canvas library, includes a Chrome plugin for debugging. Support physics and animations with high performace. Suits mobile, PC(including IE) and Chinese '微信小程序/小游戏'.

Expandable: Support highly decoupled components and custom API/events.

[Here](https://github.com/chenzhuo1992/Mir2) is a Canvas MMORPG Game demo based on this lib.

### More Information

- [English Guide](https://github.com/chenzhuo1992/easycanvas/blob/master/readme/build/readme.English.md).
- [中文介绍](https://github.com/chenzhuo1992/easycanvas/blob/master/readme/build/readme.Chinese.md).

### Changelog

- [Changelog](https://github.com/chenzhuo1992/easycanvas/blob/master/CHANGELOG.md).

### See demos

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

<img width="0" height="0" src="http://122.114.162.204:8001/point?from=github">
