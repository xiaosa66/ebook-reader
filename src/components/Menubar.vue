
<template>
        <transition name="slide-up">
            <div class="menu-wrapper" v-show="ifTitleAndMenuSHow">
                <div class="icon-wrapper">章节</div>
                <div class="icon-wrapper">进度</div>
                <div class="icon-wrapper">亮度</div>
                <div class="icon-wrapper">字体</div>
            </div>
        </transition>
</template>

<script>
    export default {
        props:{
            ifTitleAndMenuSHow:{type:Boolean,default:false}
        }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/global';
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
        .icon-wrapper {
            @include center;
            // flex: 0 0 px2rem(250);
            flex: 1;
            }

    }
</style>