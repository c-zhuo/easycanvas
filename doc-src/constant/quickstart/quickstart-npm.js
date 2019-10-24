export default `
    <article id="npm引入与JSX写法">
        <h1>快速开始</h1>

        <h2>引入并配置Webpack</h2>

        <p>Easycanvas可以通过npm的方式引入。在你的项目目录执行<strong>npm install easycanvas --save</strong>，然后就可以在代码中引入：</p>

        <code>
            import Easycanvas from 'easycanvas';
        </code>

        <p>打包时，会根据<strong>process.env.NODE_ENV</strong>这个环境变量来选择版本。当它不为<strong>production</strong>的时候，都会使用开发版本。开发版本包含一些warnning，并且可以使用Chrome调试插件在运行时进行调试工作。</p>

        <p>如果项目使用了Webpack进行构建打包，可以引入相应的babel-plugin来<strong>使用JSX的语法进行开发</strong>：</p>

        <code>
                // Webpack 4.* 的rules配置如下
                rules: [{
                    test: /\.(js|jsx)$/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: [
                                // 引入Easycanvas提供的babel-plugin
                                'easycanvas/build/babel-plugin'
                            ]
                        }
                    }
                }]
        </code>

        <p>建议在html中引入一个作为入口的js文件，这个入口文件再去引Easycanvas项目的jsx语法的文件。<strong>如果你的项目本身需要使用jsx这个文件格式（例如React项目），为了避免冲突，可以定义其它的文件后缀</strong>，例如.easycanvas等，然后将不同技术栈的组件放入不同格式的文件中</p>

        <h2>创建实例</h2>

        <p>可以用JSX的标签写法来创建Painter实例与Sprite组件，代码的语义性更好。下面是一个例子：</p>

        <section>
            <div class="code-2-demo code-2-demo-jsx bg-demo"></div>
            <code>
                import { Painter, View, Text, Transition } from 'easycanvas';

                const $app = new Painter({
                    el: "#app",
                    width: 400,
                    height: 400
                }).start();

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

        <p>Easycanvas提供了ES模块tree-shaking的支持：当你的只用到了部分组件时，不会将其它组件打包进来。</p>

        <p>这里的Text、View组件是Easycanvas内置的一些基础组件，你也可以参考文档的其它部分来定义自己的组件。</p>

        <p>上面的例子以非JSX的方式可以写成如下形式：</p>

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
                        width: 400,
                        height: 400
                    }).start();

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
                                    click () {
                                        this.style.color = "#00F";
                                    }
                                },
                            });
                        })
                    }));
                </script>
            </code>
        </section>

        <h2>Class写法</h2>

        <p>也可以使用Class的方式来进行组件的封装，例如将上例中的HelloWord封装为一个组件：</p>

        <section>
            <div class="code-2-demo code-2-demo-jsx bg-demo"></div>
            <code>
                import { Painter, View, Text, Transition } from 'easycanvas';

                const $app = new Painter({
                    el: "#app",
                    width: 400,
                    height: 400
                }).start();

                let styleTop = 200;

                class HelloWorld {
                    constructor (props) {
                        const HelloWorld = 'Hello World';
                        const Size = props.fontSize;
                
                        return <View name="root-element">
                            {
                                HelloWorld.split('').map((word, index) => {
                                    return <Text
                                        style={{
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
                                            fontSize: Size
                                        }}
                                        events={{
                                            mousemove: this.changeWordColor
                                        }}
                                    >{word}</Text>
                                })
                            }
                        </View>;
                    }
                
                    changeWordColor () {
                        this.style.color = '#0F0';
                    }
                }

                const $texts = $app.add(<HelloWorld fontSize="30"/>);

            </code>
        </section>

    </article>
`;
