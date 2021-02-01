<template>
    <div class="wrapper" v-loading="loading">
      <ul class="list-wrapper" v-if="list && list.length">
        <li v-for='(item, index) in list' :key="index">
          <router-link class='routet-wrap'  :to="{ path: 'answerDec', query: { issueId: item.issueId}}">
            <span class='left'>{{item.issueName}}</span>
            <div class='right'>
              <img v-if="item.rank && item.rank > 0" class='pic' :src="require('@/assets/img/rank'+item.rank+'.png')" />
              <span><b>{{item.score}}</b>分</span>
              <span class='nav-dec'></span>
            </div>
          </router-link>
        </li>
      </ul>
      <NoData v-else-if="!loading" text="暂时还没有往期成绩！"></NoData>
    </div>
</template>
<script>
import Request from "@base/common/request.js";
import AppHandle from "@base/common/appHandle.js";
import LemonUtils from 'lemon-utils';
import UserInfo from '@base/components/userInfo/index.js'
import NoData from "@/components/no-data/index.vue";
export default {
  name: "profile",
  components: {
    NoData
  },
  data: () => {
    return {
      loading: true,
      list: [],
      issueId: ''
    };
  },
  methods: {
    async init() {
      let that = this;
      let userInfo = await UserInfo.getUserInfo(that);
      if(!(userInfo && userInfo.token) && AppHandle.isApp){
        that.$toast("你当前处于游客状态，请先登录哦～");
      }else{
        Request({
          url: '/exercise/history',
          // mock: require('@/mock/history.js'),
          type: 'post',
          data: {
          }
        }).then((res) => {
          console.log(res);
          if (res.code == "0000") {
            that.list = res.data.items;
          } else {
            that.$toast(res.msg);
          }
        }).always(() => {
          this.loading = false;
        })
      }
    },
  },
  created: function() {
    this.init();
  },
  mounted: function() {
  }
};
</script>
<style scoped>
* {
  /* touch-action: none; */
}
.wrapper {
  -webkit-user-select: none;
  width: 100%;
  min-height: 100%;
  box-sizing: border-box;
  background: url(~@/assets/img/bg.jpg) no-repeat;
  background-size: cover;
  ul{
    li{
      height: 100px;
      line-height: 100px;
      border-bottom: 2px solid #73aec2;
      display: flex;
      justify-content: space-between;
      font-size: 36px;
      .routet-wrap{
        width: 100%;
        color: #333;
      }
      .left{
        color: #333;
        margin-left: 50px;
      }
      .nav-dec:before{
        content: '';
        display: inline-block;
        width: 26px;
        height: 26px;
        border-top: 4px solid #888;
        border-right: 4px solid #888;
        transform: rotate(45deg);
        margin: 0 56px 0 0;
      }
      .right{
        display: flex;
        align-items: center;
        .pic{
          width: 94px;
          margin-right: 30px;
        }
      }
    }
  }
}
</style>

