/*ApiServiceHeader*/
import Api from '@/services/Api';
var qs = require('qs');

export default {
  get_portfels_new(params) {
    return Api().get('/api_portfels_new/' + params, qs.stringify());
  },

  get_white_list_for_markets() {
    return Api().get('/api_get_white_list_for_markets', qs.stringify());
  }
};
