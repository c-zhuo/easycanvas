/** ********** *
 *
 * Load images
 * - Easycanvas.ImgLoader.cacheCanvas
 *
 * ********** **/

const Cache = {};
const BlockingImgs = [];
const ProcessingFlag = 'processing';

// 防止非浏览器环境报错；非浏览器下，不会使用下面的loader方法，因此OImage为空不影响
const OImage = typeof window !== 'undefined' && Image;

let blockingAmount = 0;

const loader = function (url, callback, option) {
    let _option = option || {};
    let cacheCanvas = loader.cacheCanvas;

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

    let cacheNamespace = url + '_' + JSON.stringify(option) + '_' + cacheCanvas;

    if (Cache[cacheNamespace]) {
        if (callback) {
            if (Cache[cacheNamespace].width && callback) {
                callback(Cache[cacheNamespace]);
            } else {
                setTimeout(function () {
                    loader(url, callback, option);
                }, 100);
            }
            return;
        } else {
            return Cache[cacheNamespace];
        }
    }
    // todo: 多个loader加载同一图片，目前只触发一个callback；待补充

    let i = new OImage();
    i._complete = false;

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

    let tempCanvas;
    if (_option.canvas || _option.alphaColor || cacheCanvas) {
        tempCanvas = document.createElement('canvas');
        tempCanvas.width = tempCanvas.height || 0;
        Cache[cacheNamespace] = tempCanvas;
    }

    i.onload = function (e) {
        i._complete = true;

        if (i.src.substr(-3) === 'jpg' || i.src.substr(-3) === 'jpeg' || i.src.substr(-3) === 'bmp') {
            i.$noAlpha = true;
        } else if (i.src.indexOf('data:image/jpg;') === 0) {
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

        if (tempCanvas && (_option.canvas || _option.alphaColor || cacheCanvas)) {
            let cts = tempCanvas.getContext('2d');
            tempCanvas.width = i.width;
            tempCanvas.height = i.height;
            tempCanvas.$noAlpha = i.$noAlpha;
            cts.drawImage(i, 0, 0);

            if (_option.alphaColor) {
                let data = cts.getImageData(0, 0, i.width, i.height);

                for (let d = 0; d < data.data.length; d += 4) {
                    let colorWeight = data.data[d] + data.data[d + 1] + data.data[d + 2];
                    let blackLike = 1;
                    if (data.data[d] < blackLike && data.data[d + 1] < blackLike && data.data[d + 2] < blackLike) {
                        data.data[d + 3] = Math.floor(colorWeight / 255);
                    }
                }
                cts.putImageData(data, 0, 0);
                tempCanvas.$noAlpha = false;
            }

            i = tempCanvas;
        }

        if (callback) {
            callback(i);
        }
    };

    i.onerror = function () {
        Cache[cacheNamespace] = i;
    };

    return tempCanvas || i;
};

loader.cacheCanvas = false;

module.exports = loader;
