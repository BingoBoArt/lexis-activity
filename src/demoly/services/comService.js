import Request from './xhr/request.js'
import Urls from './urls.js'
/**
 * 用户认证所用到的 API
 */
class ComService {
  getUserInfo () {
    return Request({
      'url': Urls.userCenter.myInfo,
      //'localData': '',
      'data': ''
    })
  }
  /**
   * 获取合作商户Id(partnerId)
   */
  payBasicParams (params) {
    return Request({
      url: Urls.order.payBasicParams,
      urlPath: ['h5', 'h5'],
      type: 'get',
      data: params
    });
  }

  queryCardbin (params) {
    var _params = $.extend(Urls.cashier.query_cardbin.params, params);
    return Request({
      url: Urls.cashier.query_cardbin.url,
      type: 'post',
      data: _params
    });
  }

}

// 实例化后导出，全局单例
export default new ComService()
