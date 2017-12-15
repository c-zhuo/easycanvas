var fs = require('fs');
var source = fs.readFileSync('./readme/readme.md', 'utf8');

var support = ['Chinese', 'English'];

var commonRegExp = '^\\[' + 'All' + '\\]';
commonRegExp = new RegExp(commonRegExp, 'g');

var filter = function (lan) {
	var currentRegExp = '^\\[' + lan + '\\]';
	currentRegExp = new RegExp(currentRegExp, 'g');

	var current = source.split('\n').map(function (line) {
		if (line === '') return '';

		var match = line.match(currentRegExp);
		if (match) {
			return line.replace(match[0], '');
		}

		match = line.match(commonRegExp);
		if (match) {
			return line.replace(match[0], '');
		}

		return line.substr(0, 1) === '[' ? null : line;
	});

	fs.writeFileSync('./readme/build/' + lan + '.md', current.filter(function (line) {
		return line !== null;
	}).join('\n'));
};

support.forEach(filter);
