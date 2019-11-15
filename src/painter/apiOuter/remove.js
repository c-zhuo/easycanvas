/** ********** *
 *
 * Remove a sprite (sync)
 *
 * ********** **/

import utils from 'utils/utils.js';

export default function ($sprite) {
    utils.execFuncs($sprite.hooks.beforeRemove, $sprite, $sprite.$tickedTimes++);

    $sprite.style.visible = false;
    $sprite.$removing = true;

    // setTimeout(() => {
        if ($sprite.$parent) {
            $sprite.$parent.children.splice($sprite.$parent.children.indexOf($sprite), 1);
            // $sprite.$parent.children = $sprite.$parent.children.filter((child) => {
            //     return child.$removing !== true;
            // });
        } else {
            this.children.splice(this.children.indexOf($sprite), 1);
            // this.children = this.children.filter((child) => {
            //     return child.$removing !== true;
            // });
        }

        if ($sprite.$canvas) {
            utils.execFuncs($sprite.hooks.removed, $sprite, $sprite.$tickedTimes);
            $sprite.$canvas = undefined;
            $sprite.$parent = undefined;
            $sprite.$tickedTimes = undefined;
            $sprite.$cache = {};
            $sprite.$rendered = false;
            if (process.env.NODE_ENV !== 'production') {
                $sprite.$perf = undefined;
            }
        }
    // });

    // if (sync) {
    //     this.children.splice(this.children.indexOf($sprite), 1);
    // }
};
