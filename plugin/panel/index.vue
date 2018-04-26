<template>
    <section class="app" @click="clickDocument($event)">
        <div class="toggle">
            <div class="toggle-component">
                <v-toggle :change.sync="isPaintRecording" :disabled="false"></v-toggle>
            </div>
            <div class="toggle-text">
                Debug Mode (may reduce fps)
            </div>
            <div class="toggle-rightMenu">
                <div class="toggle-rightMenu-tree"
                    :class="{
                        'toggle-rightMenu-active': menu === 'tree'
                    }"
                    @click="menu = 'tree'"></div>
                <div class="toggle-rightMenu-graph"
                    :class="{
                        'toggle-rightMenu-active': menu === 'graph'
                    }"
                    @click="menu = 'graph'"></div>
            </div>
        </div>

        <section v-if="isPaintRecording" class="container">
            <!-- tree -->
            <v-menu-tree v-show="menu === 'tree'" class="container"></v-menu-tree>

            <!-- graph -->
            <v-menu-graph v-show="menu === 'graph'" class="container"></v-menu-tree>
        </section>
    </section>
</template>

<script>
import constants from 'constants';
import vToggle from '@hfe/vue-component-toggle/src/index';
import vMenuTree from './components/menu-tree.vue';
import vMenuGraph from './components/menu-graph.vue';
import Bus from './bus.js';

export default {
    data () {
        return {
        };
    },
    computed: {
        isPaintRecording: {
            get () {
                return this.$state.isPaintRecording;
            },
            set (newValue) {
                this.$actions.setIsPaintRecording(newValue);
            },
        },
        menu: {
            get () {
                return this.$state.menu;
            },
            set (newValue) {
                this.$state.menu = newValue;
            },
        },
        canvas () {
            return Object.keys(this.$state.elements);
        },
        firstCanvas () {
            return Object.keys(this.$state.elements).length > 0 ? Object.keys(this.$state.elements)[0] : '';
        },
    },
    watch: {
    },
    components: {
        vToggle,
        vMenuTree,
        vMenuGraph,
    },
    methods: {
        clickDocument (event) {
            Bus.$emit('hideEdit', event);
        }
    }
};
</script>

<style lang="scss">
    @import './variables.scss';
    html, body, .main {
        height: 100%;
        overflow: hidden;
    }
    .vue-component-toggle .toggle .toggle-label .track.choose {
        background-color: $active-color !important;
    }
    * {
        user-select: none;
    }
</style>


<style lang="scss" scoped>
@import './variables.scss';

.app {
    font-family: Menlo, Consolas, monospace;    
    width: 100%;
    height: 100%;
    background-color: $background-color;
    display: flex;
    flex-direction: column;
}

.toggle {
    width: 100%;
    box-sizing: border-box;
    padding: 10px 20px;
    display: flex;
    border-bottom: 1px solid $border-color;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
    background-color: $background-color;

    .toggle-text {
        color: #999;
    }

    .toggle-rightMenu {
        position: absolute;
        top: 7px;
        right: 12px;
        height: 30px;

        & > div {
            margin: 0 5px 0 0;
            width: 25px;
            height: 25px;
            display: inline-block;
            background-size: 100% 100%;
            box-shadow: 1px 1px 5px #d8d8d8;

            &:hover {
                box-shadow: 1px 1px 5px #808080;
            }
        }

        & > .toggle-rightMenu-active {
            box-shadow: inset 2px 2px 9px #d8d8d8;

            &:hover {
                box-shadow: inset 2px 2px 9px #d8d8d8;
            }
        }

        & > .toggle-rightMenu-tree {
            background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFIAAABSCAMAAADw8nOpAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAsVBMVEX///+Z1v0lp/wcpPwhpvyK0P0ipvxxxv0gpfwepfxrw/38/f4zrfzW7v7e8v6j2v0rqvwdpPx3yP1kwPxZvPyBzP0fpfwnqPyc1/0jpvwmqPyw3/0tq/xtxP1gv/yM0P0pqfyo3P02rvwkp/z9/v48sPwoqfxTuvxHtfx1x/1pw/0vq/w6sPxfv/wsqvxsxP1Nt/xJtvxdvvxMt/yFzv3+/v4yrPw9sfx7yv1YvPxSufyzH+ooAAAAAWJLR0QAiAUdSAAAAAd0SU1FB+IEERMFCOex500AAAE9SURBVFjD7ZbpUsJAEITHDEbxXhQQFZHDE+9b3//B3KpOyE5IwkKwilRN/+rq3XyZpGYnIVKpVCrVUrQWsFRtvSwy5LRqZZE8LUUqcj5tbKaA9a2yyKTcpZEUqchFtM3+2vEtaNezyj3v08n+oSIrjdw/cFvONJAeikY8QthsuWH7OA/ZkW3cQmpEaBCmZn2Y+8CZHxmfkBX5/8gTuS36kRTtwvXM5gjykKdn7jbTRNoVF58j7IkbXfRphlb7QCpyxZGDpNeGk3DkdODlJL1KwsKPOXM8CAPn/jyMwtCpitvxkSgu1b0k65kz1yuPvMa7uSG6hevY8A52bO097IO1j7BPRM9wL3klxrPPmYKzbPHArBrSJPvMFMcIW4x8xeIb0Xt0gD6IGrCfdv0LtmvtGPab6Aful1QqlWpR/QGZAxS4UBE7kwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOC0wNC0xN1QxOTowNTowOCswODowMFrlAUkAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTgtMDQtMTdUMTk6MDU6MDgrMDg6MDAruLn1AAAAGXRFWHRleGlmOk1ha2UATU9TSW1hZ2VTZXJ2aWNlWEYA/AAAAABJRU5ErkJggg==');
        }
        & > .toggle-rightMenu-graph {
            background-image: url('data:image/png;base64,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');
        }
    }
}

.container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: stretch;
}
</style>
