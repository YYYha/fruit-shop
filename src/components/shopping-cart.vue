<template>
  <div class="mui-content">
    <div class="mui-scroll-wrapper">
      <div class="mui-scroll">
        <div >
          <div class="show" v-show="goodsList.length === 0">
            <img class="showImg" src="../assets/images/cartShow.png" alt="">
            <div @click="toShowItem">去逛逛</div>
          </div>
          <ul>
            <li v-for="item in goodsList" :key="item.goodsId"
            class="mui-table-view-cell mui-media mui-transitioning">
              <div class="mui-slider-right mui-disabled">
                <a class="mui-btn mui-btn-red fa fa-trash-o" @click="goodsDel(item.goodsId)" style="transform: translate(0px, 0px);">删除</a>
              </div>
              <div class="mui-slider-handle"  style="transform: translate(0px, 0px);">
                <div
                  @click="changeActive(item)"
                  :class="item.active ? 'cart-left-active' : 'cart-left'"
                ></div>
                <div class="cart-middle">
                  <img :src="item.image" alt />
                </div>
                <div class="cart-right" @click="toGoodsDetail(item.goodsId)">
                  <div>{{item.goodsName}}</div>
                  <div>24小时内发货</div>
                  <div>
                    ¥
                    <span>{{item.goodsPrice}}</span>
                  </div>
                  <div>库存{{item.stock}}件</div>
                </div>
                <div class="btn" ref="goodsNum">
                  <span @click="changeNum(false, item)">-</span>
                  <input class="inputNum" type="text" v-model="item.goodsNum" />
                  <span @click="changeNum(true, item)">+</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="total">
      <div @click="selectAll" :class="select ? 'select-active' : 'select'"></div>
      <div>全选</div>
      <div>不含运费 合计：</div>
      <div>
        ¥
        <span>{{count}}</span>
      </div>
      <div :class="count !== 0 ? 'toPay-active' : 'toPay'" @click="toPay">去结算</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      goodsList: [],
      select: false
    };
  },
  created() {
    this.$store.commit("modifyTitle", "购物车");
    this.getCartList();
  },
  methods: {
    // 获取购物车列表
    async getCartList() {
      let result = await this.$http.get("shoppingCart");
      if(result.data.code === 0) return
      let totalNum = 0
      result.data.forEach(item => {
        item.active = false;
        totalNum = totalNum + item.goodsNum
      });
      this.goodsList = result.data;
      this.$store.commit('modifyCartNum', totalNum)
    },
    // 跳转详情页
    toGoodsDetail(goodsId) {
      this.$router.push({
        name: "detail",
        params: {
          id: goodsId
        }
      });
    },
    // 购买数值改变
    async changeNum(isAdd, item) {
      let num = item.goodsNum;
      let stock = item.stock;
      if (num > stock) {
        this.$set(item, "goodsNum", stock);
      }
      
      // 请求改变数量
      let result = await this.$http.post('isAddNum', {
        isAdd: isAdd,
        cartId: item.id
      })
      if(result.data.code === 0){
        if (isAdd && num < stock) {
          this.$set(item, "goodsNum", ++num);
        } else if (!isAdd && 1 < num) {
          this.$set(item, "goodsNum", --num);
        }
      }

      // 修改购车总数
      let totalNum = 0
      this.goodsList.forEach(item=>{
        totalNum = totalNum + item.goodsNum
      })

      this.$store.commit('modifyCartNum', totalNum)
    },
    // 改变激活状态
    changeActive(item) {
      if (item.active) {// 取消选择
        this.$set(item, "active", false);
        let isSelect = this.goodsList.some(item=>{
          return item.active === true
        })
        if(isSelect){ // 判断是否要全选
          this.select = false
        }
      } else if(!item.active){ // 选择
        this.$set(item, "active", true);
        let isSelect = this.goodsList.some(item=>{
          return item.active === false
        })
        if(!isSelect){// 全选状态 为 false
          this.select = true
        }
      }

    this.goodsList.map
    },
    // 全选
    selectAll() {
      if(!this.select){
        this.goodsList.forEach(item => {
            item.active = true
        });
        this.select = true
      }else if(this.select){
        this.goodsList.forEach(item=>{
          item.active = false
        })
        this.select = false
      }
    },
    // 删除
    async goodsDel(goodsId){
      let result = await this.$http.get(`shoppingCartDel?goodsId=${goodsId}`)
      if(result.data.code === 0){
        this.mui.toast(result.data.msg)
        this.getCartList()
      }
    },
    toShowItem(){
      this.$router.push('/')
    },
    // 去结算
    toPay(){
      const buyList = []
      this.goodsList.forEach(item=>{
        if(item.active === true){
          buyList.push(item)
        }
      })
      if(buyList.length === 0) return
      this.$store.commit('modifyBuList', buyList)
      this.$router.push('/toPay')
    }
  },
  mounted() {
    this.mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005
    });
  },
  computed: {
    count(){
      let money = 0
      this.goodsList.forEach(item=>{
        if(item.active){
          money = money + item.goodsNum*item.goodsPrice
        }
      })
      return money
    }
  }
};
</script>
<style scoped>
/* cartShow */
.show{
  height: 550px;
  background: #fff;
}
.show>div{
  margin: 0 auto;
  margin-top: 20px;
  width: 70px;
  height: 30px;
  background: rgb(255, 72, 145);
  color: #fff;
  font-size: 14px;
  text-align: center;
  line-height: 30px;
  padding: 0 5px;
  border-radius: 5px;
}
.showImg{
  margin-top: 50px;
  width: 100%;
}
/* cartShow */

* {
  padding: 0;
  margin: 0;
}
.mui-slider-handle{
  display: flex;
}
.inputNum {
  width: 35px;
  padding: 0;
  text-align: center;
  border: none;
}
.mui-scroll {
  position: relative;
  padding: 50px 7px 110px 5px;
  margin-right: 10px;
}
.mui-content ul li {
  position: relative;
  list-style: none;
  display: flex;
  background: white;
  padding: 5px;
  /* align-items: center; */
  width: 100%;
  border-radius: 10px;
  margin-bottom: 5px;
}
.cart-left {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #cccccc;
  position: absolute;
  top: 41%;
  left: 3px;
}
.cart-left-active {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #9a51ff;
  background: rgb(255, 72, 145);
  position: absolute;
  top: 41%;
  left: 3px;
}
.cart-middle {
  padding: 0 5px 0 5px;
  padding-left: 25px;
}
.cart-middle img {
  width: 94px;
}
.cart-right {
  padding-left: 5px;
  position: relative;
  width: 100%;
}
.cart-right div:nth-child(1) {
  font-size: 16px;
  width: 230px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.cart-right div:nth-child(2) {
  font-size: 12px;
  border: 1px solid rgb(53, 180, 159);
  color: rgb(53, 180, 159);
  width: 80px;
  text-align: center;
  line-height: 18px;
  border-radius: 5px;
  margin: 6px 0;
}
.cart-right div:nth-child(3) {
  color: rgb(255, 72, 145);
  font-size: 12px;
}
.cart-right div:nth-child(3) span {
  font-size: 20px;
  font-weight: 600;
}
.cart-right div:nth-child(4) {
  font-size: 16px;
  color: #888;
}
.btn {
  font-size: 18px;
  position: absolute;
  bottom: -15px;
  right: 10px;
}
.btn span {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  color: white;
  text-align: center;
  font-size: 20px;
  background: #9a51ff;
}

/* 结算 */
.total {
  width: 100%;
  height: 60px;
  background: white;
  z-index: 999;
  position: absolute;
  bottom: 50px;
  left: 0px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.total .select{
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #cccccc;
}
.total .select-active{
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #9a51ff;
  background: rgb(255, 72, 145);
}
.total div:nth-child(2) {
  float: left;
  font-size: 16px;
}
.total div:nth-child(3) {
  float: right;
  font-size: 14px;
  color: #a8a8a8;
  margin-left: 35px;
}
.total div:nth-child(4) {
  float: right;
  color: rgb(255, 72, 145);
  font-size: 14px;
}
.total div:nth-child(4) span {
  font-size: 20px;
  font-weight: 600;
}
.total .toPay {
  float: right;
  width: 100px;
  height: 45px;
  background: #f5f5f5;
  border-radius: 10px;
  text-align: center;
  line-height: 45px;
  color: rgb(151, 150, 150);
}
.total .toPay-active{
  float: right;
  width: 100px;
  height: 45px;
  background: rgb(255, 72, 145);
  border-radius: 10px;
  text-align: center;
  line-height: 45px;
  color: #fff;
}
</style>
