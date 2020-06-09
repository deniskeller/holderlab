import Api from '@/services/Api';
var qs = require('qs');

export default {
  get_landing_data() {
    return Api().get('/api_get_landing_data', qs.stringify());
  },
};
