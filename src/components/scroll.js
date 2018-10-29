/** ********** *
 *
 * scroll
 * - Event listeners
 *
 * ********** **/

const inBrowser = typeof window !== 'undefined';

let ec;
let mutipleScrollLock;

// $sprite.$scroll.$wheeling用于在Chrome移动端下适配双指滑动的wheel事件

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

        if (Math.abs($sprite.$scroll.speedX) <= 1 && Math.abs($sprite.$scroll.speedY) <= 1) {
            $sprite.$scroll.$scrolling = false;
            $sprite.$scroll.$wheeling = false;
            return;
        }

        if ($sprite.$scroll.touching) {
            // 已经有100毫秒没有touchmove事件了，认为停止移动，清空速度
            // $sprite.$scroll.speedX *= 0.8;
            // $sprite.$scroll.speedY *= 0.8;
            return;
        }

        $sprite.scroll.scrollY -= $sprite.$scroll.speedY;
        $sprite.scroll.scrollX -= $sprite.$scroll.speedX;

        if (!$sprite.$scroll.touching && !$sprite.$scroll.$wheeling && Math.abs($sprite.$scroll.speedY) < 50 && $sprite.scroll.anchors && $sprite.scroll.anchors.length) {
            let range = $sprite.scroll.anchorsRange || 400;
            for (let i = 0; i < $sprite.scroll.anchors.length; i++) {
                let m = $sprite.scroll.anchors[i];
                let delta = $sprite.scroll.scrollY - m;
                if (
                    (delta > 0 && delta < range && $sprite.$scroll.speedY > 0) ||
                    (delta < 0 && delta > -range && $sprite.$scroll.speedY < 0)
                ) {
                    $sprite.trigger('scrollTo', m, 200);
                    $sprite.$scroll.speedY = 0;
                    break;
                }
            }
        }

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
        let now = Date.now();

        $sprite.$scroll.$wheeling = false;

        if (!$sprite.$scroll.touching) {
            // start scroll
            $sprite.$scroll.touching = now;
            $sprite.$scroll.quickTouch = now;
            $sprite.$scroll.lastTouchSpeed = 0;

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

            let minScrollX = ec.utils.funcOrValue($sprite.scroll.minScrollX, $sprite);
            let maxScrollX = ec.utils.funcOrValue($sprite.scroll.maxScrollX, $sprite);
            let minScrollY = ec.utils.funcOrValue($sprite.scroll.minScrollY, $sprite);
            let maxScrollY = ec.utils.funcOrValue($sprite.scroll.maxScrollY, $sprite);

            if ($sprite.scroll.scrollX + deltaX < minScrollX ||
                $sprite.scroll.scrollX + deltaX > maxScrollX) {
                if ($sprite.scroll.flexible || $sprite.scroll.flexibleX) deltaX >>= 3;
                else deltaX = 0;
            }
            if ($sprite.scroll.scrollY + deltaY < minScrollY ||
                $sprite.scroll.scrollY + deltaY > maxScrollY) {
                if ($sprite.scroll.flexible || $sprite.scroll.flexibleY) deltaY >>= 3;
                else deltaY = 0;
            }

            if (Math.abs(deltaX) >= 1 && deltaTime > 1) {
                let newSpeedX = ($e.canvasX - $sprite.$scroll.startPos.x) / deltaTime * 20;
                $sprite.$scroll.speedX = newSpeedX;
                $sprite.scroll.scrollX += deltaX;
            }
            if (Math.abs(deltaY) >= 1 && deltaTime > 1) {
                let newSpeedY = ($e.canvasY - $sprite.$scroll.startPos.y) / deltaTime * 20;
                $sprite.$scroll.speedY = ($sprite.$scroll.lastTouchSpeed + newSpeedY) / ($sprite.$scroll.lastTouchSpeed ? 2 : 1);
                $sprite.$scroll.lastTouchSpeed = newSpeedY;
                $sprite.scroll.scrollY += deltaY;
            }

            $sprite.$scroll.startPos.x = $e.canvasX;
            $sprite.$scroll.startPos.y = $e.canvasY;

            // $e.event.preventDefault();
            if (Math.abs(deltaX) > Math.abs(deltaY) + 1) return 1;
            else if (Math.abs(deltaX) < Math.abs(deltaY) - 1) return 2;
        }
    },

    wheel: function ($sprite, $e) {
        $sprite.$scroll.speedX = ec.utils.funcOrValue($sprite.scroll.scrollableX, $sprite) ? $e.event.wheelDeltaX : 0;
        $sprite.$scroll.speedY = ec.utils.funcOrValue($sprite.scroll.scrollableY, $sprite) ? $e.event.wheelDeltaY : 0;

        $sprite.$scroll.$scrolling = true;
        $sprite.$scroll.$wheeling = true;

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
        scrollableX: function () {
            return (this.style.overflowX || this.style.overflow) !== 'hidden';
        },
        scrollableY: function () {
            return (this.style.overflowY || this.style.overflow) !== 'hidden';
        },
        minScrollX: 0,
        maxScrollX: function () {
            let max = 0;
            this.getChildren().forEach((child) => {
                let currentMax = child.getSelfStyle('tx') + child.getSelfStyle('tw') - this.getStyle('tw');
                if (currentMax > max) max = currentMax;
            });
            return max;
        },
        minScrollY: 0,
        maxScrollY: function () {
            let max = 0;
            this.getChildren().forEach((child) => {
                let currentMax = child.getSelfStyle('ty') + child.getSelfStyle('th') - this.getStyle('th');
                if (currentMax > max) max = currentMax;
            });
            return max;
        },
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
            // console.log($e.canvasX)

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
        lastTouchSpeed: 0,
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
