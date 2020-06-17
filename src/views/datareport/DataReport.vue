<template>
  <div class="user-manage">
    <!-- <div class="form-check" @click="onlyManager">
      
      <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" v-model="isOnlyManager">

      <label class="form-check-label" for=" ">
        只查看管理员用户
      </label>

    </div> -->

 <nav class="navbar navbar-expand-lg navbar-light bg-blue">
  <span class="navbar-brand" >账单</span>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav ml-auto">

      <li class="nav-item dropdown ">
        <a class="nav-link dropdown-toggle text-dark" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span>交易类型:</span>
          {{searchTrdaingType|typeName}}
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#" @click="allType()">所有</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#" @click="onlyPay()">支出</a>
          <a class="dropdown-item" href="#" @click="onlyRevenue()">收入</a>
        </div>
      </li>

      <li class="nav-item dropdown ">
        <a class="nav-link dropdown-toggle text-dark" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          起始时间
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">所有</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#" >支出</a>
          <a class="dropdown-item" href="#" >收入</a>
        </div>
      </li>

      <li class="nav-item dropdown ">
        <a class="nav-link dropdown-toggle text-dark" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          结束时间
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">所有</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">支出</a>
          <a class="dropdown-item" href="#">收入</a>
        </div>
      </li>

      
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="输入交易ID" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">搜索</button>
    </form>
  </div>
</nav>

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

          <td>
            <a class="mybtn btn btn-outline-primary btn-sm
            " href="#" @click="editInfo(user.userId,user.username,user.phoneNum,user.email,user.posId)">编辑</a>
            
            <a class="mybtn btn btn-outline-danger btn-sm" href="#" @click="deleteTrading(trading.tradingId,$index)">删除</a>
            </td>
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
      searchTrdaingType:-1,
      searchTradingTimeBegin:-1,
      searchTradingTimeEnd:-1,
      searchUserId:-1,
      searchTradingId:-1,
      pagesize:8,
      isOnlyManager: false
    }
  },
    components: {
    Pagination
  },
  filters: {
    typeName(tradingType){
      switch(tradingType){
        case -1:
          return "所有";
          break;
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
    this.searchTrading(this.searchTradingId,this.searchUserId,this.searchTrdaingType,this.searchTradingTimeBegin,this.searchTradingTimeEnd,this.currentIndex);
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
// 翻页
  pageClick(index){
    this.searchTrading(this.searchTradingId,this.searchUserId,this.searchTrdaingType,this.searchTradingTimeBegin,this.searchTradingTimeEnd,index*this.pagesize);
  },
  Forward(){
    this.currentIndex=this.currentIndex-this.pagesize;
    this.searchTrading(this.searchTradingId,this.searchUserId,this.searchTrdaingType,this.searchTradingTimeBegin,this.searchTradingTimeEnd,this.currentIndex)
  },
  Backward(){
    this.currentIndex=this.currentIndex+this.pagesize;
    this.searchTrading(this.searchTradingId,this.searchUserId,this.searchTrdaingType,this.searchTradingTimeBegin,this.searchTradingTimeEnd,this.currentIndex)
  },
  // 翻页结束

// 网络请求
    searchTrading(tradingId,userId,tradingType,tradingTimeBegin,tradingTimeEnd,count){
      searchTrading(tradingId,userId,tradingType,tradingTimeBegin,tradingTimeEnd,count).then(res => {
        this.tradings = res.tradingList
        this.totalPage = res.page;
        this.$toast.suc(res.msg)
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
    allType(){
      this.searchTrdaingType=-1;
      this.searchTrading(this.searchTradingId,this.searchUserId,this.searchTrdaingType,this.searchTradingTimeBegin,this.searchTradingTimeEnd,this.currentIndex);
      this.currentIndex=0
    },
    onlyPay(){
      this.searchTrdaingType=1;
      this.searchTrading(this.searchTradingId,this.searchUserId,this.searchTrdaingType,this.searchTradingTimeBegin,this.searchTradingTimeEnd,this.currentIndex);
      this.currentIndex=0
      
    },
    onlyRevenue(){
      this.searchTrdaingType=2;
      this.searchTrading(this.searchTradingId,this.searchUserId,this.searchTrdaingType,this.searchTradingTimeBegin,this.searchTradingTimeEnd,this.currentIndex);
      this.currentIndex=0
    }
    // 网络请求结束
  }
}
</script>

<style>
.mybtn{
  margin-right: 5px;
}
</style>