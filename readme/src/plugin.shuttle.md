#### Easycanvas > plugin > shuttle

[Chinese]### “穿梭”效果背景
[English]### 'Shuttle' background effect

```
    import EasyCanvas from 'easycanvas';
    import EasyCanvasPluginShuttle from 'easycanvas/build/plugin.shuttle.js';

    ...

    var sprite1 = new Easycanvas.class.shuttle({
        style: {
            tw: w, th: h,
            zIndex: 1,
        },
        center: {
            x: w / 2, y: h / 3,
        },
        passBy: [img1, img2],
        passIn: [img3],
        background: img4,
    });
    $Painter.add(sprite1);

    setInterval(function () {
        sprite1.set({
            passByRotate: Math.random() < 0.5,
            passInRate: Math.random(),
            speed: Math.random() * 1000 + 500,
        });
    }, 500);
```
