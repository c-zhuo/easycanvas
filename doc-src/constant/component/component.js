export default `
    <article id="开始使用组件">
        <h1>开始使用组件</h1>

        <p>接下来的所有组件都是基于<strong>Sprite</strong>类的封装和组合。因此，组件也可以使用Sprite所提供的API。</p>

        <p>相比于JS的写法，更<strong>推荐使用JSX的形式来组织你的组件，这样可以使代码的可读性大大提高</strong>。如果要使用JSX，请确保引入了Easycanvas提供的babel-plugin，详情请参考左侧“快速开始”中的“npm引入与JSX写法”。</p>

        <p>这里<strong>所有的组件都支持使用JSX</strong>，但例子可能有部分非JSX的写法，只是用于示范。</p>

        <h2>引入方式</h2>

        <p>下面是一个引入View组件的例子，引入其它组件的方式相似。</p>

        <code>
            <!-- 浏览器引入全部组件 -->
            <!-- 注意放在easycanvas.js后；prod为线上压缩版、dev为开发版；开发版带有调试、警告信息 -->

            <script src="http://your-path/easycanvas.standalone.prod.js"></script>
            <script src="http://your-path/components.standalone.prod.js"></script>
            <script>
                var view1 = new Easycanvas.View({/* your config */});
            </script>

            <!-- 浏览器引入单个组件 -->
            <!-- 注意放在easycanvas.js后；只提供线上版本，开发环境可以使用上面的dev版本 -->

            <script src="http://your-path/easycanvas.standalone.prod.js"></script>
            <script src="http://your-path/components/View.js"></script>
            <script>
                var view1 = new Easycanvas.View({/* your config */});
            </script>

            <!-- 推荐：node环境引入组件 -->
            <!-- 注意Easycanvas是必须引入的，创建View的时候会隐式调用，原理与React相同 -->
            import Easycanvas, { View } from 'easycanvas';
            var view1 = <View yourConfig="value" />
        </code>

        <p>浏览器引入时，需要的js文件可以在<a href="https://github.com/c-zhuo/easycanvas/tree/master/build" target="_blank">这里</a>找到。</p>

        <p>node环境下，打包时只会打包用到的组件，并且会根据<strong>process.env.NODE_ENV</strong>这个环境变量来选择版本，当它不为<strong>production</strong>的时候，都会使用开发版本。开发版本包含一些warning信息，而且可以使用Chrome调试插件进行调试工作。</p>

    </article>
`;
