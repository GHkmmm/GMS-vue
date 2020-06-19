<template>
  <div>
    <bulletin ref="child"></bulletin>

    <!-- 器材查询 -->
    <div>
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
            <tr v-for="equipment in equipmentsShow" :key="equipment.key">
              <th scope="row">{{equipment.equipmentId}}</th>
              <td>{{equipment.equipmentName}}</td>
              <td>{{equipment.equipmentCost}}</td>
              <td>{{equipment.equipmentStatus}}</td>
              <td>{{showDate(equipment.equipmentTime)}}</td>
              <td>{{equipment.equipmentRenterId}}</td>
              <td>
                <button
                  class="btn btn-outline-success"
                  @click="funSubmitERC(equipment.equipmentId, equipment.equipmentStatus, equipment.equipmentRenterId, $index)"
                >回收</button>
                <button
                  class="btn btn-outline-secondary"
                  @click="funSubmitER(equipment.equipmentId, equipment.equipmentStatus, $store.state.user.userId, $index)"
                >租用</button>
              </td>
            </tr>
          </tbody>
        </table>
        <pagination
          :totalPage="this.totalPage"
          @pageClick="pageClick"
          @Forward="Forward"
          @Backward="Backward"
        />
      </div>
    </div>
  </div>
</template>

<script>
import bulletin from "components/content/bulletin/Bulletin";
import Pagination from "components/common/pagination/Pagination";
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
    Pagination
  },
  data() {
    return {
      equipments: [],
      equipmentsShow: [],

      varShowES: false,
      varShowEquipments: false,
      varShowERC: false,

      page: 9,
      totalNumber: 0,
      totalPage: 1,
      currentPage: 1
    };
  },
  created() {
    getEquipment().then(res => {
      this.equipments = res.equipments;
      this.equipmentsShow = res.equipments;
      this.totalPage = Math.ceil(this.equipments.length / this.page);
      this.totalNumber = this.equipments.length;
      this.showEquipments();
      getEquipment().then(res => {
        this.equipments = res.equipments;
      });
    });
  },
  mounted() {
    this.changeBulletin();
  },
  methods: {
    showEquipments() {
      //先切尾巴再切头，不然长度有影响
      this.equipmentsShow.splice(
        this.currentPage * this.page,
        this.equipments.length - this.currentPage * this.page
      );
      this.equipmentsShow.splice(0, this.currentPage * this.page - this.page);
    },
    Forward() {
      if (
        this.currentPage > 1 &&
        this.equipments.length > this.page &&
        this.totalNumber > this.page
        //this.page这个数字是因为有时按太快，切割完表格后还未更新又再次切割，会导致表格消失
      ) {
        getEquipment().then(res => {
          this.equipments = res.equipments;
        });
        this.currentPage -= 1;
        this.equipmentsShow = this.equipments;
        this.showEquipments();
      } else if (this.currentPage > 1) {
        alert("你按太快了");
        getEquipment().then(res => {
          this.equipments = res.equipments;
        });
      } else {
        alert("你在第一页还按上一页，你觉得很好玩吗");
      }
    },
    Backward() {
      if (
        this.currentPage < this.totalPage &&
        this.equipments.length > this.page &&
        this.totalNumber > this.page
      ) {
        getEquipment().then(res => {
          this.equipments = res.equipments;
        });
        this.currentPage += 1;
        this.equipmentsShow = this.equipments;
        this.showEquipments();
      } else if (this.currentPage < this.totalPage) {
        alert("你按太快了");
        getEquipment().then(res => {
          this.equipments = res.equipments;
        });
      } else {
        alert("你在最后一页还按下一页，你觉得很好玩吗");
      }
    },
    pageClick(index) {
      if (this.equipments.length > this.page && this.totalNumber > this.page) {
        this.currentPage = index + 1;
        getEquipment().then(res => {
          this.equipments = res.equipments;
        });
        this.equipmentsShow = this.equipments;
        this.showEquipments();
      } else {
        this.currentPage = index + 1;
        getEquipment().then(res => {
          this.equipments = res.equipments;
          this.equipmentsShow = res.equipments;
          this.showEquipments();
        });
      }
    },

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
      getEquipment().then(res => {
        this.equipments = res.equipments;
        this.equipmentsShow = res.equipments;
        this.totalPage = Math.ceil(this.equipments.length / this.page);
        this.totalNumber = this.equipments.length;
        this.showEquipments();
        getEquipment().then(res => {
          this.equipments = res.equipments;
        });
      });
    },

    // 器材回收功能
    funSubmitERC: function(id, Status, RenterId, index) {
      if (Status == "free" || Status == "repair") {
        alert("都没被借，你回收个🐓啊");
      } else if (RenterId != this.$store.state.user.userId) {
        alert("不是你借的，回收个🔨啊？");
      } else if (confirm("是否要回收") == true) {
        recycleEquipment(id).then(res => {
          if (res.code == 200) {
            alert("回收成功，请稍等列表更新");
            getEquipment().then(res => {
              this.equipments = res.equipments;
              this.totalPage = Math.ceil(this.equipments.length / this.page);
              if (this.currentPage > this.totalPage) {
                this.currentPage = this.totalPage;
              }
              getEquipment().then(res => {
                this.equipmentsShow = res.equipments;
                this.showEquipments();
              });
            });
          } else if (res.code == 404) {
            alert("求你写点东西");
          } else {
            alert("速度爬");
          }
        });
      }
    },

    // 器材租用功能
    funSubmitER: function(id, Status, RenterId, index) {
      if (Status == "repair" || Status == "rent") {
        alert("被借了还是修着，你借屁啊");
      } else if (confirm("是否要租借") == true) {
        rentEquipment(id, RenterId).then(res => {
          if (res.code == 200) {
            alert("回收成功，请稍等列表更新");
            getEquipment().then(res => {
              this.equipments = res.equipments;
              this.totalPage = Math.ceil(this.equipments.length / this.page);
              if (this.currentPage > this.totalPage) {
                this.currentPage = this.totalPage;
              }
              getEquipment().then(res => {
                this.equipmentsShow = res.equipments;
                this.showEquipments();
              });
            });
          } else if (res.code == 404) {
            alert("求你写点东西");
          } else {
            alert("速度爬");
          }
        });
      }
    }
  }
};
</script>

<style>
.equipment-manage {
  width: 100%;
}
</style>