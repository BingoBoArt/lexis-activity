<template>
  <div class="bottom-wrapper flex">
    <p :class='(priceShow&&!disabled) ? "flex-1 info" : "hide"'>￥{{originalPrice === '' && '--' || originalPrice}}<span class="imp">￥{{price === '' && '--' || price}} VIP价</span></p>
    <lemon-button class="bottom-btn" :class="{'disabled-btn': disabled}" :loading="loading" @click="handleClick" :disabled="disabled">{{button_text_inner || button_text}}</lemon-button>
  </div>
</template>

<script>
  /**
   * 参数 loading button_text
   * 事件 click, load
   */
  import Request from '@base/common/request.js'
  import CurConfig from '@/common/config.js'
  import LemonUtils from 'lemon-utils';
  
  // 3、从banner来 若已购买，则按钮置灰度 todo
  // 4、已完成，则跳往"已完成"页面 todo

  export default {
    name: 'bottom-component',
    data() {
        return {
          FROM: '',
          origin: '',
          originalPrice: '',
          price: '',
          disabled: false,
          button_text_inner: ""
        }
    },
    props: {
      loading: {
        type: Boolean,
        default: false
      },
      priceShow: {
        type: Boolean,
        default: false
      },
      button_text: {
        type: String,
        default: '立即报名'
      }
    },
    watch: {
    },
    methods: {
      handleClick() {
        this.$emit("click");
      },
      getPrice() {
        Request({
          url: "/spu/sku/price",
          data: {
            "spuId": CurConfig.spuId,
            "token": LemonUtils.getLocalStorage("we-token") || ""
          },
          type: 'get'
          // mock: require("@/mock/auth"),
        }).then(res => {
          if(res && res.data){
            let priceInfo = res.data;
            try{
              this.originalPrice = LemonUtils.FloatCalculate.accDiv(priceInfo.originalPrice, 100),
              this.price = LemonUtils.FloatCalculate.accDiv(priceInfo.price, 100)
            }catch(e){

            }
          }
          if(res && res.code == 7003){
            // 已购买
            if(this.FROM == 'usercenter' && this.origin != 'orderList'){
              this.$router.replace({
                path: "/orderList"
              });
            }else{
              this.disabled = true
              this.button_text_inner = "已参与"
              this.$emit("load"); // 去除loading
            }
          }else{
            this.$emit("load"); // 去除loading
          }
        })
      }
    },
    created() {
      this.FROM = LemonUtils.getUrlParam("_from");
      this.origin = LemonUtils.getUrlParam("_origin");
      this.getPrice();
    },
    mounted() {
    }
  }
</script>
<style lang="less" scoped>
.bottom-wrapper{
  width: 100%;
  height: 104px;
  line-height: 104px;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 99;
  background: white;
  border-top: 1px solid #9fa0a0;
  justify-content: space-between;
  .hide{
        visibility: hidden;
  }
  .info{
    font-size: 45px;
    color: #9fa0a0;
    padding-left: 4px;
  }
  .imp{
    color: #ff733b;
    font-size: 40px;
    margin-left: 10px;
  }
  .bottom-btn{
    background: linear-gradient(rgb(255,81,21) 0%, rgb(255,125,63) 100%);
    width: 250px;
    height: 100%;
    color: white;
    border-radius: 0;
    border: none;

    &.disabled-btn{
      background: linear-gradient(#ababab 0%, #6f6f6f 100%);
    }
  }
}
</style>