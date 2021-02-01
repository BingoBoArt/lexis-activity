<template>
  <div class="wrapper appStore-wrapper">
    <div class="content">
      <div class="inner">
        <div class='pic'></div>
        <div class="tip">
          <p class="strong-tip">提示：</p>
          <p>1、兰思英语目前只支持iPad端</p>
          <p>2、请从iPad上直接登录苹果商店，在搜索栏中输入“兰思英语”，按照提示完成下载安装。</p>
          <p>3、若您已经在微信端使用手机注册了兰思英语的账号，您可以直接使用微信端注册的手机号和密码登录兰思英语APP。</p>
          <!-- <p class="strong-tip">iPad用户请点击下方按钮下载APP：</p> -->
        </div>
        <a href="javascript:" id="showTooltips" class="weui-btn weui-btn_primary btn_yellow mb-60 btn1 btn2" @click="download">点击下载</a>
      </div>
    </div>
  </div>
</template>
<script>
  import weui from "weui.js";
  // import isNeedBind from '../../common/util';
  export default {
    name: "AppStore",
    components: {},
    data: () => {
      return {
        isGot: null
      };
    },
    methods: {
      download: function () {
        let isIpad = window.navigator.appVersion.match(/iPad/gi);
        console.log(isIpad);
        if (isIpad) {
          window.open("https://itunes.apple.com/cn/app/id1267750235?mt=8");
        } else {
          weui.alert(
            "请从iPad上直接登录苹果商店，在搜索栏中输入“兰思英语”，按照提示完成下载安装。"
          );
        }
      }
    },
    created: function () {
      // isNeedBind(this);
      //this.$loading.hide();
    },
    mounted: function () {}
  };
</script>
<style>
  @import "../../assets/css/common/variable.less";
  .appStore-wrapper {
    width: 100%;
    height: 100%;
    background: @bgColor;
    .content {
      width: 100%;
      overflow: hidden;
      .pic {
         width: 750px;
        height: 500px;
        background: url('../../assets/images/screen.jpg') no-repeat;
        background-size: contain;
        display: block;
        margin: 0px auto 0px;
      }
      .tip {
        color: white;
        text-align: left;
        font-size: 29px;
        margin-top: 70px;
        padding: 0 40px;
        p {
          margin: 16px 0;
        }
        .strong-tip {
          font-size: 36px;
          font-weight: 600;
        }
      }
      .weui-btn_primary {
        background: #f99231;
      }
    }
    .content {
      // margin-top: 65px;
      .logo {
        margin-top: 60px;
      }
    }
    a {
      margin-top: 100px;
      width: 610px;
      height: 95px;
      background: #deb419;
      line-height: 95px;
      font-size: 38px;
    }
  }
</style>
