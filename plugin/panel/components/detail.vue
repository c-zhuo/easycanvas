<template>
    <section class="detail-section">
        <div clsss="detail" v-if="instanceId && showDetail">
            <div class="title">
                <{{instance.name}}>
            </div>
            <div class="content">
                <template v-for="item in detailTypes">
                    <div class="type" v-if="instance[item.name]">
                        {{item.name}}
                    </div>
                    <div class="fields">
                        <template v-if="item.editable">
                            <div class="field" :class="{'no-editable': !item.editable}" v-for="field in instance[item.name]">
                                <span class="key">{{$key}}</span>
                                <span class="colon">: </span>
                                <span class="value" @click.stop="editValue(item.name, $key, $event)">{{field}}</span>
                                <div 
                                    class="edit"  
                                    v-if="detailType === item.name && detailTypeKey === $key && instanceId && showDetail">
                                    <input 
                                        id="editInput" 
                                        type="text" 
                                        v-model="editInputValue" 
                                        :style="{width: editInputWidth + 'px', marginLeft: -editInputWidth + 'px'}" 
                                        @keyup.enter="updateValue" 
                                        @keyup.up="editInputValueUp" 
                                        @keyup.down="editInputValueDown"/>
                                </div>
                            </div>
                        </template>
                        <template v-else>
                            <v-field
                                 v-for="field in instance[item.name]"
                                :depth="0"
                                :item="item"
                                :field="{name: $key, value: field}"></v-field>
                        </template>
                    </div>
                </template>
            </div>
        </div>
        <div class="notice" v-else>
            Select a component instance to inspect.
        </div>
    </section>
</template>

<script>
import Bus from '../bus.js';
import vField from './field.vue';
export default {
    data () {
        return {
            detailTypes: [
                {
                    name: 'style',
                    editable: true,
                },
                {
                    name: 'physics',
                    editable: false,
                },
            ],
            detailType: null,
            detailTypeKey: null,
            editInputValueOld: '',
            editInputValue: '',
            editInputWidth: '30',
        };
    },
    components: {
        vField,
    },
    created () {
        Bus.$on('hideEdit', (event) => {
            if (this.detailType && this.detailTypeKey && event.target && event.target.id !== 'editInput') {
                this.updateValue(true);
            }
        });
    },
    computed: {
        canvasId () {
            setTimeout(this.initEditInputs, 0);            
            return this.$state.treeElements.inspectedInstance.canvasId || null;
        },
        instanceId () {
            setTimeout(this.initEditInputs, 0);
            return this.$state.treeElements.inspectedInstance.id || null;
        },
        instance () {
            if (this.canvasId && this.instanceId) {
                if (!this.$state.elements[this.canvasId] || !this.$state.elements[this.canvasId].sprites[this.instanceId]) {
                    this.$actions.setInspectedInstance(null, null);
                    return {};
                }
                return this.$state.elements[this.canvasId].sprites[this.instanceId];
            } else {
                return {};
            }
        },
        showDetail () {
            return Object.keys(this.instance).length !== 0;
        },
    },
    methods: {
        initEditInputs () {
            this.detailType = null;
            this.detailTypeKey = null;
        },
        editValue (item, key, event) {
            this.detailType = item;
            this.detailTypeKey = key;
            this.editInputValue = this.instance[this.detailType][this.detailTypeKey];
            this.editInputValueOld = this.editInputValue;
            this.editInputWidth = event.target.offsetWidth + 10;
        },
        updateValue (hideEdit) {
            if (this.editInputValue === this.editInputValueOld) {
                if (hideEdit) {
                    this.detailType = null;
                    this.detailTypeKey = null;
                }
                return;
            }
            if (isNaN(Number(this.editInputValue))) {
                this.editInputValue = `'${this.editInputValue}'`;
            }
            const updateSpriteCode = `
                window.__EASYCANVAS_DEVTOOL__.$plugin.updateSprite('${this.instanceId}', {
                    ${this.detailTypeKey}: ${this.editInputValue}
                }, '${this.canvasId}');
            `;
            window.inspectedWindow.eval(updateSpriteCode, (value) => {
                this.$actions.getElements(() => {
                    if (hideEdit) {
                        this.detailType = null;
                        this.detailTypeKey = null;
                    }
                });
            });
        },
        editInputValueUp () {
            this.editInputValue++;
        },
        editInputValueDown () {
            this.editInputValue--;
        },
    },
    watch: {
        editInputValue (value) {
            if (!isNaN(Number(this.editInputValue))) {
                this.updateValue();
            }
        },
    }
};
</script>

<style lang="scss" scoped>
@import '../variables';

* {
    user-select: text;
}

.detail-section {
    height: 100%;
}

.detail {
    font-size: 14px;
    height: 100%;
}
.notice {
    width: 100%;
    height: 100%;
    display:flex;
    justify-content:center;
    align-items: center;
    font-size: 14px;
    font-weight: bold;
    color: $grey;
}
.title {
    font-size: 16px;
    color: $darkerGreen;
    width: 100%;
    line-height: 25px;
    box-sizing: border-box;
    padding: 0 10px;
    border-bottom: 1px solid $border-color;    
}
.content {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 20px;
    overflow: scroll;
}
.type {
    color: #486887;
    padding-top: 10px;
}
.fields {
    padding: 10px 20px 40px;
    font-family: Menlo,Consolas,monospace;
    .field {
        font-size: 12px;
        height: 20px;
        line-height: 20px;
        .key {      
            color: #881391;
        }
        .value {
            display: inline-block;
            color: #03c;
        }
    }
}

.edit {
    display: inline-block;
    z-index: 999;
    input {
        font-size: 12px;
        width: 30px;
        height: 18px;
        line-height: 18px;
        outline: none;
        border: 1px solid $border-color;
    }
}

</style>
