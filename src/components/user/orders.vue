<template>
  <div class="mui-content">
    <div class="mui-scroll-wrapper">
      <div class="mui-scroll">
        <div class="order">
          <div class="orders-item" v-for="item in orderList" :key="item.id">
            <div class="address">
              <div>
                <span class="fa fa-paper-plane-o"></span>
                {{item.address.address}}
              </div>
              <div>
                <span>{{item.address.receiver}}</span>
                &nbsp;&nbsp;{{item.address.phone}}
              </div>
            </div>
            <div class="goodsList">
              <div class="goodsItem" v-for="goods in item.children" :key="goods.id">
                <div class="img">
                  <img :src="goods.image" alt />
                </div>
                <div class="right">
                  <div>{{goods.goodsName}}</div>
                  <div>{{goods.goodsDes}}</div>
                  <div>
                    价格：
                    <span>¥ {{goods.goodsPrice}}</span>
                    X {{goods.goodsNum}}
                  </div>
                  <div>
                    小计：
                    <span>¥ {{goods.goodsPrice * goods.goodsNum}}</span>
                    <span @click="commentClick(goods)" class="fa fa-commenting-o">&nbsp;评论</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="content">
              <div>
                <span>商品总价：</span>
                ¥ {{item.count}}
              </div>
              <div>
                <span>订单编号：</span>
                {{item.id}}
              </div>
              <div>
                <span>创建时间：</span>
                {{item.createTime.split('.')[0]}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      orderList: []
    };
  },
  created() {
    this.getOrderList();
    this.$store.commit("modifyTitle", "购买订单");
  },
  mounted() {
    this.mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005
    });
  },
  methods: {
    async getOrderList() {
      let result = await this.$http.get("orders");
      this.orderList = result.data;
      console.log(this.orderList);
    },
    async commentClick(goods) {
      let goodsId = goods.id;
      this.mui.prompt(
        "商品评论",
        "请输入评论内容",
        "提示",
        ["取消", "提交"],
        async result => {
          if(result.index === 0) return
          let res = await this.$http.post('comment', {
            content: result.value,
            goodsId
          })
          console.log(res.data)
          this.mui.toast(res.data.msg)
        }
      );
    }
  }
};
</script>

<style scoped>
.mui-scroll {
  padding: 53px 10px 55px 10px;
}
.orders-item {
  border-radius: 8px;
  background: #fff;
  margin-bottom: 10px;
}
.address {
  padding: 10px;
  line-height: 26px;
}
.fa-paper-plane-o {
  color: rgb(255, 72, 145);
  font-size: 30px;
}
.address div:last-child {
  font-size: 16px;
  color: rgb(121, 119, 119);
}
img {
  width: 80px;
}
.goodsList {
  padding: 10px;
}
.goodsItem {
  padding: 10px;
  display: flex;
  box-shadow: 0 0 8px #ccc;
  border-radius: 8px;
}
.right {
  padding-left: 5px;
  padding-top: 5px;
  width: 100%;
}
.right div:nth-child(2) {
  font-size: 14px;
  color: rgb(117, 117, 117);
}
.right div:nth-child(3) {
  font-size: 14px;
}
.right div:nth-child(3) span {
  color: rgb(255, 72, 145);
}
.right div:nth-child(4) {
  float: right;
}
.right div:nth-child(4) span {
  color: rgb(255, 72, 145);
}
.content {
  font-size: 14px;
  padding: 10px;
}
.content span {
  display: inline-block;
  width: 80px;
}
.fa-commenting-o {
  color: rgb(150, 150, 150) !important;
  font-size: 14px;
  padding-left: 10px;
}
</style>