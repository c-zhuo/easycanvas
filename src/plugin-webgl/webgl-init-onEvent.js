const createFloatTexture = function (gl, width, height) {
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGB,
        width,
        height,
        0,
        gl.RGB,
        gl.UNSIGNED_BYTE,
        null
    );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.bindTexture(gl.TEXTURE_2D, null);
    return texture;
}

const floatEqual = function (a, b) {
    return Math.abs(a - b) < 1;
};

// 同一帧多次判断时，使用缓存的结果
var eventedTimestamp = 0;
var eventedResult = false;

module.exports = function ($e, caughts) {
    var $canvas = this;
    var gl = $canvas.$gl;
    var fbo = gl.createFramebuffer();

    if ($canvas.$lastPaintTime === eventedTimestamp) {
        return eventedResult;
    }

    var renderTexture = createFloatTexture(gl, $canvas.width, $canvas.height);
    gl.bindTexture(gl.TEXTURE_2D, renderTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, $canvas.width, $canvas.height, 0, gl.RGB, gl.UNSIGNED_BYTE, null);

    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(
        // First argument is always gl.FRAMEBUFFER
        gl.FRAMEBUFFER,
        // The second argument indicates the "attachment slot" of the FBO.
        // Basically, it indicates the function of the texture that you are attaching.
        // gl.COLOR_ATTACHMENT0 means that the texture will serve as the zeroth color buffer.
        // By default, this is the only color buffer attachment slot of that you can use in vanially gl.
        // To use other color buffer attachment slot, you need an extension.  (We will cover this later.)
        gl.COLOR_ATTACHMENT0,
        // The third argument indicates the kind of texture we are attaching.
        // Since we are attaching a TEXTURE_2D, we give it gl.TEXTURE_2D
        gl.TEXTURE_2D,
        // The fourth argument is the texture that you want to attach.
        // Of course, this must be created before hand.
        renderTexture,
        // The fifth argument is the mipmap level of the texture.
        // This is always 0.
        0
    );
    // gl.clearColor(0, 0, 0, 0);
    // gl.clear(gl.COLOR_BUFFER_BIT);
    // gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    // gl.enable(gl.DEPTH_TEST);
    // gl.disable(gl.BLEND);

    gl.eventing = true;
    // $canvas.$render();
    $canvas.paint();

    // console.log($e.type)

    var readout = new Uint8Array(3);
    gl.readPixels($e.canvasX, $canvas.height - $e.canvasY, 1, 1, gl.RGB, gl.UNSIGNED_BYTE, readout);

    // console.log('readout', readout);

    // window.imageData = new ImageData($canvas.width, $canvas.height);
    // window.readImageData = new Uint8Array($canvas.width * $canvas.height * 3);
    // gl.readPixels(0, 0, $canvas.width, $canvas.height, gl.RGB, gl.UNSIGNED_BYTE, readImageData);
    // // console.log(readImageData.filter(a => a));
    // for (var i = 0; i < imageData.data.length / 4; i++) {
    //     imageData.data[i * 4 + 0] = readImageData[i * 3 + 0];
    //     imageData.data[i * 4 + 1] = readImageData[i * 3 + 1];
    //     imageData.data[i * 4 + 2] = readImageData[i * 3 + 2];
    //     imageData.data[i * 4 + 3] = 255;
    // }
    // // console.warn(imageData.data.filter((a) => {
    // //     return a > 0 && a < 255;
    // // }));
    // $cut.width = $canvas.width;
    // $cut.height = $canvas.height;
    // $cut.getContext('2d').putImageData(imageData, 0, 0);

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.eventing = false;

    var $hit = $canvas.$children.filter(($sprite) => {
        if (!$sprite.webgl) return false;

        let flag = $sprite.webgl.$eventFlag;
        if (!flag) return false;

        return floatEqual(readout[0], flag[0]) && floatEqual(readout[1], flag[1]) && floatEqual(readout[2], flag[2]);
    })[0];

    // 同一帧多次判断时，用于使用的缓存
    eventedTimestamp = $canvas.$lastPaintTime;
    eventedResult = $hit;

    if ($hit) {
        // console.log($hit);
        caughts.push($hit.$origin);
    }
};
