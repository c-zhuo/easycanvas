module.exports = function (onActive, onSleep) {
    var notIE = (document.documentMode === undefined),
        isChromium = window.chrome;
    var addLis = window.addEventListener || window.attachEvent;

    if (!addLis) return;

    // handle浏览器tab切换
    if (onActive) {
        addLis('focus', function () {
            onActive();
        }, false);

        if (notIE && !isChromium) {
            addLis('focusin', function () {
                onActive();
            }, false);
        }
    }

    if (onSleep) {
        addLis('blur', function () {
            onSleep();
        }, false);

        if (notIE && !isChromium) {
            addLis('focusout', function () {
                onActive();
            }, false);
        }
    }

    // handle系统sleep和awake浏览器
    var vis = (function () {
        var stateKey, eventKey;
        var keys = {
                    hidden: 'visibilitychange',
                    webkitHidden: 'webkitvisibilitychange',
                    mozHidden: 'mozvisibilitychange',
                    msHidden: 'msvisibilitychange'
            };
        for (stateKey in keys) {
            if (stateKey in document) {
                eventKey = keys[stateKey];
                break;
            }
        }
        return function (c) {
            if (c) document.addEventListener(eventKey, c);
            return !document[stateKey];
        }
    })();

    vis(function () {
        if(vis()) {
            setTimeout(function () {            
                if (onActive) {
                    onActive();
                }
            }, 100);     
            if (onActive) {
                onActive();
            }
        } else {
            setTimeout(function () {            
                if (onSleep) {
                    onSleep();
                }
            }, 100);     
            if (onSleep) {
                onSleep();
            }
        }
    });
};
