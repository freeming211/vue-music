// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
// 样式初始化
import 'common/stylus/index.styl'
import FastClick from 'fastclick'
// 引入这个懒加载插件
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  loading: require('common/image/default.png')
})

FastClick.attach(document.body)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  render: h => h(App)
  // components: { App }
})
