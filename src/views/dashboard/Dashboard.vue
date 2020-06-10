<template>
  <div class="dashboard">
    <dashboard-nav-bar class="my-navbar" />
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
import TabMenu from 'components/common/tabmenu/TabMenu';

export default {
  name: "Dashboard",
  components: {
    DashboardNavBar,
    TabMenu
  },
  data(){
    return {
      menus: [
        {
          name: "用户管理",
          menu: [
            "1",
            "2",
            "3"
          ]
        },
        {
          name: "场地管理",
          menu: [
            "1",
            "2",
            "3"
          ]
        },
        {
          name: "器材管理",
          menu: [
            "1",
            "2",
            "3"
          ]
        },
        {
          name: "体育赛事管理",
          menu: [
            "1",
            "2",
            "3"
          ]
        },
        {
          name: "体育馆运营金额数据报表",
          menu: [
            "1",
            "2",
            "3"
          ]
        }
      ]
    }
  },
  created(){
    this.$toast.suc("欢迎您,xxx")
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
    }
  }
}
</script>

<style>
.my-navbar{
  height: 70px;
  box-shadow: #666 2px 2px 5px;
}
.bottom{
  width: 100%;
  height: calc(100vh - 48px);
  display: flex;
}
.router-view{
  margin: 20px;
}
</style>