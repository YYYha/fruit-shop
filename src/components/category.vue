<template>
  <div class="mui-content">
    <div class="content-box">
      <div class="category-left">
        <div class="mui-scroll-wrapper">
          <div class="mui-scroll">
            <div class="links " id="links">
              <a href="javascript:;" 
              v-for="item in oneCategory" :key="item.id"
              @click="getTowCategory(item.id)"
              :class="active === item.id ? 'active-cate' : ''"
              >{{item.name}}</a>
            </div>
          </div>
        </div>
      </div>
      <div class="category-right">
        <div class="mui-scroll-wrapper">
          <div class="mui-scroll">
            <ul class="brand-list mui-clearfix" id="brand-list">
              <li v-for="item in towCategory" :key="item.goodsId"
              
              >
                <div class="brand-list-left">
                  <img :src="item.image" alt />
                </div>
                <div class="brand-list-right" @click="toGoodsDetail(item.goodsId)">
                  <div>{{item.goodsName}}</div>
                  <div>{{item.goodsDes}}</div>
                  <div>24小时内发货</div>
                  <div>
                    ¥
                    <span>{{item.goodsPrice}}</span>
                  </div>
                </div>
                <div class="addBtn" @click="addShoppingCart(item.goodsId)">+</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      oneCategory: null,
      towCategory: null,
      active: 0
    }
  },
  async created() {
    this.$store.commit("modifyTitle", "分类中心");

    let result = await this.$http.get('category')
    this.oneCategory = result.data

    this.getTowCategory(1)
  },
  methods: {
    async getTowCategory(id){
      let result = await this.$http.get(`categroyTow?categoryId=${id}`)
      this.towCategory = result.data

      this.active = id
    },
    toGoodsDetail(goodsId){
      this.$router.push({name: 'detail', params: {
        id: goodsId
      }})
    },
    // 添加购物车
    async addShoppingCart(goodsId){
      let result = await this.$http.post('addShoppingCart', {
        goodsId: goodsId
      })
      console.log(result.data)
      if(result.data.code === 0){
        this.mui.toast(result.data.msg)
      }
      let totalNum = this.$store.state.shoppingCartNum
      this.$store.commit('modifyCartNum', totalNum+1)
    }
  },
  mounted() {
    this.mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005
    });
  }
};
</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
}
.content-box {
  padding: 5px;
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 50px;
  background-color: #f5f5f5;
}

.category-left,
.category-right {
  height: 100%;
  position: relative;
}
.content-box .category-left {
  width: 78px;
  float: left;
}
.content-box .category-right {
  margin-left: 78px;
}

/* 左侧边栏 */
.category-left .links {
  background-color: #fff;
}
.category-left .links a {
  display: block;
  line-height: 45px;
  text-align: center;
  color: black;
  font-size: 16px;
  border-right: 1px solid #e0e0e0;
}
.category-left .links .active {
  background-color: #f5f5f5;
  border-right: 1px solid transparent;
}
/* 左侧边栏 */

/* 右侧边栏 */
.category-right {
  margin-left: -10px;
}
.category-right .brand-list {
  margin-top: 5px;
  background-color: #f5f5f5;
}
.category-right .brand-list li {
  width: 100%;
  display: flex;
  background: white;
  margin-bottom: 1px;
  padding-top: 10px;
  position: relative;
}
.brand-list {
  background: #f5f5f5;
}
.brand-list-left {
  padding-left: 3px;
}
.brand-list-left img {
  width: 90px;
}
.brand-list-right {
  padding: 5px 0 5px 5px;
}
.brand-list-right div:first-child {
  width: 190px;
  font-size: 17px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.brand-list-right div:nth-child(2) {
  font-size: 14px;
  color: rgb(156, 158, 162);
}
.brand-list-right div:nth-child(3) {
  font-size: 12px;
  color: rgb(156, 158, 162);
  border: 1px solid rgb(150, 152, 164);
  display: inline-block;
  padding: 0 3px;
  height: 20px;
  border-radius: 10px;
  margin: 0 0 3px 0;
}
.brand-list-right div:nth-child(4) {
  font-size: 12px;
  color: rgb(255, 72, 145);
}
.brand-list-right div:nth-child(4) span {
  font-size: 18px;
  font-weight: 600;
}
.addBtn {
  width: 22px;
  height: 22px;
  background: rgb(255, 72, 145);
  border-radius: 50%;
  text-align: center;
  line-height: 18px;
  color: white;
  font-size: 28px;
  position: absolute;
  bottom: 10px;
  right: 10px;
}
/* /右侧边栏 */
.active-cate{
  background: rgb(255, 72, 145);
  color: #fff !important;
}
</style>>
