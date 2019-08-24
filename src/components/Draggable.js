/** ********** *
 *
 * Draggable
 *
 * ********** **/

import browserRegister from './_browserRegister.js';

const startPos = {
    left: 0,
    top: 0,
};
const spritePos = {
    left: 0,
    top: 0,
};

const mousemove = ($sprite, event) => {
    if ($sprite.onDragStep) {
        $sprite.onDragStep({
            left: spritePos.left + event.canvasX - startPos.left,
            top: spritePos.top + event.canvasY - startPos.top,
        });
    } else {
        $sprite.style.left = spritePos.left + event.canvasX - startPos.left;
        $sprite.style.top = spritePos.top + event.canvasY - startPos.top;
    }
};

const component = function (opt, Easycanvas) {
    let $sprite;
    opt.name = opt.name || 'Draggable';

    $sprite = new Easycanvas.Sprite(opt);

    $sprite.addEventListener('mousedown', (event) => {
        startPos.left = event.canvasX;
        startPos.top = event.canvasY;

        spritePos.left = $sprite.getSelfStyle('left');
        spritePos.top = $sprite.getSelfStyle('top');

        const interceptor = (e) => {
            if (e.type === 'mousemove') {
                mousemove($sprite, e);
            } else if (e.type === 'mouseup') {
                $sprite.$canvas.removeEventListener('interceptor', interceptor);

                $sprite.onDragEnd && $sprite.onDragEnd({
                    left: spritePos.left + e.canvasX - startPos.left,
                    top: spritePos.top + e.canvasY - startPos.top,
                });
            }
        };
        $sprite.$canvas.addEventListener('interceptor', interceptor);
    });
    $sprite.addEventListener('touchstart', (event) => {
        startPos.left = event.canvasX;
        startPos.top = event.canvasY;

        spritePos.left = $sprite.getSelfStyle('left');
        spritePos.top = $sprite.getSelfStyle('top');

        const interceptor = (e) => {
            if (e.type === 'touchmove') {
                mousemove($sprite, e);
            } else if (e.type === 'touchend') {
                $sprite.$canvas.removeEventListener('interceptor', interceptor);
            }
        };
        $sprite.$canvas.addEventListener('interceptor', interceptor);
    });

    return $sprite;
};

browserRegister(component, 'Draggable');

export default component;
