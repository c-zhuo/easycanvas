/** ********** *
 *
 * scroll
 * - Event listeners
 *
 * ********** **/

const inBrowser = typeof window !== 'undefined';

let startPos = {};
let touching = false;
let ec;

let scrollFuncs = {
    loose: function ($sprite) {
        touching = false;
    },

    looper: function ($sprite) {
        if (!$sprite.$scroll || !$sprite.$scroll.$scrolling) return;

        if (touching) return;

        if (Math.abs($sprite.$scroll.speedX) > 1) {
            $sprite.$scroll.speedX *= $sprite.scroll.smooth || 0.8;
        } else {
            $sprite.$scroll.speedX = 0;
        }
        if (Math.abs($sprite.$scroll.speedY) > 1) {
            $sprite.$scroll.speedY *= $sprite.scroll.smooth || 0.8;
        } else {
            $sprite.$scroll.speedY = 0;
        }

        if (Math.abs($sprite.$scroll.speedX) <= 2 && Math.abs($sprite.$scroll.speedY) <= 2) {
            $sprite.$scroll.$scrolling = false;
            return;
        }

        $sprite.scroll.scrollY -= $sprite.$scroll.speedY;
        $sprite.scroll.scrollX -= $sprite.$scroll.speedX;

        let minScrollX = ec.utils.funcOrValue($sprite.scroll.minScrollX, $sprite);
        let maxScrollX = ec.utils.funcOrValue($sprite.scroll.maxScrollX, $sprite);
        let minScrollY = ec.utils.funcOrValue($sprite.scroll.minScrollY, $sprite);
        let maxScrollY = ec.utils.funcOrValue($sprite.scroll.maxScrollY, $sprite);

        if (!isNaN(minScrollY) && $sprite.scroll.scrollY < minScrollY) {
            $sprite.scroll.scrollY = minScrollY;
        } else if (!isNaN(maxScrollY) && $sprite.scroll.scrollY > maxScrollY) {
            $sprite.scroll.scrollY = maxScrollY;
        }

        if (!isNaN(minScrollX) && $sprite.scroll.scrollX < minScrollX) {
            $sprite.scroll.scrollX = minScrollX;
        } else if (!isNaN(maxScrollX) && $sprite.scroll.scrollX > maxScrollX) {
            $sprite.scroll.scrollX = maxScrollX;
        }
    },

    touch: function ($sprite, $e) {
        if (!$sprite.scroll.scrollable) return false;

        let now = Date.now();

        if (!touching) {
            // start scroll
            touching = now;

            startPos.x = $e.canvasX;
            startPos.y = $e.canvasY;

            $sprite.$scroll.speedX = 0;
            $sprite.$scroll.speedY = 0;
        } else {
            $sprite.$scroll.$scrolling = true;

            let absX = Math.abs($e.canvasX - startPos.x);
            let absY = Math.abs($e.canvasY - startPos.y);
            let deltaTime = now - touching;
            touching = now;

            if (absX >= 1 && deltaTime > 1) {
                $sprite.$scroll.speedX += ($e.canvasX - startPos.x) / deltaTime * 10;
            }
            if (absY >= 1 && deltaTime > 1) {
                $sprite.$scroll.speedY = ($e.canvasY - startPos.y) / deltaTime * 50;
                $sprite.scroll.scrollY += startPos.y - $e.canvasY;
            }

            startPos.x = $e.canvasX;
            startPos.y = $e.canvasY;

            // $e.event.preventDefault();
            return true;
        }
    },

    wheel: function ($sprite, $e) {
        if (!$sprite.scroll.scrollable) return false;

        $sprite.$scroll.$scrolling = true;

        $sprite.$scroll.speedX = $e.event.wheelDeltaX;
        $sprite.$scroll.speedY = $e.event.wheelDeltaY;

        // $e.event.preventDefault();
        return true;
    }
};

const component = function (opt) {
    let option = opt || {};

    option.scroll = Object.assign({
        scrollX: 0,
        scrollY: 0,
        scrollable: true,
        minScrollX: 0,
        maxScrollX: 0,
        minScrollY: 0,
        maxScrollY: 0,
    }, opt.scroll);

    option.events = {
        interceptor: function ($e) {
            if ($e.type === 'touchmove') {
                scrollFuncs.touch(this, $e);
            } else if ($e.type === 'mousewheel') {
                scrollFuncs.wheel(this, $e);
            } else if ($e.type === 'touchend' || $e.type === 'mouseup') {
                scrollFuncs.loose(this);
            }

            // $e.$stopPropagation = true;
            return $e;
        },
        // touchmove: function ($e) {
        //     scrollFuncs.touch(this, $e);
        // },
        // mousewheel: function ($e) {
        //     scrollFuncs.wheel(this, $e);
        // },
        // touchend: function () {
        //     scrollFuncs.stop();
        // },
        // mouseup: function () {
        //     scrollFuncs.stop();
        // },
    };

    let $sprite = new ec.class.sprite(option);

    $sprite.on('ticked', () => {
        scrollFuncs.looper($sprite);
    });

    $sprite.$scroll = {
        speedX: 0,
        speedY: 0,
    };

    let $scrollingElement = $sprite.add({
        name: 'scrolling-element',
        style: {
            tx: function () {
                return -this.$parent.scroll.scrollX;
            },
            ty: function () {
                return -this.$parent.scroll.scrollY;
            },
        }
    });

    $sprite.add = $scrollingElement.add.bind($scrollingElement);

    return $sprite;
}

const init = function (Easycanvas, namespace) {
    ec = Easycanvas;
    Easycanvas.class[namespace] = component;
};

if (inBrowser && window.Easycanvas) {
    ec = Easycanvas;
    Easycanvas.class.scroll = component;
} else {
    module.exports = init;
}
