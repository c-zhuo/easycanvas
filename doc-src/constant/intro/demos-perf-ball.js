export default `
        <section class="demo-box">
            <div class="code-2-demo bg-demo">2D性能测试：500个跟随鼠标的足球</div>
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

                    $app.events.mousemove = function (e) {
                        $root.style.left = e.canvasX;
                        $root.style.top = e.canvasY;
                    };

                    var $root = $app.add({
                        content: {
                            img: ball,
                        },
                        style: {
                            left: 200, top: 200,
                            width: 20, height: 20,
                        },
                    });

                    for (var i = 1; i < 500; i++) {
                        (function (j) {
                            $app.add({
                                content: {
                                    img: ball,
                                },
                                style: {
                                    left: 200, top: 200,
                                    width: 20, height: 20,
                                    zIndex: j + 1,
                                    rotate: Easycanvas.Transition.linear(0, 360, 800).loop(),
                                },
                                hooks: {
                                    ticked: function () {
                                        let leftGap = $root.getStyle('left') - this.getStyle('left');
                                        let TopGap = $root.getStyle('top') - this.getStyle('top');
                                        this.style.left += leftGap / j;
                                        this.style.top += TopGap / j;
                                    },
                                }
                            });
                        })(i);
                    }

                    $app.start();
                </script>
            </code>
        </section>
`;
