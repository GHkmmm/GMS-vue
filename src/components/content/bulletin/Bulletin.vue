<template>
  <div>
    <div class="textBox">
      <transition name="slide">
        <p v-if="text.val" class="text" :key="text.id">{{text.val.title}}</p>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'bulletin',
  data () {
    return {
      textArr: [
        {title:'体育馆实行封闭式管理，不利于场馆的健康发展,收费规则如下'},
        {title:'星期一到星期五16：20~18：00为免费开放时间'},
        {title:'星期一到星期五18:20~22：00和星期六、日8:30~11：30、14:30~22:00则对学生进行收费'},
        {title:'羽毛球场有灯光10/小时，无灯光5/小时'},
        {title:'乒乓球场有灯光3/小时，无灯光2/小时'},
        {title:'最后祝你们玩得愉快'},
      ],
      number: 0,
      rotateTime: 4000
    }
  },
  computed: {
    text () {
      return {
        id: this.number,
        val: this.textArr[this.number]
      }
    }
  },
  mounted () {
    this.startMove()
  },
  methods: {
    startMove () {
        
      // eslint-disable-next-line 停止上下滚动
      let timer = setTimeout(() => {
        if (this.number === this.textArr.length) {
          this.number = 0;
        } else {
          this.number += 1;
        }
        this.startMove();
      },this.rotateTime);
    }
  }
}
</script>

<style scoped>
  .textBox {
    width: 100%;
    height: 40px;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
    text-align: center;
  }
  .text {
    width: 100%;
    position: absolute;
    bottom: 0;
  }
  .slide-enter-active, .slide-leave-active {
    transition: all 0.5s linear;
  }
  .slide-enter{
    transform: translateY(20px) scale(1);
    opacity: 1;
  }
  .slide-leave-to {
    transform: translateY(-20px) scale(0.8);
    opacity: 0;
  }
</style>