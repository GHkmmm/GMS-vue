<template>
  <div class="myToast" ref="toast">
    {{msg}}
  </div>
</template>

<script>
export default {
  name: "Toast",
  data(){
    return{
      msg: "成功",
      timer: null
    }
  },
  methods: {
    suc(msg="成功", duration=2000, state="suc"){
      this.show(msg, duration, state)
    },
    err(msg="失败", duration=2000, state="err"){
      this.show(msg, duration, state)
    },
    warn(msg="警告", duration=2000, state="warn"){
      this.show(msg, duration, state)
    },
    show(msg, duration, state){
      this.msg = msg;
      const myToastStyle = this.$refs.toast.style;
      myToastStyle.top = `50px`
      this.timer = setTimeout(() => {
        myToastStyle.top = `-60px`
      },duration)
      switch(state){
        case "suc":
          myToastStyle.backgroundColor = `#4FA846`
          break;
        case "err":
          myToastStyle.backgroundColor = `#dc4245`
          break;
        case "warn":
          myToastStyle.backgroundColor = `#F9C132`
          break;
      }
    }
  }
}
</script>

<style>
.myToast{
  width: 150px;
  line-height: 60px;

  background-color: red;
  color: #fff;

  text-align: center;

  position: fixed;
  top: -60px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;

  border-radius: 30px;

  transition: .6s;
}
</style>