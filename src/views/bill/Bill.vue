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
      <li class="nav-item dropdown timeSelect">
        <span>起始时间</span>
        <a class="nav-link dropdown-toggle text-dark" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {{dateBegin|TimeName}}
        </a> 
        <div class="dropdown-menu " aria-labelledby="navbarDropdown">
        <a class="dropdown-item" href="#" @click="allTime()">所有</a>
        <div class="dropdown-divider"></div>
        <div class="dropdown-item date-picker-container">
          <date-picker placeholder="请选择时间" v-model="dateBegin" :config="options"></date-picker>
        </div>
        </div>
      </li>

      <li class="nav-item dropdown timeSelect">
        <span>结束时间</span>
        <a class="nav-link dropdown-toggle text-dark" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {{dateEnd|TimeName}}
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#" @click="allTime()">所有</a>
          <div class="dropdown-divider"></div>
          <div class="dropdown-item date-picker-container">
            <div class="dropdown-divider"></div>
            <date-picker placeholder="请选择时间" v-model="dateEnd" :config="options"></date-picker>
          </div>
        </div>
      </li>
      <li>
        <button class="btn btn-primary my-refresh-btn" type="submit" @click="tradingMixSearch">时间搜索</button>
      </li>

    </ul>
    <!-- 右ul -->
    <ul class="navbar-nav ml-auto nav-ul">

      <li>
        <span v-if="this.isSearchTradingId==true" class="title-span">搜索订单</span>

        <div class="form-inline my-2 my-lg-0 d-flex">
          <input v-if="this.isSearchTradingId==true" v-model="tid" class="form-control mr-sm-2" type="search" placeholder="输入交易ID" aria-label="Search">


          <button class="btn btn-success my-2 my-sm-0" type="submit" @click="tradingIdSearch">搜索</button>
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
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="trading in tradings" :key="trading.tradingId">
          <th scope="row">{{trading.tradingId}}</th>
          <td>{{trading.userId}}</td>
          <td>{{trading.tradingType|typeName}}</td>
          <td>{{showDate(trading.tradingTime)}}</td>
          <td>{{trading.counterParty}}</td>
          <td>{{(trading.transactionAmount/100).toFixed(2)}}</td>
          <td>{{trading.tradingContent}}</td>
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
      searchUserId:this.$store.state.user.userId,
      searchTradingId:-1,
      pagesize:8,
      tid:"",
      userId:"",
      isSearchTradingId:true,//搜索tradingID
      isSearchAllTime:true,//搜索所有时间


      dateBegin:"",
      dateEnd:"",
      options: {
      format: 'YYYY/MM/DD',
      locale: 'zh-cn',
      useCurrent: false
      }
    }
  },
    components: {
    Pagination,
    datePicker,
    OrSwitch
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
    },
    TimeName(time){
      if(time==-1){
        return "所有"
      }else if(time==""){
        return "所有"
        }else{
        return time
      }
    }
  },
  created(){
    this.$progress.start()
    this.searchTrading(this.searchTradingId,this.searchUserId,this.searchTrdaingType,this.searchTradingTimeBegin,this.searchTradingTimeEnd,this.currentIndex);
    this.totalAmount(1);
    this.totalAmount(2);
  },
  methods: {
//搜索相关
    isSearchTradingIdTrue(){
      this.isSearchTradingId=true;
      this.searchUserId=-1;
    },
    isSearchTradingIdFalse(){
      this.isSearchTradingId=false;
      this.searchTradingId=-1;
    },
    allTime(){
      this.dateBegin=-1;
      this.dateEnd=-1;
      this.searchTradingTimeBegin=-1
      this.searchTradingTimeEnd=-1;
    },
    selectSearchTime(){
      if (this.dateBegin==""||this.dateBegin==-1) {
        this.dateBegin=this.dateEnd;
      }
      if (this.dateEnd==""||this.dateEnd==-1) {
        this.dateEnd=this.dateBegin;
      }
      this.searchTradingTimeBegin=this.dateBegin;
      this.searchTradingTimeEnd=this.dateEnd;
    },
//搜索结束
//组件
    // 时间戳
  showDate(value){
    let date=new Date(value*1000);
    return DateFormat(date,'yyyy-MM-dd hh:mm:ss');
  },
  DateToTimeStamp(timestr){
    Date.parse(timestr);
    return 
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
    //搜索方法
    searchTrading(tradingId,userId,tradingType,tradingTimeBegin,tradingTimeEnd,count){
      if (userId=="") {
        userId=-1;
      }
      searchTrading(tradingId,userId,tradingType,tradingTimeBegin,tradingTimeEnd,count).then(res => {
        if (res.code == 200) {
          this.tradings = res.tradingList
          this.totalPage = res.page;

          this.$progress.finished()

        }else if(res.code==201){
          this.$toast.err("无结果")
        }
        else{
          this.$toast.err(res.msg)
        }
      })
    },
    //删除方法
    deleteTrading(tradingId,index){
      deleteTrading(tradingId).then(res=>{
        if(res.code == 200){
          this.$toast.suc(res.msg);
          this.tradings.splice(index,1)
          this.totalAmount(1);
          this.totalAmount(2);
          this.searchTrading(this.searchTradingId,this.searchUserId,this.searchTrdaingType,this.searchTradingTimeBegin,this.searchTradingTimeEnd,this.currentIndex);
        }else{
          this.$toast.err(res.msg)
        }
      })
    },
    //查询总金额方法
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
      if (this.tid=="") {
        tid=-1
      }
      this.searchTradingId=this.tid;
      this.currentIndex=0;
      this.searchTrading(this.searchTradingId,this.searchUserId,this.searchTrdaingType,this.searchTradingTimeBegin,this.searchTradingTimeEnd,this.currentIndex)
    },
    // 混合条件搜索
    tradingMixSearch(){
      this.searchUserId=this.userId;
      if (this.dateBegin!=-1&&this.dateEnd!=-1) {
        this.searchTradingTimeBegin=Date.parse(this.dateBegin)/1000;
        this.searchTradingTimeEnd=(Date.parse(this.dateEnd)/1000)+86400;
      }else{
        this.searchTradingTimeBegin=this.dateBegin;
        this.searchTradingTimeEnd=this.dateEnd;
      }
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
.my-refresh-btn{
  margin-top: 20px;
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
.timeSelect{
  margin-left: 0px;
  width: 130px;
}
.date-picker-container {
  width: 190px;
}


</style>