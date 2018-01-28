## Easycanvas Changelog

#### 0.2.2

- Bugfix: Fix demo bugs. Use bitwise operators and `Math.floor` instead, to improve performance.

- Featrue: Set `through` to false in `events` can hold up the events.

- Featrue: Add a new api `interceptor` in the event handlers of an easycanvas instance, which can pre-handler all events, using for cross-screen event handlers etc.

#### 0.2.1

- Bugfix: Mousewheel events trigger on unscrollable sprites.

- Featrue: Set `Easycanvas.imgLoader.cacheCanvas = true` to enable offscreen canvas when loading images. This will improve performance if you have very many images.

- Featrue: Set `webgl: true` in `register` config to enable webgl rendering.

#### 0.2.0

- Breaking change: Rebuild sprite's data structrue.

#### 0.1.x

- Old versions.
