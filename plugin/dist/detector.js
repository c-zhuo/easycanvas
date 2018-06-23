window.addEventListener('message', e => {
    if (e.source === window && e.data.easyCanvasDetected) {
        chrome.runtime.sendMessage(e.data);
    }
});
function detect (win) {
    setTimeout(() => {
        if (win.__EASYCANVAS_DEVTOOL__) {
            win.console.log('[Easycanvas] Easycanvas found ' + win.__EASYCANVAS_DEVTOOL__.version + ', the developer tool is effective.');

            win.postMessage({
                name: 'paintRecording',
                easyCanvasDetected: '1'
            }, '*');
        } else {
            win.postMessage({
                name: 'paintRecording',
                easyCanvasDetected: '0'
            }, '*');
        }
    }, 100);
}

if (document instanceof HTMLDocument) {
    const script = document.createElement('script');
    script.textContent = ';(' + detect.toString() + ')(window)';
    document.documentElement.appendChild(script);
    script.parentNode.removeChild(script);
}
