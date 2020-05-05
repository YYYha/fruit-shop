import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title: '',
    shoppingCartNum: 0,
    buyList: [],
    selectAddress: {}, //订单结算页地址
    searchList: []
  },
  mutations: {
    modifyTitle(state, title){
      state.title = title
    },
    modifyCartNum(state, num){
      state.shoppingCartNum = num
    },
    modifyBuList(state, buyList){
      state.buyList = buyList
    },
    modifySelect(state, select){
      state.selectAddress = select
    },
    modifySearchList(state, list){
      state.searchList = list
    }
  },
  actions: {
  },
  modules: {
  }
})
