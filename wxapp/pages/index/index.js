import Easycanvas from './libs/easycanvas.standalone.prod.js';

const app = getApp();

const plugin = {
    onRender: function ($sprite, settings) {
      if ($sprite.props[0]) {
        $sprite.props[0] = $sprite.props[0].url;
      }
    },
};

Easycanvas.use(plugin);

var $App;

Page({
  data: {
    debug: false,
  },

  onShow: function () {
    var context = wx.createCanvasContext('app');
    console.log(context);
    console.log(Easycanvas);

    console.log(context.fillRect);

    $App = new Easycanvas.painter();
    $App.$dom = context;
    $App.$paintContext = context;
    $App.register();

    $App.on('ticked', function () {
      var actions = context.getActions();
      wx.drawCanvas({
        canvasId: 'app',
        actions: actions
      });
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

    var cache = {};
    $App.imgLoader = Easycanvas.imgLoader = function (str, callback) {
      if (cache[str]) return cache[str];

      var obj = {
        width: 0,
        height: 0,
      };

      cache[str] = obj;

      wx.getImageInfo({
        src: str,
        success: function (data) {
          console.log(data);
          obj.width = data.width;
          obj.height = data.height;
          obj.url = data.path;
          if (callback) callback(obj);
        },
      });

      return obj;
    };

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
        maxScrollY: 100,
      },
    });

    // Easycanvas.imgLoader('https://raw.githubusercontent.com/chenzhuo1992/easycanvas/master/demos/G.png', function (img) {
        var sprite1 = $Box.add({
            content: {
                img: imgUrl,
            },
            style: {
                tw: 250, th: 130,
                sx: 0, sy: 0, // source position, default 0
                sw: 200, sh: 200,
                tx: Easycanvas.transition.pendulum(111, 222, 2500).loop(),
                ty: 80,
                rotate: 20,
                locate: 'lt', // default center
                zIndex: 1,
            },
            events: {
                eIndex: 2,
                mousemove: function (e) {
                    console.log(this, e);
                },
            },
        });

        var sprite2 = $App.add({
            content: {
                img: img,
            },
            style: {
                tw: 250, th: 130,
                sx: 0, sy: 0,
                sw: 200, sh: 200,
                tx: Easycanvas.transition.pendulum(111, 155, 2500).loop(),
                ty: Easycanvas.transition.pendulum(111, 155, 2500).loop(),
                opacity: 0.5,
                locate: 'lt',
                zIndex: 2,
            },
            hooks: {
              ticked () {
                var actions = context.getActions();
                wx.drawCanvas({
                  canvasId: 'app',
                  actions: actions
                });
              }
            },
            events: {
                eIndex: 2, // event-index of this image
                mousemove: function (e) {
                    // "this" means this sprite, as sprite1
                    console.log(this, e);
                },
                // others: mousehold, mousedown, mouseout and touch events
            },
        });
  },

  //事件处理函数
  func: function (e) {
    console.log($App, e);
    debugger;
  },
})
