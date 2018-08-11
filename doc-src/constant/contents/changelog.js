module.exports = `
    <article id="更新日志">
        <h1>更新</h1>

        <p class="tip">Tips：小版本号为bugfix或增加API，中版本号可能包含个别不向下兼容的API调整。</p>

        <h2>进行中</h2>

        <p>Feature：为WebGL插件增加<strong>绘制点与圆</strong>的API：通过修改App.webgl.camera的属性可以实现摄像头位置与视角的调整。</p>
        <p>Feature：为WebGL插件优化<strong>Shader性能</strong>：通过场景中的元素种类，自动调整shader语法。</p>
        <p>Feature：提供<strong>图像特效插件</strong>（近支持2D）。</p>
        <p>Feature：<strong>精灵动画组件</strong>（支持2D与3D），支持更多API。Sprite.content.sequence（原精灵动画API）将不建议使用。</p>

        <h2>当前版本</h2>

        <h3>0.5.8</h3>

        <p>为WebGL插件增加<strong>调整摄像头</strong>的API：通过修改App.webgl.camera的属性可以实现摄像头位置与视角的调整。</p>
        <p>Bugfix：修复2D渲染中，个别场景下没有智能跳过屏幕外Sprite绘制，导致性能浪费的问题。</p>

        <h2>历史版本</h2>

        <h3>0.5.7</h3>

        <p>Bugfix：修复线性渐变时，终点小于起点会导致js卡死的bug，如Easycanvas.transition.linear(2, 1, 1000)。</p>
        <p>Bugfix：修复2D渲染中，带有角度的Sprite部分位于屏幕外时，坐标计算的bug。</p>

        <h3>0.5.6</h3>

        <p>支持微信小游戏。</p>

        <h3>0.5.5</h3>

        <p>Bugfix：修复指定Sprite.style.locate后，事件判定范围可能错误的bug。</p>

        <h3>0.5.0～0.5.4</h3>

        <p>支持WebGL的3D模型渲染。</p>

        <h2>0.4.x及以下</h2>

        <p>补充API。</p>

        </section>
    </article>
`;
