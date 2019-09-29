export default `
        <section class="demo-box">
            <div class="code-2-demo bg-demo">精灵动画：爆炸效果</div>
            <code>
                <head>
                    <script src="./lib/easycanvas/components.standalone.prod.js"></script>
                </head>
                <body>
                    <canvas id="app"></canvas>
                    <p id="content">点击画布可以看到爆炸效果（爆炸图加载中，请稍等）</p>
                    <img src="../resource/image/Fire.png" width="400">
                </body>

                <script>
                    var Fire = Easycanvas.ImgLoader('../resource/image/Fire.png', function () {
                        document.getElementById('content').innerText = '点击画布可以看到爆炸效果';
                    });

                    var $app = new Easycanvas.Painter();
                    $app.register(document.getElementById('app'), {
                        events: {
                            click: function (e) {
                                var fireConfig = createFire(e.canvasX, e.canvasY);
                                $app.add(fireConfig);
                            }
                        }
                    });

                    var createFire = function (initX, initY) {
                        return Easycanvas.Sequence({
                            src: Fire,
                            frameWidth: -9,
                            frameHeight: -1,
                            interval: 50,
                            loop: false,
                            style: {
                                left: initX, top: initY,
                                width: 120, height: 120,
                            },
                        });
                    };

                    $app.start();
                </script>
            </code>
        </section>
`;
