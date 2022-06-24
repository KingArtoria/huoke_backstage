import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// * 路由懒加载
const Index = () => import('../views/index/index.vue')
const Login = () => import('../views/login/index.vue')
const User = () => import('../views/user_management/user/index.vue')
const Role = () => import('../views/user_management/role/index.vue')
const RoleBind = () => import('../views/user_management/role/role-bind.vue')
const Node = () => import('../views/user_management/node/index.vue')
const PubMember = () => import('../views/support/customer/pub-member.vue')
const GroMember = () => import('../views/support/customer/gro-member.vue')
const PerMember = () => import('../views/support/customer/per-member.vue')
const AllMember = () => import('../views/support/all_member/index.vue')
const History = () => import('../views/support/customer/history.vue')
const PayOrder = () => import('../views/order/pay_order/index.vue')
const UnPayOrder = () => import('../views/order/unpaid_order/index.vue')
const AllPerformance = () => import('../views/performance/all.vue')
const OwnerPerformance = () => import('../views/performance/owner.vue')
const MonthReport = () => import('../views/performance/month-report.vue')
const UserList = () => import('../views/promote/user_list.vue')
const ProjectList = () => import('../views/project/list.vue')
const routes = [
  { path: '/', name: 'Index', component: Index },
  { path: '/login', name: 'Login', component: Login },
  { path: '/user/index', name: 'User', component: User },
  { path: '/role/index', name: 'Role', component: Role },
  { path: '/role/bind', name: 'RoleBind', component: RoleBind },
  { path: '/node/index', name: 'Node', component: Node },
  { path: '/support/pub_member', name: 'PubMember', component: PubMember },
  { path: '/support/gro_member', name: 'GroMember', component: GroMember },
  { path: '/support/per_member', name: 'PerMember', component: PerMember },
  { path: '/support/all_member', name: 'AllMember', component: AllMember },
  { path: '/support/history', name: 'History', component: History },
  { path: '/order/pay_order', name: 'PayOrder', component: PayOrder },
  { path: '/order/unpaid_order', name: 'UnPayOrder', component: UnPayOrder },
  { path: '/support/report', name: 'AllPerformance', component: AllPerformance },
  { path: '/order/user_order', name: 'OwnerPerformance', component: OwnerPerformance },
  { path: '/support/report_info', name: 'MonthReport', component: MonthReport },
  { path: '/promote/user_list', name: 'UserList', component: UserList },
  { path: '/project/list', name: 'ProjectList', component: ProjectList },
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
