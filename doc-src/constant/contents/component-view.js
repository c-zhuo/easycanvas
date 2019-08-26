module.exports = `
    <article id="容器组件View">
        <h1>容器组件View</h1>

        <p>View组件和Sprite基类完全相同，但是语义性更好，用来声明这是一个容器。</p>

        <h2>示例</h2>

        <section>
            <div class="code-2-demo code-2-demo-jsx bg-demo"></div>
            <code>
                import { Painter, View, Text } from 'easycanvas';

                const $app = new Painter({
                    el: "#app",
                    width: 400,
                    height: 400
                }).start();

                $app.add(
                    <View>
                        <Text
                            style={{
                                left: 100,
                                top: 100,
                                width: 100,
                                height: 30,
                                fontSize: 30,
                                color: '#F00',
                                locate: 'lt',
                            }}
                        >Easycanvas</Text>
                    </View>
                )
            </code>
        </section>

        <h2>API</h2>

        <p>View组件的API与Easycanvas.Sprite基类完全相同，请参考Sprite API部分。</p>

    </article>
`;
