module.exports = `
    <article id="文本">
        <h1>文本渲染</h1>

        <p>这里将介绍单行的展示。</p>

        <p class="tip">Tips：多行文本不被HTML5的canvas原生支持，目前行内的一些解决办法是渲染前预估长度并将文字拆成多行，或者渲染时动态计算是否应该换行。这些方法要么对性能有损伤、要么难以兼容各种字符和字体。因此Easycanvas本身没有计划支持多行文本，但是可以通过Easycanvas的插件来模拟，后续将会介绍。</p>
        
        <h2>单行文本</h2>

        <p>为content中的text字段赋值，可以让这个sprite渲染单行文本。下面这个例子包含了颜色、字体等相关参数：</p>

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

                    var $text = new Easycanvas.sprite({
                        content: {
                            text: '单行text',
                        },
                        style: {
                            tx: 150, ty: 150,
                            tw: 200, th: 200,
                            color: 'red',
                            backgroundColor: 'orange',
                        },
                    });

                    var i = 0;
                    var getFromArray = function (arr) {
                        return arr[i % arr.length];
                    };

                    setInterval(function () {
                        $text.style.textAlign = getFromArray(['left', 'center', 'right']);
                        $text.style.textVerticalAlign = getFromArray(['top', 'middle', 'bottom']);
                        $text.style.textFont = getFromArray(['14px Arial', '28px serif']);
                        $text.style.color = getFromArray(['red', '#00FFFF', 'rgba(255, 255, 0, 0.8)']);
                        i++;
                    }, 1000);

                    $app.add($text);
                    $app.start();
                </script>
            </code>
        </section>

        <p><strong>上例的文字在PC下的很多浏览器内并不清晰</strong>。这是受到了HTML5的canvas本身的限制：未指定canvas的宽高时，它的大小将和包含的像素点的数量相同，可以理解为“devicePixelRatio”从2或者3变成了1。解决的办法之一，是给canvas的样式进行赋值，让渲染的尺寸两倍于自身包含的像素，例如下例：</p>

        <section>
            <div class="code-2-demo bg-demo"></div>
            <code>
                <body>
                    <canvas id="app"></canvas>
                    <style>
                        canvas {
                            width: 400px; height: 400px;
                        }
                    </style>
                </body>

                <script>
                    var $app = new Easycanvas.painter({
                        el: '#app',
                        width: 800,
                        height: 800
                    });

                    var $text = new Easycanvas.sprite({
                        content: {
                            text: '单行text',
                        },
                        style: {
                            tx: 300, ty: 300,
                            tw: 400, th: 400,
                            color: 'red',
                        },
                    });

                    var i = 0;
                    var getFromArray = function (arr) {
                        return arr[i % arr.length];
                    };

                    setInterval(function () {
                        $text.style.textAlign = getFromArray(['left', 'center', 'right']);
                        $text.style.textVerticalAlign = getFromArray(['top', 'middle', 'bottom']);
                        $text.style.textFont = getFromArray(['28px Arial', '56px serif']);
                        $text.style.color = getFromArray(['red', '#00FFFF', 'rgba(255, 255, 0, 0.8)']);
                        i++;
                    }, 1000);

                    $app.add($text);
                    $app.start();
                </script>
            </code>
        </section>

        <p>这些属性中，text可以是一个function类型，返回要渲染的字符串，如下例。但是color、textFont、textAlign、textVerticalAlign这四个属性不能是function。</p>

        <section>
            <div class="code-2-demo bg-demo"></div>
            <code>
                <body>
                    <canvas id="app"></canvas>
                    <style>
                        canvas {
                            width: 400px; height: 400px;
                        }
                    </style>
                </body>

                <script>
                    var MAX_COLOR_IN_36 = parseInt('ffffff', 16);
                    var leftPads = function (str, length) {
                        return str.length === length ? str : '0' + leftPads(str, length - 1);
                    };
                    var duration = 10000;

                    var $app = new Easycanvas.painter({
                        el: '#app',
                        width: 800,
                        height: 800
                    });

                    var $text = new Easycanvas.sprite({
                        content: {
                            text: function () {
                                return Date.now();
                            },
                        },
                        style: {
                            tx: 300, ty: 300,
                            tw: 400, th: 400,
                            textFont: '56px serif',
                            color: function () {
                                var colorInt10 = Math.floor(Date.now() % duration / duration * MAX_COLOR_IN_36);
                                return '#' + leftPads(colorInt10.toString(16), 6);
                            },
                        },
                    });

                    $app.add($text);
                    $app.start();
                </script>
            </code>
        </section>
    </article>
`;
