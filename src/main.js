// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//引入aixos并注册到vue的$http原型中
import axios from 'axios';
Vue.prototype.$axios = axios;

import store from './store'

import './common/sass/index.scss';

import {
  Button,
  Cell,
  TabContainer,
  TabContainerItem } from  'mint-ui'
Vue.use(Button)
Vue.use(Cell)
Vue.use(TabContainer)
Vue.use(TabContainerItem)

Vue.config.productionTip = false


/* eslint-disable no-new */
export let vue =  new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
