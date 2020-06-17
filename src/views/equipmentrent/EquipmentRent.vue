<template>
  <div>
    <bulletin ref="child"></bulletin>

    <!-- 器材查询 -->
    <div v-if="varShowES">
      <div class="container">
        <div class="row">
          <div class="col-md-8 my-sm-3">
            <button class="btn btn-outline-secondary" @click="funHiddenES">返回主页面</button>
          </div>
          <div class="col-md-2 my-sm-3"></div>
          <div class="col-md-2 my-sm-3">
            <modalER @ee="funShowE"></modalER>
          </div>
        </div>
      </div>

      <div>
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
              <td>{{showDate(equipment.equipmentTime)}}</td>
              <td>{{equipment.equipmentRenterId}}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <pagination />
      </div>
    </div>
    <div v-else>
      <button class="btn btn-outline-secondary" @click="funShowES">器材查询</button>
    </div>

    <!-- 器材回收 -->
    <div v-if="varShowERC">
      <button class="btn btn-outline-secondary" @click="funHiddenERC">返回主页面</button>
      <input v-model="modelERCId" placeholder="器材Id" />
      <button class="btn btn-outline-danger" @click="funSubmitERC">回收器材</button>
    </div>
    <div v-else>
      <button class="btn btn-outline-secondary" @click="funShowERC">器材回收</button>
    </div>
  </div>
</template>

<script>
import bulletin from "components/content/bulletin/Bulletin";
import Pagination from "components/common/pagination/Pagination";
import modalEA from "../equipmentmanage/childComps/modalEA";
import modalER from "../equipmentmanage/childComps/modalER";
import { DateFormat } from "../../common/util";

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
    bulletin,
    DateFormat,
    Pagination,
    modalEA,
    modalER
  },
  data() {
    return {
      equipments: [],

      varShowES: false,
      varShowEquipments: false,
      varShowERC: false,

      modelERCId: null
    };
  },
  mounted() {
    this.changeBulletin();
  },
  methods: {
    changeBulletin() {
      this.$refs.child.textArr = [
        { title: "器材租用收费标准一览" },
        { title: "羽毛球：1￥/天" },
        { title: "足球：1￥/天" },
        { title: "乒乓球：1￥/天" },
        { title: "网球：1￥/天" },
        { title: "篮球：1￥/天" },
        { title: "橄榄球：1￥/天" },
        { title: "排球：1￥/天" }
      ];
      this.$refs.child.rotateTime = 1000;
    },
    showDate(value) {
      if (value != "") {
        let date = new Date(value);
        return DateFormat(date, "yyyy.MM.dd h:mm:ss");
      } else {
        return "未被租借";
      }
    },
    // 器材查询功能
    funShowES: function() {
      this.varShowES = true;

      this.varShowERC = false;
      getEquipment().then(res => {
        this.equipments = res.equipments;
      });
    },
    funHiddenES: function() {
      this.varShowEquipments = false;
      this.varShowES = false;
    },

    funShowERC: function() {
      this.varShowERC = true;

      this.varShowES = false;
    },
    funHiddenERC: function() {
      this.varShowERC = false;
    },
    funSubmitERC: function() {
      recycleEquipment(this.modelERCId).then(res => {
        if (res.code == 200) {
          alert("可以啊");
          this.modelERCId = null;
        } else if (res.code == 404) {
          alert("你要回收哪个啊");
        } else {
          alert("韩币");
        }
      });
    }
  }
};
</script>

<style>
.equipment-manage {
  width: 100%;
}
</style>