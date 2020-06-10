<template>
  <div class="item-menu" v-show="isShowItem">
    <div v-for="item in menuitem" :key="item.id">
      {{item}}
    </div>
  </div>
</template>

<script>
export default {
  name: "itemMenu",
  props:{
    menuitem: {
      default: [],
      type: Array
    },
    isShowItem: {
      default: false,
      type: Boolean
    }
  },
  data(){
    return{

    }
  }
}
</script>

<style>
.item-menu{
  height: 20px;
}
</style>