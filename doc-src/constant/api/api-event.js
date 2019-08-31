export default `
    <article id="Event-API">
        <h1>Event API</h1>

        <p>Event是Easycanvas中的事件对象。当Sprite.events下的事件或者addEventListener(EventName, Handle)注册的事件触发时，它是Handle函数的第一个入参。</p>

        <code>
                someSprite.addEventListener('click', function (e) {
                    console.log(e.canvasX, e.canvasY);
                    console.log(e.event.layerX, e.event.layerX);
                    e.stopPropagation();
                    e.event.stopPropagation();
                });
        </code>

        <p>可使用的属性包含：</p>

        <table>
            <thead>
                <tr>
                    <th align="left">属性</th>
                    <th align="left">含义</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td align="left">canvasX/canvasY <Number></td>
                    <td align="left">点击坐标点的绝对坐标（相对于整个canvas实例）。</td>
                </tr>
                <tr>
                    <td align="left">event <原生Event></td>
                    <td align="left">浏览器原生Event事件。</td>
                </tr>
            </tbody>
        </table>

        <p>可使用的API包含：待补充</p>
    </article>
`;
