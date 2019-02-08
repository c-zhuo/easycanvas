let _ec;

let number = function (opt) {
    let sprite = new _ec.class.sprite(opt);

    sprite.style = opt.style;
    sprite.content.img = opt.number;

    sprite.style.cutLeft = 0;
    sprite.style.cutWidth = sprite.style.cutWidth || opt.number.width;
    sprite.style.cutHeight = Math.floor(sprite.cutHeight || (opt.number.height / 10));

    var tick = 0;

    var data = {
        tick: Math.floor((opt.interval || 1000) / 16.6),
        heightRate: 1,
        numberHeight: sprite.cutHeight,
        current: 0,
        stop: false,
    };

    sprite.set = function (keys) {
        for (var i in keys) {
            data[i] = keys[i];
        }
    };

    sprite.getCurrentValue = function () {
        return data.current;
    };

    sprite.setCurrentValue = function (value) {
        data.current = value;
        sprite.style.cutTop = data.current * data.heightRate * data.numberHeight;
    };

    sprite.scrollToValue = function (value, time) {
        data.current = value;
        sprite.style.cutTop = _ec.transition.linear(sprite.getStyle('sy'), data.current * data.heightRate * data.numberHeight, time || 200);
    };

    sprite.stop = function () {
        data.stop = true;
    };

    sprite.restart = function () {
        data.stop = false;
        data.current = 0;
        sprite.style.cutTop = 0;
        tick = 0;
    };

    sprite.hooks = {
        ticked () {
            if (data.stop || ++tick <= data.tick) return;
            tick = 1;
            data.current++;

            sprite.style.cutTop = data.current * data.heightRate * data.numberHeight;
            if (data.current > 9) {
                sprite.style.cutTop = 0;
                data.current = 0;
            }
        }
    };

    return sprite;
};

if (window && window.Easycanvas) {
    _ec = window.Easycanvas;
    _ec.class.number = number;
}

module.exports = function (ec) {
    _ec = ec;
    ec.class.number = number;
};
