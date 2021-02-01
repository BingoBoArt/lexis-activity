<template>
    <div class="main-wrap" >
      <div class='title'>英语天天见</div>
      <div class="price">￥{{params.price}}</div>
      <div class="card-wrap">
        <span>收款方</span>
        <span>英语天天见</span>
      </div>
      <lemon-button @click = 'pay' :loading="pay_loading" class="lemon-button lemon-button-primary lemon-button-large btn-pay">{{payStatus}}</lemon-button>
    </div>
</template>
<script>
import LemonUtils from 'lemon-utils';
import WxPay from '@base/common/wxpay.js'
import Request from '@base/common/request.js'
export default {
  name: 'example',
  components: {
  },
  data: () => {
    return {
      params: {},
      cancel: false,
      payStatus: '立即支付',
      pay_loading: false
    }
  },
  methods: {
    paySuccess() {
      this.params.url ? window.location.replace(this.params.url) : this.$router.replace({path: '/result'});
    },
    wxPay(data) {
      let _this = this;
      WxPay.do({
        param: {
          ...data.param,
          timestamp: data.param.timeStamp
        },
        success: function(res) {
          _this.paySuccess();
        },
        fail: function (res) {
          _this.$toast('下单失败')
        },
        cancel: function (res) {
          // 刷新页面 获取支付结果
          _this.cancel = true;
          _this.pay_loading = false;
          _this.payStatus = '立即支付';
        }
      })
    },
    pay () {
      let that = this;
      that.pay_loading = true;
      that.payStatus = '订单生成中';
      Request({
          url: "/order/create",
          data: {
            payChannel: 'WeChat',
            payType: 'H5',
            num: 1,
            skuId: that.params.skuId
          },
          type: "POST"
      }).then(res => {
        console.log(res);
        if (res.code == "0000") {
          let data = res.data;
          // LemonUtils.setLocalStorage("orderId", data.orderId);
          that.wxPay(data)
        } else {
          that.$toast(res.msg || "系统错误，请稍后重试！");
        }
      }).always(() => {
        that.pay_loading = false;
        that.payStatus = '立即支付';
      })
    }
    
    
  },
  created: function () {

  },
  mounted: function () {
    let that = this;
    // skuId: that.skuId, 商品id
    // num: 1, 商品数量
    // price: '1', 商品价格
    // url: 'http://www.baidu.com' 支付成功跳转url 不传默认跳结果页
    that.params = LemonUtils.getUrlParam();
    if(that.params.url){
      that.params.url = decodeURIComponent(that.params.url)
    }
  }
}
</script>
<style scoped>
.main-wrap{
  text-align: center;
  background: #f1f1f1;
  min-height: 100%;
  .title{
    padding: 40px 0 20px;
    font-size: 32px;
  }
  .price{
    font-size: 60px;

  }
  .btn-pay{
    background: #06C565;
    width: 700px;
  }
  .card-wrap{
    height: 80px;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 25px;
    margin: 40px 0;
    font-size: 24px;
  }
}
</style>

