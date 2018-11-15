<template>
<div class="ebook-container">
    <div id="read"></div>
</div>
</template>
<script>
import Epub from 'epubjs';
global.Epub = Epub;
const DOWNLOAD_URL = '/static/hongFuYeBen.epub';
export default {
name: 'eBook',
methods:{
    showEpub(){
        this.book = new Epub(DOWNLOAD_URL);
        // console.log('this.book',this.book);
        this.rendition = this.book.renderTo('read',{
            width:window.innerWidth,
            height:window.innerHeight,
        })
        this.rendition.display();
    }
},
mounted(){
    this.showEpub();
    }
}
</script>
<style>
</style>