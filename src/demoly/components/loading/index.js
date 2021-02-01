import Vue from 'vue';

const VueComponent = Vue.extend(require('./index.vue'));

const instance = new VueComponent({
    el: document.createElement('div')
})

/*
    用法1
    如果是在组件中调用，则直接改变本组间的值即可
    this.$dialog（{
        type: 'simple',
        theme: 'theme-2',
        close: true,
        msg: '测试',
        showdialog: true
    }
    用法2，trigger，通常是在js文件中使用
    $(document).trigger('dialog', {
        type: 'simple',
        theme: 'theme-2',
        close: true,
        msg: '测试',
        showdialog: true
    })
*/

VueComponent.prototype.show = (options) => {
  instance.options = options;
  document.body.appendChild(instance.$el);
}
VueComponent.prototype.hide = (options) => {
  const el = instance.$el;
  el.parentNode && el.parentNode.removeChild(el);
}
export default {
  show: instance.show,
  hide: instance.hide
};
