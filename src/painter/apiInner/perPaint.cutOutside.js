/** ********** *
 *
 * Fix border to improve performance
 *
 * ********** **/

module.exports = function ($canvas, props, imgWidth, imgHeight) {
    // source
    if (props.sx < 0 && props.sw) {
        let cutRate = (-props.sx / props.sw);
        props.tx += props.tw * cutRate;
        props.sx = 0;
    }
    if (props.sy < 0 && props.sh) {
        let cutRate = (-props.sy / props.sh);
        props.ty += props.th * cutRate;
        props.sy = 0;
    }
    if (imgWidth && props.sx + props.sw > imgWidth) {
        let cutRate = (props.sx + props.sw - imgWidth) / props.sw;
        props.sw -= props.sw * cutRate;
        props.tw -= props.tw * cutRate;
    }
    if (imgHeight && props.sy + props.sh > imgHeight) {
        let cutRate = (props.sy + props.sh - imgHeight) / props.sh;
        props.sh -= props.sh * cutRate;
        props.th -= props.th * cutRate;
    }

    // target
    if (props.tx < 0 && props.tw) {
        let cutRate = (-props.tx / props.tw);
        props.sx += props.sw * cutRate;
        props.sw -= props.sw * cutRate;
        props.tw = props.tw + props.tx;
        props.tx = 0;
    }
    if (props.ty < 0 && props.th) {
        let cutRate = (-props.ty / props.th);
        props.sy += props.sh * cutRate;
        props.sh -= props.sh * cutRate;
        props.th = props.th + props.ty;
        props.ty = 0;
    }
    if (props.tx + props.tw > $canvas.contextWidth && props.tw) {
        let cutRate = (props.tx + props.tw - $canvas.contextWidth) / props.tw;
        props.tw -= props.tw * cutRate;
        props.sw -= props.sw * cutRate;
    }
    if (props.ty + props.th > $canvas.contextHeight && props.th) {
        let cutRate = (props.ty + props.th - $canvas.contextHeight) / props.th;
        props.th -= props.th * cutRate;
        props.sh -= props.sh * cutRate;
    }
};
