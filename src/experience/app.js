/* 启动文件 */
import Vue from 'vue'
import router from '@/routes/'
import App from '@/views/App'
import Config from '@base/common/config.js'
import BadJS from '@base/components/badjs/index.js'
// import FastClick from 'fastclick'
import LemonMUI from 'lemon-mui'
import LemonUtils from 'lemon-utils';

/** 注册前端异常监控BadJS **/
Vue.use(BadJS, {id: 6})
/** 注册lemon-mui组件库**/
Vue.use(LemonMUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

/** 加载通用样式 **/
require('@base/assets/css/common/index.less')

/** 加载样式 **/
require('@/assets/css/common/index.less')

/** 加载filter **/
require('@base/filters/index')
/** 加载mixins **/
require('@base/mixins/index')
/** 使用promise always **/
require("es6-promise-always")
/** fastclick **/
// FastClick.attach(document.body)

/** 增加vconsole **/
if(Config.global_env != 'pro' || LemonUtils.getUrlParam("debug") == 1){
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