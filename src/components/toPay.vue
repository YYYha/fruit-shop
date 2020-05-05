<template>
  <div class="mui-content">
    <div class="mui-scroll-wrapper">
      <div class="mui-scroll">
        <div class="address" @click="selectAddress">
          <div class="noAddress" v-if="!address.id">
            <span class="fa fa-edit"></span>
            <span>请填写收货地址</span>
          </div>
          <div v-else>
            <div class="address-detail">
              <span class="fa fa-paper-plane-o"></span>
              <span>{{address.address}}</span>
            </div>
            <div class="receiver">
              <span>{{address.receiver}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
              <span>{{address.phone}}</span>
            </div>
          </div>
          <div class="gt">&gt;</div>
        </div>
        <div class="content">
          <div class="jsd">极速达</div>
          <div class="goods-list">
            <div>
              <div class="goods-item" v-for="item in buyList" :key="item.id">
                <div class="goods-item-left">
                  <img :src="item.image" alt />
                </div>
                <div class="goods-item-right">
                  <div>{{item.goodsName}}</div>
                  <div>{{item.goodsDes}}</div>
                  <div>
                    价格:&nbsp;
                    <span>¥&nbsp;{{item.goodsPrice}}</span> x
                    <span>{{item.goodsNum}}</span>
                  </div>
                  <div>
                    小计:
                    <span>¥&nbsp;{{item.goodsPrice * item.goodsNum}}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="pay-message">
              <div>
                <span>商品金额</span>
                <span>¥&nbsp;{{money}}</span>
              </div>
              <div>
                <span>
                  基础配送费
                  <span class="tips" v-if="sendMoney === 8">
                    <span class="fa fa-info"></span>
                    满88元，免配送费哦
                  </span>
                </span>

                <span>¥&nbsp;{{sendMoney}}</span>
              </div>
              <div>
                <span>订单备注</span>
                <span>
                  <input class="goods-input" placeholder="订单备注" type="text" />
                </span>
              </div>
            </div>
            <div class="pay-bottom"></div>
            <div class="total-money">
              <div>
                小计：¥&nbsp;
                <span>{{ totalMoney }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="to-pay">
      <div class="to-pay-content">
        <div>
          待支付:
          <span>¥&nbsp;{{totalMoney}}</span>
        </div>
        <div @click="toPay">去支付</div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
    
  mounted() {
    this.mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005
    });
  },
  created() {
    this.$store.commit("modifyTitle", "订单填写");
  },
  computed: {
    buyList() {
      return this.$store.state.buyList;
    },
    money() {
      let money = 0;
      this.$store.state.buyList.forEach(item => {
        money = money + item.goodsPrice * item.goodsNum;
      });
      return money;
    },
    sendMoney() {
      let money = 0;
      this.$store.state.buyList.forEach(item => {
        money = money + item.goodsPrice * item.goodsNum;
      });
      return money > 88 ? 0 : 8;
    },
    totalMoney() {
      let money = 0;
      this.$store.state.buyList.forEach(item => {
        money = money + item.goodsPrice * item.goodsNum;
      });
      let sendMoney = 0;
      money > 88 ? (sendMoney = 0) : (sendMoney = 8);
      return money + sendMoney;
    },
    address() {
      return this.$store.state.selectAddress;
    }
  },
  methods: {
    async toPay() {
      let password = "";
      this.mui.prompt(
        "正在支付中···",
        "请输入支付密码",
        "提示",
        ["取消", "支付"],
        async res => {
            if (res.index === 0) return;

            password = res.value;

            let order = this.$store.state.buyList;
            let address = this.$store.state.selectAddress;
            if (!address.address) {
                this.mui.toast("请选择地址");
                return;
            }

            let result = await this.$http.post("addOrder", {
                goodsList: order,
                address: address,
                totalMoney: this.totalMoney,
                password: password
            });
            console.log(result.data);
            this.mui.toast(result.data.msg);
            if (result.data.code === 0) {
                setTimeout(() => {
                    this.$router.push("/orders");
                }, 2000);

                let num = 0;
                order.forEach(item => {
                    num = num + item.goodsNum;
                });
                this.$store.commit(
                    "modifyCartNum",
                    this.$store.state.shoppingCartNum - num
                );
            }
        }, 'div'
      );
        document.querySelector('.mui-popup-input input').type='password' 
      
    },
    selectAddress() {
      this.$router.push({ path: "/address", query: { isTo: 1 } });
    }
  }
};
</script>
<style scoped>
.mui-scroll {
  padding: 54px 10px 115px 10px;
}
.noAddress {
  line-height: 60px;
  font-size: 20px;
  font-weight: bold;
}
.fa-edit {
  color: rgb(131, 129, 129);
  font-weight: bold;
  margin-right: 5px;
}
.address {
  width: 100%;
  /* height: 80px; */
  background: #ffffff;
  padding: 10px 10px 20px 10px;
  border-radius: 8px;
  position: relative;
}
.address-detail span:first-child {
  color: rgb(255, 72, 145);
  display: inline-block;
  padding-right: 5px;
  font-size: 30px;
}
.receiver {
  color: rgb(148, 146, 146);
  font-size: 16px;
  line-height: 26px;
}
.gt {
  position: absolute;
  top: 30px;
  right: 10px;
  color: rgb(148, 146, 146);
}
.tips {
  color: rgb(255, 72, 145);
  font-size: 12px;
}
.fa-info {
  color: #fff;
  display: inline-block;
  width: 15px;
  height: 15px;
  line-height: 15px;
  text-align: center;
  background: rgb(255, 72, 145);
  border-radius: 50%;
  margin-right: 5px;
}
/* content */
.content {
  background: #fff;
  border-radius: 8px;
  margin-top: 10px;
  padding: 10px 5px;
}
.jsd {
  color: rgb(255, 72, 145);
  font-weight: 600;
  line-height: 30px;
  padding-left: 10px;
}
.goods-list {
  padding: 8px 5px;

  width: 100%;
}
.goods-item {
  box-shadow: 0 0 4px #ccc;
  margin-bottom: 10px;
  padding: 5px;
  border-radius: 8px;
  display: flex;
}
.goods-item-left img {
  width: 80px;
}
.goods-item-right {
  width: 100%;
  padding-left: 5px;
  line-height: 20px;
}
.goods-item-right div:nth-child(2) {
  font-size: 14px;
  color: rgb(146, 145, 145);
}
.goods-item-right div:nth-child(3) {
  font-size: 14px;
}
.goods-item-right div:nth-child(3) span:first-child {
  color: rgb(255, 72, 145);
}
.goods-item-right div:nth-child(4) {
  float: right;
}
.goods-item-right div:nth-child(4) span {
  color: rgb(255, 72, 145);
}
.pay-message div {
  line-height: 30px;
  color: #424141;
  display: flex;
  justify-content: space-between;
}
.goods-input {
  border: none;
  height: 30px;
  text-align: right;
  font-size: 14px;
  color: rgb(163, 156, 156);
  padding-left: -1px;
}
.goods-input::placeholder {
  font-size: 14px;
  text-align: right;
}
.pay-bottom {
  border-bottom: 1px solid #ccc;
  transform: scaleY(0.4);
}
.total-money {
  overflow: hidden;
  margin-top: 10px;
}
.total-money div {
  float: right;
}
.to-pay {
  width: 100%;
  box-shadow: 0 0 5px #ccc;
  height: 60px;
  background: #fff;
  position: fixed;
  bottom: 51px;
  z-index: 99;
  left: 0px;
  padding: 0 15px;
}
.to-pay-content {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.to-pay-content div:first-child {
  font-size: 12px;
  color: rgb(146, 145, 145);
}
.to-pay-content div:first-child span {
  font-size: 18px;
  color: rgb(255, 72, 145);
}
.to-pay-content div:last-child {
  width: 100px;
  height: 45px;
  background: rgb(255, 72, 145);
  border-radius: 10px;
  text-align: center;
  line-height: 45px;
  color: #fff;
}
/* content */
</style>