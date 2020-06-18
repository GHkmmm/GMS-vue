<template>
  <div class="or-loading" ref="OrLoading">
    <div class="or-loading-circle"></div>
    <div class="or-loading-circle"></div>
    <div class="or-loading-circle"></div>
  </div>
</template>

<script>
export default {
  name: "OrLoading",
  props: {
    color: {
      type: String,
      default: "#ff0000"
    },
    size: {
      type: Number,
      default: .5
    }
  },
  mounted(){
    const OrLoading = this.$refs.OrLoading;
    const circleWidth = 20*this.size;
    const circleHeight = 20*this.size;
    for(let i=0;i<OrLoading.children.length;i++){
      OrLoading.children[i].style.backgroundColor=this.color;
      OrLoading.children[i].style.width = circleWidth+"px";
      OrLoading.children[i].style.height = circleHeight+"px";
    }
  }
}
</script>

<style scoped>
.or-loading{
  display: flex;
}
.or-loading-circle{
  width: 20px;
  height: 20px;
  background-color: #06c;
  border-radius: 50%;
  animation: bouncedelay 1.4s infinite ease-in-out;
}
.or-loading-circle:nth-child(1){
  animation-delay: -0.32s;
}
.or-loading-circle:nth-child(2){
  animation-delay: -0.16s;
}

@keyframes bouncedelay {
  0%, 80%, 100% {
    transform: scale(0.0);
  } 40% {
    transform: scale(1.0);
  }
}
</style>