import { fail } from 'assert';
<template>
  <div class="menu-bar">
    <transition name="slide-up">
      <div class="menu-wrapper" v-show="ifTitleAndMenuSHow"
           :class="{'hide-box-shadow':ifSettingShow || !ifTitleAndMenuSHow}">
        <div class="icon-wrapper" v-on:click="showSetting(1)">章节</div>
        <div class="icon-wrapper" v-on:click="showSetting(2)">进度</div>
        <div class="icon-wrapper" v-on:click="showSetting(3)">主题</div>
        <div class="icon-wrapper" v-on:click="showSetting(4)">字体</div>
      </div>
    </transition>
    <transition name="slide-up">
      <div class="setting-wrapper" v-show="ifSettingShow">
        <div class="setting-chapter" v-if="showTag === 1">
          <div class="setting-theme-item">
            <div class="preview"></div>
            <div class="text"></div>
          </div>
        </div>
        <div class="setting-process" v-else-if="showTag === 2">
          <div class="setting-theme-item">
            <div class="preview"></div>
            <div class="text"></div>
          </div>
        </div>
        <div class="setting-theme" v-if="showTag === 3">
          <div class="setting-theme-item" @click="setTheme(index)"
               v-for="(item,index) in themeList" :key="index">
            <div class="preview" :style="{background:item.style.body.background}"></div>
            <div class="text" :style="{color:item.style.body.color}">{{item.name}}</div>
          </div>
        </div>
        <div class="setting-font-size" v-else-if="showTag === 4">
          <div class="preview" :style="{fontSize:fontSizeList[0].fontSize+'px'}">A</div>
          <div class="select-container">
            <div class="select-wrapper" v-for="(item , index) in fontSizeList" :key="index"
                 @click="setFontSize(item.fontSize)">
              <div class="line"></div>
              <div class="point-wrapper">
                <div class="point" v-show="defaultFontSize === item.fontSize">
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
    props: {
      ifTitleAndMenuSHow: {
        type: Boolean,
        default: false
      },
      fontSizeList: {
        type: Array
      },
      defaultFontSize: {
        type: Number
      },
      themeList: {
        type: Array
      },
      defaultTheme: Number
    },

    data() {
      return {
        ifSettingShow: false,
        showTag: 0
      }
    },
    methods: {
      showSetting(tag) {
        this.ifSettingShow = true;
        this.showTag = tag;
        console.log('showTag:', tag);
      },
      hideSetting() {
        this.ifSettingShow = false;
        // console.log('showTag:',this.tag);
      },
      setFontSize(fontSize) {
        this.$emit('setFontSize', fontSize);
      },
      setTheme(index) {
        console.log('setTheme index:',index);
        this.$emit('setTheme', index);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/styles/global';

  .menu-bar {
    .menu-wrapper {
      color: #333;
      font-size: 20px;
      position: absolute;
      display: flex;
      box-shadow: 0 px2rem(-8) px2rem(8) rgba($color: #000000, $alpha: 0.15);
      z-index: 101;
      bottom: 0;
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
      border-bottom: px2rem(1) dashed #ccc;
      box-shadow: 0 px2rem(-8) px2rem(8) rgba($color: #000000, $alpha: 0.15);
      .setting-font-size {
        display: flex;
        height: 100%;
        .preview {
          flex: 0 0 px2rem(40);
          @include center; //TODO 居中显示

        }
        .select-container {
          flex: 1;
          display: flex;
          .select-wrapper {
            flex: 1;
            align-items: center;
            display: flex;
            &:first-child {
              .line {
                &:first-child {
                  border-top: none;
                }
              }
            }
            &:last-child {
              .line {
                &:last-child {
                  border-top: none;
                }
              }
            }

            .line {
              flex: 1;
              height: 0;
              border-top: px2rem(1) solid #ccc;
            }
            .point-wrapper {
              position: relative;
              flex: 0 0 0;
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
                border: px2rem(2) solid #ccc;
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
      .setting-theme {
        height: 100%;
        font-size: px2rem(18);
        display: flex;
        .setting-theme-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: px2rem(5);
          box-sizing: border-box; //TODO   记得搞明白border-box   和  flex:1的意思啊
          .preview {
            flex: 1;
            border-radius: px2rem(6);
          }
          .text {
            flex: 0 0 px2rem(20);
            font-size: px2rem(14);
            color: #333;
            @include center;
            position: relative;
            bottom: px2rem(36);
          }
        }
      }
    }
  }

</style>
