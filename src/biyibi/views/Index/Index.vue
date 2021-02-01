<template>
    <div class="main-wrap" v-loading="true" lemon-loading-text="加载中">
    </div>
</template>
<style scoped type="less">
</style>
<script>
  import Share from '@base/components/share/index.js'
  import UserInfo from '@base/components/userInfo/index.js'
  import LemonUtils from 'lemon-utils';
  export default {
    name: 'example',
    components: {},
    data: () => {
      return {
      }
    },
    methods: {
    },
    created: function () {
    },
    mounted: function () {
      let loading = this.$loading({
        icon: 1,
        text: '加载中'
      });
      Share.init();
      setTimeout(() => {
        // loading.hide();
      })
      /*
      UserInfo.getUserInfo(this).then((res) => {
        console.log("userInfo", res)
      }).catch(err => {
        console.log(err)
      })
      */
    }
  }
</script>
<style>
.main-wrap{
  height: 500px;
}
</style>

