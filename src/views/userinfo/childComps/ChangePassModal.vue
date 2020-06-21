<template>
  <or-modal :height="360" @CloseModalWindow="CloseModalWindow">
    <div class="change-password-modal" >
    <span style="fontSize:24px">更改密码</span>
    <form action="">
      <div class="change-password-modal-input">
        <label for="newUsername">新密码</label>
        <input class="form-control" id="newUsername" v-model="newPass">
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
      <button type="button" class="btn btn-primary btn-lg btn-block" @click="ChangePassword">修改</button>
    </form>
    </div>
  </or-modal>
</template>

<script>
import OrModal from 'components/common/modal/Modal';

import { ChangePassword,GetValidateCode } from 'network/login';

export default {
  name: "ChangePassModal",
  components: {
    OrModal
  },
  data(){
    return{
      newPass: "",
      code: ""
    }
  },
  mounted(){
    this.changeCode();
  },
  methods: {
    CloseModalWindow(){
      this.$emit("ClosePassModalWindow")
    },
    ChangePassword(){
      this.$progress.start();
      ChangePassword(this.newPass, this.$store.state.user.username, this.$store.state.user.phoneNum, this.$store.state.user.email,this.code).then(res => {
          console.log(res);
          if(res.code == 200){
            this.$toast.suc("修改成功");
            this.$progress.finished();
            this.CloseModalWindow();
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
.change-password-modal-input{
  padding-top: 10px;
}
.change-password-modal-input *{
  margin: 5px 0;
}
</style>