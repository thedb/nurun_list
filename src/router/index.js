import Vue from 'vue'
import Router from 'vue-router'
import task from '@/components/task'
import addTask from '@/components/addTask'
import employeeInfo from '@/components/employeeInfo'
import workInfo from '@/components/workInfo'
import uploadImg from '@/components/uploadImg'
import info1 from '@/components/info1'
import info2 from '@/components/info2'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'task',
      component: task
    },
    {
      path: '/uploadImg',
      name: 'uploadImg',
      component: uploadImg
    },
    {
      path: '/addTask',
      name: 'addTask',
      component: addTask
    },
    {
      path: '/employeeInfo',
      name: 'front_employee',
      component: employeeInfo
    },
    {
      path: '/workInfo',
      name: 'front_work',
      component: workInfo
    },
    {
      path: '/info1',
      name: 'info1',
      component: info1
    },
    {
      path: '/info2',
      name: 'info2',
      component: info2
    }
  ]
})
