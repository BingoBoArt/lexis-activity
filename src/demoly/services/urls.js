/**
 * Created by jockey on 16/1/20.
 */
var doMain = "";
var root = doMain + '/mcashier';
var isProduction = false;

//根据环境配置域名 实名绑卡部分根据global_env判断，收银台sdk因为需要供外部对接，所以通过debug字段发送
var cashierRoot = location.protocol + (isProduction ? '//pay.le.com' : '//f.le.com');

export default {
  root: root,
  serverUrl: doMain,
  jadeTpl: root + "/page/fragpage/",
  paydomain: 'https://' + window.location.host + "/",
  ssoletv: 'https://sso.le.com',   //集团登录环境
  login: "/api/user/login",

  activity: {
    //获取活动时间
    activityTime: doMain + '/promotion/coupon/getActivityConfig'
  },
  /**
   * 订单
   * @type {Object}
   */
  order: {
    //业务下单
    'orderBuy': '/api/order/orderBuy',
    //获取支付参数
    'getPayParams': '/api/order/getPayParams',
    //获取支付过程中需要的基础参数集 基地址 合作商户Iid等
    'payBasicParams': doMain + '/api/app/payBasicParams'
  },
  /**
   * 收银台接口
   * @type {Object}
   */
  cashier: {
    //握手
    'shakehands': {
      'url': "/appserver-api/gateway/member.do",
      'params': {
        'service': 'shake_hands',
        'version': '1.0',
        '_input_charset': 'utf-8'
      }
    },
    //发送短信验证码
    'sendmsg': {
      'url': "/appserver-api/gateway/member.do",
      'params': {
        'service': 'send_msg',
        'version': '1.0',
        '_input_charset': 'utf-8'
      }
    },
    //验证短信验证码
    'verifymsg': {
      'url': "/appserver-api/gateway/member.do",
      'params': {
        'service': 'verify_msg',
        'version': '1.0',
        '_input_charset': 'utf-8'
      }
    },
    //获取银行卡列表
    'banklist': {
      'url': "/appserver-api/gateway/member.do",
      'params': {
        'service': 'query_bank_card_bztype',
        'version': '2.0',
        '_input_charset': 'utf-8'
      }
    },
    //查码表
    'querycodetable': {
      'url': "/appserver-api/gateway/member.do",
      'params': {
        'service': 'query_code_table',
        'version': '1.0',
        '_input_charset': 'utf-8'
      }
    },
    //重发支付短信
    'sendmsgAgain': {
      'url': "/appserver-api/gateway/acquirer.do",
      'params': {
        'service': 'send_pay_msg_again',
        'version': '1.0',
        '_input_charset': 'utf-8'
      }
    },
    //下单
    'createtrade': {
      'url': "/appserver-api/gateway/acquirer.do",
      'params': {
        'service': 'create_instant_trade',
        'version': '1.0',
        '_input_charset': 'utf-8'
      }
    },
    //支付前置
    'paymentpre': {
      'url': "/appserver-api/gateway/acquirer.do",
      'params': {
        'service': 'payment_pre',
        'version': '1.0',
        '_input_charset': 'utf-8'
      }
    },
    //支付申请
    'paymentapply': {
      'url': "/appserver-api/gateway/acquirer.do",
      'params': {
        'service': 'payment_apply',
        'version': '1.0',
        '_input_charset': 'utf-8'
      }
    },
    //支付推进
    'paymentadvance': {
      'url': "/appserver-api/gateway/acquirer.do",
      'params': {
        'service': 'payment_advance',
        'version': '1.0',
        '_input_charset': 'utf-8'
      }
    },
    //卡bin
    'query_cardbin': {
      'url': cashierRoot + "/appserver-api/gateway/member.do",
      'params': {
        'service': 'query_cardbin',
        'version': '1.0',
        '_input_charset': 'utf-8',
        'access_channel': 'WAP'
      }
    },
    //获取用户名以及身份证号
    'query_certification_mask': {
      'url': cashierRoot + "/appserver-api/gateway/member.do",
      'params': {
        'service': 'query_certification_mask',
        'version': '1.0',
        '_input_charset': 'utf-8',
        'access_channel': 'WAP'
      }
    },
    //根据业务类型查询所支持的银行卡
    'query_bank_by_bztype': {
      'url': cashierRoot + "/appserver-api/gateway/member.do",
      'params': {
        'service': 'query_bank_by_bztype',
        'version': '1.0',
        '_input_charset': 'utf-8',
        'access_channel': 'WAP'
      }
    }
  },
  /**
   * 用户
   */
  userCenter: {
    //获取用户信息
    myInfo: doMain + "/api/pc/myInfo",
    // 更改/设置/重置交易密码
    setupTradePassword: doMain + "/api/pay/setupTradePassword",
    // 风险测评
    saveRiskRate: doMain + "/api/user/saveRiskRate",
    //风险测评问题答案
    riskRate: doMain + "/api/app/riskRate/v1/1",
    //风险测评结果
    getRiskRate: doMain + "/api/user/getRiskRate",
    // 发送短信验证码
    sendMessageCode: doMain + "/api/user/sendMessageCode",
    //设置交易密码
    paySendMessageCode: doMain + "/api/pay/sendMessageCode",
    //实名绑卡
    certAndBind: doMain + '/api/user/certAndBind',
    //发送验证码
    bindCardSendMessage: doMain + "/api/pc/bindCardSendMessage",
    //卡Bin验证
    cardBinCheck: doMain + "/api/pay/cardBinCheck",
    //已绑定银行卡列表
    getCardInfo: doMain + "/api/user/myCards",
    //已绑定银行卡列表（含钱罐,支付选卡）
    getCardList: doMain + "/api/user/myCardsAndThirdPays",
    //我的银行卡列表（仅支持钱罐显示）
    myCardsAndThirdCards: doMain + "/api/user/myCardsAndThirdCards",
    //忘记密码第一步身份验证
    setupTradePasswordCertification: doMain + '/api/user/setupTradePasswordCertification',
    //验证交易密码
    verifyTradePassword: doMain + '/api/pay/verifyTradePassword',
    //兑换优惠券

    //银行卡限额
    bankCardLimits: doMain + "/api/pay/bankCardLimits"
  },
  /**
   * 分享
   */
  //获取新浪微博授权地址
  share: {
    // 微信接口
    weixin: doMain + '/api/activity/bibi/wxShare',
    // 微博接口
    weiboAuthUrl: doMain + '/api/activity/jueji/weiboAuthUrl'
  },
  /**
   * 银行卡选择 新
   */
  bankselect: {
    //  获取当前登录用户账号下默认银行卡或钱罐 /apiadapter/buy/firstPayInfo/v1/{appKey}/{token}/{busiType}/{type}/{displayCode}
    firstPayInfo: doMain + '/apiadapter/buy/firstPayInfo',
    //获取当前登录用户账号下银行卡或钱罐列表   /apiadapter/buy/payInfolist/v1/{appKey}/{token}/{special}/{busiType}/{type}/{displayCode}
    payInfolist: doMain + '/apiadapter/buy/payInfolist'
  }
}
