export default `
    <article id="在微信小游戏环境使用">
        <h1>快速开始</h1>

        <h2>在微信小游戏中引入</h2>

        <p>在微信小游戏入口文件引入以下文件，即可使用Easycanvas。</p>

        <p><strong>注意：目前只能引入prod版本，不支持开发者工具</strong>，未来版本将支持引入开发版进行调试。</p>

        <code>
            // 注意先引入Wxgame，后引入Easycanvas
            import Easycanvas from './your-path/easycanvas.wxgame.common.prod.js'

            // 如果要使用其它插件（例如扩展物理效果），放在Easycanvas后加载即可
            import Physics from './your-path/plugin.physics.common.prod.js'

            Easycanvas.extend(Physics);
        </code>

        <p>这里的js文件可以在<a href="https://github.com/c-zhuo/easycanvas/tree/master/build" target="_blank">这里</a>找到。</p>

        <h2>创建实例</h2>

        <p>如下例，只需要20行代码，可以在微信小游戏中绘制一个运动的图片。</p>

        <section>
            <code>
                var $app = new Easycanvas.Painter();
                $app.register(canvas);

                var $letterG = new Easycanvas.Sprite({
                    content: {
                        img: 'https://raw.githubusercontent.com/c-zhuo/easycanvas/master/demos/G.png',
                    },
                    style: {
                        width: 50,
                        height: 50,
                        left: Easycanvas.Transition.pendulum(50, 150, 3000).loop(),
                        top: 100,
                    },
                    events: {
                        click: function (e) {
                            this.style.width = 100;
                            return true;
                        },
                    },
                });

                $app.add($letterG);
                $app.start();
            </code>
        </section>

        <p>可以看到，写法上与Easycanvas在浏览器中的使用完全没有区别。<strong>唯一不同的是，微信小游戏提供了全局的canvas对象，因此调用register时可以直接传入canvas</strong>。可以通过一些代码抹平浏览器端和微信小游戏端的差异，这样你的js可以同时在小程序和浏览器中运行，例如：</p>

        <section>
            <code>
                var $app = new Easycanvas.Painter();
                $app.register(typeof wx !== 'undefined' ? canvas : document.getElementById('app'));
            </code>
        </section>

        <p class="tip">Tips：不建议额外引入微信提供的adaptor，可能会引起一些问题。Easycanvas提供的插件中，Physics插件可以在微信小游戏中运行，但其它插件可能存在一些问题（未经测试），欢迎反馈。</p>

        <p>后面“基础教程”里提到的API同样在微信小游戏适用。</p>
    </article>

`;
