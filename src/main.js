import Vue from 'vue'
import VueRouter from "vue-router"
import ElementUI from 'element-ui'
import App from './App.vue'
import RouterConfig from './router.config.js'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);
Vue.use(VueRouter);
const router=new VueRouter(RouterConfig)
new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
