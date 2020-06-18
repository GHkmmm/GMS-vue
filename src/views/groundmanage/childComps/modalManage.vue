<template>
 <div>
 <button  class="btn btn-primary" onclick="document.getElementById('modalManage').style.display='block'" style="width:auto;">添加场地</button>

<div id="modalManage" class="modal">
    <div class="modal-content animate">
        <div class="imgcontainer">
            <!-- 点击×号，隐藏模态框-->
            <span onclick="document.getElementById('modalManage').style.display='none'" class="close" title="Close Modal">&times;</span>
        </div>

        <div class="container">
            <label><b>场地名字</b></label>
            <input type="text" placeholder="请输入场地名字" id="placeName" v-model="place.placeName">

            <label><b>场地位置</b></label>
            <input type="text" placeholder="请输入场地位置" id="location" v-model="place.location">

            <button  class="btn btn-outline-primary" @click="addPlaceMA()" onclick="document.getElementById('modalManage').style.display='none'">确认</button>
            <button  class="btn btn-outline-primary" onclick="document.getElementById('modalManage').style.display='none'">取消</button>
        </div>



    </div>
</div>

 </div>
</template>

<script>
import { addPlace } from 'network/place'

 export default {
  name:"modalManage",
  data(){
      return{
    place:{
        placeName:"",
        location:""
       }
      }
  },
  
   methods:{
   addPlaceMA(){
     addPlace(this.place.placeName,this.place.location).then(res =>{
         console.log(res);
         if(res.code == 200){
             this.$toast.suc("添加成功")
         }else if(res.code ==400){
             this.$toast.err("添加失败")
         }else if(res.code==404){
             this.$toast.err("参数为空，请检查！")
         }
      })
  }
 }}
</script>

<style  scoped>

 input{
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
        background-color: rgb(0,0,0); /* Fallback color */
        background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
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
        animation: animatezoom 0.6s
    }

    @-webkit-keyframes animatezoom {
        from {-webkit-transform: scale(0)}
        to {-webkit-transform: scale(1)}
    }

    @keyframes animatezoom {
        from {transform: scale(0)}
        to {transform: scale(1)}
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