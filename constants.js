const sxywh = ['cutLeft', 'cutTop', 'cutWidth', 'cutHeight'];
const txywh = ['left', 'top', 'width', 'height'];
const xywh = sxywh.concat(txywh);
const styles = xywh.concat(['locate', 'rx', 'ry', 'zIndex', 'textFont', 'textAlign', 'textVerticalAlign', 'color', 'rotate', 'scale', 'opacity', 'backgroundColor', 'border', 'overflow', 'overflowX', 'overflowY']);

module.exports = {
    txywh,
    sxywh,
    xywh,
    styles,
    devFlag: '__EASYCANVAS_DEVTOOL__',
    version: '0.7.4',
};
