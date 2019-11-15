import imgLoader from './img-loader.js';
import img2base64 from './img2base64.js';

export default function (url, option) {
    var result;

    img2base64(url, function (base64) {
        return imgLoader(base64, function (canvas) {
            // let t0 = new Date() * 1;
            var cw = canvas.width, ch = canvas.height;
            var imageData = canvas.getContext('2d').getImageData(0, 0, cw, ch);
            var data = imageData.data;

            for (var i = data.length - 1; i >= 0; i -= 4) {
                if (option && option.conversion) {
                    let pixel = option.conversion({
                        r: data[i - 3],
                        g: data[i - 2],
                        b: data[i - 1],
                        a: data[i],
                    }, ((i + 1) >> 2) % cw, Math.floor(((i + 1) >> 2) / cw));
                    data[i - 3] = Math.max(Math.min(pixel.r, 255), 0);
                    data[i - 2] = Math.max(Math.min(pixel.g, 255), 0);
                    data[i - 1] = Math.max(Math.min(pixel.b, 255), 0);
                    data[i - 0] = Math.max(Math.min(pixel.a, 255), 0);
                }
            }

            canvas.getContext('2d').clearRect(0, 0, cw, ch);
            canvas.getContext('2d').putImageData(imageData, 0, 0);
            result = canvas;
            // console.log(new Date() * 1 - t0);
        }, {
            canvas: true,
            cacheFlag: Math.random(),
        });
    });

    return function () {
        return result;
    };
};
