import Vue from 'vue';
import Vuex from 'vuex';

import products from './products/index.js';
import shopCart from './shopCart/index.js';
import user from './user/index.js';
import order from './order/index.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    products,
    shopCart,
    user,
    order
  }
});
