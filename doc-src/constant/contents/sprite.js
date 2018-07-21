module.exports = `
    <article id="样式获取与更新">
        <h1>样式获取与更新</h1>

        <p>之前已经提到，可以通过sprite.style来获取某一个sprite的样式。但是如果某个样式是一个function，那么就需要用到sprite的一些API来获取当前值。</p>
        
        <h2>样式获取</h2>

        <p>sprite的getRect、getSelfStyle、getStyle这三个API可以获取当前的样式。例如：</p>

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

                    var $letterG = new Easycanvas.sprite({
                        content: {
                            img: 'https://raw.githubusercontent.com/chenzhuo1992/easycanvas/master/demos/G.png',
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
                                    this.getStyle('tx'), Math.random() * 350, 3000
                                ).loop();
                                this.style.ty = Easycanvas.transition.pendulum(
                                    this.getStyle('ty'), Math.random() * 350, 4000
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

        <p><strong>getRect获取的是实际渲染的位置，左上角为tx、ty对应的顶点（这一点和HTML5的getBoundingClientRect是相同的），getStyle获取的是实际计算的样式（tx、ty对应哪个点是和locate相关的），而getSelfStyle获取的是当前自身的样式（用来获取一些函数形式的动态属性的当前值）</strong>。有关locate的介绍，请参阅“图片渲染与处理”。</p>

        <p>这个例子是有一个层级，因此getStyle和getSelfStyle的效果相同。下面这个例子存在两个层级，所以这两个API的结果不同：</p>

        <section>
            <div class="code-2-demo bg-demo"></div>
            <code>
                <body>
                    <canvas id="app"></canvas>
                    <p id="getSelfStyle">点击第二个字母G</p>
                    <p id="getStyle"></p>
                    <p id="getRect"></p>
                </body>

                <script>
                    var mouseX = mouseY = 0;
                    var $app = new Easycanvas.painter({
                        el: '#app',
                        width: 400,
                        height: 400,
                    });

                    var $parent = new Easycanvas.sprite({
                        content: {
                            img: 'https://raw.githubusercontent.com/chenzhuo1992/easycanvas/master/demos/G.png',
                        },
                        style: {
                            tw: 100,
                            th: 100,
                            tx: 100,
                            ty: 100,
                        },
                    });

                    var $child = new Easycanvas.sprite({
                        content: {
                            img: 'https://raw.githubusercontent.com/chenzhuo1992/easycanvas/master/demos/G.png',
                        },
                        style: {
                            tw: function () {return 100;},
                            th: 100,
                            tx: 100,
                            ty: 100,
                        },
                        events: {
                            click: function () {
                                document.getElementById('getSelfStyle').innerHTML = 'getSelfStyle: ' + JSON.stringify(this.getSelfStyle());
                                document.getElementById('getStyle').innerHTML = 'getStyle tx: ' + this.getStyle('tx');
                                document.getElementById('getRect').innerHTML = 'getRect: ' + JSON.stringify(this.getRect());
                            }
                        }
                    });

                    $app.add($parent);
                    $parent.add($child);
                    $app.start();
                </script>
            </code>
        </section>

        <p>在这个例子中，child的样式的结果都是100，所以getSelfStyle返回的都是整数100。用getStyle获取tx或者ty的值时，会计算它本身和它的所有父级的最终结果，因此时100加100，结果为200。而getRect获取的是绘制位置，因为图片的宽高都是100，以(200,200)为中心的话，需要从(150,150)开始绘制宽高都是100的面积。并且这个API会补齐sx、sy、sw、sh等参数。</p>

        <h2>样式更新</h2>

        <p>除了像上面的例子，给this.style直接赋值外，也可以通过update进行赋值。例如：</p>

        <section>
            <div class="code-2-demo bg-demo"></div>
            <code>
                <body>
                    <canvas id="app"></canvas>
                    <p id="getRect"></p>
                    <p id="getSelfStyle"></p>
                </body>

                <script>
                    var mouseX = mouseY = 0;
                    var $app = new Easycanvas.painter({
                        el: '#app',
                        width: 400,
                        height: 400,
                    });

                    var $letterG = new Easycanvas.sprite({
                        content: {
                            img: 'https://raw.githubusercontent.com/chenzhuo1992/easycanvas/master/demos/G.png',
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

        <p>update除了批量修改style外，也可以用于修改event、conent等属性。未指明的参数将保持不变。</p>
    </article>
`;
