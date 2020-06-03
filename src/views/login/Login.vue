<template>
  <div class="login">
    <h1>登陆</h1>
    <div class="login-form">
      <form>
        <div class="form-group">
          <label for="exampleInputEmail1">用户名</label>
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
          <small id="emailHelp" class="form-text text-muted">We'll never share your username with anyone else.</small>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">密码</label>
          <input type="password" class="form-control" id="exampleInputPassword1">
        </div>
        <div class="form-group form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1">
          <label class="form-check-label" for="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" class="btn btn-primary btn-block" @click="Login">login</button>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Login',
  methods: {
    Login(){
      this.$router.push("/dashboard");
    }
  }
}
</script>

<style scoped>
.login{
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  bottom: 100px;
}
.login-form{
  width: 40%;
  margin: 0 auto;
}
</style>