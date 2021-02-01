<template>
    <div class="wrapper" v-loading="loading">
      <ul class="user-list clearfix">
        <li v-for="(item, index) in dataList" :key="index">
          <img :src="item.imgUrl">
          <p class="nickname">{{item.nickname}}</p>
        </li>
      </ul>
      <LoadMore v-if="!loading" @load="loadMore" :loading="more_loading" :hasMore="hasMore"/>
    </div>
</template>
<script>
import LemonUtils from 'lemon-utils';
import Request from "@base/common/request.js";
import AppHandle from "@base/common/appHandle.js";
import LoadMore from "@/components/load-more/index.vue";
export default {
  name: "more",
  components: {
    LoadMore
  },
  data: () => {
    return {
      loading: true,
      hasMore: true,
      more_loading: false,
      params: {
        rank: 1,
        issueId: 1
      },
      dataList: [],
    };
  },
  methods: {
    loadMore(list) {
      this.more_loading = true;
      this.getList();
    },
    getList() {
      Request({
        url: '/liveapi/exercise/more/user',
        // mock: require("@/mock/more.js"),
        data: {
          ...this.params
        }
      }).then(res => {
        this.dataList = this.dataList.concat(res.data.dataList);
        this.hasMore = !!res.data.hasMore;
      }).always(res => {
        this.loading = false;
        this.more_loading = false;
      })
    }
  },
  created: function() {},
  mounted: function() {
    let score = LemonUtils.getUrlParam("score")
    let issueId = LemonUtils.getUrlParam("issueId")
    this.params = {
      score,
      issueId
    }
    this.getList();
  }
};
</script>
<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
  min-height: 100%;
  background: #b4f4fa url("~@/assets/img/bg.jpg") no-repeat;
  background-size: 100% auto;
  overflow: auto;
  .user-list{
    li{
      float: left;
      width: 20%;
      padding: 10px;
      box-sizing: border-box;
      text-align: center;
      img{
        width: 100%;
        height: 100%;
      }
      .nickname{
        font-size: 28px;
        color: #111;
      } 
    }
  }
}
</style>

