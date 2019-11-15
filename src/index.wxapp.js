import Easycanvas from './index';

const cache = {};
const ImgLoader = function (str, callback) {
    if (cache[str]) return cache[str];

    var obj = {
        width: 0,
        height: 0,
    };

    cache[str] = obj;

    wx.getImageInfo({
        src: str,
        success: function (data) {
            obj.width = data.width;
            obj.height = data.height;
            obj.url = data.path;
            if (callback) callback(obj);
        },
    });

    return obj;
};

const onUse = function () {
    Easycanvas.ImgLoader = ImgLoader
};

const onRender = function ($sprite, settings) {
  if ($sprite.img) {
    $sprite.img = $sprite.img.url;
  }
};

var lastX, lastY;
var clickAfterTouchend = false;

const handle = function (e) {
    lastX = e.touches[0] ? e.touches[0].x : lastX;
    lastY = e.touches[0] ? e.touches[0].y : lastY;

    var obj = {
        type: e.type,
        targetTouches: [
            {
                pageX: lastX,
                pageY: lastY,
            }
        ],
        currentTarget: {
            offsetLeft: 0,
            offsetTop: 0,
        },
        preventDefault: function () {}
    };

    clickAfterTouchend = e.type !== 'touchmove' && e.type !== 'longtap';
    this.$eventHandler(obj);

    if (e.type === 'touchend') {
        var obj = {
            type: 'click',
            targetTouches: [
                {
                    pageX: lastX,
                    pageY: lastY,
                }
            ],
            currentTarget: {
                offsetLeft: 0,
                offsetTop: 0,
            },
            preventDefault: function () {
                clickAfterTouchend = false;
            }
        };
        this.$eventHandler(obj);
    }
};

const onCreate = function () {
    this.imgLoader = ImgLoader;
    this.handle = handle;
};

Easycanvas.use({
    onUse,
    onRender,
    onCreate,
});

export default Easycanvas;
