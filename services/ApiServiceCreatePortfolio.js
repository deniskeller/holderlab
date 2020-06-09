import Api from '@/services/Api';
var qs = require('qs');

export default {
  post_create_portfel(params) {
    return Api().post('/api_create_portfels', qs.stringify(params));
  },

  short_effective_margin(params) {
    return Api().post('/api_short_effective_margin', qs.stringify(params));
  },

  post_saved_portfel(params) {
    return Api().post('/api_post_saved_portfel', qs.stringify(params));
  }
};
