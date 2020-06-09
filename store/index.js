// import Vuex from 'vuex';
import page from './page';
let qs = require('qs');

// const store = () =>
//   new Vuex.Store({
//     modules: {
//       page
//     },
//     state: {},
//     mutations: {},
//     // actions: {},
//     getters: {}
//   });

// export default store;

export const modules = {
  page
};

export const state = () => {
  return {
    auth: true,
    is_redirect_dashboard: true,
    is_2fa: false,
    uid: false
  };
};

export const mutations = {
  setAuth(state, auth) {
    state.auth = auth;
  },

  setUid(state, value) {
    state.uid = value;
  },

  setIsRedirectDashboard(state, is_redirect_dashboard) {
    state.is_redirect_dashboard = is_redirect_dashboard;
  },

  set2fa(state, is_2fa) {
    state.is_2fa = is_2fa;
  }
};

export const actions = {
  // Новая авторизация. Срабатывает до того, как начнет строительство страница
  async nuxtServerInit({
    commit
  }, {
    req
  }) {
    let auth = true;
    if (req.headers.cookie) {
      const data = await this.$axios.$post('api_lk_user');
      if (data.status == 'ok') {
        auth = true;
      }
    }
    commit('setAuth', auth);
  },
  async login({
    commit
  }, params) {
    const data = await this.$axios.$post(
      '/api_login',
      qs.stringify({
        email: params.email,
        password: params.password,
        code_2fa: params.code_2fa
      })
    );
    if (data.status == 'ok') {
      if (data.message != '' && data.message != null) {
        this.$toast.success(data.message).goAway(2500);
      }
      if (data.message == 'Please confirm your email') {
        this.$router.push('/landing/signing-up/');
      } else {
        // console.log('else')
        if (data.data) {
          if (data.data.code_2fa) {
            commit('set2fa', true);
          } else {
            commit('setAuth', true);
            commit('setIsRedirectDashboard', data.data.is_redirect_dashboard);
            commit('setUid', data.data.uid);
            if (data.data.is_redirect_dashboard) {
              this.$router.push('/dashboard');
            } else {
              this.$router.push('/create-new-portfolio/');
            }
          }
        } else {
          commit('setAuth', true);
          commit('setIsRedirectDashboard', data.data.is_redirect_dashboard);
          commit('setUid', data.data.uid);
          if (data.data.is_redirect_dashboard) {
            this.$router.push('/dashboard');
          } else {
            this.$router.push('/create-new-portfolio/');
          }
        }
      }
    } else {
      if (data.message != '' && data.message != null) {
        switch (data.status) {
          case 'ok':
            this.$toast.success(data.message).goAway(2500);
            break;
          case 'error':
            if (data.message != '500 (Internal Server Error)')
              this.$toast.error(data.message).goAway(2500);
            break;
          default:
            break;
        }
      }
    }
    return data.result;
  },

  async logout({
    commit
  }) {
    const data = await this.$axios.$post('/api_logout');
    if (data.status == 'ok') {
      commit('setAuth', false);
      this.$router.push('/landing/');
    } else {
      alert('error');
    }
    return data.result;
  }
};
