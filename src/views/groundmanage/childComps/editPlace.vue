<template>
  <div @editPlace="gotPlace">
  <button class="btn btn-outline-warning" onclick="document.getElementById('modalEdit').style.display='block'" style="width:auto;">修改</button>
  
   <div id="modalEdit" class="modal">
     <div class="modal-content animate">
         <div>
            <!-- 点击×号，隐藏模态框-->
            <span onclick="document.getElementById('modalEdit').style.display='none'" class="close" title="Close Modal">&times;</span>
        </div>
        <form @submit.prevent="editPlace">
        <div class="container">
         <label for="placeName"><b>场地名字</b></label>
         <input  id="placeName" v-model="currentPlace.placeName">
         <label  for="location"><b>场地位置</b></label>
         <input  id="location" v-model="currentPlace.location">
          <button class="btn btn-primary" type="submit">确认修改</button>
        </div>
        </form>
    </div>
   </div>
  </div>


</template>

<script>
import { changePlace } from "network/place";
export default {
    name:"editPlace",
    data(){
        return{
            currentPlace:{
                idPlace: " ",
                placeName: " ",
                location: " "
            }

        }
    },
    created(){
        thsi.setPlace();
    },
    activated(){
        this.setPlace();
    },
    methods:{
        setPlace(){
            this.currentPlace.idPlace = this.$route.query.idPlace;
            this.currentPlace.placeName = this.$route.query.placeName;
            this.currentPlace.location = this.$route.query.location;
        },
        editPlace(){
            changePlace(this.currentPlace.idPlace,this.currentPlace.placeName,this.currentPlace.location).then(res =>{
                console.log(res);
                if(res.code == 200){
                    this.$toast.suc("修改成功");
                    this.$router.push("place");
                }
            })
        }
    }

}
</script>

<style>
 input{
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        box-sizing: border-box;
    }


    /* The Modal (background) */
    .modal {
        display: none; /* Hidden by default */
        position: fixed; /* Stay in place */
        z-index: 1; /* Sit on top */
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgb(0,0,0); /* Fallback color */
        background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
        padding-top: 60px;
    }

    /* Modal Content/Box */
    .modal-content {
        background-color: #fefefe;
        margin: 2% auto 20% auto; /* 2% from the top, 20% from the bottom and centered */
        border: 1px solid #888;
        width: 500px; /* Could be more or less, depending on screen size */
    }

    /* The Close Button (x) */
    .close {
        position: absolute;
        right: 25px;
        top: 0;
        color: #000;
        font-size: 35px;
        font-weight: bold;
    }

    .close:hover,
    .close:focus {
        color: red;
        cursor: pointer;
    }

    /* Add Zoom Animation */
    .animate {
        -webkit-animation: animatezoom 0.6s;
        animation: animatezoom 0.6s
    }

    @-webkit-keyframes animatezoom {
        from {-webkit-transform: scale(0)}
        to {-webkit-transform: scale(1)}
    }

    @keyframes animatezoom {
        from {transform: scale(0)}
        to {transform: scale(1)}
    }

    /* Change styles for span and cancel button on extra small screens */
    @media screen and (max-width: 300px) {
        span.psw {
            display: block;
            float: none;
        }
        .cancelbtn {
            width: 100%;
        }
    }
</style>