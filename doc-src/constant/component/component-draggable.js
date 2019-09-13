export default `
    <article id="拖拽组件Draggable">
        <h1>拖拽组件Draggable</h1>

        <p>Draggable组件是对View组件的封装，会监听鼠标和触摸事件，来实现对容器的拖拽功能。</p>

        <h2>示例</h2>

        <p>下面的例子中，可以尝试拖拽第二个文本。</p>

        <section>
            <div class="code-2-demo code-2-demo-jsx bg-demo"></div>
            <code>
                import { Painter, View, Text, Draggable } from 'easycanvas';

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
                                width: 200,
                                backgroundColor: '#ddd',
                                height: 30,
                                fontSize: 30,
                                color: '#F00',
                                locate: 'lt',
                            }}
                        >No Dragging</Text>
                    </View>
                );

                $app.add(
                    <Draggable draggable={true}>
                        <Text
                            style={{
                                left: 100,
                                top: 200,
                                width: 200,
                                backgroundColor: '#ddd',
                                height: 30,
                                fontSize: 30,
                                zIndex: 2,
                                color: '#F00',
                                locate: 'lt',
                            }}
                        >Drag Me</Text>
                    </Draggable>
                );
            </code>
        </section>

        <h2>API</h2>

        <p>Draggable组件提供了如下属性：</p>

        <table>
            <thead>
                <tr>
                    <th align="left">API</th>
                    <th align="left">描述</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td align="left">draggable <<Boolean>></td>
                    <td align="left">是否允许拖拽，默认false</td>
                </tr>
                <tr>
                    <td align="left">onDragStart <<Function>></td>
                    <td align="left">开始拖拽后触发回调，如果在此阶段将draggable改为false，可以禁用拖拽</td>
                </tr>
                <tr>
                    <td align="left">onDragEnd <<Function>></td>
                    <td align="left">结束拖拽后触发回调，回调入参包含left和top，对应拖拽结束后Sprite的位置</td>
                </tr>
                <tr>
                    <td align="left">onDragStep <<Function>></td>
                    <td align="left">如果指定了此属性，拖拽时将不再移动Sprite的位置，而是连续触发此回调；回调入参包含left和top，对应此时鼠标（或触屏）事件的坐标与拖拽开始时的坐标之差</td>
                </tr>
            </tbody>
        </table>

    </article>
`;
