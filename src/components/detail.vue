<template>
<div class="mui-content">
  <div class="mui-scroll-wrapper">
    <div class="mui-scorll">
      <div>
        <img class="detail-img" :src="goodsData.image" alt />
      </div>
      <div class="title">· 正品保障 · 一件包邮 · 配送全国 · 售后无忧</div>
      <div class="goods-message">
        <div>{{goodsData.goodsName}}</div>
        <div>{{goodsData.goodsDes}}</div>
        <div>
          <div>
            ¥
            <span>{{goodsData.goodsPrice}}</span>
          </div>&nbsp;/{{goodsData.weight}}
          <div>月销量 {{goodsData.saleNum}}件</div>
        </div>
      </div>
      <div class="peisong">
        配送
        <span>包邮，24小时内发货，因为交通情况派送或有延迟</span>
      </div>
      <div class="goods-detail">
        商品详情
        <div>
          <span>产地</span>
          <span>{{goodsData.detail[0]}}</span>
        </div>
        <div>
          <span>规格</span>
          <span>{{goodsData.detail[1]}}</span>
        </div>
        <div>
          <span>重量</span>
          <span>{{goodsData.detail[2]}}</span>
        </div>
        <div>
          <span>包装</span>
          <span>{{goodsData.detail[3]}}</span>
        </div>
        <div>
          <span>保质期</span>
          <span>{{goodsData.detail[4]}}</span>
        </div>
        <div>
          <span>贮藏方式</span>
          <span>{{goodsData.detail[5]}}</span>
        </div>
      </div>
      <div class="content">
        <div>商品评论:<span>({{commentList.length}})</span></div>
        <div class="content-item" v-for="item in commentList" :key="item.id">
          <div class="user-info">
            <span>用户名:{{item.username}}</span>
            <span>日期：<span>{{item.time.split('.')[0]}}</span></span>
          </div>
          <div class="content-info">{{item.content}}</div>
        </div>
      </div>
      
    </div>
  </div>
  <div class="addCart" @click="addCart">
    加入购物车
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      goodsData: {
        image: "",
        detail: ""
      },
      commentList: []
    };
  },
  created() {
    this.$store.commit("modifyTitle", "水果超市");
    this.getComment()
  },
  methods: {
    async getGoodsDetail() {
      let id = this.$route.params.id;
      let result = await this.$http.get(`goodsDetail?goodsId=${id}`);

      this.goodsData = result.data[0];
    },
    async getComment(){
      let goodsId = this.$route.params.id
      let result = await this.$http.get(`comment?goodsId=${goodsId}`)
      this.commentList = result.data
      console.log(this.commentList)
    },
    async addCart(){
      let goodsId = this.$route.params.id
      let result = await this.$http.post('addShoppingCart', {
        goodsId: goodsId
      })
      if(result.data.code === 0){
        this.mui.toast(result.data.msg)
      }


      let totalNum = this.$store.state.shoppingCartNum
      this.$store.commit('modifyCartNum', totalNum+1)

      
    }
  },
  mounted() {
    this.getGoodsDetail(); // 获取数据
    var gallery = this.mui(".mui-slider");
    gallery.slider({
      interval: 2000 //自动轮播周期
    });
    this.mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005
    });
  }
};
</script>
<style scoped>
.mui-scroll-wrapper {
  padding: 50px 5px 55px 5px;
}
.detail-img {
  width: 100%;
  height: 250px;
}
/* title */
.title {
  width: 100%;
  height: 40px;
  background: rgb(250, 222, 232);
  color: rgb(255, 69, 148);
  font-size: 14px;
  line-height: 40px;
  padding-left: 10px;
}
/* /title */
/* goods-message */
.goods-message {
  padding: 15px 10px;
  background: white;
}
.goods-message > div:nth-child(2) {
  color: rgb(148, 146, 146);
  font-size: 14px;
  margin: 10px 0;
}
.goods-message > div:nth-child(3) div:first-child {
  color: rgb(255, 69, 148);
  display: inline-block;
}
.goods-message > div:nth-child(3) div:first-child span {
  font-size: 26px;
}
.goods-message > div:nth-child(3) div:last-child {
  display: inline;
  float: right;
  font-size: 14px;
  color: rgb(148, 146, 146);
}
/* /goods-messages */
/* peisong */
.peisong {
  font-size: 14px;
  width: 100%;
  height: 40px;
  background: white;
  margin: 10px 0;
  line-height: 40px;
  padding-left: 5px;
}
.peisong span {
  color: rgb(148, 146, 146);
}
/* /peisong */
/* 商品详情 */
.goods-detail {
  background: rgb(255, 255, 255);
  padding: 15px 10px;
  font-size: 18px;
}

.goods-detail div {
  font-size: 14px;
  border: 1px solid #e5e5e5;
  border-top: 1px solid transparent;
}
.goods-detail div:first-child {
  margin-top: 15px;
  border-top: 1px solid #e5e5e5 !important;
}
.goods-detail div > span:first-child {
  display: inline-block;
  width: 150px;
  line-height: 30px;
  text-align: center;
  color: rgb(129, 129, 129);
}

/* /商品详情 */
/* 评论 */
.content{
  background: #fff;
  margin-top: 10px;
  padding: 10px;
}
.content-item{
  padding: 10px;
  box-shadow: 0 0 8px #ccc;
  margin-top: 5px;
  font-size: 16px;
  border-radius: 8px;
}
.user-info{
  display: flex;
  justify-content: space-between;
  color: rgb(131, 130, 130);
}
.content-info{
  margin-top: 5px;
}
.addCart{
  height: 30px;
  width: 80px;
  background: rgba(255, 69, 148, .9);
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  line-height: 28px;
  text-align: center;
  color: #fff;

  position: absolute;
  top: 450px;
  right: 0px;
  z-index: 99;
  font-size: 14px;
}
</style>