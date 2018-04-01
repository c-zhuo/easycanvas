const tree = `
    - 介绍
    概述
    快速开始
    - 教程
    图片渲染与处理
    嵌套与继承
    事件（文档待补充）
    文本（文档待补充）
    精灵动画（文档待补充）
    状态钩子（文档待补充）
    - 插件
    物理引擎（文档待补充）
    webgl（文档待补充）
    数字效果（文档待补充）
    自定义插件（文档待补充）
    - API
    Sprite API（文档待补充）
    Painter API（文档待补充）
`;

let response = [];

tree.split(/\n/)
    .map((item) => {
        return item.trim();
    })
    .filter((item) => {
        return item.length;
    })
    .forEach((item) => {
        if (~item.indexOf('- ')) {
            response.push({
                name: item.substr(2),
                type: 'folder',
                children: [],
            });
        } else {
            response[response.length - 1].children.push({
                name: item,
                type: 'title',
            });
        }
    });

console.log(response);

module.exports = response;
