<template>
    <div class="main-wrap" >
      <div class='main-content' v-show='!loading'>
        <h1 class='title'>结算中心</h1>
        <router-link v-show='isEmpty' class='addr-init-wrap' to="/address">
          <img src='~@/assets/img/icon-address.png' />
          <span class='font'>添加收货地址</span>
          <span class='arrow'>&gt;</span>
        </router-link>
        <Address v-if='!isEmpty' :userinfo='userinfo'></Address>
        <LessonInfo :lessonDesc = 'lessonDesc'></LessonInfo>
        <ul class='price-wrap'>
          <li>
            <span>商品总金额</span>
            <b>￥{{originalPrice}}</b>
          </li>
          <li>
            <span>优惠</span>
            <b>-￥{{discountsPrice}}</b>
          </li>
          <li>
            <span>实付款</span>
            <b>￥{{price}}</b>
          </li>
        </ul>
        <div class="agree-wrap">
          <!-- <input id="buyTerms" name="checkbox" v-model='isAgree' value='isAgree' type="checkbox" class="agree__checkbox"> -->
          <label for="buyTerms"><span class='tips-agree'><router-link to="/BuyProtocol">点击“立即报名”即同意《用户购买协议》</router-link></span></label> 
        </div>
        <div class='bottom'></div>
        <Bottom :priceShow='false' :loading="pay_loading" @click = 'orderSubmit'></Bottom>
      </div>
    </div>
</template>
<script>
import UserInfo from '@base/components/userInfo/index.js'
import Bottom from '@/views/Common/Bottom/index.vue'
import LessonInfo from '@/views/Common/LessonInfo/index.vue'
import Address from '@/views/Common/Address/index.vue'
import Request from '@base/common/request.js'
import LemonUtils from 'lemon-utils';
import AppHandle from '@base/common/appHandle.js'
import WxPay from '@base/common/wxpay.js'
import CurConfig from '@/common/config.js'
import util from '@base/common/util.js'
import Events from '@base/common/events.js'
  export default {
    name: 'example',
    components: {
      Bottom,
      LessonInfo,
      Address
    },
    data: () => {
      return {
        isAgree: true,
        dialogOption: {
          title: '',
          content: '请关注"英语天天见ABC"公众号，点击菜单"全能语感课"进行报名',
          btn_right_text: '确认',
          btn_left_text: ''
        },
        loadingObj: '',
        loadUserInfo: false,
        isEmpty: true,
        loading: true,
        pay_loading: false,
        skuId: '',
        originalPrice: '',
        price: '',
        discountsPrice: '',
        addressId: '',
        lessonDesc: {
          first: true,
          title: '',
          content: ''
        },
        userinfo: {
          name: '',
          tel: '',
          addr: '',
          url: '/address',
          isdescHide: 'desc-hide'
        }
      }
    },
    methods: {
      diffChannel(params) {
        let that = this;
        let payResultUrl = 'http://www.tiantianjian.com/lexis-activity/payCenter/index.html#/result'
        // 如果是app下单完直接调支付
        if(!AppHandle.isApp && params.price != 0){
          location.href = util.getPayUrl(params);
        }else{
          Request({
            url: "/order/create",
            data: {
              payChannel: 'WeChat',
              payType: AppHandle.isApp ? 'App' : 'H5',
              num: params.num,
              skuId: params.skuId
            },
            type: "POST"
          }).then(res => {
            console.log(res);
            let data = res.data;
            if (res.code == "0000") {
              if(params.price == 0){
                params.url ? location.href = decodeURIComponent(params.url) : location.href = payResultUrl;
                return;
              }else if(AppHandle.isApp){
                AppHandle.appPay(data.param);
                Events.on("get_payApp", res => {
                  console.log(res);
                  that.$toast(res.message || '支付失败');
                  if(res.code == 0){
                    location.href = decodeURIComponent(params.url);
                  }
                })
              }
            }else{
              that.$toast(res.msg || "系统错误，请稍后重试！");
            }
          })
        }
      },
      orderSubmit () {
        let that = this;
        if(that.isEmpty){
          this.$toast('请先填写地址');
          return;
        }
        let routeName = '/orderList';
        let routes = {
          _new: '/orderList',
          _old: that.$route.path
        }
        let params = {
          price: that.price,
          num: 1,
          skuId: that.skuId,
        }
        let url = encodeURIComponent(location.href.replace(routes._old, routes._new));
        params.url = url;
        that.diffChannel(params)
      },
      getLessonDesc () {
        let that = this;
        new Request({
            url: "/sku/rule/price/v1",
            data: {
              spuId: CurConfig.spuId
            },
            type: "POST"
          }).then(res => {
            if (res.code == "0000") {
              let data = res.data;
              that.lessonDesc.title = data.skuName;
              that.lessonDesc.content = data.detail;
              that.skuId = data.skuId;
              that.isEmpty = data.userAddress && data.userAddress.province ? 0 : 1;
              if(!that.isEmpty){
                let userAddress = data.userAddress;
                that.userinfo.name = userAddress.contacts;
                that.userinfo.tel = userAddress.mobile;
                that.userinfo.addr = `${userAddress.province}${userAddress.city}${userAddress.ara}${userAddress.detail}`;
              }
              that.originalPrice = LemonUtils.FloatCalculate.accDiv(data.originalPrice, 100);
              that.price = LemonUtils.FloatCalculate.accDiv(data.price, 100);
              that.discountsPrice = LemonUtils.FloatCalculate.accDiv(data.discountsPrice, 100);
              // that.subprice = LemonUtils.FloatCalculate.accSub(that.originalPrice, that.price)
              // if(AppHandle.isApp && that.price != 0){
              //   this.$dialog(that.dialogOption);
              // }
            } else {
              this.$toast(res.msg || "系统错误，请稍后重试！");
            }
            that.loading = false;
            that.loadingObj.close();
          })
      }
    },
    created: function () {
    },
    mounted: function () {
      this.loadingObj = this.$loading({
        icon: 1,
      });
      let that = this;
      this.getLessonDesc(); 
      // UserInfo.getUserInfo(that).then((res) => {
      //   console.log("userInfo", res)
      //   this.getLessonDesc();
      // }).catch(err => {
      //   console.log(err)
      // })
    }
  }
</script>
<style scoped>
.main-wrap{
  min-height: 100%;
  background: #fff7ce;
  .bottom{
    height: 104px;
  }
  .title{
    font-size: 46px;
    color: #ff733b;
    text-align: center;
    padding: 20px 0;
    font-weight: bold;
  }
  .addr-init-wrap{
    display: block;
    height: 86px;
    line-height: 80px;
    background: #fff;
    padding: 0 14px 0 16px;
    margin-bottom: 18px;
    img{
      vertical-align: middle;
      width: 35px;
      height: 44px;
      margin-right: 10px;
    }
    span.font{
      vertical-align: middle;
      font-size: 32px;
      color: #010101;
    }
    span.arrow{
      font-size: 48px;
      color: #b5b5b6;
      float: right;
    }
  }
  
  .price-wrap{
    background: #fff;
    margin-bottom: 18px;
    li{
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      height: 86px;
      line-height: 86px;
      border-bottom: 1px solid #b5b5b6;/*no*/
      font-size: 32px;
      &:last-of-type{
        border-bottom: none;
      }
      span{
      }
      b{
        color: #ff733b;
        font-weight: 500;
      }
    }
  }
  .agree-wrap {
    display: flex;
    align-items: center;
    padding: 0 20px;
    margin-bottom: 18px;
    label{
      span{
        color: #898989;
        font-size: 30px;
      }
      a{
        color: #898989;
        text-decoration: underline;
      }
    }
  }
  .agree__checkbox {
    display: inline-block;
    width: 32px;
    height: 32px;
    border: 3px solid #898989;
    border-radius: 2px;
    margin-right: 20px;
  }
  .agree__checkbox:checked:before {
      font-size: 32px;
  }
  .agree__checkbox:checked:before {
      color: #898989;
      font-weight: bold;
  }

}
</style>

