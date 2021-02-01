<template>
  <lemon-button @click="download">
    <slot></slot>
  </lemon-button>
</template>

<script type="text/babel">
  import LemonUtils from 'lemon-utils';
  export default {
    name: 'download-component',
    data() {
        return {
          iosHref: 'https://itunes.apple.com/cn/app/id1412632545?mt=8',
          androidHref: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.lexislive.shanke'
        }
    },
    props: {
    },
    watch: {
    },
    methods: {
      download() {
        let download_href = this.androidHref;
        if (LemonUtils.UA.ios) {
            download_href = this.iosHref;
        }
        window.location.href = download_href;
      }
    },
    mounted () {
    }
  }
</script>
<style lang="less" scoped>
</style>