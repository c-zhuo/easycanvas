export default `
    <article id="单行文本Text">
        <h1>单行文本Text</h1>

        <p>Text组件是对View组件的简单包装，功能上的区别只是把Sprite的content.text属性提到了最外层，但是语义性更好。</p>

        <h2>示例</h2>

        <p>以下是一个没有用到JSX写法的例子：</p>

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

                    var $text = new Easycanvas.Text({
                        text: 'Foo',
                        style: {
                            left: 150, top: 150,
                            width: 200, height: 200,
                            color: 'red',
                            backgroundColor: 'orange',
                        },
                    });

                    var i = 0;
                    var getFromArray = function (arr) {
                        return arr[i % arr.length];
                    };

                    setInterval(function () {
                        $text.text = getFromArray(['Foo', 'Bar', 'Baz']);
                        $text.style.textAlign = getFromArray(['left', 'center', 'right']);
                        $text.style.textVerticalAlign = getFromArray(['top', 'middle', 'bottom']);
                        $text.style.fontSize = getFromArray(['14px', '28px']);
                        $text.style.color = getFromArray(['red', '#00FFFF', 'rgba(255, 255, 0, 0.8)']);
                        i++;
                    }, 1000);

                    $app.add($text);
                    $app.start();
                </script>
            </code>
        </section>

        <h2>API</h2>

        <table>
            <thead>
                <tr>
                    <th align="left">API</th>
                    <th align="left">描述</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td align="left">text <<Function|String|Number>></td>
                    <td align="left">文本内容，与Sprite的content.text完全相同</td>
                </tr>
            </tbody>
        </table>

    </article>
`;
