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
    <menu-bar
      :ifTitleAndMenuSHow="ifTitleAndMenuSHow"
      :fontSizeList="fontSizeList"
      :defaultFontSize="defaultFontSize"
      @setFontSize="setFontSize"
      :themeList='themeList'
      :defaultTheme='defaultTheme'
      @setTheme='setTheme'
      :bookAvailable="bookAvailable"
      @onprocesschange="onProcessChange"
      :navigation="navigation"
      @jumpTo="jumpTo"
      ref="menuBar"></menu-bar>
  </div>
</template>
<script>
  import Epub from 'epubjs';
  import TitleBar from '@/components/TitleBar';
  import MenuBar from '@/components/MenuBar';
  import {defaultCipherList} from 'constants';

  global.Epub = Epub;
  let page = null;
  const DOWNLOAD_URL = '/static/hongFuYeBen.epub';
  export default {
    name: 'eBook',
    components: {
      TitleBar,
      MenuBar
    },
    data() {
      return {
        ifTitleAndMenuSHow: false,
        fontSizeList: [
          {fontSize: 12},
          {fontSize: 14},
          {fontSize: 16},
          {fontSize: 18},
          {fontSize: 20},
          {fontSize: 22},
          {fontSize: 24},
        ],
        defaultFontSize: 16,
        themeList: [
          {
            name: 'default',
            style: {
              body: {
                'color': '#111',
                'background': '#eee'
              }
            }
          },
          {
            name: 'eye',
            style: {
              body: {
                'color': '#111',
                'background': '#ceeaba'
              }
            }
          },
          {
            name: 'night',
            style: {
              body: {
                'color': '#eee',
                'background': '#333'
              }
            }
          },
          {
            name: 'love',
            style: {
              body: {
                'color': '#111',
                'background': 'pink'
              }
            }
          }
        ],
        defaultTheme: 0,
        // 表示图书进度条是否已经可用
        bookAvailable:false,
        progress:0,
        navigation:null

      }
    },
    methods: {
      // TODO 如果有一个方法没有识别    所有的方法都不起效

      // 翻页功能
      prevPage() {
        if (this.rendition) {
          this.rendition.prev();
        }
      },

      nextPage() {
        if (this.rendition) {
          this.rendition.next();
          console.log('next')
        }
      },
      // 展示
      showEpub() {
        // 获取到书籍
        this.book = new Epub(DOWNLOAD_URL);
        // 展示书籍
        this.rendition = this.book.renderTo('read', {
          width: window.innerWidth,
          height: window.innerHeight,
        })
        this.rendition.display();
        // 获取theme对象
        this.themes = this.rendition.themes;
        // 获取默认字体
        this.setFontSize(this.defaultFontSize);
        // 注册主题
        this.registerTheme();
        this.setTheme(this.defaultTheme);
        //获取locations对象
        this.book.ready.then(()=>{
          this.navigation = this.book.navigation;
          console.log('this.navigation:',this.navigation);
          return this.book.locations.generate()
        }).then(result => {
          this.locations = this.book.locations;
          this.bookAvailable = true;
          // this.onProgressChange(80);
          this.$refs.menuBar.onProgressInput();
        })


      },
      // 切换是否展示上下bar
      toogleTitleAndMenu() {
        this.ifTitleAndMenuSHow = !this.ifTitleAndMenuSHow;
        if (!this.ifTitleAndMenuSHow) {
          this.$refs.menuBar.hideSetting();
        }
        ;
      },
      // 设置字体大小
      setFontSize(fontSize) {
        this.defaultFontSize = fontSize;
        if (this.themes) {
          this.themes.fontSize(fontSize + 'px');
        }
      },
      registerTheme() {
        this.themeList.forEach(theme => {
          this.themes.register(theme.name, theme.style);
        })
      },
      //切换主题
      setTheme(index) {
        console.log('eBookIndex:',index)
        this.themes.select(this.themeList[index].name);
        this.defaultTheme = index;
      },
      //章节跳转
      jumpTo(href){
        this.rendition.display(href);
        this.hideTitleAndMenu();
      },
      hideTitleAndMenu(){
        this.ifTitleAndMenuSHow = false;
        // this.$refs.menubar.hideSetting();
        // this.$refs.menubar.hideContent();
      },
      // params   progress  进度条数值  (0 ~ 100)
      // 跳转到某个进度
      /** TODO
       * 不同于组件和 prop，事件名不会被用作一个 JavaScript 变量名或属性名，
       * 所以就没有理由使用 camelCase 或 PascalCase 了。
       * 并且 v-on 事件监听器在 DOM 模板中会被自动转换为全小写 (因为 HTML 是大小写不敏感的)，
       * 所以 v-on:myEvent 将会变成 v-on:myevent——导致 myEvent 不可能被监听到。
       * */
      onProcessChange(progress){
        console.log('Ebook onProgressChange',progress);
        const percentage = progress/100;
        const location = percentage > 0 ? this.locations.cfiFromPercentage(percentage) : 0;
        this.rendition.display(location)
      },
    },
    mounted() {
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
      width: 100%;
      height: 100%;
      z-index: 100;

      .left {
        flex: 0 0 px2rem(100);
      }
      .center {
        flex: 1;
      }
      .right {
        flex: 0 0 px2rem(100);
      }
    }

  }

</style>
