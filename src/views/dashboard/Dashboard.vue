<template>
  <div class="dashboard">
    <dashboard-nav-bar class="my-navbar" @infoClick="infoClick"/>
    <user-info-card class="my-card" v-if="isShowUserInfo" />
    <div class="bottom">
      <tab-menu :menus="$router.options.routes[2].children" @menuItemClick="menuItemClick" ref="OrTabMenu">
        <!-- <tab-menu :menus="menus[0].menu" /> -->
      </tab-menu>
      <keep-alive>
        <router-view class="router-view" ref="RouterView" />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import DashboardNavBar from './childComps/DashboardNavBar';
import UserInfoCard from './childComps/UserInfoCard';
import TabMenu from 'components/common/tabmenu/TabMenu';

import { GetSession, GetRoutes } from 'network/login';

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
    // this.getRoutes(this.$store.state.user.posId);

    setTimeout(()=>{
      if(this.$store.state.user){
        console.log(this.$store.state.user);
        this.$toast.suc("欢迎您,"+this.$store.state.user.username)
      }else{
        this.$toast.err("您还未登陆");
        setTimeout(()=>{
          this.$router.push("/login");
        }, 1600)
      }
    },300)
  },
  mounted(){
    this.$bus.$on("clickNavMenu", (isSpread) => {
      const OrTabMenuStyle = this.$refs.OrTabMenu.$el.style;
      const RouterViewStyle = this.$refs.RouterView.$el.style
      if(!isSpread){
        OrTabMenuStyle.width = `0`;
        RouterViewStyle.width = `100%`;
        OrTabMenuStyle.transition = `.6s`
      }else{
        OrTabMenuStyle.width = `20%`;
        // RouterViewStyle.width = `80%`;
        OrTabMenuStyle.transition = `.6s`
      }
    })
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
    },
    getRoutes(posId){
      GetRoutes(posId).then(res => {
        console.log(res);
      })
    }
  }
}
</script>

<style>
.my-navbar{
  height: 70px;
  background-color: #047AFB;
  color: #fff;
  box-shadow: #999 0 2px 8px;
}
.my-card{
  position: absolute;
  right: 20px;
  z-index: 99;
}
.bottom{
  width: 100%;
  display: flex;
  position: absolute;
  top: 70px;
  bottom: 0;
  z-index: -99;
  background-color: #FAFAFA;
}
.router-view{
  width: 80%;
  padding: 10px;
  overflow-y: scroll;
}
</style>