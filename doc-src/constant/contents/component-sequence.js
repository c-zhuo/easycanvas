module.exports = `
    <article id="精灵动画sequence">
        <h1>精灵动画组件sequence</h1>

        <p>“精灵动画”也称为“序列动画”、“逐帧动画”、“动作序列”等，是指把一个元素在各个帧的状态的画面归到一组依次绘制，形成动画。例如下面是一个爆炸的动作序列图：</p>

        <img class="article-img" width="100%" src="https://raw.githubusercontent.com/c-zhuo/easycanvas/master/demos/Fire.png"></img>

        <h2>引入方式</h2>

        <code>
            <!-- js文件方式引入 -->
            <!-- 注意放在easycanvas.js后；prod为线上压缩版、dev为开发版；开发版带有调试、警告信息 -->

            <script src="http://your-path/easycanvas.standalone.prod.js"></script>
            <script src="http://your-path/components.standalone.prod.js"></script>

            <!-- node环境引入 -->

            import Easycanvas from easycanvas;
            import EasycanvasComponentScroll from easycanvas/build/components.js;

            // node环境中引入，可以指定组件名称，作为“命名空间”，防止多个组件重复
            Easycanvas.component(EasycanvasComponentScroll.scroll, 'scroll');
        </code>

        <h2>基本配置</h2>

        <p>以上图为例：</p>

        <section>
            <div class="code-2-demo bg-demo"></div>
            <code>
                <head>
                    <script src="./lib/easycanvas/components.standalone.prod.js"></script>
                </head>
                <body>
                    <canvas id="app"></canvas>
                    <p id="content">点击画布可以看到爆炸效果（爆炸图加载中，请稍等）</p>
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
                                left: initX,
                                top: initY,
                                width: 120,
                                height: 120,
                            },
                        });
                    };

                    $app.start();
                </script>
            </code>
        </section>

        <p><strong>frameWidth和frameHeight代表图片中每帧读取宽和高，正数代表每帧的像素尺寸，负数代表将序列图进行等分处理并将结果作为每帧尺寸</strong>。例如上例的图片宽度为2907，包含9张子画片，传入-9代表代表每帧的宽度为2907的1/9。这里h为-1代表序列是单行的（多行序列图在播放时会自动换行处理）。这样设计是考虑到了大部分精灵动画所需的设计图的尺寸都是每帧尺寸和帧数的乘积，可以省去一些计算。如果将frameWidth改成2907/9，得到的是相同的效果。</p>

        <p>props中的loop代表这个动画是否是循环播放的，默认为true。如果false，那么将在轮播到最后一张图之后，自动移除当前的sprite（会触发beforeRemove和removed钩子）。</p>

        <p class="tip">Tips：这个例子中，一开始就加载了fire.png图片，而不是等到点击的时候再去加载，这样可以保证体验更加流畅。如果以字符串的形式定义var fire = 'fire.png'，那么加载是在首次渲染到这张图片时进行的。</p>

        <h2>自定义尺寸</h2>

        <p>如果我们想自定义播放精灵动画，可以不传入frameWidth和frameHeight，而是自定义cutLeft、cutTop、cutWidth和cutHeight：</p>

        <section>
            <div class="code-2-demo bg-demo"></div>
            <code>
                <head>
                    <script src="./lib/easycanvas/components.standalone.prod.js"></script>
                </head>
                <body>
                    <canvas id="app"></canvas>
                </body>

                <script>
                    var $app = new Easycanvas.painter({
                        el: '#app',
                        width: 400,
                        height: 400
                    });

                    var img = 'https://raw.githubusercontent.com/c-zhuo/easycanvas/master/demos/human.png';
                    var width = 166, height = 103;

                    var $human = Easycanvas.class.sequence({
                        content: {
                            img: img,
                        },
                        props: {
                            interval: 40,
                            loop: true,
                        },
                        style: {
                            left: 150,
                            top: 150,
                            cutWidth: width,
                            cutHeight: height,
                            cutLeft: function () {
                                return this.props.index % 6 * width;
                            },
                            cutTop: function () {
                                return height * (this.props.index % 20 >= 10 ? 2 : 6);
                            },
                        },
                    });
                    $app.add($human);
                    $app.start();
                </script>
            </code>
        </section>

        <p>这里用到的<strong>sequence的index参数是序列索引，代表当前播放到了精灵动画的第几帧子画面</strong>。例如这个例子中的interval为40，那么index的值会每40毫秒自增1。</p>

        <p class="tip">Tips：当然，也可以通过状态钩子来实现同样的效果，将cutLeft和cutHeight的值通过绘制钩子“ticked”或者”beforeTick“动态计算出来。或者，封装自己的组件来实现更多参数可配置的精灵动画。</p>
    </article>
`;
