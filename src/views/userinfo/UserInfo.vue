<template>
  <div class="user-info">
    <div class="userinfo-title">个人信息</div>
    <span class="userinfo-tip">您在该系统使用的信息，例如用户名或头像</span>
    <div class="base-info">
      <div class="userinfo-title">个人资料</div>
      <div class="userinfo-item">
        <div class="userinfo-item-title">头像</div>
        <div class="userinfo-item-info">更改照片可帮助您个性化您的账号</div>
        <img src="~assets/img/df_avatar.svg" alt="">
      </div>
      <div class="userinfo-item">
        <div class="userinfo-item-title">名称</div>
        <div class="userinfo-item-info">{{$store.state.user.username}}</div>
        <img src="~assets/img/next.svg" alt="">
      </div>
      <div class="userinfo-item">
        <div class="userinfo-item-title">邮箱</div>
        <div class="userinfo-item-info">{{$store.state.user.email}}</div>
        <img src="~assets/img/next.svg" alt="">
      </div>
      <div class="userinfo-item">
        <div class="userinfo-item-title">职位</div>
        <div class="userinfo-item-info">{{$store.state.user.posId}}</div>
        <img src="~assets/img/next.svg" alt="">
      </div>
      <div class="userinfo-item">
        <div class="userinfo-item-title">密码</div>
        <div class="userinfo-item-info">·······</div>
        <img src="~assets/img/next.svg" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "userInfo"
}
</script>

<style>
.user-info{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.userinfo-title{
  font-size: 24px;
}
.userinfo-tip{
  font-size: 18px;
  color: #999;
  margin-top: 5px;
}
.base-info{
  width: 70%;
  height: 80%;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-top: 10px;
  padding: 20px;
}
.base-info img{
  width: 20px
}
.userinfo-item{
  width: 100%;
  height: 100px;
  line-height: 100px;
  display: flex;
  border-bottom: 1px solid #ddd;
  position: relative;
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