<template>
    <div class="ebook-container">
        <title-bar :ifTitleAndMenuSHow="ifTitleAndMenuSHow"></title-bar>
        <div class="readwrapper">
            <div id="read"></div>
            <div class="mask">
                <div class="left" v-on:click="prevPage"></div>
                <div class="center" v-on:click="toogleTitleAndMenu"></div>
                <div class="right" v-on:click="nextPage"></div>
            </div>

        </div>
        <menu-bar :ifTitleAndMenuSHow="ifTitleAndMenuSHow" ref="menuBar"></menu-bar>
    </div>
</template>
<script>
import Epub from 'epubjs';
import TitleBar from '@/components/TitleBar';
import MenuBar from '@/components/MenuBar';
global.Epub = Epub;
let page = null;
const DOWNLOAD_URL = '/static/hongFuYeBen.epub';
export default {
name: 'eBook',
components:{
    TitleBar,
    MenuBar
},
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
        this.rendition = this.book.renderTo('read',{
            width:window.innerWidth,
            height:window.innerHeight,
        })
        this.rendition.display();
    },
    toogleTitleAndMenu(){
        this.ifTitleAndMenuSHow = !this.ifTitleAndMenuSHow;
        if(!this.ifTitleAndMenuSHow){
            this.$refs.menuBar.hideSetting();
        }
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