module.exports = `
    <article id="支持JSX写法">
        <h1>快速开始</h1>

        <h2>引入并配置Webpack</h2>

        <p>Easycanvas提供了一个用于将JSX语法转换为JS语法的Webpack Loader。如果你的项目也用到了Babel，需要将这个Loader放在Babel转换之前使用。由于Webpack的Loader是从后向前依次执行，所以需要书写在Babel后面：</p>

        <code>
                import EasycanvasJSXLoader from 'easycanvas/build/loader.js';

                // Webpack 1.* Config Demo
                loaders: [{
                    test: /\.js$/,
                    loader: 'babel',
                }, {
                    test: /\.jsx$/,
                    loaders: ['babel', EasycanvasJSXLoader]
                }]

                // Webpack 4.* Config Demo
                rules: [{
                    test: /\.jsx$/,
                    use: [
                        { loader: 'babel' },
                        { loader: EasycanvasJSXLoader }
                    ]
                }]
        </code>

        <p>建议在html中引入一个作为入口的js文件，这个入口文件再去引Easycanvas项目的jsx语法的文件。<strong>如果你的项目本身需要使用jsx，为了避免冲突，可以换成其它的文件后缀</strong>，例如<strong>.ec</strong>。</p>

        <h2>创建实例</h2>

        <p>这样，可以用JSX的标签写法来创建Painter实例与Sprite组件，代码的语义性更好。下面是一个例子：</p>

        <section>
            <div class="code-2-demo code-2-demo-jsx bg-demo"></div>
            <code>
                import { View, Image, Text } from 'easycanvas';

                const $app = new Easycanvas.painter({
                    el: "#app",
                    width: "400",
                    height: "400"
                });

                let styleTop = 200;

                const $root = $app.add(
                    <View>
                        <Image
                            src="https://raw.githubusercontent.com/c-zhuo/easycanvas/master/demos/G.png"
                            style={{
                                left: Easycanvas.transition.ease(100, 200, 1500).loop(),
                                top: styleTop,
                                width: 150,
                                height: Easycanvas.transition.ease(200, 100, 1500).loop(),
                            }}
                            events={{
                                click: function (e) {
                                    alert('clicked');
                                },
                            }}
                        />
                        <Text style={{
                            left: Easycanvas.transition.ease(0, 100, 2500).loop(),
                            top: 0,
                            width: 240,
                            color: "#F00",
                            locate: "lt",
                            fontSize: 40,
                        }}>这里是一段多行文本abcdefg</Text>
                    </View>
                )

                setInterval(() => {
                    styleTop += 10;
                    if (styleTop > 400) styleTop = 200;
                }, 300);

                $app.start();
            </code>
        </section>

        <p>这里的Text等组件是Easycanvas内置的一些基础组件，你也可以参考文档的其它部分来定义自己的组件。</p>
    </article>

`;
