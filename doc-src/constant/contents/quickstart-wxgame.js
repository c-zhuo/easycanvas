module.exports = `
    <article id="快速开始（微信小游戏环境）">
        <h1>快速开始</h1>

        <h2>如何引入</h2>

        <p>在微信小游戏入口文件引入以下两个文件，即可使用Easycanvas。</p>

        <p><strong>注意：目前只能引入prod版本，不支持开发者工具</strong>，未来版本将支持引入开发版进行调试。</p>

        <code>
            // 注意先引入Wxgame，后引入Easycanvas
            import Wxgame from './source/libs/plugin.wxgame.standalone.prod.js'
            import Easycanvas from './source/libs/easycanvas.standalone.prod.js'

            // 如果要使用其它插件（例如扩展物理效果），放在Easycanvas后加载即可
            import Physics from './source/libs/plugin.physics.standalone.prod.js'
        </code>

        <p>这里的js文件可以在<a href="https://github.com/chenzhuo1992/easycanvas/tree/master/build" target="_blank">这里</a>找到。</p>

        <h2>创建实例</h2>

        <p>如下例，只需要20行代码，可以在微信小游戏中绘制一个运动的图片。</p>

        <section>
            <code>
                var $app = new Easycanvas.painter();
                $app.register(canvas);

                var $letterG = new Easycanvas.sprite({
                    content: {
                        img: 'https://raw.githubusercontent.com/chenzhuo1992/easycanvas/master/demos/G.png',
                    },
                    style: {
                        tw: 50,
                        th: 50,
                        tx: Easycanvas.transition.pendulum(50, 150, 3000).loop(),
                        ty: 100,
                    },
                    events: {
                        click: function (e) {
                            this.style.tw = 100;
                            return true;
                        },
                    },
                });

                $app.add($letterG);
                $app.start();
            </code>
        </section>

        <p>可以看到，写法上与Easycanvas在浏览器中的使用完全没有区别。<strong>唯一不同的是，微信小游戏提供了全局的canvas对象，因此调用register时可以直接传入canvas</strong>。可以通过一些代码抹平浏览器端和微信小游戏端的差异，例如：</p>

        <section>
            <code>
                var $app = new Easycanvas.painter();
                $app.register(typeof wx !== 'undefined' ? canvas : document.getElementById('app'));
            </code>
        </section>

        <p class="tip">Tips：不建议额外引入微信提供的adaptor，可能会引起一些问题。Easycanvas提供的插件中，Physics插件可以在微信小游戏中运行，但其它插件可能存在一些问题（未经测试），欢迎反馈。</p>

        <p>后面“基础教程”里提到的API同样在微信小游戏适用。</p>

    </article>

`;
