import Progress from './Progress.vue';

const OrProgress ={}

OrProgress.install = function(Vue){
  const progressConstructor = Vue.extend(Progress);
  const progress = new progressConstructor();
  progress.$mount(document.createElement('div'));
  document.body.appendChild(progress.$el);
  Vue.prototype.$progress = progress;
}

export default OrProgress