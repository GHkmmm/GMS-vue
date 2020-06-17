<template>
  <div class="user-manage">
    <!-- <div class="form-check" @click="onlyManager">
      
      <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" v-model="isOnlyManager">

      <label class="form-check-label" for=" ">
        只查看管理员用户
      </label>

    </div> -->

 <nav class="navbar navbar-expand-lg navbar-light bg-blue">
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <!-- 左ul -->
    <ul class="navbar-nav mr-auto nav-ul">
      <li class="nav-item">
        <div class="text-primary"><span>总支出:</span><span >{{(totalPay/100).toFixed(2)}}￥</span></div>
        <div class="text-success"><span>总收入:</span><span >{{(totalRevenue/100).toFixed(2)}}￥</span></div>
      </li>
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
    </ul>
    <!-- 中间ul -->
    <ul class="navbar-nav ml-auto nav-ul">
      <li class="nav-item">
        <span>起始时间</span> 
        <div class="date-picker-container">
          <date-picker v-model="date" :config="options"></date-picker>
          </div>
      </li>

      <li class="nav-item dropdown ">
           <span>结束时间</span>
                  <div class="date-picker-container">
          <date-picker v-model="date" :config="options"></date-picker>
          </div>
      </li>

    </ul>
    <!-- 右ul -->
    <ul class="navbar-nav ml-auto nav-ul">

      <li>
        <span v-if="this.isSearchTradingId==true" class="title-span">搜索订单</span>
        <span v-if="this.isSearchTradingId==false" class="title-span">搜索用户</span>

        <div class="form-inline my-2 my-lg-0 d-flex">
          <input v-if="this.isSearchTradingId==true" v-model="tid" class="form-control mr-sm-2" type="search" placeholder="输入交易ID" aria-label="Search">
          <input v-if="this.isSearchTradingId==false" v-model="userId" class="form-control mr-sm-2" type="search" placeholder="输入用户ID" aria-label="Search">

          <or-switch @on="isSearchTradingIdTrue" @off="isSearchTradingIdFalse"/>

          <button v-if="this.isSearchTradingId==true" class="btn btn-success my-2 my-sm-0" type="submit" @click="tradingIdSearch">搜索</button>
          <button v-if="this.isSearchTradingId==false" class="btn btn-primary my-2 my-sm-0" type="submit" @click="tradingUserIdSearch">搜索</button>
        </div>
      </li>
    </ul>

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
          <th>
            <modalManage></modalManage>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(trading,index) in tradings" :key="trading.tradingId">
          <th scope="row">{{trading.tradingId}}</th>
          <td>{{trading.userId}}</td>
          <td>{{trading.tradingType|typeName}}</td>
          <td>{{showDate(trading.tradingTime)}}</td>
          <td>{{trading.counterParty}}</td>
          <td>{{(trading.transactionAmount/100).toFixed(2)}}</td>
          <td>{{trading.tradingContent}}</td>

          <td>
            <a class="mybtn btn btn-outline-primary btn-sm
            " href="#" @click="editInfo(user.userId,user.username,user.phoneNum,user.email,user.posId)">编辑</a>
            <a class="mybtn btn btn-outline-danger btn-sm" href="#" @click="deleteTrading(trading.tradingId,index)">删除</a>
            </td>
        </tr>
      </tbody>
    </table>
        <pagination :totalPage="this.totalPage" 
                @pageClick="pageClick"
                @Forward="Forward"
                @Backward="Backward"
                class="my-pagination" />
  </div>
</template>

<script>
import {searchTrading, addTrading, deleteTrading,totalAmount} from 'network/trading';

import Pagination from 'components/common/pagination/Pagination';
import {DateFormat} from 'common/util';
import OrSwitch from 'components/common/switch/Switch';
// Import required dependencies 
import 'bootstrap/dist/css/bootstrap.css';
// Import this component
import datePicker from 'vue-bootstrap-datetimepicker';
// Import date picker css
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';

import modalManage from './childComps/addModal';


export default {
  name: "tradingList",
  data(){
    return{
      tradings: [],
      totalPage:1,
      totalPay:0,
      totalRevenue:0,
      currentIndex: 0,
      searchTrdaingType:-1,
      searchTradingTimeBegin:-1,
      searchTradingTimeEnd:-1,
      searchUserId:-1,
      searchTradingId:-1,
      pagesize:8,
      tid:0,
      userId:0,
      isSearchTradingId:false,

      date: new Date(),
      options: {
      format: 'DD/MM/YYYY',
      useCurrent: false
      }
    }
  },
    components: {
    Pagination,
    datePicker,
    OrSwitch,
    modalManage
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
    this.totalAmount(1);
    this.totalAmount(2);
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
    isSearchTradingIdTrue(){
      this.isSearchTradingId=true;
    },
    isSearchTradingIdFalse(){
      this.isSearchTradingId=false;
    },
//组件
    // 时间戳
  showDate(value){
    let date=new Date(value*1000);
    return DateFormat(date,'yyyy-MM-dd');
  },
  // 时间戳结束

//组件结束
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
        if (res.code == 200) {
          this.tradings = res.tradingList
          this.totalPage = res.page;
          this.$toast.suc("加载完成")
        }else{
          this.$toast.err(res.msg)
        }
      })
    },
    deleteTrading(tradingId,index){
      deleteTrading(tradingId).then(res=>{
        if(res.code == 200){
          this.$toast.suc(res.msg);
          this.tradings.splice(index,1)
          this.totalAmount(1);
          this.totalAmount(2);
        }else{
          this.$toast.err(res.msg)
        }
      })
    },
    totalAmount (tradingType){
      totalAmount(tradingType).then(res=>{
          if (tradingType==1) {
            this.totalPay=res.total;
          }
          if (tradingType==2) {
            this.totalRevenue=res.total;
          }
      })
    },
    // 查询方法
    //查询交易类型
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
      this.currentIndex=0
      this.searchTrading(this.searchTradingId,this.searchUserId,this.searchTrdaingType,this.searchTradingTimeBegin,this.searchTradingTimeEnd,this.currentIndex);
      
    },
    //查询交易id
    tradingIdSearch(){
      this.searchTradingId=this.tid;
      this.currentIndex=0;
      this.searchTrading(this.searchTradingId,this.searchUserId,this.searchTrdaingType,this.searchTradingTimeBegin,this.searchTradingTimeEnd,this.currentIndex)
    },
    // 根据用户id查询
    tradingUserIdSearch(){
      this.searchUserId=this.userId;
      this.currentIndex=0;
      this.searchTrading(this.searchTradingId,this.searchUserId,this.searchTrdaingType,this.searchTradingTimeBegin,this.searchTradingTimeEnd,this.currentIndex)
    }
    // 查询方法结束
    // 网络请求结束
  }
}
</script>

<style>
.mybtn{
  margin-right: 5px;
}
.nav-ul>li{
  margin-right: 5px;
}
.btn-switch-content{
  display: flex;
}
.title-span{
  display: block
}
.date-picker-container {

}

.date-picker-container .datepicker-inline {
    width: 100%;
    height: 100%;
}
.date-picker-container .table-condensed {
width: 100%;
height: 100%;
}
</style>