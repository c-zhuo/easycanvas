/** ********** *
 *
 * Clear children
 *
 * ********** **/

export default function () {
    this.children.forEach((child) => {
        child.remove();
    });

    this.children = [];
};
