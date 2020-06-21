<template>
  <div>
   <div id="modalChangeBook" class="modal modalchange">
     <div class="modal-content animate">
        <div class="imgcontainer">
            <!-- 点击×号，隐藏模态框-->
            <span @click="closeSelf()" class="close" title="Close Modal">&times;</span>
        </div>

        <div class="container">
          <div><label><b>当前订单编号：</b><span>{{currentAppointment.idAppointment}}</span></label></div>
           <div><label for="week"><b>星期：</b></label>
            <select class="form-control"  v-model="currentAppointment.week" required>         
            <option value="周一">星期一</option>
            <option value="周二">星期二</option>
            <option value="周三">星期三</option>
            <option value="周四">星期四</option>
            <option value="周五">星期五</option>
            <option value="周六">星期六</option>
            <option value="周日">星期日</option>
            </select>
          </div>
          <div><label for="startAppointment"><b>开始时间：</b></label>
           <select class="form-control" v-model="currentAppointment.startAppointment">
            <option value="1592440200">8:30</option>
            <option value="1592461800">14:30</option>
            <option value="1592468400">16:20</option>
            <option value="1592475600">18:20</option>
           </select>
          </div>
          <div>
            <label  for="overAppointment"><b>结束时间：</b></label>
             <select class="form-control" v-model="currentAppointment.overAppointment" required>
             <option value="1592451000">11:30</option> 
             <option value="1592474400">18:00</option>
             <option value="1592488800">22:00</option>  
            </select>  </div>
                      <div>
            <label for="placeName"><b>场地名字：</b></label>
            <select class="form-control" v-model="currentAppointment.placeName" required> 
            
            <option value="篮球场">篮球场</option>
            <option value="台球桌">台球桌</option>
            <option value="羽毛球场">羽毛球场</option>
            <option value="保龄球馆">保龄球馆</option>
            <option value="乒乓球场">乒乓球场</option>
            <option value="武术馆">武术馆</option>
            <option value="体操馆">体操馆</option>
            </select>  </div>

             <div>
            <label for="location"><b>场地位置：</b></label>
            <select class="form-control" v-model="currentAppointment.location" required> 
           
            <option value="一楼中间">篮球场 一楼中间</option>
            <option value="二楼编号1">台球桌 二楼编号1</option>
            <option value="二楼编号2">台球桌 二楼编号2</option>
            <option value="二楼编号3">台球桌 二楼编号3</option>
            <option value="二楼编号4">台球桌 二楼编号4</option>
            <option value="二楼右转">健身房 二楼右转</option>
            <option value="一楼左边">羽毛球场 一楼左边</option>
            <option value="三楼编号1">乒乓球场（收费）三楼</option>
            <option value="二楼左转">保龄球馆二楼左转</option>
            <option value="四楼左边">武术馆 四楼左边</option>
            <option value="四楼右边">体操馆 四楼右边</option>
           
            </select> </div>
     <div>
              <label for="purpose"><b>场地用途：</b></label>
            <select class="form-control" v-model="currentAppointment.purpose" required> 
            <option value="上课使用场地">上课使用场地</option>
            <option value="校队预留场地">校队预留场地</option>
            <option value="平常使用场地">平常使用场地</option>
            </select>
     </div>
     <div>
     <label for="light"><b>灯光：</b></label>
      <select class="form-control" v-model="light" required> 
            <option value="有">有</option>
            <option value="无">无</option>
            </select>
     </div>
            <button  class="btn btn-outline-primary my-btn" @click="changeAppointment()">确认</button>

            <button  class="btn btn-outline-primary my-btn"  @click="closeSelf()">取消</button>
     </div>
  

            
        </div>
     </div>
  </div>


</template>

<script>
import { changeAppointment } from "network/place";
export default {
    name:"changeAppointment",
    data(){
        return{
            currentAppointment:{
            idAppointment:"",
            week:"",
            startAppointment:"",
            overAppointment:"",
            placeName:"",
            location:"",
            purpose:"",
            },
             light:"有"
         
        }
       },
       
    props:{
       appointmentMsg:Object
    },
     created(){
         console.log(this.appointmentMsg.week);
          this.currentAppointment=this.appointmentMsg
        },
    methods:{
        closeSelf(){
            this.$emit("ifShowChangeModal")
        },
        changeAppointment(){
            changeAppointment(
                this.currentAppointment.idAppointment,
                this.currentAppointment.week,
                this.currentAppointment.startAppointment,
                this.currentAppointment.overAppointment,
                this.currentAppointment.placeName,
                this.currentAppointment.location,
                this.currentAppointment.purpose,
                this.light        ).then(res=>{
                  if(confirm("是否要修改")==true){
                    if(res.code == 200){
                        this.$toast.suc("修改成功");
                        this.$emit('ifShowChangeModal');
                    }}
                })
        }

    }


}
</script>

<style scoped>
 input{
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        box-sizing: border-box;
    }

    .container{
        margin-top:50px;
    }

    /* The Modal (background) */
    .modalchange {
        display: block; /* Hidden by default */
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