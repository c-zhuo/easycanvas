let created = false;
let checkCount = 0;

chrome.devtools.network.onNavigated.addListener(createPanelIfHasEasyCanvas);
const checkVueInterval = setInterval(createPanelIfHasEasyCanvas, 1000);
createPanelIfHasEasyCanvas();

function createPanelIfHasEasyCanvas () {
    if (created || checkCount++ > 10) {
        return;
    }
    chrome.devtools.inspectedWindow.eval(
        '!!(window.__EASYCANVAS_DEVTOOL__)',
        (hasEasyCanvas) => {
            if (!hasEasyCanvas || created) {
                return;
            } 
            clearInterval(checkVueInterval);
            created = true;
            createPanels();
        }
    );
}

function createPanels () {
    chrome.devtools.panels.create('Easycanvas',
        'icon.png',
        'panel.html',
        function (extensionPanel) {
            let _window;
            const contentScriptData = [];

            // 与后台网页消息通信-长连接
            const port = chrome.runtime.connect({name: 'devtools'});
            // 监听来自页面中的事件，content-sctipt background devtool
            port.onMessage.addListener((message) => {
                if (_window && _window.contentScriptReceiver) {
                    _window.contentScriptReceiver(message);                
                } else {
                    contentScriptData.push(message);
                }
            });
            port.postMessage({
                name: 'original',
                tabId: chrome.devtools.inspectedWindow.tabId
            });
            // 执行代码
            const sendMessageToBackground = (message, callback) => {
                chrome.devtools.inspectedWindow.eval(message, (value) => {
                    callback && callback(value);
                });
            };

            extensionPanel.onShown.addListener((panelWindow) => {
                _window = panelWindow;
                // 审查窗口
                _window.inspectedWindow = chrome.devtools.inspectedWindow;

                _window.respond = function (msg, callback) {
                    sendMessageToBackground(msg, callback);
                };

                while (contentScriptData.length !== 0) {
                    _window.contentScriptReceiver(contentScriptData.shift());
                }
            });
        }
    );
}
