import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import add from '@/components/add'
import info1 from '@/components/info1'
import info2 from '@/components/info2'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/add',
      name: 'add',
      component: add
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
