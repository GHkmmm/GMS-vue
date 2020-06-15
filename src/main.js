import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import obj from 'components/common/toast/index';
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'

Vue.use(obj);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
