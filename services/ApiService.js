import Api from '@/services/Api';
var qs = require('qs');

export default {
  get_ready_made_portfel() {
    return Api().get('/api_ready_made_portfel', qs.stringify());
  },

  post_exchange_auth_portfel_data(params) {
    return Api().post('/api_exchange_auth_portfel_data', qs.stringify(params));
  },

  subscription(id_portfel, param) {
    return Api().post('/api_subscription/' + id_portfel, qs.stringify(param));
  },

  lk_user() {
    return Api().get('/api_lk_user', qs.stringify());
  },

  short_calculation_matrix(params) {
    return Api().post('/api_short_page_corr_matrix', qs.stringify(params));
  },

  post_change_password(params) {
    return Api().post('/api_change_password', qs.stringify(params));
  },

  post_change_email(params) {
    return Api().post('/api_change_email', qs.stringify(params));
  },

  post_change_username(params) {
    return Api().post('/api_change_username', qs.stringify(params));
  },

  publish_ready_made_portfolio(params) {
    return Api().post(
      '/api_publish_ready_made_portfolio',
      qs.stringify(params)
    );
  },

  get_time_stamp_portfel_data(params, id_portfel) {
    return Api().post(
      '/api_get_time_stamp_portfel_data/' + id_portfel,
      qs.stringify(params)
    );
  },

  get_time_stamp_rm_portfel_data(params, id_portfel) {
    return Api().post(
      '/api_get_time_stamp_rm_portfel_data/' + id_portfel,
      qs.stringify(params)
    );
  },

  full_effective_margin(params) {
    return Api().post('/api_full_effective_margin', qs.stringify(params));
  },

  login(params) {
    return Api().post('/api_login', qs.stringify(params));
  },

  register(params) {
    return Api().post('/api_register', qs.stringify(params));
  },

  get_subscribers(id_portfel) {
    return Api().post('/api_get_subscribers/' + id_portfel, qs.stringify());
  },

  api_post_full_data_with_saved_portfolio(param) {
    return Api().post(
      '/api_post_full_data_with_saved_portfolio',
      qs.stringify(param)
    );
  },

  change_timestamp_rm_portfolio(params, id_portfel) {
    return Api().post('/api_rm_portfels/' + id_portfel, qs.stringify(params));
  },

  get_rm_portfels_statistik(id_portfel) {
    return Api().post(
      '/api_get_rm_portfels_statistik',
      qs.stringify({ id_portfels: id_portfel })
    );
  },

  get_rm_portfels(id_portfel) {
    return Api().get('/api_rm_portfels/' + id_portfel, qs.stringify());
  },

  get_market_index() {
    return Api().get('/api_market_index', qs.stringify());
  },

  change_favorite_portfel(params) {
    return Api().post('/api_change_favorite_portfel', qs.stringify(params));
  },

  ready_made_portfel() {
    return Api().get('/api_ready_made_portfel', qs.stringify());
  },

  get_best_ready_made_portfel() {
    return Api().get('/api_get_best_ready_made_portfel', qs.stringify());
  },

  get_short_portfel_list() {
    return Api().get('/api_get_short_portfel_list', qs.stringify());
  },

  get_balance() {
    return Api().get('/api_get_balance', qs.stringify());
  },

  back_test_post(params) {
    return Api().post('/api_back_test_post', qs.stringify(params));
  },

  post_change_name_portfolio(params) {
    return Api().post('/api_change_name_portfolio', qs.stringify(params));
  },

  post_saved_user_company_info(params) {
    return Api().post(
      '/api_post_saved_user_company_info',
      qs.stringify(params)
    );
  },

  post_saved_user_info(params) {
    return Api().post('/api_post_saved_user_info', qs.stringify(params));
  },

  post_confirm_2fa_verification(params) {
    return Api().post('/api_confirm_2fa_verification', qs.stringify(params));
  },

  get_qr_code() {
    return Api().get('/get_qr_code', qs.stringify());
  },

  post_del_2fa_verification() {
    return Api().get('/api_post_del_2fa_verification', qs.stringify());
  },

  get_user_logs() {
    return Api().get('/api_get_user_logs', qs.stringify());
  },

  get_user_logs_later() {
    return Api().get('/api_get_user_logs_later', qs.stringify());
  },

  reset_password(params) {
    return Api().post('/api_password_reset_send_email', qs.stringify(params));
  },

  password_reset_confirm() {
    return Api().get('/api_password_reset_confirm', qs.stringify());
  },

  password_reset(params) {
    return Api().post('/api_password_reset', qs.stringify(params));
  },

  confirm_email(params) {
    return Api().post('/api_resend_confirm_email', qs.stringify(params));
  }
};
