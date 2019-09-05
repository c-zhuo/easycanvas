export default `
    <article id="Transition-API">
        <h1>Transition 数字渐变函数</h1>

        <p>Transition用于为Sprite设置一个可以不断变化的数字属性。例如下面这个例子中，SomeSprite的left将会从0匀速变化到100，然后立刻回到0再重新渐变到100，不断循环：</p>

        <code>
                const { Transition } = Easycanvas;

                // ... ...

                SomeSprite.style.left = Transition.linear(0, 100, 3000).loop();
        </code>

        <p>其原理是，Transition.linear会创建一个与时间有关的函数，每次调用时将根据当前帧的渲染时间计算出一个合适的值。</p>

        <p class="tip">Tips：这里根据“当前帧的渲染时间”来计算，而不是用“当前时间”来计算，是为了避免当在大段逻辑中js运行时间超过1毫秒时，前后运行的多个Transition的参考时间不同，导致的一些效果出现微小误差的情况。</p>

        <p>可用的函数及参数含义：</p>

        <table>
            <thead>
                <tr>
                    <th align="left">Transition.linear(a, b, duration)</th>
                    <th align="left">匀速渐变，从a匀速变化到b</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td align="left">a <<Number>></td>
                    <td align="left">起始数值</td>
                </tr>
                <tr>
                    <td align="left">b <<Number>></td>
                    <td align="left">终点数值</td>
                </tr>
                <tr>
                    <td align="left">duration <<Number>></td>
                    <td align="left">过渡用时，单位毫秒</td>
                </tr>
            </tbody>
            <thead>
                <tr>
                    <th align="left">Transition.pendulum(a, b, duration, [config])</th>
                    <th align="left">钟摆渐变，从a向b渐变之后再返回a，数值越靠近a、b变化越慢，在a、b中间时最快</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td align="left">config.start <<Number>></td>
                    <td align="left">起始位置，默认为0，单位为三角函数中的角度，因此一个完整的周期为360。</td>
                </tr>
                <tr>
                    <td align="left">cycle <<Number>></td>
                    <td align="left">摆动周期，默认为1。</td>
                </tr>
            </tbody>
            <thead>
                <tr>
                    <th align="left">Transition.ease(a, b, duration)</th>
                    <th align="left">加速渐变，其实现为Transition.pendulum(a, b, duration * 2, { cycle: 0.5, })</th>
                </tr>
            </thead>
        </table>

        <p>Transition函数的返回值拥有如下API:</p>

        <table>
            <thead>
                <tr>
                    <th align="left">API</th>
                    <th align="left">描述</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td align="left">loop()</td>
                    <td align="left">循环进行，数值到达终点后将立刻返回起点，然后重新向终点渐变。</td>
                </tr>
                <tr>
                    <td align="left">then(callback)</td>
                    <td align="left">结束回调，需要注意循环进行的渐变不会触发回调。回调触发时，当前数值将作为入参传入。</td>
                </tr>
                <tr>
                    <td align="left">restart()</td>
                    <td align="left">重置渐变。</td>
                </tr>
            </tbody>
        </table>

    </article>
`;
