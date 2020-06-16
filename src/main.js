import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import obj from 'components/common/toast/index';
import { GetSession } from 'network/login';
import { MenuUtils } from 'utils/MenuUtils';
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'

Vue.use(obj);

Vue.config.productionTip = false;

var routes = [];

router.beforeEach((to, from, next) => {
  console.log(to);
  console.log(from);
  console.log(store.state.routes);
  if(to.path!="/login"&&store.state.routes.length==0){
    GetSession().then(res => {
      console.log(res);
      store.state.user = res.user;
      store.state.routes.push(res.routes);
      store.state.routes[0].children = res.routes.children.reverse();
      console.log(store.state.routes);
      MenuUtils(routes, store.state.routes);
      console.log(routes);
      router.options.routes.push(...routes);
      router.addRoutes(routes);
      console.log(router);
      next({path:"/dashboard"});
      // next();
    })
  }else{
    console.log("else");
    next();
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
