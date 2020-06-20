<template>
  <div>
  <button class="btn btn-primary" onclick="document.getElementById('modalAddBook').style.display='block'" style="width:auto;">添加预约</button>
  
   <div id="modalAddBook" class="modal">
     <div class="modal-content animate">
         <div>
            <!-- 点击×号，隐藏模态框-->
            <span onclick="document.getElementById('modalAddBook').style.display='none'" class="close" title="Close Modal">&times;</span>
        </div>
        <form >
   <table class="table">
    
             <thead>
              <tr text-align="center">
                <th scope="col">场地名字</th>
                <th scope="col">场地位置</th>
                <th scope="col">星期</th>
                <th scope="col">开始时间</th>
                <th scope="col">结束时间</th>
                <th scope="col">场地用途</th>
                <th scope="col">灯光</th>
            </tr>
          </thead>
          <tbody>
            <tr>
             <td scope="row" >
             <select v-model="appointment.placeName" required> 
            
            <option value="篮球场">篮球场</option>
            <option value="台球桌">台球桌</option>
            <option value="羽毛球场">羽毛球场</option>
            <option value="保龄球馆">保龄球馆</option>
            <option value="乒乓球场">乒乓球场</option>
            <option value="武术馆">武术馆</option>
            <option value="体操馆">体操馆</option>
            </select></td>
            <td>
            <select v-model="appointment.idPlace" required> 
           
            <option value="1">篮球场 一楼中间</option>
            <option value="2">台球桌 二楼编号1</option>
            <option value="3">台球桌 二楼编号2</option>
            <option value="4">台球桌 二楼编号3</option>
            <option value="5">台球桌 二楼编号4</option>
            <option value="6">健身房 二楼右转</option>
            <option value="7">保龄球馆二楼左转</option>
            <option value="8">乒乓球场（收费）三楼</option>
            <option value="9">武术馆 四楼左边</option>
            <option value="10">体操馆 四楼右边</option>
            <option value="11">羽毛球场 一楼左边</option>
            </select></td>

             <td>
            <select v-model="appointment.week" required>     
            <option value="周一">星期一</option>
            <option value="周二">星期二</option>
            <option value="周三">星期三</option>
            <option value="周四">星期四</option>
            <option value="周五">星期五</option>
            <option value="周六">星期六</option>
            <option value="周日">星期日</option>
            </select>
             </td>
             <td>            
             <select v-model="appointment.startAppointment" required> 
          
            <option value="1592440200">8:30</option>
            <option value="1592468400">16:20</option>
            <option value="1592475600">18:20</option>

            
            </select></td>
            
             <td>            
             <select v-model="appointment.overAppointment" required>
        
             <option value="1592451000">11:30</option> 
             <option value="1592474400">18:00</option>
             <option value="1592488800">22:00</option>  
            </select></td>
           
             <td>            
             <select v-model="appointment.purpose" required> 
            <option value="上课使用场地">上课使用场地</option>
            <option value="校队预留场地">校队预留场地</option>
            <option value="平常使用场地">平常使用场地</option>
            </select></td>

               <td>            
             <select v-model="appointment.light" required> 
           
            <option value="有">有</option>
            <option value="无">无</option>
            </select></td>
            </tr>
           </tbody>  
            </table>
            
        </form>
        <button class="btn btn-primary" @click="addAppointment()" onclick="document.getElementById('modalAddBook').style.display='none'">确认</button>
    </div>
   </div>
  </div>


</template>

<script>
import { addAppointment } from "network/place";
export default {
    name:"modalAddAppointment",
    data(){
        return{
            appointment:{
              placeName:"",
              idPlace:"",
              week:"",
              startAppointment:"",
              overAppointment:"",
              purpose:"",
              light:""

            }
        }
    },
    methods:{
        addAppointment(){
            addAppointment(this.appointment.idPlace,this.appointment.placeName,this.appointment.week,this.appointment.startAppointment,this.appointment.overAppointment,this.appointment.purpose,this.appointment.light,this.$store.state.user.userId).then(res=>{
                if(res.code == 200){
                    this.$toast.suc("添加成功，请查看个人预约")
                    this.$emit('ab');
                }else if(res.code==400){
                     this.$toast.err("添加失败")
                }else if(res.code==500){
                    this.$toast.err("数据库连接失败")
                }
            })
            }
        }


}
</script>

<style scoped>

th
{
    text-align:center;
}

select{
        width: 160px;
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
        width: 85%; /* Could be more or less, depending on screen size */
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