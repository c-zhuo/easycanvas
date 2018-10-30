module.exports = `
    <article id="Sprite API">
        <h1>Sprite API列表</h1>

        <p>scroll组件拥有如下属性，例如<strong>创建对象时sprite.scroll.scrollY为0可以立即调整滚动位置到顶部</strong>。所有的API如下：</p>

        <table>
            <thead>
                <tr>
                    <th align="left">API</th>
                    <th align="left">描述</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td align="left">scrollX / scrollY</td>
                    <td align="left">横、纵向滚动距离</td>
                </tr>
                <tr>
                    <td align="left">minScrollX / minScrollY</td>
                    <td align="left">横、纵向最小滚动距离，默认为0</td>
                </tr>
                <tr>
                    <td align="left">maxScrollX / maxScrollY</td>
                    <td align="left">横、纵向最大滚动距离，默认自适应，一旦赋值将取消自适应</td>
                </tr>
                <tr>
                    <td align="left">flexible / flexibleX / flexibleY</td>
                    <td align="left">是否开启弹性拉伸效果，默认为false</td>
                </tr>
                <tr>
                    <td align="left">smooth</td>
                    <td align="left">速度衰减系数，默认0.9，设置0代表立即停止，1代表不减速</td>
                </tr>
                <tr>
                    <td align="left">capture</td>
                    <td align="left">捕获内部的事件，默认false，为true时会阻止touchstart、touchmove、wheel等滚动相关事件在内部传递，在移动端可以提升滚动性能；注意：多个scroll嵌套时，外层设置为capture将阻止内部scroll的功能</td>
                </tr>
            </tbody>
        </table>

    </article>
`;
