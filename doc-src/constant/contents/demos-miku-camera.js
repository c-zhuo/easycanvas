module.exports = `
        <section class="demo-box">
            <div class="code-2-demo bg-demo">80行代码，MMD模型及骨骼动画，可修改摄像头位置及视角</div>
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
                    });

                    miku.on('webgl-vmd-loaded', function () {
                        document.getElementById('content').innerText = '加载完成';

                        changeCamera();
                        setInterval(changeCamera, interval);
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
                        Easycanvas.transition(current, 'x', 'ease', Math.random() * 1000 - 500, interval);
                        Easycanvas.transition(current, 'y', 'ease', Math.random() * 600 - 400, interval);
                        Easycanvas.transition(target, 'x', 'ease', Math.random() * 100 + 150, interval);
                        Easycanvas.transition(target, 'y', 'ease', Math.random() * 100 + 150, interval);
                        Easycanvas.transition(rotate, 'x', 'linear', Math.random() * 2 - 1, interval);
                        Easycanvas.transition(rotate, 'y', 'linear', Math.random() * 2 - 1, interval);
                        Easycanvas.transition(rotate, 'z', 'linear', Math.random() * 2 - 1, interval);
                    }

                    $app.start();
                </script>
            </code>
        </section>
`;
