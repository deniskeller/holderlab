/*ApiServiceOther*/
import Api from '@/services/Api';
var qs = require('qs');

export default {
  post_loaded_saved_portfolio(params) {
    return Api().post('/api_post_loading_portfolio', qs.stringify(params));
  },

  post_delite_portfolio(params) {
    return Api().post('/api_post_delite_portfolio', qs.stringify(params));
  },

  get_unpublished(id_portfel) {
    return Api().get('/api_unpublished/' + id_portfel, qs.stringify());
  },

  get_saved_portfolios(params) {
    return Api().post('/api_get_saved_portfolios', qs.stringify(params));
  },

  post_7days_trial() {
    return Api().post('/api_post_7days_trial', qs.stringify());
  },

  post_save_efficient_frontier(params) {
    return Api().post(
      '/api_post_save_efficient_frontier',
      qs.stringify(params)
    );
  },

  post_save_backtest(params) {
    return Api().post('/api_post_save_back_test', qs.stringify(params));
  },

  post_rebalance_with_btc(params) {
    return Api().post('/api_rebalance_with_btc', qs.stringify(params));
  },

  post_rebalance_with_usdt(params) {
    return Api().post('/api_rebalance_with_usdt', qs.stringify(params));
  },

  get_short_rm_portfolio_list() {
    return Api().get('/api_get_short_rm_portfolio_list', qs.stringify());
  },

  get_lk_referals() {
    return Api().get('/api_lk_referals', qs.stringify());
  }
};
