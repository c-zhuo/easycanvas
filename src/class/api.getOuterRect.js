module.exports = function (notImg, fromCache) {
    let $sprite = this;

    let rect = $sprite.getRect(notImg, fromCache);
    rect.tr = rect.tx + rect.tw;
    rect.tb = rect.ty + rect.th;

    this.children.forEach((child) => {
        if (child.$cache.visible === false) return;

        let childRect = child.getOuterRect(notImg, fromCache);
        if (childRect.tx < rect.tx) rect.tx = childRect.tx;
        if (childRect.ty < rect.ty) rect.ty = childRect.ty;
        if (childRect.tr > rect.tr) rect.tr = childRect.tr;
        if (childRect.tb > rect.tb) rect.tb = childRect.tb;

        rect.tw = rect.tr - rect.tx;
        rect.th = rect.tb - rect.ty;
    });

    return rect;
};
