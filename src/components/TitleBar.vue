<template>
        <transition name="slide-down">
            <div class="title-wrapper" v-show="ifTitleAndMenuSHow">
                <div class="left">
                    <span class="icon-shouye">首页</span>
                </div>
                <div class="right">
                    <div class="icon-wrapper">
                        <span class="icon-cart">购物车</span>
                    </div>
                    <div class="icon-wrapper">
                        <span class="icon-cart">个人</span>
                    </div>
                    <div class="icon-wrapper">
                        <span class="icon-cart">更多</span>
                    </div>
                </div>
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
     .title-wrapper {
        color:#333;
        font-size: 20px;
        position: absolute;
        display: flex;
        box-shadow: 0 px2rem(8) px2rem(8) rgba($color: #000000, $alpha: 0.15);
        z-index: 101;
        top:0;
        left: 0;
        width: 100%;
        height: px2rem(60);
        background: white;

        .left {
            flex: 0 0 px2rem(60);
            @include center;
        }
        .right {
            flex: 1;
            display: flex;
            justify-content: flex-end;
            .icon-wrapper {
            @include center;
            flex: 0 0 px2rem(60);
            }
        }
    }
</style>