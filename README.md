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
            // other props can be functions as well, e.g. img/zIndex/visible
        },

        // EasyCanvas also prepare some animation-functions, like pendulum
        opacity: EasyCanvas.transition.pendulum(0.1, 0.9, 1000),

        locate: 'lt', // default center
    });
});
```

![https://github.com/chenzhuo1992/easycanvas/blob/master/_forIO/demo1.html](https://github.com/chenzhuo1992/easycanvas/blob/master/_forIO/demo1.gif?raw=true)

- work in progress...

## API

```

// binding to a dom
Foo.register(document.getElementById('foo'));

// binding to a dom and catch global mouse/touch events
Foo.register(document.getElementById('foo'), {
    events: {
        touchend: function (e) {},
        mousedown: function (e) {},
    }
});

// start painting (60 fps default)
Foo.start();

// set max fps, pause and continue
Foo.setMaxFps(16);
Foo.pause();Foo.pause(false);

// paint once
Foo.paint();

// handler fps
Foo.setFpsHandler(function (fps) {});

EasyCanvas.imgLoader('http://xxx.yyy/zzz.jpg', function (img) {
    // create a sprite
    var sprite1 = Foo.add({
        img: img,

        // source position, default 0
        sx: 0, sy: 0,

        // target position, default 0
        tx: 0,
        ty: function () {
            // you can return the value from functions to create animation.
            return new Date().getTime() % 100;
            // other props can be functions as well, e.g. img/zIndex/visible
        },

        // EasyCanvas also prepare some animation-functions, like pendulum
        opacity: EasyCanvas.transition.pendulum(0.1, 0.9, 1000),
        
        locate: 'lt', // default center

        zIndex: 1, // z-index of this image
        eIndex: 2, // event-index of this image
        visible: true, // like "display: none;" in css

        dragable: { // means this is dragable and which area works
            x1: 0,
            x2: function () {return this.img.width;},
            y1: 0,
            y2: function () {return this.img.height;},
        },

        events: {
            // events of current image
            click: function (e) {
                // "this" means this sprite, as sprite1
                this.visible = false;
                // "true" means stopping bubbling "click" event
                return true;
            },
            // others: mousehold, mousedown, mouseout and touch events
        },

        // False will stop bubbling all events, default true
        passEvent: false,

        // text on image, see detail below
        // text: [],

        // other sprites which mounted to current, see detail below
        // aboveAddon: [],
        // belowAddon: [],

        // rotate, see detail below
        // rotate: false,
    });
});

```

## 进阶 / More

整理中. Work in progress.
