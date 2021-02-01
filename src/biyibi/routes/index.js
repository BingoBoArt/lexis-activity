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
      path: '/Profile',
      alias: '/',
      component (resolve) {
        require(['@/views/Index/profile'], resolve)
      },
      meta: {
        title: '本期挑战'
      }
    },
    {
      path: '/History',
      component (resolve) {
        require(['@/views/Index/history'], resolve)
      },
      meta: {
        title: '往期成绩'
      }
    },
    {
      path: '/Question',
      component (resolve) {
        require(['@/views/Index/question'], resolve)
      },
      meta: {
        title: ''
      }
    },
    {
      path: '/AnswerDec',
      component (resolve) {
        require(['@/views/Index/answer_dec'], resolve)
      },
      meta: {
        title: '我的答卷'
      }
    },
    {
      path: '/Result',
      component (resolve) {
        require(['@/views/Index/result'], resolve)
      },
      meta: {
        title: '答题结果'
      }
    },
    {
      path: '/Share',
      component (resolve) {
        require(['@/views/Index/share'], resolve)
      },
      meta: {
        title: '分享成绩'
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
