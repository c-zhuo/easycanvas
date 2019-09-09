export default `
    <article id="输入框Input">
        <h1>输入框Input</h1>

        <p>Input组件提供了一个可以在Canvas中渲染可交互输入框的功能。</p>

        <p class="tip">其原理是，创建一个不可见的input节点，将用户在input中的操作渲染到canvas上。这里的Input组件是基于<a href="https://github.com/goldfire/CanvasInput" target="_blank">canvasinput@1.2.7</a>进行了部分修改所实现的。</p>

        <h2>示例</h2>

        <section>
            <div class="code-2-demo code-2-demo-jsx bg-demo"></div>
            <code>
                import { Painter, View, Text, Input } from 'easycanvas';

                const $app = new Painter({
                    el: "#app",
                    width: 400,
                    height: 400
                }).start();

                const value = 'Default';

                class MyInput {
                    constructor (props) {
                        return <Input
                            style={{
                                width: 200,
                                height: 30,
                                fontSize: 30,
                                color: '#F00',
                                locate: 'lt',
                            }}
                            value={props.defaultValue}
                            onkeyup={this.onkeyup}
                        />;
                    }

                    onkeyup (event) {
                        console.log(event.keycode, this.value);
                    }
                }

                const $input = <MyInput defaultValue={value} />;

                $app.add(
                    <View
                        style={{
                            left: 100,
                            top: 100,
                        }}>

                        { $input }

                        <Text
                            style={{
                                left: 100,
                                top: 100,
                                color: '#0F0',
                                fontSize: 24,
                            }}
                        >
                            { () => value }
                        </Text>
                    </View>
                );

                $input.focus();
            </code>
        </section>

        <h2>API（待补充）</h2>

        <table>
            <thead>
                <tr>
                    <th align="left">API</th>
                    <th align="left">描述</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td align="left">text <Function|String|Number></td>
                    <td align="left">文本内容，与Sprite的contenta.text完全相同</td>
                </tr>
            </tbody>
        </table>

    </article>
`;
