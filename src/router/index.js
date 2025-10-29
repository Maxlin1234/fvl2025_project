// router/index.js (正確 Vue 3 寫法)
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../components/MainSection.vue')
  },
  {
    path: '/portfolioDetil',
    name: 'PortfolioDetil',
    component: () => import( '../views/PortfolioDetil.vue') // 注意檔名也建議改正
  },
  {
    path: '/works/:id',
    name: 'WorkDetail',
    component: () => import('../views/PortfolioDetil.vue')
  },
  // {
  //   path:'/:message',
  //   name:'CalEndar',
  //   component: () => import( '../components/Calendar2.vue') // 注意檔名也建議改正
  // }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
