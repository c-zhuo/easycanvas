export default `
    <article id="图片渲染与处理">
        <h1>图片渲染与处理</h1>

        <p>这里将介绍图片的裁剪、加载以及图片的像素预处理。</p>

        <h2>图片加载</h2>

        <p>前面的例子中，Sprite创建之后才开始加载图像。这样可能导致图像渲染出来的时候，动画已经进行了一半。一些场合下，我们希望图像加载成功后才开始渲染，那么可以使用Easycanvas提供的imgLoader，例如：</p>

        <section>
            <div class="code-2-demo bg-demo"></div>
            <code>
                <body>
                    <canvas id="app"></canvas>
                </body>

                <script>
                    var $app = new Easycanvas.Painter({
                        el: '#app',
                        width: 400,
                        height: 400
                    });

                    Easycanvas.ImgLoader(
                        'https://raw.githubusercontent.com/c-zhuo/easycanvas/master/demos/G.png',
                        function (img) {
                            var $letterG = new Easycanvas.Sprite({
                                content: {
                                    img: img,
                                },
                                style: {
                                    left: 50, top: 50, width: 50, height: 50,
                                },
                            });
                            $app.add($letterG);
                        }
                    );

                    $app.start();
                </script>
            </code>
        </section>

        <p>imgLoader将在图片加载完成后触发回调，回调的参数就是图片对象。如果是之前已经加载的图片，回调将立即触发。</p>

        <h2>图片裁剪</h2>

        <p>如果需要将图片源进行裁剪，仅渲染出一部分内容，可以通过修改Sprite的style样式中的cutLeft、cutTop、cutWidth、cutHeight来控制。其中cutLeft和cutTop是裁剪的起点，cutWidth和cutHeight是裁剪的尺寸。例如下图，将字母G的一部分进行了渲染。</p>

        <section>
            <div class="code-2-demo bg-demo"></div>
            <code>
                <body>
                    <canvas id="app"></canvas>
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
                            left: 50, top: 50, height: 150,
                            cutLeft: 0, cutTop: 0,
                            // 我们让裁剪的宽度和绘制的宽度在80和150之间循环变化，并保持相等
                            cutWidth: Easycanvas.Transition.pendulum(80, 150, 2000).loop(),
                            width: Easycanvas.Transition.pendulum(80, 150, 2000).loop(),
                            locate: 'lt',
                        },
                    });

                    $app.add($letterG);
                    $app.start();
                </script>
            </code>
        </section>

        <p>left、top、cutWidth、cutHeight的默认值为0，width、height、cutWidth、cutHeight的默认值和图片宽高相同。</p>

        <p>这里的locate是元素的定位方式。如果值为lt，代表以left和top作为左上角顶点，向右下方绘制width和height的长度。<strong>默认值为center，图片将以left和top对应的坐标为中心进行绘制</strong>，类似css的“transform: translateX(-50%) translateY(-50%)”。其它可选属性有rt（作为右上顶点）、ld（作为左下顶点）、rd（作为右下顶点）.</p>

        <p class="tip">在这个例子中，我们在content中增加了一个img属性，表示要渲染一张图片。当然，也可以没有content属性，代表这个Sprite是一个容器，这在复杂的场景中非常实用。</p>

        <h2>像素预处理</h2>

        <p>Easycanvas也提供了一个图片预处理方法ImgPretreat，用于进行像素级别的图像预处理。例如：</p>

        <section>
            <div class="code-2-demo bg-demo"></div>
            <code>
                <body>
                    <canvas id="app"></canvas>
                </body>

                <script>
                    var $app = new Easycanvas.Painter({
                        el: '#app',
                        width: 400,
                        height: 400
                    });

                    var $letterG = new Easycanvas.Sprite({
                        content: {
                            img: Easycanvas.ImgPretreat(
                                'https://raw.githubusercontent.com/c-zhuo/easycanvas/master/demos/G.png',
                                {
                                    conversion: function (pixel, x, y) {
                                        return {
                                            r: x < 80 ? 255 : pixel.r,
                                            g: pixel.g,
                                            b: pixel.b,
                                            a: pixel.a,
                                        };
                                    }
                                }
                            ),
                        },
                        style: {
                            left: 100, top: 100,
                        },
                    });

                    $app.add($letterG);
                    $app.start();
                </script>
            </code>
        </section>

        <p>传入的conversion是一个修改像素点的方法，参数为像素点的rgba值以及像素的坐标。</p>

        <p class="tip">Tips：大面积的像素处理的性能开销较大，移动端设备下不建议对大图片频繁使用ImgPretreat，尤其要避免在状态钩子的每帧钩子函数中调用ImgPretreat来编辑色值。</p>
    </article>

`;
