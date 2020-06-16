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
    <tbody>
      <tr v-for="user in users" :key="user.key" class="my-tr">
        <td>{{user.userId}}</td>
        <td>{{user.username}}</td>
        <td>{{user.phoneNum}}</td>
        <td>{{user.posId|userPos}}</td>
        <td>{{user.email}}</td>
        <td><a href="#" @click="editInfo(user)">编辑</a></td>
        <td><a href="#" @click="deleteUser(user.userId)">删除</a></td>
      </tr>
    </tbody>
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
    deleteUser(userId){
      this.$emit("deleteUser", userId)
    }
  }
}
</script>

<style>

</style>