<template>
  <div>
   <bulletin></bulletin>
   <div>
    <table class="table">
     <thead>
      <tr>
       <th scope="col">idCharge</th>
       <th scope="col">场地名字</th>
       <th scope="col">时间</th>
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
       <td>{{charge.startCharge}}</td>
       <td>{{charge.overCharge}}</td>
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
import { getCharge } from "network/place";
export default {
  name:"chargeSearch",
  components:{
    bulletin
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

      }
    }
}
</script>

<style>

</style>