// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import h from 'jquery'
import moment from 'moment/moment'

Vue.config.productionTip = false


Vue.filter('moment', function (value, formatString) {
  formatString = formatString ||' MM-DD HH:mm';
  // return moment(value).format(formatString); // value可以是普通日期 20170723
  return moment.unix(value).format(formatString); // 这是时间戳转时间
});


import axios from 'axios'
Vue.prototype.$http=axios;

Vue.prototype.$=h;

import 'animate.css'
import Filter from './filter'
for(var i in Filter){
  Vue.filter(i,Filter[i])
}
import commonComponent from './components/common'
for(var i in commonComponent){
Vue.component(i,commonComponent[i])
}

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
