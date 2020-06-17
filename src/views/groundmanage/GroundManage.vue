<template>
  <div>
   <table class="table" >
    <thead >
     <tr>
      <th scope="col">idPlace</th>
      <th scope="col">场地名字</th>
      <th scope="col">场地位置</th>
      <th scope="col"><button class="btn btn-primary">添加场地</button></th>
     </tr>
    </thead>
     <tbody>
      <tr v-for="place in places" :key="place.key">
       <td scope="row">{{place.idPlace}}</td>
       <td>{{place.placeName}}</td>
       <td>{{place.location}}</td>
       <td align="right"><button type="button"  class="btn btn-outline-warning" @click="changePlace">修改</button></td>
       <td><button type="button" class="btn btn-outline-danger" @click="deletePlace(place.idPlace,$index)">删除</button></td>
      </tr>
     </tbody>
   </table>
  </div>
</template>

<script>
import { getPlace,deletePlace } from "network/place";
export default {
  name:"placeManage",
  data(){
    return{
      places:[]
      }
    },
    created(){
      this.getPlace();
    },
    methods:{
      getPlace(){
        getPlace().then( res=>{
          console.log(res);
          this.places = res.place;
         })
      },
      deletePlace(idPlace,index){
        deletePlace(idPlace).then(res=>{
          if(res.code == 200){
            this.$toast.suc("删除成功")
            this.places.splice(index,1);
          }else{
            this.$toast.err("删除失败")
          }
        })
      }
    }
  }

</script>

<style>

</style>