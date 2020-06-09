/*ApiServiceOther*/
import Api from '@/services/Api';
var qs = require('qs');

export default {
  get_faq() {
    return Api().get('/api_get_faq', qs.stringify());
  },

  post_change_rating(params) {
    return Api().post('/api_post_change_rating', qs.stringify(params));
  }
};
