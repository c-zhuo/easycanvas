var transitions = [];

var second2frame = function (second) {
	return second / 1000 * 60;
};

module.exports = {
	linear: function (a, b, duration) {
		var l = transitions.length;
		transitions.push(a);
		return function () {
			var current = transitions[l];
			if ((current >= a && current < b) || (current > b && current <= a)) {
				transitions[l] += (b - a) / second2frame(duration);
			} else {
				return b;
			}
			return current;
		};
	},

	pendulum: function (a, b, duration) {
		var l = transitions.length;
		transitions.push(0);
		return function () {
			var current = Math.sin(transitions[l]) + 1; // 0 ~ 2
			transitions[l] += 3.1416 / second2frame(duration);
			return a + (b - a) * current / 2;
		};
	}
};
