<template>
  <div>
    <div class="mui-content mui-scroll-wrapper">
      <div class="mui-scroll">
        <div class="goods-items" 
        v-for="item in searchResult" :key="item.goodsId"
        @click="detail(item)"
        >
          <div>
            <img :src="item.image" alt />
          </div>
          <div>{{item.goodsName}}</div>
          <div>24小时内发货</div>
          <div>
            ¥
            <span>{{item.goodsPrice}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {

  created() {
    this.$store.commit("modifyTitle", "水果超市");
    console.log(this.searchResult)
  },
  mounted() {
    this.mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005
    });
  },
  methods:{
    detail(item){
      this.$router.push({name: 'detail', params: {id: item.goodsId}})
    }
  },
  computed: {
    searchResult(){
      return this.$store.state.searchList
    }
  }
};
</script>
<style scoped>
.mui-scroll-wrapper {
  padding: 50px 10px 55px 5px;
}
.mui-scroll{
    margin-right: 5px;
}
.goods-items {
  position: relative;
  width: 49%;
  background: white;
  padding: 5px 8px 12px 8px;
  font-size: 16px;
  border-radius: 10px;
  display: inline-block;
  margin-right: 5px;
  margin-bottom: 5px;
}
.goods-items:nth-child(2n) {
  margin-right: 0px;
}
.goods-items div:nth-child(1) img {
  width: 168px;
  height: 168px;
}
.goods-items div:nth-child(2) {
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
.goods-items div:nth-child(3) {
  width: 84px;
  border: 1px solid #adaaaa;
  color: rgb(173, 169, 169);
  text-align: center;
  font-size: 12px;
  border-radius: 10px;
  height: 19px;
}
.goods-items div:nth-child(4) {
  font-size: 14px;
  color: rgb(255, 72, 145);
}
.goods-items div:nth-child(4) span {
  font-size: 20px;
  font-weight: 600;
}

</style>