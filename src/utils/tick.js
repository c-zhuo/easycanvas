const fallback = function (callback) {
    setTimeout(callback, 1000 / 60);
};

const rAF = typeof requestAnimationFrame !== 'undefined' ? (
        requestAnimationFrame  ||
        window.webkitRequestAnimationFrame  ||
        window.mozRequestAnimationFrame     ||
        window.oRequestAnimationFrame       ||
        window.msRequestAnimationFrame      ||
        fallback
    ) : fallback;

module.exports = rAF;
