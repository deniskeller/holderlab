import Api from '@/services/Api';
var qs = require('qs');

export default {
  get_transactions() {
    return Api().post('/api_get_transactions', qs.stringify());
  },
  
  get_order_paymant(params) {
    return Api().post('/api_get_order_paymant', qs.stringify(params));
  },
  
  post_create_paypal_order(params) {
    return Api().post('/api_post_create_paypal_order', qs.stringify(params));
  },
  
  post_test_paypal_order(params) {
    return Api().post('https://www.sandbox.paypal.com/cgi-bin/webscr', qs.stringify(params));
  }
};
