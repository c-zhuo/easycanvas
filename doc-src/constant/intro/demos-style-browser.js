export default `
        <section class="demo-box">
            <div class="code-2-demo bg-demo">浏览器引入原生JS写法</div>
            <code>
                <body>
                    <canvas id="app"></canvas>
                    <p>点击字母G可以改变尺寸</p>
                </body>

                <script>
                    var $app = new Easycanvas.Painter({
                        el: '#app',
                        width: 400,
                        height: 400
                    });

                    var $letterG = new Easycanvas.Sprite({
                        content: {
                            img: 'https://raw.githubusercontent.com/c-zhuo/easycanvas/master/demos/G.png',
                        },
                        style: {
                            left: Easycanvas.Transition.pendulum(50, 150, 3000).loop(),
                            top: 100,
                            width: 50,
                            height: 50,
                        },
                        events: {
                            click: function (e) {
                                this.style.width = 100;
                            },
                        },
                    });

                    $app.add($letterG);
                    $app.start();
                </script>
            </code>
        </section>
`;
