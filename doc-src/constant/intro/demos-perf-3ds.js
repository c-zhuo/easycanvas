export default `
        <section class="demo-box">
            <div class="code-2-demo bg-demo">3D性能测试：40个高质量人物模型展示</div>
                <code>
                    <head>
                        <script src="./lib/easycanvas/plugin.webgl.standalone.prod.js"></script>
                        <script src="./lib/easycanvas/plugin.webgl.3ds.standalone.prod.js"></script>
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

                        var texture = {
                            'Material #45': '../resource/game_char/4.jpg',
                            'Material #46': '../resource/game_char/3.jpg',
                            'Material #49': '../resource/game_char/6.jpg',
                            'Material #51': '../resource/game_char/8.jpg',
                        };

                        var rz = Easycanvas.Transition.linear(0, 360, 5000).loop();

                        Easycanvas.loader3DS('../resource/game_char/sunnvfashi.3DS', function (data) {
                            data.forEach(function (model) {
                                var roleShape = {
                                    vertices: model.vertices,
                                    indices: model.indices,
                                    img: texture[model.img],
                                    textures: model.textures,
                                    scale: 10,
                                    rx: 90, ry: 0, rz: rz
                                };

                                for (var i = 0; i < 40; i++) {
                                    var $role = $app.add({
                                        name: model.img,
                                        style: {
                                            left: 60 + i % 10 * 30,
                                            top: parseInt(i / 10) * 100 + 50,
                                        },
                                        webgl: window.Easycanvas.webglShapes.custom(roleShape),
                                    });
                                }
                            });
                        });

                        $app.start();
                    </script>
                </code>
        </section>
`;
