<template>
  <div class="dashboard">
    <dashboard-nav-bar class="my-navbar" @infoClick="infoClick"/>
    <user-info-card class="my-card" v-if="isShowUserInfo" />
    <div class="bottom">
      <tab-menu :menus="$router.options.routes[2].children" @menuItemClick="menuItemClick">
        <!-- <tab-menu :menus="menus[0].menu" /> -->
      </tab-menu>
      <keep-alive>
        <router-view class="router-view" />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import DashboardNavBar from './childComps/DashboardNavBar';
import UserInfoCard from './childComps/UserInfoCard';
import TabMenu from 'components/common/tabmenu/TabMenu';

import { GetSession } from 'network/login';

export default {
  name: "Dashboard",
  components: {
    DashboardNavBar,
    UserInfoCard,
    TabMenu
  },
  data(){
    return {
      isShowUserInfo: false
    }
  },
  created(){
    this.getSession();
    setTimeout(()=>{
      if(this.$store.state.user){
        this.$toast.suc("欢迎您,"+this.$store.state.user.username)
      }else{
        this.$toast.err("您还未登陆");
        setTimeout(()=>{
          this.$router.push("/login");
        }, 1600)
      }
    },300)
  },
  methods: {
    menuItemClick(path){
      this.$router.push(path)
    },
    infoClick(){
      this.isShowUserInfo = !this.isShowUserInfo;
    },

    /**
     * 网络请求相关方法
     */
    getSession(){
      GetSession().then(res => {
        this.$store.state.user = res.user;
      })
    }
  }
}
</script>

<style>
.my-navbar{
  height: 70px;
  box-shadow: #666 2px 2px 5px;
}
.my-card{
  position: absolute;
  right: 20px;
}
.bottom{
  width: 100%;
  height: calc(100vh - 70px);
  display: flex;
}
.router-view{
  width: 80%;
  padding: 10px;
}
</style>