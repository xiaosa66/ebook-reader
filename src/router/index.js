import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import eBook from '@/components/eBook'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ebook',
      component:eBook 
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
