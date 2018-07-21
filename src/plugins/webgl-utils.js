const arrayRepeat = function (arr, n) {
    var oldLength = arr.length;
    var newArray = new Array(Math.round(oldLength * n));

    for (var i = 0, l = newArray.length; i < l; i++) {
        newArray[i] = arr[i % oldLength];
    }

    return newArray;
};

module.exports = {
	arrayRepeat,
};
