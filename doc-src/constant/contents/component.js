module.exports = `
    <article id="组件">
        <h1>组件</h1>

        <p>这里所有的组件都是基于<strong>Sprite</strong>类的封装和组合。因此，组件通常也可以使用Sprite自身的API，除非组件对API进行了改写。</p>

        <h2>引入方式</h2>

        <code>
            <!-- 浏览器引入 -->
            <!-- 注意放在easycanvas.js后；prod为线上压缩版、dev为开发版；开发版带有调试、警告信息 -->

            <script src="http://your-path/easycanvas.standalone.prod.js"></script>
            <script src="http://your-path/components.standalone.prod.js"></script>
            <script>
                var view1 = new Easycanvas.View({/* your config */});
            </script>

            <!-- node环境引入 -->
            <!-- 注意Easycanvas是必须引入的，创建View的时候会隐式调用 -->
            import Easycanvas, { View } from 'easycanvas';
            var view1 = <View yourConfig="value"/>
        </code>

        <p>浏览器引入时，需要的js文件可以在<a href="https://github.com/c-zhuo/easycanvas/tree/master/build" target="_blank">这里</a>找到。</p>

        <p>node环境下，打包时会根据<strong>process.env.NODE_ENV</strong>这个环境变量来选择版本。当它不为<strong>production</strong>的时候，都会使用开发版本。开发版本包含一些warnning，并且可以使用Chrome调试插件在运行时进行调试工作。</p>

    </article>
`;
