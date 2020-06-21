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
              <a class="dropdown-item" href="#" @click="funSearchByName(null)">所有</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#" @click="funSearchByName('篮球')">篮球</a>
              <a class="dropdown-item" href="#" @click="funSearchByName('羽毛球')">羽毛球</a>
              <a class="dropdown-item" href="#" @click="funSearchByName('排球')">排球</a>
              <a class="dropdown-item" href="#" @click="funSearchByName('足球')">足球</a>
              <a class="dropdown-item" href="#" @click="funSearchByName('橄榄球')">橄榄球</a>
              <a class="dropdown-item" href="#" @click="funSearchByName('乒乓球')">乒乓球</a>
              <a class="dropdown-item" href="#" @click="funSearchByName('网球')">网球</a>
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
              <a class="dropdown-item" href="#" @click="funSearchByStatus(null)">所有</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#" @click="funSearchByStatus('rent')">租借</a>
              <a class="dropdown-item" href="#" @click="funSearchByStatus('free')">空闲</a>
              <a class="dropdown-item" href="#" @click="funSearchByStatus('repair')">维修</a>
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
              <a class="dropdown-item" href="#" @click="funSearchByMe(null)">所有</a>
              <div class="dropdown-divider"></div>
              <a
                class="dropdown-item"
                href="#"
                @click="funSearchByMe($store.state.user.userId)"
              >我的租借</a>
            </div>
          </li>
        </ul>
        <div class="form-inline my-2 my-lg-0">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="器材ID查询"
            aria-label="Search"
            v-model="modelEquipmentId"
          />
          <button class="btn btn-outline-success my-sm-0" @click="funSearchById">搜索</button>
          <!-- <button class="btn btn-outline-success my-sm-0" type="submit">搜索</button> -->
        </div>
      </div>
    </nav>

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
              <td></td>
              <td>
                <button
                  class="btn btn-outline-success btn-sm"
                  @click="funSubmitER(equipment.equipmentId,equipment.equipmentStatus,equipment.equipmentRenterId,$index)"
                >租用</button>
                &nbsp;
                <button
                  class="btn btn-outline-secondary btn-sm"
                  @click="funSubmitERC(equipment.equipmentId,equipment.equipmentStatus,equipment.equipmentRenterId,$index)"
                >回收</button>
              </td>
              <td></td>
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
      equipmentName: null,
      equipmentStatus: null,
      equipmentRenterId: null,
      modelEquipmentId: null,

      page: 9,
      totalNumber: 0,
      totalPage: 1,
      currentPage: 1
    };
  },
  created() {
    getEquipment(
      this.equipmentId,
      this.equipmentName,
      this.equipmentStatus,
      this.equipmentRenterId
    ).then(res => {
      this.equipments = res.equipments;
      this.equipmentsShow = res.equipments;
      this.totalPage = Math.ceil(this.equipments.length / this.page);
      this.totalNumber = this.equipments.length;
      this.showEquipments();
      getEquipment(
        this.equipmentId,
        this.equipmentName,
        this.equipmentStatus,
        this.equipmentRenterId
      ).then(res => {
        this.equipments = res.equipments;
      });
    });
  },
  activated() {
    getEquipment(
      this.equipmentId,
      this.equipmentName,
      this.equipmentStatus,
      this.equipmentRenterId
    ).then(res => {
      this.equipments = res.equipments;
      this.equipmentsShow = res.equipments;
      this.totalPage = Math.ceil(this.equipments.length / this.page);
      this.totalNumber = this.equipments.length;
      this.showEquipments();
      getEquipment(
        this.equipmentId,
        this.equipmentName,
        this.equipmentStatus,
        this.equipmentRenterId
      ).then(res => {
        this.equipments = res.equipments;
      });
    });
  },
  mounted() {
    this.changeBulletin();
  },
  methods: {
    funSearchById() {
      this.currentPage = 1;
      this.equipmentId = this.modelEquipmentId;
      this.equipmentName = null;
      this.equipmentStatus = null;
      this.equipmentRenterId = null;
      getEquipment(
        this.equipmentId,
        this.equipmentName,
        this.equipmentStatus,
        this.equipmentRenterId
      ).then(res => {
        this.equipments = res.equipments;
        this.equipmentsShow = res.equipments;
        this.totalPage = Math.ceil(this.equipments.length / this.page);
        this.totalNumber = this.equipments.length;
        this.showEquipments();
        getEquipment(
          this.equipmentId,
          this.equipmentName,
          this.equipmentStatus,
          this.equipmentRenterId
        ).then(res => {
          this.equipments = res.equipments;
        });
      });
    },

    funSearchByName(Name) {
      this.currentPage = 1;
      this.equipmentId = null;
      this.equipmentName = Name;
      this.equipmentStatus = null;
      this.equipmentRenterId = null;
      getEquipment(
        this.equipmentId,
        this.equipmentName,
        this.equipmentStatus,
        this.equipmentRenterId
      ).then(res => {
        this.equipments = res.equipments;
        this.equipmentsShow = res.equipments;
        this.totalPage = Math.ceil(this.equipments.length / this.page);
        this.totalNumber = this.equipments.length;
        this.showEquipments();
        getEquipment(
          this.equipmentId,
          this.equipmentName,
          this.equipmentStatus,
          this.equipmentRenterId
        ).then(res => {
          this.equipments = res.equipments;
        });
      });
    },

    funSearchByStatus(Status) {
      this.currentPage = 1;
      this.equipmentId = null;
      this.equipmentName = null;
      this.equipmentStatus = Status;
      this.equipmentRenterId = null;
      getEquipment(
        this.equipmentId,
        this.equipmentName,
        this.equipmentStatus,
        this.equipmentRenterId
      ).then(res => {
        this.equipments = res.equipments;
        this.equipmentsShow = res.equipments;
        this.totalPage = Math.ceil(this.equipments.length / this.page);
        this.totalNumber = this.equipments.length;
        this.showEquipments();
        getEquipment(
          this.equipmentId,
          this.equipmentName,
          this.equipmentStatus,
          this.equipmentRenterId
        ).then(res => {
          this.equipments = res.equipments;
        });
      });
    },

    funSearchByMe(Id) {
      this.currentPage = 1;
      this.equipmentId = null;
      this.equipmentName = null;
      this.equipmentStatus = null;
      this.equipmentRenterId = Id;
      getEquipment(
        this.equipmentId,
        this.equipmentName,
        this.equipmentStatus,
        this.equipmentRenterId
      ).then(res => {
        this.equipments = res.equipments;
        this.equipmentsShow = res.equipments;
        this.totalPage = Math.ceil(this.equipments.length / this.page);
        this.totalNumber = this.equipments.length;
        this.showEquipments();
        getEquipment(
          this.equipmentId,
          this.equipmentName,
          this.equipmentStatus,
          this.equipmentRenterId
        ).then(res => {
          this.equipments = res.equipments;
        });
      });
    },

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
      if (this.totalPage != 0) {
        if (
          this.currentPage > 1 &&
          this.equipments.length > this.page &&
          this.totalNumber > this.page
          //this.page这个数字是因为有时按太快，切割完表格后还未更新又再次切割，会导致表格消失
        ) {
          getEquipment(
            this.equipmentId,
            this.equipmentName,
            this.equipmentStatus,
            this.equipmentRenterId
          ).then(res => {
            this.equipments = res.equipments;
          });
          this.currentPage -= 1;
          this.equipmentsShow = this.equipments;
          this.showEquipments();
        } else if (this.currentPage > 1) {
          alert("可能是按太快或者是数据库连接出问题了");
          getEquipment(
            this.equipmentId,
            this.equipmentName,
            this.equipmentStatus,
            this.equipmentRenterId
          ).then(res => {
            this.equipments = res.equipments;
          });
        } else {
          alert("你在第一页还按上一页，你觉得很好玩吗");
        }
      }
    },
    Backward() {
      if (this.totalPage != 0) {
        if (
          this.currentPage < this.totalPage &&
          this.equipments.length > this.page &&
          this.totalNumber > this.page
        ) {
          getEquipment(
            this.equipmentId,
            this.equipmentName,
            this.equipmentStatus,
            this.equipmentRenterId
          ).then(res => {
            this.equipments = res.equipments;
          });
          this.currentPage += 1;
          this.equipmentsShow = this.equipments;
          this.showEquipments();
        } else if (this.currentPage < this.totalPage) {
          alert("可能是按太快或者是数据库连接出问题了");
          getEquipment(
            this.equipmentId,
            this.equipmentName,
            this.equipmentStatus,
            this.equipmentRenterId
          ).then(res => {
            this.equipments = res.equipments;
          });
        } else {
          alert("你在最后一页还按下一页，你觉得很好玩吗");
        }
      }
    },
    pageClick(index) {
      if (this.equipments.length > this.page && this.totalNumber > this.page) {
        this.currentPage = index + 1;
        getEquipment(
          this.equipmentId,
          this.equipmentName,
          this.equipmentStatus,
          this.equipmentRenterId
        ).then(res => {
          this.equipments = res.equipments;
        });
        this.equipmentsShow = this.equipments;
        this.showEquipments();
      } else {
        this.currentPage = index + 1;
        getEquipment(
          this.equipmentId,
          this.equipmentName,
          this.equipmentStatus,
          this.equipmentRenterId
        ).then(res => {
          this.equipments = res.equipments;
          this.equipmentsShow = res.equipments;
          this.showEquipments();
        });
      }
    },

    changeBulletin() {
      this.$refs.child.textArr = [
        { title: "器材费用标准一览" },
        { title: "羽毛球：3￥/个" },
        { title: "足球：120￥/个" },
        { title: "乒乓球：6￥/个" },
        { title: "网球：5￥/个" },
        { title: "篮球：150￥/个" },
        { title: "橄榄球：800￥/个" },
        { title: "排球：80￥/个" }
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
      getEquipment(
        this.equipmentId,
        this.equipmentName,
        this.equipmentStatus,
        this.equipmentRenterId
      ).then(res => {
        this.equipments = res.equipments;
        this.equipmentsShow = res.equipments;
        this.totalPage = Math.ceil(this.equipments.length / this.page);
        this.totalNumber = this.equipments.length;
        this.showEquipments();
        getEquipment(
          this.equipmentId,
          this.equipmentName,
          this.equipmentStatus,
          this.equipmentRenterId
        ).then(res => {
          this.equipments = res.equipments;
        });
      });
    },

    // 器材删除功能
    funSubmitER: function(id, Status, RenterId, index) {
      if (Status == "repair" || Status == "rent") {
        alert("不可租用，该器材在租用或修理");
      } else if (confirm("是否要租用") == true) {
        rentEquipment(id, this.$store.state.user.userId).then(res => {
          if (res.code == 200) {
            alert("租借成功，请稍等列表更新");
            getEquipment(
              this.equipmentId,
              this.equipmentName,
              this.equipmentStatus,
              this.equipmentRenterId
            ).then(res => {
              this.equipments = res.equipments;
              this.totalPage = Math.ceil(this.equipments.length / this.page);
              if (this.currentPage > this.totalPage) {
                this.currentPage = this.totalPage;
              }
              getEquipment(
                this.equipmentId,
                this.equipmentName,
                this.equipmentStatus,
                this.equipmentRenterId
              ).then(res => {
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
            getEquipment(
              this.equipmentId,
              this.equipmentName,
              this.equipmentStatus,
              this.equipmentRenterId
            ).then(res => {
              this.equipments = res.equipments;
              this.totalPage = Math.ceil(this.equipments.length / this.page);
              if (this.currentPage > this.totalPage) {
                this.currentPage = this.totalPage;
              }
              getEquipment(
                this.equipmentId,
                this.equipmentName,
                this.equipmentStatus,
                this.equipmentRenterId
              ).then(res => {
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