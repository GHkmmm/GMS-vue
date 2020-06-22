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
               <or-modal :height="350" v-if="isShowQRcode" @CloseModalWindow="CloseModalWindow">
                 <div class="qrcode qrcode-div" ref="qrCodeUrl"></div>
                <div class="div3"><button class="btn btn-success" @click="paySuccess()">我已支付</button></div> 
              </or-modal>
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
             <td><button class="btn btn-outline-warning" @click="changeAppointment(userAppointment)">修改</button>
             <button type="button" class="btn btn-outline-danger" @click="deleteAppointment(userAppointment.idAppointment,index)">预约退订</button>
             <button type="button" class="btn btn-outline-primary" @click="checkOut(userAppointment.startAppointment,
                                                                                       userAppointment.overAppointment,
                                                                                       userAppointment.purpose,
                                                                                       userAppointment.cost,placeName,
                                                                                       userAppointment.idAppointment,
                                                                                       userAppointment.index)">结算</button></td>
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
import {addTrading,payMent} from 'network/trading';
import QRCode from 'qrcodejs2' ;

import OrModal from 'components/common/modal/Modal';

 export default {
  name:"searchUserAppointment",
  data(){
      return{
      userAppointments:[],
      isShowChangeModal:false,
      appointmentMsg:"",
      isShowQRcode:false,
      paymentUid:"",

      startAppointment:"",
      overAppointment:"",
      purpose:"",
      cost:"",
      placeName:"",
      idAppointment:"",
      index:""
      
      }
  },
    activated(){ 

      this.searchUserBook();
  },

  components:{
   changeAppointment,
   OrModal
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
       //将时间戳定义为可视时间
        showTime(value){
        if(value !=""){
           let date = new Date(value*1000);
           return DateFormat(date,"h:mm");

        }

      }, 
      //显示修改modal
       ifShowChangeModal(){
         this.isShowChangeModal=!this.isShowChangeModal; 
         this.searchUserBook();   
      },

      changeAppointment(userAppointment){
         this.ifShowChangeModal();
         this.appointmentMsg = userAppointment;
      },
      //支付交易
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
        // this.checkOutAppointment(idAppointment,index);
        // this.addTrading(2,"学生", ((overAppointment-startAppointment)/3600)*cost*100,placeName+((overAppointment-startAppointment)/3600).toFixed(0)+"小时 "+purpose);
         this.payMentCode();
            this.startAppointment = startAppointment;
            this.overAppointment = overAppointment;
            this.purpose = purpose;
            this.cost = cost;
            this.placeName = placeName;
            this.idAppointment = idAppointment;
            this.index=index


    },
        payMentCode(){
        this.isShowQRcode=true;
        payMent("fbt",1).then(res=>{
        console.log(2222222);
          if (res.code==200) {
            this.paymentUid=res.paymentUid;

            console.log(this.paymentUid);
            this.creatQrCode(res.payLink);
         

          }else{
            this.$toast.err("请求支付二维码失败")
          }
        })
    },

     paySuccess(){
      payMent(this.paymentUid,3).then(res=>{
         if (res.code==200) {
           this.$toast.suc(res.msg);     
           alert("你支付了"+(((this.overAppointment-this.startAppointment)/3600)*this.cost)+"元");
            this.isShowQRcode=false;
         this.checkOutAppointment(this.idAppointment,this.index);
         this.addTrading(2,"学生", ((this.overAppointment-this.startAppointment)/3600)*this.cost*100,this.placeName+((this.overAppointment-this.startAppointment)/3600).toFixed(0)+"小时 "+this.purpose);
       
          }else{
            this.$toast.err(res.msg)
          }
      })
    },
      checkOutAppointment(idAppointment,index){
      
      deleteAppointment(idAppointment).then(res=>{
          if(res.code ==200){ 
            this.userAppointments.splice(index,1)
          }
      })
       },
         creatQrCode(text) {
    var qrcode = new QRCode(this.$refs.qrCodeUrl, {
        text: text, // 需要转换为二维码的内容
        width: 200,
        height: 200,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    })
},
CloseModalWindow(){
  this.isShowQRcode=false;
},


    
 }}
</script>

<style scoped>
   

   .div3{
       margin-top: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
   }

    .qrcode-div{
     display: flex;
  justify-content: center;
  align-items: center;
    }

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
        width: 88%; /* Could be more or less, depending on screen size */
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