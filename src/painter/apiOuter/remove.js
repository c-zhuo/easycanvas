/** ********** *
 *
 * Remove a sprite (async)
 * - In develop mode, fps will throw warnings in low performance.
 *
 * ********** **/

import utils from 'utils/utils.js';

module.exports = function ($sprite, sync) {
    utils.execFuncs($sprite.hooks.beforeRemove, $sprite, $sprite.$tickedTimes++);

    $sprite.style.visible = false;
    $sprite.$removing = true;

    setTimeout(() => {
        if ($sprite.$parent) {
            $sprite.$parent.children = $sprite.$parent.children.filter((child) => {
                return child.$removing !== true;
            });
        } else {
            this.children = this.children.filter((child) => {
                return child.$removing !== true;
            });
        }

        if ($sprite.$canvas) {
            $sprite.$canvas = undefined;
            $sprite.$parent = undefined;
            $sprite.$tickedTimes = undefined;
            $sprite.$cache = undefined;
            $sprite.$rendered = false;
            if (process.env.NODE_ENV !== 'production') {
                $sprite.$perf = undefined;
            }
            utils.execFuncs($sprite.hooks.removed, $sprite, $sprite.$tickedTimes);
        }
    });

    if (sync) {
        this.children.splice(this.children.indexOf($sprite), 1);
    }
};
