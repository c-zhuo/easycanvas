
import utils from 'utils/utils.js';
import mathPointRotate from 'utils/math.point-rotate.js';

const or = utils.firstValuable;

let _ec;

let shuttle = function (opt) {
	let sprite = new _ec.class.sprite(opt);

    sprite.style = opt.style;

    sprite.children = [];

    var center = opt.center || {
        x: opt.style.tw / 2,
        y: opt.style.th / 2,
    };

    var data = {
        passByRotate: false,
        speed: 2000,
    };

    sprite.set = function (keys) {
        for (var i in keys) {
            data[i] = keys[i];
        }
    };

    opt.background && sprite.add(new _ec.class.sprite({
        content: {
            img: opt.background
        },
        style: {
            tx: 0,
            ty: 0,
            tw: opt.style.tw,
            th: opt.style.th,
            locate: 'lt'
        },
    }));

    var longest = Math.max(opt.style.tw, opt.style.th) + 100;
    var getResultPoint = function (deg) {
        return mathPointRotate(longest, 0, 0, 0, deg)
    };

    sprite.hooks = {
        ticked () {
            if (Math.random() < 0.8) return;

            var deg = Math.random() * 360;
            var result = getResultPoint(deg);
            var randomImg = opt.passBy[parseInt(deg) % opt.passBy.length];

            if (randomImg) {
                var child = new _ec.class.sprite({
                    content: {
                        img: randomImg
                    },
                    style: {
                        tx: Easycanvas.transition.linear(center.x, center.x + result.x, data.speed),
                        ty: Easycanvas.transition.linear(center.y, center.y + result.y, data.speed),
                        rotate: deg - 90,
                        tw: Easycanvas.transition.linear(1, randomImg.width * 2, data.speed),
                        th: Easycanvas.transition.linear(1, randomImg.height * 2, data.speed),
                    },
                });

                if (data.passByRotate) {
                    child.style.rx = center.x;
                    child.style.ry = center.y;
                    child.style.rotate = Easycanvas.transition.linear(0, 360, data.speed);
                }

                sprite.add(child);
                setTimeout(() => {
                    child.remove();
                }, data.speed);
            }

            if (Math.random() > data.passInRate) return;

            var circle = new _ec.class.sprite({
                content: {
                    img: opt.passIn[0]
                },
                style: {
                    tx: Easycanvas.transition.linear(center.x, center.x + result.x / 10, data.speed),
                    ty: Easycanvas.transition.linear(center.y, center.y + result.y / 10, data.speed),
                    rotate: deg,
                    tw: Easycanvas.transition.linear(10, center.x * 4, data.speed),
                    th: Easycanvas.transition.linear(10, center.x * 4, data.speed),
                    opacity: Easycanvas.transition.linear(5, 0.15, data.speed),
                },
            });
            sprite.add(circle);
            setTimeout(() => {
                circle.remove();
            }, data.speed);
        }
    };

    return sprite;
};

if (window && window.Easycanvas) {
	_ec = window.Easycanvas;
	_ec.class.shuttle = shuttle;
}

module.exports = function (ec) {
	_ec = ec;
	ec.class.shuttle = shuttle;
};
