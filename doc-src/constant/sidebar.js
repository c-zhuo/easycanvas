const tree = `
    - 介绍
    概述
    快速开始
    创建实例
`;

let response = [];

response = tree.split(/\n/)
    .map((item) => {
        return item.trim();
    })
    .filter((item) => {
        return item.length;
    })
    .map((item) => {
        if (~item.indexOf('- ')) {
            return {
                name: item.substr(2),
                type: 'folder',
            };
        } else {
            return {
                name: item,
                type: 'title',
            };
        }
    });

console.log(response);

module.exports = response;
