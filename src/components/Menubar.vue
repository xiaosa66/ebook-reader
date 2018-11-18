
import { fail } from 'assert';
<template>
            <div class="menu-bar">
                <transition name="slide-up">
                    <div class="menu-wrapper" v-show="ifTitleAndMenuSHow" 
                    :class="{'hide-box-shadow':ifSettingShow || !ifTitleAndMenuSHow}">
                        <div class="icon-wrapper">章节</div>
                        <div class="icon-wrapper">进度</div>
                        <div class="icon-wrapper">亮度</div>
                        <div class="icon-wrapper" v-on:click="showSetting">字体</div>
                    </div>
                </transition>
                <transition name="slide-up">
                    <div class="setting-wrapper" v-show="ifSettingShow">
                        <div class="setting-font-size">
                            <div class="preview" :style="{fontSize:fontSizeList[0].fontSize+'px'}">A</div>
                            <div class="select-container">
                                <div class="select-wrapper" v-for="(item , index) in fontSizeList" :key="index" @click="setFontSize(item.fontSize)">
                                    <div class="line"></div>
                                    <div class="point-wrapper">
                                        <div class="point"  v-show="defaultFontSize === item.fontSize">
                                            <div class="small-point"></div>
                                        </div>
                                    </div>
                                    <div class="line"></div>                                
                                </div>
                            </div>
                            <div class="preview" :style="{fontSize:fontSizeList[fontSizeList.length-1].fontSize+'px'}">A</div>
                        </div>
                    </div>
                </transition>
            </div>
</template>

<script>
    export default {
        props:{
            ifTitleAndMenuSHow:{
                type:Boolean,
                default:false
            },
            fontSizeList:{
                type:Array
            },
            defaultFontSize:{
                type:Number            }
        },
        data() {
            return {
                ifSettingShow: false
            }
        },
        methods :{
            showSetting(){
                this.ifSettingShow = true;
            },
            hideSetting(){
                this.ifSettingShow = false;
            },
            setFontSize(fontSize){
                this.$emit('setFontSize',fontSize);
            }
        }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/global';
    .menu-bar {  
        .menu-wrapper {
            color:#333;
            font-size: 20px;
            position: absolute;
            display: flex;
            box-shadow: 0 px2rem(-8) px2rem(8) rgba($color: #000000, $alpha: 0.15);
            z-index: 101;
            bottom:0;
            left: 0;
            width: 100%;
            height: px2rem(60);
            background: white;
            &.hide-box-shadow {
                box-shadow: none;
            }
            .icon-wrapper {
                @include center;
                flex: 1;
                }

        }
        .setting-wrapper {
            z-index: 101;
            position: absolute;
            bottom: px2rem(60);
            left: 0;
            width: 100%;
            height: px2rem(80);
            background: white;
            box-shadow: 0 px2rem(-8) px2rem(8) rgba($color: #000000, $alpha: 0.15);
            .setting-font-size {
                display: flex;
                height: 100%;
                .preview {
                    flex:0 0 px2rem(40);
                    @include center;    //TODO 居中显示

                }
                .select-container {
                        flex:1;
                        display: flex;
                        .select-wrapper {
                            flex:1;
                            align-items: center;
                            display: flex;
                            &:first-child {
                                .line{
                                    &:first-child {
                                        border-top: none;
                                    }
                                }
                            }
                            &:last-child {
                                .line{
                                    &:last-child {
                                        border-top: none;
                                    }
                                }
                            }

                            .line {
                                flex:1;
                                height: 0;
                                border-top: px2rem(1) solid #ccc;
                            }
                            .point-wrapper {
                                position: relative;
                                flex:0 0 0;
                                width: 0;
                                height: px2rem(7);
                                border-left: px2rem(1) solid #ccc;
                                .point {
                                    position: absolute;
                                    top: px2rem(-8);
                                    left: px2rem(-12);
                                    width: px2rem(20);
                                    height: px2rem(20);
                                    border-radius: 50%;
                                    background-color: white;
                                    border:px2rem(2) solid #ccc;
                                    box-shadow: 0 px2rem(2) px2rem(2) rgba($color: #000000, $alpha: 0.15);
                                    @include center;
                                    .small-point {
                                        background-color: black;
                                        width: px2rem(5);
                                        height: px2rem(5);
                                        border-radius: 50%;
                                    }
                                }
                            }
                    
                }
            }
        }
        }
        }

</style>