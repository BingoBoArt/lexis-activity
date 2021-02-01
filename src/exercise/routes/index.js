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
      path: '/BuyProtocol',
      component (resolve) {
        require(['@base/views/Util/BuyProtocol'], resolve)
      }
    },
    {
      path: '/index',
      name: 'Index',
      alias: '/',
      meta: {
        title: '英语天天见'
      },
      component (resolve) {
        require(['@/views/Index/index'], resolve)
      }
    },
    {
      path: '/Temp',
      meta: {
        title: '英语天天见'
      },
      component (resolve) {
        require(['@/views/Index/temp'], resolve)
      }
    },
    {
      path: '/address',
      meta: {
        title: '收货地址'
      },
      component (resolve) {
        require(['@/views/Address/index'], resolve)
      }
    },
    {
      path: '/orderConfirm',
      meta: {
        title: '结算中心'
      },
      component (resolve) {
        require(['@/views/OrderConfirm/index'], resolve)
      }
    },
    {
      path: '/orderList',
      meta: {
        title: '订单完成'
      },
      component (resolve) {
        require(['@/views/OrderList/index'], resolve)
      }
    },
    {
      path: '/share',
      meta: {
        title: '分享海报'
      },
      component (resolve) {
        require(['@/views/Share/index'], resolve)
      }
    },
    {
      path: '/Example',
      alias: '/testExample',
      meta: {
        title: '英语天天见'
      },
      component (resolve) {
        require(['@/views/Example/index'], resolve)
      }
    }
  ]
})

hooks(router)

export default router
