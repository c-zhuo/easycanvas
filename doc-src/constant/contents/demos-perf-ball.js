module.exports = `
    <section class="demo-box">
        <div class="code-2-demo bg-demo">2D性能测试：500个跟随鼠标的足球</div>
        <code>
            <body>
                <canvas id="app"></canvas>
            </body>

            <script>
                Easycanvas.imgLoader.cacheCanvas = true;

                var $app = new Easycanvas.painter({
                    el: '#app',
                    width: 400,
                    height: 400,
                });

                var ball = 'https://raw.githubusercontent.com/chenzhuo1992/tanyitan/master/docs/ball.png';

                $app.events.mousemove = function (e) {
                    $root.style.tx = e.canvasX;
                    $root.style.ty = e.canvasY;
                };

                var $root = $app.add({
                    content: {
                        img: ball,
                    },
                    style: {
                        tx: 200, ty: 200,
                        tw: 20, th: 20,
                    },
                });

                for (var i = 0; i < 500; i++) {
                    (function (j) {
                        $app.add({
                            content: {
                                img: ball,
                            },
                            style: {
                                tx: 200, ty: 200,
                                tw: 20, th: 20,
                                zIndex: j + 1,
                                rotate: j,
                            },
                            hooks: {
                                ticked: function () {
                                    this.style.tx = (this.style.tx + $app.children[j].style.tx) / 2;
                                    this.style.ty = (this.style.ty + $app.children[j].style.ty) / 2;
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
