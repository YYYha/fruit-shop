import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

// import './assets/global/global.css'

// mui 
import './assets/mui/css/mui.min.css'
import 'font-awesome/css/font-awesome.min.css'
import mui from "./assets/mui/js/mui";

Vue.prototype.mui = mui



// axios
axios.defaults.baseURL = 'http://120.78.172.47:3000/'
// axios.defaults.baseURL = 'http://localhost:3000/'

axios.interceptors.request.use(config=>{
  config.headers.Authorization = localStorage.getItem('token')
  return config
})
axios.interceptors.response.use(config=>{
  console.log(config)
  if(config.data.code === 2){
    localStorage.removeItem('token')
  }
  return config
})

Vue.prototype.$http = axios


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
