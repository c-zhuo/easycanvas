module.exports = `
        <section class="demo-box">
            <div class="code-2-demo bg-demo">精灵动画：爆炸效果</div>
            <code>
                <head>
                    <script src="./lib/easycanvas/components.standalone.prod.js"></script>
                </head>
                <body>
                    <canvas id="app"></canvas>
                    <p id="content">点击画布可以看到爆炸效果（爆炸图加载中，请稍等）</p>
                    <img src="https://raw.githubusercontent.com/c-zhuo/easycanvas/master/demos/Fire.png" width="400">
                </body>

                <script>
                    var Fire = Easycanvas.imgLoader('https://raw.githubusercontent.com/c-zhuo/easycanvas/master/demos/Fire.png', function () {
                        document.getElementById('content').innerText = '点击画布可以看到爆炸效果';
                    });

                    var $app = new Easycanvas.painter();
                    $app.register(document.getElementById('app'), {
                        events: {
                            click: function (e) {
                                var fireConfig = createFire(e.canvasX, e.canvasY);
                                $app.add(fireConfig);
                            }
                        }
                    });

                    var Fire = Easycanvas.imgLoader('https://raw.githubusercontent.com/c-zhuo/easycanvas/master/demos/Fire.png');

                    var createFire = function (initX, initY) {
                        return Easycanvas.class.sequence({
                            content: {
                                img: Fire,
                            },
                            props: {
                                frameWidth: -9,
                                frameHeight: -1,
                                interval: 50,
                                loop: false,
                            },
                            style: {
                                tx: initX, ty: initY,
                                tw: 120, th: 120,
                            },
                        });
                    };

                    $app.start();
                </script>
            </code>
        </section>
`;
