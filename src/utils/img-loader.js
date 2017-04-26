var Cache = {};

module.exports = function (url, callback, option) {
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
		var _option = option || {};
		if (_option.alphaColor) {
			var tempCavas = document.createElement('canvas');
			var cts = tempCavas.getContext('2d');
			tempCavas.width = i.width;
			tempCavas.height = i.height;
			cts.drawImage(i, 0, 0);

			var data = cts.getImageData(0, 0, i.width, i.height);
			var pixel = [];
			for (var d = 0; d < data.data.length; d += 4) {
				var perPixel = data.data.slice(d, d + 4);
				var colorWeight = data.data[d] + data.data[d + 1] + data.data[d + 2];
				if (data.data[d] < 30 && data.data[d + 1] < 30 && data.data[d + 2] < 30) {
					data.data[d + 3] = parseInt(colorWeight / 255);
				}
			}
			cts.putImageData(data, 0, 0);
			i = tempCavas;
			Cache[url] = i;
		}

		if (callback) {
			callback(i);
		}
	}

	return i;
};
