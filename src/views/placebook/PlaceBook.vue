<template>
  <div>
   <bulletin></bulletin>
   <searchUserAppointment id="btn1"></searchUserAppointment>
   <modalAddAppointment id="btn2"></modalAddAppointment>
   <div>
    <table class="table">
     <thead>
      <tr>
       <th scope="col">收费标准编号</th>
       <th scope="col">场地名字</th>
       <th scope="col">星期</th>
       <th scope="col">开始时间</th>
       <th scope="col">结束时间</th>
       <th scope="col">是否有灯光</th>
       <th scope="col">价格/小时</th>
      </tr>   
     </thead>
     <tbody>
      <tr v-for="charge in charges" :key="charge.key">
       <th scope="row">{{charge.idCharge}}</th>
       <td>{{charge.placeName}}</td>
       <td>{{charge.week}}</td>
       <td>{{showTime(charge.startCharge)}}</td>
       <td>{{showTime(charge.overCharge)}}</td>
       <td>{{charge.light}}</td>
       <td>{{charge.cost}}</td>  
      </tr> 
     </tbody>
    </table>
   </div>
  </div>
  
</template>

<script>
import bulletin from 'components/content/bulletin/Bulletin';
import { getCharge } from 'network/place';
import {DateFormat} from "../../common/util";
import searchUserAppointment from "./childComps/FindUserBook";
import modalAddAppointment from "./childComps/AddBook";
export default {
  name:"chargeSearch",
  components:{
    bulletin,
    modalAddAppointment,
    searchUserAppointment

    },
    data(){
      return{
      charges:[]
      }
    },
    created(){
      this.getCharge();
    },
    methods:{
      getCharge(){
        getCharge().then(res =>{
          this.charges = res.charge
        })

      },

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
#btn1{
  position: absolute;
  top:5px;
  left:320px;
}
#btn2{
  position: absolute;
  top:5px;
  left:460px;
}

</style>