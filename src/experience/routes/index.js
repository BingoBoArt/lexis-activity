import Vue from 'vue'
import VueRouter from 'vue-router'
import hooks from './hooks/' // 路由钩子

Vue.use(VueRouter)


const router = new VueRouter({
  routes: [
    {
      path: '/Index',
      alias: '/',
      component (resolve) {
        require(['@/views/Index/Index'], resolve)
      }
    },
    {
      path: '/Example',
      component (resolve) {
        require(['@/views/Example/Index'], resolve)
      },
      meta: {
        title: '英语天天见'
      }
    }
  ]
})

hooks(router)

export default router
