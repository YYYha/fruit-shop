<template>
  <div>
    <div class="mui-content content">
      <form class="mui-input-group">
        <div class="mui-input-row">
          <label>用户名</label>
          <input type="text" class="mui-input-clear" v-model="user.username" placeholder="请输入用户名" />
        </div>
        <div class="mui-input-row">
          <label>邮箱</label>
          <input type="text" class="mui-input-clear" v-model="user.email" placeholder="请输入邮箱" />
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
        <div class="mui-input-row">
          <label>确认密码</label>
          <input
            type="password"
            class="mui-input-password"
            v-model="user.againPass"
            placeholder="请确认密码"
          />
        </div>
        <div class="mui-input-row" id="code">
          <label>认证码</label>
          <input type="text" class="mui-input-clear" v-model="user.vCode" placeholder="认证码" />
          <a href="#" class="getCode" @click="getCode">获取认证码</a>
        </div>
        <div class="mui-button-row">
          <button type="button" @click="register" class="mui-btn mui-btn-primary">注册</button>
        </div>
      </form>
      <a href="javascript:;" @click="login" class="login-now">立即登录</a>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
        againPass: "",
        vCode: ""
      }
    };
  },
  created() {
    // console.log(this.$route.name);
    this.$store.commit("modifyTitle", "注册");
  },
  methods: {
    login() {
      // 登录页跳转
      this.$router.push("/login");
    },
    async getCode() {
      // 获取邮箱验证码
      if (this.user.username.trim().length === 0) {
        this.mui.alert("用户名不能为空");
        return;
      } else if (this.user.email.trim().length === 0) {
        this.mui.alert("邮箱不能为空");
        return;
      }
      let result = await this.$http.post("getCode", {
        username: this.user.username,
        email: this.user.email
      });
      console.log(result.data);
      if (result.data.code === 1) {
        this.mui.toast(result.data.msg);
        return
      }
      if (result.data.code === 0) {
        this.mui.toast(result.data.msg);
     
      }
    },
    async register() {
      if (this.user.username.trim().length === 0) {
        this.mui.alert("用户名不能为空");
        return;
      } else if (this.user.email.trim().length === 0) {
        this.mui.alert("邮箱不能为空");
        return;
      } else if (this.user.password.trim().length < 6) {
        this.mui.alert("密码长度至少6位");
        return;
      } else if (this.user.againPass.trim().length < 6) {
        this.mui.alert("密码长度至少6位");
        return;
      } else if (this.user.vCode.trim().length === 0) {
        this.mui.alert("请输入正确的认证码");
        return;
      }else if(this.user.password !== this.user.againPass){
        this.mui.alert('两次输入的密码不一致')
        return
      }
      let result = await this.$http.post('register', this.user)
      console.log(result.data)
      this.mui.toast(result.data.msg)
      if(result.data.code === 0){
        setTimeout(()=>{
          this.$router.push('/login')
        }, 1000)
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
.getCode {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>