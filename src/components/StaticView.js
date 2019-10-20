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

    $sprite.on('ticked', () => {
        if (!$sprite.$canvas.$children) return;
        if (state === 2 && $sprite.$combine && $sprite.$combine.children) {
            $sprite.$combine.children.forEach(child => child.recalculate());

            // combine之后如果调用了add，会推到children里，需要重新uncombine
            const changed = $sprite.children.length > 1 || $sprite.$combine.children.find(child => {
                return child.$selfChanged || child.getAllChildren().find(grandChild => grandChild.$selfChanged !== false);
            });

            if (changed) {
                $sprite.uncombine();
                state = 0;
            }
        } else if (state === 0 && !$sprite.getAllChildren(false).find(child => child.$selfChanged !== false)) {
            if ($sprite.combine()) {
                state = 1;

                // 防止合并之后立刻满足上面的if，触发uncombine
                $sprite.nextTick(() => {
                    state++;
                });
            }
            return;
        }
    });

    return $sprite;
};

browserRegister(component, 'StaticView');

export default component;
