let _ec;

let number = function (opt) {
    let sprite = new _ec.class.sprite(opt);

    sprite.style = opt.style;
    sprite.content.img = opt.number;

    sprite.style.sx = 0;
    sprite.style.sw = sprite.style.sw || opt.number.width;
    sprite.style.sh = Math.floor(sprite.style.sh || (opt.number.height / 10));

    var tick = 0;

    var data = {
        tick: Math.floor((opt.interval || 1000) / 16.6),
        heightRate: 1,
        numberHeight: sprite.style.sh,
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
        sprite.style.sy = data.current * data.heightRate * data.numberHeight;
    };

    sprite.scrollToValue = function (value, time) {
        data.current = value;
        sprite.style.sy = _ec.transition.linear(sprite.$cache.sy, data.current * data.heightRate * data.numberHeight, time || 200);
    };

    sprite.stop = function () {
        data.stop = true;
    };

    sprite.restart = function () {
        data.stop = false;
        data.current = 0;
        sprite.style.sy = 0;
        tick = 0;
    };

    sprite.hooks = {
        ticked () {
            if (data.stop || ++tick <= data.tick) return;
            tick = 1;
            data.current++;

            sprite.style.sy = data.current * data.heightRate * data.numberHeight;
            if (data.current > 9) {
                sprite.style.sy = 0;
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
