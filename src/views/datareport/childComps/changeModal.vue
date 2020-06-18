<template>
<div id="changeModal" class="modal modal1">
    <div class="modal-content animate">
        <div class="imgcontainer">
            <!-- 点击×号，隐藏模态框-->
            <span @click="closeSelf()" class="close" title="Close Modal">&times;</span>
        </div>

        <div class="container">
            <div>
                <label><b>交易单号：</b><span>{{trading.tradingId}}</span></label>
                <span class="remark">（不能修改）</span>
            </div>
            <div>
                <label><b>交易用户：</b><span>{{trading.userId}}</span></label>
                <span class="remark">（会修改成当前登录的用户id）</span>
            </div>


            <label><b>交易类型</b></label>
            <select class="form-control" v-model="trading.tradingType">
                <option value ="1">支出</option>
                <option value ="2">收入</option>
            </select>

            <label><b>交易方</b></label>
            <input type="text" v-model="trading.counterParty" placeholder="请输入交易方" id="counterParty">

            <label><b>金额</b></label>
            <input type="text" v-model="trading.transactionAmount" placeholder="请输入金额" id="transactionAmount">

            <label><b>内容</b></label>
            <input type="text" v-model="trading.tradingContent" placeholder="请输入金额" id="tradingContent">

            <button  class="btn btn-outline-primary my-btn" @click="changeTrading()">确认</button>

            <button  class="btn btn-outline-primary my-btn"  @click="closeSelf()">取消</button>
        </div>

    </div>
</div>

</template>

<script>
import {changeTrading} from 'network/trading';

export default {
 name:"changeModal",
    data(){
        return{
            trading:Object
        }
    },
    props: {
        aTrading:Object
    },
    created(){
        this.trading=this.aTrading
    },
    methods:{
        changeTrading(){
            changeTrading(this.trading.tradingId,this.trading.userId,this.trading.tradingType,this.trading.counterParty,this.trading.transactionAmount,this.trading.tradingContent).then(res=>{
                if (res.code==200) {
                    this.$toast.suc(res.msg);
                    this.$emit('changeIsShowChangeModal');
                }else{
                    this.$toast.err("错误")
                }
            })
        },

        closeSelf() {
            this.$emit('changeIsShowChangeModal');      
        },

    }
}
</script>

<style>
 input{
        width: 100%;
        height: 50px;
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-sizing: border-box;
    }
.my-btn{
    margin-top: 20px;
    margin-right: 5px;
    margin-bottom: 20px;
}
.container{
    margin-top: 50px;
}

    /* The Modal (background) */
    .modal1 {
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

    /* The Close Button (x) */
    .close {
        position: absolute;
        right: 25px;
        top: 0;
        color: #000;
        font-size: 35px;
        font-weight: bold;
    }
    .remark{
        font-weight: 5px;
        color: #888;
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