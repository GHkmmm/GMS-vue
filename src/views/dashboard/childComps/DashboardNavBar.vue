<template>
  <nav-bar>
    <div slot="left" class="pro-name">体育馆管理系统</div>
    <div slot="right" class="right">
      <span>系统管理员</span>
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
  }
}
</script>

<style>
.pro-name{
  font-size: 24px;
}
.right{
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.right img{
  margin-left: 10px;
}
</style>