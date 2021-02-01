<template>
    <div class="start-wrap" v-loading="loading">
      <div class='star-out-wrap' v-show='surplus || surplus == 0'>
        <div class='star-wrap' >
          <img class='pic1' src='~@/assets/img/star.png' />
          <img class='pic2' src="~@/assets/img/icon-c.png" alt="">
          <span>{{surplus}}</span>
        </div>
      </div>
      <img class='topic' src='~@/assets/img/topic.png'/>
      <p class='font-cycle'>{{issueName}}</p>
      <div class='bot-wrap'>
        <p :style='{visibility: need ? "visible" : "hidden"}' class="bot-star-count flex"><span>消耗</span><img src='~@/assets/img/star.png' /><span>x{{need}}</span></p>
        <btnBasic class='btn-start' color='' @click='questionStart()'>
          <img src='~@/assets/img/icon-start.png' />
        </btnBasic>
      </div>
    </div>
</template>
<script>
import Request from "@base/common/request.js";
import AppHandle from "@base/common/appHandle.js";
import LemonUtils from 'lemon-utils';
import UserInfo from '@base/components/userInfo/index.js'
import btnBasic from "@/components/btn-basic/index.vue";
export default {
  name: "profile",
  components: {
    btnBasic
  },
  data: () => {
    return {
      loading: true,
      surplus: null,
      need: '',
      issueName: ''
    };
  },
  methods: {
    goBack() {
      AppHandle().toHome();
    },
    async getStarInfo() {
      let that = this;
      let userInfo = await UserInfo.getUserInfo(that);
      if(!(userInfo && userInfo.token) && AppHandle.isApp){
        that.$toast("你当前处于游客状态，请先登录哦～");
      }else{
        that.token = userInfo.token;
        Request({
          headers: {
            token: that.token
          },
          url: '/exercise/start/question',
          type: 'post',
          data: {
            issueId: that.issueId
          }
        }).then((res) => {
          if (res.code == "0000") {
            that.surplus = res.data.surplus;
            that.need = res.data.need
            that.issueName = res.data.issue.issueName;
          } else {
            that.$toast(res.msg);
          }
        }).always(() => {
          that.loading = false;
          // console.log("that.loading", that.loading)
        })
      }
    },
    questionStart() {
      let self = this;
      let {surplus, need, issueId, issueName} = self;
      if(surplus < need){
        let option = {
          title: '',
          content: '没有足够的星星啦！',
          btn_right_text: '取消挑战',
          btn_left_text: ''
        }
        self.$dialog(option);
        return;
      }else{
        self.$router.replace({path: "question", query: {issueId: issueId, issueName: issueName}});
      }
    }
  },
  created: function() {
    this.issueId = LemonUtils.getUrlParam('issueId');
    this.getStarInfo();
  },
  mounted: function() {
  }
};
</script>
<style scoped>
* {
  /* touch-action: none; */
}
.start-wrap {
  -webkit-user-select: none;
  width: 100%;
  position: relative;
  min-height: 100%;
  box-sizing: border-box;
  /* overflow: hidden; */
  background-color: #83d2fa;
  background: url(~@/assets/img/bg.jpg) no-repeat left bottom;
  background-size: cover;
  padding-top: 32px;

  .star-out-wrap{
    border: 3px solid #fff;
    border-radius: 32px;
    float: right;
    margin-right: 16px;
    box-shadow: 0px -6px 13px 2px #6bb5f4 inset;
    height: 60px;
    line-height: 60px;
    .star-wrap{
      height: 100%;
      min-width: 200px;
      /* border: 2px solid #6bb5f4; */
      border-radius: 30px;
    box-shadow: -2px 6px 13px 2px #6bb5f4 inset;
      background: -webkit-linear-gradient(rgba(73,149,227,0.5), rgba(68,146,224,0.3), rgba(164,244,255,0.5), rgba(154,232,253,0.9), rgba(126,201,248,0.7));
      background: -o-linear-gradient(rgba(73,149,227,0.5), rgba(68,146,224,0.3), rgba(164,244,255,0.5), rgba(154,232,253,0.9), rgba(126,201,248,0.7));
      background: -moz-linear-gradient(rgba(73,149,227,0.5), rgba(68,146,224,0.3), rgba(164,244,255,0.5), rgba(154,232,253,0.9), rgba(126,201,248,0.7));
      background: linear-gradient(rgba(73,149,227,0.5), rgba(68,146,224,0.3), rgba(164,244,255,0.5), rgba(154,232,253,0.9), rgba(126,201,248,0.7));
      position: relative;
      top: -1px; 
      text-align: right;
      font-size: 56px;
      color: #fff;
      font-weight: bold;
      img.pic1{
        position: absolute;
        left: 8px;
        top: -8px;
        width: 78px;
        height: 76px;
      }
      img.pic2{
        position: absolute;
        left: 84px;
        bottom: 8px;
        width: 19px;
        height: 20px;
      }
      span{
        display: inline-block;
        padding: 0 44px 0 128px;
      }
    } 
  }
  .topic{
    display: block;
    width: 500px;
    height: 162px;
    margin: 200px auto 54px;
  }
  .font-cycle{
    height: 50px;
    font-size: 40px;
    color: #186288;
    font-weight: bold;
    text-align: center;
  }
}
.bot-wrap {
  width: 100%;
  margin-top: 240px;
  padding-bottom: 30px;
  .bot-star-count{
    justify-content: center;
    align-items: flex-end;
  }
  p{
    height: 50px;
    font-size: 40px;
    line-height: 1;
    color: #186288;
    font-weight: bold;
    text-align: center;
    span{
      display: inline-block;
      vertical-align: bottom;
      line-height: 1;
    }
    img{
      width: 48px;
      height: 46px;
      vertical-align: bottom;
      margin: 0 6px;
    }
  }
  .btn-start{
    width: 508px;
    height: 138px;
    margin: 20px auto 0;
    img{
      width: 220px;
      height: 53px;
    }
  }
}
@media only screen  and (min-device-width : 768px)  
                    and (max-device-width : 1024px)  
                    and (orientation : portrait){  
  .bot-wrap{
    margin-top: 200px;
  }
}  
.start-title {
  display: block;
  width: 298px;
  height: 70px;
  margin: 16px auto 0;
}
.level {
  width: 190px;
  height: 125px;
  margin: 0 auto;
  display: block;
}
div.start-content {
  width: 680px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  margin: 30px auto 0;
  padding: 30px 15px;
  font-size: 32px;
  line-height: 54px;
  text-indent: 2em;
  color: #418cc8;
  position: relative;
  z-index: 2;
}
.start-content-top {
  margin-bottom: 30px;
}
.start {
  /* icon-start.png */
  width: 508px;
  height: 138px;
  display: block;
  margin: 20px auto 0;
  background: url("~@/assets/img/start.png") no-repeat;
  background-size: 100% 100%;
  position: relative;
  z-index: 2;
  &:active{
    background: url("~@/assets/img/start-a.png") no-repeat;
    background-size: 100% 100%;
  }
}
</style>

