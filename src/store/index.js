import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: {
      userId: "",
      username: "",
      phoneNum: "",
      email: "",
      posId: "",
      posName: ""
    }
  }
})

export default store;