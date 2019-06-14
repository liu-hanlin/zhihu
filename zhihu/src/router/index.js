import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/pages/index.vue'
import detail from '../components/pages/detail.vue'
import collection from '../components/pages/collection.vue'
import morecomment from '../components/pages/morecomment.vue'

Vue.use(Router)

export default new Router({
  routes: [
   {
    path:"/index",
    component:index
   },
   {
   path:'/detail/:id',
   component:detail,
   },
   {
   path:'/morecomment/:id',
   component:morecomment
   },
   {
   path:'/collection',
   component:collection
   },
   {
   path:'*',
   redirect:'index'
   }
  ]
})
