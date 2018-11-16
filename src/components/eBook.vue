<template>
    <div class="ebook-container">
        <div id="read"></div>
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
        <div class="mask">
            <div class="left" v-on:click="prevPage"></div>
            <div class="center" v-on:click="toogleTitleAndMenu"></div>
            <div class="right" v-on:click="nextPage"></div>
        </div>
        <div class="menu-wrapper" v-show="ifTitleAndMenuSHow">
            <div class="icon-wrapper">章节</div>
            <div class="icon-wrapper">进度</div>
            <div class="icon-wrapper">亮度</div>
            <div class="icon-wrapper">字体</div>
        </div>
    </div>
</template>
<script>
import Epub from 'epubjs';
global.Epub = Epub;
let page = null;
const DOWNLOAD_URL = '/static/hongFuYeBen.epub';
export default {
name: 'eBook',
data(){
    return{
      ifTitleAndMenuSHow:false  
    } 
},
methods: {
    // TODO 如果有一个方法没有识别    所有的方法都不起效
    prevPage () {
        if(this.rendition){
                this.rendition.prev();
            }
    },
    nextPage () {
        if(this.rendition){
            this.rendition.next();
            console.log('next')
        }
    },
    showEpub (){
        this.book = new Epub(DOWNLOAD_URL);
        // console.log('this.book',this.book);
        this.rendition = this.book.renderTo('read',{
            width:window.innerWidth,
            height:window.innerHeight,
        })
        this.rendition.display();
    },
    toogleTitleAndMenu(){
        this.ifTitleAndMenuSHow = !this.ifTitleAndMenuSHow;
    }

},
mounted(){
    page = this;
    page.showEpub();
    }
}
</script>
<style lang='scss' scoped>
@import '@/assets/styles/global.scss';
// @import 'src/assets/styles/iconfont.css';

.ebook-container {
    position: relative;

     .mask {
        position: absolute;
        display: flex;
        top: 0;
        left: 0;
        width:100%;
        height: 100%;
        z-index: 100;

        .left{
            flex:0 0 px2rem(100);
        }
        .center{
            flex:1;
        }
        .right{
            flex:0 0 px2rem(100);
        }
    }
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
}

</style>