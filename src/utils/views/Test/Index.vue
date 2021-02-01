<style>
#protocol-wrapper {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  color: white;
  background-color: #33acdc;
  h1 {
    font-size: 32px;
    line-height: 56px;
    text-align: center;
    margin-top: 20px;
  }
  h2 {
    font-size: 28px;
    line-height: 50px;
    margin-top: 20px;
  }
  .p1 {
    font-size: 25px;
    margin-top: 10px;
  }
  .p2 {
    font-size: 24px;
    margin-left: 15px;
    margin-top: 5px;
  }
}
#protocol-content {
  background-color: #33acdc;
}
#protocol-content img {
  width: 400px;
  height: 400px;
  box-shadow: 0 0 4px #ccc;
  display: block;
  margin: 0 auto;
}
#image-wrapper {
  width: 100%;
  img {
    width: 100%;
  }
}
</style>
<template>
<div id="protocol-wrapper">
  <div id="protocol-content">
    <h1>兰思英语用户注册协议</h1>
    <h2>1. 特别提示</h2>
    <p class="p1">1.1 兰思英语同意按照本协议的规定及其不时发布的操作规则提供基于互联网以及移动网的相关服务（以下称“网络服务”），为获得网络服务，服务使用人（以下称“用户”）应当同意本协议的全部条款并按照页面上的提示完成全部的注册程序。用户在进行注册程序过程中点击“同意”按钮即表示用户完全接受本协议项下的全部条款。</p>
    <p class="p1">1.2 用户注册成功后，兰思英语将给予每个用户一个用户帐号及相应的密码，该用户帐号和密码由用户负责保管；用户应当对以其用户帐号进行的所有活动和事件负法律责任。</p>
    <p class="p1">1.3 用户注册成功，兰思英语将会通过电话或微信向每位注册用户进一步介绍本公司的相关服务情况。用户的注册行为即视同为同意接受公司进一步的服务。</p>
  </div>
  <div id="image-wrapper">

  </div>
</div>
</template>
<script>
import html2canvas from "html2canvas";

export default {
  name: "test",
  components: {},
  data: () => {
    return {
      show: true
    };
  },
  methods: {},
  created: async function() {
    console.log(Array.from("foo"));
    this.$loading.hide();
  },
  mounted: function() {
    function convertCanvasToImage(canvas) {
      var image = new Image();
      image.crossOrigin = "anonymous";
      image.src = canvas.toDataURL("image/png");
      return image;
    }
    setTimeout(function() {
      html2canvas(document.querySelector("#protocol-content"), {
        allowTaint: true, // 允许加载跨域的图片(不需要CROS配合，不支持canvas.toDataURL)
        tainttest: true, //检测每张图片都已经加载完成
        // scale:scaleBy, // 添加的scale 参数
        // canvas:canvas, //自定义 canvas
        // useCORS: true, // 允许加载跨域的图片(需要CROS配合，且支持canvas.toDataURL)
        logging: true //日志开关，发布的时候记得改成false
        // width:width, //dom 原始宽度
        // height:height //dom 原始高度
      }).then(canvas => {
        // document.body.appendChild(canvas)
        setTimeout(function() {
          let image = convertCanvasToImage(canvas);
          document.querySelector("#image-wrapper").appendChild(image);
        }, 2000);
      });
    }, 2000);
  }
};
</script>
