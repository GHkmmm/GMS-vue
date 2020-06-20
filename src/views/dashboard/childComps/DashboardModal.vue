<template>
  <or-modal :width="500" :height="610" @CloseModalWindow="CloseModalWindow">
      <p>
        1.体育馆是教学、训练、竞赛、培训的专用场所，由学院体育教研部集中管理。外单位租用体育馆须事先到体育教研部办理租用手续，否则不准进入。
      </p>
      <p>
        2所有进馆人员均须遵守体育馆的管理制度，服从管理员的管爱护体育馆内的设施器材和其它物品，如有人为损坏，照价赔偿并按学院有关规章。
      </p>
      <p>
        3.馆内严禁乱刻乱画、大声喧哗、打架斗殿，不得随地吐痰、乱抛纸、杂物及吐口香糖，不得在馆内进餐，入馆者有责任和义务维持馆内卫生青洁，违者罚款20元--50元。
      </p>
      <p>
        4.严禁穿留水鞋、皮鞋、高跟鞋、沾满泥土及其它有损场地的鞋子进入体育馆:违者罚款50元，造成地板磨损、破坏需按原样修复，并责令立即退出。

      </p>
      <p>
        5.馆内严禁吸烟，严禁携带易燃、易爆物品及明火进入，违者罚款100元o
      </p>
      <p>
        6.不得将雨具带入场馆内，雨具可放在i厅储物柜内，自行带锁贵重物品自行保管，如有丢失概不负责。
      </p>
      <button type="button" class="btn btn-primary btn-lg btn-block" @click="CloseModalWindow">我已阅读</button>
    </or-modal> 
</template>

<script>
import OrModal from 'components/common/modal/Modal';

export default {
  name: "DashboardModal",
  components: {
    OrModal
  },
  methods: {
    CloseModalWindow(){
      this.$emit("CloseModalWindow");
    }
  }
}
</script>

<style>

</style>