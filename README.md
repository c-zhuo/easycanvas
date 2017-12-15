## Easycanvas

![https://github.com/chenzhuo1992/easycanvas/blob/master/_forIO/index.html](https://github.com/chenzhuo1992/easycanvas/blob/master/_forIO/index.gif?raw=true)

### Build files

Base:

build/easycanvas.js: Node module, with gif2canvas supports.
build/easycanvas.lite.js: Node module, 30kb+.
build/easycanvas.standalone.dev.js: Standalone version, support chrome develop tools.
build/easycanvas.standalone.prod.js: Standalone version for production mode.

Plugin:

build/plugin.physics[.*].js: Node module, support physics.

### 简介 / Introduction

一个轻量（20kb+）的Canvas渲染库与一个配套的Chrome调试插件，支持重力引擎、精灵动画，高性能，兼容移动端与PC（包括IE）。

A lite(20kb+) canvas library, includes a Chrome plugin for debugging. Support physics and animations with high performace. Suits mobile and PC(including IE).

- 引入及初始化 / import & Start

```
import EasyCanvas from 'easycanvas';
var $Painter = new EasyCanvas.painter();
$Painter.register(document.getElementById('foo'));
$Painter.start();
```

- 插入图像及动画 / Insert Image & Animation

![https://github.com/chenzhuo1992/easycanvas/blob/master/_forIO/demo1.html](https://github.com/chenzhuo1992/easycanvas/blob/master/_forIO/demo1.gif?raw=true)

```
EasyCanvas.imgLoader('./G.png', function (img) {
    // create a sprite
    var sprite1 = $Painter.add({
        content: {
            img: img,
        },

        style: {
            sx: 0, sy: 0, // source position, default 0
            tx: 0, // target position, default 0
            ty: function () {
                // you can return the value from functions to create animation.
                return new Date().getTime() % 1000 / 50;
            },
            locate: 'lt', // default center

            // EasyCanvas also prepare some animation-functions, like pendulum
            opacity: EasyCanvas.transition.pendulum(0.1, 0.9, 1000),
        }
    });
});
```

- 旋转 / Rotate

![https://github.com/chenzhuo1992/easycanvas/blob/master/_forIO/demo2.html](https://github.com/chenzhuo1992/easycanvas/blob/master/_forIO/demo2.gif?raw=true)

通过设置rotate可以调整旋转角度，rx和ry控制旋转中心。下面这个例子是定点旋转和动点旋转，并且两个元素的旋转角是同步的。

You can controll the degree and center of a rotate by setting `rotate`, `rx` and 'ry'. The following example shows rotating around static points and active points, sharing the same degree.

```
var G = EasyCanvas.imgLoader('./G.png');
var r = EasyCanvas.transition.pendulum(-90, 90, 1000);

var sprite1 = $Painter.add({
    content: {
        img: G,
    },

    style: {
        rotate: r,
        rx: 250, ry: 200,
        tx: 250, ty: 200,
    }
});

var sprite2 = $Painter.add({
    content: {
        img: G,
    },

    style: {
        rotate: r,
        rx: 500, ry: EasyCanvas.transition.pendulum(100, 200, 700),
        tx: 500, ty: 200,
    }
});
```

- 事件 / Events

![https://github.com/chenzhuo1992/easycanvas/blob/master/_forIO/demo3.html](https://github.com/chenzhuo1992/easycanvas/blob/master/_forIO/demo3.gif?raw=true)

通过设置events属性可以捕捉元素的事件。多个元素重叠时，将按照eIndex属性的次序来依次触发相应的事件，直至某一个监听方法返回了true，否则事件最终将冒泡至整个实例。

You can handle events by setting `events`. When an events is caught by mutiple sprites, the `eIndex` will decide who handles first. This chain will break when any handler return `true`, or it will bunble to the global instance handler.

```
var G = EasyCanvas.imgLoader('./G.png');
var r1 = 0;
var r2 = 0;

var sprite1 = $Painter.add({
    content: {
        img: G,
    },
    style: {
        rotate: function () {return r1;},
        rx: 250, ry: 200, tx: 250, ty: 200,
        zIndex: 1,
    },
    events: {
        eIndex: 2,
        click: function () {
            r1 += 180;
            return true;
        },
    },
});
var sprite2 = $Painter.add({
    content: {
        img: G,
    },
    style: {
        rotate: function () {return r2;},
        rx: 350, ry: 200, tx: 350, ty: 200,
        zIndex: 2,
    },
    events: {
        eIndex: 1,
        click: function () {
            r2 += 180;
            return true;
        },
    },
});
```

- 逐帧序列图（精灵动画） / Sequence Diagram

![https://github.com/chenzhuo1992/easycanvas/blob/master/_forIO/demo4.html](https://github.com/chenzhuo1992/easycanvas/blob/master/_forIO/demo4.gif?raw=true)

下面这个示例展示了如何通过全局的事件来动态创建元素，并且将一个动作序列图转换为动画展示。

The following demo shows how to create sprites from global event handler, and how to use an animation sequence diagram to make an animation.

```
var $Painter = new EasyCanvas.painter();
$Painter.register(document.getElementById('foo'), {
    events: {
        click: function (e) {
            $Painter.add(createFire(e.layerX, e.layerY));
        }
    }
});

var Fire = EasyCanvas.imgLoader('./Fire.png');

var createFire = function (initX, initY) {
    return {
        content: {
            img: Easycanvas.sequenceDiagram(Fire, {
                w: -9,
                h: -1,
                interval: 50,
                loop: false
            }),
        },

        style: {
            tx: initX, ty: initY,
        },
    };
};

$Painter.start();
```

## More Information

Clone this repo, npm run doc, then `localhost:8080/docs/main.html`.

## Chrome Plugin

Throw `./plugin/dist` to `Chrome://extensions`.
