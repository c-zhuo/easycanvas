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

        <h2>API</h2>

        <p>下面的value等大部分属性可以直接访问或修改。</p>

        <table>
            <thead>
                <tr>
                    <th align="left">API</th>
                    <th align="left">描述</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td align="left">value <<String>></td>
                    <td align="left">文本内容，与Sprite的contenta.text完全相同</td>
                </tr>
                <tr>
                    <td align="left">onsubmit <<Function>></td>
                    <td align="left">按下回车键时的回调</td>
                </tr>
                <tr>
                    <td align="left">onkeydown/onkeyup <<Function>></td>
                    <td align="left">键盘按下和弹起时的回调</td>
                </tr>
                <tr>
                    <td align="left">onfocus/onblur <<Function>></td>
                    <td align="left">获得和失去焦点时的回调</td>
                </tr>
                <tr>
                    <td align="left">focus()/blur()</td>
                    <td align="left">让输入框获得和失去焦点</td>
                </tr>
                <tr>
                    <td align="left">selectText()</td>
                    <td align="left">选中输入框中的文本</td>
                </tr>
            </tbody>
            <thead>
                <tr>
                    <th align="left">style下的属性扩展</th>
                    <th align="left">描述</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td align="left">borderRadius <<Number>></td>
                    <td align="left">边框圆角</td>
                </tr>
                <tr>
                    <td align="left">boxShadow <<String>></td>
                    <td align="left">外阴影，如'1px 1px 0px #fff'</td>
                </tr>
                <tr>
                    <td align="left">innerShadow <<String>></td>
                    <td align="left">内阴影，如'0px 0px 5px rgba(0, 0, 0, 0.5)'</td>
                </tr>
                <tr>
                    <td align="left">placeHolder <<String>></td>
                    <td align="left">value为空字符串时的占位提示文本，默认为空字符串</td>
                </tr>
                <tr>
                    <td align="left">fontWeight <<'normal' | 'bold'>></td>
                    <td align="left">是否为粗体，默认'normal'</td>
                </tr>
                <tr>
                    <td align="left">更多属性</td>
                    <td align="left">请参考<a href="https://github.com/goldfire/CanvasInput" target="_blank">CanvasInput的github</a>（其中fontColor也可以写为color）</td>
                </tr>
            </tbody>
        </table>

    </article>
`;
