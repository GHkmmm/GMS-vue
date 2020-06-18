<template>
  <div class="user-manage">
    <filter-user @getUser="getUser(0)"
                 @onlyManager="onlyManager"
                 @onlyDeletedUsers="onlyDeletedUsers"
                 @QueryUser="QueryUser" />
    <user-table :users="users"
                :isDeleted="isDeleted"
                @editInfo="editInfo"
                @deleteUser="deleteUser"
                @rollbackUser="rollbackUser" />
    <pagination :totalPage="totalPage" 
                @pageClick="pageClick"
                @Forward="Forward"
                @Backward="Backward"
                class="my-pagination"
                v-if="users.length!=0" />
  </div>
</template>

<script>
import FilterUser from './childComps/FilterUser';
import UserTable from './childComps/UserTable';
import Pagination from 'components/common/pagination/Pagination';
import { getUser, deleteUser, queryUser, getDeletedUsers, rollbackUser } from 'network/userManage';

export default {
  name: "UserManage",
  data(){
    return{
      users: [],
      totalPage: 1,
      currentIndex: 0,
      isDeleted: false
    }
  },
  components: {
    FilterUser,
    UserTable,
    Pagination
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

    /**
     * 网络请求相关方法
     */
    getUser(page){
      this.isDeleted = false;
      getUser(page).then(res => {
        this.users = res.users
        this.totalPage = res.totalPage;
      })
    },
    deleteUser(userId){
      deleteUser(userId).then(res=>{
        if(res.code == 200){
          this.$toast.suc("删除成功")
          this.getUser(this.currentIndex);
        }else{
          this.$toast.err("删除失败")
        }
      })
    },
    rollbackUser(userId){
      rollbackUser(userId).then(res => {
        if(res.code==200){
          this.$toast.suc("撤回成功")
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