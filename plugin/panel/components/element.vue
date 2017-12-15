<template>
    <div class="instance"
        :class="{
            selected: selected
        }">
        <div class="self"
            @click.stop="select"
            @mouseenter="enter"
            @mouseleave="leave"
            :class="{ selected: selected }"
            :style="{ paddingLeft: depth * 15 + 'px' }">
            <span class="content">
                <!-- arrow wrapper for better hit box -->
                <span class="arrow-wrapper"
                    v-if="instance.children.length"
                    @click.stop="toggle">
                    <span class="arrow right" :class="{ rotated: expanded }"></span>
                </span>
                <span class="render" :title="instance.rendered ? '已渲染元素' : (instance.rendered === false ? '未渲染元素' : '容器元素')" :class="{show: instance.rendered === true, hide: instance.rendered === false}"></span>                
                <span class="angle-bracket">&lt;</span><span class="instance-name">{{ instance.name }}</span><span class="angle-bracket">&gt;</span>
                <span class="info console" v-if="selected">
                    id: {{ instanceId }}
                </span>
            </span>
        </div>
        <div v-if="expanded">
            <v-element
                v-for="childId in instance.children"
                :key="childId"
                :canvas-id="canvasId"
                :instance-id="childId"
                :depth="depth + 1">
            </v-element>
        </div>
    </div>
</template>

<script>
export default {
    name: 'VElement',
    props: {
        canvasId: String,
        instanceId: String,
        depth: Number,
    },
    created () {
        if (this.depth === 0) {
            this.expand()
        }
    },
    computed: {
        instance () {
            return this.$state.elements[this.canvasId][this.instanceId] || {};
        },
        expanded () {
            return this.$state.treeElements.expansionMap.indexOf(this.instanceId) > -1;
        },
        selected () {
            return this.instanceId === this.$state.treeElements.inspectedInstance.id;
        },
    },
    methods: {
        toggle () {
            this.toggleWithValue();
        },
        expand () {
            this.toggleWithValue(true);
        },
        toggleWithValue (bol) {
            const index = this.$state.treeElements.expansionMap.indexOf(this.instanceId);
            if (index > -1) {
                if (!bol) {
                    this.$state.treeElements.expansionMap.splice(index, 1);                    
                }
            } else {
                this.$state.treeElements.expansionMap.push(this.instanceId);
            }
        },
        select () {
            this.$actions.setInspectedInstance(this.instanceId, this.canvasId);
        },
        enter () {
            this.highlightSprite(true);            
        },
        leave () {
            this.highlightSprite(false);
        },
        highlightSprite (bol) {
            const selectSpriteCode = `
                window.__EASYCANVAS_DEVTOOL__.$plugin.highlightSprite('${this.instanceId}', ${bol});
            `;
            window.inspectedWindow.eval(selectSpriteCode);
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../variables";

.instance {
    &.inactive {
        opacity: 0.5;
    }
}

.self {
    cursor: pointer;
    position: relative;
    overflow: hidden;
    z-index: 2;
    background-color: $background-color;
    transition: background-color .1s ease;
    border-radius: 3px;
    font-size: 14px;
    line-height: 22px;
    height: 22px;
    white-space: nowrap;
    &:hidden {
        display: none;
    }
        
    &:hover {
        background-color: #E5F2FF;
    }
        
    &.selected {
        background-color: $active-color;
        .arrow {
            border-left-color: #fff;
        }
        
        .instance-name {
            color: #fff
        }
        
    }
        
    .app.dark & {
        background-color: $dark-background-color;
        &:hover {
            background-color: #444;
        }
        
        &.selected {
            background-color: $active-color;
        }
        
    }
        
}
  

.children {
    position: relative;
    z-index: 1;
}
  

.content {
    position: relative;
    padding-left: 22px;
}
  

.info {
    color: #fff;
    font-size: 10px;
    padding: 3px 5px 2px;
    display: inline-block;
    line-height: 10px;
    border-radius: 3px;
    position: relative;
    top: -1px;
    user-select: text;
    &.console {
        color: #fff;
        background-color: transparent;
    }
        
    &.router-view {
        background-color: #ff8344;
    }
        
    &.fragment {
        background-color: #b3cbf7;
    }
        
    &.inactive {
        background-color: #aaa;
    }
        
    &:not(.console) {
        margin-left: 6px;
    }
        
}

.render {
    font-size: 10px;
    display: inline-block;
    line-height: 10px;
    border-radius: 3px;
    position: relative;
    top: 4px;
    width: 18px;
    height: 18px;
    background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDI1Mi40MjIgMjUyLjQyMiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjUyLjQyMiAyNTIuNDIyIiB3aWR0aD0iMTI4cHgiIGhlaWdodD0iMTI4cHgiPgogIDxnPgogICAgPHBhdGggZD0ibTI1MS42OTIsNzMuMTk4bC0xNi0zMi4yNDNjLTEuMTgyLTIuMzgyLTMuNjExLTMuODg5LTYuMjcxLTMuODg5aC0yMDUuNDIxYy0yLjU5NywwLTQuOTgsMS40MzgtNi4xOTIsMy43MzVsLTE3LDMyLjI0M2MtMS4xNDQsMi4xNy0xLjA2OCw0Ljc4IDAuMTk4LDYuODggMS4yNjcsMi4xMDIgMy41NDEsMy4zODUgNS45OTQsMy4zODVoMTkuODQ5djEyNS4wNDZjMCwzLjg2NiAzLjEzNCw3IDcsN2gxODQuNzI1YzMuODY2LDAgNy0zLjEzNCA3LTd2LTEyNS4wNDZoMTkuODQ5YzIuNDIyLDAgNC42NzMtMS4yNTIgNS45NDktMy4zMTFzMS4zOTctNC42MyAwLjMyLTYuOHptLTUzLjk5Ni0yMi4xMzJsOC4yNjIsMTguMjQzaC0xNjAuMjFsNy4zMDQtMTguMjQzaDE0NC42NDR6bS0xNjkuNDczLDBoOS43NDhsLTcuMzA0LDE4LjI0M2gtMTIuMDYzbDkuNjE5LTE4LjI0M3ptMTgzLjM1LDE1MC4yODloLTE3MC43MjR2LTExOC4wNDZoMTcwLjcyNXYxMTguMDQ2em05Ljc1My0xMzIuMDQ2bC04LjI2MS0xOC4yNDNoMTIuMDE1bDkuMDUzLDE4LjI0M2gtMTIuODA3eiIgZmlsbD0iIzY2NjY2NiIvPgogIDwvZz4KPC9zdmc+Cg==);
    background-size: cover;
    &.show {
        background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ4OC44NSA0ODguODUiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ4OC44NSA0ODguODU7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMTI4cHgiIGhlaWdodD0iMTI4cHgiPgo8Zz4KCTxwYXRoIGQ9Ik0yNDQuNDI1LDk4LjcyNWMtOTMuNCwwLTE3OC4xLDUxLjEtMjQwLjYsMTM0LjFjLTUuMSw2LjgtNS4xLDE2LjMsMCwyMy4xYzYyLjUsODMuMSwxNDcuMiwxMzQuMiwyNDAuNiwxMzQuMiAgIHMxNzguMS01MS4xLDI0MC42LTEzNC4xYzUuMS02LjgsNS4xLTE2LjMsMC0yMy4xQzQyMi41MjUsMTQ5LjgyNSwzMzcuODI1LDk4LjcyNSwyNDQuNDI1LDk4LjcyNXogTTI1MS4xMjUsMzQ3LjAyNSAgIGMtNjIsMy45LTExMy4yLTQ3LjItMTA5LjMtMTA5LjNjMy4yLTUxLjIsNDQuNy05Mi43LDk1LjktOTUuOWM2Mi0zLjksMTEzLjIsNDcuMiwxMDkuMywxMDkuMyAgIEMzNDMuNzI1LDMwMi4yMjUsMzAyLjIyNSwzNDMuNzI1LDI1MS4xMjUsMzQ3LjAyNXogTTI0OC4wMjUsMjk5LjYyNWMtMzMuNCwyLjEtNjEtMjUuNC01OC44LTU4LjhjMS43LTI3LjYsMjQuMS00OS45LDUxLjctNTEuNyAgIGMzMy40LTIuMSw2MSwyNS40LDU4LjgsNTguOEMyOTcuOTI1LDI3NS42MjUsMjc1LjUyNSwyOTcuOTI1LDI0OC4wMjUsMjk5LjYyNXoiIGZpbGw9IiM2NjY2NjYiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K);
        background-size: cover;
    }
    &.hide {
        background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDU5LjA0OSA1OS4wNDkiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDU5LjA0OSA1OS4wNDk7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMTI4cHgiIGhlaWdodD0iMTI4cHgiPgo8Zz4KCTxwYXRoIGQ9Ik0xMS4yODUsNDEuMzljMC4xODQsMC4xNDYsMC40MDQsMC4yMTgsMC42MjMsMC4yMThjMC4yOTQsMCwwLjU4NS0wLjEyOSwwLjc4My0wLjM3N2MwLjM0NC0wLjQzMiwwLjI3My0xLjA2MS0wLjE1OS0xLjQwNSAgIGMtMC44MDEtMC42MzgtMS41NzctMS4zMzEtMi4zMDUtMi4wNmwtNy4zOTgtNy4zOThsNy42MjktNy42MjljNy4zMzQtNy4zMzMsMTguMDAzLTkuODM2LDI3LjgzOS02LjUzNCAgIGMwLjUyMywwLjE3MywxLjA5LTAuMTA3LDEuMjY3LTAuNjNjMC4xNzUtMC41MjMtMC4xMDYtMS4wOTEtMC42My0xLjI2N2MtMTAuNTYyLTMuNTQ1LTIyLjAxNi0wLjg1Ny0yOS44OSw3LjAxNkwwLDMwLjM2OCAgIGw4LjgxMiw4LjgxMkM5LjU5MywzOS45NjIsMTAuNDI2LDQwLjcwNSwxMS4yODUsNDEuMzl6IiBmaWxsPSIjNjY2NjY2Ii8+Cgk8cGF0aCBkPSJNNTAuMjM3LDIxLjMyNWMtMS4zNDgtMS4zNDgtMi44MjYtMi41NjQtNC4zOTQtMy42MTZjLTAuNDU4LTAuMzA3LTEuMDgxLTAuMTg1LTEuMzg4LDAuMjczICAgYy0wLjMwOCwwLjQ1OC0wLjE4NSwxLjA4LDAuMjczLDEuMzg4YzEuNDYsMC45NzksMi44MzgsMi4xMTMsNC4wOTQsMy4zNjlsNy4zOTgsNy4zOThsLTcuNjI5LDcuNjI5ICAgYy03LjM4NSw3LjM4NS0xOC41MTMsOS44ODItMjguMzUyLDYuMzU2Yy0wLjUyLTAuMTg3LTEuMDkzLDAuMDg0LTEuMjc5LDAuNjA0Yy0wLjE4NiwwLjUyLDAuMDg0LDEuMDkyLDAuNjA0LDEuMjc5ICAgYzMuMTgyLDEuMTQsNi40OSwxLjY5Myw5Ljc3NiwxLjY5M2M3LjYyMSwwLDE1LjEyNC0yLjk3NywyMC42NjUtOC41MThsOS4wNDMtOS4wNDNMNTAuMjM3LDIxLjMyNXoiIGZpbGw9IiM2NjY2NjYiLz4KCTxwYXRoIGQ9Ik0zMC41MzksNDEuNzc0Yy0yLjE1MywwLTQuMjUxLTAuNTk4LTYuMDctMS43M2MtMC40NjctMC4yOS0xLjA4NC0wLjE0OC0xLjM3NywwLjMyMWMtMC4yOTIsMC40NjktMC4xNDgsMS4wODUsMC4zMjEsMS4zNzcgICBjMi4xMzUsMS4zMyw0LjYsMi4wMzIsNy4xMjYsMi4wMzJjNy40NDQsMCwxMy41LTYuMDU2LDEzLjUtMTMuNWMwLTIuNjg1LTAuNzg3LTUuMjc5LTIuMjc1LTcuNTAyICAgYy0wLjMwOC0wLjQ1OS0wLjkzLTAuNTgyLTEuMzg3LTAuMjc1Yy0wLjQ1OSwwLjMwOC0wLjU4MiwwLjkyOS0wLjI3NSwxLjM4N2MxLjI2NywxLjg5MywxLjkzNyw0LjEwMiwxLjkzNyw2LjM5ICAgQzQyLjAzOSwzNi42MTYsMzYuODgsNDEuNzc0LDMwLjUzOSw0MS43NzR6IiBmaWxsPSIjNjY2NjY2Ii8+Cgk8cGF0aCBkPSJNMzAuNTM5LDE4Ljc3NGMyLjA2NSwwLDQuMDg5LDAuNTUzLDUuODU1LDEuNmMwLjQ3NCwwLjI4MSwxLjA4OCwwLjEyNSwxLjM3LTAuMzUxYzAuMjgxLTAuNDc1LDAuMTI1LTEuMDg4LTAuMzUxLTEuMzcgICBjLTIuMDc0LTEuMjI5LTQuNDUxLTEuODc5LTYuODc1LTEuODc5Yy03LjQ0NCwwLTEzLjUsNi4wNTYtMTMuNSwxMy41YzAsMi4wODQsMC40NjIsNC4wODMsMS4zNzQsNS45NDEgICBjMC4xNzQsMC4zNTQsMC41MjksMC41NiwwLjg5OSwwLjU2YzAuMTQ3LDAsMC4yOTgtMC4wMzMsMC40MzktMC4xMDJjMC40OTYtMC4yNDQsMC43MDEtMC44NDMsMC40NTgtMS4zMzggICBjLTAuNzc2LTEuNTgyLTEuMTctMy4yODQtMS4xNy01LjA2QzE5LjAzOSwyMy45MzMsMjQuMTk4LDE4Ljc3NCwzMC41MzksMTguNzc0eiIgZmlsbD0iIzY2NjY2NiIvPgoJPHBhdGggZD0iTTU0LjYyMSw1LjU2N2MtMC4zOTEtMC4zOTEtMS4wMjMtMC4zOTEtMS40MTQsMGwtNDYuNSw0Ni41Yy0wLjM5MSwwLjM5MS0wLjM5MSwxLjAyMywwLDEuNDE0ICAgYzAuMTk1LDAuMTk1LDAuNDUxLDAuMjkzLDAuNzA3LDAuMjkzczAuNTEyLTAuMDk4LDAuNzA3LTAuMjkzbDQ2LjUtNDYuNUM1NS4wMTIsNi41OTEsNTUuMDEyLDUuOTU4LDU0LjYyMSw1LjU2N3oiIGZpbGw9IiM2NjY2NjYiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K);
        background-size: cover;
    }
}
  

.arrow-wrapper {
    position: absolute;
    display: inline-block;
    width: 16px;
    height: 16px;
    top: 0;
    left: 4px;
}
  

.arrow {
    position: absolute;
    top: 5px;
    left: 4px;
    transition: transform .1s ease, border-left-color .1s ease;
    &.rotated {
        transform: rotate(90deg);
    }
        
}

.arrow {
    display: inline-block;
    width: 0;
    height: 0;
    &.up {
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-bottom: 6px solid $arrow-color;
    }
        
    &.down {
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-top: 6px solid $arrow-color;
    }
        
    &.right {
        border-top: 4px solid transparent;
        border-bottom: 4px solid transparent;
        border-left: 6px solid $arrow-color;
    }
        
    &.left {
        border-top: 4px solid transparent;
        border-bottom: 4px solid transparent;
        border-right: 6px solid $arrow-color;
    }
        
}

.angle-bracket {
    color: #ccc;
}

.instance-name {
    color: $component-color;
    margin: 0 1px;
    transition: color .1s ease;
}
  
</style>
