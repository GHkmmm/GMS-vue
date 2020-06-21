<template>
  <div class="edit-equipment">
    <img src="~assets/img/back.svg" alt @click="backGameManage" />
   
      
    <nav class="navbar navbar-expand-lg navbar-light bg-blue">
  <span class="navbar-brand" >器材安排</span>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <td align="center" scope="col"></td>
    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">哈哈</button>
    <!--<ul class="navbar-nav ml-auto">

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

      
    </ul>-->
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="输入赛事ID" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">搜索</button>
    </form>
  </div>
</nav>

    
    
    <table class="table">
      <thead>
        <tr>
          <th scope="col">器材id</th>
          <th scope="col">器材名称</th>
          <th scope="col">租借者</th>
          <th scope="col">赛事Id</th>
          <th>
            
          </th>
          
        </tr>
      </thead>
      <tbody>
        <tr v-for="equipment in equipments" :key="equipment.key">
          <td scope="row">{{equipment.equipmentId}}</td>
          <td>{{equipment.equipmentName}}</td>
          <td>{{equipment.equipmentRenterId}}</td>
          <td>{{equipment.gameId}}</td>
          <td>
            <button type="button" class="btn btn btn-info" >添加</button>
            <button type="button" class="btn btn-outline-danger" >删除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { searchEquipmentByGameId,rentEquipment,recycleEquipment} from "network/equipmentManage";

export default {
  name: "EditEquipment",
  data() {
    return {
      equipments:[]
    };
  },
  created() {
    
  },
  mounted(){
    //this.searchEquipmentByGameId();
    searchEquipmentByGameId(
    ).then(res => {
      this.equipments = res.equipments;
    });
  },
  activated() {
    
  },
  methods: {
   

    //返回赛事管理
    backGameManage(){
        this.$router.push("race");
    }
  }
}
</script>

<style scoped>
.edit-form {
  padding: 10px;
}
.edit-equipment img {
  width: 40px;
  height: 40px;
}
</style>