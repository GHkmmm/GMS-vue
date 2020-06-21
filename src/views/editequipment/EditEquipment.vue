<template>
  <div class="edit-equipment">
    <img src="~assets/img/back.svg" alt @click="BackEquipment" />
    <form @submit.prevent="editEquipment">
      <div class="form-group">
        <label for="equipmentId">修改Id</label>
        <input type="text" class="form-control" id="equipmentId" v-model="currentEquipment.equipmentId" />
      </div>
      <div class="form-group">
        <label for="equipmentName">器材名称</label>
        <select class="form-control" v-model="currentEquipment.equipmentName">
          <option>羽毛球</option>
          <option>篮球</option>
          <option>足球</option>
          <option>排球</option>
          <option>橄榄球</option>
          <option>乒乓球</option>
          <option>网球</option>
        </select>
      </div>
      <div class="form-group">
        <label for="equipmentCost">器材费用</label>
        <input type="text" class="form-control" id="equipmentCost" v-model="currentEquipment.equipmentCost" />
      </div>

      <button class="btn btn-primary" type="submit">确认修改</button>
    </form>
  </div>
</template>

<script>
import { changeEquipment } from "network/equipmentManage";

export default {
  name: "EditEquipment",
  data() {
    return {
      currentEquipment: {
        equipmentId: "",
        equipmentName: "",
        equipmentCost: ""
      }
    };
  },
  created() {
    this.setEquipment();
  },
  activated() {
    this.setEquipment();
  },
  methods: {
    setEquipment() {
      this.currentEquipment.equipmentId = this.$route.query.equipmentId;
      this.currentEquipment.equipmentName = this.$route.query.equipmentName;
      this.currentEquipment.equipmentCost = this.$route.query.equipmentCost;
    },
    editEquipment() {
      changeEquipment(
        this.$route.query.equipmentIdOld,
        this.currentEquipment.equipmentId,
        this.currentEquipment.equipmentName,
        this.currentEquipment.equipmentCost
      ).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.$toast.suc("修改成功");
          this.$router.push("equipment");
        }
        else{
          alert("出错啦！");
        }
      });
    },
    BackEquipment() {
      this.$router.push("equipment");
    }
  }
};
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