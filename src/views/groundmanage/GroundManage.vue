<template>
  <div>
   <table class="table" align="center">
    <thead>
     <tr>
      <th scope="col">idPlace</th>
      <th scope="col">场地名字</th>
      <th scope="col">场地位置</th>
      <td align="center" scope="col">
      <modalManage @gm="showAgain"></modalManage>
   <modalEdit v-if="isShowEditModal" :placeMsg="this.placeMsg"  @ifShowEditModal="ifShowEditModal()" >修改</modalEdit>
      </td>
      <td><modalAllAppointment></modalAllAppointment></td>
     </tr>
    </thead>
 
     <tbody>
      <tr v-for="(place,index) in places" :key="place.key">
       <td scope="row">{{place.idPlace}}</td>
       <td>{{place.placeName}}</td>
       <td>{{place.location}}</td>
       <td align="center"><button class="btn btn-outline-warning" @click="editPlace(place)">修改</button></td>
       <td><button type="button" class="btn btn-outline-danger" @click="deletePlaceMA(place.idPlace,index)">删除</button></td>
      </tr>
     </tbody>
   </table>
  </div>
</template>

<script>
import { getPlace,deletePlace } from "network/place";
import modalManage from './childComps/modalManage';
import modalEdit from './childComps/editPlace';
import modalAllAppointment from "./childComps/SearchAppointment"
export default {
  name:"placeManage",
  data(){
    return{
      places:[],
      isShowEditModal:false,
      placeMsg:""
      }
    },
    components:{
      modalManage,
      modalEdit,
      modalAllAppointment
    },
    created(){
      this.getPlaceMA();
    },
    methods:{
      getPlaceMA(){
        getPlace().then( res=>{
          this.places = res.place;
         })
      },
      deletePlaceMA(idPlace,index){
        if(confirm("是否要删除场地")== true){
        deletePlace(idPlace).then(res=>{
          if(res.code == 200){
            this.$toast.suc("删除成功")
            this.places.splice(index,1)
          }else{
            this.$toast.err("删除失败")
          }
        })}
      },
      showAgain:function(){
         getPlace().then( res=>{
          this.places = res.place;
         })
      },
      ifShowEditModal(){
        this.isShowEditModal = !this.isShowEditModal;
      },
        editPlace(place){
         this.ifShowEditModal();
         this.placeMsg =place;
      }
    }
  }

</script>

<style>

</style>