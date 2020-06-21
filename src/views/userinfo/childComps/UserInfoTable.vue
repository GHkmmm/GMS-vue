<template>
  <div class="base-info">
      <div class="userinfo-title">个人资料</div>
      <div class="userinfo-item" @click="ShowChangeAvatarModal">
        <div class="userinfo-item-title">头像</div>
        <div class="userinfo-item-info">更改照片可帮助您个性化您的账号</div>
        <img class="avatar" :src="getAvatarImg" alt="">
      </div>
      <div class="userinfo-item">
        <div class="userinfo-item-title">名称</div>
        <div class="userinfo-item-info">{{$store.state.user.username}}</div>
        <img class="next" src="~assets/img/next.svg" alt="">
      </div>
      <div class="userinfo-item">
        <div class="userinfo-item-title">手机号</div>
        <div class="userinfo-item-info">{{$store.state.user.phoneNum}}</div>
        <img class="next" src="~assets/img/next.svg" alt="">
      </div>
      <div class="userinfo-item">
        <div class="userinfo-item-title">邮箱</div>
        <div class="userinfo-item-info">{{$store.state.user.email}}</div>
        <img class="next" src="~assets/img/next.svg" alt="">
      </div>
      <div class="userinfo-item">
        <div class="userinfo-item-title">职位</div>
        <div class="userinfo-item-info">{{$store.state.user.posId|showPosition}}</div>
        <img class="next" src="~assets/img/next.svg" alt="">
      </div>
      <div class="userinfo-item" @click="ShowChangePassModal">
        <div class="userinfo-item-title">密码</div>
        <div class="userinfo-item-info">·······</div>
        <img class="next" src="~assets/img/next.svg" alt="">
      </div>
    </div>
</template>

<script>
export default {
  name: "UserInfoTable",
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
  computed: {
    getAvatarImg(){
      return require("assets/img/avatar/"+this.$store.state.user.avatar)
    }
  },
  methods: {
    ShowChangeAvatarModal(){
      this.$emit("ShowChangeAvatarModal");
    },
    ShowChangePassModal(){
      this.$emit("ShowChangePassModal")
    }
  }
}
</script>

<style scoped>
.base-info{
  width: 70%;
  height: 100%;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-top: 10px;
  padding: 20px;
}
.next{
  width: 20px
}
.avatar{
  width: 50px;
}
.userinfo-item{
  width: 100%;
  height: 100px;
  line-height: 100px;
  display: flex;
  border-bottom: 1px solid #ddd;
  position: relative;
  cursor: pointer;
}
.userinfo-item-title{
  font-size: 12px;
}
.userinfo-item-info{
  padding-left: 100px;
}
.userinfo-item img{
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%)
}
</style>