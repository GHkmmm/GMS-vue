<template>
  <div>
    <h3>搜索</h3>
    <div>
      <div class="d-flex">
        <input class="form-control query-input" placeholder="请输入用户id" v-model="user.userId">
        <input class="form-control query-input" placeholder="请输入用户名" v-model="user.username">
        <input class="form-control query-input" placeholder="请输入手机号" v-model="user.phoneNum">
        <input class="form-control query-input" placeholder="请输入邮箱" v-model="user.email">
        <button class="btn btn-primary" @click="QueryUser">搜索</button>
      </div>
      <div class="switch-group">
        <or-switch @on="onlyManager" @off="getUser" :isOn="isOn"/>
        <label class="form-check-label">
          只查看管理员用户
        </label>
        <or-switch @on="onlyDeletedUsers" @off="getUser" :isOn="isOn2"/>
        <label class="form-check-label">
          查看已删除的用户
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import OrSwitch from 'components/common/switch/Switch';

export default {
  name: "FilterUser",
  data(){
    return {
      user: {
        userId: "",
        username: "",
        phoneNum: "",
        email: ""
      },
      isOn: false,
      isOn2: false
    }
  },
  components: {
    OrSwitch
  },
  methods: {
    onlyManager(){
      this.$emit("onlyManager")
    },
    onlyDeletedUsers(){
      this.$emit("onlyDeletedUsers")
    },
    getUser(){
      this.user.userId ="";
      this.user.username = "";
      this.user.phoneNum = "";
      this.user.email ="";
      this.isOn = false;
      this.$emit("getUser")
    },
    QueryUser(){
      this.isOn = true;
      this.$emit("QueryUser", this.user)
    }
  }
}
</script>

<style>
.query-input{
  width: 18%;
  margin-right: 10px;
}
.switch-group{
  display: flex;
  margin: 10px;
}
</style>