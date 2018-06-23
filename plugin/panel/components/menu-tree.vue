<template>
    <section>
        <div class="left">
            <div class="tabs">
                <div
                    class="tabs-tab base64-selector"
                    title="Select an element in the page to inspect it"
                    :class="{ active: selectorActive }"
                    @click="chooseSelector">
                </div>
                <div
                    class="tabs-tab"
                    :title="!debuggerCanvas ? 'Pause canvas' : 'Resume canvas'"
                    :class="{ 'debugger-canvas': !debuggerCanvas, 'debugger-canvas-active': debuggerCanvas }"
                    @click="toggleDebuggerCanvas">
                </div>
                <div 
                    class="tabs-tab"
                    v-for="(key, item) in canvas"
                    :key="index"
                    :class="{ active: key === activeCanvas }"
                    @click="chooseCanvas(key)">
                    {{item.name}}
                </div>
            </div>
            <div class="content">
                <template v-for="element in rootElement">
                    <v-element
                        v-if="$index < maxVisibleElementsCount"
                        :key="$key"
                        :canvas-id="activeCanvas"
                        :instance-id="$key"
                        :depth="0">
                    </v-element>
                </template>
                <div
                    class="content-showMore"
                    v-if="visibleShowMore"
                    @click="maxVisibleElementsCount += 10">Show more</div>
            </div>
        </div>
        <div class="right">
            <v-detail></v-detail>
        </div>
    </section>
</template>

<script>
import constants from 'constants';
import vElement from './element.vue';
import vDetail from './detail.vue';
import Bus from '../bus.js';

export default {
    data () {
        window.A = this;
        return {
            activeCanvas: null,
            debuggerCanvas: false,

            maxVisibleElementsCount: 10,
        };
    },
    computed: {
        visibleShowMore () {
            return this.elements && (this.maxVisibleElementsCount < Object.keys(this.rootElement).length);
        },
        rootElement () {
            if (!this.elements) return [];

            let roots = {};
            for (var i in this.elements) {
                if (!this.elements[i].parent) {
                    roots[i] = this.elements[i];
                }
            }

            return roots;
        },
        selectorActive () {
            return this.$state.selectorActive;
        },
        isPaintRecording: {
            get () {
                return this.$state.isPaintRecording;
            },
            set (newValue) {
                this.$actions.setIsPaintRecording(newValue);
            },
        },
        canvas () {
            return this.$state.elements;
        },
        elements () {
            return this.$state.elements[this.activeCanvas] ? this.$state.elements[this.activeCanvas].sprites : [];
        },
        // firstCanvas () {
        //     return Object.keys().length > 0 ? Object.keys(this.$state.elements)[0] : '';
        // },
    },
    watch: {
        activeCanvas (val) {
            this.debuggerCanvas = false;
        },
        '$state.elements' (val) {
            if (!this.activeCanvas && val && Object.keys(val).length) {
                this.activeCanvas = Object.keys(this.$state.elements)[0];
            }

            // if (val !== '') {
            //     // 当前没有选中canvas实例，自动选择第一个为实例
            //     this.activeCanvas = val;
            // }
        },
    },
    components: {
        vElement,
        vDetail,
    },
    methods: {
        chooseSelector () {
            this.$actions.setSelectorActive(!this.$state.selectorActive);
        },
        chooseCanvas (canvasId) {
            this.activeCanvas = canvasId;
        },
        toggleDebuggerCanvas () {
            this.debuggerCanvas = !this.debuggerCanvas;
            this.$actions.pause(this.activeCanvas || Object.keys(this.$state.elements)[0], this.debuggerCanvas);
        },
    }
};
</script>

<style lang="scss" scoped>
@import '../variables.scss';

.left, .right {
    box-sizing: border-box;
    width: 50%;
    padding: 8px 0; 
    flex-grow: 0;
}
.left {
    border-right: 1px solid $border-color;
    height: 100%;
}
.content {
    padding: 10px 6px 40px;
    height: calc(100% - 40px);
    overflow: scroll;

    .content-showMore {
        padding: 2px;
        width: 80px;
        text-align: center;
        margin: 10px 30px;
        background: #eee;
        border: 1px solid #aaa;
        border-radius: 3px;
        color: #999;
        box-shadow: 1px 1px #a7a3a3;

        &:hover {
            box-shadow: 1px 1px 6px 0px #a7a3a3;
        }
    }
}

.tabs {
    padding-top: 2px;
    width: 100%;
    overflow-x: scroll;
    border-bottom: 1px solid $border-color;

    .tabs-tab {
        display: inline-block;
        padding: 6px;
        width: 70px;
        height: 12px;
        line-height: 12px;
        background: #f3f3f3;
        margin-left: 6px;
        border: 1px solid $border-color;
        border-bottom: 0;
        text-align: center;
        overflow-x: hidden;
        text-overflow: ellipsis;
        vertical-align: top;
        cursor: pointer;

        &.active {
            color: $active-color;

            &:hover {
                box-shadow: 0 0;
            }
        }

        &:hover {
            box-shadow: 1px 1px 6px 0px #a7a3a3;
        }

        &.base64-selector {
            width: 13px;
            background-size: 100% 100%;
            background-position: 1px 1px;
            background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAuCAAAAABLtcWwAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfhCQ0PCybUE8MgAAAAtElEQVRIx+3UIQ6EMBAFUE48vqoGv76qjpXDEar2IDWVm3ABUgKkof9nS4IhyxgMr+kfhummk9U94PYgjb1UZYcvBaPAelPQC7qCWAoEA/lDcKxrwMuHeAr4PBMEQRC2QQIIglhO3wHh0LacPvP5DXzxvksNbQ3keAoiOZ6CPYS2tbUIoY1gCeEUCPKL5hAmTUCAJbCFyP2pBVgzawi3PCvBFlkwa0O1EcT9gym9Uls94KZgBgOms+vXRWTQAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTA5LTEzVDE1OjExOjM4KzA4OjAwuTUEEwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0wOS0xM1QxNToxMTozOCswODowMMhovK8AAAAZdEVYdGV4aWY6TWFrZQBNT1NJbWFnZVNlcnZpY2VYRgD8AAAAAElFTkSuQmCC);

            &.active {
                background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAkCAYAAADl9UilAAABxUlEQVRYR+2XsUvDUBDGLyYxgot2cKkuRcTFVQcXiy4WwV0E/4IOLlJxcBS7iHRzd1I61kVxddGho7hJFwcVgqCm7ZMrpLbhveReckqV3NrH9ZfvvnfvznBdV8AAhpGCaVYlVUxTMPh7ij2/GXB6Y8JF3YSHJ0P3g6XnpzIClmbbUCp4YJvhKZWKVa4sqFxaLEDBJFuLLdhb80JzK8EKR05HqfuDd1a4md0RyI4LuN75iAeGCTB+AoySV6lYCqYoaKqYLwzVIr+uGPWK/1+wzZNhmMwImM+1YSHXhuwYz3iXWLHSuQ3V2+/3BZsnAiYFTQxWvTOhdGYrrRMXNDFY49WA/KFD9XTnOaIomhgMifJlBxovehNIZlTA/noTVuda0o9iAQv6LEo+hEEohFMFC1iUz/w/j1KpF5IFjOIzikrsYBSfFZebUFxpRlW5+zuLYpiN4jMdODYwmc+wfNMTAnBM94MKxzZaB32GRq9tf3ZuHu4OunCxlxHZyN3bz443vL4epQunBIta32Rgvs+whAgWDB041oUXfVauWd0Syq5gL1yY31jB0Gf1xyHlM+OD+vtqWPtgBSM3KcLBFIwgUt+RgVXsC8QsiJSdRWzMAAAAAElFTkSuQmCC);
                background-size: 80% 80%;
                background-repeat: no-repeat;
                background-position: center;
            }
        }
        &.debugger-canvas {
            height: 12px; 
            width: 13px; 
            display: inline-block; 
            position:relative;
            &:before, &:after {
                content: '';
                height: 12px; 
                width: 4px; 
                display: block; 
                background: #666;
                position: absolute; 
                top: 7px; 
                left: 7px;
            }
            &:after {
                left: 15px;
            }
        }
        &.debugger-canvas-active {
            height:12px; 
            width:13px; 
            display: inline-block; 
            position:relative;
            &:before {
                content:''; 
                height: 0; 
                width: 0; 
                display: block; 
                border: 6px transparent solid; 
                border-right-width: 0; 
                border-left-color: $active-color; 
                position: absolute; 
                top: 7px; 
                left: 14px;
            }

            &:after {
                content:''; 
                height: 12px; 
                width: 4px; 
                display: block; 
                background: $active-color; 
                position: absolute; 
                top: 7px; 
                left: 7px;
            }
        } 
    }
}
</style>
