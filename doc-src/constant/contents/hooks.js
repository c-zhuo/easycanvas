module.exports = `
    <article id="状态钩子">
        <h1>状态钩子</h1>

        <p>状态可以用于在每一动画帧的各个阶段进行数据的编辑，Easycanvas目前有ticked、beforeTick、removed、beforeRemove四个钩子。前两者在每次渲染（即每帧）时调用，后两者在sprite的remove方法触发时调用。beforeTick也可以用于一些比较复杂的动画的每帧坐标计算：</p>

        <section>
            <div class="code-2-demo bg-demo"></div>
            <code>
                <body>
                    <canvas id="app"></canvas>
                </body>

                <script>
                    var G = 'https://github.com/chenzhuo1992/easycanvas/blob/master/demos/G.png?raw=true';

                    var $app = new Easycanvas.painter({
                        el: '#app',
                        width: 400,
                        height: 400
                    });

                    var $foo = new Easycanvas.class.sprite({
                        content: {
                            img: G,
                        },
                        style: {
                            tw: 100, th: 100, tx: 200, ty: 200, rotate: 0,
                        },
                        hooks: {
                            beforeTick: function (tickIndex) {
                                this.style.tx += Math.random() * 10 - 5;
                                this.style.ty += Math.random() * 10 - 5;

                                this.style.tx = (this.style.tx + this.$canvas.width) % this.$canvas.width;
                                this.style.ty = (this.style.ty + this.$canvas.height) % this.$canvas.height;

                                this.style.rotate = tickIndex;
                            },
                        },
                    });

                    $app.add($foo);
                    $app.start();
                </script>
            </code>
        </section>

        <p>tick状态钩子拥有一个参数，代表当前的tick数：beforeTick从0开始自增，ticked从1开始自增。</p>

        <p>可以使用sprite的on与off来进行动态的钩子注册和解绑，并且可以设置debounce，例如下面这个beforeTick的钩子每200毫秒只会触发一次：</p>

        <section>
            <div class="code-2-demo bg-demo"></div>
            <code>
                <body>
                    <canvas id="app"></canvas>
                </body>

                <script>
                    var G = 'https://github.com/chenzhuo1992/easycanvas/blob/master/demos/G.png?raw=true';

                    var $app = new Easycanvas.painter({
                        el: '#app',
                        width: 400,
                        height: 400
                    });

                    var $foo = new Easycanvas.class.sprite({
                        content: {
                            img: G,
                        },
                        style: {
                            tw: 100, th: 100, tx: 200, ty: 200, rotate: 0,
                        },
                    });

                    $foo.on('beforeTick', function () {
                        this.style.tx += Math.random() * 10 - 5;
                        this.style.ty += Math.random() * 10 - 5;

                        this.style.tx %= this.$canvas.width;
                        this.style.ty %= this.$canvas.height;

                        this.style.rotate += Math.random() * 10;
                    }, 200);

                    $app.add($foo);
                    $app.start();
                </script>
            </code>
        </section>

        <p class="tip">Tips：在一些并不需要每帧都触发的场景下，设置debounce可以节约浏览器性能，尤其是在对实时性要求不高的应用中。例如在一个“跑酷”游戏中，人物是否吃到金币就不需要每帧监测，哪怕每100毫秒监测一次也不会损害用户体验，因为晚0.1秒吃到金币并不会引发用户的不良体验；而人物运动引起的地图移动，是每帧都要进行运算的，否则会有掉帧的感觉。</p>
    </article>
`;
