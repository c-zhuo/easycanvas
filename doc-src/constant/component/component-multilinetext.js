export default `
    <article id="多行文本MultiLineText">
        <h1>多行文本MultiLineText</h1>

        <p>MultiLineText组件将要绘制的文本根据实际渲染的宽度进行折行，之后缓存为图片进行绘制。</p>

        <h2>示例</h2>

        <p>以下是一个使用JSX写法的例子：</p>

        <section>
            <div class="code-2-demo code-2-demo-jsx bg-demo"></div>
            <code>
                import { Painter, MultiLineText } from 'easycanvas';

                const $app = new Painter({
                    el: "#app",
                    width: 400,
                    height: 400
                }).start();

                $app.add(
                    <MultiLineText
                        text='这里是一段多行文本abcdefg1234567！？：.,?'
                        style={{
                            locate: 'lt',
                            left: 100, top: 200,
                            width: 240,
                            fontSize: 24,
                        }}
                        events={{
                            click () {
                                alert('click 1');
                            }
                        }}
                    />
                );

                $app.add(
                    <MultiLineText
                        text='text 24, lineHeight 72, text 24, lineHeight 72'
                        style={{
                            locate: 'lt',
                            left: 100, top: 300,
                            width: 240,
                            fontSize: 24,
                            lineHeight: 72,
                            backgroundColor: '#FFF',
                        }}
                        events={{
                            click () {
                                alert('click 2');
                            }
                        }}
                    />
                );
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
                    <td align="left">文本内容，与Sprite的contenta.text完全相同</td>
                </tr>
            </tbody>
            <thead>
                <tr>
                    <th align="left">style下的扩展属性</th>
                    <th align="left">描述</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td align="left">lineHeight <<Number>></td>
                    <td align="left">行高，默认与fontSize相同</td>
                </tr>
            </tbody>
        </table>

    </article>
`;
