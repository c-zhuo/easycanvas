module.exports = `
    <article id="WebGL-加载MMD模型">
        <h1>WebGL-加载MMD模型</h1>

        <p>WebGL.MMD是Easycanvas提供的对WebGL插件的扩展，需要和WebGL插件共同使用。用于导入MMD文件的模型，并提供了一个loaderMMD对象，用于获取MMD文件的数据。</p>

        <p><strong>MMD模型包括扩展名为.PMD的模型文件，以及扩展名为.VMD的骨骼动画文件，都可以在Easycanvas中使用。</strong></p>

        <p class="tip">在浏览器端，loaderMMD会将MMD文件解析为包含vertices等属性的JSON格式的数据。这个过程会消耗一些性能，因此也可以预先将将MMD转换为JSON，在浏览器里进行引入，以节约性能。</p>

        <h2>引入方式</h2>

        <p><strong>如果要加载带有物理效果的VMD骨骼动画，需要额外引入Ammo.js</strong>，这是一个3D的物理计算库，不过体积较大（>1MB）。Node环境下建议将Ammo单独放在浏览器加载。</p>

        <code>
            <!-- js文件方式引入 -->
            <!-- 注意放在easycanvas.js后；prod为线上压缩版、dev为开发版；开发版带有调试、警告信息 -->

            <script src="http://your-path/ammo.js"></script>
            <script src="http://your-path/easycanvas.standalone.prod.js"></script>
            <script src="http://your-path/plugin.webgl.standalone.prod.js"></script>
            <script src="http://your-path/plugin.webgl.mmd.standalone.prod.js"></script>

            <!-- node环境引入 -->

            import Easycanvas from easycanvas;
            import EasycanvasWebgl from easycanvas/build/plugin.webgl.js;
            import EasycanvasWebglMMD from easycanvas/build/plugin.webgl.mmd.js;
            Easycanvas.use(EasycanvasWebgl);
            Easycanvas.use(EasycanvasWebglMMD);
        </code>

        <p>WebGL.MMD插件支持2种使用方式，<strong>导入MMD模型</strong>和<strong>解析MMD文件数据</strong>。前者更加便捷，后者扩展性更强。</p>

        <h2>导入MMD模型</h2>

        <p>可以通过为sprite类的webgl追加mmd属性来导入MMD模型。mmd属性的值为MMD文件的地址，将在sprite对象创建时发起加载，异步加载成功后进行渲染，如下例：</p>

        <section>
            <div class="code-2-demo bg-demo"></div>
            <code>
                <head>
                    <script src="./lib/easycanvas/plugin.webgl.standalone.prod.js"></script>
                    <script src="./lib/easycanvas/plugin.webgl.mmd.standalone.prod.js"></script>
                </head>
                <body>
                    <canvas id="app"></canvas>
                </body>

                <script>
                    var $app = new Easycanvas.painter({
                        el: '#app',
                        width: 400,
                        height: 400,
                        webgl: true, // 开启WebGL渲染
                    });

                    $app.add(new Easycanvas.class.sprite({
                        style: {
                            tx: 180, ty: 350,
                            zIndex: Math.random(),
                        },
                        webgl: {
                            imgPath: '../resource/mmd/model/mokou/',
                            pmd: '../resource/mmd/model/default/miku_v2.pmd',
                            rz: 180,
                            ry: Easycanvas.transition.linear(0, 360, 5000).loop(),
                            scale: Easycanvas.transition.pendulum(10, 15, 3000).loop(),
                        }
                    }));

                    $app.start();
                </script>
            </code>
        </section>

        <p>其中，imgPath为PMD文件中各图层使用的图片资源的根目录。由于PMD文件包含了图片资源的文件名，因此不需要像加载3DS那样指定。</p>

        <p>这个例子中，大部分图层的纹理是纯色，因此看起来并不立体。不过由于模型中包含大量折线，添加光线后会比较真实：</p>

        <section>
            <div class="code-2-demo bg-demo"></div>
            <code class="hidden">
                <head>
                    <script src="./lib/easycanvas/plugin.webgl.standalone.prod.js"></script>
                    <script src="./lib/easycanvas/plugin.webgl.mmd.standalone.prod.js"></script>
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
                            light: true,
                        }
                    });

                    $app.add(new Easycanvas.class.sprite({
                        style: {
                            tx: 180, ty: 350,
                            zIndex: Math.random(),
                        },
                        webgl: {
                            imgPath: '../resource/mmd/model/mokou/',
                            pmd: '../resource/mmd/model/default/miku_v2.pmd',
                            rz: 180,
                            ry: Easycanvas.transition.linear(0, 360, 5000).loop(),
                            scale: Easycanvas.transition.pendulum(10, 15, 3000).loop(),
                        }
                    }));

                    $app.start();
                </script>
            </code>
        </section>

        <p>可以通过vmdStart方法来播放一段动作，例如：</p>

        <section>
            <div class="code-2-demo bg-demo"></div>
            <code>
                <head>
                    <script src="./lib/easycanvas/plugin.webgl.standalone.prod.js"></script>
                    <script src="./lib/easycanvas/plugin.webgl.mmd.standalone.prod.js"></script>
                    <script src='./lib/ammo.js'></script>
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
                            light: true,
                        }
                    });

                    var miku = $app.add(new Easycanvas.class.sprite({
                        style: {
                            tx: 180, ty: 350,
                        },
                        webgl: {
                            imgPath: '../resource/mmd/model/mokou/',
                            pmd: '../resource/mmd/model/default/miku_v2.pmd',
                            rz: 180, ry: 180,
                            scale: 15,
                        }
                    }));

                    miku.vmdStart('../resource/mmd/vmd/wavefile_v2.vmd');

                    $app.start();
                </script>
            </code>
        </section>

        <h2>解析MMD数据</h2>

        <p>下面是一个解析MMD文件的数据的例子。将相同的图层放在一起，可以提升渲染效率（可以参考webgl.3DS插件文末的方式）。</p>

        <section>
            <div class="code-2-demo bg-demo"></div>
            <code>
                <head>
                    <script src="./lib/easycanvas/plugin.webgl.standalone.prod.js"></script>
                    <script src="./lib/easycanvas/plugin.webgl.mmd.standalone.prod.js"></script>
                    <script src='./lib/ammo.js'></script>
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
                            light: true,
                        }
                    });

                    Easycanvas.loaderPMD('../resource/mmd/model/default/miku_v2.pmd', function (data, pmd) {
                        var vertices = data.vertices;
                        var normals = data.normals;
                        var textures = data.textures;
                        var indices = data.indices;

                        var lastCount = 0;

                        pmd.materials.forEach((mt, i) => {
                            $app.add({
                                style: {
                                    tx: 180, ty: 350,
                                },
                                webgl: Easycanvas.webglShapes.custom({
                                    vertices: vertices,
                                    normals: normals,
                                    indices: indices.slice(lastCount, lastCount + mt.vertexCount),
                                    textures: textures,
                                    img: mt.fileName ? ('../resource/mmd/model/mokou/' + mt.fileName) : undefined,
                                    rz: 180, ry: 180, scale: 15,
                                    colors: mt.fileName ? undefined : (
                                      mt.color.map((num) => {return num * 255}).slice(0, 3)
                                    ),
                                })
                            });
                            lastCount += mt.vertexCount;
                        });

                        Easycanvas.loaderVMD('../resource/mmd/vmd/wavefile_v2.vmd', function (vmd) {
                            vmd.start(pmd, $app.children[0].webgl.vertices);
                        });
                    });

                    $app.start();
                </script>
            </code>
        </section>

        <p>PMD模型中，indices是全部索引，我们需要将他们拆分为各个图层所需要的索引数据；colors是0到1之间的数值，我们也要将他们转换为255以内的rgb色值。由于色值可以循环使用，截取colors时保留长度3的数组即可。</p>

    </article>
`;
