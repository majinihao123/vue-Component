import Vue from 'vue'
import Router from 'vue-router'
import timePicker from '@/components/time-picker'
import addForm from '@/components/addForm'
import editTable from '../components/editTable.vue'
import myVueRouter from '@/myComponents/myRouter/myVueRouter'

import home from "@/view/home"


Vue.use(myVueRouter)

export default new myVueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/time-picker',
      name: 'time-picker',
      component: timePicker
    },
    {
      path: '/edit-table',
      name: 'edit-table',
      component: editTable
    },
    {
      path: '/addForm',
      name: 'addForm',
      component: addForm
    },
  ]
})
