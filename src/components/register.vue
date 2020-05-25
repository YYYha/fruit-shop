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
          <a href="#" class="getCode" @click="getCode">{{codeMsg}}</a>
        </div>
        <div class="mui-button-row">
          <button type="button" @click="register" :disabled="disabled" class="mui-btn mui-btn-primary">注册</button>
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
      },
      disabled: false,
      codeMsg: '获取验证码',
      interval: null
    };
  },
  created() {
    // console.log(this.$route.name);
    this.$store.commit("modifyTitle", "注册");
  },
  beforeDestroy() {
      clearInterval(this.interval);
  },
  methods: {
    login() {
      // 登录页跳转
      this.$router.push("/login");
    },
    async getCode() {
      let Rex = /^\d{5,12}@[qQ][qQ]\.(com|cn)$/
      // 获取邮箱验证码
      if (this.user.username.trim().length === 0) {
        this.mui.alert("用户名不能为空");
        return;
      } else if (this.user.email.trim().length === 0) {
        this.mui.alert("邮箱不能为空");
        return;
      } else if(!Rex.test(this.user.email.trim())){
        this.mui.alert("邮箱格式错误");
        return
      }
      // 如果在计时，就不能发请求
      if(this.interval !==null)return 
      // 发起获取验证码请求
      let result = await this.$http.post("getCode", {
        username: this.user.username,
        email: this.user.email
      });
     
      console.log(result.data);
      if (result.data.code === 0) {
          // 定时器
          let num = 30
          this.interval = setInterval(() => {
            if(num === 0){
              clearInterval(this.interval)
              this.interval = null
              this.codeMsg = '获取验证码'
              return
            }
            num = parseInt(num)-1
            this.codeMsg = `已发送${num}s`
            console.log(num)
          }, 1000);
      }
      this.mui.toast(result.data.msg);
    },
    async register() {
      let Rex = /^\d{5,12}@[qQ][qQ]\.(com|cn)$/
      if (this.user.username.trim().length === 0) {
        this.mui.alert("用户名不能为空");
        return;
      } else if (this.user.email.trim().length === 0) {
        this.mui.alert("邮箱不能为空");
        return;
      } else if(!Rex.test(this.user.email.trim())){
        this.mui.alert("邮箱格式错误");
        return
      }else if (this.user.password.trim().length < 6) {
        this.mui.alert("密码长度至少6位");
        return;
      } else if (this.user.againPass.trim().length < 6) {
        this.mui.alert("确认密码长度至少6位");
        return;
      } else if (this.user.vCode.trim().length === 0) {
        this.mui.alert("请输入正确的认证码");
        return;
      }else if(this.user.password !== this.user.againPass){
        this.mui.alert('两次输入的密码不一致')
        return
      }
      this.disabled = true
      let result = await this.$http.post('register', this.user)
      this.disabled = false
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