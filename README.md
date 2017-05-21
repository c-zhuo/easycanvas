## easycanvas

### 简介 / Introduction

一个易上手的Canvas框架。借助于一个Array来“描述”Canvas的内容，通过对Array中各元素的管理来间接操纵一个Canvas。

关键词：布局、动效开发、动画序列图、事件交互。

A cute canvas framework. Easily managing an Array, which is connected with a Canvas.

Keywords: layout, animation, animation sequence diagram, events.

### 概要 / Main Points

1.兼容大多数PC浏览器和移动端。Work well with most PC and Mobile browsers.

2.不适用于"绘制"图像，适用于多个图像文件的"展示"的管理。Not suitable for CREATING pictures, suitable for DISPLAY of existed images.

### 使用示例 / Usage

## 引入 & 初始化 / Import & Start

```

// import or require
import EasyCanvas from 'easycanvas';

// create an EasyCanvas instance
var Foo = new EasyCanvas.painter();

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

```

## 引入图像 / Add image sprite

```

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
