## perf-fps

### 简介

采集页面fps（移除tab切换和浏览器sleep产生的脏数据），并上报到perf性能监控平台。

### 使用示例

```

var perfFps = require('@hfe/perf-fps');
perfFps();

// 可配置项：
perfFps({
    // 开始采集的延迟毫秒数，默认1000（从第二秒开始采集，避免第一秒数据较脏）
    start: 1500,
    // 上报的时间点，毫秒数，默认4500（会上报时间范围内的均值，end - start <= 1000 时不会上报）
    end: 5000,
    // 是否为开发测试环境，可以通过环境变量来动态配置，默认false，为true时不会上报（会console出结果）
    develop: false,
    // 开启精简模式，默认false。会忽略tab切换、浏览器sleep引起的fps脏数据（部分机型/app下失效，但不会引起js报错）
    lite: false,
    // 上报的指标名称，默认为FPS＋当前url的后两节path，例如buy/result.html会上报为FPS_buy_result_html
    key: 'FPS_main_list'
});

// 注：perfFps()后，可以在任意时间点调用perfFps.send()，立即上报前一段时间的FPS均值。通常用于即将发生页面跳转时。

```

### 注意事项

非develop下，上报功能借助了performace的自定义上报功能，上报时需要页面加载完perf脚本。由于FPS上报时间较晚，一般不需要额外处理。即使perf未加载，也不会报错，只是无法上报。

上报的结果可以在perf平台左侧“数据——数据”里找到，为了便于长期使用，建议添加到“数据——图表”中。
