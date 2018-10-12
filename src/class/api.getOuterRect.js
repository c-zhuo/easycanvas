module.exports = function () {
    let $sprite = this;

    let rect = $sprite.getRect();
    rect.tr = rect.tx + rect.tw;
    rect.tb = rect.ty + rect.th;

    this.children.forEach((child) => {
        let childRect = child.getOuterRect();
        if (childRect.tx < rect.tx) rect.tx = childRect.tx;
        if (childRect.ty < rect.ty) rect.ty = childRect.ty;
        if (childRect.tr > rect.tr) rect.tr = childRect.tr;
        if (childRect.tb > rect.tb) rect.tb = childRect.tb;

        rect.tw = rect.tr - rect.tx;
        rect.th = rect.tb - rect.ty;
    });

    return rect;
};
