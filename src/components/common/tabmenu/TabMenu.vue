<template>
  <div class="tab-menu">
    <div class="menu-list">
      <div v-for="(menu,index) in menus" 
          :key="index" 
          class="menu-list-item" 
          :class="{actived: currentIndex==index}"
          @click="itemClick(index)">
          <img :src="menu.img" alt="">
          <div>{{menu.name}}</div>
          <!-- <item-menu :menuitem="menu.menu" :isShowItem="currentIndex==index" /> -->
      </div>
    </div>
  </div>
</template>

<script>
import itemMenu from './itemMenu';

export default {
  name: "TabMenu",
  props: {
    menus: {
      type: Array,
      default(){
        return []
      }
    }
  },
  components: {
    itemMenu
  },
  data(){
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index){
      // if(this.currentIndex == index){
      //   this.currentIndex = -1;
      // }else{
        this.currentIndex = index;
      // }
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
  line-height: 80px;
  cursor: pointer;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
}
.menu-list-item img{
  width: 25px;
  margin-right: 5px;
}
.actived{
  background-color: #fff;
  border-left: 4px solid #047AFB
}
</style>