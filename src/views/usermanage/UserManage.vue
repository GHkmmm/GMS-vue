<template>
  <div class="user-manage">
    <filter-user @getUser="getUser(0)"
                 @onlyManager="onlyManager"
                 @onlyDeletedUsers="onlyDeletedUsers"
                 @QueryUser="QueryUser" />
    <user-table :users="users"
                :isDeleted="isDeleted"
                :isShowTip="isShowTip"
                @editInfo="editInfo"
                @showAddManagerWindow="showAddManagerWindow"
                @deleteUser="deleteUser"
                @rollbackUser="rollbackUser" />
    <pagination :totalPage="totalPage" 
                :currentIndex="currentIndex"
                @pageClick="pageClick"
                @Forward="Forward"
                @Backward="Backward"
                class="my-pagination"
                v-if="users.length!=0" />

    <or-modal :height="450" :width="400" v-if="isShowModal" @CloseModalWindow="CloseModalWindow">
      <form @submit.prevent="AddManager">
        <div class="form-group">
          <label for="username">用户名</label>
          <input type="text" class="form-control btn-block" id="username" v-model="newManager.username">
        </div>
        <div class="form-group">
          <label for="phoneNum">手机号</label>
          <input type="text" class="form-control" id="phoneNum" v-model="newManager.phoneNum">
        </div>
        <div class="form-group">
          <label for="email">邮箱</label>
          <input type="text" class="form-control" id="email" v-model="newManager.email">
        </div>
        <button class="btn btn-primary" type="submit">新增管理员</button>
      </form>
    </or-modal>

  </div>
</template>

<script>
import FilterUser from './childComps/FilterUser';
import UserTable from './childComps/UserTable';
import Pagination from 'components/common/pagination/Pagination';
import OrModal from 'components/common/modal/Modal';
import { getUser, deleteUser, queryUser, getDeletedUsers, rollbackUser, addManager } from 'network/userManage';

export default {
  name: "UserManage",
  data(){
    return{
      users: [],
      totalPage: 1,
      currentIndex: 0,
      isDeleted: false,
      isShowTip: false,
      isShowModal: false,
      newManager:{
        username:"",
        phoneNum: "",
        email: ""
      }
    }
  },
  components: {
    FilterUser,
    UserTable,
    Pagination,
    OrModal
  },
  created(){
    this.getUser(this.currentIndex);
  },
  activated(){
    this.getUser(this.currentIndex);
  },
  methods: {
    editInfo(user){
      this.$router.push({
        path: 'editInfo',
        query: {
          userId:user.userId,
          username:user.username,
          phoneNum:user.phoneNum,
          email:user.email,
          posId:user.posId
        }
      })
    },
    pageClick(index){
      this.currentIndex = index
      this.getUser(index);
    },
    Forward(){
      if(this.currentIndex===0){
        this.$toast.warn("已经是第一页啦")
      }else{
        this.currentIndex--;
        this.getUser(this.currentIndex);
      }
    },
    Backward(){
      if(this.currentIndex===this.totalPage-1){
        this.$toast.warn("已经到结尾")
      }else {
        this.currentIndex++;
        this.getUser(this.currentIndex)
      }
    },
    showAddManagerWindow(){
      this.isShowModal = true;
    },
    CloseModalWindow(){
      this.isShowModal = false
    },

    /**
     * 网络请求相关方法
     */
    getUser(page){
      this.isShowTip = false;
      this.isDeleted = false;
      this.currentIndex = page;
      getUser(page).then(res => {
        this.users = res.users
        this.totalPage = res.totalPage;
      })
    },
    AddManager(){
      addManager(this.newManager.username,this.newManager.phoneNum,this.newManager.email).then(res => {
        if(res.code==200){
          this.$toast.suc("添加成功")
          this.CloseModalWindow();
        }
      })
    },
    deleteUser(userId){
      deleteUser(userId).then(res=>{
        if(res.code == 200){
          this.$toast.suc("删除成功")
          if(this.users.length==0&&this.currentIndex!=0){
            this.Forward();
          }else{
            this.getUser(this.currentIndex);
          }
        }else{
          this.$toast.err("删除失败")
        }
      })
    },
    rollbackUser(userId){
      rollbackUser(userId).then(res => {
        if(res.code==200){
          this.$toast.suc("撤回成功")
          console.log(this.users.length);
          console.log(this.currentIndex);
          if(this.users.length==0){
            this.currentIndex--;
            if(this.currentIndex==0){
              this.isShowTip = true;
            }
          }else{
            this.isShowTip = false;
          }
        }else{
          this.$toast.err("撤回失败")
        }
      })
    },
    onlyDeletedUsers(){
      this.isDeleted = true;
      getDeletedUsers().then(res => {
        console.log(res);
        this.users = res.users
        this.totalPage = res.totalPage
        this.currentIndex = 1;
        if(this.users.length==0){
          this.isShowTip = true;
        }
      })
    },
    onlyManager(){
      queryUser("","","","").then(res => {
          console.log(res);
          if(res.code==200){
            this.users= res.users;
            this.totalPage = res.totalPage;
          }
        })
    },
    QueryUser(user){
      console.log(user);
      queryUser(user.userId,user.username,user.phoneNum,user.email).then(res => {
        console.log(res);
        if(res.code==200){
          if(Array.isArray(res.users)){
            console.log(true);
            this.users = res.users
          }else{
            console.log(false);
            this.users=[];
            this.users.push(res.users);
          }
          this.totalPage = res.totalPage;
        }else{
          this.$toast.err("未找到结果");
        }
      })
    }
  }
}
</script>

<style>
.user-manage{
  width: 80%;
  position: relative;
}
.my-pagination{
  width: 100%;
}
</style>