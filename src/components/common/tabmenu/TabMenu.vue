<template>
  <div class="tab-menu">
    <div class="menu-list">
      <div v-for="(item,index) in menu" 
          :key="index" 
          class="menu-list-item" 
          :class="{actived: currentIndex==index}"
          @click="itemClick(index)">
          {{item}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabMenu",
  props: {
    menu: {
      type: Array,
      default(){
        return []
      }
    }
  },
  data(){
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index){
      this.currentIndex= index;
      this.$emit('menuItemClick', index)
    }
  }
}
</script>

<style>
.tab-menu{
  height: 100%;
  width: 20%;
  text-align: center;
  background-color: #eee;
  color: #666;
  font-size: 14px;
}
.menu-list-item{
  line-height: 60px;
  cursor: pointer;
}
.actived{
  background-color: #fff;
  border-left: 4px solid #047AFB
}
</style>