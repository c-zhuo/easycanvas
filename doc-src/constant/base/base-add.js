export default `
    <article id="创建并添加一个对象">
        <h1>创建并添加一个对象</h1>

        <h2>创建实例</h2>

        <p>如下例，只需要30行代码，可以在canvas上绘制一个运动的图片。点击蓝色的小按钮可以立即查看效果。</p>

        <section>
            <div class="code-2-demo bg-demo"></div>
            <code>
                <body>
                    <canvas id="app"></canvas>
                    <p>点击字母G可以改变尺寸</p>
                </body>

                <script>
                    var data = {
                        imgSize: 50
                    };

                    var changeSize = function () {
                        data.imgSize += 20;
                    };

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
                            width: function () {
                                // 这里是类似“数据绑定”的写法，类似Vue应用中的computed
                                return data.imgSize;
                            },
                            height: function () {
                                return data.imgSize;
                            },
                        },
                        events: {
                            click: changeSize
                        }
                    });

                    $app.add($letterG);
                    $app.start();
                </script>
            </code>
        </section>

        <p>Easycanvas应用的每一个实例是一个Painter类对象，包含了许多个Sprite类对象，每一个Sprite可能是一幅图片、一段文本，也可以是一个容器。后面将对Painter类和Sprite类的各个参数进行介绍和演示。</p>
    </article>

`;
