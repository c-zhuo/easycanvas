module.exports = `
    <article id="精灵动画">
        <h1>精灵动画</h1>

        <p>“精灵动画”也称为“序列动画”、“逐帧动画”、“动作序列”等，是指把一个元素在各个帧的状态的画面归到一组依次绘制，形成动画。例如下面是一个爆炸的动作序列图：</p>

        <img class="article-img" width="100%" src="https://raw.githubusercontent.com/chenzhuo1992/easycanvas/master/demos/Fire.png"></img>

        <h2>基本配置</h2>

        <p>以上图为例：</p>

        <section>
            <div class="code-2-demo bg-demo"></div>
            <code>
                <body>
                    <canvas id="app"></canvas>
                    <p>点击画布可以看到效果</p>
                </body>

                <script>
                    var Fire = Easycanvas.imgLoader('https://raw.githubusercontent.com/chenzhuo1992/Easycanvas/master/demos/Fire.png');

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

        <p>当content中含有sequence对象时，将以精灵动画的形式来渲染图片。<strong>sequence中的w和h代表图片中每帧读取宽和高，正数代表每帧的尺寸，负数代表将序列图进行等分处理并将结果作为每帧尺寸</strong>。例如上例的图片宽度为2907，包含9张子画片，传入-9代表代表每帧的宽度为2907的1/9。这里h为-1代表序列是单行的（多行序列图在播放时会自动换行处理）。这样设计是考虑到了大部分精灵动画所需的设计图的尺寸都是每帧尺寸和帧数的乘积，可以省去一些计算。</p>

        <p>如果将w改成2907/9，得到的是相同的效果。这个例子没有指定tw和th，因此绘制的尺寸默认为了读取图片的尺寸，在这里相当于原图中每帧的尺寸。</p>

        <p>sequence中的loop代表这个动画是否是循环播放的，如果是</p>

        <p class="tip">Tips：这个例子中，一开始就加载了fire.png图片，而不是等到点击的时候再去加载，这样可以保证体验更加流畅。如果以字符串的形式定义var fire = 'fire.png'，那么加载是在首次渲染到这张图片时进行的。</p>

        <h2>自定义尺寸</h2>

        <p>有的精灵动画用到的图片不规范（例如排布时没有等分），或者一张图片中有好几组精灵动画。例如下面这个图片包含了人物的八个方向运动的序列图，每个方向6帧：</p>

        <img class="article-img" width="100%" src="https://raw.githubusercontent.com/chenzhuo1992/easycanvas/master/demos/human.png"></img>

        <p>如果让w和h分别为-6和-8，将得到人物8个方向循环播放的动画，如下：</p>

        <section>
            <div class="code-2-demo bg-demo"></div>
            <code>
                <body>
                    <canvas id="app"></canvas>
                </body>

                <script>
                    var $app = new Easycanvas.painter({
                        el: '#app',
                        width: 400,
                        height: 400
                    });

                    var $human = new Easycanvas.class.sprite({
                        content: {
                            img: 'https://raw.githubusercontent.com/chenzhuo1992/easycanvas/master/demos/human.png',
                            sequence: {
                                w: -6,
                                h: -8,
                                interval: 40,
                                loop: true,
                            },
                        },
                        style: {
                            tx: 150, ty: 150,
                        },
                    });
                    $app.add($human);
                    $app.start();
                </script>
            </code>
        </section>

        <p>如果我们想控制移动的方向，即“指定精灵动画播放第几行序列图“，可以不传入w和h，而是自定义sx、sy、sw、sh：</p>

        <section>
            <div class="code-2-demo bg-demo"></div>
            <code>
                <body>
                    <canvas id="app"></canvas>
                </body>

                <script>
                    var $app = new Easycanvas.painter({
                        el: '#app',
                        width: 400,
                        height: 400
                    });

                    var img = 'https://raw.githubusercontent.com/chenzhuo1992/easycanvas/master/demos/human.png';
                    var width = 166, height = 103;

                    var $human = new Easycanvas.class.sprite({
                        content: {
                            img: img,
                            sequence: {
                                interval: 40,
                                loop: true,
                            },
                        },
                        style: {
                            tx: 150, ty: 150,
                            sw: width, sh: height,
                            sx: function () {
                                return this.content.sequence.index % 6 * width;
                            },
                            sy: function () {
                                return height * (this.content.sequence.index % 20 >= 10 ? 2 : 6);
                            },
                        },
                    });
                    $app.add($human);
                    $app.start();
                </script>
            </code>
        </section>

        <p>这里用到的<strong>sequence的index参数是序列索引，代表当前播放到了精灵动画的第几帧子画面</strong>。例如这个例子中的interval为40，那么index的值会每40毫秒自增1。</p>

        <p class="tip">Tips：当然，也可以通过状态钩子来实现同样的效果，将sx和sy的值通过绘制钩子“ticked”或者”beforeTick“动态计算出来。或者，封装自己的easycanvas插件来实现更多参数可配置的精灵动画。</p>
    </article>

`;
