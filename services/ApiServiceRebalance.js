import Api from '@/services/Api';
var qs = require('qs');

export default {
  post_show_actual_portfolio(params) {
    return Api().post('/api_post_show_actual_portfolio', qs.stringify(params));
  },

  rebalance_now(id_portfel) {
    return Api().get('/api_rebalance_now/' + id_portfel, qs.stringify());
  },

  post_change_portfolio_coin_list(params) {
    return Api().post(
      '/api_post_change_portfolio_coin_list',
      qs.stringify(params)
    );
  },

  post_change_options_portfolio(params) {
    return Api().post(
      '/api_post_change_options_portfolio',
      qs.stringify(params)
    );
  }
};
