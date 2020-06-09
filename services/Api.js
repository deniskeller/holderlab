import axios from 'axios';
import { store } from 'vuex';

export default () => {
  const instance = axios.create({
    baseURL: `https://api.holderlab.io/api/`,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  });

  instance.interceptors.request.use(
    config => {
      // trigger 'loading=true' event here
      // this.isFullPreload = true;
      // store.commit('setIsFullPreloadTrue');
      console.log('show PRELOADER');
      return config;
    },
    error => {
      // this.isFullPreload = false;
      // store.commit('setIsFullPreloadFalse');
      console.log('hide PRELOADER');
      // trigger 'loading=false' event here
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    response => {
      // trigger 'loading=false' event here
      // store.commit('setIsFullPreloadFalse');
      console.log('hide PRELOADER');
      return response;
    },
    error => {
      // store.commit('setIsFullPreloadFalse');
      console.log('hide PRELOADER');
      // trigger 'loading=false' event here
      return Promise.reject(error);
    }
  );

  return instance;
};
