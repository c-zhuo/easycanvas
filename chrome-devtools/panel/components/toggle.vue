<style lang="scss">
    .vue-component-toggle {
        font-size: .4rem;
        position: relative;
        width: 1.1rem;
        height: 0.5rem;
        padding: 0.05rem 0.1rem;
        .toggle{
            .toggle-label{
                position: absolute;
                top: -2px;
                left: -8px;
                z-index: 3;
                display: inline-block;
                pointer-events: auto;
                input {
                    width: 0.9rem;
                    border-radius: 0.4rem;
                    height: 0.5rem;
                    background-color: #06c1ae;
                    display: none;
                }
                .track{
                    -webkit-transition-timing-function: ease-in-out;
                    transition-timing-function: ease-in-out;
                    -webkit-transition-duration: .3s;
                    transition-duration: .3s;
                    -webkit-transition-property: background-color,border;
                    transition-property: background-color,border;
                    display: inline-block;
                    box-sizing: content-box;
                    width: 1rem;
                    height: 0.5rem;
                    border: 2px solid #e6e6e6;
                    border-radius: 0.3rem;
                    background-color: #fff;
                    content: ' ';
                    cursor: pointer;
                    pointer-events: none;
                    .handle {
                        -webkit-transition: .3s cubic-bezier(0, 1.1, 1, 1.1);
                        transition: .3s cubic-bezier(0, 1.1, 1, 1.1);
                        -webkit-transition-property: background-color, transform;
                        transition-property: background-color, transform;
                        position: absolute;
                        display: block;
                        width: 0.5rem;
                        height: 0.5rem;
                        border-radius: 50%;
                        background-color: #fff;
                        box-shadow: 0 2px 7px rgba(0, 0, 0, .35), 0 1px 1px rgba(0, 0, 0, .15);
                        &:before{
                            position: absolute;
                            top: -4px;
                            left: -21.5px;
                            padding: 18.5px 34px;
                            content: " ";
                            box-sizing: border-box;
                        }
                    }
                }
                .track.choose{
                    background-color: #06c1ae;
                    .handle{
                        transform: translateX(100%);
                    }
                }
            }
        }
    }
</style>

<template>
    <div class="vue-component-toggle">
        <div class="toggle">
            <label class="toggle-label">
                <input type="checkbox" v-model="change" :disabled="disabled">
                <div class="track" :class="{choose : change}">
                    <div class="handle"></div>
                </div>
            </label>
        </div>
    </div>
</template>

<script>
    module.exports = {
        props: {
            change: {
                type: Boolean,
                default: true,
                twoWay: true
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },

        data: function () {
            return {
            };
        },
    };
</script>
