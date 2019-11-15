const sxywh = ['cutLeft', 'cutTop', 'cutWidth', 'cutHeight'];
const txywh = ['left', 'top', 'width', 'height'];
const xywh = sxywh.concat(txywh);
const styles = xywh.concat(['locate', 'rotateOriginLeft', 'rotateOriginTop', 'zIndex', 'fontSize', 'fontFamily', 'textAlign', 'textVerticalAlign', 'color', 'rotate', 'scale', 'opacity', 'backgroundColor', 'borderWidth', 'borderColor', 'overflow', 'overflowX', 'overflowY']);

export default {
    txywh,
    sxywh,
    xywh,
    styles,
    devFlag: '__EASYCANVAS_DEVTOOL__',
    version: '0.8.5',
};
