/**
 * 替换浏览器标签页标题 && 微信分享设置
 */
import setShare from "@/common/setShare.js";
const docTitleReplacer = (to, from) => {
  // let titles = []
  // matched.slice().forEach(({ handler: { title } }) => {
  //   title && titles.push(title)
  // })
  // document.title = titles.join(' · ')
  if (to.path == "/InviteResult") {
    let shareUrl = window.L.util.getLocalStorage("inviteUrl");
    setShare({ shareUrl: shareUrl });
  }else {
    setShare();
  }
};

export default docTitleReplacer;
