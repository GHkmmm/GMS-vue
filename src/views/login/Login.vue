<template>
  <div class="login">
    <div style="fontSize:40px">{{title}}</div>
    <div class="login-form" @submit.prevent="SubmitFrom()">
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
        <div class="warn" v-if="isShowTip">邮箱/手机号选一项填写即可</div>
        <div class="form-group" v-if="isShowOtherInput">
          <label for="phoneNum">手机号</label>
          <input class="form-control" id="phoneNum" v-model="user.phoneNum">
        </div>
        <div class="form-group" v-if="isShowOtherInput">
          <label for="email">email</label>
          <input class="form-control" id="email" v-model="user.email">
        </div>
        <div class="form-group form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1">
          <label class="form-check-label" for="exampleCheck1">Check me out</label>
        </div>
        <div class="changeto-register" @click="changeToRegister" v-if="!isShowOtherInput">还没账户?点击注册用户</div>
        <div class="changeto-register" @click="changeToLogin" v-if="isShowOtherInput">已有账户?点击登陆</div>
        <div class="warn" @click="forgetPassword" v-if="!isShowOtherInput">忘记密码</div>
        <button class="btn btn-primary btn-block">{{title}}</button>
      </form>
    </div>
  </div>
</template>

<script>
import Toast from 'components/common/toast/Toast';

import { Login, Register, ChangePassword } from 'network/login';
import { MenuUtils } from 'utils/MenuUtils';

var routers = [];

export default {
  name: 'Login',
  data(){
    return {
      title: "登陆",
      isShowOtherInput: false,
      isShowTip: false,
      user: {
        username: "",
        password: "",
        phoneNum: "",
        posId: 3,
        email: ""
      },
      /**
       * 模拟后端返回路由信息
       */
      newRoutes: [
        {
          path: '/dashboard',
          component: "Dashboard",
          children: [
            {
              path: 'user',
              component: "UserManage",
              name:"用户管理",
              icon: require("assets/img/tabmenu/usermanage.svg")
            },
            {
              path: 'ground',
              component: "GroundManage",
              name:"场地管理",
              icon: require("assets/img/tabmenu/placemanage.svg")
            },
            {
              path: '',
              redirect: "user"
            }
          ]
        }
      ]
    }
  },
  components:{
    Toast
  },
  methods: {
    changeToRegister(){
      this.title = "注册",
      this.isShowOtherInput = !this.isShowOtherInput;
    },
    changeToLogin(){
      this.title = "登陆",
      this.isShowOtherInput = !this.isShowOtherInput;
      this.isShowTip = false;
    },
    forgetPassword(){
      this.title = "修改密码"
      this.isShowOtherInput = !this.isShowOtherInput;
      this.isShowTip = true;
    },

    /**
     * 网络请求相关方法
     */
    SubmitFrom(){
      if(this.title=="登陆"){
        Login(this.user.username, this.user.password).then(res => {
          if(res.code == 200){
            this.$store.state.user = res.user;
            MenuUtils(routers, this.newRoutes);
            console.log("router===",routers);
            this.$router.options.routes.push(...routers);
            this.$router.addRoutes(routers)
            console.log(this.$router);
            this.$router.push("/dashboard");
          }else{
            this.$toast.err("账号或密码错误");
          }     
        });
      }else if(this.title=="注册"){
        Register(this.user.username, this.user.password, this.user.phoneNum, this.user.posId, this.user.email).then(res => {
          if(res.code == 200){
            this.$toast.suc("注册成功");
            setTimeout(()=>{
              this.$router.go(0);
            }, 1000)
          }else{
            this.$toast.err("请验证您信息的格式")
          }
        })
      }else{
        ChangePassword(this.user.password, this.user.username, this.user.phoneNum, this.user.email).then(res => {
          console.log(res);
          if(res.code == 200){
            this.$toast.suc("修改成功");
            setTimeout(()=>{
              this.$router.go(0);
            }, 1000)
          }else{
            this.$toast.err("信息验证失败")
          }
        })
      }
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
.changeto-register{
  margin-bottom: 10px;
  cursor: pointer;
  color: #06c;
}
.warn{
  color: #dc4245;
  margin-bottom: 10px;
  cursor: pointer;
}
</style>