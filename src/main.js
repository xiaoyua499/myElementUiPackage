import Vue from 'vue'
import App from './App.vue'
import './index.less';//重置css
import router from './router'
import store from './store'
//引入elementui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//全局引用抽屉组件
import Drawer from '@/components/common/Drawer/index';
Vue.prototype.$drawer = Drawer
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
