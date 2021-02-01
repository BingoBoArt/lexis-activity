/**
 * Created by jockey on 15/9/21.
 */
import url from '../urls';
var tplMap = {};
function getTpl(tplPath, callBack) {
    var dtd = $.Deferred();
    var fun = tplMap[tplPath];
    if (!fun) {
        console.log(tplPath);
        window.$.getScript({url: url.jadeTpl + tplPath}, function (funStr) {
            fun = eval("0, (" + funStr + ")");
            tplMap[tplPath] = fun;
            dtd.resolve(fun);
        });
    } else {
        dtd.resolve(fun);
    }
    return dtd;
};
export default getTpl