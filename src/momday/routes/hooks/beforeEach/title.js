import AppHandle from '@base/common/appHandle.js';
const title = (to, from, next) => {
   /* 路由发生变化修改页面title */
  // if (to.meta.title) {
  //   document.title = to.meta.title;
  //   try {
  //     AppHandle.sendTitle({title: to.meta.title})
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  next();
}

export default title
