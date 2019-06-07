module.exports = `
    <article id="npm包方式引入">
        <h1>快速开始</h1>

        <h2>引入并配置Webpack</h2>

        <p>Easycanvas可以通过npm的方式引入。在你的项目目录执行<strong>npm install easycanvas --save</strong>，然后就可以在代码中引入：</p>

        <code>
            import Easycanvas from 'easycanvas';
        </code>

        <p>打包时，会根据<strong>process.env.NODE_ENV</strong>这个环境变量来选择版本。当它不为<strong>production</strong>的时候，都会使用开发版本。开发版本包含一些warnning，并且可以使用Chrome调试插件在运行时进行调试工作。</p>

        <p>如果项目使用了Webpack进行构建打包，可以引入相应的Loader来使用JSX的语法进行开发。如果你的项目也用到了Babel，需要将这个Loader放在Babel转换之前调用。由于Webpack的Loader是从后向前依次执行，所以需要书写在Babel后面：</p>

        <code>
                // Webpack 4.* 的rules配置如下
                rules: [{
                    test: /\.js$/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                }, {
                    test: /\.jsx$/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env']
                            }
                        },
                        { loader: 'easycanvas/build/loader' }
                    ]
                }]
        </code>

        <p>建议在html中引入一个作为入口的js文件，这个入口文件再去引Easycanvas项目的jsx语法的文件。<strong>如果你的项目本身需要使用jsx，为了避免冲突，可以换成其它的文件后缀</strong>，例如<strong>.ec</strong>。</p>

        <h2>创建实例</h2>

        <p>这样，可以用JSX的标签写法来创建Painter实例与Sprite组件，代码的语义性更好。下面是一个例子：</p>

        <section>
            <div class="code-2-demo code-2-demo-jsx bg-demo"></div>
            <code>
                import { Painter, View, Text, Transition } from 'easycanvas';

                const $app = new Painter({
                    el: "#app",
                    width: "400",
                    height: "400"
                }).start();;

                let styleTop = 200;

                const $texts = $app.add(
                    <View>
                        {
                            'HelloWorld'.split('').map((word, index) => {
                                return <Text
                                    style={{
                                        left: 50 + 30 * index,
                                        top: Transition.pendulum(120, 240, 3000, {
                                            start: index * 60
                                        }).loop(),
                                        rotate: Transition.pendulum(-20, 20, 3000, {
                                            start: index * 60
                                        }).loop(),
                                        width: 30,
                                        height: 30,
                                        color: '#F00',
                                        locate: 'lt',
                                        fontSize: 30,
                                    }}
                                    events={{
                                        mousemove () {
                                            this.style.color = '#00F';
                                        }
                                    }}
                                >{word}</Text>
                            })
                        }
                    </View>
                )
            </code>
        </section>

        <p>Easycanvas提供了ES模块tree-shaking的支持：当你的只用到了部分组件时，不会将其它组件也打包进来。</p>

        <p>这里的Text、View组件是Easycanvas内置的一些基础组件，你也可以参考文档的其它部分来定义自己的组件。</p>

        <p>上面的例子等同于：</p>

        <section>
            <div class="code-2-demo bg-demo"></div>
            <code>
                <body>
                    <canvas id="app"></canvas>
                </body>

                <script>
                    const { Painter, Sprite, Transition } = Easycanvas;

                    const $app = new Painter({
                        el: "#app",
                        width: "400",
                        height: "400"
                    }).start();;

                    let styleTop = 200;

                    const $texts = $app.add(new Sprite({
                        children: "HelloWorld".split("").map(function (word, index) {
                            return new Sprite({
                                content: {
                                    text: word
                                },
                                style: {
                                    left: 50 + 30 * index,
                                    top: Transition.pendulum(120, 240, 3000, {
                                        start: index * 60
                                    }).loop(),
                                    rotate: Transition.pendulum(-20, 20, 3000, {
                                        start: index * 60
                                    }).loop(),
                                    width: 50,
                                    height: 50,
                                    color: "#F00",
                                    locate: "lt",
                                    fontSize: 30
                                },
                                events: {
                                    click: () => {
                                        this.style.color = "#00F";
                                    }
                                },
                            });
                        })
                    }));
                </script>
            </code>
        </section>

    </article>
`;
