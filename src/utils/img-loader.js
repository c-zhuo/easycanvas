var Cache = {};

module.exports = function (url, callback) {
	if (Cache[url] && Cache[url] !== 'processing') {
		setTimeout(function () {
			if (callback) {
				callback(Cache[url]);
			}
		});
		return Cache[url];
	}

	var i = new Image();
	i.src = url;
	Cache[url] = i;		

	i.onload = function () {
		if (callback) {
			callback(i);
		}
	}

	return i;
};
