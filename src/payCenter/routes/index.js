import Vue from 'vue'
import VueRouter from 'vue-router'
import hooks from './hooks/' // 路由钩子

Vue.use(VueRouter)


const router = new VueRouter({
  routes: [
    {
      path: '/index',
      alias: "/",
      meta: {
        title: '支付中心'
      },
      component (resolve) {
        require(['@/views/Index/index'], resolve)
      }
    },
    {
      path: '/result',
      meta: {
        title: '支付结果'
      },
      component (resolve) {
        require(['@/views/Index/result'], resolve)
      }
    }
  ]
})

hooks(router)

export default router
