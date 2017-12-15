/** ********** *
 *
 * Add a child to instance or sprite
 * - If @item is not a Sprite, this will create a new sprite first.
 * - Using $id to judge whether @item is a instance of Sprite.
 *
 * ********** **/

import utils from 'utils/utils.js';
import sprite from 'class/sprite.js';
import bindDrag from '../apiInner/bindDrag.js';

let add = function (item) {
    if (!item) return;

    let $canvas = this;

    let _item = item;

    _item.$canvas = $canvas;

    if (!_item.$id) {
        _item = new sprite(_item);
    }

    bindDrag.bind(_item);

    _item.children.forEach(function (c, i) {
        _item.children[i] = new sprite(c);
        _item.children[i].$canvas = $canvas;
        _item.children[i].$parent = _item;
    });

    $canvas.paintList.push(_item);

    if (process.env.NODE_ENV !== 'production') {
        $canvas.$plugin.hook.updateTree($canvas);
    }

    return _item;
};

module.exports = add;
