import Share from '@base/components/share/index.js'
/**
 * 处理分享
 */
const share = (to, from) => {
    // 错误路由处理，页面跳转后，不会再次执行share
    setTimeout(
      function() {
        try{
          const shareUrl = `${window.location.protocol}//${window.location.hostname}${window.location.pathname}`;
          Share.init({
            title: "我正在英语天天见学英语！",
            desc: "北美外教天天直播！快来跟我一起学吧！",
            imgUrl: 'http://file.lexislive.com.cn/resource/201901/76440a00-5c94-41d0-b4ed-ed311009593a.png',
            link: shareUrl
          })
        }catch(e){

        }
      }
    , 100)
}
export default share
