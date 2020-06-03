<template>
    <div class="navbar">
        <div class="left"><slot name="left"></slot></div>
        <div class="center"><slot name="center"></slot></div>
        <div class="right"><slot name="right"></slot></div>
    </div>
</template>

<script>

    export default {
        name: "NavBar"
    }
</script>

<style scoped>
.navbar{
    display: flex;
    width: 100%;
}
.center{
    width: 30%;
    text-align: center;
}
.left{
    width: 30%;
}
.right{
    width: 40%;
}
</style>