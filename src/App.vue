<template>
  <div id="app">
    <header class="mui-bar mui-bar-nav my-header">
      <span class="fa fa-map-marker"></span>
      <h1 class="mui-title">{{title}}</h1>
      <div class="search" @click="search">
        <span class="fa fa-search"></span> 大连樱桃甜美上市
      </div>
    </header>
    <nav class="mui-bar mui-bar-tab footer my-footer">
      <a href="javascript:;" :class="[title ==='水果超市'?'active':'',' mui-tab-item']" @click="index">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </a>
      <a href="javascript:;" :class="[title ==='分类中心'?'active':'',' mui-tab-item']" @click="category">
        <span class="mui-icon mui-icon-bars"></span>
        <span class="mui-tab-label">分类</span>
      </a>
      <a href="javascript:;" :class="[title ==='购物车'?'active':'',' mui-tab-item', 'shopRoot']"  @click="shoppingCart">
        
        <span class="mui-icon fa fa-shopping-cart" style="position: relative; display: inline-block;">
          <div
         v-if="this.$store.state.shoppingCartNum !== 0"
         class="circle">{{cartNum}}</div>
        </span>
        <span class="mui-tab-label">购物车</span>
      </a>
      <a href="javascript:;" :class="[title ==='个人中心'?'active':'',' mui-tab-item']" @click="user">
        <span class="mui-icon mui-icon-person"></span>
        <span class="mui-tab-label">个人中心</span>
      </a>
    </nav>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data(){
    return{
     
    }
  },
  created() {
    
  },
  mounted(){
      this.mui.confirm(
        "此网站仅用于学习、测试，不存在任何的真实交易、与发货。",
        "使用须知",
        ["同意", "拒绝"],
        res => {
          if(res.index !== 0){
            location.href = 'http://www.baidu.com'
            return
          }
        }
      )
  },
  computed: {
    title() {
      return this.$store.state.title;
    },
    cartNum(){
      return this.$store.state.shoppingCartNum
    }
  },
  methods: {
    index() {
      this.$router.push("/index");
    },
    category() {
      this.$router.push("/category");
    },
    shoppingCart() {
      this.$router.push("/shoppingCart");
    },
    user() {
      this.$router.push("/user");
    },
    search(){
      this.$router.push('/search')
    }
  }
};
</script>
<style scoped>
* {
  touch-action: none;
}
.mui-active {
  color: #929292 !important;
}
.active{
  color: rgb(255, 72, 145) !important;
}
.app {
  background: #ffffff !important;
}
nav {
  margin-left: -1px;
}
.mui-title {
  text-align: left;
  color: rgb(255, 72, 145);
  font-weight: 600;
  letter-spacing: 3px;
  font-size: 22px;
  padding-left: 10px;
}
.fa-map-marker {
  font-size: 26px;
  display: inline-block;
  margin-left: 10px;
  color: #9a51ff;
  line-height: 42px;
}
.my-header {
  position: relative;
}
.search {
  position: absolute;
  top: 8px;
  right: 0px;
  width: 200px;
  line-height: 30px;
  background: rgb(235, 233, 233);
  font-size: 14px;
  text-align: center;
  border-radius: 15px;
  color: rgb(134, 134, 134);
  margin-right: 10px;
}
.shopRoot {
  position: relative;
}
.circle {
  width: 17px;
  height: 17px;
  line-height: 16px;
  background: rgb(255, 72, 145);
  position: absolute;
  top: -4px;
  right: -16px;
  color: #fff;
  font-size: 12px;
  border-radius: 50%;
  border-bottom-left-radius: 0;
}
</style>>
