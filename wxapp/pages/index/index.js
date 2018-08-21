import Easycanvas from './libs/easycanvas.standalone.prod.js';
import EasycanvasWxapp from './libs/plugin.wxapp.standalone.prod.js';
Easycanvas.use(EasycanvasWxapp);

const app = getApp();

var $App;

Page({
  data: {
    debug: false,
  },

  onLoad: function () {
    var context = wx.createCanvasContext('app');

    $App = new Easycanvas.painter();
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

    var imgUrl = 'https://raw.githubusercontent.com/chenzhuo1992/easycanvas/master/demos/G.png';

    var img = Easycanvas.imgLoader('https://raw.githubusercontent.com/chenzhuo1992/easycanvas/master/demos/G.png');

    var $Box = $App.add({
      style: {
        locate: 'lt',
        tx: 0,
        ty: 0,
        tw: 500,
        th: 500,
      },
      scroll: {
        scrollable: true,
        minScrollY: 0,
        maxScrollY: 400,
        minScrollX: 0,
        maxScrollX: 0,
      },
    });

    // Easycanvas.imgLoader('https://raw.githubusercontent.com/chenzhuo1992/easycanvas/master/demos/G.png', function (img) {
        var sprite1 = $Box.add({
            content: {
                img: imgUrl,
            },
            style: {
                tw: 250, th: 130,
                sx: 0, sy: 0,
                sw: 200, sh: 200,
                tx: Easycanvas.transition.pendulum(111, 222, 2500).loop(),
                ty: 80,
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
                img: 'https://raw.githubusercontent.com/chenzhuo1992/easycanvas/master/demos/G.png',
            },
            style: {
                tw: $App.width, th: $App.height,
                tx: 0, ty: 0,
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

        for (var i = 0; i < 0; i++) {
          $App.add({
              content: {
                  img: img,
              },
              style: {
                  tw: 50, th: 50,
                  tx: Easycanvas.transition.pendulum(Math.random() * 100, Math.random() * 800, Math.random() * 1000 + 1500).loop(),
                  ty: Easycanvas.transition.pendulum(Math.random() * 100, Math.random() * 800, Math.random() * 1000 + 1500).loop(),
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
