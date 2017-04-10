import gifler from '../lib/gifler.js';
import imgLoader from './img-loader.js';
import mirror from './mirror.js';

var Cache = {};

var gif2canvas = function (url, callback, width, height) {
	var _width = width || 500;
	var _height = height || 500;

	var flag = JSON.stringify({
		url: url,
		width: _width,
		height: _height,
	});

	if (Cache[flag] && Cache[flag] !== 'processing') {
    	callback(Cache[flag]);
		return;
	}

    var src = '../image/monster/deer_3_5.gif';
    imgLoader(url, function (img) {
        if (Cache[flag] === 'processing') {
            // 防止并发初始化gif2canvas
            setTimeout(function () {
                gif2canvas(url, callback, _width, _height);
            }, 100);
            return;
        }

        var temp = document.createElement('canvas');
        temp.width = img.width;
        temp.height = img.height;

        Cache[flag] = 'processing';
        // window.gifler(img.src).frames(temp, function (ctx, frame) {
        //     ctx.canvas.width  = img.width;
        //     ctx.canvas.height = img.height;
        //     // ctx.globalCompositeOperation = 'source-over';
        //     // ctx.fillRect(0, 0, 1100, 1100);
        //     ctx.translate(ctx.canvas.width, 0);
        //     ctx.scale(-1, 1);
        //     ctx.drawImage(frame.buffer, frame.x, frame.y, frame.width, frame.height);

        //     // Composite a color
        //     // var hue = (frames * 10) % 360;
        //     // ctx.globalCompositeOperation = 'source-atop';
        //     // ctx.fillStyle = 'hsla(' + hue + ', 100%, 50%, 0.5)';
        // }).done(function () {
        window.gifler(img.src).animate(temp).done(function () {
        	Cache[flag] = temp;
        	callback(temp);
        });
    });
};

module.exports = gif2canvas;
