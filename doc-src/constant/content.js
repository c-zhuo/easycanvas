// <p></p>

let content = `
    <article id="概述">
        <h1>概述</h1>

        <h2>Easycanvas是什么</h2>
        <p>Easycanvas是一个轻量、高效率的canvas渲染库，核心思路是由数据的变化来驱动视图的变化。<strong>将canvas与一个树形的数据结构绑定，当数据改变时视图将随之更新，并且提供了一个Chrome插件来便于开发</strong>，包括数据结构的显示、对canvas中某个元素的样式进行调整等。</p>
        <img class="article-img" width="100%" src="https://github.com/chenzhuo1992/easycanvas/raw/master/demos/index.gif?raw=true"></img>
        <p>html5的canvas标签只有一些基本的绘图操作，因此，事件的处理、元素的层级和嵌套、图像的旋转和布局都需要由一系列的基本操作组合形成。开发效率较低、代码维护成本偏高。</p>
        <p>而Easycanvas就是将这些方法和数据相关联。它也提供了一些动画开发中可能用到的方法（例如过渡、图像处理等），以及一些可插拔的扩展插件（例如物理效果、淡出特效），以应对各种复杂的应用场景。此外，可以在使用时自定义一些组件（例如按钮、弹窗组件）来进行复用。</p>

        <h2>关于性能</h2>
        <p>Easycanvas的prod版本只有30kb的大小，gzip之后只有10kb左右。</p>
        <p>Easycanvas会选择性地进行绘制，即“跳过一些无意义的操作”。例如我们有一张层级较高、尺寸较大的图片，被它遮挡的图片将不会触发canvas自身的操作，以节约浏览器的性能。通常来说，3000张尺寸为150x150的png图片，在800x1200的画布中随机运动，在多数PC端浏览器仍然可以保持50以上的FPS。在教程部分会有相关的demo以供调试。</p>

        <h2>关于扩展</h2>
        <p>Easycanvas的画布是由一个个“sprite（精灵）”类组成的，每个精灵拥有自己的位置、尺寸、事件监听和钩子函数。使用时，可以在sprite类的基础上封装，形成例如button（按钮）、scene（场景）的组件。由于每个组件是一个独立的class，因此可以轻易做到复用。</p>
    </article>

    <article id="快速开始">
        <h1>快速开始</h1>

        <h2>如何引入</h2>
        <p>Easycanvas支持通过script标签的方式引入，或者通过npm包引入。develop版本可以配合Chrome插件进行调试。</p>

        <code>
            <!-- 开发版本 -->
            <script src="http://your-path/easycanvas.standalone.dev.js"></script>

            <!-- 生产版本 -->
            <script src="http://your-path/easycanvas.standalone.prod.js"></script>
        </code>

        <p>这两个js文件可以在<a href="https://github.com/chenzhuo1992/easycanvas/tree/master/build" target="_blank">这里</a>找到。</p>

        <p>或者通过npm包的方式引入，通过<strong>process.env.NODE_ENV</strong>这个环境变量来选择版本（当它不为<strong>production</strong>的时候，都会使用开发版本）。</p>

        <p>不建议在线上环境使用develop版本，因为这个版本会在渲染时记录一些信息以供Chrome插件调试，会额外占用内存和CPU（但影响不大，不超过10%）。</p>

        <p>在你的项目目录执行<strong>npm install easycanvas --save</strong>，然后可以开始引入easycanvas：</p>

        <code>
            import Easycanvas from 'easycanvas';
        </code>

        <p>引入时，默认会引入Easycanvas的<strong>build/easycanvas.js</strong>文件，所以也可以这样引入：</p>

        <code>
            import Easycanvas from 'easycanvas/build/easycanvas.js';
        </code>
    </article>

    <article id="快速开始2">

    </article>
`;

let splits = content.split(/<\/*code>/);
splits = splits.map((str, i) => {
    if (i % 2) {
        return '<p><code>' +
            str
                .trim()
                .replace(/\</g, '&lt;')
                .replace(/\</g, '&lt;')
                .replace(/\n/g, '<br>') +
            '</code><p>';
    }

    return str;
});

module.exports = splits.join('');
