module.exports = {
    '创建实例': `
        创建实例

        引入Easycanvas并绑定到一个Canvas标签上：

        $s        \/\/ 引入Easycanvas
        $s        import EasyCanvas from 'easycanvas';

        $s        \/\/ 创建一个Easycanvas实例
        $s        var $Painter = new EasyCanvas.painter();

        $s        \/\/ 将实例绑定到dom上（必须是canvas标签）
        $s        $Painter.register(document.getElementById('foo'));

        $s        \/\/ 开始Easycanvas渲染
        $s        $Painter.start();

        register可以传入一些全局事件监听方法，以及设置最大FPS、自定义FPS监听的方法，将在后续介绍。一旦register被调用，Easycanvas将缓存相应dom元素的宽高，所以如果希望设置一个指定尺寸的Canvas，可以这样：

        $s        let $app = document.getElementById('app');

        $s        \/\/ 当然，可以在css和html中对Canvas进行宽高设置。
        $s        $app.style.width = w;
        $s        $app.style.height = h;
        $s        $app.width = w * 2;
        $s        $app.height = h * 2;        

        $s        var $Doc = new Easycanvas.painter();

        $s        $Doc.register($app);

        Tips: html中的宽高代表Canvas的像素尺寸，css中的宽高代表Canvas的展示尺寸。一些屏幕下，让像素尺寸二倍于展示尺寸，可以有效避免文字模糊（例如这个文档）。如果你的Canvas只渲染图片，那么没有必要这么做。

        这样就得到了一个空白的实例，它不包含任何容器、可绘制的图像和文本。
    `,
    '添加图片元素': `
        引入图片元素

        Easycanvas最核心的API就是add方法，用于向实例添加一个元素。元素的样式、内容、事件、拖动、滚动等属性全部可以在add时设置，也可以在add后设置。例如：

        $s        var $Painter = new EasyCanvas.painter();

        $s        EasyCanvas.imgLoader('./G.png', function (img) {
        $s            var sprite1 = $Painter.add({
        $s                content: {
        $s                    img: img,
        $s                },
        $s                style: {
        $s                    tx: 200,
        $s                    ty: 100,
        $s                }
        $s            });

        $s            sprite1.style.tx = 150;
        $s        });

        sprite1是一个sprite实例，上例等同于：

        $s        var $Painter = new EasyCanvas.painter();

        $s        EasyCanvas.imgLoader('./G.png', function (img) {
        $s            var sprite1 = new Easycanvas.class.sprite({
        $s                content: {
        $s                    img: img,
        $s                },
        $s                style: {
        $s                    tx: 200,
        $s                    ty: 100,
        $s                }
        $s            });

        $s            sprite1.style.tx = 150;

        $s            $Painter.add(sprite1);
        $s        });

        EasyCanvas.imgLoader将立即返回一个Image对象。此时图片还未加载完成，它的回调将在图片加载完成后触发。imgLoader的其它功能将在后面叙述。

        这样相当于创建了一个 <img src="./G.png"> 元素。并且具备以下样式：

        $s        position: absolute;
        $s        left: 200;
        $s        top: 100;
        $s        transform: translateX(-50%) translateY(-50%);

        默认情况下，图片将以目标坐标(200, 100)为中心进行渲染。如果想去掉这个transform，可以设置style的locate属性为'lt'。

        “默认以中心”绘制的好处是，如果有一个按钮想放在水平居中的位置，可以直接设置tx为屏幕宽的1/2，而不需要关心按钮本身的尺寸。例如下面两种方式的效果是相同的：

        $s        \/\/left为画布宽的一半，居中渲染
        $s        style: {
        $s            tx: $Painter.width / 2,
        $s            ty: 300
        $s        }

        $s        \/\/left为画布宽的一半，向右下渲染，lt代表LeftTop
        $s        style: {
        $s            tx: $Painter.width / 2 - this.content.img.width / 2,
        $s            ty: 300 - this.content.img.height / 2,
        $s            locate: 'lt'
        $s        }

    `,
    '设置动画': `
        添加一个动画

        Easycanvas中所有的动画都是通过style的变换实现的。比如，可以设置style中的某个属性为一个方法：

        $s        style: {
        $s            tx: function () {
        $s                return new Date().getTime() % 500;
        $s            }
        $s        }

        或者使用Easycanvas自带的transition

        $s        style: {
        $s            tx: Easycanvas.transition.linear(100, 600, 1000),
        $s            ty: Easycanvas.transition.linear(300, 400, 1000).loop(),
        $s        }

        或者引入Tween.js等第三方实现：

        $s        TWEEN.onUpdate(function (obj) {
        $s            sprite1.style.tx = obj.tx;
        $s        });

        或者在每帧的钩子中动态修改style属性（其它钩子在后面介绍）：

        $s        style: {
        $s            tx: 100
        $s        },
        $s        hooks: {
        $s            ticked: function () {
        $s                this.style.tx++;
        $s            }
        $s        },
    `,
    '事件响应': `
        事件响应

        目前Easycanvas支持了几乎全部的浏览器事件，甚至包括滑轮的滚动（不支持滑轮按下，这事件真的有人用？）。此外拓展了hold事件，在长按时会连续触发。Demo如下：

        $s        var $Painter = new EasyCanvas.painter();
        $s        EasyCanvas.imgLoader('./G.png', function (img) {
        $s            var sprite1 = $Painter.add({
        $s                content: {
        $s                    img: img,
        $s                },
        $s                style: {
        $s                    tx: 200,
        $s                    ty: 100,
        $s                },
        $s                events: {
        $s                    click: function (e) {
        $s                        this.style.tx = e.canvasX;
        $s                        this.style.ty = e.event.layerY;
        $s                    }
        $s                },
        $s            });
        $s        });

        this将指向sprite1，e.event对应了浏览器的Event，而e.canvasX代表当前Canvas中的坐标（如果你的Canvas渲染尺寸和Canvas的像素尺寸不同，canvasX会更方便）。

        事件将按照eIndex从大到小的顺序进行传递，如果某个事件'return true'，那么将中止事件的传递。否则，事件将一直“冒泡”到canvas实例。下例展示了如何在实例根节点处理事件：

        $s        $Painter.register(document.getElementById('foo'), {
        $s            events: {
        $s                touchmove: function (e) {
        $s                    e.event.preventDefault();
        $s                }
        $s            }
        $s        });

    `,
    '状态钩子': `
        状态钩子

        Easycanvas支持的状态钩子包括：ticked、removed。

        $s            var box = new Easycanvas.class.physics({
        $s                content: {
        $s                    img: img,
        $s                },
        $s                hooks: {
        $s                    ticked: function () {
        $s                        // 每帧执行一次，在渲染后调用
        $s                    },
        $s                    removed: function () {
        $s                        // 元素被remove方法移除后调用
        $s                    },
        $s                },
        $s            });
    `,
    '基础API': `
        基础API

        content中目前支持img和text属性，传入img对象和string文本。

        style中目前支持以下属性：

        $s        tx, ty: 目标坐标的left和top值
        $s        tw, th: 目标坐标的width和height值
        $s        \/\/支持整数、Function（每帧调用一次，需要return出结果）

        $s        sx, sy: 当content.img存在时，代表源图片的起始坐标（参考原生Canvas.drawImage）
        $s        sw, th: 当content.img存在时，代表源图片的裁取尺寸（参考原生Canvas.drawImage）
        $s        \/\/支持整数、Function（每帧调用一次，需要return出结果）

        $s        locate: 目标矩形的布局方式，支持lt、center、rd（类似css的translate）
        $s        scale: 目标矩形的缩放尺寸（类似css的scale）
        $s        opacity: 目标矩形的透明度（类似css的opacity）
        $s        zIndex: 目标矩形的渲染层次（类似css的zIndex）

        $s        textAlign: 当content.text存在时，代表文字水平对齐方式（类似css的text-align）
        $s        textFont: 当content.text存在时，代表文字的样式，例如'14px Arial'
        $s        textVerticalAlign: 当content.text存在时，代表文字的垂直对齐方式（类似css的vertical-align）
        $s        color: 当content.text存在时，代表文字的颜色（类似css的color）
        $s        lineHeight: 当content.text存在时，代表文字的行高（类似css的lineHeight，单位限制为像素）
        $s        \/\/对齐、颜色的可选值参考css
    `,
    '元素嵌套': `
        元素嵌套

        Easycanvas可以通过children属性设置子元素，从而实现元素嵌套。Demo如下：

        $s        var $Painter = new Easycanvas.painter();
        $s        $Painter.register(document.getElementById('foo'));
        $s        $Painter.start();

        $s        Easycanvas.imgLoader('https://github.com/chenzhuo1992/easycanvas/blob/master/_forIO/G30x30.png?raw=true', function (img) {
        $s            // create a sprite
        $s            window.sprite1 = $Painter.add({
        $s                content: {
        $s                    img: img,
        $s                },
        $s                style: {
        $s                    tx: 100, ty: 100,
        $s                    locate: 'lt',
        $s                    opacity: 0.5,
        $s                    rotate: 40,
        $s                },

        $s                children: [
        $s                    {
        $s                        content: {
        $s                            img: img,
        $s                        },
        $s                        inherit: ['opacity'],
        $s                        style: {
        $s                            tx: 500, ty: 0,
        $s                            zIndex: 1,
        $s                            opacity: 0.5,
        $s                            locate: 'center',
        $s                        },
        $s                    },
        $s                    {
        $s                        inherit: ['tx', 'ty', 'rotate'],
        $s                        content: {
        $s                            img: img,
        $s                        },
        $s                        style: {
        $s                            tx: 500, ty: 500,
        $s                            opacity: 0.7,
        $s                            zIndex: 1,
        $s                            locate: 'center',
        $s                        },
        $s                    },
        $s                ],
        $s            });
        $s        });

        或者可以动态插入子元素：

        $s            var parent = new Easycanvas.class.sprite({
        $s                content: {
        $s                    img: box,
        $s                },
        $s            });
        $s            var child = new Easycanvas.class.sprite({
        $s                content: {
        $s                    img: ball,
        $s                },
        $s            });
        $s            parent.add(child);
        $s            parent.remove(child); // or child.remove();
    `,
    '精灵动画': `
        精灵动画（逐帧序列图）/ Sequence Diagram

        下面这个示例展示了如何通过全局的事件来动态创建元素，并且将一个动作序列图转换为动画展示。

        $s        var $Painter = new Easycanvas.painter();
        $s        $Painter.register(document.getElementById('foo'), {
        $s            events: {
        $s                \/\/点击时，根据点击的坐标，创建一个火焰爆炸的动画效果
        $s                click: function (e) {
        $s                    $Painter.add(createFire(e.canvasX, e.canvasY));
        $s                }
        $s            }
        $s        });

        $s        var Fire = Easycanvas.imgLoader('./Fire.png');

        $s        var createFire = function (initX, initY) {
        $s            return {
        $s                content: {
        $s                    \/\/引入一个包含多帧的图片
        $s                    img: Easycanvas.sequenceDiagram(Fire, {
        $s                        \/\/指定每帧在图片文件上的尺寸，-9代表图片宽度的1/9
        $s                        w: -9,
        $s                        h: -1,
        $s                        interval: 50,
        $s                        \/\/loop为false的元素将在最后一帧播放完毕后自动隐藏
        $s                        loop: false
        $s                    }),
        $s                },

        $s                style: {
        $s                    tx: initX, ty: initY,
        $s                },
        $s            };
        $s        };

        $s        $Painter.start();
    `,
    '扩展——物理引擎': `
        Easycanvas引入了Chipmunk-js作为物理引擎。如果需要使用物理引擎，需要额外引入：

        $s        import Easycanvas from 'easycanvas';
        $s        import EasycanvasPhysics from 'easycanvas/build/index.physics.js';
        $s        EasycanvasPhysics(Easycanvas);

        EasycanvasPhysics为每个Easycanvas的sprite提供了重力、摩擦、弹力等扩展属性，使用时需要创建physics对象。下例创建了一个空的容器，并指定了容器的重力。

        $s            var box = new Easycanvas.class.physics({
        $s                content: {
        $s                    img: img,
        $s                },
        $s                style: {
        $s                    tx: 200,
        $s                    ty: 100,
        $s                },
        $s                physics: {
        $s                    gravity: 1,
        $s                },
        $s            });
        $s            $Painter.add(box);

        当box中包含其它元素时，元素将受到重力的影响向下坠落。下例创建了一个球形物理对象并扔入box中：

        $s            var ball = new Easycanvas.class.physics({
        $s                content: {
        $s                    img: img,
        $s                },
        $s                style: {
        $s                    tx: 200, ty: 100,
        $s                    tw: 20, ty: 20,
        $s                },
        $s                physics: {
        $s                    shape: [
        $s                        [10, 10, 10],
        $s                    ],
        $s                    mass: 10,
        $s                    friction: 0.5,
        $s                    elasticity: 0.5,
        $s                },
        $s            });
        $s            box.add(ball);
        $s            box.launch();
        $s            ball.physicsOn();

        其中，shape代表对象的“物理性状”，将用于碰撞检测中。shape是一个Array，包含一系列的线段。如果是圆形，那么只需要一个值，三个参数分别为圆心的left、top坐标（同css，以图片左上角为原点）以及半径。如上例，元素的宽高（tw与th）为20，则shape是以(10,10)的位置绘制一个半径为10的圆，用于碰撞检测。

        shape支持多边形。例如shape为[[0, 0], [61, 0], [61, 38], [0, 38], [0, 0]]代表了几个点依次连接所围成的一个矩形（最后一个0,0坐标可以省略）。但是要注意的是，坐标点必须顺时针进行描述。

        mass代表一个对象的质量，friction代表摩擦系数（0至1，两个摩擦系数都为0的物体相互摩擦将不会减速），elasticity代表弹性系数（0至1，两个弹性为0的物体碰撞后将不分离）。

        调用launch和physicsOn之后，box中的元素将开始按物理学进行运动：ball将落下。其中，launch代表对某个“物理容器”进行初始化；physicsOn代表某个“物理对象”开始在容器中运动。physicsOn必须在上游的某个节点执行过launch之后才可以使用。
    `
};
