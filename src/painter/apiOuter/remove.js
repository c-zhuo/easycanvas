/** ********** *
 *
 * Remove a sprite (async)
 * - In develop mode, fps will throw warnings in low performance.
 *
 * ********** **/

module.exports = function (item, del) {
    item.style.visible = false;
    item.removing = true;

    setTimeout(function () {
        if (item.$parent) {
            item.$parent.children = item.$parent.children.filter(function (c) {
                return c.removing !== true;
            });
        } else {
            this.paintList = this.paintList.filter(function (c) {
                return c.removing !== true;
            });
        }
    }.bind(this));

    if (del) {
        this.paintList.splice(this.paintList.indexOf(item), 1);
    }

    if (process.env.NODE_ENV !== 'production') {
        let $canvas = this;
        $canvas.$plugin.hook.updateTree($canvas);
    }
};
