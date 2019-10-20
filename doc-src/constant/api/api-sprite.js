export default `
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

        <p>Sprite类包含如下属性（这些属性可以直接修改）：</p>

        <table>
            <thead>
                <tr>
                    <th align="left">content</th>
                    <th align="left">以下属性在content对象内</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td align="left">img <<Image|Canvas|String|Function>></td>
                    <td align="left">绘图内容。可以为Image、Canvas对象，也可以是远程图片URL，或者是返回了Image、Canvas、图片URL的一个Function。如果img的类型是String（图像URL），将在下一个tick自动转换为Image对象。</td>
                </tr>
                <tr>
                    <td align="left">text <<String|Function>></td>
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
                    <td align="left">visible <<Boolean|Function>></td>
                    <td align="left">是否可见。默认true。不可见元素也将执行beforeTick等生命周期，但不会进行位置计算和渲染，可以极大节约性能开销。</td>
                </tr>
                <tr>
                    <td align="left">left/top <<Number|String|Function>></td>
                    <td align="left">相对于父节点的位置（与CSS规则相同）。默认0。可以为百分比字符串，例如'30%'，则起点为父节点尺寸的30%。</td>
                </tr>
                <tr>
                    <td align="left">width/height <<Number|String|Function>></td>
                    <td align="left">节点的宽高（与CSS规则相同）。默认0。可以为百分比字符串，例如'30%'，则为父节点宽高的30%。</td>
                </tr>
                <tr>
                    <td align="left">locate <<'center'|'lt'|'rt'|'ld'|'rd'|Function>></td>
                    <td align="left">节点的定位方式（类似CSS的transform的translate）。默认'center'（以left、top为中心，向四周扩散到width、height的大小）。例如希望在(100,100)的位置展示一个30*30的爆炸效果，只需要让left和top为100、width和height为30即可，而不需要关注图片本身的尺寸，图片将以(100,100)为中心进行渲染。指定为'lt'可以使用CSS中默认的布局方式，即矩形的盒子模型向右下方展开。</td>
                </tr>
                <tr>
                    <td align="left">zIndex <<Number|Function>></td>
                    <td align="left">节点的渲染层次（类似CSS的zIndex）。默认0。不建议同一位置存在相同zIndex的多个节点。</td>
                </tr>
                <tr>
                    <td align="left">opacity <<Number|Function>></td>
                    <td align="left">节点的透明度（与CSS规则相同）。默认1。子节点的透明度会受到父节点影响，相乘计算。为便于使用，允许为子节点设置大于1的透明度，例如父节点设置为0.5、子节点设置为2以上时，子节点将不透明。</td>
                </tr>
                <tr>
                    <td align="left">scale <<Number|Function>></td>
                    <td align="left">节点的缩放倍数（类似CSS的transform的scale）。默认1。子节点的缩放会受到父节点影响，相乘计算。只是画面效果，不会影响节点的宽高或位置的相关属性、操作。</td>
                </tr>
                <tr>
                    <td align="left">rotate <<Number|Function>></td>
                    <td align="left">节点的旋转角度（类似CSS的transform的rotate）。默认0。</td>
                </tr>
                <tr>
                    <td align="left">rotateOriginLeft/rotateOriginTop <<Number|Function>></td>
                    <td align="left">节点的旋转中心（类似CSS的transform-origin）。默认为节点中心。</td>
                </tr>
                <tr>
                    <td align="left">overflow <<'hidden'|'visible'|Function>></td>
                    <td align="left">内部子节点的渲染超出当前节点的范围时，展示还是隐藏（类似CSS的overflow）。默认'visible'。</td>
                </tr>
                <tr>
                    <td align="left">backgroundColor <<Color|Function>></td>
                    <td align="left">节点的背景色。支持rgba等常见颜色格式。</td>
                </tr>
                <tr>
                    <td align="left">borderWidth <<Number|Function>></td>
                    <td align="left">节点的外边框粗细。默认0。外边框不处于节点的容器范围内，因此不参与事件监听的位置判定、不影响使用API获取节点宽高时的结果、不影响子节点位置计算。</td>
                </tr>
                <tr>
                    <td align="left">borderColor <<Color|Function>></td>
                    <td align="left">节点的边框颜色。支持rgba等常见颜色格式。</td>
                </tr>
                <tr>
                    <td align="left">mirrX/mirrY <<Boolean|Function>> deprecated</td>
                    <td align="left">是否水平、垂直镜像，仅对content中的img图片生效。</td>
                </tr>
                <tr>
                    <td align="left">fontSize <<Number|Function>></td>
                    <td align="left">节点的文字大小。默认14。应用包含文字渲染时，请注意根据设备dpr对canvas节点进行缩放（例如在创建Painter类时指定dpr参数），否则锯齿会比较明显。</td>
                </tr>
                <tr>
                    <td align="left">color <<Color|Function>></td>
                    <td align="left">节点的文字颜色。默认'black'。支持rgba等常见颜色格式。</td>
                </tr>
                <tr>
                    <td align="left">fontFamily <<String|Function>></td>
                    <td align="left">节点的字体。默认'serif'。</td>
                </tr>
                <tr>
                    <td align="left">textAlign <<'left'|'center'|'right'|Function>></td>
                    <td align="left">节点的水平对齐方式。默认'left'。</td>
                </tr>
                <tr>
                    <td align="left">textVerticalAlign <<'top'|'middle'|'bottom'|Function>></td>
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
                    <td align="left">click/contextmenu/dblclick <<Function>></td>
                    <td align="left">点击、右键或双指点击、双击时触发。移动端浏览器的点击延迟问题可以通过在创建Painter时指定fastclick解决，相见Painter API部分。</td>
                </tr>
                <tr>
                    <td align="left">touchstart/touchmove/touchend <<Function>></td>
                    <td align="left">触屏相关事件。</td>
                </tr>
                <tr>
                    <td align="left">mousedown/mousemove/mouseup/mousewheel <<Function>></td>
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
                    <td align="left">beforeTick/ticked <<Function>></td>
                    <td align="left">每帧之前或之后触发。生命周期钩子的内部相关方法参考Event API。</td>
                </tr>
                <tr>
                    <td align="left">beforeRemove/removed <<Function>></td>
                    <td align="left">节点被移除之前或之后触发。生命周期钩子的内部相关方法参考Event API。</td>
                </tr>
            </tbody>
        </table>

        <p>Sprite类包含如下API（没有特殊注明返回值的API均会返回当前Sprite自身，以便于链式调用）：</p>

        <table>
            <thead>
                <tr>
                    <th align="left">add(child)</th>
                    <th align="left">添加子节点。</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td align="left">child <<Sprite|Object>></td>
                    <td align="left">子节点。如果传入的是Object，会调用new Sprite(child)构建一个Sprite类。</td>
                </tr>
                <tr>
                    <td align="left">返回值 <<Sprite>></td>
                    <td align="left">返回child实例。</td>
                </tr>
            </tbody>
            <thead>
                <tr>
                    <th align="left">getRect(fromCache)</th>
                    <th align="left">获取Sprite模型所占的区域盒子。</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td align="left">getRect <<Boolean>></td>
                    <td align="left">是否使用当前帧渲染时的缓存结果，默认false。设置为true后不会重新计算，例如手动改变了节点位置和大小，之后立刻调用这个API，拿到的将仍是上一帧渲染时的位置和大小。</td>
                </tr>
                <tr>
                    <td align="left">返回值 <<{left,top,right,bottom,width,height}>></td>
                    <td align="left">Sprite所占区域的边界。如果style中没有width和height，但是存在content.img，那么会使用图片的尺寸。这一点与HTML的<<img>>标签的规则是相同的。</td>
                </tr>
            </tbody>
            <thead>
                <tr>
                    <th align="left">getStyle(prop, fromLastTick)</th>
                    <th align="left">获取Sprite的某个样式的渲染结果。</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td align="left">prop <<'left'|'opacity'|...>></td>
                    <td align="left">要获取的样式。</td>
                </tr>
                <tr>
                    <td align="left">fromLastTick <<Boolean>></td>
                    <td align="left">从上一帧的渲染缓存中获取，默认true。设置为false将遍历全部父节点进行重新计算。当通过js修改了某个样式后立刻调用这个API，此时新的样式还没有被渲染出来，可以设置为false来判断下一帧的渲染结果。</td>
                </tr>
                <tr>
                    <td align="left">返回值 <<Number|String|Boolean>></td>
                    <td align="left">对应的渲染结果。位置、透明度等属性会受到父节点的影响，并且位置属性是经过locate运算后的实际渲染结果。</td>
                </tr>
            </tbody>
            <thead>
                <tr>
                    <th align="left">getSelfStyle(prop)</th>
                    <th align="left">获取Sprite当前样式的设置的值。</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td align="left">prop <<undefined|'left'|'opacity'|...>></td>
                    <td align="left">要获取的样式。留空代表全部获取</td>
                </tr>
                <tr>
                    <td align="left">返回值 <<Number|String|Boolean|Object>></td>
                    <td align="left">当前设置的值。如果设置的是一个function（例如Transition渐变），会返回当前的结果。如果没有传入prop，会返回一个Object，包含style中的全部属性。</td>
                </tr>
            </tbody>
            <thead>
                <tr>
                    <th align="left">remove(child)</th>
                    <th align="left">移除节点或者子节点。</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td align="left">child <<Sprite|undefined>></td>
                    <td align="left">移除当前节点的child节点，child留空代表移除当前节点。</td>
                </tr>
            </tbody>
            <thead>
                <tr>
                    <th align="left">update(config)</th>
                    <th align="left">立即更新节点属性。</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td align="left">config <<Object>></td>
                    <td align="left">属性集合，例如{style: {left: 1}, content: {text: 'foo'}}。将立刻触发Sprite的重新计算，相比其它API更加消耗性能。通常情况下可以直接修改属性（如Sprite.style.left=1）来进行更新。</td>
                </tr>
            </tbody>

            <thead>
                <tr>
                    <th align="left">addEventListener(eventName, callback)</th>
                    <th align="left">注册事件监听函数。</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td align="left">eventName <<String>></td>
                    <td align="left">事件名，支持几乎全部HTML中的事件，参考事件API。</td>
                </tr>
                <tr>
                    <td align="left">callback <<Function>></td>
                    <td align="left">事件触发的回调，入参参考事件API。</td>
                </tr>
            </tbody>
            <thead>
                <tr>
                    <th align="left">removeEventListener(eventName, callback)</th>
                    <th align="left">移除一个或全部的事件监听。</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td align="left">eventName <<String>></td>
                    <td align="left">事件名，支持几乎全部HTML中的事件，参考事件API。</td>
                </tr>
                <tr>
                    <td align="left">callback <<undefined|Function>></td>
                    <td align="left">事件触发的回调，不传入代表移除当前事件的全部监听函数。</td>
                </tr>
            </tbody>

            <thead>
                <tr>
                    <th align="left">on(hookName, callback)</th>
                    <th align="left">注册钩子监听函数。可以是生命周期钩子，也可以自定义钩子。</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td align="left">hookName <<String>></td>
                    <td align="left">钩子名。</td>
                </tr>
                <tr>
                    <td align="left">callback <<Function>></td>
                    <td align="left">钩子触发的回调，入参由触发者决定。</td>
                </tr>
            </tbody>
            <thead>
                <tr>
                    <th align="left">off(hookName, callback)</th>
                    <th align="left">移除一个或全部的钩子监听。</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td align="left">hookName <<String>></td>
                    <td align="left">钩子名。</td>
                </tr>
                <tr>
                    <td align="left">callback <<undefined|Function>></td>
                    <td align="left">钩子的监听回调，不传入代表移除当前钩子的全部监听函数。</td>
                </tr>
            </tbody>

            <thead>
                <tr>
                    <th align="left">distribute(hookName, ...params)</th>
                    <th align="left">触发当前节点的全部子节点的钩子。</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td align="left">hookName <<String>></td>
                    <td align="left">钩子名。</td>
                </tr>
                <tr>
                    <td align="left">params <<any>></td>
                    <td align="left">传入钩子监听函数的任意个参数。</td>
                </tr>
            </tbody>

            <thead>
                <tr>
                    <th align="left">broadcast(hookName, ...params)</th>
                    <th align="left">触发当前节点及其全部子节点的钩子。</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td align="left">hookName <<String>></td>
                    <td align="left">钩子名。</td>
                </tr>
                <tr>
                    <td align="left">params <<any>></td>
                    <td align="left">传入钩子监听函数的任意个参数。</td>
                </tr>
            </tbody>

            <thead>
                <tr>
                    <th align="left">trigger(hookName, ...params)</th>
                    <th align="left">触发当前节点的钩子。</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td align="left">hookName <<String>></td>
                    <td align="left">钩子名。</td>
                </tr>
                <tr>
                    <td align="left">params <<any>></td>
                    <td align="left">传入钩子监听函数的任意个参数。</td>
                </tr>
            </tbody>

            <thead>
                <tr>
                    <th align="left">getAllChildren(includeSelf)</th>
                    <th align="left">获取当前节点的全部子节点（包含子节点的子节点）。</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td align="left">includeSelf <<Boolean>></td>
                    <td align="left">返回值是否需要包含当前节点，默认false。</td>
                </tr>
                <tr>
                    <td align="left">返回值 <<Array>></td>
                    <td align="left">子节点的集合。</td>
                </tr>
            </tbody>
            <thead>
                <tr>
                    <th align="left">getAllVisibleChildren(includeSelf)</th>
                    <th align="left">获取当前节点的全部style.visible不为false的子节点（包含子节点的子节点）。</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td align="left">includeSelf <<Boolean>></td>
                    <td align="left">返回值是否需要包含当前节点，默认false。</td>
                </tr>
                <tr>
                    <td align="left">返回值 <<Array>></td>
                    <td align="left">子节点的集合。注意如果一个子节点的style.visible为false，那么它内部的子节点也将被认为是不可见。</td>
                </tr>
            </tbody>
            <thead>
                <tr>
                    <th align="left">getAllVisibleChildren(includeSelf)</th>
                    <th align="left">获取当前节点的全部style.visible不为false的子节点（包含子节点的子节点）。</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td align="left">includeSelf <<Boolean>></td>
                    <td align="left">返回值是否需要包含当前节点，默认false。</td>
                </tr>
                <tr>
                    <td align="left">返回值 <<Array>></td>
                    <td align="left">子节点的集合。注意如果一个子节点的style.visible为false，那么它内部的子节点也将被认为是不可见。</td>
                </tr>
            </tbody>
            <thead>
                <tr>
                    <th align="left">getOuterRect()</th>
                    <th align="left">获取能容纳Sprite及其全部子节点的区域盒子。</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td align="left">返回值 <<{left,top,right,bottom,width,height}>></td>
                    <td align="left">区域的边界。注意这个方法将忽略style.visible为false的子节点。</td>
                </tr>
            </tbody>

            <thead>
                <tr>
                    <th align="left">combine() deprecated，建议使用combineAsync</th>
                    <th align="left">尝试节点合并。如果等待当前节点的全部子节点都在可视区域内渲染完成，将全部渲染结果合并为图片，写入当前节点的content.img。如果有节点未完成渲染或在可视范围之外则无效。合并后通常可以大幅提升性能（例如10个节点合并成为1个，大约可以减少90%的性能开销）。但合并之后子节点无法再修改位置和样式，除非再调用uncombine。合并不影响子节点的事件处理逻辑。建议用于复杂的UI模块。</th>
                </tr>
            </thead>
            <thead>
                <tr>
                    <th align="left">combineAsync()</th>
                    <th align="left">每100毫秒尝试进行一次combine，直至合并成功。</th>
                </tr>
            </thead>
            <thead>
                <tr>
                    <th align="left">uncombine()</th>
                    <th align="left">取消合并，或者终止尝试combineAsync的轮询。</th>
                </tr>
            </thead>

            <thead>
                <tr>
                    <th align="left">recalculate(removeCache)</th>
                    <th align="left">重新计算节点的属性。通常不需要直接调用。update()方法内部会调用此API。</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td align="left">removeCache <<Boolean>></td>
                    <td align="left">移除节点内部的缓存，全部重新计算。默认false。通常不需要调用。</td>
                </tr>
            </tbody>

            <thead>
                <tr>
                    <th align="left">nextTick(callback)</th>
                    <th align="left">在下一帧运行回调。</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td align="left">callback <<Function>></td>
                    <td align="left">下一帧运行的函数。入参为下一帧的渲染时间，函数内的this指向当前Sprite。</td>
                </tr>
            </tbody>

            <thead>
                <tr>
                    <th align="left">clear()</th>
                    <th align="left">移除当前Sprite的全部子节点。</th>
                </tr>
            </thead>
        </table>

    </article>
`;
