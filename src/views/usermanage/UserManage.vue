<template>
  <div class="user-manage">
    <filter-user @getUser="getUser(0)"
                 @onlyManager="onlyManager"
                 @QueryUser="QueryUser" />
    <user-table :users="users"
                @editInfo="editInfo"
                @deleteUser="deleteUser"/>
    <pagination :totalPage="totalPage" 
                @pageClick="pageClick"
                @Forward="Forward"
                @Backward="Backward"
                class="my-pagination" />
  </div>
</template>

<script>
import FilterUser from './childComps/FilterUser';
import UserTable from './childComps/UserTable';
import Pagination from 'components/common/pagination/Pagination';
import { getUser, deleteUser, queryUser } from 'network/userManage';

export default {
  name: "UserManage",
  data(){
    return{
      users: [],
      totalPage: 1,
      currentIndex: 0
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
      getUser(page).then(res => {
        this.users = res.users
        this.totalPage = res.totalPage;
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
      queryUser("").then(res => {
          console.log(res);
          if(res.code==200){
            this.users= res.users;
          }
        })
    },
    QueryUser(username){
      queryUser(username).then(res => {
        this.users = res.users
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
  position: absolute;
  bottom: 0;
}
</style>