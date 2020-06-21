<template>
  <div class="or-modal-container">
    <div class="or-modal-background">
      <div class="or-modal" ref="OrModal">
      <img class="or-modal-close" src="~assets/img/close.svg" alt="" @click="CloseModalWindow">
      <div class="or-modal-content">
        <slot>
          <div>你想写的内容</div>
        </slot>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrModal",
  props: {
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 300
    }
  },
  mounted(){
    const OrModalStyle = this.$refs.OrModal.style;
    OrModalStyle.width = this.width+"px";
    OrModalStyle.height = this.height+"px";
  },
  methods: {
    CloseModalWindow(){
      this.$emit("CloseModalWindow")
    }
  }
}
</script>

<style>
.or-modal-container{
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
}
.or-modal-background{
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .2);
  position: absolute;

  display: flex;
  justify-content: center;
  align-items: center;
}
.or-modal{
  z-index: 99;
  background-color: #fff;
  border-radius: 10px;
  opacity: 1;
  position: relative;
  animation-name: scale;
  animation-duration: .6s
}
.or-modal-close{
  height: 30px;
  width: 30px;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
.or-modal-content{
  width: 100%;
  position: absolute;
  top: 60px;
  padding: 10px
}

@keyframes scale {
  0%{
    transform: scale(.1)
  }
  100%{
    transform: scale(1)
  }
}
</style>