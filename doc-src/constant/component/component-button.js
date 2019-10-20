export default `
    <article id="按钮组件Button">
        <h1>按钮组件Button</h1>

        <p>Button组件是通过根据按钮当前的不同状态来渲染对应的图片实现的。其中，每张图片在组件创建时会根据文字和样式进行生成，并缓存在组件内。因此Button组件的一些属性不支持设置为Function类型的值来动态生成。</p>

        <h2>示例</h2>

        <p>以下是一个使用JSX写法的例子：</p>

        <section>
            <div class="code-2-demo code-2-demo-jsx bg-demo"></div>
            <code>
                import { Painter, Button } from 'easycanvas';

                const $app = new Painter({
                    el: "#app",
                    width: 400,
                    height: 400
                }).start();

                $app.add(
                    <Button
                        text='I am a button',
                        normal: {
                            fontSize: 24,
                            color: '#2eb6a8',
                            border: '4px solid #2eb6a8',
                            fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
                        },
                        pressed: {
                            color: '#FFF',
                            backgroundColor: '#2eb6a8',
                        },
                        hovered: {
                            color: '#CCC',
                            backgroundColor: '#2eb6a8',
                        },
                        style: {
                            locate: 'lt',
                            left: 200, top: 100,
                            width: 100, height: 50,
                        },
                        events: {
                            click () {
                                console.log('clicked');
                            }
                        }
                    />
                );
            </code>
        </section>

        <h2>API</h2>

        <p>以下text等属性需要使用update方法修改，或者在修改之后调用update方法，以供组件重新生成按钮图像。</p>

        <table>
            <thead>
                <tr>
                    <th align="left">API</th>
                    <th align="left">描述</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td align="left">text <<String|Number>></td>
                    <td align="left">按钮文本内容</td>
                </tr>
                <tr>
                    <td align="left">normal/pressed/hovered <<Object>></td>
                    <td align="left">常规/按下/鼠标悬停时，发生改变的样式；直接修改这些属性后，需要调用update方法才会生效</td>
                </tr>
                <tr>
                    <td align="left">update()</td>
                    <td align="left">继承自Sprite.update()方法，调用后会重新生成normal/pressed/hovered三种状态的按钮图像</td>
                </tr>
            </tbody>
        </table>

    </article>
`;
