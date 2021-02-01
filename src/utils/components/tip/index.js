import Vue from 'vue';

const VueComponent = Vue.extend(require('./index.vue'));

const instance = new VueComponent({
    el: document.createElement('div')
})

/*
    接收在js中trigger的tipsuccess和tiperror事件
    如果是在组件中调用，则直接改变本组间的值即可，例如：
    $(document).trigger('tiperror', {
        msg: 'ceshi',
        callback: function(){
            $(document).trigger('tipsuccess', 'ceshi1');
        }
    });
*/

$(document).on('tipsuccess', function(e, options){
    if(typeof options == 'string'){
        showtip(true, options);
    }else if(typeof options == 'object'){
        showtip(true, options.msg, options.callback);
    }
});

$(document).on('tiperror', function(e, options){
    if(typeof options == 'string'){
        showtip(false, options);
    }else if(typeof options == 'object'){
        showtip(false, options.msg, options.callback);
    }
});

/*
    将$dialog绑定在vue上面，此绑定是在APP.vue里面
    在组件中调用tip，例如：
    this.$dialog.error('ceshi',function(){
        this.$dialog.error('ceshi1');
    });
*/

const success = (msg, callback) => {
    showtip(true, msg, callback);
};

const error = (msg, callback) => {
    showtip(false, msg, callback);
};

const showtip = (success, msg, callback) => {
    instance.options.success = success;
    instance.options.show = true;
    instance.options.msg = msg;
    document.body.appendChild(instance.$el);

    setTimeout(function(){
        instance.options.show = false;
        callback && callback();
    }, 3000);
}
export default {
  success,
  error
};
