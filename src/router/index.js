import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('views/login/Login.vue')
const Dashboard = () => import('views/dashboard/Dashboard.vue')
const UserManage = () => import('views/user_manage/UserManage.vue')
const GroundManage = () => import('views/ground_manage/GroundManage.vue')
const EquipmentManage =() => import('views/equipment_manage/EquipmentManage.vue')
const RaceManage = () => import('views/race_manage/RaceManage.vue')
const DataReport = () => import('views/data_report/DataReport.vue')
const EditInfo = () => import('views/edit_info/EditInfo.vue')

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
  {
    path: '/dashboard',
    component: Dashboard,
    children: [
      {
        path: '',
        redirect: "user"
      },
      {
        path: 'user',
        component: UserManage
      },
      {
        path: 'ground',
        component: GroundManage
      },
      {
        path: 'equipment',
        component: EquipmentManage
      },
      {
        path: 'race',
        component: RaceManage
      },
      {
        path: 'report',
        component: DataReport
      },
      {
        path: 'editInfo',
        component: EditInfo
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
