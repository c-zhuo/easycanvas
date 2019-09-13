(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{441:function(n,e,t){"use strict";t.r(e);e["default"]='\n    \n    <article id="npm引入与JSX写法">\n        <h1>快速开始</h1>\n\n        <h2>引入并配置Webpack</h2>\n\n        <p>Easycanvas可以通过npm的方式引入。在你的项目目录执行<strong>npm install easycanvas --save</strong>，然后就可以在代码中引入：</p>\n\n        <code>\n            import Easycanvas from \'easycanvas\';\n        </code>\n\n        <p>打包时，会根据<strong>process.env.NODE_ENV</strong>这个环境变量来选择版本。当它不为<strong>production</strong>的时候，都会使用开发版本。开发版本包含一些warnning，并且可以使用Chrome调试插件在运行时进行调试工作。</p>\n\n        <p>如果项目使用了Webpack进行构建打包，可以引入相应的babel-plugin来<strong>使用JSX的语法进行开发</strong>：</p>\n\n        <code>\n                // Webpack 4.* 的rules配置如下\n                rules: [{\n                    test: /.(js|jsx)$/,\n                    use: {\n                        loader: "babel-loader",\n                        options: {\n                            presets: [\'@babel/preset-env\'],\n                            plugins: [\n                                // 引入Easycanvas提供的babel-plugin\n                                \'easycanvas/build/babel-plugin\'\n                            ]\n                        }\n                    }\n                }]\n        </code>\n\n        <p>建议在html中引入一个作为入口的js文件，这个入口文件再去引Easycanvas项目的jsx语法的文件。<strong>如果你的项目本身需要使用jsx这个文件格式（例如React项目），为了避免冲突，可以定义其它的文件后缀</strong>，例如.easycanvas等，然后将不同技术栈的组件放入不同格式的文件中</p>\n\n        <h2>创建实例</h2>\n\n        <p>可以用JSX的标签写法来创建Painter实例与Sprite组件，代码的语义性更好。下面是一个例子：</p>\n\n        <section>\n            <div class="code-2-demo code-2-demo-jsx bg-demo"></div>\n            <code>\n                import { Painter, View, Text, Transition } from \'easycanvas\';\n\n                const $app = new Painter({\n                    el: "#app",\n                    width: 400,\n                    height: 400\n                }).start();\n\n                let styleTop = 200;\n\n                const $texts = $app.add(\n                    <View>\n                        {\n                            \'HelloWorld\'.split(\'\').map((word, index) => {\n                                return <Text\n                                    style={{\n                                        left: 50 + 30 * index,\n                                        top: Transition.pendulum(120, 240, 3000, {\n                                            start: index * 60\n                                        }).loop(),\n                                        rotate: Transition.pendulum(-20, 20, 3000, {\n                                            start: index * 60\n                                        }).loop(),\n                                        width: 30,\n                                        height: 30,\n                                        color: \'#F00\',\n                                        locate: \'lt\',\n                                        fontSize: 30,\n                                    }}\n                                    events={{\n                                        mousemove () {\n                                            this.style.color = \'#00F\';\n                                        }\n                                    }}\n                                >{word}</Text>\n                            })\n                        }\n                    </View>\n                )\n            </code>\n        </section>\n\n        <p>Easycanvas提供了ES模块tree-shaking的支持：当你的只用到了部分组件时，不会将其它组件打包进来。</p>\n\n        <p>这里的Text、View组件是Easycanvas内置的一些基础组件，你也可以参考文档的其它部分来定义自己的组件。</p>\n\n        <p>上面的例子以非JSX的方式可以写成如下形式：</p>\n\n        <section>\n            <div class="code-2-demo code-2-demo-jsx bg-demo"></div>\n            <code>\n                <body>\n                    <canvas id="app"></canvas>\n                </body>\n\n                <script>\n                    const { Painter, Sprite, Transition } = Easycanvas;\n\n                    const $app = new Painter({\n                        el: "#app",\n                        width: 400,\n                        height: 400\n                    }).start();\n\n                    let styleTop = 200;\n\n                    const $texts = $app.add(new Sprite({\n                        children: "HelloWorld".split("").map(function (word, index) {\n                            return new Sprite({\n                                content: {\n                                    text: word\n                                },\n                                style: {\n                                    left: 50 + 30 * index,\n                                    top: Transition.pendulum(120, 240, 3000, {\n                                        start: index * 60\n                                    }).loop(),\n                                    rotate: Transition.pendulum(-20, 20, 3000, {\n                                        start: index * 60\n                                    }).loop(),\n                                    width: 50,\n                                    height: 50,\n                                    color: "#F00",\n                                    locate: "lt",\n                                    fontSize: 30\n                                },\n                                events: {\n                                    click: () => {\n                                        this.style.color = "#00F";\n                                    }\n                                },\n                            });\n                        })\n                    }));\n                <\/script>\n            </code>\n        </section>\n\n        <h2>Class写法</h2>\n\n        <p>也可以使用Class的方式来进行组件的封装，例如将上例中的HelloWord封装为一个组件：</p>\n\n        <section>\n            <div class="code-2-demo code-2-demo-jsx bg-demo"></div>\n            <code>\n                import { Painter, View, Text, Transition } from \'easycanvas\';\n\n                const $app = new Painter({\n                    el: "#app",\n                    width: 400,\n                    height: 400\n                }).start();\n\n                let styleTop = 200;\n\n                class HelloWorld {\n                    constructor (props) {\n                        const HelloWorld = \'Hello World\';\n                        const Size = props.fontSize;\n                \n                        return <View name="root-element">\n                            {\n                                HelloWorld.split(\'\').map((word, index) => {\n                                    return <Text\n                                        style={{\n                                            left: 50 + 30 * index,\n                                            top: Transition.pendulum(120, 240, 3000, {\n                                                start: index * 60\n                                            }).loop(),\n                                            rotate: Transition.pendulum(-20, 20, 3000, {\n                                                start: index * 60\n                                            }).loop(),\n                                            width: 50,\n                                            height: 50,\n                                            color: "#F00",\n                                            locate: "lt",\n                                            fontSize: Size\n                                        }}\n                                        events={{\n                                            mousemove: this.changeWordColor\n                                        }}\n                                    >{word}</Text>\n                                })\n                            }\n                        </View>;\n                    }\n                \n                    changeWordColor () {\n                        this.style.color = \'#0F0\';\n                    }\n                }\n\n                const $texts = $app.add(<HelloWorld fontSize="30"/>);\n\n            </code>\n        </section>\n\n    </article>\n\n    \n    <article id="通过脚手架创建工程">\n        <h1>安装</h1>\n\n        <h2>通过npm安装脚手架</h2>\n\n        <p>全局安装可能需要sudo权限：</p>\n\n        <code>\n            sudo npm install -g easycanvas-gen\n        </code>\n\n        <p>安装完成后，调用create-easycanvas即可在当前目录下创建一个子目录作为工程：</p>\n\n        <code>\n            create-easycanvas\n        </code>\n    </article>\n\n    \n    <article id="浏览器中引入">\n        <h1>快速开始</h1>\n\n        <h2>在浏览器中引入</h2>\n\n        <p>Easycanvas支持通过script标签的方式引入。dev版本可以配合Chrome插件进行一些调试，并包含一些warnning信息。</p>\n\n        <code>\n            \x3c!-- 开发版本 --\x3e\n            <script src="http://your-path/easycanvas.standalone.dev.js"><\/script>\n\n            \x3c!-- 生产版本 --\x3e\n            <script src="http://your-path/easycanvas.standalone.prod.js"><\/script>\n\n            \x3c!-- 如果你只是想快速尝试demo --\x3e\n            <script src="https://c-zhuo.github.io/easycanvas/lib/easycanvas/easycanvas.standalone.prod.js"><\/script>\n        </code>\n\n        <p>这两个js文件可以在<a href="https://github.com/c-zhuo/easycanvas/tree/master/build" target="_blank">这里</a>找到。</p>\n\n        <p class="tip">Tips：如果你的项目是使用Webpack进行构建打包的，可以使用JSX的语法进行开发，详见左侧“npm包方式引入”。</p>\n\n        <h2>创建实例</h2>\n\n        <p>如下例，只需要30行代码，可以在canvas上绘制一个运动的图片。点击蓝色的小按钮可以立即查看效果。</p>\n\n        <section>\n            <div class="code-2-demo bg-demo"></div>\n            <code>\n                <body>\n                    <canvas id="app"></canvas>\n                    <p>点击字母G可以改变尺寸</p>\n                </body>\n\n                <script>\n                    var $app = new Easycanvas.Painter({\n                        el: \'#app\',\n                        width: 400,\n                        height: 400\n                    });\n\n                    var $letterG = new Easycanvas.Sprite({\n                        content: {\n                            img: \'https://raw.githubusercontent.com/c-zhuo/easycanvas/master/demos/G.png\',\n                        },\n                        style: {\n                            left: Easycanvas.Transition.pendulum(50, 150, 3000).loop(),\n                            top: 100,\n                            width: 50,\n                            height: 50,\n                        },\n                        events: {\n                            click: function (e) {\n                                this.style.width = 100;\n                            },\n                        },\n                    });\n\n                    $app.add($letterG);\n                    $app.start();\n                <\/script>\n            </code>\n        </section>\n\n        <p>其中，<strong>new Easycanvas.Painter()</strong>创建了一个新的Easycanvas实例，包含需要绘制的元素的树形结构、事件监听函数等属性。可以在注册时传入el、width、height等属性，来指定实例绑定的canvas对象及尺寸。</p>\n\n        <p class="tip">Tips：这里的尺寸其实是canvas包含的像素的尺寸。默认情况下，如果一个canvas画布的宽为400个像素，那么它在网页中渲染的宽也是400像素。但是我们可以通过style样式来指定渲染的实际宽度。这点和img标签相似：当css样式的尺寸大于图片文件的尺寸时，会因为拉伸而变得模糊。</p>\n\n        <p>接下来的<strong>new Easycanvas.Sprite</strong>创建了一个新的Sprite（精灵）对象。在这个例子中，我们向Sprite填充一个图片（G.png），设置它的宽高都为50、y坐标为100。x坐标传入了一个Easycanvas提供的<strong>transition</strong>过渡：以50和150为端点进行钟摆变化。</p>\n\n        <p>我们可以在events参数中指定一些事件监听函数，例如当点击了这个元素时，我们修改当前Sprite的宽为100.</p>\n\n        <p>后面将对painter类和Sprite类的各个参数进行介绍和演示。</p>\n\n        <p class="tip">Tips：在0.8.0之前的版本中，用tx、ty、tw、th四个参数作为left、top、width、height。</p>\n    </article>\n\n\n    \n    <article id="在微信小游戏环境使用">\n        <h1>快速开始</h1>\n\n        <h2>在微信小游戏中引入</h2>\n\n        <p>在微信小游戏入口文件引入以下文件，即可使用Easycanvas。</p>\n\n        <p><strong>注意：目前只能引入prod版本，不支持开发者工具</strong>，未来版本将支持引入开发版进行调试。</p>\n\n        <code>\n            // 注意先引入Wxgame，后引入Easycanvas\n            import Easycanvas from \'./your-path/easycanvas.wxgame.common.prod.js\'\n\n            // 如果要使用其它插件（例如扩展物理效果），放在Easycanvas后加载即可\n            import Physics from \'./your-path/plugin.physics.common.prod.js\'\n\n            Easycanvas.extend(Physics);\n        </code>\n\n        <p>这里的js文件可以在<a href="https://github.com/c-zhuo/easycanvas/tree/master/build" target="_blank">这里</a>找到。</p>\n\n        <h2>创建实例</h2>\n\n        <p>如下例，只需要20行代码，可以在微信小游戏中绘制一个运动的图片。</p>\n\n        <section>\n            <code>\n                var $app = new Easycanvas.Painter();\n                $app.register(canvas);\n\n                var $letterG = new Easycanvas.Sprite({\n                    content: {\n                        img: \'https://raw.githubusercontent.com/c-zhuo/easycanvas/master/demos/G.png\',\n                    },\n                    style: {\n                        width: 50,\n                        height: 50,\n                        left: Easycanvas.Transition.pendulum(50, 150, 3000).loop(),\n                        top: 100,\n                    },\n                    events: {\n                        click: function (e) {\n                            this.style.width = 100;\n                            return true;\n                        },\n                    },\n                });\n\n                $app.add($letterG);\n                $app.start();\n            </code>\n        </section>\n\n        <p>可以看到，写法上与Easycanvas在浏览器中的使用完全没有区别。<strong>唯一不同的是，微信小游戏提供了全局的canvas对象，因此调用register时可以直接传入canvas</strong>。可以通过一些代码抹平浏览器端和微信小游戏端的差异，这样你的js可以同时在小程序和浏览器中运行，例如：</p>\n\n        <section>\n            <code>\n                var $app = new Easycanvas.Painter();\n                $app.register(typeof wx !== \'undefined\' ? canvas : document.getElementById(\'app\'));\n            </code>\n        </section>\n\n        <p class="tip">Tips：不建议额外引入微信提供的adaptor，可能会引起一些问题。Easycanvas提供的插件中，Physics插件可以在微信小游戏中运行，但其它插件可能存在一些问题（未经测试），欢迎反馈。</p>\n\n        <p>后面“基础教程”里提到的API同样在微信小游戏适用。</p>\n    </article>\n\n\n    \n    <article id="在微信小程序环境使用">\n        <h1>快速开始</h1>\n\n        <h2>在微信小程序中引入</h2>\n\n        <p>在微信小程序入口文件引入以下文件，即可使用Easycanvas。</p>\n\n        <p><strong>注意：目前只能引入prod版本，不支持开发者工具</strong>，未来版本将支持引入开发版进行调试。</p>\n\n        <code>\n            import { Painter, ImgLoader, Transition } from \'./your-path/easycanvas.wxapp.common.prod.js\';\n        </code>\n\n        <p>这里的js文件可以在<a href="https://github.com/c-zhuo/easycanvas/tree/master/build" target="_blank">这里</a>找到。</p>\n\n        <h2>创建实例</h2>\n\n        <p>下例可以在微信小程序中创建一个空实例：</p>\n\n        <section>\n            <code>\n                // 微信小程序WXML里的canvas标签\n                <canvas\n                    style="width: 100vw; height: 400px;" \n                    bindtouchstart="func"\n                    bindtouchmove="func"\n                    bindtouchend="func"\n                    bindtouchcancel="func"\n                    bindlongtap="func"\n                    canvas-id="app"\n                    class="canvas"></canvas>\n\n                // 微信小程序js里调用\n                var $app;\n\n                foo: function () {\n                    var context = wx.createCanvasContext(\'app\');\n\n                    $app = new Painter();\n                    $app.$dom = context;\n                    $app.$paintContext = context;\n                    $app.register();\n\n                    $app.on(\'ticked\', function () {\n                        context.draw()\n                    });\n                }\n\n                // 将WXML的func函数传给$app\n                func: function (e) {\n                    $app.handle(e);\n                }\n            </code>\n        </section>\n\n        <p>后面“基础教程”里提到的API同样在微信小程序适用。</p>\n    </article>\n\n\n'}}]);