export default `
    <article id="样式获取与更新">
        <h1>样式获取与更新</h1>

        <p>之前已经提到，可以通过Sprite.style来获取某一个Sprite的样式。但是如果某个样式是一个function，那么就需要用到Sprite的一些API来获取当前值。</p>
        
        <h2>样式获取</h2>

        <p>Sprite的getRect、getSelfStyle、getStyle这三个API可以获取当前的样式。例如：</p>

        <section>
            <div class="code-2-demo bg-demo"></div>
            <code>
                <body>
                    <canvas id="app"></canvas>
                    <p>点击字母G可以改变运动轨迹</p>
                </body>

                <script>
                    var mouseX = mouseY = 0;
                    var $app = new Easycanvas.Painter({
                        el: '#app',
                        width: 400,
                        height: 400,
                        events: {
                            mousemove: function (event) {
                                mouseX = event.canvasX;
                                mouseY = event.canvasY;
                            }
                        }
                    });

                    var $letterG = new Easycanvas.Sprite({
                        content: {
                            img: 'https://raw.githubusercontent.com/c-zhuo/easycanvas/master/demos/G.png',
                        },
                        style: {
                            width: function () {
                                return mouseX / 2 + 30;
                            },
                            height: function () {
                                return mouseY / 2 + 30;
                            },
                            left: Easycanvas.Transition.pendulum(50, 150, 3000).loop(),
                            top: Easycanvas.Transition.pendulum(50, 150, 4000).loop(),
                        },
                        events: {
                            click: function (e) {
                                this.style.left = Easycanvas.Transition.pendulum(
                                    this.getStyle('left'), Math.random() * 350, 3000
                                ).loop();
                                this.style.top = Easycanvas.Transition.pendulum(
                                    this.getStyle('top'), Math.random() * 350, 4000
                                ).loop();
                            },
                        },
                    });

                    $app.add($letterG);
                    $app.start();
                </script>
            </code>
        </section>

        <p>在这个例子中，我们从当前的坐标位置开始进行新的钟摆。如果像之前的demo一样，用this.style.left来获取，那么取到的只是一个function（Easycanvas.Transition会返回一个function），而不是当前值。</p>

        <p class="tip">Tips：在这个例子中，由于为left赋值了一个transition函数，所以this.style.left()这种写法也可以近似取到当前值，但是不建议这样做。这里之所以说“近似”，是因为this.style.left()将以当前时间进行计算，而getStyle会用渲染的时间点计算，可能会存在几毫秒的误差。</p>

        <p><strong>getRect()获取的是实际渲染的位置，返回的left、top为渲染时左上角的坐标（这一点和HTML5的getBoundingClientRect()获取到的left、top的含义相同），getStyle('opacity')获取的是实际渲染的样式（例如最终的透明度等），而getSelfStyle('left')获取的是当前自身的样式（用来获取一些函数形式的动态属性的当前值，例如一个渐变的当前值）</strong>。其中getSelfStyle()可以不传参数，将返回一个包含当前对象自身所有样式的对象。getSelfStyle().left与getSelfStyle('left')相同（但是更耗性能）。当locate为lt时，getRect().left与getStyle('left')相同。有关locate的介绍，请参阅“图片渲染与处理”。</p>

        <p>上面的例子只有一个层级，因此getStyle和getSelfStyle的效果相同。下面这个例子存在两个层级，所以这两个API的结果不同：</p>

        <section>
            <div class="code-2-demo bg-demo"></div>
            <code>
                <body>
                    <canvas id="app"></canvas>
                    <p id="getSelfStyle">点击第二个字母G</p>
                    <p id="getSelfStyleTx"></p>
                    <p id="getStyle"></p>
                    <p id="getRect"></p>
                </body>

                <script>
                    var mouseX = mouseY = 0;
                    var $app = new Easycanvas.Painter({
                        el: '#app',
                        width: 400,
                        height: 400,
                    });

                    var $parent = new Easycanvas.Sprite({
                        content: {
                            img: 'https://raw.githubusercontent.com/c-zhuo/easycanvas/master/demos/G.png',
                        },
                        style: {
                            width: 100,
                            height: 100,
                            left: 100,
                            top: 100,
                        },
                    });

                    var $child = new Easycanvas.Sprite({
                        content: {
                            img: 'https://raw.githubusercontent.com/c-zhuo/easycanvas/master/demos/G.png',
                        },
                        style: {
                            width: function () {return 100;},
                            height: 100,
                            left: 100,
                            top: 100,
                        },
                        events: {
                            click: function () {
                                document.getElementById('getSelfStyle').innerHTML = 'getSelfStyle(): ' + JSON.stringify(this.getSelfStyle());
                                document.getElementById('getSelfStyleTx').innerHTML = 'getSelfStyle().left: ' + JSON.stringify(this.getSelfStyle('left'));
                                document.getElementById('getStyle').innerHTML = 'getStyle("left"): ' + this.getStyle('left');
                                document.getElementById('getRect').innerHTML = 'getRect(): ' + JSON.stringify(this.getRect());
                            }
                        }
                    });

                    $app.add($parent);
                    $parent.add($child);
                    $app.start();
                </script>
            </code>
        </section>

        <p>这个例子中child本身的left和top都是100，所以getSelfStyle返回的都是整数100。用getStyle获取时，会计算它的实际渲染结果（从父节点继承的位置），因此结果为200。而getRect获取的是绘制位置，因为图片的宽高都是100，以(200,200)为中心的话，需要从(150,150)开始绘制宽高都是100的面积。</p>

        <p>为了便于使用，getRect也会返回实际渲染位置距离canvas节点的右侧和底部的坐标值right和bottom。</p>

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
                    var $app = new Easycanvas.Painter({
                        el: '#app',
                        width: 400,
                        height: 400,
                    });

                    var $letterG = new Easycanvas.Sprite({
                        content: {
                            img: 'https://raw.githubusercontent.com/c-zhuo/easycanvas/master/demos/G.png',
                        },
                        style: {
                            width: function () {
                                return mouseX / 2 + 30;
                            },
                            height: function () {
                                return mouseY / 2 + 30;
                            },
                        },
                    });

                    $letterG.update({
                        style: {
                            left: Easycanvas.Transition.pendulum(50, 150, 3000).loop(),
                            top: Easycanvas.Transition.pendulum(50, 150, 4000).loop(),
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
