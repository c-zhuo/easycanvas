const arrayRepeat = function (arr, n) {
    var oldLength = arr.length;
    var newArray = new Array(Math.round(oldLength * n));

    for (var i = 0, l = newArray.length; i < l; i++) {
        newArray[i] = arr[i % oldLength];
    }

    return newArray;
};

const degToRad = function (d) {
    return d * Math.PI / 180;
};

const default0s = ['rx', 'ry', 'rz'];
const default1s = ['scale', 'scaleX', 'scaleY', 'scaleZ'];
const styleKeys = default0s.concat(default1s);

const err = function (msg) {
    console.error('[Easycanvas-webgl] ' + msg);
};

module.exports = {
	arrayRepeat,
	degToRad,
	default0s,
	default1s,
	styleKeys,
    err,
};
