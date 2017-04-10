module.exports = {
	funcOrValue: function (funcOrValue, _this) {
		if (typeof funcOrValue === 'function') {
			return funcOrValue.call(_this);
		}

		return funcOrValue;
	}
};
