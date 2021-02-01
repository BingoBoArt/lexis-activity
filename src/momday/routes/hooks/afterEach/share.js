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
            link: shareUrl
          })
        }catch(e){

        }
      }
    , 100)
}
export default share
