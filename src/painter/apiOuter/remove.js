/** ********** *
 *
 * Remove a sprite (async)
 * - In develop mode, fps will throw warnings in low performance.
 *
 * ********** **/

module.exports = function (item, del) {
    item.style.visible = false;
    item.removing = true;

    setTimeout(() => {
        if (item.$parent) {
            item.$parent.children = item.$parent.children.filter(function (c) {
                return c.removing !== true;
            });
        } else {
            this.children = this.children.filter(function (c) {
                return c.removing !== true;
            });
        }
    });

    if (del) {
        this.children.splice(this.children.indexOf(item), 1);
    }
};
