<template>
  <div>
    
    <table class="table">
      <thead>
        <tr>
          <th scope="col">id</th>
          <th scope="col">赛事名称</th>
          <th scope="col">项目</th>
          <th scope="col">举办时间</th>
          <th scope="col">主办方</th>
          <th scope="col">创建者</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="game in games" :key="game.key">
          <th scope="row">{{game.gameId}}</th>
          <td>{{game.gameName}}</td>
          <td>{{game.event}}</td>
          <td>{{game.holdTime}}</td>
          <td>{{game.sponsor}}</td>
          <td>{{game.userId}}</td>
          
          <td><a href="#" >删除</a></td>
        </tr>
      </tbody>
    </table>
    
  </div>
</template>

<script>

import { getGame, addGame, deleteGame } from 'network/gameManage';

export default {
  name: "GameManage",
  data(){
    return{
      games: []
      
    }
  },

  created(){
      this.getGame();
    },
 
  methods: {
    
    getGame(){
      getGame().then(res => {
        console.log(res);
        this.games = res.game
      })
    },
    deleteUser(userId){
      deleteUser(userId).then(res=>{
        if(res.code == 200){
          this.$toast.suc("删除成功")
        }else{
          this.$toast.err("删除失败")
        }
      })
    },
   
  }
}
</script>

<style>


</style>