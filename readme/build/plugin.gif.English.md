#### Easycanvas > plugin > gif

### Gif rendering

Support a function that transforms gif object to canvas object, for rendering gif files. Notice: this will cost 84kb for transforming gif files. If operating on a big file, this will affect performace during the transforming(once for each gif file, will not affect following rendering operations).

```
    import EasyCanvas from 'easycanvas';
    import EasyCanvasPluginGif from 'easycanvas/build/plugin.gif.js';

    ...

    Easycanvas.gif2canvas('a.gif', function (canvas) {
        new Easycanvas.class.sprite({
            content: {
                img: canvas,
            },
        });
    });
```
