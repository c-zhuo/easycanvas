## Easycanvas

![https://github.com/chenzhuo1992/easycanvas/blob/master/_forIO/index.html](https://github.com/chenzhuo1992/easycanvas/blob/master/_forIO/index.gif?raw=true)

## 如何开始

引入Easycanvas并绑定到一个Canvas标签上：

```
    import EasyCanvas from 'easycanvas';

    // 创建一个Easycanvas实例
    var $Painter = new EasyCanvas.painter();

    // 将实例绑定到dom上（必须是canvas标签）
    $Painter.register(document.getElementById('foo'));

    // 开始Easycanvas渲染
    $Painter.start();
```

`register`方法可以传入一些全局事件监听方法，以及设置最大FPS、自定义FPS监听的方法，将在后续介绍。
一旦`register`被调用，Easycanvas将缓存相应dom元素的宽高，所以如果希望设置一个指定尺寸的Canvas，可以这样：

```
    let $app = document.getElementById('app');

    // 也可以在css和html中对Canvas进行宽高设置。
    $app.style.width = w;
    $app.style.height = h;
    $app.width = w * 2;
    $app.height = h * 2;        

    var $Doc = new Easycanvas.painter();

    $Doc.register($app);
```

Tips: html中的宽高代表Canvas的像素尺寸，css中的宽高代表Canvas的展示尺寸。一些屏幕下，让像素尺寸二倍于展示尺寸，可以有效避免文字模糊。如果你的Canvas只渲染图片，那么没有必要这么做。

这样就得到了一个空白的实例，它不包含任何容器、可绘制的图像和文本。
    
## 添加图片元素

Easycanvas最常用的API就是`add`方法，用于向实例添加一个元素。元素的样式、内容、事件、滚动等属性全部可以在`add`时设置，也可以之后后设置。例如：

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

'sprite1'是一个`sprite`实例，上例等同于：

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

`EasyCanvas.imgLoader`将立即返回一个Image对象。此时图片还未加载完成，它的回调将在图片加载完成后触发。imgLoader的其它功能将在后面叙述。

这样相当于创建了一个 `<img src="./G.png">` 元素，并且具备以下样式：

```
    position: absolute;
    left: 200;
    top: 100;
    transform: translateX(-50%) translateY(-50%);
```

默认情况下，图片将以目标坐标`(200, 100)`为中心进行渲染。如果想去掉这个transform，可以设置`style`的`locate`属性为'lt'。“默认以中心”绘制的好处是，如果有一个按钮想放在水平居中的位置，可以直接设置`tx`为屏幕宽的1/2，而不需要关心按钮本身的尺寸。例如下面两种方式的效果是相同的：

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

## 设置动画

Easycanvas中所有的动画都是通过`style`的变换实现的。比如，可以设置`style`中的某个样式为一个方法：

```
    style: {
        tx: function () {
            return new Date().getTime() % 500;
        }
    }
```

或者使用Easycanvas自带的`transition`:

```
    style: {
        tx: Easycanvas.transition.linear(100, 600, 1000),
        ty: Easycanvas.transition.linear(300, 400, 1000).loop(),
    }
```

或者引入Tween.js等第三方实现：

```
    TWEEN.onUpdate(function (obj) {
        sprite1.style.tx = obj.tx;
    });
```

或者在每帧的钩子中动态修改style属性（其它钩子在后面介绍）：

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

或者自己setInterval :)

## 事件响应

目前Easycanvas支持了几乎全部的浏览器事件，甚至包括滑轮的滚动（不支持滑轮按下，这事件真的有人用？）。此外拓展了`hold`事件，在长按时会连续触发。如下：

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

'this'将指向'sprite1'，'e.event'对应了浏览器的'Event'，而'e.canvasX'代表当前Canvas中的坐标。如果你的Canvas渲染尺寸和Canvas的像素尺寸不同，'canvasX'会更方便。

事件将按照`eIndex`从大到小的顺序进行传递，如果某个事件'return true'，那么将中止事件的传递。否则，事件将一直“冒泡”到canvas实例。下例展示了如何在实例根节点处理事件：

```
    $Painter.register(document.getElementById('foo'), {
        events: {
            touchmove: function (e) {
                e.event.preventDefault();
            }
        }
    });
```

## 状态钩子

Easycanvas支持的状态钩子包括：`ticked`、`removed`。

```
    var box = new Easycanvas.class.sprite({
        content: {
            img: img,
        },
        hooks: {
            ticked: function () {
                // 每帧执行一次，在渲染后调用
            },
            removed: function () {
                // 元素被remove方法移除后调用
            },
        },
    });
```

## 基础API列表

`content`中目前支持`img`和`text`属性，传入image对象和string文本。

`style`中目前支持以下属性：

```
    tx, ty, tw, th: 目标坐标的left, top位置和width, height尺寸
    // 支持整数、Function（每帧调用一次，需要return出结果）

    sx, sy: 当content.img存在时，代表源图片的起始坐标（参考原生Canvas.drawImage）
    sw, th: 当content.img存在时，代表源图片的裁取尺寸（参考原生Canvas.drawImage）
    // 支持整数、Function（每帧调用一次，需要return出结果）

    locate: 目标矩形的布局方式，支持lt、center、rd（类似css的translate）
    scale: 目标矩形的缩放尺寸（类似css的scale）
    opacity: 目标矩形的透明度（类似css的opacity）
    zIndex: 目标矩形的渲染层次（类似css的zIndex）

    // 下列属性仅当content内存在text内容时生效
    textAlign: 代表文字水平对齐方式（类似css的text-align）
    textFont: 代表文字的样式，例如'14px Arial'
    textVerticalAlign: 代表文字的垂直对齐方式（类似css的vertical-align）
    color: 代表文字的颜色（类似css的color）
    lineHeight: 代表文字的行高（类似css的lineHeight，单位限制为像素）
    // 对齐、颜色的可选值参考css
```

## 元素嵌套

Easycanvas可以通过`children`属性设置子元素，从而实现元素嵌套，如：

```
    var $Painter = new Easycanvas.painter();
    $Painter.register(document.getElementById('foo'));
    $Painter.start();

    Easycanvas.imgLoader('https://github.com/chenzhuo1992/easycanvas/blob/master/_forIO/G30x30.png?raw=true', function (img) {
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

或者可以动态插入子元素：

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

## 精灵动画

下面这个示例展示了如何通过全局的点击事件来动态创建元素，并且将一个9帧拼接成的序列图转换为动画展示。

```
    var $Painter = new Easycanvas.painter();
    $Painter.register(document.getElementById('foo'), {
        events: {
            click: function (e) {
                $Painter.add(createFire(e.canvasX, e.canvasY));
            }
        }
    });

    var Fire = Easycanvas.imgLoader(https://github.com/chenzhuo1992/easycanvas/blob/master/_forIO/Fire.png?raw=true);

    var createFire = function (initX, initY) {
        return {
            content: {
                // 'sequenceDiagram'可以将一个多帧拼成的图片拆成多帧播放
                img: Easycanvas.sequenceDiagram(Fire, {
                    // 指定每帧在图片文件上的尺寸，-9代表图片宽度的1/9，相当于'Fire.width / 9'
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

## 扩展 - 物理引擎

Easycanvas引入了Chipmunk-js作为物理引擎。如果需要使用物理引擎，需要额外引入：

```
    import Easycanvas from 'easycanvas';
    import EasycanvasPhysics from 'easycanvas/build/plugin.physics.js';
    EasycanvasPhysics(Easycanvas);
```

Easycanvas-physics为每个Easycanvas的sprite提供了重力、摩擦、弹力等扩展属性，使用时需要创建`physics`对象。下例创建了一个空的容器，并指定了容器的重力。

```
    var box = new Easycanvas.class.physics({
        content: {
            img: img,
        },
        style: {
            tx: 200,
            ty: 100,
        },
        physics: {
            gravity: 1,
        },
    });
    $Painter.add(box);
```

当box中包含其它元素时，元素将受到重力的影响向下坠落。下例创建了一个球形物理对象并扔入box中：

```
    var ball = new Easycanvas.class.physics({
        content: {
            img: img,
        },
        style: {
            tx: 200, ty: 100,
            tw: 20, ty: 20,
        },
        physics: {
            shape: [
                [10, 10, 10],
            ],
            mass: 10,
            friction: 0.5,
            elasticity: 0.5,
        },
    });
    box.add(ball);
    box.launch();
    ball.physicsOn();
```

其中，`shape`代表对象的“物理性状”，将用于碰撞检测中。`shape`是一个Array，包含一系列的关键路径。如果是圆形，那么只需要一个值，三个参数分别为圆心的left、top坐标（同css，以图片左上角为原点）以及半径。如上例，元素的宽高（tw与th）为20，则shape是以(10,10)的位置绘制一个半径为10的圆，用于碰撞检测。

`shape`支持多边形。例如'[[0, 0], [61, 0], [61, 38], [0, 38], [0, 0]]'代表了几个点依次连接所围成的一个矩形（最后一个0,0坐标可以省略）。但是要注意的是，坐标点必须顺时针进行描述。

`mass`代表一个对象的质量，`friction`代表摩擦系数（0至1，两个摩擦系数都为0的物体相互摩擦将不会减速），`elasticity`代表弹性系数（0至1，两个弹性为0的物体迎面碰撞后将不分离）。此外，还支持`moment`参数，用于描述物体的转动惯量，不设置时会根据形状，将质量均摊来得出一个默认值。

调用`launch`和`physicsOn`之后，box中的元素将开始按物理学进行运动：ball将落下。其中，`launch`代表对某个“物理容器”进行初始化；`physicsOn`代表某个“物理对象”开始在容器中运动，必须在上游的某个节点执行过`launch`之后才可以使用。通过`physicsOff`可以暂时关闭它的物理特性。
