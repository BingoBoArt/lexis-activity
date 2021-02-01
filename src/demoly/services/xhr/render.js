/**
 * Created by aweakcoder on 16/10/09.
 */
define(function () {
    var url = require("./urls");
    var Request = require("./request");
    var tplMap = {};
    var no_data_tpl = '<div class="no-data-wrapper list-no-data-wrapper"><img src="/mleplatform/images/no-data/icon_list_none.png" class="no-data-pic"> <p class="no-data-text">没有相关记录</p> </div>'

    return function (opt) {
        
        // 加载模板
        function loadTpl(){
            var fun = tplMap[opt.tplPath];
            var dtd = $.Deferred();
            if (!fun) {
                window.$.getScript({url: url.jadeTpl + opt.tplPath}, function (funStr) {
                    fun = eval("(" + funStr + ")");
                    tplMap[opt.tplPath] = fun;
                    dtd.resolve(fun)
                });
            }else{
                dtd.resolve(fun);
            }
            return dtd.promise();
        }
        // 加载数据
        function loadData(){
            return Request(opt);
        }

        // return promise
        //处理无数据情况
        /*
        var no_set = typeof opt.handleNoData == "undefined";
        if((no_set || (!no_set&&opt.handleNoData==true)) && opt.wrapper){
            //默认处理无数据
            return (function(){
                var dtd_inner = $.Deferred();
                $.when(loadData(), loadTpl()).then(function(res, render){
                    if(res&&res.code==200&&res.data&&res.data.dataList&&res.data.dataList.length==0){
                        //没有数据
                        $(opt.wrapper).append(no_data_tpl);
                    }
                    dtd_inner.resolve(res, render);
                }).fail(function(){
                    dtd_inner.reject();
                })
                return dtd_inner;
            }())
        }else{
            return $.when(loadData(), loadTpl())
        }
        */
        return $.when(loadData(), loadTpl())
    };
});


