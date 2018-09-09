import demo from './demos-fbxdds.js';

module.exports = `
    <article id="WebGL-其它格式的模型">
        <h1>WebGL-其它格式的模型</h1>

        <p>目前支持pmd/pmx/vmd/vpd/fbx/dds格式的文件解析，后续将逐渐补充其它格式。</p>

        <p class="tip">Three.js库提供了一些loader来支持这些格式的加载，但是是和Three.js耦合在一起的，无法单独使用。Easycanvas的loader是以Three.js为基础进行改造而来，只提供顶点、索引等Webgl中必需的属性，因此可以配合Easycanvas本身使用，也可以用于原生Webgl语法。</p>

        <h2>引入方式</h2>

        <code>
            <!-- js文件方式引入 -->
            <!-- 注意放在easycanvas.js后；prod为线上压缩版、dev为开发版；开发版带有调试、警告信息 -->

            <script src="http://your-path/easycanvas.standalone.prod.js"></script>
            <script src="http://your-path/plugin.webgl.standalone.prod.js"></script>
            <script src="http://your-path/plugin.webgl.loaders.standalone.prod.js"></script>

            <!-- 如果要加载pmd/pmx/vmd，需要额外引入mmdparser -->
            <script src='../resource/mmd/lib/mmdparser.min.js'></script>

            <!-- 如果要加载fbx，需要额外引入zlib -->
            <script src='../resource/fbxdds/zlib.min.js'></script>
        </code>
        <code>
            <!-- node环境引入 -->
            <!-- 注意：在node环境引入，也需要引入mmdparser或者zlib -->

            import Easycanvas from easycanvas;
            import EasycanvasWebgl from easycanvas/build/plugin.webgl.js;
            import EasycanvasWebglLoaders from easycanvas/build/plugin.webgl.loaders.js;

            Easycanvas.use(EasycanvasWebgl);
            Easycanvas.use(EasycanvasWebglLoaders);
        </code>

        <h2>加载FBX模型和DDS图像</h2>

        <p>FBX是一种模型资源文件，DDS是一种压缩图片格式。如下例。</p>

        ${demo}
    </article>
`;
