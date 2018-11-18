
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
                        <div class="setting-font-size"></div>
                    </div>
                </transition>
            </div>
</template>

<script>
    export default {
        props:{
            ifTitleAndMenuSHow:{type:Boolean,default:false}
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
            position: absolute;
            bottom: px2rem(60);
            left: 0;
            width: 100%;
            height: px2rem(80);
            background: white;
            box-shadow: 0 px2rem(-8) px2rem(8) rgba($color: #000000, $alpha: 0.15);
            // .setting-font-size {

            // }
        }
    }

</style>