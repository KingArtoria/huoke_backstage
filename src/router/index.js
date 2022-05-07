import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// * 路由懒加载
const Index = () => import('../views/index/index.vue')
const routes = [
  { path: '/', name: 'Index', component: Index },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
