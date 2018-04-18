import Vue from 'vue'
import VueRouter from "vue-router"
import ElementUI from 'element-ui'
import App from './App.vue'
import router from './router'
import VueQuillEditor from 'vue-quill-editor'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/icon/iconfont.css'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import store from './store'
import axios from './util/ajax'
import {
  hasPermission
} from './util/uniTool'
Vue.use(hasPermission)
Vue.prototype.$axios = axios;
Vue.use(VueQuillEditor)
Vue.use(ElementUI);

new Vue({
  router,
  store,
  axios,
  el: '#app',
  render: h => h(App)
})
