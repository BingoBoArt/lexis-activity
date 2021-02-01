/**
 * 打印路由日志到控制台
 */
const stat = (to, from) => {
    /* eslint-disable no-undef */
    let stat = () => {
      if(typeof MtaH5 != 'undefined'){
        MtaH5.pgv();
        return true;
      }else{
        return false;
      }
    }
    setTimeout(stat, 100);
}

export default stat
