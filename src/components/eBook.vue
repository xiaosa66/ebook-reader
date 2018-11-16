<template>
<div class="ebook-container">
    <div id="read"></div>
    <div class="mask">
        <div class="left" v-on:click="consoletips"></div>
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
    prevPage: function () {
        if(this.rendition){
                this.rendition.prev();
            }
    },
    nextPage:function () {
        if(this.rendition){
            this.rendition.next();
            console.log('next')
        }
    },
    showEpub(){
        this.book = new Epub(DOWNLOAD_URL);
        // console.log('this.book',this.book);
        this.rendition = this.book.renderTo('read',{
            width:window.innerWidth,
            height:window.innerHeight,
        })
        this.rendition.display();
    },
    consoletips(){
        console.log("fadsadsfas");
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
        // background-color:green;
    /*  */
    /* background-color:rgba(0,0,0,0.5); */

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