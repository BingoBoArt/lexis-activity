<template>
  <div class='addr-wrap' @click = 'toAddress'>
    <img src='~@/assets/img/icon-address.png' />
    <div class='desc-wrap'>
      <p class='user-info'>
        <span class='username'>{{userinfo.name}}</span><span>{{userinfo.tel}}</span>
      </p>
      <p :class='["user-addr", userinfo.isdescHide]'>
        {{userinfo.addr}}
      </p>
    </div>
    <span class='arrow' v-if='userinfo.isdescHide'>&gt;</span>
  </div>
</template>
<script>
  export default {
    name: 'bottom-component',
    data() {
        return {
        }
    },
    props: {
      userinfo: {
        type: Object
      }
    },
    watch: {
    },
    methods: {
      toAddress(){
        let _this = this;
        if(_this.userinfo.url){
          _this.$router.push({path: _this.userinfo.url});
        }
      }
    },
    mounted () {
    }
  }
</script>
<style lang="less" scoped>
 .addr-wrap{
    min-height: 180px;
    background: #fff;
    display: flex;
    box-sizing: border-box;
    padding: 20px 14px 20px 16px;
    margin-bottom: 18px;
    img{
      width: 35px;
      height: 44px;
    }
    span.arrow{
      font-size: 48px;
      color: #b5b5b6;
      align-self: center;
    }
    .desc-wrap{
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 4px 20px 10px;
      p.user-info{
        font-size: 32px;
        color: #000;
        .username{
          margin-right: 40px;
        }
      }
      p.user-addr{
        font-size: 30px;
        color: #b5b5b6;
        /* align-self: flex-end; */
        /* max-height: 130px; */
        max-width: 600px;
        margin-top: 10px;
        &.desc-hide{
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
</style>