/** ********** *
 *
 * scroll
 * - Event listeners
 *
 * ********** **/

const inBrowser = typeof window !== 'undefined';
const devicePixelRatio = window.devicePixelRatio || 1;

let ec;
let mutipleScrollLock;

let scrollFuncs = {
    loose: function ($sprite) {
        $sprite.$scroll.touching = false;
    },

    looper: function ($sprite) {
        if (!$sprite.$scroll || !$sprite.$scroll.$scrolling) return;

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

        if ($sprite.$scroll.touching) return;

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

        if (!$sprite.$scroll.touching) {
            // start scroll
            $sprite.$scroll.touching = now;
            $sprite.$scroll.quickTouch = now;

            $sprite.$scroll.startPos.x = $e.canvasX;
            $sprite.$scroll.startPos.y = $e.canvasY;

            $sprite.$scroll.speedX = 0;
            $sprite.$scroll.speedY = 0;
        } else {
            $sprite.$scroll.$scrolling = true;

            let deltaX = ($sprite.$scroll.startPos.x - $e.canvasX);
            let deltaY = ($sprite.$scroll.startPos.y - $e.canvasY);

            let deltaTime = now - $sprite.$scroll.touching;
            $sprite.$scroll.touching = now;

            if ($sprite.scroll.scrollX + deltaX < $sprite.scroll.minScrollX ||
                $sprite.scroll.scrollX + deltaX > $sprite.scroll.maxScrollX) {
                if ($sprite.scroll.flexibleX) deltaX >>= 3;
                else deltaX = 0;
            }
            if ($sprite.scroll.scrollY + deltaY < $sprite.scroll.minScrollY ||
                $sprite.scroll.scrollY + deltaY > $sprite.scroll.maxScrollY) {
                if ($sprite.scroll.flexibleY) deltaY >>= 3;
                else deltaY = 0;
            }

            if (Math.abs(deltaX) >= 1 && deltaTime > 1) {
                let newSpeedX = ($e.canvasX - $sprite.$scroll.startPos.x) * 6 / devicePixelRatio;
                $sprite.$scroll.speedY = Math.abs(newSpeedX / 2) > Math.abs($sprite.$scroll.speedX) ? newSpeedX : $sprite.$scroll.speedX;
                $sprite.scroll.scrollX += deltaX;
            }
            if (Math.abs(deltaY) >= 1 && deltaTime > 1) {
                let newSpeedY = ($e.canvasY - $sprite.$scroll.startPos.y) * 6 / devicePixelRatio;
                // $sprite.$scroll.speedY = Math.abs(newSpeedY) < Math.abs($sprite.$scroll.speedY / 2) ? $sprite.$scroll.speedY / 2 : newSpeedY;
                $sprite.$scroll.speedY = Math.abs(newSpeedY / 2) > Math.abs($sprite.$scroll.speedY) ? newSpeedY : $sprite.$scroll.speedY;
                $sprite.scroll.scrollY += deltaY;
            }

        // $sprite.$scroll.speedX = ($sprite.$scroll.speedX + ($e.canvasX - startPos.x) * 2) / 2;

        // let curSpeed = ($e.canvasY - startPos.y) * 3;
        // $sprite.$scroll.speedY = ($sprite.$scroll.speedY + curSpeed) / 2;

            $sprite.$scroll.startPos.x = $e.canvasX;
            $sprite.$scroll.startPos.y = $e.canvasY;

            // $e.event.preventDefault();
            if (Math.abs(deltaX) > Math.abs(deltaY) + 1) return 1;
            else if (Math.abs(deltaX) < Math.abs(deltaY) - 1) return 2;
        }
    },

    wheel: function ($sprite, $e) {
        if (!$sprite.scroll.scrollable) return false;

        $sprite.$scroll.$scrolling = true;

        $sprite.$scroll.speedX = $e.event.wheelDeltaX;
        $sprite.$scroll.speedY = $e.event.wheelDeltaY;

        // $e.event.preventDefault();
        $e.stopPropagation();
    }
};

const component = function (opt) {
    let autoScroll = false;

    let option = opt || {};

    option.scroll = Object.assign({
        scrollX: 0,
        scrollY: 0,
        scrollable: true,
        minScrollX: 0,
        maxScrollX: 0,
        minScrollY: 0,
        maxScrollY: 0,
        propagationX: false,
        propagationY: false,
    }, opt.scroll);

    const autoScrollFunc = () => {
        if (autoScroll) {
            $sprite.scroll.scrollY = autoScroll();
        } else {
            $sprite.off('ticked', autoScrollFunc);
        }
    };

    // let handling = true;
    // const handleToggle = () => {
    //     handling = !handling;
    // };

    let started = false;

    option.events = Object.assign({
        touchstart: function ($e) {
            // 先结束，防止之前拖动时拖到外面，导致没触发loose
            scrollFuncs.loose(this);

            started = true;
            mutipleScrollLock = false;

            scrollFuncs.touch(this, $e);

            // scroll外面还有一个scroll的时候，让事件传递出去
            if (!$sprite.scroll.propagationX && !$sprite.scroll.propagationY) {
                $e.stopPropagation();
            }
        },
        touchmove: function ($e) {
            if (!started) return;

            if (mutipleScrollLock && this !== mutipleScrollLock) {
                // console.log('rejected!', mutipleScrollLock);
                return;
            }

            let moveDirect = scrollFuncs.touch(this, $e);
            if (moveDirect === 1 && $sprite.scroll.propagationY) {
                $e.stopPropagation();
                mutipleScrollLock = this;
                // console.log('locked', mutipleScrollLock);
            } else if (moveDirect === 2 && $sprite.scroll.propagationX) {
                $e.stopPropagation();
                mutipleScrollLock = this;
                // console.log('locked', mutipleScrollLock);
            }
        },
        mousewheel: function ($e) {
            started = true;

            scrollFuncs.wheel(this, $e);
            $e.stopPropagation();
        },
        touchend: function () {
            started = false;
            scrollFuncs.loose(this);
        },
        mouseup: function () {
            started = false;
            scrollFuncs.loose(this);
        },
    }, option.events || {});

    if (option.scroll.capture) {
        option.events.interceptor = ($e) => {
            if ($sprite.events[$e.type]) {
                $sprite.events[$e.type].call($sprite, $e);
                return false;
            }
            return $e;
        };
    }

    let $sprite = new ec.class.sprite(option);

    $sprite.on('ticked', () => {
        scrollFuncs.looper($sprite);
    });

    // $sprite.on('handleToggle', handleToggle);

    $sprite.on('scrollTo', (position, duration, callback) => {
        autoScroll = ec.transition.pendulum(
            $sprite.scroll.scrollY,
            position,
            (duration || 200) * 2,
            {
                cycle: 0.5,
            }
        ).then(() => {
            autoScroll = false;

            callback && callback();
        });

        $sprite.on('ticked', autoScrollFunc);
    });

    $sprite.$scroll = {
        speedX: 0,
        speedY: 0,
        touching: false,
        startPos: {},
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
    $sprite.clear = $scrollingElement.clear.bind($scrollingElement);
    $sprite.getChildren = () => {
        return $scrollingElement.children;
    };

    return $sprite;
}

const init = function (Easycanvas, namespace) {
    ec = Easycanvas;
    if (namespace) {
        Easycanvas.class[namespace] = component;
    }

    return component;
};

if (inBrowser && window.Easycanvas) {
    ec = Easycanvas;
    Easycanvas.class.scroll = component;
} else {
    module.exports = init;
}
