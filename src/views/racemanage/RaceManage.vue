<template>
  <div class="user-manage">
    
    <nav class="navbar navbar-expand-lg navbar-light bg-blue">
  <span class="navbar-brand" >赛事管理</span>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <td align="center" scope="col"><modalAddGame @emit="addGameFun"></modalAddGame></td>
    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">添加赛事</button>
    <!--<ul class="navbar-nav ml-auto">

      <li class="nav-item dropdown ">
        <a class="nav-link dropdown-toggle text-dark" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span>交易类型:</span>
          {{searchTrdaingType|typeName}}
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#" @click="allType()">所有</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#" @click="onlyPay()">支出</a>
          <a class="dropdown-item" href="#" @click="onlyRevenue()">收入</a>
        </div>
      </li>

      <li class="nav-item dropdown ">
        <a class="nav-link dropdown-toggle text-dark" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          起始时间
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">所有</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#" >支出</a>
          <a class="dropdown-item" href="#" >收入</a>
        </div>
      </li>

      <li class="nav-item dropdown ">
        <a class="nav-link dropdown-toggle text-dark" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          结束时间
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">所有</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">支出</a>
          <a class="dropdown-item" href="#">收入</a>
        </div>
      </li>

      
    </ul>-->
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="输入赛事ID" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">搜索</button>
    </form>
  </div>
</nav>

    <bulletin ref="childbulletin"></bulletin>
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
        <tr v-for="(game,index) in games" :key="game.key">
          <th scope="row">{{game.gameId}}</th>
          <td>{{game.gameName}}</td>
          <td>{{game.event}}</td>
          <td>{{game.holdTime}}</td>
          <td>{{game.sponsor}}</td>
          <td>{{game.userId}}</td>
          <td><button type="button" class="btn btn btn-info" >编辑</button></td>
          <td><button type="button" class="btn btn-outline-danger" @click="deleteGame(game.gameId,index)">删除</button></td>
        </tr>
      </tbody>
    </table>
    </div>
  </div>
</template>

<script>

import { getGame, addGame, deleteGame } from 'network/gameManage';
import bulletin from "components/content/bulletin/Bulletin";
import modalAddGame from './childComps/modalAddGame';
export default {
  name: "GameManage",
   components: {
    bulletin,
    modalAddGame
  },
  data(){
    return{
      games: []
      
    }
  },

  mounted() {
    this.changeChild();
  },

  created(){
      this.getGame();
    },
 
  methods: {
    changeChild() {
      this.$refs.childbulletin.textArr = [
        { title: "裁判公告" },
        { title: "裁判对待比赛需公平公正，若发现违反请及时举报" },
        { title: "裁判长：小舔" },
        { title: "1号裁判：阿给" },
        { title: "2号裁判：元谋人" },
        { title: "3号裁判：小阿giao" }
        
      ]; // 滚动时间
      this.$refs.childbulletin.rotateTime = 2000;
    },

    getGame(){
      getGame().then(res => {
        console.log(res);
        this.games = res.game
      })
    },

    
    deleteGame(gameId,index){
      deleteGame(gameId).then(res=>{
        if(res.code == 200){
          this.$toast.suc("删除成功")
          this.games.splice(index,1)//在第1个实参数组中查找第2个实参提供的值，找到则删除该元素（有几个删除几个），如果删除的元素不是最后一个元素，需要把后边的元素依次向前移动。输出删除前后形参数组和实参数组中的所有元素。
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