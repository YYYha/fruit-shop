<template>
  <div class="mui-scroll-wrapper">
    <div class="mui-scroll">
      <div class="mui-content">
        <!-- 轮播图 -->
        <div class="mui-slider">
          <div class="mui-slider-group">
            <div class="mui-slider-item">
              <a href="#">
                <img style="height: 270px;" src="../assets/images/goods.png" />
              </a>
            </div>
            <div class="mui-slider-item">
              <a href="#">
                <img style="height: 270px;" src="../assets/images/goods/category.png" />
              </a>
            </div>
            <div class="mui-slider-item">
              <a href="#">
                <img src="../assets/images/banner5.png" />
              </a>
            </div>
            <div class="mui-slider-item">
              <a href="#">
                <img src="../assets/images/banner6.png" />
              </a>
            </div>
            <div class="mui-slider-item">
              <a href="#">
                <img src="../assets/images/banner5.png" />
              </a>
            </div>
            <div class="mui-slider-item">
              <a href="#">
                <img src="../assets/images/banner6.png" />
              </a>
            </div>
          </div>
          <div class="mui-slider-indicator">
            <div class="mui-indicator mui-active"></div>
            <div class="mui-indicator"></div>
            <div class="mui-indicator"></div>
            <div class="mui-indicator"></div>
            <div class="mui-indicator"></div>
            <div class="mui-indicator"></div>
          </div>
        </div>
        <!-- /轮播图 -->
        <!-- 文字 -->
        <div class="text">
          <span class="fa fa-shield">&nbsp;&nbsp;正品保障</span>
          <span class="fa fa-archive">&nbsp;&nbsp;一件包邮</span>
          <span class="fa fa-truck">&nbsp;&nbsp;配送全国</span>
          <span class="fa fa-headphones">&nbsp;&nbsp;售后无忧</span>
        </div>
        <!-- /文字 -->
        <!-- banner -->
        <div class="banner">
          <div>
            <img src="../assets/images/banner/banner1.png" alt />
            热销榜单
          </div>
          <div>
            <img src="../assets/images/banner/banner2.png" alt />
            吃点好的
          </div>
          <div>
            <img src="../assets/images/banner/banner3.png" alt />
            低价包邮
          </div>
          <div>
            <img src="../assets/images/banner/banner4.png" alt />
            上新专区
          </div>
        </div>
        <div class="banner-category">
          <div class="banner-category-top">
            <div>
              <div>
                <span>鲜活食材</span>
                <span>满口真滋味</span>
              </div>
              <img src="../assets/images/banner/banner5.png" alt />
            </div>
            <div>
              <div>
                <span>防疫健康</span>
                <span>全家放心</span>
              </div>
              <img src="../assets/images/banner/banner6.png" alt />
            </div>
          </div>
          <div class="banner-category-bottom">
            <div>
              <div>
                <span>甄选鲜果</span>
                <span>满满维生素</span>
              </div>
              <img src="../assets/images/banner/banner7.png" alt />
            </div>
            <div>
              <div>
                <span>乳品零食</span>
                <span>好吃就多吃</span>
              </div>
              <img src="../assets/images/banner/banner8.png" alt />
            </div>
            <div>
              <div>
                <span>省钱攻略</span>
                <span>银行卡满减</span>
              </div>
              <img src="../assets/images/banner/banner9.png" alt />
            </div>
          </div>
        </div>
        <!-- /banner -->
        <!-- 商品列表 -->
        <div class="goods-list">
          <div class="goods-list-items" @click="toGoodsDetail(item.goodsId)"
          v-for="item in goodsList" :key="item.goodsId">
            <div class="goods-list-items-left">
              <img :src="item.image" alt />
              <img src="../assets/images/goods/goodsTag.png" alt />
            </div>
            <div class="goods-list-items-right">
              <div>{{item.goodsName}}</div>
              <div>{{item.goodsDes}}</div>
              <div>24小时内发货</div>
              <div>
                ¥
                <span>{{item.goodsPrice}}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 商品列表 -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      goodsList: []
    }
  },
  created() {
    this.$store.commit("modifyTitle", "水果超市");
    this.getTotalNum();
    this.getGoodsList()
  },
  methods: {
    async getTotalNum() {
      let result = await this.$http.get("shoppingCart");
      if (result.data.code === 1) return;
      let goodsList = result.data || [];
      let totalNum = 0;
      console.log(goodsList);
      goodsList.forEach(item => {
        totalNum = totalNum + item.goodsNum;
      });
      this.$store.commit("modifyCartNum", totalNum);
    },
    toGoodsDetail(goodsId){
      this.$router.push({name: 'detail', params: {
        id: goodsId
      }})
    },
    async getGoodsList(){
      let result = await this.$http.get('goodslist')
      if(result.status !== 200) return
      console.log(result.data)
      this.goodsList = result.data
    }
  },
  mounted() {

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
.mui-content {
  padding: 50px 10px 50px 10px;
  background: white;
}
.mui-slider {
  border-radius: 10px;
  box-shadow: 0 10px 10px rgb(245, 247, 246);
}
.text {
  line-height: 40px;
}
.text > span {
  display: inline-block;
  width: 25%;
  text-align: center;
  font-size: 12px;
  color: rgb(255, 69, 148);
}
.banner {
  display: flex;
}
.banner > div {
  width: 25%;
  padding: 12px;
  font-size: 14px;
  text-align: center;
}
.banner img {
  width: 100%;
}

.banner-category {
  margin-bottom: 15px;
}
.banner-category-top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.banner-category-top > div {
  width: 49%;
  background: rgb(255, 241, 244);
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  padding: 10px;
}
.banner-category-top img {
  width: 50px;
  height: 50px;
}
.banner-category-top > div > div {
  font-size: 12px;
  color: #aaa;
}
.banner-category-top > div > div > span:first-child {
  display: block;
  color: black;
  font-size: 16px;
  font-weight: 600;
}
.banner-category-bottom {
  display: flex;
  justify-content: space-between;
}
.banner-category-bottom > div {
  width: 32%;
  background: rgb(255, 241, 244);
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  height: 55px;
  padding: 3px;
}
.banner-category-bottom > div > div span:last-child {
  font-size: 12px;
  font-weight: normal;
  display: block;
}
.banner-category-bottom > div > img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-top: 10px;
}

/* 商品列表 */
.goods-list {
  width: 100%;
}
.goods-list-items {
  display: flex;
  padding: 5px;
  margin-bottom: 10px;
}
.goods-list-items-left {
  font-size: 16px;
  width: 150px;
  position: relative;
}
.goods-list-items-left img:first-child {
  width: 90px;
  height: 90px;
}
.goods-list-items-left img:last-child {
  width: 30px;
  height: 30px;
  border-radius: 5px;
  position: absolute;
  top: -8px;
  right: 2px;
}
.goods-list-items-right {
  font-family: "微软雅黑";
  border-bottom: 1px solid rgb(230, 230, 230);
  width: 100%;
  height: 140px;
}
.goods-list-items-right div:nth-child(2) {
  color: rgb(148, 148, 148);
  font-size: 15px;
}
.goods-list-items div:nth-child(3) {
  margin: 3px 0;
  font-size: 13px;
  color: rgb(150, 150, 150);
  width: 88px;
  text-align: center;
  border: 1px solid rgb(150, 150, 150);
  border-radius: 15px;
}
.goods-list-items div:nth-child(4) {
  font-size: 12px;
  color: rgb(255, 69, 148);
  overflow: hidden;
}
.goods-list-items div:nth-child(4) span:first-child {
  font-size: 16px;
  font-weight: 600;
}

</style>