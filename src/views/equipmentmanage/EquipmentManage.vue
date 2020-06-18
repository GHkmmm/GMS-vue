<template>
  <div>
    <bulletin ref="child"></bulletin>
    <nav class="navbar navbar-expand-lg navbar-light bg-blue">
      <span class="navbar-brand">账单</span>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle text-dark"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span>交易类型:</span>
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="#">所有</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">支出</a>
              <a class="dropdown-item" href="#">收入</a>
            </div>
          </li>

          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle text-dark"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >起始时间</a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="#">所有</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">支出</a>
              <a class="dropdown-item" href="#">收入</a>
            </div>
          </li>

          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle text-dark"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >结束时间</a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="#">所有</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">支出</a>
              <a class="dropdown-item" href="#">收入</a>
            </div>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="输入交易ID"
            aria-label="Search"
          />
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">搜索</button>
        </form>
      </div>
    </nav>

    <!-- 器材查询 -->
    <div>
      <div class="container">
        <div class="row">
          <div class="col-md-8 my-sm-2"></div>
          <div class="col-md-2 my-sm-2">
            <modalEA @ee="funShowES"></modalEA>
          </div>
          <div class="col-md-2 my-sm-2">
            <modalER @ee="funShowES"></modalER>
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
            <tr v-for="equipment in equipmentsShow" :key="equipment.key">
              <th scope="row">{{equipment.equipmentId}}</th>
              <td>{{equipment.equipmentName}}</td>
              <td>{{equipment.equipmentCost}}</td>
              <td>{{equipment.equipmentStatus}}</td>
              <td>{{showDate(equipment.equipmentTime)}}</td>
              <td>{{equipment.equipmentRenterId}}</td>
              <td>
                <button class="btn btn-outline-primary">编辑</button>
                <button
                  class="btn btn-outline-danger"
                  @click="funSubmitED(equipment.equipmentId,$index)"
                >删除</button>
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
import modalEA from "./childComps/modalEA";
import modalER from "./childComps/modalER";
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
      equipmentsShow: [],

      varShowES: false,
      varShowEquipments: false,
      varShowERC: false,

      modelERCId: null,

      page: 10,
      totalPage: 1,
      currentPage: 1
    };
  },
  created() {
    getEquipment().then(res => {
      this.equipments = res.equipments;
      this.equipmentsShow = res.equipments;
      this.totalPage = Math.ceil(this.equipments.length / this.page);
      this.showEquipments();
    });
  },
  mounted() {
    this.changeBulletin();
  },
  methods: {
    showEquipments() {
      //先切尾巴再切头，不然长度有影响
        this.equipmentsShow.splice(this.currentPage*this.page, this.equipments.length - this.currentPage*this.page);
        this.equipmentsShow.splice(0, this.currentPage*this.page - 10);
    },
    Forward() {
      if (this.currentPage > 1) {
        this.currentPage -= 1;
        console.log("第" + this.currentPage + "页");
        console.log(this.equipments.length);
        getEquipment().then(res => {
          this.equipments = res.equipments;
        });
        this.equipmentsShow = this.equipments;
        this.showEquipments();
        console.log(this.equipmentsShow.length);
      } else {
        alert("你在第一页还按上一页，你觉得很好玩吗");
      }
    },
    Backward() {
      if (this.currentPage < this.totalPage) {
        this.currentPage += 1;
        console.log("第" + this.currentPage + "页");
        console.log(this.equipments.length);
        getEquipment().then(res => {
          this.equipments = res.equipments;
        });
        this.equipmentsShow = this.equipments;
        this.showEquipments();
        console.log(this.equipmentsShow.length);
      } else {
        alert("你在最后一页还按下一页，你觉得很好玩吗");
      }
    },
    pageClick(index) {
      this.currentPage = index + 1;
        console.log("第" + this.currentPage + "页");
        console.log(this.equipments.length);
        getEquipment().then(res => {
          this.equipments = res.equipments;
        });
        this.equipmentsShow = this.equipments;
        this.showEquipments();
        console.log(this.equipmentsShow.length);
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
    funShowE: function() {
      this.varShowEquipments = true;
    },
    funHiddenE: function() {
      this.varShowEquipments = false;
    },
    funShowES: function() {
      this.varShowES = true;

      this.varShowERC = false;

      getEquipment().then(res => {
        this.equipments = res.equipments;
        this.showEquipments;
      });
    },
    funHiddenES: function() {
      this.varShowEquipments = false;
      this.varShowES = false;
    },

    // 器材删除功能
    funSubmitED: function(id, index) {
      if (confirm("是否要删除") == true) {
        deleteEquipment(id).then(res => {
          if (res.code == 200) {
            alert("删除成功，请稍等列表更新");
            getEquipment().then(res => {
              this.equipments = res.equipments;
              this.showEquipments();
            });
          } else if (res.code == 404) {
            alert("求你写点东西");
          } else {
            alert("速度爬");
          }
        });
      }
    },

    // 器材回收功能
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