module.exports = function (notImg, fromCache) {
    let $sprite = this;

    let rect = $sprite.getRect(notImg, fromCache);
    rect.right = rect.left + rect.width;
    rect.bottom = rect.top + rect.height;

    this.children.forEach((child) => {
        if (child.$cache.visible === false) return;

        let childRect = child.getOuterRect(notImg, fromCache);
        if (childRect.left < rect.left) rect.left = childRect.left;
        if (childRect.top < rect.top) rect.top = childRect.top;
        if (childRect.right > rect.right) rect.right = childRect.right;
        if (childRect.bottom > rect.bottom) rect.bottom = childRect.bottom;

        rect.width = rect.right - rect.left;
        rect.height = rect.bottom - rect.top;
    });

    return rect;
};
