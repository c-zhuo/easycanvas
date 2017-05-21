var num = function (x, y, sx, sy, diff) {
    var _diff = diff || 1;

    if (x - sx >= _diff) {
        if (y - sy >= _diff) {
            return 3;
        } else if (y - sy <= -_diff) {
            return 9;
        }

        return 6;
    }

    if (x - sx <= -_diff) {
        if (y - sy >= _diff) {
            return 1;
        } else if (y - sy <= -_diff) {
            return 7;
        }

        return 4;
    }

    if (y - sy >= _diff) {
        return 2;
    } else if (y - sy <= -_diff) {
        return 8;
    }

    return 5;
};

var NUM2XAY = {
    '1': {x: -1, y: 1},
    '2': {x: 0, y: 1},
    '3': {x: 1, y: 1},
    '4': {x: -1, y: 0},
    '5': {x: 0, y: 0},
    '6': {x: 1, y: 0},
    '7': {x: -1, y: -1},
    '8': {x: 0, y: -1},
    '9': {x: 1, y: -1},
};

module.exports = {
    num: num,

    xy: function () {
        var _num = num.apply(this, arguments);
        return JSON.parse(JSON.stringify(NUM2XAY[_num] || {}));
    },

    NUM2XAY: function (val) {
        return JSON.parse(JSON.stringify(NUM2XAY[val]));
    },

    pointInRect: function (x, y, x1, x2, y1, y2) {
        return !(x < x1 || x > x2 || y < y1 || y > y2);
    },

    getDistanceSq: function (x1, y1, x2, y2) {
        return (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
    },

    enoughNear: function (x1, y1, x2, y2, r) {
        return (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2) <= r * r;
    },
};
