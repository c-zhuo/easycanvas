import sprite from './sprite.js';

export default function (pluginHook) {
    let $extendList = sprite.prototype.$extendList;

    if ($extendList.indexOf(pluginHook) >= 0) return;

    $extendList.push(pluginHook);
};
