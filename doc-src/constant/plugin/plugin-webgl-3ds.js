export default `
    <article id="WebGL-加载3DS模型">
        <h1>WebGL-加载3DS模型</h1>

        <p>WebGL.3DS是Easycanvas提供的对WebGL插件的扩展，需要和WebGL插件共同使用。用于导入3DS文件的模型，并提供了一个loader3DS对象，用于获取3DS文件的数据。</p>

        <p><strong>3DS模型是扩展名为.3ds的文件，此外还有以.max为后缀的文件。max格式的文件虽然无法直接使用，但是可以用其他工具转换为3ds格式。</strong></p>

        <p class="tip">在浏览器端，loader3DS会将3DS文件解析为包含vertices等属性的JSON格式的数据。这个过程会消耗一些性能，因此也可以预先将将3DS转换为JSON，在浏览器里进行引入，以节约性能。</p>

        <h2>引入方式</h2>

        <code>
            <!-- js文件方式引入 -->
            <!-- 注意放在easycanvas.js后；prod为线上压缩版、dev为开发版；开发版带有调试、警告信息 -->

            <script src="http://your-path/easycanvas.standalone.prod.js"></script>
            <script src="http://your-path/plugin.webgl.standalone.prod.js"></script>
            <script src="http://your-path/plugin.webgl.3ds.standalone.prod.js"></script>
        </code>
        <code>
            <!-- node环境引入 -->

            import Easycanvas from 'easycanvas';
            import EasycanvasWebgl from 'easycanvas/build/plugin.webgl.js';
            import EasycanvasWebgl3DS from 'easycanvas/build/plugin.webgl.3ds.js';

            Easycanvas.use(EasycanvasWebgl);
            Easycanvas.use(EasycanvasWebgl3DS);
        </code>

        <p>WebGL.3DS插件支持2种使用方式，<strong>导入3DS模型</strong>和<strong>解析3DS文件数据</strong>。前者更加便捷，后者扩展性更强。</p>

        <h2>导入3DS模型</h2>

        <p>可以通过为Sprite类的webgl追加_3ds属性来导入3DS模型。_3ds属性的值为3DS文件的地址，将在Sprite对象创建时发起加载，异步加载成功后进行渲染，如下例：</p>

        <section>
            <div class="code-2-demo bg-demo"></div>
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
                        webgl: true, // 开启WebGL渲染
                    });

                    $app.add(new Easycanvas.Sprite({
                        style: {
                            left: 200, top: 200,
                        },
                        webgl: {
                            _3dsImg: {
                                'Flower Center': '../resource/15sunflower/center.jpg',
                                'Petals': '../resource/15sunflower/petal.jpg',
                            },
                            _3ds: '../resource/15sunflower/15sunflower.3DS',
                            ry: Easycanvas.Transition.linear(0, 360, 5000).loop(),
                            scale: Easycanvas.Transition.pendulum(0.5, 1, 2000).loop(),
                        }
                    }));

                    $app.start();
                </script>
            </code>
        </section>

        <p>这个例子中，用_3dsImg指定各个图层所对应的图片文件的地址。由于可能存在多个图层，不支持统一配置colors。如果想指定某一个图层的颜色，可以单独为某一个图层配置colors：</p>

        <section>
            <div class="code-2-demo bg-demo"></div>
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
                        webgl: true, // 开启WebGL渲染
                    });

                    $app.add(new Easycanvas.Sprite({
                        style: {
                            left: 200, top: 200,
                        },
                        webgl: {
                            _3dsImg: {
                                'Flower Center': '../resource/15sunflower/center.jpg',
                                'Petals': [
                                    255, 0, 0,
                                    166, 0, 0,
                                    88, 0, 0,
                                ],
                            },
                            _3ds: '../resource/15sunflower/15sunflower.3DS',
                            ry: Easycanvas.Transition.linear(0, 360, 5000).loop(),
                            scale: Easycanvas.Transition.pendulum(0.5, 1, 2000).loop(),
                        }
                    }));

                    $app.start();
                </script>
            </code>
        </section>

        <p>上面的例子中，我们用3个不同深浅的红色为“Petals”图层进行染色。</p>

        <p><strong>Sprite初始化的时候，webgl中的_3ds等属性将被移除，并添加若干个子Sprite对象，每个都是3DS的一个图层。</strong></p>

        <p class="tip">Tips：解析同一个3DS文件，产生的Sprite将共享顶点、索引等数据，这样有助于提升性能。如果希望对其中的一个进行单独编辑，可以在webgl中增加useCache属性，传入false即可。</p>

        <h2>解析3DS数据</h2>

        <p>下面是一个解析3DS文件的数据的例子。将相同的图层放在一起，可以提升渲染效率。例如下面的例子：</p>

        <section>
            <div class="code-2-demo bg-demo"></div>
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
                        webgl: true, // 开启WebGL渲染
                    });

                    var texture = {
                        // 这几种图片加载方式都是可以的
                        'Material #45': '../resource/game_char/4.jpg',
                        'Material #46': '../resource/game_char/3.jpg',
                        'Material #49': $app.imgLoader('../resource/game_char/6.jpg'),
                        'Material #51': Easycanvas.ImgLoader('../resource/game_char/8.jpg'),
                    };

                    var rz = Easycanvas.Transition.linear(0, 360, 5000).loop();

                    Easycanvas.loader3DS('../resource/game_char/sunnvfashi.3DS', function (data) {
                        data.forEach(function (model) {
                            var roleShape = {
                                vertices: model.vertices,
                                indices: model.indices,
                                img: texture[model.img],
                                textures: model.textures,
                                scale: 20,
                                rx: 90, ry: 0, rz: rz,
                            };

                            for (var i = 0; i < 10; i++) {
                                $app.add({
                                    name: model.img,
                                    style: {
                                        left: 60 + i % 5 * 70,
                                        top: i >= 5 ? 300 : 100,
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

        <p>看起来场景中有10个人物模型，但是其实，我们是先创建了10个“Material #45”图层、再创建10个“Material #46”图层，以此类推。这样，渲染时可以最大程度的减少图层的切换，提升渲染的效率。</p>

    </article>
`;
