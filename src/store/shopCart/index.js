export default {
  state: {
    items: []
  },
  mutations: {
    addToCart (state, payload) {
      const index = state.items.findIndex(i => i.name === payload.name);
      if (index >= 0) {
        state.items[index].count += payload.count;
      } else {
        state.items.push(payload);
      }
    },
    changeCount (state, payload) {
      const index = state.items.findIndex(i => i.name === payload.name);
      state.items[index].count = payload.count;
    },
    deleteItem (state, payload) {
      const index = state.items.findIndex(i => i.name === payload.name);
      state.items.splice(index, 1);
    },
    clearShopCart (state, payload) {
      state.items = [];
    }
  },
  actions: {
    addToCart (context, payload) {
      context.commit('addToCart', payload);
    },
    changeCount (context, payload) {
      context.commit('changeCount', payload);
    },
    deleteItem (context, payload) {
      context.commit('deleteItem', payload);
    },
    clearShopCart (context, payload) {
      context.commit('clearShopCart');
    }
  },
  getters: {
    cartItems (state) {
      return state.items;
    }
  }
};
