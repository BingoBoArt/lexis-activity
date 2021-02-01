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
      alias: '/',
      component (resolve) {
        require(['@/views/index'], resolve)
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
    }
  ]
})

hooks(router)

export default router
