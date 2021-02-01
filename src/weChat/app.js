/* 启动文件 */
/** 加载通用样式 **/
require('@/assets/css/common/index.less')
require('@/assets/css/common/weuiMod.less')
import Vue from 'vue'
import router from '@/routes/'
import App from '@/views/App'
import Filter from '@/filters/index'
import VueWechatTitle from 'vue-wechat-title'
import '@/assets/js/common/index.js'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
Vue.use(VueWechatTitle)
// if (_isDev_) {
//   console.info('[当前环境] 开发环境')
//   Vue.config.devtools = true
//   Vue.config.productionTip = false
// }
// if (_isTest_) {
//   console.info('[当前环境] 测试环境')
//   Vue.config.devtools = false
// }
// if (_isPro_) {
//   console.info('[当前环境] 生产环境')
//   Vue.config.devtools = false
// }
