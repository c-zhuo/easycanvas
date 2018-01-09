var fs = require('fs');

var support = ['Chinese', 'English'];

var commonRegExp = '^\\[' + 'All' + '\\]';
commonRegExp = new RegExp(commonRegExp, 'g');

const distPath = './readme/build/';
const srcPath = './readme/src/';

var filter = function (source, lan, filename) {
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

	fs.writeFileSync('./readme/build/' + filename.replace(/\.md/ig, '') + '.' + lan + '.md', current.filter(function (line) {
		return line !== null;
	}).join('\n'));
};

// remove all file in build
fs.readdirSync(distPath).forEach(function (file) {
	fs.unlinkSync(distPath + file);
});

var dirList = fs.readdirSync(srcPath);
dirList.forEach(function (item) {
	var source = fs.readFileSync(srcPath + item, 'utf8');
	support.forEach(function (lan) {
		filter(source, lan, item);
	});
});
