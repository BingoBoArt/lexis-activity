/**
 * Created by zhangsanfang on 17/07/24.
 */
var is_app = window.L.ua.APP || false;
var init = function(){
    if(is_app){
        //给app的头设置title
        window.onload = function(){
            if(isHighVersion(1, 4, 0)){
                let title = document.title || "乐视金融";
                window.native.webBroswerToApp('{"actionType":"setNavigationBarTitle","params":{"title":"' + title + '"}}');
                //清空app右侧菜单
                window.native.webBroswerToApp('{"actionType":"setNavigationBarMenu","params":{"items":[{"icon":"","label":"","badgeShow":"0","badgeNumber":"0","display":"","handle":""}]}}');
            }
        }
    }
}
var isHighVersion = function(first, second, third){
    try{
        var userAgent = navigator.userAgent.toLowerCase();//获取ua
        var index = userAgent.indexOf("lefinancetrade");
        var version = userAgent.substr(index).split("/")[1].split('"')[0].split('.');
        var is_higher_version = Number(version[0]) >= first && Number(version[1]) >= second && Number(version[2]) >= third;//app是不是高版本(大于等于1.4.0)
        return is_higher_version;
    }catch(e){
        return false
    }
}
export default init()
