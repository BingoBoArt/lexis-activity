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
            link: shareUrl,
            title: "英语天天见｜外教直播天天见",
            desc: "英语天天见｜外教直播天天见",
            imgUrl: 'http://file.lexislive.com.cn/resource/201812/d0841477-6e6d-471c-86ec-02df8caac07b.jpg'
          })
        }catch(e){

        }
      }
    , 100)
}
export default share
