## Easycanvas

![https://github.com/chenzhuo1992/easycanvas/blob/master/demos/index.html](https://github.com/chenzhuo1992/easycanvas/blob/master/demos/index.gif?raw=true)

[Chinese]## 如何开始
[English]## Starts

[Chinese]引入Easycanvas并绑定到一个Canvas标签上：
[English]Import Easycanvas and bind to a canvas dom:

```
    import EasyCanvas from 'easycanvas';

[Chinese]    // 创建一个Easycanvas实例
[English]    // create a Easycanvas instance
    var $Painter = new EasyCanvas.painter();

[Chinese]    // 将实例绑定到dom上（必须是canvas标签）
[English]    // create a Easycanvas instance
    $Painter.register(document.getElementById('foo'));

[Chinese]    // 开始Easycanvas渲染
[English]    // start Easycanvas paints loop
    $Painter.start();
```

[Chinese]`register`方法可以传入一些全局事件监听方法，以及设置最大FPS、自定义FPS监听的方法，将在后续介绍。
[English]You can set event handlers, max FPS and FPS handler with `register` function.
[Chinese]一旦`register`被调用，Easycanvas将缓存相应dom元素的宽高，所以如果希望设置一个指定尺寸的Canvas，可以这样：
[English]Once `register` is called, width and height of the dom will be cached, so you can set the size this way:

```
    let $app = document.getElementById('app');

[Chinese]    // 也可以在css和html中对Canvas进行宽高设置。
[English]    // can set width and height in HTML and CSS as well
    $app.style.width = w;
    $app.style.height = h;
    $app.width = w * 2;
    $app.height = h * 2;        

    var $Doc = new Easycanvas.painter();

    $Doc.register($app);
```

[Chinese]Tips: html中的宽高代表Canvas的像素尺寸，css中的宽高代表Canvas的展示尺寸。一些屏幕下，让像素尺寸二倍于展示尺寸，可以有效避免文字模糊。如果你的Canvas只渲染图片，那么没有必要这么做。
[English]Tips: Size in html means the pixel size, in css means the display size. In some condition, let the pixel twice larger than the display size will avoid the word from being blurry. If only images in canvas, it is no need.

[Chinese]这样就得到了一个空白的实例，它不包含任何容器、可绘制的图像和文本。
[English]Now we have an empty instance, with no container, no image and no text inside.
    
[Chinese]## 添加图片元素
[English]## Add images

[Chinese]Easycanvas最常用的API就是`add`方法，用于向实例添加一个元素。元素的样式、内容、事件、滚动等属性全部可以在`add`时设置，也可以之后后设置。例如：
[English]The most useful API is `add`, which can add a sprite to the instance. Style, content, events and scrolling can be set within `add`, or later. Examples:

```
    var $Painter = new EasyCanvas.painter();

    EasyCanvas.imgLoader('./G.png', function (img) {
        var sprite1 = $Painter.add({
            content: {
                img: img,
            },
            style: {
                tx: 200,
                ty: 100,
            }
        });

        sprite1.style.tx = 150;
    });
```

[Chinese]'sprite1'是一个`sprite`实例，上例等同于：
[English]'sprite1' is a `sprite` instance, it is same as:

```
    var $Painter = new EasyCanvas.painter();

    EasyCanvas.imgLoader('./G.png', function (img) {
        var sprite1 = new Easycanvas.class.sprite({
            content: {
                img: img,
            },
            style: {
                tx: 200,
                ty: 100,
            }
        });

        sprite1.style.tx = 150;

        $Painter.add(sprite1);
    });
```

[Chinese]`EasyCanvas.imgLoader`将立即返回一个Image对象。此时图片还未加载完成，它的回调将在图片加载完成后触发。imgLoader的其它功能将在后面叙述。
[English]`EasyCanvas.imgLoader` will return an Image Object. The callback will trigger after the image loaded. More information later.

[Chinese]这样相当于创建了一个 `<img src="./G.png">` 元素，并且具备以下样式：
[English]The result looks the same as a `<img src="./G.png">` with following css:

```
    position: absolute;
    left: 200;
    top: 100;
    transform: translateX(-50%) translateY(-50%);
```

[Chinese]默认情况下，图片将以目标坐标`(200, 100)`为中心进行渲染。如果想去掉这个transform，可以设置`style`的`locate`属性为'lt'。“默认以中心”绘制的好处是，如果有一个按钮想放在水平居中的位置，可以直接设置`tx`为屏幕宽的1/2，而不需要关心按钮本身的尺寸。例如下面两种方式的效果是相同的：
[English]The image center is `(200, 100)` by default. You can set 'lt' to `locate` in `style`. 'Center' in default means if you want put the button in the middle of a screen, you can set `tx` with half of the screen width, without considering the button itself. For example, here are two solutions with same effect:

```
    style: {
        tx: $Painter.width / 2,
        ty: 300
    }

    style: {
        tx: $Painter.width / 2 - this.content.img.width / 2,
        ty: 300 - this.content.img.height / 2,
        locate: 'lt'
    }
```

[Chinese]## 设置动画
[English]## Animation

[Chinese]Easycanvas中所有的动画都是通过`style`的变换实现的。比如，可以设置`style`中的某个样式为一个方法：
[English]Animation in Easycanvas means transforming the `style` of sprite. For example, you can set the style in `style` with a function:

```
    style: {
        tx: function () {
            return new Date().getTime() % 500;
        }
    }
```

[Chinese]或者使用Easycanvas自带的`transition`:
[English]Or use `transition` provided by Easycanvas:

```
    style: {
        tx: Easycanvas.transition.linear(100, 600, 1000),
        ty: Easycanvas.transition.linear(300, 400, 1000).loop(),
    }
```

[Chinese]或者引入Tween.js等第三方实现：
[English]Or other libs like Tween.js:

```
    TWEEN.onUpdate(function (obj) {
        sprite1.style.tx = obj.tx;
    });
```

[Chinese]或者在每帧的钩子中动态修改style属性（其它钩子在后面介绍）：
[English]Or modify the style in hooks(more information later):

```
    style: {
        tx: 100
    },
    hooks: {
        ticked: function () {
            this.style.tx++;
        }
    },
```

[Chinese]或者自己setInterval :)
[English]Or setInterval :)

[Chinese]## 事件响应
[English]## Events

[Chinese]目前Easycanvas支持了几乎全部的浏览器事件，甚至包括滑轮的滚动（不支持滑轮按下，这事件真的有人用？）。此外拓展了`hold`事件，在长按时会连续触发。如下：
[English]Almost all events in browsers are supported in Easycanvas, including wheel events(except wheel clicking, someone using it?). Besides, `hold` event is added which means a long press. Example:

```
    var $Painter = new EasyCanvas.painter();
    EasyCanvas.imgLoader('./G.png', function (img) {
        var sprite1 = $Painter.add({
            content: {
                img: img,
            },
            style: {
                tx: 200,
                ty: 100,
            },
            events: {
                click: function (e) {
                    this.style.tx = e.canvasX;
                    this.style.ty = e.event.layerY;
                }
            },
        });
    });
```

[Chinese]'this'将指向'sprite1'，'e.event'对应了浏览器的'Event'，而'e.canvasX'代表当前Canvas中的坐标。如果你的Canvas渲染尺寸和Canvas的像素尺寸不同，'canvasX'会更方便。
[English]'this' points to 'sprite1', 'e.event' points to native 'Event', 'e.canvasX' means position in Canvas coordinate. If your pixel size is different with display size, 'canvasX' is more convenient.

[Chinese]事件将按照`eIndex`从大到小的顺序进行传递，如果某个事件'return true'，那么将中止事件的传递。否则，事件将一直“冒泡”到canvas实例。下例展示了如何在实例根节点处理事件：
[English]Events will pass from higher `eIndex`, and stop when a handler 'return true', Or 'bubble up' to the root instance. The following example shows how to handle events in root instance:

```
    $Painter.register(document.getElementById('foo'), {
        events: {
            touchmove: function (e) {
                e.event.preventDefault();
            }
        }
    });
```

[Chinese]## 状态钩子
[English]## Hooks

[Chinese]Easycanvas支持的状态钩子包括：`ticked`、`removed`。
[English]Hooks supported in Easycanvas include: `ticked`, `removed`.

```
    var box = new Easycanvas.class.sprite({
        content: {
            img: img,
        },
        hooks: {
            ticked: function () {
[Chinese]                // 每帧执行一次，在渲染后调用
[English]                // Exec per tick, after rendering
            },
            removed: function () {
[Chinese]                // 元素被remove方法移除后调用
[English]                // Exec after the sprite removed
            },
        },
    });
```

[Chinese]## 基础API列表
[English]## Basic API List

[Chinese]`content`中目前支持`img`和`text`属性，传入image对象和string文本。
[English]`content` contains `img` and `text`, for rendering images and texts.

[Chinese]`style`中目前支持以下属性：
[English]`style` has these styles:

```
[Chinese]    tx, ty, tw, th: 目标坐标的left, top位置和width, height尺寸
[Chinese]    // 支持整数、Function（每帧调用一次，需要return出结果）
[English]    tx, ty, tw, th: target left, top position and width, height size
[English]    // Number, Function(Exec per tick, must return the result)

[Chinese]    sx, sy: 当content.img存在时，代表源图片的起始坐标（参考原生Canvas.drawImage）
[Chinese]    sw, th: 当content.img存在时，代表源图片的裁取尺寸（参考原生Canvas.drawImage）
[Chinese]    // 支持整数、Function（每帧调用一次，需要return出结果）
[English]    sx, sy: cut position of content.img, if image exists(see Canvas.drawImage prototype)
[English]    sw, th: cut size of content.img, if image exists(see Canvas.drawImage prototype)
[English]    // Number, Function(Exec per tick, return the result)

[Chinese]    locate: 目标矩形的布局方式，支持lt、center、rd（类似css的translate）
[Chinese]    scale: 目标矩形的缩放尺寸（类似css的scale）
[Chinese]    opacity: 目标矩形的透明度（类似css的opacity）
[Chinese]    zIndex: 目标矩形的渲染层次（类似css的zIndex）
[English]    locate: layout type: lt/center/rd(like translate in css)
[English]    scale: scale size(like scale in css)
[English]    opacity: transparency(like opacity in css)
[English]    zIndex: layout level(like zIndex in css)

[Chinese]    // 下列属性仅当content内存在text内容时生效
[Chinese]    textAlign: 代表文字水平对齐方式（类似css的text-align）
[Chinese]    textFont: 代表文字的样式，例如'14px Arial'
[Chinese]    textVerticalAlign: 代表文字的垂直对齐方式（类似css的vertical-align）
[Chinese]    color: 代表文字的颜色（类似css的color）
[Chinese]    lineHeight: 代表文字的行高（类似css的lineHeight，单位限制为像素）
[Chinese]    // 对齐、颜色的可选值参考css
[English]    // the following works only if the content has texts
[English]    textAlign: horizontal align(like text-align in css)
[English]    textFont: font style, such as '14px Arial'
[English]    textVerticalAlign: vertical align(like vertical-align in css)
[English]    color: font color(like color in css)
[English]    lineHeight: height of each line(like line-height in css, in pixel)
[English]    // value of 'align' and 'color' referenced to css
```

[Chinese]## 元素嵌套
[English]## Nesting

[Chinese]Easycanvas可以通过`children`属性设置子元素，从而实现元素嵌套，如：
[English]Easycanvas use `children` to describe the nesting, for example:

```
    var $Painter = new Easycanvas.painter();
    $Painter.register(document.getElementById('foo'));
    $Painter.start();

    Easycanvas.imgLoader('https://github.com/chenzhuo1992/easycanvas/blob/master/demos/G30x30.png?raw=true', function (img) {
        // create a sprite
        var sprite1 = $Painter.add({
            content: {
                img: img,
            },
            style: {
                tx: 100, ty: 100,
                locate: 'lt',
                opacity: 0.5,
                rotate: 40,
            },

            children: [
                {
                    content: {
                        img: img,
                    },
                    inherit: ['opacity'],
                    style: {
                        tx: 500, ty: 0,
                        zIndex: 1,
                        opacity: 0.5,
                        locate: 'center',
                    },
                },
                {
                    inherit: ['tx', 'ty', 'rotate'],
                    content: {
                        img: img,
                    },
                    style: {
                        tx: 500, ty: 500,
                        opacity: 0.7,
                        zIndex: 1,
                        locate: 'center',
                    },
                },
            ],
        });
    });
```

[Chinese]或者可以动态插入子元素：
[English]Or dynamically:

```
    var parent = new Easycanvas.class.sprite({
        content: {
            img: box,
        },
    });
    var child = new Easycanvas.class.sprite({
        content: {
            img: ball,
        },
    });
    parent.add(child);
    parent.remove(child); // or child.remove();
```

[Chinese]默认情况下，`tx`、`ty`和`scale`是继承的。例如一个tx为100的元素，某个child的tx为50，那么实际渲染的横坐标就是150。可以通过`inherit`来设置哪些属性从父级继承，例如：
[English]Only `tx`, `ty` and `scale` is inherited from parents by default. Use `inherit` to set your own rules, like this:

```
    var child = new Easycanvas.class.sprite({
        content: {
            img: ball,
        },
        inherit: ['tx', 'ty', 'locate', 'rotate']
    });
```

[Chinese]## 精灵动画
[English]## Animating Sprite

[Chinese]下面这个示例展示了如何通过全局的点击事件来动态创建元素，并且将一个9帧拼接成的序列图转换为动画展示。
[English]The following case created a sprite when a global clicking occur to the canvas instance, then display an animation which is transformed from an image file stitching up 9 frames.

```
    var $Painter = new Easycanvas.painter();
    $Painter.register(document.getElementById('foo'), {
        events: {
            click: function (e) {
                $Painter.add(createFire(e.canvasX, e.canvasY));
            }
        }
    });

    var Fire = Easycanvas.imgLoader(https://github.com/chenzhuo1992/easycanvas/blob/master/demos/Fire.png?raw=true);

    var createFire = function (initX, initY) {
        return {
            content: {
[Chinese]                // 'sequenceDiagram'可以将一个多帧拼成的图片拆成多帧播放
[English]                // 'sequenceDiagram' can split an image into frames
                img: Easycanvas.sequenceDiagram(Fire, {
[Chinese]                    // 指定每帧在图片文件上的尺寸，-9代表图片宽度的1/9，相当于'Fire.width / 9'
[English]                    // size of each frame, -9 means 1/9 of image width, like 'Fire.width / 9'
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
