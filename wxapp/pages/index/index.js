import { ImgLoader, Painter, Transition } from './libs/easycanvas.wxapp.common.prod.js';

const $App = new Painter();

Page({
    data: {
        debug: false,
    },

    onLoad: function () {
        var context = wx.createCanvasContext('app');

        $App.$dom = context;
        $App.$paintContext = context;
        $App.register();

        $App.on('ticked', function () {
            context.draw()
            // var actions = context.getActions();
            // // console.log(actions.length);
            // // debugger;
            // wx.drawCanvas({
            //   canvasId: 'app',
            //   actions: actions
            // });
        });

        wx.getSystemInfo({
            success: function (data) {
                $App.width = data.windowWidth;
                $App.height = data.windowHeight;
            }
        });
        // $App.width = 1250;
        // $App.height = 400;

        $App.start();

        var imgUrl = 'https://raw.githubusercontent.com/c-zhuo/easycanvas/master/demos/G.png';

        var img = ImgLoader('https://raw.githubusercontent.com/c-zhuo/easycanvas/master/demos/G.png');

        var $Box = $App.add({
            style: {
                locate: 'lt',
                left: 0,
                top: 0,
                width: 500,
                height: 500,
            },
        });

        var sprite1 = $Box.add({
            content: {
                img: imgUrl,
            },
            style: {
                width: 250,
                height: 130,
                cutLeft: 0,
                cutTop: 0,
                cutWidth: 200,
                cutHeight: 200,
                top: 80,
                left: Transition.pendulum(111, 222, 2500).loop(),
                rotate: 20,
                locate: 'lt',
                zIndex: 2,
            },
            events: {
                touchmove: function (e) {
                    console.log(11111111);
                    console.log(this, e);
                    this.style.opacity = Math.random() + 0.5;
                },
            },
        });

        var sprite2 = $Box.add({
            content: {
                img: 'https://raw.githubusercontent.com/c-zhuo/easycanvas/master/demos/G.png',
            },
            style: {
                left: 0,
                top: 0,
                width: $App.width,
                height: $App.height,
                opacity: 1,
                locate: 'lt',
                zIndex: 1,
            },
            events: {
                click: function (e) {
                    console.log(22222222);
                    console.log(this, e);
                    this.style.opacity = Math.random() + 0.5;
                },
            },
        });

        for (var i = 0; i < 5; i++) {
            $App.add({
                content: {
                    img: img,
                },
                style: {
                    width: 50,
                    height: 50,
                    left: Transition.pendulum(Math.random() * 100, Math.random() * 800, Math.random() * 1000 + 1500).loop(),
                    top: Transition.pendulum(Math.random() * 100, Math.random() * 800, Math.random() * 1000 + 1500).loop(),
                    zIndex: 10 + Math.random(),
                },
            });
        }
    },

    //事件处理函数
    func: function (e) {
        $App.handle(e);
    },
})
