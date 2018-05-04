module.exports = `
    <article id="物理引擎">
        <h1>物理引擎</h1>

        <p>这里将介绍如何给sprite一些物理规则，产生重力、碰撞的效果，以及如何对他们施加力、自定义碰撞的处理等。</p>
        
        <h2>一个复杂的例子</h2>

        <p></p>

        <section>
            <div class="code-2-demo bg-demo"></div>
            <code>
                <head>
                    <script src="./lib/easycanvas/plugin.physics.standalone.prod.js"></script>
                </head>
                <body>
                    <style>
                        body {
                            margin: 10px;
                        }
                        canvas {
                            border: 1px solid grey;
                        }
                    </style>
                    <canvas id="app"></canvas>
                </body>

                <script>
                    var width = document.body.clientWidth - 20, height = document.body.clientHeight - 20;

                    var $Painter = new Easycanvas.painter();
                    $Painter.register(document.getElementById('app'), {
                        width: width,
                        height: height,
                    });
                    $Painter.start();

                    var BLOCK = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAwCAYAAABuZUjcAAAAlElEQVRoBe3SwQmAQBDFUNe6PNmC/deiYAU5hIWBeA6f4a3rup/3GPidA2/+T+7w3S+XeOJQoF8FQmlZ4holHEocQmlZ4holHEocQmlZ4holHEocQmlZ4holHEocQmlZ4holHEocQmlZ4holHEocQmlZ4holHEocQmlZ4holHEocQmlZ4holHEocQmlZ4holHBor/gGBBgIwevtkRgAAAABJRU5ErkJggg==';

                    var BALL = Easycanvas.imgLoader('https://raw.githubusercontent.com/chenzhuo1992/easycanvas/master/demos/G.png');

                    var opacity = 1;

                    var $space = new Easycanvas.class.sprite({
                        physics: {
                            gravity: 1,
                            accuracy: 2,
                        },
                    });

                    $Painter.add($space);
                    $space.launch().addCollisionHandler(
                        1, 2,
                        function (cp) {
                            return true;
                        },
                        function () {
                            return true;
                        },
                        function () {
                            return false;
                        },
                        function (cp) {
                            var sq = cp.b.$sprite.name === 'square' ? cp.b.$sprite : cp.b.$sprite;
                            var ball = cp.a.$sprite.name === 'square' ? cp.a.$sprite : cp.a.$sprite;

                            sq.children[0].content.text--;
                            if (!sq.children[0].content.text) {
                                sq.style.visible = false;
                                $Painter.nextTick(() => {
                                    sq.physicsOff();
                                    sq.remove();
                                });
                            }
                            return false;
                        }
                    );

                    var ballSize = 30;
                    var ballArray = [];
                    function addBall () {
                        var ballSprite = new Easycanvas.class.sprite({
                            name: 'ball',
                            content: {
                                img: BALL,
                            },
                            physics: {
                                // 形状是一个以(10,10)为圆心的，半径10的圆
                                shape: [
                                    [ballSize/2, ballSize/2, ballSize/2 * 0.8]
                                ],
                                mass: 0.1, // 质量
                                friction: 0, // 摩擦
                                elasticity: 1, // 弹性
                                collisionType: 1,
                            },
                            style: {
                                tw: ballSize, th: ballSize,
                                sx: 0, sy: 0,
                                tx: Math.floor(Math.random() * 300) + 1,
                                ty: Math.floor(Math.random() * 20) + 1,
                                locate: 'lt',
                                zIndex: 1,
                                opacity: opacity,
                            },
                        });
                        $space.add(ballSprite);
                        ballSprite.physicsOn();
                        ballArray.push(ballSprite);
                    }
                    addBall();

                    var ballCount = 0;
                    setInterval(() => {
                        if (ballCount > 20) return;

                        addBall();
                        ballCount++;
                    }, 200);

                    function addSq () {
                        var deg = Math.floor(Math.random() * 360);
                        var sqSprite = $space.add(new Easycanvas.class.sprite({
                            name: 'square',
                            content: {
                                img: BLOCK,
                            },
                            physics: {
                                shape: [
                                    [[0, 0], [0, 30]],
                                    [[0, 30], [30, 30]],
                                    [[30, 30], [30, 0]],
                                    [[30, 0], [0, 0]]
                                    // [0, 0], [30, 0], [30, 30], [0, 30]
                                ],
                                mass: 0.1,
                                friction: 0,
                                elasticity: 1,
                                collisionType: 2,
                                static: true,
                            },
                            style: {
                                tw: 30, th: 30,
                                tx: Math.floor(Math.random() * (width - 100)) + 50,
                                ty: Math.floor(Math.random() * (height - 300)) + 200,
                                locate: 'lt',
                                zIndex: Math.random(),
                                opacity: opacity,
                                rotate: deg,
                            },
                            children: [{
                                content: {
                                    text: Math.floor(Math.random() * 20) + 1,
                                },
                                style: {
                                    color: 'yellow',
                                    textAlign: 'center',
                                    textVerticalAlign: 'middle',
                                    textFont: '28px Arial',
                                    tx: 15, ty: 10
                                }
                            }]
                        }));
                        sqSprite.physicsOn();
                    }

                    for (var i = 0; i < 20; i += 1) {
                        addSq();
                    }

                    var borderSprite = $space.add(new Easycanvas.class.sprite({
                        name: 'border-static',
                        content: {
                        },
                        physics: {
                            shape: [
                                [[0, 0], [width, 0]],
                                [[0, 0], [0, height]],
                                [[width, 0], [width, height]],
                                [[0, height], [width, height]]
                            ],
                            friction: 0.1,
                            elasticity: 0.8,
                            static: true
                        },
                        style: {
                            tx: 0, ty: 0, tw: width, th: height,
                            locate: 'lt',
                            opacity: opacity,
                        },
                    }));

                    borderSprite.physicsOn();
                </script>
            </code>
        </section>

    </article>

`;
