## Easycanvas

![https://github.com/chenzhuo1992/easycanvas/blob/master/demos/index.html](https://github.com/chenzhuo1992/easycanvas/blob/master/demos/index.gif?raw=true)

Easycanvas是一个轻量、高效率的渐进式canvas渲染库，核心思路是由数据的变化来驱动视图的变化。将canvas与一个树形的数据结构绑定，当数据改变时视图将随之更新，并且提供了一个Chrome插件来便于开发，包括数据结构的显示、对canvas中某个元素的样式进行调整等。并且提供了一些插件，支持物理引擎、3D模型渲染等扩展功能。

- [中文教程](https://chenzhuo1992.github.io/easycanvas/).
- [在线Demo：Easycanvas实现高仿热血传奇游戏](https://github.com/chenzhuo1992/Mir2/wiki/%E3%80%8AJS%E5%AE%9E%E7%8E%B0%E7%83%AD%E8%A1%80%E4%BC%A0%E5%A5%87%E3%80%8B1.%E5%BC%80%E5%8F%91%E5%89%8D%E7%9A%84%E5%87%86%E5%A4%87).
- [在线Demo：Easycanvas实现3D版弹一弹小游戏](https://chenzhuo1992.github.io/tanyitan/).
- [English Guide(will update soon)](https://github.com/chenzhuo1992/easycanvas/blob/master/readme/build/readme.English.md).

#### Featrues

- ☑ 渐进式基础库
- ☑ 2D渲染
- ☑ 精灵动画
- ☑ 物理引擎（插件）
- ☑ 事件、钩子
- ☑ 开发者工具（Chrome扩展插件）
- ☑ 基础文档
- ☑ 基础功能的单元测试
- ☑ 3D渲染（插件）
- ☑ 同一实例中2D、3D混合渲染
- ☑ 3000个150x150的图片2D渲染时保持60fps
- ☑ 1000个3D模型渲染时保持60fps
- ☑ 支持加载3ds模型（插件）
- ☑ 允许自定义组件
- ☑ 允许自定义插件
- ☐ 文档补齐
- ☐ 支持加载mmd模型（插件）
- ☐ 支持加载dds图片（插件）
- ☐ 更多功能的单元测试
- ☐ 调试工具的性能分析部分完善
- ☐ 粒子效果（插件）
- ☐ webgl的3D渲染性能优化

#### Changelog

- [Changelog](https://github.com/chenzhuo1992/easycanvas/blob/master/CHANGELOG.md).

### Introduction

A lite(30kb) canvas library, includes a Chrome plugin for debugging. Support physics and animations with high performace. Suits mobile, PC(including IE) and Chinese '微信小程序/小游戏'.

Expandable: Support highly decoupled components and custom API/events.

### More demos

- `npm run dev`, then `localhost:8080/demos/demo1.html`.

### Chrome Plugin

Throw `./plugin/dist` to `Chrome://extensions`.

### How to use

#### Import Easycanvas:

- `build/easycanvas.js`: Node module.

- `build/easycanvas.standalone.dev.js`: Standalone version, support chrome develop tools.

- `build/easycanvas.standalone.prod.js`: Standalone version for production mode, 20kb+.

#### Import plugins or components:

`Following plugins support node version, 'standalone.dev' and 'standalone.prod' version.`

- `build/plugin.gif[.*].js`([Guide](https://github.com/chenzhuo1992/easycanvas/blob/master/readme/build/plugin.gif.English.md),[介绍](https://github.com/chenzhuo1992/easycanvas/blob/master/readme/build/plugin.gif.Chinese.md)): Support gif rendering.

- `build/plugin.webgl[.*].js`([Guide](https://github.com/chenzhuo1992/easycanvas/blob/master/readme/build/plugin.webgl.English.md),[介绍](https://github.com/chenzhuo1992/easycanvas/blob/master/readme/build/plugin.webgl.Chinese.md)): Support webgl rendering.

- The other plugins' translation are in process.
