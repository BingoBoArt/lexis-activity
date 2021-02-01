<template>
    <div class="main-wrap">
      <div v-if = 'load'>
        <form>
        <div class='item-wrap'>
          <span>收货人姓名</span>
          <input v-model='username' max-length = '10' placeholder='请输入姓名' />
        </div>
        <div class='item-wrap'>
          <span>手机号</span>
          <input type='number' v-model='userTel' max-length = '11' placeholder='请输入手机号' />
        </div>
        <lemon-address v-if='addrLoad' :provinceParent = 'provinceParent' :cityParent='cityParent' :detailParent='areaParent' @update='update'></lemon-address>
        <div class='item-wrap text-area-wrap'>
          <span>详细地址</span>
          <!-- <input v-model='userAddrDesc' placeholder='街道、门牌号、小区等' /> -->
          <textarea v-model='userAddrDesc' placeholder='街道、门牌号、小区等'  rows="3" cols="20"></textarea>
        </div>
        </form>
        <a class='btn-save' href="javascript:void(0)" @click = 'updataUserAddr'>保存并使用</a>
      </div>
    </div>
</template>
<script>
  import UserInfo from '@base/components/userInfo/index.js'
  import Bottom from '@/views/Common/Bottom/index.vue'
  import Request from '@base/common/request.js'
  export default {
    name: 'example',
    components: {
      Bottom
    },
    data: () => {
      return {
        load: false,
        addrLoad: false,
        provinceParent: '北京市',
        cityParent: '市辖区',
        areaParent: '东城区',
        username: '',
        userTel: '',
        userAddrDesc: '',
        loadingObj: ''
      }
    },
    computed: {
      currentValue: {
          // 动态计算currentValue的值
          get: function() {
              return this.value;
          },
          set: function(val) {
              this.$emit('update', val);
          }
      }
    },
    methods: {
      update (option) {
        let that = this;
        console.log(option)
        that.provinceParent = option.province;
        that.cityParent = option.city;
        that.areaParent = option.detail;
      },
      getUserAddr () {
        let that = this;
        new Request({
          url: "/user/address/info",
          type: "get"
        }).then(res => {
          console.log(res);
          if (res.code == "0000") {
            let data = res.data;
            if(res.data){
              that.username = data.contacts;
              that.userTel = data.mobile;
              that.userAddrDesc = data.detail;
            }
            that.provinceParent = res.data && data.province || '北京市';
            that.cityParent = res.data && data.city || '市辖区';
            that.areaParent = res.data && data.ara || '东城区';
            that.addrLoad = true;
          } else {
            this.$toast(res.msg || "系统错误，请稍后重试！");
          }
          this.load = true;
          this.loadingObj.close();
        })
      },
      updataUserAddr () {
        let that = this;
        if(!that.username || !that.userTel || !that.userAddrDesc || !that.provinceParent){
          this.$toast('请完善收货信息');
          return;
        }
        if(!/^[1][3,4,5,7,8,9][0-9]{9}$/.test(that.userTel)){
          this.$toast('手机号码格式不正确');
          return;
        }
        new Request({
          url: "/user/address/save",
          data: {
            "contacts": that.username,
            "mobile": that.userTel,
            "province": that.provinceParent,
            "city": that.cityParent,
            "ara": that.areaParent,
            "detail": that.userAddrDesc,
          },
          type: "POST"
        }).then(res => {
          console.log(res);
          if (res.code == "0000" && res.data) {
            that.$router.back(-1);
            // that.$router.replace({path: 'orderConfirm'});
          } else {
            this.$toast(res.msg || "系统错误，请稍后重试！");
          }
        })
      }
    },
    created: function () {
      this.loadingObj = this.$loading({
        icon: 1,
      });
      this.getUserAddr();
    },
    mounted: function () {
    }
  }
</script>
<style scoped>
.main-wrap{
  min-height: 100%;
  background: #fff7ce;
  input{
    border: none;
  }
  form{
    background: #fff;
    .item-wrap{
      height: 86px;
      line-height: 86px;
      border-bottom: 1px solid #b5b5b6;/*no*/
      display: flex;
      font-size: 32px;
      color: #000;
      overflow: hidden;
      span{
        width: 200px;
        box-sizing: border-box;
        padding-left: 16px;
      }
      input{
        flex: 1;
        background: none;
      }
      textarea{
        border: none;
        background: none;
        flex: 1;
        line-height: 1.5;
        padding: 20px 10px 10px 0;
      }
    }
    .text-area-wrap{
      height: 140px;
    }
  }
  .btn-save{
    display: block;
    width: 716px;
    height: 76px;
    line-height: 72px;
    margin:44px auto 0;
    text-align: center;
    border-radius: 6px;
    background: linear-gradient(to bottom, #ff5216, #ff6528, #ff6d2f, #ff7d3f); /* 标准的语法 */
    font-size: 44px;
    color: #fff;
    &:active{
      opacity: 0.9;
    }
  }
  
}
</style>

