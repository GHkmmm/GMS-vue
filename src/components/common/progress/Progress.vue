<template>
  <div class="or-progress">
    <div class="or-progress-bar" ref="OrProgressBar"></div>
  </div>
</template>

<script>
export default {
  name: "OrProgress",
  methods: {
    start(){
      const OrProgressBarStyle = this.$refs.OrProgressBar.style;
      OrProgressBarStyle.width = `200px`
    },
    finished(){
      const OrProgress = this.$refs.OrProgressBar;
      const OrProgressBarStyle = OrProgress.style;
      const OrProgressParent = OrProgress.parentElement;

      OrProgressBarStyle.width = `100%`
      setTimeout(()=>{
        OrProgressParent.removeChild(OrProgress);
      },600)
    }
  }
}
</script>

<style>
.or-progress{
  width: 100%;
  height: 3px;
  position: absolute;
  top: 0;
  left: 0;
}
.or-progress-bar{
  width: 0;
  height: 100%;
  background-color: #79b8ff;
  transition: .6s
  /* animation-name: forward;
  animation-duration: 1s;
  animation-fill-mode: forwards; */
}
@keyframes forward {
  100%{
    width: 200px;
  }
}
</style>