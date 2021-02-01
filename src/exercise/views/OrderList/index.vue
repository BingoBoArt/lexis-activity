<template>
  <div class="main-wrap">
    <div v-if='load && hasOrder'>
      <LessonInfo :lessonDesc = 'lessonDesc'></LessonInfo>
      <Address :userinfo='userinfo'></Address>
      <!-- <p class='tips' v-if='lessonDesc.first'> -->
      <p class='tips'>
        课程用书将于3月18日起根据报名顺序陆续发出<br/>
        请留意客服通知，并及时签收。
      </p>
    </div>  
    <p class='null-wrap' v-if='load && !hasOrder'>暂无订单记录</p>
  </div>
</template>
<script>
import UserInfo from '@base/components/userInfo/index.js'
import LessonInfo from '@/views/Common/LessonInfo/index.vue'
import Address from '@/views/Common/Address/index.vue'
import Request from '@base/common/request.js'
import LemonUtils from 'lemon-utils';
  export default {
    name: 'example',
    components: {
      LessonInfo,
      Address
    },
    data: () => {
      return {
        load: false,
        hasOrder: true,
        lessonDesc: {
          first: false,
          tips: true,
          title: '',
          content: ''
        },
        userinfo: {
          name: '',
          tel: '',
          addr: ''
        }
      }
    },
    methods: {
      getOrderList () {
        let that = this;
        let reqUrl = '/order/detail';
        if(!that.lessonDesc.first){
          reqUrl = '/user/order/detail'
        }
        reqUrl = '/user/order/detail'
        new Request({
            url: reqUrl,
            data: {
              // orderId: '181102134696928'
            },
            type: "POST"
          }).then(res => {
            this.load = true;
            this.$loadingCloseAll();
            if (res.code == "0000") {
              if(res.data){
                let data = res.data;
                let orderAddress = data.orderAddress || {};
                that.lessonDesc.title = data.skuName;
                that.lessonDesc.content = data.detail;
                that.userinfo.name = orderAddress.contacts;
                that.userinfo.tel = orderAddress.mobile;
                that.userinfo.addr = `${orderAddress.province}${orderAddress.city}${orderAddress.ara}${orderAddress.detail}`;
              }else{
                that.hasOrder = false;
              }
            } else {
              this.$toast(res.msg || "系统错误，请稍后重试！");
            }
          })
      }
    },
    created: function () {
      this.$loading({
        icon: 1,
        mask: true
      });
      let that = this;
      if(LemonUtils.getUrlParam('_from') == 'usercenter'){
        that.lessonDesc.first = false;
      }else{
        that.lessonDesc.first = true;
      }
      this.getOrderList();
    },
    mounted: function () {
    }
  }
</script>
<style scoped>
.main-wrap{
  min-height: 100%;
  background: #fff7ce;
  .tips{
    font-size: 32px;
    color: #ff733b;
    padding: 0 16px;
    line-height: 1.5;
  }
  .null-wrap{
    font-size: 32px;
    text-align: center;
    padding-top: 200px;
  }
}
</style>