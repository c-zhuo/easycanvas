module.exports = `
    <article id="Sprite-API">
        <h1>Sprite API</h1>

        <p>Sprite是Easycanvas中的基类，拥有大量的属性与API。</p>
        
        <p>这些属性可以直接访问修改，也可以用函数的形式返回结果。后者可以实现类似“数据绑定”的概念，如下：</p>

        <code>
                someSprite.style.left = 100;

                someSprite.style.left = function () {
                    // window.data.left变化时，left将随之变化
                    return window.data.left;
                };
        </code>

        <p>可使用的属性包含：</p>

        <table>
            <thead>
                <tr>
                    <th align="left">content</th>
                    <th align="left">以下属性在content对象内</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td align="left">img <Image|Canvas|String|Function></td>
                    <td align="left">绘图内容。可以为Image、Canvas对象，也可以是远程图片URL，或者是返回了Image、Canvas、图片URL的一个Function。如果img的类型是String（图像URL），将在下一个tick自动转换为Image对象。</td>
                </tr>
                <tr>
                    <td align="left">text <String|Function></td>
                    <td align="left">绘制文本内容。可以是String，也可以是返回了String的Function。</td>
                </tr>
            </tbody>
            <thead>
                <tr>
                    <th align="left">style</th>
                    <th align="left">以下属性在style对象内</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td align="left">visible <Boolean|Function></td>
                    <td align="left">是否可见。默认true。不可见元素也将执行beforeTick等生命周期，但不会进行位置计算和渲染，可以极大节约性能开销。</td>
                </tr>
                <tr>
                    <td align="left">left/top <Number|String|Function></td>
                    <td align="left">相对于父节点的位置（与CSS规则相同）。默认0。可以为百分比字符串，例如'30%'，则起点为父节点尺寸的30%。</td>
                </tr>
                <tr>
                    <td align="left">width/height <Number|String|Function></td>
                    <td align="left">节点的宽高（与CSS规则相同）。默认0。可以为百分比字符串，例如'30%'，则为父节点宽高的30%。</td>
                </tr>
                <tr>
                    <td align="left">locate <'center'|'lt'|'rt'|'ld'|'rd'|Function></td>
                    <td align="left">节点的定位方式（类似CSS的transform的translate）。默认'center'（以left、top为中心，向四周扩散到width、height的大小）。例如希望在(100,100)的位置展示一个30*30的爆炸效果，只需要让left和top为100、width和height为30即可，而不需要关注图片本身的尺寸，图片将以(100,100)为中心进行渲染。指定为'lt'可以使用类似CSS的方式（图片向右下方展开）。</td>
                </tr>
                <tr>
                    <td align="left">zIndex <Number|Function></td>
                    <td align="left">节点的渲染层次（类似CSS的zIndex）。默认0。不建议同一位置存在相同zIndex的多个节点。</td>
                </tr>
                <tr>
                    <td align="left">zIndex <Number|Function></td>
                    <td align="left">节点的渲染层次（类似CSS的zIndex）。默认0。不建议同一位置存在相同zIndex的多个节点。</td>
                </tr>
                <tr>
                    <td align="left">opacity <Number|Function></td>
                    <td align="left">节点的透明度（与CSS规则相同）。默认1。子节点的透明度会受到父节点影响，相乘计算。为便于使用，允许为子节点设置大于1的透明度，例如父节点设置为0.5、子节点设置为2以上时，子节点将不透明。</td>
                </tr>
                <tr>
                    <td align="left">scale <Number|Function></td>
                    <td align="left">节点的缩放倍数（类似CSS的transform的scale）。默认1。子节点的缩放会受到父节点影响，相乘计算。只是画面效果，不会影响节点的宽高或位置的相关属性、操作。</td>
                </tr>
                <tr>
                    <td align="left">rotate <Number|Function></td>
                    <td align="left">节点的旋转角度（类似CSS的transform的rotate）。默认0。</td>
                </tr>
                <tr>
                    <td align="left">rotateOriginLeft/rotateOriginTop <Number|Function></td>
                    <td align="left">节点的旋转中心（类似CSS的transform-origin）。默认为节点中心。</td>
                </tr>
                <tr>
                    <td align="left">overflow <'hidden'|'visible'|Function></td>
                    <td align="left">内部子节点的渲染超出当前节点的范围时，展示还是隐藏（类似CSS的overflow）。默认'visible'。</td>
                </tr>
                <tr>
                    <td align="left">backgroundColor <Color|Function></td>
                    <td align="left">节点的背景色。支持rgba等常见颜色格式。</td>
                </tr>
                <tr>
                    <td align="left">borderWidth <Number|Function></td>
                    <td align="left">节点的外边框粗细。默认0。外边框不处于节点的容器范围内，因此不参与事件监听的位置判定、不影响使用API获取节点宽高时的结果、不影响子节点位置计算。</td>
                </tr>
                <tr>
                    <td align="left">borderColor <Color|Function></td>
                    <td align="left">节点的边框颜色。支持rgba等常见颜色格式。</td>
                </tr>
                <tr>
                    <td align="left">mirrX/mirrY <Boolean|Function> deprecated</td>
                    <td align="left">是否水平、垂直镜像，仅对content中的img图片生效。</td>
                </tr>
                <tr>
                    <td align="left">fontSize <Number|Function></td>
                    <td align="left">节点的文字大小。默认14。应用包含文字渲染时，请注意根据设备dpr对canvas节点进行缩放（例如在创建Painter类时指定dpr参数），否则锯齿会比较明显。</td>
                </tr>
                <tr>
                    <td align="left">color <Color|Function></td>
                    <td align="left">节点的文字颜色。默认'black'。支持rgba等常见颜色格式。</td>
                </tr>
                <tr>
                    <td align="left">fontFamily <String|Function></td>
                    <td align="left">节点的字体。默认'serif'。</td>
                </tr>
                <tr>
                    <td align="left">textAlign <'left'|'center'|'right'|Function></td>
                    <td align="left">节点的水平对齐方式。默认'left'。</td>
                </tr>
                <tr>
                    <td align="left">textVerticalAlign <'top'|'middle'|'bottom'|Function></td>
                    <td align="left">节点的垂直对齐方式。默认'top'。</td>
                </tr>
            </tbody>
            <thead>
                <tr>
                    <th align="left">events</th>
                    <th align="left">以下属性在events对象内，支持自定义扩展事件；除初始化时之外，通常不直接修改，建议利用addEventListener与removeEventListener方法进行添加和删除，详见API部分</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td align="left">click/contextmenu/dblclick <Function></td>
                    <td align="left">点击、右键或双指点击、双击时触发。移动端浏览器的点击延迟问题可以通过在创建Painter时指定fastclick解决，相见Painter API部分。</td>
                </tr>
                <tr>
                    <td align="left">touchstart/touchmove/touchend <Function></td>
                    <td align="left">触屏相关事件。</td>
                </tr>
                <tr>
                    <td align="left">mousedown/mousemove/mouseup/mousewheel <Function></td>
                    <td align="left">鼠标相关事件。</td>
                </tr>
                <tr>
                    <td align="left">eIndex <Number></td>
                    <td align="left">事件层次，默认与zIndex相同，决定节点的事件响应顺序。当一个节点的渲染层级很低，但希望优先尝试命中事件时，可以声明一个较大的eIndex来提高事件响应优先级。事件内部相关方法参考Event API。</td>
                </tr>
            </tbody>
            <thead>
                <tr>
                    <th align="left">hooks</th>
                    <th align="left">以下属性在hooks对象内，支持自定义扩展生命周期；除初始化时之外，通常不直接修改，建议利用on与off方法进行添加和删除，详见API部分</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td align="left">beforeTick/ticked <Function></td>
                    <td align="left">每帧之前或之后触发。生命周期钩子的内部相关方法参考Event API。</td>
                </tr>
                <tr>
                    <td align="left">beforeRemove/removed <Function></td>
                    <td align="left">节点被移除之前或之后触发。生命周期钩子的内部相关方法参考Event API。</td>
                </tr>
            </tbody>
        </table>

        <p>可使用的API包含：待补充</p>

    </article>
`;
