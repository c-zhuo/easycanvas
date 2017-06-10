## easycanvas

### 展示 / Display 

![](https://github.com/chenzhuo1992/easycanvas/blob/master/_forIO/display.gif?raw=true)

### 简介 / Introduction

一个易上手的数据驱动的Canvas框架。你做的仅仅是数据结构的设计和数据的修改，数据到视图的渲染完全由这些utils来实现。

关键词：布局、动效开发、动画序列图、事件交互。

An easy and cute canvas framework driven by data. You design the data structure and modify data, these utils help you to draw into canvas.

Keywords: layout, animation, animation sequence diagram, events.

### 概要 / Main Points

1. 兼容大多数PC浏览器和移动端。Work well with most PC and Mobile browsers.

2. 由于完全数据驱动，在开发一些数据逻辑复杂的应用时比较方便：凡是能用数据表述的场景，都可以轻易展示出来。Driven by data, it is good at those applications with complex logic: Anything can be described by data, can be displayed.

### 使用示例 / Usage

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
        img: img,

        sx: 0, sy: 0, // source position, default 0

        tx: 0, // target position, default 0
        ty: function () {
            // you can return the value from functions to create animation.
            return new Date().getTime() % 1000 / 50;
        },

        // EasyCanvas also prepare some animation-functions, like pendulum
        opacity: EasyCanvas.transition.pendulum(0.1, 0.9, 1000),

        locate: 'lt', // default center
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
    img: G,

    rotate: r,
    rx: 250, ry: 200,
    tx: 250, ty: 200,
});

var sprite2 = $Painter.add({
    img: G,

    rotate: r,
    rx: 500, ry: EasyCanvas.transition.pendulum(100, 200, 700),
    tx: 500, ty: 200,
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
    img: G,

    rotate: function () {return r1;},
    rx: 250, ry: 200, tx: 250, ty: 200,

    zIndex: 1, eIndex: 2,

    events: {
        click: function () {
            r1 += 180;
            return true;
        },
    },
});
var sprite2 = $Painter.add({
    img: G,

    rotate: function () {return r2;},
    rx: 350, ry: 200, tx: 350, ty: 200,

    zIndex: 2, eIndex: 1,

    events: {
        click: function () {
            r2 += 180;
            return true;
        },
    },
});
```

- 动作序列图 / Animation Sequence Diagram

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
        img: Fire,

        tx: initX, ty: initY,

        loop: {
            x: -9,
            y: -1,
            interval: 50,
            circle: false
        }
    };
};

$Painter.start();
```

## More API

整理中. Work in progress.
