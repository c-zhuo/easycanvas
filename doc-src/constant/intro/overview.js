export default `
    <article id="概述">
        <h1>概述</h1>

        <h2>Easycanvas是什么</h2>

        <p>Easycanvas是一个渐进式、高效率的canvas渲染库，核心思路是由数据的变化来驱动视图的变化。<strong>将canvas与一个树形的数据结构绑定，当数据改变时视图将随之更新，并且提供了一个Chrome插件来便于开发</strong>，包括数据结构的显示、对canvas中某个元素的样式进行调整等。</p>
        <img class="article-img" width="100%" src="https://github.com/c-zhuo/easycanvas/raw/master/demos/index.gif?raw=true"></img>

        <p>Easycanvas提供了一个babel-plugin，支持使用类似React的JSX写法来描述结构，代码的语义性更好。</p>

        <p>支持在浏览器、微信小程序、微信小游戏中使用。</p>

        <p>本身提供了绘图、事件、自定义钩子、组件式开发等功能，并额外提供了一些插件，用于物理效果、WebGL等方向的扩展。其中WebGL插件支持导入pmd/pmx/vmd/vpd/fbx/dds等3D模型和图像文件。</p>

        <p>Easycanvas拥有单元测试，以保证迭代中功能的稳定。问题可以提交issue，通常24h内回复。</p>

        <h2>关于性能</h2>

        <p>Easycanvas的prod版本只有40kb左右的大小，gzip之后只有不到20kb。</p>

        <p>Easycanvas会选择性地进行绘制，即“跳过一些无意义的操作”。例如我们有一张层级较高、尺寸较大的图片，被它遮挡的图片将不会触发canvas自身的操作，以节约浏览器的性能。通常来说，3000张尺寸为150x150的png图片，在800x1200的画布中随机运动，在多数PC端浏览器仍然可以保持50以上的FPS。在教程部分会有相关的demo以供调试。</p>

        <p>内部使用了Object.defineProperty监听数据（位置、样式等属性）的变化，避免重复计算。</p>

        <h2>关于扩展</h2>

        <p>Easycanvas的画布是由一个个“Sprite（精灵）”类组成的，每个精灵拥有自己的位置、尺寸、事件监听和钩子函数。使用时，可以在Sprite类的基础上封装，形成例如button（按钮）、scene（场景）的组件。由于每个组件是一个独立的class，因此可以轻易做到复用。</p>

        <p>Easycanvas提供了完整的生命周期钩子（创建、初始化、绘制前、渲染后、移除前、移除后），可以用于<strong>定制自己的全局插件和精灵组件</strong>。</p>
    </article>
`;
