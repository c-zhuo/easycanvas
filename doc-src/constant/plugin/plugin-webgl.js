export default `
    <article id="WebGL">
        <h1>WebGL</h1>

        <p>Easycanvas支持在canvas中同时渲染2D和3D元素。移动端请避免大量（数百个物体以上）交替使用2D、3D或者颜色纹理、图片纹理进行绘制，否则容易引起卡顿。用WebGL渲染文字时，Easycanvas将使用图片纹理。</p>

        <p>使用时，图片的response需要有跨域的支持，否则图片无法渲染（浏览器会报错）。未来版本会通过base64转换来解决这个问题，但是为了提升性能，建议为域名所在的域名配置跨域的响应头。</p>

        <p>需要注意是的，<strong>WebGL的2D渲染效率可能会比Canvas渲染2D图形要差一些</strong>，因为目前很多浏览器的Canvas API是使用了硬件加速的，浏览器利用GPU进行图形的绘制，效率更高一些。WebGL的优势主要在于可以利用GPU高效进行3D效果所需要的计算。</p>

        <p class="tip">Tips：目前只能在浏览器中使用，暂不支持微信小程序和微信小游戏。</p>

        <h2>引入方式</h2>

        <code>
            <!-- js文件方式引入 -->
            <!-- 注意放在easycanvas.js后；prod为线上压缩版、dev为开发版；开发版带有调试、警告信息 -->

            <script src="http://your-path/easycanvas.standalone.prod.js"></script>
            <script src="http://your-path/plugin.webgl.3ds.standalone.prod.js"></script>
        </code>
        <code>
            <!-- node环境引入 -->

            import Easycanvas from 'easycanvas';
            import EasycanvasWebgl from 'easycanvas/build/plugin.webgl.js';

            Easycanvas.use(EasycanvasWebgl);

            <!-- 引入后，常用形状可以在Easycanvas.webglShapes下找到 -->
            console.log(Easycanvas.webglShapes);
        </code>

        <h2>WebGL 2D</h2>

        <p>在创建painter实例、或者使用register注册实例到dom上时，指定webgl参数为true就可以使用WebGL进行渲染。开启WebGL之后，整个canvas实例将自动转化为WebGL的绘制，包括content中的img和text都将用WebGL进行渲染。</p>

        <section>
            <div class="code-2-demo bg-demo"></div>
            <code>
                <head>
                    <script src="./lib/easycanvas/plugin.webgl.standalone.prod.js"></script>
                </head>
                <body>
                    <canvas id="app"></canvas>
                </body>

                <script>
                    var $app = new Easycanvas.Painter({
                        el: '#app',
                        width: 400,
                        height: 400,
                        webgl: true, // 开启WebGL渲染
                    });

                    var $letterG = new Easycanvas.Sprite({
                        content: {
                            img: 'https://raw.githubusercontent.com/c-zhuo/easycanvas/master/demos/G.png',
                        },
                        style: {
                            width: 50,
                            height: 50,
                            left: Easycanvas.Transition.pendulum(50, 150, 3000).loop(),
                            top: 100,
                        },
                        events: {
                            click: function (e) {
                                this.style.width = 100;
                                return true;
                            },
                        },
                    });

                    $app.add($letterG);
                    $app.start();
                </script>
            </code>
        </section>

        <p class="tip">Tips：如果浏览器不支持WebGL，那么会自动使用Canvas进行渲染，但是只会进行2D的渲染，不会使用下面的3D相关特性。可以将webgl从true改为对象，在webgl的fallback属性设置不支持WebGL模式渲染的回调。</p>
        
        <p class="tip">Tips：当渲染带有透明通道的图片，例如png图像时，可以为webgl增加hasAlpha属性，值为true。</p>

        <h2>常见3D形状</h2>

        <p>在支持WebGL的浏览器中，如果要展示3D形状，可以向Sprite类增加webgl参数。引入了WebGL插件之后，会向Easycanvas.webglShapes挂载一些基本的几何体。例如下例是一个旋转的立方体：</p>

        <section>
            <div class="code-2-demo bg-demo"></div>
            <code>
                <head>
                    <script src="./lib/easycanvas/plugin.webgl.standalone.prod.js"></script>
                </head>
                <body>
                    <canvas id="app"></canvas>
                </body>

                <script>
                    var $app = new Easycanvas.Painter({
                        el: '#app',
                        width: 400,
                        height: 400,
                        webgl: true, // 开启WebGL渲染
                    });

                    var $letterG = new Easycanvas.Sprite({
                        style: {
                            left: 100, top: 200,
                        },
                        webgl: Easycanvas.webglShapes.block({
                            a: 20, b: 40, c: 80,
                            rx: Easycanvas.Transition.linear(0, 360, 1000).loop(),
                            ry: Easycanvas.Transition.linear(0, 360, 2000).loop(),
                            rz: 45,
                            colors: [
                                255,255,0,
                                255,0,0,
                                0,255,0
                            ],
                        }),
                    });

                    $app.add($letterG);
                    $app.start();
                </script>
            </code>
        </section>

        <p>这个例子中，向场景中添加了一个block形状，其中a、b、c是物体的长宽高，rx、ry、rz是x、y、z三个方向的旋转角度。这个例子的位置是用style里的tx和ty指定的。<strong>如果webgl里指定了tx、ty，那么将不再遵守style里的left和top参数，但是不推荐这样使用</strong>，容易引起代码逻辑混乱。</p>

        <p>除了指定颜色，也可以为几何体指定一张贴图，例如下面是两个圆形的石头：</p>

        <section>
            <div class="code-2-demo bg-demo"></div>
            <code>
                <head>
                    <script src="./lib/easycanvas/plugin.webgl.standalone.prod.js"></script>
                </head>
                <body>
                    <canvas id="app"></canvas>
                </body>

                <script>
                    var $app = new Easycanvas.Painter({
                        el: '#app',
                        width: 400,
                        height: 400,
                        webgl: true, // 开启WebGL渲染
                    });

                    var stone = $app.imgLoader('https://raw.githubusercontent.com/c-zhuo/tanyitan/3d/debug/docs/stone.jpg');

                    var $stone1 = new Easycanvas.Sprite({
                        style: {
                            left: 100, top: 200,
                        },
                        webgl: Easycanvas.webglShapes.ball({
                            r: 80, b: 40,
                            rx: Easycanvas.Transition.linear(0, 360, 1000).loop(),
                            ry: Easycanvas.Transition.linear(0, 360, 2000).loop(),
                            rz: 45,
                            img: stone
                        }),
                    });
                    var $stone2 = new Easycanvas.Sprite({
                        style: {
                            left: 300, top: 200,
                        },
                        webgl: Easycanvas.webglShapes.ball({
                            r: 80, b: 10,
                            rx: Easycanvas.Transition.linear(0, 360, 1000).loop(),
                            ry: Easycanvas.Transition.linear(0, 360, 2000).loop(),
                            rz: 45,
                            img: stone
                        }),
                    });

                    $app.add($stone1);
                    $app.add($stone2);
                    $app.start();
                </script>
            </code>
        </section>

        <p>可以看到，第一个球比第二个“更圆一些”。这是因为<strong>WebGL渲染时，是没有球体或者圆形的，只能用多个三角形来近似渲染</strong>。这里的b参数代表了三角形的密集程度，b越大，越趋近于圆形，但是也越消耗性能。</p>

        <p>除了这几个参数，webgl中也有缩放参数。scale是各个方向的缩放比例，scaleX、scaleY和scaleZ是每个方向的缩放比例，这三个属性的优先级高于scale：</p>

        <section>
            <div class="code-2-demo bg-demo"></div>
            <code>
                <head>
                    <script src="./lib/easycanvas/plugin.webgl.standalone.prod.js"></script>
                </head>
                <body>
                    <canvas id="app"></canvas>
                </body>

                <script>
                    var $app = new Easycanvas.Painter({
                        el: '#app',
                        width: 400,
                        height: 400,
                        webgl: true, // 开启WebGL渲染
                    });

                    var $stone = new Easycanvas.Sprite({
                        style: {
                            left: 200, top: 200,
                        },
                        webgl: Easycanvas.webglShapes.block({
                            a: 40, b: 60, c: 80,
                            scale: Easycanvas.Transition.pendulum(2, 1, 3000).loop(),
                            scaleX: Easycanvas.Transition.pendulum(1, 2, 3000).loop(),
                            ry: Easycanvas.Transition.linear(0, 360, 20000).loop(),
                            rz: 45,
                            img: 'https://raw.githubusercontent.com/c-zhuo/tanyitan/3d/debug/docs/stone.jpg'
                        }),
                    });

                    $app.add($stone);
                    $app.start();
                </script>
            </code>
        </section>

        <h2>自定义3D形状</h2>

        <p>以下内容需要一定的WebGL知识。</p>

        <p>如果想自定义3D形状，Easycanvas.webglShapes.custom这个API。除了上面的img等参数外，还可以使用以下参数：</p>

        <table>
            <thead>
                <tr>
                    <th align="left">属性</th>
                    <th align="left">描述</th>
                    <th align="left">举例</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td align="left">vertices(Array, 必传)</td>
                    <td align="left">顶点，每3个值构成一个空间坐标</td>
                    <td align="left">[-1, -1, -1, -1, -1, 1, -1, 1, -1]</td>
                </tr>
                <tr>
                    <td align="left">indices(Array, 可选)</td>
                    <td align="left">索引，indices[n]对应的顶点为[vertices[3*n], vertices[3*n+1], vertices[3*n+2]]</td>
                    <td align="left">[0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7]</td>
                </tr>
                <tr>
                    <td align="left">textures(Array, 和colors任选其一)</td>
                    <td align="left">纹理，每2个值构成一个平面坐标，长度不够时会自动循环</td>
                    <td align="left">[0, 0, 0, 1, 1, 1, 1, 0]</td>
                </tr>
                <tr>
                    <td align="left">colors(Array, 和textures任选其一)</td>
                    <td align="left">颜色，每3个值构成一个顶点rgb色值，长度不够时会自动循环，和textures</td>
                    <td align="left">[255, 255, 0]</td>
                </tr>
                <tr>
                    <td align="left">normals(Array, 可选)</td>
                    <td align="left">法向量，每3个值构成一个矢量，用于光照，长度需要和顶点数相同</td>
                    <td align="left">[1, 1, -0.5]</td>
                </tr>
            </tbody>
        </table>

        <p>例如下面这个例子，随机生成了20个坐标点，并且让这些点两两相连，形成一个凸多面体，并且让颜色每帧都进行变化。</p>

        <p class="tip">Tips：由于坐标点两两相连，性能开销几乎与坐标点数量的平方正相关，因此比较耗费性能。如果改为设置1000个以上坐标点，就会产生百万级别的数据，可能导致浏览器卡顿。</p>

        <section>
            <div class="code-2-demo bg-demo"></div>
            <code>
                <head>
                    <script src="./lib/easycanvas/plugin.webgl.standalone.prod.js"></script>
                </head>
                <body>
                    <canvas id="app"></canvas>
                </body>

                <script>
                    var $app = new Easycanvas.Painter({
                        el: '#app',
                        width: 400,
                        height: 400,
                        webgl: true,
                    });

                    var vertices = [], colors = [], indices = [];
                    var count = 20;

                     // 初始化count个顶点
                    for (var i = 0; i < count; i++) {
                        // 每个顶点随机生成3个坐标；为了避免坐标太相近，每次从上一个顶点的位置进行随机
                        vertices.push((vertices[i - 3] || 0) + Math.random() * 100 - 50);
                        vertices.push((vertices[i - 3] || 0) + Math.random() * 100 - 50);
                        vertices.push((vertices[i - 3] || 0) + Math.random() * 100 - 50);

                        // 随机一些颜色，colors长度不够会自动循环着色，所以数组长度短一些没关系
                        colors.push(Math.floor(Math.random() * 255));
                    }

                    for (var i = 0; i < count * 3; i += 3) {
                        for (var j = i + 3; j < count * 3 - 3; j += 3) {
                            // 每个顶点都和后面的2个顶点连结，形成多个三角形
                            indices.push(i / 3);
                            indices.push(j / 3);
                            indices.push(j / 3 + 1);
                        }
                    }

                    var $random = new Easycanvas.Sprite({
                        style: {
                            left: 200, top: 200,
                        },
                        webgl: Easycanvas.webglShapes.custom({
                            vertices: vertices,
                            indices: indices,
                            colors: colors,
                            ry: Easycanvas.Transition.linear(0, 360, 5000).loop(),
                        }),
                    });

                    // 设置一个在0和255之间钟摆运动的函数，用于控制颜色
                    var getColor = Easycanvas.Transition.pendulum(0, 255, 1000).loop();
                    $random.on('ticked', function (tick) {
                        for (var i = 0, l = count; i < l; i++) {
                            // 给每个rgb值的第一个参数赋值，设置red的比重
                            $random.webgl.colors[i * 3] = getColor();
                        }

                        this.updateWebglStyle('colors');
                    });

                    $app.add($random);
                    $app.start();
                </script>
            </code>
        </section>

        <h2>透射</h2>

        <p>透射是3D场景“近大远小”的效果。即例如下面这张图，路的宽度是不变的，但是越远，看起来显得越窄。</p>

        <img class="article-img" width="200" src="../resource/image/fudgeFactor.jpg"></img>

        <p>这个程度用fudgeFactor参数表示，默认为0，代表远近不影响视觉上的大小。在下例中，随着fudgeFactor的增大，“近大远小”的效果会更加明显。</p>

        <section>
            <div class="code-2-demo bg-demo"></div>
            <code>
                <head>
                    <script src="./lib/easycanvas/plugin.webgl.standalone.prod.js"></script>
                </head>
                <body>
                    <canvas id="app"></canvas>
                </body>

                <script>
                    var $app = new Easycanvas.Painter({
                        el: '#app',
                        width: 400,
                        height: 400,
                        webgl: {
                            fudgeFactor: Easycanvas.Transition.pendulum(0, 50, 1000).loop(),
                        }
                    });

                    [50, 150, 250, 350].forEach(function (x) {
                        $app.add(new Easycanvas.Sprite({
                            style: {
                                left: x, top: 200,
                            },
                            webgl: Easycanvas.webglShapes.block({
                                a: 20, b: 40, c: 80, rz: 45, rx: 30,
                                colors: [255,255,0,255,0,0,0,255,0],
                            }),
                        }));
                    });

                    $app.start();
                </script>
            </code>
        </section>

        <p class="tip">Tips：fudgeFactor为负数时，会出现“远大近小”的效果。</p>

        <h2>视角</h2>

        <p>修改painter实例的webgl参数中的camera，可以调整视角和朝向。Demo如下：</p>

        <section>
            <div class="code-2-demo bg-demo"></div>
            <code>
                <head>
                    <script src="./lib/easycanvas/plugin.webgl.standalone.prod.js"></script>
                </head>
                <body>
                    <canvas id="app"></canvas>
                </body>

                <script>
                    var $app = new Easycanvas.Painter({
                        el: '#app',
                        width: 400,
                        height: 400,
                        webgl: {
                            camera: {
                                enable: true,
                                current: {
                                    x: 0,
                                    y: 0,
                                    z: -100,
                                },
                                target: {
                                    x: 200,
                                    y: 200,
                                    z: 0,
                                },
                                rotate: {
                                    x: 0,
                                    y: -1,
                                    z: 0,
                                }
                            },
                        }
                    });

                    [50, 150, 250, 350].forEach(function (x) {
                        $app.add(new Easycanvas.Sprite({
                            style: {
                                left: x, top: 200,
                            },
                            webgl: Easycanvas.webglShapes.block({
                                a: 20, b: 40, c: 80, rz: 45, rx: 30,
                                colors: [255,255,0,255,0,0,0,255,0],
                            }),
                        }));
                    });

                    // 视角调整间隔
                    var interval = 2000;
                    // 调整摄像头位置
                    var current = $app.webgl.camera.current;
                    // 调整摄像目标位置
                    var target = $app.webgl.camera.target;
                    // 摄像头角度
                    var rotate = $app.webgl.camera.rotate;

                    function changeCamera () {
                        Easycanvas.Transition(current, 'x', 'ease', Math.random() * 1000 - 500, interval);
                        Easycanvas.Transition(current, 'y', 'ease', Math.random() * 600 - 400, interval);
                        Easycanvas.Transition(target, 'x', 'ease', Math.random() * 100 + 150, interval);
                        Easycanvas.Transition(target, 'y', 'ease', Math.random() * 100 + 150, interval);
                        Easycanvas.Transition(rotate, 'x', 'linear', Math.random() * 2 - 1, interval);
                        Easycanvas.Transition(rotate, 'y', 'linear', Math.random() * 2 - 1, interval);
                        Easycanvas.Transition(rotate, 'z', 'linear', Math.random() * 2 - 1, interval);
                    }

                    changeCamera();
                    setInterval(changeCamera, 1000);

                    $app.start();
                </script>
            </code>
        </section>

        <h2>绘制像素点</h2>

        <p>像素点（也可以理解为单色的球体）通过自定义形状进行绘制。Demo如下：</p>

        <section>
            <div class="code-2-demo bg-demo"></div>
            <code>
                <head>
                    <script src="./lib/easycanvas/plugin.webgl.standalone.prod.js"></script>
                </head>
                <body>
                    <canvas id="app"></canvas>
                </body>

                <script>
                    var $app = new Easycanvas.Painter({
                        el: '#app',
                        width: 400,
                        height: 400,
                        webgl: {
                            singleShader: true,
                        },
                        events: {
                            mousemove: function (e) {
                                mouseX = e.canvasX;
                                mouseY = e.canvasY;
                            },
                        }
                    });

                    var mouseX = 200;
                    var mouseY = 200;

                    function createEffect () {
                        var $effect = $app.add({
                            style: {
                                left: Easycanvas.Transition.pendulum(
                                    mouseX + 5 - Math.random() * 10,
                                    mouseX - 100 - Math.random() * 400,
                                    3000
                                ).loop(),
                                top: Easycanvas.Transition.ease(
                                    mouseY,
                                    mouseY - 200,
                                    1000
                                ),
                                zIndex: Math.random(),
                            },
                            webgl: window.Easycanvas.webglShapes.custom({
                                vertices: [0, 0, 0],
                                colors: [
                                    255, Math.random() * 128, 0, 255,
                                ],
                                pointSizes: new Float32Array([10]),
                                primitive: 0, // points
                                hasAlpha: true,
                            }),
                            hooks: {
                                ticked: function () {
                                    this.webgl.pointSizes[0] += 2;
                                    this.updateWebglStyle('pointSizes');

                                    if (this.webgl.colors[3] > 4) {
                                        this.webgl.colors[3] -= 4;
                                        this.updateWebglStyle('colors');
                                    } else {
                                        this.remove();
                                    }
                                }
                            }
                        });
                    }

                    $app.on('ticked', createEffect, 50);

                    $app.start();
                </script>
            </code>
        </section>

        <p class="tip">Tips：这里的singleShader的用途是让Easycanvas使用同一个shader渲染各种不同的图形，以降低切换shader造成的性能损耗。当渲染像素点时，这项必须为true。后续版本可能会解除这个限制。</p>
    </article>
`;
