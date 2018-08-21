const tree = `
    - 介绍
    一些demo
    概述
    快速开始（浏览器与Node环境）
    快速开始（微信小程序环境）
    快速开始（微信小游戏环境）
    更新日志（Latest：2018-09-01）
    - 基础教程
    图片渲染与处理
    嵌套与继承
    事件
    文本
    样式获取与更新
    精灵动画
    状态钩子
    自定义事件
    - 扩展插件
    物理引擎
    WebGL
    WebGL-加载3DS模型
    WebGL-加载MMD模型
    渐变效果插件（文档待补充）
    自定义插件（文档待补充）
    - 组件
    滑动组件scroll（文档待补充）
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

module.exports = response;
