// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyload from 'vue-lazyload'
//引入aixos并注册到vue的$http原型中
import axios from 'axios';
Vue.prototype.$axios = axios;

import store from './store'

import './common/sass/index.scss';

import 'mint-ui/lib/style.css'
import {
  Button,
  Cell,
  TabContainer,
  TabContainerItem ,
  InfiniteScroll,
  Spinner,
  Popup
} from  'mint-ui';

Vue.component(Button.name, Button)
Vue.component(Cell.name,Cell)
Vue.component(TabContainer.name, TabContainer)
Vue.component(TabContainerItem.name, TabContainerItem)
Vue.use(InfiniteScroll)
Vue.component(Spinner.name, Spinner)
Vue.component(Popup.name, Popup)
Vue.use(VueLazyload,{
    loading:'../static/download.gif'
})
Vue.config.productionTip = false


/* eslint-disable no-new */
export let vue =  new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
