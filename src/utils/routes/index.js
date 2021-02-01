import Vue from 'vue'
import VueRouter from 'vue-router'
import hooks from './hooks/' // 路由钩子

Vue.use(VueRouter)

const router = new VueRouter({
  // mode: 'hash|history|abstract',
  // base: '/',
  // linkActiveClass: 'router-link-active',
  // scrollBehavior: fn
  // routes: []

  routes: [
    {
      path: '/home',
      component (resolve) {
        require(['@/views/index'], resolve)
      }
    },
    {
      path: '/TestTool',
      component (resolve) {
        require(['@/views/TestTool/Index'], resolve)
      }
    },
    {
      path: '/Test',
      component (resolve) {
        require(['@/views/Test/Index'], resolve)
      }
    },
    {
      path: '/FlashTest',
      component (resolve) {
        require(['@/views/FlashTest/Index'], resolve)
      }
    },
    {
      path: '*',
      component: {
        beforeCreate () {
         /*
         window.swal({
            type: 'warning',
            title: '404 NOT FOUND',
            timer: 1000,
            showConfirmButton: false
          })
          this.$router.replace('/')
          */
        },
        template: '<div>404 NOT FOUND</div>'
      }
    },
    {
        path: '/GetVip',
        component (resolve) {
            require(['@/views/GetVip/Index'], resolve)
        },
        meta: {
          title: '免费领取VIP'
        }
    },
    {
      path: '/DownLoad',
      alias: '/',
      component (resolve) {
        require(['@/views/DownLoad/Index'], resolve)
      },
      meta: {
        title: '英语天天见'
      }
    },
    {
      path: '/DownLoadtob',
      alias: '/',
      component (resolve) {
        require(['@/views/DownLoadtob/Index'], resolve)
      },
      meta: {
        title: '博识外教伴读'
      }
    },
    {
      path: '/tobteacher',
      alias: '/',
      component (resolve) {
        require(['@/views/DownLoadToc/Index'], resolve)
      },
      meta: {
        title: '博识云课堂'
      }
    },
    {
      path: '/LevelProfile',
      alias: '/',
      component (resolve) {
        require(['@/views/LevelTest/profile'], resolve)
      },
      meta: {
        title: '等级测评'
      }
    },
    {
      path: '/LevelQuestion',
      alias: '/',
      component (resolve) {
        require(['@/views/LevelTest/question'], resolve)
      },
      meta: {
        title: '等级测评'
      }
    },
    {
      path: '/LevelResult',
      alias: '/',
      component (resolve) {
        require(['@/views/LevelTest/result'], resolve)
      },
      meta: {
        title: '等级测评'
      }
    },
    {
      path: '/LevelShare',
      alias: '/',
      component (resolve) {
        require(['@/views/LevelTest/share'], resolve)
      },
      meta: {
        title: '等级测评'
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
