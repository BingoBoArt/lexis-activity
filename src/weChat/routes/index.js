import Vue from "vue";
import VueRouter from "vue-router";
import hooks from "./hooks/"; // 路由钩子
Vue.use(VueRouter);
const router = new VueRouter({
  routes: [
    {
      path: "/home",
      name: "",
      meta: {
        title: ""
      },
      alias: "/",
      component(resolve) {
        require(["@/views/index"], resolve);
      }
    },
    {
      path: "/Demo",
      meta: {
        title: ""
      },
      alias: "/",
      component(resolve) {
        require(["@/views/Main/Demo"], resolve);
      }
    },
    {
      path: "/Index",
      meta: {
        title: ""
      },
      alias: "/",
      component(resolve) {
        require(["@/views/Main/Index"], resolve);
      }
    },
    {
      path: "/AppStore",
      meta: {
        title: "下载-兰思英语"
      },
      alias: "/",
      component(resolve) {
        require(["@/views/Main/AppStore"], resolve);
      }
    },
    {
      path: "/Login",
      name: "登录－兰思英语",
      meta: {
        title: "登录－兰思英语"
      },
      alias: "/",
      component(resolve) {
        require(["@/views/LoginRegister/Login"], resolve);
      }
    },
    {
      path: "/Register",
      name: "注册-兰思英语",
      alias: "/",
      meta: {
        title: "注册-兰思英语",
        keepAlive: true
      },
      component(resolve) {
        require(["@/views/LoginRegister/Register"], resolve);
      }
    },
    {
      path: "/Information",
      name: "招生信息-兰思英语",
      alias: "/",
      meta: {
        title: "招生信息-兰思英语"
      },
      component(resolve) {
        require(["@/views/Main/Information"], resolve);
      }
    },
    {
      path: "/CourseSys",
      name: "课程体系-兰思英语",
      alias: "/",
      meta: {
        title: "课程体系-兰思英语"
      },
      component(resolve) {
        require(["@/views/Main/CourseSys"], resolve);
      }
    },
    {
      path: "/Register2",
      name: "注册-兰思英语",
      alias: "/",
      meta: {
        title: "注册-兰思英语",
        keepAlive: true
      },
      component(resolve) {
        require(["@/views/LoginRegister/Register2"], resolve);
      }
    },
    {
      path: "/SalePost",
      name: "购课优惠-兰思英语",
      alias: "/",
      meta: {
        title: "购课优惠-兰思英语"
      },
      component(resolve) {
        require(["@/views/Main/Sale/SalePost"], resolve);
      }
    },
    {
      path: "/Sale",
      name: "购课优惠-兰思英语",
      alias: "/",
      meta: {
        title: "购课优惠-兰思英语"
      },
      component(resolve) {
        require(["@/views/Main/Sale/Sale"], resolve);
      }
    },
    {
      path: "/TermSale",
      name: "购课优惠-兰思英语",
      alias: "/",
      meta: {
        title: "购课优惠-兰思英语"
      },
      component(resolve) {
        require(["@/views/Main/TermSale/TermSale"], resolve);
      }
    },
    {
      path: "/TestTermSale",
      name: "购课优惠-兰思英语",
      alias: "/",
      meta: {
        title: "购课优惠-兰思英语"
      },
      component(resolve) {
        require(["@/views/Main/TestTermSale/TestTermSale"], resolve);
      }
    },
    {
      path: "/PerOrder",
      name: "购买详情-兰思英语",
      alias: "/",
      meta: {
        title: "购买详情-兰思英语"
      },
      component(resolve) {
        require(["@/views/Main/Sale/PerOrder"], resolve);
      }
    },
    {
      path: "/OneTerm",
      name: "购买详情-兰思英语",
      alias: "/",
      meta: {
        title: "购买详情-兰思英语"
      },
      component(resolve) {
        require(["@/views/Main/TermSale/OneTerm"], resolve);
      }
    },
    {
      path: "/TwoTerms",
      name: "购买详情-兰思英语",
      alias: "/",
      meta: {
        title: "购买详情-兰思英语"
      },
      component(resolve) {
        require(["@/views/Main/TermSale/TwoTerms"], resolve);
      }
    },
    {
      path: "/TestOneTerm",
      name: "购买详情-兰思英语",
      alias: "/",
      meta: {
        title: "购买详情-兰思英语"
      },
      component(resolve) {
        require(["@/views/Main/TestTermSale/TestOneTerm"], resolve);
      }
    },
    {
      path: "/TestTwoTerms",
      name: "购买详情-兰思英语",
      alias: "/",
      meta: {
        title: "购买详情-兰思英语"
      },
      component(resolve) {
        require(["@/views/Main/TestTermSale/TestTwoTerms"], resolve);
      }
    },
    {
      path: "/TeamOrder",
      name: "团购订单-兰思英语",
      alias: "/",
      meta: {
        title: "团购订单-兰思英语"
      },
      component(resolve) {
        require(["@/views/Main/Sale/TeamOrder"], resolve);
      }
    },
    {
      path: "/TeamInvite",
      name: "双人团购-兰思英语",
      alias: "/",
      meta: {
        title: "双人团购-兰思英语"
      },
      component(resolve) {
        require(["@/views/Main/Sale/TeamInvite"], resolve);
      }
    },
    {
      path: "/TeamInfo",
      name: "双人团购-兰思英语",
      alias: "/",
      meta: {
        title: "双人团购-兰思英语"
      },
      component(resolve) {
        require(["@/views/Main/Sale/TeamInfo"], resolve);
      }
    },
    {
      path: "/InviteResult",
      name: "邀请成员-兰思英语",
      alias: "/",
      meta: {
        title: "邀请成员-兰思英语"
      },
      component(resolve) {
        require(["@/views/Main/Sale/InviteResult"], resolve);
      }
    },
    {
      path: "/SharePage",
      name: "双人团购-兰思英语",
      alias: "/",
      meta: {
        title: "双人团购-兰思英语"
      },
      component(resolve) {
        require(["@/views/Main/Sale/SharePage"], resolve);
      }
    },
    {
      path: "/OrderResult",
      name: "订单结果-兰思英语",
      alias: "/",
      meta: {
        title: "订单结果-兰思英语"
      },
      component(resolve) {
        require(["@/views/Main/Sale/OrderResult"], resolve);
      }
    },
    {
      path: "/TestClass",
      name: "领取试听课-兰思英语",
      alias: "/",
      meta: {
        title: "领取试听课-兰思英语"
      },
      component(resolve) {
        require(["@/views/Main/TestClass"], resolve);
      }
    },
    {
      path: "/PersonalCenter",
      name: "兰思学员-兰思英语",
      alias: "/",
      meta: {
        title: "兰思学员-兰思英语"
      },
      component(resolve) {
        require(["@/views/Main/PersonalCenter/PersonalCenter"], resolve);
      },
      children: [
        {
          path: "/PersonalCenter/MyClass",
          component(resolve) {
            require(["@/views/Main/PersonalCenter/MyClass"], resolve);
          }
        },
        {
          path: "/PersonalCenter/MyOrder",
          component(resolve) {
            require(["@/views/Main/PersonalCenter/MyOrder"], resolve);
          }
        }
      ]
    },
    {
      path: "/MyClass",
      name: "兰思学员-兰思英语",
      alias: "/",
      meta: {
        title: "兰思学员-兰思英语"
      },
      component(resolve) {
        require(["@/views/Main/PersonalCenter/MyClass"], resolve);
      }
    },
    {
      path: "/MyOrder",
      name: "兰思学员-兰思英语",
      alias: "/",
      meta: {
        title: "兰思学员-兰思英语"
      },
      component(resolve) {
        require(["@/views/Main/PersonalCenter/MyOrder"], resolve);
      }
    },
    {
      path: "/Protocol",
      name: "注册协议-兰思英语",
      alias: "/",
      meta: {
        title: "注册协议-兰思英语"
      },
      component(resolve) {
        require(["@/views/Main/Protocol"], resolve);
      }
    },
    {
      path: "/TermProtocol",
      name: "购买协议-兰思英语",
      alias: "/",
      meta: {
        title: "购买协议-兰思英语"
      },
      component(resolve) {
        require(["@/views/Main/TermProtocol"], resolve);
      }
    },
    {
      path: "/Test",
      name: "注册协议-兰思英语",
      alias: "/",
      meta: {
        title: "注册协议-兰思英语"
      },
      component(resolve) {
        require(["@/views/Main/Test"], resolve);
      }
    },
    {
      path: "*",
      component: {
        beforeCreate() {
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
        template: "<div>404 NOT FOUND</div>"
      }
    }
  ]
});

hooks(router);

export default router;
