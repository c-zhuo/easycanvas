module.exports = `
    <article id="在微信小程序环境使用">
        <h1>快速开始</h1>

        <h2>在微信小程序中引入</h2>

        <p>在微信小程序入口文件引入以下两个文件，即可使用Easycanvas。</p>

        <p><strong>注意：目前只能引入prod版本，不支持开发者工具</strong>，未来版本将支持引入开发版进行调试。</p>

        <code>
            import Easycanvas from './your-path/easycanvas.standalone.prod.js';
            import EasycanvasWxapp from './your-path/plugin.wxapp.standalone.prod.js';

            Easycanvas.use(EasycanvasWxapp);
        </code>

        <p>这里的js文件可以在<a href="https://github.com/c-zhuo/easycanvas/tree/master/build" target="_blank">这里</a>找到。</p>

        <h2>创建实例</h2>

        <p>下例可以在微信小程序中创建一个空实例：</p>

        <section>
            <code>
                // 微信小程序WXML里的canvas标签
                <canvas
                    style="width: 100vw; height: 400px;" 
                    bindtouchstart="func"
                    bindtouchmove="func"
                    bindtouchend="func"
                    bindtouchcancel="func"
                    bindlongtap="func"
                    canvas-id="app"
                    class="canvas"></canvas>

                // 微信小程序js里调用
                var $app;

                foo: function () {
                    var context = wx.createCanvasContext('app');

                    $app = new Easycanvas.painter();
                    $app.$dom = context;
                    $app.$paintContext = context;
                    $app.register();

                    $app.on('ticked', function () {
                        context.draw()
                    });
                }

                // 将WXML的func函数传给$app
                func: function (e) {
                    $app.handle(e);
                }
            </code>
        </section>

        <p>后面“基础教程”里提到的API同样在微信小程序适用。</p>
    </article>

`;
