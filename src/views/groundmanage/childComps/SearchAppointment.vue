<template>
  <div>
 <button class="btn btn-primary" @click="searchAllBook()" onclick="document.getElementById('modalAllAppointment').style.display='block'" style="width:auto;">查看场地一周信息</button>

<div id="modalAllAppointment" class="modal" >
    <div class="modal-content animate">
        <div class="imgcontainer">
            <!-- 点击×号，隐藏模态框-->
            <span onclick="document.getElementById('modalAllAppointment').style.display='none'" class="close" title="Close Modal">&times;</span>
        </div>

        <div class="container">
            <table style="width:110%" class="table">
             <thead>
              <tr>
                <th scope="col">预约编号</th>
                <th scope="col">用户名</th>
                <th scope="col">星期</th>
                <th scope="col">开始时间</th>
                <th scope="col">结束时间</th>
                <th scope="col">场地名字</th>
                <th scope="col">场地位置</th>
                <th scope="col">场地用途</th>
                <th scope="col">场地费用</th>
            </tr>
          </thead>
          <tbody>
             <tr v-for="(allBook,index) in allBooks" :key="allBook.key">
             <td scope="row">
                 {{allBook.idAppointment}}</td>
             <td>{{allBook.userName}}</td>
             <td>{{allBook.week}}</td>
             <td>{{showTime(allBook.startAppointment)}}</td>
             <td>{{showTime(allBook.overAppointment)}}</td>
             <td>{{allBook.placeName}}</td>
             <td>{{allBook.location}}</td>
             <td>{{allBook.purpose}}</td>
             <td>{{allBook.cost+"元/小时"}}</td>
             <td>
             <button type="button" class="btn btn-outline-danger" @click="deleteAppointment(allBook.idAppointment,index)">预约退订</button>
             </td>
            </tr>
           </tbody>
            
            </table>
        </div>



    </div>
</div>

 </div>
</template>

<script scoped>
import { searchAllBook,deleteAppointment } from "network/place";
import {DateFormat} from "../../../common/util";
export default {
  name:"modalAllAppointment",
  data(){
      return{
          allBooks:[]
      }
  },
  activated(){
      this.searchAllBook()
  },
  methods:{
      searchAllBook(){
          searchAllBook().then(res=>{
              console.log(22222222222);
         this.allBooks = res.appointment
          })
      },
       deleteAppointment(idAppointment,index){
      if(confirm("是否要退订预约")==true){
      deleteAppointment(idAppointment).then(res=>{
          if(res.code ==200){
            this.$toast.suc("退订成功")
            this.allBooks.splice(index,1)
          }else{
             this.$toast.err("退订失败失败")
          }
      })}
       },
       //将时间戳定义为可视时间
        showTime(value){
        if(value !=""){
           let date = new Date(value*1000);
           return DateFormat(date,"h:mm");

        }

      }

  }
}
</script>

<style>
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
        width: 90%; /* Could be more or less, depending on screen size */
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