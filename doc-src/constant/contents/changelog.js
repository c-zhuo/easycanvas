// <p>Feature：为Painter实例增加afterEvent钩子。</p>

module.exports = `
    <article id="更新日志（Latest：2018-10-28）">
        <h1>更新</h1>

        <p class="tip">Tips：小版本号为bugfix或增加API，中版本号可能包含个别不向下兼容的API调整。</p>

        <h2>进行中</h2>

        <p>Feature：为WebGL增加<strong>事件监听</strong>功能。</p>
        <p>文档补充：事件捕获等API的文档补充。</p>

        <h2>当前版本</h2>

        <h3>0.7.0 (2018.10.28)</h3>

        <p>Change：原精灵动画Sprite.content.sequence相关功能转移至<strong>精灵动画组件Easycanvas.class.sequence</strong>，详见文档。</p>
        <p>Change：<strong>移除Sprite.inherit API</strong>，不再能修改Sprite的继承设置，以免滥用导致的维护成本升高。</p>
        <p>Bugfix：修复了<strong>给Sprite设置缩放样式scale时，它的children的缩放中心和Sprite不同</strong>的bug。</p>
        <p>Feature：增加<strong>生成快照（骨架屏）功能</strong>。可以在非生产环境调用Painter的skeleton方法，生成原生Javascript的Canvas相关API对当前应用的绘制，用于提升首屏速度。文档待更新。</p>
        <p>Performance：调整部分底层逻辑和数据结构，<strong>大幅提升渲染性能，对于长列表可以降低40%的性能消耗</strong>。</p>

        <h2>历史版本</h2>

        <h3>0.6.2 (2018.10.15)</h3>

        <p>Bugfix：修复了scroll组件在<strong>Chrome模拟移动端时无法用双指操作触摸板来进行滚动</strong>的bug。</p>
        <p>Bugfix：修复了scroll组件在<strong>快速滑动、停止滑动、再松开手指后仍然快速滚动</strong>的bug。</p>
        <p>Bugfix：修复了scroll组件在<strong>水平方向滚动异常</strong>的bug。</p>
        <p>Bugfix：修复了scroll组件在<strong>overflow设置为scroll时子Sprite仍然可以画到scroll组件外部</strong>的bug。</p>
        <p>Bugfix：修复了Chrome调试工具在<strong>PC端下无法选中某一Sprite进行调试</strong>的bug。</p>

        <h3>0.6.1 (2018.10.14)</h3>

        <p>Bugfix：修复了<strong>刷新页面后需要重新在Chrome调试工具中选择实例</strong>才能查看Painter的信息的bug。</p>
        <p>Bugfix：修复了<strong>最外层Sprite在Chrome调试工具中的排序不断变化</strong>的bug。</p>
        <p>Bugfix：修复了<strong>scroll组件在移动端不同设备下，触屏产生的滚动速度不同</strong>的bug。</p>
        <p>Feature：在Chrome调试工具中选中某一个Sprite时，将<strong>额外展示其尺寸、parent的定位点以及横纵偏移距离</strong>。</p>
        <p>Feature：使用Chrome调试工具中选取页面上的Sprite时，将<strong>在调试工具中自动展开并定位到选择的Sprite</strong>。</p>
        <p>Feature：为Sprite的style增加<strong>border属性，用于设置边框</strong>。</p>
        <p>Feature：为Sprite补充一些API，包含<strong>功能性API以及性能优化API</strong>。</p>
        <p>注：部分改动需要更新调试工具，请重新拉取chrome-devtools目录。</p>

        <h3>0.6.0 (2018.9.24)</h3>

        <p>Change：重写事件触发机制，现在将在遍历对象时同步触发事件。事件触发时动态添加的Sprite也可能触发该事件（类似点透现象），可以通过在监听函数中调用<strong>e.stopPropagation()</strong>解决。这个API也会立即结束对其它Sprite的事件判定，在Sprite较多的应用中可以明显<strong>提升性能</strong>。</p>
        <p>Bugfix：修复部分低版本安卓手机，<strong>event不能正确触发</strong>的bug。</p>
        <p>Bugfix：修复使用on挂载自定义钩子时，设置throttle后导致<strong>钩子无法被off解绑</strong>的bug。</p>
        <p>Bugfix：修复Chrome调试工具在调试3D模型时，可能<strong>无法高亮当前选中的模型</strong>的bug。</p>
        <p>Bugfix：修复第二次用imgLoader加载同一张图片时，<strong>图片没有加载成功就触发回调</strong>的bug。</p>
        <p>Feature：现在在2D渲染时，可以在style中指定<strong>overflow为hidden</strong>来限定子Sprite的渲染范围。</p>
        <p>Feature：为canvas实例增加fastclick选项，调用register注册时<strong>传入fastclick为true</strong>可以开启设置，将去除click事件的300ms延迟。</p>
        <p>Feature：提供button/scroll/text三个<strong>Canvas 2D UI组件</strong>，用法参考demo。</p>
        <p>Performance：调整部分底层实现，提升渲染和事件的性能。</p>

        <h3>0.5.10 (2018.9.9)</h3>

        <p>Bugfix：修复pendulum和ease在结束后可能额外执行一帧，导致<strong>结束点有偏差</strong>的bug。</p>
        <p>Feature：为transition增加<strong>then</strong>方法，结束时触发，例如Easycanvas.transition.linear(2, 8, 1000).then(Function)。</p>
        <p>Feature：为WebGL引入<strong>Three.js的loaders</strong>，用于加载fbx、dds等更多模型和资源文件，详见文档。</p>

        <h3>0.5.9 (2018.9.1)</h3>

        <p>Bugfix：修复绘制文本时，<strong>textVerticalAlign不对齐</strong>的bug。</p>
        <p>Feature：为2D的Sprite增加<strong>backgroundColor</strong>属性，可以设置背景色。</p>
        <p>Feature：支持在<strong>微信小程序</strong>中使用（微信小游戏已在0.5.6版本支持）。</p>
        <p>Feature：为WebGL优化<strong>Shader性能</strong>：通过场景中的元素种类，自动调整shader语法。设置singleShader为true后开启，详见文档。</p>
        <p>Feature：为WebGL增加<strong>绘制像素点</strong>的API，详见文档。</p>
        <p>Performance：调整部分底层实现，提升渲染和事件的性能。</p>

        <h3>0.5.8 (2018.8.11)</h3>

        <p>Bugfix：修复2D渲染中，个别场景下没有智能跳过屏幕外Sprite绘制，导致<strong>性能浪费</strong>的问题。</p>
        <p>Feature：为WebGL增加<strong>调整摄像头位置和视角</strong>的API，详见文档。</p>

        <h3>0.5.7 (2018.7.29)</h3>

        <p>Bugfix：修复线性渐变时，终点小于起点会导致js卡死的bug，如Easycanvas.transition.linear(2, 1, 1000)。</p>
        <p>Bugfix：修复2D渲染中，<strong>处于屏幕边缘并且设置了角度的Sprite的坐标计算可能异常</strong>的bug。</p>

        <h3>0.5.6 (2018.7.25)</h3>

        <p>支持微信小游戏。</p>

        <h3>0.5.5</h3>

        <p>Bugfix：修复指定Sprite.style.locate后，<strong>事件判定范围可能错误</strong>的bug。</p>

        <h3>0.5.0～0.5.4</h3>

        <p>支持WebGL的3D模型渲染。</p>

        <h2>0.4.x及以下</h2>

        <p>补充API。</p>

        </section>
    </article>
`;
