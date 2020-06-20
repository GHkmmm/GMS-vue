<template>
  <div class="page-container">
    <ul class="pagination">
      <li @click="Forward">
        <svg class="bi bi-chevron-left" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
        </svg>
      </li>
      <li v-for="(item, index) in totalPage" 
          :key="index" 
          @click="pageClick(index)" 
          :class="{actived:currentIndex==index}">
          {{item}}
      </li>
      <li @click="Backward">
        <svg class="bi bi-chevron-right" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
        </svg>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    totalPage: {
      type: Number,
      default: 0
    },
    currentIndex: {
      type: Number,
      default: 0
    }
  },
  methods: {
    pageClick(index){
      this.$emit("pageClick", index);
    },
    Forward(){
      this.$emit("Forward");
    },
    Backward(){
      this.$emit("Backward");
    }
  }
}
</script>

<style scoped>
.page-container{
  font-size: 20px;
}
ul{
  display: flex;
  justify-content: center;
  align-items: center;
}
li{
  list-style: none;
  cursor: pointer;
  padding: 0 5px;
  background-color: #fff;
}
.actived{
  color: #497CFF;
}
</style>