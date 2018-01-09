#### Easycanvas > plugin > gif

[Chinese]### 渲染gif
[English]### Gif rendering

[Chinese]在Easycanvas上扩展gif对象转换为canvas对象的方法，用于将gif图像渲染到canvas上。注意：由于需要在浏览器中解析gif文件，将占用84kb额外体积。并且较大的gif在解析时可能导致js假死（每张gif只解析一次，不影响之后渲染）。
[English]Support a function that transforms gif object to canvas object, for rendering gif files. Notice: this will cost 84kb for transforming gif files. If operating on a big file, this will affect performace during the transforming(once for each gif file, will not affect following rendering operations).

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
