#### Easycanvas > plugin > gif

### 渲染gif

在Easycanvas上扩展gif对象转换为canvas对象的方法，用于将gif图像渲染到canvas上。注意：由于需要在浏览器中解析gif文件，将占用84kb额外体积。并且较大的gif在解析时可能导致js假死（每张gif只解析一次，不影响之后渲染）。

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
