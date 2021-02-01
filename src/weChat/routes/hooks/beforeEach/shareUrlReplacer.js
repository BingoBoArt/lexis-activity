/**
 * 替换浏览器标签页标题 && 微信分享设置
 */
import setShare from "@/common/setShare.js";
const shareUrlReplacer = (to, from) => {
  // let titles = []
  // matched.slice().forEach(({ handler: { title } }) => {
  //   title && titles.push(title)
  // })
  // document.title = titles.join(' · ')
  let shareToSaleIndex = [
    "/OrderResult",
    "/PerOrder",
    "/TeamOrder",
    "/TeamInfo",
    "/TeamInvite"
  ]
  if (to.path == "/InviteResult") {
    // 结果页 提醒功能 页面内分享
    /*
    let inviteUrl = window.L.util.getLocalStorage("inviteUrl");
    setTimeout(
      function () {
        setShare({ shareUrl: inviteUrl });
      }, 
    100)
    */
  } else if(shareToSaleIndex.indexOf(to.path) > -1) {
    // 分享到活动首页
    let SaleUrl = `${location.protocol}//${location.hostname}/lexis-activity/weChat/index.html#/Sale`; //分享购买信息页
    setTimeout(
      function () {
        setShare({ shareUrl: SaleUrl });
      }, 
    100)
  }else{
    // aftereach 路径也不变 坑
    setTimeout(
      function () {
        setShare();
      }, 
    100)
  }
};

export default shareUrlReplacer;
