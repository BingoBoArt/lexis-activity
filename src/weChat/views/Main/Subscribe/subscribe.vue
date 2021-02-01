<template>
  <div class="subscribeList">
    <navx></navx>
    <div class="ulWrap">
      <ul class="subscribeUl">
        <subItem v-for="(item,index) in subscribeData" :key='index' class='subItem' :itemInfo='item' />
      </ul>
    </div>
  </div>
</template>
<script>
import subItem from "./subItem";
import navx from "./navx";
import navy from "./navy";
import Request from "@/common/request";
import weui from "weui.js";
import { isNeedBind } from "@/common/util";
export default {
  name: "subscribe",
  data: () => {
    return {
      subscribeData: []
    };
  },
  methods: {},
  created: function() {
    let that = this;
    isNeedBind(that, function() {
      that.$loading.show();
      Request({
        url: "http://192.168.50.170:6789/api/stu/schedule", //调取课程领取信息
        type: "POST"
      })
        .then(res => {
          if (res.data && res.data.list) {
            let { list } = res.data;
            that.subscribeData = list;
            console.log(list);
          } else {
            weui.alert(res.message);
          }
        })
        .always(function() {
          that.$loading.hide();
        });
    });
  },
  components: {
    subItem,
    navx,
    navy
  },
  mounted: function() {}
};
</script>
<style lang="less" scoped>
.ulWrap {
  display: flex;
  justify-content: center;
  .subscribeUl {
    display: flex;
    flex-wrap: wrap;
    width: 630px;
  }
}
</style>
