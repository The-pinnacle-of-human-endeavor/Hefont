import Vue from 'vue'
import Router from 'vue-router'
import Video from '@/components/Video'
import Document from '@/components/Document'
import ElementUI from 'element-ui'
Vue.use(Router)
Vue.use(ElementUI)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Video',
      component: Video
    },
     {
      path: '/components/Video',
      name: 'Video',
      component: Video
    },
    {
      path: '/components/Document',
      name: 'home',
      component: () => import('../components/Document.vue'),
    }
  ]
})


