export default `
    <article id="浏览器中引入">
        <h1>快速开始</h1>

        <h2>在浏览器中引入</h2>

        <p>Easycanvas支持通过script标签的方式引入。dev版本可以配合Chrome插件进行一些调试，并包含一些warnning信息。</p>

        <code>
            <!-- 开发版本 -->
            <script src="http://your-path/easycanvas.standalone.dev.js"></script>

            <!-- 生产版本 -->
            <script src="http://your-path/easycanvas.standalone.prod.js"></script>

            <!-- 如果你只是想快速尝试demo -->
            <script src="https://c-zhuo.github.io/easycanvas/lib/easycanvas/easycanvas.standalone.prod.js"></script>
        </code>

        <p>这两个js文件可以在<a href="https://github.com/c-zhuo/easycanvas/tree/master/build" target="_blank">这里</a>找到。</p>

        <p class="tip">Tips：如果你的项目是使用Webpack进行构建打包的，可以使用JSX的语法进行开发，详见左侧“npm包方式引入”。</p>

        <h2>创建实例</h2>

        <p>如下例，只需要30行代码，可以在canvas上绘制一个运动的图片。点击蓝色的小按钮可以立即查看效果。</p>

        <section>
            <div class="code-2-demo bg-demo"></div>
            <code>
                <body>
                    <canvas id="app"></canvas>
                    <p>点击字母G可以改变尺寸</p>
                </body>

                <script>
                    var $app = new Easycanvas.Painter({
                        el: '#app',
                        width: 400,
                        height: 400
                    });

                    var $letterG = new Easycanvas.Sprite({
                        content: {
                            img: 'https://raw.githubusercontent.com/c-zhuo/easycanvas/master/demos/G.png',
                        },
                        style: {
                            left: Easycanvas.Transition.pendulum(50, 150, 3000).loop(),
                            top: 100,
                            width: 50,
                            height: 50,
                        },
                        events: {
                            click: function (e) {
                                this.style.width = 100;
                            },
                        },
                    });

                    $app.add($letterG);
                    $app.start();
                </script>
            </code>
        </section>

        <p>其中，<strong>new Easycanvas.Painter()</strong>创建了一个新的Easycanvas实例，包含需要绘制的元素的树形结构、事件监听函数等属性。可以在注册时传入el、width、height等属性，来指定实例绑定的canvas对象及尺寸。</p>

        <p class="tip">Tips：这里的尺寸其实是canvas包含的像素的尺寸。默认情况下，如果一个canvas画布的宽为400个像素，那么它在网页中渲染的宽也是400像素。但是我们可以通过style样式来指定渲染的实际宽度。这点和img标签相似：当css样式的尺寸大于图片文件的尺寸时，会因为拉伸而变得模糊。</p>

        <p>接下来的<strong>new Easycanvas.Sprite</strong>创建了一个新的Sprite（精灵）对象。在这个例子中，我们向Sprite填充一个图片（G.png），设置它的宽高都为50、y坐标为100。x坐标传入了一个Easycanvas提供的<strong>transition</strong>过渡：以50和150为端点进行钟摆变化。</p>

        <p>我们可以在events参数中指定一些事件监听函数，例如当点击了这个元素时，我们修改当前Sprite的宽为100.</p>

        <p>后面将对painter类和Sprite类的各个参数进行介绍和演示。</p>

        <p class="tip">Tips：在0.8.0之前的版本中，用tx、ty、tw、th四个参数作为left、top、width、height。</p>
    </article>

`;
