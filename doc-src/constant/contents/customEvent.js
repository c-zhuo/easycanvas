module.exports = `
    <article id="自定义事件">
        <h1>自定义事件</h1>

        <p>自定义事件一般用于处理多个sprite之间的互相影响。</p>
        
        <p>可以通过on和off来为每个sprite对象绑定和解除自定义事件，然后通过trigger和broadcast触发。其中<strong>broadcast触发的事件广播不仅会在自身触发，还会传递给它的所有children；trigger只会在自身触发，不会向下传递</strong>。例如下例：</p>

        <section>
            <div class="code-2-demo bg-demo"></div>
            <code>
                <body>
                    <canvas id="app"></canvas>
                    <br>
                    <button id="button1">trigger on parent</button>
                    <button id="button2">broadcast on parent</button>
                </body>

                <script>
                    var G = 'https://raw.githubusercontent.com/chenzhuo1992/easycanvas/master/demos/G.png';

                    var $app = new Easycanvas.painter({
                        el: '#app',
                        width: 400,
                        height: 400
                    });

                    var $parent = new Easycanvas.sprite({
                        content: {
                            img: G,
                        },
                        style: {
                            tw: 100, th: 100, tx: 100, ty: 100, rotate: 0,
                        },
                    });

                    var $child1 = $parent.add({
                        content: {
                            img: G,
                        },
                        style: {
                            tw: 50, th: 50, tx: 50, ty: 100, rotate: 0,
                        },
                    });
                    var $child2 = $parent.add({
                        content: {
                            img: G,
                        },
                        style: {
                            tw: 50, th: 50, tx: 125, ty: 100, rotate: 0,
                        },
                    });

                    var add90Deg = function () {
                        var currentRotate = this.self().rotate;
                        this.style.rotate = Easycanvas.transition.linear(currentRotate, currentRotate + 90, 500);
                    };

                    $parent.on('add90Deg', add90Deg);
                    $child1.on('add90Deg', add90Deg);
                    $child2.on('add90Deg', add90Deg, 2000);

                    document.getElementById('button1').addEventListener('click', function () {
                        $parent.trigger('add90Deg');
                    });
                    document.getElementById('button2').addEventListener('click', function () {
                        $parent.broadcast('add90Deg');
                    });

                    $app.add($parent);
                    $app.start();
                </script>
            </code>
        </section>

        <p>这上面例子中，如果频繁点击第二个按钮（在parent广播事件），可以看到child1会连续旋转，而child2不会。即使我们给parent也加上3秒的throttle，频繁触发broadcast的时候，child1仍然可以连续旋转。这是因为<strong>各个sprite对同一个事件的throttle是独立的</strong>。</p>

        <p>自定义事件可以传递一些参数，例如下例：</p>

        <section>
            <div class="code-2-demo bg-demo"></div>
            <code>
                <body>
                    <canvas id="app"></canvas>
                    <br>
                    <button id="button1">trigger 90deg on parent</button>
                    <button id="button2">broadcast 45deg on parent</button>
                </body>

                <script>
                    var G = 'https://raw.githubusercontent.com/chenzhuo1992/easycanvas/master/demos/G.png';

                    var $app = new Easycanvas.painter({
                        el: '#app',
                        width: 400,
                        height: 400
                    });

                    var $parent = new Easycanvas.sprite({
                        content: {
                            img: G,
                        },
                        style: {
                            tw: 100, th: 100, tx: 100, ty: 100, rotate: 0,
                        },
                    });

                    var $child1 = $parent.add({
                        content: {
                            img: G,
                        },
                        style: {
                            tw: 50, th: 50, tx: 50, ty: 100, rotate: 0,
                        },
                    });
                    var $child2 = $parent.add({
                        content: {
                            img: G,
                        },
                        style: {
                            tw: 50, th: 50, tx: 125, ty: 100, rotate: 0,
                        },
                    });

                    var addDeg = function (deg) {
                        var currentRotate = this.self().rotate;
                        this.style.rotate = Easycanvas.transition.linear(currentRotate, currentRotate + deg, 500);
                    };

                    $parent.on('addDeg', addDeg);
                    $child1.on('addDeg', addDeg);
                    $child2.on('addDeg', addDeg, 2000);

                    document.getElementById('button1').addEventListener('click', function () {
                        $parent.trigger('addDeg', 90);
                    });
                    document.getElementById('button2').addEventListener('click', function () {
                        $parent.broadcast('addDeg', 45);
                    });

                    $app.add($parent);
                    $app.start();
                </script>
            </code>
        </section>
    </article>
`;
