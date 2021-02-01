/* 启动文件 */
import Vue from 'vue'
import router from '@/routes/'
import App from '@/views/App'
import Config from '@base/common/config.js'
import '@/assets/js/common/index.js'
require("es6-promise-always")

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

/** 加载通用样式 **/
require('@/assets/css/common/index.less')
require('@/assets/css/common/weui.css')
require('@/assets/css/common/weuiMod.less')

/** 增加vconsole **/
if(Config.global_env != 'pro'){
  var loadSingleScript = function (src, callback) {
      var s = document.createElement('script');
      s.async = false;
      s.src = src;
      s.addEventListener('load', function () {
          callback && callback();
      }, false);
      document.body.appendChild(s);
  };
  loadSingleScript('http://lib.baomitu.com/vConsole/3.2.0/vconsole.min.js', function() {
      window.vconsole = new window.VConsole();
  });
}