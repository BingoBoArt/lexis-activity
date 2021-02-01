<template>
  <div id="wrapper">
    <div class="leftBar"></div>
    <div class="rightContent">
      <iframe src="https://local-egret.lexislive.com/chooseRightAnswer/index.html?id=30010" frameborder="0" id="demo">

      </iframe>
      <div class="start" @click="sendPageCommand">Start</div>
      <div class="showTips" v-for="item in hint" v-bind:key = item.index>{{item}}</div>
    </div>
  </div>
</template>
<style lang="less" scoped>
#wrapper {
  background: blue;
}
.leftBar {
  width: 200px;
  height: 800px;
  float: left;
  background: rgb(238, 241, 227);
}
.rightContent {
  height: 800px;
  overflow: hidden;
  background: rgb(221, 131, 198);
  iframe {
    width: 100%;
    height: 500px;
  }
}
.start {
  width: 100px;
  height: 50px;
  background: yellow;
  line-height: 50px;
  font-size: 40px;
  text-align: center;
  margin: 0 auto;
}
.showTips {
  margin: 0 auto;
  font-size: 10px;
  text-align: center
}
</style>
<script>
import Vue from "vue";
export default {
  name: "App",
  components: {},
  data: () => {
    return {
      hint: [ "这里显示操作" ]
    }
  },
  methods: {
    sendPageCommand() {
      //父页面向子页面发送data
      console.log("start");
      let demo = document.getElementById("demo");
      demo.contentWindow.postMessage(
        {"code": 1, "params": {"type": "gameStatus", "params": {"gameStatus": {"start": 1}}}},
        "*"
      );
    },
    sendLexisCallPage() {
      let demo = document.getElementById("demo");
      //发送lexiscallpage接口数据
      demo.contentWindow.postMessage(
        "{code: 1, params: {type: 'gameStatus', params: {'gameStatus': {'start': 1}}}}",
        "*"
      );
    }
  },
  created: function() {
    // let that = this;
    // window.addEventListener("message", function(params) {
    //   if (params.data && typeof(params.data)== 'string') {
        //游戏操作数据
        // let result = eval("(" + params.data + ")");
    //     that.hint.push(result);
    //     console.log(result, "data");
    //   }
    // });
  },
  mounted: function() {}
};
</script>
