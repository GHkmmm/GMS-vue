<template>
  <div class="info-card">
    <img :src="getAvatarImg" alt="">
    <div class="info-name">{{user.username}}</div>
    <div class="info-email">{{user.email}}</div>
    <button class="btn btn-danger logout" @click="Logout">注销</button>
  </div>
</template>

<script>
import { Logout } from 'network/login';

export default {
  name: "UserInfoCard",
  data(){
    return{
      user:{}
    }
  },
  mounted(){
    this.user = this.$store.state.user;
  },
  computed: {
    getAvatarImg(){
      return require("assets/img/avatar/"+this.$store.state.user.avatar)
    }
  },
  methods: {
    Logout(){
      Logout().then(res => {
        if(res.code==200){
          this.$toast.suc("注销成功");
          this.$store.state.user={};
          this.$store.state.router=[];
          setTimeout(()=>{
            this.$router.push("/login")
            location.reload();
          },1600)
        }else{
          this.$toast.err("注销失败")
        }
      })
    }
  }
}
</script>

<style scoped>
.info-card{
  width: 200px;
  height: 250px;
  background-color: red;

  display: flex;
  flex-direction: column;
  align-items: center;
  
  padding-top: 30px;

  border-radius: 10px;
  background: linear-gradient(225deg, #e6e6e6, #ffffff);
  box-shadow:  -20px 20px 40px #c9c9c9
}
.info-card img{
  width: 70px;
}
.info-name{
  font-size: 24px;
  margin-top: 15px;
}
.info-email{
  font-size: 18px;
  color: #bbb;
}
.logout{
  margin-top: 10px;
}
img{
  width: 30px;
}
</style>