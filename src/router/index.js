import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('views/login/Login.vue')
const Dashboard = () => import('views/dashboard/Dashboard.vue')
const UserManage = () => import('views/usermanage/UserManage.vue')
const GroundManage = () => import('views/groundmanage/GroundManage.vue')
const EquipmentManage =() => import('views/equipmentmanage/EquipmentManage.vue')
const RaceManage = () => import('views/racemanage/RaceManage.vue')
const DataReport = () => import('views/datareport/DataReport.vue')
const EditInfo = () => import('views/editinfo/EditInfo.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  // {
  //   path: '/dashboard',
  //   component: Dashboard,
  //   children: [
  //     {
  //       path: 'user',
  //       component: UserManage,
  //       name:"用户管理",
  //       icon: require("assets/img/tabmenu/usermanage.svg")
  //     },
  //     {
  //       path: 'ground',
  //       component: GroundManage,
  //       name:"场地管理",
  //       icon: require("assets/img/tabmenu/placemanage.svg")
  //     },
  //     {
  //       path: 'equipment',
  //       component: EquipmentManage,
  //       name:"器材管理",
  //       icon: require("assets/img/tabmenu/equipmentmanage.svg")
  //     },
  //     {
  //       path: 'race',
  //       component: RaceManage,
  //       name:"赛事管理",
  //       icon: require("assets/img/tabmenu/gamemanage.svg")
  //     },
  //     {
  //       path: 'report',
  //       component: DataReport,
  //       name:"金额报表",
  //       icon: require("assets/img/tabmenu/trading.svg")
  //     },
  //     {
  //       path: 'editInfo',
  //       component: EditInfo
  //     },
      // {
      //   path: '',
      //   redirect: "user"
      // }
    // ]
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
