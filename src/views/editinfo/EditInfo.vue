<template>
  <div class="edit-info">
    <img src="~assets/img/back.svg" alt="" @click="BackUserManage">
    <form @submit.prevent="editInfo">
      <div class="form-group">
        <label for="username">用户名</label>
        <input type="text" class="form-control" id="username" v-model="currentUser.username">
      </div>
      <div class="form-group">
        <label for="phoneNum">手机号</label>
        <input type="text" class="form-control" id="phoneNum" v-model="currentUser.phoneNum">
      </div>
      <div class="form-group">
        <label for="email">邮箱</label>
        <input type="text" class="form-control" id="email" v-model="currentUser.email">
      </div>
      <div class="form-group">
        <label for="position">职位</label>
        <!-- <input type="text" class="form-control" id="position" v-model="currentUser.posId"> -->
        <select class="custom-select" id="inputGroupSelect01" v-model="currentUser.posId">
          <option value="1" >超级用户</option>
          <option value="2" >管理员</option>
          <option value="3" >普通用户</option>
        </select>
      </div>
      
      <button class="btn btn-primary" type="submit">确认修改</button>
    </form>
  </div>
</template>

<script>
import { editUser } from 'network/userManage';

export default {
  name: "EditInfo",
  data(){
    return {
      currentUser: {
        userId: "",
        username: "",
        phoneNum: "",
        email: "",
        posId: ""
      }
    }
  },
  created(){
    this.setInfo();
  },
  activated(){
    this.setInfo();
  },
  methods: {
    setInfo(){
      this.currentUser.userId = this.$route.query.userId
      this.currentUser.username = this.$route.query.username;
      this.currentUser.phoneNum = this.$route.query.phoneNum;
      this.currentUser.email = this.$route.query.email;
      this.currentUser.posId = this.$route.query.posId;
    },
    editInfo(){
      editUser(this.currentUser.userId,this.currentUser.username,this.currentUser.phoneNum,this.currentUser.email,this.currentUser.posId).then(res => {
        console.log(res);
        if(res.code==200){
          this.$toast.suc("修改成功");
          this.$router.push("user");
        }
      })
    },
    BackUserManage(){
      this.$router.push("user")
    }
  }
}
</script>

<style scoped>
.edit-form{
  padding: 10px
}
.edit-info img{
  width: 40px;
  height: 40px;
}
</style>