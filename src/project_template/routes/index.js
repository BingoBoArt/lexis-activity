import Vue from 'vue'
import VueRouter from 'vue-router'
import hooks from './hooks/' // 路由钩子

Vue.use(VueRouter)


const router = new VueRouter({
  routes: [
    {
      path: '/Login',
      meta: {
        title: '登录',
        keepAlive: true
      },
      component (resolve) {
        require(['@base/views/Login/Index'], resolve)
      }
    },
    {
      path: '/Protocol',
      meta: {
        title: '用户协议'
      },
      component (resolve) {
        require(['@base/views/Util/Protocol'], resolve)
      }
    },
    {
      path: '/home',
      component (resolve) {
        require(['@/views/index'], resolve)
      }
    },
    {
      path: '/Example',
      alias: '/',
      component (resolve) {
        require(['@/views/Example/Index'], resolve)
      },
      meta: {
        title: '英语天天见'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

hooks(router)

export default router
