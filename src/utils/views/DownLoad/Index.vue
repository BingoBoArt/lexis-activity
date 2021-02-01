<template>
    <div class="main-wrap">
        <img class="app-icon" src="~@/assets/img/weixin_icon.png" alt="">
        <a href="javascript:void(0)" @touchend="showPop()" class="download_btn"></a>

        <img class="logo" src="~@/assets/img/weixin_logo.png" alt="">

        <transition name="fade">
            <div class="pop-wrap" v-show="pop" @touchend="hidePop()">
                <div class="arr-wrap">
                    <img src="~@/assets/img/weixin_instructions.png" alt="">
                </div>
            </div>
        </transition>
    </div>
</template>
<style scoped type="less">
    @import "~@/assets/css/common/index.less";

    * {
        touch-action: none;
    }

    html, body {
        /*background: #fff;*/
        overflow: hidden;
        text-align: center;
    }
    .main-wrap {
        -webkit-user-select: none;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        background: url("~@/assets/img/download_bg.jpg") no-repeat center center;
        background-size: 100% 100%;
        overflow: auto;
        text-align: center;
        padding-top: 220px;
        position: relative;
        .app-icon {
            width: 400px;
            height: 400px;
        }
        .download_btn {
            display: block;
            width: 400px;
            height: 100px;
            background: url("~@/assets/img/weixin_btn.png") no-repeat center center;
            background-size: 100% 100%;
            margin: 60px auto 100px;

        }
        .logo {
            width: 240px;
            height: 169px;
            display: block;
            margin: 0 auto;
        }
        .pop-wrap {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 2;
            background: rgba(0, 0, 0, 0.5);
            .arr-wrap{
                width: 434px;
                height: 170px;
                position: absolute;
                top: 4px;
                left: 260px;
                animation: arrowmove 0.4s;
                overflow: hidden;
            }
            img {
                width: 434px;
                height: 170px;
            }

        }
    }

    .main-wrap .fade-enter-active, .main-wrap .fade-leave-active {
        transition: all .3s
    }

    .main-wrap .fade-enter, .main-wrap .fade-leave-active {
        opacity: 0;
    }

    @keyframes arrowmove {
        from {
            width: 0;
            /*right: -500px;*/
        }
        to {
            width: 434px;
            /*right: 50px;*/
        }
    }
</style>
<script>
  import Tip from "@/components/tip/index.js";

  export default {
    name: 'GetVip',
    components: {},
    data: () => {
      return {
        width: 1200,
        height: 800,
        pop: false,
        download_href: 'javascript:void(0)',
        iosEnable: true,
        iosHref: 'https://itunes.apple.com/cn/app/id1412632545?mt=8',
        androidHref: 'https://lsfile.oss-cn-beijing.aliyuncs.com/apk/ttj_student.apk'
      }
    },
    methods: {
      showPop() {
        if(window.L.ua.IOS && !this.iosEnable){
          Tip.error('英语天天见IOS版本即将发布！');
          return;
        }
        if (window.L.ua.weixin && window.L.ua.android) {
          this.pop = true;
        }else {
          window.location.href = this.download_href;
        }
      },
      hidePop() {
        this.pop = false;
      }
    },
    created: function () {
      let self = this;
      this.download_href = this.androidHref;
      if (window.L.ua.IOS) {
        this.pop = false;
        this.download_href = this.iosHref;
      } else if (window.L.ua.android) {
        if (window.L.ua.weixin) {
          this.pop = true;
          this.download_href = 'javascript:void(0)';
        } else {
          this.download_href = this.androidHref;
        }
      }
      window.onload = function () {
        if(window.L.ua.IOS && !self.iosEnable){
          Tip.error('英语天天见IOS版本即将发布！');
          return;
        }
        // if (window.L.ua.IOS) {
        //   window.location.href = self.iosHref
        // } else if (window.L.ua.android) {
        //   if (!window.L.ua.weixin) {
        //     window.location.href = self.androidHref;
        //   }
        // }
      }
    },
    mounted: function () {
      this.$loading.hide();
    }
  }
</script>

