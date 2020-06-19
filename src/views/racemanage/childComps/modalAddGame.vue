<template>
 <div>
 <button class="btn btn-primary" onclick="document.getElementById('modalAddGame').style.display='block'" style="width:auto;">创建赛事</button>

<div id="modalAddGame" class="modal">
    <div class="modal-content animate">
        <div class="imgcontainer">
            <!-- 点击×号，隐藏模态框-->
            <span onclick="document.getElementById('modalAddGame').style.display='none'" class="close" title="Close Modal">&times;</span>
        </div>

        <div class="container">
            <label><b>赛事Id</b></label>
            <input type="text" placeholder="请输入赛事Id" v-model="game.gameId" required>

            <label><b>赛事名称</b></label>
            <input type="text" placeholder="请输入赛事名称" v-model="game.gameName" required>

            <label><b>项目</b></label>
            <input type="text" placeholder="请输入项目" v-model="game.event" required>

            <label><b>举办时间</b></label>
            <input type="text" placeholder="请输入举办时间" v-model="game.holdingTime" required>

            <label><b>主办方</b></label>
            <input type="text" placeholder="请输入主办方" v-model="game.sponsor" required>

            <!--<label><b>创建者</b></label>
            <input type="text" placeholder="请输入创建者" v-model="game.userId" required>-->

            <button  class="btn btn-outline-primary" @click="addGame" onclick="document.getElementById('modalAddGame').style.display='none'">确认</button>
            <button  class="btn btn-outline-primary" onclick="document.getElementById('modalAddGame').style.display='none'">取消</button>
        </div>



    </div>
</div>

 </div>
</template>

<script>
import {addGame} from 'network/gameManage'

export default {
 name:"modalAddGame",
 data(){
      return{
        game:{
          gameId:null,
          gameName:null,
          event:null,
          holdingTime:null,
          sponsor:null,
          userId:null
        }
      }
  },
 methods:{
    addGame(){
     addGame(this.game.gameId,this.game.gameName,this.game.event,this.game.holdingTime,this.game.sponsor,this.$store.state.user.userId).then(res=>{
       console.log("曹尼玛杀币res")
       console.log(res)
         if(res.code ==200){
             this.$toast.suc("添加成功")
             this.$emit('emit');
            }else if (res.code == 404){
             this.$toast.err("输入信息不全")
            }else{
             this.$toast.err("添加失败")
         }
     })
    },
 
   }
}
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
