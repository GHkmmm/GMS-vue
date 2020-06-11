<template>
  <nav-bar>
    <div slot="left" class="pro-name">体育馆管理系统</div>
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
    }
  }
}
</script>

<style>
.pro-name{
  font-size: 24px;
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