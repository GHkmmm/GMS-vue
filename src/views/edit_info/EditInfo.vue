<template>
  <form @submit.prevent="editInfo">
    <div class="form-group">
      <label for="username">用户名</label>
      <input type="text" class="form-control" id="username" :value="currentUser.username">
    </div>
    <div class="form-group">
      <label for="phoneNum">手机号</label>
      <input type="text" class="form-control" id="phoneNum" :value="currentUser.phoneNum">
    </div>
    <div class="form-group">
      <label for="email">邮箱</label>
      <input type="text" class="form-control" id="email" :value="currentUser.email">
    </div>
    <div class="form-group">
      <label for="position">职位</label>
      <input type="text" class="form-control" id="position" :value="currentUser.posId">
    </div>
    <button class="btn btn-primary" type="submit">确认修改</button>
  </form>
</template>

<script>
import { editUser } from 'network/userManage';

export default {
  name: "EditInfo",
  data(){
    return {
      currentUser: {}
    }
  },
  created(){
    this.currentUser = {
      username: this.$route.query.username,
      phoneNum: this.$route.query.phoneNum,
      email: this.$route.query.email,
      posId: this.$route.query.posId
    }
  },
  methods: {
    editInfo(){

    }
  }
}
</script>

<style>
.edit-form{
  padding: 10px
}
</style>