<template>
    <div class="wrapper courseSys-wrapper">
        <div class="content">
            <div class='pic'></div>
        </div>
        <div class="tip">
          <p class="strong-tip">1对4 精英小班英语课</p>
          <p style="text-indent:30px;">为中国儿童量身打造的ESL课程</p>
          <p>快乐的场景式小班教学!</p>
          <p>美国Lexile®分级阅读标准</p>
          <p>为（10-13岁）英语学习打下扎实基础!</p>
        </div>
    </div>
</template>
<script>
import Request from "@/common/request";
// import "weui";
import { isNeedBind } from "../../common/util";
import weui from "weui.js";
export default {
  name: "TestClass",
  components: {},
  data: () => {
    return {
      ableGot: true
    };
  },
  methods: {
    getFree() {
      //request
      let that = this;
      let loading = weui.loading("加载中...");
      isNeedBind(
        this,
        function() {
          console.log("123");
          // that.$loading.show();
          loading;
          new Request({
            url: "/audition/get", //调取课程领取信息
            data: {},
            type: "POST"
          })
            .then(res => {
              console.info(res);
              if (res.code == "1901") {
                that.ableGot = false;
                weui.toast("领取成功", 1000);
              } else {
                weui.toast("领取失败", 1000);
              }
            })
            .always(function() {
              // that.$loading.hide();
              loading.hide();
            });
        },
        { noLoading: true, loading: loading }
      );
    },
    hasGot() {
      // weui.alert("已经领取");
    }
  },
  created: function() {
    this.$loading.show();
    let that = this;
    let code = window.L.util.getUrlParam("code");
    new Request({
      url: "/audition/check", //调取课程领取信息
      data: {},
      code,
      type: "POST"
    })
      .then(res => {
        console.info(res);
        if (res.code == "1901") {
          that.ableGot = false;
        }
      })
      .always(function() {
        that.$loading.hide();
      });
  },
  mounted: function() {}
};
</script>
<style>
@import "../../assets/css/common/variable.less";
.courseSys-wrapper {
  text-align: center;
  .content {
    background: url("../../assets/images/graph.jpg");
    background-size: cover;
    width: 750px;
    height: 600px;
  }
  .strong-tip {
    font-size: 36px;
    font-weight: 600;
    color: #f99231;
    margin-top: 100px;
  }
  p {
    margin-top: 20px;
    text-align: center;
    color: #252323;
    font-size: 0.38666667rem;
  }
  .text {
    padding: 50px;
    font-size: 26px;
    color: #333;
    line-height: 40px;
  }
}
</style>
