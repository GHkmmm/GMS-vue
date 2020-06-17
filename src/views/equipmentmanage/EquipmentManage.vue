<template>
  <div>
    <bulletin ref="child"></bulletin>
    <div class="container">
      <div class="row">
        <!-- 器材查询 -->
        <div v-if="varShowES" class="col-md-12">
          <button class="btn btn-outline-secondary" @click="funHiddenES">返回主页面</button>
          <div v-if="varShowEquipments">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">id</th>
                  <th scope="col">器材名称</th>
                  <th scope="col">器材费用（元/天）</th>
                  <th scope="col">器材状态</th>
                  <th scope="col">器材租借时间</th>
                  <th scope="col">器材租界人Id</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
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
                  <td>
                    <button class="btn btn-outline-primary">编辑</button>
                  </td>
                  <td>
                    <button class="btn btn-outline-danger" @click="funWarning">删除</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <button class="btn btn-outline-secondary" @click="funHiddenE">隐藏表格</button>
          </div>
          <div v-else>
            <button class="btn btn-outline-secondary" @click="funShowE">查询全部</button>
          </div>
        </div>
        <div v-else class="col-md-2">
          <button class="btn btn-outline-secondary" @click="funShowES">器材查询</button>
        </div>

        <!-- 器材新增 -->
        <div class="col-md-2">
          <div v-if="varShowEA">
            <button class="btn btn-outline-secondary" @click="funHiddenEA">返回主页面</button>
            <input v-model="modelEAId" placeholder="器材Id（建议使用规范名称）" />
            <input v-model="modelEAName" placeholder="器材名称类型" />
            <input v-model="modelEACost" placeholder="器材租借费用" />
            <button class="btn btn-outline-danger" @click="funSubmitEA">提交新增器材</button>
          </div>
          <div v-else>
            <button class="btn btn-outline-secondary" @click="funShowEA">器材新增</button>
          </div>
        </div>

        <!-- 器材删除 -->
        <div class="col-md-2">
          <div v-if="varShowED">
            <button class="btn btn-outline-secondary" @click="funHiddenED">返回主页面</button>
            <input v-model="modelEDId" placeholder="器材Id" />
            <button class="btn btn-outline-danger" @click="funSubmitED">删除器材</button>
          </div>
          <div v-else>
            <button class="btn btn-outline-secondary" @click="funShowED">器材删除</button>
          </div>
        </div>

        <!-- 器材租用 -->
        <div class="col-md-2">
          <div v-if="varShowER">
            <button class="btn btn-outline-secondary" @click="funHiddenER">返回主页面</button>
            <input v-model="modelERId" placeholder="器材Id" />
            <button class="btn btn-outline-danger" @click="funSubmitER">租借器材</button>
          </div>
          <div v-else>
            <button class="btn btn-outline-secondary" @click="funShowER">器材租用</button>
          </div>
        </div>

        <!-- 器材回收 -->
        <div class="col-md-2">
          <div v-if="varShowERC">
            <button class="btn btn-outline-secondary" @click="funHiddenERC">返回主页面</button>
            <input v-model="modelERCId" placeholder="器材Id" />
            <button class="btn btn-outline-danger" @click="funSubmitERC">回收器材</button>
          </div>
          <div v-else>
            <button class="btn btn-outline-secondary" @click="funShowERC">器材回收</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bulletin from "components/content/bulletin/Bulletin";
import {
  getEquipment,
  addEquipment,
  deleteEquipment,
  rentEquipment,
  recycleEquipment
} from "network/equipmentManage";

export default {
  name: "EquipmentManage",
  components: {
    bulletin
  },
  data() {
    return {
      equipments: [],

      varShowES: false,
      varShowEquipments: false,
      varShowEA: false,
      varShowED: false,
      varShowER: false,
      varShowERC: false
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
  mounted() {
    this.changeChild();
  },
  methods: {
    changeChild() {
      this.$refs.child.textArr = [
        { title: "器材租用收费标准一览" },
        { title: "羽毛球：1￥/天" },
        { title: "足球：1￥/天" },
        { title: "乒乓球：1￥/天" },
        { title: "网球：1￥/天" },
        { title: "篮球：1￥/天" },
        { title: "橄榄球：1￥/天" },
        { title: "排球：1￥/天" }
      ]; // 这句很重要
      this.$refs.child.rotateTime = 1000;
    },
    // 器材查询功能
    funShowE: function() {
      getEquipment().then(res => {
        this.equipments = res.equipments;
      });
      this.varShowEquipments = true;
    },
    funHiddenE: function() {
      this.varShowEquipments = false;
    },
    funShowES: function() {
      this.varShowES = true;

      this.varShowEA = false;
      this.varShowED = false;
      this.varShowER = false;
      this.varShowERC = false;
    },
    funHiddenES: function() {
      this.varShowEquipments = false;
      this.varShowES = false;
    },

    // 器材添加功能
    funShowEA: function() {
      this.varShowEA = true;

      this.varShowES = false;
      this.varShowED = false;
      this.varShowER = false;
      this.varShowERC = false;
    },
    funHiddenEA: function() {
      this.varShowEA = false;
    },
    funSubmitEA: function() {
      addEquipment(this.modelEAId, this.modelEAName, this.modelEACost).then(
        res => {
          if (res.code == 200) {
            alert("可以啊");
          } else if (res.code == 404) {
            alert("我求求你写全信息不然插入你妈呢");
          } else if (res.msg.mostSpecificCause.errorCode == 1062) {
            alert("你别弄你妈重复ID啊");
          } else {
            alert("你是怎么能弄到我都不知道为什么的错的");
          }
        }
      );
    },

    // 器材删除功能
    funShowED: function() {
      this.varShowED = true;

      this.varShowES = false;
      this.varShowEA = false;
      this.varShowER = false;
      this.varShowERC = false;
    },
    funHiddenED: function() {
      this.varShowED = false;
    },
    funSubmitED: function() {
      deleteEquipment(this.modelEDId).then(res => {
        if (res.code == 200) {
          alert("可以啊");
        } else if (res.code == 404) {
          alert("求你写点东西");
        } else {
          alert("速度爬");
        }
      });

    },

    funShowER: function() {
      this.varShowER = true;

      this.varShowES = false;
      this.varShowEA = false;
      this.varShowED = false;
      this.varShowERC = false;
    },
    funHiddenER: function() {
      this.varShowER = false;
    },
    funSubmitER: function() {
      rentEquipment(this.modelERId, this.$store.state.user.userId).then(res => {
        if (res.code == 200) {
          alert("可以啊");
        } else if (res.code == 404) {
          alert("你要租什么啊");
        } else {
          alert("爬爬爬");
        }
      });
    },

    funShowERC: function() {
      this.varShowERC = true;

      this.varShowES = false;
      this.varShowEA = false;
      this.varShowED = false;
      this.varShowER = false;
    },
    funHiddenERC: function() {
      this.varShowERC = false;
    },
    funSubmitERC: function() {
      recycleEquipment(this.modelERCId).then(res => {
        if (res.code == 200) {
          alert("可以啊");
        } else 
        if(res.code == 404){
          alert("你要回收哪个啊");
        } else
        {alert("韩币")};
      });
    },
    funWarning: function() {
      alert("我建议你右转器材删除模块");
    }
  }
};
</script>

<style>
.equipment-manage {
  width: 100%;
}
</style>