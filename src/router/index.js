import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('views/login/Login.vue')
// const Dashboard = () => import('views/dashboard/Dashboard.vue')
// const UserManage = () => import('views/usermanage/UserManage.vue')
// const GroundManage = () => import('views/groundmanage/GroundManage.vue')
// const EquipmentManage =() => import('views/equipmentmanage/EquipmentManage.vue')
// const RaceManage = () => import('views/racemanage/RaceManage.vue')
// const DataReport = () => import('views/datareport/DataReport.vue')
// const EditInfo = () => import('views/editinfo/EditInfo.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
