/** ********** *
 *
 * Clear children
 *
 * ********** **/

module.exports = function () {
    this.children.forEach((child) => {
        child.remove();
    });

    this.children = [];
};
