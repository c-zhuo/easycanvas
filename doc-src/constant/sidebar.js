const tree = `
    - 介绍
    一些demo
    概述
    更新日志（Latest：2019-9-9）
    - 快速开始
    浏览器中引入
    npm引入与JSX写法
    通过脚手架创建工程
    在微信小程序环境使用
    在微信小游戏环境使用
    - 基础教程
    创建并添加一个对象
    图片渲染与处理
    嵌套与继承
    事件
    文本
    样式获取与更新
    状态钩子
    自定义事件
    - API
    Sprite-API
    Event-API
    Transition-API
    - 组件
    开始使用组件
    容器组件View
    单行文本Text
    帧动画Sequence
    滚动容器Scroll
    输入框Input
    按钮组件Button（用法暂时参考Demo）
    拖拽组件Draggable（文档待补充）
    - 插件
    物理引擎
    WebGL
    WebGL-加载3DS模型
    WebGL-加载MMD模型
    WebGL-其它格式的模型
    自定义插件（文档待补充）
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
