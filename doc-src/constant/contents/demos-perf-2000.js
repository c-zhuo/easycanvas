module.exports = `
        <section class="demo-box">
            <div class="code-2-demo bg-demo">2D性能测试：2000个随机运动足球（密集恐惧症慎入）</div>
            <code>
                <body>
                    <canvas id="app"></canvas>
                </body>

                <script>
                    Easycanvas.ImgLoader.cacheCanvas = true;

                    var $app = new Easycanvas.Painter({
                        el: '#app',
                        width: 400,
                        height: 400,
                    });

                    var ball = 'https://raw.githubusercontent.com/c-zhuo/tanyitan/master/docs/ball.png';

                    for (var i = 0; i < 2000; i++) {
                        (function (j) {
                            $app.add({
                                content: {
                                    img: ball,
                                },
                                style: {
                                    left: Easycanvas.Transition.pendulum(0, 400, Math.random() * 5000 + 5000).loop(),
                                    top: Easycanvas.Transition.pendulum(400, 0, Math.random() * 5000 + 5000).loop(),
                                    width: 20, height: 20,
                                    zIndex: j,
                                },
                            });
                        })(i);
                    }

                    $app.start();
                </script>
            </code>
        </section>
`;
