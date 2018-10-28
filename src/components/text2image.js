// （多行）文本转图片
// textRendering(String, {size: 30, width: 125, color: '#333'});
// 返回图片（实际是<canvas>对象），包含.width/.height属性

const cachePool = {};
const nextLine = '\n'.slice(0,1);

const textRendering = function (_text, config) {
    let text = String(_text);
    let cacheFlag = text + JSON.stringify(config);

    if (cachePool[cacheFlag]) {
        return cachePool[cacheFlag];
    }

    // var now = Date.now();

    var padding;
    if (config.padding) {
        padding = config.padding.split(' ');
        padding = padding.map(str => parseInt(str));
        padding[1] = Number(padding[1] || padding[0]);
        padding[2] = Number(padding[2] || padding[0]);
        padding[3] = Number(padding[3] || padding[1]);
    } else {
        padding = [0, 0, 0, 0];
    }

    var width = config.minWidth || config.width || (
        (config.size || 16) * text.length + padding[1] + padding[3] + 100
    );
    var minLines = text.split('\n').length;
    var height = (config.size || 16) * (Math.round(text.length) / width + minLines - 1) * (config.lineHeight || config.size) + padding[0] + padding[2] + 100;
    // console.warn(width, height);

    var tempCanvas = document.createElement('canvas');
    // document.body.appendChild(tempCanvas);
    tempCanvas.width = width;
    tempCanvas.height = height;
    var tempCtx = tempCanvas.getContext('2d');

    window.tempCanvas = tempCanvas;
    window.tempCtx = tempCtx;

    // 确保不支持hanging的手机也能用top
    // 部分安卓和ios的textBaseline不同，巨坑，换成middle
    // tempCtx.textBaseline = 'top';
    // tempCtx.textBaseline = 'hanging';
    tempCtx.textBaseline = 'middle';
    tempCtx.font = (config.style ? config.style + ' ' : '') + config.size + 'px ' + (config.family || 'serif');
    tempCtx.fillStyle = config.color || '#000';
    tempCtx.textAlign = config.textAlign || 'left';

    if (process.env.NODE_ENV !== 'production') {
        var context = [];
        context.push(`var tempCanvas = document.createElement('canvas')`);
        context.push(`tempCanvas.width=${tempCanvas.width}`);
        context.push(`tempCanvas.height=${tempCanvas.height}`);
        context.push(`var tempCtx = tempCanvas.getContext('2d')`);
        context.push("tempCtx.textBaseline='" + tempCtx.textBaseline + "'");
        context.push("tempCtx.font='" + tempCtx.font + "'");
        context.push("tempCtx.fillStyle='" + tempCtx.fillStyle + "'");
        context.push("tempCtx.textAlign='" + tempCtx.textAlign + "'");
    }

    var drawX = 0;
    var drawY = config.lineHeight ? (config.lineHeight - config.size) / 2 : 0;

    var startIndex = 0;
    var endIndex = 1;

    // 下次写完文本后换行标记
    var needNextLine = false;
    // 用-来替换空格
    var realWidth = 0;

    while (true) {
        let width = tempCtx.measureText(text.slice(startIndex, endIndex)).width;

        if (width > config.width) {
            if (config.overflow === 'ellipsis') {
                // 最后一个字换成三个点
                endIndex -= 2;
                tempCtx.fillText(text.slice(startIndex, endIndex) + '...', drawX, drawY + config.size / 2);
                if (process.env.NODE_ENV !== 'production') {
                    context.push(`tempCtx.fillText('${text.slice(startIndex, endIndex)}...', ${drawX}, ${drawY + config.size / 2})`);
                }

                drawY += config.size + (config.lineHeight ? (config.lineHeight - config.size) / 2 : 0);

                realWidth = config.width - padding[1] - padding[3];
                break;
            } else {
                // 换行
                endIndex -= 1;
                tempCtx.fillText(text.slice(startIndex, endIndex), drawX, drawY + config.size / 2);
                if (process.env.NODE_ENV !== 'production') {
                    context.push(`tempCtx.fillText('${text.slice(startIndex, endIndex)}', ${drawX}, ${drawY + config.size / 2})`);
                }

                startIndex = endIndex;
                endIndex = startIndex + 1;
                drawY += config.size + (config.lineHeight ? (config.lineHeight - config.size) / 2 : 10);
            }
        } else {
            if (endIndex > text.length - 1) {
                if (width > realWidth) realWidth = width;
                tempCtx.fillText(text.slice(startIndex, endIndex), drawX, drawY + config.size / 2);
                if (process.env.NODE_ENV !== 'production') {
                    context.push(`tempCtx.fillText('${text.slice(startIndex, endIndex)}', ${drawX}, ${drawY + config.size / 2})`);
                }
                drawY += config.size + (config.lineHeight ? (config.lineHeight - config.size) / 2 : 0);
                break;
            } else if (text.slice(endIndex, endIndex + 1) === nextLine) {
                // 换行
                tempCtx.fillText(text.slice(startIndex, endIndex), drawX, drawY + config.size / 2);
                endIndex += 1;

                startIndex = endIndex;
                endIndex = startIndex + 1;
                drawY += config.size + (config.lineHeight ? (config.lineHeight - config.size) / 2 : 10);
            }

            if (width > realWidth) realWidth = width;
            endIndex++;
        }

    }

    // const firstValuable = (a, b) => {
    //     return typeof a === 'undefined' ? b : a;
    // },

    var finalCanvas = document.createElement('canvas');
    finalCanvas.width = Math.max(realWidth + padding[1] + padding[3], config.minWidth || 0);
    finalCanvas.height = drawY + padding[0] + padding[2];
    var finalCtx = finalCanvas.getContext('2d');

    if (process.env.NODE_ENV !== 'production') {
        context.push(`var finalCanvas=document.createElement('canvas')`);
        context.push(`finalCanvas.width=${finalCanvas.width}`);
        context.push(`finalCanvas.height=${finalCanvas.height}`);
        context.push(`var finalCtx = finalCanvas.getContext('2d')`);
    }

    if (config.backgroundColor) {
        finalCtx.fillStyle = config.backgroundColor;
        finalCtx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);

        if (process.env.NODE_ENV !== 'production') {
            context.push(`finalCtx.fillStyle=${finalCtx.fillStyle}`);
            context.push(`finalCtx.fillRect(0, 0, ${finalCanvas.width}, ${finalCanvas.height})`);
        }
    }

    // finalCtx.drawImage(tempCanvas, padding[3], padding[0]);
    finalCtx.drawImage(tempCanvas, (finalCanvas.width - realWidth) / 2, padding[0]);
    // document.body.prepend(finalCanvas);

    if (config.border) {
        var border = config.border.split(' ');
        finalCtx.beginPath();
        finalCtx.moveTo(0, 0);
        finalCtx.lineWidth = parseInt(border[0]);
        finalCtx.strokeStyle = border[2] || border[1];
        finalCtx.lineTo(finalCanvas.width, 0);
        finalCtx.lineTo(finalCanvas.width, finalCanvas.height);
        finalCtx.lineTo(0, finalCanvas.height);
        finalCtx.lineTo(0, 0);
        finalCtx.stroke();

        // TODO
        // if (process.env.NODE_ENV !== 'production') {
        //     context.push(`finalCtx.fillStyle=${finalCtx.fillStyle}`);
        //     context.push(`finalCtx.fillRect(0, 0, ${finalCanvas.width}, ${finalCanvas.height})`);
        // }
    }

    // console.warn(Date.now() - now);

    if (process.env.NODE_ENV !== 'production') {
        finalCanvas.$origin = context;
    }

    cachePool[cacheFlag] = finalCanvas;
    return finalCanvas;

    // var image = new Image();
    // image.src = finalCanvas.toDataURL();
    // image.width = finalCanvas.width;
    // image.height = finalCanvas.height;
    // return image;
};

module.exports = textRendering;
