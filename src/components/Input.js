/** ********** *
 *
 * Input
 * - Based and modified from https://github.com/goldfire/CanvasInput
 *
 * ********** **/

import browserRegister from './_browserRegister.js';
import CanvasInput from './_CanvasInput.js';

// hack掉CanvasInput的mousePos计算
CanvasInput.prototype._mousePos = function (event) {
    return {
        x: event.x,
        y: event.y,
    };
};

const component = function (opt, Easycanvas) {
    let $sprite;

    let option = opt || {};
    option.name = option.name || 'Input';

    const canvasInputOption = {
        canvas: document.createElement('canvas'),
        ...option,
        ...option.style,
        fontColor: option.style.color,
        // borderWidth: 0,
    };

    // CanvasInput接收的宽高只是可写区域的宽高，这里定义的宽高是整体的宽高，进行修正
    // 减去
    option.style.width = option.style.width - (option.style.borderWidth || 0) * 2 - (option.style.padding || 0) * 2;
    option.style.height = option.style.height - (option.style.borderWidth || 0) * 2 - (option.style.padding || 0) * 2;

    const $canvasInput = new CanvasInput(canvasInputOption);
    // console.log($canvasInput._renderCanvas);

    option.style.borderWidth = 0;
    option.style.borderColor = undefined;
    option.style.width = option.style.height = undefined;
    $sprite = new Easycanvas.Sprite(option);
    $sprite.$canvasInput = $canvasInput;

    ['onsubmit', 'onkeydown', 'onkeyup', 'onfocus', 'onblur'].forEach(method => {
        $canvasInput['_' + method] = (event) => {
            if ($sprite[method]) {
                $sprite[method].call($sprite, event);
            }
        };
    });

    ['focus', 'blur', 'selectText'].forEach(method => {
        $sprite[method] = $canvasInput[method].bind($canvasInput);
    });

    $sprite.on('removed', () => {
        $canvasInput.destroy.call($canvasInput);
    });

    // $sprite.content.img = $canvasInput._canvas;
    $sprite.content.img = $canvasInput._renderCanvas;

    $sprite.addEventListener('interceptor', (e) => {
        e.stopPropagation();

        const event = {
            type: e.type,
            x: e.canvasX - $sprite.getStyle('left'),
            y: e.canvasY - $sprite.getStyle('top'),
        };

        $canvasInput[e.type] && $canvasInput[e.type](event, $canvasInput);

        if (e.type === 'click') {
            const interceptor = (e) => {
                if (e.type === 'click') {
                    $sprite.$canvas.removeEventListener('interceptor', interceptor);
                }
            };
            $sprite.$canvas.addEventListener('interceptor', interceptor);
        }
    });

    Object.defineProperty($sprite, 'value', {
        get () {
            return $canvasInput.value();
        },

        set (str) {
            $canvasInput.value(typeof str === 'undefined' ? '' : str);
        },
    });

    return $sprite;
};

browserRegister(component, 'Input');

export default component;
