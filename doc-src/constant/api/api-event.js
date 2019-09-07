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
                    <td align="left">canvasX/canvasY <<Number>></td>
                    <td align="left">点击坐标点的绝对坐标（相对于整个canvas实例）。</td>
                </tr>
                <tr>
                    <td align="left">event <<原生Event>></td>
                    <td align="left">浏览器原生Event事件。</td>
                </tr>
            </tbody>
        </table>

        <p>可使用的API包含：</p>

        <table>
        <thead>
            <tr>
                <th align="left">API</th>
                <th align="left">含义</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td align="left">stopPropagation()</td>
                <td align="left">停止事件在Easycanvas内的冒泡。事件不会再向当前Sprite的父节点传递。</td>
            </tr>
            <tr>
                <td align="left">event.stopPropagation()</td>
                <td align="left">停止事件在DOM上的冒泡，即事件不会向上传递到当前canvas节点的parent节点。</td>
            </tr>
        </tbody>
    </table>

    <p>event属性内包含全部的浏览器事件对象属性。</p>

</article>
`;
