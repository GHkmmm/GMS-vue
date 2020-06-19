<template>
  <div>
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
    <!-- 右ul -->
    <ul class="navbar-nav ml-auto nav-ul">
      <li>
        <button class="btn btn-sm btn-success my-refresh-btn" @click="searchTrading(searchTradingId,searchUserId,searchTrdaingType,searchTradingTimeBegin,searchTradingTimeEnd,currentIndex)">刷新</button>
      </li>
      <li>
        <span class="title-span">搜索订单</span>
        <div class="form-inline my-2 my-lg-0 d-flex">
          <input v-model="tid" class="form-control mr-sm-2" type="search" placeholder="输入交易ID" aria-label="Search">
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
            <addModal></addModal>
            <changeModal v-if="isShowChangeModal" :aTrading="this.aTrading" @changeIsShowChangeModal="changeIsShowChangeModal()"></changeModal>
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
             <button class="mybtn btn btn-outline-primary btn-sm" @click="changeTradingS(trading)" >编辑</button>
            <a class="mybtn btn btn-outline-danger btn-sm" href="#" @click="deleteTrading(trading.tradingId,index)">删除</a>
            </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data(){
    return{
      
    }
  }
}
</script>

<style>
.mybtn{
  margin-right: 5px;
}
.my-refresh-btn{
  margin-top: 29px;
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
</style>