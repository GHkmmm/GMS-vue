<template>
  <div class="user-info">
    <div class="user-info-container">
      <div class="userinfo-title">个人信息</div>
      <span class="userinfo-tip">您在该系统使用的信息，例如用户名或头像</span>
      <user-info-table @ShowChangeAvatarModal="isShowChangeAvatarModal=true"
                      @ShowChangePassModal="isShowChangePassModal=true" />
    </div>

    <change-avatar-modal v-if="isShowChangeAvatarModal"
                        @CloseAvatarModalWindow="isShowChangeAvatarModal=false" />
    <change-pass-modal v-if="isShowChangePassModal"
                       @ClosePassModalWindow="isShowChangePassModal=false" /> 

  </div>
</template>

<script>
import UserInfoTable from './childComps/UserInfoTable';
import ChangeAvatarModal from './childComps/ChangeAvatarModal';
import ChangePassModal from './childComps/ChangePassModal';

export default {
  name: "userInfo",
  components: {
    UserInfoTable,
    ChangeAvatarModal,
    ChangePassModal
  },
  data(){
    return {
      isShowChangeAvatarModal: false,
      isShowChangePassModal: false
    }
  },
}
</script>

<style scoped>
.user-info{
  position: relative;
}
.user-info-container{
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  right: 50px;
}
.userinfo-title{
  font-size: 24px;
  padding-top: 10px;
}
.userinfo-tip{
  font-size: 18px;
  color: #999;
  margin-top: 5px;
}
</style>