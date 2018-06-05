module.exports = `
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

        <h2>创建实例</h2>

        <p>如下例，只需要30行代码，可以在canvas上绘制一个运动的图片。点击“小齿轮”可以立即查看效果。</p>

        <section>
            <div class="code-2-demo bg-demo"></div>
            <code>
                <body>
                    <canvas id="app"></canvas>
                    <p>点击字母G可以改变尺寸</p>
                </body>

                <script>
                    var $app = new Easycanvas.painter({
                        el: '#app',
                        width: 400,
                        height: 400
                    });

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
                </script>
            </code>
        </section>

        <p>其中，<strong>new Easycanvas.painter()</strong>创建了一个新的Easycanvas实例，包含需要绘制的元素的树形结构、事件监听函数等属性。可以在注册时传入el、width、height等属性，来指定实例绑定的canvas对象及尺寸。</p>

        <p class="tip">Tips：这里的尺寸其实是canvas包含的像素的尺寸。默认情况下，如果一个canvas画布的宽为400个像素，那么它在网页中渲染的宽也是400像素。但是我们可以通过style样式来指定渲染的实际宽度。这点和img标签相似：当css样式的尺寸大于图片文件的尺寸时，会因为拉伸而变得模糊。</p>

        <p>接下来的<strong>new Easycanvas.sprite</strong>创建了一个新的sprite（精灵）对象。在这个例子中，我们向sprite填充一个图片（G.png），设置它的宽高都为50、y坐标为100。x坐标传入了一个Easycanvas提供的<strong>transition</strong>过渡：以50和150为端点进行钟摆变化。</p>

        <p>我们可以在events参数中指定一些事件监听函数，例如当点击了这个元素时，我们修改当前sprite的宽为100.</p>

        <p>后面将对painter类和sprite类的各个参数进行介绍和演示。</p>
    </article>

`;
