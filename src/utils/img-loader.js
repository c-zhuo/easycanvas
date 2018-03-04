/** ********** *
 *
 * Load images
 * - Easycanvas.imgLoader.cacheCanvas
 *
 * ********** **/

const Cache = {};
const BlockingImgs = [];
const ProcessingFlag = 'processing';

let blockingAmount = 0;

const loader = function (url, callback, option) {
    let _option = option || {};

    if (typeof url === 'object') {
        let imgs = url;
        _option.callbackArgs = _option.callbackArgs || [];
        loader(imgs.shift(), function (perImg) {
            _option.callbackArgs.push(perImg);
            if (imgs.length > 1) {
                loader(imgs, callback, _option);
            } else {
                loader(imgs[0], function (lastImg) {
                    _option.callbackArgs.push(lastImg);
                    callback(_option.callbackArgs);
                }, _option);
            }
        }, option);
        return;
    }

    let cacheNamespace = url + JSON.stringify(option);

    if (Cache[cacheNamespace]) {
        setTimeout(function () {
            if (callback) {
                callback(Cache[cacheNamespace]);
            }
        });
        return Cache[cacheNamespace];
    }
    // todo: 多个loader加载同一图片，目前只触发一个callback；待补充

    let i = new Image();
    if (_option.block) {
        i.src = url;
        blockingAmount++;
    } else if (blockingAmount === 0) {
        i.src = url;
    } else {
        BlockingImgs.push({
            imgObj: i,
            src: url
        });
    }

    Cache[cacheNamespace] = i;

    let tempCavas;
    if (_option.canvas || _option.alphaColor || loader.cacheCanvas) {
        tempCavas = document.createElement('canvas');
        tempCavas.width = tempCavas.height || 0;
        Cache[cacheNamespace] = tempCavas;
    }

    i.onload = function () {
        if (i.src.substr(-3) === 'jpg' || i.src.substr(-3) === 'jpeg' || i.src.substr(-3) === 'bmp') {
            i.$noAlpha = true;
        }

        if (_option.block) {
            blockingAmount--;
            if (blockingAmount === 0) {
                BlockingImgs.forEach(function (blockingImg) {
                    blockingImg.imgObj.src = blockingImg.src;
                });
                BlockingImgs.splice(0);
            }
        }

        if (_option.canvas || _option.alphaColor || loader.cacheCanvas) {
            let cts = tempCavas.getContext('2d');
            tempCavas.width = i.width;
            tempCavas.height = i.height;
            tempCavas.$noAlpha = i.$noAlpha;
            cts.drawImage(i, 0, 0);

            if (_option.alphaColor) {
                let data = cts.getImageData(0, 0, i.width, i.height);
                let pixel = [];

                for (let d = 0; d < data.data.length; d += 4) {
                    let colorWeight = data.data[d] + data.data[d + 1] + data.data[d + 2];
                    let blackLike = 1;
                    if (data.data[d] < blackLike && data.data[d + 1] < blackLike && data.data[d + 2] < blackLike) {
                        data.data[d + 3] = Math.floor(colorWeight / 255);
                    }
                }
                cts.putImageData(data, 0, 0);
                tempCavas.$noAlpha = false;
            }

            i = tempCavas;
        }

        if (callback) {
            callback(i);
        }
    };

    i.onerror = function () {
        Cache[cacheNamespace] = i;
    };

    return tempCavas || i;
};

loader.cacheCanvas = false;

module.exports = loader;
