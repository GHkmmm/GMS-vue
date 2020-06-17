<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">id</th>
        <th scope="col">用户名</th>
        <th scope="col">手机号</th>
        <th scope="col">职位</th>
        <th scope="col">邮箱</th>
        <th></th>
        <th></th>
      </tr>
    </thead>
    <tbody v-if="showUsers">
      <tr v-for="(user,index) in users" :key="index" class="my-tr">
        <td>{{user.userId}}</td>
        <td>{{user.username}}</td>
        <td>{{user.phoneNum}}</td>
        <td>{{user.posId|userPos}}</td>
        <td>{{user.email}}</td>
        <td><a href="#" @click="editInfo(user)">编辑</a></td>
        <td><a href="#" @click="deleteUser(user.userId,index)">删除</a></td>
      </tr>
    </tbody>
    <div v-else class="no-users-tip">暂无用户</div>
  </table>
</template>

<script>
export default {
  name: "UserTable",
  props: {
    users:{
      type: Array,
      default: []
    }
  },
  data(){
    return{
      showUsers: true
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
  methods: {
    editInfo(user){
      this.$emit("editInfo", user)
    },
    deleteUser(userId,index){
      this.users.splice(index, 1);
      if(this.users.length==0){
        this.showUsers =false
      }
      this.$emit("deleteUser", userId)
    }
  }
}
</script>

<style>
.no-users-tip{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
}
</style>