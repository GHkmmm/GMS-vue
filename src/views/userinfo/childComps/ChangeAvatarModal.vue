<template>
  <or-modal :height="430"
            @CloseModalWindow="CloseModalWindow">
      <div class="change-avatar-modal-title">选择您想要的头像</div>
      <div class="avatar-group">
        <img v-for="(item, index) in avatarArray" :key="index" :src="item" @click="selectAvatar(index)" />
      </div>
    </or-modal>
</template>

<script>
import OrModal from 'components/common/modal/Modal';

import { changeAvatar } from 'network/userManage';

export default {
  name: "ChangeAvatarModal",
  components: {
    OrModal
  },
  data(){
    return{
      avatarArray: [
        require("assets/img/avatar/avatar.png"),
        require("assets/img/avatar/avatar2.png"),
        require("assets/img/avatar/avatar3.png"),
        require("assets/img/avatar/avatar4.png")
      ]
    }
  },
  methods: {
    CloseModalWindow(){
      this.$emit("CloseAvatarModalWindow")
    },
    selectAvatar(index){
      changeAvatar("avatar"+(index+1)+".png", this.$store.state.user.userId).then(res => {
        console.log(res);
        if(res.code==200){
          this.$store.state.user.avatar = "avatar"+(index+1)+".png"
          this.$toast.suc("修改成功");
          this.CloseModalWindow();
        }else{
          this.$toast.err("修改失败请重试")
        }
      })
    }
  }
}
</script>

<style scoped>
.avatar-group{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
}
.avatar-group img {
  flex: 1;
  width: 100px;
  cursor: pointer;
  transition: .6s
}
.avatar-group img:hover{
  transform: scale(1.1);
}
.change-avatar-modal-title{
  font-size: 24px;
}
</style>