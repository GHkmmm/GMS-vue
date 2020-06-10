<template>
  <div class="user-manage">
    <table class="table">
      <thead>
      <tr>
        <th scope="col">id</th>
        <th scope="col">用户名</th>
        <th scope="col">手机号</th>
        <th scope="col">职位</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user.key">
        <th scope="row">{{user.userId}}</th>
        <td>{{user.username}}</td>
        <td>{{user.phoneNum}}</td>
        <td>{{user.posId|userPos}}</td>
        <td></td>
      </tr>
    </tbody>
  </table>
  </div>
</template>

<script>
import { getUser } from 'network/userManage';

export default {
  name: "UserManage",
  data(){
    return{
      users: []
    }
  },
  filters: {
    userPos(id){
      switch(id){
        case 1:
          return "超级用户";
          break;
        case 2:
          return "体育馆管理专员";
          break;
        case 3:
          return "普通用户";
          break;
      }
    }
  },
  created(){
    getUser().then(res => {
      this.users = res.users
    })
  }
}
</script>

<style>
.user-manage{
  width: 80%;
  margin: 0;
  padding: 10px;
}
</style>