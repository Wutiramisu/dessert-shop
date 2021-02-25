import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/products',
    component: () => import('../views/Products.vue')
  },
  {
    path: '/cart',
    component: () => import('../views/ShopCart.vue')
  },
  {
    path: '/order',
    component: () => import('@/views/Order.vue'),
    meta: { requiresAuth: true }
  },
  { path: '/:PageNotFound(.*)', redirect: '/' }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  originTo: ''
});

router.beforeEach((to, from, next) => {
  router.originTo = to; // 原始要去的路徑存至全域，元件就能調用
  window.scrollTo(0, 0);

  if (to.meta.requiresAuth) {
    if (store.getters.isLogin) {
      return next();
    }
    store.commit('openLoginDialog');
    next(from);
  } else {
    next();
  }
});

export default router;
