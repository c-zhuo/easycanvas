module.exports = `
    <section class="demo-box">
        <div class="code-2-demo bg-demo">精灵动画：爆炸效果</div>
        <code>
            <body>
                <canvas id="app"></canvas>
                <p id="content">点击画布可以看到爆炸效果（爆炸图加载中，请稍等）</p>
            </body>

            <script>
                var Fire = Easycanvas.imgLoader('https://raw.githubusercontent.com/chenzhuo1992/Easycanvas/master/demos/Fire.png', function () {
                    document.getElementById('content').innerText = '点击画布可以看到爆炸效果';
                });

                var $app = new Easycanvas.painter({
                    el: '#app',
                    width: 400,
                    height: 400,
                    events: {
                        click: function (e) {
                            this.add(createFire(e.canvasX, e.canvasY));
                        }
                    },
                });

                var createFire = function (initX, initY) {
                    return {
                        content: {
                            img: Fire,
                            sequence: {
                                w: -9,
                                h: -1,
                                interval: 40,
                                loop: false,
                            },
                        },

                        style: {
                            tx: initX, ty: initY,
                        },
                    };
                };

                $app.start();
            </script>
        </code>
    </section>
`;
