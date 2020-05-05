<template>
  <div class="mui-content">
    <div class="user-message">
      <div>
        <img src="../../assets/images/banner5.png" alt />
      </div>
      <div>
        <span>{{userInfo[0].id}}</span>
        <span>{{userInfo[0].username}}</span>
      </div>
      <div class="yue">
        <div>余额</div>
        <span>¥{{userInfo[0].wallet}}</span>
      </div>
    </div>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell" @click="toModifyPass">
        <a class="mui-navigate-right">修改密码</a>
      </li>
      <li class="mui-table-view-cell" @click="toOrder">
        <a class="mui-navigate-right">我的订单</a>
      </li>
      <li class="mui-table-view-cell">
        <a class="mui-navigate-right" @click="address">我的收货地址</a>
      </li>
      <li class="mui-table-view-cell">
        <a class="out-login" @click="outLogin">退出登录</a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data(){
    return{
      userInfo: [
        {
          id: '',
          username: ''
        }
      ]
    }
  },
  created() {
    this.$store.commit("modifyTitle", "个人中心");
    this.getUserInfo()
  },
  methods: {
      async getUserInfo(){
        let result = await this.$http.get('getuserinfo')
        this.userInfo = result.data
        console.log(this.userInfo)
      },
      address(){
          this.$router.push('/address')
      },
      toModifyPass(){
        this.$router.push('/modifyPassword')
      },
      outLogin(){
        localStorage.removeItem('token')
        this.$router.push('/login')
      },
      toOrder(){
        this.$router.push('/orders')
      }
  }
};
</script>
<style scoped>
body{
    background-color: white !important;
}
.mui-content {
  padding: 0px;
}
.user-message {
  height: 100px;
  display: flex;
  background: rgb(255, 72, 145);
  color: #fff;
  padding: 20px;
  border-bottom: 1px solid rgb(245, 242, 242);
}

.user-message div:nth-child(1) img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.user-message div:nth-child(2) {
  margin-left: 20px;
  text-align: center;
  height: 60px;
}
.user-message div:nth-child(2) span {
  display: block;
  font-size: 16px;
}
.out-login{
    text-align: center;
    background: rgb(255, 72, 145);
    color: #fff !important;
}
.mui-table-view{
    font-size: 14px;
}
.user-message div:nth-child(3){
  
  text-align: center;
  margin-left: 20px;
}
</style>