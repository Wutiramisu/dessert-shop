import axios from 'axios';

// const apiUrl = 'http://localhost:3000/order';
const apiUrl = 'https://polar-peak-66663.herokuapp.com/order';

export default {
  state: {
    isOrderSuccess: false,
    order: null
  },
  mutations: {
    newOrder (state) {
      state.isOrderSuccess = true;
    },
    initOrderState (state) {
      state.isOrderSuccess = false;
    },
    getOrder (state, payload) {
      state.order = payload;
    },
    clearOrder (state) {
      state.order = null;
    }
  },
  actions: {
    newOrder (context, payload) {
      axios.post(`${apiUrl}/new`, payload, { headers: { Authorization: `Bearer ${payload.token}` } })
        .then((res) => context.commit('newOrder'))
        .catch((err) => console.log('catchError: ', err));
    },
    getOrder (context, payload) {
      axios.get(`${apiUrl}/${payload.username}`, { headers: { Authorization: `Bearer ${payload.token}` } })
        .then((res) => {
          context.commit('getOrder', res.data);
        })
        .catch((err) => console.log('catchError: ', err));
    }
  },
  getters: {
    isOrderSuccess (state) {
      return state.isOrderSuccess;
    },
    getOrder (state) {
      return state.order;
    }
  }
};
