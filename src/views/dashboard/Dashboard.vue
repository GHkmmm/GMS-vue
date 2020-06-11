<template>
  <div class="dashboard">
    <dashboard-nav-bar class="my-navbar" @infoClick="infoClick"/>
    <user-info-card class="my-card" v-if="isShowUserInfo" />
    <div class="bottom">
      <tab-menu :menus="menus" @menuItemClick="menuItemClick">
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
      isShowUserInfo: false,
      menus: [
        {
          name: "用户管理",
          img: require("assets/img/tabmenu/usermanage.svg")
        },
        {
          name: "场地管理",
          img: require("assets/img/tabmenu/placemanage.svg")
        },
        {
          name: "器材管理",
          img: require("assets/img/tabmenu/equipmentmanage.svg")
        },
        {
          name: "体育赛事管理",
          img: require("assets/img/tabmenu/gamemanage.svg")
        },
        {
          name: "体育馆运营金额数据报表",
          img: require("assets/img/tabmenu/trading.svg")
        }
      ]
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
    menuItemClick(index){
      switch(index){
        case 0:
          this.$router.push('user');
          break;
        case 1:
          this.$router.push('ground');
          break;
        case 2:
          this.$router.push('equipment');
          break;
        case 3:
          this.$router.push('race');
          break;
        case 4:
          this.$router.push('report');
          break;
      }
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