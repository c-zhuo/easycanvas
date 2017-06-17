## easycanvas

### 过渡渐变 / Transition

#### 线性 linear

`EasyCanvas.transition.linear(1, 10, 1000)`
在1秒的时间内，值将从1匀速增大到10，然后保持10不变。
Value increases from 1 to 10 in constant speed, in one second, then stays at 10.

#### 钟摆 pendulum

`EasyCanvas.transition.pendulum(1, 100, 500)`
值将从1逐渐变化到100，之后再渐变回1.越接近中间值，速度越快（符合三角函数）。
Value gradually increasing from 1 to 100, then back to 1. The closer to the middle value, the faster the increasing is, as

```
EasyCanvas.transition.pendulum(1, 100, 500, {
    start: -Math.PI,
    end: 0,
    cycle: Math.PI
});
```
你可以追加第四个参数来传入角度、周期，例如这个例子与下面的1/2钟摆相同。
You can add the 4th parameter to controll the degrees of a pendulum, which is the same as the next example.

#### 1/2钟摆 halfPendulum

`EasyCanvas.transition.halfPendulum(1, 100, 500)`
值将从1逐渐变化到100.越接近中间值，速度越快（符合三角函数）。
Value gradually increasing from 1 to 100. The closer to the middle value, the faster the increasing is.

### 组合 / Combination

#### 修饰 / alter

`EasyCanvas.transition.linear(1, 100, 500).loop()`
当值变化到100后，将循环这个变化（立即变为1，然后逐渐变为100）。
When the value increases to 100, it will change to 1 immediately, then gradually increasing from 1 to 100 again and again.

`EasyCanvas.transition.pendulum(1, 100, 500).stay()`
完成一个周期后，停留在起点1。
Value will stay at 1 after a cycle.

**linear默认是stay的，pendulum默认是loop的，除非将它们扔进一个队列中：**
**linear is `stay` and pendulum is `loop` by default, unless in a queue:**

#### 队列 / queue

```
EasyCanvas.transition.oneByOne(
    [
    EasyCanvas.transition.linear(10, 50, 400),
    EasyCanvas.transition.halfPendulum(50, 400, 500),
    ]
).loop(),
```

队列中的渐变将依次进行，前一个结束后，下一个才会开始计时。支持将整个队列设置为loop循环。队列中的每一个渐变默认不会stay和loop，并且一旦出现stay或者loop，那么整个队列将无法loop，因为这些渐变将永远不会结束。

Transitions in a quese will display one by one. The following transition's timer will not start until the current is over. You can set `loop` to the whole queue. Any transtion in a queue will not `stay` or `loop` by default. If set, the queue can not loop any more, because those transitions will never stop.
