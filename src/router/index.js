import Vue from 'vue'
import VueRouter from 'vue-router'
import shoppingCart from '../components/shopping-cart.vue'
import '../assets/mui/css/mui.min.css'
import '../../node_modules/font-awesome/css/font-awesome.min.css'
import mui from "../assets/mui/js/mui";



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: ()=>import('../components/register.vue')
  },
  {
    path: '/index',
    name: 'index',
    component: ()=> import('../components/index.vue')
  },
  {
    path: '/category',
    name: 'category',
    component: ()=>import('../components/category.vue')
  },
  {
    path: '/shoppingCart',
    name: 'shoppingCart',
    component: shoppingCart
  },
  {
    path: '/user',
    name: 'user',
    component: ()=>import('../components/user/user.vue')
  },
  {
    path: '/test',
    component: ()=>import('../components/test.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: ()=>import('../components/search.vue')
  },
  {
    path: '/search-result',
    name: 'searchResult',
    component: ()=>import('../components/search-result.vue')
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: ()=>import('../components/detail.vue')
  },
  {
    path: '/address',
    name: 'address',
    component: ()=>import('../components/user/address.vue')
  },
  {
    path: '/toPay',
    name: 'toPay',
    component: ()=>import('../components/toPay')
  },
  {
    path: '/editaddress',
    name: 'editaddress',
    component: ()=>import('../components/user/editAddress.vue')
  },{
    path: '/modifyPassword',
    name: 'modifyPassword',
    component: ()=>import('../components/user/modifyPassword.vue')
  },{
    path: '/orders',
    name: 'orders',
    component: ()=>import('../components/user/orders.vue')
  }
]











const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  mode: 'hash',
  routes
})

router.beforeEach((to, from, next) => {
  if(to.path === '/login' || to.path === '/index' || to.path === '/register') return next()
  const tokenStr = localStorage.getItem('token')
  if(!tokenStr){
    mui.toast('请登录')
    setTimeout(function(){
      next('/login')
      return 
    }, 2000)
    return
  } 
  next()
})

export default router