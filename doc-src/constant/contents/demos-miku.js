module.exports = `
        <section class="demo-box">
            <div class="code-2-demo bg-demo">50行代码，MMD模型及骨骼动画，可修改颜色</div>
            <code>
                <head>
                    <script src="./lib/easycanvas/plugin.webgl.standalone.prod.js"></script>
                    <script src="./lib/easycanvas/plugin.webgl.mmd.standalone.prod.js"></script>
                    <script src='./lib/ammo.js'></script>
                </head>
                <body>
                    <canvas id="app"></canvas>
                    <p id="content">3D资源加载中，请稍等</p>
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
                            left: 180, top: 350,
                        },
                        webgl: {
                            imgPath: '../resource/mmd/model/mokou/',
                            pmd: '../resource/mmd/model/default/miku_v2.pmd',
                            rz: 180, ry: 0,
                            scale: 15,
                        }
                    }));

                    miku.on('webgl-pmd-loaded', function () {
                        miku.vmdStart('../resource/mmd/vmd/wavefile_v2.vmd');
                        document.getElementById('content').innerText = '动作资源加载中，请稍等';

                        $app.events.mousemove = function (e) {
                            // 袖、袜、裙
                            miku.children[3].updateWebglStyle('colors',
                                [e.canvasX, e.canvasY, e.canvasX + e.canvasY]
                            );
                            // 头发
                            miku.children[1].updateWebglStyle('colors',
                                [e.canvasY, e.canvasX, e.canvasX + e.canvasY]
                            );
                            // 衣服
                            miku.children[4].updateWebglStyle('colors',
                                [e.canvasX / 2, e.canvasY, e.canvasX + e.canvasY]
                            );
                            miku.webgl.ry = -Math.floor((e.canvasX - 200) / 3);
                        };
                    });

                    miku.on('webgl-vmd-loaded', function () {
                        document.getElementById('content').innerText = '加载完成，移动鼠标交互';
                    });

                    $app.start();
                </script>
            </code>
        </section>
`;
