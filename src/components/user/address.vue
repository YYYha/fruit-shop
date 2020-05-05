<template>
  <div class="mui-content">
    <div class="add-btn" @click="editAddress">
      <a href="javascript:;">添加收货地址</a>
    </div>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media mui-transitioning"
        v-for="item in addressList" :key="item.id"
      >
        <div class="mui-slider-right mui-disabled">
          <a class="mui-btn mui-btn-primary fa fa-edit" style="transform: translate(0px, 0px);" @click="edit(item)">编辑</a>
          <a class="mui-btn mui-btn-red fa fa-trash-o" style="transform: translate(0px, 0px);" @click="del(item)">删除</a>
        </div>
        <div class="mui-slider-handle" style="transform: translate(0px, 0px);"
          @click="selectThis(item)"
        >
          <a href="javascript:;">
            <div class="mui-media-body">
              <div>{{ item.address }}</div>
              <div>{{ item.receiver }}&nbsp;&nbsp;{{ item.phone }}</div>
            </div>
          </a>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data(){
    return{
      addressList: []
    }
  },
  created(){
    this.getAddressList()
  },
  methods: {
    selectThis(item){
      this.$store.commit('modifySelect', item)
      if(this.$route.query.isTo){
        this.$router.push('/toPay')
      }
    },
    async getAddressList(){
      let result = await this.$http.get('address')
      if(result.status !== 200) return
      this.addressList = result.data
      console.log(this.getAddressList)
    },
    editAddress(){
      const item = {}
      item.type = 1
      this.$router.push({name: 'editaddress', params:{item: item}})
    },
    edit(item){
      item.type = 0
      this.$router.push({name: 'editaddress', params: {item: item}})
    },
    async del(item){
      let result = await this.$http.get(`delAddress?id=${item.id}`)
      if(result.status !== 200) return
      this.mui.toast(result.data.msg)
      this.getAddressList()
    }
  }
};
</script>
<style scoped>
.mui-media-body{
  line-height: 26px;
}
.mui-content {
  padding: 0px;
  font-size: 16px;
}
.mui-content > .mui-table-view:first-child {
  margin-top: 0px;
}
.add-btn {
  height: 45px;
  background: white;
  text-align: center;
  line-height: 45px;
}
.add-btn a {
  color: black !important;
}
.mui-media-body{
  color: #000;
}
.mui-media-body div:last-child{
  color: rgb(150, 148, 148);
  font-size: 14px;
}
</style>