const ProcessingFlag = 'processing';
const ProcessingPool = {};

function toDataUR (url, callback) {
    if (url && url.match(/^data:/)) {
        callback && callback(url);
        return;
    }

    if (ProcessingPool[url]) {
        if (ProcessingPool[url] !== ProcessingFlag) {
            callback(ProcessingPool[url]);
        } else {
            setTimeout(function () {
                toDataUR(url, callback);
            }, 100);
        }
        return;        
    }

    ProcessingPool[url] = ProcessingFlag;

    let xhr = new XMLHttpRequest();
    xhr.onload = function() {
        let reader = new FileReader();
        reader.onloadend = function () {
            ProcessingPool[url] = reader.result;
            callback && callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}

module.exports = toDataUR;