// 监听页面发起的__EASYCANVAS_BRIDGE_TOPANEL__事件，一般用于选择元素时
document.addEventListener('__EASYCANVAS_BRIDGE_TOPANEL__', (recieveData) => {
    if (!recieveData.detail) return;
	chrome.runtime.sendMessage(recieveData.detail);
});