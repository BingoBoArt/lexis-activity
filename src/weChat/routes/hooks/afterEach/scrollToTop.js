import ComUtil from '@/assets/js/modules/util/index'
/**
 * 不同页面间的跳转，把视图拉回顶部
 */
const scrollToTop = (to, from) => {
  if (ComUtil.trimQs(to.path) !== ComUtil.trimQs(from.path)) {
    setTimeout(
      function () {
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
      }, 100)
  }
}

export default scrollToTop
