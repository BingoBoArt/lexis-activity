<style>
body{
    width:100%;
    margin:0 auto;
}
#object{
  margin: 0 auto;
  display: block;
  width: 100%;
  height: 100%;
}
.wrapper{

}
</style>

<template>
    <div class="wrapper test-wrapper">
      <object id="object" :width="width" :height="height"
        classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"
        codebase="http://fpdownload.macromedia.com/
        pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0">
          <param name="SRC" value="http://file.lexislive.com.cn/file/111.swf">
          <embed id="embed" src="http://file.lexislive.com.cn/file/111.swf" :width="width" :height="height"></embed>
      </object>
    </div>
</template>

<script>
export default {
    name: 'TestTool',
    components: {
    },
    data: () => {
      return {
        width: 1200,
        height: 800
      }
    },
    methods: {
    },
    created: function() {
      let that = this;
      $(window).resize(function(){
        var w_w = $(window).width();
        var w_h = $(window).height();
        that.width = w_w;
        that.height = w_h;
      }).resize()
    },
    mounted: function() {
      this.$loading.hide();
    }
}
</script>

