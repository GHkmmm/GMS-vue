<template>
  <div class="or-switch" @click="Switch" ref="OrSwitch">
    <div class="circle" ref="myCircle"></div>
  </div>
</template>

<script>
export default {
  name: "Switch",
  data(){
    return{
      isOn: false,
    }
  },
  methods: {
    Switch(){
      this.isOn = !this.isOn;
      const circleStyle = this.$refs.myCircle.style;
      const OrSwitchStyle = this.$refs.OrSwitch.style;
      if(this.isOn){
        circleStyle.left = `50%`
        circleStyle.right = `2px`
        OrSwitchStyle.backgroundColor = `#4FA846`
        this.$emit("on")
      }else{
        console.log("off");
        circleStyle.right = `50%`
        circleStyle.left = `2px`
        OrSwitchStyle.backgroundColor = `#eee`
        this.$emit("off")
      }
    }
  }
}
</script>

<style>
.or-switch{
  width: 50px;
  height: 25px;
  background-color: #eee;
  border-radius: 20px;
  position: relative;
  transition: .6s;
}
.circle{
  width: 23px;
  height: 23px;
  border-radius: 100%;
  background-color: #fff;
  position: absolute;
  top: 1px;
  left: 2px;
  transition: .6s;
}
</style>