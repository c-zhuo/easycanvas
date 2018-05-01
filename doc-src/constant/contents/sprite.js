module.exports = `
    <article id="样式获取与更新">
        <h1>样式获取与更新</h1>

        <p>之前已经提到，可以通过sprite.style来获取某一个sprite的样式。但是如果某个样式是一个function，那么就需要用到sprite的一些API来获取当前值。</p>
        
        <h2>样式获取</h2>

        <p>sprite的rect和self这两个API可以获取当前的样式。例如：</p>

        <section>
            <div class="code-2-demo bg-demo"></div>
            <code>
                <body>
                    <canvas id="app"></canvas>
                    <p>点击字母G可以改变运动轨迹</p>
                </body>

                <script>
                    var mouseX = mouseY = 0;
                    var $app = new Easycanvas.painter({
                        el: '#app',
                        width: 400,
                        height: 400,
                        events: {
                            mousemove: function ($event) {
                                mouseX = $event.canvasX;
                                mouseY = $event.canvasY;
                            }
                        }
                    });

                    var $letterG = new Easycanvas.class.sprite({
                        content: {
                            img: 'https://github.com/chenzhuo1992/easycanvas/blob/master/demos/G.png?raw=true',
                        },
                        style: {
                            tw: function () {
                                return mouseX / 2 + 30;
                            },
                            th: function () {
                                return mouseY / 2 + 30;
                            },
                            tx: Easycanvas.transition.pendulum(50, 150, 3000).loop(),
                            ty: Easycanvas.transition.pendulum(50, 150, 4000).loop(),
                        },
                        events: {
                            click: function (e) {
                                this.style.tx = Easycanvas.transition.pendulum(
                                    this.self().tx, Math.random() * 350, 3000
                                ).loop();
                                this.style.ty = Easycanvas.transition.pendulum(
                                    this.self().ty, Math.random() * 350, 4000
                                ).loop();
                            },
                        },
                    });

                    $app.add($letterG);
                    $app.start();
                </script>
            </code>
        </section>

        <p>在这个例子中，我们从当前的坐标位置开始进行新的钟摆。如果像之前的demo一样，用this.style.tx来获取，那么取到的只是一个function（Easycanvas.transition会返回一个function），无法拿来计算。</p>

        <p class="tip">Tips：在这个例子中，this.style.tx()这种写法也可以取到当前的实际值。</p>

        <p>这个例子是有一个层级，因此rect和self的效果相同。<strong>rect获取的是实际渲染（受到父级sprite继承影响的）的样式，而self获取的是当前自身的样式</strong>。例如：</p>

        <section>
            <div class="code-2-demo bg-demo"></div>
            <code>
                <body>
                    <canvas id="app"></canvas>
                    <p id="rect"></p>
                    <p id="self"></p>
                </body>

                <script>
                    var mouseX = mouseY = 0;
                    var $app = new Easycanvas.painter({
                        el: '#app',
                        width: 400,
                        height: 400,
                    });

                    var $parent = new Easycanvas.class.sprite({
                        content: {
                            img: 'https://github.com/chenzhuo1992/easycanvas/blob/master/demos/G.png?raw=true',
                        },
                        style: {
                            tw: 100,
                            th: 100,
                            tx: 100,
                            ty: 100,
                        },
                    });

                    var $child = new Easycanvas.class.sprite({
                        content: {
                            img: 'https://github.com/chenzhuo1992/easycanvas/blob/master/demos/G.png?raw=true',
                        },
                        style: {
                            tw: 100,
                            th: 100,
                            tx: 100,
                            ty: 100,
                        },
                        events: {
                            click: function () {
                                document.getElementById('rect').innerHTML = 'rect: ' + JSON.stringify(this.rect());
                                document.getElementById('self').innerHTML = 'self: ' + JSON.stringify(this.self());
                            }
                        }
                    });

                    $app.add($parent);
                    $parent.add($child);
                    $app.start();
                </script>
            </code>
        </section>

        <p>需要注意的是，<strong>rect()获取的样式，tx和ty对应的一定是sprite的左上角的顶点</strong>（这一点和HTML5的getBoundingClientRect是相同的）。而self获取的样式，tx和ty是与定位方式locate相关的。有关locate的介绍，请参阅“图片渲染与处理”。</p>

        <h2>样式更新</h2>

        <p>除了像上面的例子，给this.style直接赋值外，也可以通过update进行赋值。例如：</p>

        <section>
            <div class="code-2-demo bg-demo"></div>
            <code>
                <body>
                    <canvas id="app"></canvas>
                    <p id="rect"></p>
                    <p id="self"></p>
                </body>

                <script>
                    var mouseX = mouseY = 0;
                    var $app = new Easycanvas.painter({
                        el: '#app',
                        width: 400,
                        height: 400,
                    });

                    var $letterG = new Easycanvas.class.sprite({
                        content: {
                            img: 'https://github.com/chenzhuo1992/easycanvas/blob/master/demos/G.png?raw=true',
                        },
                        style: {
                            tw: function () {
                                return mouseX / 2 + 30;
                            },
                            th: function () {
                                return mouseY / 2 + 30;
                            },
                        },
                    });

                    $letterG.update({
                        style: {
                            tx: Easycanvas.transition.pendulum(50, 150, 3000).loop(),
                            ty: Easycanvas.transition.pendulum(50, 150, 4000).loop(),
                        }
                    });

                    $app.add($letterG);
                    $app.start();
                </script>
            </code>
        </section>

        <p>update除了批量修改style外，也可以用于修改eIndex、conent等属性。</p>
    </article>
`;
