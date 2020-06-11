<template>
  <div class="info-card">
    <img src="~assets/img/df_avatar.svg" alt="">
    <div class="info-name">{{user.username}}</div>
    <div class="info-email">{{user.email}}</div>
  </div>
</template>

<script>
export default {
  name: "UserInfoCard",
  data(){
    return{
      user:{}
    }
  },
  mounted(){
    this.user = this.$store.state.user;
  }
}
</script>

<style>
.info-card{
  width: 180px;
  height: 250px;
  background-color: red;

  display: flex;
  flex-direction: column;
  align-items: center;
  
  padding-top: 30px;

  border-radius: 10px;
  background: linear-gradient(225deg, #e6e6e6, #ffffff);
  box-shadow:  -20px 20px 40px #c9c9c9, 
             20px -20px 40px #ffffff;
}
.info-name{
  font-size: 24px;
  margin-top: 15px;
}
.info-email{
  font-size: 18px;
  color: #bbb;
}
</style>