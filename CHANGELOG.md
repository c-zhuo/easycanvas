## Easycanvas Changelog

#### 0.5.7

- Bugfix: Rendering bug.

- Featrue: Update 微信小游戏 Doc.

#### 0.5.6

- Bugfix: Event rendering bug.

- Featrue: Support 微信小游戏.

#### 0.5.5

- Bugfix: Event bug.

- Docs: Update docs and demos.

#### 0.5.2

- Featrue: Support .3ds files 3D model.

#### 0.5.0 (30kb)

- Featrue: Support webgl3d.

- Featrue: Update chrome plugin.

#### 0.4.0-0.4.2 (30kb)

- Bugfix: Add forces to physics plugin.

- Bugfix: Change `rect/self` API to `getRect/getSelfStyle`, add `getStyle` api.

- Docs: Update.

#### 0.3.2 (30kb)

- Bugfix: `broadcast` triggers event twice errorly.

- Bugfix: Debounce of hooks works errorly.

- Docs: Update.

#### 0.3.1 (29kb)

- Bugfix: `text` without align throw an error in 0.3.0.

- Bugfix: `Drag` works better now.

- Bugfix: Fixed sprite renders with `opacity: 0` in some special cases.

- Bugfix: Fixed event `touchmove` not working.

- Feature: Add `$perf` to each painter instance, using for analyze performance.

#### 0.3.0 (30kb to 29kb)

- Docs: Add Chinese guide site.

- Change: Removed `./build/easycanvas.min.js`. The `./build/easycanvas.js` file is already compressed.

- Bugfix: Rewrite `Easycanvas.transition`. In old versions(0.2.x), transitions are played incorrectly if the fps is lower than 60. And, the value in `style` in the Chrome development tools are incorrectly if it is set by `Easycanvas.transition`.

- Bugfix: In old versions(0.2.x), if you set `Easycanvas.imgLoader.cacheCanvas = true`, render optimization(jump the rendering of a sprite which is covered by others) will lose efficacy by mistake.

- Bugfix: Remove unused codes, optimize code style.

- Bugfix: Fixed `physics.plugin`, which is not working in old versions.

- Feature: Add `.update(object)` to each sprite, for changing a set of props.

- Feature: Add `.rect()` to each sprite, for getting rendering box.

- Feature: Add `.self()` to each sprite, for getting current props in style, not computed with inherited styles.

- Feature: Add `blend`(from 0 to 24) in `style`, controlling compositing type of a canvas context(by setting `globalCompositeOperation`).

- Feature: Add a `fade` plugin, including some animations of a disappearing sprite.

- Feature: Add `Easycanvas.imgPretreat`, using for loading images and pretreating, such as color editing.

#### 0.2.8

- Published in 2018.2.24, 30kb of size.

- Bugfix: Fix `Number` not rendered in `content.text` in old version.

#### 0.2.4-0.2.7

- Typos in code/readme/demos.

#### 0.2.3

- Change: Float numbers will change to integer when painting, for avoiding blurry rendering.

- Change: API `style.font` changes to `style.textFont`.

- Bugfix: Typos in document.

- Feature: Add `beforeTick` hook for root canvas instance.

- Feature: Add `$perf` to every sprite in `develop` mode, describing waste of image which can lower the performance. This will be shown in Chrome dev-tool in laster version.

#### 0.2.2

- Bugfix: Fix demo bugs. Use bitwise operators and `Math.floor` instead, to improve performance.

- Feature: Set `through` to false in `events` can hold up the events.

- Feature: Add a new api `interceptor` in the event handlers of an easycanvas instance, which can pre-handler all events, using for cross-screen event handlers etc.

#### 0.2.1

- Bugfix: Mousewheel events trigger on unscrollable sprites.

- Feature: Set `Easycanvas.imgLoader.cacheCanvas = true` to enable offscreen canvas when loading images. This will improve performance if you have very many images.

- Feature: Set `webgl: true` in `register` config to enable webgl rendering.

#### 0.2.0

- Breaking change: Rebuild sprite's data structrue.

#### 0.1.x

- Old versions.
