module.exports = `
        <section class="demo-box">
            <div class="code-2-demo bg-demo">3D性能测试：500个随机运动的闪烁模型</div>
            <code>
                <head>
                    <script src="./lib/easycanvas/plugin.webgl.standalone.prod.js"></script>
                </head>
                <body>
                    <canvas id="app"></canvas>
                </body>

                <script>
                    var $app = new Easycanvas.painter({
                        el: '#app',
                        width: 400,
                        height: 400,
                        webgl: {
                            fudgeFactor: Easycanvas.transition.pendulum(0, 20, 10000).loop(),
                        }
                    });

                    var vertices = [], colors = [], indices = [];
                    var count = 10;

                     // 初始化count个顶点
                    for (var i = 0; i < count; i++) {
                        // 每个顶点随机生成3个坐标；为了避免坐标太相近，每次从上一个顶点的位置进行随机
                        vertices.push((vertices[i - 3] || 0) + Math.random() * 40 - 20);
                        vertices.push((vertices[i - 3] || 0) + Math.random() * 40 - 20);
                        vertices.push((vertices[i - 3] || 0) + Math.random() * 40 - 20);

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

                    for (var i = 0; i < 500; i++) {
                        var $random = new Easycanvas.class.sprite({
                            style: {
                                tx: Easycanvas.transition.pendulum(Math.random() * 400, Math.random() * 400, Math.random() * 5000 + 15000).loop(),
                                ty: Easycanvas.transition.pendulum(Math.random() * 400, Math.random() * 400, Math.random() * 5000 + 15000).loop(),
                            },
                            webgl: Easycanvas.webglShapes.custom({
                                vertices: vertices,
                                indices: indices,
                                colors: colors,
                                ry: Easycanvas.transition.linear(0, 360, Math.random() * 2000 + 2000).loop(),
                                tz: Easycanvas.transition.pendulum(-100 - Math.random() * 300, 100, Math.random() * 2000 + 2000).loop(),
                            }),
                        });                    
                        $app.add($random);
                    }


                    // 设置一个在0和255之间钟摆运动的函数，用于控制颜色
                    var getColor = Easycanvas.transition.pendulum(0, 255, 1000).loop();
                    $random.on('ticked', function (tick) {
                        for (var i = 0, l = count; i < l; i++) {
                            // 给每个rgb值的第一个参数赋值，设置red的比重
                            $random.webgl.colors[i * 3] = getColor();
                        }

                        this.updateWebglStyle('colors');
                    });

                    $app.start();
                </script>
            </code>
        </section>
`;
