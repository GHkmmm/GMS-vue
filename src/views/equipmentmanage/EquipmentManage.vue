<template>
  <div>
    <!-- 器材查询 -->
    <div v-if="showEquipmentSearch">
      <button class="btn btn-outline-secondary" @click="HiddenES">返回主页面</button>
      <div v-if="showEquipments">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">器材名称</th>
              <th scope="col">器材费用（元/天）</th>
              <th scope="col">器材状态</th>
              <th scope="col">器材租借时间</th>
              <th scope="col">器材租界人Id</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="equipment in equipments" :key="equipment.key">
              <th scope="row">{{equipment.equipmentId}}</th>
              <td>{{equipment.equipmentName}}</td>
              <td>{{equipment.equipmentCost}}</td>
              <td>{{equipment.equipmentStatus}}</td>
              <td>{{equipment.equipmentTime}}</td>
              <td>{{equipment.equipmentRenterId}}</td>
            </tr>
          </tbody>
        </table>
        <button class="btn btn-outline-secondary" @click="HiddenE">隐藏表格</button>
      </div>
      <div v-else>
        <button class="btn btn-outline-secondary" @click="ShowE">查询全部</button>
      </div>
    </div>
    <div v-else>
      <button class="btn btn-outline-secondary" @click="ShowES">器材查询</button>
    </div>

    <!-- 器材新增 -->
    <div v-if="showEquipmentAdd">
      <button class="btn btn-outline-secondary" @click="HiddenEA">返回主页面</button>
      <input v-model="modelEquipmentAddId" placeholder="器材Id（建议使用规范名称）"/>
      <input v-model="modelEquipmentAddName" placeholder="器材名称类型"/>
      <input v-model="modelEquipmentAddCost" placeholder="器材租借费用"/>
      <button class="btn btn-outline-danger" @click="SubmitEA">提交新增器材</button>
    </div>
    <div v-else>
      <button class="btn btn-outline-secondary" @click="ShowEA">器材新增</button>
    </div>

    <!-- 器材删除 -->
    <div v-if="showEquipmentDelete">
      <button class="btn btn-outline-secondary" @click="HiddenED">返回主页面</button>
      <input v-model="modelEquipmentDeleteId" placeholder="器材Id"/>
      <button class="btn btn-outline-danger" @click="SubmitED">删除器材</button>
    </div>
    <div v-else>
      <button class="btn btn-outline-secondary" @click="ShowED">器材删除</button>
    </div>

    <!-- 器材租用 -->
    <div v-if="showEquipmentRent">
      <button class="btn btn-outline-secondary" @click="HiddenER">返回主页面</button>
      <input v-model="modelEquipmentRentId" placeholder="器材Id"/>
      <input v-model="modelEquipmentRentRenterId" placeholder="用户Id"/>
      <button class="btn btn-outline-danger" @click="SubmitER">租借器材</button>
    </div>
    <div v-else>
      <button class="btn btn-outline-secondary" @click="ShowER">器材租用</button>
    </div>

    <!-- 器材回收 -->
    <div v-if="showEquipmentRecycle">
      <button class="btn btn-outline-secondary" @click="HiddenERC">返回主页面</button>
      <input v-model="modelEquipmentRecycleId" placeholder="器材Id"/>
      <button class="btn btn-outline-danger" @click="SubmitERC">回收器材</button>
    </div>
    <div v-else>
      <button class="btn btn-outline-secondary" @click="ShowERC">器材回收</button>
    </div>
  </div>
</template>

<script>
import { getEquipment, addEquipment, deleteEquipment, rentEquipment, recycleEquipment } from "network/equipmentManage";

export default {
  name: "EquipmentManage",
  data() {
    return {
      equipments: [],

      showEquipmentSearch:false,
      showEquipments: false,

      showEquipmentAdd:false,

      showEquipmentDelete:false,

      showEquipmentRent:false,

      showEquipmentRecycle:false
    };
  },
  // filters: {
  //   userPos(id){
  //     switch(id){
  //       case 1:
  //         return "超级用户";
  //         break;
  //       case 2:
  //         return "体育馆管理专员";
  //         break;
  //       case 3:
  //         return "普通用户";
  //         break;
  //     }
  //   }
  // },
  created() {
    
  },
  methods: {
    ShowE: function() {
      getEquipment().then(res => {
      this.equipments = res.equipments;
    });
      this.showEquipments = true;
    },
    HiddenE: function() {
      this.showEquipments = false;
    },
    ShowES: function() {
      this.showEquipmentSearch = true;

      this.showEquipmentAdd = false;
      this.showEquipmentDelete = false;
      this.showEquipmentRent = false;
      this.showEquipmentRecycle = false;
    },
    HiddenES: function() {
      this.showEquipments = false;
      this.showEquipmentSearch = false;
    },

    ShowEA: function() {
      this.showEquipmentAdd = true;

      this.showEquipmentSearch = false;
      this.showEquipmentDelete = false;
      this.showEquipmentRent = false;
      this.showEquipmentRecycle = false;
    },
    HiddenEA: function() {
      this.showEquipmentAdd = false;
    },
    SubmitEA: function(){
      addEquipment(this.modelEquipmentAddId,this.modelEquipmentAddName,this.modelEquipmentAddCost).then(res => {
      if(res.code == 200){
            alert("可以啊");
          }else{
            alert("不行啊");
          }
      })
      this.modelEquipmentAddId = null;
      this.modelEquipmentAddName = null;
      this.modelEquipmentAddCost = null;
    },

    ShowED: function() {
      this.showEquipmentDelete = true;

      this.showEquipmentSearch = false;
      this.showEquipmentAdd = false;
      this.showEquipmentRent = false;
      this.showEquipmentRecycle = false;
    },
    HiddenED: function() {
      this.showEquipmentDelete = false;
    },
    SubmitED: function(){
      deleteEquipment(this.modelEquipmentDeleteId).then(res => {
      if(res.code == 200){
            alert("可以啊");
          }else{
            alert("不行啊");
          }
      })

      this.modelEquipmentDeleteId = null;
    },

    ShowER: function() {
      this.showEquipmentRent = true;

      this.showEquipmentSearch = false;
      this.showEquipmentAdd = false;
      this.showEquipmentDelete = false;
      this.showEquipmentRecycle = false;
    },
    HiddenER: function() {
      this.showEquipmentRent = false;
    },
    SubmitER: function(){
      rentEquipment(this.modelEquipmentRentId,this.modelEquipmentRentRenterId).then(res => {
      if(res.code == 200){
            alert("可以啊");
          }else{
            alert("不行啊");
          }
      })

      this.modelEquipmentRentId = null;
      this.modelEquipmentRentRenterId = null;
    },


    ShowERC: function() {
      this.showEquipmentRecycle = true;

      this.showEquipmentSearch = false;
      this.showEquipmentAdd = false;
      this.showEquipmentDelete = false;
      this.showEquipmentRent = false;
    },
    HiddenERC: function() {
      this.showEquipmentRecycle = false;
    },
    SubmitERC: function(){
      recycleEquipment(this.modelEquipmentRecycleId).then(res => {
      if(res.code == 200){
            alert("可以啊");
          }else{
            alert("不行啊");
          }
      })
      this.modelEquipmentRecycleId = null;
    }
  }
};
</script>

<style>
.equipment-manage {
  width: 80%;
}
</style>