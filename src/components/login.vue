<template>
  <div>
    <div class="mui-content content">
      <form class="mui-input-group">
        <div class="mui-input-row">
          <label>用户名</label>
          <input type="text" class="mui-input-clear" v-model="user.username" placeholder="请输入用户名" />
        </div>
        <div class="mui-input-row">
          <label>密码</label>
          <input
            type="password"
            class="mui-input-password"
            v-model="user.password"
            placeholder="请输入密码"
          />
        </div>
        <div class="mui-button-row">
          <button type="button" class="mui-btn mui-btn-primary" :disabled="disabled" @click="login">登录</button>
        </div>
      </form>
      <a href="javascript:;" @click="register" class="login-now">免费注册</a>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        username: "",
        password: ""
      },
      disabled: false
    };
  },
  created() {
    this.$store.commit("modifyTitle", "登陆");
    this.$store.commit('modifyCartNum', 0)
  },
  methods: {
    register() {
      this.$router.push("/register");
    },
    async login() {
      if (this.user.username.trim().length === 0) {
        this.mui.alert("用户名不能为空");
        return;
      } else if (this.user.password.trim().length < 6) {
        this.mui.alert("密码长度至少6位");
        return;
      }
      this.disabled = true
      let result = await this.$http.post('login', this.user)
      this.disabled = false
      this.mui.toast(result.data.msg)
      if(result.data.code === 0){
        localStorage.setItem('token', result.data.token)
        setTimeout(()=>{
          this.$router.push('/index')
        }, 2000)
      }
    }
  }
};
</script>
<style scoped>
.mui-input-row {
  margin-bottom: 10px;
}
.login-now {
  font-size: 14px;
  float: right;
  margin-right: 15px;
}
</style>>
