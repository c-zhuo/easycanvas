<template>
    <div :style="{ marginLeft: depth * 14 + 'px' }">
        <div class="field" :class="{'no-editable': !item.editable}" v-if="isArray(field.value)" @click="toggle">
            <span
                class="arrow right"
                :class="{ rotated: expanded }">
            </span>
            <span class="key">{{field.name}}</span>
            <span class="colon">: </span>
            <span v-if="!item.editable">Array[{{field.value.length}}]</span>
        </div>
        <template v-else>
            <div class="field" :class="{'no-editable': !item.editable}" v-if="isObject(field.value)" @click="toggle">
                <span
                    class="arrow right"
                    :class="{ rotated: expanded }">
                </span>
                <span class="key">{{field.name}}</span>
                <span class="colon">: </span>
                <span v-if="!item.editable">Object</span>
            </div>
            <div class="field" :class="{'no-editable': !item.editable}" v-else>
                <span class="key">{{field.name}}</span>
                <span class="colon">: </span>
                <span class="value" v-if="!item.editable">
                    <span>
                        {{field.value}}
                    </span>
                </span>
            </div>
        </template>
        <template v-if="expanded && (isArray(field.value) || isObject(field.value))">
            <v-field
                v-for="(index, f) in field.value"
                track-by="$index"
                :depth="depth + 1"
                :item="item"
                :field="{name: index, value: f}"></v-field>
        </template>
    </div>
</template>

<script>
export default {
    name: 'VField',
    props: {
        item: {
            type: Object,
            required: true,
        },
        field: {
            type: Object,
            required: true,
        },
        depth: {
            type: Number,
            required: true,
        }
    },
    data () {
        return {
            expanded: false,
        };
    },
    methods: {
        isArray (arr) {
            return Array.isArray(arr);
        },
        isObject (obj) {
            return typeof(obj) === 'object' && obj !== null;
        },
        toggle () {
            this.expanded = !this.expanded;
        }
    }
};
</script>
<style lang="scss" scoped>
@import '../variables';

* {
    user-select: text;
}

.fields {
    display: inline-block;
    padding: 10px 20px 40px;
    font-family: Menlo,Consolas,monospace;
    .field {
        &.no-editable {
            position: relative;
            cursor: pointer;
        }
        font-size: 12px;
        height: 20px;
        line-height: 20px;
        .key {      
            color: #881391;
        }
        .value {
            color: #03c;
        }
    }
}

.no-editable .arrow {
    position: absolute;
    top: 6px;
    left: -12px;
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
</style>

