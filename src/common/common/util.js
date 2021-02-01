
function getPayUrl(params){
  let params_uir = '';
  for(var key in params){
    params_uir += `${key}=${params[key]}&`;
  }
  params_uir = params_uir.slice(0, params_uir.length - 1);
  let url = `http://www.tiantianjian.com/lexis-activity/payCenter/index.html?${params_uir}#/index`;
  return url;
}
export default {
  getPayUrl: getPayUrl
}
