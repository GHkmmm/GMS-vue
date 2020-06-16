<template>
  <div class="user-manage">
    <!-- <div class="form-check" @click="onlyManager">
      
      <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" v-model="isOnlyManager">

      <label class="form-check-label" for=" ">
        只查看管理员用户
      </label>

    </div> -->

    <div class="label-head">
      <button>新增交易</button>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">交易ID</th>
          <th scope="col">交易用户</th>
          <th scope="col">交易类型</th>
          <th scope="col">交易时间</th>
          <th scope="col">交易方</th>
          <th scope="col">金额</th>
          <th scope="col">内容</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="trading in tradings" :key="trading.key">
          <th scope="row">{{trading.tradingId}}</th>
          <td>{{trading.userId}}</td>
          <td>{{trading.tradingType|typeName}}</td>
          <td>{{trading.tradngTime}}</td>
          <td>{{trading.counterParty}}</td>
          <td>{{trading.transactionAmount}}</td>
          <td>{{trading.tradingContent}}</td>

          <td><a href="#" @click="editInfo(user.userId,user.username,user.phoneNum,user.email,user.posId)">编辑</a></td>

          <td><a href="#" @click="deleteTrading(trading.tradingId,$index)">删除</a></td>
        </tr>
      </tbody>
    </table>
        <pagination :totalPage="totalPage" 
                @pageClick="pageClick"
                @Forward="Forward"
                @Backward="Backward"
                class="my-pagination" />
  </div>
</template>

<script>
import { searchTrading, addTrading, deleteTrading, } from 'network/trading';
import Pagination from 'components/common/pagination/Pagination';

export default {
  name: "tradingList",
  data(){
    return{
      tradings: [],
      totalpage:1,
      currentIndex: 0,
      isOnlyManager: false
    }
  },
    components: {
    Pagination
  },
  filters: {
    typeName(tradingType){
      switch(tradingType){
        case 1:
          return "支出";
          break;
        case 2:
          return "收入";
          break;
      }
    }
  },
  created(){
    this.searchTrading(-1,-1,-1,-1,0);
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
  pageClick(index){
    this.currentIndex = index*10
    this.searchTrading(-1,-1,-1,-1,currentIndex);
  },
  Forward(){
    this.currentIndex=this.currentIndex-10;
    this.searchTrading(-1,-1,-1,-1,this.currentIndex)
  },
  Backward(){
    this.currentIndex=this.currentIndex+10;
    this.searchTrading(-1,-1,-1,-1,this.currentIndex)
  },
    /**
     * 网络请求相关方法
     */
    searchTrading(tradingId,userId,tradingType,tradingTime,count){
      searchTrading(tradingId,userId,tradingType,tradingTime,count).then(res => {
        this.tradings = res.tradingList
        this.totalPage = res.page;
      })
    },
    deleteTrading(tradingId,index){
      deleteTrading(tradingId).then(res=>{
        if(res.code == 200){
          this.$toast.suc(res.msg)
          this.tradings.splice(index,1)
        }else{
          this.$toast.err(res.msg)
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

</style>