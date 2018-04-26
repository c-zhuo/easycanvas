<template>
    <section>
        <div v-if="$state.perf.navigator">
            <div>
                浏览器尺寸：{{ $state.perf.navigator.clientWidth }} x {{ $state.perf.navigator.clientHeight }}，设备像素比{{ $state.perf.navigator.devicePixelRatio }}
            </div>
            <div v-for="canvas in $state.perf.canvas">
                <div v-if="canvas.fps">
                    [{{ canvas.name }}]:
                    像素尺寸{{ canvas.size.canvasWidth }} x {{ canvas.size.canvasHeight }}
                    渲染尺寸{{ canvas.size.styleWidth }} x {{ canvas.size.styleHeight }}
                </div>
            </div>
            <div v-for="canvas in $state.perf.canvas">
                <div v-if="canvas.fps">
                    [{{ canvas.name }}]:
                    FPS：{{ canvas.fps }}
                    绘制API调用次数：{{ canvas.perf.paintTimes }}/s
                    <!-- 绘制面积：{{ canvas.perf.paintArea }}/s，{{ canvas.perf.paintArea / canvas.fps }}/帧 -->
                    每帧读取图片：{{ (canvas.perf.loadArea / canvas.fps / ($state.perf.navigator.clientWidth * $state.perf.navigator.clientHeight)).toFixed(2) }}个屏幕
                    每帧绘制面积：{{ (canvas.perf.paintArea / canvas.fps / ($state.perf.navigator.clientWidth * $state.perf.navigator.clientHeight)).toFixed(2) }}个屏幕
                    easycanvas每帧跳过绘制面积：{{ (canvas.perf.jumpArea / canvas.fps / ($state.perf.navigator.clientWidth * $state.perf.navigator.clientHeight)).toFixed(2) }}个屏幕
                </div>
                <div v-if="canvas.fps">
                    [{{ canvas.name }}]:
                    HTML5渲染API性能消耗{{ canvas.perf.paintTimeSpend / 10 }}%
                    easycanvas渲染预处理性能消耗{{ canvas.perf.preprocessTimeSpend / 10 }}%
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import constants from 'constants';
import Bus from '../bus.js';

export default {
    data () {
        return {
        };
    },
    computed: {
        perf () {
            return this.$state.perf;
        }
    },
    watch: {
    },
    components: {
    },
    methods: {
    }
};
</script>


<style lang="scss" scoped>
@import '../variables.scss';


</style>
