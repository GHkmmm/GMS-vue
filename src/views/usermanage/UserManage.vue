<template>
  <div class="user-manage">
    <div class="form-check" @click="onlyManager">
      <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" v-model="isOnlyManager">
      <label class="form-check-label" for="defaultCheck1">
        只查看管理员用户
      </label>
    </div>
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
        <tr v-for="user in users" :key="user.key">
          <th scope="row">{{user.userId}}</th>
          <td>{{user.username}}</td>
          <td>{{user.phoneNum}}</td>
          <td>{{user.posId|userPos}}</td>
          <td>{{user.email}}</td>
          <td><a href="#" @click="editInfo(user.userId,user.username,user.phoneNum,user.email,user.posId)">编辑</a></td>
          <td><a href="#" @click="deleteUser(user.userId)">删除</a></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getUser, deleteUser, queryUser } from 'network/userManage';

export default {
  name: "UserManage",
  data(){
    return{
      users: [],
      isOnlyManager: false
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
    this.getUser();
  },
  methods: {
    editInfo(userId,username,phoneNum,email,posId){
      this.$router.push({
        path: 'editInfo',
        query: {
          userId,
          username,
          phoneNum,
          email,
          posId
        }
      })
    },

    /**
     * 网络请求相关方法
     */
    getUser(){
      getUser().then(res => {
        this.users = res.users
      })
    },
    deleteUser(userId){
      deleteUser(userId).then(res=>{
        if(res.code == 200){
          this.$toast.suc("删除成功")
        }else{
          this.$toast.err("删除失败")
        }
      })
    },
    onlyManager(){
      if(this.isOnlyManager==false){
        queryUser("").then(res => {
          if(res.code==200){
            this.users= res.users;
          }
        })
      }else{
        this.getUser();
      }
    }
  }
}
</script>

<style>
.user-manage{
  width: 80%;
}
</style>