## Easycanvas Changelog

#### 0.2.4

- Bugfix: Fix `Number` not rendered in `content.text` in old version.

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
