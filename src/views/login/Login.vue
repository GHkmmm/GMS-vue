<template>
  <div class="login">
    <div style="fontSize:40px">{{title}}</div>
    <div class="login-form" @submit.prevent="SubmitFrom()">
      <form>
        <div class="form-group">
          <label for="username">*用户名</label>
          <input class="form-control" id="username" v-model="user.username" @blur="UsernameInputBlur">
          <small class="form-text text-danger">{{usernameTip}}</small>
        </div>
        <div class="form-group">
          <label for="password">*{{password}}</label>
          <input class="form-control" id="password" v-model="user.password" @blur="PasswordInputBlur">
          <small class="form-text text-danger">{{passwordTip}}</small>
        </div>
        <div class="form-group">
          <label for="code">验证码</label>
          <div class="input-group mb-3">
            <input class="form-control" id="code" v-model="code">
            <div class="input-group-append" @click="changeCode">
              <img id="codeimg" class="img-code" alt="验证码">
            </div>
          </div>
        </div> 
        <div class="warn" v-if="isShowTip">邮箱/手机号选一项填写即可</div>
        <div class="form-group" v-if="isShowOtherInput">
          <label for="phoneNum">手机号</label>
          <input class="form-control" id="phoneNum" v-model="user.phoneNum" @blur="PhoneNumInputBlur">
          <small class="form-text text-danger">{{phoneNumTip}}</small>
        </div>
        <div class="form-group" v-if="isShowOtherInput">
          <label for="email">email</label>
          <input class="form-control" id="email" v-model="user.email" @blur="EmailInputBlur">
          <small class="form-text text-danger">{{emailTip}}</small>
        </div>    
        <div class="changeto-register" @click="changeToRegister" v-if="!isShowOtherInput">还没账户?点击注册用户</div>
        <div class="changeto-register" @click="changeToLogin" v-if="isShowOtherInput">已有账户?点击登陆</div>
        <div class="warn" @click="forgetPassword" v-if="!isShowOtherInput">忘记密码</div>
        <button class="btn btn-primary btn-block d-flex justify-content-center align-items-center">
          {{title}}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import Toast from 'components/common/toast/Toast';
import Loading from 'components/common/loading/Loading';
import OrProgress from 'components/common/progress/Progress';

import { Login, Register, ChangePassword, GetRoutes, GetValidateCode } from 'network/login';
import { MenuUtils } from 'utils/MenuUtils';

var routers = [];

export default {
  name: 'Login',
  data(){
    return {
      title: "登陆",
      isShowOtherInput: false,
      isShowTip: false,
      isLoading: false,
      usernameTip: "",
      passwordTip: "",
      phoneNumTip: "",
      emailTip: "",
      nameTest: false,
      passwordTest: false,
      phoneNumTest: false,
      emailTest: false,
      password: "密码",
      user: {
        username: "",
        password: "",
        phoneNum: "",
        posId: 3,
        email: ""
      },
      code: "",
      routers: []
    }
  },
  components:{
    Toast,
    Loading,
    OrProgress
  },
  created(){
    this.changeCode();
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
      this.password = "新密码"
      this.isShowOtherInput = !this.isShowOtherInput;
      this.isShowTip = true;
    },

    /**
     * 验证表单相关方法
     */
    UsernameInputBlur(){
      const name = /^[a-zA-Z0-9_]{3,12}$/;
      this.nameTest = name.test(this.user.username);
      if(!this.nameTest){
        this.usernameTip = "请输入3到12位到英文或字母"
      }else{
        this.usernameTip = ""
      }
    },
    PasswordInputBlur(){
      const password = /^[a-zA-Z0-9_]{3,12}$/;
      this.passwordTest = password.test(this.user.password);
      if(!this.passwordTest){
        this.passwordTip = "请输入3到12位到英文或字母"
      }else{
        this.passwordTip = ""
      }
    },
    PhoneNumInputBlur(){
      const phoneNum = /^1[3456789]\d{9}$/;
      this.phoneNumTest = phoneNum.test(this.user.phoneNum);
      if(!this.phoneNumTest){
        this.phoneNumTip = "请输入正确的手机号"
      }else{
        this.phoneNumTip = ""
      }
    },
    EmailInputBlur(){
      const email = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      this.emailTest = email.test(this.user.email);
      if(!this.emailTest){
        this.emailTip = "请输入正确的邮箱"
      }else{
        this.emailTip = ""
      }
    },

    /**
     * 网络请求相关方法
     */
    SubmitFrom(){
      this.$progress.start();
      if(this.title=="登陆"&&this.nameTest&&this.passwordTest&&this.code!=""){
        Login(this.user.username, this.user.password,this.code).then(res => {
          if(res.code == 200){
            this.isLoading = true;
            this.$store.state.user = res.user;
            GetRoutes(this.$store.state.user.posId).then(res => {
              this.routers.push(res);
              this.routers.children = res.children.reverse();
              MenuUtils(routers, this.routers);
              this.$router.options.routes.push(...routers);
              this.$router.addRoutes(routers)
              this.$progress.finished();
              this.$router.push("/dashboard");
            }) 
          }else if(res.code == 400){
            this.$toast.err("验证码错误");
            this.$progress.stop();
            this.changeCode();
          }else{
            this.$toast.err("账号或密码错误");
            this.$progress.stop();
            this.changeCode();
          }     
        });
      }else if(this.title=="注册"&&this.nameTest&&this.passwordTest&&this.code!=""){
        this.isLoading = true;
        Register(this.user.username, this.user.password, this.user.phoneNum, this.user.posId, this.user.email,this.code).then(res => {
          if(res.code == 200){
            this.$toast.suc("注册成功");
            setTimeout(()=>{
              this.$router.go(0);
            }, 1000)
          }else if(res.code == 400){
            this.$toast.err("验证码错误");
            this.$progress.stop();
            this.changeCode();
          }else{
            this.$toast.err("注册失败")
            this.$progress.stop();
          }
        })
      }else if(this.title=="修改密码"&&this.code!=""){
        this.isLoading = true;
        ChangePassword(this.user.password, this.user.username, this.user.phoneNum, this.user.email,this.code).then(res => {
          console.log(res);
          if(res.code == 200){
            this.$toast.suc("修改成功");
            setTimeout(()=>{
              this.$router.go(0);
            }, 1000)
          }else if(res.code == 400){
            this.$toast.err("验证码错误");
            this.$progress.stop();
            this.changeCode();
          }else{
            this.isLoading = false;
            this.$toast.err("信息验证失败")
            this.$progress.stop();
          }
        })
      }else{
        this.isLoading = false;
        this.$toast.err("请按照要求填写信息")
      }
    },
    changeCode(){
      GetValidateCode().then(res => {
        document.getElementById('codeimg').src=res.url;
      })
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
}
.login-form{
  width: 30%;
  margin: 0 auto;
}
.img-code{
  cursor: pointer;
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