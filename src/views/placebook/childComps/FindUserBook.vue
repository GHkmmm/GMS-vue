<template>
 <div>
 <button class="btn btn-primary" @click="searchUserBook()" onclick="document.getElementById('modalUserAppointment').style.display='block'" style="width:auto;">查看个人预约</button>

<div id="modalUserAppointment" class="modal" >
    <div class="modal-content animate">
        <div class="imgcontainer">
            <!-- 点击×号，隐藏模态框-->
            <span onclick="document.getElementById('modalUserAppointment').style.display='none'" class="close" title="Close Modal">&times;</span>
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
               <td> <changeAppointment v-if="isShowChangeModal"  :appointmentMsg="this.appointmentMsg" @ifShowChangeModal="ifShowChangeModal()">修改</changeAppointment>
                    </td>
            </tr>
          </thead>
          <tbody>
             <tr v-for="(userAppointment,index) in userAppointments" :key="userAppointment.key">
             <td scope="row">{{userAppointment.idAppointment}}</td>
             <td>{{userAppointment.userName}}</td>
             <td>{{userAppointment.week}}</td>
             <td>{{showTime(userAppointment.startAppointment)}}</td>
             <td>{{showTime(userAppointment.overAppointment)}}</td>
             <td>{{userAppointment.placeName}}</td>
             <td>{{userAppointment.location}}</td>
             <td>{{userAppointment.purpose}}</td>
             <td>{{userAppointment.cost+"元/小时"}}</td>
             <td><button class="btn btn-outline-warning" @click="changeAppointment(userAppointment)">修改</button></td>
             <td><button type="button" class="btn btn-outline-danger" @click="deleteAppointment(userAppointment.idAppointment,index)">预约退订</button></td>
             <td><button type="button" class="btn btn-outline-primary" @click="checkOut(userAppointment.startAppointment,userAppointment.overAppointment,userAppointment.purpose,userAppointment.cost,userAppointment.placeName,userAppointment.idAppointment,index)">结算</button></td>
            </tr>
           </tbody>
            
            </table>
        </div>



    </div>
</div>

 </div>
</template>

<script>
import { searchUserBook,deleteAppointment } from 'network/place';
import changeAppointment from "./ChangeBook";
import {DateFormat} from "../../../common/util";
import {addTrading} from 'network/trading';


 export default {
  name:"searchUserAppointment",
  data(){
      return{
      userAppointments:[],
      isShowChangeModal:false,
      appointmentMsg:""
      
      }
  },
    activated(){ 

      this.searchUserBook();
  },

  components:{
   changeAppointment
  },
   methods:{
   searchUserBook(){   
      
     searchUserBook(this.$store.state.user.userId).then( res =>{
         this.userAppointments = res.userAppointment  
 
      })
  },
  deleteAppointment(idAppointment,index){
      if(confirm("是否要退订预约")==true){
      deleteAppointment(idAppointment).then(res=>{
          if(res.code ==200){
            this.$toast.suc("退订成功")
            this.userAppointments.splice(index,1)
          }else{
             this.$toast.err("退订失败失败")
          }
      })}
       },
        showTime(value){
        if(value !=""){
           let date = new Date(value*1000);
           return DateFormat(date,"h:mm");

        }

      }, 
       ifShowChangeModal(){
         this.isShowChangeModal=!this.isShowChangeModal;    
      },

      changeAppointment(userAppointment){
         this.ifShowChangeModal();
         this.appointmentMsg = userAppointment;
      },
      
      addTrading(tradingType, counterParty, transactionAmount,tradingContent){
      addTrading(tradingType, counterParty, transactionAmount,tradingContent).then(res=>{
          
        if(res.code == 200){
          this.$toast.suc("结算成功")
        }else{
           this.$toast.err("结算失败")
        }
      })
    },
    checkOut(startAppointment,overAppointment,purpose,cost,placeName,idAppointment,index){
        this.checkOutAppointment(idAppointment,index)
         this.addTrading(2,"学生", ((overAppointment-startAppointment)/3600)*cost*100,placeName+((overAppointment-startAppointment)/3600).toFixed(0)+"小时 "+purpose)
        
    },
      checkOutAppointment(idAppointment,index){
      
      deleteAppointment(idAppointment).then(res=>{
          if(res.code ==200){ 
            this.userAppointments.splice(index,1)
          }
      })
       },
    
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
        margin: 1% auto 20% auto; /* 1% from the top, 20% from the bottom and centered */
        border: 1px solid #888;
        width: 86%; /* Could be more or less, depending on screen size */
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