<template>
  <div class="tab-menu">
    <div class="menu-list"
          @click="showItemMenu1"
          :class="{actived: isShowItemMenu1}">
          <img class="menu-list-item-title-icon" src="~assets/img/tabmenu/home.svg" alt="">
          <div>首页</div>
          <img class="menu-down" src="~assets/img/tabmenu/down.svg" alt="">
    </div>
    <div class="menu-list-item-container" :class="{menuListItemContainerActived: isShowItemMenu1}">
      <div v-for="(menu,index) in home" 
        :key="index" 
        class="menu-list-item" 
        :class="{actived: homeCurrentIndex==index}"
        @click="HomeItemClick(index,menu.path)"
        v-show="menu.name">
        <img :src="menu.icon|getImg" alt="">
        <div>{{menu.name}}</div>
      </div>
    </div>
    <div class="menu-list"
          @click="showItemMenu2"
          :class="{menuListActived: isShowItemMenu2}"
          v-if="dashboard.length>1">
          <img class="menu-list-item-title-icon" src="~assets/img/tabmenu/dashboard.svg" alt="">
          <div>控制台</div>
          <img class="menu-down" src="~assets/img/tabmenu/down.svg" alt="">
    </div>
    <div class="menu-list-item-container" :class="{menuListItemContainerActived: isShowItemMenu2}">
      <div v-for="(menu,index) in dashboard" 
        :key="index" 
        class="menu-list-item" 
        :class="{actived: dashboardCurrentIndex==index}"
        @click="DashboardItemClick(index,menu.path)"
        v-show="menu.name">
        <img :src="menu.icon|getImg" alt="">
        <div>{{menu.name}}</div>
      </div>
    </div>
    <div class="menu-list"
          @click="pushUserInfo"
          :class="{actived: isShowItemMenu3}" >
          <img class="menu-list-item-title-icon" src="~assets/img/tabmenu/userinfo.svg" alt="">
          <div>个人中心</div>
    </div>
  </div>
</template>

<script>
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
  data(){
    return {
      homeCurrentIndex: 0,
      dashboardCurrentIndex: 0,
      isShowItemMenu1: true,
      isShowItemMenu2: false,
      isShowItemMenu3: false,
      home:[],
      dashboard: []
    }
  },
  filters: {
    getImg(path){
      if(path){
        return require("assets/img/tabmenu/"+path)
      }
    }
  },
  created(){
    this.SplitArray();
  },
  methods: {
    HomeItemClick(index,path){
      if(this.homeCurrentIndex != index){
        this.homeCurrentIndex = index;
        this.$emit('menuItemClick', path)
      }
    },
    DashboardItemClick(index,path){
      if(this.dashboardCurrentIndex != index){
        this.dashboardCurrentIndex = index;
        this.$emit('menuItemClick', path)
      }
    },

    pushUserInfo(){
      if(this.isShowItemMenu3==false){
        this.$router.push("userinfo");
      }
      this.isShowItemMenu1 = false;
      this.isShowItemMenu2 = false;
      this.isShowItemMenu3 = true;
    },
    showItemMenu1(){
      this.isShowItemMenu1 = !this.isShowItemMenu1
      this.isShowItemMenu2 = false;
      this.isShowItemMenu3 = false;
      if(this.isShowItemMenu1==true){
        this.$emit('menuItemClick', "rentEquipment")
        this.homeCurrentIndex=0;
      }
    },
    showItemMenu2(){
      this.isShowItemMenu1 = false;
      this.isShowItemMenu2 = !this.isShowItemMenu2;
      this.isShowItemMenu3 = false;
      if(this.isShowItemMenu2==true){
        this.$emit('menuItemClick', "user")
        this.dashboardCurrentIndex=0;
      }
    },
    SplitArray(){
      let i = 0;
      this.menus.forEach((item, index) => {
        if(item.name){
          if(i<=3){
            this.home.push(item)
          }else{
            this.dashboard.push(item)
          }
          i++;
        }
      })
      console.log(this.home);
      console.log(this.dashboard);
    }
  }
}
</script>

<style>
.tab-menu{
  height: 100%;
  width: 20%;
  background-color: #fff;
  color: #666;
  font-size: 14px;
  overflow-y: scroll;
}
.menu-list, .menu-list-item{
  height: 80px;
  line-height: 80px;
  cursor: pointer;
  box-sizing: border-box;
  display: flex;
  padding-left: 20px;
  position: relative;
}
.menu-list img, .menu-list-item img{
  width: 20px;
  margin-right: 25px;
}
.actived{
  background-color: #eee;
}
.menu-list-item-container{
  max-height: 0;
  overflow: hidden;
  transition: max-height .4s;
}
.menuListItemContainerActived{
  max-height: 666px;
}
.menu-down{
  width: 10px;
  height: 10px;
  position: absolute;
  right: 10px;
  top: 45%;
}
</style>