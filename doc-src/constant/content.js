import intro from './intro';

const contentProcessor = (str) => {
    let splits = str.split(/<\/*code>/);
    splits = splits.map((str, i) => {
        if (i % 2) {
            let margin = '                ';
            str = str
                .replace(/\</g, '&lt;')
                .replace(/\</g, '&lt;')
                .split(/\n/)
                .slice(1, -1) // 首尾是空行;
                .map((line) => {
                    let res = line;
                    if (line.indexOf(margin) === 0) {
                        res = line.substr(margin.length);
                    } else if (line.indexOf(margin.substr(0, margin.length - 4)) === 0) {
                        res = line.substr(margin.length - 4);
                    } else {
                        res = line;
                    }
                    return res.replace(/ /g, '&nbsp;');
                })
                .join('<br>');
            return '<code>' +
                str +
                '</code>';
        }
    
        return str;
    });

    return splits.join('');
};

export default (callback) => {
    callback(contentProcessor(intro))

    import('./component').then(({ default: str }) => {
        callback(contentProcessor(str));
    });

    import('./plugin').then(({ default: str }) => {
        callback(contentProcessor(str));
    });

    import('./quickstart').then(({ default: str }) => {
        callback(contentProcessor(str));
    });

    import('./base').then(({ default: str }) => {
        callback(contentProcessor(str));
    });

    import('./api').then(({ default: str }) => {
        callback(contentProcessor(str));
    });

    import('./senior').then(({ default: str }) => {
        callback(contentProcessor(str));
    });
};
