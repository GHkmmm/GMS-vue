<template>
  <div>
    <bulletin ref="child"></bulletin>
    <nav class="navbar navbar-expand-lg navbar-light bg-blue">
      <span class="navbar-brand">器材列表</span>
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
              <span>器材类型:</span>
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="#">所有</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">篮球</a>
              <a class="dropdown-item" href="#">羽毛球</a>
              <a class="dropdown-item" href="#">排球</a>
              <a class="dropdown-item" href="#">足球</a>
              <a class="dropdown-item" href="#">橄榄球</a>
              <a class="dropdown-item" href="#">乒乓球</a>
              <a class="dropdown-item" href="#">网球</a>
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
            >租借状态</a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="#">所有</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">租借</a>
              <a class="dropdown-item" href="#">空闲</a>
              <a class="dropdown-item" href="#">维修</a>
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
            >关于我的</a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="#">所有</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">我的租借</a>
            </div>
          </li>
        </ul>
        <div class="form-inline my-2 my-lg-0">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="器材ID查询"
            aria-label="Search"
          />
          <button class="btn btn-outline-success my-sm-0">搜索</button>
          <!-- <button class="btn btn-outline-success my-sm-0" type="submit">搜索</button> -->
        </div>
      </div>
    </nav>

    <!-- 器材查询 -->
    <div>
      <div class="container">
        <div class="row">
          <div class="col-md-4 offset-md-1 my-sm-2">
            <modalERP @ee="funShowES"></modalERP>
          </div>
          <div class="col-md-4 my-sm-2">
            <modalEA @ee="funShowES"></modalEA>
          </div>
          <div class="col-md-3 my-sm-2">
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
              <th scope="col">器材租借人Id</th>
              <th scope="col"></th>
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
                <button class="btn btn-outline-primary btn-sm" @click="funSbumitEC(equipment)">编辑</button>
              </td>
              <td>
                <button
                  class="btn btn-outline-danger btn-sm"
                  @click="funSubmitED(equipment.equipmentId,equipment.equipmentStatus,$index)"
                >删除</button>
              </td>
              <td>
                <button
                  class="btn btn-outline-success btn-sm "
                  @click="funSubmitERC(equipment.equipmentId,equipment.equipmentStatus,equipment.equipmentRenterId,$index)"
                >回收</button>
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
import modalEA from "./childComps/modalEA";
import modalER from "./childComps/modalER";
import modalERP from "./childComps/modalERP";
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
    modalER,
    modalERP
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
  activated() {
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
    funSbumitEC(equipment) {
      this.$router.push({
        path: "editEquipment",
        query: {
          equipmentIdOld: equipment.equipmentId,
          equipmentId: equipment.equipmentId,
          equipmentName: equipment.equipmentName,
          equipmentCost: equipment.equipmentCost
        }
      });
    },

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
        alert("可能是按太快或者是数据库连接出问题了");
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
        alert("可能是按太快或者是数据库连接出问题了");
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

    // 器材删除功能
    funSubmitED: function(id, Status, index) {
      if (Status == "repair" || Status == "rent") {
        alert("不可删除，该器材在租用或修理");
      } else if (confirm("是否要删除") == true) {
        deleteEquipment(id).then(res => {
          if (res.code == 200) {
            alert("删除成功，请稍等列表更新");
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

    // 器材回收功能
    funSubmitERC: function(id, Status, RenterId, index) {
      if (Status == "rent" && RenterId != this.$store.state.user.userId) {
        alert("不是你借的，回收个🔨啊？");
      } else if (Status == "free") {
        alert("都没被借也没被修，你回收个🐓啊");
      } else if (confirm("是否要回收？") == true) {
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
    }
  }
};
</script>

<style>
.equipment-manage {
  width: 100%;
}
</style>