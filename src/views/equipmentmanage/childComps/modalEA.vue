<template>
  <div>
    <button
      class="btn btn-outline-primary"
      onclick="document.getElementById('modalEA').style.display='block'"
      style="width:auto;"
    >器材新增</button>

    <div id="modalEA" class="modal">
      <div class="modal-content animate">
        <div class="imgcontainer">
          <!-- 点击×号，隐藏模态框-->
          <span
            onclick="document.getElementById('modalEA').style.display='none'"
            class="close"
            title="Close Modal"
          >&times;</span>
        </div>

        <div class="container">
          <label>
            <b>器材Id</b>
          </label>
          <input type="text" placeholder="器材Id" v-model="equipmentId" required />

          <label>
            <b>器材名称</b>
          </label>
          <input type="text" placeholder="器材名称" v-model="equipmentName" required />

          <label>
            <b>器材租借费用</b>
          </label>
          <input type="text" placeholder="器材费用" v-model="equipmentCost" required />

          <button
            class="btn btn-outline-primary"
            @click="addE"
          >确认</button>
          <button
            class="btn btn-outline-primary"
            onclick="document.getElementById('modalEA').style.display='none'"
          >取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getEquipment,addEquipment } from "network/equipmentManage";

export default {
  name: "modalEA",
  data(){
      return{
          equipmentId:null,
          equipmentName:null,
          equipmentCost:null
      }
  },
  methods: {
    addE() {
      addEquipment(
        this.equipmentId,
        this.equipmentName,
        this.equipmentCost
      ).then(res => {
        if (res.code == 200) {
          alert("新增成功");
           this.$emit('ee');
        } else if (res.code == 404) {
          alert("我求求你写全信息不然插入你妈呢");
        } else if (res.msg.mostSpecificCause.errorCode == 1062) {
          alert("你别弄你妈重复ID啊");
        } else {
          alert("你是怎么能弄到我都不知道为什么的错的");
        }
      });
    }
  }
};
</script>

<style>
input[type="text"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
  padding-top: 60px;
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 2% auto 20% auto; /* 2% from the top, 20% from the bottom and centered */
  border: 1px solid #888;
  width: 500px; /* Could be more or less, depending on screen size */
}

/* The Close Button (x) */
.close {
  position: absolute;
  right: 25px;
  top: 0;
  color: #000;
  font-size: 35px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: red;
  cursor: pointer;
}

/* Add Zoom Animation */
.animate {
  -webkit-animation: animatezoom 0.6s;
  animation: animatezoom 0.6s;
}

@-webkit-keyframes animatezoom {
  from {
    -webkit-transform: scale(0);
  }
  to {
    -webkit-transform: scale(1);
  }
}

@keyframes animatezoom {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

/* Change styles for span and cancel button on extra small screens */
@media screen and (max-width: 300px) {
  span.psw {
    display: block;
    float: none;
  }
  .cancelbtn {
    width: 100%;
  }
}
</style>