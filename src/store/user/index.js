import axios from 'axios';
import router from '@/router/index.js';

// const apiUrl = 'http://localhost:3000/user';
const apiUrl = 'https://polar-peak-66663.herokuapp.com/user';

export default {
  state: {
    id: '',
    username: '',
    token: '',
    isLogin: false,
    loginDialog: false,
    errMsg: []
  },
  mutations: {
    openLoginDialog (state) {
      state.loginDialog = true;
    },
    closeLoginDialog (state) {
      state.loginDialog = false;
    },
    login (state, payload) {
      const { _id, username, token } = payload;
      state.id = _id;
      state.username = username;
      state.token = token;
      state.isLogin = true;
    },
    logout (state) {
      state.id = '';
      state.username = '';
      state.token = '';
      state.isLogin = false;
      state.loginDialog = false;
      state.errMsg = [];

      if (router.currentRoute.path !== '/') router.push('/');
    },
    errMsg (state, payload) {
      state.errMsg.push(payload);
    },
    clearErrMag (state, payload) {
      state.errMsg = [];
    }
  },
  actions: {
    login (context, payload) {
      axios.post(`${apiUrl}/login`, payload)
        .then(res => context.commit('login', res.data))
        .catch(err => context.commit('errMsg', err.response.data));
    },
    register (context, payload) {
      axios.post(`${apiUrl}/register`, payload)
        .then((res) => context.dispatch('login', payload))
        .catch(err => context.commit('errMsg', err.response.data));
    },
    logout ({ commit }) {
      commit('logout');
      commit('clearOrder');
    }
  },
  getters: {
    isLogin (state) {
      return state.isLogin;
    },
    loginDialog (state) {
      return state.loginDialog;
    },
    errMsg (state) {
      return state.errMsg;
    },
    userInfo (state) {
      const info = {
        id: state.id,
        username: state.username,
        token: state.token
      };
      return info;
    }
  }
};
