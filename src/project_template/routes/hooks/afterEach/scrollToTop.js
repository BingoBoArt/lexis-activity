/**
 * 不同页面间的跳转，把视图拉回顶部
 */
const scrollToTop = (to, from) => {
  if (to.path !== from.path) {
    setTimeout(
      function () {
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
      }, 100)
  }
}

export default scrollToTop
