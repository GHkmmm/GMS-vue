<template>
  <div class="login">
    <div style="fontSize:40px">登陆</div>
    <div class="login-form" @submit.prevent="SubmitLoginFrom()">
      <form>
        <div class="form-group">
          <label for="username">用户名</label>
          <input class="form-control" id="username" v-model="user.username">
          <small class="form-text text-muted">We'll never share your username with anyone else.</small>
        </div>
        <div class="form-group">
          <label for="password">密码</label>
          <input class="form-control" id="password" v-model="user.password">
        </div>
        <div class="form-group form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1">
          <label class="form-check-label" for="exampleCheck1">Check me out</label>
        </div>
        <button class="btn btn-primary btn-block">login</button>
      </form>
    </div>
  </div>
</template>

<script>
import Toast from 'components/common/toast/Toast';

import { Login } from 'network/login';

export default {
  name: 'Login',
  data(){
    return {
      user: {
        username: "",
        password: ""
      }
    }
  },
  components:{
    Toast
  },
  methods: {
    SubmitLoginFrom(){
      Login(this.user.username, this.user.password).then(res => {
        console.log(res);
        if(res.code == 200){
          this.$router.push("/dashboard");
        }else{
          this.$toast.err("账号或密码错误");
        }     
      });
    }
  }
}
</script>

<style scoped>
.login{
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  bottom: 100px;
}
.login-form{
  width: 40%;
  margin: 0 auto;
}
</style>