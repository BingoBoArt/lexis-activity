/** 前端错误监控 begin**/
import BJ_REPORT from "./lib.js";
import Config from "@base/common/config.js";

export default{
  install(Vue, options) {
    if(Config.global_env == 'dev') {
      return;
    }
    BJ_REPORT.init({
      id: options.id || 6,                             // 上报 id, 不指定 id 将不上报
      combo: 1,                             // combo 是否合并上报， 0 关闭， 1 启动（默认）
      delay: 1000,                          // 当 combo 为 true 可用，延迟多少毫秒，合并缓冲区中的上报（默认）
      url: "http://badjs.lexislive.com.cn/badjs",   // 指定上报地址 线上为 http://badjs.lexislive.com.cn:8081/
      ignore: [/Script error/i],            // 忽略某个错误
      random: 1,                            // 抽样上报，1~0 之间数值，1为100%上报（默认 1）
      repeat: 5,                            // 重复上报次数(对于同一个错误超过多少次不上报)
                                            // 避免出现单个用户同一错误上报过多的情况
      onReport: function(id, errObj){},     // 当上报的时候回调。 id: 上报的 id, errObj: 错误的对象
      ext: {}                               // 扩展属性，后端做扩展处理属性。例如：存在 msid 就会分发到 monitor
    });
    window.BJ_REPORT = BJ_REPORT;
    
    /** promise错误 **/
    window.addEventListener('unhandledrejection', function (event) {
      console.log('log---unhandledrejection::::');
      BJ_REPORT.report(event.reason);
    })

    if(Vue){
      Vue.config.errorHandler = function (err, vm, info) {
        console.log('log---errorHandler::::');
        let {
            message, // 异常信息
            name, // 异常名称
            script,  // 异常脚本url
            line,  // 异常行号
            column,  // 异常列号
            stack  // 异常堆栈信息
        } = err;
        BJ_REPORT.report(err);
        // vm为抛出异常的 Vue 实例
        // info为 Vue 特定的错误信息，比如错误所在的生命周期钩子
      }
    }
  }
}