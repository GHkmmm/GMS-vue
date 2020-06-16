<template>
  <div>
    <h3>搜索</h3>
    <div>
      <div class="d-flex">
        <input class="form-control query-input" placeholder="请输入用户名" v-model="username">
        <button class="btn btn-primary" @click="QueryUser">搜索</button>
      </div>
      <div class="switch-group">
        <or-switch @on="onlyManager" @off="getUser"/>
        <label class="form-check-label">
          只查看管理员用户
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
      username: ""
    }
  },
  components: {
    OrSwitch
  },
  methods: {
    onlyManager(){
      this.$emit("onlyManager")
    },
    getUser(){
      this.$emit("getUser")
    },
    QueryUser(){
      this.$emit("QueryUser", this.username)
    }
  }
}
</script>

<style>
.query-input{
  width: 200px;
  margin-right: 10px;
}
.switch-group{
  display: flex;
  margin: 10px;
}
</style>