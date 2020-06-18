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
        <td>{{user.phoneNum|filterNull}}</td>
        <td>{{user.posId|userPos}}</td>
        <td>{{user.email|filterNull}}</td>
        <td><a href="#" @click="editInfo(user)">编辑</a></td>
        <td><a href="#" @click="deleteUser(user.userId,index)" class="text-danger" v-if="!isDeleted">删除</a></td>
        <td><a href="#" @click="rollbackUser(user.userId,index)" class="text-danger" v-if="isDeleted">撤回</a></td>
      </tr>
    </tbody>
    <div v-if="isShowTip" class="no-users-tip d-flex justify-content-center">暂无用户</div>
  </table>
</template>

<script>
export default {
  name: "UserTable",
  props: {
    users:{
      type: Array,
      default: []
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    isShowTip: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return{
      showUsers: true,
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
    },
    filterNull(val){
      if(val==''){
        return "未填写"
      }else{
        return val
      }
    }
  },
  methods: {
    editInfo(user){
      this.$emit("editInfo", user)
    },
    deleteUser(userId,index){
      this.users.splice(index, 1);
      this.$emit("deleteUser", userId)
    },
    rollbackUser(userId,index){
      this.users.splice(index, 1);
      this.$emit("rollbackUser",userId)
    }
  }
}
</script>

<style>
.no-users-tip{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 30px;
  color: #666;
}
</style>