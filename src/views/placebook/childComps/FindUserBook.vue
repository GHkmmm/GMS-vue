<template>
 <div>
 <button class="btn btn-primary" onclick="document.getElementById('modalUserAppointment').style.display='block'" style="width:auto;">查看个人预约</button>

<div id="modalUserAppointment" class="modal">
    <div class="modal-content animate">
        <div class="imgcontainer">
            <!-- 点击×号，隐藏模态框-->
            <span onclick="document.getElementById('modalUserAppointment').style.display='none'" class="close" title="Close Modal">&times;</span>
        </div>

        <div class="container">
            <table class="table">
             <thead>
              <tr>
                <th scope="col">预约编号</th>
                <th scope="col">用户名</th>
                <th scope="col">开始时间</th>
                <th scope="col">结束时间</th>
                <th scope="col">场地名字</th>
                <th scope="col">场地位置</th>
                <th scope="col">场地用途</th>
                <th scope="col">场地费用</th>
                
                <td align="center" scope="col"><modalManage></modalManage></td>
            </tr>
          </thead>
          <tbody>
             <tr v-for="userAppointment in userAppointments" :key="userAppointment.key">
             <td scope="row">{{userAppointment.idAppointment}}</td>
             <td>{{userAppointment.userName}}</td>
             <td>{{userAppointment.startAppointment}}</td>
             <td>{{userAppointment.overAppointment}}</td>
             <td>{{userAppointment.placeName}}</td>
             <td>{{userAppointment.location}}</td>
             <td>{{userAppointment.purpose}}</td>
             <td>{{userAppointment.cost+"元/小时"}}</td>
             <td align="center"><button class="btn btn-outline-warning">修改</button></td>
             <td><button type="button" class="btn btn-outline-danger">预约退订</button></td>
            </tr>
           </tbody>
            
            </table>
        </div>



    </div>
</div>

 </div>
</template>

<script>
import { searchUserBook } from 'network/place'
 export default {
  name:"searchUserAppointment",
  data(){
      return{
      userAppointments:[]
      
      }
  },
  created(){ 
      this.searchUserBook();
  },
   methods:{
   searchUserBook(){   
      
     searchUserBook(this.$store.state.user.userId).then( res =>{
         console.log(res);
         this.userAppointments = res.userAppointment  
          console.log(this.$store.state.user.userId);
        console.log(this.userAppointments);
    
 
      })
  }
 }}
</script>

<style scoped>



    /* The Modal (background) 阴影处 */
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
        margin: 1% auto 20% auto; /* 2% from the top, 20% from the bottom and centered */
        border: 1px solid #888;
        width: 80%; /* Could be more or less, depending on screen size */
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

    /* Add Zoom Animation  css3的动画效果*/
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