module.exports = {
	funcOrValue: function (funcOrValue, _this) {
		if (typeof funcOrValue === 'function') {
			return funcOrValue.call(_this);
		}

		return funcOrValue;
	},

	getMinFromArray: function (arr) {
		var res = arr[0];
		arr.forEach(function (item) {
			if (item < res) res = item;
		});
		return res;
	},
};
