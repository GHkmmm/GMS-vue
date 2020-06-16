<template>
  <div>
<bulletin></bulletin>


  </div>
  
</template>

<script>
import bulletin from './bulletin/Bulletin';
import {    idCharge,
            placeName,
            startCharge,
            overCharge,
            light,
            cost} from "network/place";
export default {
  name:"charge",
  components:{
    bulletin
    }
}
</script>

<style>

</style>