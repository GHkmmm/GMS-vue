import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import obj from 'components/common/toast/index';
import OrProgress from 'components/common/progress/index';
import { GetSession } from 'network/login';
import { MenuUtils } from 'utils/MenuUtils';
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'

Vue.use(obj);
Vue.use(OrProgress);

Vue.config.productionTip = false;

var routes = [];

router.beforeEach((to, from, next) => {
  if(to.path!="/login"&&store.state.routes.length==0){
    GetSession().then(res => {
      store.state.user = res.user;
      store.state.routes.push(res.routes);
      store.state.routes[0].children = res.routes.children.reverse();
      MenuUtils(routes, store.state.routes);
      router.options.routes.push(...routes);
      router.addRoutes(routes);
      next({path:"/dashboard"});
      // next();
    })
  }else{
    next();
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
