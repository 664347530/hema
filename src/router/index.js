import Vue from 'vue'
import VueRouter from 'vue-router'
import Homepage from '../views/homepage.vue'
import Login from '../views/login.vue'
import Regist from '../views/register.vue'
import Shoppage from '../views/shoppage.vue'
import Allproduct from '../views/allproduct.vue'
import Detail from '../views/detailpage.vue'
import Shopcart from '../views/shopcart.vue'
import Orders from '../views/orderpage.vue'
import Person from '../views/personpage.vue'
import Houtai from '../views/houtaipage.vue'
import Controllogin from '../views/houtai/controllogin.vue'
import Dianpu from '../views/dianpu.vue'
import Center from '../views/personcenter/person.vue'
import Search from '../views/searchpage.vue'
import Manager from '../views/houtai/mangerregist.vue'
// 试炼点
import Shi from '../views/shiliandian.vue'

// 子组件
import Alldata from '../views/houtai/alldata.vue'
import Usercount from '../views/houtai/usercount.vue'
import Gmessage from '../views/houtai/goodmessage.vue'
import Upproduct from '../views/houtai/upproduct.vue'
import Addproduct from '../views/houtai/addproduct.vue'
import Mark from '../views/houtai/markpage.vue'
import Message from '../views/personcenter/message.vue'
import Uppassword from '../views/personcenter/uppassword.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/', component: Homepage },
  { path: '/login', component: Login },
  { path: '/regist', component: Regist },
  { path: '/shoppage', component: Shoppage },
  { path: '/allproduct', component: Allproduct },
  { path: '/detail', component: Detail },
  { path: '/shopcart', component: Shopcart },
  { path: '/order', component: Orders },
  { path: '/person', component: Person },
  {path: '/houtai', component: Houtai,
    children: [
      { path: '/alldata', component: Alldata },
      {path:'/usercount',component:Usercount},
      {path:'/goodmessage',component:Gmessage},
      {path:'/upproduct',component:Upproduct},
      {path:'/addproduct',component:Addproduct},
      {path:'/markpage',component:Mark}
    ]
  },
  {path:'/controllogin',component:Controllogin},
  {path:'/dianpu',component:Dianpu},
  {path:'/center',component:Center,
    children:[
      {path:'/message',component:Message},
      {path:'/uppassword',component:Uppassword}
    ]
  },
  {path:'/search',component:Search},
  {path:'/manregist',component:Manager},
  {path:'/shi',component:Shi}
]

const router = new VueRouter({
  routes
})

export default router
