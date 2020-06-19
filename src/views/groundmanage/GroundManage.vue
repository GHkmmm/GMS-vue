<template>
  <div>
   <table class="table" align="center">
    <thead>
     <tr>
      <th scope="col">idPlace</th>
      <th scope="col">场地名字</th>
      <th scope="col">场地位置</th>
      <td align="center" scope="col"><modalManage @gm="showAgain"></modalManage></td>
     </tr>
    </thead>
     <tbody>
      <tr v-for="(place,index) in places" :key="place.key">
       <td scope="row">{{place.idPlace}}</td>
       <td>{{place.placeName}}</td>
       <td>{{place.location}}</td>
       <td align="center"><modalEdit  @click="editPlace(place)">修改</modalEdit></td>
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
export default {
  name:"placeManage",
  data(){
    return{
      places:[]
      }
    },
    components:{
      modalManage,
      modalEdit
    },
    created(){
      this.getPlaceMA();
    },
    methods:{
      editPlace(place){
          this.$emit("editPlace",place);
          this.$router.push({
            path:'editPlace',
            query:{
              idPlace:place.idPlace,
              placeName:place.placeName,
              location:place.location

            }
          })
      },
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
      }
    }
  }

</script>

<style>

</style>