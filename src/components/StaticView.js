/** ********** *
 *
 * StaticView
 *
 * ********** **/

import browserRegister from './_browserRegister.js';

const component = function (opt, Easycanvas) {
    let $sprite;

    let option = opt || {};
    option.name = option.name || 'StaticView';
    option.style = option.style || {};

    // if (option.style.locate && option.style.locate !== 'lt') {
    //     option.style.locate = 'lt';
    //     if (process.env.NODE_ENV !== 'production') {
    //         console.warn(`[Easycanvas] The 'locate' style in StaticView must be 'lt', the default value.`);
    //     }
    // }

    $sprite = new Easycanvas.Sprite(option);

    let state = 0;

    // setTimeout(() => {
        $sprite.on('ticked', () => {
            if (state === 2 && $sprite.$combine && $sprite.$combine.children) {
                $sprite.$combine.children.forEach(child => child.recalculate());

                const changed = $sprite.$combine.children.find(child => {
                    return child.$selfChanged || child.children.find(grandChild => grandChild.$selfChanged === true);
                });
    
                if (changed || $sprite.$selfChanged) {
                    $sprite.uncombine();
                    state = 0;
                }
            } else if (state === 0 && !$sprite.getAllChildren().find(child => child.$selfChanged === true)) {
                state = 1;
                $sprite.combine();
                $sprite.nextTick(() => {
                    state++;
                });
                return;
            }
        });
    // }, 2400);

    return $sprite;
};

browserRegister(component, 'StaticView');

export default component;
