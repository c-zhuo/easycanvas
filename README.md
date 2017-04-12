## easy-canvas

### 简介 / Introduction

使用canvas绘制动画。

### 使用示例

```

Vue.use(require('easy-vuex'), {
    state: {
        foo: 'bar',
    },
    getters: {
        computedFoo () {
            return this.foo + 'hey';
        }
    },
    actions: {
        setFoo () {
            this.foo = 'baz';
            var that = this;
            setTimeout(function () {
            	that.foo = 'bar';
            }, 1000);
        }
    }
});

```

```

<div @click="$actions.setFoo">{{ $state.foo }}{{ $getters.computedFoo }}</div>

```

会作用于全局，js代码里可以通过this.$state等访问数据和方法。
