<template>

   <div id="modalEdit" class="modal modalself">
     <div class="modal-content animate">
         <div>
            <!-- 点击×号，隐藏模态框-->
            <span @click="closeModal()" class="close" title="Close Modal">&times;</span>
        </div>
        <form>
        
        <div class="container">
         <div><label><b>当前场地编号： </b><span>{{currentPlace.idPlace}}</span></label></div>
         <label for="placeName"><b>场地名字</b></label>
         <input  id="placeName" v-model="currentPlace.placeName">
         <label  for="location"><b>场地位置</b></label>
         <input  id="location" v-model="currentPlace.location">
         
        </div>
        </form>
        <div>
  <button class="btn btn-primary"  @click="editPlace()">确认修改</button>
  <button class="btn btn-primary" @click="closeModal()">取消</button>
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
           currentPlace:Object

        }
    },
    props:{
       placeMsg:Object
    },
    created(){
        this.currentPlace = this.placeMsg
    },
    methods:{

        editPlace(){
            changePlace(this.currentPlace.idPlace,this.currentPlace.placeName,this.currentPlace.location).then(res =>{

                if(confirm("是否要修改")==true){
                if(res.code == 200){
                    this.$toast.suc("修改成功");
                    this.$emit('ifShowEditModal');
                
                }}
            })
        },
        closeModal(){
            this.$emit('ifShowEditModal');
        }
    }

}
</script>

<style>
button{
    width:100px;
    margin-right: 20px;
    margin-bottom: 10px;
}
 input{
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        box-sizing: border-box;
    }


    /* The Modal (background) */
    .modalself {
        display: block; /* Hidden by default */
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
    .container{
        margin-top:50px;
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