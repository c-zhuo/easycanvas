/** ********** *
 *
 * Change gif to an active canvas
 * - The canvas is in animating.
 * - This will use 84kb, so it only exsits in full version.
 *
 * ********** **/

import gifler from 'lib/gifler.js';
import imgLoader from './img-loader.js';
import mirror from './mirror.js';

const Cache = {};
const ProcessingFlag = 'processing';

const gif2canvas = function (url, callback, width, height) {
    let _width = width || 500;
    let _height = height || 500;

    let flag = JSON.stringify({
        url: url,
        // width: _width,
        // height: _height,
    });

    if (Cache[flag] && Cache[flag] !== ProcessingFlag) {
        callback(Cache[flag]);
        return;
    }
    if (Cache[flag] === ProcessingFlag) {
        // 防止并发初始化gif2canvas
        setTimeout(function () {
            gif2canvas(url, callback, _width, _height);
        }, 100);
        return;
    }

    Cache[flag] = ProcessingFlag;

    imgLoader(url, function (img) {
        let temp = document.createElement('canvas');
        temp.width = img.width;
        temp.height = img.height;

        // Here can modify the image
        // window.gifler(img.src).frames(temp, function (ctx, frame) {
        //     ctx.canvas.width  = img.width;
        //     ctx.canvas.height = img.height;
        //     // ctx.globalCompositeOperation = 'source-over';
        //     // ctx.fillRect(0, 0, 1100, 1100);
        //     ctx.translate(ctx.canvas.width, 0);
        //     ctx.scale(-1, 1);
        //     ctx.drawImage(frame.buffer, frame.x, frame.y, frame.width, frame.height);

        //     // Composite a color
        //     // let hue = (frames * 10) % 360;
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
