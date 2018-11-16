<template>
    <div class="ebook-container">
        <div id="read"></div>
        <div class="title-wrapper">
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
            <div class="center"></div>
            <div class="right" v-on:click="nextPage"></div>
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
}

</style>