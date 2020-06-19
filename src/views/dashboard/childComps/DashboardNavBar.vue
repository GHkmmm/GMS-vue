<template>
  <nav-bar>
    <div slot="left" class="pro-name d-flex">
      <div class="nav-menu" @click="clickNavMenu">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <span>体育馆管理系统</span>
    </div>
    <div slot="right" class="info" @click="infoClick">
      <div>{{$store.state.user.username+"---"}}</div>
      <div>{{$store.state.user.posId|showPosition}}</div>
      <img src="~assets/img/df_avatar.svg" alt="">
    </div>
  </nav-bar>
</template>

<script>
import NavBar from 'components/common/nav/NavBar';

export default {
  name: "DashboardNavBar",
  components: {
    NavBar
  },
  data(){
    return{
      isSpread: true
    }
  },
  filters: {
    showPosition(posId){
      switch(posId){
        case 1:
          return "超级用户"
          break;
        case 2:
          return "体育管理专员"
          break;
        case 3:
          return "普通用户"
          break;
      }
    }
  },
  methods: {
    infoClick(){
      this.$emit("infoClick")
    },
    clickNavMenu(){
      this.isSpread = !this.isSpread
      this.$bus.$emit("clickNavMenu", this.isSpread)
    }
    
  }
}
</script>

<style>
.nav-menu{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  cursor: pointer;
}
.nav-menu div{
  width: 20px;
  height: 2px;
  background-color: #fff;
  margin: 2px;
}
.pro-name{
  font-size: 24px;
  font-family: Arial, Helvetica, sans-serif
}
.info{
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
}
.info img{
  margin-left: 10px;
}
</style>