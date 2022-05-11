import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// * 路由懒加载
const Index = () => import('../views/index/index.vue')
const Login = () => import('../views/login/index.vue')
const User = () => import('../views/user/user.vue')
const routes = [
  { path: '/', name: 'Index', component: Index },
  { path: '/login', name: 'Login', component: Login },
  { path: '/user/index', name: 'User', component: User },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})
// * 添加路由守卫
router.beforeEach((to, from, next) => {
  // * 判断是否登录
  if (to.path === '/login') {
    next()
  } else {
    if (localStorage.getItem('token')) {
      next()
    } else {
      next('/login')
    }
  }
})
export default router
